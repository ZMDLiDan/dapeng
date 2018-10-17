<template>
  <div class="mine">
    <div class="head-grade">
      <div class="icon-cat"><img :src="img" v-show="show"></div>
      <div class="grade">{{head}}</div>
      <div class="integral"><span>{{credits}}</span>积分，享<span>{{discount}}</span>折</div>
    </div>
    <div class="item">
      <div class="order" @click="goOrder">
        <!-- <i class="icon-order"></i> -->
        <img src="./order.svg" alt="">
        <span>全部订单</span>
      </div>
      <div class="evaluate" @click="goHistory">
        <!-- <i class="icon-board"></i> -->
        <img src="./board.svg" alt="">
        <span>浏览记录</span>
      </div>
      <div class="card" @click="goCardvolume">
        <!-- <i class="icon-score" ></i> -->
        <img src="./score.svg" alt="">
        <span>我的大棚</span>
      </div>
    </div>
    <div class="collect" @click="goCollection">
      <i class="icon-heart"></i>
      <span>我收藏的</span>
    </div>
    <div class="notify" @click="goMessage">
      <i class="icon-message"></i>
      <span>动态通知</span>
    </div>
    <div class="about-us">
      <i class="icon-about"></i>
      <span>关于我们</span>
    </div>
    <!-- <div class="evaluatListe
    -wrap">
      <evaluateList ></evaluateList>
    </div> -->
    <!-- <div class="evaluate-wrap">
      <evaluate></evaluate>
    </div> -->
  </div>
</template>
<script>
  // import order from '../order/order.vue'
  export default {
    created () {
      this.$parent.index = '-1';
      this.$parent.title = [];
      this.$http.get('http://47.95.249.186:8880/mixueshop/user/showUserInfo').then(res => {
          this.head = res.data.name;
          this.credits = res.data.level;
          this.discount = res.data.discount;
          if (res.data.image == null) {
            this.show = false;
          } else {
            this.show = true;
            this.img = res.data.image;
          }
      }).catch((err) => {
        console.log(err)
      });
    },
    data () {
      return {
        head: '',
        credits: '',
        discount: '',
        img: '',
        show: false,
        order: false,
        evaluate: false,
        card: false
      }
    },
    methods: {
      goCollection: function () {
        this.$parent.index++;
        this.$parent.title.push('商品收藏');
        this.$router.push({path: 'collection'})
      },
      goMessage: function () {
        this.$parent.index++;
        this.$parent.title.push('动态通知');
        this.$router.push({path: 'message'})
      },
      goOrder: function () {
        this.$parent.index++;
        this.$parent.title.push('商品订单');
        this.$router.push({path: 'order'})
      },
      goHistory: function () {
        // this.$parent.index++;
        // this.$parent.title.push('最近浏览');
        this.$router.push({path: 'history'})
      },
      goCardvolume: function () {
        this.$parent.index++;
        this.$parent.title.push('我的大棚');
        this.$router.push({
          path: '/Cardvolume'
        })
      }
    }

  }

</script>
<style lang='less' scoped>
  @import '../../assets/less/fonts.css';
  @import '../../assets/less/base.less';

  .active {
    color: @activeColor;
  }

  .active i::before {
    color: @activeColor;
  }

  .mine {
    width: 100%;
    background-color: @bgColor;
  }

  .head-grade {
    height: 2.7rem;
    margin: 0.03rem 0.2rem 0.03rem 0.2rem;
    background: #ffffff;
    font-size: .22rem;
    display: flex;
    padding-left: 0.3rem;
    overflow: hidden;
  }

  .head-grade .icon-cat {
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    top: 50%;
    margin-top: -1rem;
    margin-right: 0.7rem;
    &::before{
      color: #ddd;
    }
    img {
      width: 100%;
      height: 100%;
      position: relative;
      top: -2rem;
      border: none;
      border-radius: 50%;
    }
  }

  .head-grade .grade {
    color: @baseColor;
    font-size: 0.28rem;
    color: #000;
    position: relative;
    top: 1.1rem;
  }

  .head-grade .integral {
    color: @baseColor;
    height: 2rem;
    position: relative;
    top: 1.85rem;
    left: -1.7rem;
    width: 3rem;
    text-align: center;
    span {
      font-size: 0.28rem;
      padding: 0.1rem;
      color: @goodsLogo;
    }
  }

  .item {
    display: flex;
    height: 2rem;
    background: #fff;
    text-align: center;
    margin: .03rem .2rem;

  }

  .item div {
    flex: 1;
    width: 0.8rem;
    height: 0.8rem;
    padding-top: 0.4rem;
    img{
      width: 100%;
      height: 100%;
      margin-bottom: 0.2rem;
    }
    span{
      font-size: 0.26rem;
      color: @baseColor;
    }
  }

  .item {
    font-size: 0.28rem;
  }

  .item p {
    height: 0.5rem;
    font-size: 0.2rem;
  }

  .collect, .notify, .about-us {
    height: 0.8rem;
    line-height: 0.8rem;
    margin-left: .2rem;
    margin-right: .2rem;
    font-size: .26rem;
    background: #fff;
    margin-bottom: 0.02rem;
    padding-left: .15rem;
    color: @baseColor;
  }

  .collect i, .notify i, .about-us i {
    font-size: 0.4rem;
    margin-right: .2rem;
    position: relative;
    top: 0.08rem;
  }

  // .evaluateList-wrap{
  //   position: fixed;
  //   top: 0.9rem;
  //   bottom: 0;
  //   width: 100%;
  //   z-index: 40;
  // }
  // .evaluate-wrap{
  //   position: fixed;
  //   background:@bgColor;
  //   top: 0.9rem;
  //   bottom: 0;
  //   width: 100%;
  //   z-index: 100;
  // }
  // .order-wrapper{
  //   position: fixed;
  //   background:@bgColor;
  //   top: 0.9rem;
  //   bottom: 0;
  //   width: 100%;
  //   z-index: 100;
  // }
</style>
