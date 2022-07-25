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

/**
 * 获取用户自己信息
 * @returns
 */
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

/**
 * 获取用户个人资料
 * @returns Promise
 */
export const getProfileInfo = () => {
  return request({
    url: "/v1_0/user/profile",
  });
};

//  /v1_0/user/profile
/**
 *
 * @param {Object} data {
 *    name 昵称
 *    gender 性别，0-男，1-女
 *    birthday 生日，格式'2018-12-20'
 *    real_name 姓名
 *    intro 个人介绍
 * }
 * @returns
 */
export const editUserInfo = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data,
  });
};

/**
 *  编辑个人头像
 * @param {file} data formdata格式
 * @returns
 */
export const editUserAvator = (data) => {
  return request({
    url: "/v1_0/user/photo",
    method: "PATCH",
    data,
  });
};
