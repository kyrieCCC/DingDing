<template>
  <div class="container">
    <div class="header">
      <div class="header_left">
        <img src="../imgs/logo.png" class="header_left-img" />
        <div class="header_left_font">Hello {{ username }}</div>
        <div class="header_left_font" @click="ToUpdate">Update User Data</div>
        <div class="header_left_font" @click="showOrder">My Order</div>
        <div class="header_left_font" @click="shippingCar">ShoppingCart</div>
        <el-dialog title="订单信息" :visible.sync="dialogTableVisible">
          <el-table :data="gridData">
            <el-table-column
              property="username"
              label="用户"
              width="150"
            ></el-table-column>
            <el-table-column
              property="ID"
              label="购买商品"
              width="200"
            ></el-table-column>
            <el-table-column
              property="number"
              label="购买数量"
            ></el-table-column>
            <el-table-column property="send" label="是否发货"></el-table-column>
          </el-table>
        </el-dialog>
        <el-dialog title="购物车信息" :visible.sync="dialogTableVisible1">
          <el-table :data="gridData1">
            <el-table-column
              property="ID"
              label="商品编号"
              width="150"
            ></el-table-column>
            <el-table-column
              property="prices"
              label="价格"
              width="200"
            ></el-table-column>
            <el-table-column
              property="buynumber"
              label="购买数量"
            ></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.row)"
                  type="text"
                  size="small"
                >
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini" round @click="buyAll">全部购买</el-button>
          <div>总额是：{{ allMoney }}</div>
        </el-dialog>
        <!-- 这个是二维码的提示框 -->
        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        >
          <img
            src="@/imgs/code.jpg"
            style="width: 300px; height: 300px"
            center
          />
          <!-- <span slot="footer" class="dialog-footer">
                  <el-button @click="centerDialogVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="centerDialogVisible = false"
                    >确 定</el-button
                  >
                </span> -->
        </el-dialog>
      </div>
      <div class="header_middle"></div>
      <div class="header_right">
        <div class="seacher-item-img">
          <svg
            t="1668666474379"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1119"
            width="20"
            height="20"
          >
            <path
              d="M986.530909 1022.370909c-8.843636 0-17.92-3.490909-24.669091-10.24L710.749091 761.018182c-13.730909-13.730909-13.730909-35.84 0-49.338182s35.84-13.730909 49.338182 0l251.112727 251.112727c13.730909 13.730909 13.730909 35.84 0 49.338182-6.749091 6.749091-15.592727 10.24-24.669091 10.24z"
              p-id="1120"
            ></path>
            <path
              d="M442.181818 69.818182c205.265455 0 372.363636 167.098182 372.363637 372.363636s-167.098182 372.363636-372.363637 372.363637S69.818182 647.447273 69.818182 442.181818 236.916364 69.818182 442.181818 69.818182m0-69.818182C198.050909 0 0 198.050909 0 442.181818s198.050909 442.181818 442.181818 442.181818 442.181818-198.050909 442.181818-442.181818S686.312727 0 442.181818 0z"
              p-id="1121"
            ></path>
          </svg>
        </div>
        <div class="package-item-img">
          <svg
            t="1668666589370"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1330"
            width="20"
            height="20"
          >
            <path
              d="M485.701818 547.84c-10.705455 0-21.410909-4.887273-28.16-14.429091L390.749091 442.181818a34.978909 34.978909 0 0 1 56.552727-41.192727l66.56 91.229091a34.978909 34.978909 0 0 1-28.16 55.621818z"
              p-id="1331"
            ></path>
            <path
              d="M544.116364 547.84c-7.214545 0-14.429091-2.094545-20.48-6.749091-15.592727-11.403636-19.083636-33.28-7.68-48.872727l66.56-91.229091A34.978909 34.978909 0 0 1 639.069091 442.181818l-66.56 91.229091c-6.981818 9.309091-17.687273 14.429091-28.392727 14.429091z"
              p-id="1332"
            ></path>
            <path
              d="M649.309091 612.072727H374.690909c-19.316364 0-34.909091-15.592727-34.909091-34.909091s15.592727-34.909091 34.909091-34.909091h274.618182c19.316364 0 34.909091 15.592727 34.909091 34.909091s-15.592727 34.909091-34.909091 34.909091zM649.309091 710.050909H374.690909c-19.316364 0-34.909091-15.592727-34.909091-34.909091s15.592727-34.909091 34.909091-34.909091h274.618182c19.316364 0 34.909091 15.592727 34.909091 34.909091s-15.592727 34.909091-34.909091 34.909091z"
              p-id="1333"
            ></path>
            <path
              d="M512 847.36c-19.316364 0-34.909091-15.592727-34.909091-34.909091V537.6c0-19.316364 15.592727-34.909091 34.909091-34.909091s34.909091 15.592727 34.909091 34.909091v274.850909c0 19.316364-15.592727 34.909091-34.909091 34.909091z"
              p-id="1334"
            ></path>
            <path
              d="M884.363636 92.858182v843.869091H139.636364V92.858182h744.727272m11.636364-69.818182h-768C95.883636 23.04 69.818182 48.872727 69.818182 81.221818v867.141818a58.181818 58.181818 0 0 0 58.181818 58.181819h768a58.181818 58.181818 0 0 0 58.181818-58.181819V81.221818c0-32.349091-26.065455-58.181818-58.181818-58.181818z"
              p-id="1335"
            ></path>
            <path
              d="M512 303.476364L121.483636 100.770909 153.6 38.865455 512 224.814545l359.330909-185.94909 32.116364 61.905454z"
              p-id="1336"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="body-div-img">
      <img
        class="body-img"
        src="https://cdn.shopifycdn.net/s/files/1/0676/0723/2799/files/green-door-with-open-sign.jpg?v=1668247839&width=1500%22"
      />

      <div class="body-img-insertFont">
        <div>
          <div class="come-font">Come and Select</div>
          <div class="secret-font">Secret gift waiting for you !</div>
          <div class="shop-bottom"><div>shop all</div></div>
        </div>
      </div>
    </div>
    <div class="after-img">
      <div class="pick-font">Pick and Pay</div>
      <div class="always-font">Always choose the best clothes for you</div>
    </div>
    <div class="featured">Featured products</div>
    <div class="shop-item">
      <div class="shop-item1">
        <img v-on:click="toProduct1" src="../imgs/item-1.png" />
        <div class="shop-item1-font">
          cotton Shengcai 2022 spring new European and American women's dress
          Amazon long sleeve off shoulder bride wedding dress dress
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices1 }}.00 USD
        </div>
      </div>
      <div class="shop-item1">
        <img v-on:click="toProduct2" src="../imgs/item-2.png" />
        <div class="shop-item1-font">
          Custom Latest design high quality men's long woollen trench overcoat
          winter coat wool men coat with button
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices2 }}.99 USD
        </div>
      </div>
      <div class="shop-item1">
        <img v-on:click="toProduct3" src="../imgs/item-3.png" />
        <div class="shop-item1-font">
          European and American fashion autumn dress, small horn, ruffle, long
          sleeve, slim bow, high-grade dress
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices3 }}.00 USD
        </div>
      </div>
    </div>
    <div class="shop-item">
      <div class="shop-item1">
        <img
          v-on:click="toProduct7"
          src="https://cdn.shopifycdn.net/s/files/1/0676/0723/2799/products/13278537513_985641810.jpg?v=1667996938&width=533"
        />
        <div class="shop-item1-font">
          cotton Shengcai 2022 spring new European and American women's dress
          Amazon long sleeve off shoulder bride wedding dress dress
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices4 }}.00 USD
        </div>
      </div>
      <div class="shop-item1">
        <img
          v-on:click="toProduct8"
          src="https://cdn.shopifycdn.net/s/files/1/0676/0723/2799/products/2.jpg?v=1667993138&width=533"
        />
        <div class="shop-item1-font">
          Custom Latest design high quality men's long woollen trench overcoat
          winter coat wool men coat with button
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices5 }}.99 USD
        </div>
      </div>
      <div class="shop-item1">
        <img
          v-on:click="toProduct9"
          src="https://cdn.shopifycdn.net/s/files/1/0676/0723/2799/products/O1CN01BeiA941XfbYTbR9NZ__4071272951-0-cib.jpg?v=1667996650&width=533"
        />
        <div class="shop-item1-font">
          European and American fashion autumn dress, small horn, ruffle, long
          sleeve, slim bow, high-grade dress
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices6 }}.00 USD
        </div>
      </div>
    </div>
    <div class="shop-item">
      <div class="shop-item1">
        <img v-on:click="toProduct6" src="../imgs/item-6.png" />
        <div class="shop-item1-font">
          cotton Shengcai 2022 spring new European and American women's dress
          Amazon long sleeve off shoulder bride wedding dress dress
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices7 }}.00 USD
        </div>
      </div>
      <div class="shop-item1">
        <img v-on:click="toProduct4" src="../imgs/item-4.png" />
        <div class="shop-item1-font">
          Custom Latest design high quality men's long woollen trench overcoat
          winter coat wool men coat with button
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices8 }}.99 USD
        </div>
      </div>
      <div class="shop-item1">
        <img v-on:click="toProduct5" src="../imgs/item-5.png" />
        <div class="shop-item1-font">
          European and American fashion autumn dress, small horn, ruffle, long
          sleeve, slim bow, high-grade dress
        </div>
        <div style="font-size: 14px; margin-top: 8px">
          ${{ prices9 }}.00 USD
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../bus/index.js";
import http from "@/service/index";
import { deleteShoppingCarData, deleteAllCarData } from "@/service/delete.js";
import { payProduct } from "@/service/update.js";
export default {
  name: "HomeView",
  props: ["username"],
  data: function () {
    return {
      dialogTableVisible: false,
      dialogTableVisible1: false,
      centerDialogVisible: false,
      shippingCarData: [],
      gridData: [],
      gridData1: [],
      allMoney: '',
      // username: "",
      prices1: "",
      prices2: "",
      prices3: "",
      prices4: "",
      prices5: "",
      prices6: "",
      prices7: "",
      prices8: "",
      prices9: "",
    };
  },
  // created() {
  //   EventBus.$on('userdata', (userdata) => {
  //     // console.log('userdata is ' + userdata)
  //     console.log(userdata)
  //     this.username = userdata
  //     console.log(this.username.userdata)
  //   })
  // },
  async mounted() {
    await this.getProductInfo();
    console.log(this.username)
    // this.username = sessionStorage.getItem("username");
    // EventBus.$on('shippingCar', (data) => {
    //   console.log('我收到了信息', data)
    //   this.gridData1.push(data)
    //   console.log(this.gridData1[0])
    // })
  },
  methods: {
    async buyAll() {
      const dataList = this.gridData1;
      console.log(dataList);
      this.centerDialogVisible = true;
      if (dataList) {
        await setTimeout(() => {
          this.centerDialogVisible = false;
          this.$notify({
            title: "成功",
            message: "购买成功",
            type: "success",
          });
        }, 5000);
        for (let i in dataList) {
          // console.log('参数是', dataList[i].ID,
          //   dataList[i].number,
          //   dataList[i].buynumber,
          //   dataList[i].username)
          const buyRes = await payProduct(
            dataList[i].ID,
            dataList[i].number,
            dataList[i].buynumber,
            dataList[i].username
          );
        }
        const deleteAllDataRes = await deleteAllCarData(this.username);
        this.dialogTableVisible1 = false;
      } else {
        this.$notify({
          title: "提示",
          message: "失败,请检查是否存在商品",
          duration: 0,
        });
      }
    },
    async deleteRow(row) {
      const deleteRowDataRes = await deleteShoppingCarData(
        this.username,
        row.prices
      );
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
      });
      this.dialogTableVisible1 = false;
    },
    async shippingCar() {
      this.dialogTableVisible1 = true;
      const resultCar = await http.get("/getShoppingCar", {
        params: { username: this.username },
      });
      this.gridData1 = resultCar.data.data;
      let money = 0
      console.log(resultCar)
      if (resultCar.data.data) {
        for (let i = 0; i < resultCar.data.data.length; i++){
          money += (resultCar.data.data[i].prices * resultCar.data.data[i].buynumber)
        }
      }
      this.allMoney = money
    },
    async showOrder() {
      this.dialogTableVisible = true;
      const result = await http.get("/sale", {
        params: { username: this.username },
      });
      this.gridData = result.data.data;
    },
    async getProductInfo() {
      const res = await http.get(`/product/all`);
      this.prices1 = res.data.data[0].prices;
      this.prices2 = res.data.data[1].prices;
      this.prices3 = res.data.data[2].prices;
      this.prices4 = res.data.data[3].prices;
      this.prices5 = res.data.data[4].prices;
      this.prices6 = res.data.data[5].prices;
      this.prices7 = res.data.data[6].prices;
      this.prices8 = res.data.data[7].prices;
      this.prices9 = res.data.data[8].prices;
      // this.prices = res.data.data[0].prices;
      // console.log(this.prices);
    },
    getData(data) {
      console.log(data);
      this.username = data;
    },
    ToUpdate() {
      // EventBus.$emit('usernameData', { usernameData: this.username })
      this.$router.push("/update");
    },
    toProduct1() {
      this.$router.push(`${this.username}/item1product`);
    },
    toProduct2() {
      this.$router.push(`${this.username}/item2product`);
    },
    toProduct3() {
      this.$router.push(`${this.username}/item3product`);
    },
    toProduct4() {
      this.$router.push(`${this.username}/item4product`);
    },
    toProduct5() {
      this.$router.push(`${this.username}/item5product`);
    },
    toProduct6() {
      this.$router.push(`${this.username}/item6product`);
    },
    toProduct7() {
      this.$router.push(`${this.username}/item7product`);
    },
    toProduct8() {
      this.$router.push(`${this.username}/item8product`);
    },
    toProduct9() {
      this.$router.push(`${this.username}/item9product`);
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.container {
  height: 100%;
}
.header {
  background-color: #fff;
  height: 55px;
  display: flex;
  margin: 16px 32px;
}
.header_left {
  margin-left: 100px;
  width: 600px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header_left_font {
  margin-left: 25px;
  color: #121212bf;
  font-size: 13px;
  font-family: Assistant, sans-serif;
}
.header_left_font:hover {
  cursor: pointer;
  color: #121212;
  text-decoration: underline;
}
.header_middle {
  display: flex;
  flex-grow: 1;
}
.header_left-img {
  width: 50px;
  height: 50px;
}
.header_right {
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.package-item-img {
  margin-left: 43px;
}
.body-img {
  width: 100%;
  height: 720px;
}
.body-div-img {
  position: relative;
}
.body-img-insertFont {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.come-font {
  text-align: center;
  color: #fff;
  font-size: 52px;
}
.secret-font {
  text-align: center;
  color: #ffffffbf;
  font-size: 14px;
  margin-top: 22px;
}
.shop-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
}
.shop-bottom > div {
  line-height: 45px;
  text-align: center;
  font-size: 13px;
  color: #fff;
  width: 120px;
  height: 45px;
  border: 2px solid #fff;
}
.shop-bottom:hover {
  cursor: pointer;
  border: 3px solid #fff;
}
.after-img {
  padding-top: 40px;
  margin: 0px 160px;
  text-align: center;
}
.pick-font {
  font-size: 40px;
  color: #121212;
  font-family: Assistant, sans-serif;
}
.always-font {
  margin-top: 20px;
  font-size: 16px;
  color: #121212bf;
  font-family: Assistant, sans-serif;
}
.featured {
  font-size: 24px;
  font-family: Assistant, sans-serif;
  margin: 28px 160px;
}
.shop-item {
  width: 1100px;
  height: 476px;
  margin: 0px 160px;
  display: flex;
}
.shop-item1 {
  width: 362px;
  height: 475px;
  margin-left: 10px;
}
.shop-item1 > img {
  width: 362px;
  height: 362px;
}
.shop-item1 > img:hover {
  cursor: pointer;
  scale: 1.05;
}
.shop-item1-font {
  font-size: 12px;
}
</style>
