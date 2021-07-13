<template>
  <div>
    <div class="top-box">
      <span class="good-morning">Good Morning!</span>
      <span>Welcome on board!</span>
      <div>
        <el-select
          v-model="value"
          placeholder="Select merchant"
          style="margin: 0 20px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="value"
          placeholder="Select branch"
          style="margin: 0 20px"
        >
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
    <div class="content-box" v-if="userType === 'internal'">
      <div class="left-box">
        <div class="left-top-box">
          <div class="left-ava">
            <img src="@/static/logo.png" alt="" />
          </div>
          <div class="right-name">
            <div class="title">Olivia Wang</div>
            <div class="time">Last login Jan-01 2021 12:00:00</div>
          </div>
        </div>
        <div class="box-box">
          <div class="box-box-top">
            <img class="icon-img" src="@/static/logo.png" alt="" />
            <div>Total wallet balabce</div>
          </div>
          <div class="qian">80000 P</div>
        </div>

        <div class="box-box">
          <div class="box-box-top">
            <img class="icon-img" src="@/static/logo.png" alt="" />
            <div>Total pre-deposit balabce</div>
          </div>
          <div class="qian">80000 P</div>
        </div>
        <div class="box-box">
          <div class="box-box-top">
            <img class="icon-img" src="@/static/logo.png" alt="" />
            <div>Total unsettled balabce</div>
          </div>
          <div class="qian">80000 P</div>
        </div>
      </div>
      <div class="right">
        <div class="box-box">
          <div class="left-icon">
            <img src="@/static/logo.png" alt="" />
            <div class="icon-title">Asset increase</div>
          </div>
          <div class="right-icon">
            <div class="right-item">
              <div class="right-item-title">Merchant total cash in</div>
              <div class="right-item-content">
                <div class="num">2000</div>
                <div class="unit">Php</div>
              </div>
              <div class="icon-icon">
                <img src="@/static/logo.png" alt="" />
              </div>
            </div>
            <div class="right-item">
              <div class="right-item-title">Total bank fee</div>
              <div class="right-item-content">
                <div class="num">2000</div>
                <div class="unit">Php</div>
              </div>
              <div class="icon-icon">
                <img src="@/static/logo.png" alt="" />
              </div>
            </div>
            <div class="right-item">
              <div class="right-item-title">TUP total cash in</div>
              <div class="right-item-content">
                <div class="num">2000</div>
                <div class="unit">Php</div>
              </div>
              <div class="icon-icon">
                <img src="@/static/logo.png" alt="" />
              </div>
            </div>
            <div class="right-item">
              <div class="right-item-title">Service charge total</div>
              <div class="right-item-content">
                <div class="num">2000</div>
                <div class="unit">Php</div>
              </div>
              <div class="icon-icon">
                <img src="@/static/logo.png" alt="" />
              </div>
            </div>
            <div class="right-item">
              <div class="right-item-title">MDR total</div>
              <div class="right-item-content">
                <div class="num">2000</div>
                <div class="unit">Php</div>
              </div>
              <div class="icon-icon">
                <img src="@/static/logo.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="box-box">
          <div class="left-icon">
            <img src="@/static/logo.png" alt="" />
            <div class="icon-title">Asset decrease</div>
          </div>
          <div class="right-icon">
            <div class="right-item">
              <div class="right-item-title">TUP total cash out</div>
              <div class="right-item-content">
                <div class="num">2000</div>
                <div class="unit">Php</div>
              </div>
              <div class="icon-icon">
                <img src="@/static/logo.png" alt="" />
              </div>
            </div>
            <div class="right-item">
              <div class="right-item-title">Merchant total cash out</div>
              <div class="right-item-content">
                <div class="num">2000</div>
                <div class="unit">Php</div>
              </div>
              <div class="icon-icon">
                <img src="@/static/logo.png" alt="" />
              </div>
            </div>
            <div class="right-item">
              <div class="right-item-title">Commission payable</div>
              <div class="right-item-content">
                <div class="num">2000</div>
                <div class="unit">Php</div>
              </div>
              <div class="icon-icon">
                <img src="@/static/logo.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="box-box">
          <div class="left-icon">
            <img src="@/static/logo.png" alt="" />
            <div class="icon-title">New users</div>
          </div>
          <div style="width: 85%">
            <div class="select-box">
              <span style="margin-right: 10px">Select date:</span>
              <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="to"
                start-placeholder="Start"
                end-placeholder="End"
              >
              </el-date-picker>
            </div>
            <div style="display: flex; flex-wrap: wrap">
              <div>
                <div class="right-item-other">
                  <img src="@/static/logo.png" alt="" />
                  <span>Merchants:2000</span>
                </div>
              </div>

              <div class="right-item-other">
                <img src="@/static/logo.png" alt="" />
                <span>Tie-up partners:2000</span>
              </div>

              <div class="right-item-other">
                <img src="@/static/logo.png" alt="" />
                <span>New registered customer:2000</span>
              </div>

              <div class="right-item-other">
                <img src="@/static/logo.png" alt="" />
                <span>Branches:2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box" v-else>
      <div class="left-box">
        <div class="left-top-box">
          <div class="left-ava">
            <img src="@/static/logo.png" alt="" />
          </div>
          <div class="right-name">
            <div class="title">Olivia Wang</div>
            <div class="time">Last login Jan-01 2021 12:00:00</div>
          </div>
        </div>
        <div class="mer-box-box">
          <div class="mer-top">
            <div class="top-tit-style">Wallet balance</div>
            <div>80000 P</div>
          </div>
          <div class="bottom-a">
            <div class="a-box">Cash out</div>
            <div class="a-box">Cash in</div>
          </div>
        </div>
        <div class="mer-box-box">
          <div class="mer-two-top">
            <img src="@/static/logo.png" alt="" />
            <div class="top-tit-style">Pre-deposit balance</div>
            <div>80000 P</div>
          </div>
          <div class="bottom-a">
            <div class="a-box" style="cursor: default"></div>
            <div class="a-box">Cash in</div>
          </div>
        </div>
        <div class="mer-box-box">
          <div class="mer-two-top" style="padding-top: 25px">
            <img src="@/static/logo.png" alt="" />
            <div class="top-tit-style">Pre-deposit balance</div>
            <div>80000 P</div>
          </div>
        </div>
      </div>
      <div class="mer-right-box">
        <div class="mer-top-box">
          <div class="title">Asset overview</div>
          <div style="display: flex; justify-content: center">
            <div class="right-icon">
              <div class="right-item">
                <div class="right-item-title">Total cash in</div>
                <div class="right-item-content">
                  <div class="num">2000</div>
                  <div class="unit">Php</div>
                </div>
                <div class="icon-icon">
                  <img src="@/static/logo.png" alt="" />
                </div>
              </div>
              <div class="right-item">
                <div class="right-item-title">Total cash out</div>
                <div class="right-item-content">
                  <div class="num">2000</div>
                  <div class="unit">Php</div>
                </div>
                <div class="icon-icon">
                  <img src="@/static/logo.png" alt="" />
                </div>
              </div>
              <div class="right-item">
                <div class="right-item-title">Commission received</div>
                <div class="right-item-content">
                  <div class="num">2000</div>
                  <div class="unit">Php</div>
                </div>
                <div class="icon-icon">
                  <img src="@/static/logo.png" alt="" />
                </div>
              </div>
              <div class="right-item">
                <div class="right-item-title">Brancher</div>
                <div class="right-item-content">
                  <div class="num">2000</div>
                  <div class="unit">Php</div>
                </div>
                <div class="icon-icon">
                  <img src="@/static/logo.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mer-top-box">
          <div class="title">Notice pannel</div>
          <div class="mer-list">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item
                :name="item.id"
                v-for="(item, index) in tableList"
                :key="item.id"
              >
                <template slot="title">
                  <div class="title-box">
                    <div class="title-box-item">
                      <div class="title-box-style">Time：</div>
                      <div class="title-box-conent">{{ item.time }}</div>
                    </div>
                    <div class="title-box-item">
                      <div class="title-box-style">Subject：</div>
                      <div class="title-box-conent">{{ item.subject }}</div>
                    </div>
                    <div class="title-box-item">
                      <div class="title-box-style">Contents：</div>
                      <div class="title-box-conent">{{ item.contents }}</div>
                    </div>
                    <div class="title-box-style" style="padding: 0 20px">
                      {{ item.status === "1" ? "Read" : "Unread" }}
                    </div>
                  </div>
                </template>
                <div>
                  与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                </div>
                <div>
                  在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                </div>
              </el-collapse-item>
            </el-collapse>
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
</template>

<script>
import * as api from "./api";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 1000,
      tableList: [
        {
          id: "1",
          time: "Jan-01 2021 12:00:00",
          subject: "add new cooperaration abc",
          contents:
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          status: "2",
        },
        {
          id: "2",
          time: "Jan-01 2021 12:00:00",
          subject: "add new cooperaration abc",
          contents:
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          status: "1",
        },
        {
          id: "3",
          time: "Jan-01 2021 12:00:00",
          subject: "add new cooperaration abc",
          contents:
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          status: "1",
        },
        {
          id: "4",
          time: "Jan-01 2021 12:00:00",
          subject: "add new cooperaration abc",
          contents:
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          status: "1",
        },
        {
          id: "5",
          time: "Jan-01 2021 12:00:00",
          subject: "add new cooperaration abc",
          contents:
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          status: "1",
        },
      ],
      activeNames: [],
      userType: "merchant",
      time: "",
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
      value: "",
    };
  },
  mounted() {},
  methods: {
    go() {
      this.$router.push("/aa");
    },
    changePage(val) {
      this.pageNum = val;
    },
    //打开了哪个内容
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style scoped lang="less">
@import "./index.less";
</style>