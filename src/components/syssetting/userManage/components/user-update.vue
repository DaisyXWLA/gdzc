<template>
  <div style="width: 500px">
    <Modal
      v-model="updateUser"
      :hasCloseIcon="hasCloseIcon"
      :hasDivider="hasDivider"
      :middle="true"
      :closeOnMask="false"
    >
      <div slot="header" class="title">
        编辑用户
        <i @click="close" class="h-icon-close"></i>
      </div>
      <div :labelPosition="labelPosition" style="width:600px">
        <Form
          ref="form"
          :model="userList"
          :label-width="110"
          :rules="validationRules"
          :top="0.2"
          showErrorTip
        >
          <FormItem label="登录名称：" prop="loginName">
            <input type="text" v-model="userList.loginName" v-wordlimit="15" />
          </FormItem>
          <FormItem label="用户姓名：" prop="realName">
            <input type="text" v-model="userList.realName" v-wordlimit="15" />
          </FormItem>
          <FormItem label="登录密码：" prop="password">
            <input type="password" v-model="userList.password" />
          </FormItem>
          <FormItem label="管理员：" prop="isAdmin">
            <Radio v-model="userList.isAdmin" :datas="adminParams" ref="check"></Radio>
          </FormItem>
          <FormItem label="部门：" prop="departmentId">
            <Select
              v-model="userList.departmentId"
              class="select-demo"
              :datas="department"
              :filterable="true"
            ></Select>
          </FormItem>
          <FormItem label="考勤编号：" prop="enrollNumber">
            <input type="text" v-model="userList.enrollNumber" />
          </FormItem>
          <FormItem label="手机号码：" prop="phoneNumber">
            <input type="text" v-model="userList.phoneNumber" />
          </FormItem>
          <FormItem label="添加角色：" prop="roleIds">
            <Select v-model="userList.roleIds" :datas="role" :multiple="true"></Select>
          </FormItem>
          <FormItem label="用户性别：" prop="sex">
            <Select v-model="userList.sex" class="select-demo" :datas="sexParams"></Select>
          </FormItem>
          <!-- <FormItem label="职位：" prop="relatedprojects">
            <input type="text" v-model="userList.theme" />
          </FormItem>-->
          <FormItem label="邮箱：" prop="email">
            <input type="text" v-model="userList.email" />
          </FormItem>
        </Form>
        <Loading :loading="loading"></Loading>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="submit">更新</button>
        <button class="h-btn" @click="close">取消</button>
      </div>
    </Modal>
  </div>
</template>
<script>
import userModel from 'model/user/userModel';
export default {
  props: ['updateUser', 'department', 'role'],
  data() {
    return {
      userList: userModel.parse({}),
      sexParams: [
        { title: '男', key: '1' },
        { title: '女', key: '2' },
        { title: '其他', key: '3' }
      ],
      adminParams: [
        { title: '是', key: '1' },
        { title: '否', key: '0' }
      ],
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      // 必填项校验项
      validationRules: {
        rules: {
          loginName: {
            validAsync(value, next, parent, data) {
              setTimeout(() => {
                if (value != '') {
                  if (/^[A-Za-z0-9]{1}\w{0,15}$/.test(value)) {
                    next();
                  } else {
                    next('登录名应为1-16位字母、数字、下划线组合');
                  }
                }
              }, 100);
            }
          },
          realName: {
            validAsync(value, next, parent, data) {
              setTimeout(() => {
                if (value != '') {
                  if (/^[\u2E80-\u9FFF]+$/.test(value.replace(/\s+/g, ''))) {
                    next();
                  } else {
                    next('用户名输入不合法');
                  }
                }
              }, 100);
            }
          },
          password: {
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
          },
          // enrollNumber: {
          //   validAsync(value, next, parent, data) {
          //     setTimeout(() => {
          //       if (value != '') {
          //         // console.log(value)
          //         if (/^[A-Za-z0-9]{6,16}$/.test(value)) {
          //           next();
          //         } else {
          //           next('考勤编号应为6-16位字母、数字组合');
          //         }
          //       }
          //     }, 100);
          //   }
          // },
          // phoneNumber: {
          //   validAsync(value, next, parent, data) {
          //     setTimeout(() => {
          //       if (value != '') {
          //         // console.log(value)
          //         if (/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(value)) {
          //           next();
          //         } else {
          //           next('手机号输入不合法');
          //         }
          //       }
          //     }, 100);
          //   }
          // },
          // email: {
          //   validAsync(value, next, parent, data) {
          //     setTimeout(() => {
          //       if (value != '') {
          //         // console.log(value)
          //         if (/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(value)) {
          //           next();
          //         } else {
          //           next('邮箱输入不合法');
          //         }
          //       }
          //     }, 100);
          //   }
          // }
        },
        required: ['loginName', 'realName', 'password', 'departmentId']
      },
      loading: false
    };
  },
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      this.userList.id = id;
      R.userManage.userFindOne(userModel.dispose(this.userList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.loading = false;
          this.userList = userModel.parse(resp.body);
          if (resp.body.roleIds == '') {
            this.userList.roleIds = resp.body.roleIds;
          } else {
            this.userList.roleIds = resp.body.roleIds.split(',');
          }
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败');
        }
      });
    },
    submit() {
      this.$refs.form.validAsync().then(result => {
        if (result.result) {
          this.$Loading();
          R.userManage.userUpdate(userModel.dispose(this.userList)).then(resp => {
            if (resp.ok) {
              setTimeout(() => {
                this.$parent.close();
                this.$Loading.close();
                this.$Message.success('更新成功');
                this.userList = userModel.parse({});
                this.$parent.getData();
              }, 1000);
            } else {
              this.$Message.error('更新失败');
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
