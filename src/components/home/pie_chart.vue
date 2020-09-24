<template>
  <div>
    <!-- 饼状统计图 -->
    <div id="pie-echarts" style="height:260px;"></div>
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
      datas: [],
      loading: false
    };
  },
  mounted() {
    this.getAssetsCategoryPercentage();
  },
  methods: {
    // 获取资产分类占比
    getAssetsCategoryPercentage() {
      this.loading = true;
      R.home.assetsCategoryDistribution(homeModel.dispose(this.homeData)).then(resp => {
        if (resp.ok) {
          this.loading = false;
          this.datas = resp.body;
          this.pieChart();
        }
      });
    },
    pieChart() {
      let pieChart = echarts.init(document.getElementById('pie-echarts'));
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   right: 0,
        //   bottom: 10,
        //   textStyle: {
        //     fontSize: 12,
        //   },
        //   data: ['家具、用具、装具及动植物', '通用设备', '专用设备', '无形资产', '图书、档案', '文物和陈列品', '土地、房屋及构建物']
        // },
        color: ['#F9685B', '#895CFC', '#5285ED', '#02EED5', '#FFAC34', '#80ED99', '#F686BD'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '60%', // 设置饼状图大小
            center: ['50%', '50%'],
            label: {
              normal: {
                formatter: function (val) {
                  let moduleName=''
                  if (val.name.length > 10) {
                    moduleName = `${val.name} : \n${val.value} (${val.percent}%)`
                  }else{
                    moduleName = `${val.name} : ${val.value} (${val.percent}%)`
                  }
                  return moduleName
                }
              }
            },
            data: this.datas,
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
      pieChart.setOption(option);
      window.addEventListener('resize', function () {
        pieChart.resize();
      });
    }
  }
};
</script>
<style lang="less"></style>
