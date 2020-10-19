<template>
  <div id="app">
    <b-container fluid class="p-0">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#"><img src="./assets/images/icapital.svg" alt="ICCAPITAL" class="logo"></b-navbar-brand>
        <b-navbar-nav class="d-flex">
          <div class="flex-column pr-2" v-for="(item, i) in favoriteBrands" :key="i">
            <div class="fav-item">
                <span class="remove-fav d-none" @click="removeFav(item.id)">
                  <i class="remove-icon fas fa-times black"></i>
                </span>
              <b-button variant="outline-secondary" size="sm" @click="openBrand(item)">
                <img :src="item.logo" :alt="item.name" class="brand-logo">
                <span>{{ item.name }}</span>
              </b-button>
            </div>
          </div>
          <div class="ml-2">
            <b-button @click="openBrandList">
              <span><i class="fas fa-bars"></i></span>
            </b-button>
            <div class="brand-list" :class="{ 'd-block': openedBrands }">
              <div class="blocker" @click="hideBrandList"></div>
              <b-table-simple borderless small hover>
                <b-thead>
                  <b-tr>
                    <b-th class="text-center">logo</b-th>
                    <b-th class="text-center">name</b-th>
                    <b-th class="text-center">action</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(item, i) in brands" :key="i">
                    <b-td class="text-center">{{ i + 1 }}</b-td>
                    <b-td class="text-center">{{ item.name }}</b-td>
                    <b-td class="text-center">
                      <b-button class="btn-xs" :disabled="item.isDisabled" @click.prevent="addFav(item.id)"><span><i class="fas fa-plus"></i></span></b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div>
            <b-button variant="outline-secondary" @click="toggleBalance">
              <span><i class="far fa-credit-card"></i></span>
            </b-button>
            <div class="balance-container" :class="{ 'd-block': openedBalance }">
              <div class="blocker" @click="toggleBalance"></div>
              <div>$1,000,000</div>
            </div>
          </div>
          <div class="ml-2">
            <b-button @click="toggleProfile">
              <span><i class="fas fa-user"></i></span>
            </b-button>
            <div class="profile-container" :class="{ 'd-block': openedProfile }">
              <div class="blocker" @click="toggleProfile"></div>
              <div class="profile-sub-container">
                <div class="profile-row">
                  <div class="profile-item">
                    <b-button variant="outline-secondary">
                        <span>
                          <i class="fas fa-user fa-3x mt-3"></i>
                        </span>
                      profile
                    </b-button>
                  </div>
                  <div class="profile-item">
                    <b-button variant="outline-secondary">
                        <span>
                          <i class="fas fa-sign-out-alt fa-3x mt-3"></i>
                        </span>
                      sign-out
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-navbar-nav>
      </b-navbar>
      <b-nav vertical class="sidebar">
        <span class="mt-3">
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center"><span><i class="fas fa-user btn-icon"></i>aaa</span></b-button></li>
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center"><span><i class="fas fa-user btn-icon"></i>ang</span></b-button></li>
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center"><span><i class="fas fa-user btn-icon"></i>ad</span></b-button></li>
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center"><span><i class="fas fa-user btn-icon"></i>here</span></b-button></li>
          <li class="nav-item sidebar-item"><b-button size="lg" variant="outline-info" class="sidebar-button text-center"><span><i class="fas fa-user btn-icon"></i>ak</span></b-button></li>
        </span>
      </b-nav>
      <b-collapse id="sub-sidebar">
        <b-card>I am collapsible content!</b-card>
      </b-collapse>
      <div class="content">
        <div id="chart"></div>
      </div>
<!--        <div id="chart"></div>-->
<!--        <b-card class="border-success" header-tag="header">-->
<!--        <h3 slot="header">fav-brands</h3>-->
<!--        <b-button size="xs" v-b-toggle.nav-col variant="primary">Toggle Collapse</b-button>-->
<!--        <b-button size="xs" v-b-toggle.sidebar-1>Toggle Sidebar</b-button>-->
<!--        <b-table-simple v-if="favoriteBrands && favoriteBrands.length" small bordered outlined hover striped>-->
<!--        <b-thead>-->
<!--          <b-tr>-->
<!--            <b-th>logo</b-th>-->
<!--            <b-th>name</b-th>-->
<!--            <b-th>action</b-th>-->
<!--          </b-tr>-->
<!--        </b-thead>-->
<!--        <b-tbody>-->
<!--          <b-tr v-for="(item, i) in favoriteBrands" :key="i">-->
<!--            <b-td>{{ i + 1 }}</b-td>-->
<!--            <b-td>{{ item.name }}</b-td>-->
<!--            <b-td>-->
<!--              <b-button size="sm"><span><i class="fas fa-times"></i></span></b-button>-->
<!--            </b-td>-->
<!--          </b-tr>-->
<!--        </b-tbody>-->
<!--      </b-table-simple>-->
<!--      </b-card>-->
    </b-container>
  </div>
