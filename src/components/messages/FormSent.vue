<template>
    <div class="notification-content" style="margin-top: 20%;">
        <h1 class="mt-3 font-weight-bold text-center">{{i18nData[locale].sent}}</h1>
        <div>
            <p class="text-center">
                {{i18nData[locale].sentInfo}} {{counterpartyName}}.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "TemplateSent",
    props: ["counterpartyName"],
    data() {
        return {
            i18nData: {
                ru: {
                    sent: "Форма отправлена на подтверждение",
                    sentInfo: "После верификации данные для входа будут высланы на "
                },
                en: {
                    sent: "The form was has been submitted for verification",
                    sentInfo: "After verification login details wiil be sent to"
                }
            },
            locale: "en",
        }  
    },
    mounted() {
        const params = new URLSearchParams(window.location.search)
        if (params.has('locale')) {
            window.__$ncform.lang = params.get('locale')
            this.locale = params.get('locale')
        }
    }
}
</script>

<style>
</style>