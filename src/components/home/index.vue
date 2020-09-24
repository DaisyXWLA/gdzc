<style lang="less" scoped>
.h-panel-bar .h-panel-title {
  line-height: 0;
}
.mes-con {
  margin-top: 20px;
  height: 230px;
  overflow-y: scroll;
}
.h-table td {
  // font-size: 16px;
}
.pro-statistics,
.announcement {
  height: 420px;
}
@menu-prefix: ~'@{prefix}menu';
.menu-custom {
  background: @white-color;
  .@{menu-prefix} {
    &-show {
      padding: 8px 0;
      translate: font-size, color 0.3s;
      &:link {
        color: gray;
      }
      &:visited {
        color: gray;
      }
      &:hover {
        font-size: 15px;
        color: black;
      }
      &:active {
        font-size: 15px;
        color: gray;
      }
    }
    &-li {
      &-selected {
        background: white;
        font-size: 15px;
        color: black;
      }
    }
  }
}
.color-spans > div > div {
  border-radius: 3px;
  padding: 10px;
  box-sizing: border-box;
  &.first {
    border-radius: 3px 3px 0 0;
  }
  &.h-row {
    padding: 0;
  }
  .second {
    height: 40px;
  }
}
//icon共用样式
.iconStyle {
  width: 60px;
  height: 60px;
  padding: 5px;
  border-radius: 50%;
  border: 2px dotted #fff;
  box-sizing: border-box;
  img {
    width: 100%;
  }
}
.assets-total {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to right, #ff8e8c, #f9675a);
  .icon {
    .iconStyle;
  }
}
.assets-total-value {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to right, #79b2ff, #5184ed);
  .icon {
    .iconStyle;
  }
}
.new-assets {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to right, #c2b3ec, #8759fc);
  .icon {
    .iconStyle;
  }
}
.new-assets-value {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to right, #01eed4, #4ddcfc);
  .icon {
    .iconStyle;
  }
}
.home-curve {
  height: 340px;
}
.home-notice {
  height: 340px;
  ul {
    margin-top: 10%;
    li {
      line-height: 30px;
      a {
        display: flex;
        justify-content: space-between;
        color: #999;
        i {
          font-style: normal;
        }
      }
    }
  }
}
//盘点信息样式
.inventory {
  margin-top: 10px !important;
  li {
    width: 100%;
    border-radius: 6px;
    margin-bottom: 5px;
    line-height: 20px !important;
    padding: 10px 0;
    box-sizing: border-box;
    &:nth-child(1) {
      background: rgba(143, 100, 252, 0.1);
      border-left: 5px solid #8f64fc;
      .title {
        color: #8b5ffc;
        .inventoryTitle;
      }
    }
    &:nth-child(2) {
      background: rgba(92, 143, 240, 0.1);
      border-left: 5px solid #5c8ff0;
      .title {
        color: #5c8ff0;
        .inventoryTitle;
      }
    }
    &:nth-child(3) {
      background: rgba(252, 175, 67, 0.1);
      border-left: 5px solid #fcaf43;
      .title {
        color: #fcaf43;
        .inventoryTitle;
      }
    }
    .data {
      div {
        display: inline-block;
        text-align: center;
        @media screen and (max-width: 1366px) {
          &:nth-child(1) {
            p {
              padding-left: 20px;
            }
          }
          p {
            margin: 0;
            padding-right: 5px;
          }
        }
        @media screen and (min-width: 1366px) {
          &:nth-child(1) {
            p {
              padding-left: 20px;
            }
          }
          p {
            margin: 0;
            padding-right: 5px;
          }
        }
        @media screen and (min-width: 1440px) {
          &:nth-child(1) {
            p {
              padding-left: 20px;
            }
          }
          p {
            margin: 0;
            padding-right: 10px;
          }
        }
        @media screen and (min-width: 1680px) {
          &:nth-child(1) {
            p {
              padding-left: 20px;
            }
          }
          p {
            margin: 0;
            padding-right: 20px;
          }
        }
      }
    }
  }
}
//盘点信息公共样式
.inventoryTitle {
  font-size: 16px;
  margin-bottom: 5px;
  .name {
    display: inline-block;
    width: 60%;
    padding: 0 10px 0 20px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .code {
    display: inline-block;
    padding-right: 10px;
    box-sizing: border-box;
    width: 38%;
    cursor: pointer;
  }
}
//报修信息共用样式
.repairCommonStyle {
  height: 160px;
  margin-top: 3%;
  p {
    color: #fff;
    @media screen and (max-width: 1366px) {
      &:first-child {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        line-height: 60px;
        padding: 13px;
        box-sizing: border-box;
        img {
          width: 100%;
        }
      }
    }
    @media screen and (min-width: 1366px) {
      &:first-child {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        line-height: 60px;
        padding: 13px;
        box-sizing: border-box;
        img {
          width: 100%;
        }
      }
    }
    @media screen and (min-width: 1680px) {
      &:first-child {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        line-height: 70px;
        padding: 15px;
        box-sizing: border-box;
        img {
          width: 100%;
        }
      }
    }
  }
}
.undisposed-repair {
  background-image: linear-gradient(#c5afff, #8759fc);
  .repairCommonStyle;
  p {
    &:first-child {
      background: #8759fc;
    }
    @media screen and (max-width: 1366px) {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
    @media screen and (min-width: 1366px) {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
    @media screen and (min-width: 1680px) {
      &:nth-child(2) {
        font-size: 14px;
      }
    }
  }
}
.today-repair {
  background-image: linear-gradient(#9dc4f9, #578bf0);
  .repairCommonStyle;
  p {
    &:first-child {
      background: #578bf0;
    }
    @media screen and (max-width: 1366px) {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
    @media screen and (min-width: 1366px) {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
    @media screen and (min-width: 1680px) {
      &:nth-child(2) {
        font-size: 14px;
      }
    }
  }
}
.breakdown-number {
  background-image: linear-gradient(#feb4b3, #fa6c60);
  .repairCommonStyle;
  p {
    &:first-child {
      background: #fa6c60;
    }
    @media screen and (max-width: 1366px) {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
    @media screen and (min-width: 1366px) {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
    @media screen and (min-width: 1680px) {
      &:nth-child(2) {
        font-size: 14px;
      }
    }
  }
}
.assets-good {
  background-image: linear-gradient(#fed59c, #ffa92e);
  .repairCommonStyle;
  p {
    &:first-child {
      background: #ffa92e;
    }
    @media screen and (max-width: 1366px) {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
    @media screen and (min-width: 1366px) {
      &:nth-child(2) {
        font-size: 12px;
      }
    }
    @media screen and (min-width: 1680px) {
      &:nth-child(2) {
        font-size: 14px;
      }
    }
  }
}
.retirement-info {
  margin-top: 5%;
  p {
    margin: 0;
  }
  @media screen and (max-width: 1366px) {
    .info {
      padding-left: 20%;
    }
  }
  @media screen and (min-width: 1366px) {
    .info {
      padding-left: 20%;
    }
  }
  @media screen and (min-width: 1680px) {
    .info {
      padding-left: 0;
    }
  }
}
@media screen and (max-width: 1366px) {
  .assets-font {
    font-size: 14px;
  }
  .value-font {
    font-size: 14px;
    margin-top: 8px;
  }
}
@media screen and (min-width: 1366px) {
  .assets-font {
    font-size: 14px;
  }
  .value-font {
    font-size: 14px;
    margin-top: 8px;
  }
}
@media screen and (min-width: 1680px) {
  .assets-font {
    font-size: 16px;
  }
  .value-font {
    font-size: 16px;
    margin-top: 8px;
  }
}
// @media screen and (min-width: 1366px) {
//   /deep/ .h-text-ellipsis {
//     width: 100px !important;
//   }
// }
// @media screen and (min-width: 1680px) {
//   /deep/ .h-text-ellipsis {
//     width: 130px !important;
//   }
// }
// @media screen and (min-width: 1920px) {
//   /deep/ .h-text-ellipsis {
//     width: 150px !important;
//   }
// }
</style>

<template>
  <div class="app-home-vue frame-page">
    <Row :space="5">
      <Cell :width="19">
        <Row :space="5" class="color-spans">
          <Cell :width="6">
            <div class="assets-total">
              <Row>
                <Cell :width="11" align="center">
                  <p class="icon">
                    <img src="../../images/home/assets-total-icon.png" alt="资产总数" />
                  </p>
                </Cell>
                <Cell :width="13" align="left">
                  <div>
                    <p
                      v-if="assetsData.totalAssetsNumber==undefined"
                      class="white-color"
                      v-font="20"
                    >0</p>
                    <!-- <p v-else class="white-color" v-font="20">{{assetsData.totalAssetsNumber}}</p> -->
                    <TextEllipsis
                      v-else
                      :text="assetsData.totalAssetsNumber.toString()"
                      :height="30"
                      v-font="20"
                      v-color:white
                      more="..."
                      useTooltip
                      tooltipTheme="white"
                    ></TextEllipsis>
                    <p class="white-color assets-font">资产总数</p>
                  </div>
                </Cell>
              </Row>
            </div>
          </Cell>
          <Cell :width="6">
            <div class="assets-total-value">
              <Row>
                <Cell :width="11" align="center">
                  <p class="icon">
                    <img src="../../images/home/assets-total-value-icon.png" alt="资产总价值" />
                  </p>
                </Cell>
                <Cell :width="13" align="left">
                  <div>
                    <p
                      v-if="assetsData.totalAssetsPrice==undefined"
                      class="white-color"
                      v-font="20"
                    >0</p>
                    <!-- <p v-else class="white-color" v-font="20">{{assetsData.totalAssetsPrice}}</p> -->
                    <TextEllipsis
                      v-else
                      :text="assetsData.totalAssetsPrice.toString()"
                      :height="30"
                      v-color:white
                      v-font="20"
                      more="..."
                      useTooltip
                      tooltipTheme="white"
                    ></TextEllipsis>
                    <p class="white-color assets-font">资产总价值</p>
                  </div>
                </Cell>
              </Row>
            </div>
          </Cell>
          <Cell :width="6">
            <div class="new-assets">
              <Row>
                <Cell :width="11" align="center">
                  <p class="icon">
                    <img src="../../images/home/new-assets-icon.png" alt="今年新增资产" />
                  </p>
                </Cell>
                <Cell :width="13" align="left">
                  <div>
                    <p
                      v-if="assetsData.yearIncreaseAssetsNumber==undefined"
                      class="white-color"
                      v-font="20"
                    >0</p>
                    <!-- <p v-else class="white-color" v-font="20">{{assetsData.yearIncreaseAssetsNumber}}</p> -->
                    <TextEllipsis
                      v-else
                      :text="assetsData.yearIncreaseAssetsNumber.toString()"
                      :height="30"
                      v-color:white
                      v-font="20"
                      more="..."
                      useTooltip
                      tooltipTheme="white"
                    ></TextEllipsis>
                    <p class="white-color assets-font">今年新增资产</p>
                  </div>
                </Cell>
              </Row>
            </div>
          </Cell>
          <Cell :width="6">
            <div class="new-assets-value">
              <Row>
                <Cell :width="10" align="center">
                  <p class="icon">
                    <img src="../../images/home/new-assets-value-icon.png" alt="今年新增资产价值" />
                  </p>
                </Cell>
                <Cell :width="14" align="left">
                  <div>
                    <p
                      v-if="assetsData.yearIncreaseAssetsPrice==undefined"
                      class="white-color"
                      v-font="20"
                    >0</p>
                    <!-- <p v-else class="white-color" v-font="20">{{assetsData.yearIncreaseAssetsPrice}}</p> -->
                    <TextEllipsis
                      v-else
                      :text="assetsData.yearIncreaseAssetsPrice.toString()"
                      :height="30"
                      v-color:white
                      v-font="20"
                      more="..."
                      useTooltip
                      tooltipTheme="white"
                    ></TextEllipsis>
                    <p class="white-color assets-font">今年新增资产价值</p>
                    <!-- <TextEllipsis
                      text="今年新增资产价值"
                      :height="30"
                      v-color:white
                      class="value-font"
                      more="..."
                      useTooltip
                      tooltipTheme="white"
                    ></TextEllipsis>-->
                  </div>
                </Cell>
              </Row>
            </div>
          </Cell>
        </Row>
        <Row :space="5">
          <Cell :width="16">
            <div class="h-panel home-curve">
              <div class="h-panel-body">
                <h3
                  style="border-left:3px solid #3788ee;padding-left:2%;border-radius:2px;"
                >近12个月购置价值变动曲线</h3>
                <curveChart></curveChart>
              </div>
            </div>
          </Cell>
          <Cell :width="8">
            <div class="h-panel home-notice">
              <div class="h-panel-body">
                <h3 style="border-left:3px solid #3788ee;padding-left:2%;border-radius:2px;">盘点信息</h3>
                <div v-show="noneInventoryData" style="font-size:30px;color:#ccc;text-align:center;line-height:200px">暂无数据</div>
                <ul class="inventory" v-show="showInventoryData">
                  <li v-show="inventoryOne">
                    <div class="title">
                      <!-- <p>{{inventoryDataOne.title}}</p> -->
                      <!-- <p>{{inventoryDataOne.code}}</p> -->
                      <TextEllipsis
                        class="name"
                        :text="inventoryDataOne.title"
                        :height="30"
                        more="..."
                        useTooltip
                        tooltipTheme="white"
                      ></TextEllipsis>
                      <TextEllipsis
                        class="code"
                        :text="inventoryDataOne.code"
                        :height="30"
                        more="..."
                        useTooltip
                        tooltipTheme="white"
                      ></TextEllipsis>
                    </div>
                    <div class="data">
                      <div>
                        <p>待盘点</p>
                        <p>{{inventoryDataOne.totalInventory}}</p>
                      </div>
                      <div>
                        <p>已盘点</p>
                        <p>{{inventoryDataOne.inventoryNumber}}</p>
                      </div>
                      <div>
                        <p>盘亏</p>
                        <p>{{inventoryDataOne.inventoryProfit}}</p>
                      </div>
                      <div>
                        <p>盘盈</p>
                        <p>{{inventoryDataOne.inventoryLoss}}</p>
                      </div>
                    </div>
                  </li>
                  <li v-show="inventoryTwo">
                    <div class="title">
                      <!-- <p>{{inventoryDataTwo.title}}</p>
                      <p>{{inventoryDataTwo.code}}</p>-->
                      <TextEllipsis
                        class="name"
                        :text="inventoryDataTwo.title"
                        :height="30"
                        more="..."
                        useTooltip
                        tooltipTheme="white"
                      ></TextEllipsis>

                      <TextEllipsis
                        class="code"
                        :text="inventoryDataTwo.code"
                        :height="30"
                        more="..."
                        useTooltip
                        tooltipTheme="white"
                      ></TextEllipsis>
                    </div>
                    <div class="data">
                      <div>
                        <p>待盘点</p>
                        <p>{{inventoryDataTwo.totalInventory}}</p>
                      </div>
                      <div>
                        <p>已盘点</p>
                        <p>{{inventoryDataTwo.inventoryNumber}}</p>
                      </div>
                      <div>
                        <p>盘亏</p>
                        <p>{{inventoryDataTwo.inventoryProfit}}</p>
                      </div>
                      <div>
                        <p>盘盈</p>
                        <p>{{inventoryDataTwo.inventoryLoss}}</p>
                      </div>
                    </div>
                  </li>
                  <!-- <li v-show="inventoryTwo">
                    <div class="title">
                      <p>{{inventoryDataTwo.title}}</p>
                      <p>{{inventoryDataTwo.code}}</p>
                      <TextEllipsis
                        class="name"
                        :text="inventoryDataTwo.title"
                        :height="30"
                        more="..."
                        useTooltip
                        tooltipTheme="white"
                      ></TextEllipsis>

                      <TextEllipsis
                        class="code"
                        :text="inventoryDataTwo.code"
                        :height="30"
                        more="..."
                        useTooltip
                        tooltipTheme="white"
                      ></TextEllipsis>
                    </div>
                    <div class="data">
                      <div>
                        <p>待盘点</p>
                        <p>{{inventoryDataTwo.totalInventory}}</p>
                      </div>
                      <div>
                        <p>已盘点</p>
                        <p>{{inventoryDataTwo.inventoryNumber}}</p>
                      </div>
                      <div>
                        <p>盘亏</p>
                        <p>{{inventoryDataTwo.inventoryProfit}}</p>
                      </div>
                      <div>
                        <p>盘盈</p>
                        <p>{{inventoryDataTwo.inventoryLoss}}</p>
                      </div>
                    </div>
                  </li> -->
                  <li v-show="inventoryThree">
                    <div class="title">
                      <!-- <p>{{inventoryDataThree.title}}</p>
                      <p>{{inventoryDataThree.code}}</p>-->
                      <TextEllipsis
                        class="name"
                        :text="inventoryDataThree.title"
                        :height="30"
                        more="..."
                        useTooltip
                        tooltipTheme="white"
                      ></TextEllipsis>

                      <TextEllipsis
                        class="code"
                        :text="inventoryDataThree.code"
                        :height="30"
                        more="..."
                        useTooltip
                        tooltipTheme="white"
                      ></TextEllipsis>
                    </div>
                    <div class="data">
                      <div>
                        <p>待盘点</p>
                        <p>{{inventoryDataThree.totalInventory}}</p>
                      </div>
                      <div>
                        <p>已盘点</p>
                        <p>{{inventoryDataThree.inventoryNumber}}</p>
                      </div>
                      <div>
                        <p>盘亏</p>
                        <p>{{inventoryDataThree.inventoryProfit}}</p>
                      </div>
                      <div>
                        <p>盘盈</p>
                        <p>{{inventoryDataThree.inventoryLoss}}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Cell>
        </Row>
        <Row :space="5">
          <Cell :width="12">
            <div class="h-panel">
              <div class="h-panel-body">
                <h3 style="border-left:3px solid #3788ee;padding-left:2%;border-radius:2px;">资产状态分布</h3>
                <histogram></histogram>
              </div>
            </div>
          </Cell>
          <Cell :width="12">
            <div class="h-panel">
              <div class="h-panel-body">
                <h3 style="border-left:3px solid #3788ee;padding-left:2%;border-radius:2px;">资产分类占比</h3>
                <pieChart></pieChart>
              </div>
            </div>
          </Cell>
        </Row>
      </Cell>
      <Cell :width="5">
        <Row :space="5">
          <Cell :width="24">
            <div class="h-panel">
              <div class="h-panel-body">
                <h3
                  style="border-left:3px solid #3788ee;padding-left:2%;border-radius:2px;margin-bottom:3%"
                >报修信息</h3>
                <Row :space-x="5" class="color-spans">
                  <Cell :width="12" align="center">
                    <div class="undisposed-repair">
                      <p>
                        <img src="../../images/home/undisposed-repair-icon.png" alt="未处理报修" />
                      </p>
                      <p>未处理报修</p>
                      <p v-if="repairData.unprocessedRepair==undefined" v-font="20">0</p>
                      <p v-else v-font="20">{{repairData.unprocessedRepair}}</p>
                    </div>
                  </Cell>
                  <Cell :width="12" align="center">
                    <div class="today-repair">
                      <p>
                        <img src="../../images/home/today-repair-icon.png" alt="今日报修" />
                      </p>
                      <p>今日报修</p>
                      <p v-if="repairData.totalRepair==undefined" v-font="20">0</p>
                      <p v-else v-font="20">{{repairData.totalRepair}}</p>
                    </div>
                  </Cell>
                  <Cell :width="12" align="center">
                    <div class="breakdown-number">
                      <p>
                        <img src="../../images/home/breakdown-number-icon.png" alt="故障数" />
                      </p>
                      <p>故障数</p>
                      <p v-if="repairData.failuresNumber==undefined" v-font="20">0</p>
                      <p v-else v-font="20">{{repairData.failuresNumber}}</p>
                    </div>
                  </Cell>
                  <Cell :width="12" align="center">
                    <div class="assets-good">
                      <p>
                        <img src="../../images/home/assets-good-icon.png" alt="资产完好率" />
                      </p>
                      <p>资产完好率</p>
                      <p v-if="repairData.assetsIntactRate==undefined" v-font="20">0</p>
                      <p v-else v-font="20">{{repairData.assetsIntactRate}}</p>
                    </div>
                  </Cell>
                </Row>
              </div>
            </div>
          </Cell>
        </Row>
        <Row :space="5">
          <Cell :width="24">
            <div class="h-panel">
              <div class="h-panel-body">
                <h3 style="border-left:3px solid #3788ee;padding-left:2%;border-radius:2px;">报废信息</h3>
                <Row>
                  <Cell :width="24">
                    <div class="retirement-info">
                      <Row>
                        <Cell :width="8" align="left">
                          <p>
                            <img src="../../images/home/retirement-number-icon.png" alt="已报废数" />
                          </p>
                        </Cell>
                        <Cell :width="16" align="left">
                          <div class="info">
                            <p
                              v-if="scrapData.scrappedNumber==undefined"
                              class="black-color"
                              v-font="20"
                            >0</p>
                            <p v-else class="black-color" v-font="20">{{scrapData.scrappedNumber}}</p>
                            <p class="black-color">已报废数</p>
                          </div>
                        </Cell>
                      </Row>
                      <Row>
                        <Cell :width="8" align="left">
                          <p>
                            <img src="../../images/home/retirement-value-icon.png" alt="报废价值" />
                          </p>
                        </Cell>
                        <Cell :width="16" align="left">
                          <div class="info">
                            <p
                              v-if="scrapData.scrappedPrice==undefined"
                              class="black-color"
                              v-font="20"
                            >0</p>
                            <p v-else class="black-color" v-font="20">{{scrapData.scrappedPrice}}</p>
                            <p class="black-color">报废价值</p>
                          </div>
                        </Cell>
                      </Row>
                      <Row>
                        <Cell :width="8" align="left">
                          <p>
                            <img
                              src="../../images/home/year-retirement-number-icon.png"
                              alt="今年报废数量"
                            />
                          </p>
                        </Cell>
                        <Cell :width="16" align="left">
                          <div class="info">
                            <p
                              v-if="scrapData.thisYearScrappedNumber==undefined"
                              class="black-color"
                              v-font="20"
                            >0</p>
                            <p
                              v-else
                              class="black-color"
                              v-font="20"
                            >{{scrapData.thisYearScrappedNumber}}</p>
                            <p class="black-color">今年报废数量</p>
                          </div>
                        </Cell>
                      </Row>
                      <Row>
                        <Cell :width="8" align="left">
                          <p>
                            <img
                              src="../../images/home/year-retirement-value-icon.png"
                              alt="今年报废价值"
                            />
                          </p>
                        </Cell>
                        <Cell :width="16" align="left">
                          <div class="info">
                            <p
                              v-if="scrapData.thisYearScrappedPrice==undefined"
                              class="black-color"
                              v-font="20"
                            >0</p>
                            <p
                              v-else
                              class="black-color"
                              v-font="20"
                            >{{scrapData.thisYearScrappedPrice}}</p>
                            <p class="black-color">今年报废价值</p>
                          </div>
                        </Cell>
                      </Row>
                    </div>
                  </Cell>
                </Row>
              </div>
            </div>
          </Cell>
        </Row>
      </Cell>
    </Row>
  </div>
</template>
<script>
import curveChart from './curve_chart';
import histogram from './histogram_chart';
import informList from 'model/inform/informList';
import pieChart from './pie_chart';
import homeModel from 'model/home/home.js';
export default {
  components: {
    curveChart,
    histogram,
    pieChart
  },
  data() {
    return {
      informSearch: informList.parse({}),
      homeData: homeModel.parse({}),
      assetsData: {},
      repairData: {},
      scrapData: {},
      datas: [],
      inventoryDataOne: {},
      inventoryDataTwo: {},
      inventoryDataThree: {},
      inventoryOne: false,
      inventoryTwo: false,
      inventoryThree: false,
      noneInventoryData: false,
      showInventoryData: false
    };
  },
  mounted() {
    this.getData();
    document.getElementById('app').style = 'min-width:1366px;overflow:auto'
  },
  methods: {
    view(data) {
      this.$router.push({ path: '/notice_detail/' + data.id });
    },
    getData() {
      // 获取资产信息数据
      R.home.findAssetsInfo(homeModel.dispose(this.homeData)).then(resp => {
        if (resp.ok) {
          this.assetsData = resp.body;
        }
      });
      // 获取报修数据
      R.home.repairInfo(homeModel.dispose(this.homeData)).then(resp => {
        if (resp.ok) {
          this.repairData = resp.body;
        }
      });
      // 获取报废信息
      R.home.scrappedInfo(homeModel.dispose(this.homeData)).then(resp => {
        if (resp.ok) {
          this.scrapData = resp.body;
        }
      });
      this.informSearch.page = 1;
      this.informSearch.size = 8;
      R.ProjectInform.informList(informList.dispose(this.informSearch)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
        }
      });
      // 获取盘点信息
      R.home.inventoryInfo(homeModel.dispose(this.homeData)).then(resp => {
        if (resp.ok) {
          if (resp.body.length >= 3) {
            this.showInventoryData = true;
            this.inventoryDataOne = resp.body[0];
            this.inventoryDataTwo = resp.body[1];
            this.inventoryDataThree = resp.body[2];
            this.inventoryOne = true;
            this.inventoryTwo = true;
            this.inventoryThree = true;
          } else if (resp.body.length == 2) {
            this.showInventoryData = true;
            this.inventoryDataOne = resp.body[0];
            this.inventoryDataTwo = resp.body[1];
            this.inventoryOne = true;
            this.inventoryTwo = true;
          } else if (resp.body.length == 1) {
            this.showInventoryData = true;
            this.inventoryDataOne = resp.body[0];
            this.inventoryOne = true;
          } else {
            this.noneInventoryData = true;
          }
        }
      });
    }
  }
};
</script>
