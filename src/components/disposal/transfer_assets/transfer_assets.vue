<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            移交编号：
            <input
              type="text"
              v-model="transferAssetsList.code"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 移交时间：
            <DatePicker style="width: 12%;" v-model="transferAssetsList.applicantTime"></DatePicker>&nbsp;&nbsp; 接收人：
            <input
              type="text"
              v-model="transferAssetsList.receiver"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 接收人部门：
            <Select
              v-model="transferAssetsList.receiverDepartment"
              :datas="departmentOption"
              :autosize="true"
              style="width: 12%;"
              :filterable="true"
            ></Select>&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'transferAssetsadd'">新增</Button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'transferAssetsdelete'"
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
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="移交编号" align="left" :width="120">
                <template slot-scope="{ data }">
                  <a href="#" @click="detail(data)">{{ data.code }}</a>
                </template>
              </TableItem>
              <TableItem title="标题" align="left" :width="150">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.title"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="接收人" prop="receiverName" align="left" :width="80"></TableItem>
              <TableItem title="接收人部门" prop="receiverDepartmentName" align="left" :width="100"></TableItem>
              <TableItem title="原使用人" prop="applicantName" align="left" :width="80"></TableItem>
              <TableItem title="移交时间" prop="applicantTime" align="center" :width="100"></TableItem>
              <TableItem title="涉及资产数量" prop="number" align="left" :width="100"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{ data }">
                  <button
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'transferAssetsupdate'"
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
    <transferAdd
      @getData="getTransferAssetsFindAllData"
      :transferAdd="transferAdd"
      :currentTime="currentTime"
      :applicant="applicant"
      :userOption="userOption"
      :departmentOption="departmentOption"
      @close="close"
    ></transferAdd>
    <transferModify
      ref="modify"
      @getData="getTransferAssetsFindAllData"
      :transferModify="transferModify"
      :dataId="dataId"
      :currentTime="currentTime"
      :applicant="applicant"
      :userOption="userOption"
      :departmentOption="departmentOption"
    ></transferModify>
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
import transferAdd from './transfer_add';
import transferModify from './transfer_modify';
import transferAssetsModel from 'model/transferAssets/transferAssetsModel';
export default {
  components: {
    transferAdd,
    transferModify
  },
  data() {
    return {
      transferAssetsList: transferAssetsModel.parse({}),
      datas: [],
      departmentOption: [],
      currentTime: '',
      applicant: '',
      userOption: [],
      dataId: '',
      transferAdd: false,
      transferModify: false,
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
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      loading: false,
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
        if (e.keyCode === 13 && e.target.baseURI.match(/transferAssets/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.transferAssetsList.page = this.pagination.page;
      this.transferAssetsList.size = this.pagination.size;
      this.getTransferAssetsFindAllData();
    },
    // 重置筛选条件
    reset() {
      this.transferAssetsList.code = '';
      this.transferAssetsList.applicantTime = '';
      this.transferAssetsList.receiver = '';
      this.transferAssetsList.receiverDepartment = '';
    },
    changePage() {
      this.getData();
    },
    close() {
      this.transferAdd = false;
      this.transferModify = false;
    },
    // 新增数据
    add() {
      this.transferAdd = true;
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.transferAssetsList.page = this.pagination.page;
      this.transferAssetsList.size = this.pagination.size;
      R.transferAssets.transferAssetsFindAll(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.isLoading = false;
            this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 164;
            this.datas = resp.body;
            this.pagination.page = resp.page;
            this.pagination.size = resp.size;
            this.pagination.total = resp.total;
          }, 500);
        } else {
          this.isLoading = false;
          this.$Message.error('获取数据失败，请重试');
        }
      });
      // 部门下拉选项
      R.pullDownList.department(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          // console.log(resp)
          this.departmentOption = resp.body;
        }
      });
      // 获取人员下拉
      R.pullDownList.user(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          this.userOption = resp.body;
        }
      });
      R.Scrapped.ScrappedGetUserAndDate(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          this.currentTime = resp.body.now;
          this.applicant = resp.body.username;
        }
      });
    },
    getTransferAssetsFindAllData() {
      // console.log('11111111')
      this.transferAssetsList.page = this.pagination.page;
      this.transferAssetsList.size = this.pagination.size;
      R.transferAssets.transferAssetsFindAll(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    // 编辑数据
    modify(data) {
      this.transferModify = true;
      this.$refs.modify.getData(this.datas[this.datas.indexOf(data)].id);
      this.dataId = data.id;
      // console.log(this.dataId)
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
      this.transferAssetsList.ids = ids.join(',');
      R.transferAssets.transferAssetsDelete(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getTransferAssetsFindAllData();
          }, 200);
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    detail(data) {
      this.$router.push({ path: '/transferAssetsDetail/' + data.id });
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
        this.transferModify = true;
        this.$refs.modify.getData(this.oneData.id);
        this.dataId = this.oneData.id;
      } else if (data == 'detail') {
        this.$router.push({ path: '/transferAssetsDetail/' + this.oneData.id });
      } else if (data == 'delete') {
        this.deleteModal = true;
      }
    },
    getOneData(data) {
      this.oneData = data;
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = ['移交编号', '标题', '接收人', '接收人部门', '原使用人', '移交时间', '涉及资产数量'];
        const filterVal = ['code', 'title', 'receiverName', 'receiverDepartmentName', 'applicantName', 'applicantTime','number'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '资产移交表');
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
