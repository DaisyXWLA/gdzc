<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            id="print"
            mode="twocolumn"
            :rules="validationRules"
            :model="BookAdd"
            :label-width="150"
            ref="form"
          >
            <div class="category-title" align="center">图书、档案</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="BookAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="BookAdd.oldCode" />
            </FormItem>
            <FormItem label="资产分类名称">
              <input type="text" v-model="BookAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="BookAdd.assetsName" v-wordlimit="100" />
            </FormItem>
            <FormItem label="预算项目编号">
              <input type="text" v-model="BookAdd.budgetItemNumber" v-wordlimit="50" />
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="BookAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="BookAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="采购组织形式" prop>
              <Select
                v-model="BookAdd.procurementOrganizationForm"
                class="select-demo"
                :datas="procurementOrganizationForm"
              ></Select>
            </FormItem>
            <FormItem label="出版社" prop>
              <input type="text" v-model="BookAdd.publishingHouse" v-wordlimit="50" />
            </FormItem>
            <FormItem label="出版日期" prop>
              <DatePicker v-model="BookAdd.publishingDay"></DatePicker>
            </FormItem>
            <FormItem label="投入使用日期" prop>
              <DatePicker v-model="BookAdd.useTime"></DatePicker>
            </FormItem>
            <FormItem label="保存年限（月）" prop>
              <NumberInput v-model="BookAdd.saveYear"></NumberInput>
            </FormItem>
            <FormItem label="档案号" prop single>
              <input type="text" v-model="BookAdd.archiveNumber" v-wordlimit="50" />
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="数量" prop="number">
              <NumberInput v-model="BookAdd.number"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="BookAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="BookAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="单价（元）">
              <NumberInput v-model="BookAdd.bookPrice" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select v-model="BookAdd.financialType" class="select-demo" :datas="financialType"></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="BookAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="BookAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="BookAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="BookAdd.financiaCode" v-wordlimit="50" />
            </FormItem>
            <FormItem label="账面净值（元）" prop>
              <NumberInput v-model="BookAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select v-model="BookAdd.assetsStatus" class="select-demo" :datas="assetsStatus"></Select>
            </FormItem>
            <FormItem label="使用人" prop>
              <Select v-model="BookAdd.useId" class="select-demo" :datas="useId" :filterable="true"></Select>
            </FormItem>
            <FormItem label="使用部门" prop>
              <Select
                v-model="BookAdd.useDepartment"
                class="select-demo"
                :datas="useDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="管理部门" prop>
              <Select
                v-model="BookAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport">
              <Select
                v-model="BookAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="存放地点" prop>
              <input type="text" v-model="BookAdd.storageLocation" v-wordlimit="100" />
            </FormItem>
            <FormItem label="备注" prop single>
              <textarea v-model="BookAdd.remarks" v-wordcount="1000"></textarea>
            </FormItem>
            <Row :space-y="20">
              <Cell :width="24">
                <div class="form-title" style="display:inline-block">相关附件</div>
                <div style="display:inline-block;margin-left:10px;">
                  <uploadFile @getUploadId="getUploadId"></uploadFile>
                </div>
              </Cell>
              <Cell :width="24">
                <div style="width:100% ;height:110px;padding-left:30px;">
                  <div style="width:100% ;height:80px;">
                    <Uploader
                      type="images"
                      data-type="url"
                      :files="images"
                      @deletefile="deletefile"
                    ></Uploader>
                  </div>
                  <div>
                    <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{ d }}</span>
                  </div>
                </div>
              </Cell>
            </Row>
          </Form>
        </Cell>
        <Cell :width="24" align="center">
          <div class="submit-btn">
            <Button color="blue" size="l" @click="submit">保存</Button>
          </div>
        </Cell>
      </Row>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>
