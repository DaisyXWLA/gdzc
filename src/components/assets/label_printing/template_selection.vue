<template>
  <div>
    <!-- <header class="h-modal-header">切换标签</header> -->
    <Row>
      <Cell :width="24">
        <div class="h-panel">
          <div class="h-panel-body">
            <Cell :width="24">
              <label>切换模板：</label>
              <Select v-model="datas" :datas="datas" keyName="code" titleName="name" :autosize="true" style="width: 50%;"></Select>
              <Button color="blue" v-print="'#print'">打印</Button>
            </Cell>
            <Cell :width="24">
              <div id="print"></div>
            </Cell>
          </div>
        </div>
      </Cell>
    </Row>
    <footer class="h-modal-footer">
      <button class="h-btn" @click="close">取消</button>
      <button class="h-btn h-btn-primary" @click="success">确定</button>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datas: []
    };
  },
  methods: {
    success() {
      this.$emit('success', this.value);
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
