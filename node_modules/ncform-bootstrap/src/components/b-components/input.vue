<template>
  <div class="ncform-bootstrap-input">
    <b-input-group :size="mergeConfig.size">
      <template #append v-if="mergeConfig.appendIcon">
        <b-input-group-text>
          <b-icon :icon="mergeConfig.appendIcon"></b-icon>
        </b-input-group-text>
      </template>
      <template #prepend v-if="mergeConfig.prependIcon">
        <b-input-group-text>
          <b-icon :icon="mergeConfig.prependIcon"></b-icon>
        </b-input-group-text>
      </template>

      <b-input
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :hidden="hidden"
        :pattern="mergeConfig.pattern"
        v-show="!hidden"
        :class="mergeConfig.class"
        :size="mergeConfig.size"
        :state="mergeConfig.state"
        :type="mergeConfig.type"
        @blur="onBlur"
        v-model="modelVal"
      >
      </b-input>
    </b-input-group>
  </div>
</template>

<script>
import ncformCommon from "@ncform/ncform-common";
import validateStateMixin from "@/mixins/validateStateMixin";
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin, validateStateMixin],

  data() {
    return {
      inputVal: "",
      defaultConfig: {
        appendIcon: null,
        prependIcon: null,
        trim: false,
        size: "md",
        pattern: null,
        state: null
      },
    };
  },
  methods: {
    _processModelVal(modelVal) {
      let val = modelVal;
      if (this.mergeConfig.trim) {
        val = val ? modelVal.toString().trim() : val;
      }

      switch (this.mergeConfig.type) {
        case "number":
          val = parseFloat(val);
          val = isNaN(val) ? "" : val;
          break;
        case "integer":
          val = parseInt(val);
          val = isNaN(val) ? "" : val;
          break;
        default:
          break;
      }
      return val;
    },
    onBlur() {
      if (this.mergeConfig.updateOn === "blur") {
        let val = this._processModelVal();
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style></style>
