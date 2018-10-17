<template>
  <div class="Cardvolume">
    <div class="bgWarpper"
         v-show="!finalPay"
    >
      <h2>您还没有大棚！</h2>
    </div>
    <div class="dapeng" v-show="finalPay">
      <div class="items" v-for="(item,index) in items" :key="item.key" @click="goConfiguration(index)">
        <img :src=item.path />
        <div  class="content">
          <h4>1号大棚</h4>
          <p>种植草莓</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        finalPay: false,
        items: [
          {
            path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534679749486&di=c80cd69006468e6d092f46fc4a362d76&imgtype=0&src=http%3A%2F%2Fpicuser.city8.com%2Fnews%2Fimage%2F20140514%2F1400018443360.jpg',
            name: '1号大棚',
            descript: '种植草莓'
          }
        ]
      }
    },
    methods:{
      goConfiguration: function (index) {
        this.$parent.index++;
        this.$parent.title.push('大棚配置');
        this.$router.push({
          path: '/configuration'
        })
      }
    },
    mounted() {
      var that = this;
      this.$http.get('http://47.95.249.186:8880/mixueshop/receive/isBuyCss')
        .then(function (response) {
          that.finalPay = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
</script>

<style lang='less' scoped>
  @import '../../../assets/less/fonts.css';
  @import '../../../assets/less/base.less';

  .Cardvolume {
    z-index: 100;
    width: 100%;
    background-color: @bgColor;
    padding-top: .2rem;
    bottom: 0;
    overflow: hidden;
  }

  .bgWarpper {
    position: absolute;
    top: 0rem;
    bottom: 0rem;
    left: 0;
    background: url('http://img.shijue.me/leadinart0pic54b88ad7e744f9616e002884_d.jpeg!dp6');
    background-position: center;
    z-index: 2;
    padding-top: 1rem;
    background-size: cover;
    background-color: #fff;
    width: 100%;
    h2 {
      font-size: 0.6rem;
      color: rgba(130, 130, 130, 0.6);
      text-align: center;
    }
  }

  .items {
    width: 7.5rem;
    height: 3rem;
    display: flex;
    background-color: #fff;
    padding: .2rem 0 .2rem .2rem;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    .content {
      font-size: .45rem;
      margin-left: .5rem;
      line-height: 1.2rem;
    }
  }
</style>
