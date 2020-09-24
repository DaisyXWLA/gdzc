<style lang='less'>
</style>

<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            系统模块：
            <input type="text" v-model="operLogList.model" />&nbsp;&nbsp;
            操作人员：
            <input type="text" v-model="operLogList.operator" />&nbsp;&nbsp;
            <!-- 操作状态：
            <input type="text" v-model="operationStatus" />&nbsp;&nbsp;-->
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button icon="h-icon-trash" class="h-btn-red" @click="clear">清空</Button>
            <Button color="red" icon="h-icon-close" @click="remove">删除</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" checkbox>
              <TableItem title="序号" prop="$serial" :width="80"></TableItem>
              <TableItem title="系统模块" prop="modelName"></TableItem>
              <TableItem title="操作类型" prop="logType"></TableItem>
              <TableItem title="操作人员" prop="operator" :width="100"></TableItem>
              <!-- <TableItem title="部门名称" prop="relatedprojects"></TableItem> -->
              <TableItem title="主机" prop="logIp" :width="100"></TableItem>
              <!-- <TableItem title="操作地点" prop="name"></TableItem> -->
              <TableItem title="操作状态">
                <template slot-scope="{data}">
                  <div v-if="data==0">
                    <span>成功</span>
                  </div>
                  <div v-else>
                    <span>成功</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作时间" prop="operateTime"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="100">
                <template slot-scope="{data}">
                  <button class="h-btn h-btn-s h-btn-red" @click="del(data)">
                    <i class="h-icon-close"></i>&nbsp;删除
                  </button>
                </template>
              </TableItem>
              <div slot="empty">暂时无数据</div>
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
  </div>
</template>

<script>
import operLogModel from 'model/operLog/operLogModel';
export default {
  data() {
    return {
      operLogList: operLogModel.parse({}),
      datas: [],
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
        if (e.keyCode === 13 && e.target.baseURI.match(/operationLog/)) {
          this.search();
        }
      };
    },
    // 获取所有数据列表
    getData() {
      this.operLogList.page = this.pagination.page;
      this.operLogList.size = this.pagination.size;
      R.operLogManage.operLogFindAll(operLogModel.dispose(this.operLogList)).then(resp => {
        // console.log(resp)
        if (resp.ok) {
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.total = resp.total;
        }
      });
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      this.operLogList.page = this.pagination.page;
      this.operLogList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.operLogList.model = '';
      this.operLogList.operator = '';
    },
    // 清空数据
    clear() {
      if (this.$refs.table.datas.length > 0) {
        let ids = [];
        this.$Confirm('确定删除？', '删除').then(() => {
          for (let i = 0; i < this.$refs.table.datas.length; i++) {
            ids.push(this.$refs.table.datas[i].id);
          }
          this.operLogList.ids = ids.join(',');
          R.operLogManage.operLogDelete(operLogModel.dispose(this.operLogList)).then(resp => {
            if (resp.ok) {
              this.$Message.success('数据刪除成功');
              setTimeout(() => {
                this.getData();
              }, 2000);
            }
          });
        });
      } else {
        this.$Message('无可删除的数据');
      }
    },
    // 删除数据（可批量删除）
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        let ids = [];
        this.$Confirm('确定删除？', '删除').then(() => {
          for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
            ids.push(this.$refs.table.getSelection()[i].id);
          }
          this.operLogList.ids = ids.join(',');
          R.operLogManage.operLogDelete(operLogModel.dispose(this.operLogList)).then(resp => {
            if (resp.ok) {
              this.$Message.success('数据刪除成功');
              setTimeout(() => {
                this.getData();
              }, 2000);
            }
          });
        });
      }
    },
    // 逐条删除数据
    del(data) {
      let ids = [];
      this.$Confirm('确定删除？', '删除')
        .then(() => {
          ids.push(this.datas[this.datas.indexOf(data)].id);
          this.operLogList.ids = ids.join(',');
          this.datas.splice(this.datas.indexOf(data), 1);
          R.operLogManage.operLogDelete(operLogModel.dispose(this.operLogList)).then(resp => {
            if (resp.ok) {
              this.$Message.success('数据刪除成功');
              setTimeout(() => {
                this.getData();
              }, 2000);
            }
          });
        })
        .catch(() => {
          this.$Message('取消');
        });
    },
    changePage() {
      this.getData();
    },
    resetDatepicker() {
      this.$refs.datapicker.resetValid();
    }
  }
};
</script>
