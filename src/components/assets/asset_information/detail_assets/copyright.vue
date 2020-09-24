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
              <div class="category-title" align="center">无形资产_著作权</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{copyrightAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{copyrightAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{copyrightAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{copyrightAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{copyrightAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{copyrightAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{copyrightAdd.acquisitionTime}}</FormItem>
              <FormItem label="收益年限（月）：">{{copyrightAdd.profitYear}}</FormItem>
              <FormItem label="出版日期：">{{copyrightAdd.publishTime}}</FormItem>
              <FormItem label="著作权证书号：">{{copyrightAdd.copyrightCertificateNumber}}</FormItem>
              <FormItem label="著作权人：">{{copyrightAdd.copyrighter}}</FormItem>
              <FormItem label="折旧年限（月）：">{{copyrightAdd.depreciationYear}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="价值（元）：">{{copyrightAdd.price}}</FormItem>
              <FormItem label="价值类型：">{{copyrightAdd.priceTypeName}}</FormItem>
              <FormItem label="财务入账状态：">{{copyrightAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{copyrightAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{copyrightAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{copyrightAdd.noFiscalFunds}}</FormItem>
              <FormItem label="会计凭证号：">{{copyrightAdd.financiaCode}}</FormItem>
              <FormItem label="摊销状态：">{{copyrightAdd.distributionStatusName}}</FormItem>
              <FormItem label="账面净值（元）：">{{copyrightAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="资产状态：">{{copyrightAdd.assetsStatusName}}</FormItem>
              <FormItem label="管理部门:">{{copyrightAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="是否上报财政：">{{copyrightAdd.isReportName}}</FormItem>
              <FormItem label="备注：" single>{{copyrightAdd.remarks}}</FormItem>
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
import copyrightModel from 'model/Assets/copyright';
export default {
  props: ['AssetsId'],
  data() {
    return {
      copyrightAdd: copyrightModel.parse({}),
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
      this.copyrightAdd.id = id;
      this.copyrightAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.copyrightAdd.financialTypeCode = 'financialType';
      this.copyrightAdd.priceTypeCode = 'priceType';
      this.copyrightAdd.assetsStatusCode = 'assetsStatus';
      this.copyrightAdd.distributionStatusCode = 'distributionStatus';
      this.copyrightAdd.isReportCode = 'isReport';
      R.Assets.findCopyright(copyrightModel.dispose(this.copyrightAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.copyrightAdd = copyrightModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(copyrightModel.dispose(this.copyrightAdd)).then(resp => {
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
        this.copyrightAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.copyrightAdd.docId;
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
