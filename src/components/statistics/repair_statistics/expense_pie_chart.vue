<template>
  <div>
    <!-- 统计图 -->
    <div id="expense-pie-echarts" style="height:600px;"></div>
    <Button class="h-btn h-btn-s h-btn-blue export-btn" @click="exportExcel('expensePie')">导出Excel</Button>
    <div id="expensePie">
      <Table ref="table" :datas="datas">
        <TableItem title="序号" prop="$serial" :width="40" align="center"></TableItem>
        <TableItem title="名称" prop="name" :width="100" align="right"></TableItem>
        <TableItem title="费用" prop="price" :width="100" align="right"></TableItem>
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
      if (data == undefined || data == '0') {
        this.repairStatisticsList.page = this.pagination.page;
        this.repairStatisticsList.size = this.pagination.size;
        R.repairStatistics.expenseAssetsCategory(repairStatisticsModel.dispose(this.repairStatisticsList)).then(resp => {
          if (resp.ok) {
            this.datas = resp.body.map((item, index) => {
              return Object.assign({}, { name: item.name, value: item.price });
            });
            this.pie();
          }
        });
      } else if (data == '1') {
        this.repairStatisticsList.page = this.pagination.page;
        this.repairStatisticsList.size = this.pagination.size;
        R.repairStatistics.expenseAssetsStatus(repairStatisticsModel.dispose(this.repairStatisticsList)).then(resp => {
          if (resp.ok) {
            this.datas = resp.body.map((item, index) => {
              return Object.assign({}, { name: item.name, value: item.price });
            });
            this.pie();
          }
        });
      } else if (data == '2') {
        this.repairStatisticsList.page = this.pagination.page;
        this.repairStatisticsList.size = this.pagination.size;
        R.repairStatistics.expenseAssetsDepartment(repairStatisticsModel.dispose(this.repairStatisticsList)).then(resp => {
          if (resp.ok) {
            this.datas = resp.body.map((item, index) => {
              return Object.assign({}, { name: item.name, value: item.price });
            });
            this.pie();
          }
        });
      } else if (data == '3') {
        this.repairStatisticsList.page = this.pagination.page;
        this.repairStatisticsList.size = this.pagination.size;
        R.repairStatistics.expenseAssetsYear(repairStatisticsModel.dispose(this.repairStatisticsList)).then(resp => {
          if (resp.ok) {
            this.datas = resp.body.map((item, index) => {
              return Object.assign({}, { name: item.name, value: item.price });
            });
            this.pie();
          }
        });
      }
    },
    pie() {
      let dataName = [];
      this.datas.forEach(e => {
        dataName.push(e.name);
      });
      let expenseChart = echarts.init(document.getElementById('expense-pie-echarts'));
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: dataName
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%', // 设置饼状图大小
            center: ['50%', '50%'],
            label: {
              normal: {
                formatter: '{b} : {c} ({d}%)'
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
      expenseChart.setOption(option);
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
