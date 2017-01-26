<template>
  <div class="user-view">
    <div class="row user-head">
      <div class="col-md-12">
        <div class="head-content">
          <img :src="login_user.user.url" class="head-pic img-circle" v-on:click="goUserCenter()">
        </div>
      </div>
    </div>
    <div class="row user-info">
      <div class="col-md-12 login_username">
        <span>{{login_user.user.name}}</span>
      </div>
      <div class="col-md-12 login_userintro" v-if="role != 'admin'">
        <a v-link= "{name:'rank',params:{role:login_user.user.role}}" class="join_us">榜单</a>
      </div>
    </div>
    <hr style="width: 60%">
    <div class="row user-detail" v-if="role == 'user'">
      <ul class="detail-list list-inline">
        <li class="detail-item">
          <p class="detail-item-number">{{login_user.fans}}</p>
          <a class="detail-item-name" v-link="{name:'personal',params:{name:login_user.user.user_id,type:'fans'}}">粉丝</a>
        </li>
        <li></li>
        <li class="detail-item">
          <p class="detail-item-number">{{login_user.fo}}</p>
          <a class="detail-item-name"  v-link="{name:'personal',params:{name:login_user.user.user_id,type:'fo'}}">关注</a>
        </li>
        <li></li>
        <li class="detail-item">
          <p class="detail-item-number">{{login_user.pics}}</p>
          <a class="detail-item-name"  v-link="{name:'personal',params:{name:login_user.user.user_id,type:'pics'}}">图片</a>
        </li>
      </ul>
    </div>
    <div class="row user-detail" v-if="role=='visitor'">
      <a class="join_us" v-link="{name:'signIn'}">加入我们</a>
    </div>
  </div>
</template>

<script>

export default {
  name:'userView',
  props:['login_user','role'],
  data () {
    return {
      isUser:false
    }
  },
  methods:{
    goUserCenter(){
      if(this.role=='user')
          this.$router.go({name : 'personal',params: {name: this.login_user.user.user_id,type:'pics'}});
    }
  },
  route: {
    data () {
      
    }
  }
}
</script>
<style type="text/css">
  .user-view{
    box-shadow: 0 0 5px #888888;
  }
  .head-content{
    background-color: #31b0d5;
    padding: 8px 0;
  }
  .user-head .head-pic{
    width: 85px;
    height: 85px;
  }
  .user-detail{
    margin-top: 8px;
    overflow: hidden;
  }
  .detail-item-number{
    margin: 0;
    font-size: 2.5rem;
  }
  .detail-item-name{
    font-size: 2rem;
    color: #31b0d5;
    cursor: pointer;
    font-weight: 600;
  }
  .detail-item-name:hover{
    text-decoration: none;

  }
  .login_username{
    color: #31b0d5;
    font-size: 2.5rem;
  }
  .join_us{
    background-color: #31b0d5;
    color: #ffffff;
    display: inline-block;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 6px 10px;
  }
  .join_us:hover{
    background-color: #31b0fa;
    color: #ffffff;
    text-decoration: none;
  }
</style>


