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
              <div class="category-title" align="center">通用设备</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{AssetsAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{AssetsAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{AssetsAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{AssetsAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{AssetsAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{AssetsAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{AssetsAdd.acquisitionTime}}</FormItem>
              <FormItem label="采购组织形式：">{{AssetsAdd.procurementOrganizationFormName}}</FormItem>
              <FormItem label="设备用途：">{{AssetsAdd.facilityUseName}}</FormItem>
              <FormItem label="品牌：">{{AssetsAdd.brand}}</FormItem>
              <FormItem label="规格型号：">{{AssetsAdd.specificationModel}}</FormItem>
              <FormItem label="产品序列号：">{{AssetsAdd.serialNumber}}</FormItem>
              <FormItem label="生产厂家：">{{AssetsAdd.manufacturer}}</FormItem>
              <FormItem label="销售商：">{{AssetsAdd.seller}}</FormItem>
              <FormItem label="投入使用日期：">{{AssetsAdd.useTime}}</FormItem>
              <FormItem label="合同编号：">{{AssetsAdd.contractNumber}}</FormItem>
              <FormItem label="保修截止日期：">{{AssetsAdd.repairDeadline}}</FormItem>
              <FormItem label="发票号：">{{AssetsAdd.invoiceNumber}}</FormItem>
              <FormItem label="折旧年限（月）：">{{AssetsAdd.depreciationYear}}</FormItem>
              <FormItem label="配置标准分类名称：">{{AssetsAdd.configurationName}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="价值（元）：">{{AssetsAdd.price}}</FormItem>
              <FormItem label="价值类型：">{{AssetsAdd.priceTypeName}}</FormItem>
              <FormItem label="财务入账状态：">{{AssetsAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{AssetsAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{AssetsAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{AssetsAdd.noFiscalFunds}}</FormItem>
              <FormItem label="折旧状态：">{{AssetsAdd.depreciationStatusName}}</FormItem>
              <FormItem label="会计凭证号：">{{AssetsAdd.financiaCode}}</FormItem>
              <FormItem label="账面净值（元）：">{{AssetsAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="使用人：">{{AssetsAdd.username}}</FormItem>
              <FormItem label="资产状态：">{{AssetsAdd.assetsStatusName}}</FormItem>
              <FormItem label="使用部门：">{{AssetsAdd.useDepartmentName}}</FormItem>
              <FormItem label="管理部门：">{{AssetsAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="是否上报财政：">{{AssetsAdd.isReportName}}</FormItem>
              <FormItem label="存放地点：">{{AssetsAdd.storageLocation}}</FormItem>
              <FormItem label="备注：" single>{{AssetsAdd.remarks}}</FormItem>
            </Form>
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
          </div>
        </Cell>
      </Row>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>
<script>
import AssetsModel from 'model/Assets/Assets';
import UploadModel from 'model/upload/upload';
import uploadFile from '../../../common/gdzc/upload_file';
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
      UploadAdd: UploadModel.parse({}),
      AssetsAdd: AssetsModel.parse({}),
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
      this.AssetsAdd.id = data;
      this.AssetsAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.AssetsAdd.financialTypeCode = 'financialType';
      this.AssetsAdd.priceTypeCode = 'priceType';
      this.AssetsAdd.procurementOrganizationFormCode = 'procurementOrganizationForm';
      this.AssetsAdd.assetsStatusCode = 'assetsStatus';
      this.AssetsAdd.depreciationStatusCode = 'depreciationStatus';
      this.AssetsAdd.facilityUseCode = 'facilityUse';
      this.AssetsAdd.isReportCode = 'isReport';
      this.images = [];
      this.uploadIds = [];
      this.uploadNames = [];
      R.Assets.generalEquipmentFindOne(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.AssetsAdd = AssetsModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
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
      this.$Loading.close();
    },
    openPreview(index, data) {
      if (this.download[index] == '0') {
        location.href = '../../../' + this.FILEURL.fileUrl + this.uploadIds[index];
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
