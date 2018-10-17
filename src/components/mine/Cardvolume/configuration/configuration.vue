<template>
  <div class="configuration">
    <ul>
      <li v-for="(item,index) in items">
        <div class="head" @click="change(index)">
          <div class="text">{{item.text}}</div>
          <div class="color"></div>
          <div>{{item.descript}}</div>
        </div>
        <div class="content" v-show=item.bOn>
          <div class="data">{{data[index].time}}<span class="value">{{data[index].value}}</span></div>
          <div class="chart" :id=item.id></div>
          <input class="input" type="text" placeholder="您有什么想说的"/>
          <div class="btn" @click="submit(index)">提交</div>
        </div>
      </li>
    </ul>
    <div class="control" v-show="btn">
      <div class="feng" @click="feng">通风</div>
      <div class="guan" @click="guan">灌溉</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        btn: true,
        items: [
          {
            text: '空气温度',
            descript: '基本正常',
            bOn: false,
            id: 0
          },
          {
            text: '土壤温度',
            descript: '基本正常',
            bOn: false,
            id: 1
          },
          {
            text: '空气湿度',
            descript: '基本正常',
            bOn: false,
            id: 2
          },
          {
            text: '土壤湿度',
            descript: '基本正常',
            bOn: false,
            id: 3
          },
          {
            text: '光照强度',
            descript: '基本正常',
            bOn: false,
            id: 4
          }
        ],
        data: [
          {
            time: '',
            value: ''
          },
          {
            time: '',
            value: ''
          },
          {
            time: '',
            value: ''
          },
          {
            time: '',
            value: ''
          },
          {
            time: '',
            value: ''
          }
        ],
        time: [],
        value: []
      }
    },
    created() {
      var that = this;
      that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getName')
        .then(function (response) {
          if (response.data === 'root') {
            that.btn = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
        params: {
          dsId: '3303_0_5700'
        }
      })
        .then(function (response) {
          that.data[0].time = response.data.time;
          that.data[0].value = response.data.value;
        })
        .catch(function (error) {
          console.log(error);
        });
      that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
        params: {
          dsId: '3303_1_5700'
        }
      })
        .then(function (response) {
          that.data[1].time = response.data.time;
          that.data[1].value = response.data.value;
        })
        .catch(function (error) {
          console.log(error);
        });
      that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
        params: {
          dsId: '3304_0_5700'
        }
      })
        .then(function (response) {
          that.data[2].time = response.data.time;
          that.data[2].value = response.data.value;
        })
        .catch(function (error) {
          console.log(error);
        });
      that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
        params: {
          dsId: '3304_1_5700'
        }
      })
        .then(function (response) {
          that.data[3].time = response.data.time;
          that.data[3].value = response.data.value;
        })
        .catch(function (error) {
          console.log(error);
        });
      that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
        params: {
          dsId: '3301_0_5700'
        }
      })
        .then(function (response) {
          that.data[4].time = response.data.time;
          that.data[4].value = response.data.value;
        })
        .catch(function (error) {
          console.log(error);
        });
      setInterval(function () {
        that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
          params: {
            dsId: '3303_0_5700'
          }
        })
          .then(function (response) {
            that.data[0].time = response.data.time;
            that.data[0].value = response.data.value;
          })
          .catch(function (error) {
            console.log(error);
          });
        that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
          params: {
            dsId: '3303_1_5700'
          }
        })
          .then(function (response) {
            that.data[1].time = response.data.time;
            that.data[1].value = response.data.value;
          })
          .catch(function (error) {
            console.log(error);
          });
        that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
          params: {
            dsId: '3304_0_5700'
          }
        })
          .then(function (response) {
            that.data[2].time = response.data.time;
            that.data[2].value = response.data.value;
          })
          .catch(function (error) {
            console.log(error);
          });
        that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
          params: {
            dsId: '3304_1_5700'
          }
        })
          .then(function (response) {
            that.data[3].time = response.data.time;
            that.data[3].value = response.data.value;
          })
          .catch(function (error) {
            console.log(error);
          });
        that.$http.get('http://47.95.249.186:8880/mixueshop/receive/getNowData', {
          params: {
            dsId: '3301_0_5700'
          }
        })
          .then(function (response) {
            that.data[4].time = response.data.time;
            that.data[4].value = response.data.value;
          })
          .catch(function (error) {
            console.log(error);
          });
      }, 10000)
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        let myChart0 = this.$echarts.init(document.getElementById('0'));
        let myChart1 = this.$echarts.init(document.getElementById('1'));
        let myChart2 = this.$echarts.init(document.getElementById('2'));
        let myChart3 = this.$echarts.init(document.getElementById('3'));
        let myChart4 = this.$echarts.init(document.getElementById('4'));
        myChart0.setOption({
          title: {text: '空气温度'},
          tooltip: {},
          xAxis: {
            data: ["8.17", "8.18", "8.19", "8.20", "8.21", "8.22", "8.23"]
          },
          yAxis: {},
          series: [{
            name: '温度',
            type: 'line',
            data: [25, 28, 28, 27, 25, 27, 25]
          }]
        });
        myChart1.setOption({
          title: {text: '土壤温度'},
          tooltip: {},
          xAxis: {
            data: ["8.17", "8.18", "8.19", "8.20", "8.21", "8.22", "8.23"]
          },
          yAxis: {},
          series: [{
            name: '温度',
            type: 'line',
            data: [30, 28, 28, 27, 26, 27, 28]
          }]
        });
        myChart2.setOption({
          title: {text: '空气湿度'},
          tooltip: {},
          xAxis: {
            data: ["8.17", "8.18", "8.19", "8.20", "8.21", "8.22", "8.23"]
          },
          yAxis: {},
          series: [{
            name: '湿度',
            type: 'line',
            data: [60, 62, 64, 60, 64, 64, 62]
          }]
        });
        myChart3.setOption({
          title: {text: '土壤湿度'},
          tooltip: {},
          xAxis: {
            data: ["8.17", "8.18", "8.19", "8.20", "8.21", "8.22", "8.23"]
          },
          yAxis: {},
          series: [{
            name: '湿度',
            type: 'line',
            data: [55, 58, 55, 54, 59, 60, 62]
          }]
        });
        myChart4.setOption({
          title: {text: '光照强度'},
          tooltip: {},
          xAxis: {
            data: ["8.17", "8.18", "8.19", "8.20", "8.21", "8.22", "8.23"]
          },
          yAxis: {},
          series: [{
            name: '强度',
            type: 'line',
            data: [66, 70, 67, 65, 66, 67, 66]
          }]
        });
      },
      change: function (index) {
        for (var i = 0; i < this.items.length; i++) {
          if (i === index) {
            if (!this.items[i].bOn) {
              this.items[i].bOn = true;
            } else {
              this.items[i].bOn = false;
            }
          } else {
            this.items[i].bOn = false;
          }
        }
      },
      submit: function (index) {
        var oInput = document.getElementsByTagName('input')[index];
        if (oInput.value) {
          oInput.value = '';
          oInput.placeholder = '我们会尽量参考您的建议';
        } else {
          oInput.placeholder = '请写出意见再提交，谢谢';
        }
      },
      feng: function () {
        var that = this;
        var oF = document.getElementsByClassName('feng')[0];
        this.$http.get('http://47.95.249.186:8880/mixueshop/receive/getStateFeng'
        ).then(function (response) {
          if(response.data){
            that.$http.get('http://47.95.249.186:8880/mixueshop/receive/OnOffFeng?b=false'
            ).then(function (response) {
              console.log(response);
            }).catch(function (error) {
              console.log(error);
            });
            oF.style.backgroundColor = '#66cc99';
          }else{
            that.$http.get('http://47.95.249.186:8880/mixueshop/receive/OnOffFeng?b=true'
            ).then(function (response) {
              console.log(response);
            }).catch(function (error) {
              console.log(error);
            });
            oF.style.backgroundColor = '#ff9900';
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      guan: function () {
        var that = this;
        var oG = document.getElementsByClassName('guan')[0];
        this.$http.get('http://47.95.249.186:8880/mixueshop/receive/getStateWater'
        ).then(function (response) {
          if(response.data){
            that.$http.get('http://47.95.249.186:8880/mixueshop/receive/OnOffWater?b=false'
            ).then(function (response) {
              console.log(response);
            }).catch(function (error) {
              console.log(error);
            });
            oG.style.backgroundColor = '#66cc99';
          }else{
            that.$http.get('http://47.95.249.186:8880/mixueshop/receive/OnOffWater?b=true'
            ).then(function (response) {
              console.log(response);
            }).catch(function (error) {
              console.log(error);
            });
            oG.style.backgroundColor = '#ff9900';
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style lang='less' scoped>
  @import '../../../../assets/less/fonts.css';
  @import '../../../../assets/less/base.less';

  .configuration {
    position: fixed;
    top: .9rem;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
  }

  .head {
    display: flex;
    width: 7.5rem;
    height: 1rem;
    font-size: .28rem;
    background-color: #ffffef;
    box-shadow: .02rem .02rem #ccc;
    line-height: 1rem;
    margin-bottom: .05rem;
    .text {
      font-size: .42rem;
      text-align: center;
    }
    .color {
      background-color: #00ff00;
      width: 2rem;
      height: .4rem;
      margin: .3rem auto;
      line-height: .4rem;
    }
  }

  .content {
    width: 7.5rem;
    height: 6rem;
    transition: all 3s;
    font-size: .38rem;
    position: relative;
    .data {
      position: absolute;
      top: .2rem;
      right: .5rem;
      width: 2.5rem;
      height: .5rem;
      line-height: .5rem;
      border: .01rem solid @activeColor;
      box-shadow: .02rem .02rem #ccc, .05rem .05rem @bgColor;
      font-size: .28rem;
      .value {
        position: absolute;
        right: .1rem;
      }
    }
    .chart {
      width: 7.5rem;
      height: 4.5rem;
    }
    .input {
      width: 6rem;
      height: 0.75rem;
      border-bottom: 0.02rem solid #ccc;
      margin: 0 auto;
      padding-left: 0.3rem;
      margin-bottom: 0.3rem;
      line-height: .75rem;
    }
    .btn {
      width: 1.2rem;
      height: 0.75rem;
      background-color: #66cc99;
      border-radius: .3rem;
      float: right;
      line-height: .75rem;
      text-align: center;
    }
  }

  .control {
    display: flex;
    font-size: .42rem;
    position: fixed;
    bottom: 0;
    div {
      text-align: center;
      height: .9rem;
      line-height: .9rem;
      width: 3rem;
      background-color: #66cc99;
      margin-left: .5rem;
    }
  }

</style>
