<template>
  <Modal
    v-model="disUser"
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
              部门：
              <input type="text" v-model="userList.departmentId" style="width:150px;" />&nbsp;&nbsp;
              用户名称：
              <input
                type="text"
                v-model="userList.realName"
                style="width:150px;"
              />&nbsp;&nbsp;
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
                <TableItem title="部门" prop="departmentName" :width="80"></TableItem>
                <TableItem title="手机号" prop="phoneNumber" :width="100" align="center"></TableItem>
                <TableItem title="创建时间" prop="createTime" :width="100" align="center"></TableItem>
                <div slot="empty">暂时无数据</div>
              </Table>
              <p v-height="15"></p>
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
  props: ['disUser', 'roleId'],
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
      tableHeight: 0
    };
  },
  mounted() {},
  methods: {
    // 获取所有用户列表
    getData(id) {
      console.log(id);
      this.isLoading = true;
      this.roleList.page = this.pagination.page;
      this.roleList.size = this.pagination.size;
      this.roleList.roleId = id;
      R.roleManage.roleFindAllUser(roleModel.dispose(this.roleList)).then(resp => {
        if (resp.ok) {
          this.isLoading = false;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.total = resp.total;
        } else {
          this.isLoading = false;
          this.$Message.error('获取数据失败');
        }
      });
    },
    search() {
      this.getData();
      this.userList.page = this.pagination.page;
      this.userList.size = this.pagination.size;
    },
    reset() {
      this.userList.roleIds = '';
      this.userList.departmentId = '';
      this.userList.realName = '';
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
      this.getData();
    },
    close() {
      this.$parent.close();
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
