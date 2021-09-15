<template>
  <div class="ncform-bootstrap-file">
    <div v-if="fileLoaded">
      <b-input-group :class="mergeConfig.class" :size="mergeConfig.size">
        <b-form-input
          :disabled="disabled"
          :readonly="true"
          :hidden="hidden"
          :placeholder="placeholder"
          v-model="value[0].$path.name"
          autocomplete="off"
        ></b-form-input>
        <b-input-group-append>
          <b-button @click="downloadFile">
            {{ $nclang("download") }}
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-card v-if="fileIsImg(value[0].$path)">
        <img id="output" style="max-width:100%" :src="value[0].$path.src" />
      </b-card>
    </div>
    <div v-else>
      <b-form-file
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :hidden="hidden"
        v-model="modelVal"
        :class="mergeConfig.class"
        :drop-placeholder="mergeConfig.drop_placeholder"
        :multiple="mergeConfig.multiple"
        :browse-text="$nclang('browse')"
        :size="mergeConfig.size"
        :state="mergeConfig.state"
        :accept="mergeConfig.accept"
        @input="handleInput"
      ></b-form-file>
    </div>
  </div>
</template>

<script>
import ncformCommon from "@ncform/ncform-common";
import validateStateMixin from "@/mixins/validateStateMixin";
export default {
  mixins: [ncformCommon.mixins.vue.controlMixin, validateStateMixin],
  i18nData: {
    en: {
      browse: "Browse",
      download: "Download"
    },
    zh_cn: {},
    ru: {
      browse: "Выбрать",
      download: "Скачать"
    }
  },
  props: {
    value: {
      type: [Array,String],
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      modelVal: [],
      defaultConfig: {
        class: "",
        drop_placeholder: "drop file here",
        multiple: false,
        size: "md",
        state: null,
        accept: "*",
        preview: false
      },
      imageHasSrc: false
    };
  },
  computed: {
    fileLoaded() {
      if (this.value.length === 1) {
        console.log(this.value[0]);
        if (this.value[0].$path !== "") {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    handleInput(val) {
      if (!this.mergeConfig.multiple) {
        this.modelVal = [val];
        if (this.modelVal[0] === null) {
          this.modelVal = this.modelVal.pop();
        }
      }
    },
    downloadFile() {
      window.location.href = this.value[0].$path.src;
    },
    getFileExtension(name) {
      let nameSplit = name.split(".");
      let extension = nameSplit.pop();
      return extension;
    },
    fileIsImg(path) {
      let ext = this.getFileExtension(path.name);
      if (ext === "png" || ext === "jpg" || ext === "png") {
        return true;
      }
      return false;
    }
  }
};
</script>

<style></style>
