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
              v-model="assetsRepairList.processingStatus"
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
            <button class="h-btn h-btn-s h-btn-yellow" @click="allStart">
              <i class="icon-play"></i>&nbsp;开始
            </button>
            <button class="h-btn h-btn-s h-btn-blue" @click="allFinish">
              <i class="icon-stop"></i>&nbsp;完成
            </button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="维修编号" align="left" :width="120">
                <template slot-scope="{ data }">
                  <a href="#" @click="detail(data)">{{ data.code }}</a>
                </template>
              </TableItem>
              <TableItem title="标题"  align="left" :width="150">
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
              <TableItem title="报修时间" prop="repairTime" align="center" :width="80"></TableItem>
              <TableItem title="报修人" prop="repairName" align="left" :width="80"></TableItem>
              <TableItem title="预计维修时间" prop="planServiceTime" align="center" :width="100"></TableItem>
              <TableItem title="故障等级" align="center" :width="80">
                <template slot-scope="{ data }">
                  <div v-if="data.failureLevel == '一般'">
                    <span class="h-tag h-tag-green">一般</span>
                  </div>
                  <div v-if="data.failureLevel == '重要'">
                    <span class="h-tag h-tag-blue">重要</span>
                  </div>
                  <div v-if="data.failureLevel == '紧急'">
                    <span class="h-tag h-tag-red">紧急</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="故障内容" align="left" :width="120">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.faultContent"
                    more="..."
                    :height="20"
                    v-width="100"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="状态" align="center" :width="80">
                <template slot-scope="{ data }">
                  <div v-if="data.processingStatus == '撤销'">
                    <span class="h-tag h-tag-red">撤销</span>
                  </div>
                  <div v-else-if="data.processingStatus == '待维修'">
                    <span class="h-tag h-tag-yellow">待维修</span>
                  </div>
                  <div v-else-if="data.processingStatus == '维修中'">
                    <span class="h-tag h-tag-green">维修中</span>
                  </div>
                  <div v-else-if="data.processingStatus == '已维修'">
                    <span class="h-tag h-tag-green">已维修</span>
                  </div>
                  <div v-else-if="data.processingStatus == '已分派'">
                    <span class="h-tag h-tag-blue">已分派</span>
                  </div>
                  <div v-if="data.processingStatus == '外委'">
                    <span
                      v-bg-color:#E3C4F7
                      v-color:#9824F0
                      class="h-tag"
                      style="width:62px;border:1px solid #E3C4F7"
                    >外委</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="处理时间" prop="processingTime" align="center" :width="80"></TableItem>
              <TableItem title="操作" prop="operation" align="center" fixed="right" :width="150">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.processingStatus=='待维修'"
                    class="h-btn h-btn-s h-btn-yellow"
                    @click="start(data)"
                    v-has="'myOrderstart'"
                  >
                    <i class="icon-play"></i>&nbsp;开始
                  </button>
                  <button
                    v-else
                    class="h-btn h-btn-s"
                    v-bg-color:#FCDE89
                    v-color:white
                    @click="start(data)"
                    v-has="'myOrderstart'"
                    style="border:1px solid #FCDE89;cursor: not-allowed;"
                  >
                    <i class="icon-play"></i>&nbsp;开始
                  </button>
                  <Poptip
                    v-if="data.processingStatus=='维修中'"
                    content="确认完成该维修任务?"
                    @confirm="finish(data)"
                  >
                    <button class="h-btn h-btn-s h-btn-blue" v-has="'myOrderfinish'">
                      <i class="icon-stop"></i>&nbsp;完成
                    </button>
                  </Poptip>
                  <button
                    v-else
                    class="h-btn h-btn-s"
                    v-bg-color:#8AB5F9
                    v-color:white
                    @click="finish(data)"
                    v-has="'myOrderfinish'"
                    style="border:1px solid #8AB5F9;cursor: not-allowed;"
                  >
                    <i class="icon-stop"></i>&nbsp;完成
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
  </div>
