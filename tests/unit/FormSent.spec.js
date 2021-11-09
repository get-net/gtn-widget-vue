import { createLocalVue, shallowMount } from "@vue/test-utils";
import FormSent from "@/components/messages/FormSent";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);

const route = {
  path: "https//example.com",
  query: {}
};

const setPath = (type, lang) => {
  type === "locale"
    ? lang === "ru" || lang === "en"
      ? (route.query.locale = lang)
      : ""
    : "";
};

describe("test FormSent component", () => {
  const wrapper = shallowMount(FormSent, {
    localVue,
    mocks: { route },
    propsData: {
      counterpartyName: "someText"
    },
    data() {
      return {
        i18nData: {
          ru: {
            sent: "Форма отправлена на подтверждение",
            sentInfo: "После верификации данные для входа будут высланы на "
          },
          en: {
            sent: "The form was has been submitted for verification",
            sentInfo: "After verification login details will be sent to"
          }
        },
        locale: "en"
      };
    }
  });
  it("check layout", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".notification-content").exists()).toBe(true);
    expect(wrapper.find(".form-title").exists()).toBe(true);
    expect(wrapper.find(".set-info").exists()).toBe(true);
  });
  it("without query params + add props", async () => {
    setPath("default");
    expect(wrapper.props().counterpartyName).toBe("someText");
    expect(wrapper.vm.route.query).toEqual({});

    expect(wrapper.find(".form-title").text()).toEqual(
      wrapper.vm.$data.i18nData[wrapper.vm.$data.locale].sent
    );
    expect(wrapper.find(".set-info").text()).toEqual(
      `${wrapper.vm.$data.i18nData[wrapper.vm.$data.locale].sentInfo} ${
        wrapper.props().counterpartyName
      }.`
    );
  });
  it("with query params + add props", async () => {
    setPath("locale", "ru");
    await wrapper.setData({ locale: "ru" });
    expect(wrapper.props().counterpartyName).toBe("someText");
    expect(wrapper.vm.route.query).toEqual({ locale: "ru" });
    expect(wrapper.find(".form-title").text()).toEqual(
      wrapper.vm.$data.i18nData[wrapper.vm.$data.locale].sent
    );
    expect(wrapper.find(".set-info").text()).toEqual(
      `${wrapper.vm.$data.i18nData[wrapper.vm.$data.locale].sentInfo} ${
        wrapper.props().counterpartyName
      }.`
    );
  });
});
