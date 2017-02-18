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
	<div class="main">
			<div class="warp" style="padding:0;">
				<div class="slide_bar">
					<carousel>
						<slider>
    						<img src="../img/slide.jpg" style="width: 100%">
    						<div class="carousel-caption">
      							<h2>简约、免费的在线问卷编辑平台</h2>
      							<p>全部功能免费，简约好用，轻松开启在线调研</p>
    						</div>
  						</slider>
						<slider>
						    <img src="../img/slide.jpg" style="width: 100%">
						    <div class="carousel-caption">
      							<h2>简约、免费的在线问卷编辑平台</h2>
      							<p>全部功能免费，简约好用，轻松开启在线调研</p>
    						</div>
						</slider>
						<slider>
						    <img src="../img/slide.jpg" style="width: 100%">
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
							<div class="template_img">
								<img src="../img/talent.png" >
							</div>
							<span class="template_name">模板模板</span>
						</div>
						<div class="col-sm-2 template_item">
							<div class="template_img">
								<img src="../img/talent.png" >
							</div>
							<span class="template_name">模板模板</span>
						</div>
						<div class="col-sm-2 template_item">
							<div class="template_img">
								<img src="../img/talent.png" >
							</div>
							<span class="template_name">模板模板</span>
						</div>
						<div class="col-sm-2 template_item">
							<div class="template_img">
								<img src="../img/talent.png" >
							</div>
							<span class="template_name">模板模板</span>
						</div>
						<div class="col-sm-2 template_item">
							<div class="template_img">
								<img src="../img/talent.png" >
							</div>
							<span class="template_name">模板模板</span>
						</div>
						<div class="col-sm-2 template_item">
							<div class="template_img">
								<img src="../img/talent.png" >
							</div>
							<span class="template_name">模板模板</span>
						</div>
					</div>
				</div>
			</div>
			<div class="warp contact bg_g">
				<div class="container">
					<div class="row">
						<div class="col-sm-6 contact_way">
							<p>任何问题或建议</p>
							<div>
								<p>邮箱：<a href="">751285829@qq.com</a></p>
							</div>
						</div>
						<div class="col-sm-6 contact_github">
							<img src="../img/github.png" class="github_logo">
							<a href="">fork me on github</a>
						</div>
					</div>
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
		background-color: #f5f5f5;
	}
	.template_head{
		text-align: left;
		font-size: 20px;
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
	.template_list{
		padding-bottom: 30px;
	}
	.template_head{
		margin-bottom: 20px;
	}
	.template_img{
		background-color: #fafafa;
		width: 138px;
		height: 138px;
		border-radius: 8px;
		border:1px solid #ddd;
		line-height: 138px;
	}
	.template_img img{
		vertical-align: middle;
		max-width: 80px;
		line-height: 138px;
	}
	.template_name{
		font-size: 14px;
		display: block;
		margin-top: 10px;
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
</style>