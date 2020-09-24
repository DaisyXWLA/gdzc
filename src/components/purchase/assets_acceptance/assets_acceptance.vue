<style lang="less"></style>

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
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 采购类型：
            <Select style="width:12%" v-model="typeSelect" :autosize="true" :datas="typeParam"></Select>&nbsp;&nbsp;验收方式：
            <Select style="width:12%" v-model="apSelect" :autosize="true" :datas="apParam"></Select>&nbsp;&nbsp;验收状态：
            <Select style="width:12%" v-model="select" :autosize="true" :datas="param"></Select>&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <!-- <button
              class="h-btn h-btn-s"
              style="border-block-color:blue"
              v-bg-color:blue
              v-color:white
              @click="modify(data)"
              v-has="'assetsAcceptancestart'"
            >
              <i class="icon-play"></i>
              批量验收
            </button>-->
            <Button
              color="blue"
              icon="h-icon-edit"
              @click="checkPurchase"
              v-has="'assetsAcceptancestart'"
            >批量验收</Button>
            <Button
              color="green"
              icon="h-icon-outbox"
              @click="frontEndExportExcel"
            >导出</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" :height="tableHeight" checkbox>
              <TableItem title="序号" prop="$serial" :width="50" align="center"></TableItem>
              <TableItem title="计划编号" :width="200" align="left">
                <template slot-scope="{data}">
                  <a href="#" @click="view(datas, data)">{{data.number}}</a>
                </template>
              </TableItem>
              <TableItem title="标题" prop="title" :width="430" align="left"></TableItem>
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
              <TableItem title="采购总数量" prop="count" :width="85" align="right"></TableItem>
              <TableItem title="申请人" prop="creatorName" :width="100" align="left"></TableItem>
              <TableItem title="验收方式" :width="100" align="center">
                <template slot-scope="{data}">
                  <div v-if="data.acceptMethod==0">到货验收</div>
                  <div v-else>开箱验收</div>
                </template>
              </TableItem>
              <TableItem title="验收人" prop="acceptor" :width="100" align="left"></TableItem>
              <TableItem title="验收时间" prop="acceptTime" :width="100" align="center"></TableItem>
              <TableItem title="验收状态" :width="100" align="center">
                <template slot-scope="{data}">
                  <div v-if="data.acceptType==0">
                    <span class="h-tag h-tag-yellow" style="width:74px;">待验收</span>
                  </div>
                  <div v-else-if="data.acceptType==1">
                    <span class="h-tag h-tag-green">{{data.acceptCount}}/{{data.count}}</span>
                  </div>
                  <div v-else>
                    <span class="h-tag h-tag-green">验收通过</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" align="center" fixed="right" :width="120">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.acceptType==2"
                    :disabled="true"
                    class="h-btn h-btn-s"
                    style="border-block-color:#CB98EA"
                    v-bg-color:#CB98EA
                    v-color:white
                    @click="modify(data)"
                    v-has="'assetsAcceptancestart'"
                  >
                    <i class="icon-play"></i>
                    开始验收
                  </button>
                  <button
                    v-else
                    class="h-btn h-btn-s accept"
                    style="border-block-color:#ab51e6"
                    v-bg-color:#ab51e6
                    v-color:white
                    @click="modify(data)"
                    v-has="'assetsAcceptancestart'"
                  >
                    <i class="icon-play"></i>
                    开始验收
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
    <Modal v-model="openPlanModify" :closeOnMask="false" :hasCloseIcon="true">
      <planModify @getData="getData" :fruit="purchaseId" @close="openPlanModify=false"></planModify>
    </Modal>
    <Modal v-model="acceptanceModal">
      <div slot="header" class="title">验收</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定验收？
      </div>
      <div slot="footer">
        <Button color="primary" @click="modalConfirm">确定</Button>
        <Button @click="modalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import planModify from './assets_acceptance_modify';
import PurchaseModel from 'model/Purchase/PurchaseModel';
export default {
  components: {
    planModify
  },
  data() {
    return {
      PurchaseList: PurchaseModel.parse({}),
      openPlanModify: false,
      purchaseId: '',
      datas: [],
      select: null,
      param: [
        { title: '待验收', key: '0' },
        { title: '验收中', key: '1' },
        { title: '验收通过', key: '2' }
      ],
      typeSelect: null,
      typeParam: [
        { title: '资产采购', key: '0' },
        { title: '耗材采购', key: '1' }
      ],
      apSelect: null,
      apParam: [
        { title: '到货验收', key: '0' },
        { title: '开箱验收', key: '1' }
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      tableHeight: 0,
      acceptanceModal: false
    };
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(to, from);
  //     this.getData();
  //   }
  // },
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
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/assetsAcceptance/)) {
          this.search();
        }
      };
    },
    checkPurchase() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要验收的数据');
      } else {
        this.acceptanceModal = true;
      }
    },
    modalConfirm() {
      let ids = [];
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        ids.push(this.$refs.table.getSelection()[i].id);
      }
      this.PurchaseList.ids = ids.join(',');
      R.Purchase.checkPurchase(PurchaseModel.dispose(this.PurchaseList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('验收成功');
          this.getData();
          this.acceptanceModal = false;
        }
      });
    },
    modalClose() {
      this.acceptanceModal = false;
    },
    view(datas, data) {
      this.$router.push({ path: '/purchaseAcceptance/' + data.id });
    },
    // 根据筛选条件查询
    search() {
      this.PurchaseList.acceptType = this.select;
      this.PurchaseList.type = this.typeSelect;
      this.PurchaseList.acceptMethod = this.apSelect;
      this.PurchaseList.page = this.pagination.page;
      this.PurchaseList.size = this.pagination.size;
      this.getData();
    },
    // 重置筛选条件
    reset() {
      this.select = '';
      this.typeSelect = '';
      this.apSelect = '';
      this.PurchaseList.number = '';
    },
    changePage() {
      this.getData();
    },

    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.PurchaseList.page = this.pagination.page;
      this.PurchaseList.size = this.pagination.size;
      R.Purchase.PurchaseApList(PurchaseModel.dispose(this.PurchaseList)).then(resp => {
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
      this.purchaseId = this.datas[this.datas.indexOf(data)].id;
      // console.log(this.purchaseId);
      this.openPlanModify = true;
      // this.$refs.modify.getModifyData(this.datas[this.datas.indexOf(data)].id);
    },
    // 删除数据（可批量删除）
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        let ids = [];
        this.$Confirm('确定删除？', '删除')
          .then(() => {
            for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
              ids.push(this.$refs.table.getSelection()[i].id);
            }
            this.PurchaseList.ids = ids.join(',');
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
        const tHeader = [
          '计划编号',
          '标题',
          '采购类型',
          '采购总数量',
          '申请人',
          '验收方式',
          '验收人',
          '验收时间',
          '验收状态'
        ];
        const filterVal = [
          'number',
          'title',
          'typeName',
          'count',
          'creatorName',
          'acceptMethodName',
          'acceptTime',
          'createTime',
          'acceptTypeName'
        ];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '资产验收');
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
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
.accept {
  border-color: #ab51e6;
  &:hover {
    border-color: rgba(171, 81, 230, 0.8) !important;
    background-color: rgba(171, 81, 230, 0.8) !important;
  }
}
</style>
