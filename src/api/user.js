//导入封装的axios模块
import request from "@/utils/request";
import store from "@/store";
//封装登录请求
/**
 *
 * @param {Object} data //手机号和验证码的集合
 * @returns Promise
 */
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

//获取验证码的请求
// /v1_0/sms/codes/:mobile
export const validateCode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

export const getUserInfo = () => {
  return request({
    url: "/v1_0/user",
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
};
