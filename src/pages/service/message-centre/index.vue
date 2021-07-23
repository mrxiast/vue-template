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
        <el-button type="primary">Search</el-button>
        <el-button type="success" @click="createMesage"
          >Create message</el-button
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
          <el-table-column fixed prop="id" label="Last update">
          </el-table-column>
          <el-table-column prop="date" label="Message type"> </el-table-column>
          <el-table-column prop="amount" label="Effect date-Start">
          </el-table-column>
          <el-table-column prop="payer" label="Effect date-End">
          </el-table-column>
          <el-table-column prop="payee" label="Device"> </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column prop="status" label="Add by"> </el-table-column>
          <el-table-column label="Action" width="240">
            <template slot-scope="scope">
              <el-button @click="goView(scope)" size="small">View</el-button>
              <el-button @click="goEdit(scope)" type="warning" size="small"
                >Edit</el-button
              >
              <el-button @click="goEdit(scope)" type="danger" size="small"
                >Block</el-button
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
        <div>
          <div class="base-style">
            <div>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="160px"
                class="demo-ruleForm"
              >
                <el-form-item label="Select message type:" prop="region">
                  <el-select
                    v-model="ruleForm.region"
                    placeholder="请选择活动区域"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Enter message title:" prop="region">
                  <el-select
                    v-model="ruleForm.region"
                    placeholder="请选择活动区域"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Message receiver:" prop="region">
                  <el-select
                    v-model="ruleForm.region"
                    placeholder="请选择活动区域"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Device:" prop="region">
                  <el-select
                    v-model="ruleForm.region"
                    placeholder="请选择活动区域"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="base-style">
            <div class="dia-title">Edit conetents:</div>
            <div class="margin-top20">
              <EditorBar @change="change" :value="value"></EditorBar>
            </div>
          </div>
          <div style="text-align: center" class="margin-top20">
            <el-button @click="showPreview">Preview</el-button>
            <el-button type="primary" @click="confirmMessage"
              >Confirm</el-button
            >
          </div>
        </div>
        <el-dialog width="40%" :visible.sync="showPreviewDia" append-to-body>
          <div>
            {{ value }}
          </div>
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import EditorBar from "@/pages/components/wang-editor";
export default {
  components: { EditorBar },
  data() {
    return {
      value: "这是默认的哦",
      detail: "",
      showPreviewDia: false,
      isClear: false,
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
      scheduleDate: "",
      ruleForm: {},
      rules: {},
    };
  },
  created() {},
  methods: {
    confirmMessage() {
      this.showAdd = false;
      this.$message.success("Successfly!");
    },
    showPreview() {
      this.showPreviewDia = true;
    },
    change(val) {
      console.log(val);
    },
    createMesage() {
      this.showAdd = true;
    },
    goView(item) {
      this.showAdd = true;
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
