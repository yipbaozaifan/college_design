<template>
	<div class="container " style="text-align: center;" id="loginPage">
		<div class="row">
				<div class="login-pannel col-md-4 col-md-offset-4">
					<h2>join us</h2>
					<input type="text" name="username" v-model="username" placeholder="username">
					<input type="password" name="password" v-model="password" placeholder="password">
					<div style="width: 75%;margin: 20px auto 0 auto">
						<a class="signup_btn" v-on:click = "signUp">注册</a>
						<a class="home_btn" v-link = "{name:'home'}">首页</a>
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
				password : ''
			}
		},  
		methods:{
			signUp(){
				//var xhr = new XMLHttpRequest();
				var username = this.username;
				var password = this.password;
				var data = {
					username:username,
					password:password
				}
				var result = api.fnc.NewUserSignUp(data);
				console.log(result);
				if(result){
					this.$router.go({name : 'home'});
				}else{
					alert("用户已经存在");
				}
			}
		},
		router:{
			data(transition){
				this.username='';
				this.password='';
				this.user = '';
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
	.signup_btn,.home_btn{
		background-color: #31b0d5;
		padding: 0 1.5em;
		color: #fff;
		display: inline-block;
		line-height: 2em;
		border-radius: 5px;
	}
</style>