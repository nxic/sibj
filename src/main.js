import Vue from 'vue'
import App from './App.vue'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2, {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  confirmButtonText: 'yes',
  cancelButtonText: 'no',
  showCancelButton: true,
  showConfirmButton: true,
  title: 'order',
});
Vue.use(BootstrapVue);
Vue.use(VCalendar, {
  componentPrefix: 'v',
  locales: {
    'en-US': {
      firstDayOfWeek: 2,
      masks: {
        L: 'YYYY-MM-DD',
      },
    }
  }
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
