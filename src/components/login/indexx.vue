<style lang="less">
@gradient-color: #3788ee;
@bg-color: #f7f8fa;
@title-color: #3a3a3a;
@text-color: #7e7e7e;
@placeholder-color: #7e7e7e;
.h-notice-container {
  left: 50%;
  transform: translate(-50%);
}
.login-vue {
  min-width: 1366px;
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: url(../../images/login/login_bg_v1.0.png) no-repeat;
  background-size: cover;
  z-index: 1;
  .login-con {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    width: 70%;
    min-height: 80%;
    margin: auto;
    border-radius: 6px;
    z-index: 3;
    .login-pic {
      position: absolute;
      width: 50%;
      height: 100%;
      text-align: center;
      img {
        width: 100%;
        position: absolute;
        left: 15%;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
      }
    }
    .login-info {
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      text-align: center;
      .login-info-bg {
        position: absolute;
        width: 50%;
        height: 60%;
        top: 50%;
        transform: translateY(-50%);
        right: 20%;
        background: #fff;
        border-radius: 6px;
        padding: 5%;
        box-sizing: border-box;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
        .login-info-con {
          width: 100%;
          margin: 0 auto;
          .login-title {
            font-size: 1.6em;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: rgba(18, 139, 241, 1);
            margin: 15% 0;
          }
          .login-name {
            .info;
          }
          .login-pwd {
            .info;
          }
        }
        .btn {
          width: 100%;
          margin: 0 auto;
          margin-top: 20%;
          button {
            font-size: 1em;
          }
        }
      }
    }
    @media screen and (max-width: 1439px) {
      .login-info {
        .login-info-bg {
          width: 60%;
          min-height: 370px;
        }
      }
    }
    @media screen and (min-width: 1440px) and (max-width: 1679px) {
      .login-info {
        .login-info-bg {
          width: 55%;
          min-height: 360px;
        }
      }
    }
    @media screen and (min-width: 1680px) and (max-width: 1919px) {
      .login-info {
        .login-info-bg {
          min-height: 400px;
        }
      }
    }
    @media screen and (min-width: 1920px) {
      .login-info {
        .login-info-bg {
          min-height: 450px;
        }
      }
    }
  }
  .copyright {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    letter-spacing: 1px;
    color: #fff;
    a {
      color: @text-color;
    }
    z-index: 1;
  }
  .info {
    width: 100%;
    margin: 10% auto;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    img {
      width: 8%;
      vertical-align: middle;
    }
    input {
      width: 85%;
      border: none;
      outline: none;
      background-color: rgba(0, 0, 0, 0);
      font-size: 1em;
      vertical-align: middle;
    }
    input::placeholder {
      font-size: 1em;
    }
  }
}
</style>

<template>
  <div class="login-vue" @wheel.prevent>
    <div class="login-con">
      <div class="login-pic">
        <img src="../../images/login/login_pic.png" alt="固定资产管理" />
      </div>
      <div class="login-info">
        <div class="login-info-bg">
          <div class="login-info-con">
            <div class="login-title">固定资产管理系统V2.0</div>
            <div class="login-name">
              <img src="../../images/login/user.png" alt="用户名" />
              <input type="text" placeholder="请输入用户名" v-model="login.username" autocomplete="off" />
            </div>
            <div class="login-pwd">
              <img src="../../images/login/pwd.png" alt="密码" />
              <input
                type="password"
                placeholder="请输入密码"
                v-model="login.password"
                @keyup.enter="submit"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="btn">
            <Button :loading="loading" block color="primary" size="l" @click="submit">登录</Button>
          </div>
        </div>
      </div>
    </div>
    <!-- <p class="copyright">Copyright © 2019 郑州海友科伟电子科技有限公司 ·</p> -->
  </div>
</template>
<script>
import Login from 'model/login/Login';

export default {
  data() {
    return {
      login: Login.parse({}),
      loading: false
    };
  }, // 注册回车登录
  created() {
    this.keyupEnter();
  },
  mounted() {
    // alert('屏幕分辨率' + window.screen.width + '*' + window.screen.height);
    if (window.screen.width < 1366) {
      this.$Notice({
        type: 'warn',
        title: '警告',
        content: `你的屏幕分辨率小于1366*768不能得到良好的用户体验！
        建议调整分辨率`,
        timeout: 0
      });
    }
  },
  methods: {
    // 回车登录
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13) {
          this.submit();
        }
      };
    },
    submit() {
      this.loading = true;
      this.login.grant_type = 'password';
      Utils.saveLocal('token', 'Basic aHlrdy1nZHpjOmh5a3ctZ2R6Yy1zZWNyZXQ=');
      R.Login.login(Login.dispose(this.login)).then(resp => {
        if (resp.message == 'Source must not be null') {
          this.$Message.error('用户名错误');
          this.loading = false;
        } else if (resp.oAuth2ErrorCode == 'invalid_grant') {
          this.$Message.error('密码错误，请重新输入');
          this.loading = false;
        } else if (resp.tokenType == 'bearer') {
          Utils.saveLocal('token', resp.tokenType + ' ' + resp.value);
          R.Login.getInfo(Login.dispose(this.login)).then(resp => {
            Utils.saveLocal('role', resp.roleModels);
            Utils.saveLocal('realName', resp.realName);
            Utils.saveLocal('botten', resp.modelActions);
            this.$router.push({ path: '/Home' });
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>
