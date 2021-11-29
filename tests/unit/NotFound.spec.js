import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";
import NotFound from "@/components/messages/NotFound";

const localVue = createLocalVue();
localVue.use(VueRouter);

const route = {
  path: "/404"
};

const changeRoute = () => {
  route.path = "/layout";
};

describe("test NotFound component", () => {
  const wrapper = shallowMount(NotFound, {
    localVue,
    mocks: {
      route
    }
  });
  it("check layout", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".notification-content").exists()).toBe(true);
    expect(wrapper.find(".not-found-image").exists()).toBe(true);
    expect(wrapper.find(".go-back").exists()).toBe(true);
    expect(wrapper.find(".error-title").exists()).toBe(true);
    expect(wrapper.find("router-link-stub").exists()).toBe(true);
  });
  it("check changes route", done => {
    expect(wrapper.vm.route.path).toEqual("/404");
    expect(
      wrapper
        .find("router-link-stub")
        .trigger("click")
        .then(() => {
          changeRoute();
          expect(wrapper.vm.route.path).toEqual("/layout");
          done();
        })
    );
  });
});
