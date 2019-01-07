import Vue from 'vue';
import Vue2Filters from 'vue2-filters';
import App from './App.vue';

Vue.use(Vue2Filters);

new Vue({
  el: '#app',
  render: h => h(App)
});
