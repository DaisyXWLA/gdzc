<template>
  <div class="table-basic-vue frame-page">
    <Row :space="9">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            标题：
            <input type="text" v-model="informSearch.title" />&nbsp;&nbsp;
            发布人员：
            <input type="text" v-model="informSearch.creator" />&nbsp;&nbsp;
            发布时间：
            <DatePicker v-model="informSearch.createTime"></DatePicker>&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <div>
              <Button color="blue" icon="h-icon-plus" @click="add">新增</Button>
              <!-- <Button color="green" icon="h-icon-edit" @click="update">修改公告</Button> -->
              <Button v-show="deleteBtn" color="red" icon="h-icon-trash" @click="del">删除</Button>
            </div>
            <div style="margin-top: 10px">
              <Table
                ref="table"
                :loading="isLoading"
                :datas="datas"
                :checkbox="checkbox"
                @select="select"
              >
                <TableItem :width="40" title="序号" prop="$serial" align="center"></TableItem>
                <TableItem :width="180" title="标题" align="left">
                  <template slot-scope="{data}">
                    <a href="#" @click="view(data)">
                      <TextEllipsis
                        :text="data.title"
                        :height="30"
                        :width="180"
                        more="..."
                        tooltipTheme="white"
                        useTooltip
                      ></TextEllipsis>
                    </a>
                  </template>
                </TableItem>
                <TableItem :width="180" title="内容" align="left">
                  <template slot-scope="{data}">
                    <TextEllipsis
                      :text="data.htmlContent"
                      :height="30"
                      :width="180"
                      more="..."
                      tooltipTheme="white"
                      useTooltip
                    ></TextEllipsis>
                  </template>
                </TableItem>
                <!-- <TableItem :width="80" prop="showType" title="提醒方式" align="left"></TableItem> -->
                <TableItem :width="60" prop="isRead" title="阅读数" align="left"></TableItem>
                <TableItem :width="80" prop="creatorName" title="发布人员" align="left"></TableItem>
                <TableItem :width="150" prop="createTime" title="发布时间" align="left"></TableItem>
                <TableItem :width="60" prop="task" title="类型" align="center">
                  <template slot-scope="{data}">
                    <div v-if="data.type==0">
                      <span class="h-tag h-tag-blue">公告</span>
                    </div>
                    <div v-else-if="data.type==1">
                      <span class="h-tag h-tag-yellow">通知</span>
                    </div>
                    <div v-else-if="data.type==2">
                      <span class="h-tag h-tag-green">动态</span>
                    </div>
                    <div v-else-if="data.type==3">
                      <span class="h-tag h-tag-red">祝福</span>
                    </div>
                    <div v-else></div>
                  </template>
                </TableItem>
                <TableItem :width="150" prop="task12" title="操作" align="center">
                  <template slot-scope="{data}">
                    <button
                      class="h-btn h-btn-s h-btn-blue"
                      style="vertical-align:middle"
                      @click="update(data)"
                    >
                      <i class="h-icon-edit"></i>
                      <span>编辑</span>
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
                  v-if="pagination.total>0"
                  align="right"
                  v-model="pagination"
                  @change="changePage"
                />
              </div>
            </div>
          </div>
        </div>
      </Cell>
    </Row>
    <inform :informadd="informadd"></inform>
    <InformEdit :informEdit="informEdit" ref="child"></InformEdit>
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
import addnew from './components/notice_add';
import edit from './components/notice_modify';
import informList from 'model/inform/informList';
import informDel from 'model/inform/informDel';
import informFindOne from 'model/inform/informUpdate';
import axios from 'axios';
// import Ajax from '../../js/common/ajax';
export default {
  components: {
    inform: addnew,
    InformEdit: edit
  },
  data() {
    return {
      informSearch: informList.parse({}),
      informDelModel: informDel.parse({}),
      informFindOneModel: informFindOne.parse({}),
      informadd: false,
      informEdit: false,
      format: '',
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      value: {},
      checkbox: true,
      datas: [],
      serial: true,
      isLoading: false,
      params: {},
      index: 0,
      content: null,
      deleteBtn: false,
      param: [
        { title: '编辑', key: 'modify' },
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      oneData: {},
      deleteModal: false
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.init();
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/notice/)) {
          this.search();
        }
      };
    },
    init() {
      this.getData();
    },
    changePage() {
      this.getData(true);
      this.getPage();
    },
    search(data) {
      this.getData(true);
      this.getPage();
    },
    getPage() {
      this.informSearch.page = this.pagination.page;
      this.informSearch.size = this.pagination.size;
    },
    reset() {
      this.informSearch.title = '';
      this.informSearch.creator = '';
      this.informSearch.createTime = '';
    },
    resetDatepicker() {
      this.$refs.datapicker.resetValid();
    },
    close() {
      this.content = null;
      this.informadd = false;
      this.informEdit = false;
    },
    add() {
      this.close();
      this.informadd = true;
    },
    update(data) {
      this.$refs.child.getData(data.id);
      this.informEdit = true;
    },
    view(data) {
      this.$router.push({ path: '/notice_detail/' + data.id });
    },
    del() {
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
      this.informDelModel.ids = ids.join(',');
      R.ProjectInform.informDel(informDel.dispose(this.informDelModel)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getData();
          }, 200);
        } else {
          this.deleteModal = false;
          this.$Message.error('删除失败');
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    getData() {
      this.isLoading = true;
      this.getPage();
      R.ProjectInform.informList(informList.dispose(this.informSearch)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.total = resp.total;
          this.isLoading = false;
        }
      });
    },
    // 控制批量删除按钮
    select(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
    },
    trigger(data) {
      if (data == 'modify') {
        this.$refs.child.getData(this.oneData.id);
        this.informEdit = true;
      } else if (data == 'detail') {
        this.$router.push({ path: '/notice_detail/' + this.oneData.id });
      } else if (data == 'delete') {
        this.deleteModal = true;
      }
    },
    getOneData(data) {
      this.oneData = data;
    }
  }
};
</script>
<style lang="less" scoped>
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
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 30px - 61px);
}
/deep/ .h-table {
  max-height: calc(100vh - 60px - 45px - 30px - 30px - 72px - 18px - 25px - 25px - 50px - 32px);
  overflow: auto;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
