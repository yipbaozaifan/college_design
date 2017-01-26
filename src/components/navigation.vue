<template>
    <div :class="[navigation,{'stick':stick}]">
        <div class="logo">
            <a v-link="{name:'show',params:{role:role}}" class="goHome">share world</a>
        </div>
        <div class="fr">
            <div class="search_bar" v-if='flag'>
                <input type="text" name="search" id="search" placeholder="搜索">
                <a class="search_icon" @click.prevent.stop="goSearch"></a>
            </div>
            <span>hi!</span><a class="loginName">{{user.name}}</a>
            <a class="exit" @click.prevent.stop="logout"></a>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    import api from '../tools/api/dataApi.js';
    export default {
    props:['user','role','items','flag'],
    data() {
      return {
        stick: false,
        navigation :'navigation'
      };
    },
    methods: {
      logout() {
        window.sessionStorage.removeItem('user');
        console.log(window.sessionStorage.getItem('user'));
        this.$router.go({name:'home'});
      },
      goSearch(e){
        var val = $(e.target).siblings().eq(0).val();
        var data = {
            content : val
        }
        var shareitems = api.fnc.Search(data).data;
        var like_list,comment_list,new_itemList = [];
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
        console.log(this.items);
    }
    },
    ready() {
      
    },
    beforeDestory() {
      window.onscroll = null;
    }
}
</script>
<style type="text/css">
    .navigation{
        width: 100%;
        box-shadow: 0 0 5px #888888;
        z-index: 101;
        background-color: #31b0d5;
        font-size: 2em;
        overflow: hidden;
    }
    .logo{
        float: left;
        padding: 0 0.5em ;
        line-height: 1.8em;
    }
    .goHome{
        text-decoration: none;
        cursor: pointer;
        color: #fff;
        font-style: italic;
    }
    .goHome:hover{
        color: #fff;
        text-decoration: none;
        text-shadow: 0 0 5px #fff;
    }
    .fr{
        padding: 0 0.5em ;
        float: right;
        line-height: 1.8em;
        color: #fff;
        overflow: hidden;
    }
    .fr span{
        display: inline-block;
        font-size: 0.8em;

        line-height: normal;
    }
    .exit{
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url('../logo/exit.png') ;
        background-size: contain;
    }
    .stick{
        position: fixed;
        top: 0;
        z-index: 101;
        width: 100%;
    }
    .loginName{
        display: inline-block;
        text-decoration: none;
        color: #fff;
        margin: 0 15px;
        cursor: pointer;
        line-height: normal;
        font-size: 0.8em;
    }
    .loginName:hover{
        color: #fff;
    }
    .search_bar{ 
        display: inline-block;
        margin-right: 1em;
    }
    .search_bar #search{
        background-color: #31b0d5;
        width: 150px;
        color: #fff;
        height: 29px;
        font-size: 12px;
        border: 2px solid #ffffff;
        padding: 1em;
        border-radius: 8px;
        vertical-align: middle;
    }
    .search_icon{
        vertical-align: middle;
        display: inline-block;
        width: 25px;
        height: 25px;
        background:url(../logo/search.png);
        background-size: contain;
    }
</style>