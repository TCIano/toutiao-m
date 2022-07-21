import Vue from "vue";
import Vuex from "vuex";
import {
  getArticleId,
  getHistory,
  getToken,
  setArticleId,
  setHistory,
  setToken,
} from "@/utils";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //存储token
    user: getToken() || {},
    //搜索历史
    searchHistory: getHistory() || [],
    //当前文章id
    articleId: getArticleId() || "",
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      //把vuex中的token存储到token
      setToken(payload);
    },
    setSearchHistory(state, payload) {
      if (state.searchHistory.indexOf(payload) === -1) {
        state.searchHistory.push(payload);
        setHistory(state.searchHistory);
      }
    },
    removeSearchHistory(state) {
      state.searchHistory = [];
    },
    setArticleId(state, payload) {
      state.articleId = payload;
      setArticleId(payload);
    },
  },
  actions: {},
  modules: {},
});
