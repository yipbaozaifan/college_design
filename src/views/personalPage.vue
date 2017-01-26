<template>
	<navigation :user = "login_user" :role = "login_role"></navigation>
	<div id="personal_page" class="container">
		<div class="row personal_header">
			<div class="col-md-12">
				<img class="img-circle" :src="login_user.url" @click.prevent.stop='changeType(1)'>
			</div>
			<div class="col-md-12 user_info">
				<h2 id="nicName">{{login_user.name}}</h2>
			</div>
		</div>
		<div class="row personal_choice">
			<div class="col-md-4 first_item" @click.prevent.stop='changeType(2,1)'>
				<a class="choice_item" >
					<span class="item_Name">粉丝</span>
					<span class="item_Num">{{fans}}</span>
				</a>
			</div>
			<div class="col-md-4" @click.prevent.stop='changeType(2,0)'>
				<a class="choice_item">
					<span class="item_Name">关注</span>
					<span class="item_Num">{{follow}}</span>
				</a>
			</div>
			<div class="col-md-4" @click.prevent.stop='changeType(0)' >
				<a class="choice_item">
					<span class="item_Name">图片</span>
					<span class="item_Num">{{photos}}</span>
				</a>
			</div>
		</div>
		<itemlist v-if='type==0' :items.sync="picitems" :role= "login_role" :flag="flag" :now_tab.sync="now_tab" :topic_tabs="topic_tabs" :login_user="login_user"></itemlist>
		<usercenter :user = 'login_user' v-if="type==1" ></usercenter>
		<userlist :user = "login_user" :fo_fans = "foOrfans" v-if='type==2' :role="login_role" :user_list.sync="users_items"></userlist>
	</div>
</template>

