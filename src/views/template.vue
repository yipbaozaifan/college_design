<template>
	<navbar placement="top" type="default">
  		<!-- Brand as slot -->
  	  <a slot="brand" href="/" title="Home" class="navbar-brand">VueStrap</a>
  		<!-- You can use dropdown component -->
  		<!-- For right positioning use slot -->
  	  <li>
  	  	<a href="" class="nav_btn">创建问卷</a>
  	  </li>
  	  <li>
  	  	<a href="" class="nav_btn">我的问卷</a>
  	  </li>
	  <li slot="right" id="nav_userbar">
	    <img src="../img/boy.png" class="navbar_head"><span class="navbar_name">野仔湛</span><span id="splitor">|</span><a id="nav_exit_btn">退出</a>
	  </li>
	</navbar>
	<div class="page_intro">
		<h2>使用问卷模板</h2>
	</div>
	<div class="template">
			<div class="warp survey_content">
						<span class="survey_item">
							<img src="../img/2.jpg" class="survey_img">
							<div class="title_warp">
								<a href="" class="survey_title">survey title</a>
							</div>
						</span>
						<span class="survey_item">
							<img src="../img/2.jpg" class="survey_img">
							<div class="title_warp">
								<a href="" class="survey_title">survey title</a>
							</div>
						</span>
			</div>
	</div>
	<backtop></backtop>
</template>

<script>
	import $ from 'jquery';
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
				flag:true,  
				search_flag:true,
				login_user:{
					user:{},
					survey_num:0
				},
				survey_items:[],
				login_role:"",
				is_user:false,
				is_admin:false,
				users_list:[]
			}
		},  
		methods:{
			getItemList(tab,timeStamp,role){
				
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
	.template{
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
		height: 250px;
		top: 0;
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
</style>