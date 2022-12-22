<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="ghid" label="编号"> </el-table-column>
      <el-table-column prop="telephone" label="电话"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
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
            title="请确认您修改的供应商信息"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="rtl"
            custom-class="demo-drawer"
            ref="drawer"
          >
            <div class="demo-drawer__content">
              <el-form :model="form">
                <el-form-item label="供应商id" :label-width="formLabelWidth">
                  <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
                  <div>{{ username1 }}</div>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.telephone"
                    autocomplete="off"
                  ></el-input>
                  <!-- <div>{{ row.password }}</div> -->
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.name"
                    autocomplete="off"
                  ></el-input>
                  <!-- <div>{{ row.password }}</div> -->
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.address"
                    autocomplete="off"
                  ></el-input>
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
      >新增供应商信息</el-button
    >
    <el-dialog title="供应商信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.newghid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.newtelephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.newname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.newaddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertNewUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteSupplierData } from "@/service/delete.js";
import { updateSupplierData } from "@/service/update.js"; 
import { insertSupplierData } from "@/service/insert.js";
import http from "@/service/index.js";
export default {
  name: "supplierView",
  data() {
    return {
      tableData: [],
      username1: "",
      dialogFormVisible: false,
      dialog: false,
      loading: false,
      form: {
        address: "",
        telephone: "",
        name: "",
        newghid: "",
        newaddress: "",
        newname: "",
        newtelephone: "",
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
    updateRow(row) {
      this.username1 = row.ghid;
      this.dialog = true;
    },
    async deleteRow(row, tableData) {
      // console.log(row.ghid, tableData);
      const res = await deleteSupplierData(row.ghid)
      if (!res) {
        this.$notify({
          title: "成功",
          message: "数据删除成功,3s后返回主页面",
          type: "success",
        });
        setTimeout(() => {
          this.$router.push('/managementpage')
        }, 3000)
      }
      // alert("请联系商家进行操作");
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
      // console.log(
      //   "我传的参数是",
      //   this.username1,
      //   this.form.telephone,
      //   this.form.name,
      //   this.form.address,
      // );
      const res = await updateSupplierData(
        this.username1,
        this.form.telephone,
        this.form.name,
        this.form.address,
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
      //   this.form.newghid,
      //   this.form.newtelephone,
      //   this.form.newname,
      //   this.form.newaddress
      // );
      const insertDataRes = await insertSupplierData(
        this.form.newghid,
        this.form.newtelephone,
        this.form.newname,
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
    async getUserData() {
      const res = await http.get("/supplier/all");
      this.tableData = res.data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
