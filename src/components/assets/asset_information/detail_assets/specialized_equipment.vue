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
              <div class="category-title" align="center">专用设备</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{specializedEquipmentAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{specializedEquipmentAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{specializedEquipmentAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{specializedEquipmentAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{specializedEquipmentAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{specializedEquipmentAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{specializedEquipmentAdd.acquisitionTime}}</FormItem>
              <FormItem label="采购组织形式：">{{specializedEquipmentAdd.procurementOrganizationFormName}}</FormItem>
              <FormItem label="设备用途：">{{specializedEquipmentAdd.facilityUseName}}</FormItem>
              <FormItem label="品牌：">{{specializedEquipmentAdd.brand}}</FormItem>
              <FormItem label="规格型号：">{{specializedEquipmentAdd.specificationModel}}</FormItem>
              <FormItem label="产品序列号：">{{specializedEquipmentAdd.serialNumber}}</FormItem>
              <FormItem label="生产厂家：">{{specializedEquipmentAdd.manufacturer}}</FormItem>
              <FormItem label="销售商：">{{specializedEquipmentAdd.seller}}</FormItem>
              <FormItem label="投入使用日期：">{{specializedEquipmentAdd.useTime}}</FormItem>
              <FormItem label="合同编号：">{{specializedEquipmentAdd.contractNumber}}</FormItem>
              <FormItem label="保修截止日期：">{{specializedEquipmentAdd.repairDeadline}}</FormItem>
              <FormItem label="发票号：">{{specializedEquipmentAdd.invoiceNumber}}</FormItem>
              <FormItem label="折旧年限（月）：">{{specializedEquipmentAdd.depreciationYear}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="价值（元）：">{{specializedEquipmentAdd.price}}</FormItem>
              <FormItem label="价值类型：">{{specializedEquipmentAdd.priceTypeName}}</FormItem>
              <FormItem label="财务入账状态：">{{specializedEquipmentAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{specializedEquipmentAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{specializedEquipmentAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{specializedEquipmentAdd.noFiscalFunds}}</FormItem>
              <FormItem label="折旧状态：">{{specializedEquipmentAdd.depreciationStatusName}}</FormItem>
              <FormItem label="会计凭证号：">{{specializedEquipmentAdd.financiaCode}}</FormItem>
              <FormItem label="账面净值（元）：">{{specializedEquipmentAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="使用人：">{{specializedEquipmentAdd.username}}</FormItem>
              <FormItem label="资产状态：">{{specializedEquipmentAdd.assetsStatusName}}</FormItem>
              <FormItem label="使用部门：">{{specializedEquipmentAdd.useDepartmentName}}</FormItem>
              <FormItem label="管理部门：">{{specializedEquipmentAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="是否上报财政：">{{specializedEquipmentAdd.isReportName}}</FormItem>
              <FormItem label="存放地点：">{{specializedEquipmentAdd.storageLocation}}</FormItem>
              <FormItem label="备注：" single>{{specializedEquipmentAdd.remarks}}</FormItem>
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
import specializedEquipmentModel from 'model/Assets/specializedEquipment';
export default {
  props: ['AssetsId'],
  data() {
    return {
      specializedEquipmentAdd: specializedEquipmentModel.parse({}),
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
      this.specializedEquipmentAdd.id = id;
      this.specializedEquipmentAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.specializedEquipmentAdd.financialTypeCode = 'financialType';
      this.specializedEquipmentAdd.priceTypeCode = 'priceType';
      this.specializedEquipmentAdd.procurementOrganizationFormCode = 'procurementOrganizationForm';
      this.specializedEquipmentAdd.assetsStatusCode = 'assetsStatus';
      this.specializedEquipmentAdd.depreciationStatusCode = 'depreciationStatus';
      this.specializedEquipmentAdd.facilityUseCode = 'facilityUse';
      this.specializedEquipmentAdd.isReportCode = 'isReport';
      R.Assets.generalEquipmentFindOne(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.specializedEquipmentAdd = specializedEquipmentModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
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
        this.specializedEquipmentAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.specializedEquipmentAdd.docId;
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
