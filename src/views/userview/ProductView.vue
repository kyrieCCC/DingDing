<template>
  <div>
    <el-table :data="tableData" style="width: 100%" max-height="600">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="ID" label="编号"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="number" label="数量"> </el-table-column>
      <el-table-column prop="prices" label="价格"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="50">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="150">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="buyProduct(scope.row, tableData)"
            type="text"
            size="small"
          >
            进货
          </el-button>
          <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
          <el-drawer
            title="请确认您的购货信息"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="ltr"
            custom-class="demo-drawer"
            ref="drawer"
          >
            <div class="demo-drawer__content">
              <el-form :model="form">
                <el-form-item label="商品编号" :label-width="formLabelWidth">
                  <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                  <div>{{ productID }}</div>
                </el-form-item>
                <el-form-item label="当前数量" :label-width="formLabelWidth">
                  <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                  <div>{{ productNumber }}</div>
                </el-form-item>
                <el-form-item label="购入数量" :label-width="formLabelWidth">
                  <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                  <el-input v-model="buyNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="供货商" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择供货商id">
                    <el-option label="g1001" value="g1001"></el-option>
                    <el-option label="g1002" value="g1002"></el-option>
                    <el-option label="g1003" value="g1003"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button
                  type="primary"
                  @click="$refs.drawer.closeDrawer()"
                  :loading="loading"
                  >{{ loading ? "提交中 ..." : "确 定" }}</el-button
                >
              </div>
            </div>
          </el-drawer>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteProductData } from "@/service/delete.js";
import { buyProductData } from "@/service/buyProduct.js";
import http from "@/service/index.js";
export default {
  name: "ProductView",
  data() {
    return {
      tableData: [],
      productID: "",
      productNumber: "",
      buyNumber: "",
      ghid: "",
      dialogFormVisible: false,
      dialog: false,
      loading: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      timer: null,
    };
  },
  async mounted() {
    await this.getProductData();
  },
  methods: {
    buyProduct(row, tableData) {
      this.productID = row.ID;
      this.productNumber = row.number;
      this.dialog = true;
    },
    async deleteRow(row, tableData) {
      // console.log(row.username, tableData);
      const res = await deleteProductData(row.ID);
      if (!res) {
        this.$notify({
          title: "成功",
          message: "数据删除成功,3s后返回主页面",
          type: "success",
        });
        setTimeout(() => {
          this.$router.push("/managementpage");
        }, 3000);
      }
    },
    async getProductData() {
      const res = await http.get("/product/all");
      this.tableData = res.data.data;
    },
    async handleClose(done) {
      this.ghid = this.form.region;
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
            this.$notify({
              title: "成功",
              message: "数据更新成功",
              type: "success",
            });
            setTimeout(() => { 
              location.reload();
            },1000)
          }, 2000);
        })
        .catch((_) => {});
      console.log(
        "我传的参数是",
        this.productID,
        this.ghid,
        this.buyNumber,
        this.productNumber
      );
      const res = await buyProductData(
        this.productID,
        this.ghid,
        this.buyNumber,
        this.productNumber
      );
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
// .el-popup-parent--hidden /deep/ .v-modal{
//   display: static;
// }
</style>
<style lang="scss">
.v-modal {
  // display: static !important
  z-index: -1 !important;
}
</style>
