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
            <Form mode="threecolumn" :label-width="180">
              <div class="category-title" align="center">房屋</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{landAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{landAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{landAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{landAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{landAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{landAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{landAdd.acquisitionTime}}</FormItem>
              <FormItem label="投入使用日期：">{{landAdd.useTime}}</FormItem>
              <FormItem label="建筑面积（㎡）：">{{landAdd.floorArea}}</FormItem>
              <FormItem label="产权形式：">{{landAdd.formOfPropertyName}}</FormItem>
              <FormItem label="其中：取暖面积（㎡）：">{{landAdd.heatingArea}}</FormItem>
              <FormItem label="权属证明：">{{landAdd.proofOfOwnership}}</FormItem>
              <FormItem label="其中：危房面积（㎡）：">{{landAdd.houseArea}}</FormItem>
              <FormItem label="权属性质：">{{landAdd.ownershipNatureName}}</FormItem>
              <FormItem label="权属年限（月）：">{{landAdd.tenureOfTenure}}</FormItem>
              <FormItem label="权属证号：">{{landAdd.ownershipNumber}}</FormItem>
              <FormItem label="建筑结构：">{{landAdd.buildingStructureName}}</FormItem>
              <FormItem label="房屋所有权人：">{{landAdd.houseOwner}}</FormItem>
              <FormItem label="发证日期：">{{landAdd.issueTime}}</FormItem>
              <FormItem label="竣工日期：">{{landAdd.completionTime}}</FormItem>
              <FormItem label="设计用途：">{{landAdd.designPurpose}}</FormItem>
              <FormItem label="持证人：">{{landAdd.holderName}}</FormItem>
              <FormItem label="折旧年限（月）：">{{landAdd.depreciationYear}}</FormItem>
              <FormItem label="坐落位置：">{{landAdd.location}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="180">
              <div class="form-title">财务信息</div>
              <FormItem label="价值（元）：">{{landAdd.price}}</FormItem>
              <FormItem label="价值类型：">{{landAdd.priceTypeName}}</FormItem>
              <FormItem label="均价（元）：">{{landAdd.averagePrice}}</FormItem>
              <FormItem label="财政拨款（元）：">{{landAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账状态：">{{landAdd.financialTypeName}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{landAdd.noFiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{landAdd.financiaTime}}</FormItem>
              <FormItem label="会计凭证号：">{{landAdd.financiaCode}}</FormItem>
              <FormItem label="折旧状态：">{{landAdd.depreciationStatusName}}</FormItem>
              <FormItem label="账面净值（元）：">{{landAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="180">
              <div class="form-title">使用信息</div>
              <FormItem label="管理部门：">{{landAdd.administrativeDepartment}}</FormItem>
              <FormItem label="上次批复房屋维修项目时间：">{{landAdd.houseServicingTime}}</FormItem>
              <FormItem label="自用价值（元）：">{{landAdd.myValue}}</FormItem>
              <FormItem label="出借价值（元）：">{{landAdd.borrowValue}}</FormItem>
              <FormItem label="闲置价值（元）：">{{landAdd.idleValue}}</FormItem>
              <FormItem label="出租价值（元）：">{{landAdd.rentValue}}</FormItem>
              <FormItem label="其他价值（元）：">{{landAdd.otherValue}}</FormItem>
              <FormItem label="资产状态：">{{landAdd.assetsStatusName}}</FormItem>
              <FormItem label="是否上报财政：">{{landAdd.isReportName}}</FormItem>
              <FormItem label="备注：" single>{{landAdd.remarks}}</FormItem>
              <div class="no-print">
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
            </Form>
          </div>
        </Cell>
      </Row>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>
<script>
import landModel from 'model/Assets/land';
export default {
  data() {
    return {
      landAdd: landModel.parse({}),
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
      this.landAdd.id = id;
      this.landAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.landAdd.financialTypeCode = 'financialType';
      this.landAdd.priceTypeCode = 'priceType';
      this.landAdd.assetsStatusCode = 'assetsStatus';
      this.landAdd.depreciationStatusCode = 'depreciationStatus';
      this.landAdd.formOfPropertyCode = 'formOfProperty';
      this.landAdd.ownershipNatureCode = 'ownershipNature';
      this.landAdd.holderCode = 'holder';
      this.landAdd.buildingStructureCode = 'buildingStructure';
      this.landAdd.isReportCode = 'isReport';
      R.Assets.houseFindOne(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.landAdd = landModel.parse(this.showModel.showModelName(resp.body));
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(landModel.dispose(this.landAdd)).then(resp => {
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
        this.landAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.landAdd.docId;
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
