<!-- 浏览记录 -->
<template>
  <div class="history">
    <div class="header">
      <i class="icon-back" @click="goBack"></i>
      <span class="text">{{title}}</span>
      <b class="allSelect" v-on:click='goSelect()'>全选</b>
    </div>
    <ul>
      <li v-for="(item,index) in items" :key="item.key">
        <leftSlider @msg-from-child="getMsgFromChild" :val="index">
          <div class="select"
               v-show="isShow"
               :class="{'selected':items[index].selected}" :id="item.pid"
          ><i class="selectImg" alt=""/></div>
          <div class="item-warp" @click="goDetail(index)">
            <img :src=item.product.productImages[0].path />
            <div class="cont">
              <h2>{{item.product.name}}</h2>
              <div class="grade">
                <i class="icon-star2" v-for="i in Math.round(item.product.level/20)" :key="i.key"></i>
                <i class="icon-star1" v-for="i in 5-Math.round(item.product.level/20)" :key="i.key"></i>
                <span>{{item.product.level/20}}分</span>
              </div>
              <div class="type">{{type}}</div>
              <p>{{item.product.descript}}</p>
            </div>
          </div>
        </leftSlider>
      </li>
    </ul>
    <div class="footer" v-show="isShow&&items.length">
      <input @click="deleteItem" type="button" value="全 部 删 除"/>
    </div>
  </div>
</template>
<script>
  import leftSlider from './historySlider';

  export default {
    components: {
      leftSlider
    },
    data () {
      return {
        type: '新品上架',
        selectAll: false,
        isShow: false,
        title: '最近浏览',
        selecte: [],
        items: []
      }
    },
    methods: {
      goDetail: function (index) {
        this.$router.push({path: '/goodsDetail/' + this.items[index].pid})
      },
      deleteItem () {
        for (var i = 0; i < this.items.length; i++) {
          this.$http.get('http://47.95.249.186:8880/mixueshop/deleteHistory', {
            params: {
              productId: this.items[i].pid
            }
          }).then(function (response) {
          }).catch(function (error) {
            console.log(error);
          });
        }
        this.items = [];
      },
      SelectAll () {
        this.selectAll = !this.selectAll;
        this.items.forEach(item => {
          item.selected = this.selectAll
        });
      },
      getMsgFromChild (v) {
        this.items.splice(v, 1)
      },
      goBack: function () {
        this.$router.back(-1);
      },
      goSelect: function () {
        var aDiv = document.getElementsByClassName('item-warp');
        this.isShow = !this.isShow;
        if (this.isShow) {
          for (let i = 0; i < aDiv.length; i++) {
            aDiv[i].style.left = 0.7 + 'rem';
          }
        } else {
          for (let i = 0; i < aDiv.length; i++) {
            aDiv[i].style.left = 0;
          }
        }
      }
    },
    mounted () {
      var that = this;
      this.$http.get('http://47.95.249.186:8880/mixueshop/selectHistory').then(function (response) {
        that.items = response.data;
        for (var i = 0; i < that.items.length; i++) {
          that.items[i].selected = true;
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

</script>
<style lang="less" scoped>
  @import "../../../assets/less/base.less";
  @import "../../../assets/less/fonts.css";

  .history {
    z-index: 100;
    background-color: @bgColor;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    .header {
      z-index: 200;
      height: 0.9rem;
      width: 100%;
      background-color: #fff;
      position: fixed;
      font-size: 0.5rem;
      text-align: center;
      border-bottom: #cbcbcb 0.02rem solid;
      .icon-back {
        color: @activeColor;
        position: relative;
        left: -1.8rem;
        top: 0.08rem;
      }
      .text {
        font-size: 0.34rem;
        line-height: 0.9rem;
      }
      .allSelect {
        color: @activeColor;
        position: relative;
        font-size: .3rem;
        left: 1.8rem;
        top: 0.08rem;
      }
    }
    ul {
      position: absolute;
      top: 0.9rem;
      width: 100%;
      bottom: 0;
      li {
        .select {
          width: 1rem;
          height: 2.4rem;
          position: absolute;
          &.selected {
            i {
              background: url('./select2.svg');
              background-size: cover;
            }
          }

          i {
            display: inline-block;
            background: url('./select1.svg');
            background-size: cover;
            width: 0.4rem;
            height: 0.4rem;
            z-index: 100;
            position: relative;
            top: 0.5rem;
            left: 0.3rem;
          }
        }
        .item-warp {
          display: flex;
          position: relative; //left: 0.7rem;
          overflow: hidden;
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
      }
    }
    .footer {
      z-index: 200;
      width: 100%;
      display: flex;
      position: fixed;
      bottom: 0;
      height: 0.9rem;
      background: @bgColor;
      overflow: hidden;
      > label {
        display: block;
        width: 2rem;
        height: 0.9rem;
        position: relative;
        i {
          &.selectAll {
            background: url('./select2.svg');
            background-size: cover;
          }
          width: 0.4rem;
          height: 0.4rem;
          background: url('./select1.svg');
          background-size: cover;
          position: absolute;
          top: 50%;
          margin-top: -0.2rem;
          left: 0.5rem;
          left: 0.3rem;
        }
        span {
          font-size: 0.28rem;
          position: absolute;
          top: 0.3rem;
          left: 0.85rem;
          color: @baseColor;
        }
      }
      input {
        width: 5.5rem;
        height: 0.6rem;
        background-color: @goodsLogo;
        position: relative;
        top: 50%;
        margin-top: -0.3rem;
        left: 1rem;
        font-size: 0.28rem;
        color: #fff;
      }
    }
  }

</style>
