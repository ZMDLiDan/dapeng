<template>
  <div class="address">
    <p class="set" v-on:click="changeStatus(false)" v-if="status">编辑</p>
    <p class="set" v-on:click="changeStatus(true)" v-if="!status">完成</p>
    <div class="shipping-address" v-for="item in items" :key="item.id">
      <p>{{item.name}} {{item.telephone}}</p>
      <p class="main-address">{{item.province}} {{item.city}} {{item.district}} {{item.address}}</p>
      <div class="arrow" @click="eidtorAddr(item)">
        <img src="./arrow.svg"/>
      </div>
      <div class="cancel" v-show="show" @click="cancel(index)">
        <img src="./cancel.svg"/>
      </div>
    </div>
    <div class="new" @click="goAddAddress">新增收货地址</div>
  </div>
</template>

<script>
export default {
  created () {
    var that = this;
    this.$http
      .get('http://47.95.249.186:8880/mixueshop/getAddress', {
        params: {
          indexPage: 0
        }
      })
      .then(function (response) {
        that.items = response.data.data.rows;
        console.log(that.items);
        // console.log( response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data () {
    return {
      show: '',
      status: true,
      items: [
        // {
        //   name: '王先生',
        //   telephone: '1455258866255',
        //   province: '甘肃省',
        //   city: '酒泉市',
        //   district: '肃州区',
        //   address: '西安邮电'
        // },
        // {
        //   name: '冉然',
        //   telephone: '1455258866255',
        //   province: '甘肃省',
        //   city: '酒泉',
        //   district: '肃州区',
        //   address: '西安邮电'
        // }
      ]
    };
  },
  methods: {
    eidtorAddr (item) {
      this.$router.push({
        name: 'addAddress',
        params: {
          currentAddr: item
        }
      });
    },
    goAddAddress: function () {
      this.$router.push({ path: "/addAddress" });
    },
    changeStatus: function (status) {
      this.status = status;
      this.show = !this.show;
    },
    cancel (index) {
      this.$http
        .get("http://47.95.249.186:8880/mixueshop/deleteAddressById", {
          params: {
            addressId: this.items[index].id
          }
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.items.splice(index, 1);
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../../assets/less/base.less";
@import "../../../assets/less/fonts.css";

.address {
  position: absolute;
  top: 0.9rem;
  bottom: 0rem;
  z-index: 2;
}

.address .set {
  font-size: 0.26rem;
  position: absolute;
  top: -0.4rem;
  right: 0.2rem;
}

.shipping-address {
  height: 1.25rem;
  border-bottom: 0.03rem #ccc solid;
  padding-top: 0.33rem;
  padding-left: 0.3rem;
  position: relative;
}

.shipping-address p {
  font-size: 0.26rem;
  line-height: 0.44rem;
}

.shipping-address .main-address {
  color: #888;
}

.cancel {
  position: absolute;
  width: 1.2rem;
  height: 1.58rem;
  line-height: 1.58rem;
  top: 0;
  right: 0;
  background: #ec5330;
  text-align: center;
  /*display: none;*/
}

.cancel img {
  width: 0.6rem;
  height: 0.6rem;
}

.arrow {
  position: absolute;
  right: 0.1rem;
  top: 0.2rem;
}

.arrow img {
  width: 0.35rem;
  height: 0.45rem;
}

.new {
  width: 100%;
  height: 0.92rem;
  line-height: 0.92rem;
  text-align: center;
  background-color: @activeColor;
  color: #fff;
  font-size: 0.28rem;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
