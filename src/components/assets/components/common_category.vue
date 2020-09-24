<template>
  <div>
    <div class="h-panel">
      <div class="h-panel-body">
        <Row>
          <Cell :width="18">
            <i class="icon-layers blue-color" style="padding-left:20px;" v-font="20"></i>&nbsp;&nbsp;
            <span v-font="18" class="blue-color">请点击下方常用资产名称，或点击左侧资产国标分类</span>
          </Cell>
          <Cell :width="6" align="right">
            <Button color="blue" icon="h-icon-setting" @click="generalSettings=true">设置</Button>
            <Button
              color="yellow"
              icon="h-icon-refresh"
              style="margin-right:20px;"
              @click="reset"
            >重置</Button>
          </Cell>
        </Row>
        <Modal v-model="generalSettings" hasCloseIcon hasDivider>
          <generalSettings @close="generalSettings=false" @getData="getData"></generalSettings>
        </Modal>
        <div style="border-bottom: 2px solid #eee;margin:10px 20px"></div>
        <div class="categoryList">
          <div
            style="border-bottom: 1px solid #eee;margin:0 20px;font-size: 20px;padding: 10px 0;"
            v-for="(d,i) of List"
            :key="i"
          >
            {{ d.title }}
            <div
              style="display:inline-block;margin:0 10px"
              v-for="(f,i) of d.assetsUsedEntities"
              :key="i"
            >
              <Button text-color="primary" @click="add(f.code,f.codeName)">{{f.codeName}}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="deleteModal">
      <header class="h-modal-header modal-title">重置</header>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定重置常用设置？
      </div>
      <div slot="footer">
        <Button color="primary" @click="deleteModalConfirm">确定</Button>
        <Button @click="deleteModalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import generalSettings from '../asset_information/assets_add/general_settings/general_settings';
export default {
  components: {
    generalSettings // 通用设置
  },
  data() {
    return {
      generalSettings: false,
      List: [],
      deleteModal: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      R.setUp.findCommonInfo().then(resp => {
        if (resp.ok) {
          this.List = resp.body;
        }
      });
    },
    add(data, datas) {
      let category = { code: data, categoryName: datas };
      this.$emit('categorySendName', category);
      setTimeout(() => {
        this.$emit('getDataFromCategory', data);
      }, 1000);
    },
    // 重置
    reset() {
      if (this.List.length > 0) {
        this.deleteModal = true;
      }
    },
    deleteModalConfirm() {
      R.setUp.deleteAll().then(resp => {
        if (resp.ok) {
          this.$Message.success('重置成功');
          this.getData();
          this.deleteModal = false;
        }
      });
    },
    deleteModalClose() {
      this.deleteModal = false;
    }
  }
};
</script>
<style lang="less" scoped>
.assets-add-title {
  border-bottom: 1px solid #000;
}
.categoryList {
  max-height: calc(100vh - 60px - 45px - 50px - 110px);
  overflow: auto;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
