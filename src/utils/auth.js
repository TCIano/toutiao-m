//author
import { storage } from "./storage";

//存储token
const TOKEN_KEY = "MY_TOKEN";
export const getToken = () => {
  return storage.get(TOKEN_KEY);
};

export const setToken = (token) => {
  storage.set(TOKEN_KEY, token);
};
export const removeToken = () => {
  storage.remove(TOKEN_KEY);
};

//存储搜索历史
const MY_HISTORY = "searchHistory";
export const getHistory = () => {
  return storage.get(MY_HISTORY);
};

export const setHistory = (history) => {
  storage.set(MY_HISTORY, history);
};

//存储文章id
const ARTICLE_ID = "articleID";
export const getArticleId = () => {
  return storage.get(ARTICLE_ID);
};

export const setArticleId = (ariticleId) => {
  storage.set(ARTICLE_ID, ariticleId);
};
