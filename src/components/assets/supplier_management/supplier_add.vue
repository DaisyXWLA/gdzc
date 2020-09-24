<template>
  <div>
    <header class="h-modal-header modal-title">新增供应商</header>
    <Row>
      <Cell :width="24">
        <Form
          ref="form"
          :label-width="100"
          :top="0.2"
          :model="supplierAdd"
          :rules="validationRules"
          showErrorTip
        >
          <!-- <div class="blue-color" style="padding:20px;">供应商信息</div> -->
          <Row>
            <Cell :width="12">
              <FormItem label="供应商名称" prop="name">
                <input type="text" v-model="supplierAdd.name" v-wordlimit="50"/>
              </FormItem>
            </Cell>
            <Cell :width="12">
              <FormItem label="供应商编号">
                <input type="text" value="自动生成" readonly />
              </FormItem>
            </Cell>
            <Cell :width="12">
              <FormItem label="联系人" prop="peopleName">
                <input type="text" v-model="supplierAdd.peopleName" v-wordlimit="50"/>
              </FormItem>
            </Cell>
            <Cell :width="12">
              <FormItem label="联系电话" prop="phone">
                <NumberInput v-model="supplierAdd.phone"></NumberInput>
              </FormItem>
            </Cell>
            <Cell :width="24">
              <FormItem label="地址" prop>
                <input type="text" v-model="supplierAdd.address" v-wordlimit="50"/>
              </FormItem>
            </Cell>
            <Cell :width="24">
              <FormItem label="备注" prop>
                <input type="text" v-model="supplierAdd.remarks" v-wordlimit="2000"/>
              </FormItem>
            </Cell>
            <Cell :width="24">
              <FormItem label="相关附件" prop>
                <uploadFile @getUploadId="getUploadId"></uploadFile>
              </FormItem>
              <div style="width:100% ;height:110px;padding-left:45px;">
                <div style="width:100% ;height:80px;">
                  <Uploader type="images" data-type="url" :files="images" @deletefile="deletefile"></Uploader>
                </div>
                <div>
                  <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{d}}</span>
                </div>
              </div>
            </Cell>
          </Row>
        </Form>
      </Cell>
    </Row>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="success">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
import supplierModel from 'model/supplier/supplier';
import UploadModel from 'model/upload/upload';
import uploadFile from '../../common/gdzc/upload_file';
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      supplierAdd: supplierModel.parse({}),
      UploadAdd: UploadModel.parse({}),
      month: '',
      test: '',
      datas: [],
      validationRules: {
        required: ['name', 'phone', 'peopleName']
      }
    };
  },
  methods: {
    getMothodFromParent() {
      this.$emit('func');
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
            this.$emit('getData');
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
