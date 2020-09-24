<style lang="less" scoped>
/deep/ .h-panel-body {
  min-height: 63vh;
}
</style>

<template>
  <div>
    <Row>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search" style="border:none;">
            <label>资产名称：</label>
            <input type="text" v-model="assetsRepairList.assetsName" style="width:16%;" />
            &nbsp;&nbsp;
            <label>使用人：</label>
            <Select
              v-model="assetsRepairList.useId"
              :datas="userOption"
              :autosize="true"
              style="width:17%;"
            ></Select>&nbsp;&nbsp;
            <label>存放地点：</label>
            <input type="text" v-model="assetsRepairList.storageLocation" style="width:16%;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body assets-list">
            <Table ref="table" :datas="datas" :loading="isLoading" :height="457" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="资产编号" prop="newCode" align="left" :width="130"></TableItem>
              <TableItem title="财政编号" prop="oldCode" align="left" :width="130"></TableItem>
              <TableItem title="资产名称" align="left" :width="95">
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
              <TableItem title="使用部门" prop="useDepartment" :width="75" align="left"></TableItem>
              <TableItem title="管理部门" prop="manageDepartment" :width="75" align="left"></TableItem>
              <TableItem title="资产分类" :width="95" align="left">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.assetsCategoryName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="数量" prop="number" align="right" :width="40"></TableItem>
              <TableItem title="存放地点" align="left" :width="100">
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
              <TableItem title="使用人" prop="useId" align="left" :width="60"></TableItem>
              <TableItem title="状态" align="center" :width="60">
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
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>

<script>
import assetsRepairModel from 'model/assetsRepair/assetsRepairModel';
export default {
  props: ['IsSelect'],
  data() {
    return {
      assetsRepairList: assetsRepairModel.parse({}),
      datas: [],
      test: 'close',
      selectIds: [],
      userOption: [],
      pagination: {
        page: 1,
        size: 500,
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
    R.pullDownList.user(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
      if (resp.ok) {
        this.userOption = resp.body;
      }
    });
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
      if (this.IsSelect == 1 && data != 1) {
        this.assetsRepairList.useDepartment = '';
        this.assetsRepairList.assetsCategory = data;
        this.getData();
      } else if (this.IsSelect == 2) {
        this.assetsRepairList.assetsCategory = '';
        this.assetsRepairList.useDepartment = data;
        this.getData();
      } else if (this.IsSelect == 1 && data == 1) {
        this.assetsRepairList.useDepartment = '';
        this.assetsRepairList.assetsCategory = '';
        this.search();
      }
    },
    // 根据筛选条件查询
    search() {
      if (this.IsSelect == 1) {
        this.assetsRepairList.assetsCategory = '';
        this.assetsRepairList.useDepartment = '';
      } else if (this.IsSelect == 2) {
        this.assetsRepairList.useDepartment = '';
        this.assetsRepairList.assetsCategory = '';
      }
      this.getData();
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.assetsRepairList.assetsName = '';
      this.assetsRepairList.useId = '';
      this.assetsRepairList.storageLocation = '';
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.assetsRepairList.page = this.pagination.page;
      this.assetsRepairList.size = this.pagination.size;
      R.assetsRepair.findAllAssets(assetsRepairModel.dispose(this.assetsRepairList)).then(resp => {
        if (resp.ok) {
          this.isLoading = false;
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
    },
    openData(data) {}
  }
};
</script>
