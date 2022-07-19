import request from "@/utils/request";
import { storage } from "@/utils/storage";
/**
 * 获取用户频道
 * @returns
 */
export const getUserChannel = () => {
  return request({
    url: "/v1_0/user/channels",
  });
};

/**
 * 获取所有频道列表
 * @returns
 */
export const getAllChannels = () => {
  return request({
    url: "/v1_0/channels",
  });
};

/**
 * 删除用户频道
 * @param {String|Number} target 频道id
 * @returns
 */
export const delChannel = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/channels/${target}`,
  });
};

/**
 * 添加频道
 * @param {String|Number} id
 * @param {Number} seq
 * @returns
 */
export const addChannel = (id, seq) => {
  return request({
    url: "/v1_0/user/channels",
    method: "PATCH",
    data: {
      channels: [{ id, seq }],
    },
  });
};

//封装持久化存储频道
const TOU_TIAO_CHANNELS = "TOUTIAO_CHANNELS";
export const getChannelsFromLocal = () => storage.get(TOU_TIAO_CHANNELS);

export const setChannelstoLocal = (channels) =>
  storage.set(TOU_TIAO_CHANNELS, channels);
