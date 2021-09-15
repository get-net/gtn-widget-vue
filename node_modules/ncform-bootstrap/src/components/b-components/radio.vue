<template>
  <div>
    <b-form-group v-slot="{ ariaDescribedby }" :class="mergeConfig.class">
      <div v-if="mergeConfig.options">
        <b-form-radio-group
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          :hidden="hidden"
          v-model="modelVal"
          :options="mergeConfig.options"
          :aria-describedby="ariaDescribedby"
          :name="mergeConfig.name"
          :size="mergeConfig.size"
          :stacked="mergeConfig.stacked"
        ></b-form-radio-group>
      </div>
      <div v-else>
        <b-form-radio
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          :hidden="hidden"
          v-model="modelVal"
          :aria-describedby="ariaDescribedby"
          :value="true"
          :size="mergeConfig.size"
          >{{ $nclang("yes") }}</b-form-radio
        >
        <b-form-radio
          :disabled="disabled"
          :readonly="readonly"
          :placeholder="placeholder"
          :hidden="hidden"
          v-model="modelVal"
          :aria-describedby="ariaDescribedby"
          :value="false"
          :size="mergeConfig.size"
          >{{ $nclang("no") }}</b-form-radio
        >
      </div>
    </b-form-group>
  </div>
</template>

<script>
import ncformCommon from "@ncform/ncform-common";
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin],
  i18nData: {
    en: {
      yes: "Yes",
      no: "No"
    },
    ru: {
      yes: "Да",
      no: "Нет"
    }
  },
  data() {
    return {
      selected: "",
      defaultConfig: {
        size: "md",
        options: null,
        name: "radios",
        stacked: false
      }
    };
  }
};
</script>

<style></style>
