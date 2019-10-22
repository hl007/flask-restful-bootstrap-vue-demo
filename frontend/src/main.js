import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import ToastPlugin from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex';

import App from './App.vue'
import Login from './components/Login'
import Index from "./components/Index"

axios.defaults.baseURL = 'http://127.0.0.1:5000/';

Vue.config.productionTip = false;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter);

Vue.use(BootstrapVue,ToastPlugin);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

const routes = [
  { path: "/", component: Index },
  { path: "/login", component: Login },
];

const router = new VueRouter({
  routes
});

const store=new Vuex.Store({
  state: {
    username: "",
    mainFlag: true,
    userManageFlag: false,
    testPageFlag: false,
    taskManageFlag: false,
  },
  mutations: {
    setUsername(state,username) {
      state.username=username
    },
    setMenuFlag(state,item) {
      if(item==1){
        state.userManageFlag=true;
        state.mainFlag=false;
        state.testPageFlag=false;
        state.taskManageFlag=false;
      }
      else if(item==2){
        state.userManageFlag=false;
        state.mainFlag=false;
        state.testPageFlag=true;
        state.taskManageFlag=false;
      }
      else if(item==3){
        state.userManageFlag=false;
        state.mainFlag=false;
        state.testPageFlag=false;
        state.taskManageFlag=true;
      }
    }
  }
});

new Vue({
  router,
  created(){
    this.checkLogin();
  },
  store,
  watch: {
    "$route": "checkLogin",
  },
  methods : {
    checkLogin() {
      if (typeof Cookies.get("token")==="undefined") {
        this.$router.push('/login');
      }
    }
  },
  render: h => h(App),
}).$mount('#app');

