<template>
  <div>
    <!-- 柱状统计图 -->
    <div id="histogram-echarts" style="height:260px;"></div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import echarts from 'echarts';
import homeModel from 'model/home/home.js';
export default {
  data() {
    return {
      homeData: homeModel.parse({}),
      dataX: [],
      dataY: [],
      loading: false
    };
  },
  mounted() {
    this.getAssetsStatus();
  },
  methods: {
    // 获取资产状态分布数据
    getAssetsStatus() {
      this.loading = true;
      R.home.assetStatusDistribution(homeModel.dispose(this.homeData)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          for (let i = 0; i < resp.body.length; i++) {
            this.dataX.push(resp.body[i].name);
            this.dataY.push(resp.body[i].value);
          }
          this.histogram();
        }
      });
    },
    histogram() {
      let histogramChart = echarts.init(document.getElementById('histogram-echarts'));
      let option = {
        color: ['#8EC9EB'],
        // 鼠标悬浮提示
        tooltip: {
          trigger: 'axis'
        },
        // x轴坐标配置
        xAxis: [
          {
            type: 'category',
            data: this.dataX
          }
        ],
        // y轴坐标配置
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '60%',
            // 自定义颜色
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#A5D98E', '#87C4E3', '#F9675A', 'gray', '#AD93F1'];
                  return colorList[params.dataIndex];
                }
              }
            },
            data: this.dataY
          }
        ]
      };
      histogramChart.setOption(option);
      window.addEventListener('resize', function () {
        histogramChart.resize();
      });
    }
  }
};
</script>
<style lang="less"></style>
