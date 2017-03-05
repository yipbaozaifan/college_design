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
	<div class="sub_header">
		<div class="sub_header_content">
			<div class="sub_nav">
				<a class="sub_nav_item" v-on:click="go_edit()">编辑问卷</a>
				<a class="sub_nav_item">选择背景</a>
				<a class="sub_nav_item current" href="">统计分析</a>
			</div>
		</div>
	</div>
	<div class="analyze_warp">
		<div class="analyze_content">
			<div class="analyze_main">
				<div class="analyze_main_content">
					<div class="analyze_chart"></div>
				</div>
			</div>
			<div class="analyze_sidebar">
				<ul>
					<li class="sidebar_item current">
						<a class="iconLink overview_ico">
							<div class="icon">
								<i class="needle"></i>
							</div>
							<div class="wording">问卷概况</div>
						</a>
					</li>
					<li class="sidebar_item">
						<a class="iconLink recycle_ico">
							<div class="icon">
								<i class="recycle_inner_line recycle_inner_line_1"></i>
								<i class="recycle_inner_line recycle_inner_line_2"></i>
								<i class="recycle_inner_line recycle_inner_line_3"></i>
							</div>
							<div class="wording">样本数据</div>
						</a>
					</li>
					<li class="sidebar_item">
						<a class="iconLink chart_ico">
							<div class="icon">
								<i class="left_fan recycle_fan"></i>
								<i class="right_fan recycle_fan"></i>
								<i class="bg_fan recycle_fan"></i>
							</div>
							<div class="wording">统计图表</div>
						</a>
					</li>
				</ul>
			</div>
		</div>	
	</div>
	<backtop></backtop>
</template>

<script>
	import api from '../tools/api/dataApi.js';
	import backtop from '../components/backTop.vue';
	import {navbar} from 'vue-strap';
	import {modal} from 'vue-strap';
	export default {
		components: {
	      backtop,
	      navbar,
	      modal
    	},
		data(){
			return{
				login_user:{
					user:{
						user_id : '213213'
					},
					survey_num:0
				},
				now_survey:{
					_id:'1232313',
					status:1
				},
				survey_link:'http://localhost:8080/#!/fill/',
				questions:[
					{title:'dsfkljfkldsfjsk',desc:'sdfdsfds',type:'checkbox',
					options:['sldjfdskl','fsldjfdskl','sldjfdskl']
					},
					{title:'dfsfdsfs ',desc:'dsfdfsd ',type:'radio',
					options:['sldjfdskl','fsldjfdskl','sldjfdskl']
					},
					{title:'dfdsfdsfds',desc:'dfsdfdff',type:'text',options:[]},
				], 
				now_tab:0,
				now_page:0,
				page_index:1,
				timer:null,
				append_opt_count:0,
				title:"问卷标题",
				intro:'为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
				end:"问卷到此结束，感谢您的参与！"
			}
		},  
		methods:{
			go_edit(){
				var user_id = this.login_user.user.user_id;
				var survey_id = this.now_survey._id;
				this.$router.go({name:'edit',params:{user_id:user_id,survey_id:survey_id}});
			}
		},
		route:{
		}
	}
</script>

