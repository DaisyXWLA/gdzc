<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <div class="land-btn">
            <Button color="blue" @click="submit">打印</Button>
          </div>
        </Cell>
        <Cell :width="24">
          <div id="print">
            <Form mode="threecolumn" :label-width="150">
              <div class="category-title" align="center">特种动植物</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{AnimalAndBotanyAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{AnimalAndBotanyAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{AnimalAndBotanyAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{AnimalAndBotanyAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{AnimalAndBotanyAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{AnimalAndBotanyAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{AnimalAndBotanyAdd.acquisitionTime}}</FormItem>
              <FormItem label="采购组织形式：">{{AnimalAndBotanyAdd.procurementOrganizationFormName}}</FormItem>
              <FormItem label="预计寿命/栽种年龄：">{{AnimalAndBotanyAdd.expectLife}}</FormItem>
              <FormItem label="出生/栽种年份：">{{AnimalAndBotanyAdd.birthday}}</FormItem>
              <FormItem label="纲属科：">{{AnimalAndBotanyAdd.classFamily}}</FormItem>
              <FormItem label="产地：">{{AnimalAndBotanyAdd.place}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="数量：">{{AnimalAndBotanyAdd.number}}</FormItem>
              <FormItem label="价值类型：">{{AnimalAndBotanyAdd.priceTypeName}}</FormItem>
              <FormItem label="价值（元）：">{{AnimalAndBotanyAdd.price}}</FormItem>
              <FormItem label="单价（元）：">{{AnimalAndBotanyAdd.animalPrice}}</FormItem>
              <FormItem label="财务入账状态：">{{AnimalAndBotanyAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{AnimalAndBotanyAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{AnimalAndBotanyAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{AnimalAndBotanyAdd.noFiscalFunds}}</FormItem>
              <FormItem label="会计凭证号：">{{AnimalAndBotanyAdd.financiaCode}}</FormItem>
              <FormItem label="账面净值（元）：">{{AnimalAndBotanyAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="资产状态：">{{AnimalAndBotanyAdd.assetsStatusName}}</FormItem>
              <FormItem label="使用人：">{{AnimalAndBotanyAdd.username}}</FormItem>
              <FormItem label="使用部门：">{{AnimalAndBotanyAdd.useDepartmentName}}</FormItem>
              <FormItem label="管理部门：">{{AnimalAndBotanyAdd.administrativeDepartmentName}}</FormItem>
               <FormItem label="是否上报财政：">{{AnimalAndBotanyAdd.isReportName}}</FormItem>
              <FormItem label="存放地点：">{{AnimalAndBotanyAdd.storageLocation}}</FormItem>
              <FormItem label="备注：" single>{{AnimalAndBotanyAdd.remarks}}</FormItem>
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
import AnimalAndBotanyModel from 'model/Assets/AnimalAndBotany';
export default {
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
      AnimalAndBotanyAdd: AnimalAndBotanyModel.parse({}),
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
      this.AnimalAndBotanyAdd.id = data;
      this.AnimalAndBotanyAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.AnimalAndBotanyAdd.financialTypeCode = 'financialType';
      this.AnimalAndBotanyAdd.priceTypeCode = 'priceType';
      this.AnimalAndBotanyAdd.procurementOrganizationFormCode = 'procurementOrganizationForm';
      this.AnimalAndBotanyAdd.assetsStatusCode = 'assetsStatus';
      this.AnimalAndBotanyAdd.isReportCode = 'isReport';
      R.Assets.findSpecialPlantAnimal(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.AnimalAndBotanyAdd = AnimalAndBotanyModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
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
        this.AnimalAndBotanyAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.AnimalAndBotanyAdd.docId;
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
