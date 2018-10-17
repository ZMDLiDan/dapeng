<!--  -->
<template>
   <div class="content">
      <table align="center" border="none" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        <tbody>
        <tr>
          <td class="name">用户名:</td>
          <td class="import"><input type="text" v-model.trim="user.input" ref="myUser" @change="validateUser"/></td>
          <td><i v-show="!user.state&&user.input" class="icon-right2"></i></td>
        </tr>
        <tr>
          <td colspan="2"><p class="error" ref="myErr1">{{user.errorText[user.state]}}</p></td>
        </tr>
        <tr>
          <td class="name">邮 箱:</td>
          <td class="import"><input type="text" v-model.trim="email.input" ref="myEmail" @change="validateEmail"/></td>
          <td v-show="!email.state&&email.input" class="icon-right2"></td>
        </tr>
        <tr>
          <td colspan="2"><p class="error" ref="myErr2">{{email.errorText[email.state]}}</p></td>
        </tr>
        <tr>
          <td class="name">手 机:</td>
          <td class="import"><input type="text" v-model.trim="telephone.input" ref="myTel" @change="validateTel"/></td>
          <td v-show="!telephone.state&&telephone.input" class="icon-right2"></td>
        </tr>
        <tr>
          <td colspan="2"><p class="error" ref="myErr3">{{telephone.errorText[telephone.state]}}</p></td>
        </tr>
        <tr>
          <td class="name">密 码:</td>
          <td class="import"><input type="password" v-model="password.input" ref="myPass" @change="validatePass"/></td>
          <td v-show="!password.state&&password.input" class="icon-right2"></td>
        </tr>
        <tr>
          <td colspan="2"><p class="error" ref="myErr4">{{password.errorText[password.state]}}</p></td>
        </tr>
        <tr>
          <td class="name">验证码:</td>
          <td class="import">
            <input type="text" v-model="imgCode.input" ref="myCode" @input="validateCode"/>
            <div class="imgCode1"><img :src="imgCode.url" alt=""/></div>
            <p class="imgCode2" @click="changeCheckCode">换一换</p>
          </td>
        </tr>
        <tr>
          <td colspan="2"><p class="error">{{imgCode.errorText[imgCode.state]}}</p></td>
        </tr>
        </tbody>
      </table>
     <input type="hidden" name="formToken" value="${formToken}"/>
      <input class="btn" type="button" value="确 认 注 册" @click="goAchieve"/>
      <transition name="successLoad"
          v-on:after-enter="afterEnter"
            v-on:after-leave="afterLeave"
      >
        <div class="filter-wrapper" v-show="isSuccess">
          <h2>注册成功，即将跳转</h2>
      </div>
      </transition>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isSuccess: false,
      imgCode: {
        input: '',
        url: 'http://47.95.249.186:8880/mixueshop/regist/checkCode',
        state: -1,
        errorText: [
          '',
          '*验证码不可为空',
          '*请输入正确的验证码'
        ]
      },
      user: {
          input: '',
          state: -1,
          errorText: [
            '',
            '*用户名不可为空',
            '用户名已存在'
          ]
        },
        email: {
          input: '',
          state: -1,
          errorText: [
            '',
            '*邮箱不可为空',
            '*请输入有效的邮箱',
            '*邮箱已存在'
          ]
        },
        telephone: {
          input: '',
          state: -1,
          errorText: [
            '',
            '*手机号码不可为空',
            '*请输入有效的手机号码',
            '*手机号已存在'
          ]
        },
        password: {
          state: -1,
          input: '',
          errorText: [
            '',
            '*密码不能为空',
            '*密码长度应在6位到12位之间'
          ]
        }
    };
  },

  components: {},

  computed: {},
      methods: {
      afterEnter: function (el) {
        this.isSuccess = false;
      },
      afterLeave: function (el) {
        this.$router.push('/table');
      },
      changeCheckCode () {
        this.imgCode.url = 'http://47.95.249.186:8880/mixueshop/regist/checkCode' + '?' + Math.floor(Math.random() * 100) / 100;
      },
      goAchieve: function () {
        if (this.user.state || this.email.state || this.telephone.state || this.password.state || this.imgCode.state) {

        } else {
            this.$http.post('http://47.95.249.186:8880/mixueshop/regist/doRegist', {
                name: this.user.input,
                email: this.email.input,
                telephone: this.telephone.input,
                password: this.password.input,
                checkCode: this.imgCode.input
            }).then((res) => {
              console.log(res);
              this.isSuccess = true;
            })
            console.log(document.cookie)
        }
      },
      validateUser: function () {
        // console.log(this.user);
        if (this.user.input === '') {
          this.user.state = 1;
        } else {
          this.$http.get('http://47.95.249.186:8880/mixueshop/regist/checkUsername', {
            params: {
              name: this.user.input
            }
          }).then((res) => {
            this.user.state = res.data;
          })
        }
      },
      validateEmail: function () {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (this.email.input === '') {
          this.email.state = 1;
        } else if (!reg.test(this.email.input)) {
          this.email.state = 2;
        } else {
          this.$http.get('http://47.95.249.186:8880/mixueshop/regist/checkEmail', {
            params: {
              email: this.email.input
            }
          }).then((res) => {
            this.email.state = res.data;
          })
        }
      },
      validateTel: function () {
        var reg = /1[3|4|5|7|8][0-9]{9}$/;
        if (this.telephone.input === '') {
          this.telephone.state = 1;
        } else if (!reg.test(this.telephone.input)) {
          this.telephone.state = 2;
        } else {
          this.$http.get('http://47.95.249.186:8880/mixueshop/regist/checkTelephone', {
            params: {
              telephone: this.telephone.input
            }
          }).then((res) => {
            this.telephone.state = res.data;
          })
        }
      },
      validatePass: function () {
        if (this.password.input === '') {
          this.password.state = 1;
        } else if (this.password.input.length < 6 || this.password.input.length > 12) {
          this.password.state = 2;
        } else {
          this.password.state = 0;
        }
      },
      validateCode: function () {
        if (this.imgCode.input === '') {
          this.imgCode.state = 1;
        } else {
          this.$http.get('http://47.95.249.186:8880/mixueshop/regist/checkImgCode', {
            params: {
              checkCode: this.imgCode.input
            }
          }).then((res) => {
            this.imgCode.state = res.data;
          })
        }
      }
    }
}
</script>
<style lang='less' scoped>
@import '../../../../../assets/less/fonts.css';
@import '../../../../../assets/less/base.less';
.content {
      width: 100%;
      table {
        //width: 5.5rem;
        margin: 0 auto;
        height: 0.55rem;
        background-color: @bgColor;
        font-size: 0.3rem;
        margin-top: 0.8rem;
        margin-bottom: 0.4rem;
        tr {
          height: 0.5rem;
          td:nth-child(3){
            width: 0.4rem;
            height: 0.4rem;
            i{
              display: block;
              width: 0.4rem;
              height: 0.4rem;
            }
          }
        }
        .name {
          font-size: 0.28rem;
          color: @baseColor;
          width: 1rem;
          text-align: center;
          padding-right: 0.15rem;
        }
        .import {
          border-bottom: 0.02rem solid #ccc;
          //width: 4rem;

          input {
            background-color: @bgColor;
            font-size: 0.26rem;
            width: 3.5rem;
            outline: none;
          }
        }
        .error {
          /* border: 0.01rem solid red;
          border-radius: 0.2rem; */
          color: red;
          opacity: 0.7;
          margin-left: 1.2rem;
          font-size: 0.23rem;
          height: 0.4rem;
          line-height: 0.4rem;
          position: relative;
          top: -0.07rem;
        }
        .imgCode1 {
          width: 1.5rem;
          height: 0.7rem;
          position: absolute;
          left: 4.6rem;
          top: 9.08rem;
          background-color: @bgColor;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .imgCode2 {
          font-size: 0.2rem;
          color: @activeColor;
          position: absolute;
          left: 6.3rem;
        }

      }

      .btn {
        width: 4.4rem;
        height: 0.8rem;
        font-size: 0.3rem;
        text-align: center;
        line-height: 0.8rem;
        background-color: @activeColor;
        color: #fff;
        border-radius: 1rem;
        margin: 0 auto;
        display: block;
        outline: none;
      }
      .successLoad-enter-active,.successLoad-leave-active{
          transition: 1s all linear;
        }
        .successLoad-enter, .successLoad-leave-to{
          opacity: 0;
        }
      .filter-wrapper{
        position: absolute;
        z-index: 2;
        top: 0;
        bottom: 0;
        padding-top: 4rem;
        width: 100%;
        background: url('http://img.shijue.me/gicPicture/3489ba35349dca64d4bd09910f1282487/06617a079a2c4591be07afc5a2b68461.jpg!dp6');
        background-size: cover;
          h2{
            font-size: 0.7rem;
            color: #fff;
            text-align: center;
            font-weight: bold;
          }
      }

}
</style>
