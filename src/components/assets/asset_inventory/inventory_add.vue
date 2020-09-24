<template>
  <div v-width="800">
    <header class="h-modal-header modal-title">新增盘点</header>
    <Row>
      <Cell :width="24">
        <Form
          ref="form"
          :label-width="120"
          :model="assetInventoryList"
          :top="0.2"
          :rules="validationRules"
          mode="twocolumn"
        >
          <FormItem label="标题" prop="title" single>
            <input type="text" v-model="assetInventoryList.title" v-wordlimit="100" />
          </FormItem>
          <FormItem label="盘点方式" prop="inventoryStyle">
            <Select
              v-model="assetInventoryList.inventoryStyle"
              class="select-demo"
              :datas="inventoryStyleVal"
            ></Select>
          </FormItem>
          <FormItem label="盘点人" prop="inventoryPeople">
            <Select
              v-model="assetInventoryList.inventoryPeople"
              class="select-demo"
              :datas="inventoryPeopleVal"
              :filterable="true"
            ></Select>
          </FormItem>
          <FormItem label="计划盘点时间" prop="time">
            <Row>
              <Cell width="16">
                <DateRangePicker
                  v-model="assetInventoryList.time"
                  @confirm="changeDate"
                  placeholder="开始 - 结束"
                  style="width:1%"
                ></DateRangePicker>
              </Cell>
              <Cell width="3" align="center">
                <span style="display:inline-block;margin-top:20%;">预计</span>
              </Cell>
              <Cell width="5">
                <input type="text" style="border: 1px solid #d3d3d3" v-model="days" readonly />
              </Cell>
            </Row>
          </FormItem>
          <FormItem label="盘点编号" prop="code">
            <input type="text" value="自动生成" readonly />
          </FormItem>
          <!-- <FormItem label="创建人" prop="creatorName">
            <input type="text" v-model="name" readonly />
          </FormItem>
          <FormItem label="创建日期" prop="createTime">
            <input type="text" v-model="currentTime" readonly />
          </FormItem>-->
          <FormItem label="备注" prop="remarks" single>
            <input type="text" v-model="assetInventoryList.remarks" v-wordlimit="2000" />
          </FormItem>
          <Row class="range">
            <h3 class="blue-color" style="padding-left:20px;">盘点范围</h3>
            <Cell :width="24">
              <FormItem single>
                <Radio :value="param[0]" v-model="assetInventoryList.inventoryRange"></Radio>
                <label>所有</label>
              </FormItem>
              <FormItem single>
                <Radio :value="param[1]" v-model="assetInventoryList.inventoryRange"></Radio>
                <label>盘点人负责的资产</label>
              </FormItem>
              <FormItem single>
                <Radio :value="param[2]" v-model="assetInventoryList.inventoryRange" checked></Radio>
                <label>指定部门</label>
                <Select
                  v-model="Department"
                  style="width: 40%;display:inline-block;"
                  class="select-demo"
                  :datas="useDepartment"
                  :filterable="true"
                ></Select>
              </FormItem>
              <FormItem single>
                <Radio :value="param[3]" v-model="assetInventoryList.inventoryRange"></Radio>
                <label>指定用户</label>
                <Select
                  v-model="user"
                  style="width: 40%;display:inline-block;"
                  class="select-demo"
                  :datas="inventoryPeopleVal"
                  :filterable="true"
                ></Select>
              </FormItem>
              <FormItem single class="select-category">
                <div class="category">
                  <div class="category-title">
                    <Radio :value="param[4]" v-model="assetInventoryList.inventoryRange"></Radio>
                    <label>指定类别</label>
                  </div>
                  <div class="category-list" style="display:inline-block;width: 40%">
                    <assetsCategory @categorySendToParent="getDataFromCategory"></assetsCategory>
                  </div>
                </div>
                <!-- <Radio :value="param[4]" v-model="assetInventoryList.inventoryRange"></Radio>
                <label>指定类别</label>
                <assetsCategory></assetsCategory>-->
                <!-- <Select
                  v-model="category"
                  style="width: 40%;display:inline-block;"
                  class="select-demo"
                  :datas="assetsCategory"
                  :filterable="true"
                ></Select>-->
              </FormItem>
            </Cell>
          </Row>
        </Form>
      </Cell>
    </Row>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="success">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
  </div>
</template>

