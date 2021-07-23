<template>
  <div class="t-container">
    <div class="top-box">
      <div class="left-box">
        <el-input
          style="width: 300px"
          v-model="searchId"
          placeholder="Merchant ID/branch ID"
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
        <el-button type="primary" @click="addPayroll">Add payroll</el-button>
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
          <el-table-column fixed prop="id" label="Batch ID"> </el-table-column>
          <el-table-column prop="date" label="Merchant legal name">
          </el-table-column>
          <el-table-column prop="amount" label="Branch ID"> </el-table-column>
          <el-table-column prop="payer" label="Upload date"> </el-table-column>
          <el-table-column prop="payee" label="Processed date">
          </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column prop="status" label="Upload by"> </el-table-column>
          <el-table-column prop="status" label="Request amount(P)">
          </el-table-column>
          <el-table-column prop="status" label="Processed amount(P)">
          </el-table-column>
          <el-table-column prop="status" label="Failed amount(P)">
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goDown(scope)" type="text" size="small"
                >Download</el-button
              >
              <el-button @click="goCancel(scope)" type="text" size="small"
                >Cancel</el-button
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
    <div class="module-box-only">
      <el-dialog :visible.sync="showAdd" :close-on-click-modal="false">
        <div v-if="addType === 1">
          <div class="add-top-title">
            <span>Please download payroll file format</span>
            <span style="color: #409eff; cursor: pointer" @click="downFormat"
              >Download format here!</span
            >
          </div>
          <div>
            <div class="up-title">Upload file here:</div>
            <div>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </div>
          <div class="sub-btn-box">
            <el-button type="primary" @click="submit">Upload now</el-button>
          </div>
        </div>
        <div v-if="addType === 2">
          <div class="table-title">Preview</div>
          <div>
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
              <el-table-column fixed prop="id" label="No."> </el-table-column>
              <el-table-column prop="date" label="User name"> </el-table-column>
              <el-table-column
                prop="amount"
                label="Mobile number/Fortune Pay account ID"
              >
              </el-table-column>
              <el-table-column prop="payer" label="Amount"> </el-table-column>
            </el-table>
            <div class="sub-btn-box">
              <el-button @click="cancle">Cancel</el-button>
              <el-button type="primary" @click="PreComfirm">Confirm</el-button>
            </div>
          </div>
        </div>
        <div v-if="addType === 3">
          <div class="type3-icon">
            <i class="el-icon-warning"></i>
          </div>
          <div class="type3-title">
            Data not fount for below users,please adk the users to register
            Fortune Pay account or enter the correct mobild number
          </div>
          <div class="type3-list">
            <div class="type3-item" v-for="i in 3" :key="i">
              <div>NO.1</div>
              <div>Olivia wang</div>
              <div>1384574489</div>
              <div>600</div>
            </div>
          </div>
          <div style="text-align: center">Go on processing the valid data?</div>
          <div class="type3-btn">
            <el-button @click="cancle">Cancel</el-button>
            <el-button type="primary" @click="process">Process</el-button>
          </div>
        </div>
        <div v-if="addType === 4">
          <div>
            <el-radio v-model="radio" label="1">Processing now</el-radio>
            <el-radio v-model="radio" label="2">Schedule a date</el-radio>
          </div>
          <div class="select-time" v-if="radio === '2'">
            <el-date-picker
              v-model="scheduleDate"
              type="datetime"
              placeholder="Select Time"
            >
            </el-date-picker>
          </div>
          <div class="type3-btn">
            <el-button type="primary" @click="confirmEnd">Confirm</el-button>
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
      radio: "1",
      showAdd: false,
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
      addType: 1,
      scheduleDate: "",
    };
  },
  created() {},
  methods: {
    confirmEnd() {
      if (this.radio === 1) {
        this.scheduleDate = "";
      }
      this.addType = 1;
      this.showAdd = false;
    },
    process() {
      this.addType = 4;
    },
    cancle() {
      this.addType = 1;
      this.showAdd = false;
    },
    PreComfirm() {
      this.addType = 3;
    },
    submit() {
      this.$message.success("success");
      this.addType = 2;
    },
    //图片上传开始
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
    //图片上传结束
    downFormat() {
      console.log("点击下载");
    },
    addPayroll() {
      this.showAdd = true;
    },
    goDown() {},
    goCancel() {},
    goView(item) {
      this.showDia = true;
    },
    changePage(val) {},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang='less'>
.module-box-only {
  .el-dialog {
    width: 700px !important;
  }
}
</style>
