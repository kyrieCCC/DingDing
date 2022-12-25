<template>
  <div>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="ID" label="商品编号"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="number" label="购入数量"> </el-table-column>
      <el-table-column prop="send" label="是否发货"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
          <el-button
            @click.native.prevent="updateRow(scope.row, tableData)"
            type="text"
            size="small"
          >
            修改
          </el-button>
          <el-button
            @click.native.prevent="sendGoods(scope.row, tableData)"
            type="text"
            size="small"
          >
            发货
          </el-button>
          <el-drawer
            title="请确认您的发货信息"
            :before-close="handleCloseSendGoods"
            :visible.sync="dialog1"
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
                <el-form-item label="储存仓库" :label-width="formLabelWidth">
                  <el-select v-model="form.region2" placeholder="请选择仓库id">
                    <el-option label="中国1号仓" value="c1001"></el-option>
                    <el-option label="美国1号仓" value="c1002"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <!--@click="$refs.drawer.closeDrawer()" -->
                <el-button
                  type="primary"
                  @click="sendData"
                  :loading="loading"
                  >{{ loading ? "提交中 ..." : "确 定" }}</el-button
                >
              </div>
            </div>
          </el-drawer>
          <el-drawer
            title="请确认您修改的订单信息"
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
                  <div>{{ username1 }}</div>
                </el-form-item>
                <el-form-item label="顾客名" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.username"
                    autocomplete="off"
                  ></el-input>
                  <!-- <div>{{ row.password }}</div> -->
                </el-form-item>
                <el-form-item label="购买数量" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.buynumber"
                    autocomplete="off"
                  ></el-input>
                  <!-- <div>{{ row.password }}</div> -->
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
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      style="margin: 20px"
      >新增订单信息</el-button
    >
    <el-dialog title="订单信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品编号" :label-width="formLabelWidth">
          <el-input v-model="form.newID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顾客名" :label-width="formLabelWidth">
          <el-input v-model="form.newusername" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="购买数量" :label-width="formLabelWidth">
          <el-input v-model="form.newnumber" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertNewUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="text" @click="exportExecl" style="margin-left: 15px"
      >导出数据</el-button
    >
  </div>
</template>

<script>
import { deleteSaleData } from "@/service/delete.js";
import { updateSaleData } from "@/service/update.js";
import { insertSaleData } from "@/service/insert.js";
import { updateSendData } from "@/service/update.js";
import http from "@/service/index.js";
import ExportJsonExcel from "js-export-excel";
export default {
  name: "saleView",
  data() {
    return {
      tableData: [],
      number: "",
      number1: "", //带1的都是发货时候传出的数据
      username1: "",
      username2: "",
      dialogFormVisible: false,
      dialog1: false,
      dialog: false,
      loading: false,
      loading1: false,
      productID: "",
      form: {
        username: "",
        region2: "",
        buynumber: "",
        newID: "",
        newnumber: "",
        newusername: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      timer: null,
      timer1: null,
    };
  },
  async mounted() {
    await this.getUserData();
  },
  methods: {
    async sendGoods(row) {
      this.productID = row.ID;
      this.username2 = row.username;
      this.number1 = row.number;
      this.dialog1 = true;
    },
    async handleCloseSendGoods(done) {
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
            }, 1000);
          }, 2000);
        })
        .catch((_) => {});
      // console.log('我要传参数啊！！！', this.productID, this.username2, this.number1)
      // const sendRes = await updateSendData(this.productID, this.username2, this.number1)
      // this.dialog1 = false
    },
    async sendData() {
      console.log(
        "我要传参数啊！！！",
        this.productID,
        this.username2,
        this.number1
      );
      const sendRes = await updateSendData(
        this.productID,
        this.username2,
        this.number1
      );
      this.dialog1 = false;
      this.$notify({
        title: "成功",
        message: "数据更新成功",
        type: "success",
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    exportExecl() {
      console.log("startloading");
      const datalist = this.tableData;
      let option = {};
      let dataTable = [];
      if (datalist) {
        for (let i in datalist) {
          let obj = {
            商品编号: datalist[i].ID,
            顾客名: datalist[i].username,
            数量: datalist[i].number,
          };
          dataTable.push(obj);
        }
      }
      option.fileName = "saledata";
      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "sheet",
          //   excel文件表头名
          sheetHeader: ["商品编号", "顾客名", "数量"],
          //   excel文件列名
          sheetFilter: ["商品编号", "顾客名", "数量"],
        },
      ];
      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel(); //下载
    },
    updateRow(row, tableData) {
      this.username1 = row.ID;
      this.dialog = true;
    },
    async handleClose(done) {
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
            }, 1000);
          }, 2000);
        })
        .catch((_) => {});
      // console.log(
      //   "我传的参数是",
      //   this.username1,
      //   this.form.username,
      //   this.form.buynumber,
      // );
      const res = await updateSaleData(
        this.username1,
        this.form.username,
        this.form.buynumber
      );
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      this.dialog1 = false;
      clearTimeout(this.timer);
    },
    async insertNewUser() {
      this.dialogFormVisible = false;
      // console.log(
      //   "插入的参数是",
      //   this.form.newID,
      //   this.form.newusername,
      //   this.form.newnumber,
      // );
      const insertDataRes = await insertSaleData(
        this.form.newID,
        this.form.newusername,
        this.form.newnumber
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
    async deleteRow(row, tableData) {
      // console.log(row.ID, tableData);
      const res = await deleteSaleData(row.ID, row.username, row.number);
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
    async getUserData() {
      const res = await http.get("/sale/all");
      this.tableData = res.data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
