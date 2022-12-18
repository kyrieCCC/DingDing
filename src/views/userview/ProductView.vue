<template>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="ID" label="编号"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="number" label="数量"> </el-table-column>
        <el-table-column prop="prices" label="价格"> </el-table-column>
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
  import { deleteProductData } from "@/service/delete.js";
  import http from "@/service/index.js"
  export default {
    name: "ProductView",
    data() {
      return {
        tableData: [],
      };
    },
    async mounted() {
      await this.getProductData();
    },
    methods: {
      async deleteRow(row, tableData) {
        // console.log(row.username, tableData);
        const res = await deleteProductData(row.ID)
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
      },
      async getProductData() {
        const res = await http.get("/product/all");
        this.tableData = res.data.data;
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  