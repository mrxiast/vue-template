<template>
  <div class="container">
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
        <el-button>Search</el-button>
        <el-button type="primary" @click="showAdd">Add new partner</el-button>
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
          <el-table-column fixed prop="id" label="Partner name">
          </el-table-column>
          <el-table-column prop="date" label="Partner ID"> </el-table-column>
          <el-table-column prop="date" label="Mobile number"> </el-table-column>
          <el-table-column prop="amount" label="Partner level">
          </el-table-column>
          <el-table-column prop="amount" label="Merchant enabled">
          </el-table-column>
          <el-table-column prop="amount" label="Form channels">
          </el-table-column>
          <el-table-column prop="amount" label="Added date"> </el-table-column>
          <el-table-column prop="amount" label="Added by"> </el-table-column
          ><el-table-column prop="amount" label="Partner type">
          </el-table-column>
          <el-table-column prop="amount" label="Status"> </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goView(scope.row)" type="text" size="small"
                >view</el-button
              >
              <el-button @click="block(scope.row)" type="text" size="small"
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
    <div class="module-box">
      <el-dialog :visible.sync="showDia" :close-on-click-modal="false">
        <div>
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
                    <el-table-column prop="date" label="Name">
                    </el-table-column>
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
      </el-dialog>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      width="30%"
      :visible.sync="blockDia"
    >
      <div class="blockTitle">
        <span>
          Are you sure to
          <span style="color: red">{{ diaTitle }}</span>
          this user
        </span>
      </div>
      <div class="user-card">
        <div class="user-ava">
          <img src="@/static/logo.png" alt="" />
        </div>
        <div class="user-info">
          <div>User name: Olivia</div>
          <div>User mobile: 096799885547</div>
        </div>
      </div>
      <div style="text-align: center">
        <el-button type="primary" @click="changeBlock"
          >{{ diaTitle }} it</el-button
        >
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      width="30%"
      :visible.sync="showEdit"
      @close="cancel"
    >
      <div>
        <el-input type="text" v-model="editValue" placeholder="Please enter" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="submit">Submit</el-button>
      </div>
    </el-dialog>
    <div class="module-box">
      <el-dialog :visible.sync="showAddDia" :close-on-click-modal="false">
        <div class="add-content">
          <div class="add-left">
            <img src="@/static/logo.png" alt="" />
            <el-upload
              ref="upload"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
            >
              <el-button size="small">Browse image</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>

            <div>
              *Recommended Size:<br />
              Minimum 250*250
            </div>
          </div>
          <div v-if="step === 1">
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
              <div class="base-title">Bank information</div>
              <div>
                <div class="bank-box-item">
                  <div class="bank-box-item-title">Bank Name</div>
                  <div class="bank-box-item-content">
                    <el-input v-model="bankName"></el-input>
                  </div>
                </div>
                <div class="bank-box-item">
                  <div class="bank-box-item-title">Bank Branch</div>
                  <div class="bank-box-item-content">
                    <el-input v-model="bankBranch"></el-input>
                  </div>
                </div>
                <div class="bank-box-item">
                  <div class="bank-box-item-title">Account Name</div>
                  <div class="bank-box-item-content">
                    <el-input v-model="accountName"></el-input>
                  </div>
                </div>
                <div class="bank-box-item">
                  <div class="bank-box-item-title">Account Number</div>
                  <div class="bank-box-item-content">
                    <el-input v-model="accountNumber"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="con-btn">
              <el-button type="primary" @click="nextUpload">Next</el-button>
            </div>
          </div>
          <div v-if="step === 2">
            <div class="add-right base-style">
              <div class="base-title">Partner profile</div>
              <div class="up-title" @click="showUp">+ Upload file</div>
              <div class="up-box">
                <div
                  class="up-box-item"
                  v-for="(item, index) in imgList"
                  :key="index"
                >
                  <div class="img-box">
                    <img src="@/static/logo.png" alt="" />
                  </div>
                  <div class="up-box-content">
                    <div class="up-box-con-title">File Name</div>
                    <div class="up-box-con-con">
                      <div style="width: 400px">{{ item.name }}</div>
                    </div>
                  </div>
                  <div style="padding: 20px 0 0 0">
                    <i
                      class="el-icon-remove-outline"
                      style="font-size: 40px; color: #f00; cursor: pointer"
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="con-btn">
              <el-button type="primary" @click="confirmForm">Confirm</el-button>
            </div>
          </div>
          <el-dialog width="30%" :visible.sync="upBox" append-to-body>
            <div>
              <div class="innier-title">Please enter file name</div>
              <div style="margin-bottom: 10px">
                <el-input v-model="fileName"></el-input>
              </div>
              <div>
                <el-upload
                  ref="upImage"
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
            <div style="text-align: center">
              <el-button type="primary" @click="confimImgInfo"
                >Confirm</el-button
              >
            </div>
          </el-dialog>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      fileName: "",
      imgList: [],
      step: 1,
      accountNumber: "",
      accountName: "",
      bankBranch: "",
      bankName: "",
      showAddDia: false,
      upName: "",
      upBox: false,
      options: [],
      addForm: {},
      tableData: [
        {
          id: "01",
          name: "测试",
          userType: "customer",
          status: "Block",
        },
        {
          id: "01",
          name: "测试2",
          userType: "partner",
          status: "Enable",
        },
      ],
      tranId: "",
      times: "",
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      showDia: false,
      showOutDia: false,
      dataUserType: "",
      nowItem: {},
      diaTitle: "",
      blockDia: false,
      listType: 1,
      editType: "",
      showEdit: false,
      editValue: "",
      searchName: "",
    };
  },
  methods: {
    confimImgInfo() {
      this.imgList.push({
        name: this.fileName,
        url: this.imageUrl,
      });
      this.fileName = "";
      this.imageUrl = "";
      this.$refs.upImage.clearFiles();
      this.upBox = false;
    },
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
    confirmForm() {
      this.showAddDia = false;
      this.imgList = [];
    },
    confirm() {
      this.showAddDia = true;
    },
    showUp() {
      this.upBox = true;
    },
    nextUpload() {
      this.step = 2;
    },
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

    showAdd() {
      this.showAddDia = true;
    },
    edit(name) {
      this.editType = name;
      this.showEdit = true;
    },
    cancel() {
      this.showEdit = false;
      this.editValue = "";
    },
    submit() {
      this.showEdit = false;
      this.editValue = "";
    },
    block(item) {
      this.nowItem = item;
      if (this.nowItem.status === "Block") {
        this.diaTitle = "Enable";
      } else {
        this.diaTitle = " Block";
      }
      this.blockDia = true;
    },
    changePage(val) {
      this.pageNum = val;
    },
    goView(item) {
      this.nowItem = item;
      this.dataUserType = this.nowItem.userType;
      this.$router.push("/partner-detail/" + this.nowItem.id);
    },
    changeBlock() {
      this.blockDia = false;
    },
    changeType(num) {
      this.listType = num;
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>