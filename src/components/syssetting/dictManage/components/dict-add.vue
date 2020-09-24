<template>
  <Modal v-model="addDict" :hasCloseIcon="hasCloseIcon" :hasDivider="hasDivider" :middle="true" :closeOnMask="false">
    <div slot="header" class="title">
      新增字典
      <i @click="close" class="h-icon-close"></i>
    </div>
    <div :labelPosition="labelPosition">
      <Form
        ref="form"
        :model="dictList"
        :label-width="110"
        :top="0.2"
        :rules="validationRules"
        showErrorTip
      >
        <FormItem label="字典名称：" prop="dictName">
          <input type="text" v-model="dictList.dictName" />
        </FormItem>
        <FormItem label="字典编号：" prop="dictCode">
          <input type="text" v-model="dictList.dictCode" />
        </FormItem>
        <FormItem label="备注：" prop="remarks">
          <RichTextEditor v-model="dictList.remarks"></RichTextEditor>
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
import dictModel from 'model/dictionary/dictItemModel';
export default {
  props: ['addDict'],
  data() {
    return {
      dictList: dictModel.parse({}),
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      validationRules: {
        required: ['dictName', 'dictCode']
      }
    };
  },
  mounted() {},
  methods: {
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Loading();
        R.dictManage.dictAdd(dictModel.dispose(this.dictList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('保存成功');
              this.dictList = dictModel.parse({});
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
