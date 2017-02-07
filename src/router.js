export default(router) => router.map({
	"/show":{
		name:"show",
		component: require('./views/main.vue')
	},
	"/show/tab/:tab/:role":{
		name:"tab",
		auth:true,
		component:require('./views/main.vue')
	},
	"/home":{
		name : "home",
		component : require("./views/home.vue")
	},
	"/loginPage":{
		name : "login",
		component : require("./views/login.vue")
	},
	"/signInPage":{
		name : "signIn",
		component : require("./views/signIn.vue")
	},
	"/personalPage/:name":{
		name:'personal',
		auth:true,
		component: require('./views/personalPage.vue')
	},
	"/personalPage/:name/:type":{
		name:'personal',
		auth:true,
		component: require('./views/personalPage.vue')
	},
	"/rank/:role":{
		name:'rank',
		auth:true,
		component: require('./views/rank.vue')
	}
})