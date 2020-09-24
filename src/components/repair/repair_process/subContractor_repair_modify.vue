<template>
  <div>
    <Modal v-model="subContractorRepairModify" hasDivider :closeOnMask="closeOnMask" :middle="true">
      <div slot="header" class="title">
        外委
        <i class="h-icon-close" @click="cancel"></i>
      </div>
      <div>
        <div>
          <div>
            <Form
              ref="form"
              :model="subContractorRepairList"
              :label-width="120"
              :top="0.2"
              :rules="validationRules"
              showErrorTip
              mode="twocolumn"
            >
              <FormItem label="标题" prop="title" single>
                <input type="text" v-model="subContractorRepairList.title" v-wordlimit="100"/>
              </FormItem>
              <FormItem label="外委维修时间" prop="expatriateTime">
                <DatePicker v-model="subContractorRepairList.expatriateTime"></DatePicker>
              </FormItem>
              <FormItem label="外委编号" prop="code">
                <input
                  type="text"
                  v-model="subContractorRepairList.code"
                  placeholder="系统自动生成"
                  readonly
                  disabled
                />
              </FormItem>
              <FormItem label="维修金额" prop="maintenanceAmount">
                <NumberInput v-model="subContractorRepairList.maintenanceAmount" :precision="2"></NumberInput>
              </FormItem>
              <FormItem label="是否报修过" prop="isRepair">
                <Select v-model="selectIsRepair" :datas="isRepair" disabled></Select>
              </FormItem>
              <FormItem label="创建人" prop="creator">
                <input type="text" v-model="creator" readonly />
              </FormItem>
              <FormItem label="创建时间" prop="createTime">
                <input type="text" v-model="currentTime" readonly />
              </FormItem>
              <FormItem label="备注" prop="remarks" single>
                <textarea v-model="subContractorRepairList.remarks" style="max-height:60px;"></textarea>
              </FormItem>
            </Form>
          </div>
          <Row>
            <Cell :width="24">
              <h3 class="blue-color">外委资产</h3>
              <!-- <Button color="blue" icon="h-icon-plus" style="margin-left:2%;" @click="select">选择资产</Button> -->
              <!-- <Button color="red" icon="h-icon-close" @click="remove">删除</Button> -->
            </Cell>
          </Row>
          <Row>
            <Cell :width="24">
              <Table ref="table" :datas="datas" :loading="isLoading" :height="132">
                <TableItem title="序号" prop="$serial" :width="50" align="center"></TableItem>
                <TableItem title="资产编号" prop="code" :width="100" align="left"></TableItem>
                <TableItem title="资产名称" prop="assetsName" :width="150" align="left"></TableItem>
                <TableItem title="规格型号" prop="specificationModel" :width="100" align="left"></TableItem>
                <TableItem title="品牌" prop="brand" align="left" :width="100"></TableItem>
                <!-- <TableItem title="单位" prop="unit" align="left" :width="50"></TableItem> -->
                <TableItem title="供应商" prop="supplier" align="left" :width="100"></TableItem>
                <TableItem title="出厂编号" prop="serialNumber" align="left" :width="120"></TableItem>
                <TableItem title="购置日期" prop="acquisitionTime" align="center" :width="80"></TableItem>
                <TableItem title="购置金额" prop="price" align="right" :width="70"></TableItem>
                <TableItem title="资产状态" align="center" :width="60">
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
              <!-- <div>
            <Pagination
              v-if="pagination.total > 0"
              align="right"
              v-model="pagination"
              @change="changePage"
            />
              </div>-->
            </Cell>
          </Row>
          <Row>
            <Cell :width="24">
              <Row :space="5">
                <Cell :width="2">
                  <h3 class="blue-color">相关附件</h3>
                </Cell>
              </Row>
            </Cell>
            <Cell :width="24">
              <div style="width:100% ;height:150px;">
                <div style="width:100% ;height:100px;">
                  <ImagePreview :width="90" :borderRadius="4" :datas="images" @click="openPreview" />
                </div>
                <div>
                  <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{d}}</span>
                </div>
              </div>
            </Cell>
          </Row>
        </div>
        <Loading :loading="loading"></Loading>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="submit">保存</button>
        <button class="h-btn" @click="cancel">取消</button>
      </div>
      <selectAssets
        :selectAssets="selectAssets"
        @getData="showUpdateAssets"
        @close="close"
        @selectIds="getSelectIds"
      ></selectAssets>
    </Modal>
  </div>
