<template>
  <div>
    <!-- 折线统计图 -->
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
      // 鼠标悬浮提示
      tooltip: {
        trigger: 'axis'
      },
      // x轴坐标配置
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['办公设备', '计算机设备', '家具用具', '车辆']
      },
      // y轴坐标配置
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} 个'
        }
      },
      series: [
        {
          type: 'line',
          stack: '总量',
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
