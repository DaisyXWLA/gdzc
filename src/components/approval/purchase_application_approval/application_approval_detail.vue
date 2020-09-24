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
              <FormItem label="申请单号:">{{PurchaseAdd.number}}</FormItem>
              <FormItem label="采购类型:">{{PurchaseAdd.type}}</FormItem>
              <FormItem label="申请金额:">{{PurchaseAdd.price}}</FormItem>
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
            <div style="width:100% ;height:130px;">
              <div style="width:100% ;height:100px;">
                <ImagePreview :width="90" :borderRadius="4" :datas="images" @click="openPreview" />
              </div>
              <div>
                <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{ d }}</span>
              </div>
            </div>
            <h3 class="blue-color">审批意见</h3>
            <textarea rows="3" v-autosize v-wordcount="50" v-model="Approval" style="width:100%"></textarea>
            <div style="width:100%;text-align: center;">
              <Button color="blue" icon="icon-circle-check" @click="Agree()">同意</Button>
              <Button color="yellow" icon="icon-ban" @click="Refuse()">拒绝</Button>
            </div>
          </div>
        </div>
        <div v-if="selectedTab == 'module2'" class="table-wrapper">
          <h3 class="blue-color">审批流程</h3>
          <div>
            <img :src="img" />
          </div>
          <h3 class="blue-color">审批信息</h3>
          <div>
            <Table ref="table" :datas="datasT" :loading="isLoading">
              <TableItem title="审批人" prop="approver" align="center"></TableItem>
              <TableItem title="流程节点" prop="node" align="center"></TableItem>
              <TableItem title="审批状态" align="center">
                <template slot-scope="{data}">
                  <div v-if="data.staut==0">
                    <span class="h-tag h-tag-yellow">待审批</span>
                  </div>
                  <div v-else-if="data.staut==1">
                    <span class="h-tag h-tag-green">审批中</span>
                  </div>
                  <div v-else-if="data.staut==2">
                    <span class="h-tag h-tag-green">已完成</span>
                  </div>
                  <div v-else>
                    <span class="h-tag h-tag-red">未通过</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="审批时间" prop="time" align="center"></TableItem>
              <TableItem title="审批意见" prop="opinion" align="center"></TableItem>
              <TableItem title="审批结果" prop="result" align="center"></TableItem>
              <div slot="empty">暂无数据</div>
            </Table>
          </div>
          <h3 class="blue-color">审批意见</h3>
          <textarea rows="3" v-autosize v-wordcount="50" v-model="ApprovalT" style="width:100%"></textarea>
          <div style="width:100%;text-align: center;">
            <Button color="blue" icon="icon-circle-check" @click="AgreeT()">同意</Button>
            <Button color="yellow" icon="icon-ban" @click="RefuseT()">拒绝</Button>
          </div>
        </div>
      </div>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import PurchaseAssetsModel from 'model/Purchase/PurchaseAssetsModel';
import PurchaseModel from 'model/Purchase/PurchaseModel';
import ApprovalModel from 'model/Approval/Approval';
export default {
  data() {
    return {
      Approval: '',
      ApprovalT: '',
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      PurchaseAssetsAdd: PurchaseAssetsModel.parse({}),
      PurchaseAdd: PurchaseModel.parse({}),
      ApprovalList: ApprovalModel.parse({}),
      tabConfig: {
        module1: '基本信息',
        module2: '审批信息'
      },
      img: '',
      images: [],
      uploadIds: [],
      download: [],
      datas: [],
      datasT: [],
      selectedTab: 'module1',
      datas: [],
      pagination: {
        page: 1,
        size: 5,
        total: 0
      },
      isLoading: false,
      loading: false
    };
  },
  watch: {
    $route(to, from) {
      this.images = [];
      this.uploadIds = [];
      this.download = [];
      this.img = '/api/purchaseApproved/getProcessDiagram?id=' + this.$route.params.useId;
      this.getModifyData(this.$route.params.useId);
      this.getApprovalList(this.$route.params.useId);
    }
  },
  mounted() {
    this.img = '/api/purchaseApproved/getProcessDiagram?id=' + this.$route.params.useId;
    this.getModifyData(this.$route.params.useId);
    this.getApprovalList(this.$route.params.useId);
  },

  methods: {
    openPreview(index, data) {
      if (this.download[index] == '0') {
        this.PurchaseAdd.docId = this.uploadIds[index];
        location.href = '../' + this.FILEURL.fileUrl + this.PurchaseAdd.docId;
      } else {
        this.$ImagePreview(this.images, index);
      }
    },
    Agree() {
      this.ApprovalList.ids = this.$route.params.useId;
      this.ApprovalList.opinion = this.Approval;
      R.Approval.Agree(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('同意审批');
          setTimeout(() => {
            this.getData();
          }, 1000);
        }
      });
    },
    Refuse() {
      this.ApprovalList.ids = this.$route.params.useId;
      this.ApprovalList.opinion = this.Approval;
      R.Approval.Refuse(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('拒绝审批');
          setTimeout(() => {
            this.getData();
          }, 1000);
        }
      });
    },
    AgreeT() {
      this.ApprovalList.ids = this.$route.params.useId;
      this.ApprovalList.opinion = this.ApprovalT;
      R.Approval.Agree(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('同意审批');
          setTimeout(() => {
            this.getData();
          }, 1000);
        }
      });
    },
    RefuseT() {
      this.ApprovalList.ids = this.$route.params.useId;
      this.ApprovalList.opinion = this.ApprovalT;
      R.Approval.Refuse(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('拒绝审批');
          setTimeout(() => {
            this.getData();
          }, 1000);
        }
      });
    },
    changePage() {
      this.PurchaseAssetsAdd.purchaseId = this.$route.params.useId;
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
    getApprovalList(id) {
      // console.log(id);
      this.ApprovalList.id = id;
      R.Approval.List(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.datasT = resp.body;
        }
      });
    },
    getModifyData(id) {
      this.loading = true;
      this.PurchaseAdd.id = id;
      R.Purchase.PurchaseFindOne(PurchaseModel.dispose(this.PurchaseAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.PurchaseAdd = PurchaseModel.parse(resp.body);
        } else {
          this.loading = false;
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
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Purchase.PurchaseFindOneImg(PurchaseModel.dispose(this.PurchaseAdd)).then(resp => {
        if (resp.ok) {
          for (let i = 0; i < resp.body.length; i++) {
            this.uploadIds.push(resp.body[i].id);
            if (resp.body[i].docExt.indexOf('.doc') != -1) {
              this.images.push(this.linkT + 'doc.jpg');
              this.download.push('0');
            } else if (resp.body[i].docExt.indexOf('.xls') != -1) {
              this.images.push(this.linkT + 'xls.jpg');
              this.download.push('0');
            } else {
              this.images.push(this.link + resp.body[i].docSaveName);
              this.download.push('1');
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
  margin: 25px 0 10px;
}
.upload-name {
  width: 90px;
}
//详情页面基本信息样式
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
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 16px);
  overflow: auto;
}
img {
  color: #999;
}
.pic {
  text-align: center;
}
</style>
