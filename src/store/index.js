import Vuex from "vuex";
import Vue from "vue";
import kyc from "@/services/kyc"
import kycClient from "@/services/kycClient"
import fileManagerApi from "@/services/fileManagerApi"
import fileManager from "@/services/fileManager"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        form: null,
        counterparty: null,
        token: null,
        unit: null,
        fileLink: null,
        details: []
    },
    getters: {
        form: state => state.form,
        counterparty: state => state.counterparty,
        token: state => state.token,
        unit: state => state.unit,
        fileLink: state => state.fileLink,
        details: state => state.details
    },
    mutations: {
        reset: () => {},
        setForm: (state, newForm) => Vue.set(state, 'form', newForm),
        setCounterparty: (state, counterparty) => Vue.set(state, 'counterparty', counterparty),
        setToken: (state, token) => Vue.set(state, 'token', token),
        setUnit: (state, unit) => Vue.set(state, 'unit', unit),
        setFileLink: (state, link) => Vue.set(state, 'fileLink', link),
        setDetails: (state, details) => Vue.set(state, 'details', details)
    },
    actions: {
        showError: (ctx, e) => {
            return e;
        },
        async getInvitationData(ctx, body) {
            return kyc.get(`/get_invite_data_third_party?code=${body.code}&client_uid=${body.client_id}`).then(({data}) =>{
                if (data) {
                    ctx.commit('setCounterparty', data.counterparty);                
                    ctx.commit('setToken', data.token.access);

                    return kyc.get(`/constructor?uid=${data.uid_form}`).then(({data}) => {
                        ctx.commit('setForm', data)
                    }).then(() => {
                        return kycClient.get("/oauth/userinfo").then(({data}) => {
                            ctx.commit('setDetails', data.counterparty.detail)
                        })
                    })
                }
            })
        },
        updateDetailData(ctx, body) {
            return kyc.post("/detail/update", body).then(({data}) => {
                if (!data.error) {
                    return true
                }
            })
        },
        userinfo(ctx) {
            
        },
        updateDetailStatus(ctx, body) {
            return kycClient.post("/profile/detail/status", body);
        },
        async uploadFileToFileManager(ctx, body) {  
            let payload = {
                name: body.name,
                chunks: 1
            }

            fileManagerApi.post("/files/add_file", payload).then(({data}) => {
                if(!data.error) {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(body)
                    reader.addEventListener("loadend", function(res) {
                        let chunk = res.target.result
                        fileManager.put("upload", chunk, {
                            headers: {
                                'X-Session-Id': data.new_file.hash,
                                'Content-Range': `bytes ${0}-${body.size-1}/${body.size}`,
                                'Content-Disposition': `attachment; filename*=UTF-8''${encodeURI(body.name)}`,
                                'Path': data.new_file.path
                            }
                        }).then((uploadData) => {
                            if (uploadData.status == 200) {
                                let updatePayload = {
                                    current_chunk: 0,
                                    loaded: true,
                                    uid: data.new_file.uid
                                }
                                fileManagerApi.put("/files/update_status_file", updatePayload).then(() =>{
                                    ctx.commit("setFileLink", data.new_file.short)
                                    body.$path = {src:data.new_file.short, name: body.name}
                                })
                            }                    
                        })
                    });
                    return data.new_file.short
                }
            })            
        },
    },
});
