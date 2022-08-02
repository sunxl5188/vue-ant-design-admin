import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementUI from "./assets/js/elementui";
import Antd from "./assets/js/antdesign";
import "./assets/css/main.scss";

Vue.config.productionTip = false;
Vue.use(elementUI);
Vue.use(Antd);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
