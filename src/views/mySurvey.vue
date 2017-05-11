<template>
	<div class="mySurvey">
		<el-menu theme="light" :default-active="activeIndex" mode="horizontal" >
			<el-menu-item index="create">
				<router-link :to="{name:'create',params:{user_id:login_user.user_id}}" >创建问卷
				</router-link>
			</el-menu-item>
			<el-menu-item index="mySurvey">
				<router-link :to="{name:'mysurvey',params:{user_id:login_user.user_id}}">我的问卷
				</router-link>
			</el-menu-item>
		</el-menu>
		<div class="page_intro">
			<h2>我的问卷</h2>
		</div>
		<div class="warp survey_content">
			<span class="survey_item" v-for="item in survey_items">
				<img src="../img/2.jpg" class="survey_img">
				<div class="title_warp">
					<a class="mysurvey_title" v-on:click="go_edit(item._id)">{{item.survey_name}}</a>
					</div>
				<div class="status_warp">
					<span>状态：</span>
					<span>{{item.status}}</span>
				</div>
			</span>
		</div>
	</div>	
</template>

<script>
	export default {
		data(){
			return{
				login_user:{},
				survey_items:[]
			}
		},
		created(){
			this.fetchData();
		},  
		methods:{
			go_edit(template_id){
				this.$router.push({name:'edit',params:{user_id:this.login_user.user_id,survey_id:template_id}})
			},
			fetchData(){
				this.login_user.user_id = this.$route.params.user_id;
				var vm = this;
				this.$http.get('/my_surveys',{
					params : {
						user_id : this.login_user.user_id
					}
				}).then(function(res){
					vm.survey_items = res.data.data[0].surveys;
				},function(err){
					console.log('error')
				})
			}
		},

	}
</script>

<style type="text/css">
	.mySurvey{
		overflow: hidden;
	}	
	.survey_content{
		padding: 50px 10px;
		margin :0 auto;
		text-align: center;
	}
	#splitor{
		margin: 0 3px;
	}
	.page_intro{
		background-color: #f8f8f8;
		padding:0 20px;
		height: 60px;
	}
	.page_intro h2{
		color: #333;
		margin: 0;
		font-size: 1.5em;
		line-height: 60px;
	}
	.survey_item{
		display: inline-block;
		text-align: left;
		vertical-align: top;
		cursor: pointer;
		overflow: hidden;
		position: relative;
		background-color: #fafafa;
		width: 178px;
		height: 252px;
		border-radius: 2px;
		border:1px solid #d6d6d6;
		box-shadow: 0 0 3px rgba(255,255,255,0.8);
		margin:20px 18px 0 18px;
	}
	.survey_item:hover .title_warp{
		height: 177px;
		top: 0;
	}
	.survey_item:hover .status_warp{
		height: 75px;
		bottom: 0;
	}
	.survey_img{
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
	}
	.title_warp{
		display: block;
		position: absolute;
		width: 100%;
		top :178px;
		padding: 15px; 
		height: 75px;
		background-color: rgba(255,255,255,0.8);
		transition: height 0.3s,top 0.3s;
	}
	.status_warp{
		width: 100%;
		display: block;
		position: absolute;
		height: 1px;
		bottom: -73px;
		line-height: 73px;
		background-color: #fafafa;
		text-align: left;
		transition:bottom 0.3s;
	}
</style>