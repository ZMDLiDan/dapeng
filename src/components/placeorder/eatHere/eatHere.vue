<template>
  <div class="eatHere">
    <input type="hidden" name="formToken" value="${formToken}">
    <ul class="goods">
      <li class="good" v-for="good in goods" :key="good.id">
        <div class="left">
          <img :src="good.product[0].productImages[0].path">
          <div class="detail">
            <span>{{good.product[0].name}}</span>
            <span class="num">X{{good.number}}</span>
          </div>
        </div>
        <div class="right">
          <span>单价:{{good.price[0].price}}元</span>
          <span>总价:{{good.finalPay}}元</span>
        </div>
      </li>
    </ul>
    <div class="message">
      <span>留言：</span>
      <input type="text" placeholder="仅适用于租地用户，您要种植什么？"/>
    </div>
    <div class="footer">
      <div class="price">合计￥ <span>{{finalPay}}</span></div>
      <div class="btn" @click="balance">提交订单</div>
    </div>
  </div>
</template>

<script>
export default {
  // beforeRouteEnter (to, from, next) {
  //   next((vm) => {
  //     vm.goods = vm.hereItem;
  //   });
  // },
  props: ['hereItem', 'id', 'priceId'],
  created () {
    this.goods = this.hereItem;
    if (this.id) {
      this.number = 1;
    }
  },
  data () {
    return {
      number: null,
      goods: []
    };
  },
  computed: {
    finalPay () {
      let finalPay = 0
      if (this.goods) {
        this.goods.forEach((item) => {
          finalPay += item.finalPay;
        })
      }
      return finalPay;
    }
  },
  methods: {
    balance () {
      let items = [];
      this.goods.forEach((item) => {
        items.push(item.id)
      })
      console.log(items);
      this.$http.post('http://47.95.249.186:8880/mixueshop/insertOrders', {
        cartItemIds: items,
        submitAddressId: '',
        addPrice: 0,
        id: this.id,
        priceId: this.priceId,
        number: this.number
      }).then((res) => {
        console.log(res)
        this.$router.replace({path: '/paymentOrder/' + res.data.data.id + '/' + this.finalPay});
      });
    }
  }
}

</script>
<style lang='less' scoped>
.eatHere{
  position: absolute;
  bottom: 0;
  top:0;
  padding: 0 0.06rem;
  box-sizing: border-box;
  width: 100%;
    .goods{
        padding: 0.1rem 0 ;
        position: absolute;
        width: 100%;
        top:0.1rem;
        bottom: 0;
        overflow: auto;
        .good{
          height: 0.1rem;
          padding:0.3rem;
          height: 1rem;
          background-color: #fff;
            .left{
              float: left;
              img{
                height: 1rem;
                width: 1rem;
                margin-right:0.2rem;
                vertical-align: top;
              }
              .detail{
                display: inline-block;
                span{
                  display: block;
                  color: #999;
                  font-size: 0.24rem;
                }
                span:nth-child(1){
                  height:0.38rem;
                  font-weight: bold;
                  font-size: 0.28rem;
                }
                span:nth-child(2){
                  height: 0.35rem;
                }
              }
            }
            .right{
              float: right;
              display: flex;
              flex-direction: column;
              justify-content: center;
                span{
                  display: block;
                  flex: 1;
                  font-size: 0.28rem;
                  height: 0.5rem;
                  line-height: 0.5rem;
                  font-weight: bold;
                  color: #aaa;
                }
            }

        }
    }
  .message{
    position: fixed;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    bottom: 1.5rem;
    font-size: .32rem;
    background-color: #fff;
    box-shadow: -.03rem -.03rem #999 ,.03rem .03rem #ccc;
    span{
      display: inline-block;
      width: 1rem;
      text-align: center;
      margin-left: .1rem;
    }
    input{
      width: 6rem;
      outline: none;
    }
  }
     .footer{
      height: 1rem;
      position: fixed;
      width: 100%;
      bottom: 0;
      z-index: 200;
      left: 0;
      .price{
        width: 75%;
        float: left;
        box-sizing: border-box;
        padding-right: 0.4rem;
        text-align: right;
        line-height: 1rem;
        color: #fff;
        background-color:#00b43c;
        font-size: 0.28rem;
          span{
            font-size:0.37rem;
            font-weight: bold;
          }
      }
      .btn{
        float: right;
        background-color:#80858a;
        width: 25%;
        height: 1rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        font-size:0.3rem;
        font-weight: bold;
      }
    }
}
</style>
