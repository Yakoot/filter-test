import Vue from 'vue'
import App from './App.vue'
// import BootstrapVue from 'bootstrap-vue'

import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: { 
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: Infinity
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
