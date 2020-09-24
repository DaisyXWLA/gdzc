<style lang="less" scoped>
.search {
  position: relative;
  input,
  .h-select {
    margin: 5px 0;
  }
}
.asset-info-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.h-table-header /deep/ table {
  background: #f5f5f5;
}
.search-btn {
  line-height: 84px;
}
.h-page /deep/ .h-input {
  width: 40px;
}
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 30px - 30px - 113px);
  overflow: auto;
}
.title {
  background: #2d7bf4;
  color: #fff;
  margin-left: -15px;
  padding-left: 15px;
}
.modify {
  vertical-align: middle;
}
//下拉按钮样式
.h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
  border: 1px solid #8b04e4;
}
.printIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
@media screen and (max-width: 1366px) {
  /deep/ input[type='text'] {
    width: 17%;
  }
  .search .h-select {
    width: 17%;
  }
  /deep/ .h-btn {
    padding: 5px 8px;
  }
  .h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
    padding: 0 !important;
    border-radius: 4px;
    vertical-align: middle;
  }
  /deep/ .h-dropdowncustom-show-content {
    padding-right: 20px;
  }
}
@media screen and (min-width: 1366px) {
  /deep/ input[type='text'] {
    width: 17%;
  }
  .search .h-select {
    width: 17%;
  }
  /deep/ .h-btn {
    padding: 5px 8px;
  }
  .h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
    padding: 0 !important;
    border-radius: 4px;
    vertical-align: middle;
  }
  /deep/ .h-dropdowncustom-show-content {
    padding-right: 20px;
  }
}
@media screen and (min-width: 1440px) {
  /deep/ input[type='text'] {
    width: 12.5%;
  }
  .search .h-select {
    width: 12.5%;
  }
  /deep/ .h-dropdowncustom-show > .h-icon-down {
    right: 0;
  }
  .h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
    border-radius: 4px;
    vertical-align: middle;
  }
  /deep/ .h-dropdowncustom-show-content {
    padding-right: 14px;
  }
}
@media screen and (min-width: 1680px) {
  /deep/ input[type='text'] {
    width: 8%;
  }
  .search .h-select {
    width: 8%;
  }
  .h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
    border-radius: 4px;
    vertical-align: middle;
  }
  /deep/ .h-dropdowncustom-show-content {
    padding-right: 14px;
  }
}
@media screen and (min-width: 1920px) {
  /deep/ input[type='text'] {
    width: 11.5%;
  }
  .search .h-select {
    width: 11.5%;
  }
}
</style>

