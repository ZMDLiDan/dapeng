<template>
  <div class="classfiy">
    <div class="wrap">
      <div class="items" v-for="item in items" :key="item.key">{{item}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['id'],
    data () {
      return {
        items0: [],
        data: []
      }
    },
    created () {
      var that = this;
      this.$http.get('http://47.95.249.186:8880/mixueshop/getProductDescByLevel', {
        params: {
          categoryId: this.id,
          pageNum: 1
        }
      }).then(function (response) {
        that.data = response.data;
        for (var i = 0; i < that.data.length; i++) {
          that.items0.push(that.data[i].name);
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    mounted () {
      var oDiv = document.getElementsByClassName('wrap')[0];
      var arr = this.items0;
      var that = this;
      setInterval(function () {
        var oItem = document.createElement('div');
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);
        var num = arr.length - 1;
        var i = Math.round(Math.random() * num);
        var text = arr[i];
        var Id = that.data[i].id;
        var color = 'rgba(' + r + ', ' + g + ', ' + b + ',' + 1 + ')';
        oItem.className = 'items';
        oItem.onclick = function () {
          that.$router.push({path: '/goodsDetail/' + Id});
        };
        oItem.style.webkitTransitionDuration = 1 + 's';
        oItem.innerHTML = text;
        oItem.style.fontSize = 0.12 + 'rem';
        oItem.style.color = '#999';
        oItem.style.width = 0;
        oItem.style.height = 0;
        oItem.style.textAlign = 'center';
        oItem.style.lineHeight = 0.05 + 'rem';
        oItem.style.borderRadius = '50%';
        oItem.style.backgroundColor = color;
        oItem.style.position = 'fixed';
        oItem.style.top = Math.round(Math.random() * 9.5 + 1) + 'rem';
        oItem.style.left = Math.round(Math.random() * 5.5) + 'rem';
        oDiv.appendChild(oItem);
        setTimeout(function () {
          oItem.style.width = 3 + 'rem';
          oItem.style.height = 3 + 'rem';
          oItem.style.lineHeight = 3 + 'rem';
          oItem.style.fontSize = 0.28 + 'rem';
          color = 'rgba(' + r + ', ' + g + ', ' + b + ',' + 0.3 + ')';
          oItem.style.backgroundColor = color;
        }, 200);
        setTimeout(function () {
          oItem.style.top = parseInt(oItem.offsetTop) + 0.01 + 'rem';
          oItem.style.webkitTransitionDuration = 3 + 's';
        }, 3000);
        setTimeout(function () {
          oItem.style.display = 'none';
        }, 5500);
      }, 1500);
    },
    methods: {
      close: function () {
        this.$router.back(-1);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/less/base.less';
  @import '../../assets/less/fonts.css';

  .classfiy {
    width: 7.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 10;
    .wrap div {
      width: 2rem;
      height: 3rem;
      background-color: #fe858e;
      color: #fff;
      font-size: .42rem;
      text-align: center;
      line-height: 2rem;
      border-radius: 50%;
      transition: all 1s;
      -webkit-transition: all 1s;
    }
  }
</style>
