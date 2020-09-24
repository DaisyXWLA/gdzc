<template>
  <Modal
    v-model="addRoleMember"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      分配用户
      <i @click="close" class="h-icon-close"></i>
    </div>
    <div :labelPosition="labelPosition">
      <Row :space="12">
        <Cell>
          <div class="h-panel">
            <div class="h-panel-bar">
              角色名称：
              <Select
                v-model="roleList.roleIds"
                :datas="roleOption"
                :autosize="true"
                style="width:18%;"
                :filterable="true"
              ></Select>&nbsp;&nbsp;部门：
              <Select
                v-model="roleList.departmentId"
                :datas="departmentOption"
                :autosize="true"
                style="width:18%;"
                :filterable="true"
              ></Select>&nbsp;&nbsp;用户姓名：
              <input type="text" v-model="roleList.realName" style="width:150px;" />&nbsp;&nbsp;
              <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
              <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
            </div>
          </div>
        </Cell>
        <Cell>
          <div class="h-panel">
            <div class="h-panel-body">
              <Table ref="table" :datas="datas" :loading="isLoading" :height="201" checkbox>
                <TableItem title="序号" prop="$serial" :width="30" align="center"></TableItem>
                <TableItem title="登录名称" prop="loginName" :width="80"></TableItem>
                <TableItem title="用户姓名" prop="realName" :width="80"></TableItem>
                <TableItem title="部门" prop="departmentName" :width="150"></TableItem>
                <TableItem title="角色名称" prop="roleName" :width="150"></TableItem>
                <TableItem title="手机号" prop="phoneNumber" :width="120" align="center"></TableItem>
                <TableItem title="邮箱" prop="email" :width="150"></TableItem>
                <TableItem title="创建时间" prop="createTime" :width="150" align="center"></TableItem>
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
    </div>
    <div slot="footer">
      <button class="h-btn h-btn-primary" @click="submit">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </div>
  </Modal>
</template>
<script>
import userModel from 'model/user/userModel';
import roleModel from 'model/role/roleModel';
import roleUserModel from 'model/role/roleUserModel';
export default {
  props: ['addRoleMember', 'roleId'],
  data() {
    return {
      userList: userModel.parse({}),
      roleList: roleModel.parse({}),
      roleUserList: roleUserModel.parse({}),
      datas: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      isLoading: false,
      roleOption: [],
      departmentOption: []
    };
  },
  mounted() {
    this.getPullDown();
  },
  methods: {
    // 获取所有用户列表
    getData(id) {
      this.roleList.page = this.pagination.page;
      this.roleList.size = this.pagination.size;
      this.roleList.roleId = id;
      R.roleManage.roleFindAllUser(roleModel.dispose(this.roleList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.total = resp.total;
        }
      });
    },
    // 获取角色、部门数据
    getPullDown() {
      R.userManage.userFindAllRole(roleModel.dispose(this.roleList)).then(resp => {
        // console.log(resp.body)
        if (resp.ok) {
          this.roleOption = resp.body;
        }
      });
      R.userManage.userFindAllDepartment(roleModel.dispose(this.roleList)).then(resp => {
        // console.log(resp.body)
        if (resp.ok) {
          this.departmentOption = resp.body;
        }
      });
    },
    search() {
      this.roleList.page = this.pagination.page;
      this.roleList.size = this.pagination.size;
      this.getData(this.roleId);
    },
    reset() {
      this.roleList.roleIds = '';
      this.roleList.departmentId = '';
      this.roleList.realName = '';
    },
    submit() {
      this.$Loading();
      this.roleUserList.roleId = this.roleId;
      let userIds = [];
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        userIds.push(this.$refs.table.getSelection()[i].id);
      }
      this.roleUserList.userIds = userIds.join(',');
      R.roleManage.roleAddUser(roleUserModel.dispose(this.roleUserList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.$parent.close();
            this.$Loading.close();
            this.$Message.success('保存成功');
            this.roleUserList = roleUserModel.parse({});
            this.$parent.getData();
          }, 1000);
        } else {
          this.$Message.error('保存失败');
          this.$parent.close();
          this.$Loading.close();
        }
      });
    },
    changePage() {
      this.getData(this.roleId);
    },
    close() {
      this.$parent.close();
      this.roleList.roleIds = '';
      this.roleList.departmentId = '';
      this.roleList.realName = '';
      this.search();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-body {
  min-height: 357px;
  overflow: auto;
}
.title {
  overflow: hidden;
  .h-icon-close {
    float: right;
    line-height: 40px;
    padding-right: 15px;
  }
}
</style>
