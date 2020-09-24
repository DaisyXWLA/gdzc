<template>
  <div>
    <!-- 统计图 -->
    <div id="myEcharts-line" style="height:500px;"></div>
    <Button class="h-btn h-btn-s h-btn-blue export-btn" @click="exportExcel('score')">导出Excel</Button>
    <div id="score">
      <Table ref="table" :datas="datas">
        <TableItem title="序号" prop="$serial" :width="40" align="center"></TableItem>
        <TableItem title="价值" prop="val" :width="100" align="right"></TableItem>
        <TableItem title="时间" prop="name" :width="100" align="right"></TableItem>
        <div slot="empty">暂时无数据</div>
      </Table>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import statisticsModel from 'model/statistics/statistics';
export default {
  data() {
    return {
      statisticsList: statisticsModel.parse({}),
      year: [],
      mon: [],
      data: [],
      datas: [], // 导出excel
      idTmr: '',
      tableToExcel: (function () {
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html><head><meta charset="UTF-8"></head><body><table  border="solid 1px">{table}</table></body></html>';
        var base64 = function (s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        };
        var format = function (s, c) {
          return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
          });
        };
        return function (table, name) {
          if (!table.nodeType) table = document.getElementById(table);
          var ctx = {
            worksheet: name || 'Worksheet',
            table: table.innerHTML
          };
          window.location.href = uri + base64(format(template, ctx));
        };
      })()
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      R.Statistics.linkList(statisticsModel.dispose(this.statisticsList)).then(resp => {
        if (resp.ok) {
          this.year = resp.body.year;
          this.mon = resp.body.mon;
          this.data = resp.body.list;
          let fristTables = [];
          this.getLink();
          for (let i = 0; i < this.mon.length; i++) {
            fristTables.push({ val: this.data[0].data[i], name: this.mon[i] });
          }
          this.datas = fristTables;
        }
      });
    },
    // 导出excel兼容主流浏览器
    getExplorer() {
      var explorer = window.navigator.userAgent;
      // ie
      if (explorer.indexOf('MSIE') >= 0) {
        return 'ie';
      }
      // firefox
      else if (explorer.indexOf('Firefox') >= 0) {
        return 'Firefox';
      }
      // Chrome
      else if (explorer.indexOf('Chrome') >= 0) {
        return 'Chrome';
      }
      // Opera
      else if (explorer.indexOf('Opera') >= 0) {
        return 'Opera';
      }
      // Safari
      else if (explorer.indexOf('Safari') >= 0) {
        return 'Safari';
      }
    },
    exportExcel(tableid) {
      if (this.getExplorer() == 'ie') {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject('Excel.Application');
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand('Copy');
        xlsheet.Paste();
        oXL.Visible = true;
        try {
          var fname = oXL.Application.GetSaveAsFilename('Excel.xls', 'Excel Spreadsheets (*.xls), *.xls');
        } catch (e) {
          print('Nested catch caught ' + e);
        } finally {
          oWB.SaveAs(fname);
          oWB.Close((savechanges = false));
          oXL.Quit();
          oXL = null;
          this.idTmr = window.setInterval('this.Cleanup();', 1);
        }
      } else {
        this.tableToExcel(tableid);
      }
    },
    Cleanup() {
      window.clearInterval(this.idTmr);
      CollectGarbage();
    },
    getLink() {
      let lineChart = echarts.init(document.getElementById('myEcharts-line'));
      let xAxisMonthData = this.mon;
      let xAxisYearData = this.year;
      let tableData = this.data;
      let tables = [];
      let tableDatas = [];
      // 自适应窗口
      window.addEventListener('resize', () => {
        lineChart.resize();
      });
      let option = {
        // 鼠标悬浮提示
        tooltip: {
          trigger: 'axis'
        },
        // 图例配置
        legend: {
          orient: 'vertical',
          y: 'top',
          top: '10%',
          left: 'left',
          textStyle: {
            color: '#666'
          },
          selectedMode: 'single' // 设置图表单选
        },
        // 图表位置
        grid: {
          left: '20%'
        },
        // x轴坐标配置
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisMonthData
        },
        // y轴坐标配置
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} K'
          }
        },
        series: this.data
      };
      var vm = this;
      // 修改x轴坐标单位
      lineChart.on('legendselectchanged', function (obj) {
        let option = lineChart.getOption();
        if (obj.name.indexOf('月') == -1) {
          option.xAxis[0].data = xAxisYearData;
        } else {
          option.xAxis[0].data = xAxisMonthData;
        }
        lineChart.setOption(option);
        tableData.forEach(e => {
          if (e.name == obj.name) {
            tables = e.data;
          }
        });
        tableDatas = [];
        for (let i = 0; i < tables.length; i++) {
          if (tables.length > 3) {
            tableDatas.push({ val: tables[i], name: xAxisMonthData[i] });
          } else {
            tableDatas.push({ val: tables[i], name: xAxisYearData[i] });
          }
        }
        vm.datas = tableDatas;
      });

      lineChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.export-btn{
  margin: 15px 0;
}
</style>
