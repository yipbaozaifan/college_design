<template>
		<div class="main">
				<el-menu theme="light" :default-active="activeIndex" mode="horizontal" >
		  			<el-menu-item index="create"><router-link :to="{name:'create',params:{user_id:login_user.user_id}}" >创建问卷
		  			</router-link>
		  			</el-menu-item>
		  			<el-menu-item index="mySurvey"><router-link :to="{name:'mysurvey',params:{user_id:login_user.user_id}}">我的问卷
		  			</router-link>
		  			</el-menu-item>
				</el-menu>
				<div style="padding:0;">
					<div class="slide_bar">
						<el-carousel height="600px">
						    <el-carousel-item>
						    	<div class="carousel_item">
						    		<h2>纯净简约的问卷系统</h2>
						    		<h3>无广告，简约好用，轻松开启在线调研</h3>
						    		<img src="../img/ads_slider_p1.png" class="slide_img">
						    	</div>
						    </el-carousel-item>
						    <el-carousel-item>
						    	<div class="carousel_item">
						    		<h2>纯净简约的问卷系统</h2>
						    		<h3>无广告，简约好用，轻松开启在线调研</h3>
						    		<img src="../img/ads_slider_p2.png" class="slide_img">
						    	</div>
						    </el-carousel-item>
						    <el-carousel-item>
						    	<div class="carousel_item">
						    		<h2>纯净简约的问卷系统</h2>
						    		<h3>无广告，简约好用，轻松开启在线调研</h3>
						    		<img src="../img/ads_slider_p3.png" class="slide_img">
						    	</div>
						    </el-carousel-item>
  						</el-carousel>
					</div>
				</div>
				<div class="warp intro bg_w">
					<div class="container">
						<el-row>
							<el-col :span="12">
								<span class="users_num">{{survey_sum}}</span>
								<span>人在正在使用</span>
							</el-col>
							<el-col class='entry' :span="12">
								<el-button type="info">立即使用</el-button>
							</el-col>
						</el-row>
						<hr style="width: 100%">
					</div>
				</div>
				<div class="warp template bg_w">
					<div class="container">
						<el-row>
							<el-col class="template_head" :span="24">
								<span>使用模板</span>
							</el-col>
						</el-row>
						<el-row class="template_list" :gutter="10">
							<el-col class="template_item" :span="4" v-for="item in template_list" v-on:click="useTemplate(item.template_id,login_user.id)">
								<div class="template_img">
									<img v-bind:src="item.template_head" >
								</div>
								<span class="template_name">{{item.template_name}}</span>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="warp contact bg_g">
					<div class="container">
						<el-row class="row">
							<el-col class="contact_way" :span="12">
								<p>任何问题或建议</p>
								<div>
									<p>邮箱：<a href="">751285829@qq.com</a></p>
								</div>
							</el-col>
							<el-col class="contact_github" :span="12">
								<img src="../img/github.png" class="github_logo">
								<a href="">fork me on github</a>
							</el-col>
						</el-row>
					</div>
				</div>
		</div>	
</template>

<script>
	export default {
		data(){
			return{
				flag:true,  
				search_flag:true,
				login_user:{},
				template_list:[
					{template_name:"模板1",template_id:'1112332',template_head:'./src/img/talent.png'},
					{template_name:'模板2',template_id:'1232312',template_head:'./src/img/talent.png'},
					{template_name:'dsdfdf',template_id:'1233231',template_head:'./src/img/talent.png'},
					{template_name:'dsfsfs',template_id:'2133212',template_head:'./src/img/talent.png'},
					{template_name:'sdfdssf',template_id:'3123213',template_head:'./src/img/talent.png'},
					{template_name:'fddasd',template_id:'1232132',template_head:'./src/img/talent.png'}
				],
				survey_sum:1000,
				survey_items:[],
				login_role:"",
				is_user:false,
				is_admin:false,
				users_list:[]
			}
		}, 
		created(){
			this.fetchData();
		},
		methods:{
			fetchData(){
				var user_id = this.$route.params.user_id;
				this.$http.get('/search_user',{
					params:{user_id:user_id}
				}).then(function(res){
					this.login_user = res.data.data[0];
				},function(err){
					console.log('出错了');
				})
			},
			useTemplate(template_id,user_id){
				this.$router.push({name:'edit',params:{user_id:user_id,survey_id:template_id}})
			}
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
	.carousel_item{
		height: 600px;
		background:url(../img/slide.jpg);
		background-size: 100%; 
	}
	.carousel_item h2{
		font-size: 50px;
		padding-top: 100px;
	}
	.carousel_item h3{
		font-size: 20px;
		color: #fff;
		margin-bottom:20px; 
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
		width: 95%;
		margin: 0 auto;
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
	.template_item{
		cursor: pointer;
	}
	.template_item:hover .template_name{
		color: #58a6e7;
	}
	.template_head{
		margin-bottom: 20px;
	}
	.template_img{
		margin: 0 auto;
		background-color: #fafafa;
		width: 120px;
		height: 120px;
		border-radius: 8px;
		border:1px solid #ddd;
		line-height: 120px;
	}
	.template_img img{
		vertical-align: middle;
		max-width: 80px;
		line-height: 120px;
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