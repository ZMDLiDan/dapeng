<!--  -->
<template>
  <div class="content">
    <div class="user">
      <i class="icon-user"></i>
      <input v-model.trim="name.input"
             type="text" placeholder="请输入手机号/用户名"
             @change="checkName"
      />
    </div>
    <p class="error">{{name.errorText[name.state]}}</p>
    <div class="password">
      <i class="icon-password"></i>
      <input
        v-model.trim="password.input"
        type="password" placeholder="请输入密码"/>
      <input type="hidden" name="formToken" value="${formToken}"/>
    </div>
    <p class="error">{{password.errorText[password.state]}}</p>
    <input @click="doLogin" class="btn" type="button" value="登 录"
    />
    <p class="reset" @click="goPass">忘记密码?</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: {
          input: '',
          errorText: [
            '',
            '用户名不存在',
            '用户名不为空'
          ],
          state: -1
        },
        password: {
          input: '',
          errorText: [
            '',
            '请输入正确密码'
          ],
          state: -1
        }
      };
    },

    components: {},

    computed: {},

    methods: {
      checkName() {
        this.$http.get('http://47.95.249.186:8880/mixueshop/login/checkUsername', {
          params: {
            name: this.name.input
          }
        }).then((res) => {
          this.name.state = res.data;
        })
      },
      doLogin() {
        if (!this.name.state) {
          this.$http.post('http://47.95.249.186:8880/mixueshop/login/doLogin', {
              name: this.name.input,
              password: this.password.input
          }).then((res) => {
            if (res.data.flag) {
              this.$router.push({path: '/mine'});
            } else {
              this.password.state = 1;
            }
            console.log(res.data);
          })
        }
      },
      goPass() {
        this.$parent.$parent.index++;
        this.$parent.$parent.title.push('忘记密码');
        this.$router.push({path: '/password'});
      }
    }
  }

</script>
<style lang='less' scoped>
  @import '../../../../../assets/less/fonts.css';
  @import '../../../../../assets/less/base.less';

  .content {
    width: 100%;
    .error {
      text-align: left;
      padding-left: 1rem;
      color: red;
      opacity: 0.7;
      font-size: 0.23rem;
      height: 0.4rem;
      line-height: 0.4rem;
    }
    .user, .password {
      width: 6rem;
      height: 0.75rem;
      border-bottom: 0.02rem solid #ccc;
      margin: 0 auto;
      padding-left: 0.3rem;
      margin-bottom: 0.3rem;
      i {
        font-size: 0.5rem;
        position: relative;
        top: -0.25rem;
        &:before {
          color: @activeColor;
        }
      }
      input {
        height: 0.55rem;
        background-color: @bgColor;
        border: none;
        position: relative;
        top: -0.35rem;
        font-size: 0.26rem;
        outline: none;
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
      margin: 0.5rem auto;
      display: block;
      outline: none;
    }
    .reset {
      color: @activeColor;
      font-size: 0.24rem;
      text-align: right;
      padding-right: 1rem;
    }
  }
</style>
