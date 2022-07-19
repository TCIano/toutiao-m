/**
 * 封装 axios 请求模块
 */
import axios from "axios";
import store from "@/store";
const request = axios.create({
  baseURL: "http://toutiao.itheima.net", // 基础路径
  timeout: 3000, //超时时间
});

// 请求拦截器
request.interceptors.request.use(
  // 每次请求的网络配置
  (config) => {
    //获取token
    const token = store.state.user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log(config);
    return config;
  },
  // 请求失败的fanhui
  (error) => {
    return Promise.reject(error);
  }
);
// console.dir(request);
export default request;
