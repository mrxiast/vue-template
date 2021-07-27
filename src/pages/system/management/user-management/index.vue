<template>
  <div class="t-container">
    <div class="top-box">
      <div class="left-box">
        <el-input placeholder="Search name" style="width: 300px"></el-input>

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
        <el-button type="primary">Add role</el-button>
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
          <el-table-column prop="id" label="User name"> </el-table-column>
          <el-table-column prop="date" label="Mobile number"> </el-table-column>
          <el-table-column prop="amount" label="E-mail address">
          </el-table-column>
          <el-table-column prop="payer" label="Role type"> </el-table-column>
          <el-table-column prop="payee" label="Role designated">
          </el-table-column>
          <el-table-column prop="status" label="Added by"> </el-table-column>
          <el-table-column prop="status" label="Added date"> </el-table-column>
          <el-table-column prop="status" label="Status"> </el-table-column>
          <el-table-column label="Action" width="260">
            <template slot-scope="scope">
              <el-button @click="goView(scope.row)" type="primary" size="small">
                View details
              </el-button>
              <el-button
                @click="goReset(scope.row)"
                type="success"
                size="small"
              >
                Reset passwords
              </el-button>
              <el-button @click="goEdit(scope.row)" type="warning" size="small">
                Edit profile
              </el-button>
              <el-button @click="goBlock(scope.row)" type="danger" size="small">
                Vlock user
              </el-button>
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
        title="System--Portal user management--view user"
      >
        <div>
          <div class="tran-box">
            <div class="tran-box-title">User details</div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">User name:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">User mobile:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">User e-mail:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Role type:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Role designated:
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Status:</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">E-wallet</div></el-col
                >
              </el-row>
            </div>
            <div class="tran-box-title" style="margin-top: 20px">
              Merchant details
            </div>
            <div>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Merchant ID</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Merchant name
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">Website</div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content grid-bgc">
                    Merchant type
                  </div></el-col
                >
                <el-col :span="18"
                  ><div class="grid-content">1000Php</div></el-col
                >
              </el-row>
            </div>
          </div>

          <div class="short-box">
            <div class="short-title">Permissions</div>
            <div style="display: flex; flex-wrap: wrap">
              <div class="short-tag" v-for="(item, index) in 5" :key="index">
                Add user
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="module-box">
      <el-dialog
        :visible.sync="showAddorEdit"
        :close-on-click-modal="false"
        title="System--Portal user management--view user"
      >
        <div>
          <div class="tran-box">
            <div class="tran-box-title">User details</div>
            <div class="info-box">
              <div class="item-info">
                <div>Usertype: Merchant</div>
                <div>Merchant legal name: 7-11 store</div>
                <div>Role type: Admin</div>
              </div>
              <div class="item-info">
                <div>User name: Olivia</div>
                <div>User mobile number: 90838383</div>
                <div>User E-mail: 7777@qq.com</div>
              </div>
            </div>
          </div>
          <div class="tran-box">
            <div class="tran-box-title">User profile</div>
            <div class="profile-box">
              <div class="item-box">
                <div>Please select a merchant</div>
                <div>
                  <el-select v-model="merchant" placeholder="请选择">
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
              <div style="margin: 0 20px">or</div>
              <div class="item-box">
                <div>Please select an agent</div>
                <div>
                  <el-select v-model="agent" placeholder="请选择">
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
            <div class="input-box">
              <div class="input-item">
                <el-input
                  v-model="userName"
                  placeholder="Please enter user name"
                ></el-input>
              </div>
              <div class="input-item">
                <el-input
                  v-model="mobileNumber"
                  placeholder="Please enter mobile number"
                ></el-input>
              </div>
              <div class="input-item">
                <el-input
                  v-model="address"
                  placeholder="Please enter E-mail address"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="tran-box">
            <div class="tran-box-title">Permissions</div>
            <div class="item-box">
              <div style="margin: 10px 0">Select a role type for user</div>
              <div>
                <el-select v-model="merchant" placeholder="请选择">
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
            <div class="item-box">
              <div style="margin: 10px 0">Permissions for user as below</div>
              <div class="below-box">
                <div class="below-item" v-for="(item, index) in 5" :key="index">
                  Dashboard
                </div>
              </div>
            </div>
          </div>

          <div class="center-btn">
            <el-button
              type="primary"
              @click="confirmForm"
              :loading="formLoading"
              >Confirm</el-button
            >
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
      formLoading: false,
      mobileNumber: "",
      userName: "",
      address: "",
      merchant: "",
      agent: "",
      nowItem: {},
      roleDesign: "",
      options: [{ value: "001", label: "哈哈" }],
      showAddorEdit: false,
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
          otherStatus: 1,
        },
        {
          id: "2",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 1,
          otherStatus: 2,
        },
        {
          id: "3",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 2,
          otherStatus: 1,
        },
        {
          id: "4",
          date: "2021/02/02 12:33:33",
          amount: "20",
          payer: "01",
          payee: "02",
          status: 2,
          otherStatus: 2,
        },
      ],
    };
  },
  created() {},
  methods: {
    confirmForm() {
      this.formLoading = true;
      this.formLoading = false;
      this.showAddorEdit = false;
      this.$alert(
        "Login credentials have been sent to user!",
        "User created successfully!",
        {
          confirmButtonText: "Okay",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        }
      );
    },
    goBlock(item) {
      this.$confirm("Are you sure to block this user?", "", {
        confirmButtonText: "Yes,block it",
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
    goReset() {
      this.$confirm("Request passwords to: FP123456", "", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "Passwords reset successfully!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goView() {
      this.showDia = true;
    },
    goEdit(item) {
      this.nowItem = JSON.parse(JSON.stringify(item));
      this.showAddorEdit = true;
    },
    changeType(num) {
      this.listType = num;
      this.pageNum = 1;
    },

    changePage(val) {},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
