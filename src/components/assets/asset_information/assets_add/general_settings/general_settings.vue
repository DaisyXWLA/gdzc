<template>
  <div v-width="900">
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header modal-title">常用设置</header>
    <div class="h-panel">
      <div class="h-panel-bar">
        <Button color="blue" icon="h-icon-plus" size="s" @click="newGroup=true">新建分组</Button>
        <Button v-show="modifyBtn" color="green" icon="h-icon-edit" size="s" @click="modify">修改</Button>
        <Button v-show="deleteBtn" color="red" icon="h-icon-trash" size="s" @click="remove">删除</Button>
        <Button v-show="maintainBtn" color="yellow" icon="h-icon-edit" size="s" @click="show">维护分类</Button>
      </div>
      <div class="h-panel-body">
        <Row :space="20">
          <Cell :width="7">
            <Table
              ref="table"
              :height="405"
              :datas="datas"
              :loading="categoryLoading"
              @select="select"
              selectWhenClickTr
              checkbox
            >
              <TableItem title="分组名称" prop="title" :width="150"></TableItem>
              <div slot="empty">暂时无数据</div>
            </Table>
          </Cell>
          <Cell :width="17">
            <Table ref="tableT" :datas="datasT" :loading="listLoading" :height="405">
              <TableItem title="序号" prop="$serial" :width="50" align="center"></TableItem>
              <TableItem title="分组名称" prop="title" :width="100" align="left"></TableItem>
              <TableItem title="分类编号" prop="code" :width="150" align="left"></TableItem>
              <TableItem title="分类名称" prop="codeName" :width="100" align="left"></TableItem>
              <div slot="empty">暂时无数据</div>
            </Table>
          </Cell>
        </Row>
      </div>
    </div>
    <!-- h-modal-footer 将自带modal底部样式 -->
    <footer class="h-modal-footer">
      <!-- <button class="h-btn h-btn-primary" @click="success">保存</button> -->
      <button class="h-btn" @click="close">关闭</button>
    </footer>
    <!-- <Modal v-model="newGroup" hasCloseIcon>
      <newGroup @close="newGroup=false" @getData="getData"></newGroup>
    </Modal>-->
    <Modal v-model="newGroup">
      <header class="h-modal-header modal-title">新建分组</header>
      <Form ref="form" :label-width="100" :top="0.2" showErrorTip>
        <div class="ipt">
          <FormItem label="分组名称：" prop="datas">
            <input type="text" v-model="setUpAdd.title" />
          </FormItem>
        </div>
      </Form>
      <footer class="h-modal-footer">
        <button class="h-btn h-btn-primary" @click="addModalConfirm">保存</button>
        <button class="h-btn" @click="addModalClose">取消</button>
      </footer>
    </Modal>
    <!-- <Modal v-model="modifyGroup" hasCloseIcon>
      <modifyGroup @close="modifyGroup=false" :fruit="index" @getData="getData"></modifyGroup>
    </Modal>-->
    <Modal v-model="modifyGroup">
      <header class="h-modal-header modal-title">编辑分组</header>
      <Form ref="form" :label-width="100" :top="0.2" showErrorTip>
        <div class="ipt">
          <FormItem label="分组名称：" prop="datas">
            <input type="text" v-model="setUpAdd.title" />
          </FormItem>
        </div>
      </Form>
      <footer class="h-modal-footer">
        <button class="h-btn h-btn-primary" @click="modifyModalConfirm">更新</button>
        <button class="h-btn" @click="modifyModalClose">取消</button>
      </footer>
    </Modal>
    <Modal v-model="classification" hasCloseIcon>
      <classification @close="classification=false" :fruit="index" @getData="findInfoByIds"></classification>
    </Modal>
    <Modal v-model="deleteModal">
      <header class="h-modal-header modal-title">删除</header>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定删除？
      </div>
      <div slot="footer">
        <Button color="primary" @click="deleteModalConfirm">确定</Button>
        <Button @click="deleteModalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import newGroup from './new_group';
