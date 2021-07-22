<template>
  <div class="container">
    <div class="module-box">
      <div>
        <div class="dia-title">Merchant name: No.1 store</div>
        <div class="base-style tabs-box">
          <div
            :class="detailType === 1 ? 'default-box is-active' : 'default-box'"
            @click="changeType(1)"
          >
            Profile
          </div>
          <div
            :class="detailType === 2 ? 'default-box is-active' : 'default-box'"
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
                    <div class="table-content-item-title">Settlement date</div>
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
                    <div class="table-content-item-value" style="width: 1200px">
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
                <div class="table-content-item-value" style="width: 1200px">
                  xxxxxxxxxx
                </div>
              </div>
              <div class="table-content-item">
                <div class="table-content-item-title">Bank Branch</div>
                <div class="table-content-item-value" style="width: 1200px">
                  xxxxxxxxxx
                </div>
              </div>
              <div class="table-content-item">
                <div class="table-content-item-title">Account Name</div>
                <div class="table-content-item-value" style="width: 1200px">
                  xxxxxxxxxx
                </div>
              </div>
              <div class="table-content-item">
                <div class="table-content-item-title">Account Number</div>
                <div class="table-content-item-value" style="width: 1200px">
                  xxxxxxxxxx
                </div>
              </div>
              <div class="table-content-item">
                <div class="table-content-item-title">Bank service fee</div>
                <div class="table-content-item-value" style="width: 1200px">
                  xxxxxxxxxx
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="detailType === 2">
          <div class="base-style" style="display: flex; flex-wrap: wrap">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCode: false,
      detailType: 1,
      commissionVal: "",
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
    };
  },
  methods: {
    createQR() {
      this.showCode = true;
    },
    changeType(num) {
      this.detailType = num;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>