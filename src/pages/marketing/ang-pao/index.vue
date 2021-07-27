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
        <el-button type="primary" @click="search">Search</el-button>
        <el-button type="success" @click="createActive"
          >Create Ang Pao activity</el-button
        >
      </div>
    </div>
    <div class="bottom-box">
      <div class="bottom-top-box">
        <div
          :class="listType === 1 ? 'default-box is-active' : 'default-box'"
          @click="changeType(1)"
        >
          Activity list
        </div>
        <div
          :class="listType === 2 ? 'default-box is-active' : 'default-box'"
          @click="changeType(2)"
        >
          Ang Pao statistics
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
          <el-table-column prop="id" label="Promition period start">
          </el-table-column>
          <el-table-column prop="date" label="Promotion period end">
          </el-table-column>
          <el-table-column prop="amount" label="Reward amount/Per customer">
          </el-table-column>
          <el-table-column prop="payer" label="Expiration hours last">
          </el-table-column>
          <el-table-column prop="payee" label="Double amount">
          </el-table-column>
          <el-table-column prop="status" label="Discription"> </el-table-column>
          <el-table-column prop="status" label="Maximum reward amount/Day(P)">
          </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goEdit(scope.row)" type="text" size="small"
                >Edit</el-button
              >
              <el-button
                @click="goSwitch(scope.row)"
                type="text"
                size="small"
                >{{
                  scope.row.status === 1 ? "Switch off" : "Switch on"
                }}</el-button
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
          <el-table-column prop="date" label="Date"> </el-table-column>
          <el-table-column prop="date" label="Total send(P)"> </el-table-column>
          <el-table-column prop="amount" label="Total claimed(P)">
          </el-table-column>
          <el-table-column prop="payer" label="Total Expired(P)">
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="down(scope.row)" type="text" size="small"
                >Download</el-button
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
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          class="demo-ruleForm"
        >
          <el-form-item label="active discription" prop="name">
            <el-input v-model="ruleForm.discription"></el-input>
          </el-form-item>
          <el-form-item label="promotion perion">
            <el-date-picker
              v-model="ruleForm.time"
              type="datetimerange"
              range-separator="To"
              start-placeholder="Start time"
              end-placeholder="End time"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="account level" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="amount to reward" prop="desc">
            <el-input
              type="textarea"
              v-model="ruleForm.desc"
              placeholder="The amount range must fall in 1P-10Php"
            ></el-input>
          </el-form-item>
          <el-form-item label="expiration date(Hours)" prop="desc">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="Referring to others" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="successful referral" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="maximum amount" prop="desc">
            <el-input v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <div style="text-align: center">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >Confirm</el-button
            >
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {},
      listType: 1,
      radio: "1",
      showAdd: false,
      pageNum: 1,
      pageSize: 10,
      total: 1000,
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
          status: 2,
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
      nowItem: {},
      isEdit: false,
    };
  },
  created() {},
  methods: {
    down() {},
    search() {},
    changeType(num) {
      this.listType = num;
    },
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
    createActive() {
      this.showAdd = true;
    },
    goEdit(item) {
      this.nowItem = item;
      this.isEdit = true;
      this.showAdd = true;
    },
    goSwitch(item) {
      this.nowItem = item;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
    changePage(val) {
      this.pageNum = val;
    },
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
