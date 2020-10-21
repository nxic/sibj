import Vuex from 'vuex';
import Vue from 'vue';

import createPersistedState from 'vuex-persistedstate';

import brand from './modules/brand';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({paths: ['brand'], storage: localStorage})
  ],
  modules: {
    brand,
  },
});
