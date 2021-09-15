<template>
  <div class="__array-form-item">
    <legend
      v-if="schema.ui.legend && schema.ui.showLegend"
      v-b-toggle.collapse-list
    >
      {{ _analyzeVal(schema.ui.legend) }}
    </legend>
    <b-collapse visible id="collapse-list">
      <b-card>
        <div
          v-show="!collapsed"
          v-for="(dataItem, idx) in schema.value"
          :key="dataItem.__dataSchema.__id"
        >
          <label
            v-b-toggle="
              'collapse-' +
                (mergeConfig.autoIdxToLabel ? idx + 1 : '') +
                dataItem.__dataSchema.__id
            "
          >
            {{ _analyzeVal(dataItem.__dataSchema.ui.label, idx) }}
            <!-- {{ mergeConfig.autoIdxToLabel ? idx + 1 : "" }} -->
            {{ idx + 1 }}
          </label>
          <b-collapse
            visible
            :id="
              'collapse-' +
                (mergeConfig.autoIdxToLabel ? idx + 1 : '') +
                dataItem.__dataSchema.__id
            "
          >
            <b-card class="mt-1">
              <div class="btn-group btn-group-sm">
                <button
                  @click="itemUp(idx)"
                  v-show="idx !== 0"
                  v-if="!mergeConfig.disableReorder"
                  type="button"
                  class="btn btn-secondary"
                >
                  {{ $nclang("up") }}
                </button>
                <button
                  @click="itemDown(idx)"
                  v-show="idx !== schema.value.length - 1"
                  v-if="!mergeConfig.disableReorder"
                  type="button"
                  class="btn btn-secondary"
                >
                  {{ $nclang("down") }}
                </button>
                <button
                  @click="
                    delItem(
                      idx,
                      mergeConfig.requiredDelConfirm,
                      mergeConfig.delConfirmText.item || $nclang('delItemTips')
                    )
                  "
                  v-if="
                    (!mergeConfig.disableDel &&
                      !isDelExceptionRow(dataItem.__dataSchema)) ||
                      (mergeConfig.disableDel &&
                        isDelExceptionRow(dataItem.__dataSchema))
                  "
                  type="button"
                  class="btn btn-danger btn-secondary"
                >
                  {{ $nclang("delete") }}
                </button>
              </div>

              <template v-if="isNormalObjSchema(dataItem.__dataSchema)">
                <ncform-object
                  v-show="
                    mergeConfig.disableItemCollapse ||
                      dataItem.__dataSchema._expand
                  "
                  :schema="dataItem.__dataSchema"
                  :form-data="formData"
                  :idx-chain="(idxChain ? idxChain + ',' : '') + idx"
                  :config="dataItem.__dataSchema.ui.widgetConfig"
                  :global-const="globalConst"
                  :show-legend="false"
                >
                  <template
                    v-for="(fieldSchema, fieldName) in dataItem.__dataSchema
                      .properties || { __notObjItem: dataItem.__dataSchema }"
                    :slot="fieldName"
                  >
                    <slot
                      :name="fieldName"
                      :schema="fieldSchema"
                      :idx="idx"
                    ></slot>
                  </template>
                </ncform-object>
              </template>

              <template v-else>
                <div
                  v-show="
                    mergeConfig.disableItemCollapse ||
                      dataItem.__dataSchema._expand
                  "
                >
                  <slot
                    name="__notObjItem"
                    :schema="dataItem.__dataSchema"
                    :idx="idx"
                  ></slot>
                </div>
              </template>
            </b-card>
          </b-collapse>
        </div>
      </b-card>

      <div
        v-show="!collapsed"
        class="btn-group btn-group-sm"
        v-if="!mergeConfig.disableAdd || !mergeConfig.disableDel"
      >
        <button
          @click="addItem()"
          v-if="!mergeConfig.disableAdd"
          type="button"
          class="btn btn-secondary"
        >
          {{ mergeConfig.addTxt || $nclang("add") }}
        </button>
        <button
          @click="
            delAllItems(
              mergeConfig.requiredDelConfirm,
              mergeConfig.delConfirmText.all || $nclang('delAllTips')
            )
          "
          v-if="!mergeConfig.disableDel"
          type="button"
          class="btn btn-danger btn-secondary"
        >
          {{ mergeConfig.delAllTxt || $nclang("delAll") }}
        </button>
      </div>
    </b-collapse>
  </div>
</template>

<style lang="scss">
.__array-form-item {
  & > legend {
    cursor: pointer;
  }
}
</style>

<script>
import { ncformUtils } from "@ncform/ncform-common";
import ncformCommon from "@ncform/ncform-common";

const layoutArrayMixin = ncformCommon.mixins.vue.layoutArrayMixin;

export default {
  mixins: [layoutArrayMixin],

  i18nData: {
    en: {
      add: "Add",
      delAll: "Delete All",
      delItemTips: "Are you sure to delete this item?",
      delAllTips: "Are you sure to delete all?",
      down: "Down",
      up: "Up",
      fold: "Fold",
      expand: "Expand",
      delete: "Delete"
    },
    ru: {
      add: "Добавить",
      delAll: "Удалить все",
      delItemTips: "Вы уверены что хотите удалить?",
      delAllTips: "Вы уверены что хотите удалить все?",
      down: "Вниз",
      up: "Вверх",
      fold: "Свернуть",
      expand: "Развернуть",
      delete: "Удалить"
    }
  },

  created() {
    this._supportItemsCollapse();
  },

  methods: {
    collapseItem(dataSchema) {
      dataSchema._expand = !dataSchema._expand;
    },

    _supportItemsCollapse() {
      if (!this.mergeConfig.disableItemCollapse) {
        this.schema.value.forEach(dataItem => {
          if (
            dataItem.__dataSchema &&
            dataItem.__dataSchema._expand === undefined
          )
            this.$set(
              dataItem.__dataSchema,
              "_expand",
              !this.mergeConfig.itemCollapse
            );
        });
      }
    },
    isDelExceptionRow(schema) {
      return this.mergeConfig.delExceptionRows
        ? this.mergeConfig.delExceptionRows(
            ncformUtils.getModelFromSchema(schema)
          )
        : false;
    }
  },

  watch: {
    "schema.value.length": {
      handler(newVal, oldVal) {
        if (newVal > oldVal) {
          // add item
          this._supportItemsCollapse();
        }
      }
    }
  }
};
</script>
