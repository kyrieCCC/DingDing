<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="ID" label="工号"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="telephone" label="电话"> </el-table-column>
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
          title="请确认您修改的用户信息"
          :before-close="handleClose"
          :visible.sync="dialog"
          direction="rtl"
          custom-class="demo-drawer"
          ref="drawer"
        >
          <div class="demo-drawer__content">
            <el-form :model="form">
              <el-form-item label="工号" :label-width="formLabelWidth">
                <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                <div>{{ username1 }}</div>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
                <!-- <div>{{ row.password }}</div> -->
              </el-form-item>
              <el-form-item label="确认密码" :label-width="formLabelWidth">
                <el-input
                  v-model="form.password2"
                  autocomplete="off"
                ></el-input>
                <!-- <div>{{ row.password }}</div> -->
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.telephone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择性别">
                  <el-option label="男" value="man"></el-option>
                  <el-option label="女" value="women"></el-option>
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
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      style="margin: 20px"
      >新增管理员信息</el-button
    >
    <el-dialog title="管理员信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="工号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.newpassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.newTelephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="boy"></el-option>
            <el-option label="女" value="girl"></el-option>
          </el-select>
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
import { deleteAdminData } from "@/service/delete.js";
import { updateAdminData } from "@/service/update.js"
import { insertAdminData } from '@/service/insert.js'
import ExportJsonExcel from "js-export-excel";
export default {
  name: "AdminView",
  props: ["id"],
  data() {
    return {
      tableData: [],
      username1: "",
      dialogFormVisible: false,
      dialog: false,
      loading: false,
      form: {
        telephone: '',
        newTelephone: '',
        sex: "",
        name: "",
        password: "",
        newpassword: "",
        password2: "",
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
    await this.getUserData();
    // console.log(this.id)
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
            工号: datalist[i].ID,
            密码: datalist[i].password,
            性别: datalist[i].sex,
            电话: datalist[i].telephone,
          };
          dataTable.push(obj);
        }
      }
      option.fileName = "admindata";
      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "sheet",
          //   excel文件表头名
          sheetHeader: ["工号", "密码", "性别", "电话"],
          //   excel文件列名
          sheetFilter: ["工号", "密码", "性别", "电话"],
        },
      ];
      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel(); //下载
    },
    updateRow(row) {
      this.username1 = row.ID;
      this.dialog = true;
    },
    async deleteRow(row, tableData) {
      if (this.id === '1001') {
        const deleteRes = await deleteAdminData(row.ID);
        this.$notify({
          title: "成功",
          message: "数据删除成功",
          type: "success",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
      alert("您无此权限");
    },
    async handleClose(done) { //修改信息
      if (this.id !== '1001') {
        alert("您无此权限");
        return
      }
      if (this.loading) {
        return;
      }
      if (this.form.password !== this.form.password2) {
        this.$notify({
          title: "失败",
          message: "两次输入的密码不一致",
          type: "warning",
        });
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
      //   this.form.password,
      //   this.form.telephone,
      //   this.form.region
      // );
      const res = await updateAdminData(
        this.username1,
        this.form.password,
        this.form.telephone,
        this.form.region
      );
    },
    async getUserData() {
      const res = await http.get("/admin/all");
      this.tableData = res.data.data;
    },
    async insertNewUser() {
      this.dialogFormVisible = false;
      // console.log(
      //   "插入的参数是",
      //   this.form.name,
      //   this.form.newpassword,
      //   this.form.newTelephone,
      //   this.form.sex
      // );
      const insertDataRes = await insertAdminData(
        this.form.name,
        this.form.newpassword,
        this.form.newTelephone,
        this.form.sex
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
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
  },
};
</script>

<style lang="scss" scoped></style>