</template>

<script>
import _ from 'lodash';
// eslint-disable-next-line
import * as am4core from '@amcharts/amcharts4/core'
// eslint-disable-next-line
import * as am4charts from '@amcharts/amcharts4/charts'

// let chart = am4core.create('chart', am4charts.XYChart);
export default {
  name: 'app',
  data() {
    return {
      brands: [
        { id: 1, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=MEbfTvFZp0oAX9Xw2ue&_nc_oc=AQmRCL1tKRoAjVZBt-OVW6pM-EBU2P2Bq3UaObqgRo7WXraFZWyP5Lv3KrZtiVjDfPo&_nc_ht=scontent.fuln3-1.fna&oh=42f6b803dfd0bbe9e52df749b480202c&oe=5FAF00CF', name: 'ICNFBI' },
        { id: 2, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=MEbfTvFZp0oAX9Xw2ue&_nc_oc=AQmRCL1tKRoAjVZBt-OVW6pM-EBU2P2Bq3UaObqgRo7WXraFZWyP5Lv3KrZtiVjDfPo&_nc_ht=scontent.fuln3-1.fna&oh=42f6b803dfd0bbe9e52df749b480202c&oe=5FAF00CF', name: 'LEND' },
        { id: 3, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=MEbfTvFZp0oAX9Xw2ue&_nc_oc=AQmRCL1tKRoAjVZBt-OVW6pM-EBU2P2Bq3UaObqgRo7WXraFZWyP5Lv3KrZtiVjDfPo&_nc_ht=scontent.fuln3-1.fna&oh=42f6b803dfd0bbe9e52df749b480202c&oe=5FAF00CF', name: 'OYU' },
        { id: 4, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=MEbfTvFZp0oAX9Xw2ue&_nc_oc=AQmRCL1tKRoAjVZBt-OVW6pM-EBU2P2Bq3UaObqgRo7WXraFZWyP5Lv3KrZtiVjDfPo&_nc_ht=scontent.fuln3-1.fna&oh=42f6b803dfd0bbe9e52df749b480202c&oe=5FAF00CF', name: 'GOBI' },
        { id: 5, isDisabled: false, logo: 'https://scontent.fuln3-1.fna.fbcdn.net/v/t1.0-9/26904512_1937598752936206_5896850323450214828_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=MEbfTvFZp0oAX9Xw2ue&_nc_oc=AQmRCL1tKRoAjVZBt-OVW6pM-EBU2P2Bq3UaObqgRo7WXraFZWyP5Lv3KrZtiVjDfPo&_nc_ht=scontent.fuln3-1.fna&oh=42f6b803dfd0bbe9e52df749b480202c&oe=5FAF00CF', name: 'APU' },
      ],
      mockBrandGraph: [
        {date: '2020-09-01', closingPrice: _.random(500, 5000) },
        {date: '2020-09-01', closingPrice: _.random(500, 5000) },
        {date: '2020-09-02', closingPrice: _.random(500, 5000) },
        {date: '2020-09-04', closingPrice: _.random(500, 5000) },
        {date: '2020-09-05', closingPrice: _.random(500, 5000) },
        {date: '2020-09-06', closingPrice: _.random(500, 5000) },
        {date: '2020-09-07', closingPrice: _.random(500, 5000) },
        {date: '2020-09-08', closingPrice: _.random(500, 5000) },
        {date: '2020-09-09', closingPrice: _.random(500, 5000) },
        {date: '2020-09-10', closingPrice: _.random(500, 5000) },
        {date: '2020-09-11', closingPrice: _.random(500, 5000) },
        {date: '2020-09-12', closingPrice: _.random(500, 5000) },
        {date: '2020-09-13', closingPrice: _.random(500, 5000) },
        {date: '2020-09-14', closingPrice: _.random(500, 5000) },
        {date: '2020-09-15', closingPrice: _.random(500, 5000) },
        {date: '2020-09-16', closingPrice: _.random(500, 5000) },
        {date: '2020-09-17', closingPrice: _.random(500, 5000) },
        {date: '2020-09-18', closingPrice: _.random(500, 5000) },
        {date: '2020-09-19', closingPrice: _.random(500, 5000) },
        {date: '2020-09-20', closingPrice: _.random(500, 5000) },
        {date: '2020-09-21', closingPrice: _.random(500, 5000) },
        {date: '2020-09-22', closingPrice: _.random(500, 5000) },
        {date: '2020-09-23', closingPrice: _.random(500, 5000) },
        {date: '2020-09-24', closingPrice: _.random(500, 5000) },
        {date: '2020-09-25', closingPrice: _.random(500, 5000) },
        {date: '2020-09-26', closingPrice: _.random(500, 5000) },
        {date: '2020-09-27', closingPrice: _.random(500, 5000) },
        {date: '2020-09-28', closingPrice: _.random(500, 5000) },
        {date: '2020-09-29', closingPrice: _.random(500, 5000) },
        {date: '2020-09-30', closingPrice: _.random(500, 5000) },
        {date: '2020-10-01', closingPrice: _.random(500, 5000) },
        {date: '2020-10-01', closingPrice: _.random(500, 5000) },
        {date: '2020-10-02', closingPrice: _.random(500, 5000) },
        {date: '2020-10-04', closingPrice: _.random(500, 5000) },
        {date: '2020-10-05', closingPrice: _.random(500, 5000) },
        {date: '2020-10-06', closingPrice: _.random(500, 5000) },
        {date: '2020-10-07', closingPrice: _.random(500, 5000) },
        {date: '2020-10-08', closingPrice: _.random(500, 5000) },
        {date: '2020-10-09', closingPrice: _.random(500, 5000) },
        {date: '2020-10-10', closingPrice: _.random(500, 5000) },
        {date: '2020-10-11', closingPrice: _.random(500, 5000) },
        {date: '2020-10-12', closingPrice: _.random(500, 5000) },
        {date: '2020-10-13', closingPrice: _.random(500, 5000) },
        {date: '2020-10-14', closingPrice: _.random(500, 5000) },
        {date: '2020-10-15', closingPrice: _.random(500, 5000) },
        {date: '2020-10-16', closingPrice: _.random(500, 5000) },
        {date: '2020-10-17', closingPrice: _.random(500, 5000) },
        {date: '2020-10-18', closingPrice: _.random(500, 5000) },
        {date: '2020-10-19', closingPrice: _.random(500, 5000) },
        {date: '2020-10-20', closingPrice: _.random(500, 5000) },
        {date: '2020-10-21', closingPrice: _.random(500, 5000) },
        {date: '2020-10-22', closingPrice: _.random(500, 5000) },
        {date: '2020-10-23', closingPrice: _.random(500, 5000) },
        {date: '2020-10-24', closingPrice: _.random(500, 5000) },
        {date: '2020-10-25', closingPrice: _.random(500, 5000) },
        {date: '2020-10-26', closingPrice: _.random(500, 5000) },
        {date: '2020-10-27', closingPrice: _.random(500, 5000) },
        {date: '2020-10-28', closingPrice: _.random(500, 5000) },
        {date: '2020-10-29', closingPrice: _.random(500, 5000) },
        {date: '2020-10-30', closingPrice: _.random(500, 5000) },
        {date: '2020-10-31', closingPrice: _.random(500, 5000) },
      ],
      favoriteBrands: [],
      openedBrands: false,
      openedProfile: false,
      openedBalance: false,
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
    openBrandList() {
      this.openedBrands = !this.openedBrands;
    },
    hideBrandList() {
      this.openedBrands = !this.openedBrands;
    },
    openBrand(brand) {
      console.log('openBrand      ' + brand.name);
    },
    addFav(id) {
      // if (this.favoriteBrands.length >= 3) {
      //   this.$bvToast('maxFavBrandsSelected');
      //   return;
      // }
      this.brands.find(x => x.id === id).isDisabled = true;
      this.favoriteBrands.push(this.brands.find(x => x.id === id));
      this.openedBrands = !this.openedBrands;
    },
    removeFav(id) {
      this.favoriteBrands = this.favoriteBrands.filter(x => x.id !== id);
      this.$nextTick(() => {
        this.brands.find(x => x.id === id).isDisabled = false;
        this.$forceUpdate();
      });
    },
    toggleProfile() {
      this.openedProfile = !this.openedProfile;
    },

    toggleBalance() {
      this.openedBalance = !this.openedBalance;
    },
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

  .profile-item {
    min-height: 100px;
    height:100px;
    width: 100px;
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

  .profile-item {
    min-height: 100px;
    height:100px;
    width: 100px;
    padding: 0.2rem;
    display:table-cell;
    text-align: center;
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

  .content {
    position: relative;
    left: 80px;
    border: 2px dashed red;
    width: calc(100vw - 80px) !important;
    height: calc(100vh - 65px) !important;
  }

</style>
