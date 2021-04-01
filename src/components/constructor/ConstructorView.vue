<template>
    <div v-if="!formSent">
       <b-card v-for="item in template" v-bind:key="item.id">
            <ncform
                :form-schema="item"
                :form-name="item.id"
                v-model="item.value"
            ></ncform>
        </b-card>
        <b-card>
            <b-row>
                <b-button @click="onSendFormClick">
                    {{i18nData[locale].submit}}
                </b-button>
            </b-row>
        </b-card>
    </div>
    <div v-else class="notification-content" style="margin-top: 20%;">
        <h1 class="mt-3 font-weight-bold text-center">Форма отправлена на подтверждение</h1>
        <div>
            <p class="text-center">
                После верификации данные для входа будут высланы на {{counterparty.name}}.
            </p>
        </div>
    </div>
</template>

<script>
import * as debounce from 'lodash/debounce';
import store from "../../store"
export default {
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
            formSent: false,
        }   
    },
    props: ['template'],
    computed: {
        counterparty() {
            return store.getters['counterparty']
        },
        currentTemplate() {
            return store.getters['template']
        },
        fileLink() {
            return store.getters['fileLink']
        }
    },
    watch: {
        template: {
            deep: true,
            handler() {
                this.debouncedUpdate();     
            }
        },
    },

    methods: {
        onSendFormClick() {
            let promises = []
            this.template.forEach(item => {
                let promise = new Promise(resolve => {
                    this.$ncformValidate(item.id).then(res => {
                        resolve(res)
                    })
                })
                promises.push(promise)
            })

            Promise.all(promises).then(data => {
                let validationPassed = data.every(el => {
                    return el.result === true
                })
                if(validationPassed) {
                    this.saveFiles()
                    let body = {
                        detail: this.currentTemplate.uid,
                        status: "new"
                    }
                    store.dispatch("updateDetailStatus", body).then(data => {
                        if (!data.error) {
                            this.formSent = true;
                        }                      
                    })     
                }
            })  
        },
        onFormUpdate() {
            
            let body = {
                uid: this.currentTemplate.uid,
                data: JSON.stringify(this.template),
                force: true
            }
            store.dispatch("updateDetailData", body)
        },
        saveFiles() {
            this.template.forEach(item => {
                Object.entries(item.value).forEach(entry => {
                    if (entry[1] instanceof Array) {
                        if (entry[1][0] instanceof File)  {
                            store.dispatch("uploadFileToFileManager", entry[1][0])           
                        }      
                    }
                })
            })
        }
    },
    mounted() {
    const params = new URLSearchParams(window.location.search)
        if (params.has('locale')) {
            this.locale = params.get('locale')
        }
    },
    created: function () {
        this.debouncedUpdate = debounce(this.onFormUpdate, 2500)
    },
}
</script>
   
<style>

</style>