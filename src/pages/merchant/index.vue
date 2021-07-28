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
        <el-button type="danger" @click="addMerchant">{{
          tabsName === "merchant" ? "+ Add Merchant" : "+ Add Branch"
        }}</el-button>
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
      <el-dialog :visible.sync="showAdd" :close-on-click-modal="false">
        <div class="add-content" v-if="tabsName === 'merchant'">
          <div class="add-left">
            <img src="@/static/logo.png" alt="" />
            <el-button class="add-btn" size="small">Browse image</el-button>
            <div>
              *Recommended Size:<br />
              Minimum 250*250
            </div>
          </div>
          <div>
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
                  <div class="input-item-title">
                    Partner first contact person
                  </div>
                  <div class="input-item-input">
                    <el-input
                      v-model="addForm.firstName"
                      placeholder="Enter merchant DBA name"
                    />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">
                    Partner first contact person
                  </div>
                  <div class="input-item-input">
                    <el-input
                      v-model="addForm.middleName"
                      placeholder="Enter merchant DBA name"
                    />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">
                    Partner first contact person
                  </div>
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
            <div class="add-right base-style">
              <div class="base-title">Partner location</div>
              <div class="form-box">
                <div class="input-item">
                  <div class="input-item-title">Select region</div>
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
                  <div class="input-item-title">Select province</div>
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
                  <div class="input-item-title">Select barangay</div>
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
                  <div class="input-item-title">Select city</div>
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
                  <div class="input-item-title">Enter postal code</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.legalname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title"></div>
                  <div class="input-item-input"></div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Enter street address</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
              </div>
            </div>
            <div class="add-right base-style">
              <div class="base-title">Partner account seeting</div>
              <div class="form-box">
                <div class="input-item">
                  <div class="input-item-title">Commission rate</div>
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
                  <div class="input-item-title">Bank service fee</div>
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
                  <div class="input-item-title">Settlement date</div>
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
              </div>
            </div>
            <div class="add-right base-style">
              <div class="base-title">Partner location</div>
              <div class="form-box">
                <div class="input-item">
                  <div class="input-item-title">Bank Name</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.legalname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Bank Branch</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Account Name</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Account Number</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
              </div>
            </div>
            <div class="add-right base-style">
              <div class="base-title">Partner img</div>
              <div class="add-up" @click="showUp">+ Upload file</div>
              <div class="pic-box">
                <div class="pic-item">
                  <div class="left-box">
                    <el-row>
                      <el-col :span="4" style="line-height: 35px"
                        ><div>File name:</div></el-col
                      >
                      <el-col :span="20" style="line-height: 35px"
                        ><div>这里是文件名称</div></el-col
                      >
                    </el-row>
                    <el-row>
                      <el-col :span="4" style="line-height: 35px"
                        ><div>File down url</div></el-col
                      >
                      <el-col :span="20" style="line-height: 35px"
                        ><div><a href="">www.baidu.com</a></div></el-col
                      >
                    </el-row>
                  </div>

                  <div class="right-box">Delete</div>
                </div>
              </div>
            </div>
            <div class="con-btn">
              <el-button type="primary" @click="confirm">Confirm</el-button>
            </div>
          </div>
        </div>
        <div class="add-content" v-if="tabsName === 'branch'">
          <div class="add-left">
            <img src="@/static/logo.png" alt="" />
            <el-button class="add-btn" size="small">Browse image</el-button>
            <div>
              *Recommended Size:<br />
              Minimum 250*250
            </div>
          </div>
          <div>
            <div class="add-right base-style">
              <div class="base-title">Basic information</div>
              <div class="form-box">
                <div class="input-item">
                  <div class="input-item-title">Select merchant</div>
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
                  <div class="input-item-title">Enter branch name</div>
                  <div class="input-item-input">
                    <el-input
                      v-model="addForm.dbaname"
                      placeholder="Enter merchant DBA name"
                    />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Enter mobile number</div>
                  <div class="input-item-input">
                    <el-input
                      v-model="addForm.firstName"
                      placeholder="Enter merchant DBA name"
                    />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Enter e-mail address</div>
                  <div class="input-item-input">
                    <el-input
                      v-model="addForm.email"
                      placeholder="Enter merchant DBA name"
                    />
                  </div>
                </div>

                <div class="input-item">
                  <div class="input-item-title">Branch type</div>
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
                  <div class="input-item-title">Settlement date</div>
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
              </div>
            </div>
            <div class="add-right base-style">
              <div class="base-title">Merchant location</div>
              <div class="form-box">
                <div class="input-item">
                  <div class="input-item-title">Select region</div>
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
                  <div class="input-item-title">Select province</div>
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
                  <div class="input-item-title">Select barangay</div>
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
                  <div class="input-item-title">Select city</div>
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
                  <div class="input-item-title">Enter postal code</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.legalname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title"></div>
                  <div class="input-item-input"></div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Enter street address</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
              </div>
            </div>

            <div class="add-right base-style">
              <div class="base-title">Bank details</div>
              <div class="form-box">
                <div class="input-item">
                  <div class="input-item-title">Bank Name</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.legalname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Branch name</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Account Name</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Account Number</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
                <div class="input-item">
                  <div class="input-item-title">Bank service fee</div>
                  <div class="input-item-input">
                    <el-input v-model="addForm.dbaname" />
                  </div>
                </div>
              </div>
            </div>
            <div class="con-btn">
              <el-button type="primary" @click="confirm">Confirm</el-button>
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
      detailType: 1,
      showCode: false,
      showAdd: false,
      upBox: false,
      upName: "",
    };
  },
  methods: {
    //上传开始
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //上传结束
    confirm() {
      this.showAdd = false;
    },
    addImgss() {
      this.$message.success("Added successfully!");
      this.upName = "";
      this.$refs.upload.clearFiles();
      this.upBox = false;
    },
    showUp() {
      this.upBox = true;
    },
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

    changeTabs(name) {
      this.tabsName = name;
    },
    changePage(val) {
      this.pageNum = val;
    },
    goView(item) {
      if (this.tabsName === "merchant") {
        this.$router.push("/merchant-detail/666");
      } else {
        this.$router.push("/branch-detail/666");
      }
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