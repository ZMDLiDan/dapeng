<template>
<div class="next-main">
  <p>请为你的账户设置一个新密码</p>
  <input type="password" placeholder="请设置不小于6位的密码" v-model="password"/>
  <span class="err">{{error}}</span>
  <div class="next" @click="goSave">保存新密码</div>
</div>
</template>

<script>
    export default {
      data () {
        return {
         password: '',
         error: ''
        };
      },
      methods: {
       goSave: function () {
          // this.$http.get('http://47.95.249.186:8880/mixueshop/user/updatePwd',{
          //   params: {
          //     password: this.password,
          //   }
          // }).then(res => {
          //   if(res.data === 0){
          //     this.error = '*密码长度不合法';
          //   }else if(res.data === 1){
          //     this.error = '*非法操作';
          //   }else if(res.data === 2){
          //     this.error = '*与原密码一致';
          //   }else {
          //     this.$parent.index = 0
          //     this.$parent.title = [];
          //     this.$parent.title.push('设置');
          //     this.$router.push({ path: '/usermessage' });
          //   }
          // }).catch((err)=>{
          //   console.log(err)
          // });

          this.$http.get('http://47.95.249.186:8880/mixueshop/login/isLogin').then(res => {
            if (res.data === true) {
              this.$http.get('http://47.95.249.186:8880/mixueshop/user/updatePwd', {
                params: {
                  password: this.password
                }
              }).then(res => {
                if (res.data === 0) {
                  this.error = '*密码长度不合法';
                } else if (res.data === 1) {
                  this.error = '*非法操作';
                } else if (res.data === 2) {
                  this.error = '*与原密码一致';
                } else {
                  this.$parent.index = 0
                  this.$parent.title = [];
                  this.$parent.title.push('设置');
                  this.$router.push({ path: '/usermessage' });
                }
              }).catch((err) => {
                console.log(err)
              });
            } else {
              this.$http.get('http://47.95.249.186:8880/mixueshop/login/forgetPwd', {
                params: {
                  password: this.password
                }
              }).then(res => {
                if (res.data === 0) {
                  this.error = '*密码长度不合法';
                } else if (res.data === 1) {
                  this.error = '*非法操作';
                } else if (res.data === 2) {
                  this.error = '*与原密码一致';
                } else {
                  this.$parent.index = 0
                  this.$parent.title = [];
                  this.$router.push({ path: '/landing' });
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
    }
</script>

<style lang='less' scoped>
@import '../../../../assets/less/fonts.css';
@import '../../../../assets/less/base.less';
  .next-main{
    width:100%;
    height:100%;
    background:@bgColor;
    text-align: center;
    padding-top:.7rem;
    z-index: 100;
    bottom: 0;
  }
.next-main p{
  font-size: .28rem;
  margin-bottom:.6rem;
}
  .next-main input{
    width:70%;
    height:.5rem;
    border-bottom: .03rem #ccc solid;
    outline:none;
    background: @bgColor;
    font-size:.22rem;
  }
  .err {
    font-size: 0.22rem;
    color: red;
    display: block;
    height: 0.3rem;
    line-height: 0.3rem;
    position: relative;
    left: -2.2rem;
    top: 0.1rem;
  }
   .next{
    width:70%;
    height:.85rem;
    line-height:.85rem;
    text-align:center;
     margin:0 auto;
     border-radius:.25rem;
     margin-top:.47rem;
    font-size:.28rem;
    color:#fff;
    background-color: @activeColor;
  }
</style>
