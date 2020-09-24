<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            移交编号：
            <input type="text" v-model="datas" v-wordlimit="50"/>&nbsp;&nbsp;
            移交时间：
            <DatePicker v-model="test"></DatePicker>&nbsp;&nbsp;
            接收人：
            <input type="text" v-model="datas" v-wordlimit="50"/>&nbsp;&nbsp;
            接收人部门：
            <Select
              v-model="datas"
              :datas="datas"
              keyName="code"
              titleName="name"
              :autosize="true"
              style="width: 12%;"
            ></Select>&nbsp;&nbsp;
            审批状态：
            <Select
              v-model="datas"
              :datas="datas"
              keyName="code"
              titleName="name"
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
            <Button color="green" icon="h-icon-plus" @click="approval">审批</Button>
            <Button color="blue" icon="h-icon-edit">批量同意</Button>
            <Button color="yellow" icon="h-icon-trash">批量拒绝</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="移交编号" prop="loginName" align="center" :width="160"></TableItem>
              <TableItem title="标题" prop="realName" align="center" :width="160"></TableItem>
              <TableItem title="接收人" prop="departmentName" align="center" :width="100"></TableItem>
              <TableItem title="接收人部门" prop="enrollNumber" align="center" :width="120"></TableItem>
              <TableItem title="移交时间" prop="enrollNumber" align="center" :width="120"></TableItem>
              <TableItem title="申请人" prop="phoneNumber" align="center" :width="100"></TableItem>
              <TableItem title="申请时间" prop="email" align="center" :width="200"></TableItem>
              <TableItem title="涉及资产数量" prop="createTime" align="center" :width="100"></TableItem>
              <TableItem title="审批状态" prop="email" align="center"></TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150">
                <template slot-scope="{ data }">
                  <button class="h-btn h-btn-s h-btn-blue">
                    <i class="h-icon-edit"></i>
                    同意
                  </button>
                  <button class="h-btn h-btn-s h-btn-yellow">
                    <i class="h-icon-trash"></i>&nbsp;拒绝
                  </button>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: '',
      datas: [],
      transferAdd: false,
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
      isLoading: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 根据筛选条件查询
    search() {
      this.getData();
    },
    // 重置筛选条件
    reset() {},
    changePage() {
      this.getData();
    },
    close() {
      this.transferAdd = false;
    },
    // 新增数据
    add() {
      this.transferAdd = true;
    },
    // 获取所有数据列表
    getData() {},
    // 修改数据
    update() {},
    // 编辑数据
    modify(data) {},
    // 删除数据（可批量删除）
    remove() {
      //   this.Return=true;
    },
    // 逐条删除数据
    del(data) {},
    // 归还
    back(data) {}
  }
};
</script>
