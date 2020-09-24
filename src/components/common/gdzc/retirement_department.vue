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
.tree {
  height: 60vh;
  overflow-y: auto;
}
</style>

<template>
  <div class="tree">
    <Tree
      :option="param"
      ref="demo"
      :toggleOnSelect="toggleOnSelect"
      v-model="value"
      @select="selectDepartment"
      :filterable="true"
    ></Tree>
  </div>
</template>
<script>
import useReturnModel from 'model/useReturn/useReturnModel';
import utils from 'hey-utils';
export default {
  data() {
    return {
      useReturnList: useReturnModel.parse({}),
      toggleOnSelect: true,
      value: null,
      param: {
        keyName: 'id',
        parentName: 'parentId',
        titleName: 'username',
        dataMode: 'list',
        // datas: []
        getTotalDatas: resolve => {
          setTimeout(() => {
            R.pullDownList.findDepartmentAndUser(useReturnModel.dispose(this.useReturnList)).then(resp => {
              if (resp.ok) {
                let list = resp.body;
                resolve(list);
              }
            });
          }, 200);
        }
      }
    };
  },
  mounted() {
    // this.getDepartment();
  },
  methods: {
    // getDepartment() {
    //   R.pullDownList.findDepartmentAndUser(useReturnModel.dispose(this.useReturnList)).then(resp => {
    //     if (resp.ok) {
    //       this.param.datas = resp.body;
    //       this.$emit('getAssetsList');
    //     }
    //   });
    // },
    selectDepartment(data) {
      // console.log(data.id);
      this.$emit('sendData', data.id);
    }
  }
};
</script>
