<template>
  <div class="t-container">
    <div class="top-box">
      <div class="left-box">
        <el-input
          style="width: 300px"
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
        </div>
      </div>
      <div>
        <el-button type="primary">Search</el-button>
      </div>
    </div>
    <div class="bottom-box">
      <div class="bottom-top-box">
        <div
          :class="listType === 1 ? 'default-box is-active' : 'default-box'"
          @click="changeType(1)"
        >
          All
        </div>
        <div
          :class="listType === 2 ? 'default-box is-active' : 'default-box'"
          @click="changeType(2)"
        >
          Pending
        </div>
        <div
          :class="listType === 3 ? 'default-box is-active' : 'default-box'"
          @click="changeType(3)"
        >
          Approved
        </div>
        <div
          :class="listType === 4 ? 'default-box is-active' : 'default-box'"
          @click="changeType(4)"
        >
          Rejected
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
          <el-table-column fixed prop="id" label="Account ID">
          </el-table-column>
          <el-table-column prop="date" label="Mobile number"> </el-table-column>
          <el-table-column prop="amount" label="User name"> </el-table-column>
          <el-table-column prop="payer" label="Current account level">
          </el-table-column>
          <el-table-column prop="payee" label="Upgrade account level">
          </el-table-column>
          <el-table-column prop="status" label="Date of apply">
          </el-table-column>
          <el-table-column prop="status" label="Verified status">
          </el-table-column>
          <el-table-column prop="status" label="Date of approval">
          </el-table-column>
          <el-table-column prop="status" label="Verified by"> </el-table-column>
          <el-table-column label="Action" width="260">
            <template slot-scope="scope">
              <el-button @click="goView(scope)" type="primary" size="small"
                >view</el-button
              >
              <el-button @click="goApprove(scope)" type="warning" size="small"
                >Approve</el-button
              >
              <el-button @click="goReject(scope)" type="danger" size="small"
                >Reject</el-button
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
            <div class="tran-box-title" style="margin-top: 20px">Fund flow</div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Transaction amount
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Refund amount
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Transaction service charge
                  </div></el-col
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

          <div class="send-box">
            <div class="send-item">
              <div class="send-title">Sender's details</div>
              <div class="send-content">
                <div class="send-tab-title">Customer account ID</div>
                <div class="send-tab-content">123</div>
              </div>
              <div class="send-content">
                <div class="send-tab-title">Customer mobile number</div>
                <div class="send-tab-content">456</div>
              </div>
            </div>
            <div class="send-item">
              <div class="send-title">Receiver's details</div>
              <div class="send-content">
                <div class="send-tab-title">Customer account ID</div>
                <div class="send-tab-content">996</div>
              </div>
              <div class="send-content">
                <div class="send-tab-title">Customer mobile number</div>
                <div class="send-tab-content">123</div>
              </div>
            </div>
          </div>
          <div class="short-box">
            <div class="short-title">Short message</div>
            <div>
              <span style="color: #f00">*</span>Debit 1000 from Payer's wallet
              balance and credit to Payee's wallet balance
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="showReject"
        :close-on-click-modal="false"
        width="30%"
        @close="cancel"
      >
        <div>
          <div style="margin-bottom: 20px">Please enter reject reason</div>
          <div>
            <el-input v-model="reason" type="textarea"></el-input>
          </div>
          <div style="text-align: center; margin-top: 50px">
            <el-button type="primary" @click="reject">Confirm</el-button>
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
      reason: "",
      showReject: false,
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
    reject() {
      if (!this.reason) {
        this.$message.error("Please enter reject reason");
        return;
      }
      this.reason = "";
      this.showReject = false;
    },
    cancel() {
      this.reason = "";
      this.showReject = false;
    },
    goReject() {
      this.showReject = true;
    },
    goApprove() {
      this.$confirm("Are you sure to pass this approval?", "", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goView(item) {
      this.$router.push("/customer-detail/" + item.id);
    },
    changePage(val) {},
    changeType(num) {
      this.listType = num;
      this.pageNum = 1;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

