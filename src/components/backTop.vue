<template>
  <div class="back-top" v-show="show">
    <a href="#" @click.prevent.stop="toTop">回到顶部</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
      };
    },
    methods: {
      toTop() {
        document.body.scrollTop = 0;
      },
    },
    ready() {
      window.onscroll = () => {
        if (document.body.scrollTop > 0) {
          this.show = true;
        } else {
          this.show = false;
        }
      };
    },
    beforeDestory() {
      window.onscroll = null;
    },
  };
</script>

<style>
  .back-top {
    padding: 8px 5px 8px 8px;
    border-radius: 0px 8px 8px 0px;
    position: fixed;
    left: 0;
    bottom: 98px;
    width: 28px;
    background-color: #31b0d5;
    box-shadow: 0 0 5px #888888;
  }
  .back-top a{
    text-decoration: none;
    color: #fff;
  }
  .back-top a:hover {
    text-decoration: none;
    color:#fff;
  }
</style>