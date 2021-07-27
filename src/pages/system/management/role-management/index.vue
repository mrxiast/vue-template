<template>
  <div class="t-container">
    <div class="top-box">
      <div class="left-box">
        <el-select style="margin-right: 10px" v-model="roleDesign">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

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
        <el-button type="primary" @click="add">Add role</el-button>
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
          <el-table-column fixed prop="id" label="Role designated">
          </el-table-column>
          <el-table-column prop="date" label="Role type"> </el-table-column>
          <el-table-column prop="amount" label="Added by"> </el-table-column>
          <el-table-column prop="payer" label="Added date"> </el-table-column>
          <el-table-column prop="payee" label="Status"> </el-table-column>
          <el-table-column prop="status" label="Permissions">
            <template slot-scope="scope">
              <el-button @click="goView(scope)" type="text" size="small"
                >view</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button @click="goEdit(scope)" type="text" size="small"
                >Edit</el-button
              >
              <el-button @click="goBlock(scope)" type="text" size="small"
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
    <div class="module-box600">
      <el-dialog
        :visible.sync="showDia"
        :close-on-click-modal="false"
        title="Permissions"
      >
        <div>
          <div class="title-box">
            <div>
              Role designated:
              <span style="color: #196db5">Merchant</span>
            </div>
            <div>Role type: <span style="color: #196db5">Admin</span></div>
          </div>
          <div class="box-content">
            <div class="tree-title">Permissions</div>
            <div class="tree-box">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
              >
              </el-tree>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="module-box700">
      <el-dialog
        :visible.sync="showAdd"
        :close-on-click-modal="false"
        title="Permissions"
      >
        <div>
          <div class="white-box">
            <div class="box-title">Please select rol designated</div>
            <div class="box-content">
              <div
                @click="changeDes('merchant')"
                :class="
                  designated === 'merchant' ? 'box-item is-active' : 'box-item'
                "
              >
                Merchant
              </div>
              <div
                @click="changeDes('branch')"
                :class="
                  designated === 'branch' ? 'box-item is-active' : 'box-item'
                "
              >
                Branch
              </div>
              <div
                @click="changeDes('partner')"
                :class="
                  designated === 'partner' ? 'box-item is-active' : 'box-item'
                "
              >
                Tie-up partner
              </div>
              <div
                @click="changeDes('internal')"
                :class="
                  designated === 'internal' ? 'box-item is-active' : 'box-item'
                "
              >
                FP internal
              </div>
            </div>
          </div>
          <div class="white-box">
            <div class="box-title">Please select role type</div>
            <div class="add-btn" @click="addDic">Add your discription</div>
            <div class="box-content">
              <div
                v-for="(item, index) in roleTypeList"
                :key="index"
                @click="changeRoleType(item)"
                :class="roleType === item ? 'box-item is-active' : 'box-item'"
              >
                {{ item }}
              </div>
            </div>
            <div class="box-title">Please select role's access permissions</div>
            <div class="tree-box" style="padding: 10px 20px">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
              >
              </el-tree>
            </div>
            <div class="btn-center">
              <el-button @click="cancelBox">Cancel</el-button>
              <el-button type="primary" @click="confirmBox">Confirm</el-button>
            </div>
          </div>
          <el-dialog
            width="30%"
            title="内层 Dialog"
            :visible.sync="showInner"
            append-to-body
          >
            <div style="text-align: center">
              <el-input
                type="textarea"
                v-model="roleTypeVal"
                maxlength="50"
              ></el-input>
              <el-button
                style="margin-top: 30px"
                @click="confirmNewRole"
                :loading="roleTypeValLoading"
                type="primary"
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
      boxLoading: false,
      roleTypeList: ["Admin", "Viewer", "Operator"],
      roleTypeValLoading: false,
      roleTypeVal: "",
      roleType: "Admin",
      showInner: false,
      designated: "merchant",
      data: [
        {
          id: 1,
          label: "一级 2",
          children: [
            {
              id: 3,
              label: "二级 2-1",
              children: [
                {
                  id: 4,
                  label: "三级 3-1-1",
                },
                {
                  id: 5,
                  label: "三级 3-1-2",
                  disabled: true,
                },
              ],
            },
            {
              id: 2,
              label: "二级 2-2",
              disabled: true,
              children: [
                {
                  id: 6,
                  label: "三级 3-2-1",
                },
                {
                  id: 7,
                  label: "三级 3-2-2",
                  disabled: true,
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      showAdd: false,
      roleDesign: "",
      options: [{ value: "001", label: "哈哈" }],
      //打印配置

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
    goBlock() {
      this.$confirm("Are you sure to block this role", "", {
        confirmButtonText: "yes,block it",
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
    add() {
      this.showAdd = true;
    },
    changeDes(type) {
      this.designated = type;
    },
    changeRoleType(type) {
      this.roleType = type;
    },
    addDic() {
      this.showInner = true;
    },
    confirmNewRole() {
      if (!this.roleTypeVal) {
        this.$message.error("Please enter discription");
        return;
      }
      this.roleTypeList.push(this.roleTypeVal);
      this.roleTypeValLoading = true;
      this.roleTypeValLoading = false;
      this.showInner = false;
      this.roleTypeVal = "";
    },
    goEdit() {},
    changeType(num) {
      this.listType = num;
      this.pageNum = 1;
    },
    goView(item) {
      this.showDia = true;
    },
    changePage(val) {},
    confirmBox() {
      this.boxLoading = true;
      this.designated = "merchant";
      this.roleType = "Admin";
      this.boxLoading = false;
      this.showAdd = false;
    },
    cancelBox() {
      this.designated = "merchant";
      this.roleType = "Admin";
      this.showAdd = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang='less'>
.module-box600 {
  .el-dialog {
    width: 600px;
  }
}
.module-box700 {
  .el-dialog {
    width: 700px;
  }
}
</style>