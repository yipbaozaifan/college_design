<template>
	<navigation :user = "login_user.user" :role = "login_role" :flag = "search_flag" :items.sync = "picitems"></navigation>
	<div class="main">
			<div class="warp" style="padding:0;">
				<div class="slide_bar">
					<carousel>
						<slider>
    						<img src="https://placehold.it/1200x400?text=one" style="width: 100%">
    						<div class="carousel-caption">
      							<h2>简约、免费的在线问卷编辑平台</h2>
      							<p>全部功能免费，简约好用，轻松开启在线调研</p>
    						</div>
  						</slider>
						<slider>
						    <img src="https://placehold.it/1200x400?text=two" style="width: 100%">
						    <div class="carousel-caption">
      							<h2>简约、免费的在线问卷编辑平台</h2>
      							<p>全部功能免费，简约好用，轻松开启在线调研</p>
    						</div>
						</slider>
						<slider>
						    <img src="https://placehold.it/1200x400?text=three" style="width: 100%">
						    <div class="carousel-caption">
      							<h2>简约、免费的在线问卷编辑平台</h2>
      							<p>全部功能免费，简约好用，轻松开启在线调研</p>
    						</div>
						</slider>
					</carousel>
				</div>
			</div>
			<div class="warp intro bg_w">
				<div class="container">
					<div class="row">
						<div class="col-sm-6 users_count">
							<span class="users_num">123456</span>
							<span>人在正在使用</span>
						</div>
						<div class="col-sm-6 entry">
							<a class="entry_btn btn">立即使用</a>
						</div>
					</div>
					<hr style="width: 100%">
				</div>
			</div>
			<div class="warp template bg_w">
				<div class="container">
					<div class="row">
						<div class="col-sm-12 template_head">
							<span>使用模板</span>
						</div>
					</div>
					<div class="row template_list">
						<div class="col-sm-2 template_item">
							<img src="" class="">
							<span class="template_name"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="warp contact bg_w">
				
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
	import {slider} from 'vue-strap'
	export default {
		components: {
	      backtop,
	      navigation,
	      carousel,
	      slider
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
	.main{
		text-align: center;
	}	
	.content{
		margin-bottom: 3em;
	}
	.entry_btn{
		background-color: #80c200;
		color: #fff;
	}
	.entry_btn:hover{
		background-color: #5aae00;
		color: #fff;
	}
	.users_count{
		color: #999;
	}
	.users_num{
		font-size: 30px;
		color: #58a6e7;
	}
	.warp{
		padding-top: 20px; 
	}
	.bg_w{
		background-color: #fff;
	}
	.bg_g{
		background-color: #ddd;
	}
	.template_head{
		text-align: left;
		font-size: 20px;
	}
</style>