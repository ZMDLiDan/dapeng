<template>
  <div class="more">
    <div id="eat" ref="eat" @click="eatClassfiy">
      <span>我是吃的</span>
    </div>
    <div id="drink" @click="drinkClassfiy">
      <span>我是喝的</span>
    </div>
    <div id="play" @click="playClassfiy">
      <span>我是玩的</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted () {
      var oDiv = document.getElementsByClassName('more')[0];
      var oEat = document.getElementById('eat');
      var oDrink = document.getElementById('drink');
      var oPlay = document.getElementById('play');
      setInterval(function () {
        oEat.style.backgroundColor = 'rgba(178,243,236,0.5)';
        oEat.style.width = 2 + 'rem';
        oEat.style.height = 2 + 'rem';
        oEat.style.fontSize = 0.14 + 'rem';
        setTimeout(function () {
          oEat.style.backgroundColor = 'rgba(178,243,236,1)';
          oEat.style.width = 3 + 'rem';
          oEat.style.height = 3 + 'rem';
          oEat.style.fontSize = 0.42 + 'rem';
        }, 1000)
      }, 4000);
      setInterval(function () {
        oDrink.style.backgroundColor = 'rgba(254,185,214,0.5)';
        oDrink.style.width = 2 + 'rem';
        oDrink.style.height = 2 + 'rem';
        oDrink.style.fontSize = 0.14 + 'rem';
        setTimeout(function () {
          oDrink.style.backgroundColor = 'rgba(254,185,214,1)';
          oDrink.style.width = 3 + 'rem';
          oDrink.style.height = 3 + 'rem';
          oDrink.style.fontSize = 0.42 + 'rem';
        }, 1000)
      }, 3500);
      setInterval(function () {
        oPlay.style.backgroundColor = 'rgba(252,252,146,0.5)';
        oPlay.style.width = 2 + 'rem';
        oPlay.style.height = 2 + 'rem';
        oPlay.style.fontSize = 0.14 + 'rem';
        setTimeout(function () {
          oPlay.style.backgroundColor = 'rgba(252,252,146,1)';
          oPlay.style.width = 3 + 'rem';
          oPlay.style.height = 3 + 'rem';
          oPlay.style.fontSize = 0.42 + 'rem';
        }, 1000)
      }, 3750);
      setInterval(function () {
        var oCir = document.createElement('div');
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        oCir.class = 'circle';
        oCir.style.webkitTransitionDuration = 0.5 + 's';
        oCir.style.width = 1 + 'rem';
        oCir.style.height = 1 + 'rem';
        oCir.style.borderRadius = '50%';
        oCir.style.backgroundColor = color;
        oCir.style.position = 'fixed';
        oCir.style.top = Math.round(Math.random() * 11 + 1) + 'rem';
        oCir.style.left = Math.round(Math.random() * 7.5) + 'rem';
        oCir.style.opacity = 0.2;
        oDiv.appendChild(oCir);
        setTimeout(function () {
          oCir.style.opacity = 0;
          oCir.style.webkitTransitionDuration = 1 + 's';
        }, 1500);
      }, 200)
    },
    methods: {
      eatClassfiy: function () {
        this.$parent.index++;
        this.$router.push({path: '/classfiy/1'});
      },
      drinkClassfiy: function () {
        this.$parent.index++;
        this.$router.push({path: '/classfiy/2'});
      },
      playClassfiy: function () {
        this.$parent.index++;
        this.$router.push({path: '/classfiy/3'});
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/fonts.css";
  @import "../../assets/less/base.less";

  .more {
    width: 100%;
    position: absolute;
    z-index: 10;
    left: 0;
    bottom: 0;
    background: #fff;
    transition: all 1s linear;
    -webkit-transition: all 1s linear;
    .header {
      width: 100%;
      padding: 0.2rem 0 0.4rem 0;
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
    }
    div {
      width: 3rem;
      height: 3rem;
      z-index: 3;
      font-size: .42rem;
      border-radius: 50%;
      color: @baseColor;
      transition: all 1s;
      -webkit-transition: all 1s; /* Safari 和 Chrome */
      position: relative;
      span {
        position: absolute;
        left: 22%;
        top: 40%;
      }
    }
  }

  #eat {
    position: fixed;
    left: 1rem;
    top: 2rem;
    background-color: rgba(178, 243, 236, 1);
  }

  #drink {
    position: fixed;
    left: 3.5rem;
    top: 5rem;
    background-color: rgba(254, 185, 214, 1);
  }

  #play {
    position: fixed;
    left: 1rem;
    top: 7.5rem;
    background-color: rgba(252, 252, 146, 1);
  }
</style>
