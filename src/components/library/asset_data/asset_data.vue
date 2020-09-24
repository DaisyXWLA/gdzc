<template>
  <div class="app-home-vue frame-page">
    <Row :space="20">
      <Cell :width="5">
        <div class="h-panel">
          <div class="national-title">国标分类</div>
          <div class="h-panel-bar assets-category">
            <assetsCategory @categorySendToParent="getDataFromCategory"></assetsCategory>
          </div>
        </div>
      </Cell>
      <Cell :width="19">
        <Row :space="12">
          <Cell>
            <div class="h-panel">
              <div class="h-panel-bar search">
                资产编号：
                <input type="text" v-model="AssetsList.newCode" v-wordlimit="50" />
                <span class="space-four"></span>资产名称：
                <input type="text" v-model="AssetsList.assetsName" v-wordlimit="50" />
                <span class="space-four"></span>
                使用部门：
                <Select
                  v-model="AssetsList.useDepartment"
                  :datas="udpData"
                  :autosize="true"
                  :filterable="true"
                ></Select>
                <span class="space-two"></span>
                型号：
                <input type="text" v-model="AssetsList.specificationModel" />
                <span class="space-four"></span>
                管理部门：
                <Select
                  v-model="AssetsList.administrativeDepartment"
                  :datas="dpData"
                  :autosize="true"
                  :filterable="true"
                ></Select>
                <span class="user"></span>
                使用人：
                <Select
                  v-model="AssetsList.useId"
                  :datas="user"
                  :autosize="true"
                  :filterable="true"
                ></Select>
                <span class="space-four"></span>
                存放地点：
                <input
                  type="text"
                  v-model="AssetsList.storageLocation"
                  v-wordlimit="50"
                />
                <span class="space-two">品牌：</span>
                <input type="text" v-model="AssetsList.brand" v-wordlimit="50" />
                <span class="space-two">状态：</span>
                <Select v-model="AssetsList.assetsStatus" :datas="stauts" :autosize="true"></Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
                <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
              </div>
              <div class="h-panel-body">
                <div class="annotation">
                  <img src="../../../images/error-pages/annotation.png" alt />
                  <span>点击列表中每一行可以查看资料信息</span>
                </div>
                <Table
                  ref="table"
                  :datas="datasx"
                  :loading="isLoading"
                  :height="tableHeight"
                  @trclick="trclick"
                  selectWhenClickTr
                >
                  <TableItem title="序号" prop="$serial" align="center" :width="50"></TableItem>
                  <TableItem title="资产编号" prop="newCode" align="left" :width="120"></TableItem>
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
                  <TableItem
                    title="管理部门"
                    prop="administrativeDepartmentName"
                    align="left"
                    :width="120"
                  ></TableItem>
                  <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="200"></TableItem>
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
                  <TableItem title="数量" prop="number" align="left" :width="60"></TableItem>
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
                  <TableItem title="使用人" prop="username" align="left" :width="80"></TableItem>
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
      </Cell>
    </Row>
  </div>
</template>

