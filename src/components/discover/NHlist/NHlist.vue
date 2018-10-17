<!-- list页 -->
<template>
  <div class="list">
    <div class="header">
      <i class="icon-back" @click="goBack"></i>
      <div class="tab-item">
        {{text}}
      </div>
    </div>
    <div class="content">
      <div @scroll="isBottom"
           class="item" v-for="(item,index) in product" :key="item.key" @click="gotoDetail(index)">
        <div class="img">
          <img :src="item.productImages[0].path">
        </div>
        <div class="cont">
          <h2>{{item.name}}</h2>
          <div class="grade">
            <i class="icon-star2" v-for="i in level (item)" :key="i.key"></i>
            <i class="icon-star1" v-for="i in 5-level (item)" :key="i.key"></i>
            <!--<span>{{item.prices[0].price}}元</span>-->
          </div>
          <div class="type">新品上架</div>
          <p>{{item.descript}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['path'],
    created() {
      if (this.path === 'newProduct') {
        this.text = '最新';
      } else {
        this.text = '最热';
      }
      this.$http.get('http://47.95.249.186:8880/mixueshop/' + this.path, {
        params: {
          pageNum: 1
        }
      }).then((res) => {
        this.product = res.data;
      })
    },
    data() {
      return {
        text: '',
        product: []
      };
    },

    components: {},

    methods: {
      isBottom: function (e) {
        console.log(e.target)
      },
      goBack: function () {
        this.$router.back(-1);
      },
      goSear: function () {
        this.$router.push({path: 'search'})
      },
      gotoDetail(index) {
        this.$parent.index++;
        this.$parent.title.push('商品详情');
        this.$router.push({path: '/goodsDetail/' + this.product[index].id});
      },
      level(item) {
        return parseInt(item.level / 20);
      }
    }
  }

</script>
<style lang='less' scoped>
  @import "../../../assets/less/base.less";
  @import "../../../assets/less/fonts.css";

  .list {
    z-index: 100;
    width: 100%;
    background-color: @bgColor;
    top: -0.9rem;
    bottom: 0;
    .header {
      width: 100%;
      padding: 0.2rem 0 0.2rem 0;
      background-color: #fff;
      position: fixed;
      z-index: 200;
      .icon-back {
        font-size: 0.6rem;
        color: @activeColor;
        position: relative;
        top: 0.64rem;
        left: 0.1rem;
      }
      .tab-item {
        text-align: center;
        font-size: 0.28rem;
        // letter-spacing: 2rem;
        line-height: 0.5rem;
        color: @activeColor;
      }
    }
    .content {
      background-color: @bgColor;
      overflow: auto;
      position: absolute;
      top: 1.9rem;
      bottom: 0;
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
