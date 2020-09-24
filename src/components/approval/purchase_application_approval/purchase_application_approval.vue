<style lang="less"></style>

<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            申请编号：
            <input
              type="text"
              v-model="PurchaseList.number"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 采购类型：
            <Select style="width:12%" v-model="typeSelect" :autosize="true" :datas="typeParam"></Select>&nbsp;&nbsp;审批状态：
            <Select style="width:12%" v-model="select" :autosize="true" :datas="param"></Select>&nbsp;&nbsp;
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
              v-has="'purchaseApplicationApprovalapprove'"
            >审批</Button>
            <Button
              v-show="deleteBtn"
              color="green"
              icon="h-icon-edit"
              @click="allAgree"
              v-has="'purchaseApplicationApprovalagree'"
            >批量同意</Button>
            <Button
              v-show="deleteBtn"
              color="yellow"
              icon="h-icon-trash"
              @click="allRefuse"
              v-has="'purchaseApplicationApprovalrefuse'"
            >批量拒绝</Button>
             <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" checkbox @select="selectBth">
              <TableItem title="序号" prop="$serial" :width="30" align="center"></TableItem>
              <TableItem title="申请编号" :width="120" align="left">
                <template slot-scope="{data}">
                  <a href="#" @click="view(datas, data)">{{data.number}}</a>
                </template>
              </TableItem>
              <TableItem title="标题" :width="380" align="left">
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
              <TableItem title="采购类型" :width="100" align="center">
                <template slot-scope="{ data }">
                  <div v-if="data.type == 0">
                    <span>资产采购</span>
                  </div>
                  <div v-else>
                    <span>耗材采购</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="申请采购数量" prop="count" :width="100" align="right"></TableItem>
              <TableItem title="申请金额" prop="price" :width="80" align="right"></TableItem>
              <TableItem title="采购周期" :width="200" align="center">
                <template slot-scope="{data}">
                  <span>{{data.startTime}}-{{data.endTime}}</span>
                </template>
              </TableItem>
              <TableItem title="申请人" prop="creatorName" :width="80" align="left"></TableItem>
              <TableItem title="申请日期" prop="createTime" :width="100" align="center"></TableItem>
              <TableItem title="审批状态" :width="100" align="center">
                <template slot-scope="{data}">
                  <div v-if="data.approvalEntity.staut==0">
                    <span class="h-tag h-tag-yellow">待审批</span>
                  </div>
                  <div v-else-if="data.approvalEntity.staut==1">
                    <span class="h-tag h-tag-green">审批中</span>
                  </div>
                  <div v-else-if="data.approvalEntity.staut==2">
                    <span class="h-tag h-tag-green">已完成</span>
                  </div>
                  <div v-else>
                    <span class="h-tag h-tag-red">未通过</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" fixed="right" align="center" :width="200">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.approvalEntity.staut==0||data.approvalEntity.staut==1"
                    class="h-btn h-btn-s h-btn-blue"
                    @click="Agree(data)"
                    v-has="'purchaseApplicationApprovalagree'"
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
                    v-has="'purchaseApplicationApprovalagree'"
                    style="border:1px solid #8AB5F9;cursor: not-allowed;"
                  >
                    <i class="h-icon-edit"></i>
                    同意
                  </button>
                  <button
                    v-if="data.approvalEntity.staut==0||data.approvalEntity.staut==1"
                    class="h-btn h-btn-s h-btn-yellow"
                    @click="Refuse(data)"
                    v-has="'purchaseApplicationApprovalrefuse'"
                  >
                    <i class="h-icon-trash"></i>&nbsp;拒绝
                  </button>
                  <button
                    v-else
                    v-bg-color:#FCDE89
                    v-color:white
                    class="h-btn h-btn-s"
                    @click="Refuse(data)"
                    v-has="'purchaseApplicationApprovalrefuse'"
                    style="border:1px solid #FCDE89;cursor: not-allowed;"
                  >
                    <i class="h-icon-trash"></i>&nbsp;拒绝
                  </button>
                </template>
              </TableItem>
              <div slot="empty">暂时无数据</div>
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
import PurchaseModel from 'model/Purchase/PurchaseModel';
import ApprovalModel from 'model/Approval/Approval';
export default {
  components: {},
  data() {
    return {
      PurchaseList: PurchaseModel.parse({}),
      ApprovalList: ApprovalModel.parse({}),
      openPlanAdd: false,
      deleteBtn: false,
      openPlanModify: false,
      purchaseId: '',
      datas: [],
      select: null,
      param: [
        { title: '待审批', key: '0' },
        { title: '审批中', key: '1' },
        { title: '已完成', key: '2' },
        { title: '未通过', key: '3' }
      ],
      typeSelect: null,
      typeParam: [
        { title: '资产采购', key: '0' },
        { title: '耗材采购', key: '1' }
      ],
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
    this.PurchaseList.mark = '0';
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
        if (e.keyCode === 13 && e.target.baseURI.match(/purchaseApplicationApproval/)) {
          this.search();
        }
      };
    },
    view(datas, data) {
      this.$router.push({ path: '/applicationDetail/', query: { id: data.id, status: data.staut } });
    },
    // 根据筛选条件查询
    search() {
      this.PurchaseList.approvalType = this.select;
      this.PurchaseList.mark = '1';
      this.PurchaseList.type = this.typeSelect;
      this.PurchaseList.page = this.pagination.page;
      this.PurchaseList.size = this.pagination.size;
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
    allAgree() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要同意的数据');
      } else {
        this.agreeModal = true;
      }
    },
    Agree(data) {
      this.oneData = data;
      if (data.approvalEntity.staut == 2) {
        this.$Message('该采购计划已审批');
      } else if (data.approvalEntity.staut == 3) {
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
      R.Approval.Agree(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
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
      if (data.approvalEntity.staut == 2) {
        this.$Message('该采购计划已审批');
      } else if (data.approvalEntity.staut == 3) {
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
      R.Approval.Refuse(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
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
    // 重置筛选条件
    reset() {
      this.PurchaseList.number = '';
      this.typeSelect = '';
      this.select = '';
    },
    changePage() {
      this.getData();
    },

    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.PurchaseList.page = this.pagination.page;
      this.PurchaseList.size = this.pagination.size;
      R.Approval.findAllApplyApproved(PurchaseModel.dispose(this.PurchaseList)).then(resp => {
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
    // 审批数据
    approval() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要审批的数据');
      } else {
        if (this.$refs.table.getSelection().length >= 2) {
          this.$Message('审批仅支持单条数据');
        } else {
          this.$router.push({ path: `/planApprovalDetail/${this.$refs.table.getSelection()[0].id}` });
        }
      }
    },
    // 逐条删除数据
    del(data) {
      let ids = [];
      this.$Confirm('确定删除？', '删除')
        .then(() => {
          ids.push(this.datas[this.datas.indexOf(data)].id);
          this.PurchaseList.ids = ids.join(',');
          this.datas.splice(this.datas.indexOf(data), 1);
          R.Purchase.DeletePurchase(PurchaseModel.dispose(this.PurchaseList)).then(resp => {
            if (resp.ok) {
              this.$Message.success('数据刪除成功');
              setTimeout(() => {
                this.getData();
              }, 2000);
            }
          });
        })
        .catch(() => {});
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = ['申请编号', '标题', '采购类型', '申请采购数量', '申请金额', '采购周期','申请人', '申请日期', '审批状态'];
        const filterVal = ['number', 'title', 'typeName', 'count', 'price', 'cycleTime', 'creatorName','createTime', 'statusName'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '采购申请审批表');
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
