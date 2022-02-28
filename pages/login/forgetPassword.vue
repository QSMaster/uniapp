<template>
  <view class="container">

    <uni-status-bar></uni-status-bar>


    <view class="row">
      <view class="icon_clsoe" @click="back"></view>
    </view>


    <!-- <nav-bar title="忘记密码" backState="1000" bgColor="#0278FF" fontColor="#ffffff"></nav-bar> -->


    <view class="register-box">

      <view class="loginLogo">
        <!-- <image class="logo" src="../../static/images/ant_logo@2x.png" mode="aspectFit"></image> -->
        <view class="text">找回密码</view>
      </view>


      <!-- 	<view class="register-input-list">
				<view class="ril-title">用户名</view>
				<view class="ril-input">
					<input type="text" v-model="registerInfo.userName" placeholder="请输入用户名"
						placeholder-class="register-place" />
				</view>
			</view> -->


      <view class="register-input-list">
        <view class="ril-title">手机号</view>
        <view class="ril-input">
          <uni-easyinput class="input" :inputBorder="false" type="number" v-model="registerInfo.phone" placeholder="请输入手机号" placeholderStyle="font-weight: normal;color: #CBCDD2;" />
        </view>
      </view>


      <view class="register-input-list">
        <view class="ril-title">手机验证码</view>
        <view class="ril-input">
          <uni-easyinput class="input" :inputBorder="false" type="number" v-model="registerInfo.code" placeholder="请输入6位验证码" placeholderStyle="font-weight: normal;color: #CBCDD2;" maxlength="6"/>
          <view class="ril-getCode" :class="$store.state.sendCodeInfo.className" @click="getCodeClick">
            {{$store.state.sendCodeInfo.title}}
          </view>
        </view>
      </view>



      <view class="register-input-list">
        <view class="ril-title">设置密码</view>
        <view class="ril-input">
          <uni-easyinput class="input" :inputBorder="false" type="password" v-model="registerInfo.password" placeholder="请输入8-12位数字与字母组合密码"
            placeholderStyle="font-weight: normal;color: #CBCDD2;" maxlength="12"/>
        </view>
      </view>



      <view class="register-input-list">
        <view class="ril-title">确认密码</view>
        <view class="ril-input">
          <uni-easyinput class="input" :inputBorder="false" type="password" v-model="registerInfo.passwordAg" placeholder="请在此输入8-12位数字与字母组合密码"
            placeholderStyle="font-weight: normal;color: #CBCDD2;" maxlength="12"/>
        </view>
      </view>



      <!-- <view style="width: 100%;height: 216upx;"></view> -->

      <view class="register-btn">
        <view @click="clickRegister">确认修改</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        registerInfo: {
          userName: "", //用户名
          phone: "", //手机号码
          code: "", //短信验证码
          password: "", //登录密码
          passwordAg: "", //确认密码
        },
      }
    },
    onLoad() {

    },
    methods: {
      back() {
        uni.navigateBack()
      },

      // 点击获取验证码
      getCodeClick() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.forgetSendBack({
            phone: _this.registerInfo.phone
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
            _this.$store.state.BtnFlag = true;
          })
        }
      },
      //点击注册按钮
      clickRegister() {
        //手机号验证正则
        let phone_reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        //验证密码正则
        let password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;
        if (this.registerInfo.phone == "") {
          this.$common.showToast("请输入手机号")
        } else if (!phone_reg.test(this.registerInfo.phone)) {
          this.$common.showToast("手机号错误")
        } else if (this.registerInfo.code == "") {
          this.$common.showToast("请输入手机验证码")
        } else if (this.registerInfo.password == "") {
          this.$common.showToast("请输入登录密码")
        } else if (!password_reg.test(this.registerInfo.password)) {
          this.$common.showToast("登录密码由8-12位字母+数字组成")
        } else if (this.registerInfo.passwordAg == "") {
          this.$common.showToast("请确认登录密码")
        } else if (this.registerInfo.password != this.registerInfo.passwordAg) {
          this.$common.showToast("请确认登录密码")
        } else {
          this.forgetPassword()
        }
      },
      //重置密码
      forgetPassword() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.forgetPassword({
            // username: _this.registerInfo.userName,
            phone: _this.registerInfo.phone,
            password: _this.registerInfo.password,
            checkCode: _this.registerInfo.code
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                _this.$common.showToast("找回成功", "success")
                setTimeout(() => {
                  uni.navigateBack(-1)
                }, 1300)
              }, 1300)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },
      //返回
      goback() {
        uni.navigateBack()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/mixin.scss";

  .container {
    width: 100%;
    height: 100%;
    background: url(../../static/images/bg_enter@2x.png) no-repeat;
    background-size: 264rpx 344rpx;
    background-position: right top;
    background-color: #FFFFFF;

    .row {
      height: 88rpx;
      padding: 0 40rpx 0 30rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .icon_clsoe {
        @include extend-click(10px);
        width: 40rpx;
        height: 40rpx;
        background: url(../../static/images/icon_bar_back@3x.png) no-repeat;
        background-size: contain;
      }

      .register {
        font-size: 28rpx;
        font-weight: bold;
        text-align: right;
        color: #37383b;
        line-height: 40rpx;
      }
    }

    .register-box {
      padding: 48rpx 48rpx 0;
    }
  }

  .loginLogo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 80rpx;

    .text {
      font-size: 44rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
    }
  }

  .register-input-list {
    .ril-title {
      font-size: 26rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 36rpx;
      margin-top: 36rpx;
      margin-bottom: 4rpx;
    }

    .ril-input {
      height: 104rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      transition: all 0.4s;
      border-bottom: 1rpx solid #E8EAEE;

      &:focus-within {
        border-bottom: 1rpx solid #4160fb;
      }

      .ril-getCode {
        font-size: 28rpx;
        font-weight: bold;
        text-align: right;
        color: #4160fb;
        margin-left: 16rpx;

        &.waitecode {
          color: #bebebe;
          background-color: transparent;
        }
      }
    }
  }




  // .ril-getCode {
  //   color: #0278FF;
  // }

  // .til-right {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  // }

  // .register-title {
  //   text-align: center;
  // }

  .register-btn {
    margin-top: 80rpx;

    >view {
      width: 100%;
      height: 90rpx;
      background: #4160fb;
      border-radius: 12rpx;
      box-shadow: 0rpx 8rpx 20rpx 0rpx #c3d0ff;
      font-size: 32rpx;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      line-height: 90rpx;
      transition: all 0.2s;

      &:active {
        opacity: 0.9;
        box-shadow: none;
      }
    }

  }



  // .register-btn .uni-label-pointer {
  //   display: flex;
  //   align-items: center;
  // }

  // .agreement-title {
  //   font-size: 26upx;
  // }

  // .agreement-title span {
  //   font-size: 26upx;
  //   color: #0278FF;
  // }

  // .ril-input input {
  //   width: 100%;
  //   height: 80upx;
  // }

  // .register-place {
  //   color: #ABABAB;
  //   font-size: 26upx;
  // }

  // .register-input-list {
  //   border-bottom: 1px solid #EFEFEF;
  // }

  // .ril-title {
  //   font-size: 30upx;
  //   font-family: PingFang SC;
  //   font-weight: 400;
  //   color: #000000;
  //   padding-top: 24upx;
  // }
</style>
