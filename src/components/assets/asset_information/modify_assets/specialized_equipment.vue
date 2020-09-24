<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            ref="form"
            :model="specializedEquipmentAdd"
            :rules="validationRules"
            mode="twocolumn"
            :label-width="150"
          >
            <div class="category-title" align="center">专用设备</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="specializedEquipmentAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="specializedEquipmentAdd.oldCode" />
            </FormItem>
            <FormItem label="资产分类名称" prop="assetsCategoryName">
              <input type="text" v-model="specializedEquipmentAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="specializedEquipmentAdd.assetsName" v-wordlimit="100" />
            </FormItem>
            <FormItem label="预算项目编号" prop="budgetItemNumber">
              <input
                type="text"
                v-model="specializedEquipmentAdd.budgetItemNumber"
                v-wordlimit="50"
              />
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="specializedEquipmentAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="specializedEquipmentAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="采购组织形式" prop="procurementOrganizationForm">
              <Select
                v-model="specializedEquipmentAdd.procurementOrganizationForm"
                class="select-demo"
                :datas="procurementOrganizationForm"
              ></Select>
            </FormItem>
            <FormItem label="设备用途" prop="facilityUse">
              <Select
                v-model="specializedEquipmentAdd.facilityUse"
                class="select-demo"
                :datas="facilityUse"
              ></Select>
            </FormItem>
            <FormItem label="品牌" prop="brand">
              <input type="text" v-model="specializedEquipmentAdd.brand" v-wordlimit="50" />
            </FormItem>
            <FormItem label="规格型号" prop="specificationModel">
              <input
                type="text"
                v-model="specializedEquipmentAdd.specificationModel"
                v-wordlimit="50"
              />
            </FormItem>
            <FormItem label="产品序列号" prop="serialNumber">
              <input type="text" v-model="specializedEquipmentAdd.serialNumber" v-wordlimit="50" />
            </FormItem>
            <FormItem label="生产厂家" prop="manufacturer">
              <input type="text" v-model="specializedEquipmentAdd.manufacturer" v-wordlimit="50" />
            </FormItem>
            <FormItem label="销售商" prop="seller">
              <input type="text" v-model="specializedEquipmentAdd.seller" v-wordlimit="50" />
            </FormItem>
            <FormItem label="投入使用日期" prop="useTime">
              <DatePicker v-model="specializedEquipmentAdd.useTime"></DatePicker>
            </FormItem>
            <FormItem label="合同编号" prop="contractNumber">
              <input type="text" v-model="specializedEquipmentAdd.contractNumber" v-wordlimit="50" />
            </FormItem>
            <FormItem label="保修截止日期" prop="repairDeadline">
              <DatePicker v-model="specializedEquipmentAdd.repairDeadline"></DatePicker>
            </FormItem>
            <FormItem label="发票号" prop="invoiceNumber">
              <input type="text" v-model="specializedEquipmentAdd.invoiceNumber" v-wordlimit="50" />
            </FormItem>
            <FormItem label="折旧年限（月）" prop="depreciationYear" single>
              <NumberInput v-model="specializedEquipmentAdd.depreciationYear"></NumberInput>
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="specializedEquipmentAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select
                v-model="specializedEquipmentAdd.priceType"
                class="select-demo"
                :datas="priceType"
              ></Select>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select
                v-model="specializedEquipmentAdd.financialType"
                class="select-demo"
                :datas="financialType"
              ></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="specializedEquipmentAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="specializedEquipmentAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="specializedEquipmentAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="折旧状态" prop="depreciationStatus">
              <Select
                v-model="specializedEquipmentAdd.depreciationStatus"
                class="select-demo"
                :datas="depreciationStatus"
              ></Select>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="specializedEquipmentAdd.financiaCode" v-wordlimit="50" />
            </FormItem>
            <FormItem label="账面净值（元）" prop="bookValue" single>
              <NumberInput v-model="specializedEquipmentAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="使用人" prop="useId">
              <Select
                v-model="specializedEquipmentAdd.useId"
                class="select-demo"
                :datas="useId"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select
                v-model="specializedEquipmentAdd.assetsStatus"
                class="select-demo"
                :datas="assetsStatus"
              ></Select>
            </FormItem>
            <FormItem label="使用部门" prop="useDepartment">
              <Select
                v-model="specializedEquipmentAdd.useDepartment"
                class="select-demo"
                :datas="useDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="管理部门" prop="administrativeDepartment">
              <Select
                v-model="specializedEquipmentAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport">
              <Select
                v-model="specializedEquipmentAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="存放地点" prop="storageLocation">
              <input type="text" v-model="specializedEquipmentAdd.storageLocation" v-wordlimit="50" />
            </FormItem>
            <FormItem label="备注" prop="remarks" single>
              <textarea v-model="specializedEquipmentAdd.remarks" v-wordcount="1000"></textarea>
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
import specializedEquipmentModel from 'model/Assets/specializedEquipment';
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      specializedEquipmentAdd: specializedEquipmentModel.parse({}),
      acquisitionMethod: [],
      financialType: [],
      priceType: [],
      depreciationStatus: [],
      assetsStatus: [],
      isReport: [],
      procurementOrganizationForm: [],
      facilityUse: [],
      administrativeDepartment: [],
      validationRules: {
        required: [
          'assetsCategoryName',
          'assetsName',
          'acquisitionMethod',
          'acquisitionTime',
          'facilityUse',
          'price',
          'priceType',
          'financialType',
          'fiscalFunds',
          'financiaTime',
          'noFiscalFunds',
          'depreciationStatus',
          'financiaCode',
          'useId',
          'assetsStatus',
          'useDepartment',
          'administrativeDepartment',
          'storageLocation',
          'isReport'
        ]
      },
      useId: [],
      useDepartment: [],
      loading: true,
      assetsClassName: '',
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      UploadAdd: UploadModel.parse({})
    };
  },
  mounted() {
    this.specializedEquipmentAdd.facilityUse = '6';
  },
  methods: {
    // 获取部门数据
    getList() {
      R.pullDownList.department(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.useDepartment = resp.body;
          this.administrativeDepartment = resp.body;
        }
      });
      R.pullDownList.user(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.useId = resp.body;
        }
      });
      // 取得方式
      this.specializedEquipmentAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.specializedEquipmentAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.specializedEquipmentAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 采购组织形式
      this.specializedEquipmentAdd.code = 'procurementOrganizationForm';
      R.pullDownList.findPullDownThree(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.procurementOrganizationForm = resp.body;
        }
      });
      // 资产状态
      this.specializedEquipmentAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 摊销状态
      this.specializedEquipmentAdd.code = 'depreciationStatus';
      R.pullDownList.findPullDownFive(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.depreciationStatus = resp.body;
        }
      });
      // 设备用途
      this.specializedEquipmentAdd.code = 'facilityUse';
      R.pullDownList.findPullDownSix(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.facilityUse = resp.body;
        }
      });
      // 是否上报财政
      this.specializedEquipmentAdd.code = 'isReport';
      R.pullDownList.findPullDownSeven(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.isReport = resp.body;
        }
      });
    },
    getAssetsId(id) {
      this.loading = true;
      this.getList();
      this.specializedEquipmentAdd.id = id;
      R.Assets.generalEquipmentFindOne(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.specializedEquipmentAdd = specializedEquipmentModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message('获取数据失败');
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
        this.specializedEquipmentAdd.uploadId = this.uploadIds.toString();
        R.Assets.generalEquipmentModify(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
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
      this.specializedEquipmentAdd.file = e.target.files[0];
      R.Upload.Upload(specializedEquipmentModel.dispose(this.specializedEquipmentAdd)).then(resp => {
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
