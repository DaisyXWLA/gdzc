<template>
  <Modal
    v-model="updateBtn"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      编辑按钮
      <i @click="close" class="h-icon-close"></i>
    </div>
    <div :labelPosition="labelPosition">
      <Form
        ref="form"
        :model="btnList"
        :label-width="110"
        :top="0.2"
        :rules="validationRules"
        showErrorTip
      >
        <FormItem label="按钮分组：" prop="actionGroup">
          <Select v-model="btnList.actionGroup" class="select-demo" :datas="btnGroup"></Select>
        </FormItem>
        <FormItem label="按钮名称：" prop="actionName">
          <input type="text" v-model="btnList.actionName" />
        </FormItem>
        <FormItem label="按钮编码：" prop="actionCode">
          <input type="text" v-model="btnList.actionCode" />
        </FormItem>
        <FormItem label="按钮排序：" prop="sortValue">
          <input type="text" v-model="btnList.sortValue" />
        </FormItem>
        <FormItem label="按钮描述：" prop="remarks">
          <RichTextEditor v-model="btnList.remarks"></RichTextEditor>
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
import btnModel from 'model/button/buttonModel';
export default {
  props: ['updateBtn', 'btnGroup'],
  data() {
    return {
      btnList: btnModel.parse({}),
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      validationRules: {
        required: ['actionGroup', 'actionName', 'actionCode']
      },
      loading: false
    };
  },
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      this.btnList.id = id;
      R.buttonManage.buttonFindOne(btnModel.dispose(this.btnList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.btnList = btnModel.parse(resp.body);
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
        R.buttonManage.buttonUpdate(btnModel.dispose(this.btnList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('更新成功');
              this.btnList = btnModel.parse({});
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
