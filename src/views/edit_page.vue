<template>
	<navbar placement="top" type="default">
  		<!-- Brand as slot -->
  	  <a slot="brand" href="/" title="Home" class="navbar-brand">VueStrap</a>
  		<!-- You can use dropdown component -->
  		<!-- For right positioning use slot -->
  	  <li>
  	  	<a v-link="{name:'create',params:{user_id:login_user.id}}" class="nav_btn">创建问卷</a>
  	  </li>
  	  <li>
  	  	<a v-link="{name:'mysurvey',params:{user_id:login_user.id}}" class="nav_btn">我的问卷</a>
  	  </li>
	  <li slot="right" id="nav_userbar">
	    <img src="../img/boy.png" class="navbar_head"><span class="navbar_name">野仔湛</span><span id="splitor">|</span><a id="nav_exit_btn">退出</a>
	  </li>
	</navbar>
	<div class="sub_header">
		<div class="sub_header_content">
			<div class="sub_nav">
				<a href="" class="sub_nav_item current">编辑问卷</a>
				<a class="sub_nav_item">选择背景</a>
				<a class="sub_nav_item" v-if='now_survey.status==-1' v-on:click="go_analyze()">统计分析</a>
			</div>
			<div class="published">
				<a class="sub_nav_item" v-show = 'now_survey.status==0' v-on:click='share()'>分享</a>
				<a class='sub_nav_item start_btn' v-if='now_survey.status==1' v-on:click='publish()'>开始发布</a>
				<a class="sub_nav_item pause_btn" v-if='now_survey.status==0' v-on:click='pause()'>暂停发布</a>
				<a class="sub_nav_item disable_btn" v-if='now_survey.status==-1'>已回收</a>
			</div>
		</div>
	</div>
	<div class="editor_main">
		<div class=" warp survey_warp container">
			<div class="survey_pages_tab">
				<a class="pages_preview" v-on:click="_preview($event)">
					<i> < </i>
				</a>
				<div class="pages_warp">
					<ul id="pages_list">
						<li id="first_page" class="pages_item" v-bind:class="{'current':now_page==0}" v-on:click="changePage(0)">
							<span>封面</span>
						</li>
						<li v-for = "i in questions" class="pages_item" v-bind:class="{'current':now_page==($index+1)}" v-on:click = "changePage($index+1)">
							<span>第{{$index+1}}题</span>
							<a class="pages_remove" v-on:click = "question_remove($index)">x</a>
						</li>
						<li id="last_page" class="pages_item" v-bind:class="{'current':now_page==-1}" v-on:click = "changePage(-1)">
							<span>结束语</span>
						</li>
					</ul>
				</div>
				
				<a class="pages_next" v-on:click="_next($event)">
					<i> > </i>
				</a>
				<a class="pages_more" v-on:click="_append()">
					<i>+</i>
				</a>
			</div>
			<div class="survey_main">
				<div class="cover container" v-if="now_page == 0">
					<h2 class="title_content" contenteditable="true" v-edit="now_survey.survey_name">{{now_survey.survey_name}}</h2>
					<p class="intro_content" contenteditable="true" v-edit='now_survey.intro'>{{now_survey.intro}}</p>
				</div>
				<div class="the_end container" v-if="now_page == -1">
					<img src="../img/end.png" class="end_pic">
					<p class="end_content" contenteditable="true" v-edit='end'>{{now_survey.end}}</p>
				</div>
				<div class="question_warp container" v-if="now_page!=0&&now_page!=-1">
					<div class="row edit_title">
						<label class="row_title">题目</label>
						<div class="row_content">
							<div class="mod_editor" >
								<p contenteditable="true" v-edit="questions[now_page-1].title">{{questions[now_page-1].title}}</p>
							</div>
						</div>
					</div>
					<div class="row edit_description">
						<label class="row_title">备注</label>
						<div class="row_content">
							<div class="mod_editor">
								<p contenteditable="true" v-edit="questions[now_page-1].desc">{{questions[now_page-1].desc}}</p>
							</div>
						</div>
					</div>
					<div class="row edit_type">
						<div class="row_content">
							<select id="question_type" v-model = "questions[now_page-1].type"> 
								<option value="radio">单选题</option>
								<option value="checkbox">多选题</option>
								<option value="text">单行文本题</option>
								<option value="textarea">多行文本题</option>
							</select>
							<label>
								<input type="checkbox" name="question_require" checked> 必填
							</label>
						</div>
					</div>
					<div class="row edit_options" v-if="questions[now_page-1].type=='radio'||questions[now_page-1].type=='checkbox'">
						<ul class="options_list">
							<ul class="normal_options">
								<li class="option_item" v-for="item in questions[now_page-1].options" track-by="$index">
									<div class="option_input_warp">
										<div class="mod_editor" style="width: 100%">
											<p contenteditable="true" v-edit='questions[now_page-1].options[$index].value'>{{item.value}}</p>
										</div>
									</div>
									<a class="btn del_btn" v-on:click="del_option($index)">x</a>
								</li>
							</ul>
							<li class="option_item option_create" v-on:click="append_option()">
								<div class="option_input_warp">
									<p class="add_option ">新建选项</p>
								</div>
							</li>
						</ul>
					</div>
					<div class="row edit_control">
						<a class="btn" id="save_btn" v-on:click= "_save()">保存</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<modal :show.sync='showModal'>
		<div slot='modal-header' class="modal-header">
			<h3 class="modal-title">问卷分享</h3>
		</div>
		<div slot = 'modal-body' class="modal-body">
			<p class="">问卷链接</p>
			<div class="modal-body_warp">
				<input type="text" name="" id="share_link" v-model="survey_link">
				<button>复制</button>
				<button v-on:click="open_link(survey_link)">打开</button>
			</div>
		</div>
		<div slot='modal-footer' class="modal-footer">
			<button type="button" class="btn btn-default" @click="showModal = false">取消</button>
		</div>
	</modal>
	<backtop></backtop>
