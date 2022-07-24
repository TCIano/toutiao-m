import Vue from "vue";
import Vuex from "vuex";
import {
  getArticleId,
  getHistory,
  getToken,
  setArticleId,
  setHistory,
  setToken,
  getfollowedId,
  setfollowedId,
  removefollowedID,
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
    //被关注用户id
    followedId: getfollowedId() || [],
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
        state.searchHistory.unshift(payload);
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
    setfollowedId(state, payload) {
      state.followedId.push(payload);
      setfollowedId(state.followedId);
    },
    removefollowedID(state, payload) {
      const index = state.followedId.findIndex((item) => {
        return (item = payload);
      });
      state.followedId.splice(index, 1);
    },
  },
  actions: {},
  modules: {},
});
