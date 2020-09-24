<style lang="less" scoped>
.modal-title {
  margin: 0;
}

</style>
<template>
  <div>
    <Modal v-model="selectAssets" hasDivider :closeOnMask="closeOnMask" :middle="true" >
      <div slot="header" class="title">选择资产<i @click="close" class="h-icon-close"></i></div>
      <div style="width:1200px;">
        <Row :space="20">
          <Cell :width="6">
            <div class="h-panel">
              <div class="h-panel-body">
                <Radio v-model="value" :datas="treeParams" @change="change"></Radio>
                <component  :is="treeComponentName" @sendData="getCategoryData"></component>
              </div>
            </div>
          </Cell>
          <Cell :width="18">
            <assetsList ref="selectData"></assetsList>
          </Cell>
        </Row>
      </div>
      <div slot="footer">
        <button class="h-btn" @click="close">取消</button>
        <button class="h-btn h-btn-primary" @click="submit">确定</button>
      </div>
    </Modal>
  </div>
</template>
<script>
import assetsCategory from '../../../common/gdzc/select_assets_category';
import department from '../../../common/gdzc/department';
import assetsList from './assets_list';
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
export default {
  props: ['selectAssets'],
  components: {
    assetsCategory, // 国标分类
    assetsList, // 资产列表
    department
  },
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      treeComponentName: 'department',
      selectAssetsComponent: this.selectAssets,
      closeOnMask: false,
      selectAssetsIds: '',
      value: '1',
      treeParams: [
        { title: '资产分类', key: '1' },
        { title: '使用部门', key: '2' }
      ]
    };
  },
  mounted() {
    this.treeComponentName = 'assetsCategory';
  },
  methods: {
    submit() {
      if (this.$refs['selectData'].select().length < 1) {
        this.$Message('请选择资产');
      } else {
        this.$emit('selectIds', this.$refs['selectData'].select());
        this.assetsRepairList.ids = this.$refs['selectData'].select();
        R.assetsRepair.clickConfirm(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
          if (resp.ok) {
            this.$emit('close');
            this.$Loading.close();
            this.$Message.success('保存成功');
            this.assetsRepairList = assetsRepairModel.parse({});
            this.$emit('getData');
          } else {
            this.$Message.error('保存失败');
            this.$emit('close');
            this.$Loading.close();
          }
        });
      }
    },
    // 获取左侧分类数据
    getCategoryData(data) {
      this.$refs.selectData.searchUseCategory(data);
    },
    close() {
      this.$emit('close');
    },
    change(data) {
      if (data.key == 1) {
        this.treeComponentName = 'assetsCategory';
      } else {
        this.treeComponentName = 'department';
      }
    }
  }
};
</script>
