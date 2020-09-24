<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            模块名称：
            <input type="text" v-model="moduleList.modelName" />&nbsp;&nbsp;
            模块编号：
            <input type="text" v-model="moduleList.modelCode" />&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add">新增</Button>
            <Button v-show="deleteBtn" color="red" icon="h-icon-trash" @click="remove">删除</Button>
            <!-- <Button v-color:white v-bg-color:#8b04e4 icon="h-icon-menu" @click="confirm">展开/折叠</Button> -->
            <div style="margin-top: 10px"></div>
            <Table
              ref="table"
              :datas="datas"
              :loading="isLoading"
              :height="tableHeight"
              @select="select"
              checkbox
            >
              <TableItem title="序号" prop="$serial" :width="30" align="center"></TableItem>
              <TableItem title="模块名称" prop="modelName" treeOpener :width="200"></TableItem>
              <TableItem title="模块编号" prop="modelCode" :width="100"></TableItem>
              <TableItem title="模块排行" prop="sortValue" :width="100"></TableItem>
              <TableItem title="模块地址" prop="modelUrl" :width="200"></TableItem>
              <!-- <TableItem title="备注" prop="name"></TableItem> -->
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{data}">
                  <button class="h-btn h-btn-s h-btn-blue" @click="modify(data)">
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <button class="h-btn h-btn-s h-btn-red" @click="del(data)">
                    <i class="h-icon-trash"></i>&nbsp;删除
                  </button>
                </template>
              </TableItem>
              <div slot="empty">暂时无数据</div>
            </Table>
            <p v-height="2"></p>
            <div>
              <Pagination
                v-if="pagination.total>0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>
          </div>
        </div>
      </Cell>
    </Row>
    <AddModule :addModule="addModule" :action="action" :modules="modules"></AddModule>
    <UpdateModule :updateModule="updateModule" :action="action" :modules="modules" ref="update"></UpdateModule>
    <Modal v-model="deleteModal">
      <div slot="header" class="title">删除</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定删除？
      </div>
      <div slot="footer">
        <Button color="primary" @click="modalConfirm">确定</Button>
        <Button @click="modalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import moduleModel from 'model/module/moduleModel';
import moduleadd from './components/module-add';
import moduleupdate from './components/module-update';
export default {
  components: {
    AddModule: moduleadd,
    UpdateModule: moduleupdate
  },
  data() {
    return {
      moduleList: moduleModel.parse({}),
      addModule: false,
      updateModule: false,
      datas: [],
      action: [],
      modules: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      tableHeight: 0,
      deleteBtn: false,
      deleteModal: false,
      oneData: {}
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    document.getElementById('app').style = 'min-width:1366px;overflow:auto';
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/moduleManage/)) {
          this.search();
        }
      };
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.moduleList.page = this.pagination.page;
      this.moduleList.size = this.pagination.size;
      R.moduleManage.moduleFindAll(moduleModel.dispose(this.moduleList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          setTimeout(() => {
            this.isLoading = false;
            this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 212;
            this.datas = resp.body;
            this.pagination.page = resp.page;
            this.pagination.size = resp.size;
            this.pagination.total = resp.total;
          }, 500);
        }
      });
      // 获取所有按钮
      R.moduleManage.moduleFindAllAction(moduleModel.dispose(this.moduleList)).then(resp => {
        if (resp.ok) {
          this.action = resp.body;
        }
      });
      // 获取所有模块
      R.moduleManage.moduleFindAllModule(moduleModel.dispose(this.moduleList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.modules = resp.body;
        }
      });
    },
    findAll() {
      this.moduleList.page = this.pagination.page;
      this.moduleList.size = this.pagination.size;
      R.moduleManage.moduleFindAll(moduleModel.dispose(this.moduleList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.total = resp.total;
        }
      });
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      this.moduleList.page = this.pagination.page;
      this.moduleList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.moduleList.modelName = '';
      this.moduleList.modelCode = '';
    },
    // 新增数据
    add() {
      this.addModule = true;
    },
    // 修改数据
    update() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要修改的数据');
      } else {
        if (this.$refs.table.getSelection().length > 1) {
          this.$Message('修改仅支持单条数据');
        } else {
          this.updateModule = true;
          this.$refs.update.getData(this.$refs.table.getSelection()[0].id);
        }
      }
    },
    // 编辑数据
    modify(data) {
      this.updateModule = true;
      this.$refs.update.getData(data.id);
    },
    // 删除数据（可批量删除）
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        this.deleteModal = true;
      }
    },
    // 逐条删除数据
    del(data) {
      this.oneData = data;
      this.deleteModal = true;
    },
    modalConfirm() {
      let ids = [];
      if (this.$refs.table.getSelection().length > 0) {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          ids.push(this.$refs.table.getSelection()[i].id);
        }
      } else {
        ids.push(this.oneData.id);
      }
      this.moduleList.ids = ids.join(',');
      R.moduleManage.moduleDelete(moduleModel.dispose(this.moduleList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.findAll();
          }, 200);
        } else {
          this.deleteModal = false;
          this.$Message.error('刪除失败');
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    changePage() {
      this.getData();
    },
    close() {
      this.addModule = false;
      this.updateModule = false;
    },
    // 折叠展开
    confirm() {
      // if (this.$refs.table.getSelection().length < 1) {
      //   this.$Message('请选择要展开/折叠的数据');
      // }
    },
    resetDatepicker() {
      this.$refs.datapicker.resetValid();
    },
    // 控制删除按钮
    select(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 30px - 61px);
  overflow: auto;
}
//下拉按钮样式
.h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
  padding: 5px 9px;
  border-radius: 4px;
  vertical-align: middle;
  border: 1px solid #8b04e4;
}
/deep/ .h-dropdowncustom-show-content {
  padding-right: 14px;
}
.modify {
  vertical-align: middle;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