<style type="text/css">
	ul{
		margin: 0;
		padding: 0;
	}
	h2{
		color:#fff;
	}
	@keyframes needle{
		0% {
    		transform: rotate(0deg);
  		} 
	  	25% {
	    	transform: rotate(25deg);
	  	}
	  	50% {
	    	transform: rotate(-15deg);
	  	}
	  	75% {
	    	transform: rotate(10deg);
	  	}
	  	100% {
	    	transform: rotate(0deg);
	  	}
	}
	@keyframes recycleline{
		0%{width: 14px;}
		100%{width: 0px;}
	}
	@keyframes rightfan{
		0%{
			transform: rotate(70deg);
		}
		50%{
			transform: rotate(140deg);
		}
		100%{
			transform: rotate(0deg);
		}
	}
	.analyze_warp{
		height: 100%;
		background-color: #f0f0f0;
		padding-top: 50px;
		overflow: hidden;
	}
	.analyze_content{
		height: 100%;
	}
	.analyze_main{
		float: left;
		height: 100%;
		width: 100%;
	}
	.analyze_main_content{
		margin-left: 130px;
		height: 100%;
	}
	.analyze_sidebar{
		float: left;
		height: 100%;
		background-color: #fafafa;
		width: 130px;
		margin-left:-100%; 
		border-right: 1px solid #e0e0e0;
		padding-top:14px; 
	}
	.sidebar_item{
		text-align: center;
		display: block;
		cursor: pointer;
		padding: 15px 0;
	}
	.sidebar_item .iconLink{
		display: block;
		width: 50%;
		margin:0 auto;
		position: relative;
	}
	.sidebar_item .iconLink .icon{
		margin: 0 auto 5px auto;
		background-image: url(../img/sprites_ico.png);
	}
	/*overview hover*/
	.sidebar_item:hover .overview_ico .icon{
		background-position: -215px -529px;
	}
	.sidebar_item:hover .overview_ico .icon .needle{
		background-position: -137px -529px;
		animation: needle 1s linear infinite alternate;
	}
	/*overview hover end*/
	/*recycle hover*/
	.sidebar_item:hover .recycle_ico .icon{
		background-position: -492px -488px;
	}
	.sidebar_item:hover .recycle_ico .icon .recycle_inner_line{
		background-color: #58a6e7;
		animation: recycleline 0.6s linear infinite alternate;
	}
	.sidebar_item:hover .recycle_ico .icon .recycle_inner_line.recycle_inner_line_1{
		animation-delay: 0s;
	}
	.sidebar_item:hover .recycle_ico .icon .recycle_inner_line.recycle_inner_line_2{
		animation-delay: 0.2s;
	}
	.sidebar_item:hover .recycle_ico .icon .recycle_inner_line.recycle_inner_line_3{
		animation-delay: 0.4s;
	}
	/*recycle hover end*/
	/*chart hover*/
	.sidebar_item:hover .chart_ico .icon {
		border-color: #58a6e7;
	}
	.sidebar_item:hover .chart_ico .icon .bg_fan{
		background-color: #58a6e7;
	}
	.sidebar_item:hover .chart_ico .icon .right_fan{
		animation: rightfan 2s linear infinite alternate;
	}
	/*chart hover end*/
	/*overview*/
	.sidebar_item .overview_ico .icon{
		background-position: -176px -529px;
		width: 38px;
		height: 38px;
		position: relative;
	}
	.sidebar_item.current .overview_ico .icon{
		background-position: -215px -529px;
	}
	.sidebar_item .overview_ico .icon .needle{
		display: block;
		background-image: url(../img/sprites_ico.png);
		background-position: -137px -529px;
		position: absolute;
		top: 0;
		left: 0;
		width: 38px;
		height: 38px;
	}
	.sidebar_item.current .overview_ico .icon .needle{
		background-position: -137px -529px;
	}
	/*overview end*/
	/*recycle*/
	.sidebar_item .recycle_ico .icon{
		background-position: -375px -488px;
		width: 38px;
		height: 38px;
		position: relative;
	}
	.sidebar_item .recycle_ico .icon .recycle_inner_line{
		display: block;
		height: 3px;
		width: 14px;
		border-radius: 3px;
		position: absolute;
		background-color: #999;
		left: 50%;
		margin-left:-7px; 
	}
	.sidebar_item .recycle_ico .icon .recycle_inner_line.recycle_inner_line_1{
		top:15px;
	}
	.sidebar_item .recycle_ico .icon .recycle_inner_line.recycle_inner_line_2{
		top:20px;
	}
	.sidebar_item .recycle_ico .icon .recycle_inner_line.recycle_inner_line_3{
		top:25px;
	}
	/*recycle end*/
	/*chart*/
	.sidebar_item .chart_ico .icon{
		box-sizing: content-box;
		background-image: none;
		border:2px solid #999;
		width: 30px;
		height: 30px;
		border-radius: 30px;
		margin-bottom: 8px;
		color: #fff;
		position: relative;
	}
	.sidebar_item .chart_ico .icon .recycle_fan{
		display: block;
		position: absolute;
	}
	.sidebar_item .chart_ico .icon .left_fan{
		left: 0px;
		top: 0px;
		width: 15px;
		height: 30px;
		border-radius: 30px 0 0 30px;
		background-color: #fafafa;
		z-index: 1;
	}
	.sidebar_item .chart_ico .icon .right_fan{
		left: 15px;
		top: 0px;
		width: 15px;
		height: 30px;
		border-radius:0 30px 30px 0px;
		background-color: #fafafa;
		z-index: 1;
		transform-origin: 0 50%;
		transform: rotate(70deg);
	}
	.sidebar_item .chart_ico .icon .bg_fan{
		left: -1px;
		top: -1px;
		width: 31px;
		height: 31px;
		border-radius: 31px;
		overflow: hidden;
		background-color: #999;
		z-index: 0;
	}
	/*chart end*/
</style>