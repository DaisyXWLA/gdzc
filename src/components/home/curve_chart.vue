<template>
  <div>
    <!-- 曲线统计图 -->
    <div id="curve-echarts" style="height:260px;"></div>
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
    this.getAssetsValue();
  },
  methods: {
    // 获取近12个月购置价值变动曲线
    getAssetsValue() {
      this.loading = true;
      R.home.statisticsAssetsPrice(homeModel.dispose(this.homeData)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          for (let i = 0; i < resp.body.length; i++) {
            this.dataX.push(resp.body[i].name);
            this.dataY.push(resp.body[i].price);
          }
          this.lineChart();
        }
      });
    },
    lineChart() {
      let curveChart = echarts.init(document.getElementById('curve-echarts'));
      let option = {
        // 鼠标悬浮提示
        tooltip: {
          trigger: 'axis'
        },
        // x轴坐标配置
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: this.dataX
        },
        // y轴坐标配置
        yAxis: {
          name: '价值(元)',
          type: 'value',
          axisLabel: {
            // formatter: '{value}',
            formatter: function (value, index) {
              if (value >= 10000 && value < 100000000) {
                value = value / 10000 + '万';
              } else if (value >= 100000000) {
                value = value / 100000000 + '亿';
              }
              return value;
            }
          }
          // //设置分割线显示与否
          // splitLine: {
          //   show: false
          // }
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.dataY
          }
        ]
      };
      curveChart.setOption(option);
      window.addEventListener('resize', function () {
        curveChart.resize();
      });
    }
  }
};
</script>
<style lang="less"></style>
