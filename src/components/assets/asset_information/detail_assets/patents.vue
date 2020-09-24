<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <div class="land-btn">
            <Button color="blue" v-print="'#print'">打印</Button>
          </div>
        </Cell>
        <Cell :width="24">
          <div id="print">
            <Form mode="threecolumn" :label-width="150">
              <div class="category-title" align="center">无形资产_专利</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{patentsAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{patentsAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{patentsAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{patentsAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{patentsAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{patentsAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{patentsAdd.acquisitionTime}}</FormItem>
              <FormItem label="投入使用日期：">{{patentsAdd.useTime}}</FormItem>
              <FormItem label="收益年限（月）：">{{patentsAdd.profitYear}}</FormItem>
              <FormItem label="注册登记机关：">{{patentsAdd.registrationOrgan}}</FormItem>
              <FormItem label="注册登记日期：">{{patentsAdd.registrationTime}}</FormItem>
              <FormItem label="批准文号：">{{patentsAdd.approvalNumber}}</FormItem>
              <FormItem label="专利号：">{{patentsAdd.patentNumber}}</FormItem>
              <FormItem label="发明人：">{{patentsAdd.inventionName}}</FormItem>
              <FormItem label="发明名称：">{{patentsAdd.inventionTitle}}</FormItem>
              <FormItem label="授权公告日：">{{patentsAdd.announcementTime}}</FormItem>
              <FormItem label="证书号：">{{patentsAdd.certificateNumber}}</FormItem>
              <FormItem label="折旧年限（月）：">{{patentsAdd.depreciationYear}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="价值（元）：">{{patentsAdd.price}}</FormItem>
              <FormItem label="价值类型：">{{patentsAdd.priceTypeName}}</FormItem>
              <FormItem label="财务入账状态：">{{patentsAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{patentsAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{patentsAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{patentsAdd.noFiscalFunds}}</FormItem>
              <FormItem label="摊销状态：">{{patentsAdd.distributionStatusName}}</FormItem>
              <FormItem label="会计凭证号：">{{patentsAdd.financiaCode}}</FormItem>
              <FormItem label="账面净值（元）：">{{patentsAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="资产状态：">{{patentsAdd.assetsStatusName}}</FormItem>
              <FormItem label="管理部门：">{{patentsAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="是否上报财政：">{{patentsAdd.isReportName}}</FormItem>
              <FormItem label="备注：" single>{{patentsAdd.remarks}}</FormItem>
              <Row :space-y="20">
                <Cell :width="24">
                  <div class="form-title" style="display:inline-block">相关附件</div>
                </Cell>
                <Cell :width="24">
                  <div style="width:100% ;height:110px;padding-left:30px;">
                    <div style="width:100% ;height:100px;">
                      <ImagePreview
                        :width="90"
                        :borderRadius="4"
                        :datas="images"
                        @click="openPreview"
                      />
                    </div>
                    <div>
                      <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{ d }}</span>
                    </div>
                  </div>
                </Cell>
              </Row>
            </Form>
          </div>
        </Cell>
      </Row>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>
<script>
import patentsModel from 'model/Assets/patents';
export default {
  data() {
    return {
      patentsAdd: patentsModel.parse({}),
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      img: '',
      uploadIds: [],
      uploadNames: [],
      download: [],
      loading: true
    };
  },
  mounted() {},
  methods: {
    getAssetsId(id) {
      this.patentsAdd.id = id;
      this.patentsAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.patentsAdd.financialTypeCode = 'financialType';
      this.patentsAdd.priceTypeCode = 'priceType';
      this.patentsAdd.distributionStatusCode = 'distributionStatus';
      this.patentsAdd.assetsStatusCode = 'assetsStatus';
      this.patentsAdd.isReportCode = 'isReport';
      R.Assets.findPatent(patentsModel.dispose(this.patentsAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.patentsAdd = patentsModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(patentsModel.dispose(this.patentsAdd)).then(resp => {
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
    openPreview(index, data) {
      if (this.download[index] == '0') {
        this.patentsAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.patentsAdd.docId;
      } else {
        this.$ImagePreview(this.images, index);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.land-btn {
  border-bottom: 1px solid #eee;
  padding-bottom: 1%;
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
.upload-name {
  width: 90px;
}
</style>
