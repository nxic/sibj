import Vue from 'vue';
import _ from 'lodash';
import moment from 'moment';
import App from './App.vue';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2, {
  confirmButtonColor: '#41b882',
  // cancelButtonColor: '#ff7674',
  confirmButtonText: '',
  // cancelButtonText: 'no',
  showCancelButton: false,
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


Vue.filter('currency', (value, options, symbol = '') => {
  try {
    switch (options) {
      case 'round':
        return `${parseFloat(_.round(value, 2)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${symbol}`;
      case 'integer':
        return `${parseFloat(_.round(value, 2)).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${symbol}`;
      default:
        return `${parseFloat(_.ceil(value, 2)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}${symbol}`;
    }
  } catch (e) {
    console.error(e);
    return value;
  }
});

Vue.filter('date', (value) => {
  try {
    return moment(value).format('YYYY-MM-DD HH:MM:ss');
  } catch (e) {
    console.error(e);
    return value;
  }
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
