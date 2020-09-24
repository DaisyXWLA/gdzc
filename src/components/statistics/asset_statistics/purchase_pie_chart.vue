<template>
  <div>
    <!-- 统计图 -->
    <div id="purchase-echarts" style="height:600px"></div>
    <Button class="h-btn h-btn-s h-btn-blue export-btn" @click="exportExcel('score')">导出Excel</Button>
    <div id="score">
      <Table ref="table" :datas="datas">
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
    priceSelect: String
  },
  data() {
    return {
      statisticsList: statisticsModel.parse({}),
      datas: [],
      flag: this.priceSelect,
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
    this.getPrice();
  },
  methods: {
    getPrice(data) {
      if (typeof data === 'undefined') {
      } else {
        this.flag = data;
      }
      if (this.flag == '0') {
        R.Statistics.CategoryPrice(statisticsModel.dispose(this.statisticsList)).then(resp => {
          if (resp.ok) {
            for (let i = 0; i < resp.body.length; i++) {
              resp.body[i].value = parseFloat(resp.body[i].val).toFixed(2);
            }
            this.datas = resp.body;
            this.getPie();
          }
        });
      } else if (this.flag == '1') {
        R.Statistics.StautPrice(statisticsModel.dispose(this.statisticsList)).then(resp => {
          if (resp.ok) {
            for (let i = 0; i < resp.body.length; i++) {
              resp.body[i].value = parseFloat(resp.body[i].val).toFixed(2);
            }
            this.datas = resp.body;
            this.getPie();
          }
        });
      } else if (this.flag == '2') {
        R.Statistics.DepartmentPrice(statisticsModel.dispose(this.statisticsList)).then(resp => {
          if (resp.ok) {
            for (let i = 0; i < resp.body.length; i++) {
              resp.body[i].value = parseFloat(resp.body[i].val).toFixed(2);
            }
            this.datas = resp.body;
            this.getPie();
          }
        });
      } else {
        R.Statistics.YearPrice(statisticsModel.dispose(this.statisticsList)).then(resp => {
          if (resp.ok) {
            for (let i = 0; i < resp.body.length; i++) {
              resp.body[i].value = parseFloat(resp.body[i].val).toFixed(2);
            }
            this.datas = resp.body;
            this.getPie();
          }
        });
      }
    },
    getPie() {
      let dataName = [];
      console.log(this.datas);
      this.datas.forEach(e => {
        dataName.push(e.name);
      });
      let purchaseChart = echarts.init(document.getElementById('purchase-echarts'));
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
      purchaseChart.setOption(option);
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
.export-btn{
  margin: 15px 0;
}
</style>
