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
	<div class="sub_header">
		<div class="sub_header_content">
			<div class="sub_nav">
				<a href="" class="sub_nav_item current">编辑问卷</a>
				<a href="" class="sub_nav_item">选择背景</a>
				<a href="" class="sub_nav_item">统计分析</a>
			</div>
		</div>
	</div>
	<div class="editor_main">
		<div class=" warp survey_warp">
			<div class="survey_pages_tab">
				<a href="" class="pages_preview">
					<i> < </i>
				</a>
				<ul class="pages_warp">
					<li id="first_page" class="pages_item current">
						<span>封面</span>
					</li>
					<li v-for = "item in pages_array" class="pages_item">
						<span>第一页</span>
						<a href="" class="pages_remove">x</a>
					</li>
					<li id="last_page" class="pages_item">
						<span>结束语</span>
					</li>
				</ul>
				<a href="" class="pages_next">
					<i> > </i>
				</a>
				<a href="" class="pages_more">
					<i>+</i>
				</a>
			</div>
			<div class="survey_main">
				<div class="cover" v-show="now_page == 0">
					<h2 class="title_content" contenteditable="true" v-edit="title">{{title}}</h2>
					<p class="intro_content" contenteditable="true" v-edit='intro'>{{intro}}</p>
				</div>
				<div class="the_end" v-show="now_page == -1">
					<img src="../img/end.png" class="end_pic">
					<p class="end_content" contenteditable="true" v-edit='end'>{{end}}</p>
				</div>
				<div class="question_warp container" v-show="now_page!=0&&now_page!=-1">
					<div class="row edit_title">
						<label class="row_title">题目</label>
						<div class="row_content">
							<div class="mod_editor" >
								<p contenteditable="true" v-edit="title">{{title}}</p>
							</div>
						</div>
					</div>
					<div class="row edit_description">
						<label class="row_title">备注</label>
						<div class="row_content">
							<div class="mod_editor">
								<p contenteditable="true" v-edit="title">{{title}}</p>
							</div>
						</div>
					</div>
					<div class="row edit_type">
						<div class="row_content">
							<select id="question_type">
								<option value="radio">单选题</option>
								<option value="checkbox">多选题</option>
								<option value="select">下拉题</option>
								<option value="text">单行文本题</option>
								<option value="textarea">多行文本题</option>
							</select>
							<label>
								<input type="checkbox" name="question_require" checked> 必填
							</label>
						</div>
					</div>
					<div class="row edit_options">
						<ul class="options_list">
							<ul class="normal_options">
								<li class="option_item">
									<div class="option_input_warp">
										<div class="mod_editor" style="width: 100%">
											<p contenteditable="true">选项1</p>
										</div>
									</div>
									<a class="btn del_btn">x</a>
								</li>
							</ul>
							<li class="option_item option_create">
								<div class="option_input_warp">
									<p class="add_option ">新建选项</p>
								</div>
							</li>
						</ul>
					</div>
					<div class="row edit_control">
						<a href="" class="btn">保存</a>
						<a href="" class="btn">取消</a>
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
				login_user:{
					user:{},
					survey_num:0
				},
				questions:[
					{ desc:'',type:'checkbox'}
				],
				login_role:"",
				is_user:false,
				is_admin:false,
				pages_array:[
					{ index : 1 },
					{ index : 2 },
					{ index : 3 },
					{ index : 4 },
					{ index : 4 },
					{ index : 4 },
					{ index : 4 },
				],
				now_page:1,
				title:"问卷标题",
				intro:'为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
				end:"问卷到此结束，感谢您的参与！",
			}
		},  
		methods:{
			changeTab(){
				
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
	.sub_header{
		position: fixed;
		top: 50px;
		width: 100%;
		z-index: 999;
		height: 50px;
		line-height: 50px;
		overflow: hidden;
		background-color: #f8f8f8;
		border: 1px solid #e7e7e7;
		border-width: 0 0 1px;
	}
	.sub_nav{
		font-size: 20px;
		float: left;
	}
	.sub_nav_item{
		border-left: 1px solid #f0f0f0;
		padding: 0 20px;
		color: #777;
	}
	.sub_nav .sub_nav_item:first-child{
		border-left: none;
	}
	.editor_main{
		display: block;
		margin-top: 101px;
	}
	.survey_warp{
		position: relative;
		margin-top: 40px;
		border:1px solid #dadada;
		padding: 30px 0 30px;
		font-size: 14px;
		text-align: left;
		vertical-align: middle;
	}
	.survey_pages_tab{
		position: absolute;
		top: -38px;
		left: -1px;
		right: 100px;
		font-size: 0;
		white-space:nowrap;
	}
	.pages_warp{
		max-width: 88%;
		overflow: hidden;
		white-space: nowrap;
		vertical-align: middle;
		display: inline-block;
		list-style-type: disc;
		padding: 0;
		margin: 0;
		font-size:0;
	}
	.pages_item{
		position: relative;
		cursor: pointer;
		background-color: #fafafa;
		display: inline-block;
		list-style: none;
		height: 38px;
		width: 96px;
		line-height: 38px;
		vertical-align: middle;
		font-size: 14px;
		text-align: center;
		white-space: nowrap;
		border:1px solid #e0e0e0;
		margin-left: -1px 
	}
	.pages_item.current{
		background-color: #fff;
    	border-bottom-color: #fff;
	}
	.pages_remove{
		display: none;
		position: absolute;
		top: 0;
		right: 10px;
		color: #333;
	}
	.pages_remove:hover{
		color: #333;
		text-decoration:none;
	}
	.pages_item:hover .pages_remove{
		display: inline-block;
	}
	.pages_preview,.pages_next,.pages_more{
		width: 20px;
		display: inline-block;
		vertical-align: middle;
		text-align: center;
		font-size: 14px;
		color: #333;
		height: 38px;
		line-height: 38px;
		background-color: #fafafa;
		border:1px solid #e0e0e0;
	}
	.row{
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.row_title{
		float: left;
		width: 40px;
		height: 36px;
		line-height: 36px;
	}
	.row_content{
		margin-left: 40px;
		min-height: 36px;
		line-height: 36px;
		width: 650px;
	}
	.mod_editor{
		padding: 0 10px;
		min-height: 36px;
		border:1px solid #e0e0e0;
		display: inline-block;
		width: 650px;
		line-height: 36px;
		vertical-align: middle;
	}
	.mod_editor p{
		margin-bottom: 0;
	}
	#question_type{
		border: 1px solid #e0e0e0;
		margin-right: 20px;
	}
	.option_item{
		position: relative;
		overflow: hidden;
		list-style-type: none;
		margin:3px 0 3px -3px;
		padding: 3px 0 3px 3px;
		font-size: 14px;
		line-height: 1.8em;
		width: 713px;
	}
	.option_input_warp{
		margin-right: 170px;
		margin-left: 40px;
		width: 500px;
	}
	.del_btn{
		position: absolute;
		color: #999999;
		top: 6px;
		right:140px;
		z-index: 1;
	}
	.add_option{
		display: inline-block;
		width: 100%;
		border:1px dashed #e0e0e0;
		padding: 6px 10px;
		color: #b2b2b2;
		cursor: pointer;
	}
	.edit_control{
		text-align: center;
	}
</style>