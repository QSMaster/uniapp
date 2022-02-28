<template>
  <view class="container">
    <uni-status-bar></uni-status-bar>

    <view class="row">
      <view class="icon_clsoe" @click="closePage"></view>
      <navigator class="register" url="register" hover-class="none">注册账号</navigator>
    </view>

    <view class="login-content">




      <!-- <nav-bar title="首页" bgColor="#FFFFFF" fontColor="#010F14" :shadow="false" type="transparentFixed"></nav-bar> -->





      <!-- 切换语言 -->
      <!--   <view class="login-language">
        <view class="img-box" @click="changClick">
          <image v-if="language=='zh-CN'" src="../../static/image/zh-CN.png" style="width: 80upx;height: 50upx;">
          </image>
          <image v-if="language=='zh-EN'" src="../../static/image/zh-EN.png" style="width: 80upx;height: 50upx;">
          </image>
        </view>

        <view class="login-language-list-box" v-if="langFlag">
          <view class="login-language-list" @click="setLanguage('zh-CN')">
            <view class="img-box">
              <image src="../../static/image/zh-CN.png" style="width: 80upx;height: 50upx;"></image>
            </view>
          </view>
          <view style="width: 100%;height: 30upx;"></view>
          <view class="login-language-list" @click="setLanguage('zh-EN')">
            <view class="img-box">
              <image src="../../static/image/zh-EN.png" style="width: 80upx;height: 50upx;"></image>
            </view>
          </view>
        </view>
      </view> -->




      <!-- logo -->
      <view class="loginLogo">
        <image class="logo" src="../../static/images/ant_logo@2x.png" mode="aspectFit"></image>
        <view class="text">欢迎登录蚂蚁量化</view>
      </view>


      <!-- 输入框 -->
      <view class="login-input">


        <view class="login-input-row">
          <view class="label">手机号</view>
          <view class="login-input-row-inputWrap">
            <!-- <input class="input" type="text" v-model="loginInfo.account" placeholder="请输入手机号" placeholder-class="login-input-place" /> -->
            <uni-easyinput class="input" type="number" v-model="loginInfo.account" placeholder="请输入手机号"
              :inputBorder="false" placeholderStyle="font-weight: normal;color: #CBCDD2;" />
          </view>
        </view>


        <view class="login-input-row">

          <view class="label">登录密码</view>

          <view class="login-input-row-inputWrap">
            <uni-easyinput class="input" type="password" v-model="loginInfo.password" placeholder="请输入登录密码"
              :inputBorder="false" placeholderStyle="font-weight: normal;color: #CBCDD2;" />
          </view>
        </view>




        <!-- 登录按钮 -->
        <view class="login-btn">
          <view @click="clickLogin">登录</view>
        </view>
        <!-- 登录页中间背景 -->
        <!-- <view class="img-box login-center">
          <image src="../../static/image/login-center.png" style="width: 100%;height: 426upx;"></image>
        </view> -->
      </view>

      <!-- <view style="width: 100%;height: 192upx;"></view> -->

      <!-- <view class="uni-title uni-common-pl" @click="handleClickLang">地区选择器</view> -->
      <!-- <view class="uni-list">
        <view class="uni-list-cell">
          <view class="uni-list-cell-left">
            当前选择
          </view>
          <view class="uni-list-cell-db">
            <picker @change="bindPickerChange" :value="index" :range="array">
              <view class="uni-input">{{array[index]}}</view>
            </picker>
          </view>
        </view>
      </view> -->



      <!-- 注册和忘记密码 -->
      <view class="login-other">
        <!-- <view @click="skip('/pages/login/register')">免费注册</view> -->
        <view class="login-other_item" @click="skip('/pages/login/forgetPassword')">忘记密码</view>
      </view>





    </view>




    <!-- 登录页底部样式 -->
    <!-- <view class="img-box login-bottom">
      <image src="../../static/image/login-bottom.png" style="width: 100%;height: 142upx;"></image>
    </view> -->


    <!-- 选择语言弹窗 -->
    <my-drop-down-box ref="setdownbox" title="选择区号">
      <view class="switchLangBox">
        <view class="switchLangBox_item hairline--bottom" v-for="(item, index) in arres"
          :class="{ active: item.checked }" :key="index" @click="handleChangeArea(item)">
          <text class="switchLangBox_item--text">{{ item.name }}</text>
          <text class="switchLangBox_item--text">{{ item.tel }}</text>
          <image class="switchLangBox_item--icon" src="/static/image/coin-usdt.png" mode="aspectFit"
            v-if="item.checked"></image>
        </view>
      </view>
    </my-drop-down-box>


  </view>
</template>

