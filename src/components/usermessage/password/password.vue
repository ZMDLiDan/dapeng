<template>
<div class="password">
  <input type="text" class="text" placeholder="请输入QQ邮箱" v-model="email"/>
  <div class="Send-verification-code">
    <div class="verification">
      <span>验证码</span>
    </div>
    <input  class="text1" placeholder="请输入验证码" v-model="code"/>
    <div class="code" @click="goGet" v-show="show">获取验证码</div>
    <div class="code" v-show="!show">{{count}}</div>
    <span class="err">{{error}}</span>
  </div>
  <div class="next" @click="next">下一步</div>
</div>
</template>

<script>
export default {
  created () {
    this.$http.get('http://47.95.249.186:8880/mixueshop/user/showUserInfo').then(res => {
      this.email = res.data.email;
    }).catch((err) => {
      console.log(err)
    });
  },
  data () {
    return {
      error: '',
      email: '',
      code: '',
      show: true,
      count: '',
      timer: null
    };
  },
  methods: {
    goGet: function () {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
          } else {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
          }
        }, 1000)
      };
      this.$http.get('http://47.95.249.186:8880/mixueshop/login/emailCheckCode', {
        params: {
          email: this.email
        }
      }).then(res => {
      }).catch((err) => {
        console.log(err)
      });
  },
    next: function () {
        this.$http.get('http://47.95.249.186:8880/mixueshop/login/isLogin', {
        }).then(res => {
          if (res.data === true) {
            this.$http.get('http://47.95.249.186:8880/mixueshop/user/updatePwdByEmail', {
              params: {
                code: this.code
              }
            }).then(res => {
              if (res.data === 1) {
                this.error = '*验证码错误';
              } else {
                this.$parent.index++;
                this.$parent.title.push('下一步');
                this.$router.push({ path: '/next' });
              }
            }).catch((err) => {
              console.log(err)
            });
          } else {
            this.$http.get('http://47.95.249.186:8880/mixueshop/login/forgetPwdByEmail', {
              params: {
                code: this.code
              }
            }).then(res => {
              if (res.data === 1) {
                this.error = '*验证码错误';
              } else {
                this.$parent.index++;
                this.$parent.title.push('下一步');
                this.$router.push({ path: '/next' });
              }
            }).catch((err) => {
              console.log(err)
            });
          }
        }).catch((err) => {
          console.log(err)
        });
    }
  }
};
</script>

<style lang='less' scoped>
@import "../../../assets/less/fonts.css";
@import "../../../assets/less/base.less";
.password {
  top: 0.9rem;
  bottom: 0;
  width: 100%;
  background-color: @bgColor;
  text-align: center;

  z-index: 20;
}
.password input {
  width: 93%;
  height: 0.82rem;
  line-height: 0.88rem;
  outline: none;
}
.password .text {
  font-size: 0.26rem;
  color: #ccc;
  padding-left: 0.22rem;
}
.Send-verification-code {
  position: relative;
}
.Send-verification-code .verification {
  position: absolute;
  font-size: 0.28rem;
  top: 0.68rem;
  left: 0.37rem;
  color: #aeaeae;
}
.Send-verification-code .text1 {
  width: 73%;
  padding-left: 1.7rem;
  font-size: 0.28rem;
  color: #ccc;
}
.Send-verification-code .code {
  width: 1.72rem;
  height: 0.56rem;
  line-height: 0.56rem;
  font-size: 0.26rem;
  text-align: center;
  color: #fff;
  background-color: @activeColor;
  border-radius: 0.2rem;
  position: absolute;
  top: 0.53rem;
  right: 0.37rem;
}
.err {
  display: block;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.22rem;
  color: red;
  position: relative;
  left: -1.3rem;
  top: 0.1rem;
}
.next {
  width: 70%;
  height: 0.85rem;
  line-height: 0.85rem;
  font-size: 0.28rem;
  text-align: center;
  color: #fff;
  background-color: @activeColor;
  border-radius: 0.2rem;
  margin: 0 auto;
  margin-top: 0.6rem;
}
</style>