<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            资产编号：
            <input type="text" v-model="assetsList.newCode" v-wordlimit="50" />&nbsp;&nbsp;资产名称：
            <input type="text" v-model="assetsList.assetsName" v-wordlimit="50" />&nbsp;&nbsp;资产分类：
            <input
              type="text"
              v-model="assetsList.assetsCategoryName"
              v-wordlimit="50"
            />&nbsp;&nbsp;使用部门：
            <Select
              v-model="assetsList.useDepartment"
              :datas="departmentOption"
              :autosize="true"
              :filterable="true"
            ></Select>&nbsp;&nbsp;管理部门：
            <Select
              v-model="assetsList.administrativeDepartment"
              :datas="departmentOption"
              :autosize="true"
              :filterable="true"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用人：
            <Select
              v-model="assetsList.useId"
              :datas="userOption"
              :autosize="true"
              :filterable="true"
            ></Select>存放地点：
            <input type="text" v-model="assetsList.storageLocation" v-wordlimit="50" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品牌：
            <input
              type="text"
              v-model="assetsList.brand"
              v-wordlimit="50"
            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型号：
            <input
              type="text"
              v-model="assetsList.specificationModel"
              v-wordlimit="50"
            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态：
            <Select v-model="assetsList.assetsStatus" :datas="assetsStatusOption" :autosize="true"></Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" @click="print('right')">打印普通标签</Button>
            <Button color="yellow" @click="printKJS('right')">打印抗金属标签</Button>
            <div style="margin-top: 10px"></div>
            <Table ref="table" :datas="datas" :loading="isLoading" :height="tableHeight" checkbox>
              <TableItem title="序号" prop="$serial" align="center" :width="30"></TableItem>
              <TableItem title="资产编号" align="left" :width="100">
                <template slot-scope="{ data }">
                  <a href="#" @click="detail(data)">{{ data.newCode }}</a>
                </template>
              </TableItem>
              <TableItem title="财政编号" prop="oldCode" align="left" :width="120"></TableItem>
              <TableItem title="资产名称" align="left" :width="130">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.assetsName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="取得日期" prop="acquisitionTime" align="center" :width="120"></TableItem>
              <TableItem title="使用部门" align="left" :width="120">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.useDepartmentName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="管理部门" align="left" :width="120">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.administrativeDepartmentName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="资产分类" align="left" :width="150">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.assetsCategoryName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="品牌" align="left" :width="100">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.brand"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="型号" align="left" :width="80">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.specificationModel"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="单价" prop="listPrice" align="right" :width="60"></TableItem>
              <TableItem title="数量" prop="number" align="left" :width="60"></TableItem>
              <TableItem title="存放地点" align="left" :width="100">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.storageLocation"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="使用人" prop="username" align="left" :width="80"></TableItem>
              <TableItem title="资产状态" align="center" :width="60">
                <template slot-scope="{ data }">
                  <div v-if="data.assetsStatus == 0">
                    <button style="cursor:default" class="h-btn h-btn-xs h-btn-blue">闲置</button>
                  </div>
                  <div v-else-if="data.assetsStatus == 1">
                    <button style="cursor:default" class="h-btn h-btn-xs h-btn-red">故障</button>
                  </div>
                  <div v-else-if="data.assetsStatus == 2">
                    <button style="cursor:default" class="h-btn h-btn-xs h-btn-yellow">报废</button>
                  </div>
                  <div v-else-if="data.assetsStatus == 3">
                    <button style="cursor:default" class="h-btn h-btn-xs h-btn-green">在用</button>
                  </div>
                  <div v-else>
                    <button style="cursor:default" class="h-btn h-btn-xs h-btn-gray">缺失</button>
                  </div>
                </template>
              </TableItem>
              <!-- <TableItem title="操作" prop="operation" align="center" :width="150" fixed="right">
                <template slot-scope="{ data }">
                  <button
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(datas, data)"
                    v-has="'assetInformationupdate'"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <DropdownMenu
                    button
                    v-color:white
                    v-bg-color:#8b04e4
                    @click="trigger"
                    @show="getOneData(data)"
                    :datas="param"
                  >更多</DropdownMenu>
                </template>
              </TableItem>-->
              <div slot="empty">暂时无数据</div>
            </Table>
            <p v-height="2"></p>
            <div>
              <Pagination
                v-if="pagination.total>0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>
          </div>
        </div>
      </Cell>
    </Row>
    <Modal v-model="templateSelection" hasCloseIcon>
      <templateSelection @close="templateSelection=false"></templateSelection>
    </Modal>
    <Modal v-model="generalPrintModal">
      <div slot="header" class="title">打印普通标签</div>
      <div>
        <i class="h-icon-warn yellow-color printIcon"></i>确定打印？
      </div>
      <div slot="footer">
        <Button color="primary" @click="generalModalConfirm">确定</Button>
        <Button @click="generalModalClose">取消</Button>
      </div>
    </Modal>
    <Modal v-model="metalResistantPrintModal">
      <div slot="header" class="title">打印抗金属标签</div>
      <div>
        <i class="h-icon-warn yellow-color printIcon"></i>确定打印？
      </div>
      <div slot="footer">
        <Button color="primary" @click="metalResistantModalConfirm">确定</Button>
        <Button @click="metalResistantModalClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import printModel from 'model/Assets/Print';
