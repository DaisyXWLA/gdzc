<template>
  <Modal v-model="informEdit" v-bind="params">
    <div slot="header" class="title">
      编辑通知公告
      <i class="h-icon-close" @click="cancel"></i>
    </div>
    <div>
      <Form
        :label-width="120"
        :mode="mode"
        :model="informUpdateModel"
        :rules="validationRules"
        ref="form"
        :top="0.2"
        validOnChange
      >
        <FormItem label="标题：" prop="title">
          <input type="text" v-model="informUpdateModel.title" placeholder="请输入" v-wordlimit="30" />
        </FormItem>
        <FormItem label="类型：" prop="type">
          <Select
            v-model="informUpdateModel.type"
            :datas="param"
            titleName="name"
            keyName="code"
            placeholder="公告/通知/动态/祝福"
          ></Select>
        </FormItem>
        <!-- <FormItem label="提醒方式：" prop="showType">
          <Select
            v-model="informUpdateModel.showType"
            :datas="param1"
            titleName="name"
            keyName="name"
            placeholder="登录界面/全屏弹窗/手机端/不提醒"
          ></Select>
        </FormItem>-->
        <FormItem label="通知公告内容：" prop="content">
          <RichTextEditor v-model="informUpdateModel.content"></RichTextEditor>
        </FormItem>
      </Form>
      <Loading :loading="loading"></Loading>
    </div>
    <div slot="footer">
      <Button color="primary" @click="submit">更新</Button>
      <Button @click="cancel">取消</Button>
    </div>
  </Modal>
</template>

<script>
import informUpdate from 'model/inform/informUpdate';
export default {
  props: ['informEdit'],
  data() {
    return {
      informUpdateModel: informUpdate.parse({}),
      params: {
        closeOnMask: false,
        hasDivider: true
      },
      mode: 'single',
      param: [
        { name: '公告', code: 0 },
        { name: '通知', code: 1 },
        { name: '动态', code: 2 },
        { name: '祝福', code: 3 }
      ],
      param1: [{ name: '登录界面' }, { name: '全屏弹窗' }, { name: '手机端' }, { name: '不提醒' }],
      isLoading: false,
      isInputAsyncError: false,
      validationRules: {
        required: ['title', 'type', 'content']
      },
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const vm = this;
    },
    getData(Id) {
      this.loading = true;
      this.informUpdateModel.id = Id;
      R.ProjectInform.informFindOne(informUpdate.dispose(this.informUpdateModel)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.informUpdateModel = informUpdate.parse(resp.body);
        } else {
          this.loading = false;
        }
      });
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.ProjectInform.informUpdate(informUpdate.dispose(this.informUpdateModel)).then(resp => {
          if (resp.ok) {
            this.$Message.success('更新成功');
            this.$parent.close();
            setTimeout(() => {
              this.$parent.getData();
            }, 2000);
          } else {
            this.$Message.error('更新失败');
            this.$parent.close();
            setTimeout(() => {
              this.$parent.getData();
            }, 2000);
          }
        });
      }
    },
    submitAsync() {
      this.isLoading = true;
      this.$refs.form.validAsync().then(result => {
        if (result.result) {
          this.$Message('验证成功');
        }
        this.isLoading = false;
      });
    },
    resetDatepicker() {
      this.$refs.datapicker.resetValid();
    },
    cancel() {
      this.$parent.close();
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  background: #2d7bf4;
  color: #fff;
  padding: 0 15px;
  margin-left: -15px;
  overflow: hidden;
  .h-icon-close {
    float: right;
    line-height: 40px;
    font-size: 16px !important;
  }
}
/deep/ .h-select-placeholder {
  color: #aaa;
}
</style>
