<template>
  <div class="app-home-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <Tabs :datas="tabConfig" v-model="selectedTab"></Tabs>

        <div v-if="selectedTab == 'module1'" class="table-wrapper">
          <div style="margin-left: 25px;margin-top: 8px;">
            <h3 class="blue-color">基本信息</h3>
            <Form class="info-basic" :label-width="90" mode="twocolumn" readonly>
              <FormItem label="标题:">{{PurchaseAdd.title}}</FormItem>
              <FormItem label="计划单号:">{{PurchaseAdd.number}}</FormItem>
              <FormItem label="采购类型:">{{PurchaseAdd.type}}</FormItem>
              <FormItem label="计划金额:">{{PurchaseAdd.price}}</FormItem>
              <FormItem label="采购周期:">{{PurchaseAdd.startTime}}- {{PurchaseAdd.endTime}}</FormItem>
              <FormItem label="申请日期:">{{PurchaseAdd.createTime}}</FormItem>
              <FormItem label="申请人:" :single="true">{{PurchaseAdd.creator}}</FormItem>
              <FormItem label="备注:" :single="true">{{PurchaseAdd.remarks}}</FormItem>
            </Form>
            <h3 class="blue-color">采购资产</h3>
            <Table ref="table" :datas="datas" :loading="isLoading" checkbox>
              <TableItem title="序号" prop="$serial" align="center"></TableItem>
              <TableItem title="名称" prop="purchaseAssetsName" align="center"></TableItem>
              <TableItem title="规格" prop="specification" align="center"></TableItem>
              <TableItem title="数量" prop="amount" align="center"></TableItem>
              <TableItem title="预计单价" prop="price" align="center"></TableItem>
              <TableItem title="品牌" prop="brand" align="center"></TableItem>
              <!-- <TableItem title="单位" prop="unit" align="center"></TableItem> -->
              <TableItem title="供应商" prop="supplier" align="center"></TableItem>
              <TableItem title="备注" prop="remarks" align="center"></TableItem>
              <TableItem title="小计" prop="subtotal" align="left"></TableItem>
              <div slot="empty">暂无数据</div>
            </Table>
            <p></p>
            <div>
              <Pagination
                v-if="pagination.total>0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>
            <h3 class="blue-color">相关附件</h3>

            <div style="width:100% ;height:100px;"></div>
          </div>
        </div>
        <div v-if="selectedTab == 'module2'" class="table-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PurchaseAssetsModel from 'model/Purchase/PurchaseAssetsModel';
import PurchaseModel from 'model/Purchase/PurchaseModel';
export default {
  data() {
    return {
      PurchaseAssetsAdd: PurchaseAssetsModel.parse({}),
      PurchaseAdd: PurchaseModel.parse({}),
      tabConfig: {
        module1: '基本信息',
        module2: '审批信息'
      },
      datas: [],
      selectedTab: 'module1',
      datas: [],
      pagination: {
        page: 1,
        size: 5,
        total: 0
      },
      isLoading: false
    };
  },
  watch: {
    $route(to, from) {
      // console.log(this.$route.params.useId);
      this.getModifyData(this.$route.params.id);
    }
  },
  mounted() {
    this.getModifyData(this.$route.params.id);
  },
  methods: {
    changePage() {
      this.PurchaseAssetsAdd.purchaseId = this.$route.params.id;
      this.PurchaseAssetsAdd.page = this.pagination.page;
      this.PurchaseAssetsAdd.size = this.pagination.size;
      R.PurchaseAssets.PurchaseAssetsList(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    getModifyData(id) {
      this.PurchaseAdd.id = id;
      R.Purchase.PurchaseFindOne(PurchaseModel.dispose(this.PurchaseAdd)).then(resp => {
        if (resp.ok) {
          this.PurchaseAdd.id = resp.body.id;
          this.PurchaseAdd.number = resp.body.number;
          this.PurchaseAdd.title = resp.body.title;
          this.PurchaseAdd.type = resp.body.type;
          this.PurchaseAdd.creator = resp.body.creator;
          this.PurchaseAdd.createTime = resp.body.createTime;
          this.PurchaseAdd.price = resp.body.price;
          this.PurchaseAdd.remarks = resp.body.remarks;
          this.PurchaseAdd.days = resp.body.days;
          this.PurchaseAdd.startTime = resp.body.startTime;
          this.PurchaseAdd.endTime = resp.body.endTime;
        }
      });
      this.PurchaseAssetsAdd.purchaseId = id;
      this.PurchaseAssetsAdd.page = this.pagination.page;
      this.PurchaseAssetsAdd.size = this.pagination.size;
      R.PurchaseAssets.PurchaseAssetsList(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
h4 {
  width: 100px;
  text-align: right;
}
.inventory-detail-search {
  line-height: 30px;
  .readonly {
    width: 60px;
    height: 30px;
    // border-color: #2d7bf4;
  }
}
</style>
