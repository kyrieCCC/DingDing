<template>
  <div>
    <div style="display: flex; justify-content: center; align-items: center">
      <div class="registerForm">
        <div style="margin: 20px"></div>
        <div class="registerFont">请输入您的登录信息</div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="formLabelAlign"
        >
          <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="登陆密码">
            <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="formLabelAlign.sex"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { insertData } from "../../service/insert.js";
import router from "@/router";
export default {
  name: "Register",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
        sex: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const res = await insertData(
        this.formLabelAlign.username,
        this.formLabelAlign.password,
        this.formLabelAlign.sex
      );
      if (!res) {
        this.$notify({
          title: "成功",
          message: "数据插入成功,3s后返回主页面",
          type: "success",
        });
        setTimeout(() => {
          this.$router.push('/login')
        }, 3000)
      }
    },
  },
};
</script>

<style lang="scss">
.registerForm {
  width: 500px;
  height: 500px;
}
.registerFont {
  font-size: 20px;
  text-align: center;
  margin-bottom: 50px;
}
</style>
