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
	<div class="create">
			<div class="warp create_choice">
						<div class="col-sm-6 create_by_empty bg_c1">
							<div class="type_show"></div>
							<h2 style="color:#fff">创建空白问卷</h2>
							<a class="btn start_btn">开始创建</a>
						</div>
						<div class="col-sm-6 create_by_template bg_c2">
							<div class="type_show"></div>
							<h2 style="color:#fff">选择问卷模板</h2>
							<a class="btn start_btn">开始创建</a>
						</div>
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
	.create{
		text-align: center;
		overflow: hidden;
	}	
	.create_choice{
		padding-top: 50px;
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
	.create_by_empty .type_show{
		background-image: url(../img/sprites_bg.png);
		width: 154px;
		height: 152px;
		background-position: -232px 0px;
		background-repeat: no-repeat;
		margin: 140px auto 30px;
	}
	.create_by_template .type_show{
		background-image: url(../img/sprites_bg.png);
		width: 231px;
		height: 157px;
		background-position: 0px 0px;
		background-repeat: no-repeat;
		margin: 135px auto 30px;
	}
	.start_btn{
		background-color: #fff;
	}
	.col-sm-6{
		padding-bottom: 30px;
	}
</style>