<template>
  <Modal
    v-model="updateDept"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      编辑部门
      <i @click="close" class="h-icon-close"></i>
    </div>

    <div :labelPosition="labelPosition">
      <Form
        ref="form"
        :model="deptList"
        :label-width="110"
        :top="0.2"
        :rules="validationRules"
        showErrorTip
      >
        <!-- <FormItem label="上级部门：" prop="pid">
          <input type="text" v-model="deptList.pid"/>
        </FormItem>-->
        <FormItem label="上级部门：" prop="pid">
          <Select v-model="deptList.pid" class="select-demo" :datas="department" :filterable="true"></Select>
        </FormItem>
        <FormItem label="部门名称：" prop="departmentName">
          <input type="text" v-model="deptList.departmentName" />
        </FormItem>
        <FormItem label="部门编号：" prop="departmentCode">
          <input type="text" v-model="deptList.departmentCode" />
        </FormItem>
        <FormItem label="排序值：" prop="sortValue">
          <input type="text" v-model="deptList.sortValue" />
        </FormItem>
        <FormItem label="备注：" prop="taginputsData">
          <RichTextEditor></RichTextEditor>
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
import deptModel from 'model/department/deptModel';
export default {
  props: ['updateDept', 'department'],
  data() {
    return {
      deptList: deptModel.parse({}),
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      validationRules: {
        required: ['sortValue', 'departmentName', 'departmentCode']
      },
      loading: false
    };
  },
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      this.deptList.id = id;
      R.deptManage.departmentFindOne(deptModel.dispose(this.deptList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.deptList = deptModel.parse(resp.body);
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
        R.deptManage.departmentUpdate(deptModel.dispose(this.deptList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('更新成功');
              this.deptList = deptModel.parse({});
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
