<style lang="less" scoped>
.tree4-demo-vue {
  .h-tree-show {
    .h-tree-show-desc {
      display: none;
    }
    .tree-show-custom {
      display: inline;
      .tree-show-title {
        font-size: 13px;
      }
    }
    .tree-edit-part {
      position: absolute;
      right: 5px;
      top: 2px;
      opacity: 0;
      i {
        font-size: 12px;
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          color: @primary-color;
        }
      }
    }
    &:hover {
      .tree-edit-part {
        opacity: 1;
      }
    }
  }
}
/deep/ .h-tree-body {
  max-height: 65vh;
  overflow-y: auto;
}
</style>

<template>
  <div style="width:100%!important">
    <!-- <div class="title">国标分类</div> -->
    <Tree
      :option="param"
      ref="demo"
      :toggleOnSelect="toggleOnSelect"
      v-model="value"
      @select="select"
      :filterable="filterable"
    ></Tree>
  </div>
</template>
<script>
import Bus from '../../../js/common/bus'; // 公共vue实例
import utils from 'hey-utils';
import categoryModel from 'model/Approval/Approval';
export default {
  data() {
    return {
      categoryList: categoryModel.parse({}),
      toggleOnSelect: true,
      value: null,
      filterable: true,
      param: {
        keyName: 'id',
        parentName: 'assetsCategory',
        titleName: 'categoryName',
        dataMode: 'list',
        // datas: []
        getDatas: (parent, resolve) => {
          setTimeout(() => {
            if (!parent) {
              resolve([{ id: '22569', categoryName: '固定资产', code: '1' }]);
            } else {
              this.categoryList.id = parent.id;
              R.assetsCategory.treeById(categoryModel.dispose(this.categoryList)).then(resp => {
                let list = [];
                list = resp.body;
                resolve(list);
              });
            }
          }, 100);
        }
      }
    };
  },
  mounted() {
    // this.sendDataToParent();
    this.getAssetsCategory();
  },
  methods: {
    // 获取国标分类数据
    getAssetsCategory() {
      R.assetsCategory.tree().then(resp => {
        this.param.datas = resp.body;
        Utils.saveLocal('CategoryValue', resp.body);
        // console.log(resp);
      });
    },
    // 获取树形菜单数据
    select(data) {
      if (data.children) {

      } else {
        // 向兄弟组件传递数据
        Bus.$emit('send-data', data);
        // 向父组件传递数据
        this.$emit('categorySendToParent', data.code);
        console.log(data.code);
        this.$emit('categorySendName', data);
      }
    },
    setValue(data) {
      this.filterable = false;
      let xx = JSON.parse(Utils.getLocal('CategoryValue'));
      xx.forEach(e => {
        if (e.code == data) {
          this.$refs.demo.updateSelect(e.id);
          this.$refs.demo.refresh();
        }
      });
    }
    // //向父组件传递数据
    // sendDataToParent(){
    //   this.$emit('categorySendToParent',this.getCategoryId);
    // },
    // choose(data) {
    //   log(data);
    // },
    // select(data) {
    //   log(data);
    // },
    //  open(data) {
    //   log(data);
    // }
  }
};
</script>
