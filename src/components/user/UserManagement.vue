<style lang='less'>
.buttons {
  margin-block: 20px;
  margin-top: 20px;
}
.basic-form-vue {
  .h-panel-body {
    padding-right: 60px;
  }
  .divd {
    height: 70%;
  }
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">用户管理</span>
    </div>
    <div class="h-panel-body">
      <div>
        <Search @search="search" v-model="realName" placeholder="真实姓名"></Search>&nbsp;
        <Search @search="search" v-model="loginName" placeholder="用户名"></Search>&nbsp;
        <Button color="primary" :loading="isLoading" @click="search">搜索</Button>
      </div>
      <div class="buttons">
        <button class="h-btn h-btn-blue" @click="add">
          <i class="h-icon-inbox"></i>
          <span>新增</span>
        </button>
        <button class="h-btn h-btn-blue" @click="update">
          <i class="h-icon-edit"></i>
          <span>编辑</span>
        </button>
        <button class="h-btn h-btn-blue" @click="del">
          <i class="h-icon-trash"></i>
          <span>删除</span>
        </button>
        <button class="h-btn h-btn-blue" @click="view">
          <i class="h-icon-search"></i>
          <span>查看</span>
        </button>
      </div>
      <Table ref="table" :loading="loading" :datas="datas" :checkbox="checkbox">
        <TableItem :width="200" prop="realName" title="真实姓名"></TableItem>
        <TableItem :width="200" prop="loginName" title="用户名"></TableItem>
        <TableItem :width="200" prop="phoneNumber" title="手机号"></TableItem>
        <TableItem :width="200" prop="departmentName" title="所属部门"></TableItem>
        <TableItem :width="200" prop="isAdmin" title="是否是管理员"></TableItem>
        <TableItem :width="200" prop="isLocked" title="是否锁定"></TableItem>
        <TableItem :width="200" prop="isOnline" title="是否在线"></TableItem>
      </Table>
      <p></p>
      <Pagination
        v-if="pagination.total>0"
        align="right"
        v-model="pagination"
        @change="changePage"
      />
      <Modal v-model="opened">
        <div slot="header">{{data.title}}</div>
        <div class="divd">
          <Form
            :label-width="110"
            mode="twocolumn"
            :model="data"
            :rules="validationRules"
            ref="form"
            showErrorTip
          >
            <input type="hidden" v-model="data.id" />
            <FormItem label="用户名" prop="input">
              <input type="text" v-model="data.loginName" />
            </FormItem>

            <FormItem label="用户密码" prop="mobile">
              <input type="password" v-model="data.loginPassword" />
            </FormItem>

            <FormItem label="真实姓名" prop="input">
              <input type="text" v-model="data.realName" />
            </FormItem>

            <FormItem label="手机号码" prop="mobile">
              <input type="text" v-model="data.phoneNumber" />
            </FormItem>

            <FormItem label="所属部门" prop="mobile">
              <input type="text" v-model="data.departmentName" />
            </FormItem>

            <FormItem label="角色分配" prop="mobile">
              <input type="text" v-model="data.roleIds" />
            </FormItem>

            <FormItem label="是否管理员" prop="radio">
              <Radio v-model="isAdmin" :datas="param4" keyName="code" titleName="name"></Radio>
            </FormItem>
            <FormItem></FormItem>
            <Button color="primary" :loading="isLoading" @click="submit">提交</Button>&nbsp;&nbsp;&nbsp;
            <Button @click="opened=false">取消</Button>
          </Form>
        </div>
      </Modal>

      <Modal v-model="openedt">
        <div slot="header">{{data.title}}</div>
        <div class="divd">
          <Form
            :label-width="110"
            mode="twocolumn"
            :model="data"
            :rules="validationRules"
            ref="form"
            showErrorTip
          >
            <input type="hidden" v-model="data.id" />
            <FormItem label="用户名" prop="input">
              <input type="text" v-model="data.loginName" readonly />
            </FormItem>

            <FormItem label="用户密码" prop="mobile">
              <input type="password" v-model="data.loginPassword" readonly />
            </FormItem>

            <FormItem label="真实姓名" prop="input">
              <input type="text" v-model="data.realName" readonly />
            </FormItem>

            <FormItem label="手机号码" prop="mobile">
              <input type="text" v-model="data.phoneNumber" readonly />
            </FormItem>

            <FormItem label="所属部门" prop="mobile">
              <input type="text" v-model="data.departmentName" readonly />
            </FormItem>

            <FormItem label="角色分配" prop="mobile">
              <input type="text" v-model="data.roleIds" readonly />
            </FormItem>

            <FormItem label="是否管理员" prop="radio">
              <Radio v-model="isAdmin" :datas="param4" keyName="code" titleName="name"></Radio>
            </FormItem>
            <FormItem></FormItem>
            <Button color="primary" @click="openedt=false">确定</Button>&nbsp;&nbsp;&nbsp;
            <Button @click="openedt=false">取消</Button>
          </Form>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import FormModel from 'model/Form';
import Ajax from '../../js/common/ajax';
export default {
  data() {
    return {
      isAdmin: 0,
      param4: [
        { name: '是', code: 1 },
        { name: '否', code: 0 }
      ],
      mode: 'single',
      keyword: '',
      sort: 'updatedAt:desc',
      data: {
        title: '',
        id: '',
        loginName: '',
        loginPassword: '',
        realName: '',
        phoneNumber: '',
        departmentName: '',
        roleIds: '',
        isAdmin: ''
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      type: 'China',
      checkbox: true,
      datas: [],
      counts: {},
      realName: '',
      loginName: '',
      opened: false,
      openedt: false,
      loading: false,
      required: [
        'autocomplete',
        'category',
        'select2',
        'select3',
        'inputs[].value',
        'input',
        'radio',
        'rate',
        'checkbox',
        'money',
        'date',
        'taginputs',
        'money.min',
        'money.max',
        'int',
        'number',
        'url',
        'email',
        'tel',
        'mobile'
      ]
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
        if (e.keyCode === 13 && e.target.baseURI.match(/assetInformation/)) {
          this.search();
        }
      };
    },
    init() {
      this.getData();
    },
    changePage() {
      this.getData(true);
    },
    search(data) {
      this.getData(true);
    },

    add() {
      this.data.title = '新增';
      this.data.id = '';
      this.data.loginName = '';
      this.data.loginPassword = '';
      this.data.realName = '';
      this.data.phoneNumber = '';
      this.data.departmentName = '';
      this.data.roleIds = '';
      this.isAdmin = 0;
      this.opened = true;
    },
    update() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要编辑的数据');
      } else {
        if (this.$refs.table.getSelection().length > 1) {
          this.$Message('编辑仅支持单条数据');
        } else {
          Ajax.get('http://localhost:8089/oa/user/finduserentity?id=' + this.$refs.table.getSelection()[0].id).then(resp => {
            this.data.id = resp.data.id;
            this.data.loginName = resp.data.loginName;
            this.data.loginPassword = resp.data.loginPassword;
            this.data.realName = resp.data.realName;
            this.data.phoneNumber = resp.data.phoneNumber;
            this.data.departmentName = resp.data.departmentName;
            this.data.roleIds = resp.data.roleIds;
            this.isAdmin = resp.data.isAdmin;
          });
          this.data.title = '编辑';
          this.opened = true;
        }
      }
    },
    del() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        let ids = new Array();
        this.$Confirm('确定删除？', '删除')
          .then(() => {
            for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
              ids.push(this.$refs.table.getSelection()[i].id);
            }
            setTimeout(() => {
              Ajax.get('http://localhost:8089/oa/user/delete?ids=' + ids.join(',')).then(resp => {
                this.$Message(resp.data);
              });
              this.getData(true);
            }, 1000);
          })
          .catch(() => {
            // this.$Message.error('取消');
          });
      }
    },
    view() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要查看的数据');
      } else {
        if (this.$refs.table.getSelection().length > 1) {
          this.$Message('查看仅支持单条数据');
        } else {
          Ajax.get('http://localhost:8089/oa/user/finduserentity?id=' + this.$refs.table.getSelection()[0].id).then(resp => {
            this.data.id = resp.data.id;
            this.data.loginName = resp.data.loginName;
            this.data.loginPassword = resp.data.loginPassword;
            this.data.realName = resp.data.realName;
            this.data.phoneNumber = resp.data.phoneNumber;
            this.data.departmentName = resp.data.departmentName;
            this.data.roleIds = resp.data.roleIds;
            this.isAdmin = resp.data.isAdmin;
          });
          this.data.title = '查看';
          this.openedt = true;
        }
      }
    },
    submit(data) {
      this.isLoading = true;
      setTimeout(() => {
        Ajax.get(
          'http://localhost:8089/oa/user/save?loginName=' +
            this.data.loginName +
            '&loginPassword=' +
            this.data.loginPassword +
            '&realName=' +
            this.data.realName +
            '&phoneNumber=' +
            this.data.phoneNumber +
            '&isAdmin=' +
            this.isAdmin +
            '&id=' +
            this.data.id
        ).then(resp => {
          this.$Message(resp.data);
        });
        this.isLoading = false;
      }, 1000);
      this.opened = false;
      this.getData(true);
    },
    getData(reload = false) {
      if (reload) {
      }
      this.loading = true;
      setTimeout(() => {
        Ajax.get(
          'http://192.168.1.57:8089/oa/taskInfo/findAll?page=' +
            this.pagination.page +
            '&limit=' +
            this.pagination.size +
            '&realName=' +
            this.realName +
            '&loginName=' +
            this.loginName
        )
          .then(resp => {
            this.datas = resp.data;
            this.pagination.page = resp.page;
            this.pagination.size = resp.limit;
            this.pagination.total = resp.count;
          })
          .then(res => {});
        this.loading = false;
      }, 1000);
    }
  }
};
</script>
