<!-- 主页 -->
<template>
  <div class="index">
    <div class="slideshow1">
        <transition-group name="fade">
          <img
            v-for="(img1,index) in imgs1"
            :src="img1.productImages[0].path"
            @click="gotoDetail(img1.id)"
            :key="index"
            v-show="currentImage===index"
          />
        </transition-group>
    </div>
    <router-link to="/search">
    <div class="search">
      <i class="icon-search"></i>
    </div>
    </router-link>
    <div class="content">
      <div class="cont" @click="goEat">
        <!--<i class="icon-eat"></i>-->
        <img src="./vegetable.gif" alt="">
        <span>蔬菜</span>
      </div>
      <div class="cont" @click="goDrink">
        <!--<i class="icon-drink"></i>-->
        <img src="./fruit.gif" alt="">
        <span>水果</span>
      </div>
      <div class="cont" @click="goPlay">
        <!--<i class="icon-play"></i>-->
        <img src="./flower.gif" alt="">
        <span>花卉</span>
      </div>
      <div class="cont" @click="goDIY">
        <!--<i class="icon-more"></i>-->
        <img src="./DIY.jpg" alt="">
        <span>DIY</span>
      </div>
    </div>
    <div class="slideshow2">
      <swiper v-if="imgs1.length" :options="swiperOption2" ref="mySwiper">
        <swiper-slide v-for="img2 in imgs2" :key="img2.key" class="swiper-slide">
          <img :src="img2.productImages[0].path" :alt="img2.alt" @click="gotoDetail(img2.id)">
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  created () {
    this.$parent.index = '-1';
    this.$parent.title = [];
    this.$http.get('http://47.95.249.186:8880/mixueshop/getAutoRecommendProduct',{
      params: {
        pageNum: 1
      }
    }).then(res => {
      this.imgs1 = res.data.slice(0, 7);
      this.imgs2 = res.data.slice(7, 12)
      // 轮播图事件
       this.changeImage();
    }).catch((err) => {
      console.log(err)
    });
  },
  data () {
    return {
        imgs1: [ ],
        imgs2: [ ],
        currentImage: 0,
        swiperOption2: {
        // autoplay: true,
        notNextTick: true,
        speed: 500,
        autoplayStopOnLast: true,
        loop: true,
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      }
    }
  },

  methods: {
    changeImage () {
      setInterval(() => {
        if (this.currentImage < 6) {
          this.currentImage++;
        } else {
          this.currentImage = 0;
        }
      }, 3000)
    },
    gotoDetail (id) {
      this.$router.push({
        path: '/goodsDetail/' + id
      });
    },
    goEat: function () {
      this.$router.push({path: '/list/6'});
    },
    goDrink: function () {
      this.$router.push({path: '/list/7'});
    },
    goPlay: function () {
      this.$router.push({path: '/list/8'});
    },
    goDIY: function () {
      this.$router.push({path: '/list/4'});
    }
  },

  components: {
    swiper,
    swiperSlide
  },

  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper;
    }
  }
}

</script>
<style lang='less' scoped>
@import "../../assets/less/base.less";
@import "../../assets/less/fonts.css";

.index {
  width: 100%;
  background-color: @bgColor;

  .slideshow1 {
    width: 100%;
    height: 2.65rem;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    /*background-color: @activeColor;*/
    .fade-enter{
      opacity: 0.2;
      transform: scale(1,1)
    }
    .fade-enter-active{
      transition: all 2s linear;
    }
    .fade-enter-to{
      opacity: 1;
      transform: scale(2,2)
    }
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
  }
  .search {
    width: 3.56rem;
    height: 0.6rem;
    background-color: #ddd;
    border-radius: 0.3rem;
    margin: 0 auto;
    margin-top: 0.15rem;
    //margin-bottom: 0.45rem;
    padding-left: 0.2rem;
    opacity: 0.5;

    .icon-search {
      color: @smailColor;
      font-size: 0.5rem;
      position: relative;
      bottom: 0.37rem;
    }
  }
  .content {
    margin: 0.4rem auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    width: 6.7rem;
    height: 4.7rem;
    .cont {
      width: 3.3rem;
      height: 2rem;
      background-color: #fff;
      padding-top: 0.3rem;

      img {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        /*font-size: 1.2rem;*/
        margin: 0 auto;
        color: @activeColor;
      }
      span {
        display: block;
        text-align: center;
        font-size: 0.26rem;
        color: @baseColor;
        position: relative;
        top: 0.26rem;
      }
    }
  }
  .slideshow2 {
    width: 6.8rem;
    height: 2.65rem;
    overflow: hidden;
    margin: 0 auto;
    /*background-color: @activeColor;*/
    .swiper-slide {
      text-align: center;
      width: 100%;
      height: 2.65rem;
      display: inline-block;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
