<style lang="less" scoped>
.modal-title {
  margin: 0;
}
.title {
  overflow: hidden;
  .h-icon-close {
    float: right;
    line-height: 40px;
    padding-right: 15px;
  }
}
</style>
<template>
  <div>
    <Modal v-model="selectAssets" hasDivider :closeOnMask="closeOnMask" :middle="true">
      <div slot="header" class="title">
        选择资产
        <i @click="close" class="h-icon-close"></i>
      </div>
      <div>
        <Row>
          <Cell :width="6">
            <div class="h-panel">
              <div class="h-panel-body">
                <Radio v-model="value" :datas="treeParams" @change="change"></Radio>
                <component
                  :is="treeComponentName"
                  @sendData="getCategoryData"
                  @getAssetsList="getAssetsList"
                ></component>
              </div>
            </div>
          </Cell>
          <Cell :width="18">
            <assetsList ref="selectData" :value="value"></assetsList>
          </Cell>
        </Row>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="submit">保存</button>
        <button class="h-btn" @click="close">取消</button>
      </div>
    </Modal>
  </div>
</template>
<script>
import assetsCategory from '../../../common/gdzc/select_assets_category';
import department from '../../../common/gdzc/retirement_department';
import assetsList from './assets_list';
import ScrappedModel from 'model/scrapped/scrapped';
export default {
  props: ['selectAssets'],
  components: {
    assetsCategory, // 国标分类
    assetsList, // 资产列表
    department
  },
  data() {
    return {
      ScrappedList: ScrappedModel.parse({}),
      treeComponentName: 'department',
      selectAssetsComponent: this.selectAssets,
      closeOnMask: false,
      selectAssetsIds: '',
      value: '1',
      treeParams: [
        { title: '资产分类', key: '1' },
        { title: '使用部门/人', key: '2' }
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
        this.ScrappedList.ids = this.$refs['selectData'].select();
        R.Scrapped.ScrappedSelectAssetsConfirm(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
          if (resp.ok) {
            this.$emit('close');
            this.$Loading.close();
            this.$Message.success('保存成功');
            this.ScrappedList = ScrappedModel.parse({});
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
      // console.log(data)
      if (typeof data == 'string') {
        this.$refs.selectData.searchUseCategory(data);
      } else if (typeof data == 'object') {
        this.$refs.selectData.searchUseCategory(data.code);
      }
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
      this.$refs.selectData.searchUseCategory();
    },
    // 获取资产list数据
    getAssetsList() {
      this.$refs.selectData.getData();
    }
  }
};
</script>
