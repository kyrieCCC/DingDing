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
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import http from "@/service/index";
  export default {
    name: "AdminView",
    data() {
      return {
        tableData: [],
      };
    },
    async mounted() {
      await this.getUserData();
    },
    methods: {
      deleteRow(row, tableData) {
        console.log(row, tableData);
      },
      async getUserData() {
        const res = await http.get("/admin/all");
        this.tableData = res.data.data;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  