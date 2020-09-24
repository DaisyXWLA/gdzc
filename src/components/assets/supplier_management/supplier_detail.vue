<template>
  <div>
    <header class="h-modal-header modal-title">供应商信息</header>
    <Form
      ref="form"
      :label-width="100"
      :top="0.2"
      :model="supplierAdd"
      mode="twocolumn"
      showErrorTip
    >
      <!-- <div class="blue-color" style="padding:20px;">供应商信息</div> -->
      <FormItem label="供应商名称：">{{supplierAdd.name}}</FormItem>
      <FormItem label="供应商编号：">{{supplierAdd.code}}</FormItem>
      <FormItem label="联系人：">{{supplierAdd.peopleName}}</FormItem>
      <FormItem label="联系电话：">{{supplierAdd.phone}}</FormItem>
      <FormItem label="地址：">{{supplierAdd.address}}</FormItem>
      <FormItem label="备注：">{{supplierAdd.remarks}}</FormItem>
    </Form>
    <div class="accessory">
      <h3 class="blue-color">相关附件</h3>
      <div style="width:100% ;height:150px;">
        <div style="width:100% ;height:100px;">
          <ImagePreview :width="90" :borderRadius="4" :datas="images" @click="openPreview" />
        </div>
        <div>
          <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{d}}</span>
        </div>
      </div>
    </div>
    <Loading :loading="loading"></Loading>
    <footer class="h-modal-footer">
      <button class="h-btn" @click="close">关闭</button>
    </footer>
  </div>
</template>

<script>
import supplierModel from 'model/supplier/supplier';
import UploadModel from 'model/upload/upload';
export default {
  props: {
    fruit: String
  },
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
      supplierAdd: supplierModel.parse({}),
      UploadAdd: UploadModel.parse({}),
      month: '',
      test: '',
      datas: [],
      value: this.fruit,
      loading: false
    };
  },
  mounted() {
    this.getModifyData(this.value);
  },
  methods: {
    getMothodFromParent() {
      this.$emit('func');
    },
    getModifyData(data) {
      this.loading = true;
      this.supplierAdd.id = data;
      R.supplier.findOne(supplierModel.dispose(this.supplierAdd)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.supplierAdd = supplierModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败');
        }
      });
      R.supplier.findOneImg(supplierModel.dispose(this.supplierAdd)).then(resp => {
        if (resp.ok) {
          for (let i = 0; i < resp.body.length; i++) {
            this.uploadIds.push(resp.body[i].id);
            this.uploadNames.push(resp.body[i].docName);
            if (resp.body[i].docExt.indexOf('.doc') != -1) {
              this.images.push(this.linkT + 'doc.jpg');
              this.download.push('0');
            } else if (resp.body[i].docExt.indexOf('.xls') != -1) {
              this.images.push(this.linkT + 'xls.jpg');
              this.download.push('0');
            } else {
              this.images.push(this.link + resp.body[i].docSaveName);
              this.download.push('1');
            }
          }
        }
      });
    },
    openPreview(index, data) {
      if (this.download[index] == '0') {
        this.supplierAdd.docId = this.uploadIds[index];
        location.href = '../' + this.FILEURL.fileUrl + this.supplierAdd.docId;
      } else {
        this.$ImagePreview(this.images, index);
      }
    },
    changeDate() {
      this.taskModel.planHours = this.DataIff(this.taskModel.time.start, this.taskModel.time.end, 'hour');
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
        this.$Message.success('上传成功');
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
        this.$Message.error('上传失败');
      }
    },
    // 计算日期差
    DataIff(startTime, endTime, diffType) {
      startTime = startTime.replace(/\-/g, '/');
      endTime = endTime.replace(/\-/g, '/');
      // 将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime); // 开始时间
      var eTime = new Date(endTime); // 结束时间
      // 作为除数的数字
      var divNum = 1;
      switch (diffType) {
        case 'second':
          divNum = 1000;
          break;
        case 'minute':
          divNum = 1000 * 60;
          break;
        case 'hour':
          divNum = 1000 * 3600;
          break;
        case 'day':
          divNum = 1000 * 3600 * 24;
          break;
        default:
          break;
      }
      return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
    },
    success() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.supplierAdd.uploadId = this.uploadIds.toString();
        R.supplier.save(supplierModel.dispose(this.supplierAdd)).then(resp => {
          if (resp.ok) {
            this.$Message.success('保存成功');
            this.close();
          }
        });
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
  margin: 25px 0 15px;
}
.h-form /deep/ .h-form-item {
  padding-bottom: 0;
}
.h-form /deep/ .h-form-item-wrap {
  line-height: 32px;
  color: #515a6e;
}
.h-form /deep/ .h-form-item-label {
  color: #17233d;
}
.accessory {
  padding: 0 15px;
}
.upload-name {
  width: 90px;
}
</style>
