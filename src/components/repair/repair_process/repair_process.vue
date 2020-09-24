<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            维修编号：
            <input type="text" v-model="assetsRepairList.code" style="width: 12%;" v-wordlimit="50"/>&nbsp;&nbsp; 报修人：
            <Select
              v-model="assetsRepairList.repair"
              :datas="userOption"
              :autosize="true"
              style="width:12%;"
              :filterable="true"
            ></Select>&nbsp;&nbsp; 报修时间：
            <DatePicker v-model="assetsRepairList.repairTime" style="width: 12%;"></DatePicker>&nbsp;&nbsp; 状态：
            <Select
              v-model="assetsRepairList.distributionStatus"
              :datas="processingStatus"
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
            <Button
              color="blue"
              icon="h-icon-users"
              @click="batchAssign"
              v-has="'repairProcessassign'"
            >批量分派</Button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="维修编号" align="left" :width="120">
                <template slot-scope="{ data }">
                  <a href="#" @click="detail(data)">{{ data.code }}</a>
                </template>
              </TableItem>
              <TableItem title="标题" align="left" :width="230">
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
              <TableItem title="报修时间" prop="repairTime" align="center" :width="100"></TableItem>
              <TableItem title="报修人" prop="repairName" align="left" :width="80"></TableItem>
              <TableItem title="预计维修时间" prop="planServiceTime" align="center" :width="120"></TableItem>
              <TableItem title="故障内容" align="left" :width="430">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.faultContent"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="状态" align="center" :width="80">
                <template slot-scope="{ data }">
                  <div v-if="data.distributionStatus == '待分派'">
                    <span class="h-tag h-tag-yellow">待分派</span>
                  </div>
                  <div v-else-if="data.distributionStatus == '已分派'">
                    <span class="h-tag h-tag-green">已分派</span>
                  </div>
                  <div v-else-if="data.distributionStatus == '撤销'">
                    <span class="h-tag h-tag-red" style="width:62px;">撤销</span>
                  </div>
                  <div v-else-if="data.distributionStatus == '维修中'">
                    <span class="h-tag h-tag-green">维修中</span>
                  </div>
                  <div v-else-if="data.distributionStatus == '已维修'">
                    <span class="h-tag h-tag-green">已维修</span>
                  </div>
                  <div v-else-if="data.distributionStatus == '外委'">
                    <span
                      v-bg-color:#E3C4F7
                      v-color:#9824F0
                      class="h-tag"
                      style="width:62px;border:1px solid #E3C4F7"
                    >外委</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="处理人" prop="processingPersonName" align="left" :width="80"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150" fixed="right">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.distributionStatus == '待分派'"
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="assign(data)"
                  >
                    <i class="h-icon-edit"></i>
                    分派
                  </button>
                  <button
                    v-else
                    v-bg-color:#8AB5F9
                    v-color:white
                    class="h-btn h-btn-s modify"
                    @click="assign(data)"
                    style="border:1px solid #8AB5F9;cursor: not-allowed;"
                  >
                    <i class="h-icon-edit"></i>
                    分派
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
    <Modal v-model="assignRepair" hasCloseIcon>
      <assignRepair @close="assignRepair = false" @getData="getData" :assignIds="assignIds"></assignRepair>
    </Modal>
    <subContractorRepairModify
      ref="modify"
      :subContractorRepairModify="subContractorRepairModify"
      :creator="creator"
      :currentTime="currentTime"
      @getData="getData"
    ></subContractorRepairModify>
  </div>
