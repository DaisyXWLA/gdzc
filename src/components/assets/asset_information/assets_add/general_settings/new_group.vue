<template>
  <div>
    <header class="h-modal-header modal-title">新建分组</header>
    <Form ref="form" :label-width="100" :top="0.2" showErrorTip>
      <div class="ipt">
        <FormItem label="分组名称：" prop="datas">
          <input type="text" v-model="setUpAdd.title" />
        </FormItem>
      </div>
    </Form>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="success">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
import setUpModel from 'model/setUp/setUp';
export default {
  data() {
    return {
      setUpAdd: setUpModel.parse({}),
      datas: []
    };
  },
  methods: {
    success() {
      R.setUp.save(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.$Message.success('保存成功');
          this.$emit('getData');
        }
      });
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
.ipt {
  margin-top: 10%;
}
</style>
