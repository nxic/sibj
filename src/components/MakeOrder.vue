<template>
  <div class="make-order-container">
    <div>brandSymbol</div>
    <b-form-radio-group class="order-form" id="orderType" v-model="isConditional" name="orderType" buttons>
      <b-form-radio size="sm" :value="true" button-variant="outline-info">Нөхцөлт</b-form-radio>
      <b-form-radio size="sm" :value="false" button-variant="outline-primary">Зах зээлийн</b-form-radio>
    </b-form-radio-group>
    <b-form-group class="order-form" label="mungun dun">
      <b-form-input type="number" no-wheel v-model="orderModel.price"></b-form-input>
    </b-form-group>
    <b-form-group class="order-form" label="too xemjee">
      <b-form-input type="number" no-wheel v-model="orderModel.amount"></b-form-input>
    </b-form-group>
    <b-form-group class="order-form" label="duration">
      <b-form-select :options="durationOption" v-model="orderModel.duration"/>
    </b-form-group>
    <b-form-group class="order-form" label="calendar" v-if="orderModel.duration === 'date'">
      <v-date-picker is-inline v-model="orderModel.date" :input-props="{ placeholder: 'ognoog oruulna uu' }"/>
    </b-form-group>
    <b-button id="order-button-buy" class="order-button" size="lg" variant="outline-success" @click="makeOrder('buy')">BUY</b-button>
    <b-button id="order-button-sell" class="order-button" size="lg" variant="outline-danger"  @click="makeOrder('sell')">SELL</b-button>
  </div>
</template>

<script>
// eslint-disable-next-line
import _ from 'lodash';

export default {
  name: 'MakeOrder',
  data() {
    return {
      isLoading: false,
      isConditional: false,
      durationOption: [
        { value: 'today', text: 'today' },
        { value: 'week', text: 'week' },
        { value: 'date', text: 'date' },
      ],
      orderModel: {
        price: 0,
        amount: 0,
        duration: 'today',
        date: new Date(),
      },
      mockOrderInfo: {
        symbol: 'ICNFBI',
        amount: 30000,
        price: 20000,
        validDate: new Date(),
        orderType: 'fucked fixed',
        duration: 'tomorrow',
        totalPrice: 999999999,
        feeAmount: 9999999,
        supTotalPrice: 999999,
        // totalPrice: this.mockOrderInfo.amount * this.mockOrderInfo.price,
        // feeAmount: this.mockOrderInfo.totalPrice * 0.1,
        // supTotalPrice: this.mockOrderInfo.totalPrice + this.mockOrderInfo.feeAmount,
      }
    }
  },
  mounted() {
    console.log('make order mounted');
  },
  methods: {
    async makeOrder() {
      this.$swal({ html: `<table id="table" border="1"><tbody><tr><td>symbol</td><td>${this.mockOrderInfo.symbol}</td></tr><tr><td>amount</td><td>${this.mockOrderInfo.amount}</td></tr><tr><td>price</td><td>${this.mockOrderInfo.price}</td></tr><tr><td>validDate</td><td>${this.mockOrderInfo.validDate}</td></tr><tr><td>orderType</td><td>${this.mockOrderInfo.orderType}</td></tr><tr><td>duration</td><td>${this.mockOrderInfo.duration}</td></tr><tr><td>totalPrice</td><td>${this.mockOrderInfo.totalPrice}</td></tr><tr><td>feeAmount</td><td>${this.mockOrderInfo.feeAmount}</td></tr><tr><td>supTotalPrice</td><td>${this.mockOrderInfo.supTotalPrice}</td></tr></tbody></table>`}); this.isLoading = true;
      try {
        console.log('end api duudna');
      } catch (e) {
        console.error(e);
      }
      this.isLoading = false;
    },
  },
  computed: {
    brand() {
      return this.$store.state.brand.brand;
    },
    orderInfo() {
      return ``
    }
  }
}
</script>

<style scoped>
  .make-order-container {
    padding: .625rem;
  }

  .order-form {
    margin-bottom: 0.5rem;
  }

  .order-button {
    display: block;
    height: 6rem;
    width: 100%;
    margin-bottom: 0.5rem;
    /*flex: 0 0 100%;*/
    /*flex-direction: column;*/
  }
</style>
