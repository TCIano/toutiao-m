//封装getitem setItem
class Storage {
  // localStorage.setItem("MY_TOKEN", JSON.stringify(payload));
  set(key, value) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
  get(key) {
    // JSON.parse(localStorage.getItem("MY_TOKEN"))
    // 如果是json字符串格式，就返回,如果不能转为js对象 就返回原数据
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}

export const storage = new Storage();
