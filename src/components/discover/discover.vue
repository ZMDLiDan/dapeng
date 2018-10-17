<!--发现-->
<template>
  <div id="discover">
    <div class="like">
      <h4>—猜你喜欢—</h4>
      <div class="img">
        <img v-for="(likeimg,index) in likeimgs" :key="likeimg.key" :src="likeimg.productImages[0].path"
             @click="goDetailLike(index)" ref="likeimg"/>
      </div>
      <div class="refresh" @click="refresh">
        <i class="icon-refresh">换一换</i>
      </div>
    </div>
    <div class="hot">
      <h4>最新
        <span @click="
        goListNew"> > </span>
      </h4>
      <div class="goods" v-for="(good,index) in NewImageList" :key="good.key" @click="goDetailNew(index)">
        <div class="description">
          <h3>{{good.name}}</h3>
          <p>{{good.descript}}</p>
        </div>
        <img :src="good.productImages[0].path"/>
      </div>
    </div>
    <div class="new">
      <h4>最热
        <span @click="goListHot"> > </span>
      </h4>
      <div class="img">
        <img v-for="(hot,index) in HotImageList" :key="hot.key" :src=hot.productImages[0].path
             @click="goDetailHot(index)"/>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data () {
      return {
        likeimgs: [],
        NewImageList: [],
        HotImageList: [],
        i: 0
      }
    },
    methods: {
      goDetailLike: function (index) {
        var Id = this.likeimgs[index].id;
        this.$router.push({path: '/goodsDetail/' + Id});
      },
      goDetailNew: function (index) {
        var Id = this.NewImageList[index].id;
        this.$router.push({path: '/goodsDetail/' + Id});
      },
      goDetailHot: function (index) {
        var Id = this.HotImageList[index].id;
        this.$router.push({path: '/goodsDetail/' + Id});
      },
      goListNew: function () {
        this.$router.push({
          name: 'NHlist',
          params: {
            path: 'newProduct'
          }
        });
      },
      goListHot: function () {
        this.$router.push({
          name: 'NHlist',
          params: {
            path: 'hotProduct'
          }
        });
      },
      refresh: function () {
        var that = this;
        this.$http.get('http://47.95.249.186:8880/mixueshop/FavouriteImageList', {
          params: {
            pageNum: (++this.i) % 5
          }
        }).then(function (response) {
          that.likeimgs = response.data.data;
        }).catch(function (error) {
          console.log(error);
        });
      }
    },
    created () {
      var that = this;
      this.$http.get('http://47.95.249.186:8880/mixueshop/HotImageList', {
        params: {
          pageNum: 0
        }
      }).then(function (response) {
        that.HotImageList = response.data;
      }).catch(function (error) {
        console.log(error);
      });
      this.$http.get('http://47.95.249.186:8880/mixueshop/NewImageList', {
        params: {
          pageNum: 0
        }
      }).then(function (response) {
        that.NewImageList = response.data;
      }).catch(function (error) {
        console.log(error);
      });
      this.$http.get('http://47.95.249.186:8880/mixueshop/FavouriteImageList', {
        params: {
          pageNum: this.i
        }
      }).then(function (response) {
        that.likeimgs = response.data.data;
      }).catch(function (error) {
        console.log(error);
      });
    }
  };

</script>
<style lang='less' scoped>
  @import '../../assets/less/base.less';
  @import '../../assets/less/fonts.css';

  .content-warp {
    width: 100%;
    position: absolute;
    top: 0.9rem;
    bottom: 0.9rem;
  }

  .like {
    height: 4rem;
    background: rgba(255, 236, 197, 0.3);
    text-align: center;
    h4 {
      height: 1rem;
      line-height: 1rem;
      color: @baseColor;
      font-size: .3rem;
      font-weight: bold;
    }
    .img {
      height: 2rem;
      display: flex;
      img {
        margin: 0 auto;
        width: 2rem;
        height: 2rem;
        text-align: center;
        border: .02rem #999 solid;
        &:nth-child(1){
          position: relative;
          top: -0.1rem;
          transform: rotate(8deg);
        }
        &:nth-child(2){
          position: relative;
          top: 0.1rem;
          transform: scale(1.1,1.1);
        }
        &:nth-child(3){
          position: relative;
          top: -0.1rem;
          transform: rotate(-8deg);
        }
      }
    }
    .refresh {
      width: 1.5rem;
      height: .4rem;
      line-height: .4rem;
      background: #fff;
      border-radius: .2rem;
      margin: .3rem auto;
      font-size: .28rem;
      color: @baseColor;
    }
  }

  .hot {
    height: 4rem;
    padding: 0 .3rem;
    background: @bgColor;
    h4 {
      height: .5rem;
      font-size: .32rem;
      font-weight: bold;
      line-height: .5rem;
      color: @activeColor;
      background: @bgColor;
      span {
        display: inline-block;
        padding: 0 .5rem;
        color: @baseColor;
        position: absolute;
        right: .3rem;
      }
    }
    .goods {
      height: 1.55rem;
      background: #fff;
      display: flex;
      margin-bottom: .15rem;
      box-shadow: .01rem .01rem .01rem #999;
      .description {
        width: 5rem;
        height: 1.5rem;
        padding: 0 .2rem;
        overflow: hidden;
        h3 {
          width: 5rem;
          font-size: .28rem;
          line-height: .5rem;
          color: @smailColor;
        }
        p {
          width: 5rem;
          font-size: .26rem;
          color: #bbb;
          line-height: .3rem;
          padding: .1rem;
          overflow: hidden;
        }
      }
      img {
        width: 1.5rem;
        height: 1.4rem;
        margin: auto;
        float: right;
      }
    }
  }

  .new {
    width: 100%;
    /*position: absolute;
    bottom: .07rem;*/
    height: 3.6rem;
    background: @bgColor;
    h4 {
      height: .5rem;
      font-size: .32rem;
      font-weight: bold;
      line-height: .5rem;
      color: @activeColor;
      margin-left: .3rem;
      border-bottom: .05rem @bgColor solid;
      span {
        display: inline-block;
        padding: 0 .5rem;
        color: @baseColor;
        position: absolute;
        right: .3rem;
      }
    }
    .img {
      width: 7rem;
      margin-left: .3rem;
      height: 2.9rem;
      display: flex;
      background: #fff;
      // border-radius: .3rem;
      box-shadow: .01rem .01rem .01rem #999, -.01rem -.01rem .01rem #999;
      border-radius: 0.3rem;
      img {
        width: 3.2rem;
        height: 2.5rem;
        margin: auto;
        border-radius: .2rem;
      }
    }
  }
</style>
