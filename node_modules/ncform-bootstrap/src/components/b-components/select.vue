<template>
  <b-form-select
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    :hidden="hidden"
    v-model="modelVal"
    :options="mergeConfig.options"
    :multiple="mergeConfig.multiple"
    :select-size="mergeConfig.select_size"
    :class="mergeConfig.class"
    :size="mergeConfig.size"
    :state="mergeConfig.state"
  >
  </b-form-select>
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
        options: "",
        mutiple: "",
        select_size: 1,
        size: "md",
        state: null
      }
    };
  }
};
</script>

<style></style>
