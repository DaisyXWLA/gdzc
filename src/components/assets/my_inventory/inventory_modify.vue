<template>
  <div>
    <header class="h-modal-header modal-title">编辑资产</header>
    <div>
      <Form ref="form" :label-width="60" :model="assetInventoryList">
        <FormItem label="使用部门" prop="useDepartment">
          <Select v-model="department" :datas="useDepartment" :autosize="true" :filterable="true"></Select>
        </FormItem>
        <FormItem label="使用人" prop="username">
          <Select v-model="user" :datas="userId" :autosize="true" :filterable="true"></Select>
        </FormItem>
        <FormItem label="存放地点" prop="storageLocation">
          <input type="text" v-model="location" />
        </FormItem>
      </Form>
      <Loading :loading="loading"></Loading>
    </div>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-blue" @click="submit">更新</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
import assetInventoryModel from 'model/Assets/AssetInventory';
import AssetsModel from 'model/Assets/Assets';
export default {
  props: ['inventoryData', 'modifyData', 'inventoryModify', 'useDepartment', 'userId'],
  data() {
    return {
      assetInventoryList: assetInventoryModel.parse({}),
      AssetsAdd: AssetsModel.parse({}),
      loading: false,
      department: '',
      user: '',
      location: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.department = this.modifyData.useDepartment;
      this.user = this.modifyData.useId;
      this.location = this.modifyData.storageLocation;
    },
    submit() {
      this.loading = true;
      this.assetInventoryList.inventoryId = this.inventoryData.id;
      this.assetInventoryList.id = this.modifyData.id;
      this.assetInventoryList.useDepartment = this.department;
      this.assetInventoryList.useId = this.user;
      this.assetInventoryList.storageLocation = this.location;
      R.Inventory.updateAssetsInfo(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.$Message.success('更新盘点信息成功');
          this.$emit('getAssets');
          this.$emit('close');
        }
      });
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
</style>
