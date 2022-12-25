<template>
  <div>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="ID" label="编号"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="number" label="数量"> </el-table-column>
      <el-table-column prop="prices" label="价格"> </el-table-column>
      <el-table-column prop="ckid" label="储存仓库"> </el-table-column>
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
            direction="rtl"
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
                <el-form-item label="储存仓库" :label-width="formLabelWidth">
                  <el-select v-model="form.region2" placeholder="请选择仓库id">
                    <el-option label="中国1号仓" value="c1001"></el-option>
                    <el-option label="美国1号仓" value="c1002"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button
                  type="primary"
                  @click="$refs.drawer.closeDrawer() "
                  :loading="loading"
                  >{{ loading ? "提交中 ..." : "确 定" }}</el-button
                >
              </div>
            </div>
          </el-drawer>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      style="margin: 20px"
      >新增商品信息</el-button
    >
    <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品编号" :label-width="formLabelWidth">
          <el-input v-model="form.spid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input v-model="form.newpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="form.newnumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.newprice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="储存仓库" :label-width="formLabelWidth">
          <el-input v-model="form.newarehouse" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertNewUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="text" @click="exportExecl" style="margin-left: 15px;">导出数据</el-button>
  </div>
</template>

<script>
import { deleteProductData } from "@/service/delete.js";
import { buyProductData } from "@/service/buyProduct.js";
import {insertProductData} from "@/service/insert.js"
import http from "@/service/index.js";
import ExportJsonExcel from "js-export-excel";
export default {
  name: "ProductView",
  data() {
    return {
      tableData: [],
      productID: "",
      productNumber: "",
      buyNumber: "",
      ghid: "",
      ckid: "",
      dialogFormVisible: false,
      dialog: false,
      loading: false,
      form: {
        spid: "",
        newpassword: "",
        newnumber: "",
        newprice: "",
        newarehouse: "",
        region: "",
        region2: "",
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
    exportExecl() {
      console.log("startloading");
      const datalist = this.tableData;
      let option = {};
      let dataTable = [];
      if (datalist) {
        for (let i in datalist) {
          let obj = {
            商品编号: datalist[i].ID,
            名称: datalist[i].name,
            数量: datalist[i].number,
            价格: datalist[i].prices,
            仓库: datalist[i].ckid,
          };
          dataTable.push(obj);
        }
      }
      option.fileName = "productdata";
      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "sheet",
          //   excel文件表头名
          sheetHeader: ["商品编号", "名称", "数量", "价格", "仓库"],
          //   excel文件列名
          sheetFilter: ["商品编号", "名称", "数量", "价格", "仓库"],
        },
      ];
      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel(); //下载
    },
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
      this.ckid = this.form.region2;
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
        this.productNumber,
        this.ckid
      );
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    async insertNewUser() {
      this.dialogFormVisible = false;
      // console.log(
      //   "插入的参数是",
      //   this.form.spid,
      //   this.form.newpassword,
      //   this.form.newnumber,
      //   this.form.newprice,
      //   this.form.newarehouse
      // );
      const insertDataRes = await insertProductData(
        this.form.spid,
        this.form.newpassword,
        this.form.newnumber,
        this.form.newprice,
        this.form.newarehouse
      );
      this.$notify({
        title: "成功",
        message: "数据插入成功",
        type: "success",
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
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
</style>

<style lang="scss">
.v-modal{
  z-index: 1 !important;
  // position: none !important
}
</style>
