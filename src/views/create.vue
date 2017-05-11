<template>
	<div class="create">
			<el-menu theme="light" :default-active="activeIndex" mode="horizontal" >
		  			<el-menu-item index="create"><router-link :to="{name:'create',params:{user_id:login_user.id}}" >创建问卷
		  			</router-link>
		  			</el-menu-item>
		  			<el-menu-item index="mySurvey"><router-link :to="{name:'mysurvey',params:{user_id:login_user.id}}">我的问卷
		  			</router-link>
		  			</el-menu-item>
			</el-menu>
			<div class="create_choice">
						<el-col class="create_by_empty bg_c1" :span="12">
							<div class="type_show"></div>
							<h2 style="color:#fff">创建空白问卷</h2>
							<el-button class="start_btn" v-on:click='create' type="primary">开始创建</el-button>
						</el-col>
						<el-col class=" create_by_template bg_c2" :span="12">
							<div class="type_show"></div>
							<h2 style="color:#fff">选择问卷模板</h2>
							<el-button class="start_btn">开始创建</el-button>
						</el-col>
			</div>
	</div>
	
</template>

<script>
	export default {
		data(){
			return{
				flag:true,  
				search_flag:true,
				login_user:{
					id:''
				},
				survey_items:[],
				login_role:"",
				is_user:false,
				is_admin:false,
				users_list:[]
			}
		},  
		methods:{
			create(){
				var blank_survey = {
					user:this.login_user.id,
					intro:'为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！',
					survey_name:'问卷标题',
					end:'问卷到此结束，感谢您的参与！',
					count:0,
					status:1,
					question:0
				}
				var vm = this;
				this.$http.put('/create',blank_survey).then(function(res){
						var new_survey_id = res.data.data[0].id;
						var user_id = vm.login_user.id;
						vm.$router.push({name:'edit',params:{user_id:user_id,survey_id:new_survey_id}})
				},function(err){
					console.log('出错了')
				})
			}
		},
		beforeRouteEnter(to,from,next){
			next(vm => {
				vm.login_user.id = to.params.user_id;
			});
		}
	}
</script>

<style type="text/css">
	h2{
		color:#fff;
	}
	.create{
		text-align: center;
		overflow: hidden;
	}	
	.create_choice{
		padding-top: 50px;
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
	.create_by_empty .type_show{
		background-image: url(../img/sprites_bg.png);
		width: 154px;
		height: 152px;
		background-position: -232px 0px;
		background-repeat: no-repeat;
		margin: 140px auto 30px;
	}
	.create_by_template .type_show{
		background-image: url(../img/sprites_bg.png);
		width: 231px;
		height: 157px;
		background-position: 0px 0px;
		background-repeat: no-repeat;
		margin: 135px auto 30px;
	}
	.start_btn{
		background-color: #fff;
	}
	.col-sm-6{
		padding-bottom: 30px;
	}
</style>