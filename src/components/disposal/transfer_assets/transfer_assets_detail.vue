<template>
  <div class="app-home-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <h3 class="blue-color" style="padding-top:0">移交信息</h3>
        <Form ref="form" :labelWidth="120" :top="0.2" mode="twocolumn">
          <FormItem label="标题：">{{ transferAssetsList.title }}</FormItem>
          <FormItem label="移交时间：">{{ transferAssetsList.applicantTime }}</FormItem>
          <FormItem label="移交编号：">{{ transferAssetsList.code }}</FormItem>
          <FormItem label="原使用人：">{{ transferAssetsList.applicantName }}</FormItem>
          <FormItem label="接收人：">{{ transferAssetsList.receiverName }}</FormItem>
          <FormItem label="接收人部门：">{{ transferAssetsList.receiverDepartmentName }}</FormItem>
          <FormItem label="备注：" single>{{ transferAssetsList.remarks }}</FormItem>
        </Form>
        <h3 class="blue-color">移交资产</h3>
        <Table ref="table" :datas="datas" :loading="isLoading" :height="283">
          <TableItem title="序号" prop="$serial" align="center" :width="50"></TableItem>
          <TableItem title="资产编号" prop="code" align="left" :width="100"></TableItem>
          <TableItem title="财政编号" prop="oldCode" align="left" :width="120"></TableItem>
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
          <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="200"></TableItem>
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
          <TableItem title="数量" prop="number" align="left" :width="60"></TableItem>
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
          <TableItem title="使用人" prop="username" align="left" :width="80"></TableItem>
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
        <Row>
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
                <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{d}}</span>
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
import transferAssetsModel from 'model/transferAssets/transferAssetsModel';
import UploadModel from 'model/upload/upload';
export default {
  data() {
    return {
      transferAssetsList: transferAssetsModel.parse({}),
      datas: [],
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
      this.transferAssetsList.id = this.$route.params.id;
      R.transferAssets.transferAssetsFindOne(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.transferAssetsList = transferAssetsModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败，请重试');
        }
      });
      this.uploadIds = [];
      this.images = [];
      this.uploadNames = [];
      R.transferAssets.transferAssetsFindOneImg(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
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
      this.transferAssetsList.page = this.pagination.page;
      this.transferAssetsList.size = this.pagination.size;
      R.transferAssets.transferAssetsShowUpdateAssets(transferAssetsModel.dispose(this.transferAssetsList)).then(resp => {
        if (resp.ok) {
          // console.log(resp)
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    openPreview(index, data) {
      if (this.download[index] == '0') {
        this.transferAssetsList.docId = this.uploadIds[index];
        location.href = '../' + this.FILEURL.fileUrl + this.transferAssetsList.docId;
      } else {
        this.$ImagePreview(this.images, index);
      }
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
  margin: 15px 0 10px;
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
