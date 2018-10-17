<!-- 通知 -->
<template>
  <div class="messageAll">
      <div class="item" v-for="(item,i) in items" :key="item.key" @click="activeShow(i)">
          <img :src="item.jpg" alt="">
          <div class="cont">{{item.cont}}</div>
          <p class="time">{{item.time}}</p>
          <div class="show" v-if="item.bOn"></div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        items: [
            {
                jpg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532978570600&di=9ca987abf975aa4997cb0372ab4161fa&imgtype=0&src=http%3A%2F%2Fstatic4.orstatic.com.cn%2Fuserphoto%2Fphoto%2F1%2F120%2F007IE6629DB021E56BD730m.jpg',
                cont: '出新款美食啦，美味可口!',
                time: '2018年7月21日',
                bOn: true

            },
            {
                jpg: 'http://pic.58pic.com/58pic/13/52/65/38Z58PICSUF_1024.jpg',
                cont: '出新款美食啦，美味可口，欢迎购买！',
                time: '2018年7月20日',
                bOn: true
            },
            {
                jpg: 'http://img06.tooopen.com/images/20161128/tooopen_sy_188151798728.jpg',
                cont: '出新款美食啦，美味可口！',
                time: '2018年7月12日',
                bOn: true
            },
            {
                jpg: 'http://pic10.photophoto.cn/20090224/0042040356465974_b.jpg',
                cont: '出新款美食啦，美味可口！',
                time: '2018年7月10日',
                bOn: true
            }
        ]
    };
  },

  components: {},

  computed: {},

    methods: {
    activeShow: function (i) {
        this.items[i].bOn = false;
        }
    }
}

</script>
<style lang='less' scoped>
  @import "../../../assets/less/base.less";
  @import "../../../assets/less/fonts.css";
    .messageAll {
        z-index: 100;
        position: absolute;
        background-color: @bgColor;
        top: 0.9rem;
        bottom: 0;

        .item {
            width: 7.1rem;
            height: 0.8rem;
            background-color: #fff;
            padding: 0.2rem;
            display: flex;
            margin: 0.05rem auto;
            img {
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                position: relative;
                top: 50%;
                margin-top: -0.4rem;
                margin-right: 0.2rem;
            }
            .cont {
                font-size: 0.26rem;
                line-height: 0.8rem;
                color: @baseColor;
            }
            .time {
                font-size: 0.2rem;
                line-height: 1.4rem;
                color: @baseColor;
                position: absolute;
                right: 0.3rem;

            }
            .show {
                width: 0.1rem;
                height: 0.1rem;
                border-radius: 50%;
                background-color: red;
                position: absolute;
                right: 0.35rem;
                line-height: 5rem;
            }
        }
    }

</style>
