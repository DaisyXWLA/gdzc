<template>
  <div>
    <div class="assets-detail">
      <div class="header">
        <div class="header-con">
          <!-- <p>
            <i class="h-icon-close"></i>
          </p>-->
          <p>资产详情</p>
        </div>
      </div>
      <div class="content">
        <ul>
          <!-- <li class="assets-info">
            <div class="left">
              <h4>{{assetsData.assetsName}}</h4>
              <p>{{assetsData.newCode}}</p>
            </div>
            <div class="right">
              <span class="h-tag h-tag-bg-blue">{{assetsData.assetsStatusName}}</span>
            </div>
          </li>-->
          <li>
            <h4 class="title">基本信息</h4>
            <Form class="info-basic" :label-width="90" readonly>
              <FormItem label="资产名称">{{assetsData.assetsName}}</FormItem>
              <FormItem label="资产编号">{{assetsData.newCode}}</FormItem>
              <FormItem label="资产状态">{{assetsData.assetsStatusName}}</FormItem>
              <FormItem label="资产分类">{{assetsData.assetsCategoryName}}</FormItem>
              <FormItem label="使用部门">{{assetsData.useDepartmentName}}</FormItem>
              <FormItem label="管理部门">{{assetsData.administrativeDepartmentName}}</FormItem>
              <FormItem label="使用人">{{assetsData.username}}</FormItem>
              <FormItem label="存放地点">{{assetsData.storageLocation}}</FormItem>
            </Form>
          </li>
          <li>
            <h4 class="title">其他信息</h4>
            <Form class="info-basic" :label-width="90" readonly>
              <FormItem label="财政编号">{{assetsData.oldCode}}</FormItem>
              <FormItem label="取得日期">{{assetsData.acquisitionTime}}</FormItem>
              <FormItem label="品牌">{{assetsData.brand}}</FormItem>
              <FormItem label="型号">{{assetsData.specificationModel}}</FormItem>
              <FormItem label="单价">{{assetsData.price}}</FormItem>
              <FormItem label="贴签状态">{{assetsData.labelPrintNumberName}}</FormItem>
              <FormItem label="取得方式">{{assetsData.acquisitionMethodName}}</FormItem>
            </Form>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Login from 'model/login/Login';
import assetsModel from 'model/Assets/Assets';
export default {
  data() {
    return {
      login: Login.parse({}),
      assetsInfo: assetsModel.parse({}),
      assetsData: {}
    };
  },
  mounted() {
    // this.login.grant_type = 'password';
    // this.login.username = 'admin';
    // this.login.password = '1234';
    // Utils.saveLocal('token', 'Basic aHlrdy1nZHpjOmh5a3ctZ2R6Yy1zZWNyZXQ=');
    // R.Login.login(Login.dispose(this.login)).then(resp => {
    //   Utils.saveLocal('token', resp.tokenType + ' ' + resp.value);
    //   this.getData();
    // });
    this.getData();
  },
  methods: {
    getData() {
      this.assetsInfo.id = this.$route.params.id;
      R.Assets.findOne(assetsModel.dispose(this.assetsInfo)).then(resp => {
        if (resp.ok) {
          //this.assetsInfo = assetsModel.parse(resp.body);
          this.assetsData = resp.body;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.assets-detail {
  p {
    margin: 0;
  }
  .header {
    position: fixed;
    width: 100%;
    .header-con {
      padding: 0 20px;
      box-sizing: border-box;
      background: #2d7bf4;
      height: 50px;
      line-height: 50px;
      color: white;
      p {
        text-align: center;
      }
    }
  }
  .content {
    padding: 50px 0 0;
    ul {
      li {
        margin-bottom: 10px;
        background: white;
        padding: 25px 20px;
      }
      // .assets-info {
      //   // margin-top: 15px;
      //   line-height: 28px;
      //   overflow: hidden;
      //   .left {
      //     float: left;
      //     p {
      //       color: #888;
      //     }
      //   }
      //   .right {
      //     margin-top: 3%;
      //     float: right;
      //   }
      // }
      .title {
        padding-left: 10px;
        margin-bottom: 15px;
        border-left: 4px solid #2d7bf4;
        vertical-align: middle;
      }
    }
  }
}
.h-form .h-form-item {
  padding-bottom: 3px;
}
.h-form /deep/ .h-form-item-label {
  text-align: left;
}
.h-form-item {
  border-bottom: 1px solid #eee;
}
.h-row {
  margin: -10px -20px;
}
</style>
