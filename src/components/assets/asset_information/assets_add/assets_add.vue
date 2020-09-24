<template>
  <div class="app-home-vue frame-page">
    <Row :space="20">
      <Cell :width="6">
        <div class="h-panel">
          <div class="national-title">国标分类</div>
          <div class="h-panel-body assets-category">
            <assetsCategory
              @categorySendToParent="getDataFromCategory"
              @categorySendName="categorySendName"
            ></assetsCategory>
          </div>
        </div>
      </Cell>
      <Cell :width="18">
        <component
          :is="componentName"
          ref="child"
          @getDataFromCategory="getDataFromCategory"
          @categorySendName="categorySendName"
        ></component>
      </Cell>
    </Row>
  </div>
</template>

<script>
import assetsCategory from '../../components/assets_category';
import commonCategory from '../../components/common_category';
import land from '../new_assets/land';
import house from '../new_assets/house';
import bulid from '../new_assets/build';
import generalEquipment from '../new_assets/general_equipment';
import vehicle from '../new_assets/vehicle';
import specializedEquipment from '../new_assets/specialized_equipment';
import culturalRelic from '../new_assets/cultural_relic';
import booksFile from '../new_assets/books_file';
import furniture from '../new_assets/furniture';
import specialPlantAnimal from '../new_assets/special_plant_animal';
import patents from '../new_assets/patents';
import generic from '../new_assets/generic';
import copyright from '../new_assets/copyright';
// import resource from '../new_assets/resource';
import brand from '../new_assets/brand';
// import information from '../new_assets/information';
import mark from '../new_assets/mark';
import goodwill from '../new_assets/goodwill';

export default {
  components: {
    assetsCategory, // 国标分类
    commonCategory, // 常用分类
    land, // 土地
    house, // 房屋
    bulid, // 构建物
    generalEquipment, // 通用设备
    vehicle, // 车辆
    specializedEquipment, // 专用设备
    culturalRelic, // 文物和陈列品
    booksFile, // 图书、档案
    furniture, // 家具、用具、装具
    specialPlantAnimal, // 特种动植物
    patents, // 无形资产_专利
    generic, // 无形资产_非专利技术
    copyright, // 无形资产_著作权
    // resource, //无形资产_资源资质
    brand, // 无形资产_商标
    // information, //无形资产_信息数据
    mark, // 无形资产_商号（标志）
    goodwill // 无形资产_商誉（管理经营）
  },
  data() {
    return {
      componentName: 'commonCategory',
      categoryName: ''
    };
  },
  mounted() {},
  methods: {
    categorySendName(data) {
      this.categoryName = data;
    },
    // 获取分类组件的数据并根据资产编号判断表单组件
    getDataFromCategory(data) {
      if (data.substring(0, 3) == '101' || data.substring(0, 3) == '100') {
        this.componentName = 'land';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 3) == '102') {
        this.componentName = 'house';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 3) == '103') {
        this.componentName = 'bulid';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 1) == '2') {
        if (data.substring(0, 3) == '203') {
          this.componentName = 'vehicle';
          setTimeout(() => {
            this.$refs.child.getcategoryName(this.categoryName);
          }, 100);
        } else {
          this.componentName = 'generalEquipment';
          setTimeout(() => {
            this.$refs.child.getcategoryName(this.categoryName);
          }, 100);
        }
      } else if (data.substring(0, 1) == '3') {
        this.componentName = 'specializedEquipment';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 1) == '4') {
        this.componentName = 'culturalRelic';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 1) == '5') {
        this.componentName = 'booksFile';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 3) == '601' || data.substring(0, 3) == '602') {
        this.componentName = 'furniture';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 3) == '603' || data.substring(0, 3) == '604') {
        this.componentName = 'specialPlantAnimal';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 5) == '60501') {
        this.componentName = 'patents';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 5) == '60502') {
        this.componentName = 'generic';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 5) == '60503') {
        this.componentName = 'brand';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 5) == '60504') {
        this.componentName = 'copyright';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data.substring(0, 5) == '60505') {
        this.componentName = 'land';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (
        data.substring(0, 7) == '6050601' ||
        data.substring(0, 7) == '6050602' ||
        data.substring(0, 7) == '6050603' ||
        data.substring(0, 7) == '6050600'
      ) {
        this.componentName = 'goodwill';
        setTimeout(() => {
          this.$refs.child.getcategoryName(this.categoryName);
        }, 100);
      } else if (data == 1) {
        this.componentName = 'commonCategory';
      }
      // setTimeout(() => {
      //   this.$refs.child.getcategoryName(this.categoryName);
      // }, 100);
    }
  }
};
</script>
<style lang="less" scoped>
.assets-category {
  min-height: calc(100vh - 60px - 45px - 115px);
}
/deep/ .h-panel {
  min-height: calc(100vh - 60px - 45px - 50px);
}
.national-title {
  font-weight: bold;
  font-size: 16px;
  padding: 25px 20px 15px;
  border-bottom: 1px solid #eee;
}
</style>
