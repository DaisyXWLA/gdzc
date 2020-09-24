<template>
  <Modal
    v-model="addModule"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      新增模块
      <i @click="close" class="h-icon-close"></i>
    </div>

    <div :labelPosition="labelPosition">
      <Form
        ref="form"
        :model="moduleList"
        :label-width="110"
        :top="0.2"
        :rules="validationRules"
        showErrorTip
      >
        <FormItem label="所属模块：" prop="pid">
          <Select v-model="moduleList.pid" :datas="modules" :filterable="true"></Select>
        </FormItem>
        <FormItem label="模块名称：" prop="modelName">
          <input type="text" v-model="moduleList.modelName" />
        </FormItem>
        <FormItem label="模块编号：" prop="modelCode">
          <input type="text" v-model="moduleList.modelCode" />
        </FormItem>
        <FormItem label="模块排行：" prop="sortValue">
          <input type="text" v-model="moduleList.sortValue" />
        </FormItem>
        <FormItem label="模块地址：" prop="modelUrl">
          <input type="text" v-model="moduleList.modelUrl" />
        </FormItem>
        <FormItem label="关联按钮：" prop="actionIds">
          <Select v-model="moduleList.actionIds" :datas="action" :multiple="true"></Select>
        </FormItem>
        <FormItem label="备注：" prop="taginputsData">
          <RichTextEditor></RichTextEditor>
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
import moduleModel from 'model/module/moduleModel';
export default {
  props: ['addModule', 'action', 'modules'],
  data() {
    return {
      moduleList: moduleModel.parse({}),
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      validationRules: {
        required: ['modelName', 'modelCode', 'sortValue', 'actionIds']
      }
    };
  },
  mounted() {},
  methods: {
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Loading();
        R.moduleManage.moduleAdd(moduleModel.dispose(this.moduleList)).then(resp => {
          // console.log(resp)
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('保存成功');
              this.moduleList = moduleModel.parse({});
              this.$parent.findAll();
            }, 1000);
          } else {
            this.$Message.error(resp.msg);
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
