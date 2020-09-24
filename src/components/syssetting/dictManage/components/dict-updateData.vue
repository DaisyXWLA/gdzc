<template>
  <Modal
    v-model="updateDataDict"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      编辑数据
      <i @click="close" class="h-icon-close"></i>
    </div>
    <div :labelPosition="labelPosition">
      <Form
        ref="form"
        :model="dictDataList"
        :label-width="110"
        :top="0.2"
        :rules="validationRules"
        showErrorTip
      >
        <FormItem label="字典名称：" prop="dictId">
          <Select v-model="dictDataList.dictId" class="select-demo" :datas="DictName" :filterable="true"></Select>
        </FormItem>
        <FormItem label="字典标签：" prop="dictValueName">
          <input type="text" v-model="dictDataList.dictValueName" />
        </FormItem>
        <FormItem label="字典编号：" prop="dictValueCode">
          <input type="text" v-model="dictDataList.dictValueCode" />
        </FormItem>
        <FormItem label="字典排序：" prop="sortValue">
          <input type="text" v-model="dictDataList.sortValue" />
        </FormItem>
        <FormItem label="备注：" prop="remarks">
          <RichTextEditor v-model="dictDataList.remarks"></RichTextEditor>
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
import dictDataModel from 'model/dictionary/dictDataModel';
export default {
  props: ['updateDataDict', 'DictName'],
  data() {
    return {
      dictDataList: dictDataModel.parse({}),
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      validationRules: {
        required: ['dictId', 'dictValueName', 'dictValueCode', 'sortValue']
      },
      loading: false
    };
  },
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      this.dictDataList.id = id;
      R.dictManage.dictFindOne(dictDataModel.dispose(this.dictDataList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.loading = false;
          this.dictDataList.id = resp.body.id;
          this.dictDataList.dictId = resp.body.dictId;
          this.dictDataList.dictValueName = resp.body.dictValueName;
          this.dictDataList.dictValueCode = resp.body.dictValueCode;
          this.dictDataList.sortValue = resp.body.sortValue;
          this.dictDataList.remarks = resp.body.remarks;
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
        R.dictManage.dictAddValue(dictDataModel.dispose(this.dictDataList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('更新成功');
              this.dictDataList = dictDataModel.parse({});
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
