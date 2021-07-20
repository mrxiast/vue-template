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
          <el-table-column prop="date" label="Transaction date">
          </el-table-column>
          <el-table-column prop="amount" label="Merchant ID"> </el-table-column>
          <el-table-column prop="payer" label="Branch code"></el-table-column>
          <el-table-column
            prop="payer"
            label="Payment method"
          ></el-table-column>
          <el-table-column prop="payee" label="TXN amount(P)">
          </el-table-column>
          <el-table-column prop="payee" label="MRD(P)"> </el-table-column>
          <el-table-column prop="payee" label="Net amount(P)">
          </el-table-column>
          <el-table-column prop="payee" label="Status"> </el-table-column>
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
            <div>
              <span>Payment status: Pending</span>
              <span>Settement status: Settled</span>
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
                  ><div class="grid-content">Payments</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Transaction type:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Scan to pay</div></el-col
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
                <el-col :span="18" class="col-style">
                  <el-row style="padding: 0 5px">
                    <el-col :span="6"><div>1000</div></el-col>
                    <el-col :span="18" class="col-col-style"
                      ><div>
                        <el-button type="success" size="mini" @click="lookIssue"
                          >Issue a refund</el-button
                        >
                      </div></el-col
                    >
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Refund</div></el-col
                >
                <el-col :span="18" class="col-style">
                  <el-row style="padding: 0 5px">
                    <el-col :span="6"><div>1000</div></el-col>
                    <el-col :span="18" class="col-col-style"
                      ><div>
                        <span
                          style="cursor: pointer; color: #409eff"
                          @click="lookDetail"
                          >View refund details</span
                        >
                      </div></el-col
                    >
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">MRD</div></el-col
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
          <div class="partner">
            <div class="title">Merchant details</div>
            <div class="table-boxs">
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Merchant name</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Merchant type</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Merchant ID</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Merchant level</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Branch code</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Wevsite address</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
            </div>
          </div>
          <div class="partner">
            <div class="title">Customer details</div>
            <div class="table-boxs">
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Customer name</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Customer account ID</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Account level</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Customer mobile number</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Billing address</div>
                <div class="table-content-box" style="width: 895px">
                  Receiver's details
                </div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Shipping address</div>
                <div class="table-content-box" style="width: 895px">
                  Receiver's details
                </div>
              </div>
            </div>
          </div>
          <div class="partner">
            <div class="title">Customer details</div>
            <div class="table-boxs">
              <div class="table-item">
                <div class="table-title-box">Status</div>
                <div class="table-content-box">Unsettled</div>
                <div class="table-title-box">Settlement period</div>
                <div class="table-content-box">T+1</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Settlement amount</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Settle to</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Settlement date</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box"></div>
                <div class="table-content-box"></div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog width="30%" :visible.sync="showDetail" append-to-body>
          <div class="issue-box">
            <div class="issue-title">
              <div>Refund details</div>
              <div>Total: 20 Php</div>
            </div>
            <div class="box-style">
              <div class="box-item">Refund ID: 0393939393</div>
              <div class="box-item">Date: Jan-01 2021 12:00:00</div>
              <div class="box-item">Refund amount: 10Php</div>
              <div class="box-item">Refund status: Success</div>
              <div class="box-item">Refund reason: Success</div>
            </div>
            <div class="box-style">
              <div class="box-item">Refund ID: 0393939393</div>
              <div class="box-item">Date: Jan-01 2021 12:00:00</div>
              <div class="box-item">Refund amount: 10Php</div>
              <div class="box-item">Refund status: Success</div>
              <div class="box-item">Refund reason: Success</div>
            </div>
          </div>
        </el-dialog>
        <el-dialog
          width="30%"
          :visible.sync="showIssue"
          append-to-body
          @close="closeShowIssue"
          :close-on-click-modal="false"
        >
          <div class="inner-style">
            <div class="inner-title">Issue a refund</div>
            <div class="inner-input">
              <el-input
                v-model="amount"
                placeholder="Please enter an amount to refund!"
              ></el-input>
            </div>
            <div class="inner-input">
              <el-input
                v-model="reason"
                type="textarea"
                :rows="2"
                placeholder="Please enter the refund reason"
              ></el-input>
            </div>
            <div class="inner-btn">
              <el-button type="primary" @click="confirm">Confirm</el-button>
            </div>
          </div>
        </el-dialog>
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
        },
      ],
      tranId: "",
      times: "",
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      showDia: false,
      showOutDia: false,
      showDetail: false,
      showIssue: false,
      nowItem: {},
      reason: "",
      amount: "",
    };
  },
  methods: {
    confirm() {
      if (!this.amount) {
        return this.$message.warning("Please enter an amount to refund");
      }
      if (!this.reason) {
        return this.$message.warning("Please enter the refund reason");
      }
      this.$confirm(
        "The refund amount you submitted will be credited to customer's Fortune pay wallet balance!",
        "Are you sure to issue a refund?",
        {
          confirmButtonText: "Yes,I am sure",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "操作!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    closeShowIssue() {
      this.showIssue = false;
      this.reason = "";
      this.amount = "";
    },
    lookDetail() {
      this.showDetail = true;
    },
    lookIssue() {
      this.showIssue = true;
    },
    changePage(val) {
      this.pageNum = val;
    },
    goView(item) {
      this.nowItem = item;
      this.showDia = true;
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>