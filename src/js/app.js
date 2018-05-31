require('bootstrap');
import Vue from 'vue/dist/vue.js';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

new Vue({
  el: '#title',
  data: {
    message: 'Webpack-Scaffold'
  }
});