<script>
  import arres from '../../static/data/areaCode.js'

  export default {
    data() {
      return {
        arres,

        title: 'picker',
        array: ['中国', '美国', '巴西', '日本'],
        index: 0,

        langs: [{
            value: 'en',
            name: 'English',
            checked: false,
            open: true
          },
          {
            value: 'zh-TW',
            name: '繁体中文',
            checked: false,
            open: true
          },
          {
            value: 'it',
            name: 'Italiano',
            checked: false,
            open: false
          },
          {
            value: 'tr',
            name: 'Français',
            checked: false,
            open: false
          },
          {
            value: 'ko',
            name: '한국어',
            checked: false,
            open: false
          },
          {
            value: 'ja',
            name: '日本語',
            checked: false,
            open: false
          }
        ],


        langFlag: false,
        language: "zh-CN", //语言
        loginInfo: {
          account: "", //账号
          password: "", //密码
        },
      }
    },
    onShow() {
      const pages = getCurrentPages()
      console.log(55555);
      console.log(66666, pages.length);



      if (this.$common.getStorage("user_account")) {
        this.loginInfo.account = this.$common.getStorage("user_account")
      }
    },
    methods: {
      // 关闭登录页
      closePage() {
        // 判断有没有页面堆栈,有则后退,没有则回到首页
      const pages = getCurrentPages()
      console.log(55555);
      console.log(66666, pages.length);

      if(pages.length && pages.length > 1) {
        uni.navigateBack()

        // uni.switchTab({
        //   url: "../index"
        // })

      } else {
        uni.switchTab({
          url: "../index"
        })
      }


      },

      handleClickLang() {
        this.$refs.setdownbox.open();
      },

      // 选择区号
      handleChangeArea(item) {

      },

      bindPickerChange: function(e) {

        console.log('picker发送选择改变，携带值为1', e.target.value)
        this.index = e.target.value
      },

      //点击登录按钮
      clickLogin() {
        if (this.loginInfo.account == "") {
          this.$common.showToast("请输入账号");
        } else if (this.loginInfo.password == "") {
          this.$common.showToast("请输入登录密码");
        } else {
          this.goLogin()
        }
      },
      //登录
      goLogin() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.login({
            mobileNumber: _this.loginInfo.account,
            password: _this.loginInfo.password,
          }, res => {
            if (res.code == 200) {
              _this.$common.setStorage("user_token", res.result.token)
              _this.$common.setStorage("user_account", _this.loginInfo.account)
              _this.$store.dispatch('setLoginStatus', true)
              _this.$store.dispatch('saveUserAsset')
              _this.$store.dispatch('setUserInfo')

              setTimeout(() => {
                _this.$common.showToast("登录成功", "success")

                setTimeout(() => {
                  
                  _this.closePage()
                  // uni.navigateBack()
                  // uni.switchTab({
                  //   url: '/pages/index'
                  // })

                }, 1300)


              }, 1300)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },

      //设置语言
      setLanguage(val) {
        this.langFlag = false;
        this.language = val;
        this.$common.setStorage("language", val)
      },

      //跳转
      skip(val) {
        this.$common.skipTo(val)
      },

      //点击切换语言
      changClick() {
        if (this.langFlag) {
          this.langFlag = false;
        } else {
          this.langFlag = true;
        }
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
        background: url(../../static/images/icon_bar_back@2x.png) no-repeat;
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

    .login-content {
      padding: 48rpx 48rpx 0;
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

  .login-input-row {
    .label {
      font-size: 26rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 36rpx;
      margin-top: 36rpx;
      margin-bottom: 4rpx;
    }

    &-inputWrap {
      height: 104rpx;
      display: flex;
      flex-direction: row;
      align-items: center;
      transition: all 0.4s;
      border-bottom: 1rpx solid #E8EAEE;

      &:focus-within {
        border-bottom: 1rpx solid #4160fb;
      }

      .input {
        width: 105%;
        // height: 100%;
        font-size: 36rpx;
        color: #37383b;
        font-weight: bold;
        // background-color:red;
      }
    }
  }


  .login-language-list-box {
    position: absolute;
    right: 24upx;
    top: 110upx;
  }

  .login-other {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40rpx;

    &_item {
      font-size: 28rpx;
      font-weight: bold;
      color: #5664af;
    }
  }

  .login-btn {
    margin-top: 73rpx;

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

  .login-code {
    position: absolute;
    right: 0;
    bottom: 10upx;
    width: 174upx;
    height: 72upx;
    background: #fff;
  }

  .login-input-list-input {
    width: 550upx;
  }

  .login-input-list-input input {
    color: #fff;
  }

  .login-input-place {
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 48px;
    color: rgba(255, 255, 255, 0.36);
    opacity: 1;
  }

  .login-input-list-left {
    padding-right: 40upx;
  }



  .login-input-list {
    padding: 53upx 0 27upx 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    ;
  }

  .login-language {
    width: 100%;
    height: 88upx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24upx;
    position: relative;
  }

  .login-center {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .login-bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
</style>
