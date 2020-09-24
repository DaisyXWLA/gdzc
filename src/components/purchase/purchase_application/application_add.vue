<style lang="less" scoped>
h3 {
  display: inline-block;
  padding: 1% 0;
}
.inputtwo {
  width: 104px;
  border: 1px solid #eee;
}
.inputthree {
  width: 74px;
  border: 1px solid #eee;
}
.inputfour {
  width: 42px;
  border: 1px solid #eee;
}
.inputfive {
  width: 84px;
  border: 1px solid #eee;
}
.inputsix {
  width: 74px;
  border: 1px solid #eee;
}
.inputseven {
  width: 74px;
  border: 1px solid #eee;
}
.inputeight {
  width: 104px;
  border: 1px solid #eee;
}
.inputnine {
  width: 74px;
  border: 1px solid #eee;
}
.inputten {
  width: 74px;
  border: 1px solid #eee;
}
.purchaseAssetsNameRed {
  width: 104px;
  border: 1px solid red;
  //不会撑开宽度
  box-sizing: border-box;
}
.specificationRed {
  width: 74px;
  border: 1px solid red;
}
.amountRed {
  width: 42px;
  border: 1px solid red;
}
.priceRed {
  width: 84px;
  border: 1px solid red;
}
.deleteIcon {
  font-size: 26px;
  vertical-align: middle;
  padding-right: 10px;
}
</style>
<template>
  <div>
    <!-- h-modal-header 将自带modal头部样式 -->
    <header class="h-modal-header modal-title">新增采购申请</header>
    <div style="padding:5px">
      <Form
        :label-width="110"
        mode="twocolumn"
        :model="PurchaseAdd"
        :rules="validationRules"
        ref="form"
        :top="0.2"
      >
        <FormItem label="标题：" :single="true" prop="title">
          <input type="text" v-model="PurchaseAdd.title" v-wordlimit="100" />
        </FormItem>
        <FormItem label="采购类型：" prop="type">
          <Select v-model="typeSelect" :null-option="false" :datas="typeParam"></Select>
        </FormItem>
        <FormItem label="申请编号：" prop="code">
          <input type="text" value="自动生成" readonly />
        </FormItem>
        <FormItem label="采购周期：" prop="time">
          <Row :space="0">
            <Cell width="17">
              <DateRangePicker v-model="PurchaseAdd.time" @confirm="changeDate"></DateRangePicker>
            </Cell>
            <Cell width="2">
              <span style="display:inline-block;margin-top:20%;padding-left:2px;">预计</span>
            </Cell>
            <Cell width="4">
              <input
                type="text"
                style="border: 1px solid #d3d3d3"
                v-model="PurchaseAdd.days"
                readonly
              />
            </Cell>
            <Cell width="1">
              <span style="display:inline-block;margin-top:40%;padding-left:2px;">日</span>
            </Cell>
          </Row>
        </FormItem>
        <FormItem label="申请金额：" prop="price">
          <NumberInput v-model="PurchaseAdd.price" :precision="2"></NumberInput>
        </FormItem>
        <FormItem label="申请人：" prop="loginName">
          <!-- <input type="text" v-model="PurchaseAdd.creator" v-wordlimit="15" readonly /> -->
          <Select v-model="PurchaseAdd.creator" :datas="user" :filterable="true"></Select>
        </FormItem>
        <FormItem label="申请时间：" prop="loginName">
          <!-- <input type="text" v-model="PurchaseAdd.createTime" v-wordlimit="15" readonly /> -->
          <DatePicker v-model="PurchaseAdd.createTime"></DatePicker>
        </FormItem>
        <FormItem label="备注：" :single="true" prop="loginName">
          <input type="text" v-model="PurchaseAdd.remarks" v-wordlimit="2000" />
        </FormItem>
      </Form>
    </div>
    <Row :space-y="20">
      <Cell :width="24">
        <h3 class="blue-color" v-font="16">采购资产</h3>
        <Button color="blue" icon="h-icon-plus" @click="addPurchaseAssets">新增</Button>
        <Button v-show="deleteBtn" color="red" icon="h-icon-trash" @click="remove">删除</Button>
      </Cell>
    </Row>
    <Row>
      <Cell :width="24">
        <Table
          ref="table"
          :datas="datas"
          :height="159"
          :loading="isLoading"
          @select="selectData"
          checkbox
        >
          <TableItem title="序号" :width="30" prop="$serial" align="center"></TableItem>
          <TableItem title="名称" :width="120" align="left">
            <template slot-scope="{ data }">
              <input
                :class="[data.purchaseAssetsNameClass==0?'inputtwo':'purchaseAssetsNameRed']"
                type="text"
                v-model="data.purchaseAssetsName"
                @blur="purchaseAssetsNameLeave(data)"
                v-wordlimit="50"
              />
            </template>
          </TableItem>
          <TableItem title="规格" :width="90" align="left">
            <template slot-scope="{ data }">
              <input
                :class="[data.specificationClass==0?'inputthree':'specificationRed']"
                type="text"
                v-model="data.specification"
                @blur="specificationLeave(data)"
                v-wordlimit="50"
              />
            </template>
          </TableItem>
          <TableItem title="数量" :width="60" align="left">
            <template slot-scope="{ data }">
              <input
                @input="amount(data)"
                @blur="amountLeave(data)"
                :class="[data.amountClass==0?'inputfour':'amountRed']"
                type="text"
                v-model.number="data.amount"
              />
            </template>
          </TableItem>
          <TableItem title="预计单价" :width="100" align="left">
            <template slot-scope="{ data }">
              <input
                @input="price(data)"
                @blur="priceLeave(data)"
                :class="[data.priceClass==0?'inputfive':'priceRed']"
                type="text"
                v-model.number="data.price"
              />
            </template>
          </TableItem>
          <TableItem title="品牌" :width="90" align="left">
            <template slot-scope="{ data }">
              <input
                class="inputsix"
                type="text"
                @blur="savePurchaseAssets(data)"
                v-model="data.brand"
                v-wordlimit="50"
              />
            </template>
          </TableItem>
          <TableItem title="单位" :width="90" align="left">
            <template slot-scope="{ data }">
              <input
                class="inputseven"
                type="text"
                @blur="savePurchaseAssets(data)"
                v-model="data.unit"
                v-wordlimit="10"
              />
            </template>
          </TableItem>
          <TableItem title="供应商" :width="120" align="left">
            <template slot-scope="{ data }">
              <input
                class="inputeight"
                type="text"
                @blur="savePurchaseAssets(data)"
                v-model="data.supplier"
                v-wordlimit="100"
              />
            </template>
          </TableItem>
          <TableItem title="备注" :width="90" align="left">
            <template slot-scope="{ data }">
              <input
                class="inputnine"
                type="text"
                @blur="savePurchaseAssets(data)"
                v-model="data.remarks"
                v-wordlimit="100"
              />
            </template>
          </TableItem>
          <TableItem title="小计" :width="90" align="left">
            <template slot-scope="{ data }">
              <input class="inputten" type="text" v-model="data.subtotal" readonly />
            </template>
          </TableItem>
          <div slot="empty">暂无数据</div>
        </Table>
      </Cell>
    </Row>
    <p v-height="2"></p>
    <Row :space-y="20">
      <Cell :width="24">
        <Row :space="5">
          <Cell :width="2">
            <h3 class="blue-color" v-font="16">相关附件</h3>
          </Cell>
          <Cell :width="22">
            <uploadFile @getUploadId="getUploadId"></uploadFile>
          </Cell>
        </Row>
        <div style="width:100% ;height:110px;">
          <div style="width:100% ;height:80px;">
            <Uploader type="images" data-type="url" :files="images" @deletefile="deletefile"></Uploader>
          </div>
          <div>
            <span class="upload-name" v-for="(d,i) of uploadNames" :key="i">{{ d }}</span>
          </div>
        </div>
      </Cell>
    </Row>
    <footer class="h-modal-footer">
      <button class="h-btn h-btn-primary" @click="save">保存</button>
      <button class="h-btn" @click="close">取消</button>
    </footer>
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
  </div>
