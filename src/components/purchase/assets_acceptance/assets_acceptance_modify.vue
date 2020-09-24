<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header modal-title">开始资产验收</header>
    <div>
      <div style="padding:5px">
        <Form
          :label-width="110"
          mode="twocolumn"
          :model="PurchaseAdd"
          ref="form"
          :top="0.2"
          showErrorTip
        >
          <FormItem label="标题：" :single="true" prop="title">
            <input type="text" v-model="PurchaseAdd.title" v-wordlimit="15" readonly />
          </FormItem>
          <FormItem label="采购类型" prop="type">
            <input type="text" v-model="PurchaseAdd.type" v-wordlimit="15" readonly />
          </FormItem>
          <FormItem label="计划编号" prop="code">
            <input type="text" v-model="PurchaseAdd.number" readonly />
          </FormItem>
          <FormItem label="采购周期" prop="time">
            <Row :space="0">
              <Cell width="14">
                <DateRangePicker v-model="PurchaseAdd.time" @confirm="changeDate" :disabled="true"></DateRangePicker>
              </Cell>
              <Cell width="4">
                <button class="h-btn" style="width:64px;height:31.5px ;">
                  <span>预计</span>
                </button>
              </Cell>
              <Cell width="3">
                <input
                  type="text"
                  style="border: 1px solid #d3d3d3"
                  v-model="PurchaseAdd.days"
                  readonly
                />
              </Cell>
              <Cell width="1">
                <button class="h-btn" style="height:31.5px ;">
                  <span>日</span>
                </button>
              </Cell>
            </Row>
          </FormItem>
          <FormItem label="计划金额" prop="price">
            <input type="text" v-model="PurchaseAdd.price" v-wordlimit="15" readonly />
          </FormItem>
          <FormItem label="申请人" prop="creator">
            <input type="text" v-model="PurchaseAdd.creatorName" v-wordlimit="15" readonly />
          </FormItem>
          <FormItem label="申请时间" prop="createTime">
            <input type="text" v-model="PurchaseAdd.createTime" v-wordlimit="15" readonly />
          </FormItem>
          <FormItem label="备注" :single="true" prop="remarks">
            <input type="text" v-model="PurchaseAdd.remarks" v-wordlimit="15" />
          </FormItem>
        </Form>
      </div>
      <Row :space-y="20">
        <Cell :width="24">
          <h3 class="blue-color" v-font="16">验收信息</h3>
        </Cell>
      </Row>
      <div style="padding:5px">
        <Form
          :label-width="110"
          mode="twocolumn"
          :model="PurchaseAssetsModel"
          ref="formT"
          :top="0.2"
          showErrorTip
        >
          <FormItem label="验证类型：" prop="title">
            <Select v-model="PurchaseAdd.acceptMethod" :autosize="true" :datas="param"></Select>
          </FormItem>
          <FormItem label="验证人：" prop="type">
            <input type="text" v-model="PurchaseAdd.acceptor" v-wordlimit="15" readonly />
          </FormItem>
        </Form>
      </div>
      <Row :space-y="20">
        <Cell :width="24">
          <h3 class="blue-color" v-font="16">
            采购资产
            <Button color="green" @click="remove">验收通过</Button>
          </h3>
        </Cell>
      </Row>
      <Row>
        <Cell :width="24">
          <Table
            ref="table"
            :datas="datas"
            :border="border"
            :stripe="stripe"
            :loading="loading"
            checkbox
            :height="264"
          >
            <TableItem title="序号" width="30px" prop="$serial" align="center"></TableItem>
            <TableItem title="名称" width="100px" prop="purchaseAssetsName" align="left"></TableItem>
            <TableItem title="规格" width="90px" prop="specification" align="left"></TableItem>
            <TableItem title="数量" width="50px" prop="amount" align="right"></TableItem>
            <TableItem title="单价" width="80px" prop="price" align="right"></TableItem>
            <TableItem title="品牌" width="90px" prop="brand" align="left"></TableItem>
            <!-- <TableItem title="单位" width="50px" prop="unit" align="left"></TableItem> -->
            <TableItem title="供应商" width="120px" prop="supplier" align="left"></TableItem>
            <TableItem title="备注" width="90px" prop="remarks" align="left"></TableItem>
            <TableItem title="小计" prop="subtotal" align="right"></TableItem>
            <TableItem title="状态" align="center">
              <template slot-scope="{data}">
                <div v-if="data.acceptType==0">
                  <span class="h-tag h-tag-yellow">待收</span>
                </div>
                <div v-else>
                  <span class="h-tag h-tag-green">通过</span>
                </div>
              </template>
            </TableItem>
            <div slot="empty">暂无数据</div>
          </Table>
        </Cell>
      </Row>
      <Loading :loading="loading"></Loading>
    </div>
    <p></p>
    <!-- <header class="h-modal-header">相关附件</header>
    <div style="width:100% ;height:100px;"></div>-->

    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="save">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
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
import PurchaseAssetsModel from 'model/Purchase/PurchaseAssetsModel';
import PurchaseModel from 'model/Purchase/PurchaseModel';
export default {
  // 父组件传过来的参数
  props: {
    fruit: String
  },
  data() {
    return {
      PurchaseAssetsAdd: PurchaseAssetsModel.parse({}),
      PurchaseAdd: PurchaseModel.parse({}),
      purchaseAssetsId: '',
      value: this.fruit,
      datas: [],
      xuhao: 1,
      param: { 0: '到货验收', 1: '开箱验收' },
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      pagination: {
        page: 1,
        size: 1000,
        total: 0
      },
      loading: false,
      acceptanceModal: false
    };
  },
  mounted() {
    this.PurchaseAdd.acceptMetho = '0';
    this.getModifyData(this.value);
  },
  methods: {
    // 删除数据（可批量删除）
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要通过验收的数据');
      } else {
        this.acceptanceModal = true;
      }
    },
    modalConfirm() {
      let ids = [];
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        this.purchaseAssetsId = this.purchaseAssetsId.replace(this.$refs.table.getSelection()[i].id + ',', '');
        ids.push(this.$refs.table.getSelection()[i].id);
      }
      this.PurchaseAssetsAdd.ids = ids.join(',');
      R.PurchaseAssets.CheckPurchaseAssets(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.getData();
            this.acceptanceModal = false;
          }, 200);
        }
      });
    },
    modalClose() {
      this.acceptanceModal = false;
    },
    getData() {
      this.PurchaseAssetsAdd.page = this.pagination.page;
      this.PurchaseAssetsAdd.size = this.pagination.size;
      R.PurchaseAssets.PurchaseAssetsList(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.xuhao = resp.total + 1;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    getDataTwo() {
      this.PurchaseAssetsAdd.userId = 'admin';
      this.PurchaseAssetsAdd.page = this.pagination.page;
      this.PurchaseAssetsAdd.size = this.pagination.size;
      R.PurchaseAssets.PurchaseAssetsList(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          for (let i = 0; i < this.datas.length; i++) {
            this.purchaseAssetsId += this.datas[i].id + ',';
          }
          this.xuhao = resp.total + 1;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    price() {
      if (this.PurchaseAssetsAdd.amount != null) {
        this.PurchaseAssetsAdd.subtotal = this.PurchaseAssetsAdd.price * this.PurchaseAssetsAdd.amount;
      }
    },
    amount() {
      if (this.PurchaseAssetsAdd.price != null) {
        this.PurchaseAssetsAdd.subtotal = this.PurchaseAssetsAdd.price * this.PurchaseAssetsAdd.amount;
      }
    },
    getModifyData(id) {
      this.loading = true;
      this.PurchaseAdd.id = id;
      R.Purchase.PurchaseFindOne(PurchaseModel.dispose(this.PurchaseAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.PurchaseAdd.id = resp.body.id;
          this.PurchaseAdd.number = resp.body.number;
          this.PurchaseAdd.title = resp.body.title;
          this.PurchaseAdd.type = resp.body.type;
          if (this.PurchaseAdd.type == '0') {
            this.PurchaseAdd.type = '资产采购';
          } else {
            this.PurchaseAdd.type = '耗材采购';
          }
          this.PurchaseAdd.creator = resp.body.creator;
          this.PurchaseAdd.creatorName = resp.body.creatorName;
          this.PurchaseAdd.createTime = resp.body.createTime;
          this.PurchaseAdd.price = resp.body.price;
          this.PurchaseAdd.remarks = resp.body.remarks;
          this.PurchaseAdd.days = resp.body.days;
          let start = resp.body.startTime;
          let end = resp.body.endTime;
          this.PurchaseAdd.time = { start, end };
          this.PurchaseAdd.acceptMethod = resp.body.acceptMethod;
          this.PurchaseAdd.acceptor = resp.body.acceptor;
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败,请重试');
        }
      });
      this.PurchaseAssetsAdd.purchaseId = id;
      this.PurchaseAssetsAdd.page = this.pagination.page;
      this.PurchaseAssetsAdd.size = this.pagination.size;
      R.PurchaseAssets.PurchaseAssetsList(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.xuhao = resp.total + 1;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    save() {
      this.PurchaseAdd.id = this.value;
      R.Purchase.checkSavePurchase(PurchaseModel.dispose(this.PurchaseAdd)).then(resp => {
        if (resp.ok) {
          this.$Message.success('已验收');
          this.PurchaseAdd = PurchaseModel.parse({});
          this.$emit('getData');
          this.close();
        }
      });
    },
    getTime() {
      var date = new Date();
      var seperator1 = '-';
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    changeDate() {
      console.log(this.PurchaseAdd.time);
      this.PurchaseAdd.days = this.DataIff(this.PurchaseAdd.time.start, this.PurchaseAdd.time.end, 'day');
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
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
