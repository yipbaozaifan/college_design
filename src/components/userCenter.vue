<template>
	<div class="userCenter">
		<div class="userCenter_title">
			<a class="back_btn" v-link="{name:'personal'}"> < </a>
			<span>个人信息</span>
		</div>
		<div class="userCenter_body">
			<div class="userCenter_head">
				<img :src="user.url" id="head_preview">
				<input type="file" name="changeHead" id="changeHead" style="display: none;" @change="onFileChange">
				<a class="btn" id="changeHead_btn" @click.prevent.stop="addPic">更换头像</a>
			</div>
			<div class="userCenter_content">
			<div class="content_line">
					<label>密码：</label><input type="text" name="email" :value="user.password" id="password">
				</div>
				<div class="content_line">
					<label>昵称：</label><input type="text" name="nic_name" :value='user.name' id="name">
				</div>
				<div class="content_line">
					<label>邮箱：</label><input type="e-mail" name="email" :value="user.email" id="email">
				</div>
				<div class="content_line">
					<label>电话：</label><input type="e-mail" name="email" :value="user.mobile" id="mobile">
				</div>
				<div class="content_line">
					<label>屏蔽分享：</label><input type="checkbox" name="lock" id="lock" :checked = "user.state==0">
				</div>
				<div class="content_line">
					<a name="save" id="save_btn" class="btn" @click.prevent.stop="save">保存</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import api from '../tools/api/dataApi.js';
	import itemlist from '../components/ItemList.vue';
	export default {
		props:['user'],

		data(){
			return{
				sex:true,
				head_pic:[],
			}
		},  
		methods:{
			getData(url){

			},
			addPic(e){
				$('#changeHead').trigger('click');
                return false;
			},
			onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.head_pic = files;
                this.changeHead(files);
            },
            changeHead(file){
            	if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }        
                var reader = new FileReader();
                var that = this;
                reader.readAsDataURL(file[0]); 
                reader.onload =function(e){
                	that.user.url = e.target.result;                
                }                        
            },
            save(){
            	var name = $("#name").val();
            	var email = $("#email").val();
            	var mobile = $("#mobile").val();
            	var password = $("#password").val();
            	var state;
            	console.log($("#lock").prop("checked"));
          		if ($("#lock").prop("checked")) {
          			state = 0;
          		}else{
          			state = 1;
          		}
          		var data = {
          			name:name,

          		}
            	var myForm = new FormData();
            	myForm.append('files',this.head_pic[0]);
            	myForm.append('name',name);
            	myForm.append('state',state);
            	myForm.append('email',email);
            	myForm.append('mobile',mobile);
            	myForm.append('password',password);
            	var result = api.fnc.Update(myForm).data;
            	window.sessionStorage.setItem("user",JSON.stringify(result));
            	alert("保存成功");
            }
		},
		route:{
			data(transition){	
				
			}
		}
	}
</script>

<style type="text/css">
	.userCenter{
		background-color: #fff;
		box-shadow: 0 0 5px #888888;
		overflow: hidden;
	}
	.userCenter_title{
		background-color: #31b0d5;
		color: #fff;
		font-size: 1.5em;
		line-height: 2em;
		width: 100%;
		overflow: hidden;
		margin-bottom: 1em;
	}
	.userCenter_title span{
		display: inline-block;
		float: right;
		padding: 0 0.5em;
	}
	.userCenter_body {
		width: 35%;
		margin: 5em auto;
	}
	.back_btn {
		color: #fff;
		display: inline-block;
		padding: 0 0.5em;
	}
	.userCenter_head{
		margin: 1em 0;
	}
	.userCenter_content input{
		display: block;
	}
	#head_preview{
		width: 80px;
		height: 80px;
	}
	#changeHead_btn{
		background-color: #31b0d5;
		border-radius: 5px;
		color: #fff;
		margin: 0 5em;
	}
	.content_line{
		margin-bottom: 1.5em;
		width: 100%;
	}
	.content_line input,textarea{
		display: inline-block;
		width: 70%;
		vertical-align: top;
	}	
	.content_line textarea{
		min-height: 80px;
	}
	.content_line label{
		width: 28%;
		font-size: 1.2em;
	}
	#save_btn{
		background-color: #31b0d5;
		border-radius: 5px;
		color: #fff;
		display: inline-block;
		width: 30%;
	}
</style>