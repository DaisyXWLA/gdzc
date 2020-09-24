<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            盘点编号：
            <input
              type="text"
              v-model="assetInventoryList.code"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp;
            盘点时间：
            <DatePicker v-model="assetInventoryList.startTime" style="width: 12%;"></DatePicker>&nbsp;&nbsp;
            状态：
            <Select
              v-model="assetInventoryList.status"
              :datas="statusval"
              :autosize="true"
              style="width: 12%;"
            ></Select>&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button
              color="green"
              icon="h-icon-outbox"
              @click="frontEndExportExcel"
            >导出</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" :height="tableHeight" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="盘点编号" align="left" :width="120">
                <template slot-scope="{data}">
                  <a href="#" @click="view(data)">{{ data.code }}</a>
                </template>
              </TableItem>
              <TableItem title="标题" align="left" :width="120">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.title"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="创建人" prop="creatorName" align="left" :width="80"></TableItem>
              <TableItem title="创建时间" prop="createTime" align="left" :width="150"></TableItem>
              <TableItem title="盘点范围" prop="inventoryRangeName" align="left" :width="120"></TableItem>
              <TableItem title="计划盘点时间" align="center" :width="180">
                <template slot-scope="{ data }">
                  <span>{{ data.planStartTime }}-{{ data.planEndTime }}</span>
                </template>
              </TableItem>
              <TableItem title="盘点人" prop="inventoryPeopleName" align="left" :width="80"></TableItem>
              <TableItem title="盘存数/应盘数" align="left" :width="120">
                <template slot-scope="{ data }">
                  <span>{{ data.inventoryNumber }}/{{ data.totalInventory }}</span>
                </template>
              </TableItem>
              <TableItem title="进度" prop="schedule" align="right" :width="80"></TableItem>
              <TableItem title="盘点时间" prop="startTime" align="center" :width="80"></TableItem>
              <TableItem title="状态" align="center" :width="90">
                <template slot-scope="{ data }">
                  <div v-if="data.status == 0">
                    <span class="h-tag h-tag-bg-yellow">待盘点</span>
                  </div>
                  <div v-else-if="data.status == 1">
                    <span class="h-tag h-tag-green">盘点中</span>
                  </div>
                  <div v-else-if="data.status == 2">
                    <span class="h-tag h-tag-green">已盘点</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150" fixed="right">
                <template slot-scope="{data}">
                  <button
                    class="h-btn h-btn-s h-btn-blue"
                    @click="modify(data)"
                    v-has="'myInventorycheck'"
                  >
                    <i class="h-icon-edit"></i>
                    盘点
                  </button>
                </template>
              </TableItem>
            </Table>
            <p v-height="2"></p>
            <div>
              <Pagination
                v-if="pagination.total>0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>
          </div>
        </div>
      </Cell>
    </Row>
    <Modal v-model="startInventory" hasCloseIcon>
      <startInventory
        @close="startInventory=false"
        :inventoryData="inventoryData"
        @getData="getData"
      ></startInventory>
    </Modal>
  </div>
</template>

<script>
import assetInventoryModel from 'model/Assets/AssetInventory';
import startInventory from './start_inventory';
export default {
  components: {
    startInventory // 开始盘点
  },
  data() {
    return {
      assetInventoryList: assetInventoryModel.parse({}),
      statusval: [
        { title: '待盘点', key: '0' },
        { title: '盘点中', key: '1' },
        { title: '已盘点', key: '2' }
      ],
      test: '',
      datas: [],
      startInventory: false,
      inventoryData: '',
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: true,
      tableHeight: 0
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    this.$nextTick(() => {
      document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
    });
    document.addEventListener('scroll', this.winScroll, true);
    document.getElementById('app').style = 'min-width:1366px;overflow:auto';
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/myInventory/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.getData();
    },
    // 重置筛选条件
    reset() {
      this.assetInventoryList = assetInventoryModel.parse({});
    },
    changePage() {
      this.getData();
    },
    close() {
      //   this.addUser = false;
      //   this.updateUser = false;
      //   this.reseteUser = false;
    },
    // 重置密码
    resetPassword(data) {
      //   this.reseteUser = true;
      //   this.$refs.reset.getData(this.datas[this.datas.indexOf(data)].id);
    },
    // 新增数据
    add() {
      this.inventoryAdd = true;
    },
    // 获取所有数据列表
    getData() {
      this.assetInventoryList.userId = 'f588f36ba0635dbcbdbac21cc965b128';
      this.assetInventoryList.page = this.pagination.page;
      this.assetInventoryList.size = this.pagination.size;
      R.Inventory.findAll(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.isLoading = false;
            this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 164;
            this.datas = resp.body;
            this.pagination.page = resp.page;
            this.pagination.size = resp.size;
            this.pagination.total = resp.total;
          }, 500);
        }
      });
    },
    // 编辑数据
    modify(data) {
      this.inventoryData = data;
      this.startInventory = true;
    },
    view(data) {
      this.$router.push({ path: '/inventoryDetail/' + data.id });
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = [
          '盘点编号',
          '标题',
          '创建人',
          '创建时间',
          '盘点范围',
          '计划盘点时间',
          '盘点人',
          '盘存数/应盘数',
          '进度',
          '盘点时间',
          '状态'
        ];
        const filterVal = [
          'code',
          'title',
          'creatorName',
          'createTime',
          'inventoryRangeName',
          'cycleTime',
          'inventoryPeopleName',
          'totalAndNumber',
          'schedule',
          'startTime',
          'statusName'
        ];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '我的盘点表');
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    winScroll() {
      if (document.querySelector('.h-table-body').scrollLeft == 0) {
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      } else {
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
      }
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 30px - 61px);
  overflow: auto;
}
</style>
