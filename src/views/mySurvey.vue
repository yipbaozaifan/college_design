<template>
	<navbar placement="top" type="default">
  		<!-- Brand as slot -->
  	  <a slot="brand" href="/" title="Home" class="navbar-brand">VueStrap</a>
  		<!-- You can use dropdown component -->
  		<!-- For right positioning use slot -->
  	  <li>
  	  	<a v-link="{path:'/create'}" class="nav_btn">创建问卷</a>
  	  </li>
  	  <li>
  	  	<a v-link="{path:'/mysurvey'}" class="nav_btn">我的问卷</a>
  	  </li>
	  <li slot="right" id="nav_userbar">
	    <img src="../img/boy.png" class="navbar_head"><span class="navbar_name">野仔湛</span><span id="splitor">|</span><a id="nav_exit_btn">退出</a>
	  </li>
	</navbar>
	<div class="page_intro">
		<h2>我的问卷</h2>
	</div>
	<div class="mySurvey">
			<div class="warp survey_content">
				<span class="survey_item" v-for="item in survey_items">
					<img src="../img/2.jpg" class="survey_img">
					<div class="title_warp">
						<a class="mysurvey_title" v-on:click="go_edit(item._id)">{{item.title}}</a>
					</div>
					<div class="status_warp">
						<span>状态：</span>
						<span>{{item.status}}</span>
					</div>
				</span>
			</div>
	</div>
	<backtop></backtop>
</template>

<script>
	import api from '../tools/api/dataApi.js';
	import navigation from '../components/navigation.vue';
	import backtop from '../components/backTop.vue';
	import {carousel} from 'vue-strap';
	import {slider} from 'vue-strap';
	import {navbar} from 'vue-strap';
	export default {
		components: {
	      backtop,
	      navigation,
	      carousel,
	      slider,
	      navbar
    	},
		data(){
			return{
				login_user:{
					user_id:'2112121'
				},
				survey_items:[
				{_id:'112332123',title:'fsjklsdjlkf',status:'未发放'},
				{_id:'112332123',title:'fsjklsdjlkf',status:'未发放'},
				{_id:'112332123',title:'fsjklsdjlkf',status:'未发放'},
				{_id:'112332123',title:'fsjklsdjlkf',status:'未发放'},
				{_id:'112332123',title:'fsjklsdjlkf',status:'未发放'},
				]
			}
		},  
		methods:{
			go_edit(template_id){
				this.$router.go({name:'edit',params:{user_id:this.login_user.user_id,survey_id:template_id}})
			}
		},
		route:{
		}
	}
</script>

<style type="text/css">
	h2{
		color:#fff;
	}
	.mySurvey{
		overflow: hidden;
	}	
	.survey_content{
		padding: 50px 10px;
		margin :0 auto;
		text-align: center;
	}
	.bg_w{
		background-color: #fff;
	}
	.bg_c1{
		background-color: #90d67e;
	}
	.bg_c2{
		background-color: #2e8cdb;
	}
	.bg_g{
		background-color: #f5f5f5;
	}
	#nav_userbar{
		right:20px;
	}
	.nav_btn{
	}
	.nav_btn:hover{
		color:  #58a6e7;
	}
	#nav_exit_btn{
		padding: 0;
		display: inline-block;
		vertical-align: top;
		line-height: 50px;
	}
	.navbar_name{
		display: inline-block;
		line-height: 50px;
	}
	.navbar_head{
		line-height: 50px;
		display: inline-block;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		margin: 0 3px;
	}
	#splitor{
		margin: 0 3px;
	}
	.contact{
		padding: 30px 0;
		height: 120px;
	}
	.contact_github a{
		display: inline-block;
		line-height:60px;
	}
	.github_logo{
		width: 30px;
		height: 30px;
		display: inline-block;
		vertical-align: middle;
	}
	.page_intro{
		background-color: #f8f8f8;
		padding:0 20px;
		height: 60px;
	}
	.page_intro h2{
		margin: 0;
		font-size: 1.5em;
		line-height: 60px;
	}
	.survey_item{
		display: inline-block;
		text-align: left;
		vertical-align: top;
		cursor: pointer;
		overflow: hidden;
		position: relative;
		background-color: #fafafa;
		width: 178px;
		height: 252px;
		border-radius: 2px;
		border:1px solid #d6d6d6;
		box-shadow: 0 0 3px rgba(255,255,255,0.8);
		margin:20px 18px 0 18px;
	}
	.survey_item:hover .title_warp{
		height: 177px;
		top: 0;
	}
	.survey_item:hover .status_warp{
		height: 75px;
		bottom: 0;
	}
	.survey_img{
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
	}
	.title_warp{
		display: block;
		position: absolute;
		width: 100%;
		top :178px;
		padding: 15px; 
		height: 75px;
		background-color: rgba(255,255,255,0.8);
		transition: height 0.3s,top 0.3s;
	}
	.status_warp{
		width: 100%;
		display: block;
		position: absolute;
		height: 1px;
		bottom: -73px;
		line-height: 73px;
		background-color: #fafafa;
		text-align: left;
		transition:bottom 0.3s;
	}
</style>