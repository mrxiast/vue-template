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
          <el-table-column fixed prop="id" label="TXN ID"> </el-table-column>
          <el-table-column prop="date" label="Mobile number"> </el-table-column>
          <el-table-column prop="amount" label="User type"> </el-table-column>
          <el-table-column prop="payer" label="Request amount(Php)">
          </el-table-column>
          <el-table-column prop="payee" label="Bank service fee(Php)">
          </el-table-column>
          <el-table-column prop="status" label="Net ammount(Php)">
          </el-table-column>
          <el-table-column prop="status" label="Cash in method">
          </el-table-column>
          <el-table-column prop="status" label="Request date">
          </el-table-column>
          <el-table-column prop="status" label="Approval date">
          </el-table-column>
          <el-table-column prop="status" label="Cashin balance pool">
          </el-table-column>
          <el-table-column prop="status" label="Approval status">
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
                  ><div
                    class="grid-content"
                    style="
                      display: flex;
                      justify-content: space-between;
                      padding: 4px 5px;
                    "
                  >
                    <div>Pending</div>
                    <div>
                      <el-button
                        size="mini"
                        type="warning"
                        @click="goInnerApprove"
                        >Approve</el-button
                      >
                      <el-button size="mini" type="danger" @click="goReject"
                        >Reject</el-button
                      >
                    </div>
                  </div></el-col
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
                    Bank service fee
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
            <div class="tran-box-title" style="margin-top: 20px">
              Merchant details
            </div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Merchant ID</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Merchant name
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Merchant level
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
            </div>
            <div class="tran-box-title" style="margin-top: 20px">
              Remittance bank details
            </div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Bank name</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Branch name</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Account name</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Account number
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
            </div>
            <div class="tran-box-title" style="margin-top: 20px">
              Uploaded transfer receipt
            </div>
            <div>
              <div class="box-item">
                <div class="left-img">
                  <img src="@/static/logo.png" alt="" />
                </div>
                <div class="right-content">
                  <div>Upload by:Smith</div>
                  <div>Upload date:Jan-01 2021 12:00:00</div>
                </div>
              </div>
              <div class="box-item">
                <div class="left-img">
                  <img src="@/static/logo.png" alt="" />
                </div>
                <div class="right-content">
                  <div>Upload by:Smith</div>
                  <div>Upload date:Jan-01 2021 12:00:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog
          :visible.sync="showInnerDia"
          :close-on-click-modal="false"
          width="30%"
          @close="cancel"
          append-to-body
        >
          <div>
            <div style="margin-bottom: 20px">
              Please upload bank receipt proof here
            </div>
            <div>
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
              >
                <el-button size="small" type="primary">Click upload</el-button>
              </el-upload>
            </div>
            <div style="text-align: center; margin-top: 50px">
              <el-button type="primary" @click="approveConfirm"
                >Confirm</el-button
              >
            </div>
          </div>
        </el-dialog>
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
            <el-button type="primary" @click="rejectConfirm">Confirm</el-button>
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
      showInnerDia: false,
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
    //上传开始
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //上传结束
    approveConfirm() {
      this.showInnerDia = false;
      this.$refs.upload.clearFiles();
    },
    goInnerApprove() {
      this.showInnerDia = true;
    },

    rejectConfirm() {
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
      this.showDia = true;
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

