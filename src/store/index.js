import Vue from "vue";
import Vuex from "vuex";
import { getToken, setToken } from "@/utils";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //存储token
    user: getToken() || {},
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      //把vuex中的token存储到token
      setToken(payload);
    },
  },
  actions: {},
  modules: {},
});
