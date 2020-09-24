<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            部门名称：
            <input type="text" v-model="deptList.departmentName" />&nbsp;&nbsp;
            部门编号：
            <input type="text" v-model="deptList.departmentCode" />&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'deptManageadd'">新增</Button>
            <Button
              v-bg-color:#F0A024
              v-color:white
              style="border:1px solid #F0A024"
              icon="h-icon-inbox"
              @click="iptDept"
            >导入</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" :height="tableHeight" checkbox>
              <TableItem title="序号" prop="$serial" :width="30" align="center"></TableItem>
              <TableItem title="部门名称" prop="departmentName" align="left" :width="120" treeOpener></TableItem>
              <TableItem title="部门编号" prop="departmentCode" align="left" :width="80"></TableItem>
              <TableItem title="上级部门" prop="parentDepName" :width="100" align="left"></TableItem>
              <TableItem title="排序值" prop="sortValue" align="left" :width="80"></TableItem>
              <!-- <TableItem title="创建人" prop="creatorName" align="left" :width="100"></TableItem> -->
              <TableItem title="创建时间" prop="createTime" align="center" :width="100"></TableItem>
              <!-- <TableItem title="备注" prop="name"></TableItem> -->
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{data}">
                  <button
                    class="h-btn h-btn-s h-btn-blue"
                    @click="modify(data)"
                    v-has="'deptManageupdate'"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <button
                    class="h-btn h-btn-s h-btn-red"
                    @click="del(data)"
                    v-has="'deptManagedelete'"
                  >
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
    <AddDept :addDept="addDept" :department="department"></AddDept>
    <UpdateDept :updateDept="updateDept" :department="department" ref="update"></UpdateDept>
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
    <Modal v-model="importExcel" hasCloseIcon>
      <importExcel @close="importExcel=false" @getData="getData"></importExcel>
    </Modal>
  </div>
</template>

<script>
import { write } from 'fs';
import deptadd from './components/dept-add';
import deptupdate from './components/dept-update';
import deptModel from 'model/department/deptModel';
import importExcel from './import_excel';
export default {
  components: {
    AddDept: deptadd,
    UpdateDept: deptupdate,
    importExcel
  },
  data() {
    return {
      deptList: deptModel.parse({}),
      addDept: false,
      updateDept: false,
      department: [],
      datas: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      tableHeight: 0,
      oneData: {},
      deleteModal: false,
      importExcel: false
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
        if (e.keyCode === 13 && e.target.baseURI.match(/deptManage/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      this.deptList.page = this.pagination.page;
      this.deptList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.deptList.departmentName = '';
      this.deptList.departmentCode = '';
    },
    changePage() {
      this.deptList.page = this.pagination.page;
      this.deptList.size = this.pagination.size;
      this.getData();
    },
    close() {
      this.addDept = false;
      this.updateDept = false;
    },
    // 新增数据
    add() {
      this.addDept = true;
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.deptList.page = this.pagination.page;
      this.deptList.size = this.pagination.size;
      R.deptManage.departmentFindAll(deptModel.dispose(this.deptList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          setTimeout(() => {
            this.isLoading = false;
            this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 200;
            this.datas = resp.body;
            console.log(resp.body);
            this.pagination.page = resp.page;
            this.pagination.size = resp.size;
            this.pagination.total = resp.total;
          }, 500);
        }
      });
      R.deptManage.departmentFindAllDepartment(deptModel.dispose(this.deptList)).then(resp => {
        // console.log(resp.body)
        if (resp.ok) {
          this.department = resp.body;
        }
      });
    },
    // 修改数据
    update() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要修改的数据');
      } else {
        if (this.$refs.table.getSelection().length > 1) {
          this.$Message('修改仅支持单条数据');
        } else {
          this.$refs.update.getData(this.$refs.table.getSelection()[0].id);
          this.updateDept = true;
        }
      }
    },
    // 编辑数据
    modify(data) {
      this.updateDept = true;
      this.$refs.update.getData(data.id);
    },
    // 删除数据（可批量删除）
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        let ids = [];
        this.$Confirm('确定删除？', '删除')
          .then(() => {
            for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
              ids.push(this.$refs.table.getSelection()[i].id);
            }
            this.deptList.ids = ids.join(',');
            R.deptManage.departmentDelete(deptModel.dispose(this.deptList)).then(resp => {
              if (resp.ok) {
                this.$Message.success('数据刪除成功');
                setTimeout(() => {
                  this.getData();
                }, 2000);
              }
            });
          })
          .catch(() => {
            // this.$Message('取消');
          });
      }
    },
    // 逐条删除数据
    del(data) {
      this.oneData = data;
      this.deleteModal = true;
    },
    modalConfirm() {
      let ids = [];
      ids.push(this.oneData.id);
      this.deptList.ids = ids.join(',');
      R.deptManage.departmentDelete(deptModel.dispose(this.deptList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getData();
          }, 200);
        } else {
          this.deleteModal = false;
          this.$Message.error('删除失败');
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    // 折叠展开
    confirm() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要展开/折叠的数据');
      }
    },
    resetDatepicker() {
      this.$refs.datapicker.resetValid();
    },
    iptDept() {
      this.importExcel = true;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 30px - 61px);
  overflow: auto;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
