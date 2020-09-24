<template>
  <div>
    <header class="h-modal-header modal-title">新增类别</header>
    <Form ref="form" :label-width="100" :top="0.2" showErrorTip>
      <div class="ipt">
        <FormItem label="上级分组：" prop="datas">
          <Select v-model="categoryList.pid" class="select-demo" :datas="option"></Select>
        </FormItem>
        <FormItem label="类别名称：" prop="experienceClassificationName">
          <input type="text" v-model="categoryList.experienceClassificationName" />
        </FormItem>
      </div>
    </Form>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="submit">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
import experienceModel from 'model/repairExperience/repairExperienceModel';
import categoryModel from 'model/repairExperience/experienceCategoryModel';
export default {
  props: ['option'],
  data() {
    return {
      categoryList: categoryModel.parse({}),
      datas: []
    };
  },
  methods: {
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Loading();
        R.library.categoryAdd(categoryModel.dispose(this.categoryList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$emit('close');
              this.$Loading.close();
              this.$Message.success('保存成功');
              this.categoryList = categoryModel.parse({});
              this.$emit('getData');
            }, 1000);
          } else {
            this.$Message.error('保存失败');
            this.$emit('close');
            this.$Loading.close();
          }
        });
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>

</style>
