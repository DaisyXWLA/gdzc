<template>
  <div class="app-home-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <h3 class="blue-color" style="padding-top:0">基本信息</h3>
        <Form mode="twocolumn" :labelWidth="150">
          <FormItem label="标题：">{{assetInventoryList.title}}</FormItem>
          <FormItem label="盘点人：">{{assetInventoryList.inventoryPeopleName}}</FormItem>
          <FormItem label="盘点方式：">{{assetInventoryList.inventoryStyleName}}</FormItem>
          <FormItem label="盘点单号：">{{assetInventoryList.code}}</FormItem>
          <FormItem label="计划盘点时间：">{{assetInventoryList.planStartTime}}</FormItem>
          <FormItem label="创建日期：">{{assetInventoryList.createTime}}</FormItem>
          <FormItem label="创建人：">{{assetInventoryList.creatorName}}</FormItem>
          <FormItem label="盘点范围：">{{assetInventoryList.inventoryRangeName}}</FormItem>
          <!-- <FormItem label="允许使用人自盘">{{assetInventoryList.}}</FormItem> -->
          <FormItem label="盘点时间：">{{assetInventoryList.startTime}}</FormItem>
          <FormItem label="盘点进度：">{{assetInventoryList.schedule}}</FormItem>
          <FormItem label="备注：" single>{{assetInventoryList.remarks}}</FormItem>
        </Form>
        <Row :space-y="20">
          <Cell :width="24">
            <h3 class="blue-color">盘点信息</h3>
          </Cell>
          <Cell :width="24">
            <div class="inventory-detail-search">
              <label>总数量：</label>
              <input
                type="text"
                readonly
                v-model="assetInventoryList.totalInventory"
                class="readonly"
              />&nbsp;&nbsp;
              <label>盘存数：</label>
              <input
                type="text"
                readonly
                v-model="assetInventoryList.inventoryNumber"
                class="readonly"
              />&nbsp;&nbsp;
              <Select
                v-model="AssetsAdd.status"
                :datas="statusVal"
                :autosize="true"
                style="width: 12%;"
                placeholder="盘存状态"
                @input="getAssets"
              ></Select>&nbsp;&nbsp;
              <Select
                v-model="AssetsAdd.useDepartment"
                :datas="useDepartment"
                :autosize="true"
                style="width: 12%;"
                placeholder="部门"
                @input="getAssets"
                :filterable="true"
              ></Select>&nbsp;&nbsp;
              <Select
                v-model="AssetsAdd.useId"
                :datas="userId"
                :autosize="true"
                style="width: 12%;"
                placeholder="使用人"
                @input="getAssets"
                :filterable="true"
              ></Select>&nbsp;&nbsp;
              <input
                type="text"
                v-model="AssetsAdd.storageLocation"
                placeholder="存放地点"
                @input="getAssets"
                v-width="120"
              />&nbsp;&nbsp;
            </div>
          </Cell>
        </Row>
        <Row>
          <Cell :width="24">
            <Table ref="table" :datas="datas" :height="343" :loading="isLoading">
              <TableItem title="序号" prop="$serial" align="center" :width="40"></TableItem>
              <TableItem title="是否盘存" align="center" :width="80">
                <template slot-scope="{ data }">
                  <h-switch v-model="data.status" disabled>
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </h-switch>
                </template>
              </TableItem>
              <TableItem title="资产编号" prop="newCode" align="left" :width="100"></TableItem>
              <TableItem title="资产名称" align="left" :width="120">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.assetsName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="类别" prop="assetsCategoryName" align="left" :width="100"></TableItem>
              <TableItem title="品牌" prop="brand" align="left" :width="100"></TableItem>
              <TableItem title="使用部门" prop="useDepartmentName" align="left" :width="80"></TableItem>
              <TableItem title="使用人" prop="username" align="left" :width="80"></TableItem>
              <TableItem title="存放地点" prop="storageLocation" align="left" :width="150"></TableItem>
            </Table>
            <!-- <p v-height="2"></p>
            <div>
              <Pagination
                v-if="pagination.total > 0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>-->
          </Cell>
        </Row>
      </div>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import assetInventoryModel from 'model/Assets/AssetInventory';
import AssetsModel from 'model/Assets/Assets';
export default {
  props: ['inventoryId'],
  data() {
    return {
      assetInventoryList: assetInventoryModel.parse({}),
      AssetsAdd: AssetsModel.parse({}),
      statusVal: [
        { title: '是', key: '1' },
        { title: '否', key: '0' }
      ],
      useDepartment: [],
      userId: [],
      datas: [],
      pagination: {
        page: 1,
        size: 10000,
        total: 10000
      },
      loading: false,
      isLoading: false
    };
  },
  mounted() {
    this.getData(this.$route.params.id);
    this.getList();
  },
  watch: {
    $route: 'getPath'
  },
  methods: {
    getPath() {
      this.getData(this.$route.params.id);
      this.getList();
    },
    getData(id) {
      this.loading = true;
      this.assetInventoryList.id = id;
      this.assetInventoryList.inventoryStyleCode = 'inventoryStyle';
      R.Inventory.findOne(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.loading = false;
            this.assetInventoryList = assetInventoryModel.parse(resp.body);
            this.getAssets();
          }, 500);
        } else {
          this.loading = false;
          // this.$Message.error('获取基本信息失败，请稍后重试');
        }
      });
    },
    getAssets() {
      this.isLoading = true;
      this.AssetsAdd.id = this.$route.params.id;
      this.AssetsAdd.page = this.pagination.page;
      this.AssetsAdd.size = this.pagination.size;
      R.Inventory.findAllAssets(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.$Message.error('获取盘点信息失败，请稍后重试');
        }
      });
    },
    getList() {
      R.pullDownList.user(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.userId = resp.body;
        }
      });
      R.pullDownList.department(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.useDepartment = resp.body;
        }
      });
    },
    changePage() {
      this.getAssets();
    }
  }
};
</script>
<style lang="less" scoped>
.h-form /deep/ .h-form-item {
  padding-bottom: 0;
}
.h-form /deep/ .h-form-item-wrap {
  line-height: 32px;
  color: #515a6e;
}
.h-form /deep/ .h-form-item-label {
  color: #17233d;
}
/deep/ .h-switch .h-switch-span[checked] .h-switch-inner {
  color: #666;
}
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 45px);
  overflow: auto;
}
</style>
