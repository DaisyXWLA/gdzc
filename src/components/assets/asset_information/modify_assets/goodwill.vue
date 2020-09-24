<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            mode="twocolumn"
            :rules="validationRules"
            :model="GoodWillAdd"
            :label-width="150"
            ref="form"
          >
            <div class="category-title" align="center">无形资产_商誉</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="GoodWillAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="GoodWillAdd.oldCode"/>
            </FormItem>
            <FormItem label="资产分类名称" prop="assetsCategoryName">
              <input type="text" v-model="GoodWillAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="GoodWillAdd.assetsName" v-wordlimit="100"/>
            </FormItem>
            <FormItem label="预算项目编号" prop="budgetItemNumber">
              <input type="text" v-model="GoodWillAdd.budgetItemNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="GoodWillAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="GoodWillAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="投入使用日期" prop="useTime">
              <DatePicker v-model="GoodWillAdd.useTime"></DatePicker>
            </FormItem>
            <FormItem label="收益年限（月）" prop="profitYear">
              <input type="text" v-model="GoodWillAdd.profitYear" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="折旧年限（月）" prop="depreciationYear">
              <input type="text" v-model="GoodWillAdd.depreciationYear" v-wordlimit="50"/>
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="GoodWillAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="GoodWillAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select
                v-model="GoodWillAdd.financialType"
                class="select-demo"
                :datas="financialType"
              ></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="GoodWillAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="GoodWillAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="GoodWillAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="GoodWillAdd.financiaCode" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="摊销状态" prop="distributionStatus">
              <Select
                v-model="GoodWillAdd.distributionStatus"
                class="select-demo"
                :datas="distributionStatus"
              ></Select>
            </FormItem>
            <FormItem label="账面净值（元）" prop="bookValue" single>
              <NumberInput v-model="GoodWillAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select v-model="GoodWillAdd.assetsStatus" class="select-demo" :datas="assetsStatus"></Select>
            </FormItem>
            <FormItem label="管理部门">
              <Select
                v-model="GoodWillAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport" single>
              <Select
                v-model="GoodWillAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="备注" prop="remarks" single>
              <textarea v-model="GoodWillAdd.remarks" v-wordcount="1000"></textarea>
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
import GoodWillModel from 'model/Assets/GoodWill';
import UploadModel from 'model/upload/upload';
import uploadFile from '../../../common/gdzc/assets_upload_file';
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      GoodWillAdd: GoodWillModel.parse({}),
      acquisitionMethod: [],
      financialType: [],
      priceType: [],
      distributionStatus: [],
      assetsStatus: [],
      isReport: [],
      administrativeDepartment: [],
      data: '',
      datas: [],
      name: '',
      getCategoryId: '', // 获取到的国标分类id
      validationRules: {
        required: [
          'assetsCategoryName',
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
          'distributionStatus',
          'administrativeDepartment',
          'isReport'
        ]
      },
      administrativeDepartment: [],
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      UploadAdd: UploadModel.parse({}),
      loading: true,
      assetsClassName: ''
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
        }
      });
      this.GoodWillAdd.id = data;
      R.Assets.findGoodwill(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.GoodWillAdd = GoodWillModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message('获取数据失败');
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.Assets.AssetsFindOneImg(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
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
      this.GoodWillAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.GoodWillAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.GoodWillAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 资产状态
      this.GoodWillAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 摊销状态
      this.GoodWillAdd.code = 'distributionStatus';
      R.pullDownList.findPullDownFive(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
        if (resp.ok) {
          this.distributionStatus = resp.body;
        }
      });
       // 是否上报财政
      this.GoodWillAdd.code = 'isReport';
      R.pullDownList.findPullDownSix(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
        if (resp.ok) {
          this.isReport = resp.body;
        }
      });
    },
    // 上传附件
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
    // 删除附件
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
        this.GoodWillAdd.uploadId = this.uploadIds.toString();
        R.Assets.goodwillModify(GoodWillModel.dispose(this.GoodWillAdd)).then(resp => {
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
