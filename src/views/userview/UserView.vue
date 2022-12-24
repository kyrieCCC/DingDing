<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
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
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                  <div>{{ username1 }}</div>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.password"
                    autocomplete="off"
                  ></el-input>
                  <!-- <div>{{ row.password }}</div> -->
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.password2"
                    autocomplete="off"
                  ></el-input>
                  <!-- <div>{{ row.password }}</div> -->
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="请选择性别">
                    <el-option label="男" value="boy"></el-option>
                    <el-option label="女" value="girl"></el-option>
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
    <div style="width: 300px; margin-top: 20px; margin-left: 20px;">
      <el-input
        placeholder="请输入要查询的用户名"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" @click="seacherUser"></el-button>
      </el-input>
    </div>
    <el-button
      type="text"
      @click="dialogFormVisible = true"
      style="margin: 20px"
      >新增用户信息</el-button
    >
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.newpassword" autocomplete="off"></el-input>
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
    <el-button type="text" @click="exportExecl" style="margin-left: 15px"
      >导出数据</el-button
    >
  </div>
</template>

<script>
import { deleteData } from "@/service/delete.js";
import { updateData } from "@/service/update.js";
import { insertData } from "@/service/insert.js";
import ExportJsonExcel from "js-export-excel";
import http from "@/service/index.js";
export default {
  name: "UserView",
  data() {
    return {
      tableData: [],
      input3: "",
      username1: "",
      dialogFormVisible: false,
      dialog: false,
      loading: false,
      form: {
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
  },
  methods: {
    async seacherUser() {
      if (this.input3) {
        const seacherRes = await http.get('/seacherUser', { params: { username: this.input3 } })
        this.tableData = seacherRes.data.data
      }
      else {
        await this.getUserData();
      }
    },
    exportExecl() {
      console.log("startloading");
      const datalist = this.tableData;
      let option = {};
      let dataTable = [];
      if (datalist) {
        for (let i in datalist) {
          let obj = {
            用户名: datalist[i].username,
            密码: datalist[i].password,
            性别: datalist[i].sex,
          };
          dataTable.push(obj);
        }
      }
      option.fileName = "userdata";
      option.datas = [
        {
          //   excel文件的数据源
          sheetData: dataTable,
          //   excel文件sheet的表名
          sheetName: "sheet",
          //   excel文件表头名
          sheetHeader: ["用户名", "密码", "性别"],
          //   excel文件列名
          sheetFilter: ["用户名", "密码", "性别"],
        },
      ];
      //   创建ExportJsonExcel实例对象
      let toExcel = new ExportJsonExcel(option);
      //   调用保存方法
      toExcel.saveExcel(); //下载
    },
    updateRow(row) {
      this.username1 = row.username;
      this.dialog = true;
    },
    async handleClose(done) {
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
      console.log(
        "我传的参数是",
        this.username1,
        this.form.password,
        this.form.region
      );
      const res = await updateData(
        this.username1,
        this.form.password,
        this.form.region
      );
    },
    async deleteRow(row, tableData) {
      // console.log(row.username, tableData);
      const res = await deleteData(row.username);
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
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    async getUserData() {
      const res = await http.get("/user/all");
      this.tableData = res.data.data;
    },
    async insertNewUser() {
      this.dialogFormVisible = false;
      console.log(
        "插入的参数是",
        this.form.name,
        this.form.newpassword,
        this.form.sex
      );
      const insertDataRes = await insertData(
        this.form.name,
        this.form.newpassword,
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
  },
};
</script>

<style lang="scss" scoped></style>
