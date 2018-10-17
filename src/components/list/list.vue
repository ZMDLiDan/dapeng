<!-- list页 -->
<template>
  <div class="list">
      <div class="header">
          <i class="icon-back" @click="goBack"></i>
          <div class="search" @click="goSear">
              <i class="icon-search"></i>
          </div>
      </div>
      <div class="tab">
            <div class="tab-item" v-for="(item,index) in navList" :key="item.key" :class="{active:item.isActive}" @click="activeFun(index)">
                {{item.text}}
            </div>
          </div>
      <div class="content contentList">
        <div
            class="item" v-for="item in currentProduct" :key="item.key" @click="gotoDetail(item.id)">
            <div class="img">
                <img :src="item.productImages[0].path">
            </div>
            <div class="cont">
                <h2>{{item.name}}</h2>
                <div class="grade">
                    <i class="icon-star2" v-for="i in level (item)" :key="i.key"></i>
                    <i class="icon-star1" v-for="i in 5-level (item)" :key="i.key"></i>
                    <span>{{item.prices[0].price}}元</span>
                </div>
                <div class="type">新品上架</div>
                <p>{{item.descript}}</p>
            </div>

        </div>
        <div class="isLogin" ref="footTip">
          正在努力加载中.....
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['cid'],
  beforeRouteLeave (to, from, next) {
    if (to.name.includes('goodsDetail')) {
      this.savedPosition = document.querySelector('.contentList').scrollTop;
    }
    next();
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name.includes('goodsDetail')) {
        document.querySelector('.contentList').scrollTop = vm.savedPosition;
      } else {
        vm.$refs.footTip.innerHTML = '正在努力加载中.....';
        vm.navList.forEach(item => {
          item.pageNum = 2;
          item.login = true;
        });
        vm.dataInitAll(1, 'http://47.95.249.186:8880/mixueshop/getProductDescByCreated').then(value => {
          vm.navList[0].Product = value;
        });
        vm.dataInitAll(1, 'http://47.95.249.186:8880/mixueshop/getProductDescByLevel').then(value => {
          vm.navList[1].Product = value;
        });
        vm.dataInitAll(1, 'http://47.95.249.186:8880/mixueshop/getProductDescByBuyNumber').then(value => {
          vm.navList[2].Product = value;
        });
        vm.dataInitAll(1, 'http://47.95.249.186:8880/mixueshop/getProductDescByUpdated').then(value => {
          vm.navList[3].Product = value;
        });
      }
    });
  },
  created () {
    this.$nextTick(() => {
      let content = document.querySelector('.contentList');
      document.documentElement.addEventListener(
        'touchmove',
        () => {
          let scrollTop = this.getScrollTop(content);
          let offsetHeight = this.getOffsetHeight(content);
          let scrollHeight = this.getScrollHeight(content);
          if (scrollTop + offsetHeight >= scrollHeight - 20) {
            this.navList.forEach(item => {
              if (item.isActive === true && item.login) {
                item.login = false;
                this.dataInitAll(item.pageNum, item.attr).then(value => {
                  if (value.length) {
                    item.Product = item.Product.concat(value);
                    item.pageNum++;
                    item.login = true;
                  } else {
                    this.$refs.footTip.innerHTML = '已经到达底部';
                  }
                });
              }
            });
          }
        },
        { passive: true }
      );
    });
    this.dataInitAll(1, 'http://47.95.249.186:8880/mixueshop/getProductDescByCreated').then(value => {
      this.navList[0].Product = value;
    });
    this.dataInitAll(1, 'http://47.95.249.186:8880/mixueshop/getProductDescByLevel').then(value => {
      this.navList[1].Product = value;
    });
    this.dataInitAll(1, 'http://47.95.249.186:8880/mixueshop/getProductDescByBuyNumber').then(value => {
      this.navList[2].Product = value;
    });
    this.dataInitAll(1, 'http://47.95.249.186:8880/mixueshop/getProductDescByUpdated').then(value => {
      this.navList[3].Product = value;
    });
  },
  data () {
    return {
      savedPosition: 0,
      navList: [
        {
          text: '全部',
          isActive: true,
          Product: [],
          pageNum: 2,
          attr: 'http://47.95.249.186:8880/mixueshop/getProductDescByCreated',
          login: true
        },
        {
          text: '好评优先',
          isActive: false,
          Product: [],
          pageNum: 2,
          attr: 'http://47.95.249.186:8880/mixueshop/getProductDescByLevel',
          login: true
        },
        {
          text: '人气最高',
          isActive: false,
          Product: [],
          pageNum: 2,
          attr: 'http://47.95.249.186:8880/mixueshop/getProductDescByBuyNumber',
          login: true
        },
        {
          text: '新品上架',
          isActive: false,
          Product: [],
          pageNum: 2,
          attr: 'http://47.95.249.186:8880/mixueshop/getProductDescByUpdated',
          login: true
        }
      ],
      flag: {
        type: Number
      }
    };
  },

  components: {},

  methods: {
    // 下拉刷新 ---- 获取scrollTop
    getScrollTop (ele) {
      return ele.scrollTop;
    },
    getOffsetHeight (ele) {
      return ele.offsetHeight;
    },
    getScrollHeight (ele) {
      return ele.scrollHeight;
    },

    goBack: function () {
      this.$router.push({
        path: '/index'
      });
    },
    goSear: function () {
      this.$router.push({ path: '/search' });
    },
    // 初始化数据函数
    dataInitAll (pageNum, addr) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(addr, {
            params: {
              categoryId: this.cid,
              pageNum: pageNum
            }
          })
          .then(res => {
            resolve(res.data);
          });
      });
    },
    activeFun: function (index) {
      // 计算哪个应给高亮
      this.navList.forEach((item, i) => {
        if (i === index) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
    },
    gotoDetail (id) {
      this.$router.push({
        path: '/goodsDetail/' + id
      });
    },
    level (item) {
      return parseInt(item.level / 20);
    }
  },
  computed: {
    currentProduct () {
      let current;
      this.navList.forEach(item => {
        if (item.isActive) {
          current = item.Product;
        }
      });
      return current;
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../assets/less/base.less";
@import "../../assets/less/fonts.css";
.list {
  z-index: 100;
  width: 100%;
  background-color: @bgColor;
  top: -0.9rem;
  bottom: 0;
  .header {
    width: 100%;
    padding: 0.2rem 0 0.4rem 0;
    background-color: #fff;
    position: fixed;
    z-index: 200;
    .icon-back {
      font-size: 0.5rem;
      color: @activeColor;
      position: relative;
      top: 0.61rem;
      left: 0.15rem;
    }
    .search {
      width: 6rem;
      height: 0.6rem;
      margin: 0 auto;
      //background-color: rgba(221, 221, 221, 0.7);
      background-color: @bgColor;
      border-radius: 0.7rem;
      .icon-search {
        font-size: 0.3rem;
        color: @smailColor;
        position: relative;
        top: -0.45rem;
        left: 0.2rem;
      }
    }
  }
  .tab {
    position: fixed;
    top: 1.1rem;
    width: 100%;
    height: 0.5rem;
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    z-index: 200;
    .tab-item {
      text-align: center;
      font-size: 0.28rem;
      line-height: 0.5rem;
      color: @baseColor;
      &.active {
        color: @activeColor;
      }
    }
  }
  .content {
    background-color: @bgColor;
    overflow: auto;
    position: absolute;
    top: 2.5rem;
    width: 100%;
    bottom: 0;
    .isLogin {
      width: 100%;
      height: 0.5rem;
      text-align: center;
      font-size: 0.2rem;
      line-height: 0.5rem;
      background-color: #fff;
      color: @activeColor;
    }
    .item {
      width: 99%;
      margin: 0 auto;
      background-color: #ffffff;
      display: flex;
      margin-top: 0.05rem;
      padding-bottom: 0.1rem;

      .img {
        width: 2.2rem;
        height: 2rem;
        margin: 0.15rem 0.5rem 0.15rem 0.3rem;
        img {
          width: 2.2rem;
          height: 2rem;
        }
      }
      .cont {
        padding-top: 0.15rem;

        h2 {
          color: #000000;
          font-size: 0.26rem;
        }
        .grade {
          color: @baseColor;
          font-size: 0.22rem;
          padding: 0.2rem 0 0.2rem 0;
          span {
            padding-left: 0.1rem;
          }
        }
        .type {
          color: @goodsLogo;
          font-size: 0.24rem;
          width: 1rem;
          height: 0.3rem;
          text-align: center;
          line-height: 0.3rem;
          border: 2px solid @goodsLogo;
          margin-bottom: 0.15rem;
        }
        p {
          color: @baseColor;
          font-size: 0.24rem;
          line-height: 0.28rem;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 0.5rem;
        }
      }
    }
  }
}
</style>
