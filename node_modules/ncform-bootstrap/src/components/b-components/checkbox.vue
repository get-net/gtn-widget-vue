<template>
  <div v-if="mergeConfig.options">
      <b-form-checkbox-group
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        v-model="modelVal"
        :options="mergeConfig.options"
        :name="mergeConfig.name"
        :size="mergeConfig.size"
        :stacked="mergeConfig.stacked"
      ></b-form-checkbox-group>
  </div>
  <div v-else>
    <b-form-checkbox
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :hidden="hidden"
      v-model="modelVal"
      :name="mergeConfig.name"
      :size="mergeConfig.size"
      :class="mergeConfig.class"
    >
    </b-form-checkbox>
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
        size: "md",
        name: "",
        stacked: false
      }
    };
  }
};
</script>

<style></style>
