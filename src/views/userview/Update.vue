<template>
    <div>
      <div style="display: flex; justify-content: center; align-items: center">
        <div class="registerForm">
          <div style="margin: 20px"></div>
          <div class="registerFont">请确认并更改您的登录信息</div>
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
          >
            <el-form-item label="用户名">
              <!-- <el-input v-model="formLabelAlign.username" placeholder="请输入用户名"></el-input> -->
            <div>您无法修改用户名 {{formLabelAlign.username}}，请更改下列信息</div>
            </el-form-item>
            <el-form-item label="登陆密码">
              <el-input v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="formLabelAlign.sex" placeholder="请输入性别"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即修改</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { updateData } from "../../service/update.js";
  import { EventBus } from "@/bus";
  import router from "@/router";
  export default {
    name: "Update",
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
  // mounted() {
  //     EventBus.$on('userdata', (userdata) => {
  //     console.log(userdata)
  //       this.formLabelAlign.username = userdata
  //     })
  //     this.formLabelAlign.username = sessionStorage.getItem('username')
  //   },
    methods: {
      async onSubmit() {
        const res = await updateData(
          this.formLabelAlign.username,
          this.formLabelAlign.password,
          this.formLabelAlign.sex
        );
        if (!res) {
          this.$notify({
            title: "成功",
            message: "数据修改成功,3s后返回重新登录",
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
  