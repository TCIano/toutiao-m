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

/**
 * 对用户进行关注
 * @param {String} target 关注用户的id
 * @returns
 */
export const following = (target) => {
  return request({
    url: "/v1_0/user/followings",
    method: "POST",
    data: {
      target,
    },
  });
};

/**
 * 取消对用户的关注
 * @param {String} target 取消关注的id
 * @returns
 */
export const unFollowing = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${target}`,
  });
};
