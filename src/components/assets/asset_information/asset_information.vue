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
/deep/ .h-dropdowncustom.h-btn {
  border-color: #ab51e6;
  padding: 5px 8px;
  vertical-align: top;
  &:hover {
    border-color: rgba(171, 81, 230, 0.8) !important;
    background-color: rgba(171, 81, 230, 0.8) !important;
  }
}
//导入下拉按钮
/deep/ .import-dropdown.h-btn {
  border-color: #f0a024;
  padding: 5px 8px;
  vertical-align: top;
  &:hover {
    border-color: rgba(240, 160, 36, 0.8) !important;
    background-color: rgba(240, 160, 36, 0.8) !important;
  }
}
//导出下拉按钮
/deep/ .export-dropdown.h-btn {
  border-color: #0ac590;
  padding: 5px 8px;
  vertical-align: top;
  &:hover {
    border-color: rgba(10,197,144,0.8)!important;
    background-color: rgba(10,197,144,0.8)!important;
  }
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
/deep/ .h-datetime-show .h-input {
  width: 100%;
}
input[type='text'] {
  vertical-align: middle;
}
@media screen and (max-width: 1440px) {
  /deep/ .h-panel-body {
    height: calc(100vh - 60px - 45px - 30px - 30px - 155px);
    overflow: auto;
  }
}
@media screen and (max-width: 1366px) {
  /deep/ input[type='text'] {
    width: 12.2%;
  }
  .search .h-select {
    width: 12.2%;
  }
  .space-two {
    padding-right: 3.15%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.3%;
  }
  .storage-location {
    padding-right: 0.5%;
  }
  .label-status {
    padding-right: 0;
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
  /deep/ .h-datetime {
    width: 12.2%;
  }
}
@media screen and (min-width: 1366px) {
  /deep/ input[type='text'] {
    width: 12.2%;
  }
  .search .h-select {
    width: 12.2%;
  }
  .space-two {
    padding-right: 3.15%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.8%;
  }
  .storage-location {
    padding-right: 0.5%;
  }
  .label-status {
    padding-right: 0;
  }
  .brand {
    padding-right: 2.6%;
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
  /deep/ .h-datetime {
    width: 12.2%;
  }
}
@media screen and (min-width: 1440px) {
  /deep/ input[type='text'] {
    width: 12.8%;
  }
  .search .h-select {
    width: 12.8%;
  }
  .space-two {
    padding-right: 3%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.8%;
  }
  .storage-location {
    padding-right: 0.5%;
  }
  .label-status {
    padding-right: 0;
  }
  .brand {
    padding-right: 2.4%;
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
  /deep/ .h-panel-body {
    height: calc(100vh - 60px - 45px - 30px - 30px - 155px);
    overflow: auto;
  }
  /deep/ .h-datetime {
    width: 12.8%;
  }
}
@media screen and (min-width: 1680px) {
  /deep/ input[type='text'] {
    width: 10.5%;
  }
  .search .h-select {
    width: 10.5%;
  }
  .space-two {
    padding-right: 2.55%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.5%;
  }
  .storage-location {
    padding-right: 0;
  }
  .h-dropdowncustom.h-btn /deep/ .h-dropdowncustom-show {
    border-radius: 4px;
    vertical-align: middle;
  }
  /deep/ .h-dropdowncustom-show-content {
    padding-right: 14px;
  }
  /deep/ .h-datetime {
    width: 10.5%;
  }
}
@media screen and (min-width: 1920px) {
  /deep/ input[type='text'] {
    width: 11.3%;
  }
  .search .h-select {
    width: 11.3%;
  }
  .space-two {
    padding-right: 2.25%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.4%;
  }
  .storage-location {
    padding-right: 0;
  }
  /deep/ .h-datetime {
    width: 11.3%;
  }
}
@media screen and (min-width: 2048px) {
  /deep/ input[type='text'] {
    width: 11.6%;
  }
  .search .h-select {
    width: 11.6%;
  }
  .space-two {
    padding-right: 2.1%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.3%;
  }
  .storage-location {
    padding-right: 0.5%;
  }
  /deep/ .h-datetime {
    width: 11.6%;
  }
}
@media screen and (min-width: 2560px) {
  /deep/ input[type='text'] {
    width: 12.65%;
  }
  .search .h-select {
    width: 12.65%;
  }
  .space-two {
    padding-right: 1.75%;
  }
  .space-four {
    padding-right: 0.5%;
  }
  .user {
    padding-left: 1.2%;
  }
  .storage-location {
    padding-right: 0;
  }
  /deep/ .h-datetime {
    width: 12.65%;
  }
}
// 卡片样式
.card {
  width: 794px;
  height: 561px;
  padding: 30px 40px;
  box-sizing: border-box;
  .card-con {
    .card-number {
      .card-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }
      .list {
        margin-top: 30px;
        .list-con {
          table {
            border-collapse: collapse;
            td {
              border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 40px;
              line-height: 40px;
              &:first-child {
                width: 6%;
              }
              &:nth-child(2) {
                width: 10%;
                text-align: center;
              }
              &:nth-child(3) {
                width: 6%;
              }
              &:nth-child(4) {
                width: 10%;
                text-align: center;
              }
            }
            .overflow-hidden {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .service-condition {
      margin-top: 20px;
      table {
        border-collapse: collapse;
        .service-condition-title {
          td {
            border: 1px solid #666;
            text-align: right;
            padding: 5px 12px;
            box-sizing: border-box;
            width: 1%;
          }
        }
        .service-condition-con {
          &:first-child {
            td {
              padding: 5px 10px;
            }
          }
          td {
            border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;
            height: 40px;
            &:first-child {
              width: 6%;
              font-size: 12px;
              padding: 0 8px;
            }
            &:nth-child(2) {
              width: 10%;
            }
            &:nth-child(3) {
              width: 10%;
            }
            &:nth-child(4) {
              width: 10%;
            }
            &:nth-child(5) {
              width: 10%;
            }
          }
        }
      }
    }
  }
}
.h-datetime-range /deep/ .h-datetime-show {
  min-width: 11.3%;
}
</style>
<style lang="less">
//tooltip气泡提示框最大高度限制
.h-tooltip .h-tooltip-inner-content {
  max-height: 230px;
  overflow: auto;
}
</style>
<template>
  <div class="table-basic-vue frame-page">
    <Row :space="12">
      <Cell>
        <div class="h-panel">
          <div class="h-panel-bar search">
            资产编号：
            <input type="text" v-model="assetsList.newCode" v-wordlimit="50" />
            <span class="space-four"></span>财政编号：
            <input type="text" v-model="assetsList.oldCode" v-wordlimit="50" />
            <span class="space-four"></span>资产分类：
            <input type="text" v-model="assetsList.assetsCategoryName" v-wordlimit="50" />
            <span class="space-four"></span>资产名称：
            <input type="text" v-model="assetsList.assetsName" v-wordlimit="50" />
            <span class="space-two"></span>状态：
            <Select v-model="assetsList.assetsStatus" :datas="assetsStatusOption" :autosize="true"></Select>
            <span class="space-four label-status"></span>贴签状态：
            <Select v-model="assetsList.labelPrintNumber" :datas="labelOption" :autosize="true"></Select>
            <span class="storage-location"></span>使用部门：
            <Select
              v-model="assetsList.useDepartment"
              :datas="departmentOption"
              :autosize="true"
              :filterable="true"
            ></Select>
            <span class="space-four"></span>管理部门：
            <Select
              v-model="assetsList.administrativeDepartment"
              :datas="departmentOption"
              :autosize="true"
              :filterable="true"
            ></Select>
            <span class="user">使用人：</span>
            <Select
              v-model="assetsList.useId"
              :datas="userOption"
              :autosize="true"
              :filterable="true"
            ></Select>
            <span class="space-four"></span>取得日期：
            <!-- <DatePicker v-model="assetsList.acquisitionTime" class="acquisition-time"></DatePicker> -->
            <DateRangePicker
              v-model="days"
              @confirm="changeDate"
              placeholder="开始 - 结束"
              class="acquisition-time"
            ></DateRangePicker>
            <span class="space-two brand"></span>品牌：
            <input type="text" v-model="assetsList.brand" />
            <span class="space-two"></span>型号：
            <input type="text" v-model="assetsList.specificationModel" v-wordlimit="50" />
            <span class="storage-location"></span>存放地点：
            <input type="text" v-model="assetsList.storageLocation" v-wordlimit="50" />
            <span class="space-two"></span>价值：
            <input
              type="text"
              v-model="assetsList.price"
              v-wordlimit="50"
              oninput="value=value.replace(/[^\d]/g,'')"
            />
            <!-- <NumberInput v-model="assetsList.price" :precision="2"></NumberInput> -->
            <span class="space-four"></span>上报财政：
            <Select
              v-model="assetsList.isReport"
              :datas="isReportOption"
              :autosize="true"
              :filterable="true"
            ></Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button color="green" :circle="true" icon="h-icon-search" @click="search">搜索</Button>
            <Button color="yellow" :circle="true" icon="h-icon-refresh" @click="reset">重置</Button>
          </div>
        </div>
      </Cell>
      <Cell>
        <div class="h-panel">
          <div class="h-panel-body">
            <Button color="blue" icon="h-icon-plus" @click="add" v-has="'assetInformationadd'">新增</Button>
            <!-- <Button
              v-bg-color:#F0A024
              v-color:white
              style="border:1px solid #F0A024"
              icon="h-icon-inbox"
              @click="iptExcel"
            >导入</Button>
            <Button
              v-bg-color:#F0A024
              v-color:white
              style="border:1px solid #F0A024"
              icon="h-icon-inbox"
              @click="iptFinanceAssets"
            >导入财政资产</Button>-->
            <DropdownMenu
              button
              class="import-dropdown"
              v-color:white
              v-bg-color:#F0A024
              @click="importTrigger"
              :datas="importBtnParam"
            >导入</DropdownMenu>
            <DropdownMenu
              button
              class="export-dropdown"
              v-color:white
              v-bg-color:#0ac590
              @click="exportTrigger"
              :datas="exportBtnParam"
            >导出</DropdownMenu>
            <!-- <Button color="green" icon="h-icon-outbox" @click="exp">导出</Button> -->
            <DropdownMenu
              class="print-dropdown"
              v-show="printBtn"
              button
              v-color:white
              v-bg-color:#ab51e6
              @click="printTrigger"
              :datas="printBtnParam"
            >打印</DropdownMenu>
            <DropdownMenu
              v-show="changeLabelState"
              button
              v-color:white
              v-bg-color:#ab51e6
              @click="stateBatch"
              :datas="labelOption"
            >贴签状态</DropdownMenu>
            <Button
              v-show="deleteBtn"
              color="red"
              icon="h-icon-trash"
              @click="remove"
              v-has="'assetInformationdelete'"
            >删除</Button>
            <!-- <DropdownMenu
              class="print-dropdown"
              v-show="printBtn"
              button
              v-color:white
              v-bg-color:#ab51e6
              @click="cacheTrigger"
              :datas="cacheBtnParam"
            >缓存打印</DropdownMenu>
            <DropdownMenu
              class="print-dropdown"
              v-show="printBtn"
              button
              v-color:white
              v-bg-color:#ab51e6
              @click="printCaheTrigger"
              :datas="printCacheBtnParam"
            >打印缓存</DropdownMenu>-->
            <div style="margin-top: 10px"></div>
            <Table
              ref="table"
              :datas="datas"
              :loading="isLoading"
              :height="tableHeight"
              @select="select"
              checkbox
            >
              <TableItem title="序号" prop="$serial" align="center" :width="30" fixed="left"></TableItem>
              <TableItem title="资产编号" align="left" :width="150" fixed="left">
                <template slot-scope="{ data }">
                  <a href="#" @click="detail(data)">{{ data.newCode }}</a>
                </template>
              </TableItem>
              <TableItem title="资产名称" prop="assetsName" align="left" :width="150" fixed="left" sort="auto">
                <!-- <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.assetsName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template> -->
              </TableItem>
              <TableItem title="财政编号" prop="oldCode" align="left" :width="150" sort="auto"></TableItem>
              <TableItem title="使用部门" prop="useDepartmentName" align="left" :width="150" sort="auto">
                <!-- <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.useDepartmentName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template> -->
              </TableItem>
              <TableItem title="管理部门" prop="administrativeDepartmentName" align="left" :width="150" sort="auto">
                <!-- <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.administrativeDepartmentName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template> -->
              </TableItem>
              <TableItem title="使用人" prop="username" align="left" :width="80" sort="auto"></TableItem>
              <TableItem title="资产分类" prop="assetsCategoryName" align="left" :width="180" sort="auto">
                <!-- <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.assetsCategoryName"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template> -->
              </TableItem>
              <TableItem title="品牌" prop="brand" align="left" :width="100" sort="auto">
                <!-- <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.brand"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template> -->
              </TableItem>
              <TableItem title="型号" prop="specificationMadel" align="left" :width="80" sort="auto">
                <!-- <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.specificationModel"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template> -->
              </TableItem>
              <TableItem title="单价" prop="listPrice" align="right" :width="60" sort="auto"></TableItem>
              <TableItem title="数量" prop="number" align="left" :width="60" sort="auto"></TableItem>
              <TableItem title="存放地点" align="left" :width="150">
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
              <TableItem title="取得日期" prop="acquisitionTime" align="center" :width="120" sort="auto"></TableItem>
              <TableItem title="备注" align="left" :width="200">
                <template slot-scope="{ data }">
                  <TextEllipsis
                    :text="data.remarks"
                    more="..."
                    :height="20"
                    useTooltip
                    tooltipTheme="white"
                  ></TextEllipsis>
                </template>
              </TableItem>
              <TableItem title="资产状态" align="center" :width="80">
                <template slot-scope="{ data }">
                  <div v-if="data.assetsStatus == 0">
                    <span class="h-tag h-tag-blue">闲置</span>
                  </div>
                  <div v-else-if="data.assetsStatus == 1">
                    <span class="h-tag h-tag-red">故障</span>
                  </div>
                  <div v-else-if="data.assetsStatus == 2">
                    <span class="h-tag h-tag-yellow">报废</span>
                  </div>
                  <div v-else-if="data.assetsStatus == 3">
                    <span class="h-tag h-tag-green">在用</span>
                  </div>
                  <div v-else>
                    <span class="h-tag h-tag-gray">缺失</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="上报财政" align="center" :width="80">
                <template slot-scope="{ data }">
                  <div v-if="data.isReport == 0">
                    <span class="h-tag h-tag-blue">是</span>
                  </div>
                  <div v-else-if="data.isReport == 1">
                    <span class="h-tag h-tag-red">否</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="贴签状态" align="center" :width="120">
                <template slot-scope="{ data }">
                  <div v-if="data.labelPrintNumber == 0">
                    <span class="h-tag h-tag-blue">已贴签</span>
                  </div>
                  <div v-else-if="data.labelPrintNumber == 1">
                    <span class="h-tag h-tag-red">有实物未贴签</span>
                  </div>
                  <div v-else-if="data.labelPrintNumber == 2">
                    <span class="h-tag h-tag-yellow">无实物</span>
                  </div>
                </template>
              </TableItem>
              <TableItem title="操作" prop="operation" align="center" :width="150" fixed="right">
                <template slot-scope="{ data }">
                  <button
                    class="h-btn h-btn-s h-btn-blue modify"
                    @click="modify(datas, data)"
                    v-has="'assetInformationupdate'"
                  >
                    <i class="h-icon-edit"></i>
                    编辑
                  </button>
                  <!-- <DropdownMenu
                    button
                    v-color:white
                    v-bg-color:#ab51e6
                    @click="state"
                    @show="getStateData(data)"
                    :datas="labelOption"
                  >贴签状态</DropdownMenu>-->
                  <DropdownMenu
                    button
                    v-color:white
                    v-bg-color:#ab51e6
                    @click="trigger"
                    @show="getOneData(data)"
                    :datas="param"
                  >更多</DropdownMenu>
                </template>
              </TableItem>
              <div slot="empty">暂时无数据</div>
            </Table>
            <p v-height="2"></p>
            <div>
              <Pagination
                v-if="pagination.total > 0"
                align="right"
                v-model="pagination"
                @change="changePage"
              />
            </div>
          </div>
        </div>
      </Cell>
    </Row>
    <div
      class="card"
      v-if="cardDatas.length == 1"
      id="card"
      style="display:none;text-align:center;"
    >
      <div class="card-con">
        <div class="card-number">
          <div
            class="card-title"
            style="font-size: 24px;
        font-weight: bold;
        text-align: center;"
          >
            <p>固定资产卡片</p>
          </div>
          <div class="list">
            <!-- <div class="list" style="margin-top: 30px;"> -->
            <p class="list-title">
              <span>卡片编号：</span>
              <span>{{cardDatas[0].oldCode}}</span>
            </p>
            <div class="list-con">
              <table style="table-layout:fixed;width:720px;border-collapse:collapse;">
                <tr>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >资产编号</td>
                  <td
                    style="border: 1px solid #666;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;
                text-align: center;"
                  >{{cardDatas[0].newCode}}</td>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >固定资产名称</td>
                  <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
              text-align: center;
              word-break:keep-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                  >{{cardDatas[0].assetsName}}</td>
                </tr>
                <tr>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >类别名称</td>
                  <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;
              text-align: center;
              word-break:keep-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                  >{{cardDatas[0].assetsCategoryName}}</td>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >规格、型号</td>
                  <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
              text-align: center;
              word-break:keep-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                  >{{cardDatas[0].specificationModel}}</td>
                </tr>
                <tr>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >增加方式</td>
                  <td
                    style="border: 1px solid #666;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;
                text-align: center;"
                  >{{cardDatas[0].procurementOrganizationForm}}</td>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >原值</td>
                  <td
                    style="border: 1px solid #666;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
                text-align: center;"
                  >
                    <span v-if="cardDatas[0].unitPrice == undefined"></span>
                    <span v-else>{{cardDatas[0].unitPrice}}</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >使用状况</td>
                  <td
                    style="border: 1px solid #666;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;
                text-align: center;"
                  >{{cardDatas[0].assetsStatus}}</td>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >配置、备注</td>
                  <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
                text-align: center;
                word-break:keep-all;
                white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                    class="overflow-hidden"
                    v-html="cardDatas[0].remarks"
                  ></td>
                  <!-- <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
                text-align: center;
                word-break:keep-all;
                white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                    class="overflow-hidden"
                  >{{cardDatas[0].remarks}}</td>-->
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="service-condition" style="margin-top: 20px;">
          <table style="border-collapse:collapse;width:720px;">
            <tr class="service-condition-title">
              <td
                rowspan="7"
                style="border: 1px solid #666;
            text-align: right;
            padding: 5px 8px;
            box-sizing: border-box;
            width: 30px;"
              >
                使
                <br />用
                <br />、
                <br />变
                <br />更
                <br />情
                <br />况
                <br />
              </td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              >使用或变更日期</td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              >使用人签名</td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              >使用部门</td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              >存放地点</td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              >变动原因</td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="card" v-else id="card" style="display:none;text-align:center;">
      <div class="card-con" v-for="(item,i ) in cardDatas" :key="i">
        <div class="card-number">
          <div
            class="card-title"
            style="font-size: 24px;
        font-weight: bold;
        text-align: center;"
          >
            <p v-if="i%2!=0" style="padding-top:60px;box-sizing:border-box;">固定资产卡片</p>
            <p v-else>固定资产卡片</p>
          </div>
          <div class="list">
            <!-- <div class="list" style="margin-top: 30px;"> -->
            <p class="list-title">
              <span>卡片编号：</span>
              <span>{{cardDatas[i].oldCode}}</span>
            </p>
            <div class="list-con">
              <table style="table-layout:fixed;width:720px;border-collapse:collapse;">
                <tr>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >资产编号</td>
                  <td
                    style="border: 1px solid #666;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;
                text-align: center;"
                  >{{cardDatas[i].newCode}}</td>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >固定资产名称</td>
                  <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
              text-align: center;
              word-break:keep-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                  >{{cardDatas[i].assetsName}}</td>
                </tr>
                <tr>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >类别名称</td>
                  <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;
              text-align: center;
              word-break:keep-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                  >{{cardDatas[i].assetsCategoryName}}</td>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >规格、型号</td>
                  <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
              text-align: center;
              word-break:keep-all;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                  >{{cardDatas[i].specificationModel}}</td>
                </tr>
                <tr>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >增加方式</td>
                  <td
                    style="border: 1px solid #666;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;
                text-align: center;"
                  >{{cardDatas[i].procurementOrganizationForm}}</td>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >原值</td>
                  <td
                    style="border: 1px solid #666;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
                text-align: center;"
                  >
                    <span v-if="cardDatas[i].unitPrice == undefined"></span>
                    <span v-else>{{cardDatas[i].unitPrice}}</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >使用状况</td>
                  <td
                    style="border: 1px solid #666;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;
                text-align: center;"
                  >{{cardDatas[i].assetsStatus}}</td>
                  <td
                    style="border: 1px solid #666;
              text-align: right;
              padding: 0 10px;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 140px;"
                  >配置、备注</td>
                  <td
                    style="border: 1px solid #666;
              box-sizing: border-box;
              height: 34px;
              line-height: 34px;width: 300px;
                text-align: center;
                word-break:keep-all;
                white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;"
                    class="overflow-hidden"
                  >{{cardDatas[i].remarks}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="service-condition" style="margin-top: 20px;">
          <table style="border-collapse:collapse;width:720px;">
            <tr class="service-condition-title">
              <td
                rowspan="7"
                style="border: 1px solid #666;
            text-align: right;
            padding: 5px 8px;
            box-sizing: border-box;
            width: 30px;"
              >
                使
                <br />用
                <br />、
                <br />变
                <br />更
                <br />情
                <br />况
                <br />
              </td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              >使用或变更日期</td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              >使用人签名</td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              >使用部门</td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              >存放地点</td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              >变动原因</td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
            <tr class="service-condition-con">
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 18px;width: 110px;
              font-size: 12px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 140px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
              <td
                style="border: 1px solid #666;
            text-align: center;
            box-sizing: border-box;height: 34px;padding: 0 10px;width: 150px;"
              ></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <Modal v-model="importExcel" hasCloseIcon>
      <importExcel @close="importExcel=false" @getData="getData"></importExcel>
    </Modal>
    <Modal v-model="importFinanceAssets" hasCloseIcon>
      <importFinanceAssets @close="importFinanceAssets=false" @getData="getData"></importFinanceAssets>
    </Modal>
    <Modal v-model="exportAll" hasCloseIcon hasDivider>
      <div slot="header" class="title">导出</div>
      <div style="padding:15px;">
        <div>确定导出所有数据？</div>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="exportExcel">确定</button>
        <button class="h-btn" @click="closeAll">取消</button>
      </div>
    </Modal>
    <Modal v-model="exportSection" hasCloseIcon hasDivider>
      <div slot="header" class="title">导出</div>
      <div style="padding:15px;">
        <div>确定导出所选数据？</div>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="confirmSection">确定</button>
        <button class="h-btn" @click="closeSection">取消</button>
      </div>
    </Modal>
    <Modal v-model="exportByCategory" hasCloseIcon hasDivider>
      <div slot="header" class="title">导出</div>
      <div style="padding:15px;">
        <div>确定按类别导出所有数据？</div>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="confirmByCategory">确定</button>
        <button class="h-btn" @click="closeByCategory">取消</button>
      </div>
    </Modal>
    <Modal v-model="deleteModal">
      <div slot="header" class="title">删除</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定删除？
      </div>
      <div slot="footer">
        <Button color="primary" @click="modalConfirm">确定</Button>
        <Button @click="modalClose">取消</Button>
      </div>
    </Modal>
    <Modal v-model="generalPrintModal">
      <div slot="header" class="title">打印普通标签</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定打印？
      </div>
      <div slot="footer">
        <Button color="primary" @click="generalModalConfirm">确定</Button>
        <Button @click="generalModalClose">取消</Button>
      </div>
    </Modal>
    <Modal v-model="metalResistantPrintModal">
      <div slot="header" class="title">打印抗金属标签</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定打印？
      </div>
      <div slot="footer">
        <Button color="primary" @click="metalResistantModalConfirm">确定</Button>
        <Button @click="metalResistantModalClose">取消</Button>
      </div>
    </Modal>
    <Modal v-model="cardModal">
      <div slot="header" class="title">打印卡片</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定打印？
      </div>
      <div slot="footer">
        <Button color="primary" @click="cardModalConfirm">确定</Button>
        <Button @click="cardModalClose">取消</Button>
      </div>
    </Modal>

    <Modal v-model="cacheModal">
      <div slot="header" class="title">缓存普通标签</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定缓存？
      </div>
      <div slot="footer">
        <Button color="primary" @click="cacheData">确定</Button>
        <Button @click="cacheClose">取消</Button>
      </div>
    </Modal>
    <Modal v-model="cacheKModal">
      <div slot="header" class="title">缓存抗金属标签</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定缓存？
      </div>
      <div slot="footer">
        <Button color="primary" @click="cacheKData">确定</Button>
        <Button @click="cacheClose">取消</Button>
      </div>
    </Modal>

    <Modal v-model="printCacheModal">
      <div slot="header" class="title">打印普通标签</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定打印？
      </div>
      <div slot="footer">
        <Button color="primary" @click="printCacheData">确定</Button>
        <Button @click="cacheClose">取消</Button>
      </div>
    </Modal>
    <Modal v-model="printCacheKModal">
      <div slot="header" class="title">打印抗金属标签</div>
      <div>
        <i class="h-icon-warn yellow-color deleteIcon"></i>确定打印？
      </div>
      <div slot="footer">
        <Button color="primary" @click="printCacheKData">确定</Button>
        <Button @click="cacheClose">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import assetsModel from 'model/Assets/Assets';
import importExcel from './import_excel';
import importFinanceAssets from './import_finance';
import axios from 'axios';
import { getLodop } from '../../../js/config/LodopFuncs';
export default {
  components: { importExcel, importFinanceAssets },
  data() {
    return {
      time: null,
      assetsList: assetsModel.parse({}),
      datas: [],
      departmentOption: [],
      userOption: [],
      assetsStatusOption: [
        { title: '闲置', key: '0' },
        { title: '故障', key: '1' },
        { title: '报废', key: '2' },
        { title: '在用', key: '3' },
        { title: '缺失', key: '4' }
      ],
      isReportOption: [
        { title: '是', key: '0' },
        { title: '否', key: '1' }
      ],
      pagination: {
        page: 1,
        size: 20,
        total: 100
      },
      isLoading: false,
      deleteBtn: false,
      oneData: {},
      param: [
        { title: '编辑', key: 'modify' },
        { title: '详情', key: 'detail' },
        { title: '删除', key: 'delete' }
      ],
      labelOption: [
        { title: '已贴签', key: '0' },
        { title: '有实物未贴签', key: '1' },
        { title: '无实物', key: '2' }
      ],
      tableHeight: 0,
      importExcel: false,
      importFinanceAssets: false,
      exportAll: false,
      exportSection: false,
      exportByCategory:false,
      deleteModal: false,
      stateData: {},
      changeLabelState: false,
      printBtn: false,
      importBtnParam: [
        { title: '导入', key: 'import' },
        { title: '导入财政资产', key: 'importFinancial' }
      ],
      exportBtnParam: [
        { title: '导出', key: 'export' },
        { title: '按类别导出', key: 'exportByCategory' },
        { title: '导出当前页', key: 'exportCurrentPage' }
      ],
      printBtnParam: [
        { title: '打印普通标签', key: 'printPlainLabel' },
        { title: '打印抗金属标签', key: 'printMetalResistantLabel' },
        { title: '打印卡片', key: 'printCard' }
      ],
      cacheBtnParam: [
        { title: '缓存普通标签', key: 'cache' },
        { title: '缓存抗金属标签', key: 'cacheK' }
      ],
      printCacheBtnParam: [
        { title: '打印普通标签', key: 'printCache' },
        { title: '打印抗金属标签', key: 'printCacheK' }
      ],
      generalPrintModal: false,
      metalResistantPrintModal: false,
      cardModal: false,
      cacheModal: false,
      cacheKModal: false,
      printCacheModal: false,
      printCacheKModal: false,
      cardData: {},
      cardDatas: [],
      date: '',
      days: {}
    };
  },
  // 注册回车搜索
  created() {
    this.keyupEnter();
  },
  mounted() {
    this.getData();
    this.getList();
    this.$nextTick(() => {
      document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-header-left').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      document.querySelector('.h-table-fixed-left').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
    });
    document.addEventListener('scroll', this.winScroll, true);
    document.getElementById('app').style = 'min-width:1366px;overflow:auto';
  },
  methods: {
    // 回车搜索
    keyupEnter() {
      document.onkeydown = e => {
        let body = document.getElementsByTagName('body')[0];
        if (e.keyCode === 13 && e.target.baseURI.match(/assetInformation/)) {
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
      this.days = {};
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
          this.tableHeight = parseInt(window.getComputedStyle(document.querySelector('.h-panel-body')).height) - 180;
          this.datas = resp.body;
          this.pagination.page = resp.page;
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
    // 新增数据
    add() {
      this.$router.push({ name: 'assetsAdd' });
    },
    // 修改数据
    update() {},
    // 编辑数据
    modify(datas, data) {
      // this.$router.push({ name: 'assetsModify', params: { Id: data.id, Category: data.assetsCategory, CategoryName: data.assetsCategoryName } });
      this.$router.push({ path: '/assetsModify/', query: { Id: data.id, Category: data.assetsCategory, CategoryName: data.assetsCategoryName } });
    },
    // 删除数据（可批量删除）
    remove() {
      if (this.$refs.table.getSelection().length < 1) {
        this.$Message('请选择要删除的数据');
      } else {
        this.deleteModal = true;
      }
    },
    modalConfirm() {
      let ids = [];
      if (this.$refs.table.getSelection().length > 0) {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          ids.push(this.$refs.table.getSelection()[i].id);
        }
      } else {
        ids.push(this.oneData.id);
      }
      this.assetsList.ids = ids.join(',');
      R.Assets.assetsDelete(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.ok) {
          setTimeout(() => {
            this.deleteModal = false;
            this.$Message.success('刪除成功');
            this.getData();
          }, 200);
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    // 资产信息详情
    detail(data) {
      this.$router.push({
        path: '/assetsDetail/' + data.id + '/' + data.assetsCategory + '/' + data.assetsCategoryName,
        params: { Id: data.id, Category: data.assetsCategory, CategoryName: data.assetsCategoryName }
      });
    },
    changePage() {
      this.assetsList.page = this.pagination.page;
      this.assetsList.size = this.pagination.size;
      this.getData();
    },
    // 控制删除按钮
    select(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
        this.changeLabelState = true;
        this.printBtn = true;
      } else {
        this.deleteBtn = false;
        this.changeLabelState = false;
        this.printBtn = false;
      }
    },
    trigger(data) {
      if (data == 'modify') {
        this.$router.push({
          path: '/assetsModify/',
          query: { Id: this.oneData.id, Category: this.oneData.assetsCategory, CategoryName: this.oneData.assetsCategoryName }
        });
      } else if (data == 'detail') {
        this.$router.push({
          path: '/assetsDetail/' + this.oneData.id + '/' + this.oneData.assetsCategory + '/' + this.oneData.assetsCategoryName,
          params: { Id: this.oneData.id, Category: this.oneData.assetsCategory, CategoryName: this.oneData.assetsCategoryName }
        });
      } else if (data == 'delete') {
        this.deleteModal = true;
      }
    },
    getOneData(data) {
      this.oneData = data;
    },
    // 导入下拉按钮
    importTrigger(data) {
      if (data == 'import') {
        this.importExcel = true;
      } else if (data == 'importFinancial') {
        this.importFinanceAssets = true;
      }
    },
    // 导出下拉按钮
    exportTrigger(data) {
      if (data == 'export') {
        if (this.$refs.table.getSelection().length < 1) {
          this.exportAll = true;
        } else if (this.$refs.table.getSelection().length > 0) {
          this.exportSection = true;
        }
      } else if (data == 'exportByCategory') {
        this.exportByCategory = true;
      } else if (data == 'exportCurrentPage') {
        this.frontEndExportExcel()
      }
    },
    // 打印下拉按钮
    printTrigger(data) {
      if (data == 'printPlainLabel') {
        this.generalPrintModal = true;
      } else if (data == 'printMetalResistantLabel') {
        this.metalResistantPrintModal = true;
      } else if (data == 'printCard') {
        this.cardModal = true;
        let ids = [];
        if (this.$refs.table.getSelection().length > 1) {
          for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
            ids.push(this.$refs.table.getSelection()[i].id);
          }
          this.assetsList.ids = ids.join(',');
          R.Assets.findAssetsInfoById(assetsModel.dispose(this.assetsList)).then(resp => {
            if (resp.ok) {
              this.cardDatas = resp.body;
            }
          });
        } else if (this.$refs.table.getSelection().length == 1) {
          this.assetsList.ids = this.$refs.table.getSelection()[0].id;
          R.Assets.findAssetsInfoById(assetsModel.dispose(this.assetsList)).then(resp => {
            if (resp.ok) {
              this.cardDatas = resp.body;
            }
          });
        }
      }
    },
    // 缓存下拉按钮
    cacheTrigger(data) {
      if (data == 'cache') {
        this.cacheModal = true;
      } else {
        this.cacheKModal = true;
      }
    },
    // 打印缓存下拉按钮
    printCaheTrigger(data) {
      if (data == 'printCache') {
        this.printCacheModal = true;
      } else {
        this.printCacheKModal = true;
      }
    },

    // 打印普通标签
    print(place) {
      this.generalPrintModal = true;
    },
    // 打印抗金属标签
    printKJS() {
      this.metalResistantPrintModal = true;
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
    printCacheData() {
      R.Assets.findCache().then(resp => {
        // 参数
        var printparamsJsonArray = [];
        var printDate = [];
        var data = {};
        data.printname = 'POSTEK TX3r';
        data.printlabel = 'thinLabelPrint';
        data.reqParam = '1';
        data.lang = 'zh';
        resp.body.body.forEach(v => {
          this.printLoad(printparamsJsonArray, 952, 381, 63); // 初始化
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,175,42,0,宋体,1,400,0,0,0,C2,资产名称：' + v.assetsName });
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,221,42,0,宋体,1,400,0,0,0,C3,建卡时间：' + v.acquisitionTime });
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,269,42,0,宋体,1,400,0,0,0,C4,财政编号：' + v.oldCode });
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,317,42,0,宋体,1,400,0,0,0,C5,资产编号：' + v.newCode });
          printparamsJsonArray.push({ PTK_DrawBar2D_QR: '725,192,180,180,0,5,4,1,8,' + this.FILEURL.printUrl + v.id }); // 二维码
          printparamsJsonArray.push({ PTK_RWRFIDLabel: '1,0,2,8,1,' + v.id }); // 写入rfid序列
          printparamsJsonArray.push({ PTK_EnableFLASH: '' });
          printparamsJsonArray.push({ PTK_PrintLabel: '1,1' });
          printparamsJsonArray.push({ ClosePort: '' });
          data.printparams = JSON.stringify(printparamsJsonArray);
        });
        this.doPost(data);
        R.Assets.cleanCache().then(resp => {});
      });
    },
    printCacheKData() {
      R.Assets.findCacheK().then(resp => {
        // 参数
        var printparamsJsonArray = [];
        var data = {};
        data.printname = 'POSTEK TX3r';
        data.printlabel = 'kjsLabelPrint';
        data.reqParam = '1';
        data.lang = 'zh';
        resp.body.body.forEach(v => {
          this.printLoad(printparamsJsonArray, 889, 381, 127); // 初始化
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '480,80,84,0,黑体,5,400,0,0,0,C1,洛阳市人民检察院' });
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '98,143,42,0,宋体,1,400,0,0,0,C2,资产名称：' + v.assetsName });
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '98,191,42,0,宋体,1,400,0,0,0,C3,建卡时间：' + v.acquisitionTime });
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '98,239,42,0,宋体,1,400,0,0,0,C4,财政编号：' + v.oldCode });
          printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '98,287,42,0,宋体,1,400,0,0,0,C5,资产编号：' + v.newCode });
          printparamsJsonArray.push({ PTK_DrawBar2D_QR: '668,140,180,180,0,5,4,2,8,' + this.FILEURL.printUrl + v.id }); // 二维码
          printparamsJsonArray.push({ PTK_RWRFIDLabel: '1,0,2,8,1,' + v.id }); // 写入rfid序列
          printparamsJsonArray.push({ PTK_EnableFLASH: '' });
          printparamsJsonArray.push({ PTK_PrintLabel: '1,1' });
          printparamsJsonArray.push({ ClosePort: '' });
        });
        data.printparams = JSON.stringify(printparamsJsonArray);
        this.doPost(data);
        R.Assets.cleanCacheK().then(resp => {});
      });
    },
    cacheData() {
      let ids = [];
      let chongfu = [];
      if (this.$refs.table.getSelection().length > 0) {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          if (this.$refs.table.getSelection()[i].labelPrintNumber == undefined) {
            ids.push(this.$refs.table.getSelection()[i].id);
          } else {
            chongfu.push(this.$refs.table.getSelection()[i].newCode);
          }
        }
      } else {
        this.$Message('请选择数据');
      }
      if (chongfu.length > 0) {
        this.$Message.warn(chongfu.join(',') + '重复', 0);
      }
      this.assetsList.id = ids.join(',');
      R.Assets.cache(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.ok) {
          if (resp.body == 'OK') {
            this.$Message.success('缓存成功');
            this.cacheModal = false;
          } else {
            this.$Message.warn(resp.body + '重复', 0);
            this.cacheModal = false;
          }
        }
      });
    },
    cacheKData() {
      let ids = [];
      let chongfu = [];
      if (this.$refs.table.getSelection().length > 0) {
        for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
          if (this.$refs.table.getSelection()[i].labelPrintNumber == undefined) {
            ids.push(this.$refs.table.getSelection()[i].id);
          } else {
            chongfu.push(this.$refs.table.getSelection()[i].newCode);
          }
        }
      } else {
        this.$Message('请选择数据');
      }
      if (chongfu.length > 0) {
        this.$Message.warn(chongfu.join(',') + '重复', 0);
      }
      this.assetsList.id = ids.join(',');
      R.Assets.cacheK(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.ok) {
          if (resp.body == 'OK') {
            this.$Message.success('缓存成功');
            this.cacheKModal = false;
          } else {
            this.$Message.warn(resp.body + '重复', 0);
            this.cacheKModal = false;
          }
        }
      });
    },
    cacheClose() {
      this.cacheModal = false;
      this.cacheKModal = false;
      this.printCacheModal = false;
      this.printCacheKModal = false;
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
        this.printLoad(printparamsJsonArray, 952, 381, 63); // 初始化
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,175,42,0,宋体,1,400,0,0,0,C2,资产名称：' + v.assetsName });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,221,42,0,宋体,1,400,0,0,0,C3,建卡时间：' + v.acquisitionTime });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,269,42,0,宋体,1,400,0,0,0,C4,财政编号：' + v.oldCode });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '110,317,42,0,宋体,1,400,0,0,0,C5,资产编号：' + v.newCode });
        printparamsJsonArray.push({ PTK_DrawBar2D_QR: '725,192,180,180,0,5,4,1,8,' + this.FILEURL.printUrl + v.id }); // 二维码
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
        this.printLoad(printparamsJsonArray, 889, 381, 127); // 初始化
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '480,80,84,0,黑体,5,400,0,0,0,C1,洛阳市人民检察院' });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '98,143,42,0,宋体,1,400,0,0,0,C2,资产名称：' + v.assetsName });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '98,191,42,0,宋体,1,400,0,0,0,C3,建卡时间：' + v.acquisitionTime });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '98,239,42,0,宋体,1,400,0,0,0,C4,财政编号：' + v.oldCode });
        printparamsJsonArray.push({ PTK_DrawTextTrueTypeW: '98,287,42,0,宋体,1,400,0,0,0,C5,资产编号：' + v.newCode });
        printparamsJsonArray.push({ PTK_DrawBar2D_QR: '668,140,180,180,0,5,4,2,8,' + this.FILEURL.printUrl + v.id }); // 二维码
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
      this.$http
        .post('http://127.0.0.1:888/postek/print', data, {
          emulateJSON: true
        })
        .then(function (res) {
          if (res.body.retval == '0') {
            HeyUI.$Loading.close();
            HeyUI.$Message.success('打印成功');
            this.generalPrintModal = false;
            this.metalResistantPrintModal = false;
            this.cacheClose();
          } else {
            HeyUI.$Loading.close();
            HeyUI.$Message.error('打印失败');
            this.generalPrintModal = false;
            this.metalResistantPrintModal = false;
            this.cacheClose();
          }
        });
      // R.Print.print(data).then(resp => {
      //   if (resp.retval == '0') {
      //     HeyUI.$Loading.close();
      //     HeyUI.$Message.success('打印成功');
      //     this.generalPrintModal = false;
      //     this.metalResistantPrintModal = false;
      //   } else {
      //     HeyUI.$Loading.close();
      //     HeyUI.$Message.error('打印失败');
      //     this.generalPrintModal = false;
      //     this.metalResistantPrintModal = false;
      //   }
      // });
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
          function (rfList) {
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
      // printparamsJsonArray.push({ PTK_SetPrintSpeed: 20 });
      // 设置打印黑度
      // printparamsJsonArray.push({ PTK_SetDarkness: '10' });
      // 设置标签纸宽度
      printparamsJsonArray.push({ PTK_SetLabelWidth: w });
      // 设置标签纸 高度 间隙高度
      printparamsJsonArray.push({ PTK_SetLabelHeight: h + ',' + gapH + ',0,false' });
    },
    // 打印卡片
    cardModalConfirm() {
      let LODOP = getLodop();
      LODOP.PRINT_INIT('');
      LODOP.SET_PRINT_STYLE('FontSize', 18);
      LODOP.SET_PRINT_STYLE('Bold', 1);
      LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, '');
      // LODOP.SET_PRINT_PAGESIZE(2,'210mm','297mm');
      LODOP.ADD_PRINT_HTM(35, 0, '90%', '90%', document.getElementById('card').innerHTML);
      LODOP.SET_PRINT_STYLEA(0, 'Horient', 2);
      // LODOP.PRINT();
      LODOP.PREVIEW();
      this.cardModal = false;
    },
    cardModalClose() {
      this.cardModal = false;
      document.getElementById('card').style.display = 'none';
      this.getData();
    },
    // 批量修改贴签状态
    stateBatch(data) {
      let ids = [];
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        ids.push(this.$refs.table.getSelection()[i].id);
      }
      this.assetsList.ids = ids.join(',');
      this.assetsList.status = data;
      R.Assets.changeAssetsStatus(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.ok) {
          this.getData();
        }
      });
    },
    // //逐个修改贴签状态
    // state(data) {
    //   let ids = [];
    //   this.assetsList.status = data;
    //   ids.push(this.stateData.id);
    //   this.assetsList.ids = ids.join(',');
    //   R.Assets.changeAssetsStatus(assetsModel.dispose(this.assetsList)).then(resp => {
    //     if (resp.ok) {
    //       this.getData();
    //     }
    //   });
    // },
    // getStateData(data) {
    //   this.stateData = data;
    // },
    // 导出excel
    exp() {
      if (this.$refs.table.getSelection().length < 1) {
        this.exportAll = true;
      } else if (this.$refs.table.getSelection().length > 0) {
        this.exportSection = true;
      }
    },
    exportExcel() {
      this.$Loading();
      this.exportAll = false;
      location.href = `${this.FILEURL.excelUrl}newCode=${this.assetsList.newCode}&assetsName=${this.assetsList.assetsName}&assetsCategoryName=${this.assetsList.assetsCategoryName}&useDepartment=${this.assetsList.useDepartment}&administrativeDepartment=${this.assetsList.administrativeDepartment}&useId=${this.assetsList.useId}&storageLocation=${this.assetsList.storageLocation}&brand=${this.assetsList.brand}&specificationModel=${this.assetsList.specificationModel}&assetsStatus=${this.assetsList.assetsStatus}&isReport=${this.assetsList.isReport}&labelPrintNumber=${this.assetsList.labelPrintNumber}`.replace(
        /null/g,
        ''
      );
      R.Assets.getValue(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.body == 1) {
          this.$Loading.close();
        }
      });
    },
    confirmSection() {
      this.$Loading();
      this.exportSection = false;
      let ids = [];
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        ids.push(this.$refs.table.getSelection()[i].id);
      }
      location.href = `${this.FILEURL.excelUrl}ids=${ids.join(',')}`;
      R.Assets.getValue(assetsModel.dispose(this.assetsList)).then(resp => {
        console.log(resp)
        if (resp.body == 1) {
          this.$Loading.close();
        }
      });
    },
    // iptExcel() {
    //   this.importExcel = true;
    // },
    // iptFinanceAssets() {
    //   this.importFinanceAssets = true;
    // },

    closeAll() {
      this.exportAll = false;
    },
    closeSection() {
      this.exportSection = false;
    },
    confirmByCategory(){
      this.$Loading();
      this.exportByCategory = false;
      location.href=`${this.FILEURL.exportUrl}`
      R.Assets.luoyangGetValue(assetsModel.dispose(this.assetsList)).then(resp => {
        if (resp.body == 1) {
          this.$Loading.close();
        }
      });
    },
    closeByCategory(){
      this.exportByCategory = false;
    },
    changeDate() {
      this.assetsList.value = `${this.days.start}/${this.days.end}`;
    },
    //导出excel
    frontEndExportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../../../export/Export2Excel');
        const tHeader = [
          '资产编号',
          '资产名称',
          '财政编号',
          '使用部门',
          '管理部门',
          '使用人',
          '资产分类',
          '品牌',
          '型号',
          '单价',
          '数量',
          '存放地点',
          '取得日期',
          '备注',
          '资产状态',
          '上报财政',
          '贴签状态'
        ];
        const filterVal = [
          'newCode',
          'assetsName',
          'oldCode',
          'useDepartmentName',
          'administrativeDepartmentName',
          'username',
          'assetsCategoryName',
          'brand',
          'specificationModel',
          'listPrice',
          'number',
          'storageLocation',
          'acquisitionTime',
          'remarks',
          'assetsStatusName',
          'isReportName',
          'labelPrintNumberName'
        ];
        const list = this.datas;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '固定资产表');
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    winScroll() {
      if (document.querySelector('.h-table-body').scrollLeft == 0) {
        document.querySelector('.h-table-fixed-header-left').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
        document.querySelector('.h-table-fixed-left').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
      } else if (
        document.querySelector('.h-table-body').scrollLeft > 0 &&
        document.querySelector('.h-table-body').scrollLeft <
          document.querySelector('.h-table-body').scrollWidth - document.querySelector('.h-table-body').clientWidth
      ) {
        document.querySelector('.h-table-fixed-header-left').style.boxShadow = '2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-left').style.boxShadow = '2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '-2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
      } else if (
        document.querySelector('.h-table-body').scrollLeft ==
        document.querySelector('.h-table-body').scrollWidth - document.querySelector('.h-table-body').clientWidth
      ) {
        document.querySelector('.h-table-fixed-header-left').style.boxShadow = '2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-left').style.boxShadow = '2px 0px 6px -2px rgba(0, 0, 0, 0.2)';
        document.querySelector('.h-table-fixed-header-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
        document.querySelector('.h-table-fixed-right').style.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)';
      }
    }
  }
};
</script>
