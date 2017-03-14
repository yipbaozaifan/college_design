export default(router) => router.map({
	"/show/:user_id":{
		name:"show",
		component: require('./views/main.vue')
	},
	"/home":{
		name:'home',
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
	"/create/:user_id":{
		name : "create",
		component : require("./views/create.vue")
	},
	"/mysurvey/:user_id":{
		name : "mysurvey",
		component : require("./views/mySurvey.vue")
	},
	"/template":{
		name : "template",
		component : require("./views/template.vue")
	},
	'/editpage/:user_id/:survey_id':{
		name : "edit",
		component : require('./views/edit_page.vue')
	},
	'/fill/:survey_id':{
		name : "fill",
		component : require('./views/fill.vue')
	},
	'/analyze/:survey_id':{
		name : 'analyze',
		component : require('./views/analyze.vue')
	}
})