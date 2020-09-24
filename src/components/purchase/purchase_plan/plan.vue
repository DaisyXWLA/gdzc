<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            计划编号：
            <input
              type="text"
              v-model="PurchaseList.number"
              @keyup.enter="search"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 采购类型：
            <Select
              @keyup.enter="search"
              style="width:12%"
              v-model="PurchaseList.type"
              :autosize="true"
              :datas="typeParam"
            ></Select>&nbsp;&nbsp;审批状态：
            <Select
              @keyup.enter="search"
              style="width:12%"
              v-model="PurchaseList.approvalType"
              :autosize="true"
              :datas="param"
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
              @click="openPlanAdd = true"
              v-has="'purchasePlanadd'"
            >新增</Button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'purchasePlandelete'"
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
              <TableItem title="序号" prop="$serial" :width="40" align="center"></TableItem>
              <TableItem title="计划编号" :width="200" align="left">
                <template slot-scope="{ data }">
                  <a href="#" @click="view(datas, data)">{{ data.number }}</a>
                </template>
              </TableItem>
              <TableItem title="标题" :width="300" align="left">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.title"
                    more="..."
                    :height="35"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="采购类型" prop="typeName" :width="80" align="left">
                <!-- <template slot-scope="{ data }">
                  <div v-if="data.type == 0">
                    <span>资产采购</span>
                  </div>
                  <div v-else>
                    <span>耗材采购</span>
                  </div>
                </template>-->
              </TableItem>
              <TableItem title="计划采购数量" prop="count" :width="100" align="right"></TableItem>
              <TableItem title="计划金额(元)" prop="price" :width="100" align="right"></TableItem>
              <TableItem title="采购周期" :width="180" align="center">
                <template slot-scope="{ data }">
                  <span>{{ data.startTime }} 至 {{ data.endTime }}</span>
                </template>
              </TableItem>
              <TableItem title="申请人" prop="creatorName" :width="80" align="left"></TableItem>
              <TableItem title="申请日期" prop="createTime" :width="100" align="center"></TableItem>
              <TableItem title="审批状态" :width="80" align="center">
                <template slot-scope="{ data }">
                  <div v-if="data.approvalEntity.staut == 0">
                    <span class="h-tag h-tag-yellow">待审批</span>
                  </div>
                  <div v-else-if="data.approvalEntity.staut == 1">
                    <span class="h-tag h-tag-green">审批中</span>
                  </div>
                  <div v-else-if="data.approvalEntity.staut == 2">
                    <span class="h-tag h-tag-green">已完成</span>
                  </div>
                  <div v-else>
                    <span class="h-tag h-tag-red">未通过</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" align="center" fixed="right" :width="150">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.approvalEntity.staut == 0||data.approvalEntity.staut == 3"
                    class="h-btn h-btn-s h-btn-blue"
                    @click="modify(data)"
                    v-has="'purchasePlanupdate'"
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
                    v-has="'purchasePlanupdate'"
                    style="border:1px solid #8AB5F9;cursor: not-allowed;"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <DropdownMenu
                    button
                    v-color:white
                    v-bg-color:#AB51E6
                    @click="trigger"
                    @show="getOneData(data)"
                    :datas="Bparam"
                  >更多</DropdownMenu>
                </template>
              </TableItem>
              <div slot="empty">暂时无数据</div>
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
    <Modal v-model="openPlanAdd" :closeOnMask="false" :hasCloseIcon="true">
      <planAdd @getData="getData" @close="openPlanAdd = false"></planAdd>
    </Modal>
    <Modal v-model="openPlanModify" :closeOnMask="false" :hasCloseIcon="true">
      <planModify @getData="getData" :fruit="purchaseId" @close="openPlanModify = false"></planModify>
    </Modal>
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
import planAdd from './plan_add';
import planModify from './plan_modify';
import PurchaseModel from 'model/Purchase/PurchaseModel';
import uploadFile from '../../common/gdzc/upload_file';
export default {
  components: {
    planAdd,
    planModify
  },
  data() {
    return {
      PurchaseList: PurchaseModel.parse({}),
      openPlanAdd: false,
      openPlanModify: false,
      purchaseId: '',
      datas: [],
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
        size: 20,
        total: 100
      },
      isLoading: false,
      deleteBtn: false,
      oneData: {},
      Bparam: [
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      tableHeight: 0,
      deleteModal: false,
      purchaseCircle: ''
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    this.$nextTick(() => {
      document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
    });
    document.addEventListener('scroll', this.winScroll, true);
    document.getElementById('app').style = 'min-width:1366px;overflow:auto';
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/purchasePlan/)) {
          this.search();
        }
      };
    },
    // 详情
    view(datas, data) {
      // this.$router.push({ path: '/planDetail/' + data.id });
      this.$router.push({ path: '/planDetail/', query: { id: data.id, status: data.approvalEntity.staut } });
    },
    // 根据筛选条件查询
    search() {
      this.PurchaseList.page = this.pagination.page;
      this.PurchaseList.size = this.pagination.size;
      this.getData();
    },
    // 重置筛选条件
    reset() {
      this.PurchaseList.number = '';
      this.PurchaseList.type = '';
      this.PurchaseList.approvalType = '';
    },
    changePage() {
      this.PurchaseList.page = this.pagination.page;
      this.PurchaseList.size = this.pagination.size;
      this.getData();
    },

    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.PurchaseList.page = this.pagination.page;
      this.PurchaseList.size = this.pagination.size;
      R.Purchase.PurchaseList(PurchaseModel.dispose(this.PurchaseList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 164;
            this.isLoading = false;
            this.datas = resp.body;
            this.pagination.page = resp.page;
            this.pagination.size = resp.size;
            this.pagination.total = resp.total;
          }, 500);
        }
      });
    },
    // 编辑数据
    modify(data) {
      if (data.approvalEntity.staut == 1) {
        this.$Message('计划审批中，不可编辑');
      } else if (data.approvalEntity.staut == 2) {
        this.$Message('计划已完成审批，不可编辑');
      } else {
        R.PurchaseAssets.DeleteAll(PurchaseModel.dispose(this.PurchaseList)).then(resp => {});
        this.purchaseId = this.datas[this.datas.indexOf(data)].id;
        this.openPlanModify = true;
      }
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
      this.PurchaseList.ids = ids.join(',');
      R.Purchase.DeletePurchase(PurchaseModel.dispose(this.PurchaseList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('数据刪除成功');
            this.getData();
          }, 200);
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
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
        this.purchaseId = this.oneData.id;
        this.openPlanModify = true;
      } else if (data == 'detail') {
        this.$router.push({ path: '/planDetail/' + this.oneData.id });
      } else if (data == 'delete') {
        if (this.oneData.approvalEntity.staut == 1) {
          this.$Message('计划正在审批中，不可删除');
        } else {
          this.deleteModal = true;
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
        const tHeader = ['计划编号', '标题', '采购类型', '计划采购数量', '计划金额（元）', '采购周期', '申请日期', '审批状态'];
        const filterVal = ['number', 'title', 'typeName', 'count', 'price', 'cycleTime', 'createTime', 'statusName'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '采购计划');
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
  overflow: hidden;
}
//下拉按钮样式
.h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
  padding: 5px 10px;
  border-radius: 4px;
  vertical-align: middle;
}
/deep/ .h-dropdowncustom-show-content {
  padding-right: 14px;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
/deep/ .h-dropdowncustom.h-btn {
  border-color: #ab51e6;
  vertical-align: top;
  &:hover {
    border-color: rgba(171, 81, 230, 0.8) !important;
    background-color: rgba(171, 81, 230, 0.8) !important;
  }
}
</style>
