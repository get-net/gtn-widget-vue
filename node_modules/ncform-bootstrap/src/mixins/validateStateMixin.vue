<script>
export default {
  data() {
    return {
      validation_schema: null
    };
  },
  watch: {
    validation_schema: {
      handler(v) {
        if (v.__validationResult) {
          this.defaultConfig.state = v.__validationResult.result;
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.mergeConfig.showState && this.$parent.schema) {
      this.validation_schema = this.$parent.schema;
    }
  }
};
</script>

<style></style>
