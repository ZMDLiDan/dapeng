<template>
  <div class="goodsDetail">
    <div class="header">
      <i class="icon-back" @click="goback"></i>
    </div>
    <div ref="detail">
      <div class="head">
        <div class="img-wrap">
          <img v-show="data.productImages[0].path" :src='data.productImages[0].path' class="headImg"/>
        </div>
        <div class="headTitle">
          <h4>{{data.name}}</h4>
          <p>{{data.prices[0].price}}元</p>
        </div>
        <div class="headBack">
          <i class="icon-right1">随时退</i>
          <i class="icon-right1">过期自动退</i>
        </div>
        <div class="headEvaluate">
          <span class="star icon-star1" @click="collection" v-show="!isCollection"></span>
          <span class="star icon-star2" @click="collection" v-show="isCollection"></span>
          <i class="icon-board" @click="goEvaluate"> 评价{{evaluateNum}} >></i>
        </div>
      </div>
      <div class="detail">
        <h3>本单详情</h3>
        <p>{{data.descript}}</p>
        <div id="main"></div>
        <img v-for="detailImg in detailImgs" :key="detailImg.key" :src="detailImg.img"/>
      </div>
      <div class="shopping">
        <div class="car">
          <i class="icon-shopping" @click="goShopping"></i>
        </div>
        <div class="addCar" @click="goCar">加入购物车</div>
        <div class="buy" @click="goBuy">立即购买</div>
      </div>
    </div>
    <div class="selectGoods" v-show="bOn">
      <img :src='data.productImages[0].path'/>
      <div class="descriction">
        <h5 class="price">￥{{selPrice}}</h5>
        <p class="selected">{{selText}}</p>
      </div>
      <div class="close" @click="close">X</div>
      <h4>属性分类</h4>
      <div class="type">
        <span class="goodsType" v-for="(item,index) in items" ref="selecteds" @click="sel(index)" :key="item.key">默认</span>
      </div>
      <div class="sure" @click="sure">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsDetail',
  props: ['id'],
  data () {
    return {
      data: {
        productImages: [
          {
            path: ''
          }
        ],
        prices: [
          {
            price: ''
          }
        ]
      },
      items: [],
      index: '',
      evaluateNum: '',
      isCollection: false,
      bOn: false,
      path: '',
      selText: '请选择，大小分类',
      selPrice: '',
      detailImgs: [
        {
          img:'https://gd2.alicdn.com/imgextra/i2/911873407/TB2LAnllwvD8KJjy0FlXXagBFXa_!!911873407.jpg_400x400.jpg'
        },
        { img: 'https://gd1.alicdn.com/imgextra/i1/3972702010/TB2Jdgtw49YBuNjy0FfXXXIsVXa_!!3972702010.jpg' },
        { img: 'https://gd4.alicdn.com/imgextra/i4/2944462581/TB2VrCmbVHzQeBjSZFpXXXm1XXa_!!2944462581.jpg' },
        { img: 'http://img008.hc360.cn/hb/MTQ3NjEwMTA5NzU1NjU5NTAwOTI=.jpg' },
        { img: 'https://gd4.alicdn.com/imgextra/i4/2074919476/TB2iczTXF95V1Bjy0FgXXc2vFXa_!!2074919476.jpg' }
      ]
    };
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
      let myChart = this.$echarts.init(document.getElementById('main'))
      myChart.setOption({
        title: { text: '植物生长环境' },
        tooltip: {},
        xAxis: {
          data: ["8.17", "8.18", "8.19", "8.20", "8.21", "8.22", "8.23"]
        },
        yAxis: {},
        series: [{
          name: '光照强度',
          type: 'line',
          data: [66, 70, 67, 65, 66, 67, 66]
        },
          {
            name: '土壤湿度',
            type: 'line',
            data: [55, 58, 55, 54, 59, 60, 62]
          },
          {
            name: '空气湿度',
            type: 'line',
            data: [60, 62, 64, 60, 64, 64, 62]
          },
          {
            name: '土壤温度',
            type: 'line',
            data: [30, 28, 28, 27, 26, 27, 28]
          },
          {
            name: '空气温度',
            type: 'line',
            data: [25, 28, 28, 27, 25, 27, 25]
          }
        ]
      });
    },
    goback () {
        this.$router.back(-1);
    },
    goEvaluate: function () {
      this.$router.push({ path: '/evaluate/' + this.id });
    },
    goShopping: function () {
      this.$parent.index = -1;
      this.$parent.title = [];
      this.$router.push({ path: '/table' });
    },
    goCar: function () {
      this.bOn = true;
      this.path = 1;
    },
    goBuy: function () {
      this.bOn = true;
      this.path = 0;
    },
    sel: function (index) {
      this.selText = '已选—' + this.data.name + this.items[index].name;
      this.selPrice = this.items[index].price;
      this.index = index;
    },
    close: function () {
      this.bOn = false;
      this.selText = '请选择，大小分类';
      this.selPrice = this.items[0].price;
      this.index = '';
    },
    sure: function () {
      if (this.path) {
        this.$http
          .post('http://47.95.249.186:8880/mixueshop/insertCartItem', {
            productId: this.data.id,
            finalPay: this.selPrice,
            number: 1,
            priceId: this.items[this.index].id,
            state: 1
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.$parent.index = -1;
        this.$parent.title = [];
        this.$router.push({
          name: 'placeOrder',
          params: {
            id: this.data.id,
            priceId: this.items[this.index].id,
            itemAll: [
              {
                finalPay: this.selPrice,
                number: 1,
                price: [
                  {
                    name: this.items[this.index].name,
                    price: this.items[this.index].price
                  }
                ],
                priceId: this.items[this.index].id,
                product: [
                  {
                    id: this.id,
                    name: this.data.name,
                    productImages: [
                      {
                        path: this.data.productImages[0].path,
                        id: this.data.productImages[0].id
                      }
                    ]
                  }
                ]
              }
            ]
          }
        });
      }
      this.bOn = false;
      this.selText = '请选择，大小分类';

      this.selPrice = this.items[0].price;

      this.index = '';
    },
    collection: function () {
      this.isCollection = !this.isCollection;
      if (this.isCollection) {
        this.$http
          .get('http://47.95.249.186:8880/mixueshop/insertCollectionController', {
            params: {
              productId: this.data.id
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.$http
          .get('http://47.95.249.186:8880/mixueshop/deleteCollectionController', {
            params: {
              productid: this.data.id
            }
          })
          .then(function (response) {
            // console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    goPlaceOrder: function () {
      this.$router.push({ path: 'placeOrder' });
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$http
        .get('http://47.95.249.186:8880/mixueshop/insetHistory', {
          params: {
            id: vm.id
          }
        })
        .then(res => {
          // console.log(res);
        });
      var oId = parseInt(vm.id);
      vm.$http
        .get('http://47.95.249.186:8880/mixueshop/productDesc.action', {
          params: {
            id: oId
          }
        })
        .then(function (response) {
          vm.selPrice = response.data.prices[0].price;
          vm.data = response.data;
          // console.log(vm.data);
          if(!vm.data.name){
            vm.data.name = '标配'
          }
          vm.items = vm.data.prices;
        })
        .catch(function (error) {
          console.log(error);
        });
      vm.$http
        .get('http://47.95.249.186:8880/mixueshop/selectSTAR', {
          params: {
            productId: oId
          }
        })
        .then(function (response) {
          if (response.data === 1) {
            vm.isCollection = true;
          } else {
            vm.isCollection = false;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      vm.$http
        .get('http://47.95.249.186:8880/mixueshop/countController', {
          params: {
            productid: oId
          }
        })
        .then(function (response) {
          vm.evaluateNum = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/base.less";
@import "../../assets/less/fonts.css";
#main{
  width: 7.5rem;
  height: 5rem;
}
.goodsDetail {
  width: 100%;
  position: absolute;
  top: 0rem;
  bottom: 0.9rem;
  z-index: 10;
  padding-top: 0.9rem;
  overflow: auto;
  .header {
      z-index: 20;
      width: 100%;
      background-color: @bgColor;
      top: 0;
      position: fixed;
      height: 0.9rem;
      padding: 0;
      margin: 0;
      i {
        position: fixed;
        left: .3rem;
        margin-top: -0.27rem;
        &:before {
          font-size: .54rem;
        }
      }
  }
}
.head {
  width: 100%;
  position: relative;
  .img-wrap{
    width: 100%;
    height: 4.5rem;
    img {
    width: 100%;
    height: 4.5rem;
    display: block;
  }
  }
  .headTitle {
    width: 100%;
    height: 1rem;
    position: absolute;
    top: 3.5rem;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    color: @bgColor;
    h4 {
      font-size: 0.34rem;
      line-height: 0.6rem;
      margin-left: 0.3rem;
    }
    p {
      font-size: 0.28rem;
      line-height: 0.4rem;
      margin-left: 0.3rem;
      overflow: hidden;
    }
  }
  .headBack {
    height: 0.8rem;
    width: 90%;
    line-height: 0.8rem;
    font-size: 0.28rem;
    color: rgb(0, 160, 220);
    padding: 0 0.3rem;
    background-color: #fff;
    margin-top: 0.02rem;
    i {
      margin-right: 0.5rem;
      &::before{
        color: rgb(0, 160, 220);
      }
    }
  }
  .headEvaluate {
    width: 98%;
    margin: 0 auto;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    border-bottom: 0.02rem rgb(0, 160, 220) solid;

    span {
      margin-left: 0.2rem;
      font-size: 0.4rem;
    }
    i {
      margin-left: 4.5rem;
      &:before {
        color: rgb(0, 160, 220);
      }
      color: #80858a;
    }
  }
}

.detail {
  width: 7rem;
  padding: 0 0.25rem;
  background: #fff;
  h3 {
    font-size: 0.34rem;
    color: @activeColor;
    line-height: 0.6rem;
  }
  p {
    font-size: 0.26rem;
    color: @baseColor;
    line-height: 0.5rem;
  }
  img {
    width: 7rem;
    height: 4.5rem;
  }
}

.shopping {
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  height: 0.9rem;
  background: @bgColor;
  overflow: hidden;
  font-size: 0.36rem;
  color: #fff;
  .car {
    width: 0.5rem;
    height: 0.5rem;
    font-size: 0.5rem;
    background: @bgColor;
    text-align: center;
    line-height: 0.5rem;
    padding: 0.2rem;
    border-radius: 50%;
    border: 0.01rem @activeColor solid;
    display: flex;
    position: fixed;
    left: 0.5rem;
    bottom: 0.2rem;
    i {
      &:before {
        color: rgb(0, 160, 220);
      }
    }
  }
  .addCar {
    width: 70%;
    height: 0.9rem;
    background-color:rgb(0, 160, 220);
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.26rem;
  }
  .buy {
    width: 30%;
    font-size: 0.26rem;
    background-color:#00b43c;
    line-height: 0.9rem;
    text-align: center;
  }
}

.selectGoods {
  width: 100%;
  height: 8rem;
  border-top: 0.02rem @activeColor solid;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  font-size: 0.28rem;
  color: @baseColor;
  img {
    width: 1.5rem;
    height: 1.5rem;
    border: 0.02rem @activeColor solid;
    border-radius: 0.05rem;
    margin: 0.3rem;
  }
  .descriction {
    width: 5rem;
    float: right;
    margin: 0.5rem 0;
    line-height: 0.5rem;
    h5 {
      color: @goodsLogo;
    }
  }
  h4 {
    margin: 0.2rem;
    font-size: 0.32rem;
    line-height: 0.4rem;
  }
  .type {
    padding-top: 0.5rem;
  }
  .goodsType {
    display: inline-block;
    min-width: 1rem;
    min-height: .5rem;
    text-align: center;
    background: #f5f5f5;
    opacity: 0.8;
    margin: 0.2rem;
    padding: 0.05rem;
    line-height: 0.5rem;
    border-radius: 0.15rem;
  }
  .sure {
    width: 7.5rem;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.32rem;
    text-align: center;
    color: #fff;
    background: @goodsLogo;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .close {
    width: 0.4rem;
    height: 0.4rem;
    border: 0.05rem solid @baseColor;
    border-radius: 50%;
    text-align: center;
    line-height: 0.4rem;
    color: @baseColor;
    font-weight: bold;
    position: fixed;
    right: 0.2rem;
    bottom: 7.3rem;
  }
  span:hover {
    color: #fff;
    background-color: @goodsLogo;
  }
}
  #chart{
    width: 7.5rem;
    height: 5rem;
  }
</style>