<script>
	import $ from 'jquery';
	import api from '../tools/api/dataApi.js';
	import itemlist from '../components/ItemList.vue';
	import usercenter from '../components/userCenter.vue';
	import userlist from '../components/user-List.vue';
	import navigation from '../components/navigation.vue';
	export default {
		components:{
			itemlist,
			usercenter,
			userlist,
			navigation
		},
		data(){
			return{
				fans:0,
				follow:0,
				photos:0,
				type:2,
				login_user:{},
				foOrfans:0,
				picitems:[],
				isloginuser:true,
				login_role:'user',
				topic_tabs:[
        			{ename : 'mine',name : '我的分享'},
        			{ename : 'collection',name : '我的收藏'},
				],
				now_tab:"mine",
				flag:true,
				users_items:[]
			}
		},  
		methods:{
			changeType(type,foOrfans){
				if(type==2){
					this.foOrfans = foOrfans;
					if(foOrfans == 1){
						this.$router.go({name : 'personal',params: {name: this.login_user.user_id,type:'fans'}});
					}else{
						this.$router.go({name : 'personal',params: {name: this.login_user.user_id,type:'fo'}});
					}
				}
				this.type = type;
			}
		},
		route:{
			data(transition){
				//console.log(this.$route.params.name)
				this.username = this.$route.params.name;
				this.type = this.$route.params.type;

				var fan = api.fnc.GetFans().data;
				console.log(fan);
				this.fans = fan.length;

				var fos = api.fnc.GetFos().data;
				console.log(fos);
				this.follow = fos.length;

				var pics = api.fnc.GetMyPicList().data;
				this.photos = pics.length;
				var like_list,comment_list;
				for(var i = 0;i<pics.length;i++){
						var item = {
							commentFlag:false,
							user:pics[i].user,
							share:pics[i].share,
							picList:pics[i].photoList,
							like:[],
							comment:[]
						};
						var id = {
							share_id : pics[i].share.share_id
						}
						like_list = api.fnc.GetLike(id).data;
						comment_list = api.fnc.GetComment(id).data;
						item.like = like_list;
						item.comment =comment_list;
						console.log(item);
						this.picitems.push(item);
				}
				console.log(this.picitems)
				var user = window.sessionStorage.getItem('user');
				this.login_user = eval("("+user+")");
				console.log(this.login_user);
				if(this.$route.params.type=='fans'||this.$route.params.type=='fo'){//打开粉丝或关注页面
					this.type = 2;
					if(this.$route.params.type=='fans'){
						this.foOrfans = 1;
						this.users_items = fan;
						/*this.users_items = [
	        				{
	        					user:{
	        						user_id:"1222222321",
	        						name:"dsffd",
	        						url:"dfsdfsd"
	        					},
	        					isfollow:false,
	        				},
	        				{
	        					user:{
	        						user_id:"1333331321",
	        						name:"dsffd",
	        						url:"dfsdfsd"
	        					},
	        					isfollow:true,
	        				}
        				]*/
					}else{
						this.foOrfans = 2;
						this.users_items = fos;
						/*this.users_items = [
	        				{
	        					user:{
	        						user_id:"12321321",
	        						name:"dsdsfsdffd",
	        						url:"dfsdfsd"
	        					},
	        				},
	        				{
	        					user:{
	        						user_id:"12321321",
	        						name:"dsdsfsdfd",
	        						url:"dfsdfsd"
	        					}
	        				}
        				]*/
					}
				}else{
					this.type = 0;
				}
				/*this.picitems = [
			          	{
				            commentflag:false,
				            user:{
				            	userId:'123456',
				            	name:"aaaa",
				            	head_pic:"dsfssfsddf",
				            	email:"sdfdfsds",
				            	mobile:"2331321213",
				            	password:"dfsdfsdfsd",
				            	sex:"male"
				            },
				            share:{
				            	share_id:"231312",
				            	user_id:"21213",
				            	state:1,
				            	time:"dfsdfsdf",
				            	content:"sdffsdfsdf"
				            },
				            picList:[
				            	{
				            		photo_id:"213123",
				            		share_id:'312213',
				            		url:'dsfjslff'
				            	},
				            	{
				            		photo_id:"213123",
				            		share_id:'312213',
				            		url:'dsfjslff'
				            	},
				            	{
				            		photo_id:"213123",
				            		share_id:'312213',
				            		url:'dsfjslff'
				            	},
				            ],
				            like:[
				            	{
				            		like_id:"321231",
				            		share_id:"123123",
				            		user_id:'21312313',
				            		time:"dsfdsfdsf"
				            	},
				            	{
				            		like_id:"321231",
				            		share_id:"123123",
				            		user_id:'21312313',
				            		time:"dsfdsfdsf"
				            	},
				            ],
				            comment:[
				            	{
					            	user:{
					            		name:"dsfsdfsd",
					            		user_id:"12312312",
					            	},
					            	content:'fdsfsdf',
					            	replyTo:{
					            		name:"sdfsdfsdf",
					            		user_id:"123232112"
					            	}
				            	},
				            	{
					            	user:{
					            		name:"dsfsdfsd",
					            		user_id:"12312312",
					            	},
					            	content:'fdsfsdf',
					            	replyTo:null
				            	}
				            ]
			          	}
        			];*/
			}
		}
	}
</script>

<style type="text/css">
	#personal_page{
		margin-top: 2em;
	}
	.personal_header{
		text-align: center;
		background: url('../img/bg1.jpg') ; 
		background-size: cover;
		padding: 5em 0;
		overflow: hidden;
		 box-shadow:0 0 5px #888888;
	}
	.personal_header img{
		width: 110px;
    	height: 110px;
	}
	.personal_choice{
		text-align: center;
		line-height: 1.8em;
	}
	.personal_choice div:hover{
		cursor: pointer;
		background-color: #e8e8e8;
	}
	.personal_choice .choice_item{
		color:   #31b0d5;
		display: inline-block;
	}
	.personal_choice .first_item{
		border: none;
	}
	.personal_choice div{
		border-left: 1px solid #888888;
		margin: 0.5em 0;
	}
	.choice_item{
		cursor: pointer;
	}
	.choice_item:hover{
		text-decoration: none;
	}
	.choice_item span{
		display: block;
	}
	.item_Name{
		font-size: 1.2em;
	}
	.item_Num{
		font-size: 1.8em;
	}
	#nicName{
		color: #fff;
	}
	#user_intro{
		color: #31b0d5;
	}
	.pic-show{
		text-align: center;
	}
</style>