<template>
	<div class="fill">
			<div class="fill_content">
				<div class="container fill_main">
					<div class="survey_title" v-show="now_page==0">
							<div class="inner">
								<div class="title_content">
									<p>
										{{title}}
									</p>
								</div> 
							</div>
					</div>
					<div class="survey_intro" v-show="now_page==0">
							<div class="inner">
								<div class="intro_content">
									<p>
										{{intro}}
									</p>
								</div>
							</div>
					</div>
					<div class="survey_end" v-show="now_page==-1">
						<div class="inner">
							<div class="end_content">
								<img src="../img/end.png">
								<p>&nbsp;</p>
								<p>
									{{end}}
								</p>
							</div>
						</div>
					</div>
					<div class="question" v-if="now_page!=-1&&now_page!=0">
						<div class="inner">
							<div class="title">
								<div class="title_index">
									<span class="question_index">
										 {{now_page}}
									</span>
									.
								</div>
								<div class="title_text">
									<p>
										{{questions[now_page-1].title}}
										<span style="color: #53aaf3;margin-left: 3px;" v-show='questions[now_page-1].type=="checkbox"'>
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
									{{questions[now_page-1].desc}}
								</div>
							</div>
							<div class="input">
								<template v-if="questions[now_page-1].type=='checkbox'">
									<div class="fill_option_item" v-for='item in questions[now_page-1].options'>
									<checkbox :value="item.value" type="info" :checked.sync="item.checked">{{item.value}}</checkbox>
									</div>
								</template>
								<template v-if="questions[now_page-1].type=='radio'">
									<div class="fill_option_item" v-for='item in questions[now_page-1].options'>
									<radio :value="item.value" type="info" :checked.sync="questions[now_page-1].value">{{item.value}}</radio>
									</div>
								</template>
								<template v-if='questions[now_page-1].type=="text"'>
									<div class="fill_from_input" >
									<vueinput type="text" :value.sync = 'questions[now_page-1].value'></vueinput>
									</div> 
								</template>
								<template v-if='questions[now_page-1].type=="textarea"'>
									<div class="fill_from_input" >
									<vueinput type="textarea" :value.sync = 'questions[now_page-1].value'></vuein put>
									</div> 
								</template>
							</div>
						</div>
					</div>
					<div class="survey_control">
						<div class="inner">
							<a class="survey_btn" v-show='now_page>1' v-on:click="page_preview()">上一题</a>
							<a class="survey_btn next_btn" v-show='now_page>=1&&now_page<questions.length' v-on:click="page_next(questions[now_page-1].type,questions[now_page-1].required)">下一题</a>
							<a class="survey_btn next_btn" v-show='now_page==questions.length' v-on:click="submit()">提交</a>
							<a class="survey_btn" v-show='now_page==0' v-on:click="start()">开始</a>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>

<script> 
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
				now_survey:{
					_id:'12312313',
					status:1
				},
				questions:[
					{title:'dsfkljfkldsfjsk',desc:'sdfdsfds',type:'checkbox',required:true,options:[
					{value:'sldjfdskl',checked:null},
					{value:'sldjfdskl',checked:null},
					{value:'sldjfdskl',checked:null},
					],value:''},
					{title:'dfsfdsfs ',desc:'dsfdfsd ',type:'checkbox',required:false,options:[
					{value:'sldjfdskl',checked:null},
					{value:'sldjfdskl',checked:null},
					{value:'sldjfdskl',checked:null},
					],value:""},
					{title:'dfdsfdsfds',desc:'dfsdfdff',type:'textarea',required:false,options:[],value:''},
					{title:'dfsfdsfs ',desc:'dsfdfsd ',type:'radio',required:true,options:[
					{value:'sldjfdskl',checked:null},
					{value:'sdfsdf ',checked:null},
					{value:'123123',checked:null},
					],value:""},
					{title:'dfdsfdsfds',desc:'dfsdfdff',type:'text',required:false,options:[],value:''},
					{title:'dfdsfdsfds',desc:'dfsdfdff',type:'text',required:false,options:[],value:''},
					{title:'dfdsfdsfds',desc:'dfsdfdff',type:'text',required:false,options:[],value:''},
				],
				answers:[],
				now_page:0,
				title:"问卷标题",
				intro:'为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
				end:"问卷到此结束，感谢您的参与"
			}
		},  
		methods:{
			start(){
				this.now_page = 1;
			},
			page_preview(){
				this.now_page--;
			},
			page_next(type,required){
				if(type == 'radio' ||type == 'text' || type == 'textarea'){
					if(required&&this.questions[this.now_page-1].value==''){
						alert('此题必填');
					}else{
						this.now_page++;
					}
				}else if ( type == 'checkbox'){
					var checked_box = document.querySelectorAll("input:checked");
					var checked_value = [];
					if(required&&checked_box.length==0){
						alert('此题必填');
					}else{
						this.now_page++;
					}
				}	
			},
			submit(){
				this.now_page = -1;
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
	.survey_title,.survey_end{
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
	.end_content{
		font-size: 16px;
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