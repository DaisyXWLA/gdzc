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
          <div class="h-panel-bar search" style="border:none;padding-bottom:0">
            <Row>
              <Cell :width="24">
                <label>资产编号：</label>
                <input type="text" v-model="useReturnList.newCode" style="width:24%" />&nbsp;&nbsp;
                <label>资产名称：</label>
                <input type="text" v-model="useReturnList.assetsName" style="width:24%" />&nbsp;&nbsp;
                <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
                <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Cell>
              <Cell align="right">
                <!-- <div style="display:inline-block;">
                  <label class="blue-color">已选择资产</label>
                  <h-switch v-model="test">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                  </h-switch>
                </div>-->
              </Cell>
            </Row>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body assets-list">
            <Table ref="table" :datas="datas" :loading="isLoading" :height="457" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="资产编号" prop="newCode" align="left" :width="100"></TableItem>
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
              <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="150"></TableItem>
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
              <TableItem title="数量" prop="number" align="right" :width="60"></TableItem>
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
              <TableItem title="使用人" prop="username" align="center" :width="80"></TableItem>
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
import useReturnModel from 'model/useReturn/useReturnModel';
export default {
  props: ['value'],
  data() {
    return {
      useReturnList: useReturnModel.parse({}),
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
      if (this.value == 1 && data != 1) {
        this.useReturnList.useDepartment = '';
        this.useReturnList.assetsCategory = data;
        this.getData();
      } else if (this.value == 2) {
        this.useReturnList.assetsCategory = '';
        this.useReturnList.useDepartment = data;
        this.getData();
      } else if (this.value == 1 && data == 1) {
        this.useReturnList.useDepartment = '';
        this.useReturnList.assetsCategory = '';
        this.search();
      } else if (data == undefined) {
        this.useReturnList.useDepartment = '';
        this.useReturnList.assetsCategory = '';
        this.search();
      }
    },
    // 根据筛选条件查询
    search() {
      // this.useReturnList.useDepartment = '';
      // this.useReturnList.assetsCategory = '';
      this.useReturnList.page = this.pagination.page;
      this.useReturnList.size = this.pagination.size;
      this.getData();
    },
    // 重置筛选条件
    reset() {
      this.useReturnList.newCode = '';
      this.useReturnList.assetsName = '';
      // this.useReturnList.useDepartment = '';
      // this.useReturnList.assetsCategory = '';
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.useReturnList.page = this.pagination.page;
      this.useReturnList.size = this.pagination.size;
      R.useReturn.findAllAssets(useReturnModel.dispose(this.useReturnList)).then(resp => {
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
        this.useReturnList.ids = selectData.join(',');
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
