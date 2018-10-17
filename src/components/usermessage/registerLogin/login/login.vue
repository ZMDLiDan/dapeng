<!-- 注册 -->
<template>
  <div class="loginAll">
    <div class="top-wrap">
      <i class="icon-back" @click="goback"></i>
    </div>
    <div class="header">
      <img
        src="http://img.shijue.me/gicPicture/9b72099d94b7ba36b66d3d680f6557467/3ee6032227c5480894d01430579d1bb8.jpg!dp6"
        alt="">
      <router-link to="/landing" class="landing">登录</router-link>
      <router-link to="/registe" class="registe">注册</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      };
    },

    components: {},

    computed: {},
    methods: {
      goback () {
        this.$router.push('/registerLogin');
      }
    }

  }

</script>
<style lang='less' scoped>
@import '../../../../assets/less/fonts.css';
@import '../../../../assets/less/base.less';

  .loginAll {
    z-index: 100;
    width: 100%;
    background-color: @bgColor;
    bottom: 0;
    position: absolute;
    top: 0;
    .top-wrap {
      height: 0.5rem;
      padding: 0.2rem 0rem;
      width: 100%;
      background-color: @bgColor;
      position: fixed;
      line-height: 0.5rem;
      font-size: 0.5rem;
      text-align: center;
      border-bottom: #cbcbcb 0.02rem solid;
      .icon-back {
        position: absolute;
        left: 0.3rem;
      }
    }
    .header {
      width: 100%;
      height: 4.5rem;
      margin-bottom: 0.5rem;

      img {
        width: 100%;
        height: 100%;
      }

      .registe, .landing {
        width: 1.6rem;
        height: 0.45rem;
        border-radius: 0.2rem;
        font-size: 0.26rem;
        text-align: center;
        line-height: 0.45rem;
        position: absolute;
        top: 4.05rem;
        left: 4.4rem;
        border: 0.02rem solid @activeColor;
        background-color: @bgColor;
        color: @activeColor;
      }
      .registe {
        left: 1.5rem;
      }
      .linkActive {
        background-color: @activeColor;
        color: #fff;
      }
    }
  }
</style>
