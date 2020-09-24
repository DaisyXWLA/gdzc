<template>
  <div>
    <header class="h-modal-header modal-title">归还</header>
    <Form ref="form" :labelWidth="120" :top="0.2" mode="twocolumn">
      <FormItem label="标题" prop="title" single>
        <input type="text" v-model="useReturnList.title" v-wordlimit="100" />
      </FormItem>
      <FormItem label="领用人" prop="user">
        <!-- <Select
          v-model="useReturnList.user"
          class="select-demo"
          :datas="params.userOption"
          :filterable="true"
        ></Select>-->
        <input type="text" v-model="useReturnList.userName" v-wordlimit="100" readonly />
      </FormItem>
      <FormItem label="领用部门" prop="useDepartment">
        <!-- <Select
          v-model="useReturnList.useDepartment"
          class="select-demo"
          :datas="params.departmentOption"
          :filterable="true"
        ></Select>-->
        <input type="text" v-model="useReturnList.useDepartmentName" v-wordlimit="100" readonly />
      </FormItem>
      <FormItem label="预计归还时间" prop="planTime">
        <DatePicker v-model="useReturnList.planTime" disabled></DatePicker>
      </FormItem>
      <FormItem label="领用日期" prop="useTime">
        <DatePicker v-model="params.currentTime" placeholder="领用日期" disabled></DatePicker>
      </FormItem>
      <FormItem label="领用编号" prop="code">
        <input type="text" v-model="useReturnList.code" placeholder="编号自动生成" readonly />
      </FormItem>
      <FormItem label="经手人" prop="manName">
        <input type="text" v-model="useReturnList.manName" v-wordlimit="50" readonly/>
      </FormItem>
      <FormItem label="备注" prop="remarks" single>
        <textarea v-model="useReturnList.remarks" v-wordcount="500"></textarea>
      </FormItem>
    </Form>
    <Row>
      <Cell :width="24">
        <h3 class="blue-color">领用资产</h3>
        <Button color="blue" icon="icon-reply" style="margin-left:2%;" @click="giveBack">归还</Button>
      </Cell>
    </Row>
    <Row>
      <Cell :width="24">
        <Table ref="table" :datas="datas" :loading="isLoading" :height="132" @select="select">
          <TableItem title="序号" prop="$serial" align="center" :width="50"></TableItem>
          <TableItem title="资产编号" prop="code" align="left" :width="100"></TableItem>
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
          <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="150"></TableItem>
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
          <TableItem title="数量" prop="number" align="right" :width="60"></TableItem>
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
          <TableItem title="使用人" prop="username" align="center" :width="80"></TableItem>
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
          <TableItem title="归还状态" align="center" :width="80">
            <template slot-scope="{ data }">
              <span v-if="data.returnStatus=='已归还'" class="green-color">已归还</span>
              <span v-if="data.returnStatus=='未归还'" class="yellow-color">未归还</span>
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
        <h3 class="blue-color">归还信息</h3>
      </Cell>
      <Form
        ref="form"
        :model="useReturnList"
        mode="twocolumn"
        :rules="validationRules"
        showErrorTip
        :labelWidth="120"
      >
        <FormItem label="实际归还时间" prop="returnTime">
          <DatePicker v-model="useReturnList.returnTime"></DatePicker>
        </FormItem>
        <FormItem label="归还经手人" prop="returnMan">
          <input type="text" v-model="useReturnList.returnMan" />
        </FormItem>
      </Form>
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
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="submit">归还</button>
      <button class="h-btn" @click="cancel">取消</button>
    </footer>
    <Modal v-model="returnModal">
      <div slot="header" class="title">归还</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定归还？
      </div>
      <div slot="footer">
        <Button color="primary" @click="modalConfirm">确定</Button>
        <Button @click="modalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import uploadFile from '../../common/gdzc/upload_file';
import useReturnModel from 'model/useReturn/useReturnModel';
import UploadModel from 'model/upload/upload';
export default {
  // props: ['currentTime', 'params'],
  props: {
    currentTime: String,
    params: Object
  },
  components: {
    uploadFile
  },
  data() {
    return {
      useReturnList: useReturnModel.parse({}),
      datas: [],
      returnIds: [],
      pagination: {
        page: 1,
        size: 500,
        total: 500
      },
      validationRules: {
        required: ['returnTime', 'returnMan']
      },
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      UploadAdd: UploadModel.parse({}),
      isLoading: false,
      returnModal: false
    };
  },
  mounted() {
    this.getData(this.params.useReturnId);
  },
  methods: {
    getData(id) {
      this.useReturnList.id = id;
      R.useReturn.useReturnFindOne(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          this.useReturnList = useReturnModel.parse(resp.body);
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.useReturn.useReturnFindOneImg(useReturnModel.dispose(this.useReturnList)).then(resp => {
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
      this.useReturnList.page = this.pagination.page;
      this.useReturnList.size = this.pagination.size;
      this.useReturnList.useTime = this.params.currentTime;
      R.useReturn.showUseReturn(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          // console.log(resp.body);
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    showUseReturn() {
      this.useReturnList.page = this.pagination.page;
      this.useReturnList.size = this.pagination.size;
      R.useReturn.showUseReturn(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.useReturnList.uploadId = this.uploadIds.toString();
        this.useReturnList.id = this.params.useReturnId;
        if (this.datas != undefined) {
          let returnStatus = [];
          let returnStatusStr = '';
          for (let i = 0; i < this.datas.length; i++) {
            this.returnIds.push(this.datas[i].id);
            returnStatus.push(this.datas[i].returnStatus);
          }
          returnStatusStr = returnStatus.join(',');
          if (returnStatusStr.indexOf('未归还') == -1) {
            this.$emit('getData');
            this.$emit('close');
          } else {
            this.useReturnList.ids = this.returnIds.join(',');
            R.useReturn.return(useReturnModel.dispose(this.useReturnList)).then(resp => {
              if (resp.ok) {
                this.$Message.success('资产归还成功');
                this.$emit('getData');
                this.showUseReturn();
                this.$emit('close');
              } else {
                this.$Message.error('资产归还失败');
                this.$emit('close');
              }
            });
          }
        } else {
          this.$Message('没有可以归还的资产');
        }
      }
    },
    giveBack() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.returnModal = true;
      }
    },
    modalConfirm() {
      if (this.datas != undefined) {
        for (let i = 0; i < this.datas.length; i++) {
          this.returnIds.push(this.datas[i].id);
        }
        this.useReturnList.ids = this.returnIds.join(',');
        R.useReturn.return(useReturnModel.dispose(this.useReturnList)).then(resp => {
          if (resp.ok) {
            this.$Message.success('资产归还成功');
            this.$emit('getData');
            this.showUseReturn();
            this.returnModal = false;
          } else {
            this.$Message.error('资产归还失败');
            this.returnModal = false;
          }
        });
      } else {
        this.$Message('没有可以归还的资产');
      }
    },
    modalClose() {
      this.returnModal = false;
    },
    select(data) {
      // console.log(data);
    },
    cancel() {
      this.$emit('close');
    },
    changePage() {
      this.useReturnList.id = this.params.dataId;
      this.showUseReturn();
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
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
