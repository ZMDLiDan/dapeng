<!-- 登录前的页面 -->
<template>
  <div class="registerLogin">
    <div class="icon"><img src="./my.svg" alt=""></div>
    <p>登录后即可查看餐桌、我的</p>
    <input type="button" value="登 录" @click="goRegister"/>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  methods: {
    goRegister: function () {
      this.$router.push({path: '/login'})
    }
  },

  components: {

  },

  computed: {

  }
}
</script>
<style lang='less' scoped>
@import '../../../assets/less/fonts.css';
  @import '../../../assets/less/base.less';
    .registerLogin {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0.9rem;
        z-index: 20;
        padding-top: 4rem;
        box-sizing: border-box;
        background-color: #fff;
        //background-color: @bgColor;
        .header{
          height: 0.5rem;
          padding: 0.2rem 0;
          line-height: 0.5rem;
          font-size: 0.5rem;
          text-align: center;
          top: 0;
          border-bottom: #cbcbcb 0.02rem solid;
          width: 100%;
          background-color: @bgColor;
          position: fixed;
        }
        .icon{
            width: 2.5rem;
            height: 2.5rem;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        p{
            font-size: 0.24rem;
            color: @baseColor;
            text-align: center;
            letter-spacing: 0.04rem;
        }
        input{
            width: 3rem;
            height: 0.8rem;
            font-size: 0.28rem;
            text-align: center;
            line-height: 0.8rem;
            position: relative;
            left: 50%;
            margin-left: -1.5rem;
            background-color: #fff;
            color: @activeColor;
            border: 0.02rem solid @activeColor;
        }

    }

</style>
