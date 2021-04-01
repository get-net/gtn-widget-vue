import Vue from "vue";
import App from "./App.vue";
// import invitePlugin from "gtn-widget-vue"
// import invitePlugin from "../dist/gtn-widget-vue.umd"
import invitePlugin from "./widget/inviteWidgetPlugin"
Vue.use(invitePlugin)
new Vue({
    render: h => h(App),
}).$mount("#app")