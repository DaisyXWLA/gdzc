<template>
  <div>
    <header class="h-modal-header modal-title">编辑分组</header>
    <Form ref="form" :label-width="100" :top="0.2" showErrorTip>
      <div class="ipt">
        <FormItem label="分组名称：" prop="datas">
          <input type="text" v-model="setUpAdd.title" />
        </FormItem>
      </div>
    </Form>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="success">更新</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
import setUpModel from 'model/setUp/setUp';
export default {
  props: {
    fruit: String
  },
  data() {
    return {
      setUpAdd: setUpModel.parse({}),
      datas: [],
      id: this.fruit
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.setUpAdd.id = this.id;
      R.setUp.findOne(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.setUpAdd.title = resp.body.title;
        }
      });
    },
    success() {
      R.setUp.update(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.$Message.success(resp.body);
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
