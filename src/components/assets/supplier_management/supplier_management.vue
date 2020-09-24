<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            供应商编号：
            <input type="text" v-model="supplierList.code" v-wordlimit="50" />&nbsp;&nbsp; 供应商名称：
            <input type="text" v-model="supplierList.name" v-wordlimit="50" />&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'supplierManagementadd'">新增</Button>
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
              v-has="'supplierManagementdelete'"
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
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="供应商编号" align="left" :width="120">
                <template slot-scope="{ data }">
                  <a href="#" @click="view(data)">{{ data.code }}</a>
                </template>
              </TableItem>
              <TableItem title="供应商名称" align="left" :width="150">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.name"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="地址" prop="address" align="left" :width="150"></TableItem>
              <TableItem title="联系电话" prop="phone" align="center" :width="100"></TableItem>
              <TableItem title="联系人" prop="peopleName" align="left" :width="80"></TableItem>
              <TableItem title="备注" prop="remarks" align="left" :width="150"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{ data }">
                  <button
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'supplierManagementupdate'"
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
    <Modal v-model="supplierAdd" hasCloseIcon hasDivider>
      <supplierAdd @close="supplierAdd = false" @getData="getData"></supplierAdd>
    </Modal>
    <Modal v-model="supplierModify" hasCloseIcon hasDivider>
      <supplierModify @close="supplierModify = false" :fruit="Id" @getData="getData"></supplierModify>
    </Modal>
    <Modal v-model="supplierView" hasCloseIcon hasDivider>
      <supplierView @close="supplierView = false" :fruit="Id"></supplierView>
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
import supplierAdd from './supplier_add';
import supplierModify from './supplier_modify';
import supplierView from './supplier_detail';
import supplierModel from 'model/supplier/supplier';
export default {
  components: {
    supplierAdd,
    supplierModify,
    supplierView
  },
  data() {
    return {
      //   userList:userModel.parse({}),
      supplierList: supplierModel.parse({}),
      test: '',
      datas: [],
      supplierAdd: false,
      supplierModify: false,
      supplierView: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      Id: '',
      tableHeight: 0,
      deleteBtn: false,
      oneData: {},
      param: [
        { title: '编辑', key: 'modify' },
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      deleteModal: false
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/supplierManagement/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      //   this.userList.page = this.pagination.page;
      //   this.userList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.supplierList = supplierModel.parse({});
    },
    changePage() {
      this.getData();
    },
    close() {
      //   this.addUser = false;
      //   this.updateUser = false;
      //   this.reseteUser = false;
    },
    // 新增数据
    add() {
      this.supplierAdd = true;
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.supplierList.page = this.pagination.page;
      this.supplierList.size = this.pagination.size;
      R.supplier.findAll(supplierModel.dispose(this.supplierList)).then(resp => {
        if (resp.ok) {
          // setTimeout(() => {
          this.isLoading = false;
          this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 164;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
          // }, 500);
        }
      });
    },
    // 编辑数据
    modify(data) {
      this.Id = data.id;
      this.supplierModify = true;
    },
    view(data) {
      this.Id = data.id;
      this.supplierView = true;
    },
    // 删除数据（可批量删除）
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
      this.supplierList.ids = ids.join(',');
      R.supplier.delete(supplierModel.dispose(this.supplierList)).then(resp => {
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
        this.Id = this.oneData.id;
        this.supplierModify = true;
      } else if (data == 'detail') {
        this.Id = this.oneData.id;
        this.supplierView = true;
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
          '供应商编号',
          '供应商名称',
          '地址',
          '联系电话',
          '联系人',
          '备注'
        ];
        const filterVal = [
          'code',
          'name',
          'address',
          'phone',
          'peopleName',
          'remarks'
        ];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '供应商管理表');
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 30px - 61px);
  overflow: hidden;
}
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