</template>

<script>
	import api from '../tools/api/dataApi.js';
	import navigation from '../components/navigation.vue';
	import backtop from '../components/backTop.vue';
	import {carousel} from 'vue-strap';
	import {slider} from 'vue-strap';
	import {navbar} from 'vue-strap';
	import {modal} from 'vue-strap';
	export default {
		components: {
	      backtop,
	      navigation,
	      carousel,
	      slider,
	      navbar,
	      modal
    	},
		data(){
			return{
				login_user:{},
				now_survey:{},
				showModal:false,
				survey_link:'http://localhost:3000/#!/fill/',
				questions:[], 
				now_page:0,
				page_index:1,
				timer:null,
			}
		},  
		methods:{
			_isRepeat(arr){
				//检测数组重复，存在重复返回true，不存在返回false
				var hash= {};
				for(var i = 0 ; i<arr.length;i++){
					if(!hash[arr[i].value]){
						hash[arr[i].value] = true;
					}else{
						return true;
					}
				}
				return false;
			},
			_isNull(arr){
				for(var i = 0;i<arr.length;i++){
					if(arr[i].value==""){
						return true;
					}
				}
				return false;
			},
			_preview(e){
				var pages_bar = document.querySelector('#pages_list');
				var current_position = (this.page_index-1)*96;
				if(current_position-96<0){
					pages_bar.style.left = 0;
				}else{
					this.page_index -= 2;
					pages_bar.style.left = '-'+this.page_index*96+'px';
				}
			},
			_next(e){
				var pages_bar = document.querySelector('#pages_list');
				var pages_warp_width= document.querySelector('.pages_warp').offsetWidth;
				var offset_width = pages_bar.offsetWidth;
				var current_position = this.page_index*96;
				if(offset_width-current_position<pages_warp_width){
					pages_bar.style.left = '-' + (offset_width-pages_warp_width) + 'px'
				}else{
					pages_bar.style.left = "-"+this.page_index*96 + 'px';
					this.page_index++;
				}
			},
			question_remove(i){
				this.now_page = 0;
				this.questions.splice(i,1);
			},
			_append(){
				var new_question = {
					survey:this.now_survey._id,
					title:'问题标题',
					desc:'备注',
					type:'radio',
					index:this.questions.length+1,
					options:[]
				}
				this.questions.push(new_question);
				this.now_survey.question++;
				this.now_page = this.questions.length;
			},
			changePage(index){
				if(index==this.now_page){
					return false;
				}else if(index==0||index==-1){
					this.now_page = index;
				}else{
					this.now_page = index;
					this.now_type = this.questions[index-1].type;		
				}
			},
			append_option(){
				this.questions[this.now_page-1].options.push({value:'',checked:false});
			},
			del_option(i){
				this.questions[this.now_page-1].options.splice(i,1);
			},
			go_analyze(){
				var _id = this.now_survey._id;
				this.$router.go({name:'analyze',params:{survey_id:_id}})
			},
			publish(){
				this.survey_link = this.survey_link+this.now_survey._id;
				this.now_survey.status=0;
				this._sava();
			},
			pause(){
				this.now_survey.status=1;
				this._sava();
			},
			share(){
				this.showModal = true;
			},
			_save(){
				//判断标题非空
				if(this.title==''){
					alert('问卷标题不能为空');
					return false;
				}
				//判断问题标题非空
				for(var i = 0;i<this.questions.length;i++){
						if(this.questions[i].title==''){
							alert("第"+i+"题标题为空");
							return false; 
						}
						if(this.questions[i].type=='radio'||this.questions[i].type=="checkbox"){
							if(this.questions[i].options.length==0){//检测有无选项
								alert("第"+(i+1)+"题未添加选项");
								return false;
							}else if(this._isNull(this.questions[i].options)){//检测存在空选项
								alert("第"+(i+1)+"题选项为空");
								return false;
							}else if(this._isRepeat(this.questions[i].options)){//检测重复选项
								alert("第"+(i+1)+"题有相同选项");
								return false;
							}
						}
				 }
				 var data = {
				 	survey : this.now_survey,
				 	questions : this.questions  
				 }
				 this.$http.post('/save_survey',data).then(function(res){
				 	console.log(res.data);
				 },function(err){
				 	console.log('fail');
				 })
			},
			open_link(url){
				window.open(url);
			}
		},
		route:{
			activate(transition){
				this.login_user.id = this.$route.params.user_id;
				var current_survey = this.$route.params.survey_id;
				var vm = this;
				this.$http.get('/get_survey',{
					params:{survey_id:current_survey}
				}).then(function(res){
					vm.now_survey = res.data.data[0];
					vm.title = res.data.data[0].survey_name;
					vm.intro = res.data.data[0].intro;
					vm.end = res.data.data[0].end;
					console.log(typeof vm.now_survey._id);
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
				})
				transition.next();
			}
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
	.editor_main{
		height: 100%;
	}
	.sub_nav_item.current{
		color: #58a6e7;
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
		overflow: hidden;
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
	.pages_warp ul{
		margin: 0;
		zoom:1;
		display: inline-block;
		position: relative;
		left : 0px;
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
		cursor: pointer;
		overflow: hidden;
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
		text-align: left;
	}
	.edit_control #save_btn{
		background-color: #53aaf3;
		color: #fff;
		margin-left:40px;
		padding-right: 20px;
		padding-left: 20px; 
	}
	.edit_control #save_btn:hover{
		background-color: #31b0d5;
	}
	.cover>.title_content{
		text-align: center;
	}
	.the_end,.the_end>.end_pic{
		display: block;
		margin: 0 auto 20px auto;
		text-align: center;
	}
	.published{
		float: right;
		font-size: 16px;
	}
	.published .sub_nav_item{
		height: 40px;
		line-height: 40px; 
		display: inline-block;
		border-radius: 5px; 
	}
	.start_btn,.pause_btn{
		background-color: #479de6;
		color: #fff;
	}
	.modal-body{
		font-size: 1.17em;
	}
	.modal-body_warp{
		text-align: center;
		position: relative;
	}
	.modal-body_warp button{
		background-color: #fff;
		border:1px solid #ccc;
		padding: 0 20px;
		border-radius: 4px;
		font-size: 14px;
		height: 34px;
		line-height: 34px;
	}
	#share_link{
		width: 370px;
		height: 34px;
		line-height: 34px;
		border-radius: 4px;
		border : 1px solid #ccc;
		outline: 0;
		font-size: 14px;
	}
</style>