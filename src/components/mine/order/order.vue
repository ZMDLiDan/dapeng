<!--全部订单-->
<template>
  <div class="orderList">
    <div class="nav">
      <span
        v-for="(state,index) in states"
        :key="state"
        :class="{actived:state===states[current]}"
        @click="changeCurrent(index)"
      >{{state}}</span>
    </div>
    <div class="content-wrapper">
      <div class="order" v-for="item in currentOrder" :key="item.key">
        <h5>
          <span class="date">{{getTime(item.orderTime)}}</span>
          <span class="icon-delete" @click="deleteGood(item.id)"></span>
        </h5>
        <ul class="goodsList">
          <li class="good" v-for="good in item.orderItems" :key="good.id">
            <div class="left">
              <img :src="good.img">
              <span class="name">{{good.name}}</span>
              <span class="cont">{{good.cont}}</span>
            </div>
            <div class="right">
              <span class="number">X{{good.number}}</span>
              <span class="finalPay">￥{{good.finalPay}}</span>
            </div>
          </li>
        </ul>
        <div class="detail">
          <div class="price">
            <span class="totalPrice">共计金额:￥{{item.finalPay}}</span>
          </div>
          <div class="btn-wrap">
            {item.state}
            <input type="button" value="再次购买" @click="againSubmit(item.id,item.finalPay)">
            <input type="button" value="评价" v-if="item.state===1" @click="assess(item.id)">
            <input type="button" value="付款" v-if="item.state===0" @click="balance(item.id,item.finalPay)">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$http.get('http://47.95.249.186:8880/mixueshop/getOrdersList', {
      params: {
        indexPage: 1
      }
    }).then((res) => {
      vm.allOrder = [];
      console.log(res.data)
      res.data.data.rows.forEach((order) => {
        let promises = [];
        order.orderItems.forEach(item => {
          promises.push(
            vm.selectProductById(item.productId).then((value) => {
            item.name = value.name;
            item.img = value.img;
        }));
        });
        Promise.all(promises).then(
          () => {
          vm.allOrder.push(order);
        })
      })
      })
    })
  },
  data () {
    return {
      states: ['全部', '待付款', '待评价'],
      current: 0,
      allOrder: []
    };
  },

  computed: {
    currentOrder () {
      if (this.current === 0) {
        return this.allOrder;
      }
      if (this.current === 1) {
        return this.allOrder.filter((order) => order.state === 0);
      }
      if (this.current === 2) {
        return this.allOrder.filter((order) => order.state === 1);
      }
    }
  },
  methods: {
    againSubmit (id, finalPay) {
      this.$http.get('http://47.95.249.186:8880/mixueshop/againSubmit', {
        params: {
          id: id
        }
      }).then((res) => {
        console.log(res.data);
        this.$router.push({
          path: '/paymentOrder/' + res.data.data.id + '/' + finalPay
        });
      })
    },
    balance (id, finalPay) {
      alert(id)
      alert(finalPay)
      this.$router.push({
        path: '/paymentOrder/' + id + '/' + finalPay
      })
    },
    getTime (time) {
      let date = new Date(time);
      let str =
        date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        date.getDate() + '      ' +
        date.getHours() + ':' +
        date.getMinutes();
        return str;
    },
    selectProductById (id) {
      return new Promise((resolve, reject) => {
        this.$http.get('http://47.95.249.186:8880/mixueshop/productDesc.action', {
        params: {
          id: id
        }
      }).then((res) => {
        let productDesc = {
          name: res.data.name,
          img: res.data.productImages ? res.data.productImages[0].path : ''
        };
        resolve(productDesc);
      })
      })
    },
    changeCurrent (index) {
      this.current = index;
    },
    deleteGood (id) {
      // 删除订单接口
      this.$http('http://47.95.249.186:8880/mixueshop/delOrdersById', {
        params: {
          id: id
        }
      }).then((res) => {
        console.log(res.data)
      })
      this.allOrder.splice(this.allOrder.findIndex((todo) => todo.id === id), 1)
    },
    assess (id) {
      this.$parent.index++;
      this.$router.push({path: '/assessment/' + id});
      this.$parent.title.push('评价');
    }
  }
}

</script>
<style lang='less' scoped>
  @import "../../../assets/less/base.less";
  @import "../../../assets/less/fonts.css";
::-webkit-scrollbar {
width: 0em;
}
::-webkit-scrollbar:horizontal {
height: 0em;
}
.orderList{
  width: 100%;
  top: 0.9rem;
  bottom: 0;
  z-index: 2;
  font-size: 0rem;
  background: @bgColor;
    .nav{
      display: flex;
      background-color: #fff;
      color:@baseColor;
      height: 0.6rem;
      line-height: 0.6rem;
      margin-bottom:0.1rem;
      font-size: 0.28rem;
      text-align: center;
      span{
        display: block;
        flex: 1;
        border-bottom:0.03rem solid rgba(102,204,153,0);
        transition: all 0.4s ease-in;
        &.actived{
          border-bottom: 0.03rem solid rgba(102,204,153,0.7);
        }
        &:hover{
          border-bottom: 0.03rem solid rgba(102,204,153,0.7);
        }
      }
    }
    .content-wrapper{
      position: absolute;
      width: 100%;
      top: 0.7rem;
      bottom: 0;
      padding:0 0.1rem;
      overflow: auto;
      box-sizing: border-box;
        .order{
          margin-bottom:0.2rem;
          h5{
            height:0.2rem;
            background:#fff;
            font-size: 0.2rem;
            color: @baseColor;
            line-height: 0.2rem;
            padding: 0.1rem 0.2rem;;
            margin-bottom:0.02rem;
            .date{
              display: inline-block;
              margin-right: 0.2rem;
            }
            .time{
              display: inline-block;
            }
            .icon-delete{
              font-size: 0.2rem;
              text-align: center;
              float: right;
              width:0.5rem;
              border-left:0.01rem @baseColor solid;
            }

          }
          .goodsList{
            .good{
              background-color: #fff;
              color: @baseColor;
              padding:0.15rem 0.2rem;
              overflow: hidden;
              margin-bottom: 0.02rem;
              .left{
                float: left;

                  img{
                    width: 1.4rem;
                    height:1.2rem;
                    margin-right:0.24rem;
                    vertical-align: middle;
                  }
                  .name{
                    font-size: 0.28rem;
                    font-weight: 400;
                    //position: relative;
                    //top: -0.2rem;
                  }
                  .cont{
                    font-size: 0.22rem;
                    line-height: 0.3rem;
                    position: relative;
                    left: -1.1rem;
                    top: 0.5rem;
                  }
              }
              .right{
                    .number{
                      color: @goodsLogo;
                      font-size: 0.2rem;
                    }
                    float: right;
                    font-size: 0.24rem;
                    padding-top: 0.8rem;
                    color: #999;
                }
            }
          }
          .detail{
            padding:0.1rem 0.2rem;
            overflow: hidden;
            margin-bottom:0.2rem;
            background-color: #fff;
              .price{
                  text-align: right;
                  margin-bottom: 0.1rem;
                  font-size: 0.24rem;
                  line-height: 0.4rem;
                  .totalPrice{
                    display: inline-block;
                    color:@goodsLogo;
                  }
              }
          }
          .btn-wrap{
            text-align: right;
            input{
              padding: 0.1rem 0.2rem;
              color: #fff;
              font-size:0.24rem;
              border-radius: 0.5rem;
              background-color: @goodsLogo;
              margin-left:0.2rem;
              outline: none;
            }
          }
        }
    }
}
</style>
