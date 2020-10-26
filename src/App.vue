<template>
  <div id="app">
    <b-container fluid class="p-0">
      <top-bar></top-bar>
      <b-nav vertical class="sidebar">
        <span class="mt-3">
          <li class="nav-item sidebar-item">
            <b-button size="lg" variant="outline-info" class="sidebar-button text-center" @click="toggleSideSubMenu('orderHistory')">
              <i class="fas fa-user btn-icon"></i><span class="btn-txt">Order History</span>
            </b-button>
          </li>
          <li class="nav-item sidebar-item">
            <b-button size="lg" variant="outline-info" class="sidebar-button text-center" @click="toggleSideSubMenu('tradeHistory')">
              <i class="fas fa-user btn-icon"></i><span class="btn-txt">Trade History</span>
            </b-button>
          </li>
        </span>
      </b-nav>
      <div class="main-container">
        <main>
          <transition name="slide">
            <div class="sidebar-submenu" v-if="openedSideSubMenu">
              <order-trade-history is-order v-if="menuType === 'orderHistory'"></order-trade-history>
              <order-trade-history v-if="menuType === 'tradeHistory'"></order-trade-history>
            </div>
          </transition>
          <div class="main-graph">
            <b-card v-if="brand && brand.id" header-tag="header">
              <h3 slot="header">selected-brand</h3>
<!--              <b-table-simple v-if="favoriteBrands && favoriteBrands.length" small bordered outlined hover striped>-->
<!--                <b-thead>-->
<!--                  <b-tr>-->
<!--                    <b-th>logo</b-th>-->
<!--                    <b-th>name</b-th>-->
<!--                    <b-th>action</b-th>-->
<!--                  </b-tr>-->
<!--                </b-thead>-->
<!--                <b-tbody>-->
<!--                  <b-tr v-for="(item, i) in favoriteBrands" :key="i">-->
<!--                    <b-td>{{ i + 1 }}</b-td>-->
<!--                    <b-td>{{ item.name }}</b-td>-->
<!--                    <b-td>-->
<!--                      <b-button size="sm"><span><i class="fas fa-times"></i></span></b-button>-->
<!--                    </b-td>-->
<!--                  </b-tr>-->
<!--                </b-tbody>-->
<!--              </b-table-simple>-->
              <pre>{{ brand }}</pre>
            </b-card>
            <b-card class="text-center mt-3">
              <label>graphics here hehehehehehehehehehehehehehehe</label>
              <div class="graph-container"></div>
            </b-card>
          </div>
          <div class="trade-actions">
            <make-order></make-order>
          </div>
        </main>
      </div>
<!--        <div id="chart"></div>-->
    </b-container>
  </div>
</template>

<script>
// eslint-disable-next-line
import _ from 'lodash';
// eslint-disable-next-line
import * as am4core from '@amcharts/amcharts4/core'
// eslint-disable-next-line
import * as am4charts from '@amcharts/amcharts4/charts'
// eslint-disable-next-line
import { mapMutations, mapState } from 'vuex'
import Topbar from './components/Topbar';
import MakeOrder from "./components/MakeOrder";
import OrderTrHistory from "./components/Sidebars/OrderTrHistory";

