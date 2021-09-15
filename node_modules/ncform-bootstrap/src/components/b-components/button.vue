<template>
  <b-button
    :disabled="disabled"
    :readonly="readonly"
    :hidden="hidden"
    :variant="mergeConfig.variant"
    :size="mergeConfig.size"
    :class="mergeConfig.class"
    :block="mergeConfig.block"
    :title="mergeConfig.title"
    @click="onClickHandler"
  >
  {{mergeConfig.label}}
  </b-button>
</template>

<script>
import ncformCommon from "@ncform/ncform-common";
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],
  data() {
    return {
      inputVal: "",
      defaultConfig: {
        class: "",
        size: "md",
        label: "click",
        variant: "primary",
        block: false,
        title: "btn",
        btnClickAction: ""
      }
    };
  },
  methods: {
    onClickHandler() {
      this.mergeConfig.btnClickAction();
    }
  }
};
</script>

<style></style>
