<template>
  <div class="Item-list">
    <div class="row panel-header">
      <div class="col-md-12">
        <div class="header-nav list-inline row " v-if="flag">
          <li v-for="(i,tab) in topic_tabs" class="tab-item col-md-4"><a :class="{'active_tab':tab.ename==now_tab}" @click.prevent.stop="changeTab(i)">{{ tab.name }}</a></li>
        </div>
      </div>
    </div>
    <div class="row panel-inner" v-for="(i,item) in items">
      <div class="col-md-12">
        <div class="author row">
          <div class="col-md-12">
            <a v-link="{name:'personal',params:{username:'item.user.userId'}}"><img class="author_head img-circle" :src="item.user.head_pic">{{item.user.name}}</a>
            <a v-if="role=='user'&&item.user.user_id!=login_user.user_id" class="follow_icon" @click.prevent.stop = "follow(item.user)"></a>
          </div>
        </div>
        <div class="content_bar row">
          <div class="col-md-12">
            <p>{{item.share.content}}</p>
          </div>
        </div>
        <div class="pic-show row">
          <div class="pic_bar" v-for="(j,pic) in item.picList" track-by="$index">
            <img v-bind:src="pic.url" @click.prevent.stop = "showDialog(i,j)">
          </div>
        </div>
        <div class="like row">
          <div class="col-md-6">
            <p style="margin: 0"><span class="like-num">{{item.like.length}}</span>人觉得很赞</p>
          </div>
          <div class="col-md-6" v-if="role=='user'">
            <div class="hide_bar" style="text-align: right;">
              <a @click.prevent.stop = "toLike(i)" class="like_btn no_like" v-if="!item.had_like"></a>
              <a class="like_btn had_like" v-else></a>
              <a @click.prevent.stop = "toCollect(i)" class="collect_btn no_collect" v-if="!item.had_collect"></a>
              <a class="collect_btn had_collect" v-else></a>
              <a @click.prevent.stop = "toComment(i)" class='comment_btn'></a>
            </div>
          </div>
        </div>
        <div class="like_users row">
          <span class="like_user_item" v-for = "like_user in item.like">{{like_user.name}},</span>
        </div>
        <div class="comments row" v-if="role=='user'">
          <div class="col-md-12" v-if="item.commentFlag">
            <input type="text" name="comment" class="comment_input col-md-9">
            <div class="col-md-3">
              <a class="btn submit_comment" v-on:click="sendComment(i,$event)" >提交</a>
            </div>
          </div>
          <div class="col-md-12" v-for="(j,comment) in item.comment">
            <p class="comment-list"  @click.prevent.stop = "reply"><span class="com-username">{{comment.user.name}}:</span><a v-if="comment.replyTo" class="replyTo"> @{{comment.replyTo.name}} </a>{{comment.content}}</p>
            <div class="col-md-12 reply_bar" style="display: none;">
              <input type="text" name="reply" class="reply_input col-md-9">
              <div class="col-md-3">
                <a class="btn submit_reply" v-on:click="sendReply(j,$event,i)" >提交</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal :pic_url.sync = "showImg" v-if="show" :is_show.sync = "show"></modal>
  <!--<div class="row load_more">
    <div class="col-md-4 col-md-offset-4">
      <a @click.prevent.stop="load_data(timeStamp,role,now_tab)" class="load_btn">加载更多</a>
    </div>
  </div>-->
</template>

