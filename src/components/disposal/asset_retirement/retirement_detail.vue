<template>
  <div class="app-home-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <Tabs :datas="tabConfig" class-name="h-tabs-card" v-model="selectedTab"></Tabs>
        <div v-if="selectedTab == 'module1'" class="table-wrapper">
          <div style="margin-left: 10px;margin-top: 8px;">
            <h3 class="blue-color">基本信息</h3>
            <Form class="info-basic" :label-width="90" mode="twocolumn" readonly>
              <FormItem label="标题：">{{ScrappedList.title}}</FormItem>
              <FormItem label="报废日期：">{{ScrappedList.scrappedTime}}</FormItem>
              <FormItem label="报废单号：">{{ScrappedList.code}}</FormItem>
              <FormItem label="申请人：">{{ScrappedList.applicantName}}</FormItem>
              <FormItem label="申请日期：">{{ScrappedList.applicantTime}}</FormItem>
              <FormItem label="报废原因：">{{ScrappedList.reasonForScrapping}}</FormItem>
              <FormItem label="备注：">{{ScrappedList.remarks}}</FormItem>
            </Form>
            <h3 class="blue-color">报废资产</h3>
            <Table ref="table" :datas="datas" :loading="isLoading" :height="201">
              <TableItem title="序号" prop="$serial" align="center" :width="50"></TableItem>
              <TableItem title="资产编号" prop="code" align="left" :width="100"></TableItem>
              <TableItem title="财政编号" prop="oldCode" align="left" :width="120"></TableItem>
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
              <TableItem title="取得日期" prop="acquisitionTime" align="left" :width="120"></TableItem>
              <TableItem title="使用部门" prop="useDepartmentName" align="left" :width="120"></TableItem>
              <TableItem title="管理部门" prop="administrativeDepartmentName" align="left" :width="120"></TableItem>
              <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="200"></TableItem>
              <TableItem title="品牌" align="left" :width="100">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.brand"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="型号" align="left" :width="80">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.specificationModel"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="单价" prop="price" align="right" :width="60"></TableItem>
              <TableItem title="数量" prop="number" align="left" :width="60"></TableItem>
              <TableItem title="存放地点" align="left" :width="150">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.storageLocation"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="使用人" prop="username" align="left" :width="80"></TableItem>
              <TableItem title="资产状态" align="center" :width="80">
                <template slot-scope="{ data }">
                  <div v-if="data.assetsStatus == 0">
                    <span class="h-tag h-tag-blue">闲置</span>
                  </div>
                  <div v-else-if="data.assetsStatus == 1">
                    <span class="h-tag h-tag-red">故障</span>
                  </div>
                  <div v-else-if="data.assetsStatus == 2">
                    <span class="h-tag h-tag-yellow">报废</span>
                  </div>
                  <div v-else-if="data.assetsStatus == 3">
                    <span class="h-tag h-tag-green">在用</span>
                  </div>
                  <div v-else>
                    <span class="h-tag h-tag-gray">缺失</span>
                  </div>
                </template>
              </TableItem>
              <div slot="empty">暂无数据</div>
            </Table>
            <p></p>
            <!-- <div>
              <Pagination
                v-if="pagination.total>0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>-->
            <h3 class="blue-color">相关附件</h3>
            <div style="width:100% ;height:150px;">
              <div style="width:100% ;height:100px;">
                <ImagePreview :width="90" :borderRadius="4" :datas="images" @click="openPreview" />
              </div>
              <div>
                <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{d}}</span>
              </div>
            </div>
            <div v-show="approveBtn">
              <h3 class="blue-color">审批意见</h3>
              <textarea rows="3" v-autosize v-model="Approval" style="width:100%"></textarea>
              <div style="width:100%;text-align: center;margin-top:10px;">
                <Button
                  color="blue"
                  icon="icon-circle-check"
                  :disabled="agreeDis"
                  @click="Agree()"
                >同意</Button>
                <Button color="yellow" icon="icon-ban" :disabled="refuseDis" @click="Refuse()">拒绝</Button>
              </div>
            </div>
          </div>
          <Loading :loading="loading"></Loading>
        </div>
        <div v-if="selectedTab == 'module2'" class="table-wrapper">
          <div style="margin-left: 10px;margin-top: 8px;">
            <h3 class="blue-color">审批流程</h3>
            <div style="width:100% ;min-height:100px;" class="pic">
              <img v-if="img==''" src="../../../images/error-pages/non_img.png" alt="暂无流程图" />
              <img v-else :src="img" />
            </div>
            <h3 class="blue-color">审批信息</h3>
            <div>
              <Table ref="table" :datas="datasT" :loading="isLoading" :height="201">
                <TableItem title="审批人" prop="approver" align="left" :width="80"></TableItem>
                <TableItem title="流程节点" prop="node" align="left" :width="100"></TableItem>
                <TableItem title="审批状态" align="center" :width="80">
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
                <TableItem title="审批时间" prop="time" align="center" :width="100"></TableItem>
                <TableItem title="审批意见" prop="opinion" align="left" :width="150"></TableItem>
                <TableItem title="审批结果" prop="result" align="left" :width="80"></TableItem>
                <div slot="empty">暂无数据</div>
              </Table>
            </div>
            <div v-show="approveBtnT">
              <h3 class="blue-color">审批意见</h3>
              <textarea rows="3" v-autosize v-model="ApprovalT" style="width:100%"></textarea>
              <div style="width:100%;text-align: center;margin-top:10px">
                <Button
                  color="blue"
                  icon="icon-circle-check"
                  :disabled="agreeTDis"
                  @click="AgreeT()"
                >同意</Button>
                <Button color="yellow" icon="icon-ban" :disabled="refuseTDis" @click="RefuseT()">拒绝</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApprovalModel from 'model/Approval/Approval';
