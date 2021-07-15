<template>
  <div class="t-container">
    <div class="top-box">
      <div class="left-box">
        <el-input
          v-model="searchId"
          placeholder="Enter transaction id"
        ></el-input>

        <div class="date-box">
          <div class="data-box-style">Select date</div>
          <div class="box-date">
            <el-date-picker
              v-model="times"
              type="daterange"
              range-separator="至"
              start-placeholder="Start"
              end-placeholder="End"
            >
            </el-date-picker>
          </div>
          <el-button type="primary">Search</el-button>
        </div>
      </div>
      <div>
        <el-button type="primary">Export</el-button>
      </div>
    </div>
    <div class="bottom-box">
      <div class="bottom-top-box">
        <div
          :class="listType === 1 ? 'default-box is-active' : 'default-box'"
          @click="changeType(1)"
        >
          Scan to pay
        </div>
        <div
          :class="listType === 2 ? 'default-box is-active' : 'default-box'"
          @click="changeType(2)"
        >
          Transfer
        </div>
        <div
          :class="listType === 3 ? 'default-box is-active' : 'default-box'"
          @click="changeType(3)"
        >
          Ang Pao
        </div>
      </div>
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
          <el-table-column prop="date" label="Transaction date">
          </el-table-column>
          <el-table-column prop="amount" label="Amount（Php）">
          </el-table-column>
          <el-table-column prop="payer" label="Payer's user id">
          </el-table-column>
          <el-table-column prop="payee" label="Payee's user id">
          </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goView(scope)" type="text" size="small"
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
      <el-dialog :visible.sync="showDia">
        <div>
          <div class="dia-top-box">
            <div class="top-left-box">
              <div class="dia-title-box">Transaction ID</div>
              <div class="dia-title-content">
                NKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
              </div>
            </div>
            <el-button type="primary" icon="el-icon-printer">Print</el-button>
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
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Transaction type:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Currency:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Status:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Generate date:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Complete date:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
            </div>
          </div>
          <div class="send-box"></div>
          <div class="short-box"></div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDia: false,
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      searchId: "",
      times: "",
      listType: 1,
      tableData: [
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
        {
          id: "1",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
        },
      ],
    };
  },
  created() {},
  methods: {
    changeType(num) {
      this.listType = num;
    },
    goView(item) {
      this.showDia = true;
    },
    changePage(val) {},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
.module-box {
  .el-dialog {
    width: 900px;
    background-color: #f5f5f5;
  }
}
</style>