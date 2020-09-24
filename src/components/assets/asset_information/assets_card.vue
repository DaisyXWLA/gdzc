<template>
  <div class="card" id="card">
    <div class="card-con">
      <div class="card-number">
        <div class="title">
          <p>固定资产卡片</p>
        </div>
        <div class="list">
          <p class="list-title">
            <span>卡片编号：</span>
            <span>{{cardData.oldCode}}</span>
          </p>
          <div class="list-con">
            <table>
              <tr>
                <td>类别编号</td>
                <td>{{cardData.assetsCategory}}</td>
                <td>固定资产名称</td>
                <td>{{cardData.assetsName}}</td>
              </tr>
              <tr>
                <td>类别名称</td>
                <td>{{cardData.assetsCategoryName}}</td>
                <td>规格、型号</td>
                <td>{{cardData.specificationModel}}</td>
              </tr>
              <tr>
                <td>增加方式</td>
                <td>{{cardData.procurementOrganizationForm}}</td>
                <td>原值</td>
                <td>
                  <span v-if="cardData.unitPrice == undefined"></span>
                  <span v-else>{{cardData.unitPrice}}</span>
                </td>
              </tr>
              <tr>
                <td>使用状况</td>
                <td>{{cardData.assetsStatus}}</td>
                <td>配置、备注</td>
                <td>{{cardData.remarks}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="service-condition">
        <table>
          <tr class="service-condition-title">
            <td rowspan="7">
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
            <td>使用或变更日期</td>
            <td>使用人签名</td>
            <td>使用部门</td>
            <td>存放地点</td>
            <td>变动原因</td>
          </tr>
          <tr class="service-condition-con">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="service-condition-con">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="service-condition-con">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="service-condition-con">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="service-condition-con">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { cardInfo: Object },
  data() {
    return {
      cardData: this.cardInfo
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.card {
  width: 794px;
  height: 561px;
  .card-con {
    margin: 40px;
    .card-number {
      .title {
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
              line-height: 30px;
              &:first-child {
                width: 6%;
              }
              &:nth-child(2) {
                width: 10%;
              }
              &:nth-child(3) {
                width: 6%;
              }
              &:nth-child(4) {
                width: 10%;
              }
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
            height: 30px;
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
</style>
