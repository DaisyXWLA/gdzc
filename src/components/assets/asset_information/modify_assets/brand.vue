<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            ref="form"
            :model="brandAdd"
            :rules="validationRules"
            mode="twocolumn"
            :label-width="150"
          >
            <div class="category-title" align="center">无形资产_商标</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="brandAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="brandAdd.oldCode" />
            </FormItem>
            <FormItem label="资产分类名称" prop="assetsCategoryName">
              <input type="text" v-model="brandAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="brandAdd.assetsName" v-wordlimit="100"/>
            </FormItem>
            <FormItem label="预算项目编号" prop="budgetItemNumber">
              <input type="text" v-model="brandAdd.budgetItemNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="brandAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="brandAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="收益年限（月）" prop="profitYear">
              <input type="text" v-model="brandAdd.profitYear" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="注册登记日期" prop="registrationTime">
              <DatePicker v-model="brandAdd.registrationTime"></DatePicker>
            </FormItem>
            <FormItem label="注册登记机关" prop="registrationOrgan">
              <input type="text" v-model="brandAdd.registrationOrgan" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="批准文号" prop="approvalNumber">
              <input type="text" v-model="brandAdd.approvalNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="证书号" prop="certificateNumber">
              <input type="text" v-model="brandAdd.certificateNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="专利号" prop="patentNumber">
              <input type="text" v-model="brandAdd.patentNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="发明人" prop="inventionName">
              <input type="text" v-model="brandAdd.inventionName" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="折旧年限（月）" prop="depreciationYear" single>
              <input type="text" v-model="brandAdd.depreciationYear" v-wordlimit="50"/>
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="brandAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="brandAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select v-model="brandAdd.financialType" class="select-demo" :datas="financialType"></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="brandAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="brandAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="brandAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="brandAdd.financiaCode" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="摊销状态" prop="distributionStatus">
              <Select
                v-model="brandAdd.distributionStatus"
                class="select-demo"
                :datas="distributionStatus"
              ></Select>
            </FormItem>
            <FormItem label="账面净值（元）" prop="bookValue" single>
              <NumberInput v-model="brandAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select v-model="brandAdd.assetsStatus" class="select-demo" :datas="assetsStatus"></Select>
            </FormItem>
            <FormItem label="管理部门" prop="administrativeDepartment">
              <Select
                v-model="brandAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport" single>
              <Select
                v-model="brandAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="备注" prop="remarks" single>
              <textarea v-model="brandAdd.remarks" v-wordcount="1000"></textarea>
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
            <Button color="blue" size="l" @click="submit">更新</Button>
          </div>
        </Cell>
      </Row>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>
<script>
import uploadFile from '../../../common/gdzc/assets_upload_file';
import UploadModel from 'model/upload/upload';
import brandModel from 'model/Assets/brand';
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      brandAdd: brandModel.parse({}),
      acquisitionMethod: [],
      financialType: [],
      distributionStatus: [],
      priceType: [],
      assetsStatus: [],
      isReport: [],
      procurementOrganizationForm: [],
      administrativeDepartment: [],
      validationRules: {
        required: [
          'assetsCategoryName',
          'assetsName',
          'acquisitionMethod',
          'acquisitionTime',
          'price',
          'priceType',
          'financialType',
          'fiscalFunds',
          'financiaTime',
          'noFiscalFunds',
          'financiaCode',
          'distributionStatus',
          'assetsStatus',
          'isReport',
          'administrativeDepartment'
        ]
      },
      data: '',
      datas: [],
      name: '',
      getCategoryId: '', // 获取到的国标分类id
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      UploadAdd: UploadModel.parse({}),
      loading: true
    };
  },
  mounted() {},
  methods: {
    // 获取部门数据
    getList() {
      R.pullDownList.department(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.administrativeDepartment = resp.body;
        }
      });
      // 取得方式
      this.brandAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.brandAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.brandAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 采购组织形式
      this.brandAdd.code = 'procurementOrganizationForm';
      R.pullDownList.findPullDownThree(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.procurementOrganizationForm = resp.body;
        }
      });
      // 资产状态
      this.brandAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 是否上报财政
      this.brandAdd.code = 'isReport';
      R.pullDownList.findPullDownSix(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.isReport = resp.body;
        }
      });
      // 摊销状态
      this.brandAdd.code = 'distributionStatus';
      R.pullDownList.findPullDownFive(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.distributionStatus = resp.body;
        }
      });
    },
    getAssetsId(id) {
      this.loading = true;
      this.getList();
      this.brandAdd.id = id;
      R.Assets.findBrand(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.brandAdd = brandModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message('获取数据失败');
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
          for (let i = 0; i < resp.body.length; i++) {
            this.uploadIds.push(resp.body[i].id);
            this.uploadNames.push(resp.body[i].docName);
            if (resp.body[i].docExt.indexOf('.doc') != -1) {
              this.images.push(this.linkT + 'doc.jpg');
            } else if (resp.body[i].docExt.indexOf('.xls') != -1) {
              this.images.push(this.linkT + 'xls.jpg');
            } else {
              this.images.push(this.link + resp.body[i].docSaveName);
            }
          }
        }
      });
    },
    // 提交数据
    submit() {
      this.validResult = this.$refs.form.valid();
      if (this.validResult.result) {
        this.loading = true;
        this.brandAdd.uploadId = this.uploadIds.toString();
        R.Assets.brandModify(brandModel.dispose(this.brandAdd)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.loading = false;
              this.$Message.success('更新成功');
            }, 500);
          } else {
            this.loading = false;
            this.$Message.error('更新失败');
          }
        });
      }
    },
    // 上传附件
    onUpload: function (e) {
      this.brandAdd.file = e.target.files[0];
      R.Upload.Upload(brandModel.dispose(this.brandAdd)).then(resp => {
        if (resp.ok) {
        }
      });
    },
    deletefile(file) {
      this.images.splice(file, 1);
      this.UploadAdd.ids = this.uploadIds[file];
      R.Upload.delete(UploadModel.dispose(this.UploadAdd)).then(resp => {
        if (resp.ok) {
          this.$Message.success('附件删除成功');
        }
      });
      this.uploadIds.splice(file, 1);
      this.uploadNames.splice(file, 1);
    },
    getUploadId(data) {
      if (data.id.length > 10) {
        this.uploadIds.push(data.id);
        this.uploadNames.push(data.docName);
        this.$Message.success('附件上传成功');
        // console.log(data.ext);
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
      } else {
        this.$Message.error('上传附件失败');
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
</style>
