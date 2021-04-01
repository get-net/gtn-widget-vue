import Vuex from "vuex";
import Vue from "vue";
import kyc from "@/services/kyc"
import kycClient from "@/services/kycClient"
import fileManagerApi from "@/services/fileManagerApi"
import fileManager from "@/services/fileManager"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        template: null,
        counterparty: null,
        token: null,
        unit: null,
        fileLink: null,
    },
    getters: {
        template: state => state.template,
        counterparty: state => state.counterparty,
        token: state => state.token,
        unit: state => state.unit,
        fileLink: state => state.fileLink
    },
    mutations: {
        reset: () => {},
        setTemplate: (state, newTemplate) => Vue.set(state, 'template', newTemplate),
        setCounterparty: (state, counterparty) => Vue.set(state, 'counterparty', counterparty),
        setToken: (state, token) => Vue.set(state, 'token', token),
        setUnit: (state, unit) => Vue.set(state, 'unit', unit),
        setFileLink: (state, link) => Vue.set(state, 'fileLink', link)
    },
    actions: {
        showError: (ctx, e) => {
            return e;
        },
        getInvitationData(ctx, body) {
            return kyc.get(`/get_detailtype?code=${body.code}&client_uid=${body.client_id}`).then(({data}) =>{
                if (data) {
                    let parsed_detail = JSON.parse(data.detailtype.data)
                    if (!Array.isArray(parsed_detail)) {
                        data.detailtype.data = [parsed_detail]
                    } else {
                        data.detailtype.data = parsed_detail
                    }
                    ctx.commit('setCounterparty', data.counterparty)
                    ctx.commit('setTemplate', data.detailtype);
                    ctx.commit('setToken', data.token.access);
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
