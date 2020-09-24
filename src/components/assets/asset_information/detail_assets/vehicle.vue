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
              <div class="category-title" align="center">车辆</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{vehicleAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{vehicleAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{vehicleAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{vehicleAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{vehicleAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{vehicleAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{vehicleAdd.acquisitionTime}}</FormItem>
              <FormItem label="编制情况：">{{vehicleAdd.preparationSituationName}}</FormItem>
              <FormItem label="车牌号：">{{vehicleAdd.plateNumber}}</FormItem>
              <FormItem label="规格型号：">{{vehicleAdd.specificationModel}}</FormItem>
              <FormItem label="汽车排气量：">{{vehicleAdd.exhaustVolumeName}}</FormItem>
              <FormItem label="车辆品牌：">{{vehicleAdd.brand}}</FormItem>
              <FormItem label="采购组织形式：">{{vehicleAdd.procurementOrganizationFormName}}</FormItem>
              <FormItem label="车辆行驶证：">{{vehicleAdd.drivingLicenseName}}</FormItem>
              <FormItem label="持证人：">{{vehicleAdd.licensee}}</FormItem>
              <FormItem label="注册登记日期：">{{vehicleAdd.registrationTime}}</FormItem>
              <FormItem label="发动机号：">{{vehicleAdd.engineNumber}}</FormItem>
              <FormItem label="车辆识别代码：">{{vehicleAdd.vehicleNumber}}</FormItem>
              <FormItem label="投入使用日期：">{{vehicleAdd.useTime}}</FormItem>
              <FormItem label="车辆产地：">{{vehicleAdd.vehicleOrigin}}</FormItem>
              <FormItem label="保修截止日期：">{{vehicleAdd.repairDeadline}}</FormItem>
              <FormItem label="合同编号：">{{vehicleAdd.contractNumber}}</FormItem>
              <FormItem label="销售商：">{{vehicleAdd.seller}}</FormItem>
              <FormItem label="发票号：">{{vehicleAdd.invoiceNumber}}</FormItem>
              <FormItem label="折旧年限（月）：">{{vehicleAdd.depreciationYear}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="价值（元）：">{{vehicleAdd.price}}</FormItem>
              <FormItem label="价值类型：">{{vehicleAdd.priceTypeName}}</FormItem>
              <FormItem label="财务入账状态：">{{vehicleAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{vehicleAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{vehicleAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{vehicleAdd.noFiscalFunds}}</FormItem>
              <FormItem label="折旧状态：">{{vehicleAdd.depreciationStatusName}}</FormItem>
              <FormItem label="会计凭证号：">{{vehicleAdd.financiaCode}}</FormItem>
              <FormItem label="账面净值（元）：">{{vehicleAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="使用人：">{{vehicleAdd.username}}</FormItem>
              <FormItem label="资产状态：">{{vehicleAdd.assetsStatusName}}</FormItem>
              <FormItem label="使用部门：">{{vehicleAdd.useDepartmentName}}</FormItem>
              <FormItem label="管理部门：">{{vehicleAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="是否上报财政：">{{vehicleAdd.isReportName}}</FormItem>
              <FormItem label="车辆用途：">{{vehicleAdd.vehicleUse}}</FormItem>
              <FormItem label="备注：" single>{{vehicleAdd.remarks}}</FormItem>
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
import vehicleModel from 'model/Assets/vehicle';
export default {
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
      vehicleAdd: vehicleModel.parse({}),
      loading: true
    };
  },
  mounted() {},
  methods: {
    getAssetsId(data) {
      this.vehicleAdd.id = data;
      this.vehicleAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.vehicleAdd.financialTypeCode = 'financialType';
      this.vehicleAdd.priceTypeCode = 'priceType';
      this.vehicleAdd.procurementOrganizationFormCode = 'procurementOrganizationForm';
      this.vehicleAdd.assetsStatusCode = 'assetsStatus';
      this.vehicleAdd.depreciationStatusCode = 'depreciationStatus';
      this.vehicleAdd.preparationSituationCode = 'preparationSituation';
      this.vehicleAdd.drivingLicenseCode = 'drivingLicense';
      this.vehicleAdd.exhaustVolumeCode = 'exhaustVolume';
      this.vehicleAdd.isReportCode = 'isReport';
      R.Assets.vehicleFindOne(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.vehicleAdd = vehicleModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
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
        this.vehicleAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.vehicleAdd.docId;
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
