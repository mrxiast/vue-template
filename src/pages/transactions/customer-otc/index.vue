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
        <el-button
          @click="changeList(1)"
          :type="listType === 1 ? 'primary' : ''"
          >Cash in</el-button
        >
        <el-button
          @click="changeList(2)"
          :type="listType === 2 ? 'primary' : ''"
          >Cash out</el-button
        >
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
          <el-table-column prop="amount" label="TXN Amount（P）">
          </el-table-column>
          <el-table-column prop="payer" label="Service charge fee(P)">
          </el-table-column>
          <el-table-column prop="payee" label="Commission (P)">
          </el-table-column>
          <el-table-column prop="payee" label="Customer ID"> </el-table-column>
          <el-table-column prop="payee" label="Partner ID"> </el-table-column>
          <el-table-column prop="payee" label="Channel name"> </el-table-column>
          <el-table-column prop="payee" label="Status"> </el-table-column>
          <el-table-column prop="status" label="Device"> </el-table-column>
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
          <div class="tran-box">
            <div class="tran-box-title">Transaction details</div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Transaction mode:
                  </div></el-col
                >
                <el-col :span="18"><div class="grid-content">OTC</div></el-col>
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
                  ><div class="grid-content grid-bgc">Status:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Completed</div></el-col
                >
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
          <div class="partner">
            <div class="title">Partner details</div>
            <div class="table-boxs">
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Receiver's details</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Receiver's details</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Receiver's details</div>
                <div class="table-content-box">Receiver's details</div>
                <div class="table-title-box">Receiver's details</div>
                <div class="table-content-box">Receiver's details</div>
              </div>
            </div>
          </div>
          <div class="partner">
            <div class="title">Settlement</div>
            <div class="table-boxs">
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Settlement status</div>
                <div class="table-content-box">01</div>
                <div class="table-title-box">Settlement amount</div>
                <div class="table-content-box">02</div>
              </div>
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Settlement method</div>
                <div class="table-content-box">03</div>
                <div class="table-title-box">Commission</div>
                <div class="table-content-box">04</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Settled date</div>
                <div class="table-content-box">05</div>
                <div class="table-title-box"></div>
                <div class="table-content-box"></div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="module-box">
      <el-dialog :visible.sync="showOutDia" :close-on-click-modal="false">
        <div id="printOut">
          <div class="dia-top-box">
            <div class="top-left-box">
              <div class="dia-title-box">Transaction ID</div>
              <div class="dia-title-content">OUTOUTOUTOUTOUTOUTOUTOUTOUT</div>
            </div>
            <el-button
              type="primary"
              icon="el-icon-printer"
              v-print="printObjOut"
              >Print</el-button
            >
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
                <el-col :span="18"><div class="grid-content">OTC</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Transaction type:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Cash out</div></el-col
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
                  ><div class="grid-content grid-bgc">Status:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">Completed</div></el-col
                >
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
          <div class="partner">
            <div class="title">Partner details</div>
            <div class="table-boxs">
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Agent name</div>
                <div class="table-content-box">7-11</div>
                <div class="table-title-box">Agent ID</div>
                <div class="table-content-box">123456789</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Channels</div>
                <div class="table-content-box">ECpay</div>
                <div class="table-title-box">Partner type</div>
                <div class="table-content-box">Offline store</div>
              </div>
            </div>
          </div>
          <div class="partner">
            <div class="title">Settlement</div>
            <div class="table-boxs">
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Settlement status</div>
                <div class="table-content-box">01</div>
                <div class="table-title-box">Settlement amount</div>
                <div class="table-content-box">02</div>
              </div>
              <div class="table-item" style="border-bottom: 1px solid #ddd">
                <div class="table-title-box">Settlement method</div>
                <div class="table-content-box">03</div>
                <div class="table-title-box">Commission</div>
                <div class="table-content-box">04</div>
              </div>
              <div class="table-item">
                <div class="table-title-box">Settled date</div>
                <div class="table-content-box">05</div>
                <div class="table-title-box"></div>
                <div class="table-content-box"></div>
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
          name: "测试",
        },
      ],
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
      this.nowItem = item;
      if (this.listType === 1) {
        this.showDia = true;
      } else {
        this.showOutDia = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>