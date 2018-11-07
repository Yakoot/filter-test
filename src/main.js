import Vue from 'vue'
import App from './App.vue'
// import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faAngleDown)

// Vue.use(BootstrapVue)
Vue.component('v-select', vSelect)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
