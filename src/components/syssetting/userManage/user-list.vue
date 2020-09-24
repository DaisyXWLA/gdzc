<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            登录名称：
            <input type="text" v-model="userList.loginName" v-wordlimit="50" />&nbsp;&nbsp; 用户姓名：
            <input type="text" v-model="userList.realName" v-wordlimit="50" />&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'userManageadd'">新增</Button>
            <Button
              v-bg-color:#F0A024
              v-color:white
              style="border:1px solid #F0A024"
              icon="h-icon-inbox"
              @click="iptUser"
            >导入</Button>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'userManagedelete'"
            >删除</Button>
            <div style="margin-top: 10px"></div>
            <Table
              ref="table"
              :datas="datas"
              :loading="isLoading"
              :height="tableHeight"
              @select="select"
              checkbox
            >
              <TableItem title="序号" prop="$serial" :width="30" align="center" fixed="left"></TableItem>
              <TableItem title="登录名称" prop="loginName" :width="100" align="left" fixed="left"></TableItem>
              <TableItem title="用户姓名" prop="realName" :width="100" align="left" fixed="left"></TableItem>
              <TableItem title="部门" prop="departmentName" :width="150" align="left"></TableItem>
              <TableItem title="角色" prop="roleName" :width="150" align="left"></TableItem>
              <TableItem title="考勤编号" prop="enrollNumber" :width="80" align="left"></TableItem>
              <TableItem title="手机" prop="phoneNumber" :width="150" align="center"></TableItem>
              <TableItem title="邮箱" prop="email" :width="150" align="left"></TableItem>
              <TableItem title="创建时间" prop="createTime" :width="130" align="center"></TableItem>
              <TableItem title="用户状态" align="center" :width="100">
                <template slot-scope="{ data }">
                  <h-switch v-model="data.isOnline" disabled>
                    <span slot="open">在线</span>
                    <span slot="close">离线</span>
                  </h-switch>
                </template>
              </TableItem>
              <TableItem title="用户锁定" align="center" :width="100">
                <template slot-scope="{ data }">
                  <h-switch v-model="data.isLocked" disabled>
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </h-switch>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150" fixed="right">
                <template slot-scope="{ data }">
                  <button
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'userManageupdate'"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <DropdownMenu
                    button
                    v-color:white
                    v-bg-color:#ab51e6
                    @click="trigger"
                    @show="getOneData(data)"
                    :datas="param"
                  >更多</DropdownMenu>
                </template>
              </TableItem>
              <div slot="empty">暂时无数据</div>
            </Table>
            <p v-height="2"></p>
            <div>
              <Pagination
                v-if="pagination.total > 0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>
          </div>
        </div>
      </Cell>
    </Row>
    <AddUser :addUser="addUser" :department="department" :role="role"></AddUser>
    <UpdateUser :updateUser="updateUser" :department="department" :role="role" ref="update"></UpdateUser>
    <Reset :reseteUser="reseteUser" ref="reset"></Reset>
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
// import { write } from 'fs';
import useradd from './components/user-add';
import userupdate from './components/user-update';
import userreset from './components/user-reset';
import userModel from 'model/user/userModel';
import importExcel from './import_excel';
export default {
  components: {
    AddUser: useradd,
    UpdateUser: userupdate,
    Reset: userreset,
    importExcel
  },
  data() {
    return {
      userList: userModel.parse({}),
      addUser: false,
      updateUser: false,
      reseteUser: false,
      datas: [],
      department: [],
      role: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      tableHeight: 0,
      deleteBtn: false,
      oneData: {},
      param: [
        { title: '编辑', key: 'modify' },
        { title: '重置', key: 'reset' },
        { title: '删除', key: 'delete' }
      ],
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
    this.$nextTick(() => {
      document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-header-left').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-left').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
    });
    document.addEventListener('scroll', this.winScroll, true);
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/userManage/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      this.userList.page = this.pagination.page;
      this.userList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.userList.loginName = '';
      this.userList.realName = '';
    },
    changePage() {
      this.getData();
    },
    close() {
      this.addUser = false;
      this.updateUser = false;
      this.reseteUser = false;
    },
    // 重置密码
    resetPassword(data) {
      this.reseteUser = true;
      this.$refs.reset.getData(data.id);
    },
    // 新增数据
    add() {
      this.addUser = true;
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.userList.page = this.pagination.page;
      this.userList.size = this.pagination.size;
      R.userManage.userFindAll(userModel.dispose(this.userList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          setTimeout(() => {
            this.isLoading = false;
            this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 200;
            this.datas = resp.body;
            this.pagination.page = resp.page;
            this.pagination.size = resp.size;
            this.pagination.total = resp.total;
          }, 500);
        }
      });
      R.userManage.userFindAllDepartment(userModel.dispose(this.userList)).then(resp => {
        // console.log(resp.body)
        if (resp.ok) {
          this.department = resp.body;
        }
      });
      R.userManage.userFindAllRole(userModel.dispose(this.userList)).then(resp => {
        // console.log(resp.body)
        if (resp.ok) {
          this.role = resp.body;
        }
      });
    },
    // 编辑数据
    modify(data) {
      this.$refs.update.getData(data.id);
      this.updateUser = true;
    },
    // 删除数据（可批量删除）
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        this.deleteModal = true;
      }
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
      this.userList.ids = ids.join(',');
      R.userManage.userDelete(userModel.dispose(this.userList)).then(resp => {
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
    // 控制删除按钮
    select(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
    },
    trigger(data) {
      if (data == 'modify') {
        this.$refs.update.getData(this.oneData.id);
        this.updateUser = true;
      } else if (data == 'reset') {
        this.$refs.reset.getData(this.oneData.id);
        this.reseteUser = true;
      } else if (data == 'delete') {
        this.deleteModal = true;
      }
    },
    getOneData(data) {
      this.oneData = data;
    },
    iptUser() {
      this.importExcel = true;
    },
    winScroll() {
      if (document.querySelector('.h-table-body').scrollLeft == 0) {
        document.querySelector('.h-table-fixed-header-left').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
        document.querySelector('.h-table-fixed-left').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
      } else if (
        document.querySelector('.h-table-body').scrollLeft > 0 &&
        document.querySelector('.h-table-body').scrollLeft <
          document.querySelector('.h-table-body').scrollWidth - document.querySelector('.h-table-body').clientWidth
      ) {
        document.querySelector('.h-table-fixed-header-left').style.boxShadow = '2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-left').style.boxShadow = '2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
      } else if (
        document.querySelector('.h-table-body').scrollLeft ==
        document.querySelector('.h-table-body').scrollWidth - document.querySelector('.h-table-body').clientWidth
      ) {
        document.querySelector('.h-table-fixed-header-left').style.boxShadow = '2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-left').style.boxShadow = '2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
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
}
/deep/ .h-dropdowncustom-show-content {
  padding-right: 14px;
}
/deep/ .h-dropdowncustom.h-btn {
  border-color: #ab51e6;
  vertical-align: top;
  &:hover {
    border-color: rgba(171, 81, 230, 0.8) !important;
    background-color: rgba(171, 81, 230, 0.8) !important;
  }
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
