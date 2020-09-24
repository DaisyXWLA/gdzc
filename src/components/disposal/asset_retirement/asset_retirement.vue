<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            报废编号：
            <input
              type="text"
              v-model="ScrappedList.code"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 报废日期：
            <DatePicker style="width: 12%;" v-model="ScrappedList.scrappedTime"></DatePicker>&nbsp;&nbsp; 审批状态：
            <Select
              v-model="ScrappedList.staut"
              :datas="paramOption"
              :autosize="true"
              style="width: 12%;"
            ></Select>&nbsp;&nbsp;
            资产编号：
            <input
              type="text"
              v-model="ScrappedList.newCode"
              style="width: 12%;"
              v-wordlimit="50"
            />&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'assetRetirementadd'">新增</Button>
            <Button color="green" icon="h-icon-outbox" @click="frontEndExportExcel">导出</Button>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'assetRetirementdelete'"
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
              <TableItem title="报废编号" align="left" :width="120">
                <template slot-scope="{ data }">
                  <a href="#" @click="view(datas, data)">{{ data.code }}</a>
                </template>
              </TableItem>
              <TableItem title="标题" align="left" :width="150">
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
              <TableItem title="申请人" prop="applicantName" align="left" :width="80"></TableItem>
              <TableItem title="申请日期" prop="applicantTime" align="center" :width="80"></TableItem>
              <TableItem title="报废日期" prop="scrappedTime" align="center" :width="80"></TableItem>
              <TableItem title="报废资产数量" prop="number" align="left" :width="100"></TableItem>
              <TableItem title="报废原因" prop="reasonForScrapping" align="left" :width="100"></TableItem>
              <TableItem title="审批状态" :width="80" align="center">
                <template slot-scope="{ data }">
                  <div v-if="data.staut == 0">
                    <span class="h-tag h-tag-yellow">待审批</span>
                  </div>
                  <div v-else-if="data.staut == 1">
                    <span class="h-tag h-tag-green">审批中</span>
                  </div>
                  <div v-else-if="data.staut == 2">
                    <span class="h-tag h-tag-green">已完成</span>
                  </div>
                  <div v-else>
                    <span class="h-tag h-tag-red">未通过</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{ data }">
                  <button
                    v-if="data.staut==0"
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'assetRetirementupdate'"
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
                    v-has="'assetRetirementupdate'"
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
    <retirementAdd
      @getData="getAllListData"
      :retirementAdd="retirementAdd"
      :currentTime="currentTime"
      :user="user"
    ></retirementAdd>
    <retirementModify
      ref="modify"
      @getData="getAllListData"
      @getFindAllData="getAllListData"
      :retirementModify="retirementModify"
      :dataId="dataId"
      :currentTime="currentTime"
      :user="user"
    ></retirementModify>
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
import retirementAdd from './retirement_add';
import retirementModify from './retirement_modify';
import ScrappedModel from 'model/scrapped/scrapped';
export default {
  components: {
    retirementAdd,
    retirementModify
  },
  data() {
    return {
      ScrappedList: ScrappedModel.parse({}),
      paramOption: [
        { title: '待审批', key: '0' },
        { title: '审批中', key: '1' },
        { title: '已完成', key: '2' },
        { title: '未通过', key: '3' }
      ],
      currentTime: '',
      applyName: '',
      datas: [],
      dataId: '',
      retirementAdd: false,
      retirementModify: false,
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
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      deleteModal: false,
      user: []
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    this.getUser();
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/assetRetirement/)) {
          this.search();
        }
      };
    },
    view(datas, data) {
      this.$router.push({ path: '/retirementDetail/', query: { id: data.id, status: data.staut } });
    },
    // 根据筛选条件查询
    search() {
      this.ScrappedList.page = this.pagination.page;
      this.ScrappedList.size = this.pagination.size;
      this.getData();
    },
    // 重置筛选条件
    reset() {
      this.ScrappedList.code = '';
      this.ScrappedList.scrappedTime = '';
      this.ScrappedList.staut = '';
      this.ScrappedList.newCode = '';
    },

    // 新增数据
    add() {
      this.retirementAdd = true;
    },
    // 获取所有数据列表
    getData() {
      this.ScrappedList.page = this.pagination.page;
      this.ScrappedList.size = this.pagination.size;
      this.isLoading = true;
      R.Scrapped.ScrappedList(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
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
      R.Scrapped.ScrappedGetUserAndDate(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
        if (resp.ok) {
          this.currentTime = resp.body.now;
          this.applyName = resp.body.username;
          // console.log(this.currentTime,this.applyName)
        }
      });
    },
    getAllListData() {
      this.ScrappedList.page = this.pagination.page;
      this.ScrappedList.size = this.pagination.size;
      R.Scrapped.ScrappedList(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
        if (resp.ok) {
          // console.log(resp);
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    // 获取申请人
    getUser() {
      R.pullDownList.user(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
        if (resp.ok) {
          this.user = resp.body;
          // console.log(this.user);
        }
      });
    },
    // 编辑数据
    modify(data) {
      if (data.staut == 1) {
        this.$Message('审批中，不可编辑');
      } else if (data.staut == 2) {
        this.$Message('已完成审批，不可编辑');
      } else {
        this.retirementModify = true;
        this.$refs.modify.getData(this.datas[this.datas.indexOf(data)].id);
        this.dataId = data.id;
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
      this.ScrappedList.ids = ids.join(',');
      R.Scrapped.ScrappedDel(ScrappedModel.dispose(this.ScrappedList)).then(resp => {
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
    changePage() {
      this.getData();
    },
    close() {
      this.retirementAdd = false;
      this.retirementModify = false;
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
        if (this.oneData.staut == 1) {
          this.$Message('审批中，不可编辑');
        } else if (this.oneData.staut == 2) {
          this.$Message('已完成审批，不可编辑');
        } else {
          this.$refs.modify.getData(this.oneData.id);
          this.dataId = this.oneData.id;
          this.retirementModify = true;
        }
      } else if (data == 'detail') {
        this.$router.push({ path: '/retirementDetail/' + this.oneData.id });
      } else if (data == 'delete') {
        if (this.oneData.staut == 1) {
          this.$Message('资产报废申请审批中，不可删除');
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
        const tHeader = ['报废编号', '标题', '申请人', '申请日期', '报废日期', '报废资产数量', '报废原因', '审批状态'];
        const filterVal = ['code', 'title', 'applicantName', 'applicantTime', 'scrappedTime', 'number','reasonForScrapping', 'statusName'];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '资产报废表');
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
