<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            角色名称：
            <input
              type="text"
              v-model="roleList.roleName"
              @keyup.enter="searchEnterFun($event)"
            />&nbsp;&nbsp;
            角色代码：
            <input type="text" v-model="roleList.roleCode" @keyup.enter="searchEnterFun($event)"/>&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <!-- <Button color="blue" icon="h-icon-plus" @click="add" v-has="'roleManageadd'">新增角色</Button> -->
            <Button color="blue" icon="h-icon-plus" @click="add">新增</Button>
            <Button
              class="allot"
              v-color:white
              v-bg-color:#ab51e6
              icon="h-icon-plus"
              @click="distributeUser"
              v-has="'roleManageallot'"
            >分配用户</Button>
            <Button color="blue" icon="h-icon-lock" @click="disPerm" v-has="'roleManageassign'">权限分配</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" :height="tableHeight" checkbox>
              <TableItem title="序号" prop="$serial" :width="30" align="center"></TableItem>
              <TableItem title="角色名称" prop="roleName" :width="200"></TableItem>
              <TableItem title="角色代码" prop="roleCode" :width="200"></TableItem>
              <TableItem title="备注" :width="200">
                <template slot-scope="{data}">
                  <span v-html="data.remarks"></span>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{data}">
                  <button
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'roleManageupdate'"
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
    <AddRole :addRole="addRole"></AddRole>
    <UpdateRole :updateRole="updateRole" ref="update"></UpdateRole>
    <!-- <DisUser :disUser="disUser" ref="dist" :roleId="roleId"></DisUser> -->
    <UserPower :userPower="userPower" ref="power" :roleId="roleId"></UserPower>
    <AddRoleMember ref="addMember" :addRoleMember="addRoleMember" :roleId="roleId"></AddRoleMember>
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
import roleModel from 'model/role/roleModel';
import roleUserModel from 'model/role/roleUserModel';
import userModel from 'model/user/userModel';
import roleadd from './components/role-add';
import updateRole from './components/role-update';
// import disUser from './components/user-distribute';
import UserPower from './components/user-power';
import addRoleMember from './components/rolemember-add';
export default {
  components: {
    AddRole: roleadd,
    UpdateRole: updateRole,
    // DisUser: disUser,
    UserPower: UserPower,
    AddRoleMember: addRoleMember
  },
  data() {
    return {
      roleList: roleModel.parse({}),
      roleUserList: roleUserModel.parse({}),
      userList: userModel.parse({}),
      value: null,
      addRole: false,
      updateRole: false,
      userPower: false,
      // disUser: false,
      addRoleMember: false,
      datas: [],
      roleId: '', // 角色id
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      data: {},
      isLoading: false,
      tableHeight: 0,
      oneData: {},
      param: [
        { title: '编辑', key: 'modify' },
        { title: '分配用户', key: 'allot' },
        { title: '成员', key: 'member' },
        { title: '删除', key: 'delete' }
      ],
      deleteModal: false
    };
  },
  // 注册回车搜索
  created() {
    // this.keyupEnter();
  },
  mounted() {
    this.getData();
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    // keyupEnter() {
    //   document.onkeydown = e => {
    //     if (e.keyCode === 13 && e.target.baseURI.match(/roleManage/)) {
    //       this.search();
    //     }
    //   };
    // },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.roleList.page = this.pagination.page;
      this.roleList.size = this.pagination.size;
      R.roleManage.roleFindAll(roleModel.dispose(this.roleList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.isLoading = false;
          this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 222;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    // 根据筛选条件查询
    search(data) {
      this.getData();
      this.roleList.page = this.pagination.page;
      this.roleList.size = this.pagination.size;
    },
    searchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      // console.log('回车搜索', keyCode, e);
      if (keyCode == 13) {
        this.search();
      }
    },
    // 重置筛选条件
    reset() {
      this.roleList.roleName = '';
      this.roleList.roleCode = '';
    },
    // 新增角色
    add() {
      this.addRole = true;
    },
    // 分配用户
    distributeUser() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要分配用户的数据');
      } else if (this.$refs.table.getSelection().length > 1) {
        this.$Message('分配用户仅支持单条数据');
      } else {
        this.addRoleMember = true;
        this.roleId = this.$refs.table.getSelection()[0].id;
        this.$refs.addMember.getData(this.$refs.table.getSelection()[0].id);
      }
    },
    // 权限分配
    disPerm() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要分配权限的角色');
      } else if (this.$refs.table.getSelection().length > 1) {
        this.$Message('分配权限仅支持单条数据');
      } else {
        this.userPower = true;
        this.roleId = this.$refs.table.getSelection()[0].id;
      }
    },
    // 修改数据
    modify(data) {
      this.updateRole = true;
      this.$refs.update.getData(data.id);
    },
    // 逐条删除数据
    modalConfirm() {
      let ids = [];
      ids.push(this.oneData.id);
      this.roleList.ids = ids.join(',');
      R.roleManage.roleDelete(roleModel.dispose(this.roleList)).then(resp => {
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
    changePage() {
      this.getData();
    },
    close() {
      this.addRole = false;
      this.updateRole = false;
      this.addRoleMember = false;
      this.userPower = false;
    },
    resetDatepicker() {
      this.$refs.datapicker.resetValid();
    },
    trigger(data) {
      if (data == 'modify') {
        this.$refs.update.getData(this.oneData.id);
        this.updateRole = true;
      } else if (data == 'allot') {
        this.roleId = this.oneData.id;
        this.$refs.addMember.getData(this.oneData.id);
        this.addRoleMember = true;
      } else if (data == 'member') {
        this.$router.push({ path: '/rolemember-list/', query: { Id: this.oneData.id } });
      } else if (data == 'delete') {
        this.deleteModal = true;
      }
    },
    getOneData(data) {
      this.oneData = data;
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
.allot {
  border-color: #ab51e6;
  &:hover {
    border-color: rgba(171, 81, 230, 0.8) !important;
    background-color: rgba(171, 81, 230, 0.8) !important;
  }
}
</style>
