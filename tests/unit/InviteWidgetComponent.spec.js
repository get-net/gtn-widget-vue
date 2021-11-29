import { mount } from "@vue/test-utils";
import InviteWidgetComponent from "@/widget/InviteWidgetComponent";

describe("test widget component", () => {
  it("test layout component when computed methods return some data", () => {
    const wrapper = mount(InviteWidgetComponent, {
      computed: {
        formSent() {
          return true;
        },
        counterparty() {
          return { name: "xxx" };
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".fs").exists()).toBe(true);
    // console.log(wrapper.html()); --- check 1# layout
    // оставшаяся верстка уже описана в form.spec.js
  });
  it("test layout without currentForm and computed methods", () => {
    const wrapper = mount(InviteWidgetComponent, {
      stubs: ["b-spinner"]
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".spinner").exists()).toBe(true);
    expect(wrapper.find(".css-unit-test").exists()).toBe(true);
    // console.log(wrapper.html()); --- check 2# layout
    // подгрузка
  });
});
