<template>
  <div class="t-container">
    <div class="top-box">
      <div class="left-box">
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
        <el-button type="primary" @click="addConfig"
          >Add configuration</el-button
        >
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
          <el-table-column fixed prop="id" label="Disription">
          </el-table-column>
          <el-table-column prop="date" label="Partner level"> </el-table-column>
          <el-table-column prop="amount" label="Add person"> </el-table-column>
          <el-table-column prop="payer" label="Add date"> </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column label="Action" width="240">
            <template slot-scope="scope">
              <el-button @click="goView(scope)" type="info" size="small"
                >View</el-button
              >
              <el-button @click="goEdit(scope)" type="primary" size="small"
                >Edit</el-button
              >
              <el-button @click="goDisable(scope)" type="danger" size="small"
                >Disable</el-button
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
      <el-dialog
        :visible.sync="showDia"
        :close-on-click-modal="false"
        @close="cancelShowDia"
      >
        <div id="print">
          <div class="tran-box">
            <div class="tran-box-title">Commission configured for?</div>
            <div class="config-box">
              <div
                @click="changeType('1')"
                :class="
                  partnerType === '1' ? 'config-item is-active' : 'config-item'
                "
              >
                Corporation partner
              </div>
              <div
                @click="changeType('2')"
                :class="
                  partnerType === '2' ? 'config-item is-active' : 'config-item'
                "
              >
                individual partner
              </div>
            </div>
          </div>
          <div class="tran-box">
            <div class="tran-box-title">Add discription</div>
            <div class="account-level">
              <div>
                <el-input
                  v-model="discription"
                  type="textarea"
                  maxlength="200"
                  show-word-limit
                ></el-input>
              </div>
            </div>
          </div>
          <div class="tran-box">
            <div class="tran-box-title">Configuration list</div>
            <div class="item-box">
              <div class="item-title">Cash in</div>
              <div class="item-con">
                <el-button size="small" type="text" @click="showInnerBox"
                  >Completed</el-button
                >
              </div>
            </div>
            <div class="item-box">
              <div class="item-title">Cash out</div>
              <div class="item-con">
                <el-button size="small" type="text">Completed</el-button>
              </div>
            </div>
            <div class="item-box">
              <div class="item-title">Bill payments</div>
              <div class="item-con">
                <el-button size="small" type="text">Completed</el-button>
              </div>
            </div>
          </div>
          <el-dialog
            width="50%"
            title="Cash in fee ladder"
            :visible.sync="showInner"
            append-to-body
          >
            <div>
              <div class="inner-top-box">
                <div>Formula</div>
                <div>Fee(Y) = N*percent value + fixed value</div>
                <div>Configured for per transaction!</div>
              </div>
              <div class="add-box">
                <el-button type="primary" size="small" @click="addItem"
                  ><i class="el-icon-circle-plus-outline"></i> add</el-button
                >
              </div>
              <div class="inner-con">
                <div
                  class="inner-item"
                  v-for="(item, index) in ladderList"
                  :key="index"
                >
                  <div class="inner-left">
                    <div class="inner-title">Tier{{ index + 1 }}</div>
                    <div class="inner-left-box">
                      <div class="title-inner">Amount from</div>
                      <div>
                        <el-input
                          v-model="item.amountFrom"
                          placeholder="Minimum"
                        ></el-input>
                      </div>
                    </div>
                    <div style="margin: 0 10px; margin-top: 15px">———</div>
                    <div>
                      <div class="title-inner">Amount to</div>
                      <div>
                        <el-input
                          v-model="item.amountTo"
                          placeholder="Minimum"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="inner-right">
                    <div class="inner-right-box">
                      <div class="right-title-inner">Percent value(P)</div>
                      <div>
                        <el-input
                          class="input-width"
                          v-model="item.percentValue"
                        ></el-input>
                      </div>
                    </div>
                    <div class="inner-right-box">
                      <div class="right-title-inner">Fixed value(P)</div>
                      <div>
                        <el-input
                          class="input-width"
                          v-model="item.fixedValue"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                  <div class="del-box">
                    <i
                      @click="delItem(item)"
                      style="cursor: pointer; margin-top: 20px"
                      class="el-icon-remove-outline"
                    ></i>
                  </div>
                </div>
              </div>
              <div style="text-align: center; margin-top: 50px">
                <el-button type="primary" @click="comfirmInner"
                  >Confirm</el-button
                >
              </div>
            </div>
          </el-dialog>
        </div>
      </el-dialog>
    </div>
    <div class="module-box">
      <el-dialog :visible.sync="showView" :close-on-click-modal="false">
        <div class="tran-box">
          <div class="tran-box-title">Add discription</div>
          <div class="view-item">
            <div style="width: 150px">Configured for:</div>
            <div>Vorporation</div>
          </div>
          <div class="view-item">
            <div style="width: 150px">Configure date:</div>
            <div>May-11 2021 12:00:00</div>
          </div>
          <div class="view-item">
            <div style="width: 150px">Status:</div>
            <div>Active</div>
          </div>
        </div>
        <div class="tran-box">
          <div class="tran-box-title">Add discription</div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin gravida dolor sit amet lacus
            accumsan et viverra justo commodo. Proin sodales pulvinar sic
            tempor. Sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc
            accuan eget.
          </div>
        </div>

        <div class="tran-box">
          <div class="tran-box-title">Configuration list</div>
          <div class="item-box">
            <div class="item-title">Cash in</div>
            <div class="item-con">
              <el-button size="small" type="text" @click="showInnerView"
                >Completed</el-button
              >
            </div>
          </div>
          <div class="item-box">
            <div class="item-title">Cash out</div>
            <div class="item-con">
              <el-button size="small" type="text" @click="showInnerView"
                >Completed</el-button
              >
            </div>
          </div>
          <div class="item-box">
            <div class="item-title">Bill payments</div>
            <div class="item-con">
              <el-button size="small" type="text" @click="showInnerView"
                >Completed</el-button
              >
            </div>
          </div>
        </div>
        <el-dialog
          width="50%"
          title="Cash in fee ladder"
          :visible.sync="innerView"
          append-to-body
        >
          <div>
            <div class="inner-top-box">
              <div>Formula</div>
              <div>Fee(Y) = N*percent value + fixed value</div>
              <div>Configured for per transaction!</div>
            </div>

            <div class="inner-con">
              <div
                class="inner-item"
                v-for="(item, index) in ladderList"
                :key="index"
              >
                <div class="inner-left">
                  <div class="inner-title">Tier{{ index + 1 }}</div>
                  <div class="inner-left-box">
                    <div class="title-inner">Amount from</div>
                    <div>
                      <el-input
                        disabled
                        v-model="item.amountFrom"
                        placeholder="Minimum"
                      ></el-input>
                    </div>
                  </div>
                  <div style="margin: 0 10px; margin-top: 15px">———</div>
                  <div>
                    <div class="title-inner">Amount to</div>
                    <div>
                      <el-input
                        disabled
                        v-model="item.amountTo"
                        placeholder="Minimum"
                      ></el-input>
                    </div>
                  </div>
                </div>
                <div class="inner-right">
                  <div class="inner-right-box">
                    <div class="right-title-inner">Percent value(P)</div>
                    <div>
                      <el-input
                        disabled
                        class="input-width"
                        v-model="item.percentValue"
                      ></el-input>
                    </div>
                  </div>
                  <div class="inner-right-box">
                    <div class="right-title-inner">Fixed value(P)</div>
                    <div>
                      <el-input
                        disabled
                        class="input-width"
                        v-model="item.fixedValue"
                      ></el-input>
                    </div>
                  </div>
                </div>
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
      partnerType: "1",
      innerView: false,
      showView: false,
      options: [],
      ladderList: [
        {
          id: "01",
          percentValue: "20",
          fixedValue: "30",
          amountFrom: "10",
          amountTo: "50",
        },
      ],

      showInner: false,
      discription: "",
      accountLevel: "",
      showDia: false,
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      searchId: "",
      times: "",
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
    cancelShowDia() {
      this.showDia = false;
      this.discription = "";
    },
    comfirmInner() {
      this.showInner = false;
    },
    changeType(type) {
      this.partnerType = type;
    },
    showInnerView() {
      this.innerView = true;
    },
    delItem(item) {
      this.$confirm("Are you sure delete?", "", {
        confirmButtonText: "Yes,do it",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.ladderList = this.ladderList.filter((i) => {
            return item.id !== i.id;
          });
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
    addItem() {
      this.ladderList.push({
        id: this.ladderList.length + 1,
        percentValue: "20",
        fixedValue: "30",
        amountFrom: "10",
        amountTo: "50",
      });
    },
    addConfig() {
      this.showDia = true;
    },
    goView(item) {
      this.showView = true;
    },
    changePage(val) {
      this.pageNum = val;
    },
    goDisable() {
      this.$confirm("Are you sure to disable this configuration?", "", {
        confirmButtonText: "Yes,disable it",
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
    showInnerBox() {
      this.showInner = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
