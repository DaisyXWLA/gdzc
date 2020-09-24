<template>
  <div>
    <Modal v-model="repairModify" hasDivider :closeOnMask="closeOnMask" :middle="true">
      <div slot="header" class="title">
        编辑报修
        <i class="h-icon-close" @click="cancel"></i>
      </div>
      <div>
        <div>
          <div>
            <Form
              ref="form"
              :model="assetsRepairList"
              :label-width="120"
              :top="0.2"
              :rules="validationRules"
              showErrorTip
              mode="twocolumn"
            >
              <!-- <h3 class="blue-color">报修信息</h3> -->
              <FormItem label="标题" prop="title" single>
                <input type="text" v-model="assetsRepairList.title" v-wordlimit="100" />
              </FormItem>
              <FormItem label="预约维修时间" prop="planServiceTime">
                <DatePicker v-model="assetsRepairList.planServiceTime"></DatePicker>
              </FormItem>
              <FormItem label="维修编号" prop="code">
                <input
                  type="text"
                  v-model="assetsRepairList.code"
                  placeholder="系统自动生成"
                  readonly
                  disabled
                />
              </FormItem>
              <FormItem label="报修人" prop="repair">
                <!-- <input type="text" v-model="assetsRepairList.repairName" readonly /> -->
                <Select
                  v-model="assetsRepairList.repair"
                  :datas="userOption"
                  :filterable="true"
                  disabled
                ></Select>
              </FormItem>
              <FormItem label="报修时间" prop="repairTime">
                <DatePicker v-model="assetsRepairList.repairTime"></DatePicker>
              </FormItem>
              <FormItem label="故障内容" prop="faultContent" single>
                <textarea v-model="assetsRepairList.faultContent" v-wordcount="500"></textarea>
              </FormItem>
              <!-- <FormItem label="备注" prop="remarks" single style="padding-bottom:0;">
                <input type="text" v-model="assetsRepairList.remarks" v-wordlimit="2000" />
              </FormItem>-->
            </Form>
          </div>
          <Row :space-y="20">
            <Cell :width="24">
              <h3 class="blue-color">报修资产</h3>
              <!-- <Button color="blue" icon="h-icon-plus" style="margin-left:2%;" @click="select">选择资产</Button>
              <Button v-show="deleteBtn" color="red" icon="h-icon-trash" @click="remove">删除</Button>-->
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
                <TableItem
                  title="管理部门"
                  prop="administrativeDepartmentName"
                  align="left"
                  :width="120"
                ></TableItem>
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
            </Cell>
          </Row>
          <Row :space-y="20">
            <Cell :width="24">
              <Row :space="5">
                <Cell :width="2">
                  <h3 class="blue-color">相关附件</h3>
                </Cell>
                <Cell :width="22">
                  <uploadFile @getUploadId="getUploadId"></uploadFile>
                </Cell>
              </Row>
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
        </div>
        <Loading :loading="loading"></Loading>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="submit">更新</button>
        <button class="h-btn" @click="cancel">取消</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import uploadFile from '../../common/gdzc/upload_file';
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
import UploadModel from 'model/upload/upload';
export default {
  props: ['repairModify', 'dataId', 'currentTime', 'repair', 'userOption'],
  components: {
    uploadFile
  },
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      datas: [],
      readonly: true,
      closeOnMask: false,
      validationRules: {
        required: ['title', 'scrappedTime']
      },
      pagination: {
        page: 1,
        size: 500,
        total: 100
      },
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      UploadAdd: UploadModel.parse({}),
      isLoading: false,
      loading: false,
      deleteBtn: false,
      deleteModal: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      this.assetsRepairList.id = id;
      R.assetsRepair.findOne(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.assetsRepairList = assetsRepairModel.parse(resp.body);
          this.isLoading = true;
          this.assetsRepairList.userId = resp.body.repair;
          R.transferAssets.findAssetsByUser(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
            if (resp.ok) {
              this.datas = resp.body;
              this.isLoading = false;
            } else {
              this.isLoading = false;
            }
          });
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败，请重试');
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.assetsRepair.findOneImg(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
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
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.assetsRepairList.uploadId = this.uploadIds.toString();
        let selectAssetsIds = [];
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          selectAssetsIds.push(this.$refs.table.getSelection()[i].id);
        }
        this.assetsRepairList.ids = selectAssetsIds;
        this.$Loading();
        R.assetsRepair.update(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('更新成功');
              this.assetsRepairList = assetsRepairModel.parse({});
              this.$emit('getData');
            }, 1000);
          } else {
            this.$Message.error('更新失败');
            this.$parent.close();
            this.$Loading.close();
          }
        });
      }
    },
    cancel() {
      this.$parent.close();
    },
    close() {
      this.selectAssets = false;
    },
    // 上傳文件
    onUpload: function (e) {
      this.PurchaseAdd.file = e.target.files[0];
      R.Upload.Upload(PurchaseModel.dispose(this.PurchaseAdd)).then(resp => {
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
