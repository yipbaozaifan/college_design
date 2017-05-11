import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import routerConfig from './router.js'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// install 
Vue.use(ElementUI);
Vue.use(Router);
Vue.use(VueResource)

// routing
console.log(routerConfig);
const router = new Router(routerConfig)


const app = new Vue({
  el:'#app',
  router:router,
  template: '<App/>',
  components: { App }
})
