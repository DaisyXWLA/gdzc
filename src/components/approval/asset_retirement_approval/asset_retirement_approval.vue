<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            报废编号：
            <input
              type="text"
              v-model="ScrappedList.code"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 报废日期：
            <DatePicker v-model="ScrappedList.scrappedTime" style="width: 12%;"></DatePicker>&nbsp;&nbsp; 审批状态：
            <Select
              v-model="ScrappedList.staut"
              :datas="param"
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
              icon="h-icon-plus"
              @click="approval"
              v-has="'assetRetirementApprovalapprove'"
            >审批</Button>
            <Button
              v-show="deleteBtn"
              color="green"
              icon="h-icon-edit"
              @click="allAgree"
              v-has="'assetRetirementApprovalagree'"
            >批量同意</Button>
            <Button
              v-show="deleteBtn"
              color="yellow"
              icon="h-icon-trash"
              @click="allRefuse"
              v-has="'assetRetirementApprovalrefuse'"
            >批量拒绝</Button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" checkbox @select="selectBth">
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="报废编号" align="left" :width="120">
                <template slot-scope="{ data }">
                  <a href="#" @click="view(datas, data)">{{ data.code }}</a>
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
              <TableItem title="申请人" prop="applicantName" align="left" :width="80"></TableItem>
              <TableItem title="申请日期" prop="applicantTime" align="center" :width="80"></TableItem>
              <TableItem title="报废日期" prop="scrappedTime" align="center" :width="80"></TableItem>
              <TableItem title="报废资产数量" prop="number" align="right" :width="100"></TableItem>
              <TableItem title="报废原因" align="left" :width="200">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.reasonForScrapping"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="审批状态" :width="80" align="center">
                <template slot-scope="{ data }">
                  <div v-if="data.staut == 0">
                    <span class="h-tag h-tag-yellow">待审批</span>
                  </div>
                  <div v-else-if="data.staut == 1">
                    <span class="h-tag h-tag-green">审批中</span>
                  </div>
                  <div v-else-if="data.staut == 2">
                    <span class="h-tag h-tag-green">已完成</span>
                  </div>
                  <div v-else>
                    <span class="h-tag h-tag-red">未通过</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" fixed="right" align="center" :width="150">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.staut==0||data.staut==1"
                    class="h-btn h-btn-s h-btn-blue"
                    @click="Agree(data)"
                    v-has="'assetRetirementApprovalagree'"
                  >
                    <i class="h-icon-edit"></i>
                    同意
                  </button>
                  <button
                    v-else
                    class="h-btn h-btn-s"
                    v-bg-color:#8AB5F9
                    v-color:white
                    @click="Agree(data)"
                    v-has="'assetRetirementApprovalagree'"
                    style="border:1px solid #8AB5F9;cursor: not-allowed;"
                  >
                    <i class="h-icon-edit"></i>
                    同意
                  </button>
                  <button
                    v-if="data.staut==0||data.staut==1"
                    class="h-btn h-btn-s h-btn-yellow"
                    @click="Refuse(data)"
                    v-has="'assetRetirementApprovalrefuse'"
                  >
                    <i class="h-icon-trash"></i>&nbsp;拒绝
                  </button>
                  <button
                    v-else
                    v-bg-color:#FCDE89
                    v-color:white
                    class="h-btn h-btn-s"
                    @click="Refuse(data)"
                    v-has="'assetRetirementApprovalrefuse'"
                    style="border:1px solid #FCDE89;cursor: not-allowed;"
                  >
                    <i class="h-icon-trash"></i>&nbsp;拒绝
                  </button>
                </template>
              </TableItem>
            </Table>
            <p v-height="15"></p>
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
    <Modal v-model="agreeModal">
      <div slot="header" class="title">同意</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定同意？
      </div>
      <div slot="footer">
        <Button color="primary" @click="agreeConfirm">确定</Button>
        <Button @click="agreeClose">取消</Button>
      </div>
    </Modal>
    <Modal v-model="refuseModal">
      <div slot="header" class="title">拒绝</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定拒绝？
      </div>
      <div slot="footer">
        <Button color="primary" @click="refuseConfirm">确定</Button>
        <Button @click="refuseClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import ScrappedModel from 'model/scrapped/scrapped';
