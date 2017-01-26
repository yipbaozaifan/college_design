<template>
	<div class="container " style="text-align: center;" id="loginPage">
		<div class="row">
				<div class="login-pannel col-md-4 col-md-offset-4">
					<h2>welcome</h2>
					<input type="text" name="username" v-model="username" placeholder="username">
					<input type="password" name="password" v-model="password" placeholder="password">
					<div style="width: 75%;margin: 20px auto 0 auto">
						<a class="login_btn" v-on:click = "login">登录</a>
						<a class="btn" v-link = "{name:'signIn'}">没有账号？</a>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import api from '../tools/api/dataApi.js';
	export default {
		data(){
			return{
				username : '',
				password : '',
				keyword : 0,
				user : ''
			}
		},  
		methods:{
			login(){
				//var xhr = new XMLHttpRequest();
				var username = this.username;
				var password = this.password;
				var data = {
					username:username,
					password:password
				}
				var res = api.fnc.UserLogin(data);
				console.log(res);
				/*var res = "{"+
					"state:1,"+
					"data:{"+
						"user_id:'12312321',"+
						"name:'fsdfdsf',"+
						"role:'user',"+
						"url:'sdfdsfsd'"+
						"}"+
					"}"*/
				var result = res;
				//var result = res.parseJSON();
				console.log(result);
				if(result.state==0){
					console.log(result.message);
				}else if(result.state==1){
					var user =  result.data;
					window.sessionStorage.setItem("user",JSON.stringify(user));
					this.$router.go({name : 'show',params: {role:user.role}});
				}
			}
		},
		router:{
			data(transition){
				this.username='';
				this.password='';
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
	}
	.login-pannel{
		margin-top: 250px;
		padding: 1.5em;
		background: #fff;
	}
	.login-pannel input{
		display: block;
		width: 75%;
		margin: 10px auto;
		font-size: 1.5em;
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
		line-height: 2em;
		border-radius: 5px;
	}
</style>