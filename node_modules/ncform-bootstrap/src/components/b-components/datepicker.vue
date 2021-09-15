<template>
  <div>
    <div v-if="mergeConfig.allowInput">
      <b-input-group :class="mergeConfig.class" :size="mergeConfig.size">
        <b-form-input
          :disabled="disabled"
          :readonly="readonly"
          :hidden="hidden"
          :placeholder="placeholder"
          v-model="inputVal"
          autocomplete="off"
          :state="mergeConfig.state"
          @input="onInput"
        ></b-form-input>
        <b-input-group-append>
          <b-form-datepicker
            v-model="modelVal"
            button-only
            right
            :disabled="disabled"
            :readonly="readonly"
            :hidden="hidden"
            :locale="mergeConfig.locale"
            :min="mergeConfig.min"
            :max="mergeConfig.max"
            :state="mergeConfig.state"
            @context="onContext"
          ></b-form-datepicker>
        </b-input-group-append>
      </b-input-group>
    </div>
    <div v-else>
      <b-form-datepicker
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :hidden="hidden"
        v-model="modelVal"
        :class="mergeConfig.class"
        :size="mergeConfig.size"
        :locale="mergeConfig.locale"
        :min="mergeConfig.min"
        :max="mergeConfig.max"
        :state="mergeConfig.state"
        @context="onContext"
      ></b-form-datepicker>
    </div>
  </div>
</template>

<script>
import ncformCommon from "@ncform/ncform-common";
import validateStateMixin from "@/mixins/validateStateMixin";
import moment from 'moment/src/moment'
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin, validateStateMixin],
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      inputVal: "",
      defaultConfig: {
        size: "md",
        locale: "en",
        min: null,
        max: null,
        state: null,
        format: "YYYY-MM-DD",
        allowInput: true
      }
    };
  },
  methods: {
    _processModelVal(newVal) {
      let m = moment(newVal);
      return m.toDate().toISOString();
    },

    onContext(ctx) {
      if (ctx.selectedDate) {
        let m = moment(ctx.selectedDate);
        this.inputVal = m.format(this.mergeConfig.format);
      }
    },

    onInput() {
      if (this.inputVal.length === 10) {
        let m = moment(this.inputVal, this.mergeConfig.format);
        if (
          m.toDate() > this.mergeConfig.min ||
          m.toDate() < this.mergeConfig.max
        ) {
          this.modelVal = m.toDate();
        }
      }
    }
  },
  mounted() {
    this.defaultConfig.locale = window.__$ncform.lang;
  }
};
</script>

<style></style>
