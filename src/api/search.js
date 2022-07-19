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
