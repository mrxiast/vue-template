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
        <el-button type="primary" @click="goEdit">Add configuration</el-button>
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
          <el-table-column fixed prop="id" label="Discription">
          </el-table-column>
          <el-table-column prop="date" label="Merchant level">
          </el-table-column>
          <el-table-column prop="amount" label="Merchant type">
          </el-table-column>
          <el-table-column prop="payer" label="Create date"> </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goView(scope)" size="small">View</el-button>
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
      <el-dialog :visible.sync="showDia" :close-on-click-modal="false">
        <div id="print">
          <div class="tran-box">
            <div class="tran-box-title">Basic information</div>
            <div class="basic-box">
              <div class="basic-title">Please select merchant type</div>
              <div>
                <el-select v-model="merchantType" placeholder="请选择">
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
            <div class="basic-box">
              <div class="basic-title">Please select merchant level</div>
              <div>
                <el-select v-model="merchantLevel" placeholder="请选择">
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
            <div class="basic-box">
              <div class="basic-title">Please enter discription</div>
              <div>
                <el-select v-model="discription" placeholder="请选择">
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
          </div>
          <div class="tran-box">
            <div
              class="tran-box-title"
              style="display: flex; justify-content: space-between"
            >
              <span>Create rates list</span>
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">
                  In same tier, the maximum number must >= minimum number For<br />
                  cross tiers, the minimum number of higher tier must larger<br />
                  than the maximum tier of lower tier. MRD is only applicable
                  to<br />
                  merchant who is using FP to accept payments
                </div>
                <span style="color: #169db5">Tips:</span>
              </el-tooltip>
            </div>
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
                v-for="(item, index) in retesList"
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
              <el-button type="primary" @click="addForm">Confirm</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="module-box">
      <el-dialog :visible.sync="showView" :close-on-click-modal="false">
        <div id="print">
          <div class="tran-box">
            <div class="basic-box">
              <div class="basic-title">Configure date</div>
              <div>May-11 2021 12:00:00</div>
            </div>
            <div class="basic-box">
              <div class="basic-title">Status</div>
              <div>Active</div>
            </div>
            <div class="basic-box">
              <div class="basic-title">Merchant type:</div>
              <div>Online</div>
            </div>
            <div class="basic-box">
              <div class="basic-title">Merchant level:</div>
              <div>Small company</div>
            </div>
          </div>
          <div class="tran-box">
            <div class="tran-box-title">Description:</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              euismod bibendum laoreet. Proin gravida dolor sit amet lacus
              accumsan et viverra justo commodo. Proin sodales pulvinar sic
              tempor. Sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
              vulputate, felis tellus mollis orci, sed rhoncus pronin sapien
              nunc accuan eget.
            </div>
          </div>
          <div class="tran-box">
            <div class="tran-box-title">Fee ladder:</div>
            <div>
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
                  <el-table-column fixed prop="id" label="Tier">
                  </el-table-column>
                  <el-table-column prop="date" label="From"> </el-table-column>
                  <el-table-column prop="amount" label="To"> </el-table-column>
                  <el-table-column prop="payer" label="Percent rate">
                  </el-table-column>
                  <el-table-column prop="status" label="Fixed value">
                  </el-table-column>
                </el-table>
              </div>
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
      showView: false,
      nowItem: {},
      retesList: [
        {
          id: 1,
          percentValue: "20",
          fixedValue: "30",
          amountFrom: "10",
          amountTo: "50",
        },
      ],
      merchantType: "",
      merchantLevel: "",
      discription: "",
      options: [],
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
    addForm() {
      this.$message.success("Added successfully!");
      this.showDia = false;
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
      this.retesList.push({
        id: this.retesList.length + 1,
        percentValue: "20",
        fixedValue: "30",
        amountFrom: "10",
        amountTo: "50",
      });
    },
    goDisable() {
      this.$confirm("Are you sure to disable this MRD record!", "", {
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
    goEdit(item) {
      this.nowItem = item;
      this.showDia = true;
    },
    goView(item) {
      this.showView = true;
    },
    changePage(val) {},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
