<template>
  <div>
    <Modal v-model="useModify" hasDivider :closeOnMask="closeOnMask" :middle="true">
      <div slot="header" class="title">
        编辑领用
        <i class="h-icon-close" @click="cancel"></i>
      </div>
      <div>
        <div>
          <div>
            <Form
              ref="form"
              :model="useReturnList"
              :label-width="120"
              :top="0.2"
              :rules="validationRules"
              showErrorTip
              mode="twocolumn"
            >
              <FormItem label="标题" prop="title" single>
                <input type="text" v-model="useReturnList.title" v-wordlimit="100" />
              </FormItem>
              <FormItem label="领用人" prop="user">
                <Select
                  v-model="useReturnList.user"
                  class="select-demo"
                  :datas="userOption"
                  :filterable="true"
                  @change="selectUser"
                ></Select>
              </FormItem>
              <FormItem label="领用部门" prop="useDepartmentName">
                <input type="text" v-model="useReturnList.useDepartmentName" readonly />
              </FormItem>
              <FormItem label="预计归还时间" prop="planTime">
                <DatePicker v-model="useReturnList.planTime"></DatePicker>
              </FormItem>
              <FormItem label="领用日期" prop="useTime">
                <DatePicker v-model="useReturnList.useTime" placeholder="领用日期"></DatePicker>
              </FormItem>
              <FormItem label="领用编号" prop="code">
                <input
                  type="text"
                  v-model="useReturnList.code"
                  placeholder="编号自动生成"
                  readonly
                  disabled
                />
              </FormItem>
              <FormItem label="经手人" prop="man">
                <Select
                  v-model="useReturnList.man"
                  class="select-demo"
                  :datas="userOption"
                  :filterable="true"
                ></Select>
              </FormItem>
              <FormItem label="备注" prop="remarks" single>
                <input type="text" v-model="useReturnList.remarks" v-wordlimit="2000" />
              </FormItem>
            </Form>
          </div>
          <Row>
            <Cell :width="24">
              <h3 class="blue-color">领用资产</h3>
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
                @select="selectData"
                checkbox
              >
                <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
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
                <TableItem
                  title="管理部门"
                  prop="administrativeDepartmentName"
                  align="left"
                  :width="120"
                ></TableItem>
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
              </Table>
              <p v-height="2"></p>
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
        </div>
        <Loading :loading="loading"></Loading>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="submit">更新</button>
        <button class="h-btn" @click="cancel">取消</button>
      </div>
      <selectAssets
        :selectAssets="selectAssets"
        @getData="getShowUpdateData"
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
import useReturnModel from 'model/useReturn/useReturnModel';
import UploadModel from 'model/upload/upload';
export default {
  props: ['useModify', 'dataId', 'currentTime', 'departmentOption', 'userOption'],
  components: {
    selectAssets,
    uploadFile
  },
  data() {
    return {
      useReturnList: useReturnModel.parse({}),
      test: '',
      datas: [],
      selectIds: [],
      selectAssets: false,
      readonly: true,
      closeOnMask: false,
      validationRules: {
        required: ['title', 'user', 'planTime', 'man']
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
      loading: false,
      deleteBtn: false,
      deleteModal: false,
      useDepartmentId: ''
    };
  },
  created() {},
  mounted() {},
  methods: {
    getData(id) {
      this.loading = true;
      this.useReturnList.id = id;
      R.useReturn.useReturnFindOne(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.useReturnList = useReturnModel.parse(resp.body);
          this.useDepartmentId = useDepartment;
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败，请重试');
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
      R.useReturn.showUpdateAssets(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          // console.log(resp)
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    getShowUpdateData() {
      this.useReturnList.page = this.pagination.page;
      this.useReturnList.size = this.pagination.size;
      R.useReturn.showUpdateAssets(useReturnModel.dispose(this.useReturnList)).then(resp => {
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
    // //获取选中资产数据id
    getSelectIds(data) {
      this.selectIds = data;
    },
    // 选择领用人
    selectUser(data) {
      this.useReturnList.userId = data.key;
      R.pullDownList.findDepartmentNameByUser(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          this.useReturnList.useDepartmentName = resp.body.title;
          this.useDepartmentId = resp.body.key;
        }
      });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        let selectAssetsIds = [];
        this.useReturnList.uploadId = this.uploadIds.toString();
        for (let i = 0; i < this.datas.length; i++) {
          selectAssetsIds.push(this.datas[i].id);
        }
        this.useReturnList.ids = selectAssetsIds;
        this.useReturnList.useDepartment = this.useDepartmentId;
        // console.log(this.datas)
        this.$Loading();
        R.useReturn.useReturnModify(useReturnModel.dispose(this.useReturnList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$parent.close();
              this.$Loading.close();
              this.$Message.success('更新成功');
              this.useReturnList = useReturnModel.parse({});
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
      this.useReturnList.ids = ids.join(',');
      R.useReturn.selectAssetsDelete(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getShowUpdateData();
          }, 200);
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    // 控制删除按钮
    selectData(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
    },
    cancel() {
      R.useReturn.selectAssetsCancel(useReturnModel.dispose(this.useReturnList)).then(resp => {
        this.$emit('getFindAllData');
        this.$parent.close();
      });
    },
    close() {
      this.selectAssets = false;
    },
    changePage() {
      this.useReturnList.id = this.dataId;
      this.getShowUpdateData();
    },
    // 上傳文件
    onUpload: function (e) {
      this.useReturnList.file = e.target.files[0];
      R.Upload.Upload(useReturnModel.dispose(this.useReturnList)).then(resp => {
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
