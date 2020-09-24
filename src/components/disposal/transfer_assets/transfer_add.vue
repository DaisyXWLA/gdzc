<template>
  <div>
    <Modal v-model="transferAdd" hasDivider :closeOnMask="closeOnMask" :middle="true">
      <div slot="header" class="title">
        新增移交
        <i class="h-icon-close" @click="cancel"></i>
      </div>
      <div>
        <Form
          ref="form"
          :model="transferAssetsList"
          :label-width="120"
          :top="0.2"
          :rules="validationRules"
          showErrorTip
          mode="twocolumn"
        >
          <FormItem label="标题" prop="title" single>
            <input type="text" v-model="transferAssetsList.title" v-wordlimit="100" />
          </FormItem>
          <FormItem label="移交时间" prop="applicantTime">
            <DatePicker v-model="transferAssetsList.applicantTime"></DatePicker>
          </FormItem>
          <FormItem label="移交编号" prop="code">
            <input type="text" v-model="transferAssetsList.code" placeholder="系统自动生成" readonly />
          </FormItem>

          <FormItem label="原使用人" prop="applicant" single>
            <Select
              v-model="transferAssetsList.applicant"
              :datas="userOption"
              :filterable="true"
              @change="selectApplicant"
            ></Select>
          </FormItem>
          <FormItem label="接收人" prop="receiver">
            <Select
              v-model="transferAssetsList.receiver"
              class="select-demo"
              :datas="userOption"
              :filterable="true"
              @change="selectUser"
            ></Select>
          </FormItem>
          <FormItem label="接收人部门" prop="receiverDepartment">
            <input type="text" v-model="receiverDepartment" readonly />
          </FormItem>
          <FormItem label="备注" prop="remarks" single>
            <input type="text" v-model="transferAssetsList.remarks" v-wordlimit="50" />
          </FormItem>
        </Form>
      </div>
      <Row>
        <Cell :width="24">
          <h3 class="blue-color">移交资产</h3>
        </Cell>
      </Row>
      <Row>
        <Cell :width="24">
          <Table ref="table" :datas="datas" :loading="isLoading" :height="132">
            <TableItem title="序号" prop="$serial" align="center" :width="50"></TableItem>
            <TableItem title="资产编号" prop="newCode" align="left" :width="100"></TableItem>
            <TableItem title="财政编号" prop="oldCode" align="left" :width="120"></TableItem>
            <TableItem title="资产名称" align="left" :width="150">
              <template slot-scope="{ data }">
                <TextEllipsis
                  :text="data.assetsName"
                  more="..."
                  :height="20"
                  useTooltip
                  tooltipTheme="white"
                ></TextEllipsis>
              </template>
            </TableItem>
            <TableItem title="取得日期" prop="acquisitionTime" align="left" :width="120"></TableItem>
            <TableItem title="使用部门" prop="useDepartmentName" align="left" :width="120"></TableItem>
            <TableItem title="管理部门" prop="administrativeDepartmentName" align="left" :width="120"></TableItem>
            <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="200"></TableItem>
            <TableItem title="品牌" align="left" :width="100">
              <template slot-scope="{ data }">
                <TextEllipsis
                  :text="data.brand"
                  more="..."
                  :height="20"
                  useTooltip
                  tooltipTheme="white"
                ></TextEllipsis>
              </template>
            </TableItem>
            <TableItem title="型号" align="left" :width="80">
              <template slot-scope="{ data }">
                <TextEllipsis
                  :text="data.specificationModel"
                  more="..."
                  :height="20"
                  useTooltip
                  tooltipTheme="white"
                ></TextEllipsis>
              </template>
            </TableItem>
            <TableItem title="单价" prop="price" align="right" :width="60"></TableItem>
            <TableItem title="数量" prop="number" align="left" :width="60"></TableItem>
            <TableItem title="存放地点" align="left" :width="150">
              <template slot-scope="{ data }">
                <TextEllipsis
                  :text="data.storageLocation"
                  more="..."
                  :height="20"
                  useTooltip
                  tooltipTheme="white"
                ></TextEllipsis>
              </template>
            </TableItem>
            <TableItem title="使用人" prop="username" align="left" :width="80"></TableItem>
            <TableItem title="资产状态" align="center" :width="80">
              <template slot-scope="{ data }">
                <div v-if="data.assetsStatus == 0">
                  <span class="h-tag h-tag-blue">闲置</span>
                </div>
                <div v-else-if="data.assetsStatus == 1">
                  <span class="h-tag h-tag-red">故障</span>
                </div>
                <div v-else-if="data.assetsStatus == 2">
                  <span class="h-tag h-tag-yellow">报废</span>
                </div>
                <div v-else-if="data.assetsStatus == 3">
                  <span class="h-tag h-tag-green">在用</span>
                </div>
                <div v-else>
                  <span class="h-tag h-tag-gray">缺失</span>
                </div>
              </template>
            </TableItem>
          </Table>
          <p></p>
        </Cell>
      </Row>
      <Row>
        <Cell :width="24">
          <h3 class="blue-color">相关附件</h3>
          <div style="display:inline-block;margin-left:2%;">
            <uploadFile @getUploadId="getUploadId"></uploadFile>
          </div>
        </Cell>
        <Cell :width="24">
          <div style="width:100% ;height:110px;">
            <div style="width:100% ;height:80px;">
              <Uploader type="images" data-type="url" :files="images" @deletefile="deletefile"></Uploader>
            </div>
            <div>
              <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{ d }}</span>
            </div>
          </div>
        </Cell>
      </Row>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="submit">保存</button>
        <button class="h-btn" @click="cancel">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import uploadFile from '../../common/gdzc/upload_file';
