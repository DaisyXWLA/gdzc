<template>
  <div>
    <header class="h-modal-header modal-title">分派维修任务</header>
    <div class="h-panel">
      <div>
        <div>
          <div class="h-panel-bar search" style="border:none;">
            <Row>
              <Cell :width="16">
                姓名：
                <input type="text" v-model="assetsRepairList.realName" v-wordlimit="50"/>&nbsp;&nbsp;
                <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
              </Cell>
              <Cell :width="8" align="right">
                <label class="blue-color">故障等级：</label>
                <Select
                  v-model="failureLevel"
                  :datas="failureLevelParams"
                  :autosize="true"
                  @change="change"
                  placeholder="请选择故障等级"
                  style="width:50%;"
                ></Select>&nbsp;&nbsp;
              </Cell>
            </Row>
          </div>
          <div class="h-panel-body">
            <Table ref="table" :datas="datas" :loading="isLoading" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="姓名" prop="userName" align="left" :width="100"></TableItem>
              <TableItem title="部门" prop="department" align="left" :width="150"></TableItem>
              <TableItem title="电话" prop="phone" align="center" :width="150"></TableItem>
              <TableItem title="正在维修单数" prop="number" align="left" :width="100"></TableItem>
            </Table>
            <p v-height="2"></p>
            <div>
              <Pagination
                v-if="pagination.total > 0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>
          </div>
        </div>
        <Loading :loading="loading"></Loading>
      </div>
    </div>

    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="submit">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
import selectAssets from './select_assets/select_assets';
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
export default {
  props: ['assignIds'],
  components: {
    selectAssets
  },
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      test: '',
      datas: [],
      failureLevel: '0',
      failureLevelParams: [
        { title: '一般', key: '0' },
        { title: '重要', key: '1' },
        { title: '紧急', key: '2' }
      ],
      ids: this.assignIds,
      level: '',
      userIds: [],
      selectAssets: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      loading: false
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/assignRepair/)) {
          this.search();
        }
      };
    },
    search() {
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      this.getData();
    },
    // reset() {
    //   this.assetsRepairList.userName = '';
    //   this.assetsRepairList.failureLevel = '';
    // },
    getData() {
      this.loading = true;
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      this.assetsRepairList.ids = this.assignIds;
      R.assetsRepair.findAllUser(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        } else {
          this.loading = false;
          this.$Message.error('获取数据失败，请重试');
        }
      });
    },
    // 获取故障等级
    change(data) {
      // console.log(data.key);
      this.failureLevel = data.key;
    },
    submit() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择分派人员');
      } else {
        this.assetsRepairList.ids = this.ids; // 选择的需要维修的任务
        this.assetsRepairList.failureLevel = this.failureLevel; // 选择的故障等级
        if (this.$refs.table.getSelection().length > 1) {
          this.$Message('只能选择一人分派');
        } else {
          this.assetsRepairList.processingPerson = this.$refs.table.getSelection()[0].id; // 选择的分派人员
          R.assetsRepair.assign(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
            if (resp.ok) {
              this.$Message.success('任务分派成功');
              this.$emit('close');
              this.$emit('getData');
            } else {
              this.$Message.success('任务分派失败');
              this.$emit('close');
            }
          });
        }
      }
    },
    close() {
      this.$emit('close');
    },
    changePage() {
      this.getData();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-body {
  height: inherit !important;
  padding-top: 0;
}
.modal-title{
  margin-bottom: 0;
}
</style>
