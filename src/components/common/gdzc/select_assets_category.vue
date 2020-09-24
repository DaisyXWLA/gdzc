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
.title {
  margin-bottom: 5px;
}
.category {
  padding: 10px;
  border: 1px solid #eee;
}
.tree {
  height: 60vh;
  overflow-y: auto;
}
</style>
<style lang="less">
.h-tree .h-search {
  position: absolute;
  z-index: 100;
}
.h-tree-body {
  top: 40px;
}
</style>

<template>
  <div class="tree">
    <Tree
      :option="param"
      ref="demo"
      :toggleOnSelect="toggleOnSelect"
      v-model="value"
      @select="selectCategory"
      :filterable="true"
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
      list: [],
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
                if (resp.ok) {
                  // this.$emit('getAssetsList');
                  let list = [];
                  list = resp.body;
                  resolve(list);
                }
              });
            }
          }, 100);
        }
      }
    };
  },
  mounted() {
    // this.getAssetsCategory();
  },
  methods: {
    // 获取国标分类数据
    // getAssetsCategory() {
    //   R.assetsCategory.tree().then(resp => {
    //     this.param.datas = resp.body;
    //   });
    // },
    // 获取树形菜单数据
    selectCategory(data) {
      // console.log(data)
      this.$emit('sendData', data);
    }
  }
};
</script>
1
