<template>
	<navigation :user = "login_user.user" :role = "login_role"></navigation>
	<div class="rank">
			<div class="container">
				<div class="row">
					<div class="col-md-3 sider">
						<userView :login_user="login_user" :role="login_role"></userView>
					</div>
					<div class="col-md-9 content">
						<div class="row rank_nav">
							<li v-for="(i,tab) in topic_tabs" class="tab-item col-md-4"><a :class="{'active_tab':tab.ename==now_tab}" @click.prevent.stop="changeTab(i)">{{ tab.name }}</a></li>
						</div>
						<itemlist :items.sync="picitems" :user="login_user.user.user_id" :role="login_role"  :login_user= "login_user.user"></itemlist>
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
				login_user:{
					fans:13,
					fo:14,
					pics:15,
					user:{}
				},
				now_tab:"all",
				picitems:[],
				login_role:"",
				topic_tabs:[
					{ename : 'all',name : '全部'},
        			{ename : 'weeks',name : '周榜'},
        			{ename : 'days',name : '日榜'},
				]
			}
		},  
		methods:{
			changeTab(i){
				this.now_tab = this.topic_tabs[i].ename;
				var shareitems,like_list,comment_list;
		      	var new_itemList = [];
		      	var data = {
		      		number:0
		      	}
		      	if(this.now_tab=='weeks'){
		      	  	data.number = 2;
		          	shareitems = api.fnc.GetRank(data).data;
		      	}else if(this.now_tab == 'all'){
		      		data.number = 1;
		          	shareitems =api.fnc.GetRank(data).data;
		      	}else{
		      		data.number = 3;
		          	shareitems = api.fnc.GetRank(data).data;
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
		      	this.picitems = new_itemList;
		      	console.log(this.picitems);				
			},
			getItemList(tab,timeStamp){

			}
		},
		route:{
			data(){
				//从sessionStorage中获取当前登录账户ID，向后台获取用户相关数据:login_user
				//调用getItemList方法获取数据
				this.login_role = this.$route.params.role;
				if(this.login_role == 'visitor'){
					this.login_user = {
						user:{
							name:'游客',
							url:""
						}
					};
					this.changeTab(0);
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
					this.changeTab(0);
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
        			//];*/
				}	
			}
		}
	}
</script>

<style type="text/css">
	.rank{
		text-align: center;
		margin-top: 2em;
	}
	.content{
		margin-bottom: 3em;
	}
	.tab-item a:hover{
	    text-decoration: none;
	    cursor: pointer;
  	}
  	.rank_nav{
  		background-color: #e6e6e6;
    	line-height: 2.5em;
    	text-align: center;
  	}
  	 .active_tab{
    color: #fff;
    background-color: #31b0d5;
    padding: 3px 10px;
    border-radius: 5px;
  }
</style>