<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <div class="land-btn">
            <Button color="yellow">附件</Button>
            <Button color="green">照片</Button>
            <Button color="blue" @click="submit">提交</Button>
          </div>
        </Cell>
        <Cell :width="24">
          <Form id="print" mode="twocolumn" :label-width="150">
            <div class="category-title" align="center">无形资产_资源资质</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="">
              <input type="text" v-model="getCategoryId" readonly />
            </FormItem>
            <FormItem label="资产分类名称" prop="">
              <input type="text" v-model="name" readonly />
            </FormItem>
            <FormItem label="资产名称" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="预算项目编号" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="取得方式" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="取得日期" prop="">
              <DatePicker v-model="data"></DatePicker>
            </FormItem>
            <FormItem label="收益年限（月）" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="投入使用日期" prop="">
              <DatePicker v-model="data"></DatePicker>
            </FormItem>
            <FormItem label="授权证明" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="授权证明号" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="折旧年限（月）" prop="" single>
              <input type="text" v-model="datas" />
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="价值（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="财务入账状态" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期">
              <DatePicker v-model="data"></DatePicker>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="会计凭证号" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="摊销状态" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="账面净值（元）" prop="" single>
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="资产状态" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="管理部门" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="备注" prop="" single>
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="附件" prop="" single>
              <input type="text" v-model="datas" readonly />
            </FormItem>
            <FormItem label="照片" prop="" single>
              <input type="text" v-model="datas" readonly />
            </FormItem>
          </Form>
        </Cell>
      </Row>
    </div>
  </div>
</template>
<script>
import Bus from '../../../../js/common/bus';
export default {
  data() {
    return {
      data: '',
      datas: [],
      name: '',
      getCategoryId: '' // 获取到的国标分类id
    };
  },
  created() {
    // 获取兄弟组件（国标分类）传递来的数据
    Bus.$on('send-data', data => {
      this.name = data.categoryName;
      this.getCategoryId = data.code;
    });
  },
  mounted() {},
  methods: {
    // 提交数据
    submit() {}
  }
};
</script>
