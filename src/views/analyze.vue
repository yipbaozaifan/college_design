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
			<div class="published">
				<a class="sub_nav_item" v-show = 'now_survey.status==0' v-on:click='share()'>分享</a>
				<a class='sub_nav_item start_btn' v-if='now_survey.status==1' v-on:click='publish()'>开始发布</a>
				<a class="sub_nav_item pause_btn" v-if='now_survey.status==0' v-on:click='pause()'>暂停发布</a>
				<a class="sub_nav_item disable_btn" v-if='now_survey.status==-1'>已回收</a>
			</div>
		</div>
	</div>
	<div class="analyze_warp">
		<div class="analyze_content">
			<div class="analyze_main">
				<div class="analyze_main_content">
					
				</div>
			</div>
			<div class="analyze_sidebar">
				<ul>
					<li class="sidebar_tab_item"></li>
					<li class="sidebar_tab_item"></li>
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
	}
</style>