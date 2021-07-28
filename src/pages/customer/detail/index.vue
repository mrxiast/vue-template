<template>
  <div>
    <div class="container">
      <div class="base-style tabs-box">
        <div
          :class="listType === 1 ? 'default-box is-active' : 'default-box'"
          @click="changeType(1)"
        >
          Profile
        </div>
        <div
          :class="listType === 2 ? 'default-box is-active' : 'default-box'"
          @click="changeType(2)"
        >
          Transactions
        </div>
        <div
          :class="listType === 3 ? 'default-box is-active' : 'default-box'"
          @click="changeType(3)"
        >
          Friends invited list
        </div>
      </div>
      <div v-if="listType === 1">
        <div class="base-style user-box">
          <div class="user-ava">
            <img src="@/static/logo.png" alt="" />
          </div>
          <div>
            <span class="ava-content">
              <span class="ava-title">User status</span>
              <span>Active</span>
            </span>
            <span class="ava-content">
              <span class="ava-title">User type</span>
              <span>Customer</span>
            </span>
            <span class="ava-content">
              <span class="ava-title">Account level</span>
              <span>Basic</span>
            </span>
            <span class="ava-content">
              <span class="ava-title">Verified status</span>
              <span>Verified</span>
            </span>
          </div>
        </div>
        <div class="partner">
          <div class="title">Basic information</div>
          <div class="table-boxs">
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">User name</div>
              <div class="table-content-box">Receiver's details</div>
              <div class="table-title-box">Gender</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Birthday</div>
              <div class="table-content-box">Receiver's details</div>
              <div class="table-title-box">Regidter mobile</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
          </div>
        </div>
        <div class="base-style address-box">
          <div class="title">Address book</div>
          <div class="address-item" v-for="i in 3" :key="i">
            <div class="left-content">
              <div class="address-item-item">
                <div class="address-title">Region:</div>
                <div class="address-content">Region</div>
              </div>
              <div class="address-item-item">
                <div class="address-title">Province:</div>
                <div class="address-content">Region</div>
              </div>
              <div class="address-item-item">
                <div class="address-title">City:</div>
                <div class="address-content">Region</div>
              </div>
              <div class="address-item-item">
                <div class="address-title">Barangay:</div>
                <div class="address-content">Region</div>
              </div>
              <div class="address-item-item">
                <div class="address-title">Postal code:</div>
                <div class="address-content">Region</div>
              </div>
              <div class="address-item-item">
                <div class="address-title">Address:</div>
                <div class="address-content" style="width: 850px"></div>
              </div>
              <div class="address-item-item">
                <div style="width: 80px">Address:</div>
                <div style="width: 850px">666</div>
              </div>
            </div>
            <div class="right-default">Default</div>
          </div>
        </div>
        <div class="partner">
          <div class="title">Verified information</div>
          <div class="table-boxs">
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Name</div>
              <div class="table-content-box">Receiver's details</div>
              <div class="table-title-box">Gender</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Birthday</div>
              <div class="table-content-box">Receiver's details</div>
              <div class="table-title-box">Birthplace</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Nationality</div>
              <div class="table-content-box">Receiver's details</div>
              <div class="table-title-box">Civial status</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Mobile number</div>
              <div class="table-content-box">
                Receiver's details
                <span
                  style="color: #409eff; cursor: pointer"
                  @click="edit('number')"
                  >Edit</span
                >
              </div>
              <div class="table-title-box">Place of birth</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Account level</div>
              <div class="table-content-box">
                Receiver's details
                <span
                  style="color: #409eff; cursor: pointer"
                  @click="edit('level')"
                  >Edit</span
                >
              </div>
              <div class="table-title-box">Occupation</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Email</div>
              <div class="table-content-box">
                Receiver's details
                <span
                  style="color: #409eff; cursor: pointer"
                  @click="edit('email')"
                  >Edit</span
                >
              </div>
              <div class="table-title-box">Source of fund</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Registraion date</div>
              <div class="table-content-box">Receiver's details</div>
              <div class="table-title-box">Government ID type</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item" style="border-bottom: 1px solid #ddd">
              <div class="table-title-box">Friends inviting</div>
              <div class="table-content-box">Receiver's details</div>
              <div class="table-title-box">Govn. ID number</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
            <div class="table-item">
              <div class="table-title-box">Referral code</div>
              <div class="table-content-box">Receiver's details</div>
              <div class="table-title-box">Source of fund</div>
              <div class="table-content-box">Receiver's details</div>
            </div>
          </div>
        </div>
        <div class="partner">
          <div class="title">Files</div>
          <div class="file-box">
            <div class="file-item" v-for="i in 3" :key="i">
              <div class="file-img">
                <img src="@/static/logo.png" alt="" />
              </div>
              <div class="file-title">Sefile width gobernment ID</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="listType === 2">
        <div class="base-style">
          <div class="top-ser-box">
            <div class="searchbox">
              <el-input
                placeholder="Please enter transaction ID"
                v-model="searchName"
                class="input-with-select"
              >
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>

          <div class="table-box">
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
                <el-table-column prop="date" label="Date of transaction">
                </el-table-column>
                <el-table-column prop="date" label="Transaction mode">
                </el-table-column>
                <el-table-column prop="amount" label="Transacton type">
                </el-table-column>
                <el-table-column prop="amount" label="Amount(P)">
                </el-table-column>
                <el-table-column prop="amount" label="Status">
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
      </div>
      <div v-if="listType === 3">
        <div class="base-style">
          <div class="table-box" style="padding-top: 0">
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
                <el-table-column fixed prop="id" label="Mobile number">
                </el-table-column>
                <el-table-column prop="date" label="Inviting date">
                </el-table-column>
                <el-table-column prop="date" label="Name"> </el-table-column>
                <el-table-column prop="amount" label="Status">
                </el-table-column>
                <el-table-column prop="amount" label="Rewards">
                </el-table-column>
                <el-table-column prop="amount" label="Join date">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listType: 1,
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      searchName: "",
      tableData: [],
    };
  },
  methods: {
    changeType(num) {
      this.listType = num;
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