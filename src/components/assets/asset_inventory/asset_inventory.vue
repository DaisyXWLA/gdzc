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
            盘点人：
            <input
              type="text"
              v-model="assetInventoryList.inventoryPeople"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp;
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
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'assetInventoryadd'">新增</Button>
            <Button
              color="green"
              icon="h-icon-outbox"
              @click="frontEndExportExcel"
            >导出</Button>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'assetInventorydelete'"
            >删除</Button>
            <div style="margin-top: 10px"></div>
            <Table
              ref="table"
              :datas="datas"
              :loading="isLoading"
              :height="tableHeight"
              @select="select"
              checkbox
            >
              <TableItem title="序号" prop="$serial" align="center" :width="40"></TableItem>
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
              <TableItem title="盘点人" prop="inventoryPeopleName" align="left" :width="80"></TableItem>
              <TableItem title="创建时间" prop="createTime" align="center" :width="150"></TableItem>
              <TableItem title="盘点范围" prop="inventoryRangeName" align="left" :width="120"></TableItem>
              <TableItem title="计划盘点时间" align="center" :width="180">
                <template slot-scope="{ data }">
                  <span>{{ data.planStartTime }} 至 {{ data.planEndTime }}</span>
                </template>
              </TableItem>
              <TableItem title="创建人" prop="creatorName" align="left" :width="80"></TableItem>
              <TableItem title="盘存数/应盘数" align="left" :width="120">
                <template slot-scope="{ data }">
                  <span>{{ data.inventoryNumber }}/{{ data.totalInventory }}</span>
                </template>
              </TableItem>
              <TableItem title="进度" prop="schedule" align="right" :width="80"></TableItem>
              <TableItem title="盘点时间" prop="startTime" align="left" :width="100"></TableItem>
              <TableItem title="状态" align="center" :width="90">
                <template slot-scope="{ data }">
                  <div v-if="data.status == 0">
                    <span class="h-tag h-tag-yellow">待盘点</span>
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
                    v-if="data.status==0"
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'assetInventoryupdate'"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <button
                    v-else
                    class="h-btn h-btn-s modify"
                    v-bg-color:#8AB5F9
                    v-color:white
                    @click="modify(data)"
                    v-has="'assetInventoryupdate'"
                    style="border:1px solid #8AB5F9;cursor: not-allowed;"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <DropdownMenu
                    button
                    v-color:white
                    v-bg-color:#ab51e6
                    @click="trigger"
                    @show="getOneData(data)"
                    :datas="param"
                  >更多</DropdownMenu>
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
    <Modal v-model="inventoryAdd" hasCloseIcon hasDivider>
      <inventoryAdd @close="inventoryAdd=false" @getData="getData"></inventoryAdd>
    </Modal>
    <Modal v-model="inventoryModify" hasCloseIcon hasDivider>
      <inventoryModify @close="inventoryModify=false" :fruit="inventoryId" @getData="getData"></inventoryModify>
    </Modal>
    <Modal v-model="deleteModal">
      <div slot="header" class="title">删除</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定删除？
      </div>
      <div slot="footer">
        <Button color="primary" @click="modalConfirm">确定</Button>
        <Button @click="modalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import inventoryAdd from './inventory_add';
import inventoryModify from './inventory_modify';
import assetInventoryModel from 'model/Assets/AssetInventory';
export default {
  components: {
    inventoryAdd, // 新增盘点
    inventoryModify // 修改盘点
  },
  data() {
    return {
      assetInventoryList: assetInventoryModel.parse({}),
      status: '',
      useId: [],
      statusval: [
        { title: '待盘点', key: '0' },
        { title: '盘点中', key: '1' },
        { title: '已盘点', key: '2' }
      ],
      datas: [],
      pagination: {
        page: 1,
        size: 20,
        total: 100
      },
      isLoading: false,
      inventoryAdd: false,
      inventoryModify: false,
      inventoryId: '',
      deleteBtn: false,
      oneData: {},
      param: [
        { title: '编辑', key: 'modify' },
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      tableHeight: 0,
      deleteModal: false
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getList();
    this.getData();
    this.$nextTick(() => {
      document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
    });
    document.addEventListener('scroll', this.winScroll, true);
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/assetInventory/)) {
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
    // 新增数据
    add() {
      this.inventoryAdd = true;
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
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
    getList() {
      R.pullDownList.user(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.useId = resp.body;
        }
      });
    },
    // 编辑数据
    modify(data) {
      if (data.status == 1) {
        this.$Message('该资产正在盘点中');
      } else if (data.status == 2) {
        this.$Message('该资产已盘点完毕');
      } else {
        this.inventoryId = data.id;
        this.inventoryModify = true;
      }
    },
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        this.deleteModal = true;
      }
    },
    modalConfirm() {
      let ids = [];
      if (this.$refs.table.getSelection().length > 0) {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          ids.push(this.$refs.table.getSelection()[i].id);
        }
      } else {
        ids.push(this.oneData.id);
      }
      this.assetInventoryList.ids = ids.join(',');
      R.Inventory.delete(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getData();
          }, 200);
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    view(data) {
      this.$router.push({ path: '/inventoryDetail/' + data.id });
    },
    // 控制删除按钮
    select(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
    },
    trigger(data) {
      if (data == 'modify') {
        if (this.oneData.status == 1) {
          this.$Message('该资产正在盘点中');
        } else if (this.oneData.status == 2) {
          this.$Message('该资产已盘点完毕');
        } else {
          this.inventoryId = this.oneData.id;
          this.inventoryModify = true;
        }
      } else if (data == 'detail') {
        this.$router.push({ path: '/inventoryDetail/' + this.oneData.id });
      } else if (data == 'delete') {
        this.deleteModal = true;
      }
    },
    getOneData(data) {
      this.oneData = data;
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = [
          '盘点编号',
          '标题',
          '盘点人',
          '创建时间',
          '盘点范围',
          '计划盘点时间',
          '创建人',
          '盘存数/应盘数',
          '进度',
          '盘点时间',
          '状态'
        ];
        const filterVal = [
          'code',
          'title',
          'inventoryPeopleName',
          'createTime',
          'inventoryRangeName',
          'cycleTime',
          'creatorName',
          'totalAndNumber',
          'schedule',
          'startTime',
          'statusName'
        ];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '资产盘点表');
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
//下拉按钮样式
.h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
  padding: 5px 9px;
  border-radius: 4px;
  vertical-align: middle;
}
/deep/ .h-dropdowncustom-show-content {
  padding-right: 14px;
}
/deep/ .h-dropdowncustom.h-btn {
  border-color: #ab51e6;
  vertical-align: top;
  &:hover {
    border-color: rgba(171, 81, 230, 0.8) !important;
    background-color: rgba(171, 81, 230, 0.8) !important;
  }
}
.modify {
  vertical-align: middle;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
