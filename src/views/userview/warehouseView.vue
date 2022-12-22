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
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "@/service/index";
export default {
  name: "warehouseView",
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
      alert("请联系管理员");
    },
    async getUserData() {
      const res = await http.get("/warehouse");
      this.tableData = res.data.data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