</template>

<script>
import selectAssets from './select_assets/select_assets';
import uploadFile from '../../common/gdzc/upload_file';
import subContractorRepairModel from 'model/subContractorRepair/subContractorRepairModel';
import UploadModel from 'model/upload/upload';
export default {
  props: ['subContractorRepairModify', 'currentTime', 'creator'],
  components: {
    selectAssets,
    uploadFile
  },
  data() {
    return {
      subContractorRepairList: subContractorRepairModel.parse({}),
      test: '',
      selectIsRepair: '1',
      datas: [],
      selectIds: [],
      isRepair: [
        { title: '否', key: '0' },
        { title: '是', key: '1' }
      ],
      selectAssets: false,
      readonly: true,
      closeOnMask: false,
      validationRules: {
        required: ['title', 'expatriateTime', 'maintenanceAmount']
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
      download: [],
      isLoading: false,
      loading: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      this.subContractorRepairList.id = id;
      R.assetsRepair.findOne(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          if (resp.body.distributionStatus == '待分派') {
            this.selectIsRepair = '0';
          }
          this.subContractorRepairList = subContractorRepairModel.parse(resp.body);
          this.subContractorRepairList.code = '';
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败，请重试');
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.subContractorRepair.findOneImg(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
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
      this.subContractorRepairList.page = this.pagination.page;
      this.subContractorRepairList.size = this.pagination.size;
      R.assetsRepair.showUpdateAssets(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        if (resp.ok) {
          // console.log(resp)
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    showUpdateAssets() {
      this.subContractorRepairList.page = this.pagination.page;
      this.subContractorRepairList.size = this.pagination.size;
      R.assetsRepair.showUpdateAssets(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        if (resp.ok) {
          // console.log(resp)
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    // 选择资产
    select() {
      this.selectAssets = true;
    },
    // 获取选中资产数据id
    getSelectIds(data) {
      this.selectIds = data;
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.subContractorRepairList.isRepair = this.selectIsRepair;
        this.subContractorRepairList.uploadId = this.uploadIds.toString();
        for (let i = 0; i < this.datas.length; i++) {
          this.selectIds.push(this.datas[i].id);
        }
        this.subContractorRepairList.ids = this.selectIds;
        this.$Loading();
        R.subContractorRepair.saveRepairToExpatriate(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('外委成功');
              this.subContractorRepairList = subContractorRepairModel.parse({});
              // this.subContractorRepairList.page = this.pagination.page;
              // this.subContractorRepairList.size = this.pagination.size;
              // R.subContractorRepair.findAll(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
              //   if (resp.ok) {
              //     this.datas = resp.body;
              //     this.pagination.page = resp.page;
              //     this.pagination.size = resp.size;
              //     this.pagination.total = resp.total;
              //   }
              // });
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
    // 删除数据（可批量删除）
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        let ids = [];
        this.$Confirm('确定删除？', '删除')
          .then(() => {
            for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
              ids.push(this.$refs.table.getSelection()[i].id);
            }
            this.subContractorRepairList.ids = ids.join(',');
            R.subContractorRepair.clickDelete(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
              if (resp.ok) {
                this.$Message.success('数据刪除成功');
                setTimeout(() => {
                  this.showUpdateAssets();
                }, 2000);
              }
            });
          })
          .catch(() => {
            this.$parent.close();
          });
      }
    },
    cancel() {
      R.subContractorRepair.clickClose(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        this.$emit('getData');
        this.$parent.close();
      });
    },
    close() {
      this.selectAssets = false;
    },
    changePage() {
      this.showUpdateAssets();
    },
    openPreview(index, data) {
      if (this.download[index] == '0') {
        this.assetsRepairList.docId = this.uploadIds[index];
        location.href = '../' + this.FILEURL.fileUrl + this.assetsRepairList.docId;
      } else {
        this.$ImagePreview(this.images, index);
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
</style>
