<!--  -->
<template>
  <div class="wrap" v-cloak>
    <div class="evaluate-header">
      <img :src="goods.img">
      <div class="goods-message">
        <span class="name">
          {{goods.name}}
        </span>
        <div class="starts" v-if="itemScore">
          <i v-cloak class="icon-star2 icon-star" v-for="item in itemScore" :key="item.key"></i>
          <i  class="icon-star1 icon-star" v-for="item in (5-itemScore)" :key="item.key"></i>
          <span>{{goods.leval}}分</span>
        </div>
        <div class="total">留言:{{evaluate.length}}条</div>
      </div>
    </div>
    <div class="borads">
      <h2 class="title">精彩评价</h2>
      <ul class="borders-list">
        <li class="borders-item" v-for="item in evaluate" :key="item.key">
          <div class="top">
            <div class="user">匿名用户</div>
            <div class="date">{{item.created}}</div>
          </div>
          <div class="goodsImg">
            <img v-for="img in item.discussImages" :src="img.path" :key="img.path">
          </div>
          <div class="text">
            {{item.descript}}
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  props: ['id'],
  created () {
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      new Promise((resolve, reject) => {
        vm.$http.get('http://47.95.249.186:8880/mixueshop/productDesc.action', {
          params: {
            id: vm.id
          }
        }).then((res) => {
          vm.goods = res.data;
          console.log(vm.goods);
          vm.goods.leval = res.data.level / 20;
          vm.goods.name = res.data.name;
          vm.goods.img = res.data.productImages[0].path;
        })
        resolve();
      }).then(() => {
        vm.$http.get('http://47.95.249.186:8880/mixueshop/selectProductDiscussController', {
          params: {
            productid: vm.id,
            pageNum: 1
          }
        }).then((res) => {
          vm.evaluate = res.data;
          console.log(vm.evaluate)
        })
      })
    })
  },
  data () {
    return {
      goods: {},
      evaluate: []

    }
  },
  computed: {
    itemScore () {
      return parseInt(this.goods.level / 20 || 0);
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../../assets/less/fonts.css';
@import '../../../assets/less/base.less';

.wrap{
  top: 0.9rem;
  bottom: 0;
  position: absolute;
  font-size: 0.3rem;
  z-index: 2;
  background-color:@bgColor;
    .evaluate-header{
      height:2.2rem;
      padding: 0.2rem;
        img{
          width: 2.5rem;
          height: 2rem;
          border: 0.04rem solid rgba(111, 111, 111, 0.5);
          border-radius: 20%;
        }
        .goods-message{
          margin-left: 0.4rem;
          display: inline-block;
          padding: 0.4rem 0;
          font-size: 0.24rem;
          vertical-align: top;
            .starts{
              padding: 0.1rem 0;
              .icon-star{
                font-size: 0.24rem;
              }
            }
            .total{
              font-size: 0.2rem;
              color:@goodsLogo;
            }
        }
    }
    .borads{

      .title{
        height: 0.6rem;
        line-height: 0.6rem;
        background-color: #66cc99;
        font-size: 0.32rem;
        color: #fff;
        font-weight: 500;
        padding-left: 0.5rem;
        filter:opacity(50%);
      }
      .borders-list{
        position: absolute;
        left: 0rem;
        right: 0rem;
        top: 3.2rem;
        bottom: 0;
        padding: 0 0.2rem;
        color: #ccc;
        overflow: auto;
          .borders-item{
            background: #fff;
            font-size: 0.24rem;
            padding: 0.24rem;
            margin-bottom: 0.1rem;
              .top{
                height: 0.3rem;
                display: flex;
                margin-bottom: 0.1rem;
                  .user{
                    flex: 7;

                  }
                  .date{
                    flex: 3;
                  }
              }
              .goodsImg{
                padding: 0.2rem 0rem 0.2rem 0rem;
                img{
                  width: 1rem;
                  height: 1rem;
                  margin-right: 0.2rem;
                }
              }
              .text{
                padding-left: 0.2rem;
              }

          }
      }

    }
}
</style>
