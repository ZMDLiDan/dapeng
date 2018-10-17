<!--  -->
<template>
  <div class="changeName">
    <div :class="{'active':active}">
      <span class="name">用户名:</span>
      <input type="text" v-model="name" @focus = "changeBorder" @blur="changeBorder" ref="name">
    </div>
    <h6>以英文字母或汉字开头，限4-16个字符，一个汉字为2个字符</h6>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('http://47.95.249.186:8880/mixueshop/user/updateUserName', {
      params: {
        name: this.name
      }
    }).then(res => {
      // console.log(res)
    }).catch((err) => {
      console.log(err)
    });
  },
  data () {
    return {
      name: '',
      active: false
    };
  },

  components: {},

  computed: {},

  mounted () {
    this.$refs.name.focus();
  },

  methods: {
    changeBorder () {
      this.active = !this.active;
      this.$http.get('http://47.95.249.186:8880/mixueshop/user/updateUserName', {
        params: {
          name: this.name
        }
      }).then(res => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      });
    }
  }
}

</script>
<style lang='less' scoped>
.changeName{
  width: 100%;
  position: absolute;
  top: 0.9rem;
  bottom: 0;
  z-index: 20;
  padding: 0.2rem 0.3rem 0 0.3rem;
  background-color: #fff;
  box-sizing: border-box;
    div{
      border:0.01rem solid #d6d4d1;
      box-sizing: border-box;
      padding:0.29rem 0.21rem;
      margin-bottom:0.34rem;
      font-size:0.33rem;
      color: #000;
      &.active{
        border-color:#6c9;
      }
      .name{
        margin-right:0.25rem;
        }
      input{
        border: none;
        outline: none;
      }
    }
    h6{
      padding-left: 0.25rem;
      font-size: 0.2rem;
      color:#000;
    }

}
</style>
