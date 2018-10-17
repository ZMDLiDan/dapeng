<template>
  <div id="app">
    <div class="header-wrap">
      <i class="icon-back" @click="goback" v-if="index>-1"></i>
      <span class="text">{{title[index]}}</span>
      <i class="icon-setting" @click="goUsermessage" v-show="settingShow"></i>
    </div>
    <transition name="fade">
      <keep-alive exclude="goodsDetail,placeOrder,order">
        <router-view class="content-wrap"/>
      </keep-alive>
    </transition>
    <footer-menu></footer-menu>
  </div>
</template>
<script>
  import footerMenu from './components/footerMenu/footerMenu'

  export default {
    data () {
      return {
        index: -1,
        title: []
      }
    },
    name: 'App',
    components: {
      footerMenu
    },
    methods: {
      goback: function () {
        this.index--;
        this.title.pop();
        this.$router.back(-1);
      },
      goUsermessage: function () {
        if (!this.$router.currentRoute.name.includes('usermessage')) {
          this.$router.push({path: '/usermessage'})
          this.title.push('设置');
          this.index++;
        }
      }
    },
    computed: {
      settingShow () {
        return this.$route.name === 'index' ||
          this.$route.name === 'discover' ||
          this.$route.name === 'mine' ||
          this.$route.name === 'table';
      }
    }
  }
</script>
<style lang="less" scoped>
  //公共样式
  // @import './assets/less/fonts.css';
  @import './assets/less/base.less';
  @import './assets/less/fonts.css';
  // 路由过渡动画
  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter, .fade-leave-to {
    width: 0;
    opacity: 0;
  }

  #app {
    height: 100%;
    width: 100%;
  }

  //页面顶部样式
  .header-wrap {
    height: 0.5rem;
    padding: 0.2rem 0rem;
    width: 100%;
    background-color: @bgColor;
    position: fixed;
    line-height: 0.5rem;
    font-size: 0.5rem;
    text-align: center;
    border-bottom: #cbcbcb 0.02rem solid;
    z-index: 5;
  }

  .icon-setting {
    position: absolute;
    right: 0.3rem;
  }

  .icon-back {
    position: absolute;
    left: 0.3rem;
  }

  .header-wrap .text {
    font-size: 0.36rem;
    font-weight: 400;
  }

  //页面内容容器
  .content-wrap {
    width: 100%;
    position: absolute;
    top: 0.9rem;
    bottom: 0.9rem;
  }

  //页面底部导航
  .footer-menu {
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 0;
  }

  // .usermessage-wrap {
  //   position: fixed;
  //   background: @bgColor;
  //   top: 0.9rem;
  //   bottom: 0;
  //   width: 100%;
  //   z-index: 200;
  // }
</style>
