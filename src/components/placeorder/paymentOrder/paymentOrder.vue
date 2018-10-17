<!-- 支付订单 -->
<template>
  <div class="paymentOrder">
    <div class="header">
      <i class="icon-back" @click="goBack"></i>
      <span class="text">{{title}}</span>
    </div>
    <div class="content">
        <div class="count">
            <div class="text"><p>你的小宝贝正在等你</p><img class="shake" src="./heart.svg" alt=""></div>
            <div class="money">￥{{money}}</div>
            <span class="num">订单编号：{{number}}</span>
        </div>
        <div class="select">
            <i class="icon-weixin"></i>
            <p>微信支付</p>
            <img class="img" src="./select1.svg" alt="" v-show="isShow" @click="goSele"/>
            <img class="img" src="./select2.svg" alt="" v-show="!isShow" @click="goSele"/>
        </div>
    </div>
    <input type="button" value="确认支付" alt="" v-show="isYes" @click="goYes"/>
  </div>
</template>

<script>
export default {
  props: ['orderId', 'finalPay'],
  beforeRouteEnter (to, from, next) {
      next((vm) => {
          vm.number = vm.orderId;
        vm.money = vm.finalPay;
      });
  },
  created () {
      console.log(this.orderId);
  },
  data () {
    return {
        title: '支付订单',
        money: '',
        number: '908978675645342312',
        isShow: true,
        isYes: false
    }
  },

  methods: {
    goBack: function () {
        this.$router.back(-1);
    },
    goSele: function () {
      this.isShow = !this.isShow;
      this.isYes = !this.isShow;
    },
    goYes: function () {
        this.$http.get('http://47.95.249.186:8880/mixueshop/updateOrdersState', {
            params: {
                orderId: this.orderId
            }
        }).then(() => {
            this.$router.replace({
            name: 'orderStatus',
            params: {
                id: this.orderId,
                finalPay: this.finalPay
            }
        });
        })
    }
  },

  components: {
  },

  computed: {
  }
}

</script>
<style lang='less' scoped>
  @import '../../../assets/less/base.less';
  @import '../../../assets/less/fonts.css';

  .paymentOrder {
    z-index: 100;
    width: 100%;
    background-color: @bgColor;
    top: 0;
    bottom: 0;
    .header {
      z-index: 200;
      height: 0.9rem;
      width: 100%;
      background-color: #fff;
      position: fixed;
      font-size: 0.5rem;
      text-align: center;
      //border-bottom: #cbcbcb 0.02rem solid;
      .icon-back {
          color: @activeColor;
          position: relative;
          left: -2.1rem;
          top: 0.08rem;
      }
      .text {
          font-size: 0.4rem;
          line-height: 0.9rem;
          text-align: center;
          position: relative;
          left: -0.22rem;
      }
    }
    .content {
        width: 7.5rem;
        background-color: @bgColor;
        position: relative;
        top: 0.9rem;
        .count {
            width: 7.5rem;
            text-align: center;
            background-image: linear-gradient(@activeColor,@bgColor);
            margin-bottom: 0.6rem;
            .text {
                //width: 2.6rem;
                height: 1.2rem;
                display:flex;
                font-size: 0.28rem;
                color: @baseColor;
                line-height: 2rem;
                position: relative;
                left: 50%;
                margin-left: -1.3rem;
                p {
                    font-size: 0.3rem;
                    padding-left: 0.2rem;
                    color: #000;
                }
                .shake {
                    width: 0.5rem;
                    height: 0.5rem;
                    position: relative;
                    top: 0.7rem;
                    left: 0.1rem;
                    animation: shake-crazy 3s infinite;
                }
                @keyframes shake-crazy {
                    0% {
                        transform: translate(0px, 0px) rotate(0deg);
                    }
                    10% {
                        transform: translate(1px, 2px) rotate(-1deg);
                    }
                    20% {
                        transform: translate(2px, 4px) rotate(-3deg);
                    }
                    30% {
                        transform: translate(3px, 1px) rotate(4deg);
                    }
                    40% {
                        transform: translate(-2px, 0px) rotate(9deg);
                    }
                    50% {
                        transform: translate(1px, 3px) rotate(-4deg);
                    }
                    60% {
                        transform: translate(3px, 0px) rotate(-10deg);
                    }
                    70% {
                        transform: translate(2px, 3px) rotate(7deg);
                    }
                    80% {
                        transform: translate(3px, 2px) rotate(9deg);
                    }
                    90% {
                        transform: translate(0px, 3px) rotate(5deg);
                    }
                }
            }

            .money {
                font-size: 0.5rem;
                line-height: 2rem;
            }
            .num {
                font-size: 0.24rem;
                display: block;
                color: @baseColor;
                height: 0.7rem;
            }
        }
        .select {
            //background-color: @activeColor;
            height: 1rem;
            display:flex;;
            border: 0.02rem solid #ccc;
            border-radius: 0.1rem;
            i {
                font-size: 0.7rem;
                position: relative;
                top: 0.16rem;
                margin-left: 0.1rem;
                margin-right: 0.3rem;
            }
            p {
                font-size: 0.3rem;
                color: @baseColor;
                line-height: 1rem;
            }
            .img {
                width: 0.6rem;
                height: 0.6rem;
                position: absolute;
                left: 6.5rem;
                top: 4.7rem;
            }
        }
    }
    input {
        position: relative;
        top: 6.55rem;
        width: 7.5rem;
        height: 1rem;
        font-size: 0.3rem;
        color: #fff;
        background-color: @goodsLogo;
    }
  }

</style>
