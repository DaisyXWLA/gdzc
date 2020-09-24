<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            mode="twocolumn"
            :rules="validationRules"
            :model="AnimalAndBotanyAdd"
            :label-width="150"
            ref="form"
          >
            <div class="category-title" align="center">特种动植物</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="AnimalAndBotanyAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="AnimalAndBotanyAdd.oldCode"/>
            </FormItem>
            <FormItem label="资产分类名称">
              <input type="text" v-model="AnimalAndBotanyAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="AnimalAndBotanyAdd.assetsName" v-wordlimit="100"/>
            </FormItem>
            <FormItem label="预算项目编号">
              <input type="text" v-model="AnimalAndBotanyAdd.budgetItemNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="AnimalAndBotanyAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="AnimalAndBotanyAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="采购组织形式">
              <Select
                v-model="AnimalAndBotanyAdd.procurementOrganizationForm"
                class="select-demo"
                :datas="procurementOrganizationForm"
              ></Select>
            </FormItem>
            <FormItem label="预计寿命/栽种年龄">
              <input type="text" v-model="AnimalAndBotanyAdd.expectLife" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="出生/栽种年份">
              <DatePicker v-model="AnimalAndBotanyAdd.birthday"></DatePicker>
            </FormItem>
            <FormItem label="纲属科">
              <input type="text" v-model="AnimalAndBotanyAdd.classFamily" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="产地">
              <input type="text" v-model="AnimalAndBotanyAdd.place" v-wordlimit="50"/>
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="数量">
              <input type="text" v-model="AnimalAndBotanyAdd.number" readonly />
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="AnimalAndBotanyAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="AnimalAndBotanyAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="单价（元）" prop>
              <NumberInput v-model="AnimalAndBotanyAdd.animalPrice" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select
                v-model="AnimalAndBotanyAdd.financialType"
                class="select-demo"
                :datas="financialType"
              ></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="AnimalAndBotanyAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="AnimalAndBotanyAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="AnimalAndBotanyAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="AnimalAndBotanyAdd.financiaCode" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="账面净值（元）">
              <NumberInput v-model="AnimalAndBotanyAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select
                v-model="AnimalAndBotanyAdd.assetsStatus"
                class="select-demo"
                :datas="assetsStatus"
              ></Select>
            </FormItem>
            <FormItem label="使用人">
              <Select v-model="AnimalAndBotanyAdd.useId" class="select-demo" :datas="useId" :filterable="true"></Select>
            </FormItem>
            <FormItem label="使用部门">
              <Select
                v-model="AnimalAndBotanyAdd.useDepartment"
                class="select-demo"
                :datas="useDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="管理部门">
              <Select
                v-model="AnimalAndBotanyAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport">
              <Select
                v-model="AnimalAndBotanyAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="存放地点">
              <input type="text" v-model="AnimalAndBotanyAdd.storageLocation" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="备注" single>
              <textarea v-model="AnimalAndBotanyAdd.remarks" v-wordcount="1000"></textarea>
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
import AnimalAndBotanyModel from 'model/Assets/AnimalAndBotany';
import UploadModel from 'model/upload/upload';
import uploadFile from '../../../common/gdzc/assets_upload_file';
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
      AnimalAndBotanyAdd: AnimalAndBotanyModel.parse({}),
      acquisitionMethod: [],
      financialType: [],
      priceType: [],
      procurementOrganizationForm: [],
      assetsStatus: [],
      isReport: [],
      administrativeDepartment: [],
      useDepartment: [],
      useId: [],
      data: '',
      datas: [],
      name: '',
      getCategoryId: '', // 获取到的国标分类id
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
      },
      loading: true
    };
  },
  mounted() {},
  methods: {
    getAssetsId(data) {
      this.getList(data);
    },
    getList(data) {
      this.loading = true;
      R.pullDownList.department().then(resp => {
        if (resp.ok) {
          this.administrativeDepartment = resp.body;
          this.useDepartment = resp.body;
        }
      });
      R.pullDownList.user().then(resp => {
        if (resp.ok) {
          this.useId = resp.body;
        }
      });
      this.AnimalAndBotanyAdd.id = data;
      R.Assets.findSpecialPlantAnimal(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.AnimalAndBotanyAdd = AnimalAndBotanyModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message('获取数据失败');
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
            } else if (resp.body[i].docExt.indexOf('.xls') != -1) {
              this.images.push(this.linkT + 'xls.jpg');
            } else {
              this.images.push(this.link + resp.body[i].docSaveName);
            }
          }
        }
      });
      // 取得方式
      this.AnimalAndBotanyAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.AnimalAndBotanyAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.AnimalAndBotanyAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 采购组织形式
      this.AnimalAndBotanyAdd.code = 'procurementOrganizationForm';
      R.pullDownList.findPullDownThree(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
        if (resp.ok) {
          this.procurementOrganizationForm = resp.body;
        }
      });
      // 资产状态
      this.AnimalAndBotanyAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 是否上报财政
      this.AnimalAndBotanyAdd.code = 'isReport';
      R.pullDownList.findPullDownFive(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
        if (resp.ok) {
          this.isReport = resp.body;
        }
      });
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
        } else {
          this.images.push(this.link + data.name);
        }
      } else {
        this.$Message.error('上传失败');
      }
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
    // 提交数据
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.loading = true;
        this.AnimalAndBotanyAdd.uploadId = this.uploadIds.toString();
        R.Assets.specialPlantAnimalModify(AnimalAndBotanyModel.dispose(this.AnimalAndBotanyAdd)).then(resp => {
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
