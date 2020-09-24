<template>
  <Modal
    v-model="reseteUser"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      重置密码
      <i @click="close" class="h-icon-close"></i>
    </div>

    <div :labelPosition="labelPosition" style="width:600px">
      <Form ref="form" :model="userList" :label-width="110" :top="0.2" :rules="validationRules">
        <FormItem label="登录名称：" prop="loginName">
          <input type="text" v-model="userList.loginName" readonly />
        </FormItem>
        <FormItem label="登录密码：" prop="loginPassword">
          <input type="password" v-model="userList.loginPassword" />
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <button class="h-btn h-btn-primary" @click="submit">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </div>
  </Modal>
</template>
<script>
import userModel from 'model/user/userModel';
export default {
  props: ['reseteUser'],
  data() {
    return {
      userList: userModel.parse({}),
      param: [
        { title: '海友科伟官网开发', key: 'a1', other: '其他值' },
        { title: '办公平台开发', key: 'a2' },
        { title: '郑州师院固定资产', key: 'a3' }
      ],
      data: {
        theme: null,
        relatedprojects: null,
        time: null,
        reason: null,
        value: null
      },
      format: '',
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      validationRules: {
        rules: {
          loginPassword: {
            validAsync(value, next, parent, data) {
              setTimeout(() => {
                if (value != '') {
                  // console.log(value)
                  if (/^[0-9a-zA-Z!@#\$\%\^\&\*\?\(\)\.]{4,18}$/.test(value)) {
                    next();
                  } else {
                    next('密码应为4-18位字母、数字、特殊字符组合');
                  }
                }
              }, 100);
            }
          }
        },
        required: ['loginPassword']
      }
    };
  },
  mounted() {},
  methods: {
    getData(id) {
      this.userList.id = id;
      R.userManage.userFindOne(userModel.dispose(this.userList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.userList.id = resp.body.id;
          this.userList.loginName = resp.body.loginName;
        }
      });
    },
    submit() {
      this.$refs.form.validAsync().then(result => {
        if (result.result) {
          this.$Loading();
          R.userManage.userResetPassword(userModel.dispose(this.userList)).then(resp => {
            if (resp.ok) {
              setTimeout(() => {
                this.$parent.close();
                this.$Loading.close();
                this.$Message.success('重置密码成功');
                this.$parent.getData();
                this.userList = userModel.parse({});
              }, 1000);
            } else {
              this.$Message.error('重置密码失败');
              this.$parent.close();
              this.$Loading.close();
            }
          });
        }
      });
    },
    close() {
      this.$parent.close();
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  overflow: hidden;
  .h-icon-close {
    float: right;
    line-height: 40px;
    padding-right: 15px;
  }
}
</style>
