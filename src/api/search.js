import request from "@/utils/request";

/**
 *  根据输入关键字获取搜索建议
 * @param {String} q 输入的关键字
 * @returns
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

/**
 *
 * @param {Number} page 页数
 * @param {Number} per_page 每页数量
 * @param {String} q  搜索关键词
 * @returns
 */
export const getSearchResults = (page, per_page, q) => {
  return request({
    url: "/v1_0/search",
    params: {
      page,
      per_page,
      q,
    },
  });
};
