<template>
  <div class="table-basic-vue frame-page">
    <div class="h-panel">
      <div class="h-panel-body">
        <Tabs :datas="tabConfig" class-name="h-tabs-card" v-model="selectedTab"></Tabs>
        <div v-if="selectedTab == 'module1'" class="table-wrapper">
          <div align="center" style="margin-top:20px;">
            <label>统计维度：</label>
            <Select
              v-model="assetsSelectDimensionality"
              :datas="assetsParamDimensionality"
              :autosize="true"
              :deletable="deletable"
              @change="assetsDimensionality"
              style="width: 20%;"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;
            <label>图表类型：</label>
            <Select
              v-model="assetsSelectChartType"
              :datas="assetsParamChartType"
              :autosize="true"
              :deletable="deletable"
              @change="assetsChartType"
              style="width: 20%;"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <!-- 统计图组件 -->
          <component
            ref="assetsNumber"
            :is="assetsChartName"
            :assetsSelect="assetsSelectDimensionality"
          ></component>
        </div>
        <div v-if="selectedTab == 'module2'" class="table-wrapper">
          <div align="center" style="margin-top:20px;">
            <label>统计维度：</label>
            <Select
              v-model="purchaseSelectDimensionality"
              :datas="purchaseParamDimensionality"
              :autosize="true"
              :deletable="deletable"
              @change="purchaseDimensionality"
              style="width: 20%;"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;
            <label>图表类型：</label>
            <Select
              v-model="purchaseSelectChartType"
              :datas="purchaseParamChartType"
              :autosize="true"
              :deletable="deletable"
              @change="purchaseChartType"
              style="width: 20%;"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <!-- 统计图组件 -->
          <component
            :is="purchaseChartName"
            ref="assetsPrice"
            :priceSelect="purchaseSelectDimensionality"
          ></component>
        </div>
        <div v-if="selectedTab == 'module3'" class="table-wrapper">
          <lineChart></lineChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import assetsPieChart from './asset_statistics/assets_pie_chart';
import assetsLineChart from './asset_statistics/assets_line_chart';
import assetsHistogramChart from './asset_statistics/assets_histogram_chart';
import purchasePieChart from './asset_statistics/purchase_pie_chart';
import purchaseLineChart from './asset_statistics/purchase_line_chart';
import purchaseHistogramChart from './asset_statistics/purchase_histogram_chart';
import lineChart from './asset_statistics/line_chart';
export default {
  components: {
    assetsPieChart, // 资产数量饼状图
    assetsLineChart, // 资产数量折线图
    assetsHistogramChart, // 资产数量柱状图
    purchasePieChart, // 购置金额饼状图
    purchaseLineChart, // 购置金额折线图
    purchaseHistogramChart, // 购置金额柱状图
    lineChart // 价值变动曲线
  },
  data() {
    return {
      assetsChartName: 'assetsPieChart',
      purchaseChartName: 'purchasePieChart',
      deletable: false, // 是否可删除选项内容
      // 资产数量维度选择
      assetsSelectDimensionality: '0',
      assetsParamDimensionality: [
        { title: '资产类别', key: '0' },
        { title: '资产状态', key: '1' },
        { title: '使用部门', key: '2' },
        { title: '购置年份', key: '3' }
      ],
      tabConfig: {
        module1: '资产数量',
        module2: '购置金额',
        module3: '价值变动曲线'
      },
      show: false,
      selectedTab: 'module1',
      // 资产数量图表类型选择
      assetsSelectChartType: '饼状图',
      assetsParamChartType: ['饼状图', '折线图', '柱状图'],
      // 购置金额维度选择
      purchaseSelectDimensionality: '0',
      purchaseParamDimensionality: [
        { title: '资产类别', key: '0' },
        { title: '资产状态', key: '1' },
        { title: '使用部门', key: '2' },
        { title: '购置年份', key: '3' }
      ],
      // 购置金额图标类型选择
      purchaseSelectChartType: '饼状图',
      purchaseParamChartType: ['饼状图', '折线图', '柱状图'],
      datas: []
    };
  },
  mounted() {
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    // 资产数量统计维度切换
    assetsDimensionality(data) {
      this.$refs.assetsNumber.selectGetData(data.key);
    },
    // 资产数量统计图表类型切换
    assetsChartType(data) {
      if (data.title == '饼状图') {
        this.assetsChartName = 'assetsPieChart';
      } else if (data.title == '折线图') {
        this.assetsChartName = 'assetsLineChart';
      } else {
        this.assetsChartName = 'assetsHistogramChart';
      }
      setTimeout(() => {
        this.$refs.assetsNumber.selectGetData();
      }, 1000);
    },
    // 购置金额统计维度切换
    purchaseDimensionality(data) {
      this.$refs.assetsPrice.getPrice(data.key);
    },
    // 购置金额统计图表类型切换
    purchaseChartType(data) {
      if (data.title == '饼状图') {
        this.purchaseChartName = 'purchasePieChart';
      } else if (data.title == '折线图') {
        this.purchaseChartName = 'purchaseLineChart';
      } else {
        this.purchaseChartName = 'purchaseHistogramChart';
      }
      setTimeout(() => {
        this.$refs.assetsPrice.getPrice();
      }, 1000);
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
