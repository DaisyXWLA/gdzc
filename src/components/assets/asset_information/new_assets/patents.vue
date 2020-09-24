<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            ref="form"
            :model="patentsAdd"
            :rules="validationRules"
            mode="twocolumn"
            :label-width="150"
          >
            <div class="category-title" align="center">无形资产_专利</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="patentsAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="patentsAdd.oldCode"/>
            </FormItem>
            <FormItem label="资产分类名称" prop="assetsCategoryName">
              <input type="text" v-model="patentsAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="patentsAdd.assetsName" v-wordlimit="100"/>
            </FormItem>
            <FormItem label="预算项目编号" prop="budgetItemNumber">
              <input type="text" v-model="patentsAdd.budgetItemNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="patentsAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="patentsAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="投入使用日期" prop="useTime">
              <DatePicker v-model="patentsAdd.useTime"></DatePicker>
            </FormItem>
            <FormItem label="收益年限（月）" prop="profitYear">
              <input type="text" v-model="patentsAdd.profitYear" v-wordlimit="50" />
            </FormItem>
            <FormItem label="注册登记机关" prop="registrationOrgan">
              <input type="text" v-model="patentsAdd.registrationOrgan" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="注册登记日期" prop="registrationTime">
              <DatePicker v-model="patentsAdd.registrationTime"></DatePicker>
            </FormItem>
            <FormItem label="批准文号" prop="approvalNumber">
              <input type="text" v-model="patentsAdd.approvalNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="专利号" prop="patentNumber">
              <input type="text" v-model="patentsAdd.patentNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="发明人" prop="inventionName">
              <input type="text" v-model="patentsAdd.inventionName" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="发明名称" prop="inventionTitle">
              <input type="text" v-model="patentsAdd.inventionTitle" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="授权公告日" prop="announcementTime">
              <DatePicker v-model="patentsAdd.announcementTime"></DatePicker>
            </FormItem>
            <FormItem label="证书号" prop="certificateNumber">
              <input type="text" v-model="patentsAdd.certificateNumber" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="折旧年限（月）" prop="depreciationYear">
              <input type="text" v-model="patentsAdd.depreciationYear" v-wordlimit="50"/>
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="patentsAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="patentsAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select v-model="patentsAdd.financialType" class="select-demo" :datas="financialType"></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="patentsAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="patentsAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="patentsAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="摊销状态" prop="distributionStatus">
              <Select
                v-model="patentsAdd.distributionStatus"
                class="select-demo"
                :datas="distributionStatus"
              ></Select>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="patentsAdd.financiaCode" v-wordlimit="50"/>
            </FormItem>
            <FormItem label="账面净值（元）" prop="bookValue" single>
              <NumberInput v-model="patentsAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select v-model="patentsAdd.assetsStatus" class="select-demo" :datas="assetsStatus"></Select>
            </FormItem>
            <FormItem label="管理部门" prop="administrativeDepartment">
              <Select
                v-model="patentsAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport" single>
              <Select
                v-model="patentsAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="备注" prop="remarks" single>
              <textarea v-model="patentsAdd.remarks" v-wordcount="1000"></textarea>
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
import uploadFile from '../../../common/gdzc/upload_file';
import UploadModel from 'model/upload/upload';
import patentsModel from 'model/Assets/patents';
export default {
  components: { uploadFile },
  data() {
    return {
      patentsAdd: patentsModel.parse({}),
      acquisitionMethod: [],
      financialType: [],
      distributionStatus: [],
      priceType: [],
      assetsStatus: [],
      isReport: [],
      administrativeDepartment: [],
      validationRules: {
        required: [
          'assetsCategoryName',
          'assetsName',
          'acquisitionMethod',
          'acquisitionTime',
          'registrationOrgan',
          'registrationTime',
          'approvalNumber',
          'patentNumber',
          'inventionName',
          'inventionTitle',
          'announcementTime',
          'certificateNumber',
          'price',
          'priceType',
          'financialType',
          'fiscalFunds',
          'financiaTime',
          'noFiscalFunds',
          'financiaCode',
          'distributionStatus',
          'assetsStatus',
          'administrativeDepartment',
          'isReport'
        ]
      },
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
  mounted() {
    this.patentsAdd.fiscalFunds = 0;
    this.patentsAdd.noFiscalFunds = 0;
  },
  methods: {
    getcategoryName(data) {
      this.patentsAdd.assetsCategoryName = data.categoryName;
      this.patentsAdd.assetsCategory = data.code;
      this.getList();
      this.loading = false;
    },
    // 获取部门数据
    getList() {
      R.pullDownList.department(patentsModel.dispose(this.patentsAdd)).then(resp => {
        if (resp.ok) {
          this.administrativeDepartment = resp.body;
        }
      });
      // 取得方式
      this.patentsAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(patentsModel.dispose(this.patentsAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.patentsAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(patentsModel.dispose(this.patentsAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.patentsAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(patentsModel.dispose(this.patentsAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 使用权类型
      this.patentsAdd.code = 'distributionStatus';
      R.pullDownList.findPullDownThree(patentsModel.dispose(this.patentsAdd)).then(resp => {
        if (resp.ok) {
          this.distributionStatus = resp.body;
        }
      });
      // 资产状态
      this.patentsAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(patentsModel.dispose(this.patentsAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 是否上报财政
      this.patentsAdd.code = 'isReport';
      R.pullDownList.findPullDownFive(patentsModel.dispose(this.patentsAdd)).then(resp => {
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
        this.patentsAdd.uploadId = this.uploadIds.toString();
        R.Assets.patentsAdd(patentsModel.dispose(this.patentsAdd)).then(resp => {
          if (resp.ok) {
            this.loading = false;
            this.$Message.success('保存成功');
            this.assetsClassName = this.patentsAdd.assetsCategoryName;
            this.patentsAdd = patentsModel.parse({});
            this.patentsAdd.assetsCategoryName = this.assetsClassName;
          } else {
            this.loading = false;
            this.$Message.error('保存失败');
          }
        });
      }
    },
    // 删除附件
    deletefile(file) {
      this.images.splice(file, 1);
      this.UploadAdd.ids = this.uploadIds[file];
      R.Upload.delete(UploadModel.dispose(this.UploadAdd)).then(resp => {});
      this.uploadIds.splice(file, 1);
      this.uploadNames.splice(file, 1);
      this.$Message.success('附件删除成功');
    },
    // 上传附件
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
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 20px);
  overflow: auto;
}
</style>
