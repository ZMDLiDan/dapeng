<!--  -->
<template>
  <div class="placeOrder">
    <input type="hidden" name="formToken" value="${formToken}">
    <div class="header">
      <i class="icon-back" @click="goBack"></i>
      <span>提交订单</span>
    </div>
    <h2>
      <router-link class="left" :to="{
        name:'eatHere',
        params:{
          hereItem:data_itemAll,
          id: this.id,
          priceId: this.priceId,
          number: 1
        }
      }" replace>
        自提
      </router-link>
      <router-link class="right" :to="{
        name:'takeAway',
        params:{
          takeItem:data_itemAll,
          id: this.id,
          priceId: this.priceId,
          number: 1
        }
      }" replace>
        快递
      </router-link>
    </h2>
    <div class="content-wrap">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'placeOrder',
  // 接受itemAll
  props: ['itemAll'],
  created () {
    this.data_itemAll = this.itemAll;
    this.priceId = this.$route.params.priceId;
    this.id = this.$route.params.id;
    this.data_itemAll = this.itemAll;
      this.$router.replace({
          name: 'eatHere',
          params: {
            hereItem: this.data_itemAll,
            id: this.id,
            priceId: this.priceId
          }
      });
  },
  data () {
    return {
      data_itemAll: [],
      priceId: null,
      id: null
    };
  },
  methods: {
    goBack () {
      console.log(this.$router)
      this.$router.go(-1);
    }
  }

}
</script>
<style lang='less' scoped>
  @import '../../assets/less/fonts.css';
  @import '../../assets/less/base.less';
.placeOrder{
  position: absolute;
  top: 0rem;
  bottom: 0rem;
  padding-top: 0.9rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
  z-index: 20;
  .header{
    height: 0.5rem;
    padding: 0.2rem 0rem;
    width: 100%;
    position: fixed;
    top: 0;
    line-height: 0.5rem;
    font-size: 0.5rem;
    text-align: center;
    background-color:rgb(0, 160, 220);
      span{
        font-size: 0.4rem;
        color: #fff;
        font-weight: bold;
      }
      .icon-back{
        position: absolute;
        left: 0.3rem;
        &::before{
          color: #fff;
        }
      }
  }
    h2{
      padding: 0 0.07rem;
      height: 0.78rem;
        position: relative;
        background-color:rgb(0, 160, 220);
        .left,.right{
          position: absolute;
          height:0.65rem;
          line-height: 0.65rem;
          text-align: center;
          width: 50%;
          font-size:0.32rem;
          bottom: 0;
          display: inline-block;
          background:rgba(255,255,255,0.7);
          &.linkActive{
            height: 0.76rem;
            line-height: 0.76rem;
            font-weight: bold;
            background: #fff;
          }
        }
        .left.linkActive{
           &::after{
              content: "";
              display: block;
              position: absolute;
              bottom: 0rem;
              width: 0;
              right: -0.25rem;
              border-left:0.125rem solid #fff;
              border-bottom:0.39rem solid #fff;
              border-right:0.125rem solid rgba(111, 111, 111, 0);
              border-top:0.39rem solid rgba(111, 111, 111, 0);
              z-index: 10;
            }
        }
        .right{
          right: 0;
            &.linkActive::after{
              content: "";
              display: block;
              position: absolute;
              bottom: 0rem;
              width: 0;
              left: -0.25rem;
              border-right:0.125rem solid #fff;
              border-bottom:0.39rem solid #fff;
              border-left:0.125rem solid rgba(111, 111, 111, 0);
              border-top:0.39rem solid rgba(111, 111, 111, 0);
              z-index: 10;
            }
        }
    }
    .content-wrap{
      position: absolute;
      top: 1.68rem;
      bottom: 1rem;
      width: 100%;
    }

}
</style>
