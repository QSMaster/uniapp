<template>
  <view class="container">
    <nav-bar title="修改登录密码" bgColor="#ffffff" fontColor="#010F14"></nav-bar>

    <view class="tb-box">
      <view class="mm-b-input">
        <view class="mm-b-i-title">手机验证码：</view>
        <view class="mm-b-i-input hairline--bottom">
          <view class="mm-b-i-i-box">
            <uni-easyinput class="input" type="text" :inputBorder="false" v-model="login_code" placeholder="请输入手机验证码"
              placeholder-class="mm-place" />
          </view>
          <view>
            <view class="ril-getCode" :class="$store.state.sendCodeInfo.className" @click="getCodeClick">
              {{$store.state.sendCodeInfo.title}}
            </view>
          </view>
        </view>
      </view>
      <view class="mm-b-input">
        <view class="mm-b-i-title">登录密码：</view>
        <view class="mm-b-i-input hairline--bottom">
          <view class="mm-b-i-i-box" style="width: 100%;">
            <uni-easyinput class="input" :inputBorder="false" type="password" v-model="login_password"
              placeholder="请输入登录密码" placeholder-class="mm-place" />
          </view>
        </view>
      </view>
      <view class="mm-b-input">
        <view class="mm-b-i-title">确认登录密码：</view>
        <view class="mm-b-i-input hairline--bottom">
          <view class="mm-b-i-i-box" style="width: 100%;">
            <uni-easyinput class="input" type="password" :inputBorder="false" v-model="login_passwordAg"
              placeholder="请再次输入登录密码" placeholder-class="mm-place" />
          </view>
        </view>
      </view>

      <view class="tb-btn">
        <view @click="clickOk">确认</view>
      </view>
    </view>

    <!-- 修改成功弹窗 -->
    <uni-popup ref="changeLoginPwdPopup" type="center" :mask-click="false">
      <view class="successPopup">
        <image class="icon" src="../../static/images/tc_success@2x.png" mode="aspectFit"></image>
        <view class="title">设置成功</view>
        <view class="tips">已重新设置登录密码,请重新登录!</view>
        <view class="btn" @click="logout">重新登录</view>

      </view>
    </uni-popup>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        login_code: "", //验证码
        login_password: "", //登录密码
        login_passwordAg: "", //确认密码
        btnFlag: true,
      }
    },
    methods: {
      // 退出登录
      logout() {
        this.$common.loginOut();
      },

      //点击确认
      clickOk() {

        //验证密码正则
        let password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;
        if (this.$store.state.userInfo.phone == "" || !this.$store.state.userInfo.phone) {
          this.$common.showToast("请先绑定手机号/邮箱")
        } else if (this.login_code == "") {
          this.$common.showToast("请输入验证码")
        } else if (this.login_password == "") {
          this.$common.showToast("请输入密码")
        } else if (!password_reg.test(this.login_password)) {
          this.$common.showToast("登录密码由8-12位字母+数字组成")
        } else if (this.login_password != this.login_passwordAg) {
          this.$common.showToast("请确认密码")
        } else {
          this.changePassword();
        }
      },
      //修改登录密码
      changePassword() {
        let _this = this;
        if (this.btnFlag) {
          this.btnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.changePassword({
            checkCode: _this.login_code,
            password: _this.login_password,
          }, res => {
            uni.hideLoading()
            if (res.code == 200) {
              _this.$refs.changeLoginPwdPopup.open()
            }
            _this.btnFlag = true;
          })
        }
      },
      // 点击获取验证码
      getCodeClick() {
        let _this = this;
        if (this.btnFlag) {
          this.btnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.sendSms({
            type: 1,
            phone: _this.$store.state.phone
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                _this.$common.showToast("发送成功", "success")
                setTimeout(() => {
                  _this.$store.commit("countDown")
                }, 1300)
              }, 1300)
            } else {
              uni.hideLoading()
            }
            _this.btnFlag = true;
          })
        }
      },

    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  // 修改成功弹窗
  .successPopup {
    width: 588rpx;
    height: 528rpx;
    background: #ffffff;
    border-radius: 30rpx;
    padding: 56rpx 76rpx 0;
    text-align: center;
    .icon {
      width: 136rpx;
      height: 136rpx;
      margin-bottom: 36rpx;
    }
    .title {
      font-size: 36rpx;
      font-weight: bold;
      text-align: center;
      color: #37383b;
      line-height: 50rpx;
    }
    .tips {
      font-size: 28rpx;
      text-align: center;
      color: #5e6066;
      line-height: 40rpx;
      margin-top: 20rpx;
      margin-bottom: 56rpx;
    }
    .btn {
      width: 436rpx;
      height: 76rpx;
      background: linear-gradient(135deg,#5470ff, #4160fb);
      border-radius: 12rpx;
      font-size: 26rpx;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      line-height: 76rpx;
    }
  }

  .waitecode {
    color: #FFFFFF;
    background: #CBCDD2;
    // font-size: 26upx;
  }

  .ril-getCode {
    width: 172rpx;
    height: 64rpx;
    opacity: 1;
    background: rgba(65, 96, 251, 0.15);
    border-radius: 8rpx;
    font-size: 28rpx;
    font-weight: bold;
    text-align: center;
    color: #4160fb;
    line-height: 64rpx;
    margin-left: 20rpx;
  }

  .tb-btn {
    padding-top: 72rpx;

    >view {
      height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #ffffff;
      line-height: 96rpx;
      text-align: center;
    }
  }

  .mm-place {
    font-size: 26upx;
    color: #969696;
  }

  .mm-b-i-i-box {
    height: 112rpx;
    display: flex;
    align-items: center;
    flex: 1;
  }



  .mm-b-i-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px solid #F0F0F0;
  }

  .mm-b-i-title {
    font-size: 28rpx;
    font-weight: bold;
    text-align: left;
    color: #37383b;
    line-height: 40rpx;
    margin-top: 24rpx;
    margin-bottom: 4rpx;

  }

  .tb-box {
    padding: 0 30rpx;

    .input {
      font-size: 28rpx;
    }
  }
</style>
