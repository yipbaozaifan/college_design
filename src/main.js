import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import home from './views/home.vue'
import routerConfig from './router.js'
import $ from 'jquery'
import VueResource from 'vue-resource'

// install router
Vue.use(Router)
Vue.use(VueResource)

// routing
const router = new Router()
routerConfig(router);

//custom directive
Vue.directive('edit',{
    twoWay: true,
    bind: function () {
      this.handler = function () {
        this.set(this.el.innerHTML)
      }.bind(this)
      this.el.addEventListener('keyup', this.handler)
    },
    update: function (newValue, oldValue) {
        this.el.innerHTML = newValue || ''
    },
    unbind: function () {
        this.el.removeEventListener('keyup', this.handler)
    }
})

router.beforeEach(function (transition) {
  window.scrollTo(0, 0);
  /*if(transition.to.auth){
  	if(!window.sessionStorage.getItem("user")){
  		transition.redirect({'name':"home"});
  	}else{
  		transition.next();
  	}
  }else{
      transition.next();
  }*/
  transition.next();
});

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
