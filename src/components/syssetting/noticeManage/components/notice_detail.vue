<style lang='less' scoped>
</style>

<template>
  <div class="app-form frame-page form-detail-vue">
    <div class="h-panel">
      <div class="h-panel-body">
        <div>
          <h3 class="blue-color" style="padding-top:0">基本信息</h3>
          <Form class="info-basic" :label-width="120" mode="twocolumn" readonly>
            <FormItem label="标题：">{{informFindOneModel.title}}</FormItem>
            <!-- <FormItem label="阅读数：">
                <span>{{informFindOneModel.isRead}}</span>
            </FormItem>-->
            <FormItem label="类型：">
              <div v-if="informFindOneModel.type==0">
                <span class="h-tag h-tag-blue">公告</span>
              </div>
              <div v-else-if="informFindOneModel.type==1">
                <span class="h-tag h-tag-yellow">通知</span>
              </div>
              <div v-else-if="informFindOneModel.type==2">
                <span class="h-tag h-tag-green">动态</span>
              </div>
              <div v-else-if="informFindOneModel.type==3">
                <span class="h-tag h-tag-red">祝福</span>
              </div>
            </FormItem>
            <FormItem label="发布人员：">
              <!-- <span>{{informFindOneModel.readerName}}</span> -->
              <span>{{informFindOneModel.creatorName}}</span>
            </FormItem>
            <!-- <FormItem label="提醒方式：">{{informFindOneModel.showType}}</FormItem> -->
            <FormItem label="发布时间：">
              <span>{{informFindOneModel.createTime}}</span>
            </FormItem>
            <FormItem label="通知公告内容：" single>
              <span v-html="informFindOneModel.content"></span>
            </FormItem>
          </Form>
        </div>
      </div>
      <!-- <div class="h-panel-body">
          <div class="info-title">
            <h3>查看信息</h3>
          </div>
          <div class="h-panel-body">
            <Row :space="20">
              <div v-for="(informReader,i) in datas" :key="i">
                <Cell :width="6">
                  <Avatar :src="src" v-width="200" :imageTop="5">
                    <div style="font-size: 20px;" class="text-ellipsis">{{informReader.readerName}}</div>
                    <p class="dark2-color">{{informReader.readerPosition}}</p>
                    <p class="dark2-color">{{informReader.departmentName}}</p>
                  </Avatar>
                </Cell>
              </div>
            </Row>
          </div>
      </div>-->
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import { write } from 'fs';
import informFindOne from 'model/inform/informUpdate';
import findAllReaderList from 'model/inform/readerList';

export default {
  data() {
    return {
      informFindOneModel: informFindOne.parse({}),
      informReaderListModel: findAllReaderList.parse({}),
      agreeovertime: false,
      refuseovertime: false,
      stripe: false,
      isLoading: false,
      datas: [],
      src: 'https://i1.go2yd.com/image.php?url=0Kvq81cKR1',
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to, from) {
      if (this.$route.params.dataId != null) {
        this.getData();
      }
    }
  },
  methods: {
    init() {
      this.getData();
    },
    black() {
      this.$router.go(-1);
    },
    currentChange(value) {},
    getData() {
      this.loading = true;
      this.informFindOneModel.id = this.$route.params.dataId;
      // R.ProjectInform.informReaderSave(informFindOne.dispose(this.informFindOneModel)).then(resp => {});
      R.ProjectInform.informFindOne(informFindOne.dispose(this.informFindOneModel)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          // this.informFindOneModel.id = resp.body.id;
          // this.informFindOneModel.title = resp.body.title;
          // this.informFindOneModel.readerNumber = resp.body.readerNumber;
          // this.informFindOneModel.type = resp.body.type;
          // this.informFindOneModel.showType = resp.body.showType;
          // this.informFindOneModel.content = resp.body.content;
          // this.informFindOneModel.creatorName = resp.body.creatorName;
          // this.informFindOneModel.createTime = resp.body.createTime;
          this.informFindOneModel = informFindOne.parse(resp.body);
        } else {
          this.loading = false;
        }
      });
      this.informReaderListModel.id = this.$route.params.dataId;
      R.ProjectInform.findAllReaderList(informFindOne.dispose(this.informReaderListModel)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
        }
      });
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
