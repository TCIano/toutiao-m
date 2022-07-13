import Vue from "vue";
import App from "./App.vue";
import "@/assets/fonts/iconfont.css";
import Vant from "vant";
import "vant/lib/index.css";
import router from "@/router/index";
// 加载全局样式
// import "./styles/index.less";

// 加载动态设置 REM 基准值
import "amfe-flexible";
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
