<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            领用编号：
            <input
              type="text"
              v-model="useReturnList.code"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 领用日期：
            <DatePicker style="width: 12%;" v-model="useReturnList.useTime"></DatePicker>&nbsp;&nbsp; 领用人：
            <input
              type="text"
              v-model="useReturnList.user"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp;
            领用部门：
            <Select
              v-model="useReturnList.useDepartment"
              class="select-demo"
              :autosize="true"
              :datas="departmentOption"
              style="width:12%;"
              :filterable="true"
            ></Select>&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'useReturnadd'">新增</Button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'useReturndelete'"
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
              <TableItem title="领用编号" align="left" :width="120">
                <template slot-scope="{ data }">
                  <a href="#" @click="detail(data)">{{ data.code }}</a>
                </template>
              </TableItem>
              <TableItem title="标题" align="left" :width="200">
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
              <TableItem title="领用人" prop="userName" align="left" :width="60"></TableItem>
              <TableItem title="领用部门" prop="useDepartmentName" align="left" :width="80"></TableItem>
              <TableItem title="领用日期" prop="useTime" align="center" :width="100"></TableItem>
              <TableItem title="经手人" prop="manName" align="left" :width="60"></TableItem>
              <TableItem title="归还/领用" prop="number" align="right" :width="80"></TableItem>
              <TableItem title="预计归还时间" prop="planTime" align="center" :width="100"></TableItem>
              <TableItem title="归还经手人" prop="returnMan" align="left" :width="90"></TableItem>
              <TableItem title="归还时间" prop="returnTime" align="center" :width="100"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150" fixed="right">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.returnMan == undefined||data.returnMan ==''"
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'useReturnupdate'"
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
                    v-has="'useReturnupdate'"
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
            <p v-height="15"></p>
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
    <useAdd
      :useAdd="useAdd"
      @getData="getUseReturnFindAllData"
      :currentTime="currentTime"
      :departmentOption="departmentOption"
      :userOption="userOption"
    ></useAdd>
    <useModify
      ref="modify"
      :useModify="useModify"
      @getData="getData"
      @getFindAllData="getUseReturnFindAllData"
      :dataId="dataId"
      :currentTime="currentTime"
      :departmentOption="departmentOption"
      :userOption="userOption"
    ></useModify>
    <Modal v-model="Return" hasCloseIcon hasDivider>
      <Return
        @close="Return = false"
        :params="{ useReturnId: useReturnId, currentTime: currentTime, dataId:dataId, departmentOption: departmentOption, userOption: userOption }"
        @getData="getUseReturnFindAllData"
      ></Return>
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
import useAdd from './use_add';
import useModify from './use_modify';
import Return from './return';
import useReturnModel from 'model/useReturn/useReturnModel';
export default {
  components: {
    useAdd,
    useModify,
    Return
  },
  data() {
    return {
      useReturnList: useReturnModel.parse({}),
      test: '',
      datas: [],
      useReturnId: '',
      currentTime: '',
      departmentOption: [],
      userOption: [],
      dataId: '',
      useAdd: false,
      useModify: false,
      Return: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      tableHeight: 0,
      deleteBtn: false,
      oneData: {},
      param: [
        { title: '编辑', key: 'modify' },
        { title: '归还', key: 'return' },
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
        if (e.keyCode === 13 && e.target.baseURI.match(/useReturn/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      this.useReturnList.page = this.pagination.page;
      this.useReturnList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.useReturnList.code = '';
      this.useReturnList.useTime = '';
      this.useReturnList.user = '';
      this.useReturnList.useDepartment = '';
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.useReturnList.page = this.pagination.page;
      this.useReturnList.size = this.pagination.size;
      R.useReturn.useReturnFindAll(useReturnModel.dispose(this.useReturnList)).then(resp => {
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
      R.pullDownList.department(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          this.departmentOption = resp.body;
        }
      });
      R.pullDownList.user(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          this.userOption = resp.body;
        }
      });
      R.Scrapped.ScrappedGetUserAndDate(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          this.currentTime = resp.body.now;
        }
      });
    },
    getUseReturnFindAllData() {
      this.useReturnList.page = this.pagination.page;
      this.useReturnList.size = this.pagination.size;
      R.useReturn.useReturnFindAll(useReturnModel.dispose(this.useReturnList)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    // 新增数据
    add() {
      this.useAdd = true;
    },
    // 编辑数据
    modify(data) {
      if (data.returnMan == undefined || data.returnMan == '') {
        this.useModify = true;
        this.$refs.modify.getData(data.id);
        this.dataId = data.id;
      } else {
        this.$Message('领用的资产已全部归还，不可编辑');
      }
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
      this.useReturnList.ids = ids.join(',');
      R.useReturn.useReturnDelete(useReturnModel.dispose(this.useReturnList)).then(resp => {
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
    detail(data) {
      this.$router.push({ path: '/useReturnDetail/' + data.id });
    },
    changePage() {
      this.getData();
    },
    close() {
      this.useAdd = false;
      this.useModify = false;
      this.Return = false;
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
        if (this.oneData.returnMan == undefined || this.oneData.returnMan == '') {
          this.$refs.modify.getData(this.oneData.id);
          this.dataId = this.oneData.id;
          this.useModify = true;
        } else {
          this.$Message('领用的资产已全部归还，不可编辑');
        }
      } else if (data == 'return') {
        if (this.oneData.returnMan == undefined || this.oneData.returnMan == '') {
          this.useReturnId = this.oneData.id;
          this.dataId = this.oneData.id;
          this.Return = true;
        } else {
          this.$Message('领用的资产已全部归还');
        }
      } else if (data == 'detail') {
        this.$router.push({ path: '/useReturnDetail/' + this.oneData.id });
      } else if (data == 'delete') {
        if (this.oneData.returnMan == undefined || this.oneData.returnMan == '') {
          this.$Message('领用的资产尚未归还，不能删除');
        } else {
          this.deleteModal = true;
        }
      }
    },
    getOneData(data) {
      this.oneData = data;
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = ['领用编号', '标题', '领用人', '领用部门', '领用日期', '经手人', '归还/领用', '预计归还时间', '归还经手人', '归还时间'];
        const filterVal = ['code', 'title', 'userName', 'useDepartmentName', 'useTime', 'manName', 'number', 'planTime', 'returnMan', 'returnTime'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '领用归还表');
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
