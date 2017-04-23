<template>
	<navbar placement="top" type="default">
  	  <a slot="brand" href="/" title="Home" class="navbar-brand">VueStrap</a>
	</navbar>
	<div id="homePage">
		<div class="mask"></div>
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="intro-message">
						<h1>share world</h1>
						<h3>简单免费的问卷平台</h3>
						<a  class = "btn btn-default btn-lg">填写问卷</a>
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
			
		},
		router:{
			data(transition){
				
			}
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
		margin-top:150px;
		color: #fff;
		font-size: 3em;
	}
</style>

