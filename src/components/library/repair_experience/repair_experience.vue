<style lang="less" scoped>
/deep/ .tree4-demo-vue {
  .h-tree-show {
    .h-tree-show-desc {
      display: none;
    }
    .tree-show-custom {
      display: inline;
      .tree-show-title {
        font-size: 13px;
      }
    }
    .tree-edit-part {
      position: absolute;
      right: 5px;
      top: 2px;
      opacity: 0;
      i {
        font-size: 12px;
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          color: @primary-color;
        }
      }
    }
    &:hover {
      .tree-edit-part {
        opacity: 1;
      }
    }
  }
}
.search {
  position: relative;
  input,
  .h-select {
    margin: 5px 0;
  }
}
.asset-info-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.experience-category-title {
  font-weight: bold;
  padding: 15px;
  font-size: 16px;
  border-bottom: 1px solid #eee;
}
.experience-category {
  min-height: calc(100vh - 60px - 45px - 116px);
  height: 100%;
  border-bottom: none;
}
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 30px - 63px);
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
.title {
  cursor: pointer;
  color: #3788ee;
}
</style>
<template>
  <div class="table-basic-vue frame-page">
    <Row :space="20">
      <Cell :width="5">
        <div class="h-panel">
          <div class="experience-category-title">
            <Row>
              <Cell :width="12">
                <span>经验类别</span>
              </Cell>
              <Cell :width="12" align="right">
                <Button
                  color="blue"
                  icon="h-icon-plus"
                  @click="addCategory"
                  size="s"
                  v-has="'repairExperienceadd'"
                >新增类别</Button>
              </Cell>
            </Row>
          </div>
          <div class="h-panel-bar experience-category">
            <div class="tree4-demo-vue">
              <Tree
                :option="param"
                ref="demo"
                :filterable="true"
                v-model="value"
                @select="treeSearch"
                selectOnClick
                class="h-tree-theme-row-selected"
              >
                <template slot="item" slot-scope="{ item }">
                  <div class="tree-show-custom">
                    <span
                      class="tree-show-title"
                      v-if="!item.editing"
                    >{{ item.experienceClassificationName }}</span>
                    <input
                      v-else
                      type="text"
                      v-model="experienceList.experienceClassificationName"
                      @blur="updateValue(item)"
                      @keyup.enter="updateValue(item)"
                    />
                    <span class="tree-edit-part" v-if="!item.editing">
                      <i class="h-icon-edit" @click.stop="edit(item)"></i>
                      <i class="h-icon-trash" @click.stop="removeCategory(item)"></i>
                    </span>
                  </div>
                </template>
              </Tree>
            </div>
          </div>
        </div>
      </Cell>
      <Cell :width="19">
        <div class="h-panel">
          <div class="h-panel-bar">
            发布人：
            <input
              type="text"
              v-model="experienceList.creator"
              style="width: 15%;"
              v-wordlimit="50"
            />&nbsp;&nbsp; 发布日期：
            <DatePicker style="width:15%;" v-model="experienceList.createTime"></DatePicker>&nbsp;&nbsp; 经验类别：
            <Select
              v-model="experienceList.category"
              class="select-demo"
              :autosize="true"
              :datas="option"
              style="width:15%;"
            ></Select>&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'repairExperienceadd'">新增</Button>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'repairExperiencedelete'"
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
              <TableItem title="标题" align="left" :width="150">
                <!-- <template slot-scope="{ data }">
                  <a href="#" @click="detail(data)">{{ data.title }}</a>
                </template>-->
                <template slot-scope="{ data }">
                  <TextEllipsis
                    class="title"
                    @click="detail(data)"
                    :text="data.title"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="经验类别" prop="categoryName" align="left" :width="80"></TableItem>
              <TableItem title="发布人" prop="creatorName" align="left" :width="80"></TableItem>
              <TableItem title="发布日期" prop="createTime" align="center" :width="100"></TableItem>
              <TableItem title="问题描述" prop="problemDescription" align="left" :width="150"></TableItem>
              <TableItem title="解决方案" prop="solution" align="left" :width="150"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150" fixed="right">
                <template slot-scope="{ data }">
                  <button
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(data)"
                    v-has="'repairExperienceupdate'"
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
                    :datas="paramOption"
                  >更多</DropdownMenu>
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
    <Modal v-model="experienceAdd" hasCloseIcon>
      <experienceAdd
        @close="experienceAdd = false"
        :option="option"
        :creator="creator"
        :currentTime="currentTime"
        @getData="findAll"
        :userOption="userOption"
      ></experienceAdd>
    </Modal>
    <Modal v-model="experienceCategoryAdd" hasCloseIcon>
      <experienceCategoryAdd
        @close="experienceCategoryAdd = false"
        @getData="getExperienceTree"
        :option="option"
      ></experienceCategoryAdd>
    </Modal>
    <Modal v-model="experienceModify" hasCloseIcon>
      <experienceModify
        @close="experienceModify = false"
        :fruit="experienceId"
        :option="option"
        :creator="creator"
        :currentTime="currentTime"
        @getData="findAll"
        :userOption="userOption"
      ></experienceModify>
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
    <Modal v-model="deleteCategory">
      <div slot="header" class="title">删除</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定删除？
      </div>
      <div slot="footer">
        <Button color="primary" @click="categoryConfirm">确定</Button>
        <Button @click="categoryClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import experienceAdd from './experience_add';
