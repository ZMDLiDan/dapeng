<template>
    <ul class="list">
      <li class="head">
        <span>头像</span>
        <div class="imgfile" id="imgfile">
          <input type="file" accept="image/*" id="btn" @change="upload" class="icon-cat" multiple>
          <img src="" id="fileimg" ref="img"/>
        </div>
        <label for="imgfile">></label>
      </li>
      <li class="name" @click="changeUserName">
        <span>昵称</span>
        <span id="changename">{{username}}</span>
        <label for="changename">></label>
      </li>
      <li class="address">
        <span>收货地址</span>
        <span id="changeaddress" @click="goAddress">修改添加</span>
        <label for="changeaddres">></label>
      </li>
      <li class="changePassword" @click="changePassword">
        <span>修改密码</span>
        <label for="changePassword">></label>
      </li>
      <li class="quit" @click = "quit" >
        <span id="quit">退出登陆</span>
        <label for="changeaddres">></label>
      </li>
    </ul>
</template>

<script>

export default {
  mounted () {
    this.$http.get('http://47.95.249.186:8880/mixueshop/user/showUserInfo').then(res => {
      this.username = res.data.name;
      if (res.data.flag) {
        this.$refs.img.src = res.data.image;
        this.$refs.img.style.display = 'block';
     }
    }).catch((err) => {
      console.log(err)
    });
  },
  data () {
    return {
      username: ''
    };
  },
  methods: {
    upload () {
      let btn = document.querySelector('#btn');
      let img = document.querySelector('#fileimg');
      let file = btn.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ((e) => {
        img.src = e.target.result;
        img.style.display = 'block';
        // console.log(img.src)
        this.$http.post('http://47.95.249.186:8880/mixueshop/user/uploadUserImage', {
              str: e.target.result
          }).then(res => {
            console.log(res.data)
            img.src = res.data;
          }).catch((err) => {
            console.log(err)
        });
      })
    },
    goAddress  () {
      this.$parent.index++;
      this.$parent.title.push('我的收货地址');
      this.$router.push({path: '/address'});
    },
    changePassword () {
      this.$parent.index++;
      this.$parent.title.push('修改密码');
      this.$router.push({path: '/password'});
    },
    quit () {
      this.$http.get('http://47.95.249.186:8880/mixueshop/login/doLogout').then((res) => {
      this.$parent.index = -1;
      this.$parent.title = [];
      this.$router.push({path: '/registerLogin'});
      console.log(res.data);
    })
    },
    changeUserName () {
      this.$parent.index++;
      this.$parent.title.push('修改用户名');
      this.$router.push({path: '/changeName'});
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../assets/less/base.less';
@import '../../assets/less/fonts.css';
.list{
  background-color: @bgColor;
  padding:0.1rem 0.05rem 0 0.05rem;
  box-sizing:border-box;
  top: 0.9rem;
  bottom: 0;
  z-index: 2;
    li{
      margin-bottom: 0.05rem;
      background-color: #fff;
      position: relative;
         label{
          font-size: 0.3rem;
          position: absolute;
          right: 0.3rem;
          top: 50%;
          height:0.3rem;
          margin-top: -0.15rem;
          color:#ddd;

        }
    }
    .head{
      padding: 0.3rem 0.75rem 0.3rem 0.3rem;

      height: 1rem;

        span{
          font-size: 0.28rem;
          color: @baseColor;
          vertical-align: middle;
        }
        .imgfile{
          width: 1rem;
          height: 1rem;
          float: right;
          position: relative;
            #btn{
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0.2;
              left: 0;
              top: 0;
              display: inline-block;
              z-index: 4;
              overflow: hidden;
              outline: none;
            }
            img{
              width: 100%;
              height: 100%;
              z-index: 2;
              display: none;
              border-radius: 50%;
            }

        }
    }
    .name,.address{
      padding:0.3rem 0.75rem 0.3rem 0.3rem;
      height:0.3rem;
        span{
          font-size:0.28rem;
          color: @baseColor;
          vertical-align: top;
        }
        #changename{
          font-size:0.28rem;
          color: @baseColor;
          float:right;
        }
    }
    .address,.changePassword,.quit{
      padding:0.3rem 0.75rem 0.3rem 0.3rem;
      height:0.3rem;
      line-height: 0.3rem;
        span{
          font-size:0.28rem;
          color: @baseColor;
          vertical-align: top;
        }
        #changeaddress{
          font-size:0.28rem;
          color:@baseColor;
          float:right;
        }
    }
}
</style>
