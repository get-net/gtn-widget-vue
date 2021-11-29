<template>
  <div v-if="formSent" class="fs">
    <form-sent :counterpartyName="counterparty.name" />
  </div>
  <div v-else>
    <div v-if="currentForm" class="cf">
      <b-card v-for="section in currentForm.sections" :key="section.id">
        <b-row>
          <h2>{{ section.legend }}</h2>
        </b-row>
        <b-row v-for="detailtype in section.detailtypes" :key="detailtype.id">
          <ncform
            :form-schema="detailtype.data"
            :form-name="detailtype.uid"
            style="width:100%"
            @change="onFormChange(detailtype)"
            v-model="detailtype.value"
          />
        </b-row>
      </b-card>
      <b-card>
        <b-row>
          <b-button @click="onSendFormClick">
            {{ i18nData[locale].submit }}
          </b-button>
        </b-row>
      </b-card>
    </div>
    <div v-else class="spinner">
      <utils-loader></utils-loader>
    </div>
  </div>
</template>

<script>
import store from "../store";
import UtilsLoader from "../components/utils/UtilsLoader.vue";
import FormSent from "../components/messages/FormSent.vue";
import constructorHelper from "../utils/constructorHelper.js";
import { debounce } from "lodash";
export default {
  components: {
    UtilsLoader,
    FormSent
  },

  props: ["client"],

  data() {
    return {
      i18nData: {
        ru: {
          submit: "Отправить"
        },
        en: {
          submit: "Send"
        }
      },
      locale: "en",
      currentForm: null
    };
  },

  computed: {
    counterparty() {
      return store.getters["counterparty"];
    },
    formSent() {
      return store.getters["formSent"];
    }
  },

  methods: {
    onFormChange(detailtype) {
      this.debouncedUpdate(detailtype);
    },

    onSendFormClick() {
      let promises = [];
      this.currentForm.sections.forEach(section => {
        section.detailtypes.forEach(detailtype => {
          let promise = new Promise(resolve => {
            this.$ncformValidate(detailtype.uid).then(res => {
              resolve(res);
            });
          });
          promises.push(promise);
        });
      });

      Promise.all(promises).then(data => {
        let validationPassed = data.every(el => {
          return el.result === true;
        });
        if (validationPassed) {
          this.saveFiles();

          let body = {
            uid: store.getters["inviteFormUid"],
            sid_status: "new"
          };
          store.dispatch("updateInviteFormStatus", body);
          store.commit("formSent", true);
        }
      });
    },

    onFormUpdate(detailtype) {
      let body = {
        uid: detailtype.uid_detail,
        data: JSON.stringify(detailtype.value),
        counterparty: this.counterparty.uid,
        detailtype: detailtype.uid,
        force: true
      };
      store.dispatch("updateDetailData", body);
    },

    async saveFiles() {
      this.currentForm.sections.forEach(section => {
        section.detailtypes.forEach(detailtype => {
          Object.entries(detailtype.value).forEach(async value => {
            if (value[1] instanceof Array) {
              if (value[1][0] instanceof File) {
                await store.dispatch("uploadFileToFileManager", value[1][0]);
              }
            }
          });
        });
      });
    }
  },

  created: function() {
    this.debouncedUpdate = debounce(this.onFormUpdate, 600);
  },

  async mounted() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("locale")) {
      window.__$ncform.lang = params.get("locale");
      this.locale = params.get("locale");
    }

    if (params.get("code") && this.client) {
      await store.dispatch("getInvitationData", {
        code: params.get("code"),
        client_id: this.client
      });

      let form = store.getters["form"];
      if (form) {
        form.sections.forEach(section => {
          // eslint-disable-next-line no-unused-vars
          section.detailtypes.forEach(detailtype => {
            detailtype = constructorHelper.parseDetailtype(detailtype);
          });
        });
        this.currentForm = form;

        let details = store.getters["details"];
        if (details) {
          form.sections.forEach(section => {
            section.detailtypes.forEach(detailtype => {
              let detail = details.find(d => {
                return d.name === detailtype.name;
              });
              detailtype.uid_detail = detail.uid;
              detailtype.value = detail.data;
            });
          });
        }
      }
    }
  }
};
</script>

<style lang="scss">
.spinner {
  margin-top: 20%;
}
@import "../assets/scss/style.scss";
@import "~bootstrap-vue/src/index.scss";
</style>
