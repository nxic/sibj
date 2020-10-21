export default {
  namespaced: true,
  state: {
    brand: {},
    brandQuery: '',
  },
  mutations: {
    setBrand(state, brand) {
      console.log(state, brand);
      if (!brand) {
        state.brand = {};
        return;
      }

      state.brand = brand;

      // TODO: USE if NECESSARY
      // state.brand = {
      //   ...state.brand,
      //   ...brand,
      // };
    },

    setBrandQuery(state, value) {
      state.brandQuery = value;
    },
  },
  getters: {
    getBrand(state) {
      return state.brand;
    },
  },
};