<script>
import BookModel from 'model/Assets/Book';
import UploadModel from 'model/upload/upload';
import uploadFile from '../../../common/gdzc/upload_file';
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      UploadAdd: UploadModel.parse({}),
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      BookAdd: BookModel.parse({}),
      acquisitionMethod: [],
      financialType: [],
      priceType: [],
      procurementOrganizationForm: [],
      assetsStatus: [],
      isReport: [],
      administrativeDepartment: [],
      useDepartment: [],
      useId: [],
      loading: true,
      assetsCategoryName: '', // 获取到的国标分类名称
      validationRules: {
        required: [
          'assetsName',
          'acquisitionMethod',
          'acquisitionTime',
          'price',
          'priceType',
          'fiscalFunds',
          'financialType',
          'noFiscalFunds',
          'financiaTime',
          'financiaCode',
          'assetsStatus',
          'isReport'
        ]
      }
    };
  },
  mounted() {
    this.BookAdd.fiscalFunds = 0;
    this.BookAdd.noFiscalFunds = 0;
  },
  methods: {
    getcategoryName(data) {
      this.assetsCategoryName = data.categoryName;
      this.BookAdd.assetsCategoryName = data.categoryName;
      this.BookAdd.assetsCategory = data.code;
      this.getList();
      this.loading = false;
    },
    getList() {
      R.pullDownList.user().then(resp => {
        if (resp.ok) {
          this.useId = resp.body;
        }
      });
      R.pullDownList.department().then(resp => {
        if (resp.ok) {
          this.administrativeDepartment = resp.body;
          this.useDepartment = resp.body;
        }
      });
      // 取得方式
      this.BookAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(BookModel.dispose(this.BookAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.BookAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(BookModel.dispose(this.BookAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.BookAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(BookModel.dispose(this.BookAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 采购组织形式
      this.BookAdd.code = 'procurementOrganizationForm';
      R.pullDownList.findPullDownThree(BookModel.dispose(this.BookAdd)).then(resp => {
        if (resp.ok) {
          this.procurementOrganizationForm = resp.body;
        }
      });
      // 资产状态
      this.BookAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(BookModel.dispose(this.BookAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 是否上报财政
      this.BookAdd.code = 'isReport';
      R.pullDownList.findPullDownFive(BookModel.dispose(this.BookAdd)).then(resp => {
        if (resp.ok) {
          this.isReport = resp.body;
        }
      });
    },
    deletefile(file) {
      this.images.splice(file, 1);
      this.UploadAdd.ids = this.uploadIds[file];
      R.Upload.delete(UploadModel.dispose(this.UploadAdd)).then(resp => {});
      this.uploadIds.splice(file, 1);
      this.uploadNames.splice(file, 1);
      this.$Message.success('附件删除成功');
    },
    getUploadId(data) {
      if (data.id.length > 10) {
        this.uploadIds.push(data.id);
        this.uploadNames.push(data.docName);
        this.$Message.success('上传成功');
        if (data.ext.indexOf('.doc') != -1) {
          this.images.push(this.linkT + 'doc.jpg');
        } else if (data.ext.indexOf('.xls') != -1) {
          this.images.push(this.linkT + 'xls.jpg');
        } else if (data.ext.indexOf('.jp') != -1) {
          this.images.push(this.link + data.name);
        } else if (data.ext.indexOf('.png') != -1) {
          this.images.push(this.link + data.name);
        } else {
          this.images.push(this.linkT + 'doc.jpg');
        }
        // document.querySelectorAll('.name');
      } else {
        this.$Message.error('上传失败');
      }
    },
    // 提交数据
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        this.BookAdd.uploadId = this.uploadIds.toString();
        R.Assets.booksFileAdd(BookModel.dispose(this.BookAdd)).then(resp => {
          if (resp.ok) {
            this.loading = false;
            this.$Message.success('保存成功');
            this.BookAdd = BookModel.parse({});
            this.BookAdd.assetsCategoryName = this.assetsCategoryName;
          } else {
            this.loading = false;
            this.$Message.error('保存失败');
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.submit-btn {
  border-top: 1px solid #eee;
  padding-top: 30px;
  margin: 20px 0;
  text-align: right;
}
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 20px);
  overflow: auto;
}
</style>
