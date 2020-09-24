<template>
  <div class="table-basic-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <Tabs :datas="tabConfig" class-name="h-tabs-card" v-model="selectedTab"></Tabs>
        <div v-if="selectedTab == 'module1'" class="table-wrapper">
          <div align="center" style="margin-top:20px;">
            <label>统计维度：</label>
            <Select
              v-model="breakdownSelectDimensionality"
              :datas="breakdownParamDimensionality"
              :autosize="true"
              :deletable="deletable"
              @change="breakdownDimensionality"
              style="width: 20%;"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;
            <label>图表类型：</label>
            <Select
              v-model="breakdownSelectChartType"
              :datas="breakdownParamChartType"
              :autosize="true"
              :deletable="deletable"
              @change="breakdownChartType"
              style="width: 20%;"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <!-- 统计图组件 -->
          <component ref="breakdown" :is="breakdownChartName"></component>
        </div>
        <div v-if="selectedTab == 'module2'" class="table-wrapper">
          <div align="center" style="margin-top:20px;">
            <label>统计维度：</label>
            <Select
              v-model="expenseSelectDimensionality"
              :datas="expenseParamDimensionality"
              :autosize="true"
              :deletable="deletable"
              @change="expenseDimensionality"
              style="width: 20%;"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;
            <label>图表类型：</label>
            <Select
              v-model="expenseSelectChartType"
              :datas="expenseParamChartType"
              :autosize="true"
              :deletable="deletable"
              @change="expenseChartType"
              style="width: 20%;"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <!-- 统计图组件 -->
          <component ref="expense" :is="expenseChartName"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breakdownPieChart from './repair_statistics/breakdown_pie_chart';
import breakdownLineChart from './repair_statistics/breakdown_line_chart';
import breakdownHistogramChart from './repair_statistics/breakdown_histogram_chart';
import expensePieChart from './repair_statistics/expense_pie_chart';
import expenseLineChart from './repair_statistics/expense_line_chart';
import expenseHistogramChart from './repair_statistics/expense_histogram_chart';
export default {
  components: {
    breakdownPieChart, // 故障次数饼状图
    breakdownLineChart, // 故障次数折线图
    breakdownHistogramChart, // 故障次数柱状图
    expensePieChart, // 费用饼状图
    expenseLineChart, // 费用折线图
    expenseHistogramChart // 费用柱状图
  },
  data() {
    return {
      breakdownDimension: '',
      expenseDimension: '',
      breakdownChartName: 'breakdownPieChart',
      expenseChartName: 'expensePieChart',
      timeChartName: 'timePieChart',
      deletable: false, // 是否可删除选项内容
      // 故障次数维度选择
      breakdownSelectDimensionality: '0',
      breakdownParamDimensionality: [
        { title: '资产类别', key: '0' },
        { title: '资产状态', key: '1' },
        { title: '使用部门', key: '2' }
        // { title: '购置年份', key: '3' }
      ],
      // 故障次数图表类型选择
      breakdownSelectChartType: '饼状图',
      breakdownParamChartType: ['饼状图', '折线图', '柱状图'],
      // 费用维度选择
      expenseSelectDimensionality: '0',
      expenseParamDimensionality: [
        { title: '资产类别', key: '0' },
        { title: '资产状态', key: '1' },
        { title: '使用部门', key: '2' }
        // { title: '购置年份', key: '3' }
      ],
      // 费用图表类型选择
      expenseSelectChartType: '饼状图',
      expenseParamChartType: ['饼状图', '折线图', '柱状图'],
      datas: [],
      tabConfig: {
        module1: '故障次数',
        module2: '费用'
      },
      selectedTab: 'module1'
    };
  },
  mounted() {
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 故障次数维度切换
    breakdownDimensionality(data) {
      this.$refs.breakdown.getData(data.key);
      this.breakdownDimension = data.key;
    },
    // 故障次数图表类型切换
    breakdownChartType(data) {
      if (data.title == '饼状图') {
        this.breakdownChartName = 'breakdownPieChart';
      } else if (data.title == '折线图') {
        this.breakdownChartName = 'breakdownLineChart';
      } else {
        this.breakdownChartName = 'breakdownHistogramChart';
      }
      // this.$nextTick(() => {
      //   this.$refs.breakdown.getData(this.breakdownDimension);
      // });
      setTimeout(() => {
        this.$refs.breakdown.getData(this.breakdownDimension);
      }, 300);
    },
    // 费用维度切换
    expenseDimensionality(data) {
      this.$refs.expense.getData(data.key);
      this.expenseDimension = data.key;
    },
    // 费用图表类型切换
    expenseChartType(data) {
      if (data.title == '饼状图') {
        this.expenseChartName = 'expensePieChart';
      } else if (data.title == '折线图') {
        this.expenseChartName = 'expenseLineChart';
      } else {
        this.expenseChartName = 'expenseHistogramChart';
      }
      // this.$nextTick(() => {
      //   this.$refs.expense.getData(this.expenseDimension);
      // });
      setTimeout(() => {
        this.$refs.expense.getData(this.expenseDimension);
      }, 300);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 45px);
  overflow: auto;
}
</style>
