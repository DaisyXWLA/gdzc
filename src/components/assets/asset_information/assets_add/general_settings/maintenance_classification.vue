<style lang="less" scoped>
.tree4-demo-vue {
  /deep/ .h-tree-show {
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
        // &:hover {
        //   // color: @primary-color;
        // }
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
  height: 40vh;
  overflow-y: auto;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
<template>
  <div v-width="600">
    <header class="h-modal-header modal-title">分类设置</header>
    <div class="h-panel">
      <div class="h-panel-body">
        <Row :space="20">
          <Cell :width="12">
            <p class="title">可选分类</p>
            <assetsCategory @categorySendName="categorySendName"></assetsCategory>
          </Cell>
          <Cell :width="12">
            <div class="tree4-demo-vue">
              <p class="title">已选分类</p>
              <Tree
                :option="param"
                ref="demo"
                :filterable="true"
                selectOnClick
                class="h-tree-theme-row-selected"
                style="margin-top: 5px;"
              >
                <template slot="item" slot-scope="{item}">
                  <div class="tree-show-custom">
                    <span class="tree-show-title" v-if="!item.editing">{{item.title}}</span>
                    <input
                      v-else
                      type="text"
                      v-model="item.editValue"
                      @blur="updateValue(item)"
                      @keyup.enter="updateValue(item)"
                    />
                    <span class="tree-edit-part" v-if="item.remarks=='1'">
                      <i class="h-icon-trash" @click.stop="remove(item)"></i>
                    </span>
                    <!-- <span class="tree-edit-part" v-if="!item.editing">
                      <i class="h-icon-trash" @click.stop="remove(item)"></i>
                    </span>-->
                  </div>
                </template>
              </Tree>
            </div>
          </Cell>
        </Row>
      </div>
    </div>
    <footer class="h-modal-footer">
      <button class="h-btn" @click="close">关闭</button>
    </footer>
    <Modal v-model="deleteCategory">
      <div slot="header" class="title">删除</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定删除？
      </div>
      <div slot="footer">
        <Button color="primary" @click="categoryConfirm">确定</Button>
        <Button @click="categoryClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import assetsCategory from './assets_category';
import setUpModel from 'model/setUp/setUp';
export default {
  props: {
    fruit: String
  },
  components: {
    assetsCategory
  },
  data() {
    return {
      setUpAdd: setUpModel.parse({}),
      id: this.fruit,
      param: {
        keyName: 'id',
        parentName: 'parent',
        titleName: 'title',
        dataMode: 'list',
        datas: []
      },
      isLoading: false,
      deleteCategory: false,
      selectCategory: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    categorySendName(data) {
      this.setUpAdd.pid = this.id;
      this.setUpAdd.id = '';
      this.setUpAdd.code = data.code;
      this.setUpAdd.codeName = data.categoryName;
      R.setUp.saveCodeAndName(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          if (resp.body == '1') {
          } else {
            this.$Message.success('添加成功');
            this.getData();
            this.$emit('getData', this.id);
          }
        }
      });
    },
    close() {
      this.$emit('close');
    },
    getData() {
      this.setUpAdd.id = this.id;
      R.setUp.findAssetsInfoAll(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.param.datas = resp.body;
        }
      });
    },
    remove(item) {
      this.deleteCategory = true;
      this.selectCategory = item;
    },
    categoryConfirm() {
      this.setUpAdd.code = this.selectCategory.code;
      R.setUp.deleteByCode(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.$refs.demo.removeTreeItem(this.selectCategory.id);
          this.$emit('getData', this.id);
          this.deleteCategory = false;
        }
      });
    },
    categoryClose() {
      this.deleteCategory = false;
    }
  }
};
</script>
