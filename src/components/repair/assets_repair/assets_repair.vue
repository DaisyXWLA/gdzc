<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            维修编号：
            <input
              type="text"
              v-model="assetsRepairList.code"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 报修人：
            <Select
              v-model="assetsRepairList.repair"
              :datas="userOption"
              :autosize="true"
              style="width:12%;"
              :filterable="true"
            ></Select>&nbsp;&nbsp; 报修时间：
            <DatePicker style="width: 12%;" v-model="assetsRepairList.repairTime"></DatePicker>&nbsp;&nbsp; 状态：
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
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'assetsRepairadd'">报修</Button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" :height="tableHeight" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="40"></TableItem>
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
              <TableItem title="预约维修时间" prop="planServiceTime" align="center" :width="120"></TableItem>
              <TableItem title="故障内容" align="left" :width="470">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.faultContent"
                    more="..."
                    :height="35"
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
                    <span class="h-tag h-tag-yellow">已分派</span>
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
              <TableItem title="操作" prop="operation" align="center" fixed="right" :width="150">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.distributionStatus=='待分派'"
                    class="h-btn h-btn-s h-btn-blue"
                    @click="modify(data)"
                    v-has="'assetsRepairupdate'"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <button
                    v-else
                    class="h-btn h-btn-s"
                    v-bg-color:#8AB5F9
                    v-color:white
                    @click="modify(data)"
                    v-has="'assetsRepairupdate'"
                    style="border:1px solid #8AB5F9;cursor: not-allowed;"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <button
                    v-if="data.distributionStatus == '待分派'"
                    class="h-btn h-btn-s h-btn-red"
                    @click="revocation(data)"
                    v-has="'assetsRepairrevocation'"
                  >
                    <i class="h-icon-refresh"></i>&nbsp;撤销
                  </button>
                  <button
                    v-else
                    class="h-btn h-btn-s"
                    v-bg-color:#f58495
                    v-color:white
                    @click="revocation(data)"
                    v-has="'assetsRepairrevocation'"
                    style="border:1px solid #f58495;cursor: not-allowed;"
                  >
                    <i class="h-icon-refresh"></i>&nbsp;撤销
                  </button>
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
    <repairAdd
      @getData="getAllListData"
      :repairAdd="repairAdd"
      :currentTime="currentTime"
      :repair="repair"
      :userOption="userOption"
    ></repairAdd>
    <repairModify
      ref="modify"
      @getData="getAllListData"
      :repairModify="repairModify"
      :dataId="dataId"
      :currentTime="currentTime"
      :repair="repair"
      :userOption="userOption"
    ></repairModify>
    <Modal v-model="deleteModal">
      <div slot="header" class="title">撤销</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定撤销？
      </div>
      <div slot="footer">
        <Button color="primary" @click="modalConfirm">确定</Button>
        <Button @click="modalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import repairAdd from './repair_add';
import repairModify from './repair_modify';
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
export default {
  components: {
    repairAdd,
    repairModify
  },
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      datas: [],
      currentTime: '',
      userOption: [],
      repair: '',
      dataId: '',
      processingStatus: [
        { title: '撤销', key: '撤销' },
        { title: '外委', key: '外委' },
        { title: '待分派', key: '待分派' },
        { title: '已分派', key: '已分派' },
        { title: '维修中', key: '维修中' },
        { title: '已维修', key: '已维修' }
      ],
      repairAdd: false,
      repairModify: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      tableHeight: 0,
      deleteModal: false,
      revocationId: ''
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
        if (e.keyCode === 13 && e.target.baseURI.match(/assetsRepair/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      this.getAllListData();
    },
    // 重置筛选条件
    reset() {
      this.assetsRepairList.code = '';
      this.assetsRepairList.repair = '';
      this.assetsRepairList.repairTime = '';
      this.assetsRepairList.distributionStatus = '';
    },
    changePage() {
      this.getData();
    },
    close() {
      this.repairAdd = false;
      this.repairModify = false;
    },
    // 新增数据
    add() {
      this.repairAdd = true;
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
          this.repair = resp.body.username;
          // console.log(this.repair)
        }
      });
    },
    getAllListData() {
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      R.assetsRepair.findAllWork(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
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
      if (data.distributionStatus == '已分派') {
        this.$Message('该报修已分派，不可编辑');
      } else if (data.distributionStatus == '撤销') {
        this.$Message('该报修已撤销，不可编辑');
      } else if (data.distributionStatus == '维修中') {
        this.$Message('该报修正在维修中，不可编辑');
      } else if (data.distributionStatus == '已维修') {
        this.$Message('该报修已维修，不可编辑');
      } else if (data.distributionStatus == '外委') {
        this.$Message('该报修已外委，不可编辑');
      } else {
        this.repairModify = true;
        this.$refs.modify.getData(this.datas[this.datas.indexOf(data)].id);
        this.dataId = data.id;
      }
    },
    // 撤销
    revocation(data) {
      if (data.distributionStatus == '撤销') {
        this.$Message('该报修已撤销');
      } else if (data.distributionStatus == '维修中') {
        this.$Message('该报修正在维修中，不可撤销');
      } else if (data.distributionStatus == '已维修') {
        this.$Message('该报修已维修，不可撤销');
      } else if (data.distributionStatus == '已分派') {
        this.$Message('该报修已分派，不可撤销');
      } else if (data.distributionStatus == '外委') {
        this.$Message('该报修已外委，不可撤销');
      } else {
        this.revocationId = data.id;
        this.deleteModal = true;
      }
    },
    modalConfirm() {
      this.assetsRepairList.id = this.revocationId;
      R.assetsRepair.delete(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('撤销成功');
            this.getAllListData();
          }, 200);
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    detail(data) {
      this.$router.push({ path: '/assetsRepairDetail/' + data.id });
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = ['维修编号', '标题', '报修时间', '报修人', '预约维修时间', '故障内容','状态'];
        const filterVal = ['code', 'title', 'repairTime', 'repairName', 'planServiceTime', 'faultContent', 'distributionStatus'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '资产报修表');
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
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
