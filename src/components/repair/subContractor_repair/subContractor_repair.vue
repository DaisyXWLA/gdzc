<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            外委编号：
            <input
              type="text"
              v-model="subContractorRepairList.code"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 外委维修时间：
            <DatePicker v-model="subContractorRepairList.expatriateTime" style="width: 12%;"></DatePicker>&nbsp;&nbsp; 创建人：
            <input
              type="text"
              v-model="subContractorRepairList.creator"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 是否报修过：
            <Select
              v-model="subContractorRepairList.isRepair"
              :datas="isRepair"
              :autosize="true"
              style="width: 12%;"
            ></Select>&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'subContractorRepairadd'">新增</Button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'subContractorRepairdelete'"
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
              <TableItem title="外委编号" align="left" :width="120">
                <template slot-scope="{ data }">
                  <a href="#" @click="detail(data)">{{ data.code }}</a>
                </template>
              </TableItem>
              <TableItem title="标题" align="left" :width="120">
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
              <TableItem title="创建时间" prop="createTime" align="center" :width="100"></TableItem>
              <TableItem title="创建人" prop="creatorName" align="center" :width="100"></TableItem>
              <TableItem title="外委维修时间" prop="expatriateTime" align="center" :width="100"></TableItem>
              <TableItem title="维修金额" prop="maintenanceAmount" align="right" :width="100"></TableItem>
              <TableItem title="是否报修过" align="center" :width="100">
                <template slot-scope="{ data }">
                  <div v-if="data.isRepair == 0">
                    <span>否</span>
                  </div>
                  <div v-else>
                    <span>是</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{ data }">
                  <button
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'subContractorRepairupdate'"
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
    <subContractorRepairAdd
      @getData="getFindAllData"
      :subContractorRepairAdd="subContractorRepairAdd"
      :currentTime="currentTime"
      :creator="creator"
    ></subContractorRepairAdd>
    <subContractorRepairModify
      ref="modify"
      @getData="getFindAllData"
      :subContractorRepairModify="subContractorRepairModify"
      :currentTime="currentTime"
      :creator="creator"
    ></subContractorRepairModify>
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
import subContractorRepairAdd from './subContractor_repair_add';
import subContractorRepairModify from './subContractor_repair_modify';
import subContractorRepairModel from 'model/subContractorRepair/subContractorRepairModel';
export default {
  components: {
    subContractorRepairAdd,
    subContractorRepairModify
  },
  data() {
    return {
      subContractorRepairList: subContractorRepairModel.parse({}),
      datas: [],
      currentTime: '',
      creator: '',
      isRepair: [
        { title: '是', key: '1' },
        { title: '否', key: '0' }
      ],
      subContractorRepairAdd: false,
      subContractorRepairModify: false,
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
      deleteModal: false
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
        if (e.keyCode === 13 && e.target.baseURI.match(/subContractorRepair/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.subContractorRepairList.page = this.pagination.page;
      this.subContractorRepairList.size = this.pagination.size;
      this.getFindAllData();
    },
    // 重置筛选条件
    reset() {
      this.subContractorRepairList.code = '';
      this.subContractorRepairList.expatriateTime = '';
      this.subContractorRepairList.creator = '';
      this.subContractorRepairList.isRepair = '';
    },

    // 新增数据
    add() {
      this.subContractorRepairAdd = true;
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.subContractorRepairList.page = this.pagination.page;
      this.subContractorRepairList.size = this.pagination.size;
      R.subContractorRepair.findAll(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        // setTimeout(() => {
        this.isLoading = false;
        this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 164;
        this.datas = resp.body;
        this.pagination.page = resp.page;
        this.pagination.size = resp.size;
        this.pagination.total = resp.total;
        // }, 500);
      });
      // 获取当前时间和当前用户名
      R.Scrapped.ScrappedGetUserAndDate(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        if (resp.ok) {
          this.currentTime = resp.body.now;
          this.creator = resp.body.username;
        }
      });
    },
    getFindAllData() {
      // console.log('ccccccccc');
      this.subContractorRepairList.page = this.pagination.page;
      this.subContractorRepairList.size = this.pagination.size;
      R.subContractorRepair.findAll(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        if (resp.ok) {
          // console.log(resp);
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    // 删除（可批量删除）
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
      this.subContractorRepairList.ids = ids.join(',');
      R.subContractorRepair.delete(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getFindAllData();
          }, 200);
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    // 编辑数据
    modify(data) {
      this.subContractorRepairModify = true;
      this.$refs.modify.getData(data.id);
    },
    detail(data) {
      this.$router.push({ path: '/subContractorRepairDetail/' + data.id });
    },
    changePage() {
      this.getData();
    },
    close() {
      this.subContractorRepairAdd = false;
      this.subContractorRepairModify = false;
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
        this.$refs.modify.getData(this.oneData.id);
        this.subContractorRepairModify = true;
      } else if (data == 'detail') {
        this.$router.push({ path: '/subContractorRepairDetail/' + this.oneData.id });
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
        const tHeader = ['外委编号', '标题', '创建时间', '创建人', '外委维修时间', '维修金额', '是否报修过'];
        const filterVal = [
          'code',
          'title',
          'createTime',
          'creatorName',
          'expatriateTime',
          'maintenanceAmount',
          'isRepairName'
        ];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '我的工单');
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