<script>
import assetsCategory from '../components/assets_category';
import assetInventoryModel from 'model/Assets/AssetInventory';
export default {
  components: { assetsCategory },
  data() {
    return {
      assetInventoryList: assetInventoryModel.parse({}),
      inventoryStyleVal: [],
      inventoryPeopleVal: [],
      useDepartment: [],
      assetsCategory: [],
      param: ['所有资产', '盘点人负责的资产', '指定部门', '指定用户', '指定类别'],
      time: {},
      month: '',
      test: '',
      data: {
        value: {},
        date: null
      },
      validationRules: {
        required: ['title', 'time', 'inventoryPeople']
      },
      days: '',
      datas: [],
      Department: '',
      user: '',
      category: ''
      // name: '',
      // currentTime: ''
    };
  },
  mounted() {
    this.assetInventoryList.inventoryRange = '所有资产';
    // this.assetInventoryList.inventoryStyle = '1';
    this.getList();
  },
  methods: {
    getList() {
      R.pullDownList.user(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.inventoryPeopleVal = resp.body;
        }
      });
      R.pullDownList.department(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.useDepartment = resp.body;
        }
      });
      this.assetInventoryList.code = 'inventoryRange';
      R.pullDownList.findPullDownInfo(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.assetsCategory = resp.body;
        }
      });
      this.assetInventoryList.code = 'inventoryStyle';
      R.Inventory.findDictAll(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
        if (resp.ok) {
          this.inventoryStyleVal = resp.body;
        }
      });
      // //获取当前账号&时间
      // R.Scrapped.ScrappedGetUserAndDate(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
      //   if (resp.ok) {
      //     this.name = resp.body.username;
      //     this.currentTime = resp.body.now;
      //   }
      // });
    },
    getDataFromCategory(data) {
      this.category = data;
    },
    changeDate() {
      //   this.taskModel.planHours = this.DataIff(this.taskModel.time.start, this.taskModel.time.end, 'hour');
      this.days = this.DataIff(this.assetInventoryList.time.start, this.assetInventoryList.time.end, 'day');
    },
    // 计算日期差
    DataIff(startTime, endTime, diffType) {
      startTime = startTime.replace(/\-/g, '/');
      endTime = endTime.replace(/\-/g, '/');
      // 将计算间隔类性字符转换为小写
      diffType = diffType.toLowerCase();
      var sTime = new Date(startTime); // 开始时间
      var eTime = new Date(endTime); // 结束时间
      // 作为除数的数字
      var divNum = 1;
      switch (diffType) {
        case 'second':
          divNum = 1000;
          break;
        case 'minute':
          divNum = 1000 * 60;
          break;
        case 'hour':
          divNum = 1000 * 3600;
          break;
        case 'day':
          divNum = 1000 * 3600 * 24;
          break;
        default:
          break;
      }
      return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
    },
    success() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        if (this.assetInventoryList.inventoryRange == '指定部门') {
          if (this.Department.length > 0) {
            this.assetInventoryList.inventoryRange = this.Department;
          } else {
            this.$Message.warn('请选择要盘点的部门!');
            return;
          }
        }
        if (this.assetInventoryList.inventoryRange == '指定用户') {
          if (this.user.length > 0) {
            this.assetInventoryList.inventoryRange = this.user;
          } else {
            this.$Message.warn('请选择要盘点的用户!');
            return;
          }
        }
        if (this.assetInventoryList.inventoryRange == '指定类别') {
          if (this.category.length > 0) {
            this.assetInventoryList.inventoryRange = this.category;
          } else {
            this.$Message.warn('请选择要盘点的类别!');
            return;
          }
        }
        this.assetInventoryList.planStartTime = this.assetInventoryList.time.start;
        this.assetInventoryList.planEndTime = this.assetInventoryList.time.end;
        // this.assetInventoryList.createTime = this.currentTime;
        // this.assetInventoryList.creatorName = this.name;
        R.Inventory.save(assetInventoryModel.dispose(this.assetInventoryList)).then(resp => {
          if (resp.ok) {
            this.$Message.success(resp.body);
            this.assetInventoryList = assetInventoryModel.parse({});
            this.$emit('getData');
            this.close();
          }
        });
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="less" scoped>
@media screen and (max-width: 1366px) {
  .h-datetime-range /deep/ .h-datetime-show {
    min-width: 175px;
  }
}
@media screen and (min-width: 1366px) {
  .h-datetime-range /deep/ .h-datetime-show {
    min-width: 175px;
  }
}
@media screen and (min-width: 1920px) {
  .h-datetime-range /deep/ .h-datetime-show {
    min-width: 185px;
  }
}
.range {
  .h-form /deep/ .h-form-item {
    padding-bottom: 10px !important;
  }
}
.select-category {
  margin-bottom: 10%;
  .category {
    position: relative;
    .category-title {
      font-weight: 400;
      font-size: 13px;
      margin-top: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
    .category-list {
      position: absolute;
      top: 0;
      left: 12%;
    }
  }
}
/deep/ .h-tree-body {
  max-height: 8vh;
}
</style>