<script>
import assetsCategory from './assets_category';
import library from './information';
import AssetsModel from 'model/Assets/Assets';
export default {
  components: {
    assetsCategory // 国标分类
  },
  data() {
    return {
      AssetsList: AssetsModel.parse({}),
      componentName: 'land',
      test: '',
      datas: [],
      datasx: [],
      udpData: [],
      dpData: [],
      user: [],
      stauts: [
        { title: '闲置', key: '0' },
        { title: '故障', key: '1' },
        { title: '报废', key: '2' },
        { title: '在用', key: '3' },
        { title: '缺失', key: '4' }
      ],
      retirementAdd: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false,
      tableHeight: 0
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    this.getSelect();
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/assetData/)) {
          this.search();
        }
      };
    },
    changePage() {
      this.AssetsList.page = this.pagination.page;
      this.AssetsList.size = this.pagination.size;
      this.getData();
    },
    getData() {
      this.isLoading = true;
      this.AssetsList.page = this.pagination.page;
      this.AssetsList.size = this.pagination.size;
      R.Assets.AssetsList(AssetsModel.dispose(this.AssetsList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.isLoading = false;
            this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 196;
            this.datasx = resp.body;
            this.pagination.page = resp.page;
            this.pagination.size = resp.size;
            this.pagination.total = resp.total;
          }, 500);
        }
      });
    },
    search() {
      this.AssetsList.page = this.pagination.page;
      this.AssetsList.size = this.pagination.size;
      this.getData();
    },
    // 重置筛选条件
    reset() {
      // this.AssetsList = AssetsModel.parse({});
      this.AssetsList.newCode = '';
      this.AssetsList.assetsName = '';
      this.AssetsList.useDepartment = '';
      this.AssetsList.specificationModel = '';
      this.AssetsList.administrativeDepartment = '';
      this.AssetsList.useId = '';
      this.AssetsList.storageLocation = '';
      this.AssetsList.brand = '';
      this.AssetsList.assetsStatus = '';
    },
    getSelect() {
      R.pullDownList.user(AssetsModel.dispose(this.AssetsList)).then(resp => {
        this.user = resp.body;
      });
      R.pullDownList.department(AssetsModel.dispose(this.AssetsList)).then(resp => {
        this.udpData = resp.body;
        this.dpData = resp.body;
      });
    },
    trclick(data) {
      this.$Modal({
        type: `drawer-right`,
        width: 850,
        component: {
          vue: library,
          datas: { fruit: data.id } // 子组件直接使用 props 即可使用，兼容性 1.15.0+
        },
        events: {
          success: (modal, data) => {
            this.value = data;
          }
        }
      });
    },
    // 获取分类组件的数据
    getDataFromCategory(data) {
      if (data == 1) {
        // this.AssetsList.assetsCategory = '';
        this.search();
      } else {
        this.AssetsList.assetsCategory = data;
        this.getData();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.search {
  position: relative;
  input,
  .h-select {
    margin: 5px 0;
  }
}
.assets-category {
  min-height: calc(100vh - 60px - 45px - 115px);
  border-bottom: 0;
}
.national-title {
  font-weight: bold;
  font-size: 16px;
  padding: 15px;
  border-bottom: 1px solid #eee;
}
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 30px - 155px);
  overflow: auto;
}
.annotation {
  margin-bottom: 5px;
  span {
    color: #666;
    vertical-align: middle;
  }
  img {
    width: 18px;
    vertical-align: middle;
  }
}
/deep/ .h-table-tr-hovered {
  cursor: pointer;
}
@media screen and (max-width: 1366px) {
  .search {
    input,
    .h-select {
      width: 15.5%;
    }
  }
  .space-two {
    padding-left: 3.4%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.8%;
  }
}
@media screen and (min-width: 1366px) {
  .search {
    input,
    .h-select {
      width: 15.5%;
    }
  }
  .space-two {
    padding-left: 3.4%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.8%;
  }
}
@media screen and (min-width: 1440px) {
  .search {
    input,
    .h-select {
      width: 16%;
    }
  }
  .space-two {
    padding-left: 3.5%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.8%;
  }
}
@media screen and (min-width: 1680px) {
  .search {
    input,
    .h-select {
      width: 17.3%;
    }
  }
  .space-two {
    padding-left: 2.5%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.8%;
  }
}
@media screen and (min-width: 1920px) {
  .search {
    input,
    .h-select {
      width: 18.2%;
    }
  }
  .space-two {
    padding-left: 2.3%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.8%;
  }
}
@media screen and (min-width: 2048px) {
  .search {
    input,
    .h-select {
      width: 18.6%;
    }
  }
  .space-two {
    padding-left: 2.2%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.8%;
  }
}
@media screen and (min-width: 2560px) {
  .search {
    input,
    .h-select {
      width: 15%;
    }
  }
  .space-two {
    padding-left: 2.3%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 0.8%;
  }
}
</style>
