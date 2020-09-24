<template>
  <Modal
    v-model="addBtnGroup"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      新增分组
      <i @click="close" class="h-icon-close"></i>
    </div>

    <div :labelPosition="labelPosition">
      <Form
        ref="form"
        :model="btnGroupList"
        :label-width="110"
        :top="0.2"
        :rules="validationRules"
        showErrorTip
      >
        <FormItem label="上级分组：" prop="actionGroup">
          <Select v-model="btnGroupList.actionGroup" class="select-demo" :datas="btnGroup"></Select>
        </FormItem>
        <FormItem label="分组名称：" prop="groupName">
          <input type="text" v-model="btnGroupList.groupName" />
        </FormItem>
        <!-- <FormItem label="分组代码：" prop="actionCode">
          <input type="text" v-model="btnGroupList.actionCode" />
        </FormItem>-->
        <FormItem label="分组排序：" prop="sortValue">
          <input type="text" v-model="btnGroupList.sortValue" />
        </FormItem>
        <FormItem label="分组描述：" prop="remarks">
          <RichTextEditor v-model="btnGroupList.remarks"></RichTextEditor>
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
import btnGroupModel from 'model/button/buttonGroupModel';
export default {
  props: ['addBtnGroup', 'btnGroup'],
  data() {
    return {
      btnGroupList: btnGroupModel.parse({}),
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      validationRules: {
        required: ['groupName', 'sortValue']
      }
    };
  },
  mounted() {},
  methods: {
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Loading();
        R.buttonManage.buttonAddGroup(btnGroupModel.dispose(this.btnGroupList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('保存成功');
              this.btnGroupList = btnGroupModel.parse({});
              this.$parent.getData();
            }, 1000);
          } else {
            this.$Message.error('保存失败');
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