</template>

<script>
import PurchaseAssetsModel from 'model/Purchase/PurchaseAssetsModel';
import PurchaseModel from 'model/Purchase/PurchaseModel';
import UploadModel from 'model/upload/upload';
import uploadFile from '../../common/gdzc/upload_file';
export default {
  components: {
    uploadFile
  },
  data() {
    return {
      link: this.FILEURL.imgUrl,
      linkT: this.FILEURL.imgUrlT,
      images: [],
      uploadIds: [],
      uploadNames: [],
      PurchaseAssetsAdd: PurchaseAssetsModel.parse({}),
      UploadAdd: UploadModel.parse({}),
      PurchaseAdd: PurchaseModel.parse({}),
      typeSelect: '0',
      typeParam: [
        { title: '资产采购', key: '0' },
        { title: '耗材采购', key: '1' }
      ],
      purchaseAssetsId: '',
      value: this.fruit,
      datas: [],
      xuhao: 1,
      labelPosition: 'right',
      hasCloseIcon: false,
      hasDivider: true,
      user: [],
      pagination: {
        page: 1,
        size: 5,
        total: 0
      },
      isLoading: false,
      validationRules: {
        required: ['title', 'time', 'price']
      },
      deleteBtn: false,
      deleteModal: false
    };
  },
  mounted() {
    this.PurchaseAdd.creator = Utils.getLocal('userId');
    this.PurchaseAdd.createTime = this.getTime();
    this.getUser();
  },
  methods: {
    // 获取申请人
    getUser() {
      R.pullDownList.user().then(resp => {
        if (resp.ok) {
          this.user = resp.body;
        }
      });
    },
    purchaseAssetsNameLeave(data) {
      if (data.purchaseAssetsName.length > 0) {
        data.purchaseAssetsNameClass = 0;
      } else {
        data.purchaseAssetsNameClass = 1;
      }
      this.savePurchaseAssets(data);
    },
    specificationLeave(data) {
      if (data.specification.length > 0) {
        data.specificationClass = 0;
      } else {
        data.specificationClass = 1;
      }
      this.savePurchaseAssets(data);
    },
    amountLeave(data) {
      if (data.amount.length > 0) {
        data.amountClass = 0;
      } else {
        data.amountClass = 1;
      }
      this.savePurchaseAssets(data);
    },
    priceLeave(data) {
      if (data.price.length > 0) {
        data.priceClass = 0;
      } else {
        data.priceClass = 1;
      }
      this.savePurchaseAssets(data);
    },
    savePurchaseAssets(data) {
      if (data.price.length > 0 && data.amount.length > 0 && data.specification.length > 0 && data.purchaseAssetsName.length > 0) {
        this.PurchaseAssetsAdd.id = data.id;
        this.PurchaseAssetsAdd.purchaseAssetsName = data.purchaseAssetsName;
        this.PurchaseAssetsAdd.specification = data.specification;
        this.PurchaseAssetsAdd.amount = data.amount;
        this.PurchaseAssetsAdd.price = data.price;
        this.PurchaseAssetsAdd.brand = data.brand;
        this.PurchaseAssetsAdd.unit = data.unit;
        this.PurchaseAssetsAdd.supplier = data.supplier;
        this.PurchaseAssetsAdd.remarks = data.remarks;
        this.PurchaseAssetsAdd.subtotal = data.subtotal;
        R.PurchaseAssets.AddPurchaseAssets(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
          if (resp.ok) {
            if (this.purchaseAssetsId.indexOf(resp.body.id) <= -1) {
              this.purchaseAssetsId += resp.body.id + ',';
            }
            data.id = resp.body.id;
          }
        });
      }
    },
    onUpload: function (e) {
      this.PurchaseAdd.file = e.target.files[0];
      R.Upload.Upload(PurchaseModel.dispose(this.PurchaseAdd)).then(resp => {
        if (resp.ok) {
        }
      });
    },
    // 新增资产信息
    addPurchaseAssets() {
      this.datas.push({
        id: '',
        purchaseAssetsName: '',
        specification: '',
        amount: '',
        price: '',
        brand: '',
        unit: '',
        supplier: '',
        remarks: '',
        subtotal: '',
        purchaseAssetsNameClass: 0,
        specificationClass: 0,
        amountClass: 0,
        priceClass: 0
      });
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
      for (let i = 0; i < this.$refs.table.getSelection().length; i++) {
        this.purchaseAssetsId = this.purchaseAssetsId.replace(this.$refs.table.getSelection()[i].id + ',', '');
        ids.push(this.$refs.table.getSelection()[i].id);
        for (let j = 0; j < this.datas.length; j++) {
          if (this.datas[j]._heyui_uuid.indexOf(this.$refs.table.getSelection()[i]._heyui_uuid) > -1) {
            this.datas.splice(j, 1);
          }
        }
      }
      this.PurchaseAssetsAdd.ids = ids.join(',');
      R.PurchaseAssets.DeletePurchaseAssets(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          this.$Message.success('刪除成功');
          this.deleteModal = false;
        }
      });
    },
    modalClose() {
      this.deleteModal = false;
    },
    // 控制删除按钮
    selectData(data) {
      if (data.length > 0) {
        this.deleteBtn = true;
      } else {
        this.deleteBtn = false;
      }
    },
    deletefile(file) {
      this.images.splice(file, 1);
      this.UploadAdd.ids = this.uploadIds[file];
      R.Upload.delete(UploadModel.dispose(this.UploadAdd)).then(resp => {
        if (resp.ok) {
        }
      });
      this.uploadIds.splice(file, 1);
      this.uploadNames.splice(file, 1);
    },
    getUploadId(data) {
      if (data.id.length > 10) {
        this.uploadIds.push(data.id);
        this.uploadNames.push(data.docName);
        this.$Message.success('上传成功');
        if (data.ext.indexOf('.doc') != -1) {
          this.images.push(this.linkT + 'doc.jpg');
        } else if (data.ext.indexOf('.xls') != -1) {
          this.images.push(this.linkT + 'xls.jpg');
        } else if (data.ext.indexOf('.jp') != -1) {
          this.images.push(this.link + data.name);
        } else if (data.ext.indexOf('.png') != -1) {
          this.images.push(this.link + data.name);
        } else {
          this.images.push(this.linkT + 'doc.jpg');
        }

        // document.querySelectorAll('.name');
      } else {
        this.$Message.error('上传失败');
      }
    },
    getData() {
      this.PurchaseAssetsAdd.userId = 'admin';
      this.PurchaseAssetsAdd.page = this.pagination.page;
      this.PurchaseAssetsAdd.size = this.pagination.size;
      R.PurchaseAssets.PurchaseAssetsList(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          // this.xuhao = resp.total + 1;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    getDataTwo() {
      this.PurchaseAssetsAdd.userId = 'admin';
      this.PurchaseAssetsAdd.page = this.pagination.page;
      this.PurchaseAssetsAdd.size = this.pagination.size;
      R.PurchaseAssets.PurchaseAssetsList(PurchaseAssetsModel.dispose(this.PurchaseAssetsAdd)).then(resp => {
        if (resp.ok) {
          this.datas = resp.body;
          for (let i = 0; i < this.datas.length; i++) {
            this.purchaseAssetsId += this.datas[i].id + ',';
          }
          // this.xuhao = resp.total + 1;
          this.pagination.page = resp.page;
          this.pagination.size = resp.size;
          this.pagination.total = resp.total;
        }
      });
    },
    price(data) {
      data.price = data.price.toString().replace(/[^\d]/g, '');
      if (data.price == '') {
        return;
      }
      if (data.amount != null) {
        data.subtotal = data.price * data.amount;
      }
      this.savePurchaseAssets(data);
    },
    amount(data) {
      data.amount = data.amount.toString().replace(/[^\d]/g, '');
      if (data == '') {
        return;
      }
      if (data.price != null) {
        data.subtotal = data.price * data.amount;
      }
      this.savePurchaseAssets(data);
    },
    save() {
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.PurchaseAdd.uploadId = this.uploadIds.toString();
        this.PurchaseAdd.purchaseAssetsId = this.purchaseAssetsId;
        this.PurchaseAdd.type = this.typeSelect;
        this.PurchaseAdd.startTime = this.PurchaseAdd.time.start;
        this.PurchaseAdd.endTime = this.PurchaseAdd.time.end;
        this.PurchaseAdd.purchaseType = '采购申请';
        if (this.PurchaseAdd.days > 0) {
        }
        R.Purchase.AddPurchase(PurchaseModel.dispose(this.PurchaseAdd)).then(resp => {
          if (resp.ok) {
            this.$Message.success('保存成功');
            this.check = 0;
            this.PurchaseAdd = PurchaseModel.parse({});
            this.$emit('getData');
            this.close();
          }
        });
      }
    },
    getTime() {
      var date = new Date();
      var seperator1 = '-';
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    changeDate() {
      this.PurchaseAdd.days = this.DataIff(this.PurchaseAdd.time.start, this.PurchaseAdd.time.end, 'day');
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
    close() {
      this.$emit('close');
    }
  }
};
</script>
