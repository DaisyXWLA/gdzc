<template>
  <div>
    <!-- 柱状统计图 -->
    <div id="time-line-echarts" style="height:450px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {};
  },
  mounted() {
    let timeLineChart = echarts.init(document.getElementById('time-line-echarts'));
    let option = {
      color: ['#8EC9EB'],
      // 鼠标悬浮提示
      tooltip: {
        trigger: 'axis'
      },
      // x轴坐标配置
      xAxis: [{
        type: 'category',
        data: ['办公设备', '计算机设备', '家具用具', '车辆']
      }],
      // y轴坐标配置
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value} 个'
        }
      }],
      series: [
        {
          type: 'bar',
          barWidth: '60%',
          // 自定义颜色
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList = ['#F9675A', '#A5D98E', '#87C4E3', '#AD93F1'];
                return colorList[params.dataIndex];
              }
            }
          },
          data: [120, 132, 101, 134, 90, 230]
        }
      ]
    };
    timeLineChart.setOption(option);
  },
  methods: {}
};
</script>
<style lang="less"></style>
