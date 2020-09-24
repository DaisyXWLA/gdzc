<template>
  <div>
    <header class="h-modal-header">资料信息</header>
    <div class="h-panel">
      <div class="h-panel-bar">
        <div style="display:inline-block;margin-right:5px">
          <uploadFile @getUploadId="getUploadId" :fruit="infoId"></uploadFile>
        </div>
        <Button
          v-show="deleteBtn"
          class="h-btn h-btn-s h-btn-red"
          icon="h-icon-trash"
          @click="remove"
          v-has="'assetDatadelete'"
        >删除</Button>
      </div>
      <div class="h-panel-body">
        <Table ref="table" :datas="datas" checkbox @select="select">
          <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
          <TableItem title="资料名称" prop="docNameT" align="left"></TableItem>
          <TableItem title="文件拓展名" prop="docExt" align="left" :width="90"></TableItem>
          <TableItem title="文件大小" align="right" :width="80">
            <template slot-scope="{ data }">
              <span>{{(data.docSize/1048576).toFixed(1)}}M</span>
            </template>
          </TableItem>
          <TableItem title="上传时间" prop="createTime" align="center" :width="130"></TableItem>
          <TableItem title="上传者" prop="creator" align="left" :width="90"></TableItem>
          <TableItem title="操作" align="center" :width="140">
            <template slot-scope="{ data }">
              <button class="h-btn h-btn-s h-btn-blue" @click="download(data)">
                <i class="h-icon-inbox"></i>
                下载
              </button>
              <button class="h-btn h-btn-s h-btn-red" @click="del(data)" v-has="'assetDatadelete'">
                <i class="h-icon-trash"></i>&nbsp;删除
              </button>
            </template>
          </TableItem>
          <div slot="empty">暂时无数据</div>
        </Table>
      </div>
    </div>
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
import uploadFile from '../../common/gdzc/upload_file';
import uploadModel from 'model/upload/upload';
import { mapGetters } from 'vuex';
export default {
  props: {
    fruit: String
  },
  components: {
    uploadFile
  },
  data() {
    return {
      uploadList: uploadModel.parse({}),
      deleteBtn: false,
      datas: [],
      infoId: this.fruit,
      retirementAdd: false,
      deleteModal: false,
      oneData: {}
    };
  },
  computed: {
    ...mapGetters({
      test: 'getTest'
    })
  },
  mounted() {
    this.getData();
  },
  methods: {
    success() {
      this.$emit('success', this.value);
      this.close();
    },
    getData() {
      this.uploadList.id = this.infoId;
      R.Purchase.PurchaseFindOneImg(uploadModel.dispose(this.uploadList)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
        }
      });
    },
    // 控制删除按钮
    select(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
    },
    getUploadId(data) {
      if (data.id.length > 10) {
        this.getData();
      } else {
        this.$Message.error('上传失败');
      }
    },
    download(data) {
      location.href = this.FILEURL.fileUrl + data.id;
    },
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        this.deleteModal = true;
        // let ids = [];
        // this.$Confirm('确定删除？', '删除')
        //   .then(() => {
        //     for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        //       ids.push(this.$refs.table.getSelection()[i].id);
        //     }
        //     this.uploadList.ids = ids.join(',');
        //     R.Upload.delete(uploadModel.dispose(this.uploadList)).then(resp => {
        //       this.$Message.success('刪除成功');
        //       this.getData();
        //     });
        //   })
        //   .catch(() => {});
      }
    },
    del(data) {
      this.oneData = data;
      this.deleteModal = true;
      // let ids = [];
      // this.$Confirm('确定删除？', '删除')
      //   .then(() => {
      //     ids.push(data.id);
      //     this.uploadList.ids = ids.join(',');
      //     R.Upload.delete(uploadModel.dispose(this.uploadList)).then(resp => {
      //       this.$Message.success('刪除成功');
      //       this.getData();
      //     });
      //   })
      //   .catch(() => {});
    },
    modalConfirm() {
      let ids = [];
      if (this.$refs.table.getSelection().length > 0) {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          ids.push(this.$refs.table.getSelection()[i].id);
        }
      } else {
        ids.push(this.oneData.id);
      }
      this.uploadList.ids = ids.join(',');
      R.Upload.delete(uploadModel.dispose(this.uploadList)).then(resp => {
        this.$Message.success('刪除成功');
        this.deleteModal = false;
        this.getData();
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-button--mini {
  border-radius: 4px;
  padding-bottom: 4px;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
