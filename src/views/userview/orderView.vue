<template>
  <div>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="ID" label="商品编号"> </el-table-column>
      <el-table-column prop="ghid" label="供货商"> </el-table-column>
      <el-table-column prop="buynumber" label="购入数量"> </el-table-column>
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
          <el-drawer
            title="请确认您修改的购货信息"
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
                <el-form-item label="供货商" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.ghid"
                    autocomplete="off"
                  ></el-input>
                  <!-- <div>{{ row.password }}</div> -->
                </el-form-item>
                <el-form-item label="购买数量" :label-width="formLabelWidth">
                  <el-input v-model="form.buynumber" autocomplete="off"></el-input>
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
      >新增购货信息</el-button
    >
    <el-dialog title="购货信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品编号" :label-width="formLabelWidth">
          <el-input v-model="form.newID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="供货商" :label-width="formLabelWidth">
          <el-select v-model="form.newghid" placeholder="请选择供货商">
            <el-option label="中国1号仓" value="c1001"></el-option>
            <el-option label="美国1号舱" value="c1002"></el-option>
          </el-select>
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
    <el-button type="text" @click="exportExecl" style="margin-left: 15px;">导出数据</el-button>
  </div>
</template>

<script>
import { deleteOrderData } from "@/service/delete.js"; 
import { updateOrderData } from "@/service/update.js";
import { insertOrderData } from "@/service/insert.js";
import http from "@/service/index.js";
import ExportJsonExcel from "js-export-excel";
export default {
  name: "orderView",
  data() {
    return {
      tableData: [],
      username1: "",
      dialogFormVisible: false,
      dialog: false,
      loading: false,
      form: {
        ghid: "",
        buynumber: "",
        newghid: "",
        newID: "", 
        newnumber: "",
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
    await this.getUserData();
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
            供货商编号: datalist[i].ghid,
            购买数量: datalist[i].buynumber,
          };
          dataTable.push(obj);
        }
      }
      option.fileName = "orderdata";
      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "sheet",
          //   excel文件表头名
          sheetHeader: ["商品编号", "供货商编号", "购买数量"],
          //   excel文件列名
          sheetFilter: ["商品编号", "供货商编号", "购买数量"],
        },
      ];
      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel(); //下载
    },
    updateRow(row, tableData) {
      this.username1 = row.ID;
      this.productNumber = row.number;
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
      //   this.form.ghid,
      //   this.form.buynumber,
      // );
      const res = await updateOrderData(
        this.username1,
        this.form.ghid,
        this.form.buynumber,
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
      //   this.form.newID,
      //   this.form.newghid,
      //   this.form.newnumber,
      // );
      const insertDataRes = await insertOrderData(
        this.form.newID,
        this.form.newghid,
        this.form.newnumber,
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
      // console.log(row.username, tableData);
      const res = await deleteOrderData(row.ID, row.buynumber);
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
      const res = await http.get("/order/all");
      this.tableData = res.data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
