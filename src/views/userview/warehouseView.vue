<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="ckid" label="仓库编号"> </el-table-column>
      <el-table-column prop="ckdz" label="仓库地址"> </el-table-column>
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
            title="请确认您修改的仓库信息"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="rtl"
            custom-class="demo-drawer"
            ref="drawer"
          >
            <div class="demo-drawer__content">
              <el-form :model="form">
                <el-form-item label="仓库编号" :label-width="formLabelWidth">
                  <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                  <div>{{ username1 }}</div>
                </el-form-item>
                <el-form-item label="仓库地址" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.address"
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
      >新增仓库信息</el-button
    >
    <el-dialog title="仓库信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="仓库编号" :label-width="formLabelWidth">
          <el-input v-model="form.newckid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址" :label-width="formLabelWidth">
          <el-input v-model="form.newaddress" autocomplete="off"></el-input>
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
import http from "@/service/index";
import { deleteWarehouseData } from "@/service/delete.js";
import { updateWarehouseData } from "@/service/update.js";
import { insertWarehouseData } from "@/service/insert.js";
import ExportJsonExcel from "js-export-excel";
export default {
  name: "warehouseView",
  data() {
    return {
      tableData: [],
      username1: "",
      dialogFormVisible: false,
      dialog: false,
      loading: false,
      form: {
        address: "",
        newaddress: "",
        newckid: "",
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
            仓库编号: datalist[i].ckid,
            仓库地址: datalist[i].ckdz,
          };
          dataTable.push(obj);
        }
      }
      option.fileName = "warehousedata";
      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "sheet",
          //   excel文件表头名
          sheetHeader: ["仓库编号", "仓库地址"],
          //   excel文件列名
          sheetFilter: ["仓库编号", "仓库地址"],
        },
      ];
      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel(); //下载
    },
    updateRow(row, tableData) {
      this.username1 = row.ckid;
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
      //   this.form.address,
      // );
      const res = await updateWarehouseData(
        this.username1,
        this.form.address
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
      //   this.form.newckid,
      //   this.form.newaddress
      // );
      const insertDataRes = await insertWarehouseData(
        this.form.newckid,
        this.form.newaddress
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
      const res = await deleteWarehouseData(row.ckid);
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
      const res = await http.get("/warehouse");
      this.tableData = res.data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
