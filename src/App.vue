<template>
  <div id="app">
    <b-card class="p-3">
      <b-table :items="items" :fields="fields" responsive outlined small>
        <template #cell(name)="row">
          <!--          <b-button variant="outline-info" @click="row.detailsShowing = !row.detailsShowing">{{ row.value }}</b-button>-->
          <b-button variant="outline-info" @click="detailVal(row)">{{ row.value }}</b-button>
          {{ row.detailsShowing }}
        </template>
        <template #cell(age)="row">
          <!--          <b-button variant="outline-info" @click="row.detailsShowing = !row.detailsShowing">{{ row.value }}</b-button>-->
          <b-button variant="outline-info" @click="detailVal(row)">{{ row.value }}</b-button>
          {{ row.detailsShowing }}
        </template>
        <template #row-details="row">
          <span style="display: none;">{{ row }}</span>
          <b-button :variant="detailContent.variant">{{ detailContent.value }}</b-button>
        </template>
      </b-table>
    </b-card>
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
// import Topbar from './components/Topbar';
// import MakeOrder from "./components/MakeOrder";
// import OrderTrHistory from "./components/Sidebars/OrderTrHistory";

// let chart = am4core.create('chart', am4charts.XYChart);
export default {
  name: 'app',
  components: {
    // 'top-bar': Topbar,
    // 'make-order': MakeOrder,
    // 'order-trade-history': OrderTrHistory,
  },
  data() {
    return {
      detailContent: '',
      brands: [
        { id: 1, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'ICNFBI' },
        { id: 2, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'LEND' },
        { id: 3, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'OYU' },
        { id: 4, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'GOBI' },
        { id: 5, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg', name: 'APU' },
      ],
      items: [
        { id: _.random(1,100), name: 'a', age: _.random(2,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
        { id: _.random(1,100), name: 'a', age: _.random(1,100) },
      ],
      fields: [
        { key: 'id', label: 'aidi' },
        { key: 'name', label: 'ner' },
        { key: 'age', label: 'nas' },
      ],
      a: 'ene neg ym',
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
    detailVal(params) {
      if (!this.detailContent) {
        params.toggleDetails();
      } else if (params.field.key === this.detailContent.field.key) {
        params.toggleDetails();
      }
      this.detailContent = params;
      if (params.field.key === 'name') {
        this.detailContent.variant = 'primary';
      } else {
        this.detailContent.variant = 'info';
      }
      this.$forceUpdate();
    },
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
    margin-top: .625rem;
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
