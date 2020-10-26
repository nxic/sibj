<template>
  <div class="order-sidebar-container">
    <h6 class="text-center sticky-top sidebar-header">{{ isOrder ? 'Order History' : 'Trade History' }}</h6>
    <div v-for="(item, i) in mockItems" :key="i" class="history-item">
      <b-row>
        <b-col class="text-right" cols="4">{{ item.createdAt.format('hh:mm A') }}</b-col>
        <b-col>
          <h5>{{ toSymbolName(item.symbol) }}</h5>
        </b-col>
        <b-col>
          <!-- TODO: enenii state-g uur ymaar irexeer end ni condition-g ni solix -->
          <b-badge class="state-badge" v-if="item.state === 'new'" pill variant="primary">Шинэ</b-badge>
          <b-badge class="state-badge" v-if="item.state === 'cancelled'" pill variant="danger">Цуцалсан</b-badge>
          <b-badge class="state-badge" v-if="item.state === 'success'" pill variant="success">Биелсан</b-badge>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right" cols="4">{{ item.createdAt.format('YY/MM/DD') }}</b-col>
        <b-col cols="8">{{ item.price | currency('', '₮') }} x {{ item.amount | amount }}</b-col>
      </b-row>
      <b-row>
        <b-col class="text-right"><b-badge :variant="item.type === 'conditional' ? 'info' : 'dark'">{{ item.type }}</b-badge></b-col>
        <b-col><b-button class="show-more-button" variant="outline-info">detail</b-button></b-col>
        <b-col class="text-center"><b-button v-if="isOrder" variant="outline-danger" size="xs"><span><i class="fas fa-trash"></i></span></b-button></b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'OrderTradeHistory',
  props: {
    isOrder: {
      required: false,
      type: Boolean
    }
  },
  data() {
    return {
      isLoading: false,
      mockItems: [
        { createdAt: moment('2020-02-10 05:20'), symbol: 'ICNFBI-0D-330', state: 'new', price: 980, amount: 19, type: 'conditional' },
        { createdAt: moment('2020-11-10 17:40'), symbol: 'APU-0D-330', state: 'success', price: 962, amount: 46, type: 'zaxzeel' },
        { createdAt: moment('2020-10-09 20:30'), symbol: 'GOBI-0D-330', state: 'success', price: 934, amount: 1, type: 'zaxzeel' },
        { createdAt: moment('2020-06-06 17:20'), symbol: 'OYU-0D-330', state: 'success', price: 989, amount: 55, type: 'conditional' },
        { createdAt: moment('2020-09-05 20:10'), symbol: 'LEND-0D-330', state: 'cancelled', price: 92, amount: 60, type: 'zaxzeel' },
        { createdAt: moment('2020-11-05 21:50'), symbol: 'GLMT-0D-330', state: 'success', price: 94, amount: 6, type: 'conditional' },
        { createdAt: moment('2020-10-04 13:17'), symbol: 'APPL-0D-330', state: 'new', price: 1041, amount: 18, type: 'conditional' },
        { createdAt: moment('2020-12-03 20:23'), symbol: 'AMZN-0D-330', state: 'cancelled', price: 1151, amount: 9, type: 'zaxzeel' },
        { createdAt: moment('2020-10-01 13:01'), symbol: 'TESL-0D-330', state: 'cancelled', price: 873, amount: 42, type: 'conditional' },
      ]
    };
  },
  mounted() {
    console.log('order history mounted');
  },
  methods: {
    meth() {
      console.log('meth called');
    },
    toSymbolName(symbol) {
      if (!symbol) return;
      const chars = symbol.split('');
      return chars.splice(0, chars.findIndex(x => x === '-')).join('').toString();
    },
  },
}
</script>

<style scoped>
  .order-sidebar-container {
    padding: 0;
    /*border: 1px dashed indigo;*/
  }

  /* TODO: ene header-n arduur il garch baigaag yanzlax */
  .sidebar-header {
    background: white;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .history-item {
    border: 1px dashed green;
    margin-top: .625rem;
    margin-bottom: 0.625rem;
    padding-bottom: 0.625rem;
    /*margin: 0.625rem;*/
  }

  /* TODO: main.scss-ruu oruulax */
  .btn-xs {
    padding  : .25rem .4rem;
    font-size  : .875rem;
    line-height  : .5;
    border-radius : .2rem;
  }

  .show-more-button {
    padding  : .25rem .4rem;
    font-size  : .875rem;
    line-height  : 1;
    border-radius : .2rem;
    width: 100%;
  }

  .state-badge {
    font-size: 0.7rem;
    line-height: 1.2rem;
    width: 4rem;
  }
</style>

