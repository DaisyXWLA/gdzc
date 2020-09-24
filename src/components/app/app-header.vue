<style lang="less">
.app-header {
  color: rgba(49, 58, 70, 0.8);

  .h-autocomplete {
    line-height: 1.5;
    float: left;
    margin-top: 15px;
    margin-right: 20px;
    width: 120px;
    &-show,
    &-show:hover,
    &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }
    &-show.focusing {
      border-bottom: 1px solid #eee;
    }
  }
  &-info &-icon-item {
    cursor: pointer;
    display: inline-block;
    float: left;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;
    &:hover {
      background: @hover-background-color;
    }
    i {
      font-size: 18px;
    }
    a {
      color: inherit;
    }
    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }
  .h-dropdownmenu {
    float: left;
  }

  &-dropdown {
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;
    .h-icon-down {
      right: 20px;
    }
    cursor: pointer;
    &:hover,
    &.h-pop-trigger {
      background: @hover-background-color;
    }
    &-dropdown {
      padding: 5px 0;
      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }

  &-menus {
    display: inline-block;
    vertical-align: top;
    > div {
      display: inline-block;
      font-size: 15px;
      padding: 0 25px;
      color: @dark-color;
      &:hover {
        color: @primary-color;
      }
      + div {
        margin-left: 5px;
      }
      &.h-tab-selected {
        color: @white-color;
        background-color: @primary-color;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.side-btn /deep/ i {
  font-size: 20px;
}
.title {
  background: #2d7bf4;
  color: #fff;
  margin-left: -15px;
  padding-left: 15px;
}
</style>
<template>
  <div class="app-header">
    <div style="width:50px;float:left;">
      <Button
        :icon="siderCollapsed ? 'icon-align-right' : 'icon-align-left'"
        size="l"
        noBorder
        class="font20 side-btn"
        @click="siderCollapsed = !siderCollapsed"
      ></Button>
    </div>
    <div class="float-right app-header-info">
      <!-- <AutoComplete :showDropdownWhenNoResult="false" v-model="searchText" config="globalSearch" placeholder="全局搜索.."></AutoComplete> -->
      <div
        class="app-header-icon-item"
        v-tooltip
        content="系统布局配置"
        theme="white"
        @click="showSettingModal"
      >
        <i class="icon-content-left"></i>
      </div>
      <div class="app-header-icon-item" v-tooltip content="返回首页" theme="white" @click="goHome">
        <i class="h-icon-home"></i>
      </div>
      <!-- <appHeaderMessage></appHeaderMessage> -->
      <div class="app-header-icon-item" v-tooltip content="修改密码" theme="white" @click="edit">
        <i class="h-icon-setting"></i>
      </div>
      <!-- <div class="app-header-icon-item" v-tooltip content="GitHub" theme="white" @click="goGithub">
        <i class="h-icon-github"></i>
      </div>-->
      <!-- <div class="app-header-icon-item" v-tooltip content="教学文档" theme="white" @click="goBook">
        <i class="h-icon-help"></i>
      </div>-->
      <DropdownMenu
        class="app-header-dropdown"
        trigger="hover"
        offset="0,5"
        :width="150"
        placement="bottom-end"
        :datas="infoMenu"
        @onclick="trigger"
      >
        <Avatar :src="User.avatar" :width="30">
          <span>{{ User.name }}</span>
        </Avatar>
      </DropdownMenu>
    </div>
    <Modal v-model="modifyPassword">
      <div slot="header" class="title">修改密码</div>
      <div>
        <Form ref="form" :label-width="80" :rules="validationRules" :model="homeData">
          <FormItem label="旧密码：" prop="oldPassword">
            <input type="text" v-model="homeData.oldPassword" placeholder="请输入旧密码" />
          </FormItem>
          <FormItem label="新密码：" prop="newPassword">
            <input type="password" v-model="homeData.newPassword" placeholder="请输入新密码" />
          </FormItem>
          <FormItem label="确认密码：" prop="confirmPassword">
            <input type="password" v-model="homeData.confirmPassword" placeholder="请再次输入新密码" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button color="primary" @click="modalConfirm">确定</Button>
        <Button @click="modalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import appHeaderMessage from './modules/app-header-message';
import homeModel from 'model/home/home';
export default {
  components: {
    appHeaderMessage
  },
  data() {
    return {
      homeData: homeModel.parse({}),
      searchText: '',
      infoMenu: [
        // { key: 'info', title: '个人信息', icon: 'h-icon-user' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ],
      modifyPassword: false,
      validationRules: {
        rules: {
          newPassword: {
            validAsync(value, next, parent, data) {
              setTimeout(() => {
                if (/^[0-9a-zA-Z!@#\$\%\^\&\*\?\(\)\.]{6,18}$/.test(value)) {
                  next();
                } else {
                  next('密码应为6-18位字母、数字、特殊字符');
                }
              }, 100);
            }
          }
        },
        required: ['oldPassword', 'newPassword', 'confirmPassword'],
        combineRules: [
          {
            parentRef: 'password',
            refs: ['newPassword', 'confirmPassword'],
            valid: {
              valid: 'equal',
              message: '两次输入的密码不一致'
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(['User']),
    siderCollapsed: {
      get() {
        return this.$store.state.siderCollapsed;
      },
      set(value) {
        this.$store.commit('updateSiderCollapse', value);
      }
    }
  },
  mounted() {
    this.listenResize();
  },
  methods: {
    listenResize() {
      let windowWidth = window.innerWidth;
      const resizeEvent = window.addEventListener('resize', () => {
        if (windowWidth == window.innerWidth) {
          return;
        }
        if (this.siderCollapsed && window.innerWidth > 900) {
          this.siderCollapsed = false;
        } else if (!this.siderCollapsed && window.innerWidth < 900) {
          this.siderCollapsed = true;
        }
        windowWidth = window.innerWidth;
      });
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeEvent);
      });
      window.dispatchEvent(new Event('resize'));
    },
    // goGithub() {
    //   window.open('https://github.com/heyui/heyui-admin');
    // },
    // 返回首页
    goHome() {
      this.$router.push({ name: 'Home' });
    },
    // 代办业务
    edit() {
      this.modifyPassword = true;
    },
    goBook() {
      window.open('https://heyui.github.io/heyui-admin-docs');
    },
    trigger(data) {
      if (data == 'logout') {
        Utils.removeLocal('token');
        this.$router.replace({ name: 'Login' });
      } else {
        this.$router.push({ name: 'AccountBasic' });
      }
    },
    showSettingModal() {
      this.$emit('openSetting');
    },
    // 修改密码
    modalConfirm() {
      this.$refs.form.validAsync().then(result => {
        console.log(result);
        if (result.result) {
          this.$Loading();
          R.home.updatePassword(homeModel.dispose(this.homeData)).then(resp => {
            if (resp.ok) {
              if (resp.body == '密码错误') {
                this.$Message.error('旧密码输入错误');
              } else {
                this.$Message.success('密码修改成功');
                this.homeData.oldPassword = '';
                this.homeData.newPassword = '';
                this.homeData.confirmPassword = '';
                this.modifyPassword = false;
              }
              this.$Loading.close();
            } else {
              this.$Message.error('密码修改失败');
              this.$Loading.close();
            }
          });
        }
      });
    },
    modalClose() {
      this.homeData.oldPassword = '';
      this.homeData.newPassword = '';
      this.homeData.confirmPassword = '';
      this.modifyPassword = false;
    }
  }
};
</script>
