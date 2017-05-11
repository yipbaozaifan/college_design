<template>
	<div id="homePage">
		<div class="mask"></div>
		<div class="container">
			<el-row>
				<el-col :span = "24">
					<div class="intro-message">
						<p class="home_title">share world</p>
						<p class="home_intro">简单免费的问卷平台</p>
						<hr style="width:40%;">
						<ul class="list-inline">
							<li>
								<router-link to="/loginPage" ><el-button>登录</el-button></router-link>
							</li>
							<li>
								<router-link to="/signInPage" ><el-button>注册</el-button></router-link>
							</li>
						</ul>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>	
</template>

<script>
	import {navbar} from 'vue-strap';
	export default {
		components:{
			navbar
		},
		data(){
			return{
				
			}
		},  
		methods:{
			
		}
	}
</script>

<style type="text/css">
	html,body{
		height: 100%;
	}
	.mask{
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: rgba(0,0,0,0.6);
		top: 0;
		left: 0;
	}
	#homePage{
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		background: url(../img/bg1.jpg);
		background-size: cover;
	}
	.intro-message{
		margin-top:200px;
		color: #fff;
	}
	.home_title{
		font-size: 3rem;
		margin-bottom: 10px;
	}
	.home_intro{
		font-size: 2rem;
		margin-bottom: 10px;
	}
</style>

