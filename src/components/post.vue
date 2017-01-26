<template>
	<div class="row upload">
		<div class="col-md-12">
			<textarea placeholder="说两句吧" id ="describe"></textarea>
		</div>
		<hr style="width: 70%">
		<div class="col-md-10" style="margin-bottom: 1.5em;">
			<input type="file" @change="onFileChange" style="display: none;">
			<div style="padding: 0;margin: 0; text-align:left;">
				<a v-for="(key,image) in images" class="preview" track-by="$index">
					<img :src="image" @click='delImage(key)' />
				</a>
				<a id='addPic' href="" v-on:click="addPic" v-if="pic_count<6">
					<img src="../logo/addPic.png">
				</a>
			</div>		            
        </div>
        <div class="col-md-2">
			<a class="btn" id="submit_pic" @click.prevent.stop="submitPic">发布</a>
		</div>
		<div class="tips" v-if="show_tips">
			<span class="tips_logo" :class="{success_tips:tips_state,fail_tips:!tips_state}"></span>
			<span class="tips_message">success</span>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';
	import api from '../tools/api/dataApi.js';
	export default {
		props:['items','now_tab'],
		data(){
			return{
				pic_count:0,
				images:[],
				files:[],
				show_tips:false,
				tips_message:"",
				tips_state:true
			}
		},  
		methods:{
			addPic(e){
				e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
			},
			onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.createImage(files);
            },
            createImage(file) {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();         
                var vm = this;
                var reader = new FileReader();
                reader.readAsDataURL(file[0]); 
                reader.onload =function(e){
                	vm.files.push(file[0]);
                	vm.images.push(e.target.result);
                	vm.pic_count++;                       
                }                        
            },
            delImage:function(index){
            	this.files.splice(index,1)
                this.images.splice(index,1);
                this.pic_count--;
            },
            reload:function(){
            	console.log(this.now_tab);
            	var shareitems,like_list,comment_list;
      			var new_itemList = [];
	            if(this.now_tab=='mine'){
	          			shareitems = api.fnc.GetMyPicList().data;
	      		}else if(this.now_tab == 'all'){
	          			shareitems =api.fnc.GetPicList().data;
	      		}
				console.log(shareitems);
				for(var i = 0;i<shareitems.length;i++){
				    var item = {
				           	commentFlag:false,
				            had_like:false,
				            had_collect:true,
				            user:shareitems[i].user,
				            share:shareitems[i].share,
				            picList:shareitems[i].photoList,
				            like:[],
				            comment:[]
				        };
				    var id = {
				            share_id : shareitems[i].share.share_id
				        }
				    like_list = api.fnc.GetLike(id).data;
				    comment_list = api.fnc.GetComment(id).data;
				    item.like = like_list;
				    item.comment = comment_list;
				    new_itemList.push(item);
				}
				this.items = new_itemList;
            },
            submitPic:function(){
            	var describe = $('#describe').val();
            	var data = {
            		imgs:this.files,
            		describe:describe,
            	}
            	var myForm = new FormData();
            	console.log(this.files);
            	myForm.append('content',describe);
            	for(var i = 0;i<this.files.length;i++){
            		myForm.append("files",this.files[i]);
            	}
            	//var xhr = new XMLHttpRequest();       
				//xhr.open("POST" ,"http://localhost:8080/share/user/Share");
				//xhr.send(myForm);
            	api.fnc.PostPic(myForm);
           		//var vm = this;
           		/*if(result.state = 0){
           			this.tips_state = true;
           		}else{
           			this.tips_state = false;
           		}*/
            	//this.tips_message = result.data.message;
            	//this.show_tips=true;
            	this.files = [];
            	$('#describe').val("");
            	this.images = [];
            	
            	this.reload();
            }
		}
	}
</script>

<style type="text/css">
	.upload{
		margin-bottom: 1.5em;
    	box-shadow: 0 0 5px #888888;
    	position: relative;
	}
	.main{
		text-align: center;
	}
	#addPic{
		display: inline-block;
		width: 63px;
		height: 63px;
	}
	#describe{
		width: 100%;
		border: none;
		min-height:150px;
	}
	.preview{
		display: inline-block;
		width: 63px;
		height: 63px;
		margin: 0 10px 0 0;
	}
	.preview img{
		width: 63px;
		height: 63px;
	}
	#submit_pic{
		background: #31b0d5;
		color: #fff;
	}
	.tips{
		position: absolute;
		width: 20%;
		background-color: #fff;
		padding: 5px 8px;
		top:40%;
		left: 40%;
	}
	.tips span{
		display: inline-block;
		vertical-align: middle;
	}
	
	.tips_message{
		font-size: 1.2em;
		margin: 0 5px;
	}
	.success_tips{
		background: url("../logo/success.png");
	}
	.fail_tips{
		background: url("../logo/fail.png");
	}
	.tips_logo{
		width: 30px;
		height: 30px;
		background-size:contain;
	}
</style>