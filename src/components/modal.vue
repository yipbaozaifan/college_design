<template>
    <div class="pic-modal">
        <div class="pic-dialog">
            <div class="dialog-head">
                <span class="close_btn " @click.prevernt.stop="close"></span>
            </div>
            <div class="dialog-content">
                <img class="big-img" v-bind:src="pic_url">
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    props:['pic_url','is_show'],
    data() {
      return {
      };
    },
    methods: {
      close() {
        this.is_show = false;
        this.pic_url = "";
      }
    },
    ready() {

    }
  };
</script>
<style type="text/css">
    .dialog-head{
        width: 100%;
        overflow: hidden;
    }
    .close_btn{
        display: inline-block;
        width: 10%;
        color: #fff;
        background-color: #000; 
        float: right;
        background:url('../logo/close.png');
        background-size: contain;
        height: 35px;
    }
    .pic-modal{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1001;
        overflow: scroll;
        background: rgba(0, 0, 0, 0.5);
    }
    .pic-dialog{
        width: 33.33333%;
        position: absolute;
        left: 33.33333%;
        top: 80px;
    }
    .dialog-content{
        background-color: #fff;
    }
    .big-img{
        display: block;
        width: 100%;
    }
</style>

