<template>
  <div class="app-home-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <h3 class="blue-color" style="padding-top:0">报修信息</h3>
        <Form ref="form" :labelWidth="120" :top="0.2" mode="twocolumn">
          <FormItem label="标题：">{{ assetsRepairList.title }}</FormItem>
          <FormItem label="预计维修时间：">{{ assetsRepairList.planServiceTime }}</FormItem>
          <FormItem label="维修编号：">{{ assetsRepairList.code }}</FormItem>
          <FormItem label="报修人：">{{ assetsRepairList.repairName }}</FormItem>
          <FormItem label="报修时间：">{{ assetsRepairList.repairTime }}</FormItem>
          <FormItem label="完成时间：">{{ assetsRepairList.completeTime }}</FormItem>
          <FormItem label="故障内容：">{{ assetsRepairList.faultContent }}</FormItem>
          <FormItem label="备注：">{{ assetsRepairList.remarks }}</FormItem>
        </Form>
        <h3 class="blue-color">报修资产</h3>
        <Table ref="table" :datas="datas" :loading="isLoading" :height="244">
          <TableItem title="序号" prop="$serial" align="center" :width="100"></TableItem>
          <TableItem title="资产编号" prop="code" align="left" :width="130"></TableItem>
          <TableItem title="资产名称" prop="assetsName" align="left" :width="440"></TableItem>
          <TableItem title="规格型号" prop="specificationModel" align="left" :width="140"></TableItem>
          <TableItem title="品牌" prop="brand" align="left" :width="140"></TableItem>
          <TableItem title="供应商" prop="supplier" align="left" :width="140"></TableItem>
          <TableItem title="出厂编号" prop="serialNumber" align="left" :width="140"></TableItem>
          <TableItem title="购置日期" prop="acquisitionTime" align="center" :width="80"></TableItem>
          <TableItem title="购置金额" prop="price" align="right" :width="80"></TableItem>
          <TableItem title="资产状态" align="center" :width="140">
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
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
export default {
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      datas: [],
      pagination: {
        page: 1,
        size: 5,
        total: 100
      },
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      download: [],
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
      this.assetsRepairList.id = this.$route.params.id;
      R.assetsRepair.findOne(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.assetsRepairList = assetsRepairModel.parse(resp.body);
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败，请重试');
        }
      });
      this.uploadNames = [];
      this.images = [];
      R.assetsRepair.findOneImg(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
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
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      R.assetsRepair.showUpdateAssets(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        if (resp.ok) {
          // console.log(resp)
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    changePage() {
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      R.assetsRepair.showUpdateAssets(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
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
        this.assetsRepairList.docId = this.uploadIds[index];
        location.href = '../' + this.FILEURL.fileUrl + this.assetsRepairList.docId;
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
