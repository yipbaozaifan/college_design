<template>
	<div id="homePage">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="intro-message">
						<h1>share world</h1>
						<h3>向世界分享你的世界</h3>
						<a  class = "btn btn-default btn-lg" v-link="{name:'show',params:{role:'visitor'}}">游客登录</a>
						<hr style="width:40%">
						<ul class="list-inline">
							<li>
								<a class = "btn btn-default btn-lg" v-link="{name:'login',}"><span>登录</span></a>
							</li>
							<li>
								<a class = "btn btn-default btn-lg" v-link="{name:'signIn'}"><span>注册</span></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="row"></div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import api from '../tools/api/dataApi.js';
	export default {
		data(){
			return{
				
			}
		},  
		methods:{
			
		},
		router:{
			data(transition){
				
			}
		}
	}
</script>

<style type="text/css">
	#homePage{
		width: 100%;
		min-height: 700px;
		text-align: center;
		background: url(../img/bg1.jpg);
		background-size: cover;
	}
	.intro-message{
		margin-top: 300px; 
		color: #fff;
		font-size: 3em;
	}
</style>

