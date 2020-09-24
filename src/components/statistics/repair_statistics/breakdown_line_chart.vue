<template>
  <div>
    <!-- 折线统计图 -->
    <div id="breakdown-line-echarts" style="height:600px;"></div>
    <Button class="h-btn h-btn-s h-btn-blue export-btn" @click="exportExcel('breakdownLine')">导出Excel</Button>
    <div id="breakdownLine">
      <Table ref="table" :datas="datas">
        <TableItem title="序号" prop="$serial" :width="40" align="center"></TableItem>
        <TableItem title="名称" prop="name" :width="100" align="right"></TableItem>
        <TableItem title="次数" prop="value" :width="100" align="right"></TableItem>
        <div slot="empty">暂时无数据</div>
      </Table>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import repairStatisticsModel from 'model/repairStatistics/repairStatisticsModel';
export default {
  data() {
    return {
      repairStatisticsList: repairStatisticsModel.parse({}),
      datas: [],
      xdatas: [],
      ydatas: [],
      pagination: {
        page: 1,
        size: 10,
        total: 100
      },
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
    this.getData();
  },
  methods: {
    getData(data) {
      // this.datas = [];
      this.xdatas = [];
      this.ydatas = [];
      if (data == undefined || data == '0') {
        this.repairStatisticsList.page = this.pagination.page;
        this.repairStatisticsList.size = this.pagination.size;
        R.repairStatistics.breakdownAssetsCategory(repairStatisticsModel.dispose(this.repairStatisticsList)).then(resp => {
          // console.log(resp);
          if (resp.ok) {
            this.datas = resp.body;
            for (let i = 0; i < this.datas.length; i++) {
              this.xdatas.push(this.datas[i].name);
              this.ydatas.push(this.datas[i].value);
            }
            this.line();
          }
        });
      } else if (data == '1') {
        this.repairStatisticsList.page = this.pagination.page;
        this.repairStatisticsList.size = this.pagination.size;
        R.repairStatistics.breakdownAssetsStatus(repairStatisticsModel.dispose(this.repairStatisticsList)).then(resp => {
          if (resp.ok) {
            this.datas = resp.body;
            for (let i = 0; i < this.datas.length; i++) {
              this.xdatas.push(this.datas[i].name);
              this.ydatas.push(this.datas[i].value);
            }
            this.line();
          }
        });
      } else if (data == '2') {
        this.repairStatisticsList.page = this.pagination.page;
        this.repairStatisticsList.size = this.pagination.size;
        R.repairStatistics.breakdownAssetsDepartment(repairStatisticsModel.dispose(this.repairStatisticsList)).then(resp => {
          if (resp.ok) {
            this.datas = resp.body;
            for (let i = 0; i < this.datas.length; i++) {
              this.xdatas.push(this.datas[i].name);
              this.ydatas.push(this.datas[i].value);
            }
            this.line();
          }
        });
      } else if (data == '3') {
        this.repairStatisticsList.page = this.pagination.page;
        this.repairStatisticsList.size = this.pagination.size;
        R.repairStatistics.breakdownAssetsYear(repairStatisticsModel.dispose(this.repairStatisticsList)).then(resp => {
          if (resp.ok) {
            this.datas = resp.body;
            for (let i = 0; i < this.datas.length; i++) {
              this.xdatas.push(this.datas[i].name);
              this.ydatas.push(this.datas[i].value);
            }
            this.line();
          }
        });
      }
    },
    line() {
      let breakdownLineChart = echarts.init(document.getElementById('breakdown-line-echarts'));
      let option = {
        // 鼠标悬浮提示
        tooltip: {
          trigger: 'axis'
        },
        // x轴坐标配置
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xdatas
        },
        // y轴坐标配置
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 次'
          }
        },
        series: [
          {
            type: 'line',
            stack: '总量',
            data: this.ydatas
          }
        ]
      };
      breakdownLineChart.setOption(option);
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