import experienceCategoryAdd from './experience_category_add';
import experienceModify from './experience_modify';
import experienceModel from 'model/repairExperience/repairExperienceModel';
import utils from 'hey-utils';
export default {
  components: {
    experienceAdd,
    experienceCategoryAdd,
    experienceModify
  },
  data() {
    return {
      experienceList: experienceModel.parse({}),
      datas: [],
      option: [],
      creator: '',
      currentTime: '',
      experienceId: '',
      experienceAdd: false,
      experienceCategoryAdd: false,
      experienceModify: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      value: null,
      param: {
        keyName: 'id',
        parentName: 'parentId',
        titleName: 'experienceClassificationName',
        dataMode: 'list',
        datas: []
      },
      tableHeight: 0,
      deleteBtn: false,
      oneData: {},
      paramOption: [
        { title: '编辑', key: 'modify' },
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      deleteModal: false,
      deleteCategory: false,
      repairExperienceCategory: {},
      userOption: []
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    this.getUser();
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
        if (e.keyCode === 13 && e.target.baseURI.match(/repairExperience/)) {
          this.search();
        }
      };
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.experienceList.page = this.pagination.page;
      this.experienceList.size = this.pagination.size;
      R.library.experienceFindAll(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.isLoading = false;
            this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 230;
            this.datas = resp.body;
            this.pagination.page = resp.page;
            this.pagination.size = resp.size;
            this.pagination.total = resp.total;
          }, 500);
        }
      });
      // 获取上级分组、经验类别
      R.library.categoryDropDownList(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          this.option = resp.body;
        }
      });
      // 获取所有经验类别数据
      R.library.getExperienceTree(experienceModel.dispose(this.experienceList)).then(resp => {
        this.param.datas = resp.body;
      });
      // 获取当前用户名
      R.Scrapped.ScrappedGetUserAndDate(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          this.creator = resp.body.username;
          this.currentTime = resp.body.now;
        }
      });
    },
    findAll() {
      this.experienceList.page = this.pagination.page;
      this.experienceList.size = this.pagination.size;
      R.library.experienceFindAll(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    getExperienceTree() {
      R.library.getExperienceTree(experienceModel.dispose(this.experienceList)).then(resp => {
        this.param.datas = resp.body;
      });
      R.library.categoryDropDownList(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          this.option = resp.body;
        }
      });
    },
    categoryDropDownList() {
      R.library.categoryDropDownList(experienceModel.dispose(this.experienceList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.option = resp.body;
        }
      });
    },
    // 获取申请人
    getUser() {
      R.pullDownList.user(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          this.userOption = resp.body;
        }
      });
    },
    // 根据筛选条件查询
    search() {
      this.experienceList.page = this.pagination.page;
      this.experienceList.size = this.pagination.size;
      this.findAll();
    },
    // 重置筛选条件
    reset() {
      this.experienceList.creator = '';
      this.experienceList.createTime = '';
      this.experienceList.category = '';
    },
    // 新增数据
    add() {
      this.experienceAdd = true;
    },
    // 新增经验类别
    addCategory() {
      this.experienceCategoryAdd = true;
    },
    // 编辑数据
    modify(data) {
      this.experienceId = this.datas[this.datas.indexOf(data)].id;
      this.experienceModify = true;
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
        this.experienceList.ids = ids.join(',');
        R.library.experienceDelete(experienceModel.dispose(this.experienceList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.deleteModal = false;
              this.$Message.success('数据刪除成功');
              this.getData();
            }, 500);
          }
        });
      } else {
        ids.push(this.oneData.id);
        this.experienceList.ids = ids.join(',');
        R.library.experienceDelete(experienceModel.dispose(this.experienceList)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.deleteModal = false;
              this.$Message.success('数据刪除成功');
              this.getData();
            }, 500);
          }
        });
      }
    },
    modalClose() {
      this.deleteModal = false;
    },
    detail(data) {
      this.$router.push({ path: '/repairExperienceDetail/' + data.id });
    },
    treeSearch(data) {
      // console.log(data)
      this.experienceList.category = data.id;
      this.findAll();
    },
    // 编辑维修经验类别
    edit(item) {
      this.$set(item, 'editValue', item.experienceClassificationName);
      this.$set(item, 'editing', true);
      this.experienceList.experienceClassificationName = item.experienceClassificationName;
    },
    updateValue(item) {
      this.$set(item, 'editing', false);
      this.$refs.demo.updateTreeItem(item.id, { experienceClassificationName: item.experienceClassificationName });
      this.experienceList.id = item.id;
      R.library.updateCategory(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          this.$Message.success(resp.body);
          this.getExperienceTree();
          this.categoryDropDownList();
        }
      });
    },
    // 删除维修经验类别
    removeCategory(item) {
      this.deleteCategory = true;
      this.repairExperienceCategory = item;
    },
    categoryConfirm() {
      this.$refs.demo.removeTreeItem(this.repairExperienceCategory.id);
      this.experienceList.id = this.repairExperienceCategory.id;
      this.experienceList.experienceClassificationName = this.repairExperienceCategory.experienceClassificationName;
      R.library.deleteCategory(experienceModel.dispose(this.experienceList)).then(resp => {
        if (resp.ok) {
          this.$Message.success(resp.body);
          this.getExperienceTree();
          this.categoryDropDownList();
          this.getData();
          this.deleteCategory = false;
        }
      });
    },
    categoryClose() {
      this.deleteCategory = false;
    },
    changePage() {
      this.getData();
    },
    close() {
      this.experienceAdd = false;
      this.experienceCategoryAdd = false;
      this.experienceModify = false;
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
        this.experienceId = this.oneData.id;
        this.experienceModify = true;
      } else if (data == 'detail') {
        this.$router.push({ path: '/repairExperienceDetail/' + this.oneData.id });
      } else if (data == 'delete') {
        this.deleteModal = true;
      }
    },
    getOneData(data) {
      this.oneData = data;
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
