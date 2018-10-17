<template>
  <div class="search-wrap">
    <div class="search">
      <i class="icon-back" @click="goBack"></i>
      <i class="icon-search"></i>
      <input class="frame" type="text" ref="changeColor" value="" placeholder="" v-on:input ="inputFunc"/>
      <span @click="goSearch">搜索</span>
    </div>
    <div class="list" v-show="showList"><li v-for="(item,index) in items" :key="item.key" @click="goSear(index)">{{item.name}}</li></div>
    <div class="noList" v-show="showHint">
      <span>! 暂时没有找到相关信息</span>
      <span>请输入别的"关键字"重新搜索</span>
    </div>
    <div class="hot-wrapper">
      <p>热门搜索</p>
      <div class="search-eat">
        <div v-for="(m,index) in arr1" :key="index" @click="gotoDetail1(index)">{{m.name}}</div>
      </div>
    </div>
    <div class="history-wrapper" v-show="showHis">
      <p>历史搜索</p>
      <div class="icon-delete" @click="goDelete"></div>
      <div class="history-search">
        <div v-for="(n,index) in arr2" :key="index" @click="gotoDetail2(index)">{{n}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    created () {
      this.$http.get('http://47.95.249.186:8880/mixueshop/getHotSearchProduct', {
        params: {
          pageNum: 1
        }
      }).then(res => {
        // console.log(res.data)
        this.arr1 = res.data;
        this.$refs.changeColor.placeholder = res.data.slice(0, 1)[0].name;
      }).catch((err) => {
        console.log(err)
      });

      this.$http.get('http://47.95.249.186:8880/mixueshop/login/isLogin', {
        }).then(res => {
          // console.log(res.data)
          if (res.data === true) {
            this.$http.get('http://47.95.249.186:8880/mixueshop/getRecord').then(res => {
              console.log(res.data)
              this.showHis = true;
              this.arr2 = res.data;
            }).catch((err) => {
              console.log(err)
            });
          } else {
            this.showHis = false;
            this.arr2 = '';
          }
        }).catch((err) => {
          console.log(err)
        });
    },

    name: 'search', // 取消缓存

    data () {
      return {
          arr1: [],
          arr2: [],
          showHis: true,
          showList: false,
          showHint: false,
          items: []
      }
    },
    methods: {
      goBack: function () {
        this.$router.back(-1);
      },
      goDelete: function () {
        this.showHis = false;
        this.$http.get('http://47.95.249.186:8880/mixueshop/deleteRecord').then(res => {
          // console.log(res.data)
        }).catch((err) => {
          console.log(err)
        });
      },
      gotoDetail1: function (index) {
        this.$refs.changeColor.value = this.arr1[index].name;
        this.inputFunc();
      },
      gotoDetail2: function (index) {
        this.$refs.changeColor.value = this.arr2[index];
        this.inputFunc();
      },

      inputFunc: function () {
        this.showHint = false;
        this.$refs.changeColor.value === '' ? this.showList = false : this.showList = true;
        this.$http.get('http://47.95.249.186:8880/mixueshop/getProductByProductName', {
          params: {
            pageNum: 1,
            productName: this.$refs.changeColor.value
          }
        }).then(res => {
          // console.log(res.data)
          this.items = res.data;
        }).catch((err) => {
          console.log(err)
        });
      },
      goSearch: function () {
        this.$http.get('http://47.95.249.186:8880/mixueshop/getProductByProductName', {
          params: {
            pageNum: 1,
            productName: this.$refs.changeColor.value === '' ? this.$refs.changeColor.placeholder : this.$refs.changeColor.value
          }
        }).then(res => {
          // console.log(res.data)
          if (res.data === 0) {
            this.showHint = true;
          } else {
            this.$http.get('http://47.95.249.186:8880/mixueshop/searchProduct', {
              params: {
                msg: this.items[0].name,
                pid: this.items[0].id
              }
            }).then(res => {
              // console.log(res.data)
              // console.log(this.items[0].name)
              // console.log(this.items[0].id)
              this.$router.push({ path: '/goodsDetail/' + this.items[0].id });
            }).catch((err) => {
              console.log(err)
            });
          }
        }).catch((err) => {
          console.log(err)
        });
      },

      goSear: function (index) {
        this.$http.get('http://47.95.249.186:8880/mixueshop/searchProduct', {
          params: {
            msg: this.items[index].name,
            pid: this.items[index].id
          }
        }).then(res => {
          // console.log(res.data.id)
          this.$router.push({ path: '/goodsDetail/' + res.data.id });
        }).catch((err) => {
          console.log(err)
        });
      }

    }
  }

</script>

<style lang='less' scoped>
  @import '../../assets/less/fonts.css';
  @import '../../assets/less/base.less';
  .search-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 50;
    background-color: #fff;
  }

  .search {
    z-index: 200;
    list-style: none;
    position: fixed;
    background-color: #fff;
    width: 100%;
    height: 0.8rem;
    font-size: .22rem;
    padding-top: .2rem;
    border-bottom: .03rem #ccc solid;
  }

  .search span {
    color: @activeColor;
    font-size: 0.24rem;
  }

  .frame {
    width: 5.2rem;
    height: .6rem;
    background-color: @bgColor;
    color: @baseColor;
    border-radius: .4rem;
    margin-left: .3rem;
    margin-right: .2rem;
    outline: none;
    padding-left: 0.6rem;
  }
  .icon-back {
    position: relative;
    font-size: 0.4rem;
    top: 0.1rem;
    left: 0.2rem;
  }
  .icon-search {
    position: absolute;
    top: .35rem;
    left: 0.9rem;
    font-size: .3rem;
    color: @baseColor;
  }
  .list {
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: #fff;
    position:absolute;
    top: 1rem;
    li {
      width: 6.3rem;
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: #fff;
      border-bottom: 0.02rem solid #ddd;
      position: relative;
      left: 50%;
      margin-left: -3.3rem;
      font-size: 0.24rem;
      padding-left: 0.3rem;
      color: @baseColor;
    }
  }
  .noList {
    z-index: 100;
    width: 100%;
    height: 100%;
    background-color: #fff;
    position:absolute;
    top: 1rem;
    font-size: 0.26rem;
    padding: 0.3rem 0 0 0.3rem;
    span {
      display: block;
      height: 0.5rem;
      color: @goodsLogo;
    }
    span:nth-child(2) {
      padding-left: 0.16rem;
    }
  }
  .hot-wrapper {
    padding: 0.3rem 0 0.7rem 0.4rem;
    position: relative;
    top: 0.9rem;
  }
  .history-wrapper {
    padding-left: 0.4rem;
    position: relative;
    top: 0.8rem;
  }
  .icon-delete {
    font-size: 0.26rem;
    position: relative;
    top: -0.25rem;
    left: 6.6rem;
  }

  .hot-wrapper p, .history-wrapper p {
    font-size: .22rem;
    color: #ccc;
  }

  .search-eat, .history-search {
    display: flex;
    width: 7.5rem;
    flex-wrap: wrap;
  }
  .history-search {
    position: relative;
    top: -0.25rem;
  }
  .search-eat div, .history-search div {
    padding: .18rem .44rem .18rem .44rem;
    background-color: @bgColor;
    font-size: .22rem;
    margin-top: .21rem;
    margin-right: .29rem;
    display: inline-block;
  }

</style>