import ApprovalModel from 'model/Approval/Approval';
export default {
  data() {
    return {
      ScrappedList: ScrappedModel.parse({}),
      ApprovalList: ApprovalModel.parse({}),
      test: '',
      deleteBtn: false,
      datas: [],
      param: [
        { title: '待审批', key: '0' },
        { title: '审批中', key: '1' },
        { title: '已完成', key: '2' },
        { title: '未通过', key: '3' }
      ],
      retirementAdd: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      agreeModal: false,
      refuseModal: false,
      oneData: {}
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.ScrappedList.mark = '0';
    this.getData();
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
        if (e.keyCode === 13 && e.target.baseURI.match(/assetRetirementApproval/)) {
          this.search();
        }
      };
    },
    view(datas, data) {
      this.$router.push({ path: '/retirementDetail/', query: { id: data.id, status: data.staut } });
    },
    // 根据筛选条件查询
    search() {
      this.ScrappedList.mark = '1';
      this.getData();
    },
    // 重置筛选条件
    reset() {
      this.ScrappedList.code = '';
      this.ScrappedList.scrappedTime = '';
      this.ScrappedList.staut = '';
    },
    changePage() {
      this.getData();
    },
    // 控制批量按钮
    selectBth(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
    },
    close() {
      this.retirementAdd = false;
    },
    // 新增数据
    add() {
      this.retirementAdd = true;
    },
    allAgree() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要同意的数据');
      } else {
        this.agreeModal = true;
      }
    },
    Agree(data) {
      this.oneData = data;
      if (data.staut == 2) {
        this.$Message('该采购计划已审批');
      } else if (data.staut == 3) {
        this.$Message('该采购计划未通过');
      } else {
        this.agreeModal = true;
      }
    },
    agreeConfirm() {
      let ids = [];
      if (this.$refs.table.getSelection().length > 0) {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          ids.push(this.$refs.table.getSelection()[i].id);
        }
      } else {
        ids.push(this.oneData.id);
      }
      this.ApprovalList.ids = ids.join(',');
      R.Approval.ScrappedAgree(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.agreeModal = false;
            this.$Message.success('同意审批');
            this.getData();
          }, 200);
        }
      });
    },
    agreeClose() {
      this.agreeModal = false;
    },
    Refuse(data) {
      this.oneData = data;
      if (data.staut == 2) {
        this.$Message('该采购计划已审批');
      } else if (data.staut == 3) {
        this.$Message('该采购计划未通过');
      } else {
        this.refuseModal = true;
      }
    },
    allRefuse() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要拒绝的数据');
      } else {
        this.refuseModal = true;
      }
    },
    refuseConfirm() {
      let ids = [];
      if (this.$refs.table.getSelection().length > 0) {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          ids.push(this.$refs.table.getSelection()[i].id);
        }
      } else {
        ids.push(this.oneData.id);
      }
      this.ApprovalList.ids = ids.join(',');
      R.Approval.ScrappedRefuse(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.refuseModal = false;
            this.$Message.success('拒绝审批');
            this.getData();
          }, 200);
        }
      });
    },
    refuseClose() {
      this.refuseModal = false;
    },
    // 审批数据
    approval() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要审批的数据');
      } else {
        if (this.$refs.table.getSelection().length >= 2) {
          this.$Message('审批仅支持单条数据');
        } else {
          this.$router.push({
            path: `/retirementApprovalDetail/${this.$refs.table.getSelection()[0].id}`
          });
        }
      }
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.ScrappedList.page = this.pagination.page;
      this.ScrappedList.size = this.pagination.size;
      R.Approval.findAllScrappedApproved(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
        if (resp.ok) {
          this.isLoading = false;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        } else {
          this.isLoading = false;
          this.$Message.error('获取数据失败,请重试');
        }
      });
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = ['报废编号', '标题', '申请人', '申请日期', '报废日期', '报废资产数量','报废原因', '审批状态'];
        const filterVal = ['number', 'title', 'applicantName', 'applicantTime', 'scrappedTime', 'number', 'reasonForScrapping','statusName'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '资产报废审批表');
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
