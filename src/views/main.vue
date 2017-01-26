<template>
	<navigation :user = "login_user.user" :role = "login_role" :flag = "search_flag" :items.sync = "picitems"></navigation>
	<div class="main">
			<div class="container">
				<div class="row">
					<div class="col-md-3 sider">
						<userView :login_user="login_user" :role="login_role"></userView>
					</div>
					<div class="col-md-9 content" v-if='is_admin'>
						<userlist :role="login_role" :user_list.sync="users_list" :login_user='login_user.user'></userlist>
					</div>
					<div class="col-md-9 content" v-else>
						<post v-if="login_role=='user'" :items.sync = "picitems" :now_tab = 'now_tab'></post>
						<itemlist :flag='flag' :now_tab.sync = 'now_tab' :items.sync="picitems" :user="login_user.user.user_id" :role="login_role" :topic_tabs="topic_tabs" :login_user= "login_user.user"></itemlist>
					</div>
				</div>
			</div>
	</div>
	<backtop></backtop>
</template>

<script>
	import $ from 'jquery';
	import api from '../tools/api/dataApi.js';
	import userview from '../components/UserView.vue';
	import itemlist from '../components/ItemList.vue';
	import navigation from '../components/navigation.vue';
	import post from '../components/post.vue';
	import backtop from '../components/backTop.vue';
	import userlist from '../components/user-List.vue';
	export default {
		components: {
	      userview,
	      itemlist,
	      post,
	      backtop,
	      navigation,
	      userlist
    	},
		data(){
			return{
				flag:true,
				search_flag:true,
				login_user:{
					fans:13,
					fo:14,
					pics:15,
					user:{}
				},
				now_tab:"all",
				picitems:[],
				login_role:"",
				is_user:false,
				is_admin:false,
				users_list:[],
				topic_tabs:[
					{ename : 'all',name : '全部'},
        			{ename : 'mine',name : '我的'}
				]
			}
		},  
		methods:{
			getItemList(tab,timeStamp,role){
				
			}
		},
		route:{
			data(transition){
				//从sessionStorage中获取当前登录账户ID，向后台获取用户相关数据:login_user
				//调用getItemList方法获取数据	
				console.log("1");
				var like_list,comment_list;
				this.login_role = this.$route.params.role;
				this.shareitems = api.fnc.GetPicList().data;
					for(var i = 0;i<this.shareitems.length;i++){
						var item = {
							commentFlag:false,
							had_like:false,
							had_collect:false,
							user:this.shareitems[i].user,
							share:this.shareitems[i].share,
							picList:this.shareitems[i].photoList,
							like:[],
							comment:[]
						};
						var id = {
							share_id :this.shareitems[i].share.share_id
						}
						like_list = api.fnc.GetLike(id).data;
						comment_list = api.fnc.GetComment(id).data;
						item.like = like_list;
						item.comment = comment_list;
						console.log(item);
						this.picitems.push(item);
					}
					console.log(this.picitems);
				if(this.login_role == 'visitor'){
					this.is_user = false;
					this.login_user = {
						user:{
							name:'游客',
							url:"http://localhost:8080/share/img/000000000.png"
						}
					};
					this.flag = false;
				}else if(this.login_role == 'user'){
					var user = window.sessionStorage.getItem('user');
					this.login_user.user = eval('('+user+')');
					console.log(this.login_user);
					var fans = api.fnc.GetFans();
					this.login_user.fans = fans.data.length;
					var fos = api.fnc.GetFos();
					this.login_user.fo = fos.data.length;
					var pics = api.fnc.GetMyPicList();
					console.log(pics);
					this.login_user.pics = pics.data.length;
					console.log(this.login_user)
					/*this.picitems = [
			          	{
				            commentflag:false,
				            had_like:false,
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
				            		name:"ssdfsdf",
				            		user_id:'dfsdfsf',
				            	},
				            	{
				            		name:'dsfsf',
				            		user_id:'sdfsfd'
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
				}else{
					this.login_user = {
						user:{
							name:"admin",
							url:'http://localhost:8080/share/img/000000000.png'
						}
					}
					this.is_admin = true;
					this.users_list = api.fnc.AdminGetUsers().data;
					console.log(this.users_list)
					//获取所有用户列表的第一页，timeStamp==0
				}
				
			}
		}
	}
</script>

<style type="text/css">
	.main{
		text-align: center;
		margin-top: 2em;
	}
	.content{
		margin-bottom: 3em;
	}
</style>