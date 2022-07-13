//导入封装的axios模块
import request from "@/utils/request";
//封装登录请求
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