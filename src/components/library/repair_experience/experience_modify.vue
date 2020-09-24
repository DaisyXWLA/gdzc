<template>
  <div>
    <header class="h-modal-header modal-title">编辑维修经验</header>
    <!-- <div class="h-panel">
    <div class="h-panel-body">-->
    <div>
      <div>
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
                <input type="text" v-model="experienceList.title" />
              </FormItem>
              <FormItem label="经验类别" prop="category">
                <Select v-model="experienceList.category" class="select-demo" :datas="option"></Select>
              </FormItem>
              <FormItem label="发布人" prop="creator">
                <!-- <input type="text" v-model="experienceList.creatorName" readonly /> -->
                <Select v-model="experienceList.creator" :datas="userOption" :filterable="true"></Select>
              </FormItem>
              <FormItem label="发布日期" prop="createTime">
                <input type="text" v-model="experienceList.createTime" readonly />
              </FormItem>
              <FormItem label="问题描述" prop="problemDescription" single>
                <input type="text" v-model="experienceList.problemDescription" />
              </FormItem>
              <FormItem label="解决方案" prop="solution" single>
                <input type="text" v-model="experienceList.solution" />
              </FormItem>
              <FormItem label="备注" prop="remarks" single>
                <textarea v-model="experienceList.remarks" style="max-height:60px;"></textarea>
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
      </div>
      <Loading :loading="loading"></Loading>
    </div>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="submit">更新</button>
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
  props: {
    option: Array,
    fruit: String,
    creator: String,
    currentTime: String,
    userOption: Array
  },
  components: {
    uploadFile
  },
  data() {
    return {
      experienceList: experienceModel.parse({}),
      datas: [],
      experienceId: this.fruit,
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
      },
      loading: false
    };
  },
  mounted() {
    this.getData(this.experienceId);
  },
  methods: {
    getData(id) {
      this.loading = true;
      this.experienceList.id = id;
      R.library.experienceFindOne(experienceModel.dispose(this.experienceList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.loading = false;
          this.experienceList.id = resp.body.id;
          this.experienceList.title = resp.body.title;
          this.experienceList.category = resp.body.category;
          this.experienceList.creator = resp.body.creator;
          this.experienceList.createTime = resp.body.createTime;
          this.experienceList.problemDescription = resp.body.problemDescription;
          this.experienceList.solution = resp.body.solution;
          this.experienceList.remarks = resp.body.remarks;
        } else {
          this.loading = false;
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.library.experienceFindOneImg(experienceModel.dispose(this.experienceList)).then(resp => {
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
        this.experienceList.uploadId = this.uploadIds.toString();
        this.$Loading();
        // this.experienceList.creator = this.creator;
        // this.experienceList.createTime = this.currentTime;
        R.library.experienceModify(experienceModel.dispose(this.experienceList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$emit('close');
              this.$Loading.close();
              this.$Message.success('更新成功');
              this.experienceList = experienceModel.parse({});
              this.$emit('getData');
            }, 1000);
          } else {
            this.$Message.error('更新失败');
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
