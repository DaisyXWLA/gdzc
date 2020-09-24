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
              <div class="category-title" align="center">无形资产_商誉</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{GoodWillAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{GoodWillAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{GoodWillAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：" prop="assetsName">{{GoodWillAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{GoodWillAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{GoodWillAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{GoodWillAdd.acquisitionTime}}</FormItem>
              <FormItem label="投入使用日期：">{{GoodWillAdd.useTime}}</FormItem>
              <FormItem label="收益年限（月）：">{{GoodWillAdd.profitYear}}</FormItem>
              <FormItem label="折旧年限（月）：">{{GoodWillAdd.depreciationYear}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="价值（元）：">{{GoodWillAdd.price}}</FormItem>
              <FormItem label="价值类型：">{{GoodWillAdd.priceTypeName}}</FormItem>
              <FormItem label="财务入账状态：">{{GoodWillAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{GoodWillAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{GoodWillAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{GoodWillAdd.noFiscalFunds}}</FormItem>
              <FormItem label="会计凭证号：">{{GoodWillAdd.financiaCode}}</FormItem>
              <FormItem label="摊销状态：">{{GoodWillAdd.distributionStatusName}}</FormItem>
              <FormItem label="账面净值（元）：">{{GoodWillAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="资产状态：">{{GoodWillAdd.assetsStatusName}}</FormItem>
              <FormItem label="管理部门：">{{GoodWillAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="是否上报财政：">{{GoodWillAdd.isReportName}}</FormItem>
              <FormItem label="备注：" single>{{GoodWillAdd.assetsName}}</FormItem>
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
import GoodWillModel from 'model/Assets/GoodWill';
export default {
  data() {
    return {
      GoodWillAdd: GoodWillModel.parse({}),
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
      loading: true
    };
  },
  mounted() {},
  methods: {
    getAssetsId(data) {
      this.GoodWillAdd.id = data;
      this.GoodWillAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.GoodWillAdd.financialTypeCode = 'financialType';
      this.GoodWillAdd.priceTypeCode = 'priceType';
      this.GoodWillAdd.assetsStatusCode = 'assetsStatus';
      this.GoodWillAdd.distributionStatusCode = 'distributionStatus';
      this.GoodWillAdd.isReportCode = 'isReport';
      R.Assets.findGoodwill(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.GoodWillAdd = GoodWillModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
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
        this.GoodWillAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.GoodWillAdd.docId;
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
