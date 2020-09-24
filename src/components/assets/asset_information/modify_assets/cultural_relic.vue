<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            id="print"
            mode="twocolumn"
            :rules="validationRules"
            :model="DisplayAdd"
            :label-width="150"
            ref="form"
          >
            <div class="category-title" align="center">文物和陈列品</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="DisplayAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="DisplayAdd.oldCode"/>
            </FormItem>
            <FormItem label="资产分类名称">
              <input type="text" v-model="DisplayAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="DisplayAdd.assetsName" v-wordlimit="100"/>
            </FormItem>
            <FormItem label="预算项目编号">
              <input type="text" v-model="DisplayAdd.budgetItemNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="DisplayAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="DisplayAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="采购组织形式" prop="procurementOrganizationForm">
              <Select
                v-model="DisplayAdd.procurementOrganizationForm"
                class="select-demo"
                :datas="procurementOrganizationForm"
              ></Select>
            </FormItem>
            <FormItem label="来源地">
              <input type="text" v-model="DisplayAdd.source" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="藏品年代">
              <input type="text" v-model="DisplayAdd.year" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="文物等级" single>
              <Select
                v-model="DisplayAdd.culturalRelicLevel"
                class="select-demo"
                :datas="culturalRelicLevel"
              ></Select>
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="数量" prop="number">
              <input type="text" v-model="DisplayAdd.number" readonly />
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="DisplayAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="DisplayAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="单价（元）">
              <NumberInput v-model="DisplayAdd.displayPrice" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select v-model="DisplayAdd.financialType" class="select-demo" :datas="financialType"></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="DisplayAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="DisplayAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="DisplayAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="DisplayAdd.financiaCode" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="账面净值（元）">
              <NumberInput v-model="DisplayAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select v-model="DisplayAdd.assetsStatus" class="select-demo" :datas="assetsStatus"></Select>
            </FormItem>
            <FormItem label="使用部门">
              <Select v-model="DisplayAdd.useDepartment" class="select-demo" :datas="useDepartment" :filterable="true"></Select>
            </FormItem>
            <FormItem label="管理部门">
              <Select
                v-model="DisplayAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport">
              <Select
                v-model="DisplayAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="存放地点" prop single>
              <input type="text" v-model="DisplayAdd.storageLocation" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="备注" prop single>
              <textarea v-model="DisplayAdd.remarks" v-wordcount="1000"></textarea>
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
import DisplayModel from 'model/Assets/Display';
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
      DisplayAdd: DisplayModel.parse({}),
      acquisitionMethod: [],
      financialType: [],
      priceType: [],
      culturalRelicLevel: [],
      procurementOrganizationForm: [],
      distributionStatus: [],
      assetsStatus: [],
      isReport: [],
      administrativeDepartment: [],
      useDepartment: [],
      getCategoryId: '', // 获取到的国标分类id
      loading: true,
      validationRules: {
        required: [
          'assetsName',
          'acquisitionMethod',
          'acquisitionTime',
          'price',
          'number',
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
      this.DisplayAdd.id = data;
      R.Assets.culturalRelicFindOne(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.DisplayAdd = DisplayModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message('获取数据失败');
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
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
      this.DisplayAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.DisplayAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.DisplayAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 采购组织形式
      this.DisplayAdd.code = 'procurementOrganizationForm';
      R.pullDownList.findPullDownThree(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.procurementOrganizationForm = resp.body;
        }
      });
      // 资产状态
      this.DisplayAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 摊销状态
      this.DisplayAdd.code = 'distributionStatus';
      R.pullDownList.findPullDownFive(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.distributionStatus = resp.body;
        }
      });
      // 文物等级
      this.DisplayAdd.code = 'culturalRelicLevel';
      R.pullDownList.findPullDownSix(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
        if (resp.ok) {
          this.culturalRelicLevel = resp.body;
        }
      });
      // 是否上报财政
      this.DisplayAdd.code = 'isReport';
      R.pullDownList.findPullDownSeven(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
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
        this.DisplayAdd.uploadId = this.uploadIds.toString();
        R.Assets.culturalRelicModify(DisplayModel.dispose(this.DisplayAdd)).then(resp => {
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