</template>
<script>
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
export default {
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      datas: [],
      userOption: [],
      processingStatus: [
        { title: '外委', key: '外委' },
        { title: '待维修', key: '待维修' },
        { title: '维修中', key: '维修中' },
        { title: '已维修', key: '已维修' }
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false
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
        if (e.keyCode === 13 && e.target.baseURI.match(/myOrder/)) {
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
      this.assetsRepairList.processingStatus = '';
    },
    changePage() {
      this.getData();
    },
    close() {},
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      R.assetsRepair.findAllMyOrder(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        if (resp.ok) {
          this.isLoading = false;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        } else {
          this.isLoading = false;
          this.$Message.error('获取数据失败，请重试');
        }
      });
    },
    allStart() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要开始维修的任务');
      } else {
        let status = [];
        let statusString = '';
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          status.push(this.$refs.table.getSelection()[i].processingStatus);
        }
        statusString = status.join(',');
        // console.log(statusString);
        if (statusString.indexOf('维修中') != -1 || statusString.indexOf('外委') != -1 || statusString.indexOf('已维修') != -1) {
          this.$Message('当前选择的维修任务包含 “维修中” / “已维修” / “外委” 任务，请重新选择');
        } else {
          let ids = [];
          for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
            ids.push(this.$refs.table.getSelection()[i].id);
          }
          this.assetsRepairList.ids = ids.join(',');
          R.assetsRepair.start(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
            if (resp.ok) {
              this.$Message.success('维修任务已开始');
              this.getData();
            } else {
              this.$Message.success('维修任务开始失败');
            }
          });
        }
      }
    },
    allFinish() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要完成维修的任务');
      } else {
        let status = [];
        let statusString = '';
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          status.push(this.$refs.table.getSelection()[i].processingStatus);
        }
        statusString = status.join(',');
        if (statusString.indexOf('已维修') != -1) {
          this.$Message('当前选择的维修任务包含已完成任务，请重新选择');
        } else {
          let ids = [];
          for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
            ids.push(this.$refs.table.getSelection()[i].id);
          }
          this.assetsRepairList.ids = ids.join(',');
          R.assetsRepair.over(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
            if (resp.ok) {
              this.$Message.success('维修任务完成');
              this.getData();
            } else {
              this.$Message.error('维修任务未能完成');
            }
          });
        }
      }
    },
    start(data) {
      if (data.processingStatus == '维修中') {
        this.$Message('该任务正在维修中');
      } else if (data.processingStatus == '已维修') {
        this.$Message('该任务已维修');
      } else if (data.processingStatus == '外委') {
        this.$Message('该任务已外委');
      } else {
        this.assetsRepairList.page = this.pagination.page;
        this.assetsRepairList.size = this.pagination.size;
        let ids = [];
        ids.push(data.id);
        this.assetsRepairList.ids = ids.join(',');
        R.assetsRepair.start(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
          if (resp.ok) {
            // console.log(resp);
            this.$Message.success('维修任务已开始');
            this.getData();
          } else {
            this.$Message.error('维修任务开始失败');
          }
        });
      }
    },
    finish(data) {
      if (data.processingStatus == '待维修') {
        this.$Message('该任务未开始');
      } else if (data.processingStatus == '已维修') {
        this.$Message('该任务已维修');
      } else if (data.processingStatus == '外委') {
        this.$Message('该任务已外委');
      } else {
        this.assetsRepairList.page = this.pagination.page;
        this.assetsRepairList.size = this.pagination.size;
        let ids = [];
        ids.push(data.id);
        this.assetsRepairList.ids = ids.join(',');
        R.assetsRepair.over(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
          if (resp.ok) {
            this.$Message.success('维修任务完成');
            this.getData();
          } else {
            this.$Message.error('维修任务未能完成');
          }
        });
      }
    },
    detail(data) {
      this.$router.push({ path: '/myOrderDetail/' + data.id });
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = ['维修编号', '标题', '报修时间', '报修人', '预约维修时间','故障等级', '故障内容','状态','处理时间'];
        const filterVal = ['code', 'title', 'repairTime', 'repairName', 'planServiceTime', 'failureLevel','faultContent', 'processingStatus','processingTime'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '我的工单');
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
</style>
