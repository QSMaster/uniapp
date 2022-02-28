<template>
  <view class="container">
    <uni-status-bar></uni-status-bar>

    <view class="row">
      <view class="icon_clsoe" @click="back"></view>
    </view>

    <!-- <nav-bar title="注册" backState="1000" bgColor="#0278FF" fontColor="#ffffff"></nav-bar> -->



    <view class="register-box">


      <view class="loginLogo">
        <image class="logo" src="../../static/images/ant_logo@2x.png" mode="aspectFit"></image>
        <view class="text">注册蚂蚁量化账号</view>
      </view>


      <!-- 	<view class="register-input-list">
				<view class="ril-title">用户名</view>
				<view class="ril-input">
					<input type="text" v-model="registerInfo.userName" placeholder="请输入6-12位字母+数字"
						placeholder-class="register-place" />
				</view>
			</view> -->

      <view class="register-input-list">
        <view class="ril-title">手机号</view>
        <view class="ril-input">
          <uni-easyinput class="input" trim type="number" :inputBorder="false" v-model="registerInfo.phone"
            placeholder="请输入手机号" placeholderStyle="font-weight: normal;color: #CBCDD2;" />
        </view>
      </view>


      <!-- <view class="mm-b-input">
      	<view class="mm-b-i-title">手机号/邮箱</view>
      	<view class="mm-b-i-input">
      		<view class="mm-b-i-i-box" style="width: 100%;">
      			<input v-if="isBind==0" type="text" v-model="user_phone" placeholder="请输入绑定的手机或邮箱" placeholder-class="mm-place" />
      			<input v-if="isBind==1" disabled type="text" v-model="user_phone" placeholder="请输入绑定的手机或邮箱" placeholder-class="mm-place" />
      		</view>
      	</view>
      </view> -->

      <view class="register-input-list">
        <view class="ril-title">手机验证码</view>
        <view class="ril-input">
          <uni-easyinput class="input" trim type="number" maxlength="6" :inputBorder="false"
            v-model="registerInfo.smsCode" placeholder="请输入6位验证码"
            placeholderStyle="font-weight: normal;color: #CBCDD2;" />
          <view class="ril-getCode" :class="$store.state.sendCodeInfo.className" @click="getCodeClick">
            {{$store.state.sendCodeInfo.title}}
          </view>
        </view>
      </view>

      <view class="register-input-list">
        <view class="ril-title">设置密码</view>
        <view class="ril-input">
          <uni-easyinput class="input" trim type="password" maxlength="12" :inputBorder="false"
            v-model="registerInfo.password" placeholder="请输入8-12位数字与字母组合密码"
            placeholderStyle="font-weight: normal;color: #CBCDD2;" />
        </view>
      </view>




      <view class="register-input-list">
        <view class="ril-title">*邀请码(必填)</view>
        <view class="ril-input">
          <uni-easyinput class="input" trim type="text" :inputBorder="false" v-model="registerInfo.invitationCode"
            placeholder="请输入邀请码" placeholderStyle="font-weight: normal;color: #CBCDD2;" />
        </view>
      </view>





      <!-- 	<view class="register-input-list">
				<view class="ril-title">确认密码</view>
				<view class="ril-input">
					<input type="password" v-model="registerInfo.passwordAg" placeholder="请再次输入登录密码"
						placeholder-class="register-place" />
				</view>
			</view>
      -->

      <!-- <view style="width: 100%;height: 40upx;"></view> -->
      <view class="register-agreement">

        <evan-checkbox v-model="checkFlag" :iconSize="15" primaryColor="#4160FB"><text class="label">我已阅读并同意</text>
        </evan-checkbox>
        <text class="link" @click="skip('/pages/login/userAgreement')">《用户协议》</text>
        <!--  <checkbox-group @change="checkboxChange">
          <label>
            <checkbox value="cb" :checked="checkFlag" style="transform:scale(0.6)" /><span
              class="agreement-title">我已阅读并同意<span @click="skip('/pages/login/userAgreement')">《用户协议》</span></span>
          </label>
        </checkbox-group> -->
      </view>

      <!-- <view style="width: 100%;height: 100upx;"></view> -->


      <view class="register-btn">
        <view @click="clickRegister">注册</view>
      </view>


      <!-- 	<view style="width: 100%;height: 80upx;"></view>
			<view class="register-title" @click="goback">已有账号，去登录</view>
			<view style="width: 100%;height: 90upx;"></view> -->


    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        registerInfo: {
          phone: '', // 手机号
          smsCode: '', // 验证码

          userName: "", //用户名
          nickName: "", //昵称
          invitationCode: "", //邀请码
          password: "", //登录密码
          passwordAg: "", //确认密码
        },
        checkFlag: false,
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
          this.$api.sendSmsRegister({
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



      //跳转
      skip(val) {
        this.$common.skipTo(val)
      },
      //点击复选框
      checkboxChange(e) {
        if (this.checkFlag) {
          this.checkFlag = false;
        } else {
          this.checkFlag = true;
        }
      },
      //点击注册按钮
      clickRegister() {
        //验证用户名正则
        let userName_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        //验证密码正则
        let password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;
        if (this.registerInfo.phone == "") {
          this.$common.showToast("请输入手机号")
        } else if (this.registerInfo.smsCode == "") {
          this.$common.showToast("请输入验证码")
        } else if (this.registerInfo.invitationCode == "") {
          this.$common.showToast("请输入邀请码")
        } else if (this.registerInfo.password == "") {
          this.$common.showToast("请输入登录密码")
        } else if (!password_reg.test(this.registerInfo.password)) {
          this.$common.showToast("登录密码由8-12位字母+数字组成")
        } else if (!this.checkFlag) {
          this.$common.showToast("请阅读并同意用户协议")
        } else {
          this.goRegister()
        }
      },
      //注册
      goRegister() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.register({
            phone: _this.registerInfo.phone,
            smsCode: _this.registerInfo.smsCode,
            password: _this.registerInfo.password,
            invitationCode: _this.registerInfo.invitationCode
          }, res => {
            if (res.code == 200) {

              // _this.$common.showToast("注册成功", "success")
              // setTimeout(() => {
              //   // uni.navigateBack(-1)
              //   uni.redirectTo({
              //     url: '/pages/login/login'
              //   })
              // }, 1300)


              setTimeout(() => {
              	_this.$common.showToast("注册成功", "success")
              	setTimeout(() => {
              		uni.redirectTo({
              		  url: '/pages/login/login'
              		})
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

    .register-agreement {
      font-size: 26rpx;
      font-weight: bold;
      text-align: left;
      color: #9ea0a8;
      line-height: 36rpx;
      display: flex;
      align-items: center;
      margin-top: 80rpx;

      .label {
        color: #9EA0A8;
      }

      .link {
        color: #5664AF;
      }
    }
  }

  .loginLogo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 80rpx;

    .logo {
      width: 72rpx;
      height: 104rpx;
      margin-right: 20rpx;
    }

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



  .register-btn {
    margin-top: 40rpx;

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
</style>
