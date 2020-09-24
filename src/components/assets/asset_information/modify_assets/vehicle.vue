<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            ref="form"
            id="print"
            :model="vehicleAdd"
            :rules="validationRules"
            mode="twocolumn"
            :label-width="150"
          >
            <div class="category-title" align="center">车辆</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="vehicleAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="vehicleAdd.oldCode"/>
            </FormItem>
            <FormItem label="资产分类名称">
              <input type="text" v-model="vehicleAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="vehicleAdd.assetsName" v-wordlimit="100"/>
            </FormItem>
            <FormItem label="预算项目编号">
              <input type="text" v-model="vehicleAdd.budgetItemNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="vehicleAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="vehicleAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="编制情况" prop="preparationSituation">
              <Select
                v-model="vehicleAdd.preparationSituation"
                class="select-demo"
                :datas="preparationSituation"
              ></Select>
            </FormItem>
            <FormItem label="车牌号" prop="plateNumber">
              <input type="text" v-model="vehicleAdd.plateNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="规格型号" prop="specificationModel">
              <input type="text" v-model="vehicleAdd.specificationModel" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="汽车排气量" prop="exhaustVolume">
              <Select v-model="vehicleAdd.exhaustVolume" class="select-demo" :datas="exhaustVolume"></Select>
            </FormItem>
            <FormItem label="车辆品牌" prop="brand">
              <input type="text" v-model="vehicleAdd.brand" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="采购组织形式">
              <Select
                v-model="vehicleAdd.procurementOrganizationForm"
                class="select-demo"
                :datas="procurementOrganizationForm"
              ></Select>
            </FormItem>
            <FormItem label="车辆行驶证">
              <Select
                v-model="vehicleAdd.drivingLicense"
                class="select-demo"
                :datas="drivingLicense"
              ></Select>
            </FormItem>
            <FormItem label="持证人">
              <Select v-model="vehicleAdd.licensee" class="select-demo" :datas="licensee"></Select>
            </FormItem>
            <FormItem label="注册登记日期">
              <DatePicker v-model="vehicleAdd.registrationTime"></DatePicker>
            </FormItem>
            <FormItem label="发动机号" prop="engineNumber">
              <input type="text" v-model="vehicleAdd.engineNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="车辆识别代码" prop="vehicleNumber">
              <input type="text" v-model="vehicleAdd.vehicleNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="投入使用日期">
              <DatePicker v-model="vehicleAdd.useTime"></DatePicker>
            </FormItem>
            <FormItem label="车辆产地">
              <input type="text" v-model="vehicleAdd.vehicleOrigin" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="保修截止日期">
              <DatePicker v-model="vehicleAdd.repairDeadline"></DatePicker>
            </FormItem>
            <FormItem label="合同编号">
              <input type="text" v-model="vehicleAdd.contractNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="销售商">
              <input type="text" v-model="vehicleAdd.seller" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="发票号">
              <input type="text" v-model="vehicleAdd.invoiceNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="折旧年限（月）" single>
              <NumberInput type="text" v-model="vehicleAdd.depreciationYear"></NumberInput>
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="vehicleAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="vehicleAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select v-model="vehicleAdd.financialType" class="select-demo" :datas="financialType"></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="vehicleAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="vehicleAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="vehicleAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="折旧状态" prop="depreciationStatus">
              <Select
                v-model="vehicleAdd.depreciationStatus"
                class="select-demo"
                :datas="depreciationStatus"
              ></Select>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="vehicleAdd.financiaCode" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="账面净值（元）" single>
              <NumberInput v-model="vehicleAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="使用人" prop="useId">
              <Select v-model="vehicleAdd.useId" class="select-demo" :datas="useId" :filterable="true"></Select>
            </FormItem>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select v-model="vehicleAdd.assetsStatus" class="select-demo" :datas="assetsStatus"></Select>
            </FormItem>
            <FormItem label="使用部门" prop="useDepartment">
              <Select v-model="vehicleAdd.useDepartment" class="select-demo" :datas="useDepartment" :filterable="true"></Select>
            </FormItem>
            <FormItem label="管理部门" prop="administrativeDepartment">
              <Select
                v-model="vehicleAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport">
              <Select
                v-model="vehicleAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="车辆用途" prop="vehicleUse">
              <input type="text" v-model="vehicleAdd.vehicleUse" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="备注" single>
              <textarea v-model="vehicleAdd.remarks" v-wordcount="1000"></textarea>
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
            <Button color="blue" size="l" :loading="loading" @click="submit">更新</Button>
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
import vehicleModel from 'model/Assets/vehicle';
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      vehicleAdd: vehicleModel.parse({}),
      preparationSituation: [],
      priceType: [],
      depreciationStatus: [],
      drivingLicense: [],
      licensee: [],
      exhaustVolume: [],
      acquisitionMethod: [],
      financialType: [],
      assetsStatus: [],
      isReport: [],
      procurementOrganizationForm: [],
      administrativeDepartment: [],
      useDepartment: [],
      useId: [],
      validationRules: {
        required: [
          'useId',
          'useDepartment',
          'vehicleUse',
          'assetsCategoryName',
          'assetsName',
          'acquisitionMethod',
          'preparationSituation',
          'specificationModel',
          'plateNumber',
          'exhaustVolume',
          'brand',
          'engineNumber',
          'vehicleNumber',
          'acquisitionTime',
          'price',
          'priceType',
          'financialType',
          'fiscalFunds',
          'financiaTime',
          'noFiscalFunds',
          'financiaCode',
          'assetsStatus',
          'administrativeDepartment',
          'isReport'
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
    getAssetsId(id) {
      this.loading = true;
      this.getList();
      this.vehicleAdd.id = id;
      R.Assets.vehicleFindOne(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.vehicleAdd = vehicleModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message('获取数据失败');
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
            } else if (resp.body[i].docExt.indexOf('.xls') != -1) {
              this.images.push(this.linkT + 'xls.jpg');
            } else {
              this.images.push(this.link + resp.body[i].docSaveName);
            }
          }
        }
      });
    },
    // 获取部门数据
    getList() {
      R.pullDownList.user().then(resp => {
        if (resp.ok) {
          this.useId = resp.body;
        }
      });
      R.pullDownList.department(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.administrativeDepartment = resp.body;
          this.useDepartment = resp.body;
        }
      });
      // 取得方式
      this.vehicleAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.vehicleAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.vehicleAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 采购组织形式
      this.vehicleAdd.code = 'procurementOrganizationForm';
      R.pullDownList.findPullDownThree(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.procurementOrganizationForm = resp.body;
        }
      });
      // 资产状态
      this.vehicleAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 摊销状态
      this.vehicleAdd.code = 'depreciationStatus';
      R.pullDownList.findPullDownFive(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.depreciationStatus = resp.body;
        }
      });
      // 编制情况
      this.vehicleAdd.code = 'preparationSituation';
      R.pullDownList.findPullDownSix(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.preparationSituation = resp.body;
        }
      });
      // 车辆行驶证
      this.vehicleAdd.code = 'drivingLicense';
      R.pullDownList.findPullDownSeven(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.drivingLicense = resp.body;
        }
      });
      // 持证人
      this.vehicleAdd.code = 'holder';
      R.pullDownList.findPullDownEight(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.licensee = resp.body;
        }
      });
      // 汽车排气量
      this.vehicleAdd.code = 'exhaustVolume';
      R.pullDownList.findPullDownNine(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.exhaustVolume = resp.body;
        }
      });
      // 是否上报财政
      this.vehicleAdd.code = 'isReport';
      R.Inventory.findDictAll(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
          this.isReport = resp.body;
        }
      });
    },
    // 提交数据
    submit() {
      this.validResult = this.$refs.form.valid();
      if (this.validResult.result) {
        this.loading = true;
        this.vehicleAdd.uploadId = this.uploadIds.toString();
        R.Assets.vehicleModify(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
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
      this.copyrightAdd.file = e.target.files[0];
      R.Upload.Upload(vehicleModel.dispose(this.vehicleAdd)).then(resp => {
        if (resp.ok) {
        }
      });
    },
    deletefile(file) {
      this.images.splice(file, 1);
      this.UploadAdd.ids = this.uploadIds[file];
      R.Upload.delete(UploadModel.dispose(this.UploadAdd)).then(resp => {
        if (resp.ok) {
          // console.log(resp);
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

        // document.querySelectorAll('.name');
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
