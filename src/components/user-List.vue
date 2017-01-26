<template>
    <div class="user_list row">
        <div class="user_list_title" v-if="role=='user'"> 
          <span v-if='fo_fans==1'>粉丝</span><span v-else>关注</span>
        </div>
        <div class="user_list_title" v-else>
          <span>用户列表</span>
        </div>
        <div class="col-md-12 users-item" v-for="user in user_list">
          <div class="row">
              <div class="col-md-3 users-head ">
                  <img :src = "user.user.url" class="img-circle">
              </div>
              <div class="col-md-9 users-intro">
                  <a class="users_info_name">{{user.user.name}}</a>
                  <div v-if="role=='user'">
                    <span v-if="user.flag" class="unfollow btn" @click.prevent.stop = "unfollow(user.user.user_id,$index)">取消关注</span>
                    <span v-else @click.prevent.stop = "follow(user.user.user_id,$index)" class="follow btn">关注</span>
                  </div>
                  <div v-if="role=='admin'">
                    <span  class="unfollow btn" @click.prevent.stop = "unAllow(user.user.user_id,$index)">限制</span>
                  </div>
              </div>
          </div>
          <hr style="width:100%">
        </div>
    </div>
    <!--<div class="row load_more">
      <div class="col-md-4 col-md-offset-4">
        <a @click.prevent.stop="load_data(timeStamp,role,now_tab)" class="load_btn">加载更多</a>
      </div>
    </div>-->
</template>

<script>
import $ from 'jquery';
import api from '../tools/api/dataApi.js';
export default {
  props:['user','fo_fans',"role",'user_list'],
  data () {
    console.log(this.role);
    return {
      timeStamp:1
    }
  },
  methods:{
    follow(userId,index){
      var id = {
        user_id :userId
      }
      api.fnc.Follow(id);
      this.user_list[index].flag = true;
    },
    unfollow(userId,index){
      var id = {
        user_id:userId
      }
      api.fnc.UnFollow(id);
      this.user_list[index].flag =false;
    },
    allow(){
      //
      
    },
    unAllow(userId,index){
      var id = {
        user_id:userId
      }
      api.fnc.AdminOff(id);
    },
  },
  route: {
    data () {
     
    }
  }
}
</script>
<style type="text/css">
  .user_list{
    box-shadow:0 0 5px #888888;
  }
  .user_list_title{
    background-color: #31b0d5;
    color: #fff;
    font-size: 1.5em;
    line-height: 2em;
    overflow: hidden;
  }
  .user_list_title span{
    display: inline-block;
    float: right;
    padding: 0 0.5em;
  }
  .users-item{
    margin: 1em 0 0 0;
  }
  .users-head img{
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
  .users_info_name{
    color: #31b0d5;
    font-size: 1.5em;
  }
  .users_info_name:hover{
    text-decoration: none;
  }
  .unfollow{
    background-color: #e6e6e6;
    color: #000;
  }
  .unfollow:hover{
    background-color: red;
    color: #ffffff;
  }
  .follow{
    background-color: #31b0d5;
    color:#fff;
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
</style>


