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
      <div class="table-box-btn">
        <div
          @click="changeList(1)"
          :class="listType === 1 ? 'table-btn is-active' : 'table-btn'"
        >
          BPI
        </div>
        <div
          @click="changeList(2)"
          :class="listType === 2 ? 'table-btn is-active' : 'table-btn'"
        >
          CTBC
        </div>
        <div
          @click="changeList(3)"
          :class="listType === 3 ? 'table-btn is-active' : 'table-btn'"
        >
          Channel netbanking
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
          <el-table-column prop="date" label="User type"> </el-table-column>
          <el-table-column prop="date" label="Transaction type">
          </el-table-column>
          <el-table-column prop="amount" label="TXN Amount(P)">
          </el-table-column>
          <el-table-column prop="amount" label="Bank service fee(P)">
          </el-table-column>
          <el-table-column prop="amount" label="Commission to Fortune pay(P)">
          </el-table-column>
          <el-table-column prop="payer" label="Net amount(P)">
          </el-table-column>
          <el-table-column prop="payee" label="Status"> </el-table-column>
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
                  ><div class="grid-content">Netbanking-BPI</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Transaction type:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Cash in</div></el-col
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
                    Bank service fee
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Commission to Fortune Pay
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
          <div v-if="listType === 1">
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
                  <div class="table-title-box">Account level</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Customer mobile number</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Account name</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Account number</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item">
                  <div class="table-title-box">Billing address</div>
                  <div class="table-content-box" style="width: 885px">
                    Billing address
                  </div>
                </div>
              </div>
            </div>
            <div class="partner" v-if="dataUserType === 'merchant'">
              <div class="title">User details</div>
              <div class="table-boxs">
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">User type</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Merchant ID</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Branch ID</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Merchant type</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Website</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Merchant level</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item">
                  <div class="table-title-box">Account name</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Account number</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
              </div>
            </div>
            <div class="partner" v-if="dataUserType === 'agent'">
              <div class="title">User details</div>
              <div class="table-boxs">
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">User type</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Agent ID</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Agent type</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Account name</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Account number</div>
                  <div class="table-content-box">65555555666</div>
                  <div class="table-title-box"></div>
                  <div class="table-content-box"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="listType === 2">
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
                  <div class="table-title-box">Agent level</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Customer mobile number</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Account name</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Account number</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item">
                  <div class="table-title-box">Account number</div>
                  <div class="table-content-box" style="width: 885px">
                    65555555666
                  </div>
                </div>
              </div>
            </div>
            <div class="partner" v-if="dataUserType === 'merchant'">
              <div class="title">User details</div>
              <div class="table-boxs">
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">User type</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Merchant ID</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Branch ID</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Merchant type</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Website</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Merchant level</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Account name</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Account number</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
              </div>
            </div>
            <div class="partner" v-if="dataUserType === 'agent'">
              <div class="title">User details</div>
              <div class="table-boxs">
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">User type</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Agent ID</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Agent type</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Account name</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Account number</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box"></div>
                  <div class="table-content-box"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="listType === 3">
            <div class="partner" v-if="dataUserType === 'agent'">
              <div class="title">User details</div>
              <div class="table-boxs">
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">User type</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Agent ID</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Agent type</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Account name</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Account number</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box"></div>
                  <div class="table-content-box"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="short-box" v-if="listType === 1 || listType === 2">
            <div class="short-title">Bank response</div>
            <div>No response</div>
          </div>
          <div v-if="listType === 3">
            <div class="partner">
              <div class="title">Channel details</div>
              <div class="table-boxs">
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Channel name</div>
                  <div class="table-content-box">Receiver's details</div>
                  <div class="table-title-box">Bank name</div>
                  <div class="table-content-box">Receiver's details</div>
                </div>
                <div class="table-item" style="border-bottom: 1px solid #ddd">
                  <div class="table-title-box">Response</div>
                  <div class="table-content-box" style="width: 885px">
                    Receiver's details
                  </div>
                </div>
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
          name: "测试1",
          userType: "customer",
        },
        {
          id: "01",
          name: "测试2",
          userType: "merchant",
        },
        {
          id: "01",
          name: "测试3",
          userType: "agent",
        },
      ],
      dataUserType: "",
      tranId: "",
      times: "",
      listType: 1,
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      showDia: false,
      showOutDia: false,
      nowItem: {},
    };
  },
  methods: {
    changeList(num) {
      this.listType = num;
      this.pageNum = 1;
    },
    changePage(val) {
      this.pageNum = val;
    },
    goView(item) {
      console.log(item, "iittem");
      this.nowItem = item;
      this.dataUserType = this.nowItem.userType;
      console.log(this.dataUserType, "887");
      this.showDia = true;
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>