import assetsModel from 'model/Assets/Assets';
import templateSelection from './template_selection';
import axios from 'axios';
export default {
  components: {
    templateSelection // 选择标签模板
  },
  data() {
    return {
      assetsList: assetsModel.parse({}),
      printList: printModel.parse({}),
      datas: [],
      postekPrintUrl: 'http://127.0.0.1:888/postek/print',
      printerName: 'POSTEK TX3r',
      departmentOption: [],
      userOption: [],
      assetsStatusOption: [
        { title: '闲置', key: '0' },
        { title: '故障', key: '1' },
        { title: '报废', key: '2' },
        { title: '在用', key: '3' },
        { title: '缺失', key: '4' }
      ],
      pagination: {
        page: 1,
        size: 20,
        total: 100
      },
      deleteBtn: false,
      oneData: {},
      param: [
        { title: '编辑', key: 'modify' },
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      tableHeight: 0,
      importExcel: false,
      exportAll: false,
      exportSection: false,
      templateSelection: false,
      isLoading: false,
      generalPrintModal: false,
      metalResistantPrintModal: false
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    this.getList();
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        if (e.keyCode === 13 && e.target.baseURI.match(/labelPrinting/)) {
          this.search();
        }
      };
    },
    // 根据筛选条件查询
    search() {
      this.getData();
      this.assetsList.page = this.pagination.page;
      this.assetsList.size = this.pagination.size;
    },
    // 重置筛选条件
    reset() {
      this.assetsList = assetsModel.parse({});
    },
    // 获取所有数据列表
    getData() {
      this.isLoading = true;
      this.assetsList.page = this.pagination.page;
      this.assetsList.size = this.pagination.size;
      R.Assets.AssetsList(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.ok) {
          // setTimeout(() => {
          this.isLoading = false;
          this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 201;
          this.datas = resp.body;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
          // }, 500);
        }
      });
    },
    getList() {
      R.pullDownList.department(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.ok) {
          this.departmentOption = resp.body;
        }
      });
      R.pullDownList.user(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.ok) {
          this.userOption = resp.body;
        }
      });
    },
    changePage() {
      this.getData();
    },
    close() {
      //   this.addUser = false;
      //   this.updateUser = false;
      //   this.reseteUser = false;
    },
    // 资产信息详情
    detail(data) {
      this.$router.push({
        path: '/assetsDetail/' + data.id + '/' + data.assetsCategory + '/' + data.assetsCategoryName,
        params: { Id: data.id, Category: data.assetsCategory, CategoryName: data.assetsCategoryName }
      });
    },
    // 打印
    print(place) {
      // 显示右侧打印标签市场;
      // this.$Modal({
      //   type: `drawer-${place}`,
      //   width: 400,
      //   component: {
      //     vue: templateSelection
      //   }
      // });

      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要打印标签的数据');
      } else {
        this.generalPrintModal = true;
        // this.$Confirm('确定打印？', '打印')
        //   .then(() => {
        //     //打印普通标签
        //     this.printLabel();
        //   })
        //   .catch(() => {});
      }
    },
    // 打印抗金属标签
    printKJS(place) {
      // 显示右侧打印标签市场;
      // this.$Modal({
      //   type: `drawer-${place}`,
      //   width: 400,
      //   component: {
      //     vue: templateSelection
      //   }
      // });

      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要打印标签的数据');
      } else {
        this.metalResistantPrintModal = true;
        // this.$Confirm('确定打印？', '打印')
        //   .then(() => {
        //     //打印普通标签
        //     this.printLabelForKJS();
        //   })
        //   .catch(() => {});
      }
    },
    generalModalConfirm() {
      this.printLabel();
    },
    generalModalClose() {
      this.generalPrintModal = false;
    },
    metalResistantModalConfirm() {
      this.printLabelForKJS();
    },
    metalResistantModalClose() {
      this.metalResistantPrintModal = false;
    },
    /*
     * 博思得RFID打印
     */

    // //Postek本地服务异步请求路径
    // var postekPrintUrl = "http://127.0.0.1:888/postek/print";
    // //打印机名称
    // var printerName = "POSTEK TX3r";

    /**
     * 普通RFID标签打印
     */
    printLabel() {
      // 参数
      var printparamsJsonArray = [];
      var data = {};
      data.printname = 'POSTEK TX3r';
      data.printlabel = 'thinLabelPrint';
      data.reqParam = '1';
      data.lang = 'zh';
      this.$refs.table.getSelection().forEach(v => {
        this.printLoad(printparamsJsonArray, 1300, 381, 63); // 初始化
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,173,42,0,方正FW童趣POP体 简,1,400,0,0,0,C2,资产名称：' + v.assetsName });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,221,42,0,方正FW童趣POP体 简,1,400,0,0,0,C3,建卡时间：' + v.acquisitionTime });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,269,42,0,方正FW童趣POP体 简,1,400,0,0,0,C4,财政编号：' + v.oldCode });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,317,42,0,方正FW童趣POP体 简,1,400,0,0,0,C5,资产编号：' + v.newCode });
        printparamsJsonArray.push({ PTK_DrawBar2D_QR: '725,180,145,145,0,5,2,8,0,' + this.FILEURL.printUrl + v.id }); // 二维码
        printparamsJsonArray.push({ PTK_RWRFIDLabel: '1,0,2,8,1,' + v.id }); // 写入rfid序列
        printparamsJsonArray.push({ PTK_EnableFLASH: '' });
        printparamsJsonArray.push({ PTK_PrintLabel: '1,1' });
        printparamsJsonArray.push({ ClosePort: '' });
      });
      data.printparams = JSON.stringify(printparamsJsonArray);
      this.doPost(data);
    },

    /**
     * 厚抗金属RFID标签打印
     */
    printLabelForKJS() {
      var printparamsJsonArray = [];
      var data = {};
      data.printname = 'POSTEK TX3r';
      data.printlabel = 'kjsLabelPrint';
      data.reqParam = '1';
      data.lang = 'zh';
      // 标签内容
      this.$refs.table.getSelection().forEach(v => {
        this.printLoad(printparamsJsonArray, 1300, 381, 63); // 初始化
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '410,90,84,0,【暖色君】微步体,5,400,0,0,0,C1,洛阳市人民检察院' });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '30,153,42,0,【暖色君】微步体,1,400,0,0,0,C2,资产名称：' + v.assetsName });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '30,201,42,0,【暖色君】微步体,1,400,0,0,0,C3,建卡时间：' + v.acquisitionTime });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '30,249,42,0,【暖色君】微步体,1,400,0,0,0,C4,财政编号：' + v.oldCode });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '30,297,42,0,【暖色君】微步体,1,400,0,0,0,C5,资产编号：' + v.newCode });
        printparamsJsonArray.push({ PTK_DrawBar2D_QR: '610,160,105,105,0,5,2,8,0,' + this.FILEURL.printUrl + v.id }); // 二维码
        printparamsJsonArray.push({ PTK_RWRFIDLabel: '1,0,2,8,1,' + v.id }); // 写入rfid序列
        printparamsJsonArray.push({ PTK_EnableFLASH: '' });
        printparamsJsonArray.push({ PTK_PrintLabel: '1,1' });
        printparamsJsonArray.push({ ClosePort: '' });
      });
      data.printparams = JSON.stringify(printparamsJsonArray);
      this.doPost(data);
    },

    // 发送打印请求
    doPost(data) {
      HeyUI.$Loading('打印中...');
      R.Print.print(data).then(resp => {
        if (resp.retval == '0') {
          HeyUI.$Loading.close();
          HeyUI.$Message.success('打印成功');
        } else {
          HeyUI.$Loading.close();
          HeyUI.$Message.error('打印失败');
        }
      });
    },

    /**
     * RFID标签打印
     * @param {type} o grid表格
     * @param {type} t type 1为薄标签，2厚标签
     * @returns
     */
    getRFIDPrintOfBSD(o, t) {
      var ids = o.getSelectedId();
      if (ids == null) {
        $.alert('本操作『至少』需要作用到一条记录上，请确定已经按要求选择了某个或某些记录！').title('温馨提示');
      } else {
        $(document.body).mask('数据提交中……');
        $.post(
          'rfid/getRFIDPrintByJson.htm',
          { assetsIds: ids },
          function(rfList) {
            if (rfList != null && rfList != '') {
              if (t == 1) {
                // type1是薄标签
                printLabel(rfList);
              } else {
                // type2 厚标签 目前就两种
                printLabelForKJS(rfList);
              }
              $(document.body).unmask();
            } else {
              $(document.body).unmask();
              $.alert('卡片打印出错，请重试！').title('错误提示');
            }
          },
          'json'
        );
      }
    },

    /**
     * 初始化打印机
     * 300dip 1mm = 12.7像素 dots
     * @param {type} printParams 参数
     * @param {type} w 宽度
     * @param {type} h 高度
     * @param {type} gapH 间隙高度
     */
    printLoad(printparamsJsonArray, w, h, gapH) {
      // 打开打印机
      printparamsJsonArray.push({ OpenPort: '255' });
      // 每次打印机任务之前，先清空打印机缓存中的数据内容。
      printparamsJsonArray.push({ PTK_ClearBuffer: '' });
      // 设置打印方向
      printparamsJsonArray.push({ PTK_SetDirection: 'B' });
      // 设置打印速度
      printparamsJsonArray.push({ PTK_SetPrintSpeed: '4' });
      // 设置打印黑度
      printparamsJsonArray.push({ PTK_SetDarkness: '10' });
      // 设置标签纸宽度
      printparamsJsonArray.push({ PTK_SetLabelWidth: w });
      // 设置标签纸 高度 间隙高度
      printparamsJsonArray.push({ PTK_SetLabelHeight: h + ',' + gapH + ',0,false' });
    }
  }
};
</script>
