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
              <div class="category-title" align="center">文物和陈列品</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{DisplayAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{DisplayAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{DisplayAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{DisplayAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{DisplayAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{DisplayAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{DisplayAdd.acquisitionTime}}</FormItem>
              <FormItem label="采购组织形式：">{{DisplayAdd.procurementOrganizationFormName}}</FormItem>
              <FormItem label="来源地：">{{DisplayAdd.source}}</FormItem>
              <FormItem label="藏品年代：">{{DisplayAdd.year}}</FormItem>
              <FormItem label="文物等级：">{{DisplayAdd.culturalRelicLevelName}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="数量：">{{DisplayAdd.number}}</FormItem>
              <FormItem label="价值类型：">{{DisplayAdd.priceTypeName}}</FormItem>
              <FormItem label="价值（元）：">{{DisplayAdd.price}}</FormItem>
              <FormItem label="单价（元）：">{{DisplayAdd.displayPrice}}</FormItem>
              <FormItem label="财务入账状态：">{{DisplayAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{DisplayAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{DisplayAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{DisplayAdd.noFiscalFunds}}</FormItem>
              <FormItem label="会计凭证号：">{{DisplayAdd.financiaCode}}</FormItem>
              <FormItem label="账面净值（元）：">{{DisplayAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="资产状态：">{{DisplayAdd.assetsStatusName}}</FormItem>
              <FormItem label="使用部门：">{{DisplayAdd.useDepartmentName}}</FormItem>
              <FormItem label="管理部门：">{{DisplayAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="是否上报财政：">{{DisplayAdd.isReportName}}</FormItem>
              <FormItem label="存放地点：">{{DisplayAdd.storageLocation}}</FormItem>
              <FormItem label="备注：" single>{{DisplayAdd.remarks}}</FormItem>
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
import DisplayModel from 'model/Assets/Book';
export default {
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
      DisplayAdd: DisplayModel.parse({}),
      data: '',
      datas: [],
      name: '',
      getCategoryId: '', // 获取到的国标分类id
      loading: true
    };
  },
  mounted() {},
  methods: {
    getAssetsId(data) {
      this.DisplayAdd.id = data;
      this.DisplayAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.DisplayAdd.financialTypeCode = 'financialType';
      this.DisplayAdd.priceTypeCode = 'priceType';
      this.DisplayAdd.procurementOrganizationFormCode = 'procurementOrganizationForm';
      this.DisplayAdd.assetsStatusCode = 'assetsStatus';
      this.DisplayAdd.culturalRelicLevelCode = 'culturalRelicLevel';
      this.DisplayAdd.isReportCode = 'isReport';
      R.Assets.culturalRelicFindOne(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.DisplayAdd = DisplayModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
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
        this.DisplayAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.DisplayAdd.docId;
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
