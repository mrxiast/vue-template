<template>
  <div class="container">
    <div class="top-box">
      <div class="search-box">
        <div class="input-box">
          <el-input
            v-model="tranId"
            placeholder="Enter transaction id"
          ></el-input>
        </div>
        <div>
          <span class="search-title">Select date</span>
          <el-date-picker
            v-model="times"
            type="daterange"
            range-separator="to"
            start-placeholder="Start"
            end-placeholder="End"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="button-box">
        <el-button>Search</el-button>
        <el-button type="primary">Export</el-button>
      </div>
    </div>
    <div class="table-box">
      <div class="list-box">
        <el-table
          style="width: 99%"
          :data="tableData"
          border
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#eee',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column fixed prop="id" label="Transaction ID">
          </el-table-column>
          <el-table-column prop="date" label="TXN date"> </el-table-column>
          <el-table-column prop="date" label="Platform type"> </el-table-column>
          <el-table-column prop="amount" label="Partner ID"> </el-table-column>
          <el-table-column prop="amount" label="Service type">
          </el-table-column>
          <el-table-column prop="amount" label="Service name">
          </el-table-column>
          <el-table-column prop="amount" label="Biller name"> </el-table-column>
          <el-table-column prop="amount" label="Channel name">
          </el-table-column>
          <el-table-column prop="amount" label="TXN amount"> </el-table-column>
          <el-table-column prop="amount" label="Service charge">
          </el-table-column>
          <el-table-column prop="amount" label="Deduct of predeposit">
          </el-table-column>
          <el-table-column prop="amount" label="Commission to partners">
          </el-table-column>
          <el-table-column prop="amount" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goView(scope.row)" type="text" size="small"
                >view</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <el-pagination
          background
          @current-change="changePage"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="prev, pager, next,total, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <div class="module-box">
      <el-dialog :visible.sync="showDia" :close-on-click-modal="false">
        <div id="print">
          <div class="dia-top-box">
            <div class="top-left-box">
              <div class="dia-title-box">Transaction ID</div>
              <div class="dia-title-content">
                NKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
              </div>
            </div>
            <el-button type="primary" icon="el-icon-printer" v-print="printObj"
              >Print</el-button
            >
          </div>
          <div class="short-box">
            <div class="short-title">Status</div>
            <div>Payment status:Complete</div>
          </div>
          <div class="tran-box">
            <div class="tran-box-title">Transaction details</div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Transaction mode:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Pre-paid</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Platform type:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Customer APP</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Service type:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Bill payments</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Biller type:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Water</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Currency:</div></el-col
                >
                <el-col :span="18"><div class="grid-content">Php</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Generate date:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Jan-01 2021 11:00:00</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Complete date:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Jan-01 2021 11:00:00</div></el-col
                >
              </el-row>
            </div>
            <div class="tran-box-title" style="margin-top: 20px">Fund flow</div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Request amount
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Service charge
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Coupon</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Net amount</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
            </div>
          </div>

          <div class="partner" v-if="dataUserType === 'customer'">
            <div class="title">User details</div>
            <div class="table-boxs">
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">User type</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Customer account ID</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Customer account level</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Biller name</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Account name</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Account namber</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
            </div>
          </div>
          <div class="partner" v-if="dataUserType === 'partner'">
            <div class="title">User details</div>
            <div class="table-boxs">
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">User type</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Partner ID</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Partner name</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Biller name</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Account name</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Account namber</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
            </div>
          </div>
          <div class="tran-box">
            <div class="tran-box-title">Channel details</div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Channel name:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Pre-paid</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Response:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Customer APP</div></el-col
                >
              </el-row>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //打印配置
      printObj: {
        id: "print", // 这里是要打印元素的ID
        popTitle: "", // 打印的标题
        extraCss: "", // 打印可引入外部的一个 css 文件
        extraHead: "", // 打印头部文字
      },
      printObjOut: {
        id: "printOut", // 这里是要打印元素的ID
        popTitle: "", // 打印的标题
        extraCss: "", // 打印可引入外部的一个 css 文件
        extraHead: "",
      },
      tableData: [
        {
          id: "01",
          name: "测试",
          userType: "customer",
        },
        {
          id: "01",
          name: "测试2",
          userType: "partner",
        },
      ],
      tranId: "",
      times: "",
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      showDia: false,
      showOutDia: false,
      dataUserType: "",
      nowItem: {},
    };
  },
  methods: {
    changePage(val) {
      this.pageNum = val;
    },
    goView(item) {
      this.nowItem = item;
      this.dataUserType = this.nowItem.userType;
      this.showDia = true;
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>