import transferAssetsModel from 'model/transferAssets/transferAssetsModel';
import UploadModel from 'model/upload/upload';
export default {
  props: ['transferAdd', 'currentTime', 'applicant', 'userOption', 'departmentOption'],
  components: {
    uploadFile
  },
  data() {
    return {
      transferAssetsList: transferAssetsModel.parse({}),
      datas: [],
      readonly: true,
      closeOnMask: false,
      validationRules: {
        required: ['title', 'scrappedTime']
      },
      pagination: {
        page: 1,
        size: 500,
        total: 500
      },
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      UploadAdd: UploadModel.parse({}),
      isLoading: false,
      receiverDepartment: '',
      receiverDepartmentId: ''
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 选择接收人获取接收人所属部门
    selectUser(data) {
      this.transferAssetsList.userId = data.key;
      R.pullDownList.findDepartmentNameByUser(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          this.receiverDepartment = resp.body.title;
          this.receiverDepartmentId = resp.body.key;
        }
      });
    },
    // 选择移交人获取移交人所属资产
    selectApplicant(data) {
      this.transferAssetsList.userId = data.key;
      this.isLoading = true;
      R.transferAssets.findAssetsByUser(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.transferAssetsList.uploadId = this.uploadIds.toString();
        let selectAssetsIds = [];
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          selectAssetsIds.push(this.$refs.table.getSelection()[i].id);
        }
        this.transferAssetsList.ids = selectAssetsIds;
        console.log(selectAssetsIds);
        this.transferAssetsList.receiverDepartment = this.receiverDepartmentId;
        this.$Loading();
        R.transferAssets.transferAssetsSave(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('保存成功');
              this.transferAssetsList = transferAssetsModel.parse({});
              this.$emit('getData');
            }, 1000);
          } else {
            this.$Message.error('保存失败');
            this.$parent.close();
            this.$Loading.close();
          }
        });
      }
    },
    cancel() {
      this.$parent.close();
    },
    // 上傳文件
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
h3 {
  display: inline-block;
  padding: 1% 0;
}
.title {
  overflow: hidden;
  .h-icon-close {
    float: right;
    line-height: 40px;
    padding-right: 15px;
  }
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