<script>
import $ from 'jquery';
import api from '../tools/api/dataApi.js'
import modal from '../components/modal.vue';
export default {
  props: ['flag','items','now_tab','user','role','topic_tabs','login_user'],
  components:{
    modal
  },
  data () {
    return {
      show: false,
      showImg : "",
      timeStamp:1,
    }
  },
  route: {
    data () {
      
    }
  },
  methods: {
    follow(user){
      var id = {
        user_id:user.user_id
      }
      api.fnc.Follow(id);
    },
    changeTab(i){
      this.now_tab = this.topic_tabs[i].ename;
      //更新items
      //this.items = GetPicList(data);
      var shareitems,like_list,comment_list;
      var new_itemList = [];
      if(this.now_tab=='mine'){
          shareitems = api.fnc.GetMyPicList().data;
      }else if(this.now_tab == 'all'){
          shareitems =api.fnc.GetPicList().data;
      }else{
          shareitems = api.fnc.GetMyCollect().data;
      }
      console.log(shareitems);
      for(var i = 0;i<shareitems.length;i++){
            var item = {
              commentFlag:false,
              had_like:false,
              had_collect:false,
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
      console.log(this.items);
    },
    sendComment(i,e){ 
      var input = $(e.target).parent().siblings().eq(0);
      var val = input.val();
      var vm = this;
      console.log(val);
      //提交评论到后台
      var data = {
        content:val,
        share_id:vm.items[i].share.share_id,
        sendComment_id:0
      };
      api.fnc.Comment(data);
      //更新数据
      var c_data = {
        content:val,
        user:vm.login_user,
        replyTo:null
      };
      input.val= "";
      this.items[i].comment.push(c_data);
      this.items[i].commentFlag = false;
      
    },
    sendReply(index,e,item_index){
      var replyTo = this.items[item_index].comment[index].user;
      console.log(replyTo);
      var input = $(e.target).parent().siblings().eq(0);
      var val = input.val();
      var vm = this;
      console.log(val);
      var data = {
        content:val,
        share_id:vm.items[item_index].share.share_id,
        sendComment_id:replyTo.user_id
      }
      api.fnc.Comment(data);
      var r_data = {
                user:vm.login_user,
                replyTo:replyTo,
                content:val
              }
      this.items[item_index].comment.push(r_data);
      input.val("");
      $(e.target).parent().parent().hide();
    },
    reply(e){
      $(e.target).siblings(".reply_bar").toggle();
    },
    toComment(index){
      this.items[index].commentFlag= !this.items[index].commentFlag;
    },
    toLike(index){
      var share_id = this.items[index].share.share_id;
      var id = {
        share_id:share_id
      };
      api.fnc.Like(id);
      this.items[index].like.push(this.login_user);
      this.items[index].had_like = true;
    },
    toCollect(index){
      var share_id = this.items[index].share.share_id;
      var id = {
        share_id:share_id
      };
      api.fnc.Collect(id);
      this.items[index].had_collect = true;
    },
    showDialog(item_index,pic_index){
      this.showImg =  this.items[item_index].picList[pic_index].url;
      this.show = true;
    }
  }
}
</script>
<style type="text/css">
  .author {
    background-color:#31b0d5;
    margin-bottom: 10px; 
  }
  .author a {
    color: #fff;
    cursor: pointer;
    font-size: 1.5em;
    line-height: 2em;
    display: inline-block;
  }
  .author_head{
    width: 30px;
    height: 30px;
    margin-right:8px;
  }
  .pic-show img {
    width: 
  }
  .comments{
    padding: 10px 0;
  }
  .comment-list{
    text-align: left;
    margin:0;
    padding: 5px 0;
  }
  .like{
    text-align: left;
  }
  .like-num{
    margin: 0 10px;
    color: #31b0d5;
    font-size: 2rem;
  }
  .panel-inner{
    margin-bottom: 1.5em;
    box-shadow: 0 0 5px #888888;
  }
  .reply_input,.comment_input{
    line-height: 2em;
  }
  .submit_reply,.submit_comment{
    background-color: #31b0d5;
    color: #fff;
    line-height: 2em;
  }
  .header-nav{
    background-color: #e6e6e6;
    line-height: 2.5em;
  }
  .active_tab{
    color: #fff;
    background-color: #31b0d5;
    padding: 3px 10px;
    border-radius: 5px;
  }
  .comment_btn{
    display: inline-block;
    width:25px;
    height: 25px;
    background: url('../logo/comment.png');
    background-size: contain;
  }
  .had_like{
    background: url('../logo/islike.png');
  }
  .had_collect{
    background: url('../logo/iscollect.png');
  }
  .had_lock{
    background: url('../logo/collect.png');
  }
  .no_like{
    background: url('../logo/like.png');
  }
  .no_collect{
    background: url('../logo/collect.png');
  }
  .no_lock{
    background: url('../logo/collect.png');
  }
  .collect_btn,.like_btn,.lock_btn{
    display: inline-block;
    width:25px;
    height: 25px;
    background-size: contain;
  }
  .load_more{
    text-align: center;
  }
  .load_btn{
    border: 1px solid #31b0d5;
    color: #31b0d5;
    padding: 0 3em;
    border-radius: 6px;
    line-height: 2.5em;
    display: inline-block;
  }
  .content_bar{
    text-align: left;
    font-size: 1.2em;
  }
  .pic_bar{
    width: 30%;
    display: inline-block;
    margin: 5px;
    height: 0px;
    padding-bottom: 30%; 
    overflow: hidden;
    position: relative; 
  }
  .pic_bar img{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  .header-nav{
    text-align: center;
  }
  .tab-item a:hover{
    text-decoration: none;
    cursor: pointer;
  }
  .like_users{
    text-align: left;
  }
  .like_user_item{
    color: #31b0d5;
  }
  .follow_icon{
    width: 25px;
    height: 25px;
    background:url(../logo/follow.png);
    background-size: contain;
  }
</style>


