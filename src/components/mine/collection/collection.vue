<template>
  <div class="collection">
    <ul>
      <li v-for="(item,index) in data" :key="item.key" v-if="item">
        <leftSlider
          @msg-from-child="getMsgFromChild"
          :index="index"
          :id="item.product[0].id"
        >
          <div class="item-warp" @click="goDetail(index)">
            <img :src="item.product[0].productImages[0].path"/>
            <div class="cont">
              <h2>{{item.product[0].name}}</h2>
              <div class="grade">
                <i class="icon-star2" v-for="i in Math.round(item.product[0].level/20)" :key="i.key"></i>
                <i class="icon-star1" v-for="i in 5-Math.round(item.product[0].level/20)" :key="i.key"></i>
                <span>{{item.product[0].level/20}}分</span>
              </div>
              <div class="type">{{type}}</div>
              <p>{{item.product[0].descript}}</p>
            </div>
          </div>
        </leftSlider>
      </li>
    </ul>
  </div>
</template>
<script>
  import leftSlider from './deleteSlider';

  export default {
    components: {
      leftSlider
    },
    data () {
      return {
        type: '新品上架',
        data: []
      }
    },
    methods: {
      getMsgFromChild (v) {
        this.data.splice(v, 1)
      },
      goDetail: function (index) {
        var Id = this.data[index].product[0].id;
        this.$parent.index++;
        this.$parent.title.push('商品详情');
        this.$router.push({path: '/goodsDetail/' + Id})
      }
    },
    mounted () {
      var that = this;
      this.$http.get('http://47.95.249.186:8880/mixueshop/selectCollectionController').then(function (response) {
        that.data = response.data;
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../assets/less/base.less";
  @import "../../../assets/less/fonts.css";

  .collection {
    position: absolute;
    bottom: 0;
    background: @bgColor;
    z-index: 10;
  }

  .item-warp {
    display: flex;
    img {
      width: 2.2rem;
      height: 2rem;
      margin: 0.15rem 0.5rem 0.15rem 0.3rem;
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
      }
    }
  }
</style>
