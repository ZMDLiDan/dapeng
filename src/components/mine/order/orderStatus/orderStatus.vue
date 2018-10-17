<template>
  <div class="orderStatus">
    <div class="header">
      <i class="icon-back" @click="goBack"></i>
    </div>
    <div class="status">
      <h4>您的订单已成功</h4>
      <img src="./wallet.png"/>
    </div>
    <div class="delivery">
      <h4>配送信息</h4>
      <p>配送服务<span>蜜雪专送</span></p>
      <p>期望时间<span>{{deliverTime}}</span></p>
    </div>
    <div class="order">
      <h4>订单信息</h4>
      <p>订单编号<span>{{order.id}}</span></p>
      <p>下单时间<span>{{time}}</span></p>
      <p>支付方式<span>微信支付￥{{finalPay}}</span></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['id', 'finalPay'],
    name: 'orderStatus',
    methods: {
      goBack: function () {
        this.$router.back(-1);
      }
    },
    data () {
      return {
        order: {},
        time: '',
        deliverTime: ''
      }
    },
    created () {
      var that = this;
      this.$http.get('http://47.95.249.186:8880/mixueshop/getOrderById', {
        params: {
          id: this.id
        }
      }).then(function (response) {
        console.log(11111111111111111);
        console.log(response.data);
        that.order = response.data.data;
        var date = new Date(response.data.data.orderTime);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        that.time = Y + M + D + h + m + s;
        var date2 = new Date(that.order.orderTime + 1620000);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y2 = date2.getFullYear() + '-';
        var M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-';
        var D2 = date2.getDate() + ' ';
        var h2 = date2.getHours() + ':';
        var m2 = date2.getMinutes() + ':';
        var s2 = date2.getSeconds();
        that.deliverTime = Y2 + M2 + D2 + h2 + m2 + s2;
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/less/base.less';
  @import '../../../../assets/less/fonts.css';

  .orderStatus {
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: @bgColor;
    .header {
      z-index: 200;
      height: 0.9rem;
      width: 100%;
      background-color: #fff;
      // position: fixed;
      font-size: 0.5rem;
      text-align: center;
      //border-bottom: #cbcbcb 0.02rem solid;
      .icon-back {
        color: @activeColor;
        position: absolute;
        left: 0.3rem;
        top: 0.2rem;
      }
    }
    .status {
      width: 100%;
      height: 3rem;
      color: #fff;
      position: relative;
      line-height: 3rem;
      margin-bottom: .2rem;
      background: -webkit-linear-gradient(left top, @activeColor, #caeddc);
      h4 {
        font-size: .42rem;
        margin-left: 1rem;
      }
      img {
        width: 2.5rem;
        height: 2.5rem;
        position: absolute;
        right: .3rem;
        top: .2rem;
      }
    }
    .goodsDetail {
      width: 100%;
      padding: .3rem;
      display: flex;
      background-color: #fff;
      box-shadow: .02rem .02rem .02rem @baseColor;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
      .detail {
        width: 4.5rem;
        height: 1.5rem;
        margin-left: .2rem;
      }
    }
    .convey {
      width: 100%;
      padding: .2rem;
      background-color: #fff;
    }
    p {
      line-height: .5rem;
      font-size: .24rem;
      color: @baseColor;
    }
    h5 {
      font-size: .28rem;
      color: #000;
      line-height: .4rem;
      span {
        position: absolute;
        right: .2rem;
      }
    }
    .order, .delivery {
      background: #fff;
      margin-top: .2rem;
      padding: .2rem;
      h4 {
        font-size: .32rem;
        line-height: .6rem;
        border-bottom: .01rem solid #ccc;
      }
      p {
        font-size: .28rem;
        color: @baseColor;
        line-height: .6rem;
        span {
          position: absolute;
          right: .2rem;
        }
      }
    }
  }
</style>