</template>
<script>
import assignRepair from './assign_repair';
import subContractorRepairModify from './subContractor_repair_modify';
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
export default {
  components: {
    assignRepair,
    subContractorRepairModify
  },
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      test: '',
      datas: [],
      userOption: [],
      currentTime: '',
      creator: '',
      processingStatus: [
        { title: '撤销', key: '撤销' },
        { title: '外委', key: '外委' },
        { title: '待分派', key: '待分派' },
        { title: '已分派', key: '已分派' },
        { title: '维修中', key: '维修中' },
        { title: '已维修', key: '已维修' }
      ],
      assignIds: [],
      assignRepair: false,
      subContractorRepairModify: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      oneData: {},
      param: [
        { title: '分派', key: 'assign' },
        { title: '外委', key: 'subContractor' },
        { title: '重新分派', key: 'reallocate' }
      ],
      tableHeight: 0
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    R.pullDownList.user(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
      if (resp.ok) {
        this.userOption = resp.body;
      }
    });
    this.$nextTick(() => {
      document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
    });
    document.addEventListener('scroll', this.winScroll, true);
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/repairProcess/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      this.getData();
    },
    // 重置筛选条件
    reset() {
      this.assetsRepairList.code = '';
      this.assetsRepairList.repair = '';
      this.assetsRepairList.repairTime = '';
      this.assetsRepairList.distributionStatus = '';
    },

    // 新增数据
    add() {
      this.assignRepair = true;
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      R.assetsRepair.findAllWork(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        setTimeout(() => {
          this.isLoading = false;
          this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 164;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }, 500);
      });
      // 获取当前时间和当前用户名
      R.Scrapped.ScrappedGetUserAndDate(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        if (resp.ok) {
          this.currentTime = resp.body.now;
          this.creator = resp.body.username;
        }
      });
    },
    // 批量分派
    batchAssign() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要分派的数据');
      } else {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          this.assignIds.push(this.$refs.table.getSelection()[i].id);
        }
        // console.log(this.assignIds);
        this.close();
        this.assignRepair = true;
      }
    },
    // 分派任务
    assign(data) {
      if (data.distributionStatus == '撤销') {
        this.$Message('该报修已撤销，不可分派');
      } else if (data.distributionStatus == '外委') {
        this.$Message('该报修已外委，不可分派');
      } else if (data.distributionStatus == '已分派') {
        this.$Message('该报修已分派');
      } else if (data.distributionStatus == '维修中') {
        this.$Message('该报修正在维修中，不可分派');
      } else if (data.distributionStatus == '已维修') {
        this.$Message('该报修已维修');
      } else {
        this.assignIds.push(data.id);
        this.assignRepair = true;
      }
    },
    // 外委维修
    subContractor(data) {
      if (data.processingStatus == '撤销') {
        this.$Message('该报修已撤销，不能外委');
      } else if (data.processingStatus == '外委') {
        this.$Message('该报修已外委，不能重复外委');
      } else {
        this.subContractorRepairModify = true;
        this.$refs.modify.getData(data.id);
      }
    },
    detail(data) {
      this.$router.push({ path: '/repairProcessDetail/' + data.id });
    },
    close() {
      this.assignRepair = false;
      this.subContractorRepairModify = false;
    },
    changePage() {
      this.getData();
    },
    trigger(data) {
      if (data == 'assign') {
        if (this.oneData.distributionStatus == '撤销') {
          this.$Message('该报修已撤销，不可分派');
        } else if (this.oneData.distributionStatus == '外委') {
          this.$Message('该报修已外委，不可分派');
        } else if (this.oneData.distributionStatus == '已分派') {
          this.$Message('该报修已分派');
        } else if (this.oneData.distributionStatus == '维修中') {
          this.$Message('该报修正在维修中，不可分派');
        } else if (this.oneData.distributionStatus == '已维修') {
          this.$Message('该报修已维修');
        } else {
          this.assignIds.push(this.oneData.id);
          this.assignRepair = true;
        }
      } else if (data == 'reallocate') {
        if (this.oneData.distributionStatus == '撤销') {
          this.$Message('该报修已撤销，不可重新分派');
        } else if (this.oneData.distributionStatus == '外委') {
          this.$Message('该报修已外委，不可重新分派');
        } else if (this.oneData.distributionStatus == '已维修') {
          this.$Message('该报修已维修');
        } else {
          this.assignIds.push(this.oneData.id);
          this.assignRepair = true;
        }
      } else if (data == 'subContractor') {
        if (this.oneData.processingStatus == '撤销') {
          this.$Message('该报修已撤销，不能外委');
        } else if (this.oneData.processingStatus == '外委') {
          this.$Message('该报修已外委，不能重复外委');
        } else if (this.oneData.processingStatus == '已维修') {
          this.$Message('该报修已维修');
        } else {
          this.subContractorRepairModify = true;
          this.$refs.modify.getData(this.oneData.id);
        }
      }
    },
    getOneData(data) {
      this.oneData = data;
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = ['维修编号', '标题', '报修时间', '报修人', '预约维修时间', '故障内容','状态','处理人'];
        const filterVal = ['code', 'title', 'repairTime', 'repairName', 'planServiceTime', 'faultContent', 'distributionStatus','processingPersonName'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '报修处理表');
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    winScroll() {
      if (document.querySelector('.h-table-body').scrollLeft == 0) {
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      } else {
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
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
</style>
