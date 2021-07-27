<template>
  <div class="t-container">
    <div class="top-box">
      <div class="left-box">
        <el-select
          style="margin-right: 10px"
          v-model="merchantId"
          placeholder="Merchant ID"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="branchId"
          placeholder="Branch ID"
          v-if="listType === 1"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

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
          Merchant settlement report
        </div>
        <div
          :class="listType === 2 ? 'default-box is-active' : 'default-box'"
          @click="changeType(2)"
        >
          Partner settlement report
        </div>
        <div
          :class="listType === 3 ? 'default-box is-active' : 'default-box'"
          @click="changeType(3)"
        >
          Revenue report
        </div>
      </div>
      <div class="list-box">
        <el-table
          v-if="listType === 1"
          style="width: 99%"
          :data="tableData"
          border
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#eee',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column fixed prop="id" label="Date"> </el-table-column>
          <el-table-column prop="date" label="Merchant legal name">
          </el-table-column>
          <el-table-column prop="amount" label="Merchant ID"> </el-table-column>
          <el-table-column prop="payer" label="Branch ID"> </el-table-column>
          <el-table-column prop="payee" label="Settled amount in total">
          </el-table-column>
          <el-table-column prop="status" label="MDR total"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="down(scope.row)" type="text" size="small"
                >Download report</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="listType === 2"
          style="width: 99%"
          :data="tableData"
          border
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#eee',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column fixed prop="id" label="Date"> </el-table-column>
          <el-table-column prop="date" label="Patener ID"> </el-table-column>
          <el-table-column prop="amount" label="Cash in amount in total">
          </el-table-column>
          <el-table-column prop="payer" label="Cash out amount in total">
          </el-table-column>
          <el-table-column
            prop="payee"
            label="Bill payments amount processed total"
          >
          </el-table-column>
          <el-table-column prop="status" label="Commission received">
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="down(scope.row)" type="text" size="small"
                >Download report</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="listType === 3"
          style="width: 99%"
          :data="tableData"
          border
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#eee',
          }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column fixed prop="id" label="Date"> </el-table-column>
          <el-table-column
            prop="date"
            label="Service charge from customer in total"
          >
          </el-table-column>
          <el-table-column prop="amount" label="MDR from merchant in total">
          </el-table-column>
          <el-table-column prop="payer" label="Bank service fee in total">
          </el-table-column>
          <el-table-column prop="payee" label="channel cost"> </el-table-column>
          <el-table-column prop="status" label="TUP commission">
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="down(scope.row)" type="text" size="small"
                >Download report</el-button
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      merchantId: "",
      branchId: "",
      options: [{ value: "001", label: "哈哈" }],

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
    changeType(num) {
      this.listType = num;
      this.branchId = "";
      this.pageNum = 1;
    },
    down(item) {},
    changePage(val) {},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
