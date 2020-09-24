<template>
  <div class="h-panel">
    <div class="h-panel-body">
      <Row>
        <Cell :width="24">
          <div class="land-btn">
            <Button color="yellow">附件</Button>
            <Button color="green">照片</Button> -->
            <Button color="blue" @click="submit">提交</Button>
          </div>
        </Cell>
        <Cell :width="24">
          <Form id="print" mode="twocolumn" :label-width="150">
            <div class="category-title" align="center">无形资产_信息数据</div>
            <div class="form-title">基本信息</div>
            <FormItem label="资产编号" prop="">
              <input type="text" v-model="getCategoryId" />
            </FormItem>
            <FormItem label="资产分类名称" prop="">
              <input type="text" v-model="name" />
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
            <FormItem label="使用权面积（㎡）" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="取得日期" prop="">
              <DatePicker v-model="data"></DatePicker>
            </FormItem>
            <FormItem label="其中：独用面积（㎡）" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="投入日期">
              <DatePicker v-model="data"></DatePicker>
            </FormItem>
            <FormItem label="产权形式" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="权属证明" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="权属性质" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="权属证号" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="权属年限（月）" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="持证人" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="发证日期">
              <DatePicker v-model="data"></DatePicker>
            </FormItem>
            <FormItem label="使用权类型" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="分摊面积（㎡）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="地类（用途）" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="土地级次" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="坐落位置" prop="" single>
              <input type="text" v-model="datas" />
            </FormItem>
            <div class="form-title">财务信息</div>
            <FormItem label="价值（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="价值类型" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="均价（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财政拨款（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账状态" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="非财政拨款（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="财务入账日期">
              <DatePicker v-model="data"></DatePicker>
            </FormItem>
            <FormItem label="会计凭证号" prop="">
              <input type="text" v-model="datas" />
            </FormItem>
            <FormItem label="账面净值（元）" prop="" single>
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <div class="form-title">使用信息</div>
            <FormItem label="自用面积（㎡）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="自用价值（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="出借面积（㎡）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="出借价值（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="出租面积（㎡）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="出租价值（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="闲置面积（㎡）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="闲置价值（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="其他面积（㎡）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="其他价值（元）" prop="">
              <NumberInput v-model="datas" :precision="2"></NumberInput>
            </FormItem>
            <FormItem label="管理部门" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="资产状态" prop="">
              <Select v-model="datas" class="select-demo" :datas="datas"></Select>
            </FormItem>
            <FormItem label="备注" prop="" single>
              <input type="text" v-model="datas" />
            </FormItem>
            <!-- <FormItem label="照片" prop="" single>
              <Button color="blue" icon="">上传照片</Button>
            </FormItem> -->
            <FormItem label="附件" prop="" single>
              <Button color="blue" icon="">上传附件</Button>
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
      categoryId: '1010000', // 国标分类id
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
  mounted() {
    this.sendDataToParent();
  },
  // 返回后刷新页面
  watch: {
    $route(to, from) {
      if (this.$route.params.Id != null) {
        this.getData();
      }
    }
  },
  methods: {
    getData() {},
    // 向父组件传递数据
    sendDataToParent() {
      this.$emit('landSendToParent', this.categoryId);
    },
    // 返回上一级
    back() {
      this.$router.push({ name: 'assetInformation' });
    }
  }
};
</script>
