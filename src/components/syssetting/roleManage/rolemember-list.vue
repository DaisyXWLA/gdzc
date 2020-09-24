<style lang='less'>
</style>

<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            登录名称：
            <input type="text" v-model="roleUserList.loginName" />&nbsp;&nbsp;
            用户名称：
            <input type="text" v-model="roleUserList.realName" />&nbsp;&nbsp;
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
            <!-- <Button color="yellow" icon="icon-reply" @click="back">返回</Button> -->
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
              <TableItem title="角色名称" prop="roleName" :width="80"></TableItem>
              <TableItem title="登录名称" prop="loginName" :width="80"></TableItem>
              <TableItem title="用户名称" prop="realName" :width="80"></TableItem>
              <TableItem title="部门" prop="departmentName" :width="80"></TableItem>
              <!-- <TableItem title="职位" prop="time"></TableItem> -->
              <TableItem title="手机号" prop="phoneNumber" :width="100" align="center"></TableItem>
              <TableItem title="邮箱" prop="email" :width="150"></TableItem>
              <TableItem title="创建时间" prop="createTime" :width="120" align="center"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{data}">
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
    <AddRoleMember ref="addMember" :addRoleMember="addRoleMember" :roleId="RoleId"></AddRoleMember>
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
import userModel from 'model/user/userModel';
import roleUserModel from 'model/role/roleUserModel';
import rolememberadd from './components/rolemember-add';
export default {
  components: {
    AddRoleMember: rolememberadd
  },
  data() {
    return {
      userList: userModel.parse({}),
      roleUserList: roleUserModel.parse({}),
      addRoleMember: false,
      datas: [],
      RoleId: '',
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      deleteBtn: false,
      tableHeight: 0,
      deleteModal: false
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    this.RoleId = this.$route.query.Id;
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  // 返回后刷新页面
  watch: {
    $route() {
      if (this.$route.query.Id != null) {
        this.getData();
      }
    }
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/rolemember-list/)) {
          this.search();
        }
      };
    },
    getData() {
      this.roleUserList.id = this.$route.query.Id;
      this.roleUserList.page = this.pagination.page;
      this.roleUserList.size = this.pagination.size;
      R.roleManage.roleFindMembers(roleUserModel.dispose(this.roleUserList)).then(resp => {
        if (resp.ok) {
          this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 212;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    search() {
      this.userList.page = this.pagination.page;
      this.userList.size = this.pagination.size;
      this.getData();
    },
    reset() {
      this.roleUserList.loginName = '';
      this.roleUserList.realName = '';
    },
    add() {
      this.addRoleMember = true;
      this.$refs.addMember.getData(this.$route.query.Id);
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
      this.roleUserList.ids = ids.join(',');
      this.roleUserList.id = this.$route.query.Id;
      R.roleManage.deleteRoleMembers(roleUserModel.dispose(this.roleUserList)).then(resp => {
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
    back() {
      this.$router.push({ name: 'roleManage' });
    },
    changePage() {
      this.getData();
    },
    close() {
      this.addRoleMember = false;
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
  height: calc(100vh - 60px - 45px - 30px - 30px - 71px);
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
