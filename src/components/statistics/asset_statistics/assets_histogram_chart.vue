<template>
  <div>
    <!-- 柱状统计图 -->
    <div id="assets-line-echarts" style="height:600px;"></div>
    <Button class="h-btn h-btn-s h-btn-blue export-btn" @click="exportExcel('score')">导出Excel</Button>
    <div id="score">
      <Table ref="table" :datas="data">
        <TableItem title="序号" prop="$serial" :width="40" align="center"></TableItem>
        <TableItem title="名称" prop="name" :width="100" align="right"></TableItem>
        <TableItem title="数量" prop="value" :width="100" align="right"></TableItem>
        <div slot="empty">暂时无数据</div>
      </Table>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import statisticsModel from 'model/statistics/statistics';
export default {
  props: {
    assetsSelect: String
  },
  data() {
    return {
      statisticsList: statisticsModel.parse({}),
      xdata: [],
      ydata: [],
      data: [],
      flag: this.assetsSelect,
      // 导出excel
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
    this.selectGetData();
  },
  methods: {
    selectGetData(data) {
      if (typeof data === 'undefined') {
      } else {
        this.flag = data;
      }

      this.xdata = [];
      this.ydata = [];
      if (this.flag == '0') {
        R.Statistics.Category(statisticsModel.dispose(this.statisticsList)).then(resp => {
          if (resp.ok) {
            this.data = resp.body;
            for (let i = 0; i < this.data.length; i++) {
              this.xdata.push(this.data[i].name);
              this.ydata.push(this.data[i].value);
            }
            this.getHistogram();
          }
        });
      } else if (this.flag == '1') {
        R.Statistics.Staut(statisticsModel.dispose(this.statisticsList)).then(resp => {
          if (resp.ok) {
            this.data = resp.body;
            for (let i = 0; i < this.data.length; i++) {
              this.xdata.push(this.data[i].name);
              this.ydata.push(this.data[i].value);
            }
            this.getHistogram();
          }
        });
      } else if (this.flag == '2') {
        R.Statistics.Department(statisticsModel.dispose(this.statisticsList)).then(resp => {
          if (resp.ok) {
            this.data = resp.body;
            for (let i = 0; i < this.data.length; i++) {
              this.xdata.push(this.data[i].name);
              this.ydata.push(this.data[i].value);
            }
            this.getHistogram();
          }
        });
      } else {
        R.Statistics.Year(statisticsModel.dispose(this.statisticsList)).then(resp => {
          if (resp.ok) {
            this.data = resp.body;
            for (let i = 0; i < this.data.length; i++) {
              this.xdata.push(this.data[i].name);
              this.ydata.push(this.data[i].value);
            }
            this.getHistogram();
          }
        });
      }
      setTimeout(() => {
        this.getHistogram();
      }, 1000);
    },
    getHistogram() {
      let assetsLineChart = echarts.init(document.getElementById('assets-line-echarts'));
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
            data: this.xdata
          }
        ],
        // y轴坐标配置
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 个'
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
                  var colorList = [
                    '#F9675A',
                    '#A5D98E',
                    '#87C4E3',
                    '#AD93F1',
                    '#FFB6C1',
                    '#DC143C',
                    '#FFF0F5',
                    '#DB7093',
                    '#800000',
                    '#B22222',
                    '#A52A2A',
                    '#FF0000',
                    '#CD5C5C',
                    '#BC8F8F',
                    '#F08080',
                    '#FFFAFA',
                    '#FA8072',
                    '#FFE4E1',
                    '#FF6347',
                    '#FFA500',
                    '#FFEBCD',
                    '#F5DEB3',
                    '#FFEFD5',
                    '#FFD700',
                    '#EEE8AA',
                    '#BDB76B',
                    '#ADFF2F',
                    '#7CFC00',
                    '#006400',
                    '#90EE90',
                    '#40E0D0',
                    '#48D1CC',
                    '#40E0D0',
                    '#E1FFFF',
                    '#ADD8E6',
                    '#00BFFF',
                    '#87CEEB',
                    '#00FFFF',
                    '#008B8B',
                    '#000080',
                    '#0000FF',
                    '#191970'
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            data: this.ydata
          }
        ]
      };
      assetsLineChart.setOption(option);
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
    }
  }
};
</script>
<style lang="less" scoped>
.export-btn {
  margin: 15px 0;
}
</style>
