<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#"><img src="../assets/images/icapital.svg" alt="ICCAPITAL" class="logo"></b-navbar-brand>
    <b-navbar-nav class="d-flex">
      <div class="flex-column pr-2" v-for="(item, i) in favoriteBrands" :key="i">
        <div class="fav-item">
                <span class="remove-fav d-none" @click="removeFav(item.id)">
                  <i class="remove-icon fas fa-times"></i>
                </span>
          <b-button variant="outline-secondary" size="sm" @click="openBrand(item)">
            <img :src="item.logo" :alt="item.name" class="brand-logo">
            <span>{{ item.name }}</span>
          </b-button>
        </div>
      </div>
      <div class="ml-2">
        <b-button @click="openBrandList">
          <span><i class="fas fa-plus"></i></span>
        </b-button>
        <transition name="fade">
          <div v-show="openedBrands" class="brand-list">
          <div class="blocker" @click="hideBrandList"></div>
          <ul class="brand-list-wrapper" id="brand-list">
            <li class="brand-list-item brand-list-search">
              <b-input-group>
                <b-input size="sm" @input="getBrandList" v-model="brandSearchQuery"></b-input>
                <b-input-group-append>
                  <b-button @click="getBrandList" size="xs" variant="outline-success"><span class="mr-2 ml-2 d-flex align-items-center"><i class="fas fa-search mb-1"></i></span></b-button>
                </b-input-group-append>
              </b-input-group>
            </li>
            <li class="brand-list-item" v-for="(item, i) in brands" :key="i">
              {{ i + 1 }}
              {{ item.id }}
              {{ item.name }}
              <div class="brand-button-wrapper">
                <b-button class="btn-xs ml-5" :disabled="item.isDisabled" @click.prevent="addFav(item.id)"><span><i class="fas fa-plus"></i></span></b-button>
              </div>
            </li>
            <transition name="fade">
              <li v-show="loadingBrands" class="brand-list-item justify-content-center"><span class="loading-spinner"><i class="fas fa-spinner"></i></span></li>
            </transition>
          </ul>
        </div>
        </transition>
      </div>
    </b-navbar-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <div>
        <b-button variant="outline-secondary" @click="openBalance">
          <span><i class="far fa-credit-card"></i></span>
        </b-button>
        <transition name="fade">
          <div v-show="openedBalance" class="balance-container">
            <div class="blocker" @click="toggleBalance"></div>
            <transition name="fade">
              <div v-show="loadingBalance" class="balance-loader"><span><i class="fas fa-spinner loading-spinner"></i></span></div>
            </transition>
            <div v-show="!loadingBalance">{{ balance }}</div>
          </div>
        </transition>
      </div>
      <div class="ml-2">
        <b-button @click="toggleProfile">
          <span><i class="fas fa-user"></i></span>
        </b-button>
        <transition name="fade">
          <div v-show="openedProfile" class="profile-container">
            <div class="blocker" @click="toggleProfile"></div>
            <div class="profile-sub-container">
              <div class="profile-row">
                <div class="profile-item">
                  <b-button variant="outline-secondary">
                          <span>
                            <i class="fas fa-user fa-2x mt-2"></i>
                          </span>
                    profile
                  </b-button>
                </div>
                <div class="profile-item">
                  <b-button variant="outline-secondary">
                          <span>
                            <i class="fas fa-sign-out-alt fa-2x mt-2"></i>
                          </span>
                    sign-out
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
// eslint-disable-next-line
import _ from 'lodash';
// eslint-disable-next-line
import { mapMutations, mapState } from 'vuex';

export default {
  name: "topbar",
  data() {
    return {
      loadingBrands: false,
      brandSearchQuery: '',
      brands: [
        { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        // { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
      ],
      favoriteBrands: [],
      selectedBrand: null,
      openedBrands: false,
      openedProfile: false,
      balance: 0,
      openedBalance: false,
      loadingBalance: false,
      asdf: [
        { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
        { id: _.random(500,10000), isDisabled: false, logo: 'https://global-uploads.webflow.com/5e157547d6f791d34ea4e2bf/5e17558f848f82e664c09d67_logo-dark.svg', name: Math.random().toString(36).slice(2).slice(0,5).toUpperCase() },
      ]
    }
  },
  created() {
    this.getBrandList = _.debounce(this.getBrandList, 500);
  },
  mounted() {
    const listElm = document.querySelector('#brand-list');
    listElm.addEventListener('scroll', () => {
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.getBrandList();
      }
    });
  this.getBrandList();
  },
  beforeDestroy() {
    const listElm = document.querySelector('#brand-list');
    listElm.removeEventListener('scroll', () => {});
  },
  methods: {
    ...mapMutations('brand', ['setBrand']),
    getBrandList() {
      console.log('getBrandList called');
      this.loadingBrands = true;
      setTimeout(() => {
        this.brands.push(...this.asdf);
        this.loadingBrands = false;
      }, 2500);
    },
    openBrandList() {
      this.openedBrands = !this.openedBrands;
    },
    hideBrandList() {
      this.openedBrands = !this.openedBrands;
    },
    openBrand(brand) {
      this.selectedBrand = brand;
      this.setBrand(brand);
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

    getBalance() {
      this.loadingBalance = true;
      setTimeout(() => {
        this.balance = _.random(5000,54000);
        this.loadingBalance = false;
      }, 1000);
    },
    toggleBalance() {
      this.openedBalance = !this.openedBalance;
    },
    async openBalance() {
      await this.getBalance();
      await this.toggleBalance();
    }
  }
}
</script>

<style scoped>
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
  /* TODO: select color! */
  border: 1px solid orangered;
  border-radius: 400px;
  position: absolute;
  top: -10px;
  right: -10px;
  text-align: center;
  display: table;
}

.remove-icon {
  /* TODO: select color! */
  color: #a81f0b;
  display: table-cell;
  vertical-align: center;
}

.fav-item:hover .remove-fav:not(:hover) {
  display: table !important;
}

.remove-fav:hover {
  display: table !important;
}

/* TODO: main.scss-ruu oruulax */
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
  border: 1px solid #bbb;
  border-radius: 5px;
}

.brand-list-wrapper {
  overflow: auto;
  height: 15rem;
  border: 2px solid #dce4ec;
  border-radius: 5px;
}

.brand-list-search {
  background: #dce4ec;
  position: sticky;
  top: 0;
  z-index: 100;
}

.brand-list-item {
  display: flex;
  justify-content: space-between;
  margin-top: .625rem;
  /* SORRY */
  margin-left: -30px;
  /* SORRY */
  margin-right: 1rem;
  /*border: 1px dashed black;*/
}

.brand-button-wrapper {
  right: 0;
  overflow: auto;
  display: inline-block;
}


.profile-container {
  position: absolute;
  z-index: 1000;
  min-width: 10rem;
  top: 100%;
  right: 1rem;
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
  background: #dce4ec;
  border-radius: 10px;
  position: absolute;
  z-index: 1;
  min-width: 10rem;
  height: 3rem;
  top: 100%;
  /* SORRY */
  right: 4rem;
  /* SORRY */
}

.balance-loader {
  background: #dce4ec;
  border-radius: 10px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 4999;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
      background-color: white;
}
::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-corner {
      background-color: rgba(0,0,0,0);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.loading-spinner {
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
