<template>
  <div>
    <header class="h-modal-header modal-title">开始盘点</header>
    <div>
      <Row>
        <Cell :width="24">
          <Form ref="form" :label-width="100" :model="assetInventoryList" :top="0.2" showErrorTip>
            <Cell :width="24">
              <FormItem label="标题" prop>
                <input type="text" v-model="assetInventoryList.title" readonly />
              </FormItem>
            </Cell>
            <Cell :width="12">
              <FormItem label="盘点方式" prop>
                <input type="text" v-model="assetInventoryList.inventoryStyleName" readonly />
              </FormItem>
            </Cell>
            <Cell :width="12">
              <FormItem label="盘点人" prop>
                <input type="text" v-model="assetInventoryList.inventoryPeopleName" readonly />
              </FormItem>
            </Cell>
            <Cell :width="12">
              <FormItem label="计划盘点时间" prop="time">
                <Row>
                  <Cell width="18">
                    <DateRangePicker
                      v-model="assetInventoryList.time"
                      @confirm="changeDate"
                      :disabled="true"
                      placeholder="开始 - 结束"
                    ></DateRangePicker>
                  </Cell>
                  <Cell width="2">
                    <span style="display:inline-block;margin-top:20%;padding-left:2px;">预计</span>
                  </Cell>
                  <Cell width="4">
                    <input type="text" style="border: 1px solid #d3d3d3" v-model="days" readonly />
                  </Cell>
                </Row>
              </FormItem>
            </Cell>
            <Cell :width="12">
              <FormItem label="盘点单号" prop>
                <input type="text" v-model="assetInventoryList.code" readonly />
              </FormItem>
            </Cell>
            <!-- <Cell :width="12">
            <FormItem label="创建人" prop>
              <input type="text" v-model="assetInventoryList.creatorName" readonly />
            </FormItem>
          </Cell>
          <Cell :width="12">
            <FormItem label="创建日期" prop>
              <input type="text" v-model="assetInventoryList.createTime" readonly />
            </FormItem>
            </Cell>-->
            <Cell :width="24">
              <FormItem label="盘点范围" prop>
                <input type="text" v-model="assetInventoryList.inventoryRangeName" readonly />
              </FormItem>
            </Cell>
            <Cell :width="24">
              <FormItem label="备注" prop>
                <input type="text" v-model="assetInventoryList.remarks" readonly />
              </FormItem>
            </Cell>
          </Form>
        </Cell>
      </Row>
      <Row :space-y="20">
        <Cell :width="24">
          <h3 class="blue-color">盘点信息</h3>
        </Cell>
        <Cell :width="24">
          <div class="inventory-detail-search">
            <Button
              v-show="modifyBtn"
              class="h-btn h-btn-blue"
              icon="h-icon-edit"
              @click="modify"
              :disabled="modifyDis"
            >编辑</Button>
            <Button
              ref="checkAllBtn"
              v-show="checkBtn"
              class="h-btn h-btn-blue"
              icon="h-icon-menu"
              @click="checkAll"
              :disabled="checkAllDis"
              style="margin-right:20px;"
            >批量盘存</Button>
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
          <Table
            ref="table"
            :datas="datasT"
            :loading="isLoading"
            :height="147"
            @select="select"
            checkbox
          >
            <TableItem title="序号" prop="$serial" align="center" :width="40"></TableItem>
            <TableItem title="是否盘存" align="center" :width="80">
              <template slot-scope="{ data }">
                <h-switch v-model="data.status" @input="Inventory(data)">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </h-switch>
              </template>
            </TableItem>
            <TableItem title="资产编号" prop="newCode" align="left" :width="100"></TableItem>
            <TableItem title="资产名称" align="left" :width="150">
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
            <TableItem title="使用部门" prop="useDepartmentName" align="left" :width="120"></TableItem>
            <TableItem title="使用人" prop="username" align="left" :width="80"></TableItem>
            <TableItem title="存放地点" prop="storageLocation" align="left" :width="150"></TableItem>
          </Table>
          <p v-height="2"></p>
          <!-- <div>
          <Pagination
            v-if="pagination.total > 0"
            align="right"
            v-model="pagination"
            @change="changePage"
          />
          </div>-->
          <p v-height="2"></p>
        </Cell>
      </Row>
      <!-- <Loading :loading="loading"></Loading> -->
    </div>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="close">关闭</button>
    </footer>
    <Modal v-model="inventoryModify" hasCloseIcon>
      <inventoryModify
        @close="inventoryModify=false"
        :inventoryModify="inventoryModify"
        :inventoryData="inventoryData"
        :modifyData="modifyData"
        :useDepartment="useDepartment"
        :userId="userId"
        @getAssets="getAssets"
      ></inventoryModify>
    </Modal>
  </div>
</template>

