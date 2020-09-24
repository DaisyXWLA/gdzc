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
              <div class="category-title" align="center">无形资产_非专利技术</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{genericAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{genericAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{genericAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{genericAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{genericAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{genericAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{genericAdd.acquisitionTime}}</FormItem>
              <FormItem label="收益年限（月）：">{{genericAdd.profitYear}}</FormItem>
              <FormItem label="投入使用日期：">{{genericAdd.useTime}}</FormItem>
              <FormItem label="发明人：">{{genericAdd.inventionName}}</FormItem>
              <FormItem label="发明名称：">{{genericAdd.inventionTitle}}</FormItem>
              <FormItem label="专利申请号：">{{genericAdd.patentApplicationNumber}}</FormItem>
              <FormItem label="折旧年限（月）：">{{genericAdd.depreciationYear}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="价值（元）：">{{genericAdd.price}}</FormItem>
              <FormItem label="价值类型：">{{genericAdd.priceTypeName}}</FormItem>
              <FormItem label="财务入账状态：">{{genericAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{genericAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{genericAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{genericAdd.noFiscalFunds}}</FormItem>
              <FormItem label="会计凭证号：">{{genericAdd.financiaCode}}</FormItem>
              <FormItem label="摊销状态：">{{genericAdd.distributionStatusName}}</FormItem>
              <FormItem label="账面净值（元）：">{{genericAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="资产状态：">{{genericAdd.assetsStatusName}}</FormItem>
              <FormItem label="管理部门：">{{genericAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="是否上报财政：">{{genericAdd.isReportName}}</FormItem>
              <FormItem label="备注：" single>{{genericAdd.remarks}}</FormItem>
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
import genericModel from 'model/Assets/generic';
export default {
  props: ['AssetsId'],
  data() {
    return {
      genericAdd: genericModel.parse({}),
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
      this.genericAdd.id = id;
      this.genericAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.genericAdd.financialTypeCode = 'financialType';
      this.genericAdd.priceTypeCode = 'priceType';
      this.genericAdd.assetsStatusCode = 'assetsStatus';
      this.genericAdd.distributionStatusCode = 'distributionStatus';
      this.genericAdd.isReportCode = 'isReport';
      R.Assets.findGeneric(genericModel.dispose(this.genericAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.genericAdd = genericModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(genericModel.dispose(this.genericAdd)).then(resp => {
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
        this.genericAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.genericAdd.docId;
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
