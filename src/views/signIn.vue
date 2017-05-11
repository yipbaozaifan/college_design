<template>
	<div class="container " style="text-align: center;" id="loginPage">
		<el-row>
			<el-col :span="10" :offset="12" class="login-pannel">
					<h3 style="color: #31b0d5">join us</h3>
					<el-input v-model="username" placeholder="username"></el-input>
					<el-input v-model="password" placeholder="password" type="password"></el-input>
					<div class="operation">
						<el-button type="primary" :loading="loading" v-on:click="signUp">注册</el-button>
					</div>
					<div class="other_choices">
						<el-button type="text">登录</el-button>
						<span>|</span>
						<el-button type="text">返回</el-button>
					</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				username : '',
				password : ''
			}
		},  
		methods:{
			signUp(){
				//var xhr = new XMLHttpRequest();
				var username = this.username;
				var password = this.password;
				var data = {
					'username':username,
					'password':password,
					'nicName':'野仔湛'
				}
				var result = this.$http.post('/signIn',data).then(function(res){
					console.log(res);
				},function(err){
					console.log(err);
				})
			}
		},
		beforeRouteEnter(to,from,next){
			next(vm => {
				vm.username = "";
				vm.password = "";
			})
		}
	}
</script>`

<style type="text/css">
	#loginPage{
		width: 100%;
		min-height: 700px;
		text-align: center;
		background: url('../img/bg1.jpg');
		background-size: cover;
	}
	.login-pannel{
		box-shadow: 0 0 5px #eee;
		border-radius: 15px;
		margin-top: 150px;
		padding: 1.5em;
		background: #fff;
	}
	.signup_btn{
		width: 100%;
		background-color: #31b0d5;
		padding: 0 1.5em;
		color: #fff;
		display: inline-block;
		line-height:38px ;
		border-radius: 5px;
	}
	.other_choices a {
		color: #999;
	}
</style>