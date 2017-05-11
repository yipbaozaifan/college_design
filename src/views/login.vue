<template>
	<div class="container " style="text-align: center;" id="loginPage">
		<el-row>
			<el-col :span="10" :offset="12" class="login-pannel">
					<h3 style="color: #31b0d5">welcome</h3>
					<el-input v-model="username" placeholder="username"></el-input>
					<el-input v-model="password" placeholder="password" type="password"></el-input>
					<div class="operation">
						<el-button type="primary" :loading="loading" v-on:click="login()">登录</el-button>
					</div>
					<div class="other_choices">
						<el-button type="text">注册</el-button>
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
				password : '',
				keyword : 0,
				user : '',
				loading : false
			}
		},  
		methods:{
			login(){
				//var xhr = new XMLHttpRequest();
				this.loading = true;
				var username = this.username;
				var password = this.password;
				var data = {
					username:username,
					password:password
				}
				this.$http.get('/login',{params:data}).then(function(res){
					console.log(res.data);
					var user_id = res.data.data[0]._id;
					this.$router.push({name:'show',params:{user_id:user_id}});
				},function(err){
					console.log(err);
				})
			},
			reset(){
				this.username = "";
				this.password = "";
			}
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
		overflow: hidden;
	}
	.login-pannel{
		box-shadow: 0 0 5px #eee;
		border-radius: 15px;
		margin-top: 150px;
		padding: 1.5em;
		background: #fff;
	}
	.login-pannel input{
		display: block;
		width: 80%;
		margin: 10px auto;
		padding: 10px 0 10px 10px;
    	line-height: 18px;
    	font-size: 1em;
	}
	.login-pannel h2{
		color: #31b0d5;
		margin-top: 0;
	}
	.login_btn{
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
	.operation .el-button{
		margin: 10px auto;
		width: 80%;
	}
</style>