/**
 * 封装 axios 请求模块
 */
import axios from "axios";

const request = axios.create({
  baseURL: "http://toutiao.itheima.net", // 基础路径
  timeout: 3000, //超时时间
});
// console.dir(request);
export default request;
