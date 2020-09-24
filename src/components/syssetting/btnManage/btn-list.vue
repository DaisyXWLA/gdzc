<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            按钮名称：
            <input type="text" v-model="btnGroupList.groupName" />&nbsp;&nbsp;
            按钮代码：
            <input type="text" v-model="btnGroupList.actionCode" />&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="addGroup">新增分组</Button>
            <Button color="blue" icon="h-icon-plus" @click="add">新增按钮</Button>
            <Button v-show="deleteBtn" color="red" icon="h-icon-trash" @click="remove">删除</Button>
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
              <TableItem title="按钮分组/按钮名称" prop="groupName" treeOpener :width="120"></TableItem>
              <TableItem title="按钮代码" prop="actionCode" :width="100"></TableItem>
              <TableItem title="按钮排序" prop="sortValue" :width="100"></TableItem>
              <TableItem title="按钮描述" :width="300">
                <template slot-scope="{data}">
                  <span v-html="data.remarks"></span>
                </template>
              </TableItem>
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
    <AddBtn :addBtn="addBtn" :btnGroup="btnGroup"></AddBtn>
    <AddBtnGroup :addBtnGroup="addBtnGroup" :btnGroup="btnGroup"></AddBtnGroup>
    <UpdateBtn :updateBtn="updateBtn" :btnGroup="btnGroup" ref="update"></UpdateBtn>
    <UpdateBtnGroup :updateBtnGroup="updateBtnGroup" :btnGroup="btnGroup" ref="updateGroup"></UpdateBtnGroup>
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
import btnModel from 'model/button/buttonModel';
import btnGroupModel from 'model/button/buttonGroupModel';
import btnadd from './components/btn-add';
import btnaddGroup from './components/btn-addGroup';
import btnupdate from './components/btn-update';
import btnupdateGroup from './components/btn-updateGroup';
export default {
  components: {
    AddBtn: btnadd,
    AddBtnGroup: btnaddGroup,
    UpdateBtn: btnupdate,
    UpdateBtnGroup: btnupdateGroup
  },
  data() {
    return {
      btnList: btnModel.parse({}),
      btnGroupList: btnGroupModel.parse({}),
      addBtn: false,
      addBtnGroup: false,
      updateBtn: false,
      updateBtnGroup: false,
      datas: [],
      btnGroup: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      tableHeight: 0,
      deleteBtn: false,
      oneData: {},
      deleteModal: false
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/btnManage/)) {
          this.search();
        }
      };
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.btnGroupList.page = this.pagination.page;
      this.btnGroupList.size = this.pagination.size;
      R.buttonManage.buttonFindAll(btnGroupModel.dispose(this.btnGroupList)).then(resp => {
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
      R.buttonManage.buttonFindAllGroup(btnGroupModel.dispose(this.btnGroupList)).then(resp => {
        if (resp.ok) {
          this.btnGroup = resp.body;
        }
      });
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      this.btnGroupList.page = this.pagination.page;
      this.btnGroupList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.btnGroupList.groupName = '';
      this.btnGroupList.actionCode = '';
    },
    // 新增按钮
    add() {
      this.addBtn = true;
    },
    // 按钮分组
    addGroup() {
      this.addBtnGroup = true;
    },
    // 修改
    update() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要修改的按钮');
      } else {
        if (this.$refs.table.getSelection().length > 1) {
          this.$Message('修改仅支持单条按钮');
        } else {
          if (this.$refs.table.getSelection()[0].children) {
            this.updateBtnGroup = true;
            this.$refs.updateGroup.getData(this.$refs.table.getSelection()[0].id);
          } else {
            this.updateBtn = true;
            this.$refs.update.getData(this.$refs.table.getSelection()[0].id);
          }
        }
      }
    },
    // 编辑
    modify(data) {
      if (data.children) {
        this.updateBtnGroup = true;
        this.$refs.updateGroup.getData(data.id);
      } else {
        this.updateBtn = true;
        this.$refs.update.getData(data.id);
      }
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
      this.btnGroupList.ids = ids.join(',');
      R.buttonManage.buttonDelete(btnGroupModel.dispose(this.btnGroupList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getData();
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
      this.addBtn = false;
      this.addBtnGroup = false;
      this.updateBtn = false;
      this.updateBtnGroup = false;
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