import modifyGroup from './modify_group';
import classification from './maintenance_classification';
import setUpModel from 'model/setUp/setUp';
export default {
  components: {
    newGroup,
    modifyGroup,
    classification
  },
  data() {
    return {
      setUpAdd: setUpModel.parse({}),
      newGroup: false,
      modifyGroup: false,
      classification: false,
      datas: [],
      datasT: [],
      categoryLoading: false,
      listLoading: false,
      index: '',
      deleteModal: false,
      deleteBtn: false,
      modifyBtn: false,
      maintainBtn: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.categoryLoading = true;
      R.setUp.findAllGroup(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.categoryLoading = false;
          this.datas = resp.body;
        } else {
          this.categoryLoading = false;
        }
      });
    },
    // 获取常用设置列表
    findInfoByIds(ids) {
      this.setUpAdd.ids = ids;
      R.setUp.findInfoByIds(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.datasT = resp.body;
        }
      });
    },
    select(data) {
      this.listLoading = true;
      if (data.length > 0) {
        this.deleteBtn = true;
        this.modifyBtn = true;
        this.maintainBtn = true;
        let ids = [];
        for (let i = 0; i < data.length; i++) {
          ids.push(data[i].id);
        }
        this.setUpAdd.ids = ids.join(',');
        R.setUp.findInfoByIds(setUpModel.dispose(this.setUpAdd)).then(resp => {
          if (resp.ok) {
            this.listLoading = false;
            this.datasT = resp.body;
          } else {
            this.listLoading = false;
          }
        });
      } else {
        this.deleteBtn = false;
        this.modifyBtn = false;
        this.maintainBtn = false;
        R.setUp.findAll(setUpModel.dispose(this.setUpAdd)).then(resp => {
          if (resp.ok) {
            this.listLoading = false;
            this.datasT = resp.body;
          } else {
            this.listLoading = false;
          }
        });
      }
    },
    show() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要维护的数据');
      } else {
        if (this.$refs.table.getSelection().length > 1) {
          this.$Message('维护仅支持单条数据');
        } else {
          this.index = this.$refs.table.getSelection()[0].id;
          this.classification = true;
        }
      }
    },
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        this.deleteModal = true;
      }
    },
    modify() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要编辑的数据');
      } else {
        if (this.$refs.table.getSelection().length > 1) {
          this.$Message('编辑仅支持单条数据');
        } else {
          this.index = this.$refs.table.getSelection()[0].id;
          this.getModifyData();
          this.modifyGroup = true;
        }
      }
    },
    success() {
      // 向外层触发事件, 1.17.0 之前
      // this.$emit('event', 'update', this.value);

      // 直接使用emit触发外部的events监听，兼容性 1.18.0+
      this.$emit('getData');
      this.$emit('success', this.value);
      this.close();
    },
    close() {
      this.$emit('getData');
      this.$emit('close');
    },
    // 新建分组
    addModalConfirm() {
      R.setUp.save(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.$Message.success('保存成功');
          this.getData();
          this.$emit('getData');
          this.newGroup = false;
          this.setUpAdd.title = '';
        }
      });
    },
    addModalClose() {
      this.newGroup = false;
      this.setUpAdd.title = '';
    },
    // 编辑分组
    getModifyData() {
      this.setUpAdd.id = this.index;
      R.setUp.findOne(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.setUpAdd.title = resp.body.title;
        }
      });
    },
    modifyModalConfirm() {
      R.setUp.update(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.$Message.success(resp.body);
          this.getData();
          this.$emit('getData');
          this.modifyGroup = false;
          this.setUpAdd.title = '';
        }
      });
    },
    modifyModalClose() {
      this.modifyGroup = false;
      this.setUpAdd.title = '';
    },
    // 删除分组
    deleteModalConfirm() {
      let ids = [];
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        ids.push(this.$refs.table.getSelection()[i].id);
      }
      this.setUpAdd.ids = ids.join(',');
      R.setUp.delete(setUpModel.dispose(this.setUpAdd)).then(resp => {
        if (resp.ok) {
          this.$Message.success('数据刪除成功');
          this.getData();
          this.$emit('getData');
          this.deleteModal = false;
        }
      });
    },
    deleteModalClose() {
      this.deleteModal = false;
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-bar {
  border: none;
}
/deep/ .h-panel-body {
  min-height: 53vh;
}
.ipt {
  margin-top: 10%;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
