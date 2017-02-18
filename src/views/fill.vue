<template>
	<div class="fill">
			<div class="fill_content">
				<div class="container fill_main">
					<div class="survey_title">
							<div class="inner">
								<div class="title_content">
									<p>
										问卷标题
									</p>
								</div> 
							</div>
					</div>
					<div class="survey_intro">
							<div class="inner">
								<div class="intro_content">
									<p>
										问卷欢迎语
									</p>
								</div>
							</div>
					</div>
					<div class="question">
						<div class="inner">
							<div class="title">
								<div class="title_index">
									<span class="question_index">
										 2
									</span>
									.
								</div>
								<div class="title_text">
									<p>
										问题问题问题问题问题
										<span style="color: #53aaf3;margin-left: 3px;">
											[多选题]
										</span>
										<span style="color: red;">
											*
										</span>
									</p>
								</div>
							</div>
							<div class="description">
								<div class="description_text">
									描述描述描述描述描述
								</div>
							</div>
							<div class="input">
								<div class="fill_option_item">
									<checkbox value="one" type="info">选项1选项1选项1</checkbox>
								</div>
								<div class="fill_option_item">
									<checkbox value="one" type="info">选项1选项1选项1</checkbox>
								</div>
								<div class="fill_option_item">
									<checkbox value="one" type="info">选项1选项1选项1</checkbox>
								</div>
								<div class="fill_option_item">
									<radio value="two" type="info">选项2选项2选项2</radio>
								</div>
								<div class="fill_from_input">
									<vueinput type="textarea" required></vueinput>
								</div> 
							</div>
						</div>
					</div>
					<div class="survey_control">
						<div class="inner">
							<a href="" class="survey_btn next_btn">提交</a>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
	import $ from 'jquery'; 
	import api from '../tools/api/dataApi.js';
	import {checkbox} from 'vue-strap';
	import {radio} from 'vue-strap';
	import {input as vueinput} from 'vue-strap';
	export default {
		components: {
			checkbox,
			radio,
			vueinput
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
	.fill{
		width: 100%;
		height: 100%;
		background-color: #e6e6e6;
	}
	.fill p{
		margin: 0;
	}
	.fill_content{
		padding-top: 50px;
	}
	.fill_main{
		background-color: #fff;
		padding-top: 80px;
	}
	h2{
		color:#fff;
	}
	.survey_title{
		text-align: center;
		font-weight: 500;
		padding:5px 0;
		font-size: 24px;
		font-family: '微软雅黑';
	}
	.survey_intro{
		font-size: 14px;
		padding: 5px 0;
		text-align: left;
	}
	.title_content,.intro_content{
		padding: 10px 0;
		
	}
	.survey_control{
		overflow: hidden;
		padding-top: 30px;
		padding-bottom: 10px;
		text-align: center;
	}
	.survey_btn{
		background-color: #479de6;
		height: 40px;
		line-height: 40px;
		border-radius: 3px;
		text-align: center;
		width: 85px;
		padding: 0 10px;
		font-size: 16px;
		color: #fff;
		display: inline-block;
	}
	.question{
		padding: 15px 0;
	}
	.title_index,.title_text{
		display: inline-block;
	}
	.description{
		font-size: 12px;
		padding-bottom: 10px;
		margin-top: 5px;
	}
	.inner{
		max-width: 80%;
		margin : 0 auto;
	}
</style>