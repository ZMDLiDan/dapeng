<template>
  <div class="assess">
    <div class="main">
      <div class="main-content" v-for="(item,index1) in items" :key="index1">
        <div class="header-wrapper">
          <div class="detail_img">
            <img :src="item.imagepath"/>
          </div>
          <div class="content">
            <div class="title">
              <span class="name">{{item.name}}</span>
            </div>
            <div class="time">
            <span>购买时间：{{item.year}}年{{item.month}}月{{item.day}}日{{item.hours}}:{{item.minutes}}:{{item.seconds}}</span>
            </div>
            <div class="assessment">
              <span>{{item.assessment}}</span>
            </div>
          </div>
        </div>
        <div class="face">
          <p>满意度</p>
          <i :class="item.n<=index-1?'icon-star1':'icon-star2'" v-for="(a,index) in item.arr" :key="a.id"
             @click="Selected(index,index1)"></i>
          <span>{{item.arr[item.n]}}</span>
        </div>
        <div class="textarea">
        <textarea class="text" placeholder="支持一下俺们的东西呗！" v-model="item.textarea"
                  @change="checktextarea(index1,item)"></textarea>
        </div>
        <div class="add">
          <p>添加图片(最多4张)</p>
          <div class="add-pic" v-show="item.picFlag">+
            <input name="files" id="uploaderInput" type="file" accept="image/*" @change="upload($event,item,index1)"/>
          </div>
          <div id="img-group">
            <div class="img-item" v-for="(item1,index2) in item.imgArr" :key="item1.id">
              <div class="cancel" @click="cancel(item,index2)">x</div>
              <img :src="item1.src" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="face-assess">
        <div class="announce" @click="showannounce">发表评价</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['id'],
    created () {
      var that = this;
      this.$http.get('http://47.95.249.186:8880/mixueshop/selectRemain', {
        params: {
          ordersid: this.id
        }
      })
        .then(function (response) {
          // that.items = response.data;
          for (var i = 0; i < response.data.length; i++) {
            response.data[i].arr = ['差', '一般', '还不错', '很满意', '强烈推荐'];
            response.data[i].n = 3;
            response.data[i].imgArr = [];
            response.data[i].picFlag = true;
            response.data[i].assessment = '待评价';
            response.data[i].year = (new Date(response.data[i].orderstime)).getFullYear();
            response.data[i].month = (new Date(response.data[i].orderstime)).getMonth();
            response.data[i].day = (new Date(response.data[i].orderstime)).getDate();
            response.data[i].hours = (new Date(response.data[i].orderstime)).getHours();
            response.data[i].minutes = (new Date(response.data[i].orderstime)).getMinutes();
            response.data[i].seconds = (new Date(response.data[i].orderstime)).getSeconds();
            that.commond.push({});
            that.commond[i].id = response.data[i].id;
          }
          that.items = response.data;
          // console.log(that.items);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.$http.get('http://47.95.249.186:8880/mixueshop/getOrderListByState', {
        params: {
          indexPage: 1,
          state: 1
        }
      })
        .then(function (response) {
          // console.log(response.data);
          that.aaa = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    data () {
      return {
        commond: [],
        aaa: '',
        items: []
      }
    },
    methods: {
      Selected (index, index1) {
        this.items[index1].n = index;
        this.commond[index1].score = (index + 1) * 20;
      },
      upload (e, item, index1) {
        var that = this;
        let input = document.querySelectorAll('#uploaderInput');
        let files = input[index1].files[0];
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = (e) => {
          if (item.imgArr.length === 3) item.picFlag = false;
          if (item.imgArr.length < 4) {
            item.imgArr.push({src: e.target.result});
            this.$http.post('http://47.95.249.186:8880/mixueshop/uploadImage',
              {
                img: e.target.result
              })
              .then(function (res) {
                item.imgArr.push({src: res.data});
                that.commond[index1].imgArr = item.imgArr;
              })
              .catch(function (err) {
                console.log(err);
              });
          }
        }
      },
      cancel (item, index2) {
        item.imgArr.splice(index2, 1);
        if (item.imgArr.length < 4) item.picFlag = true;
      },
      checktextarea (index1, item) {
        this.commond[index1].text = item.textarea;
      },
      showannounce () {
        for (var i = 0; i < this.commond.length; i++) {
          this.$http.post('http://47.95.249.186:8880/mixueshop/insertDiscussController', {
            descript: this.commond[i].text,
            state: this.commond[i].score,
            ordersId: this.id,
            productId: this.commond[i].id,
            image: this.commond[i].imgArr
          }).then((res) => {
            alert(res);
            this.$parent.index--;
            this.$parent.title.pop();
            this.$router.back(-1);
          })
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  @import '../../../../assets/less/fonts.css';
  @import '../../../../assets/less/base.less';

  .assess {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    /*height: 100%;*/
    background-color: @bgColor;
  }

  .main {
    background: #f5f5f5;
  }

  .main-content {
    width: 95%;
    background: url("./background13.jpg");
    margin: 0 auto;
    border-radius: .2rem;
    padding-bottom: .16rem;
    margin-bottom: .2rem;
  }

  .header-wrapper {
    display: flex;
  }

  .detail_img {
    width: 2rem;
    height: 1.8rem;
    background: #fff;
    border: .01rem #cccccc solid;
    border-radius: 0.25rem;
    margin: .17rem .5rem .3rem .2rem;
    overflow: hidden;
  }

  .detail_img img {
    width: 2rem;
    height: 1.8rem;
  }

  .content {
    padding-top: .3rem;
    padding-right: .5rem;
    display: inline-block;
    font-size: .24rem;
  }

  .content .title span {
    line-height: .45rem;
  }

  .content .time {
    line-height: .45rem;
    color:#000;
  }

  .assessment span {
    line-height: .45rem;
    color: red;
  }

  .add {
    width: 95%;
    height: 1.5rem;
    padding-top: .2rem;
    padding-left: .06rem;
    margin: 0 auto;
  }

  .add p {
    font-size: .2rem;
    color: #ccc;
    margin-left: .2rem;
  }

  .img-item {
    position: relative;
    width: 1rem;
    height: 1rem;
    float: left;
    margin-left: .08rem;
    margin-top: 0.1rem;
  }

  .img-item .cancel {
    position: absolute;
    top: 0;
    right: 0;
    width: .18rem;
    height: .18rem;
    line-height: .18rem;
    text-align: center;
    border: .03rem red solid;
    color: red;
    font-size: .12rem;
    border-radius: 50%;
    font-weight: bold;
  }

  .img-item img {
    width: 100%;
    height: 100%;
  }

  .add-pic {
    position: relative;
    background: #f3f3f3;
    width: 1rem;
    height: 1rem;
    float: left;
    /*margin-left: 1.5rem;*/
    margin-top: 0.1rem;
    text-align: center;
    font-size: .8rem;
    line-height: 1rem;
    color: #979797;
    overflow: hidden;
  }

  .add-pic input {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    opacity: 0;
  }

  .textarea .text {
    display: block;
    width: 90%;
    height: 2rem;
    margin: 0 auto;
    border: .01rem #ccc solid;
    padding-top: .17rem;
    padding-left: .1rem;
    border-radius: .35rem;
    outline: none;
  }

  .face {
    display: flex;
    height: .8rem;
    line-height: .8rem;
    margin-left: .25rem;
  }

  .face i {
    font-size: .46rem;
    letter-spacing: .02rem;
    margin-top: .1rem;
  }

  .face span {
    display: block;
    margin-left: .3rem;
    margin-top: 0;
    font-size: .26rem;
    color: #f1a357;
    /*margin-top: .2rem;*/
  }

  .face p {
    font-size: .22rem;
    height: .45rem;
    line-height: .45rem;
    width: .8rem;
    text-align: center;
    border: .02rem @activeColor solid;
    border-radius: .15rem;
    margin-right: .15rem;
    margin-top: .1rem;
  }

  .face-assess {
    height: .3rem;
    position: relative;
    margin-top: 1.2rem;
    margin-left: .5rem;
  }

  .face-assess .announce {
    position: absolute;
    right: .3rem;
    bottom: 0.3rem;
    width: 1.6rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    font-size: .26rem;
    border: .03rem #f1a357 solid;
    border-radius: .5rem;
    color: #f1a357;
  }
</style>
