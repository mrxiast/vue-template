<template>
  <div class="container">
    <div class="module-box">
      <div>
        <div class="dia-title">Partner name:7777777</div>
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
            Files
          </div>
        </div>
        <div v-if="listType === 1">
          <div class="base-style">
            <div class="base-title">Profile</div>
            <div class="mer-one-box">
              <div class="mer-one-one-box" style="display: flex">
                <div class="mer-one-one-left-box">
                  <div class="mer-ava">
                    <img src="@/static/logo.png" alt="" />
                  </div>
                  <div class="mer-title"></div>
                </div>
                <div class="table-content">
                  <div class="table-content-item">
                    <div class="table-content-item-title">Partner name</div>
                    <div class="table-content-item-value">xxxxxxxxxx</div>
                    <div class="table-content-item-title">Partner ID</div>
                    <div class="table-content-item-value">25555</div>
                  </div>
                  <div class="table-content-item">
                    <div class="table-content-item-title">Partner type</div>
                    <div class="table-content-item-value">xxxxxxxxxx</div>
                    <div class="table-content-item-title">Partner level</div>
                    <div class="table-content-item-value">25555</div>
                  </div>
                  <div class="table-content-item">
                    <div class="table-content-item-title">Websiste</div>
                    <div class="table-content-item-value">xxxxxxxxxx</div>
                    <div class="table-content-item-title">First contact</div>
                    <div class="table-content-item-value">25555</div>
                  </div>
                  <div class="table-content-item">
                    <div class="table-content-item-title">Mobile</div>
                    <div class="table-content-item-value">xxxxxxxxxx</div>
                    <div class="table-content-item-title">Email</div>
                    <div class="table-content-item-value">25555</div>
                  </div>
                  <div class="table-content-item">
                    <div class="table-content-item-title">Merchant enabled</div>
                    <div class="table-content-item-value">xxxxxxxxxx</div>
                    <div class="table-content-item-title">Merchant ID</div>
                    <div class="table-content-item-value">25555</div>
                  </div>
                  <div class="table-content-item">
                    <div class="table-content-item-title">From channels</div>
                    <div class="table-content-item-value">xxxxxxxxxx</div>
                    <div class="table-content-item-title">Channel name</div>
                    <div class="table-content-item-value">25555</div>
                  </div>
                  <div class="table-content-item">
                    <div class="table-content-item-title">Added date</div>
                    <div class="table-content-item-value">xxxxxxxxxx</div>
                    <div class="table-content-item-title">Approval date</div>
                    <div class="table-content-item-value">25555</div>
                  </div>
                  <div class="table-content-item">
                    <div class="table-content-item-title">Status</div>
                    <div class="table-content-item-value">xxxxxxxxxx</div>
                    <div class="table-content-item-title"></div>
                    <div class="table-content-item-value"></div>
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
                    <div class="table-content-item-title">Address</div>
                    <div class="table-content-item-value" style="width: 1100px">
                      xxxxxxxxxx
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="commission-box">
              <div style="margin-right: 10px">Commission</div>
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
          <div class="base-style">
            <div class="base-title">Asset summary</div>
            <div class="table-content" style="margin-left: 220px">
              <div class="table-content-item">
                <div class="table-content-item-title">Wallet balance</div>
                <div class="table-content-item-value">xxxxxxxxxx</div>
                <div class="table-content-item-title">Pre-seposit balance</div>
                <div class="table-content-item-value">25555</div>
              </div>
            </div>
          </div>
          <div class="base-style">
            <div
              class="base-title"
              style="display: flex; justify-content: space-between"
            >
              <span>Bank information</span>
            </div>
            <div
              class="table-content"
              style="margin-left: 220px; margin-top: 10px"
            >
              <div class="table-content-item">
                <div class="table-content-item-title">Bank Name</div>
                <div class="table-content-item-value" style="width: 1100px">
                  xxxxxxxxxx
                </div>
              </div>
              <div class="table-content-item">
                <div class="table-content-item-title">Bank Branch</div>
                <div class="table-content-item-value" style="width: 1100px">
                  xxxxxxxxxx
                </div>
              </div>
              <div class="table-content-item">
                <div class="table-content-item-title">Account Name</div>
                <div class="table-content-item-value" style="width: 1100px">
                  xxxxxxxxxx
                </div>
              </div>
              <div class="table-content-item">
                <div class="table-content-item-title">Account Number</div>
                <div class="table-content-item-value" style="width: 1100px">
                  xxxxxxxxxx
                </div>
              </div>
              <div class="table-content-item">
                <div class="table-content-item-title">Bank service fee</div>
                <div class="table-content-item-value" style="width: 1100px">
                  xxxxxxxxxx
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="listType === 2">
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
      listType: 1,
      showCode: false,
      listType: 1,
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
      this.listType = num;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>