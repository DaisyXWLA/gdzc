<template>
  <div class="app-home-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <h3 class="blue-color" style="display:block;">领用信息</h3>
        <Form ref="form" :labelWidth="120" :top="0.2" mode="twocolumn">
          <FormItem label="标题：">{{ experienceList.title}}</FormItem>
          <FormItem label="经验类别：">{{experienceList.categoryName}}</FormItem>
          <FormItem label="发布人：">{{ experienceList.creatorName }}</FormItem>
          <FormItem label="发布日期：">{{ experienceList.createTime }}</FormItem>
          <FormItem label="问题描述：">{{ experienceList.problemDescription }}</FormItem>
          <FormItem label="解决方案：">{{ experienceList.solution }}</FormItem>
          <FormItem label="备注：" single>{{ experienceList.remarks }}</FormItem>
        </Form>
        <Row :space-y="20">
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
                <span class="preview-name" v-for="(d,i) of uploadNames" :key="i">{{d}}</span>
              </div>
            </div>
          </Cell>
        </Row>
      </div>
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import experienceModel from 'model/repairExperience/repairExperienceModel';
import UploadModel from 'model/upload/upload';
export default {
  data() {
    return {
      experienceList: experienceModel.parse({}),
      datas: [],
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
      UploadAdd: UploadModel.parse({}),
      isLoading: false,
      loading: false
    };
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.id != null) {
        this.getData();
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.experienceList.id = this.$route.params.id;
      R.library.experienceFindOne(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.experienceList = experienceModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败，请重试');
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
        this.experienceList.docId = this.uploadIds[index];
        location.href = '../' + this.FILEURL.fileUrl + this.experienceList.docId;
      } else {
        this.$ImagePreview(this.images, index);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.upload-name {
  width: 90px;
}
.upload-name {
  width: 90px;
}
//详情页面基本信息样式
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

/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 45px);
  overflow: auto;
}
</style>
