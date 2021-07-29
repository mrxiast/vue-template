<template>
  <div class="conteiner">
    <div class="base-style">
      <div class="box-style">
        <div class="box-left">
          <div class="base-title">Status</div>
          <div class="content">Reject</div>
        </div>
        <div class="box-right">
          <div class="base-title">Reject reason</div>
          <div class="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            euismod bibendum laoreet. Proin
          </div>
        </div>
      </div>
      <div class="box-style">
        <div class="base-title">Card number</div>
        <div class="content">138425558844</div>
        <div class="edit-style">Edit</div>
        <div>Show all</div>
      </div>
      <div class="box-style">
        <div class="base-title">Delivery status</div>
        <div class="content">Yes</div>
      </div>
      <div class="box-style">
        <div class="box-left">
          <div class="base-title">Delivery status</div>
          <div class="content" style="display: flex">
            Yes
            <div class="edit-style">Edit</div>
          </div>
        </div>

        <div class="box-right">
          <div class="base-title">Delivery address</div>
          <div class="content">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </div>
        </div>
      </div>
    </div>
    <div class="base-style" style="margin-top: 10px">
      <div class="sex-style">
        <span style="font-weight: bold">Sex:</span>
        <el-input class="sex-input" v-model="sex"></el-input>
      </div>
      <div class="two-box-style">
        <div class="two-title">Applicant's name:</div>
        <div class="two-content">
          <div class="content-box">
            <div class="content-title">Last name</div>
            <div class="content-input">
              <el-input></el-input>
            </div>
          </div>
          <div class="content-box">
            <div class="content-title">First name</div>
            <div class="content-input">
              <el-input></el-input>
            </div>
          </div>
          <div class="content-box">
            <div class="content-title">Middle name</div>
            <div class="content-input">
              <el-input></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="two-box-style">
        <div class="two-title">Contact Details:</div>
        <div class="two-content">
          <div class="content-box">
            <div class="content-title">Phone number</div>
            <div class="content-input">
              <el-input></el-input>
            </div>
          </div>
          <div class="content-box">
            <div class="content-title">Mobile number</div>
            <div class="content-input">
              <el-input></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="two-box-style">
        <div class="two-title">Mother's Maiden Name:</div>
        <div class="two-content">
          <div class="content-box">
            <div class="content-title">Last name</div>
            <div class="content-input">
              <el-input></el-input>
            </div>
          </div>
          <div class="content-box">
            <div class="content-title">First name</div>
            <div class="content-input">
              <el-input></el-input>
            </div>
          </div>
          <div class="content-box">
            <div class="content-title">Middle name</div>
            <div class="content-input">
              <el-input></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="three-box-style">
        <div class="three-title">Applicant's profile information</div>
        <div class="three-content">
          <div class="empty-style"></div>
          <div class="three-con-box">
            <div class="three-con-item">
              <div class="three-content-title">Date of Birth</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">Place of Birth</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">Nationality</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">E-mail address</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">E-mail address</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">Spouse name</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fore-box-style">
        <div class="fore-title">Address</div>
        <div class="fore-content">
          <div class="fore-empty"></div>
          <div class="fore-con-item">
            <div style="margin: 10px">Present Address</div>
            <div>
              <el-input style="width: 700px" v-model="preAddress"></el-input>
            </div>
            <div style="margin: 10px">permanent Address</div>
            <div>
              <el-input style="width: 700px" v-model="perAddress"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="three-box-style">
        <div class="three-title">ID information</div>
        <div class="three-content">
          <div class="empty-style"></div>
          <div class="three-con-box">
            <div class="three-con-item">
              <div class="three-content-title">ID type</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">ID number</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">Issue date</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">Expiry date</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="three-box-style">
        <div class="three-title">Society</div>
        <div class="three-content">
          <div class="empty-style"></div>
          <div class="three-con-box">
            <div class="three-con-item">
              <div class="three-content-title">TIN NO.</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">SSS NO.</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="three-box-style">
        <div class="three-title">Occuptions</div>
        <div class="three-content">
          <div class="empty-style"></div>
          <div class="three-con-box">
            <div class="three-con-item">
              <div class="three-content-title">Enter your occupation</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">Current employer</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">Expiry date</div>
              <div class="three-content-input">
                <el-input></el-input>
              </div>
            </div>
            <div class="three-con-item">
              <div class="three-content-title">Employer Address</div>
              <div class="three-content-input">
                <el-input style="width: 700px"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="five-box-style">
        <div class="five-left">
          <div style="font-weight: 700">Source of fund:</div>
          <div>
            <el-input></el-input>
          </div>
        </div>
        <div class="five-right">
          <div style="font-weight: 700">Signature</div>
          <div>
            <img width="100px" height="100px" src="@/static/logo.png" alt="" />
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
      sex: "",
      perAddress: "",
      preAddress: "",
    };
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>