// let chart = am4core.create('chart', am4charts.XYChart);
export default {
  name: 'app',
  components: {
    'top-bar': Topbar,
    'make-order': MakeOrder,
    'order-trade-history': OrderTrHistory,
  },
  data() {
    return {
      brands: [
        { id: 1, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'ICNFBI' },
        { id: 2, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'LEND' },
        { id: 3, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'OYU' },
        { id: 4, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'GOBI' },
        { id: 5, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'APU' },
      ],
      favoriteBrands: [],
      selectedBrand: null,
      openedBrands: false,
      openedProfile: false,
      openedBalance: false,
      openedSideSubMenu: false,
      menuType: null,
    }
  },
  mounted() {
    // chart.data = this.mockBrandGraph;
    // chart.responsive.enabled = true;
    // // Add category axis
    // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    // categoryAxis.dataFields.category = "date";
    //
    // // Add value axis
    // // eslint-disable-next-line
    // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //
    // // Add series
    // let series = chart.series.push(new am4charts.ColumnSeries());
    // series.name = "ehehehe";
    // series.dataFields.categoryX = "date";
    // series.dataFields.valueY = "closingPrice";
  },
  methods: {
    displayBrand() {
      this.selectedBrand = this.brand;
    },
    toggleSideSubMenu(menuType) {
      if (!this.menuType) {
        this.openedSideSubMenu = !this.openedSideSubMenu;
        this.menuType = menuType;
      } else if (this.menuType === menuType) {
        this.openedSideSubMenu = !this.openedSideSubMenu;
        this.menuType = null;
      } else {
        this.menuType = menuType;
      }
    }
  },
  computed: {
    brand() {
      return this.$store.state.brand.brand;
    },
    isDisplay() {
      return !!this.menuType;
    },
    // maxSelectedFavBrands() {
    //   return this.favoriteBrands.length > 2;
    // }
  },
  watch: {
    brand(oldVal, newVal) {
      console.log('old', JSON.stringify(oldVal));
      console.log('new', JSON.stringify(newVal));
    },
    isDisplay() {
      console.log('computed changes');
    }
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

  body {
    background: #EEF1F4 !important;
    font-family: 'Lato', sans-serif !important;
  }


  .blocker {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: ' ';
    background: rgba(0, 0, 0, .0);
    z-index: -247;
  }

  .sidebar {
    z-index: 999;
    max-width: 80px;
    width: 80px;
    height: calc(100vh - 65px) !important;
    float: left;
    background-color: #eee;
  }

  .sidebar-item {
    min-height: 80px;
    height:80px;
    width:80px;
    /*display: flex;*/
    /*flex: 0 0 auto;*/
    text-align: center;
  }

  .sidebar-button {
    height:60px;
    width: 60px;
    font-size: 1rem;
  }

  .btn-txt {
    display: block;
    text-align: center;
    font-size: 0.625rem;
    line-height: 1;
  }

  .btn-icon {
    left: 50%;
    right: 50%;
  }

  .main-container {
    /*border: 1px dashed red;*/
    position: absolute;
    left: 80px;
    width: calc(100vw - 80px) !important;
    height: calc(100vh - 65px) !important;
    display: flex;
    flex-direction: column;
  }

  main {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  main > * {
    height: calc(100vh - 65px) !important;
    align-items: stretch;
  }

  /* TODO: responsive-g xiij duusgax */
  /*@media (max-width: 960px) {*/
  /*  main > div:first-child {*/
  /*    width: 100vw;*/
  /*    flex-direction: column;*/
  /*  }*/

  /*  main > div:nth-child(2) {*/
  /*    width: 100vw;*/
  /*    flex-direction: column;*/
  /*  }*/

  /*  main > div:last-child {*/
  /*    width: 100vw;*/
  /*    flex-direction: column;*/
  /*  }*/

  /*}*/

  main > div:first-child {
    overflow-y: auto;
    flex: 1 1 auto;
  }

  main > div:nth-child(2) {
    overflow-y: auto;
    flex: 1 1 auto;
  }

  main > div:last-child {
    flex: 0 0 auto;
    flex-direction: column;
  }

  .sidebar-submenu {
    margin-left: .625rem;
    margin-top: 0.625rem;
    width: 460px;
    /*border: 1px solid green;*/
    padding: 0.25rem;

    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    box-sizing: content-box;

  }

  .main-graph {
    padding: .625rem;
    width: 100%;
    /*border: 1px solid yellow;*/
  }

  .graph-container {
    background-image: url("https://www.investopedia.com/thmb/CNh7gMGR9WZm8dl6NVz0VMoKKUU=/1397x786/smart/filters:no_upscale()/barchart-634e0895a33b4b459faafd0bc639f67a.jpg");
    height: 350px;
    width: auto;
  }

  .trade-actions {
    width: 280px;
    /*border: 1px solid blue;*/
  }

  .slide-leave-active,
  .slide-enter-active {
    transition: .4s;
  }
  .slide-enter {
    transform: translate(-100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
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
