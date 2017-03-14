<template>
	<div class="container " style="text-align: center;" id="loginPage">
		<div class="row">
				<div class="login-pannel col-md-4 col-md-offset-7">
					<h3 style="color: #31b0d5">welcome</h3>
					<input type="text" name="username" v-model="username" placeholder="username">
					<input type="password" name="password" v-model="password" placeholder="password">
					<div style="width: 75%;margin: 20px auto 0 auto">
						<a class="login_btn" v-on:click = "login">登录</a>
					</div>
					<div class="other_choices">
						<a href="">注册</a>
						<span>|</span>
						<a href="">返回</a>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import api from '../tools/api/dataApi.js';
	import {navbar} from 'vue-strap';
	export default {
		components:{
			navbar
		},
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
				this.$http.get('/login',{params:data}).then(function(res){
					console.log(res.data);
					var user_id = res.data.data[0]._id;
					this.$router.go({name:'show',params:{user_id:user_id}});
				},function(err){
					console.log(err);
				})
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
		box-shadow: 0 0 5px #eee;
		border-radius: 15px;
		margin-top: 150px;
		padding: 1.5em;
		background: #fff;
	}
	.login-pannel input{
		display: block;
		width: 80%;
		margin: 20px auto;
		padding: 10px 0 10px 10px;
    	line-height: 18px;
    	font-size: 1em;
	}
	.login-pannel h2{
		color: #31b0d5;
		margin-top: 0;
	}
	.login_btn{
		width: 100%;
		background-color: #31b0d5;
		padding: 0 1.5em;
		color: #fff;
		display: inline-block;
		line-height:38px ;
		border-radius: 5px;
	}
	.other_choices{
		margin-top:20px;
		color: #999;
	}
	.other_choices a {
		color: #999;
	}
</style>