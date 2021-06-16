import Vue from 'vue';
import Antd from 'ant-design-vue/es';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
// eslint-disable-next-line no-unused-vars,import/order
import erc721Contract from '@/web3/erc721Contract';

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
