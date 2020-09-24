<template>
  <div>
    <header class="h-modal-header modal-title">新增维修经验</header>
    <!-- <div class="h-panel">
    <div class="h-panel-body">-->
    <Row>
      <Cell :width="24">
        <Form
          ref="form"
          :model="experienceList"
          :label-width="100"
          :top="0.2"
          :rules="validationRules"
          showErrorTip
          mode="twocolumn"
        >
          <FormItem label="标题" prop="title">
            <input type="text" v-model="experienceList.title" v-wordlimit="100"/>
          </FormItem>
          <FormItem label="经验类别" prop="category">
            <Select
              v-model="experienceList.category"
              class="select-demo"
              :datas="option"
              :filterable="true"
            ></Select>
          </FormItem>
          <FormItem label="发布人" prop="creator">
            <!-- <input type="text" v-model="creator" readonly /> -->
            <Select v-model="experienceList.creator" :datas="userOption" :filterable="true"></Select>
          </FormItem>
          <FormItem label="发布日期" prop="createTime">
            <DatePicker v-model="currentTime"></DatePicker>
          </FormItem>
          <FormItem label="问题描述" prop="problemDescription" single>
            <input type="text" v-model="experienceList.problemDescription" v-wordlimit="500"/>
          </FormItem>
          <FormItem label="解决方案" prop="solution" single>
            <input type="text" v-model="experienceList.solution" v-wordlimit="500"/>
          </FormItem>
          <FormItem label="备注" prop="remarks" single>
            <textarea v-model="experienceList.remarks" style="max-height:60px;" maxlength="2000"></textarea>
          </FormItem>
        </Form>
      </Cell>
    </Row>
    <Row :space-y="20">
      <Cell :width="24">
        <Row :space="5">
          <Cell :width="3">
            <h3 class="blue-color">相关附件</h3>
          </Cell>
          <Cell :width="21">
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
            <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{d}}</span>
          </div>
        </div>
      </Cell>
    </Row>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="submit">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import uploadFile from '../../common/gdzc/upload_file';
import experienceModel from 'model/repairExperience/repairExperienceModel';
import UploadModel from 'model/upload/upload';
export default {
  props: ['option', 'creator', 'currentTime', 'userOption'],
  components: {
    uploadFile
  },
  data() {
    return {
      experienceList: experienceModel.parse({}),
      datas: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      UploadAdd: UploadModel.parse({}),
      isLoading: false,
      validationRules: {
        required: ['title', 'category', 'problemDescription', 'solution']
      }
    };
  },
  mounted() {
    this.experienceList.creator = Utils.getLocal('userId');
  },
  methods: {
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.experienceList.uploadId = this.uploadIds.toString();
        this.$Loading();
        // this.experienceList.creator = this.creator;
        this.experienceList.createTime = this.currentTime;
        R.library.experienceAdd(experienceModel.dispose(this.experienceList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$emit('close');
              this.$Loading.close();
              this.$Message.success('保存成功');
              this.experienceList = experienceModel.parse({});
              this.$emit('getData');
            }, 1000);
          } else {
            this.$Message.error('保存失败');
            this.$emit('close');
            this.$Loading.close();
          }
        });
      }
    },
    close() {
      this.$emit('close');
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
        this.$Message.success('上传成功');
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
        this.$Message.error('上传失败');
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
</style>
