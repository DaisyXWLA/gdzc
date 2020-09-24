<template>
  <div>
    <Modal v-model="subContractorRepairAdd" hasDivider :closeOnMask="closeOnMask" :middle="true">
      <div slot="header" class="title">
        新增外委
        <i class="h-icon-close" @click="cancel"></i>
      </div>
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
            <input type="text" v-model="subContractorRepairList.title" v-wordlimit="100" />
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
            <Select
              v-model="subContractorRepairList.isRepair"
              class="select-demo"
              :datas="isRepair"
            ></Select>
          </FormItem>
          <!-- <FormItem label="创建人" prop="creator">
            <input type="text" v-model="creator" readonly />
          </FormItem>
          <FormItem label="创建时间" prop="createTime">
            <input type="text" v-model="currentTime" readonly />
          </FormItem>-->
          <FormItem label="备注" prop="remarks" single>
            <input type="text" v-model="subContractorRepairList.remarks" v-wordlimit="2000" />
          </FormItem>
        </Form>
      </div>
      <Row>
        <Cell :width="24">
          <h3 class="blue-color">外委资产</h3>
          <Button color="blue" icon="h-icon-plus" style="margin-left:2%;" @click="select">选择资产</Button>
          <Button v-show="deleteBtn" color="red" icon="h-icon-trash" @click="remove">删除</Button>
        </Cell>
      </Row>
      <Row>
        <Cell :width="24">
          <Table
            ref="table"
            :datas="datas"
            :loading="isLoading"
            :height="132"
            checkbox
            @select="selectData"
          >
            <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
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
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="submit">保存</button>
        <button class="h-btn" @click="cancel">取消</button>
      </div>
      <selectAssets
        :selectAssets="selectAssets"
        @getData="getData"
        @close="close"
        @selectIds="getSelectIds"
      ></selectAssets>
    </Modal>
    <Modal v-model="deleteModal">
      <div slot="header" class="title">删除</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定删除？
      </div>
      <div slot="footer">
        <Button color="primary" @click="modalConfirm">确定</Button>
        <Button @click="modalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import selectAssets from './select_assets/select_assets';
import uploadFile from '../../common/gdzc/upload_file';
import subContractorRepairModel from 'model/subContractorRepair/subContractorRepairModel';
import UploadModel from 'model/upload/upload';
export default {
  props: ['subContractorRepairAdd', 'currentTime', 'creator'],
  components: {
    selectAssets,
    uploadFile
  },
  data() {
    return {
      subContractorRepairList: subContractorRepairModel.parse({}),
      test: '',
      datas: [],
      selectIds: [],
      isRepair: [
        { title: '否', key: 0 },
        { title: '是', key: 1 }
      ],
      selectAssets: false,
      readonly: true,
      closeOnMask: false,
      validationRules: {
        required: ['title', 'expatriateTime', 'maintenanceAmount', 'isRepair']
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
      deleteBtn: false,
      deleteModal: false
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.subContractorRepairList.page = this.pagination.page;
      this.subContractorRepairList.size = this.pagination.size;
      R.subContractorRepair.showSelectAssets(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        if (resp.ok) {
          // console.log(resp);
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
        this.subContractorRepairList.uploadId = this.uploadIds.toString();
        let selectAssetsIds = [];
        for (let i = 0; i < this.datas.length; i++) {
          selectAssetsIds.push(this.datas[i].id);
        }
        this.subContractorRepairList.ids = selectAssetsIds;
        this.$Loading();
        R.subContractorRepair.save(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('保存成功');
              this.subContractorRepairList = subContractorRepairModel.parse({});
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
        this.deleteModal = true;
      }
    },
    modalConfirm() {
      let ids = [];
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        ids.push(this.$refs.table.getSelection()[i].id);
      }
      this.subContractorRepairList.ids = ids.join(',');
      R.subContractorRepair.clickDelete(subContractorRepairModel.dispose(this.subContractorRepairList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getData();
          }, 200);
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
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
      this.getData();
    },
    // 控制删除按钮
    selectData(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
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
