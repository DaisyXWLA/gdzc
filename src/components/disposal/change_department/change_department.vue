<template>
  <div class="table-basic-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <h3 class="blue-color">变更信息</h3>
        <table>
          <tr>
            <td>变更人</td>
            <td style="width:30%;">
              <input type="text" v-model="test" />
            </td>
            <td>变更部门</td>
            <td>
              <Select
                v-model="datas"
                class="select-demo"
                :no-border="true"
                :autosize="true"
                placeholder="请选择部门"
                :datas="datas"
                style="width: 100%;"
              ></Select>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: '',
      datas: [],
      isLoading: false
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  margin-top: 2%;
  td {
    border: 1px solid #eee;
    // padding: 5px;
    input {
      width: 100%;
      border: none;
      outline: none;
    }
  }
}
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 15px);
  overflow: auto;
}
</style>
