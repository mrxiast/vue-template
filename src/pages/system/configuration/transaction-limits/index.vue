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
        <el-button type="primary" @click="showAdd">Add configuration</el-button>
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
          <el-table-column prop="date" label="User type"> </el-table-column>
          <el-table-column prop="amount" label="Account level">
          </el-table-column>
          <el-table-column prop="payer" label="Add person"> </el-table-column>
          <el-table-column prop="payer" label="Add date"> </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column label="Action" width="240">
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
      <el-dialog
        :visible.sync="showDia"
        :close-on-click-modal="false"
        @close="cancelDia"
      >
        <div class="tran-box">
          <div class="tran-box-title">Please select the limit user type</div>
          <div>
            <el-radio-group v-model="userType">
              <div class="radio-box">
                <div class="radio-item">
                  <el-radio label="merchant">Merchant</el-radio>
                </div>
                <div class="radio-item">
                  <el-radio label="partner">Tie up partners</el-radio>
                </div>
                <div class="radio-item">
                  <el-radio label="customer">Customer</el-radio>
                </div>
              </div>
            </el-radio-group>
          </div>
        </div>
        <div class="tran-box">
          <div class="tran-box-title">Add discription</div>
          <div>
            <el-input type="textarea" v-model="discription"></el-input>
          </div>
        </div>
        <div v-if="userType === 'customer'">
          <div>
            <div class="tran-box">
              <div class="tran-box-title">
                Please select the limit user accout level
              </div>
              <div>
                <el-checkbox-group v-model="checkList">
                  <div>
                    <div class="check-box">
                      <el-checkbox label="all">All</el-checkbox>
                    </div>
                    <div class="check-box">
                      <el-checkbox label="basic">Basic</el-checkbox>
                    </div>
                    <div class="check-box">
                      <el-checkbox label="legitimate">Legitimate</el-checkbox>
                    </div>
                    <div class="check-box">
                      <el-checkbox label="established">Established</el-checkbox>
                    </div>
                    <div class="check-box">
                      <el-checkbox label="approval"
                        >Established for special approval</el-checkbox
                      >
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div>
            <div class="tran-box">
              <div class="tran-box-title">Configuration list</div>
              <div>
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item
                    :name="item.name"
                    v-for="(item, index) in list"
                    :key="index"
                  >
                    <template slot="title">
                      <div class="title-item">
                        <div>{{ item.title }}</div>
                        <div>{{ item.status }}</div>
                      </div>
                    </template>

                    <div style="padding: 0 100px">
                      <div class="collapse-box">
                        <div class="collapse-con-title">
                          Per transaction(Php)
                        </div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per day(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per month(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per year(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div class="center-btn">
              <el-button type="primary" @click="comfirmForm">confirm</el-button>
            </div>
          </div>
        </div>
        <div v-if="userType === 'partner'">
          <div>
            <div class="tran-box">
              <div class="tran-box-title">
                Please select the limit user accout level
              </div>
              <div>
                <el-checkbox-group v-model="checkList">
                  <div>
                    <div class="check-box">
                      <el-checkbox label="all">Ccrporation</el-checkbox>
                    </div>
                    <div class="check-box">
                      <el-checkbox label="basic">Individual</el-checkbox>
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div>
            <div class="tran-box">
              <div class="tran-box-title">Configuration list</div>
              <div>
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item
                    :name="item.name"
                    v-for="(item, index) in partnerList"
                    :key="index"
                  >
                    <template slot="title">
                      <div class="title-item">
                        <div>{{ item.title }}</div>
                        <div>{{ item.status }}</div>
                      </div>
                    </template>

                    <div style="padding: 0 100px">
                      <div class="collapse-box">
                        <div class="collapse-con-title">
                          Per transaction(Php)
                        </div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per day(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per month(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per year(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div class="center-btn">
              <el-button type="primary" @click="comfirmForm">confirm</el-button>
            </div>
          </div>
        </div>
        <div v-if="userType === 'merchant'">
          <div>
            <div class="tran-box">
              <div class="tran-box-title">
                Please select the limit user accout level
              </div>
              <div>
                <el-checkbox-group v-model="checkList">
                  <div>
                    <div class="check-box">
                      <el-checkbox label="all"
                        >Small-Level Merchant (SLM)</el-checkbox
                      >
                    </div>
                    <div class="check-box">
                      <el-checkbox label="basic"
                        >High-Level Merchant (HLM)</el-checkbox
                      >
                    </div>
                    <div class="check-box">
                      <el-checkbox label="basic"
                        >LARGE ENTERPRISE(LE)</el-checkbox
                      >
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div>
            <div class="tran-box">
              <div class="tran-box-title">Configuration list</div>
              <div>
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item
                    :name="item.name"
                    v-for="(item, index) in partnerList"
                    :key="index"
                  >
                    <template slot="title">
                      <div class="title-item">
                        <div>{{ item.title }}</div>
                        <div>{{ item.status }}</div>
                      </div>
                    </template>

                    <div style="padding: 0 100px">
                      <div class="collapse-box">
                        <div class="collapse-con-title">
                          Per transaction(Php)
                        </div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per day(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per month(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                      <div class="collapse-box">
                        <div class="collapse-con-title">Per year(Php)</div>
                        <el-input style="width: 300px"></el-input>
                      </div>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
            <div class="center-btn">
              <el-button type="primary" @click="comfirmForm">confirm</el-button>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="module-box">
      <el-dialog
        :visible.sync="showView"
        :close-on-click-modal="false"
        @close="cancelDia"
      >
        <div class="tran-box">
          <div class="tran-box-title">User details</div>
          <div class="box-item">
            <div class="box-item-title">User type</div>
            <div>Customer</div>
          </div>
          <div class="box-item">
            <div class="box-item-title">Account level</div>
            <div>Basic</div>
          </div>
          <div class="box-item">
            <div class="box-item-title">Configure date</div>
            <div>Customer</div>
          </div>
          <div class="box-item">
            <div class="box-item-title">Status</div>
            <div>Customer</div>
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
          <div class="tran-box-title">Fee ladder</div>
          <div>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item
                :name="item.name"
                v-for="(item, index) in partnerList"
                :key="index"
              >
                <template slot="title">
                  <div class="title-item">
                    <div>{{ item.title }}</div>
                    <div>{{ item.status }}</div>
                  </div>
                </template>

                <div style="padding: 0 100px">
                  <div class="collapse-box">
                    <div class="collapse-con-title">Per transaction(Php)</div>
                    <el-input style="width: 300px" disabled></el-input>
                  </div>
                  <div class="collapse-box">
                    <div class="collapse-con-title">Per day(Php)</div>
                    <el-input style="width: 300px" disabled></el-input>
                  </div>
                  <div class="collapse-box">
                    <div class="collapse-con-title">Per month(Php)</div>
                    <el-input style="width: 300px" disabled></el-input>
                  </div>
                  <div class="collapse-box">
                    <div class="collapse-con-title">Per year(Php)</div>
                    <el-input style="width: 300px" disabled></el-input>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
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
      userType: "merchant",
      activeNames: "",
      list: [
        {
          title: "Cash in -OTC",
          status: "Completed",
          name: "in",
          id: "01",
          transcation: 10,
          perDay: 10,
          perMonth: 12,
          perYear: 22,
        },
        {
          title: "Cash out -OTC",
          status: "Not done",
          name: "out ",
          id: "01",
          transcation: 10,
          perDay: 10,
          perMonth: 12,
          perYear: 22,
        },
        {
          title: "Net-banking",
          status: "Not done",
          name: "bank",
          id: "01",
          transcation: 10,
          perDay: 10,
          perMonth: 12,
          perYear: 22,
        },
      ],
      partnerList: [
        {
          title: "Cash in -OTC",
          status: "Completed",
          name: "in",
          id: "01",
          transcation: 10,
          perDay: 10,
          perMonth: 12,
          perYear: 22,
        },
        {
          title: "Cash out -OTC",
          status: "Not done",
          name: "out ",
          id: "01",
          transcation: 10,
          perDay: 10,
          perMonth: 12,
          perYear: 22,
        },
      ],
      radio: "",
      checkList: [],
      discription: "",
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
    cancelDia() {
      this.checkList = [];
      this.userType = "";
      this.showDia = false;
    },
    handleChange() {},

    comfirmForm() {
      this.checkList = [];
      this.userType = "";
      this.showDia = false;
      this.$message.success("Successfully!");
    },
    showAdd() {
      this.showDia = true;
    },
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
