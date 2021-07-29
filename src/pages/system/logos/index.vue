<template>
  <div class="t-container">
    <div class="top-box">
      <div class="left-box">
        <el-input
          style="width: 300px"
          v-model="searchId"
          placeholder="Enter transaction id"
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
        <el-button type="primary" @click="goChange">Add logo</el-button>
      </div>
    </div>
    <div class="bottom-box">
      <div class="bottom-top-box">
        <div
          :class="listType === 1 ? 'default-box is-active' : 'default-box'"
          @click="changeType(1)"
        >
          Billers
        </div>
        <div
          :class="listType === 2 ? 'default-box is-active' : 'default-box'"
          @click="changeType(2)"
        >
          Net bankings
        </div>
        <div
          :class="listType === 3 ? 'default-box is-active' : 'default-box'"
          @click="changeType(3)"
        >
          Partner stores
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
          <el-table-column fixed prop="id" label="Service type">
          </el-table-column>
          <el-table-column prop="date" label="Biller type"> </el-table-column>
          <el-table-column prop="amount" label="Biller name"> </el-table-column>
          <el-table-column prop="payer" label="Logo"> </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goChange(scope)" type="primary" size="small"
                >Change</el-button
              >
              <el-button @click="goBlock(scope)" type="primary" size="small"
                >Block</el-button
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
          <el-table-column fixed prop="id" label="Net banking name">
          </el-table-column>
          <el-table-column prop="date" label="Logo"> </el-table-column>
          <el-table-column prop="amount" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goChange(scope)" type="primary" size="small"
                >Change</el-button
              >
              <el-button @click="goBlock(scope)" type="primary" size="small"
                >Block</el-button
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
          <el-table-column fixed prop="id" label="Partner store name">
          </el-table-column>
          <el-table-column prop="date" label="Logo"> </el-table-column>
          <el-table-column prop="amount" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goChange(scope)" type="primary" size="small"
                >Change</el-button
              >
              <el-button @click="goBlock(scope)" type="primary" size="small"
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
    <el-dialog
      width="30%"
      :visible.sync="showDia"
      :close-on-click-modal="false"
      title="Add/edit biller logo"
    >
      <div class="dia-box">
        <div class="box-item">
          <div class="dia-title">Select service type</div>
          <div class="dia-content">
            <el-select
              class="dia-select"
              v-model="serviceType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in serviceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="dia-title">Select biller type</div>
          <div class="dia-content">
            <el-select
              class="dia-select"
              v-model="serviceType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in serviceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="dia-title">Select biller name</div>
          <div class="dia-content">
            <el-select
              class="dia-select"
              v-model="serviceType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in serviceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="box-item">
          <div class="dia-title">Please upload LOGO:</div>
          <div class="dia-content">
            <el-upload
              ref="upload"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="center-btn">
          <el-button @click="confirmForm" type="primary">Confirm</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowItem: {},
      imageUrl: "",
      serviceList: [
        {
          value: "001",
          label: "名字",
        },
        {
          value: "002",
          label: "哈哈",
        },
      ],
      showDia: false,
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
    confirmForm() {
      this.$refs.upload.clearFiles();
      this.showDia = false;
    },
    goBlock() {
      this.$confirm("Are you sure to block this logo?", "", {
        confirmButtonText: "Block it",
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
    changeType(num) {
      this.listType = num;
      this.pageNum = 1;
    },
    goChange(item) {
      this.nowItem = item;
      this.showDia = true;
    },
    changePage(val) {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>