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
              <div class="category-title" align="center">图书、档案</div>
              <div class="form-title">基本信息</div>
              <FormItem label="资产编号：">{{BookAdd.newCode}}</FormItem>
              <FormItem label="财政编号：">{{BookAdd.oldCode}}</FormItem>
              <FormItem label="资产分类名称：">{{BookAdd.assetsCategoryName}}</FormItem>
              <FormItem label="资产名称：">{{BookAdd.assetsName}}</FormItem>
              <FormItem label="预算项目编号：">{{BookAdd.budgetItemNumber}}</FormItem>
              <FormItem label="取得方式：">{{BookAdd.acquisitionMethodName}}</FormItem>
              <FormItem label="取得日期：">{{BookAdd.acquisitionTime}}</FormItem>
              <FormItem label="采购组织形式：">{{BookAdd.procurementOrganizationFormName}}</FormItem>
              <FormItem label="出版社：">{{BookAdd.publishingHouse}}</FormItem>
              <FormItem label="出版日期：">{{BookAdd.publishingDay}}</FormItem>
              <FormItem label="投入使用日期：">{{BookAdd.useTime}}</FormItem>
              <FormItem label="保存年限（月）：">{{BookAdd.saveYear}}</FormItem>
              <FormItem label="档案号：">{{BookAdd.archiveNumber}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">财务信息</div>
              <FormItem label="数量：">{{BookAdd.number}}</FormItem>
              <FormItem label="价值类型：">{{BookAdd.priceTypeName}}</FormItem>
              <FormItem label="价值（元）：">{{BookAdd.price}}</FormItem>
              <FormItem label="单价（元）：">{{BookAdd.bookPrice}}</FormItem>
              <FormItem label="财务入账状态：">{{BookAdd.financialTypeName}}</FormItem>
              <FormItem label="财政拨款（元）：">{{BookAdd.fiscalFunds}}</FormItem>
              <FormItem label="财务入账日期：">{{BookAdd.financiaTime}}</FormItem>
              <FormItem label="非财政拨款（元）：">{{BookAdd.noFiscalFunds}}</FormItem>
              <FormItem label="会计凭证号：">{{BookAdd.financiaCode}}</FormItem>
              <FormItem label="账面净值（元）：">{{BookAdd.bookValue}}</FormItem>
            </Form>
            <Form mode="threecolumn" :label-width="150">
              <div class="form-title">使用信息</div>
              <FormItem label="资产状态：">{{BookAdd.assetsStatusName}}</FormItem>
              <FormItem label="使用人：">{{BookAdd.username}}</FormItem>
              <FormItem label="使用部门：">{{BookAdd.useDepartmentName}}</FormItem>
              <FormItem label="管理部门：">{{BookAdd.administrativeDepartmentName}}</FormItem>
              <FormItem label="存放地点：">{{BookAdd.storageLocation}}</FormItem>
              <FormItem label="是否上报财政：">{{BookAdd.isReportName}}</FormItem>
              <FormItem label="备注：" single>{{BookAdd.remarks}}</FormItem>
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
import BookModel from 'model/Assets/Book';
export default {
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
      BookAdd: BookModel.parse({}),
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
      this.BookAdd.id = data;
      this.BookAdd.acquisitionMethodCode = 'acquisitionMethod';
      this.BookAdd.financialTypeCode = 'financialType';
      this.BookAdd.priceTypeCode = 'priceType';
      this.BookAdd.procurementOrganizationForm = 'procurementOrganizationForm';
      this.BookAdd.assetsStatusCode = 'assetsStatus';
      this.BookAdd.isReportCode = 'isReport';
      R.Assets.booksFileFindOne(BookModel.dispose(this.BookAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          // this.BookAdd = BookModel.parse(this.showModel.showModelName(resp.body));
          this.BookAdd = BookModel.parse(resp.body);
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(BookModel.dispose(this.BookAdd)).then(resp => {
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
        this.BookAdd.docId = this.uploadIds[index];
        location.href = '../../../' + this.FILEURL.fileUrl + this.BookAdd.docId;
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
