import Vue from "vue";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import router from "@/router/index";
// 加载全局样式
import "./styles/index.less";
import "@/assets/fonts/iconfont.css";
import store from "./store";
// 加载动态设置 REM 基准值
import "amfe-flexible";
Vue.use(Vant);
Vue.config.productionTip = false;
import dayjs from "@/utils/dayjs";
Vue.filter("dateFilter", (date) => {
  return dayjs(date).fromNow();
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
