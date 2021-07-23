<template>
  <div class="container">
    <div class="base-style synopsis">
      <p>
        <span class="left-spot">·</span>

        Agency service is only enabled for Fortune Pay tie up partner
      </p>
      <p>
        <span class="left-spot">·</span> Fortune Pay will assign a sum of money
        to tie up partner as commission reward once the partner who has helped
        Fortune Pay customer to do any of : Cash in, Cash out and bill payments
      </p>
      <p>
        <span class="left-spot">·</span> To become a tie up partner, you may
        need to cash in a sum of money to your pre-deposit balance, once the
        balance is used up, you need to cash in again, otherwise the agency
        service will be closed
      </p>
    </div>
    <div class="base-style balance-box">
      <div class="box-item">
        <div class="box-item-title">Pre-deposit balance</div>
        <div class="box-item-num">1000 Php</div>
      </div>
      <div class="box-item">
        <div class="box-item-title">Wallet balabce</div>
        <div class="box-item-num">1000 Php</div>
      </div>
      <div class="box-item">
        <div class="box-item-title">Commission received</div>
        <div class="box-item-num">1000 Php</div>
      </div>
    </div>
    <div class="base-style balance-box">
      <div class="box-item btn" @click="changeType('cashin')">
        <div class="box-item-title">Cash in</div>
      </div>
      <div class="box-item btn" @click="changeType('cashout')">
        <div class="box-item-title">Cash out</div>
      </div>
      <div class="box-item btn" @click="changeType('billpayments')">
        <div class="box-item-title">Bill payments</div>
      </div>
    </div>
    <div class="module600">
      <el-dialog
        :visible.sync="showDia"
        :close-on-click-modal="false"
        @close="cancel"
      >
        <div v-if="modalType === 'cashin'">
          <div class="dia-box" v-if="stepType === 1">
            <div class="base-style">
              <div class="dia-title">Select ther role to cash in for</div>
              <div class="select-box">
                <div
                  @click="changeCashinType('self')"
                  :class="
                    cashinType === 'self'
                      ? 'select-btn is-active'
                      : 'select-btn'
                  "
                >
                  Self
                </div>
                <div
                  @click="changeCashinType('customer')"
                  :class="
                    cashinType === 'customer'
                      ? 'select-btn is-active'
                      : 'select-btn'
                  "
                >
                  Customer
                </div>
              </div>
            </div>
            <div class="base-style margin-top20" v-if="cashinType === 'self'">
              <div class="dia-title">Please enter cash in amount:</div>
              <div class="dia-input">
                <el-input v-model="cashinAmount" type="number"></el-input>
              </div>
              <div class="dia-title">
                Please select asset pool to cash in to
              </div>
              <div class="select-box">
                <div
                  @click="changeAssetType('predeposit')"
                  :class="
                    assetType === 'predeposit'
                      ? 'select-btn is-active'
                      : 'select-btn'
                  "
                >
                  Pre-deposit
                </div>
                <div
                  @click="changeAssetType('wallet')"
                  :class="
                    assetType === 'wallet'
                      ? 'select-btn is-active'
                      : 'select-btn'
                  "
                >
                  Customer
                </div>
              </div>
            </div>
            <div
              class="base-style margin-top20"
              v-if="cashinType === 'customer'"
            >
              <div class="type-cus-box">
                <div class="cus-left-box">
                  <div class="cus-title">Pre-deposit balance</div>
                  <div style="text-align: center">10000Php</div>
                </div>
                <div class="cus-right-box">
                  <div class="cus-right-title">
                    Please enter customer mobile
                  </div>
                  <div>
                    <el-input v-model="cusMobile"></el-input>
                  </div>
                  <div class="cus-right-title">Please enter cash in amount</div>
                  <div>
                    <el-input v-model="cusAmount" type="number"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="next-btn">
              <el-button type="primary" @click="next">Next</el-button>
            </div>
          </div>
          <div class="dia-box" v-if="cashinType === 'self' && stepType === 2">
            <div class="base-style">
              <div class="dia-icon">
                <i class="el-icon-s-order"></i>
              </div>
              <div class="show-box">
                <div class="show-box-title">Your request ID:</div>
                <div class="show-box-content">DOGMIAO0909090909</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Request amount:</div>
                <div class="show-box-content">DOGMIAO0909090909</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Requst date:</div>
                <div class="show-box-content">Jan-01 2021 12:00:00</div>
              </div>
            </div>
            <div class="base-style margin-top20">
              <div class="show-box">
                <div class="show-box-title">Asset Pool:</div>
                <div class="show-box-content">Pre-deposit</div>
              </div>
            </div>
            <div class="base-style margin-top20">
              <div class="dia-title">
                Please transfer amount to below bank account
              </div>
              <div class="show-box">
                <div class="show-box-title">Bank name:</div>
                <div class="show-box-content">ACBC bank</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Branch name</div>
                <div class="show-box-content">Pre-GOODD</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Account name</div>
                <div class="show-box-content">xxxxxxxxxxx</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Account number</div>
                <div class="show-box-content">3999999999999999</div>
              </div>
            </div>
          </div>
          <div
            class="dia-box"
            v-if="cashinType === 'customer' && stepType === 2"
          >
            <div class="base-style">
              <div class="show-box">
                <div class="show-box-title">Cash in for:</div>
                <div class="show-box-content">Customer</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Request amount:</div>
                <div class="show-box-content">99 Php</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Service charge</div>
                <div class="show-box-content">20Php</div>
              </div>
            </div>
            <div class="base-style margin-top20">
              <div class="show-box">
                <div class="show-box-title">Net amount:</div>
                <div class="show-box-content">980 Php</div>
              </div>
              <div class="step2-cus-sm">
                Net amount is the amout will be added to cumsomer Fortune Pay
                wallet!
              </div>
              <div style="text-align: center">
                <el-button @click="goStep3" type="primary">Confirm</el-button>
              </div>
            </div>
          </div>
          <div
            class="dia-box"
            v-if="cashinType === 'customer' && stepType === 3"
          >
            <div class="base-style">
              <div class="dia-title">Please enter transaction PIN:</div>
              <div class="dia-input">
                <el-input v-model="pin" maxlength="4"></el-input>
              </div>
              <div>
                If you have forgot transaction PIN, please reset via your
                merchant APP
              </div>
              <div style="text-align: center; margin-top: 50px">
                <el-button @click="finish" type="primary">Confirm</el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="modalType === 'cashout'">
          <div class="dia-box" v-if="stepType === 1">
            <div class="base-style">
              <div class="dia-title">Whom are you to cash out for</div>
              <div class="select-box">
                <div
                  @click="changeCashinType('self')"
                  :class="
                    cashinType === 'self'
                      ? 'select-btn is-active'
                      : 'select-btn'
                  "
                >
                  Self
                </div>
                <div
                  @click="changeCashinType('customer')"
                  :class="
                    cashinType === 'customer'
                      ? 'select-btn is-active'
                      : 'select-btn'
                  "
                >
                  Customer
                </div>
              </div>
            </div>
            <div class="base-style margin-top20" v-if="cashinType === 'self'">
              <div class="cash-out-wallet">
                <div class="cash-out-wallet-title">Wallet balance</div>
                <div class="cash-out-wallet-content">10000 Php</div>
              </div>
              <div>
                <div style="margin: 20px 0">Please enter cash out amount</div>
                <div style="display: flex; align-items: center">
                  <el-input
                    style="width: 400px; margin-right: 10px"
                    v-model="outAmount"
                    type="number"
                  ></el-input>
                  Php
                </div>
              </div>
              <div class="next-btn">
                <el-button type="primary" @click="showPinDia"
                  >Confirm</el-button
                >
              </div>
            </div>
            <div
              class="base-style margin-top20"
              v-if="cashinType === 'customer' && stepType === 1"
            >
              <div class="type-cus-box">
                <div class="cus-left-box">
                  <div class="cus-title">Pre-deposit balance</div>
                  <div style="text-align: center">10000Php</div>
                </div>
                <div class="cus-right-box">
                  <div class="cus-right-title">
                    Please enter customer mobile
                  </div>
                  <div>
                    <el-input v-model="cusMobile"></el-input>
                  </div>
                  <div class="cus-right-title">Please enter cash in amount</div>
                  <div>
                    <el-input v-model="cusAmount" type="number"></el-input>
                  </div>
                </div>
              </div>
              <div style="text-align: center; margin-top: 20px">
                <el-button type="primary" @click="cashoutConfirm">
                  Confirm</el-button
                >
              </div>
            </div>
          </div>
          <div v-if="cashinType === 'customer' && stepType === 2">
            <div class="base-style">
              <div class="show-box">
                <div class="show-box-title">Cash out for:</div>
                <div class="show-box-content">Customer</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Request amount:</div>
                <div class="show-box-content">99 Php</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Service charge</div>
                <div class="show-box-content">20Php</div>
              </div>
              <div class="show-box">
                <div class="show-box-title">Net amount</div>
                <div class="show-box-content">20Php</div>
              </div>
              <div class="step2-cus-sm">
                Net amount is the amout you need to pay to customer!
              </div>
              <div style="text-align: center">
                <el-button @click="goCashoutStep3" type="primary"
                  >Confirm</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <div v-if="modalType === 'billpayments'">
          <div v-if="stepType === 1">
            <div class="base-style">
              <div class="dia-title">Please select biller type:</div>
              <div class="company-box">
                <div class="company-item">Water</div>
                <div class="company-item">Water</div>
                <div class="company-item">Water</div>
                <div class="company-item">Water</div>
                <div class="company-item">Water</div>
              </div>
            </div>
            <div class="base-style margin-top20">
              <div class="dia-title">Please select biller:</div>
              <div class="search-box">
                <el-input v-model="searchName"></el-input>
                <el-button type="primary" @click="searchBiller"
                  >Search</el-button
                >
              </div>
              <div class="company-box">
                <div
                  :class="
                    selectBiller === index
                      ? 'is-active company-item-item'
                      : 'company-item-item'
                  "
                  class="company-item-item"
                  v-for="(item, index) in 10"
                  :key="index"
                  @click="changeBiller(index)"
                >
                  <img
                    :class="
                      selectBiller === index
                        ? 'company-img is-active-border '
                        : 'company-img'
                    "
                    src="@/static/logo.png"
                    alt=""
                  />
                  <div>ABC</div>
                </div>
              </div>
            </div>
            <div class="base-style margin-top20">
              <div class="company-bottom">
                <div class="company-bottom-left">
                  <div class="left-item">
                    <div class="left-item-title">Please enter amount:(Php)</div>
                    <div>
                      <el-input v-model="billAmount" type="number"></el-input>
                    </div>
                  </div>
                  <div class="left-item">
                    <div class="left-item-title">
                      Please enter account number:
                    </div>
                    <div>
                      <el-input v-model="billAccountNumber"></el-input>
                    </div>
                  </div>
                  <div class="left-item">
                    <div class="left-item-title">
                      Please enter account name:
                    </div>
                    <div>
                      <el-input v-model="billAccountName"></el-input>
                    </div>
                  </div>
                </div>
                <div class="company-bottom-right">
                  <div>Your current</div>
                  <div class="bottom-right-middle">Pre-paid balance</div>
                  <div>10000Php</div>
                </div>
              </div>
              <div style="text-align: center; margin-top: 50px">
                <el-button type="primary" @click="billConfirm"
                  >Confirm</el-button
                >
              </div>
            </div>
          </div>
          <div v-if="stepType === 2">
            <div class="base-style">
              <div class="dia-title">Biller details:</div>
              <div class="detail-box">
                <div class="detail-item">
                  <div class="detail-box-title">Biller type:</div>
                  <div class="detail-box-content">Water</div>
                </div>
                <div class="detail-item">
                  <div class="detail-box-title">Biller name:</div>
                  <div class="detail-box-content">ABC company</div>
                </div>
              </div>
            </div>
            <div class="base-style margin-top20">
              <div class="dia-title">User details:</div>

              <div class="detail-box margin-top20">
                <div class="detail-item">
                  <div class="detail-box-title">Mobile number:</div>
                  <div class="detail-box-content">098877884</div>
                </div>
                <div class="detail-item">
                  <div class="detail-box-title">Account name:</div>
                  <div class="detail-box-content">Olicia Wang</div>
                </div>
                <div class="detail-item">
                  <div class="detail-box-title">Account number:</div>
                  <div class="detail-box-content">098777777</div>
                </div>
              </div>
            </div>
            <div class="base-style margin-top20">
              <div class="dia-title">Amount:</div>

              <div class="detail-box margin-top20">
                <div class="detail-item">
                  <div class="detail-box-title">Request amount:</div>
                  <div class="detail-box-content">14Php</div>
                </div>
                <div class="detail-item">
                  <div class="detail-box-title">Service charge:</div>
                  <div class="detail-box-content">24Php</div>
                </div>
                <div class="detail-item">
                  <div class="detail-box-title">Account number:</div>
                  <div class="detail-box-content">
                    888Php
                    <span style="color: #169bd5; font-size: 12px"
                      >Net amount is the final amount to be sent to the
                      biller!</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 50px">
              <el-button type="primary" @click="confirmSetup2"
                >Confirm</el-button
              >
            </div>
          </div>
          <div class="dia-box" v-if="stepType === 3">
            <div class="base-style">
              <div class="dia-title">Please enter transaction PIN:</div>
              <div class="dia-input">
                <el-input v-model="pin" maxlength="4"></el-input>
              </div>
              <div>
                If you have forgot transaction PIN, please reset via your
                merchant APP
              </div>
              <div style="text-align: center; margin-top: 50px">
                <el-button @click="billerFinish" type="primary"
                  >Confirm</el-button
                >
              </div>
            </div>
          </div>
        </div>
        <el-dialog
          width="30%"
          :visible.sync="pinDia"
          append-to-body
          :close-on-click-modal="false"
        >
          <div>
            <div class="base-style">
              <div class="dia-title">Please enter transaction PIN:</div>
              <div class="dia-input">
                <el-input v-model="pin" maxlength="4"></el-input>
              </div>
              <div>
                If you have forgot transaction PIN, please reset via your
                merchant APP
              </div>
              <div style="text-align: center; margin-top: 50px">
                <el-button @click="outFinish" type="primary">Confirm</el-button>
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
      selectBiller: 0,
      billAccountNumber: "",
      billAccountName: "",
      billAmount: 0,
      cusAmount: 0,
      cusMobile: "",
      cashinAmount: 0,
      assetType: "predeposit",
      cashinType: "self",
      modalType: "",
      showDia: false,
      stepType: 1,
      pin: "",
      pinDia: false,
      outAmount: "",
      searchName: "",
    };
  },
  methods: {
    billerFinish() {
      if (!this.pin) {
        this.$message.error("Please enter transaction PIN");
        return;
      }
      this.pin = "";
      this.stepType = 1;
      this.searchName = "";
      this.selectBiller = 0;
      this.billAccountNumber = "";
      this.billAccountName = "";
      this.billAmount = 0;
      this.showDia = false;
      this.pinDia = false;
    },
    confirmSetup2() {
      this.stepType = 3;
    },
    billConfirm() {
      if (this.billAmount <= 0) {
        this.$message.error("Please enter amount");
        return;
      }
      if (!this.billAccountNumber) {
        this.$message.error("Please enter account number");
        return;
      }
      if (!this.billAccountName) {
        this.$message.error("Please enter account name");
        return;
      }
      this.stepType = 2;
    },
    changeBiller(num) {
      this.selectBiller = num;
    },
    searchBiller() {},
    goCashoutStep3() {
      this.pinDia = true;
    },
    cashoutConfirm() {
      if (this.modalType === "cashout" && !this.cusMobile) {
        this.$message.error("Please enter customer mobile");
        return;
      }
      if (this.modalType === "cashout" && this.cusAmount <= 0) {
        this.$message.error("Please enter cash in amount");
        return;
      }
      this.stepType = 2;
      console.log(this.modalType);
      console.log(this.cashinType);
      console.log(this.stepType);
    },
    outFinish() {
      if (this.modalType === "cashin") {
        if (this.modalType === "cashout" && !this.pin) {
          this.$message.error("Please enter transaction PIN");
          return;
        }
        this.pin = "";
        this.stepType = 1;
        this.outAmount = "";
        this.pinDia = false;
        this.showDia = false;
      } else if (this.modalType === "cashout") {
        if (this.modalType === "cashout" && !this.pin) {
          this.$message.error("Please enter transaction PIN");
          return;
        }
        this.pin = "";
        this.stepType = 1;
        this.outAmount = "";
        this.pinDia = false;
        this.showDia = false;
      }
    },
    finish() {
      if (!this.pin && this.cashinType === "customer") {
        this.$message.error("Please enter transaction PIN");
        return;
      }
      this.stepType = 1;
      this.cashinType = "self";
      this.cashinAmount = 0;
      this.cusAmount = 0;
      this.cusMobile = "";
      this.assetType = "predeposit";
      this.pin = "";
      this.showDia = false;
    },
    goStep3() {
      this.stepType = 3;
    },
    changeAssetType(type) {
      this.assetType = type;
    },
    changeCashinType(type) {
      this.cashinType = type;
    },
    changeType(type) {
      this.modalType = type;
      this.stepType = 1;
      this.showDia = true;
    },
    next() {
      if (this.cashinType === "self" && !this.cashinAmount <= 0) {
        this.$message.error("Please enter cash in amount");
        return;
      }
      if (this.cashinType === "customer" && this.cusAmount <= 0) {
        this.$message.error("Please enter customer mobile");
        return;
      }
      if (this.cashinType === "customer" && this.cusMobile === "") {
        this.$message.error("Please enter cash in amount");
        return;
      }
      this.stepType = 2;
    },
    cancel() {
      this.showDia = false;
      this.cashinAmount = 0;
      this.assetType = "predeposit";
      this.cashinType = "self";
      this.stepType = 1;
      this.cusAmount = 0;
      this.cusMobile = "";
      this.pin = "";
    },
    showPinDia() {
      if (this.modalType === "cashout" && this.outAmount === "") {
        this.$message.error("Please enter cash out amount");
        return;
      }
      this.pinDia = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>