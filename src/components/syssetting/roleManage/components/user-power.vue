<template>
  <Modal
    v-model="userPower"
    :hasCloseIcon="hasCloseIcon"
    :hasDivider="hasDivider"
    :middle="true"
    :closeOnMask="false"
  >
    <div slot="header" class="title">
      分配权限
      <i @click="close" class="h-icon-close"></i>
    </div>
    <div :labelPosition="labelPosition">
      <div class="h-panel"></div>
      <Row :space="12">
        <Cell>
          <Checkbox
            v-if="flag==''"
            v-model="value2"
            @change="change"
            keyName="modelCode"
            titleName="modelName"
            :datas="param3"
            style="display:none;"
          ></Checkbox>
          <Checkbox
            v-else
            v-model="value2"
            @change="change"
            keyName="modelCode"
            titleName="modelName"
            :datas="param3"
          ></Checkbox>
        </Cell>
        <Cell>
          <Tree
            :option="param"
            ref="demo"
            :toggleOnSelect="toggleOnSelect"
            @select="select"
            v-model="value"
          ></Tree>
        </Cell>
      </Row>
    </div>
    <div slot="footer">
      <button class="h-btn" @click="close">关闭</button>
    </div>
  </Modal>
</template>
<script>
import userModel from 'model/user/userModel';
import roleModel from 'model/role/roleModel';
import roleUserModel from 'model/role/roleUserModel';
export default {
  props: ['userPower', 'roleId'],
  data() {
    return {
      userList: userModel.parse({}),
      roleList: roleModel.parse({}),
      roleUserList: roleUserModel.parse({}),
      datas: [],
      param: {
        keyName: 'id',
        parentName: 'parent',
        titleName: 'modelName',
        dataMode: 'list',
        datas: []
      },
      value: null,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      toggleOnSelect: false,
      value2: [],
      param3: [],
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      isLoading: false,
      flag: ''
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取所有用户列表
    getData() {
      R.roleManage.modelTree().then(resp => {
        if (resp.ok) {
          this.param.datas = resp.body;
        }
      });
    },
    select(data) {
      this.flag = typeof data;
      this.roleList.modelId = data.id;
      this.roleList.roleId = this.roleId;
      R.roleManage.ModelBotten(roleModel.dispose(this.roleList)).then(resp => {
        if (resp.ok) {
          this.param3 = resp.body.botten;
          this.value2 = resp.body.list;
        }
      });
    },
    change(data) {
      this.roleList.roleId = this.roleId;
      this.roleList.bottenId = data.join(',');
      R.roleManage.saveroleModelBotten(roleModel.dispose(this.roleList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('权限分配成功');
        }
      });
    },
    close() {
      this.$parent.close();
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  overflow: hidden;
  .h-icon-close {
    float: right;
    line-height: 40px;
    padding-right: 15px;
  }
}
// .h-notify-body /deep/ .h-notify-container{
//   min-width: 427px!important;
// }
/deep/ .h-tree-body {
  min-width: 427px;
  max-height: 216px;
  overflow-y: auto;
}
</style>
