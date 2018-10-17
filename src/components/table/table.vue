<!--  -->
<template>
  <div class="table">
    <div class="bgWarpper"
      v-show="!finalPay"
    >
      <h2 @click="goToBuy">空空如也<br>去添加点东西吧！</h2>
    </div>
    <div class="content">
      <div class="eat" v-if="eatSome.length">
        <h2><img src="./cake.svg">蔬菜</h2>
        <ul class="eatSome">
          <li class="eat-item" v-for="eat in eatSome" :key="eat.id">
            <span class="icon"></span>
            <img :src="eat.product[0].productImages[0].path" alt="">
            <div class="name">
              <h4>{{eat.product[0].name}}</h4>
              <p>{{eat.product[0].descript}}</p>
              <h5>{{eat.price[0].name}}</h5>
              <h6>￥<span>{{eat.price[0].price}}</span></h6>
            </div>
            <div class="btn">
              <span class="desc" @click="delCarItems(eat.id)">-</span>
              <span class="num">{{eat.number}}</span>
              <span class="add" @click="addCarItems($event,eat.id)">+</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="drink" v-if="drinkSome.length">
        <h2><img src="./drink.svg"/>水果</h2>
        <ul class="drinkSome">
          <li class="drink-item" v-for="drink in drinkSome" :key="drink.id">
            <span class="icon"></span>
            <img :src="drink.product[0].productImages[0].path" alt="">
            <div class="name">
              <h4>{{drink.product[0].name}}</h4>
              <p>{{drink.product[0].descript}}</p>
              <h5>{{drink.price[0].name}}</h5>
              <h6>￥<span>{{drink.price[0].price}}</span></h6>
            </div>
            <div class="btn">
              <span class="desc" @click="delCarItems(drink.id)">-</span>
              <span class="num">{{drink.number}}</span>
              <span class="add" @click="addCarItems($event,drink.id)">+</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="play" v-if="playSome.length">
        <h2><img src="./toy.svg">花卉</h2>
        <ul class="playSome">
          <li class="play-item" v-for="play in playSome" :key="play.id">
            <!-- <span class="icon"></span> -->
            <img :src="play.product[0].productImages[0].path">
            <div class="name">
              <h4>{{play.product[0].name}}</h4>
              <p>{{play.product[0].descript}}</p>
              <h5>{{play.price[0].name}}</h5>
              <h6>￥<span>{{play.price[0].price}}</span></h6>
            </div>
            <div class="btn">
              <span class="desc" @click="delCarItems(play.id)">-</span>
              <span class="num">{{play.number}}</span>
              <span class="add" @click="addCarItems($event,play.id)">+</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="play" v-if="DIYSome.length">
        <h2><img src="./toy.svg">DIY</h2>
        <ul class="DIYSome">
          <li class="DIY-item" v-for="DIY in DIYSome" :key="DIY.id">
            <!-- <span class="icon"></span> -->
            <img :src="DIY.product[0].productImages[0].path">
            <div class="name">
              <h4>{{DIY.product[0].name}}</h4>
              <p>{{DIY.product[0].descript}}</p>
              <h5>{{DIY.price[0].name}}</h5>
              <h6>￥<span>{{DIY.price[0].price}}</span></h6>
            </div>
            <div class="btn">
              <span class="desc" @click="delCarItems(DIY.id)">-</span>
              <span class="num">{{DIY.number}}</span>
              <span class="add" @click="addCarItems($event,DIY.id)">+</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="footer" v-if="finalPay">
        <div class="content-left">
          <div class="logo-wrap">
            <i class="icon-shoppingCar"
               :class="{'isActive':finalPay}"
            ></i>
            <transition name="fade">
              <div class="num"
                v-show="cartItem.length"
                >{{cartItemNum}}</div>
            </transition>
          </div>
          <div class="price"
          v-show="finalPay"
          >￥{{finalPay}}元</div>
        </div>
        <div v-show="1"
        class="content-right" @click="goToBuy">去购买</div>
      </div>
    </div>
    <div class="balls-wrap">
      <div v-for="item in ballItems" :key="item.key">
        <transition name="drop"
          @before-enter="beforeDrop"
          @enter="droping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="item.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
  next((vm) => {
    vm.$http.get('http://47.95.249.186:8880/mixueshop/selectAllCartItem').then((res) => {
      vm.cartItem = res.data;
    })
  });
},

  created () {
    // 配置路由
    this.$parent.index = '-1';
    this.$parent.title = [];
    // 初始化购物车
    this.$http.get('http://47.95.249.186:8880/mixueshop/selectAllCartItem').then((res) => {
      console.log(res.data)
      this.cartItem = res.data;
      console.log(this.cartItem)
    })
  },
  data () {
    return {
      ballItems: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      droped: [],
      cartItem: []
    }
  },
  methods: {
    beforeDrop (el) {
      let ratio = parseFloat(document.documentElement.style.fontSize);
      for (let i = 0; i < this.droped.length; i++) {
        let x = this.droped[i].ball.getBoundingClientRect().left - 0.7 * ratio;
        let y = -(-this.droped[i].ball.getBoundingClientRect().top - 1.4 * ratio - 0.3 * ratio + window.innerHeight);
        el.style.display = '';
        el.style.transform = `translateY(${y}px)`;
        let inner = el.querySelector('.inner-hook');
        inner.style.transform = `translateX(${x}px)`;
      }
    },
    droping (el, done) {
      /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.transform = 'translateY(0)';
          let inner = el.querySelector('.inner-hook');
          inner.style.transform = 'translateX(0)';
          done();
        });
    },
    afterDrop (el) {
      this.droped.forEach((item) => { item.show = false });
    },
    addCarItems (e, id) {
      this.addGoods(e);
      this.cartItem.forEach((item) => {
        if (item.id === id) {
          item.number++;
          item.finalPay = item.price[0].price * item.number;
          this.$http.post('http://47.95.249.186:8880/mixueshop/updateCartItem', {
            id: id,
            number: item.number,
            finalPay: item.finalPay
          })
        }
      })
    },
    delCarItems (id) {
      this.cartItem.forEach((item) => {
        if (item.id === id) {
          if (item.number === 1) {
            this.$http.post('http://47.95.249.186:8880/mixueshop/deleteCartItem', {
                id: id
            }).then(() => {
              this.cartItem = this.cartItem.filter((item) => {
                return item.id !== id
              })
            }).catch((err) => {
              console.log(err)
            })
          } else {
            item.number--;
            item.finalPay -= item.price[0].price;
            this.$http.post('http://47.95.249.186:8880/mixueshop/updateCartItem', {
            id: id,
            number: item.number,
            finalPay: item.finalPay
          })
          }
        }
      })
    },
    addGoods (e) {
      for (let i = 0; i < this.ballItems.length; i++) {
        if (!this.ballItems[i].show) {
          this.ballItems[i].show = true;
          this.ballItems[i].ball = e.target;
          this.droped.push(this.ballItems[i]);
          break;
        }
      }
    },
    change () {
      this.isChange.bool = !this.isChange.bool;
    },
    goToBuy () {
      this.$router.push({
          name: 'placeOrder',
          params: {
            itemAll: this.cartItem
          }
        });
    }
  },
  computed: {
    finalPay () {
      let finalPay = 0;
      if (this.cartItem) {
          this.cartItem.forEach((item) => {
            finalPay += item.finalPay;
          });
      }
      return finalPay;
    },
    cartItemNum () {
      let num = 0;
      if (this.cartItem) {
        this.cartItem.forEach((item) => {
          num += item.number;
        })
      }
      return num;
    },
    eatSome () {
      return this.cartItem && this.cartItem.filter(item => item.product[0].categoryId === 6);
    },
    drinkSome () {
      return this.cartItem && this.cartItem.filter(item => item.product[0].categoryId === 7);
    },
    playSome () {
      return this.cartItem && this.cartItem.filter(item => item.product[0].categoryId === 8);
    },
    DIYSome () {
      return this.cartItem && this.cartItem.filter(item => item.product[0].categoryId === 4);
    }
  }

}

