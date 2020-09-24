<template>
  <Modal
    v-model="updateRole"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      编辑角色
      <i @click="close" class="h-icon-close"></i>
    </div>
    <div :labelPosition="labelPosition">
      <Form
        ref="form"
        :model="roleList"
        :label-width="110"
        :top="0.2"
        :rules="validationRules"
        showErrorTip
      >
        <FormItem label="角色名称：" prop="roleName">
          <input type="text" v-model="roleList.roleName" />
        </FormItem>
        <FormItem label="角色代码：" prop="roleCode">
          <input type="text" v-model="roleList.roleCode" />
        </FormItem>
        <FormItem label="备注：" prop="remarks">
          <RichTextEditor v-model="roleList.remarks"></RichTextEditor>
        </FormItem>
      </Form>
      <Loading :loading="loading"></Loading>
    </div>
    <div slot="footer">
      <button class="h-btn h-btn-primary" @click="submit">更新</button>
      <button class="h-btn" @click="close">取消</button>
    </div>
  </Modal>
</template>
<script>
import roleModel from 'model/role/roleModel';
export default {
  props: ['updateRole'],
  data() {
    return {
      roleList: roleModel.parse({}),
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      validationRules: {
        required: ['roleName', 'roleCode']
      },
      loading: false
    };
  },
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      this.roleList.id = id;
      R.roleManage.roleFindOne(roleModel.dispose(this.roleList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.roleList.id = resp.body.id;
          this.roleList.roleName = resp.body.roleName;
          this.roleList.roleCode = resp.body.roleCode;
          this.roleList.remarks = resp.body.remarks;
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败');
        }
      });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Loading();
        R.roleManage.roleUpdate(roleModel.dispose(this.roleList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('更新成功');
              this.roleList = roleModel.parse({});
              this.$parent.getData();
            }, 1000);
          } else {
            this.$Message.error('更新失败');
            this.$parent.close();
            this.$Loading.close();
          }
        });
      }
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