import ScrappedModel from 'model/scrapped/scrapped';
export default {
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      ScrappedList: ScrappedModel.parse({}),
      ApprovalList: ApprovalModel.parse({}),
      tabConfig: {
        module1: '基本信息',
        module2: '审批信息'
      },
      images: [],
      img: '',
      uploadIds: [],
      uploadNames: [],
      download: [],
      datas: [],
      selectedTab: 'module1',
      datasT: [],
      pagination: {
        page: 1,
        size: 500,
        total: 500
      },
      isLoading: false,
      loading: false,
      Approval: '',
      ApprovalT: '',
      agreeDis: false,
      agreeTDis: false,
      refuseDis: false,
      refuseTDis: false,
      approveBtn: false,
      approveBtnT: false
    };
  },
  mounted() {
    this.getApprovalList(this.$route.query.id);
    this.getModifyData(this.$route.query.id);
    this.img = '/gdzc/api/scrappedApproved/getProcessDiagram?id=' + this.$route.query.id;
    this.showOrHideApproveBtn();
  },
  methods: {
    getApprovalList(id) {
      this.ApprovalList.id = id;
      R.Approval.ScrappedList(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.datasT = resp.body;
        }
      });
    },
    openPreview(index, data) {
      if (this.download[index] == '0') {
        this.ScrappedList.docId = this.uploadIds[index];
        this.$router.push({ path: '/gdzc/' });
        location.href = '../' + this.FILEURL.fileUrl + this.ScrappedList.docId;
      } else {
        this.$ImagePreview(this.images, index);
      }
    },
    changePage() {
      this.ScrappedList.purchaseId = this.$route.query.id;
      this.ScrappedList.page = this.pagination.page;
      this.ScrappedList.size = this.pagination.size;
      R.Scrapped.showUpdateAssets(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    getModifyData(id) {
      this.loading = true;
      this.ScrappedList.id = id;
      R.Scrapped.ScrappedFindOne(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.ScrappedList = ScrappedModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败');
        }
      });
      this.ScrappedList.purchaseId = id;
      this.ScrappedList.page = this.pagination.page;
      this.ScrappedList.size = this.pagination.size;
      R.Scrapped.showUpdateAssets(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
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
      R.Scrapped.ScrappedFindOneImg(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
        if (resp.ok) {
          for (let i = 0; i < resp.body.length; i++) {
            this.uploadIds.push(resp.body[i].id);
            this.uploadNames.push(resp.body[i].docName);
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
    },
    Agree() {
      this.ApprovalList.ids = this.$route.query.id;
      this.ApprovalList.opinion = this.Approval;
      R.Approval.ScrappedAgree(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('同意审批');
          this.refuseDis = true;
          this.agreeDis = true;
          this.agreeTDis = true;
          this.refuseTDis = true;
        } else {
          this.agreeDis = false;
          this.refuseDis = false;
          this.agreeTDis = false;
          this.refuseTDis = false;
        }
      });
    },
    Refuse() {
      this.ApprovalList.ids = this.$route.query.id;
      this.ApprovalList.opinion = this.Approval;
      R.Approval.ScrappedRefuse(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('拒绝审批');
          this.refuseDis = true;
          this.agreeDis = true;
          this.agreeTDis = true;
          this.refuseTDis = true;
        } else {
          this.agreeDis = false;
          this.refuseDis = false;
          this.agreeTDis = false;
          this.refuseTDis = false;
        }
      });
    },
    AgreeT() {
      this.ApprovalList.ids = this.$route.query.id;
      this.ApprovalList.opinion = this.ApprovalT;
      R.Approval.ScrappedAgree(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('同意审批');
          this.agreeDis = true;
          this.refuseDis = true;
          this.agreeTDis = true;
          this.refuseTDis = true;
        } else {
          this.agreeDis = false;
          this.refuseDis = false;
          this.agreeTDis = false;
          this.refuseTDis = false;
        }
      });
    },
    RefuseT() {
      this.ApprovalList.ids = this.$route.query.id;
      this.ApprovalList.opinion = this.ApprovalT;
      R.Approval.ScrappedRefuse(ApprovalModel.dispose(this.ApprovalList)).then(resp => {
        if (resp.ok) {
          this.$Message.success('拒绝审批');
          this.agreeTDis = true;
          this.refuseTDis = true;
        } else {
          this.agreeTDis = false;
          this.refuseTDis = false;
        }
      });
    },
    showOrHideApproveBtn() {
      if (this.$route.query.status == 0) {
        this.approveBtn = true;
        this.approveBtnT = true;
      } else {
        this.approveBtn = false;
        this.approveBtnT = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
  margin: 25px 0 10px;
}
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
.upload-name {
  width: 90px;
}
</style>
