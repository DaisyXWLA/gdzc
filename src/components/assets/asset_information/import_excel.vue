<template>
  <div v-width="800">
    <header class="h-modal-header modal-title">导入</header>
    <div style="padding:15px">
      <Form mode="twocolumn" :label-width="120">
        <FormItem label="经费来源" prop>
          <Select v-model="select" :datas="option" style="width:230px;"></Select>
        </FormItem>
        <FormItem label="重复资产处理方式" prop>
          <Radio v-model="value" :datas="param"></Radio>
        </FormItem>
        <FormItem label="选择文件" single>
          <div style="display:inline-block;">
            <uploadExcel ref="upload" @getUploadId="getUploadId"></uploadExcel>
            <span v-if="uploadIds.length==0">未选择文件。</span>
            <!-- <span v-else v-for="(d,i) of uploadNames" :key="i">{{ d }}</span> -->
          </div>
        </FormItem>
      </Form>
      <div :class="uploadIds.length>0?classShow:classHidden">
        <div class="thumbnail">
          <Uploader type="images" data-type="url" :files="images" @deletefile="deletefile"></Uploader>
        </div>
        <div>
          <span v-for="(d,i) of uploadNames" :key="i">{{ d }}</span>
        </div>
      </div>
    </div>
    <footer v-if="msg!=''" class="h-modal-footer">
      <button class="h-btn" @click="close">关闭</button>
    </footer>
    <footer v-else class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="submit">导入</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
    <Modal v-model="importModal" v-width="800">
      <div slot="header" class="title">提示</div>
      <div v-width="800" style="padding:15px">
        <div
          ref="message"
          class="text-hover message"
          v-tooltip="enable"
          theme="white"
          content="点击查看失败数据"
          @click="showList"
        >{{msg}}</div>
        <Table v-show="list" ref="table" :datas="datas" :loading="isLoading" :height="201">
          <TableItem title="序号" prop="$serial" align="center" :width="50"></TableItem>
          <TableItem title="资产编号" prop="newCode" align="left" :width="100"></TableItem>
          <TableItem title="资产名称" align="left" :width="150">
            <template slot-scope="{data}">
              <TextEllipsis
                :text="data.assetsName"
                more="..."
                :height="20"
                useTooltip
                tooltipTheme="white"
              ></TextEllipsis>
            </template>
          </TableItem>
          <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="150"></TableItem>
          <TableItem title="取得方式" prop="acquisitionMethod" align="left" :width="100"></TableItem>
          <TableItem title="取得日期" prop="acquisitionTime" align="left" :width="100"></TableItem>
          <TableItem title="价值（元）" prop="price" align="left" :width="100"></TableItem>
          <TableItem title="价值类型" prop="priceType" align="left" :width="100"></TableItem>
          <TableItem title="财务入账状态" prop="financialType" align="left" :width="100"></TableItem>
          <TableItem title="财务入账日期" prop="financiaTime" align="left" :width="120"></TableItem>
          <TableItem title="会计凭证号" prop="financiaCode" align="left" :width="150"></TableItem>
        </Table>
      </div>
      <div slot="footer">
        <Button @click="modalClose">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import assetsModel from 'model/Assets/Assets';
import UploadModel from 'model/upload/upload';
import uploadExcel from '../../common/gdzc/upload_excel';
export default {
  components: { uploadExcel },
  data() {
    return {
      assetsList: assetsModel.parse({}),
      option: [
        { title: '财政性资金', key: '0' },
        { title: '政法专款', key: '1' }
      ],
      select: '0',
      param: [
        { title: '更新', key: '0' },
        { title: '忽略', key: '1' }
      ],
      value: '0',
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      UploadAdd: UploadModel.parse({}),
      classShow: 'accessory',
      classHidden: 'nonaccessory',
      datas: [],
      msg: '',
      isLoading: false,
      list: false,
      importModal: false,
      enable: true
    };
  },
  mounted() {},
  methods: {
    submit() {
      if (this.uploadIds.length == 0) {
        this.$Message('请选择需要导入的文件');
      } else {
        this.$Loading();
        this.assetsList.id = this.uploadIds.toString();
        this.assetsList.sourceOfFund = this.select;
        this.assetsList.secondParameter = this.value;
        R.Assets.importExcel(assetsModel.dispose(this.assetsList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$Loading.close();
              this.msg = resp.msg;
              this.datas = resp.body;
              this.importModal = true;
              this.$emit('getData');
            }, 1000);
          } else {
            this.$Loading.close();
          }
        });
      }
    },
    modalClose() {
      this.importModal = false;
      // this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
    getUploadId(data) {
      if (data.id.length > 10) {
        this.uploadIds.push(data.id);
        this.uploadNames.push(data.docName);
        if (data.ext.indexOf('.xls') != -1) {
          this.images.push(this.linkT + 'xls.jpg');
        } else if (data.ext.indexOf('.xlsx') != -1) {
          this.images.push(this.linkT + 'xlsx.jpg');
        }
      }
    },
    // 删除附件
    deletefile(file) {
      this.images.splice(file, 1);
      this.UploadAdd.ids = this.uploadIds[file];
      R.Upload.delete(UploadModel.dispose(this.UploadAdd)).then(resp => {});
      this.uploadIds.splice(file, 1);
      this.uploadNames.splice(file, 1);
    },
    showList() {
      if (this.list == false) {
        this.list = true;
      } else {
        this.list = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.file-name {
  display: inline-block;
}
.accessory {
  width: 100%;
  height: 110px;
  padding-left: 60px;
  .thumbnail {
    width: 100%;
    height: 80px;
  }
}
.nonaccessory {
  display: none;
}
.message {
  cursor: pointer;
  color: #3788ee;
}
/deep/ .text-hover {
  &:hover {
    color: #2d7bf4;
  }
}
</style>
