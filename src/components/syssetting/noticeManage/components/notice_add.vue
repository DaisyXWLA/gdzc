<template>
  <Modal v-model="informadd" v-bind="params">
    <div slot="header" class="title">
      新增通知公告
      <i class="h-icon-close" @click="cancel"></i>
    </div>
    <div :labelPosition="labelPosition">
      <Form
        :label-width="120"
        :mode="mode"
        :model="informModel"
        :rules="validationRules"
        ref="form"
        :top="0.2"
        validOnChange
      >
        <FormItem label="标题：" prop="title">
          <input type="text" v-model="informModel.title" placeholder="请输入" v-wordlimit="30" />
        </FormItem>
        <FormItem label="类型：" prop="type">
          <Select
            v-model="informModel.type"
            :datas="param"
            keyName="code"
            titleName="name"
            placeholder="公告/通知/动态/祝福"
          ></Select>
        </FormItem>
        <!-- <FormItem label="提醒方式：" prop="showType">
          <Select
            v-model="informModel.showType"
            :datas="param1"
            titleName="name"
            keyName="name"
            placeholder="登录界面/全屏弹窗/手机端/不提醒"
          ></Select>
        </FormItem>-->
        <FormItem label="通知公告内容：" prop="content">
          <RichTextEditor v-model="informModel.content"></RichTextEditor>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button color="primary" @click="submit">保存</Button>
      <Button @click="cancel">取消</Button>
    </div>
  </Modal>
</template>

<script>
import informAdd from 'model/inform/informAdd';
export default {
  props: ['informadd'],
  data() {
    return {
      informModel: informAdd.parse({}),
      params: {
        closeOnMask: false,
        hasDivider: true
      },
      labelPosition: 'right',
      mode: 'single',
      param: [
        { name: '公告', code: 0 },
        { name: '通知', code: 1 },
        { name: '动态', code: 2 },
        { name: '祝福', code: 3 }
      ],
      param1: [{ name: '登录界面' }, { name: '全屏弹窗' }, { name: '手机端' }, { name: '不提醒' }],
      isLoading: false,
      validationRules: {
        required: ['title', 'type', 'content']
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const vm = this;
    },
    submit() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        R.ProjectInform.informAdd(informAdd.dispose(this.informModel)).then(resp => {
          if (resp.ok) {
            setTimeout(() => {
              this.$Message.success('保存成功');
              this.informModel = informAdd.parse({});
              this.$parent.getData();
              this.$parent.close();
            }, 2000);
          } else {
            setTimeout(() => {
              this.$Message.error('保存失败');
              this.informModel = informAdd.parse({});
              this.$parent.getData();
              this.$parent.close();
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
    cancel() {
      this.informModel = informAdd.parse({});
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
