<style lang="less">
/deep/ .h-panel-body {
  min-height: 60vh;
}
</style>

<template>
  <div>
    <Row>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search" style="border:none;">
            <label>资产编号：</label>
            <input type="text" v-model="assetsRepairList.newCode" />&nbsp;&nbsp;
            <label>资产名称：</label>
            <input type="text" v-model="assetsRepairList.assetsName" />&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <div style="display:inline-block;">
              <label class="blue-color">已选择资产</label>
              <h-switch v-model="test">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
              </h-switch>
            </div> -->
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body assets-list">
            <Table ref="table" :datas="datas" :loading="isLoading" :height="498" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="资产编号" prop="newCode" align="left" :width="100"></TableItem>
              <TableItem title="财政编号" prop="oldCode" align="left" :width="120"></TableItem>
              <TableItem title="资产名称" prop="assetsName" align="left" :width="150"></TableItem>
              <TableItem title="使用部门" prop="useDepartmentName" align="left" :width="100"></TableItem>
              <TableItem title="管理部门" prop="administrativeDepartmentName" align="left" :width="100"></TableItem>
              <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="100"></TableItem>
              <TableItem title="数量" prop="number" align="right" :width="60"></TableItem>
              <TableItem title="使用人" prop="username" align="left" :width="80"></TableItem>
              <TableItem title="状态" align="center" :width="80">
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
              <div slot="empty">暂时无数据</div>
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
      </Cell>
    </Row>
  </div>
</template>

<script>
import Bus from '../../../../js/common/bus';
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
export default {
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      datas: [],
      test: '',
      selectIds: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false
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
        if (e.keyCode === 13 && e.target.baseURI.match(/assetInformation/)) {
          this.search();
        }
      };
    },
    searchUseCategory(data) {
      if (this.value == 1) {
        this.assetsRepairList.useDepartment = '';
        this.assetsRepairList.newCode = data;
      } else if (this.value == 2) {
        this.assetsRepairList.newCode = '';
        this.assetsRepairList.useDepartment = data;
      }
      this.getData();
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.assetsRepairList.newCode = '';
      this.assetsRepairList.assetsName = '';
    },
    // 获取所有数据列表
    getData() {
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      R.assetsRepair.findAllAssets(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    changePage() {
      this.getData();
    },
    selectData() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择资产');
      } else {
        let selectData = [];
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          selectData.push(this.$refs.table.getSelection()[i].id);
        }
        this.assetsRepairList.ids = selectData.join(',');
      }
    },
    select() {
      this.selectIds = [];
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        this.selectIds.push(this.$refs.table.getSelection()[i].id);
      }
      return this.selectIds;
    }
  }
};
</script>
