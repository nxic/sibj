<template>
  <div class="order-sidebar-container">
    <h6 class="text-center sticky-top sidebar-header">{{ isOrder ? 'Order History' : 'Trade History' }}</h6>
    <ul class="history-wrapper" id="menu-list">
      <li v-for="(item, i) in items" :key="i" class="history-item">
        <b-row>
          <b-col class="text-right" cols="4">{{ item.createdAt.format('hh:mm A') }}</b-col>
          <b-col class="text-center" cols="3">
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
          <b-col><b-button class="show-more-button" @click="showOrderTrDetail(item.symbol)" variant="outline-info">detail</b-button></b-col>
          <b-col class="text-center"><b-button v-if="isOrder" variant="outline-danger" size="xs"><span><i class="fas fa-trash"></i></span></b-button></b-col>
        </b-row>
      </li>
      <transition name="fade">
        <li v-show="isLoading" class="history-item spinner-wrapper justify-content-center"><span class="loading-spinner"><i class="fas fa-spinner"></i></span></li>
      </transition>
    </ul>
    <b-modal
      id="order-tr-detail-modal"
      size="lg"
      hide-footer
    >
<!--      <b-row>-->
<!--        <b-col>-->
<!--          <b-list-group flush>-->
<!--            <b-list-group-item class="text-right">asf</b-list-group-item>-->
<!--            <b-list-group-item class="text-right">asf</b-list-group-item>-->
<!--            <b-list-group-item class="text-right">asf</b-list-group-item>-->
<!--            <b-list-group-item class="text-right">asf</b-list-group-item>-->
<!--          </b-list-group>-->
<!--        </b-col>-->
<!--        <b-col>-->
<!--          <b-list-group flush>-->
<!--            <b-list-group-item class="text-left">asf</b-list-group-item>-->
<!--            <b-list-group-item class="text-left">asf</b-list-group-item>-->
<!--            <b-list-group-item class="text-left">asf</b-list-group-item>-->
<!--            <b-list-group-item class="text-left">asf</b-list-group-item>-->
<!--          </b-list-group>-->
<!--        </b-col>-->
<!--      </b-row>-->
<!--      <b-table-simple small hover outlined>-->
<!--        <b-thead>-->
<!--          <b-tr>-->
<!--            <b-th>lastPrice</b-th>-->
<!--            <b-th>lastQuantity</b-th>-->
<!--            <b-th>leavesQuantity</b-th>-->
<!--            <b-th>description</b-th>-->
<!--          </b-tr>-->
<!--        </b-thead>-->
<!--        <b-tbody>-->
<!--          <b-tr v-for="(item, i) in selectedDetail.detail" :key="i">-->
<!--            <b-td>{{ item.last_px }}</b-td>-->
<!--            <b-td>{{ item.last_qty }}</b-td>-->
<!--            <b-td>{{ item.leaves_qty }}</b-td>-->
<!--            <b-td>{{ item.text }}</b-td>-->
<!--          </b-tr>-->
<!--        </b-tbody>-->
<!--      </b-table-simple>-->
      <div class="d-flex">
        <ul class="order-detail ml-auto mr-auto">
          <li><label class="text-right">yamar exnii neg text</label><div>yamar neg utga</div></li>
          <li><label class="text-right">neg text</label><div>yamar neg utga</div></li>
          <li><label class="text-right">yamar text</label><div>yamar neg utga</div></li>
          <li><label class="text-right">yamar neg</label><div>yamar neg utga</div></li>
          <li><label class="text-right">shal uur text</label><div>yamar neg utga</div></li>
        </ul>
      </div>

    </b-modal>
  </div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';

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
      items: [],
      mockItems: [
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,41), }, ],  createdAt: moment('2020-02-10 05:20'), symbol: 'ICNFBI-0D-330', state: 'new', price: 980, amount: 19, type: 'conditional' },
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-11-10 17:40'), symbol: 'APU-0D-330', state: 'success', price: 962, amount: 46, type: 'zaxzeel' },
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-10-09 20:30'), symbol: 'GOBI-0D-330', state: 'success', price: 934, amount: 1, type: 'zaxzeel' },
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-06-06 17:20'), symbol: 'OYU-0D-330', state: 'success', price: 989, amount: 55, type: 'conditional' },
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-09-05 20:10'), symbol: 'LEND-0D-330', state: 'cancelled', price: 92, amount: 60, type: 'zaxzeel' },
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-11-05 21:50'), symbol: 'GLMT-0D-330', state: 'success', price: 94, amount: 6, type: 'conditional' },
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-10-04 13:17'), symbol: 'APPL-0D-330', state: 'new', price: 1041, amount: 18, type: 'conditional' },
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-12-03 20:23'), symbol: 'AMZN-0D-330', state: 'cancelled', price: 1151, amount: 9, type: 'zaxzeel' },
        { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-10-01 13:01'), symbol: 'TESL-0D-330', state: 'cancelled', price: 873, amount: 42, type: 'conditional' },
      ],
      selectedDetail: { detail: [ { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, { last_px: _.random(1000,5000), last_qty: _.random(10,40), leaves_qty: _.random(10,40), text: Math.random().toString(36).slice(2).slice(0,40), }, ],  createdAt: moment('2020-02-10 05:20'), symbol: 'ICNFBI-0D-330', state: 'new', price: 980, amount: 19, type: 'conditional' },
    };
  },
  mounted() {
    const elm = document.querySelector('#menu-list');
    elm.addEventListener('scroll', () => { if(elm.scrollTop + elm.clientHeight >= elm.scrollHeight) this.getHistories(); });
    this.getHistories();
    this.$bvModal.show('order-tr-detail-modal');
  },
  beforeDestroy() {
    const elm = document.querySelector('#menu-list');
    elm.removeEventListener('scroll', () => {});
  },
  methods: {
    showOrderTrDetail(symbol) {
      this.selectedDetail = this.items.find(x => x.symbol === symbol);
      this.$bvModal.show('order-tr-detail-modal');
    },
    async getHistories() {
      this.isLoading = true;
      setTimeout(() => {
        this.items.push(...this.mockItems);
        this.isLoading = false;
      }, 1000);
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

  /* TODO: ene header-n arduur il garch baigaag yanzlax scroll-doj baigaa li-element shu */
  .sidebar-header {
    background: white;
    position: sticky;
    top: 0;
    z-index: 100;
  }


  .loading-mask {
    width: 460px;
    height: calc(100vh - 65px) !important;
  }

  /* TODO: eniig barag main.scss-ruu oruulsan deer baix oo */
  .spinner-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .loading-spinner {
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .history-wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 110px) !important;
    width: auto;
  }

  .history-item {
    list-style: none;
    border: 1px dashed green;
    margin: .1rem 0 .1rem -40px;
    /*margin: .1rem 0 .1rem 0;*/
    padding: .625rem 0 .625rem 0;
    width: inherit;
  }

  .history-item:last-child {
    margin-bottom: 2rem;
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

  .order-detail {
    display: table;
    list-style: none;
    padding-left: 0;
    line-height: .235rem;
  }

  .order-detail > li {
    display: table-row;
  }

  .order-detail > li > * {
    display: table-cell;
    padding: .625rem;
  }

  .order-detail label:after {
    content: ':';
  }



  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: white;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
  ::-webkit-scrollbar-corner {
    background-color: rgba(0,0,0,0);
  }
</style>

