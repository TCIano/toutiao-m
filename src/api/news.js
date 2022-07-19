import request from "@/utils/request";

/**
 *
 * @param {String} channel_id ID
 * @param {String} timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * 上一文章列表传递pre_timestamp
 * @returns
 */
export const getArticleList = (channel_id, timestamp) => {
  return request({
    url: "/v1_0/articles",
    params: {
      channel_id,
      timestamp,
    },
  });
};
