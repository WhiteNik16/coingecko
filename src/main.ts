import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import VueApexCharts from 'vue-apexcharts'


Vue.config.productionTip = false;
Vue.use(VueApexCharts)
Vue.use(Antd);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
