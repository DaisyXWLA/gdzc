<style lang='less'>
</style>

<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar">
            登录名称：
            <input type="text" v-model="department" />&nbsp;&nbsp;
            登录状态：
            <input type="text" v-model="userName" />&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button icon="h-icon-trash" class="h-btn-red" @click="add">清空</Button>
            <Button color="red" icon="h-icon-close" @click="update">删除</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :stripe="stripe" :loading="isLoading" checkbox>
              <TableItem title="序号" prop="$serial" :width="80"></TableItem>
              <TableItem title="登录名称" prop="theme"></TableItem>
              <TableItem title="登录地址" prop="time"></TableItem>
              <TableItem title="登录地点" prop="daynumber" :width="100"></TableItem>
              <TableItem title="浏览器" prop="relatedprojects"></TableItem>
              <TableItem title="操作系统" prop="department" :width="100"></TableItem>
              <TableItem title="登录状态" prop="name"></TableItem>
              <TableItem title="操作信息" prop="name"></TableItem>
              <TableItem title="登录时间" prop="name"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="100">
                <template slot-scope="{data}">
                  <button class="h-btn h-btn-s h-btn-red">
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
export default {
  data() {
    return {
      value: null,
      check: false,
      select: [],
      format: '',
      param: [
        { title: '已完成', key: 'a1', other: '其他值' },
        { title: '待审批', key: 'a2' },
        { title: '未通过', key: 'a3' }
      ],
      addDept: false,
      updateDept: false,
      department: '',
      userName: '',
      datas: [],
      title: '',
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      stripe: false,
      data: {},
      isLoading: false
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.init();
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/loginLog/)) {
          this.search();
        }
      };
    },
    init() {
      this.getData();
    },
    search(data) {
      this.getData(true);
      this.close();
    },
    changePage() {
      this.getData(true);
      this.close();
    },
    close() {
      this.addDept = false;
      this.updateDept = false;
    },

    confirm() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        if (this.$refs.table.getSelection().length >= 1) {
          this.$Confirm('确定删除该条加班信息吗？')
            .then(() => {
              this.$Message.success('删除成功！');
              this.getData(true);
              this.addOvertime = false;
            })
            .catch(() => {
              this.$Message.error('取消删除');
            });
        }
      }
    },
    reset() {
      this.department = '';
      this.value = null;
      this.select = '';
      this.close();
    },
    resetDatepicker() {
      this.$refs.datapicker.resetValid();
    },
    remove(index) {
      this.data.inputsData.splice(index, 1);
    },

    add() {
      this.close();
      this.addDept = true;
    },

    update() {
      this.close();
      this.updateDept = true;
    },
    view() {
      this.$router.push({ name: 'overtimeview' });
    },
    getData(reload = false) {
      if (reload) {
      }
      this.isLoading = true;
      setTimeout(() => {
        this.datas = [
          {
            id: 4,
            theme: '大鹏',
            time: '2019',
            daynumber: '7天',
            relatedprojects: '公司官网开发',
            department: '软件部',
            name: '大鹏老师',
            approvestate: '已完成'
          },
          {
            id: 5,
            theme: '大鹏申请',
            time: '2017',
            daynumber: '7天',
            relatedprojects: '公司官网开发',
            department: '软件部',
            name: '大鹏老师',
            approvestate: '待审批'
          },
          {
            id: 6,
            theme: '大请',
            time: '201',
            daynumber: '7天',
            relatedprojects: '公司官网开发',
            department: '软件部',
            name: '大鹏老师',
            approvestate: '未通过'
          },
          {
            id: 7,
            theme: '大班申请',
            time: '2019',
            daynumber: '7天',
            relatedprojects: '公司官网开发',
            department: '软件部',
            name: '大鹏老师',
            approvestate: '已完成'
          },
          {
            id: 8,
            theme: '大鹏班申请',
            time: '201',
            daynumber: '7天',
            relatedprojects: '公司官网开发',
            department: '软件部',
            name: '大鹏老师',
            approvestate: '待审批'
          },
          {
            id: 9,
            theme: '班申请',
            time: '2017',
            daynumber: '7天',
            relatedprojects: '公司官网开发',
            department: '软件部',
            name: '大鹏老师',
            approvestate: '未通过'
          }
        ];
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>
