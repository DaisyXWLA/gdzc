<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <Form
            mode="twocolumn"
            :model="landAdd"
            :rules="validationRules"
            ref="form"
            :label-width="150"
          >
            <div class="category-title" align="center">土地</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="newCode">
              <input type="text" v-model="landAdd.newCode" readonly />
            </FormItem>
            <FormItem label="财政编号" prop="oldCode">
              <input type="text" v-model="landAdd.oldCode" />
            </FormItem>
            <FormItem label="资产分类名称" prop="assetsCategoryName">
              <input type="text" v-model="landAdd.assetsCategoryName" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="assetsName">
              <input type="text" v-model="landAdd.assetsName" v-wordlimit="100" />
            </FormItem>
            <FormItem label="预算项目编号" prop="budgetItemNumber">
              <input type="text" v-model="landAdd.budgetItemNumber" v-wordlimit="50" />
            </FormItem>
            <FormItem label="取得方式" prop="acquisitionMethod">
              <Select
                v-model="landAdd.acquisitionMethod"
                class="select-demo"
                :datas="acquisitionMethod"
              ></Select>
            </FormItem>
            <FormItem label="使用权面积（㎡）" prop="floorArea">
              <NumberInput type="text" v-model="landAdd.floorArea"></NumberInput>
            </FormItem>
            <FormItem label="取得日期" prop="acquisitionTime">
              <DatePicker v-model="landAdd.acquisitionTime"></DatePicker>
            </FormItem>
            <FormItem label="其中：独用面积（㎡）" prop="heatingArea">
              <NumberInput type="text" v-model="landAdd.heatingArea"></NumberInput>
            </FormItem>
            <FormItem label="投入使用日期" prop="useTime">
              <DatePicker v-model="landAdd.useTime"></DatePicker>
            </FormItem>
            <FormItem label="产权形式" prop="formOfProperty">
              <Select v-model="landAdd.formOfProperty" class="select-demo" :datas="formOfProperty"></Select>
            </FormItem>
            <FormItem label="权属证明" prop="proofOfOwnership">
              <input type="text" v-model="landAdd.proofOfOwnership" v-wordlimit="50" />
            </FormItem>
            <FormItem label="权属性质" prop="ownershipNature">
              <Select
                v-model="landAdd.ownershipNature"
                class="select-demo"
                :datas="ownershipNature"
              ></Select>
            </FormItem>
            <FormItem label="权属证号" prop="ownershipNumber">
              <input type="text" v-model="landAdd.ownershipNumber" v-wordlimit="50" />
            </FormItem>
            <FormItem label="权属年限（月）" prop="tenureOfTenure">
              <NumberInput type="text" v-model="landAdd.tenureOfTenure"></NumberInput>
            </FormItem>
            <FormItem label="持证人" prop="holder">
              <Select v-model="landAdd.holder" class="select-demo" :datas="holder"></Select>
            </FormItem>
            <FormItem label="发证日期" prop="issueTime">
              <DatePicker v-model="landAdd.issueTime"></DatePicker>
            </FormItem>
            <FormItem label="使用权类型" prop="userType">
              <Select v-model="landAdd.userType" class="select-demo" :datas="userType"></Select>
            </FormItem>
            <FormItem label="分摊面积（㎡）" prop="shareArea">
              <NumberInput v-model="landAdd.shareArea" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="地类（用途）" prop="gentle">
              <input type="text" v-model="landAdd.gentle" v-wordlimit="50" />
            </FormItem>
            <FormItem label="土地级次" prop="landLevel">
              <Select v-model="landAdd.landLevel" class="select-demo" :datas="landLevel"></Select>
            </FormItem>
            <FormItem label="坐落位置" prop="location">
              <input type="text" v-model="landAdd.location" v-wordlimit="50" />
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="价值（元）" prop="price">
              <NumberInput v-model="landAdd.price" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="priceType">
              <Select v-model="landAdd.priceType" class="select-demo" :datas="priceType"></Select>
            </FormItem>
            <FormItem label="均价（元）" prop="averagePrice">
              <NumberInput v-model="landAdd.averagePrice" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="fiscalFunds">
              <NumberInput v-model="landAdd.fiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账状态" prop="financialType">
              <Select v-model="landAdd.financialType" class="select-demo" :datas="financialType"></Select>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="noFiscalFunds">
              <NumberInput v-model="landAdd.noFiscalFunds" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期" prop="financiaTime">
              <DatePicker v-model="landAdd.financiaTime"></DatePicker>
            </FormItem>
            <FormItem label="会计凭证号" prop="financiaCode">
              <input type="text" v-model="landAdd.financiaCode" v-wordlimit="50" />
            </FormItem>
            <FormItem label="账面净值（元）" prop="bookValue" single>
              <NumberInput v-model="landAdd.bookValue" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="自用面积（㎡）" prop="myArea">
              <NumberInput v-model="landAdd.myArea" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="自用价值（元）" prop="myValue">
              <NumberInput v-model="landAdd.myValue" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="出借面积（㎡）" prop="borrowArea">
              <NumberInput v-model="landAdd.borrowArea" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="出借价值（元）" prop="borrowValue">
              <NumberInput v-model="landAdd.borrowValue" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="出租面积（㎡）" prop="rentArea">
              <NumberInput v-model="landAdd.rentArea" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="出租价值（元）" prop="rentValue">
              <NumberInput v-model="landAdd.rentValue" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="闲置面积（㎡）" prop="idleArea">
              <NumberInput v-model="landAdd.idleArea" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="闲置价值（元）" prop="idleValue">
              <NumberInput v-model="landAdd.idleValue" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="其他面积（㎡）" prop="otherArea">
              <NumberInput v-model="landAdd.otherArea" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="其他价值（元）" prop="otherValue">
              <NumberInput v-model="landAdd.otherValue" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="管理部门" prop="administrativeDepartment">
              <Select
                v-model="landAdd.administrativeDepartment"
                class="select-demo"
                :datas="administrativeDepartment"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="资产状态" prop="assetsStatus">
              <Select v-model="landAdd.assetsStatus" class="select-demo" :datas="assetsStatus"></Select>
            </FormItem>
            <FormItem label="是否上报财政" prop="isReport" single>
              <Select
                v-model="landAdd.isReport"
                class="select-demo"
                :datas="isReport"
                :filterable="true"
              ></Select>
            </FormItem>
            <FormItem label="备注" prop="remarks" single>
              <textarea v-model="landAdd.remarks" v-wordcount="1000"></textarea>
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
import landModel from 'model/Assets/land';
export default {
  components: { uploadFile },
  data() {
    return {
      landAdd: landModel.parse({}),
      acquisitionMethod: [],
      formOfProperty: [],
      ownershipNature: [],
      holder: [],
      userType: [],
      landLevel: [],
      priceType: [],
      financialType: [],
      assetsStatus: [],
      isReport: [],
      validationRules: {
        required: [
          'assetsName',
          'acquisitionMethod',
          'floorArea',
          'acquisitionTime',
          'ownershipNature',
          'gentle',
          'location',
          'price',
          'averagePrice',
          'fiscalFunds',
          'financialType',
          'noFiscalFunds',
          'financiaTime',
          'financiaCode',
          'assetsStatus',
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
  mounted() {
    this.landAdd.fiscalFunds = 0;
    this.landAdd.noFiscalFunds = 0;
  },
  methods: {
    getcategoryName(data) {
      this.landAdd.assetsCategoryName = data.categoryName;
      this.landAdd.assetsCategory = data.code;
      this.getList();
      this.loading = false;
    },
    // 获取部门数据
    getList() {
      R.pullDownList.department(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.administrativeDepartment = resp.body;
        }
      });
      // 取得方式
      this.landAdd.code = 'acquisitionMethod';
      R.pullDownList.findPullDownInfo(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.acquisitionMethod = resp.body;
        }
      });
      // 财务入账状态
      this.landAdd.code = 'financialType';
      R.pullDownList.findPullDownOne(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.financialType = resp.body;
        }
      });
      // 价值类型
      this.landAdd.code = 'priceType';
      R.pullDownList.findPullDownTwo(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.priceType = resp.body;
        }
      });
      // 使用权类型
      this.landAdd.code = 'userType';
      R.pullDownList.findPullDownThree(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.userType = resp.body;
        }
      });
      // 资产状态
      this.landAdd.code = 'assetsStatus';
      R.pullDownList.findPullDownFour(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.assetsStatus = resp.body;
        }
      });
      // 土地级次
      this.landAdd.code = 'landLevel';
      R.pullDownList.findPullDownFive(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.landLevel = resp.body;
        }
      });
      // 产权形式
      this.landAdd.code = 'formOfProperty';
      R.pullDownList.findPullDownSix(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.formOfProperty = resp.body;
        }
      });
      // 权属性质
      this.landAdd.code = 'ownershipNature';
      R.pullDownList.findPullDownSeven(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.ownershipNature = resp.body;
        }
      });
      // 持证人
      this.landAdd.code = 'holder';
      R.pullDownList.findPullDownEight(landModel.dispose(this.landAdd)).then(resp => {
        if (resp.ok) {
          this.holder = resp.body;
        }
      });
      // 是否上报财政
      this.landAdd.code = 'isReport';
      R.pullDownList.findPullDownNine(landModel.dispose(this.landAdd)).then(resp => {
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
        this.landAdd.uploadId = this.uploadIds.toString();
        R.Assets.houseAdd(landModel.dispose(this.landAdd)).then(resp => {
          if (resp.ok) {
            this.loading = false;
            this.$Message.success('保存成功');
            this.assetsClassName = this.landAdd.assetsCategoryName;
            this.landAdd = landModel.parse({});
            this.landAdd.assetsCategoryName = this.assetsClassName;
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
