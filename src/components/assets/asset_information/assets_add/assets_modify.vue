<template>
  <div class="app-home-vue frame-page">
    <component :is="componentName" ref="child"></component>
  </div>
</template>

<script>
import land from '../modify_assets/land';
import house from '../modify_assets/house';
import bulid from '../modify_assets/build';
import generalEquipment from '../modify_assets/general_equipment';
import vehicle from '../modify_assets/vehicle';
import specializedEquipment from '../modify_assets/specialized_equipment';
import culturalRelic from '../modify_assets/cultural_relic';
import booksFile from '../modify_assets/books_file';
import furniture from '../modify_assets/furniture';
import specialPlantAnimal from '../modify_assets/special_plant_animal';
import patents from '../modify_assets/patents';
import generic from '../modify_assets/generic';
import copyright from '../modify_assets/copyright';
// import resource from '../new_assets/resource';
import brand from '../modify_assets/brand';
// import information from '../new_assets/information';
import mark from '../modify_assets/mark';
import goodwill from '../modify_assets/goodwill';

export default {
  components: {
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
      componentName: '',
      categoryName: '',
      AssetsId: ''
    };
  },
  mounted() {
    this.getDataFromCategory(this.$route.query.Category);
    this.categorySendName(this.$route.query.CategoryName);
    this.AssetsId = this.$route.query.Id;
  },
  watch: {
    $route(to, from) {
      this.AssetsId = this.$route.query.Id;
      this.getDataFromCategory(this.$route.query.Category);
      this.categorySendName(this.$route.query.CategoryName);
      // this.$Loading();
    }
  },
  methods: {
    categorySendName(data) {
      this.categoryName = data;
    },
    // 获取分类组件的数据并根据资产编号判断表单组件
    getDataFromCategory(data) {
      if (data.substring(0, 3) == '101' || data.substring(0, 3) == '100') {
        this.componentName = 'land';
      } else if (data.substring(0, 3) == '102') {
        this.componentName = 'house';
      } else if (data.substring(0, 3) == '103') {
        this.componentName = 'bulid';
      } else if (data.substring(0, 1) == '2') {
        if (data.substring(0, 3) == '203') {
          this.componentName = 'vehicle';
        } else {
          this.componentName = 'generalEquipment';
        }
      } else if (data.substring(0, 1) == '3') {
        this.componentName = 'specializedEquipment';
      } else if (data.substring(0, 1) == '4') {
        this.componentName = 'culturalRelic';
      } else if (data.substring(0, 1) == '5') {
        this.componentName = 'booksFile';
      } else if (data.substring(0, 3) == '601' || data.substring(0, 3) == '602') {
        this.componentName = 'furniture';
      } else if (data.substring(0, 3) == '603' || data.substring(0, 3) == '604') {
        this.componentName = 'specialPlantAnimal';
      } else if (data.substring(0, 5) == '60501') {
        this.componentName = 'patents';
      } else if (data.substring(0, 5) == '60502') {
        this.componentName = 'generic';
      } else if (data.substring(0, 5) == '60503') {
        this.componentName = 'brand';
      } else if (data.substring(0, 5) == '60504') {
        this.componentName = 'copyright';
      } else if (data.substring(0, 5) == '60505') {
        this.componentName = 'land';
      } else if (data.substring(0, 7) == '6050601' || data.substring(0, 7) == '6050602' || data.substring(0, 7) == '6050603') {
        this.componentName = 'goodwill';
      }
      setTimeout(() => {
        this.$refs.child.getAssetsId(this.AssetsId);
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .h-panel-body {
  height: calc(100vh - 60px - 45px - 45px);
  overflow: auto;
}
</style>
