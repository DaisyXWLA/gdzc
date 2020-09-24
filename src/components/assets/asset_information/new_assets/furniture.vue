<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            id="print"
            mode="twocolumn"
            :model="AssetsAdd"
            :rules="validationRules"
            ref="form"
            :label-width="150"
          >
            <div class="category-title" align="center">家具、用具、装具</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="AssetsAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="AssetsAdd.oldCode"/>
            </FormItem>
            <FormItem label="资产分类名称" prop>
              <input type="text" v-model="AssetsAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="AssetsAdd.assetsName" v-wordlimit="100"/>
            </FormItem>
            <FormItem label="预算项目编号" prop>
              <input type="text" v-model="AssetsAdd.budgetItemNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="AssetsAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="AssetsAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="采购组织形式" prop>
              <Select
                v-model="AssetsAdd.procurementOrganizationForm"
                class="select-demo"
                :datas="procurementOrganizationForm"
              ></Select>
            </FormItem>
            <FormItem label="品牌" prop>
              <input type="text" v-model="AssetsAdd.brand" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="规格型号" prop>
              <input type="text" v-model="AssetsAdd.specificationModel" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="销售商" prop>
              <input type="text" v-model="AssetsAdd.seller" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="保修截止日期" prop>
              <DatePicker v-model="AssetsAdd.repairDeadline"></DatePicker>
            </FormItem>
            <FormItem label="投入使用日期" prop>
              <DatePicker v-model="AssetsAdd.useTime"></DatePicker>
            </FormItem>
            <FormItem label="折旧年限（月）" prop>
              <NumberInput v-model="AssetsAdd.depreciationYear"></NumberInput>
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="数量" prop="number">
              <NumberInput v-model="AssetsAdd.number"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="AssetsAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="AssetsAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="单价（元）" prop="furniturePrice">
              <NumberInput v-model="AssetsAdd.furniturePrice" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select v-model="AssetsAdd.financialType" class="select-demo" :datas="financialType"></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="AssetsAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="AssetsAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="AssetsAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="AssetsAdd.financiaCode" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="折旧状态" prop="depreciationStatus">
              <Select
                v-model="AssetsAdd.depreciationStatus"
                class="select-demo"
                :datas="depreciationStatus"
              ></Select>
            </FormItem>
            <FormItem label="账面净值（元）" prop single>
              <NumberInput v-model="AssetsAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select v-model="AssetsAdd.assetsStatus" class="select-demo" :datas="assetsStatus"></Select>
            </FormItem>
            <FormItem label="使用人">
              <Select
                v-model="AssetsAdd.useId"
                class="select-demo"
                :datas="useId"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="使用部门">
              <Select
                v-model="AssetsAdd.useDepartment"
                class="select-demo"
                :datas="useDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="管理部门">
              <Select
                v-model="AssetsAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport">
              <Select
                v-model="AssetsAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="存放地点" >
              <input type="text" v-model="AssetsAdd.storageLocation" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="备注" prop single>
              <textarea v-model="AssetsAdd.remarks" v-wordcount="1000"></textarea>
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
      UploadAdd: UploadModel.parse({}),
      AssetsAdd: AssetsModel.parse({}),
      acquisitionMethod: [],
      financialType: [],
      depreciationStatus: [],
      priceType: [],
      assetsStatus: [],
      isReport: [],
      procurementOrganizationForm: [],
      useId: [],
      useDepartment: [],
      loading: true,
      administrativeDepartment: [],
      validationRules: {
        required: [
          'number',
          'furniturePrice',
          'assetsName',
          'depreciationStatus',
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
      },
      assetsCategoryName: '' // 获取到的国标分类id
    };
  },
  mounted() {
    this.AssetsAdd.fiscalFunds = 0;
    this.AssetsAdd.noFiscalFunds = 0;
  },
  methods: {
    getcategoryName(data) {
      this.assetsCategoryName = data.categoryName;
      this.AssetsAdd.assetsCategoryName = data.categoryName;
      this.AssetsAdd.assetsCategory = data.code;
      this.getList();
      this.loading = false;
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
    getList() {
      R.pullDownList.department().then(resp => {
        if (resp.ok) {
          this.useDepartment = resp.body;
          this.administrativeDepartment = resp.body;
        }
      });
      R.pullDownList.user(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.useId = resp.body;
        }
      });
      // 取得方式
      this.AssetsAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.AssetsAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.AssetsAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 采购组织形式
      this.AssetsAdd.code = 'procurementOrganizationForm';
      R.pullDownList.findPullDownThree(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.procurementOrganizationForm = resp.body;
        }
      });
      // 资产状态
      this.AssetsAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 摊销状态
      this.AssetsAdd.code = 'depreciationStatus';
      R.pullDownList.findPullDownFive(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.depreciationStatus = resp.body;
        }
      });
       // 是否上报财政
      this.AssetsAdd.code = 'isReport';
      R.pullDownList.findPullDownSix(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
        if (resp.ok) {
          this.isReport = resp.body;
        }
      });
    },
    // 提交数据
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        this.AssetsAdd.uploadId = this.uploadIds.toString();
        R.Assets.furnitureAdd(AssetsModel.dispose(this.AssetsAdd)).then(resp => {
          if (resp.ok) {
            this.loading = false;
            this.$Message.success('保存成功');
            this.AssetsAdd = AssetsModel.parse({});
            this.AssetsAdd.assetsCategoryName = this.assetsCategoryName;
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
