<template>
  <b-form-textarea
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    :hidden="hidden"
    v-model="modelVal"
    :pattern="mergeConfig.pattern"
    v-show="!hidden"
    :clearable="mergeConfig.clearable"
    :class="mergeConfig.class"
    :rows="mergeConfig.rows"
    :max-rows="mergeConfig.max_rows"
    :size="mergeConfig.size"
    :no-resize="mergeConfig.no_resize"
    :state="mergeConfig.state"
  >
  </b-form-textarea>
</template>

<script>
import ncformCommon from "@ncform/ncform-common";
import validateStateMixin from "@/mixins/validateStateMixin";
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin, validateStateMixin],
  data() {
    return {
      inputVal: [],
      defaultConfig: {
        clearable: true,
        pattern: "",
        rows: 4,
        max_rows: null,
        size: "md",
        no_resize: false,
        state: null
      }
    };
  }
};
</script>

<style></style>
