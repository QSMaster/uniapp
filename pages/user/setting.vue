<template>
  <view class="container">
    <nav-bar title="安全设置" bgColor="#ffffff" fontColor="#010F14"></nav-bar>
    <view class="setting-box">
      <view class="setting-list hairline--bottom" v-for="(item,index) in optionList" :key="index"
        @click="skip(item)">
        <view class="text">{{item.title}}</view>
        <view class="sl-right">
          <view class="value" v-if="item.value">{{item.value}}</view>
          <view class="img-box" v-if="item.link !== false">
            <image src="../../static/images/icon_mine_more_1@3x.png" style="width: 32rpx;height: 32rpx;"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="out-login">
      <view class="logoutBtn" @click="outLogin">退出登录</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        optionList: [
          // {
          //   title: "个人资料",
          //   skipUrl: "/pages/user/personalData"
          // },
          {
            title: "绑定手机",
            value: this.$store.state.userInfo.phone,
            skipUrl: "/pages/user/phoneOrEmail",
            link: false
          }, {
            title: "设置登录密码",
            skipUrl: "/pages/user/changeLoginPassword",
            link: true
          }, {
            title: "设置支付密码",
            skipUrl: "/pages/user/changePayPassword",
            link: true
          }
          // , {
          // 	title: "联系我们",
          // 	skipUrl: "/pages/user/contactUs"
          // }
        ],
        userInfo: "", //用户信息
      }
    },
    onShow() {
      this.userInfo = this.$store.state.userInfo;



    },
    methods: {
      //点击退出登录
      outLogin() {
        let _this = this;
        uni.showModal({
          title: "温馨提示",
          content: "是否退出登录？",
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              _this.loginGoout()
            }
          }
        })
      },
      //退出登录
      loginGoout() {
        let _this = this;
        uni.showLoading({
          title: "loading..."
        })
        _this.$api.logingOut({}, res => {
          if (res.code == 200) {
            setTimeout(() => {
              _this.$common.removeStorage("user_token");
              uni.hideLoading()
              _this.$common.showToast("退出成功", "success");
              _this.$store.dispatch('setLoginStatus', false)
              
              _this.$store.commit('SAVE_USER_ASSET', {})
              _this.$store.commit('SET_USER_INFO', {})
              
              
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/login/login"
                })
              }, 1300)
            }, 1500)
          } else {
            uni.hideLoading()
          }
        })
      },
      //跳转
      skip(item) {
        if(!item.link) return
        const val = item.skipUrl

        if (val == "/pages/user/phoneOrEmail") {
          this.$common.skipTo(val)
        } else {
          this.$common.skipTo(val)
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }

  .sl-phonOrEmail {
    font-size: 28upx;
    color: #969696;
  }

  .sl-right {
    display: flex;
    align-items: center;

    .value {
      font-size: 30rpx;
      font-family: "DIN-Medium";
      text-align: right;
      color: #9ea0a8;
    }
  }

  .out-login {
    width: 100%;
    padding: 74rpx 30rpx;

    .logoutBtn {
      width: 100%;
      height: 96rpx;
      background: rgba(65, 96, 251, 0.1);
      border-radius: 12rpx;
      font-size: 32rpx;
      font-weight: bold;
      text-align: center;
      color: #4160FB;
      line-height: 96rpx;

      &:active {
        opacity: 0.9;
      }
    }
  }

  .setting-list:last-of-type {
    border-bottom: none;
  }

  .setting-list {
    padding: 44rpx 0 42rpx 0;
    // border-bottom: 1px solid #F0F0F0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    >.text {
      font-size: 30rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
    }
  }

  .setting-box {
    background: #fff;
    padding: 0 30upx;
  }

  page {
    background: #FFFFFF;
  }
</style>
