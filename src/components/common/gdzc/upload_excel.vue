<template>
  <div class="upload-excel">
    <el-upload
      class="upload-demo"
      action="gdzc/api/docInfo/uploadAllFile"
      :data="data"
      :auto-upload="true"
      :on-success="uploads"
      :on-error="uploade"
      :on-exceed="handleExceed"
      :show-file-list="false"
      :limit="limit"
      accept=".xls, .xlsx"
    >
      <el-button size="mini">&nbsp;浏览...</el-button>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    fruit: String
  },
  data() {
    return {
      limit: this.FILEURL.limit,
      data: {
        infoId: this.fruit
      }
    };
  },
  methods: {
    uploads(response) {
      this.$emit('getUploadId', response);
    },
    uploade(file) {},
    handleExceed(files, fileList) {
      this.$Message('超出限制文件最大上传量！');
    }
  }
};
</script>
<style lang="less" scoped>
.upload-excel {
  display: inline-block;
}
</style>
