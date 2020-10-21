<template>
  <div id="app">
    <b-container fluid class="p-0">
      <top-bar @brand-selected="displayBrand"></top-bar>
      <b-nav vertical class="sidebar">
        <span class="mt-3">
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center" @click="toggleSideSubMenu('a')"><span><i class="fas fa-user btn-icon"></i>aaa</span></b-button></li>
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center" @click="toggleSideSubMenu('b')"><span><i class="fas fa-user btn-icon"></i>ang</span></b-button></li>
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center" @click="toggleSideSubMenu('c')"><span><i class="fas fa-user btn-icon"></i>ad</span></b-button></li>
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center" @click="toggleSideSubMenu('d')"><span><i class="fas fa-user btn-icon"></i>here</span></b-button></li>
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center" @click="toggleSideSubMenu('e')"><span><i class="fas fa-user btn-icon"></i>ak</span></b-button></li>
        </span>
      </b-nav>
      <div class="main-container">
        <main>
          <transition name="slide">
            <div class="sidebar-submenu" v-if="openedSideSubMenu">
              menu-type = {{ JSON.stringify(menuType) }}
              <p v-if="menuType === 'a'">MC</p>
              <pre v-if="menuType === 'b'">MAGNAI</pre>
              <h4 v-if="menuType === 'c'">YOGI</h4>
              <h3 v-if="menuType === 'd'">SUUGII</h3>
              <h2 v-if="menuType === 'e'">KU</h2>
            </div>
          </transition>
          <div class="main-graph">
            <b-card v-if="selectedBrand" class="border-success" header-tag="header">
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
              <pre>{{ selectedBrand }}</pre>
            </b-card>
            <b-card class="text-center mt-3" bg-variant="info">
              <label>graphics here hehehehehe</label>
            </b-card>
          </div>
          <div class="trade-actions">asdf</div>
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
import Topbar from './components/Topbar';

// let chart = am4core.create('chart', am4charts.XYChart);
export default {
  name: 'app',
  components: {
    'top-bar': Topbar,
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
    displayBrand(brand) {
      this.selectedBrand = brand;
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
    // maxSelectedFavBrands() {
    //   return this.favoriteBrands.length > 2;
    // }
  },
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

  body {
    background: #EEF1F4 !important;
    font-family: 'Lato', sans-serif !important;
  }

  .brand-logo {
    height: 2rem;
    width: 2rem;
    border-radius: 400px;
    margin-right: 10px;
  }

  .remove-fav:hover {
    display: block;
    cursor: pointer;
  }

  .fav-item {
    overflow: visible;
    position: relative;
    height: max-content;
    width: max-content;
  }

  .remove-fav {
    width: 18px;
    height: 15px;
    overflow: visible;
    border: 1px solid black;
    border-radius: 400px;
    position: absolute;
    top: -10px;
    right: -10px;
    text-align: center;
    display: table;
  }

  .remove-icon {
    display: table-cell;
    vertical-align: center;
  }

  .fav-item:hover .remove-fav:not(:hover) {
    display: table !important;
  }

  .remove-fav:hover {
    display: table !important;
  }

  .btn-xs {
    padding  : .25rem .4rem;
    font-size  : .875rem;
    line-height  : .5;
    border-radius : .2rem;
  }

  .logo {
    width: 100px;
    margin-right: 3rem;
  }

  .brand-list {
    position: absolute;
    z-index: 1000;
    min-width: 15rem;
    top: 100%;
    list-style: none;
    font-size: 1rem;
    text-align: left;
    background: #e9e9e9;
    display: none;
    border: 1px solid #bbb;
    border-radius: 5px;
  }

  .profile-container {
    position: absolute;
    z-index: 1000;
    min-width: 10rem;
    top: 100%;
    right: 1rem;
    display: none;
  }

  .profile-sub-container {
    background: #fefefe;
    width: 200px;
    height: auto;
    display:table;
    /*border: 1px solid #ccc;*/
    border-radius: 5px;
  }

  .profile-row {
    display: table-row;
  }

  /*.profile-item {*/
  /*  min-height: 100px;*/
  /*  height:100px;*/
  /*  width: 100px;*/
  /*  padding: 0.2rem;*/
  /*  display:table-cell;*/
  /*  text-align: center;*/
  /*}*/

  .profile-item {
    min-height: 80px;
    height:80px;
    width: 80px;
    padding: 0.2rem;
    display:table-cell;
    text-align: center;
  }

  .profile-btn .btn {
    padding: 0 !important;
    margin: 0 !important;
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


  .balance-container {
    background: #42b983;
    border: 1px dashed green;
    border-radius: 10px;
    position: absolute;
    z-index: 1000;
    min-width: 10rem;
    height: 3rem;
    top: 100%;
    /* SORRY */
    right: 4rem;
    /* SORRY */
    display: none;
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

  .btn-icon {
    left: 50%;
    right: 50%;
  }

  .main-container {
    border: 1px dashed red;
    position: relative;
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
    width: 400px;
    border: 1px solid green;
  }

  .main-graph {
    padding: .625rem;
    width: 100%;
    border: 1px solid yellow;
  }

  .trade-actions {
    width: 200px;
    border: 1px solid blue;
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

</style>