<script>
import assetInventoryModel from 'model/Assets/AssetInventory';
import AssetsModel from 'model/Assets/Assets';
import inventoryModify from './inventory_modify';
export default {
  components: { inventoryModify },
  props: ['inventoryData'],
  data() {
    return {
      assetInventoryList: assetInventoryModel.parse({}),
      AssetsAdd: AssetsModel.parse({}),
      statusVal: [
        { title: '是', key: '1' },
        { title: '否', key: '0' }
      ],
      data: {
        value: {},
        date: null
      },
      // inventoryStatus: '',
      useDepartment: [],
      userId: [],
      days: '',
      // success: true,
      fail: false,
      datas: [],
      datasT: [],
      pagination: {
        page: 1,
        size: 10000,
        total: 10000
      },
      isLoading: false,
      loading: false,
      checkBtn: false,
      modifyBtn: false,
      inventoryModify: false,
      checkAllDis: false,
      modifyDis: false,
      modifyData: {}
    };
  },
  mounted() {
    this.getModifyData(this.inventoryData);
    this.getList();
  },
  methods: {
    getModifyData(data) {
      // this.loading = true;
      this.assetInventoryList.id = data.id;
      this.assetInventoryList.inventoryStyleCode = 'inventoryStyle';
      R.Inventory.findOne(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.assetInventoryList = assetInventoryModel.parse(resp.body);
            let start = resp.body.planStartTime;
            let end = resp.body.planEndTime;
            this.assetInventoryList.time = { start, end };
            this.days = this.DataIff(start, end, 'day');
            this.getAssets();
            // this.loading = false;
          }, 500);
        } else {
          // this.loading = false;
          // this.$Message.error('获取基本信息失败，请稍后重试');
        }
      });
    },
    getAssets() {
      this.isLoading = true;
      this.AssetsAdd.id = this.inventoryData.id;
      this.AssetsAdd.page = this.pagination.page;
      this.AssetsAdd.size = this.pagination.size;
      // if (this.AssetsAdd.status == '0') {
      //   this.AssetsAdd.status = false;
      // }
      // if (this.AssetsAdd.status == '1') {
      //   this.AssetsAdd.status = true;
      // }
      R.Inventory.findAllAssets(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datasT = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
          this.isLoading = false;
          setTimeout(() => {
            this.checkAllDis = false;
            this.modifyDis = false;
          }, 100);
        } else {
          this.isLoading = false;
          // this.$Message.error('获取盘点信息失败，请稍后重试');
        }
      });
    },
    Inventory(data) {
      this.assetInventoryList.status = data.status;
      this.assetInventoryList.inventoryId = this.inventoryData.id;
      this.assetInventoryList.assetsId = data.id;
      R.Inventory.submitInventory(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.getModifyData(this.inventoryData);
          this.$emit('getData');
        }
      });
    },
    changeDate() {
      // this.taskModel.planHours = this.DataIff(this.taskModel.time.start, this.taskModel.time.end, 'hour');
      this.data.date = this.DataIff(this.data.value.start, this.data.value.end, 'hour');
    },
    // 计算日期差
    DataIff(startTime, endTime, diffType) {
      startTime = startTime.replace(/\-/g, '/');
      endTime = endTime.replace(/\-/g, '/');
      // 将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime); // 开始时间
      var eTime = new Date(endTime); // 结束时间
      // 作为除数的数字
      var divNum = 1;
      switch (diffType) {
        case 'second':
          divNum = 1000;
          break;
        case 'minute':
          divNum = 1000 * 60;
          break;
        case 'hour':
          divNum = 1000 * 3600;
          break;
        case 'day':
          divNum = 1000 * 3600 * 24;
          break;
        default:
          break;
      }
      return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
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
    // success() {
    //   this.$emit('success', this.value);
    //   this.close();
    // },
    close() {
      this.$emit('close');
    },
    changePage() {
      this.getAssets();
    },
    // 批量盘点
    checkAll() {
      if ((this.$refs.table.getSelection(), length < 0)) {
        this.$Message('请选择需要盘存的数据');
      } else {
        // this.isLoading = true;
        this.checkAllDis = true;
        this.modifyDis = true;
        let ids = [];
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          ids.push(this.$refs.table.getSelection()[i].id);
        }
        this.assetInventoryList.status = 'true';
        this.assetInventoryList.inventoryId = this.inventoryData.id;
        this.assetInventoryList.assetsId = ids.join(',');
        R.Inventory.submitInventory(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
          if (resp.ok) {
            // this.isLoading = false;
            this.getModifyData(this.inventoryData);
            this.$emit('getData');
          }
        });
      }
    },
    select(data) {
      if (data.length > 0) {
        this.checkBtn = true;
        this.modifyBtn = true;
      } else {
        this.checkBtn = false;
        this.modifyBtn = false;
      }
    },
    modify() {
      if (this.$refs.table.getSelection().length > 1) {
        this.$Message('编辑仅支持单条数据');
      } else if (this.$refs.table.getSelection().length == 1 && this.$refs.table.getSelection()[0].status == true) {
        this.$Message('当前选择的数据已盘点，不可编辑');
      } else {
        this.inventoryModify = true;
        this.modifyData = this.$refs.table.getSelection()[0];
      }

      // let ids = [];
      // for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
      //   ids.push(this.$refs.table.getSelection()[i].id);
      // }
      // this.assetInventoryList.ids = ids.join(',');
      // // this.inventoryModify = true;
      // R.Inventory.updateAssetsInfo(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
      //   if (resp.ok) {
      //   }
      // });
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
  display: inline-block;
  line-height: 30px;
  /deep/ .readonly {
    width: 60px;
    height: 30px;
    // border-color: #2d7bf4;
  }
}
/deep/ .h-table-container {
  min-width: 949px;
}
</style>
