<template>
  <div class="data-migration">
    <div class="data-migration-info">
      <h2>数据迁移</h2>
      <Form ref="form" :label-width="150" :model="dataMigrationList" :rules="validationRules">
        <FormItem label="MySQL Host Address" prop="path">
          <input type="text" v-model="dataMigrationList.path" placeholder="例：127.0.0.1" />
        </FormItem>
        <FormItem label="用户名" prop="accountNumber">
          <input type="text" v-model="dataMigrationList.accountNumber" />
        </FormItem>
        <FormItem label="密码" prop="password">
          <input type="password" v-model="dataMigrationList.password" />
        </FormItem>
        <FormItem label="端口" prop="portNumber">
          <input type="text" v-model="dataMigrationList.portNumber" />
        </FormItem>
        <FormItem label="数据/库" prop="databaseName">
          <input type="text" v-model="dataMigrationList.databaseName" />
        </FormItem>
      </Form>
      <div class="btn">
        <Button class="h-btn h-btn-blue" @click="submit">迁移</Button>
        <Button class="h-btn h-btn-gray" @click="reset">取消</Button>
      </div>
      <Modal v-model="dataMigrationConfirm">
        <div slot="header" class="title">迁移数据</div>
        <div style="padding:15px">是否覆盖数据库原有数据？</div>
        <div slot="footer">
          <Button color="primary" @click="modalConfirm">确定</Button>
          <Button @click="modalClose">取消</Button>
        </div>
      </Modal>
    </div>
    <!-- <Loading text="数据迁移中，请耐心等待" :loading="loading"></Loading> -->
  </div>
</template>
<script>
import dataMigrationModel from 'model/dataMigration/dataMigration';
export default {
  data() {
    return {
      dataMigrationList: dataMigrationModel.parse({}),
      dataMigrationConfirm: false,
      validationRules: {
        required: ['path', 'accountNumber', 'password', 'portNumber', 'databaseName']
      }
      // loading: false
    };
  },
  mounted() {
    document.getElementById('app').style = 'min-width:1366px;overflow:auto';
  },
  methods: {
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.dataMigrationConfirm = true;
      }
    },
    reset() {
      this.dataMigrationList = dataMigrationModel.parse({});
    },
    // modalConfirm() {
    //   this.loading = true;
    //   this.dataMigrationConfirm = false;
    //   R.dataMigration.migrateData(dataMigrationModel.dispose(this.dataMigrationList)).then(resp => {
    //     if (resp.ok) {
    //       this.loading = false;
    //     } else {
    //       this.loading = false;
    //       this.$Message.error('数据迁移失败');
    //     }
    //   });
    // },
    modalConfirm() {
      this.$Loading('数据迁移中，请耐心等待');
      this.dataMigrationConfirm = false;
      R.dataMigration.migrateData(dataMigrationModel.dispose(this.dataMigrationList)).then(resp => {
        if (resp.ok) {
          this.$Loading.close();
          this.$Message.success('数据迁移成功');
        } else {
          this.$Loading.close();
          this.$Message.error('数据迁移失败');
        }
      });
    },
    modalClose() {
      this.dataMigrationConfirm = false;
    }
  }
};
</script>
<style lang="less" scoped>
.data-migration {
  background: #f7f8fa;
  position: absolute;
  width: 100%;
  height: 100%;
  .data-migration-info {
    background: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: auto;
    min-height: 450px;
    border-radius: 4px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
    padding: 2%;
    h2 {
      text-align: center;
      color: #2375f3;
      margin: 5% 0 10%;
    }
    .h-form /deep/ .h-form-item-label {
      text-align: left;
    }
    /deep/ .h-btn {
      padding: 2% 21%;
    }
    .btn {
      text-align: center;
      margin: 10% 0 10%;
    }
    .h-form /deep/ .h-form-item {
      padding-bottom: 20px;
    }
  }
  //修改必填项label字体颜色
  /deep/ .h-form-item-required .h-form-item-label span {
    color: #888;
  }
  @media screen and (min-width: 1366px) {
    .data-migration-info {
      width: 40%;
    }
  }
  @media screen and (min-width: 1440px) {
    .data-migration-info {
      width: 40%;
    }
  }
  @media screen and (min-width: 1680px) {
    .data-migration-info {
      width: 35%;
    }
  }
  @media screen and (min-width: 1920px) {
    .data-migration-info {
      width: 30%;
    }
  }
}
</style>
