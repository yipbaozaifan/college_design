<template>
	<div class="fill">
			<div class="fill_content">
				<div class="container fill_main">
					<div class="survey_title" v-show="now_page==0">
							<div class="inner">
								<div class="title_content">
									<p>
										{{now_survey.survey_name}}
									</p>
								</div> 
							</div>
					</div>
					<div class="survey_intro" v-show="now_page==0">
							<div class="inner">
								<div class="intro_content">
									<p>
										{{now_survey.intro}}
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
									{{now_survey.end}}
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
										<span style="color: red;" v-if = 'questions[now_page-1].type.required'>
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
							<a class="survey_btn next_btn" v-show='now_page==questions.length' v-on:click="submit(questions[now_page-1].type,questions[now_page-1].required)">提交</a>
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
				now_survey:{},
				questions:[],
				answers:[],
				now_page:0,
				target:{}
			}
		},  
		methods:{
			start(){
				if(this.questions.length==0){
					this.now_page = -1;
				}else{
					this.now_page = 1;
				}
			},
			page_preview(){
				this.now_page--;
			},
			verify(type,required){
				if(type == 'radio' ||type == 'text' || type == 'textarea'){
					if(required&&this.questions[this.now_page-1].value==''){
						return false;
					}else{
						return true;
					}
				}else if ( type == 'checkbox'){
					var checked_box = document.querySelectorAll("input:checked");
					var checked_value = [];
					if(required&&checked_box.length==0){
						return false;
					}else{
						return true;
					}
				}
			},
			page_next(type,required){
				var result = this.verify(type,required);
				if(result){
					this.now_page++;
				}else{
					alert('此题必填');
				}
			},
			submit(type,required){
				var _target = this.target;
				var _survey_id = this.now_survey._id;
				if(this.verify(type,required)){
					for(var i = 0;i<this.questions.length;i++){
						var _value = [];
						var _question = this.questions[i]._id;
						var answer= {
							target:_target,
							survey:_survey_id,
							question:_question
						}
						if(this.questions[i].type=='checkbox'){
							for(var j=0;j<this.questions[i].options.length;j++){
								if(this.questions[i].options[j].checked){
									_value.push(this.questions[i].options[j].value);
								}
							}
						}else{
							_value.push(this.questions[i].value);
						}
						answer.value = _value;
						this.answers.push(answer);
					}
					var data = {
						target : this.target,
						answers : this.answers
					}
					this.$http.post('/submit',data).then(function(data){
						console.log(data.data);
						this.now_page = -1;
					},function(err){
						console.log('error');
					})
				}else{
					alert('此题必填')
				}
				
			}
		},
		route:{
			activate(transition){
				var current_survey = this.$route.params.survey_id;
				var vm = this;
				this.$http.get('/get_survey',{
					params:{
						survey_id:current_survey,
						get_target : true
					}
				}).then(function(res){
					vm.now_survey = res.data.data[0];
					console.log(res.data.data);
					if(res.data.data[1].target){
						vm.target = res.data.data[1].target;
					}else{
						console.log('出错了！');
						return false;
					}
					if(!vm.now_survey.question==0){
						//获取问题
						var belong_survey = vm.now_survey._id
						vm.$http.get('/get_questions',{
							params:{belong_survey:belong_survey}
						}).then(function(res){
							console.log(res.data);
							vm.questions = res.data.data[0].questions;
						},function(err){
							console.log('出错了')
						})
					}
				},function(err){
					console.log('出错了');
					return;
				});
				transition.next();
			}
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