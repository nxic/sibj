<template>
  <div class="make-order-container">
    <b-form-radio-group class="order-form" id="orderType" v-model="isConditional" name="orderType" buttons>
      <b-form-radio size="sm" :value="true" button-variant="outline-info">Нөхцөлт</b-form-radio>
      <b-form-radio size="sm" :value="false" button-variant="outline-primary">Зах зээлийн</b-form-radio>
    </b-form-radio-group>
    <b-form-group v-if="isConditional" class="order-form" label="mungun dun">
      <currency-input
          placeholder="price"
          inputTitle="price"
          v-model="orderModel.price"
      ></currency-input>
    </b-form-group>
    <b-form-group class="order-form" label="too xemjee">
      <b-form-input type="number" no-wheel v-model="orderModel.amount"></b-form-input>
    </b-form-group>
    <b-form-group class="order-form" label="duration">
      <b-form-select :options="durationOption" v-model="orderModel.duration"/>
    </b-form-group>
    <b-form-group class="order-form" label="calendar" v-if="orderModel.duration === 'date'">
      <v-date-picker is-inline v-model="orderModel.date"/>
    </b-form-group>
    <b-button id="order-button-buy" class="order-button" size="lg" variant="outline-success" @click="makeOrder('buy')">Худалдан авах</b-button>
    <b-button id="order-button-sell" class="order-button" size="lg" variant="outline-danger"  @click="makeOrder('sell')">Зарах</b-button>
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
        amount: null,
        duration: 'today',
        date: new Date(),
      },
      feePercent: 0.04,
    }
  },
  mounted() {},
  methods: {
    async makeOrder(type) {
      // const date = this.orderModel.duration === 'date' ? `<tr><td>validDate</td><td>${this.$options.filters.date(this.orderInfo.validDate)}</td></tr>` : '';
      this.$swal({
        confirmButtonText: type === 'buy' ? 'Худалдан авах' : 'Зарах',
        confirmButtonColor: type === 'buy' ? '#41b882' : '#ff7674',
        icon: 'info',
        reverseButtons: true,
        html:
          `<table id="table" border="1" style="width: -webkit-fill-available;">
            <tbody>
              <tr>
                <td>symbol</td>
                <td>${this.orderInfo.symbol}</td>
              </tr>
              <tr>
                <td>amount</td>
                <td>${this.orderInfo.amount}</td>
              </tr>
              ${ this.isConditional ?
                `<tr>
                    <td>price</td>
                    <td>${this.$options.filters.currency(this.orderInfo.price, '', '₮')}</td>
                  </tr>` : '' }
              ${ this.orderInfo.duration === 'date' ?
                `<tr>
                    <td>validDate</td>
                    <td>${this.$options.filters.date(this.orderInfo.validDate)}</td>
                  </tr>
                ` : ''
              }
              <tr>
                <td>orderType</td>
                <td>${this.orderInfo.orderType}</td>
              </tr><tr>
                <td>duration</td>
                <td>${this.orderInfo.duration}</td>
              </tr>
              <tr>
                <td>totalPrice</td>
                <td>${this.$options.filters.currency(this.orderInfo.totalPrice, '', '₮')}</td>
              </tr>
              <tr>
                <td>feeAmount</td>
                <td>${this.$options.filters.currency(this.orderInfo.feeAmount, '', '₮')}</td>
              </tr>
              <tr>
                <td>supTotalPrice</td>
                <td>${this.$options.filters.currency(this.orderInfo.supTotalPrice, '', '₮')}</td>
              </tr>
            </tbody>
          </table>`
      }, async () => {
        this.isLoading = true;
        try {
          console.log(this.orderModel.type ? 'end api duudna' : 'end uur api duudna');
        } catch (e) {
          console.error(e);
        }
        this.isLoading = false;
      });
    },
  },
  computed: {
    brand() {
      return this.$store.state.brand.brand;
    },
    orderInfo() {
      return {
        symbol: this.brand.name,
        amount: this.orderModel.amount,
        price: this.orderModel.price,
        orderType: this.isConditional ? 'Нөхцөлт' : 'Зах зээлийн',
        duration: this.orderModel.duration,
        validDate: this.orderModel.duration === 'date' ? this.orderModel.date : '',
        totalPrice: this.orderModel.amount * this.orderModel.price,
        feeAmount: (this.orderModel.amount * this.orderModel.price) * this.feePercent,
        supTotalPrice: (this.orderModel.amount * this.orderModel.price) * this.feePercent + (this.orderModel.amount * this.orderModel.price),
      }
    }
  }
}
</script>

<style scoped>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

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
