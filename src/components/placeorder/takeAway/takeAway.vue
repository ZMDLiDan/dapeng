<!--  -->
<template>
  <div class="takeAway">
    <input type="hidden" name="formToken" value="${formToken}">
    <div class="address"
      @click="choose = true"
      v-show="address"
    >
      <h2>{{address.city+"  "+address.district+"  "+address.street+"  "+address.address}}</h2>
      <h3><span class="name">{{address.name}}</span><span>{{address.telephone}}</span></h3>
    </div>
    <div class="address"
      v-show="!address"
      @click="choose = true"
    >
      <h2>选择收货地址</h2>
    </div>
    <h4 v-show="address"><span>立即送出</span><span class="time">大约{{takeTime}}到达></span></h4>
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
    <div class="choose" v-show="choose">
      <h2>
        <span @click="cancel">取消</span>
        选择收货地址
      </h2>
      <ul>
        <li
          v-for="item in chooseAddress" :key="item.id"
          @click="chooseAdd(item)"
        >
          <span class="icon"
            :class="{'icon-right2':item.flag}"
          ></span>
          <div class="addr">
              {{item.city+"  "+item.district+"  "+item.street+"  "+item.address}}
          </div>
          <div class="addrName">
            {{item.name}}   {{item.telephone}}
          </div>
        </li>
      </ul>
      <div class="addAddr" @click="addAddr">新增收货地址</div>
    </div>
    <div class="footer" v-show="address">
      <div class="price">合计￥ <span>{{finalPay}}</span><span class="take">/配送费￥5元</span></div>
      <div class="btn" @click="balance">提交订单</div>
    </div>
  </div>
</template>

<script>
export default {
  // beforeRouteEnter (to, from, next) {
  //   next((vm) => {
  //     vm.goods = vm.takeItem;
  //   });
  // },
  props: ['takeItem', 'id', 'priceId'],
  created () {
  this.goods = this.takeItem;
    if (this.id) {
      this.number = 1;
    }
    this.$http.get('http://47.95.249.186:8880/mixueshop/getAddress', {
      params: {
        indexPage: 0
      }
    }).then((res) => {
      console.log(res.data.data.rows)
      if (res.data.data.rows.length) {
      res.data.data.rows.forEach((item) => {
        item.flag = false;
      })
      this.chooseAddress = res.data.data.rows;
      this.chooseAddress[0].flag = true;
      }
    })
  },
  computed: {
    finalPay () {
      let finalPay = 5;
      this.goods.forEach((item) => {
        finalPay += item.finalPay;
      })
      return finalPay;
    },
    takeTime () {
      let date = new Date();
      let hours;
      let minutes;
      minutes = (date.getMinutes() + 20) % 60;
      hours = (date.getHours() + parseInt((date.getMinutes() + 20) / 60)) % 24;
      return hours + ':' + minutes;
    },
    address () {
      let address = false;
      this.chooseAddress.forEach((item) => {
        if (item.flag === true) {
          address = item;
        }
      })
      return address;
    }
  },
  data () {
    return {
      choose: false,
      chooseAddress: [],
      goods: []
    };
  },
  methods: {
    addAddr () {
      this.$router.push({
        name: 'addAddress'
      });
    },
    balance () {
      let items = [];
      this.goods.forEach((item) => {
        items.push(item.id)
      })
      console.log(this.address)
      this.$http.post('http://47.95.249.186:8880/mixueshop/insertOrders', {
        cartItemIds: items,
        submitAddressId: this.address.id,
        addPrice: 5,
        id: this.id,
        priceId: this.priceId,
        number: this.number
      }).then((res) => {
        console.log(res)
        this.$router.replace({path: '/paymentOrder/' + res.data.data.id + '/' + this.finalPay});
      });
    },
    cancel () {
      this.choose = false;
    },
    chooseAdd (item) {
      console.log(item)
     this.chooseAddress.forEach((item) => {
       item.flag = false;
     });
     item.flag = true;
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../../assets/less/fonts.css';
.takeAway{
  position: absolute;
  bottom: 0;
  top:0;
  padding: 0 0.06rem;
  box-sizing: border-box;
  width: 100%;
    .address{
      height: 1rem;
      padding:0.5rem 0.25rem 0rem 0.25rem;
      background-color: #fff;
      h2{
        font-size: 0.4rem;
        font-weight: bold;
        color: #666;
        height: 0.58rem;
      }
      h3{
        font-size: 0.2rem;
        height: 0.6rem;
        border-bottom: 0.01rem solid #ccc;
          .name{
            display: inline-block;
            margin-right:0.37rem;
          }
      }
    }
    h4{
      padding:0.36rem 0.25rem;
      font-size: 0.25rem;
      background-color: #fff;
      font-weight: bold;
        .time{
          float: right;
          color:#73a5eb;
        }
    }
    .goods{
        padding: 0.1rem 0 ;
        position: absolute;
        width: 100%;
        top: 2.5rem;
        bottom: 0rem;
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
                  color: #ccc;
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
    .choose{
      z-index: 2000;
      position: fixed;
      top: 0;
      bottom: 0;
      padding-top: 5rem;
      background-color: rgba(111, 111, 111, 0.2);
      box-sizing: border-box;
      font-size: 0.24rem;
      width: 100%;
      left: 0;
      h2{
        text-align: center;
        height:0.9rem;
        line-height: 0.85rem;
        font-size:0.3rem;
        border-bottom: 0.01rem #ccc solid;
        text-align: center;
        color: #000;
        position: relative;
        background-color: #fff;
        span{
          padding-left:0.2rem;
          font-size: 0.2rem;
          position: absolute;
          left: 0;
        }
      }
      ul{
        background-color: #fff;
        padding-left: 0.75rem;
        position: absolute;
        bottom: 0.88rem;
        box-sizing: border-box;
        width: 100%;
        top: 5.9rem;
        border-bottom: #000 solid 0.01rem;
        li{
          position: relative;
          .icon{
            width:0.3rem;
            position: absolute;
            height: 0.3rem;
            border-radius:50%;
            left: -0.5rem;
            top: 50%;
            margin-top: -0.15rem;
            border: 0.01rem solid #999;
            font-size: 0.3rem;
          }
          height: 1.22rem;
          padding:0.26rem 0.26rem 0.26rem 0;
          box-sizing: border-box;
          border-bottom:0.01rem solid #ccc;
          .addr{
            height:0.48rem;
            font-weight: bold;
            font-size: 0.28rem;
          }

        }
      }
      .addAddr{
        position: absolute;
        height: 0.9rem;
        bottom: 0;
        width: 100%;
        line-height: 0.9rem;
        font-size: 0.3rem;
        text-align: center;
        background-color: #00b43c;
        color: #fff;
        font-weight: bold;
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
            &.take{
              font-size: 0.23rem;
            }
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
