<template>
  <div>
    <!-- 统计图 -->
    <div id="time-pie-echarts" style="width:500px;height:450px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data() {
    return {};
  },
  mounted() {
    let timeChart = echarts.init(document.getElementById('time-pie-echarts'));
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '40%', // 设置饼状图大小
          center: ['50%', '50%'],
          data: [
            { value: 1000, name: '办公设备' },
            { value: 400, name: '计算机设备' },
            { value: 200, name: '家具用具' },
            { value: 200, name: '车辆' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    timeChart.setOption(option);
  },
  methods: {}
};
</script>
<style lang="less"></style>
