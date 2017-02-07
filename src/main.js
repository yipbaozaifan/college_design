import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import home from './views/home.vue'
import routerConfig from './router.js'
import $ from 'jquery'

// install router
Vue.use(Router)

// routing
const router = new Router()
routerConfig(router);


router.beforeEach(function (transition) {
  window.scrollTo(0, 0);
  if(transition.to.auth){
  	if(!window.sessionStorage.getItem("user")){
  		transition.redirect({'name':"home"});
  	}else{
  		transition.next();
  	}
  }else{
      transition.next();
  }
});


router.redirect({
  '*': 'show'
})

router.start(App, '#app')
