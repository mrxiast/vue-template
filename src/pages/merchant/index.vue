<template>
  <div class="container">
    <div class="btn-box">
      <el-button
        @click="changeTabs('merchant')"
        :type="tabsName === 'merchant' ? 'primary' : ''"
        >Merchant</el-button
      >
      <el-button
        @click="changeTabs('branch')"
        :type="tabsName === 'branch' ? 'primary' : ''"
        >Branch</el-button
      >
    </div>
    <div class="top-box">
      <div class="search-box">
        <div class="input-box">
          <el-input
            v-model="tranId"
            placeholder="Please enter user ID or account ID to search"
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
        <el-button type="primary">Search</el-button>
        <el-button type="danger" @click="addMerchant">+ Add Merchant</el-button>
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
          <el-table-column fixed prop="id" label="Merchant legal name">
          </el-table-column>
          <el-table-column prop="date" label="Merchant ID"> </el-table-column>
          <el-table-column prop="date" label="Mobile number"> </el-table-column>
          <el-table-column prop="amount" label="E-mail"> </el-table-column>
          <el-table-column prop="amount" label="Add time"> </el-table-column>
          <el-table-column prop="amount" label="Merchant typer">
          </el-table-column>
          <el-table-column prop="amount" label="Merchant level">
          </el-table-column>
          <el-table-column prop="amount" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goView(scope.row)" type="text" size="small"
                >view</el-button
              >
              <el-button
                @click="changeAble(scope.row)"
                type="text"
                size="small"
                >{{ scope.row.status === 1 ? "Disable" : "Enable" }}</el-button
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
        <div>
          <div class="dia-title">Merchant name: No.1 store</div>
          <div class="base-style tabs-box">
            <div
              :class="
                detailType === 1 ? 'default-box is-active' : 'default-box'
              "
              @click="changeType(1)"
            >
              Profile
            </div>
            <div
              :class="
                detailType === 2 ? 'default-box is-active' : 'default-box'
              "
              @click="changeType(2)"
            >
              Files
            </div>
          </div>
          <div v-if="detailType === 1">
            <div class="base-style">
              <div class="base-title">Merchant profile</div>
              <div class="mer-one-box">
                <div class="mer-one-one-box" style="display: flex">
                  <div class="mer-one-one-left-box">
                    <div class="mer-ava">
                      <img src="@/static/logo.png" alt="" />
                    </div>
                    <div class="mer-title">Merchant photo</div>
                  </div>
                  <div class="table-content">
                    <div class="table-content-item">
                      <div class="table-content-item-title">
                        Merchant legal name
                      </div>
                      <div class="table-content-item-value">xxxxxxxxxx</div>
                      <div class="table-content-item-title">Merchant ID</div>
                      <div class="table-content-item-value">25555</div>
                    </div>
                    <div class="table-content-item">
                      <div class="table-content-item-title">Mobile number</div>
                      <div class="table-content-item-value">xxxxxxxxxx</div>
                      <div class="table-content-item-title">Email address</div>
                      <div class="table-content-item-value">25555</div>
                    </div>
                    <div class="table-content-item">
                      <div class="table-content-item-title">Type</div>
                      <div class="table-content-item-value">xxxxxxxxxx</div>
                      <div class="table-content-item-title">Website</div>
                      <div class="table-content-item-value">25555</div>
                    </div>
                    <div class="table-content-item">
                      <div class="table-content-item-title">Merchant level</div>
                      <div class="table-content-item-value">xxxxxxxxxx</div>
                      <div class="table-content-item-title">
                        Name of first contact
                      </div>
                      <div class="table-content-item-value">25555</div>
                    </div>
                    <div class="table-content-item">
                      <div class="table-content-item-title">Partner enable</div>
                      <div class="table-content-item-value">xxxxxxxxxx</div>
                      <div class="table-content-item-title">
                        Settlement date
                      </div>
                      <div class="table-content-item-value">25555</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mer-one-box">
                <div class="mer-one-one-box" style="display: flex">
                  <div class="mer-one-one-left-box mer-two">
                    <div>
                      <div class="mer-title mer-two-title">Verify status</div>
                      <div class="mer-title">Pending</div>
                    </div>
                  </div>
                  <div class="table-content">
                    <div class="table-content-item">
                      <div class="table-content-item-title">Region</div>
                      <div class="table-content-item-value">xxxxxxxxxx</div>
                      <div class="table-content-item-title">Province</div>
                      <div class="table-content-item-value">25555</div>
                    </div>
                    <div class="table-content-item">
                      <div class="table-content-item-title">Brangay</div>
                      <div class="table-content-item-value">xxxxxxxxxx</div>
                      <div class="table-content-item-title">branch city</div>
                      <div class="table-content-item-value">25555</div>
                    </div>
                    <div class="table-content-item">
                      <div class="table-content-item-title">Type</div>
                      <div
                        class="table-content-item-value"
                        style="width: 750px"
                      >
                        xxxxxxxxxx
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="base-style">
              <div class="base-title">Asset summary</div>
              <div class="table-content" style="margin-left: 220px">
                <div class="table-content-item">
                  <div class="table-content-item-title">Region</div>
                  <div class="table-content-item-value">xxxxxxxxxx</div>
                  <div class="table-content-item-title">Province</div>
                  <div class="table-content-item-value">25555</div>
                </div>
                <div class="table-content-item">
                  <div class="table-content-item-title">Brangay</div>
                  <div class="table-content-item-value">xxxxxxxxxx</div>
                  <div class="table-content-item-title">branch city</div>
                  <div class="table-content-item-value">25555</div>
                </div>
              </div>
            </div>
            <div class="base-style">
              <div class="base-title">Quick operations</div>
              <div class="quick-content">
                <el-button @click="createQR">Genrate Merchant QR</el-button>
                <div class="select-box">
                  <div class="select-box-title">Commission</div>
                  <div>
                    <el-select v-model="commissionVal" placeholder="请选择">
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
                <div class="select-box">
                  <div class="select-box-title">MDR</div>
                  <div>
                    <el-select v-model="commissionVal" placeholder="请选择">
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
            </div>
            <div class="base-style">
              <div
                class="base-title"
                style="display: flex; justify-content: space-between"
              >
                <span>Bank information</span>
                <!-- <span style="font-weight: 400; cursor: pointer; color: #409eff"
                  >+ Add new bank</span
                > -->
              </div>
              <div
                class="table-content"
                style="margin-left: 220px; margin-top: 10px"
              >
                <div class="table-content-item">
                  <div class="table-content-item-title">Bank Name</div>
                  <div class="table-content-item-value" style="width: 750px">
                    xxxxxxxxxx
                  </div>
                </div>
                <div class="table-content-item">
                  <div class="table-content-item-title">Bank Branch</div>
                  <div class="table-content-item-value" style="width: 750px">
                    xxxxxxxxxx
                  </div>
                </div>
                <div class="table-content-item">
                  <div class="table-content-item-title">Account Name</div>
                  <div class="table-content-item-value" style="width: 750px">
                    xxxxxxxxxx
                  </div>
                </div>
                <div class="table-content-item">
                  <div class="table-content-item-title">Account Number</div>
                  <div class="table-content-item-value" style="width: 750px">
                    xxxxxxxxxx
                  </div>
                </div>
                <div class="table-content-item">
                  <div class="table-content-item-title">Bank service fee</div>
                  <div class="table-content-item-value" style="width: 750px">
                    xxxxxxxxxx
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="detailType === 2">
            <div class="base-style">
              <div class="file-box" v-for="i in 3" :key="i">
                <div class="file-img">
                  <img src="@/static/logo.png" alt="" />
                </div>
                <div class="file-content">
                  <div>
                    <div class="file-title">
                      File name:
                      <span>8888888888888888888</span>
                    </div>
                    <div class="file-title">
                      Uploaded date:
                      <span>2021/05/05 12:33:33</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog
          width="20%"
          :close-on-click-modal="false"
          :visible.sync="showCode"
          append-to-body
          center
        >
          <div style="text-align: center">
            <img class="img-pic" src="@/static/logo.png" alt="" />
            <div class="code-title">Merchant legal name: 7-11 store</div>
            <div class="code-id">Fortune Pay merchant ID:9338338383</div>
            <img class="img-code" src="@/static/logo.png" alt="" />
            <div class="code-time">OR generated at: April 14 2021 12:20:20</div>
            <el-button type="primary">Download</el-button>
          </div>
        </el-dialog>
      </el-dialog>
    </div>
    <div class="module-box">
      <el-dialog :visible.sync="showAdd" :close-on-click-modal="false">
        <div class="add-content">
          <div class="add-left">
            <img src="@/static/logo.png" alt="" />
            <el-button class="add-btn" size="small">Browse image</el-button>
            <div>
              *Recommended Size:<br />
              Minimum 250*250
            </div>
          </div>
          <div class="add-right base-style">
            <div class="base-title">Partner profile</div>
            <div class="form-box">
              <div class="input-item">
                <div class="input-item-title">Partner legal name</div>
                <div class="input-item-input">
                  <el-input
                    v-model="addForm.legalname"
                    placeholder="Enter merchant legal name"
                  />
                </div>
              </div>
              <div class="input-item">
                <div class="input-item-title">Partner DBA name</div>
                <div class="input-item-input">
                  <el-input
                    v-model="addForm.dbaname"
                    placeholder="Enter merchant DBA name"
                  />
                </div>
              </div>
              <div class="input-item">
                <div class="input-item-title">Partner first contact person</div>
                <div class="input-item-input">
                  <el-input
                    v-model="addForm.firstName"
                    placeholder="Enter merchant DBA name"
                  />
                </div>
              </div>
              <div class="input-item">
                <div class="input-item-title">Partner first contact person</div>
                <div class="input-item-input">
                  <el-input
                    v-model="addForm.middleName"
                    placeholder="Enter merchant DBA name"
                  />
                </div>
              </div>
              <div class="input-item">
                <div class="input-item-title">Partner first contact person</div>
                <div class="input-item-input">
                  <el-input
                    v-model="addForm.lastName"
                    placeholder="Enter merchant DBA name"
                  />
                </div>
              </div>
              <div class="input-item">
                <div class="input-item-title">Partner email address</div>
                <div class="input-item-input">
                  <el-input
                    v-model="addForm.email"
                    placeholder="Enter merchant DBA name"
                  />
                </div>
              </div>
              <div class="input-item">
                <div class="input-item-title">Merchant mobile number</div>
                <div class="input-item-input">
                  <el-input
                    v-model="addForm.number"
                    placeholder="Enter merchant DBA name"
                  />
                </div>
              </div>
              <div class="input-item">
                <div class="input-item-title">partner type</div>
                <div class="input-item-input">
                  <el-select v-model="addForm.parType" placeholder="请选择">
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

              <div class="input-item">
                <div class="input-item-title">Partner level</div>
                <div class="input-item-input">
                  <el-select v-model="addForm.parLevel" placeholder="请选择">
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
              <div class="input-item">
                <div class="input-item-title"></div>
                <div class="input-item-input"></div>
              </div>
              <div class="par-box">
                <div class="input-item-title par-title">Partner website</div>
                <div class="input-item-input">
                  <div
                    class="par-input"
                    v-for="(item, index) in addForm.websiteList"
                    :key="index"
                  >
                    <el-input
                      style="margin: 5px 0"
                      v-model="item.url"
                    ></el-input>

                    <i
                      @click="delWebSite(item)"
                      class="el-icon-remove-outline par-i"
                    ></i>
                  </div>

                  <el-button type="primary" size="small" @click="addWebsite"
                    >add website</el-button
                  >
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
      addForm: {
        legalname: "",
        dbaname: "",
        firstName: "",
        middleName: "",
        laseName: "",
        email: "",
        number: "",
        parType: "",
        parWebsite: "",
        parLevel: "",
        websiteList: [
          {
            id: "1",
            url: "www.baidu.com",
          },
          {
            id: "2",
            url: "www.google.com",
          },
        ],
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      commissionVal: "",
      tabsName: "merchant",
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      tranId: "",
      times: "",
      tableData: [
        {
          id: "001",
          name: "name1",
          status: 1,
        },
        {
          id: "002",
          name: "name2",
          status: 2,
        },
      ],
      nowItem: {},
      nowName: "",
      showDia: false,
      detailType: 1,
      showCode: false,
      showAdd: true,
    };
  },
  methods: {
    delWebSite(now) {
      console.log("1");
      this.addForm.websiteList = this.addForm.websiteList.filter((item) => {
        return item.id != now.id;
      });
    },
    addWebsite() {
      this.addForm.websiteList.push({
        url: "",
        id: this.addForm.websiteList + 1,
      });
    },
    addMerchant() {
      this.showAdd = true;
    },
    createQR() {
      this.showCode = true;
    },
    changeType(num) {
      this.detailType = num;
    },
    changeTabs(name) {
      this.tabsName = name;
    },
    changePage(val) {
      this.pageNum = val;
    },
    goView(item) {
      this.nowItem = item;
      this.showDia = true;
    },
    changeAble(item) {
      this.nowItem = item;
      if (this.nowItem.status === 1) {
        this.nowName = "Disable";
      } else {
        this.nowName = "Enable";
      }
      this.$confirm(`Are you sure to ${this.nowName} this merchant`, "", {
        confirmButtonText: `${this.nowName} it`,
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
  },
};
</script>
 
<style lang="less" scoped>
@import "./index.less";
</style>