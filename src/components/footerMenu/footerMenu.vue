<!--  -->
<template>
  <div class="footer-menu">
      <router-link to="/index">
        <i class="icon-index"></i>
        <span>主页</span>
      </router-link>
      <router-link to="/discover">
        <i class="icon-discover"></i>
        <span>发现</span>
      </router-link>
      <router-link to="/table">
        <i class="icon-table"></i>
        <span>餐桌</span>
      </router-link>
      <router-link to="/mine">
        <i class="icon-mine"></i>
        <span>我的</span>
      </router-link>
    </div>
</template>

<script>
export default {
  data () {
    return {};
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style lang='less' scoped>
  @import '../../assets/less/base.less';
.footer-menu {
  height: 0.9rem;
  background: @bgColor;
  overflow: hidden;
  > a {
    display: block;
    flex: 1;
    padding-top: 0.1rem;
    text-align: center;
    font-size: 0.5rem;
    color: #999;
    &.linkActive {
      i {
        animation: shake 0.7s;
        // animation-iteration-count:infinite;
      }
      color: @activeColor;
    }
    i {
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      margin: 0 auto;
      margin-bottom: 0.05rem;
      &.icon-index {
        background: url("./icecream.svg");
        background-size: cover;
      }
      &.icon-discover {
        background: url("./qiaokeli.svg");
        background-size: cover;
      }
      &.icon-table {
        background: url("./board.svg");
        background-size: cover;
      }
      &.icon-mine {
        background: url("./tiantianquan.svg");
        background-size: cover;
      }
    }
    span {
      display: block;
      font-size: 0.2rem;
    }
  }
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  15%,
  45%,
  75%,
  70% {
   transform: translateX(-2px);
  }
  30%,
  60%,
  90% {
    transform: translateX(2px);
  }
}
</style>