</script>
<style lang='less' scoped>
@import '../../assets/less/fonts.css';
@import '../../assets/less/base.less';
.table{
  .bgWarpper{
    position: absolute;
    top: 0rem;
    bottom:0rem;
    left: 0;
    background: url('http://img.shijue.me/leadinart0pic54b88ad7e744f9616e002884_d.jpeg!dp6');
    background-position: center ;
    z-index: 2;
    padding-top: 1rem;
    background-size: cover;
    background-color: #fff;
    width: 100%;
    h2{
      font-size: 0.6rem;
      color: rgba(130, 130, 130, 0.6);
      text-align: center;
    }
  }
  width: 100%;
  box-sizing: border-box;
  padding:0.24rem;
  background-color: #f5f5f5;
  position: absolute;
  padding-bottom: 0.9rem;
  // 购物车小球下落动画
  .balls-wrap{
    position: fixed;
    left: 0.7rem;
    bottom: 1.4rem;
    width: 0.3rem;
    height: 0.3rem;
    z-index: 100;
      .drop-enter-active{
        transition: all 10s linear;
      }
        .ball{
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
          .inner{
          position: absolute;
          width: 0.3rem;
          height: 0.3rem;
          background-color: #00b43c;
          opacity: 0.6;
          transition: all 0.4s linear;
          border-radius: 50%;
        }
      }
  }
  h1{
    height: 0.8rem;
    padding: 0 0.5rem;
    span{
      transition: all 0.3s ease-in;
      &.active{
        background-color: #00b43c;
        box-shadow: 0.05rem 0.05rem 0.1rem #00b43c;
      }
      //float: right;
      display: block;
      position: relative;
      left: 4.95rem;
      font-size: 0.3rem;
      background-color: #ec5d29;
      height: 0.5rem;
      width: 1.5rem;
      line-height: 0.5rem;
      text-align: center;
      border-radius: 0.5rem;
      color: #fff;
      box-shadow: 0.05rem 0.05rem 0.1rem #ec5d29;
    }
  }
  .content{
    position: absolute;
    top: 0.2rem;
    bottom: 0;
    overflow: auto;
    left: 0.24rem;
    right: 0.24rem;
  }
  .eat,.drink,.play{
    background-color: #fff;
    border-radius: 0.3rem;
    margin-bottom:0.24rem;
    padding:0.1rem 0.2rem 0.4rem 0.2rem;
      h2{
        height: 0.75rem;
        line-height: 0.75rem;
        position: relative;
        padding-left: 1rem;
        font-size: 0.3rem;
        border-left:2px solid #d9dde1;
        margin-bottom: 0.3rem;
        background-color: #f3f5f7;
        color:#93999f;
        box-shadow:0.1rem 0.1rem 0.05rem #d9dde1;
          img{

            width: 0.4rem;
            height: 0.4rem;
            position: absolute;
            left: 0.4rem;
            top: 50%;
            margin-top: -0.2rem;
          }
      }
    ul{
      padding-left: 0.6rem;
      li{
        height: 1.85rem;
        padding-bottom: 0.4rem;
        position: relative;
        margin-bottom: 0.4rem;
        img{
          width: 1.85rem;
          height: 1.85rem;
          margin-right:0.2rem;
          display: block;
          float: left;

        }
        .name{
          width:3.65rem;
          float: left;
          h4{
            font-size: 0.3rem;
            height: 0.3rem;
            line-height: 0.3rem;
            margin-bottom: 0.2rem;
            color: @baseColor;
          }
          p{
            height:0.6rem;
            line-height: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 0.1rem;
            font-size:0.24rem;

          }
          h5{
            font-size: 0.24rem;
            color: #888;
            padding:0 0.5rem;
            width: 2rem;
            background-color:rgba(204, 204, 205, 0.2);
            text-align: center;
            border-radius: 0.3rem;
            margin-bottom: 0.1rem;
          }
          h6{
            font-size: 0.24rem;
            color:#ec5d29;
            span{
              font-size: 0.28rem;
            }
          }
        }
        .btn{
          position: absolute;
          width: 1.6rem;
          display: table;
          overflow: hidden;
          height: 0.4rem;
          font-size:0.2rem;
          border-radius: 0.1rem;
          border: 0.01rem #ccc solid;
          position: absolute;
          right:0.2rem;
          bottom: 0;
          span{
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            width: 0.45rem;
              &.num{
                width: 0.7rem;
              }
          }
        }
    }
  }
}
    .footer{
      position: fixed;
      bottom: 0.9rem;
      height: 0.9rem;
      background-color:#80858a;
      width: 100%;
      left: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      .content-left{
        display: flex;
        .logo-wrap{
          width: 0.8rem;
          height: 0.8rem;
          padding: 0.06rem;
          position: relative;
          top: -0.2rem;
          border-radius: 50%;
          background-color: #666;
          margin: 0 0.3rem;
          vertical-align: top;
          .icon-shoppingCar::before{
            transition: color 0.5s ease-in;
          }
          .isActive::before{
              color: rgb(0, 160, 220)
          }
          i{
            font-size: 0.8rem;
            display: block;
          }
          .num{
            position: absolute;
            width:0.5rem;
            height: 0.25rem;
            font-size: 0.2rem;
            line-height: 0.25rem;
            color: #fff;
            text-align: center;
            border-radius: 0.3rem;
            background-color: #f01414;
            right: -0.1rem;
            top: 0;
          }
        }
        .price{
          color: #fff;
          font-weight: bold;
          font-size: 0.34rem;
          line-height: 0.9rem;
        }
      }
      .content-right{
        background-color:#00b43c;
        width: 2rem;
        float: right;
        font-size: 0.24rem;
        color: #fff;
        text-align: center;
        height: 0.9rem;
        line-height: 0.9rem;
      }
    }
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.5s;
}
.fade-enter,.fade-leave-to
{
  opacity: 0;
}

</style>
