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
        <el-button>Search</el-button>
        <el-button type="primary">Add biller</el-button>
      </div>
    </div>
    <div class="bottom-box">
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
          <el-table-column fixed prop="id" label="Biller name">
          </el-table-column>
          <el-table-column prop="date" label="Biller type"> </el-table-column>
          <el-table-column prop="amount" label="Active Channel">
          </el-table-column>
          <el-table-column prop="payer" label="Effective date">
          </el-table-column>
          <el-table-column prop="payee" label="Last update"> </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column label="Action" width="260px">
            <template slot-scope="scope">
              <el-button @click="goView(scope.row)" type="primary" size="small"
                >view</el-button
              >
              <el-button
                @click="goApprove(scope.row)"
                type="warning"
                size="small"
                >Edit</el-button
              >
              <el-button @click="goReject(scope.row)" type="danger" size="small"
                >Disabled</el-button
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
    <div>
      <el-dialog :visible.sync="showDia" :close-on-click-modal="false">
        <div>
          <div class="one-box">
            <div class="biller-title">Select biller type</div>
            <div>
              <el-select
                class="biller-input"
                v-model="billerType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="two-box">
            <div class="biller-title">Select biller name</div>
            <div>
              <el-input class="biller-input">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
          <div class="box-content">
            <div
              class="box-item"
              v-for="(item, index) in companyList"
              :key="index"
            >
              <div
                @click="clickCompany(item)"
                :class="
                  item.id === nowItem.id ? 'item-img img-active' : 'item-img'
                "
              >
                <img src="@/static/logo.png" alt="" />
              </div>
              <div :class="item.id === nowItem.id ? 'is-active' : ''">ABC</div>
            </div>
          </div>
          <div style="padding: 0 60px">
            <div>Select biller channel</div>
            <div style="display: flex; flex-wrap: wrap">
              <div
                v-for="(item, index) in channelList"
                :key="index"
                @click="changeChanel(item)"
              >
                <div
                  :class="
                    item.id === channelItem.id
                      ? 'is-active-btn pay-btn'
                      : 'pay-btn'
                  "
                >
                  ECpay
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 20px 60px">
            <div style="display: flex; justify-content: space-between">
              <div>Assigned to partners</div>
              <div>
                <el-button type="success" size="mini" @click="showInner"
                  >+Add partners</el-button
                >
              </div>
            </div>
            <div style="display: flex; flex-wrap: wrap">
              <div
                class="pay-btn"
                v-for="(item, index) in partnerList"
                :key="index"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div class="center-btn">
            <el-button type="primary" @click="confirmForm">Confirm</el-button>
          </div>
        </div>
        <el-dialog
          title="Add partner"
          width="30%"
          :visible.sync="showInnerDia"
          append-to-body
        >
          <div>
            <div>
              <div style="margin-top: 15px">
                <el-input
                  placeholder="请输入内容"
                  v-model="searchName"
                  class="input-with-select"
                >
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div>
                <el-checkbox-group v-model="checkList">
                  <div style="padding: 20px">
                    <el-checkbox label="复选框 A"></el-checkbox>
                  </div>
                  <div style="padding: 20px">
                    <el-checkbox label="复选框 B"></el-checkbox>
                  </div>
                  <div style="padding: 20px">
                    <el-checkbox label="复选框 C"></el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
              <div class="center-btn">
                <el-button type="primary" @click="addPartner"
                  >Confirm</el-button
                >
              </div>
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
      searchName: "",
      partnerList: [
        {
          id: "001",
          name: "partner001",
        },
        {
          id: "002",
          name: "partner002",
        },
      ],
      checkList: [],
      showInnerDia: false,
      channelItem: {},
      channelList: [
        {
          id: "001",
          name: "ECpay",
        },
        {
          id: "002",
          name: "ECpay",
        },
        {
          id: "003",
          name: "ECpay",
        },
        {
          id: "004",
          name: "ECpay",
        },
      ],
      companyList: [
        {
          id: "001",
          name: "ABC",
        },
        {
          id: "002",
          name: "ABC",
        },
        {
          id: "003",
          name: "ABC",
        },
        {
          id: "004",
          name: "ABC",
        },
        {
          id: "005",
          name: "ABC",
        },
        {
          id: "006",
          name: "ABC",
        },
      ],
      nowItem: {},
      billerType: "",
      options: [],
      delivery: "",
      tracking: "",
      cardNumber: "",
      reason: "",
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
      ],
    };
  },
  created() {},
  methods: {
    confirmForm() {
      this.showDia = false;
    },
    addPartner() {
      if (!this.checkList.length) {
        this.$message.warning("Please check one");
        return;
      }
      this.$confirm("Are you sure to configure this?", "", {
        confirmButtonText: "Yes, I am sure",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.checkList = [];
          this.showInnerDia = false;

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
    showInner() {
      this.showInnerDia = true;
    },
    changeChanel(item) {
      this.channelItem = item;
    },
    clickCompany(item) {
      this.nowItem = item;
    },
    subReject() {
      if (!this.reason) {
        this.$message.warning("Please enter reject reason");
        return;
      }
      this.showReject = false;
      this.reason = "";
    },
    subApprove() {
      if (!this.cardNumber) {
        this.$message.warning("Please enter card number");
        return;
      }
      if (!this.delivery) {
        this.$message.warning("Please enter delivery company");
        return;
      }
      if (!this.tracking) {
        this.$message.warning("Please enter tracking number");
        return;
      }
      this.$message.error("Successfly!!");
      this.cardNumber = "";
      this.delivery = "";
      this.tracking = "";
      this.showCardDia = false;
    },
    closeCancel() {
      this.cardNumber = "";
      this.delivery = "";
      this.tracking = "";
      this.showCardDia = false;
    },
    changeType(num) {
      this.listType = num;
      this.pageNum = 1;
    },
    goView(item) {
      this.showDia = true;
    },
    changePage(val) {},
    goReject() {
      this.showReject = true;
    },
    goApprove() {
      this.$confirm("Are your sure to approve this application?", "", {
        confirmButtonText: "Approve it",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$confirm("Do you have a card number to enter?", "", {
            confirmButtonText: "Yes, Iwill enter card number",
            cancelButtonText: "Skip for now",
            type: "warning",
          })
            .then(() => {
              this.showCardDia = true;
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
