<template>
  <view class="container">
    <view style="width: 100%;height: 88rpx;background-color: #fff;"></view>

    <nav-bar ref="navBar" :backState="2000" :scrollTop="scrollTop" transparentFixedFontColor="transparent"
      bgColor="#FFFFFF" fontColor="#010F14" type="transparentFixed" title="我的" shadow>
    </nav-bar>

    <!-- 用户信息 -->
    <view class="user">
      <view class="info" @click="loginJump('/pages/user/personalData')">


        <image class="avatar" :src="userInfo.avatar" mode="aspectFit" v-if="userInfo.avatar"></image>
        <image class="avatar" src="../static/images/icon_avatar@3x.png" mode="aspectFill" v-else></image>


        <view class="cllumn">
          <view class="name">{{userInfo.nickname || '点击设置昵称'}}</view>
          <view class="phone">{{userInfo.phone || '--'}}</view>
        </view>
        <image class="arror" src="../static/images/icon_mine_more@3x.png" mode="aspectFit"></image>
      </view>

      <!-- 已激活 -->
      <view class="activation hasActivate" v-if="isActive">
        <view class="top">
          <image class="icon_vip" src="../static/images/icon_mine_v@3x.png" mode="aspectFit"></image>
          <text class="text">您已是蚂蚁量化付费用户</text>
        </view>
        <view class="expireDate">到期时间：{{userInfo.expireTime}}</view>
        <view class="btns">
          <button class="xf" type="default" @click="jihuoClick">续费</button>
          <button class="buy" type="default" @click="clickBuy">购买</button>
        </view>
      </view>

      <!-- 未激活 -->
      <view class="activation noActivate" v-if="!isActive">
        <view class="text tips">开通激活码可开启蚂蚁量化策略</view>
        <view class="btns">
          <button class="jh" type="default" @click="jihuoClick">激活</button>
          <button class="buy" type="default" @click="clickBuy">购买</button>
        </view>
      </view>

    </view>

    <!-- 我的资产 -->
    <view class="my_assets">
      <view class="top">
        <view class="title">我的资产 <text class="coin"> (USDT)</text></view>
        <view class="icon" :class="isEye?'close':'open'" @click="handleEye"></view>
      </view>
      <view class="value">{{userUsdt | eye(isEye)}}</view>
      <view class="balance">可用余额</view>
      <view class="block">
        <view class="item" @click="skip('/pages/user/recharge',true)">
          <image class="icon" src="../static/images/mine/icon_mine_cz@3x.png" mode="aspectFit"></image>
          <view class="text">充值</view>
        </view>
        <view class="item" @click="skip('/pages/user/mentionMoney',true)">
          <image class="icon" src="../static/images/mine/icon_mine_tx@3x.png" mode="aspectFit"></image>
          <view class="text">提现</view>
        </view>
        <view class="item" @click="skip('/pages/user/transfersBetween',true)">
          <image class="icon" src="../static/images/mine/icon_mine_hz@3x.png" mode="aspectFit"></image>
          <view class="text">划转</view>
        </view>
        <view class="item" @click="skip('/pages/user/assets',true)">
          <image class="icon" src="../static/images/mine/icon_mine_mx@3x.png" mode="aspectFit"></image>
          <view class="text">明细</view>
        </view>
      </view>
    </view>


    <scroll-view scroll-y>
      <!-- 第一阶 -->
      <view class="user-option">
        <view class="user-option-list" :class="{active: item.link !== false}" v-for="(item, index) in user_option1"
          :key="index" @click="skip(item.skipUrl,item.login)">
          <view class="uol-left">
            <view class="img-box user-icon">
              <image :src="item.imgUrl"></image>
            </view>
            <view class="user-l-title">{{ item.title }}</view>
          </view>
          <view class="img-box">
            <image class="arrow" src="../static/images/icon_mine_more_1@3x.png"></image>
          </view>
        </view>
      </view>
      <view style="width: 100%; height: 24rpx"></view>

      <!-- 第二阶 -->
      <view class="user-option">
        <view class="user-option-list" :class="{active: item.link !== false}" v-for="(item, index) in user_option2"
          :key="index" @click="skip(item.skipUrl,item.login)">
          <view class="uol-left">
            <view class="img-box user-icon">
              <image :src="item.imgUrl"></image>
            </view>
            <view class="user-l-title">{{ item.title }}</view>
          </view>
          <view class="img-box">
            <text v-if="item.value">{{item.value}}</text>
            <image class="arrow" src="../static/images/icon_mine_more_1@3x.png"></image>
          </view>
        </view>
      </view>
      <view style="width: 100%; height: 24rpx"></view>
      <!-- 第三阶 -->
      <view class="user-option">
        <view class="user-option-list" :class="{active: item.link !== false}" v-for="(item, index) in user_option3"
          :key="index" @click="skip(item.skipUrl,item.login)">
          <view class="uol-left">
            <view class="img-box user-icon">
              <image :src="item.imgUrl"></image>
            </view>
            <view class="user-l-title">{{ item.title }}</view>
          </view>
          <view class="img-box">
            <text class="value" v-if="item.value">{{item.value}}</text>
            <image class="arrow" src="../static/images/icon_mine_more_1@3x.png" v-if="item.link !== false"></image>
          </view>
        </view>
      </view>
      <view style="width: 100%; height: 20upx"></view>

      <view style="width: 100%; height: 196rpx"></view>
    </scroll-view>

    <!-- 激活弹窗 -->
    <uni-popup ref="jihuoPoupup" type="center">
      <view class="jhpopupbox">
        <view class="close_icon" @click="handleCloseJh"></view>
        <view class="jhpopupbox_title">输入激活码</view>
        <view>
          <view class="pb-input hairline--bottom">
            <uni-easyinput type="text" :inputBorder="false" v-model="user_code" placeholder="请输入您的激活码"
              placeholder-class="pb-place" />
            <view class="Paste" @click="handlePaste">粘贴</view>
          </view>
        </view>
        <view class="pb-btn-box">
          <view class="pb-b-b-ok" @click="goJihuo">确认</view>
        </view>
      </view>
    </uni-popup>

    <!-- 购买激活码弹窗 -->
    <uni-popup ref="buyPoupup" type="center">
      <view class="jhpopupbox">
        <view class="pb-title">购买激活码</view>
        <view style="padding: 40upx;">
          <view class="pb-input-list">
            <view class="pb-i-l-title">购买数量</view>
            <view>
              <uni-number-box v-model="buyNumber" :min="1"></uni-number-box>
            </view>
          </view>
          <view class="pb-input-list">
            <view class="pb-i-l-title">交易密码</view>
            <view>
              <input type="password" v-model="pay_password" placeholder="请输入交易密码" />
            </view>
          </view>
        </view>
        <view class="pay-number">
          <view>支付：<span>{{payUsdt}} USDT</span></view>
        </view>
        <view style="width: 100%;height: 60upx;"></view>
        <view class="pb-btn-box">
          <view class="pb-b-b-cancel" @click="cancelBuyPop">取消</view>
          <view class="pb-b-b-ok" @click="clickOk">确认</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';

  export default {
    data() {
      return {
        buyNumber: "1", //购买数量
        pay_password: "", //交易密码
        // isActivate: false, // 是否已激活
        isEye: false,
        balance: 0, // 用户余额
        isLook: true,
        assetsInfo: "",
        user_option1: [{
            title: "交易记录",
            imgUrl: require("../static/images/mine/icon_mine_jl@3x.png"),
            skipUrl: "/pages/user/transactionRecords",
            login: true
          },
          {
            title: "我的收益",
            imgUrl: require("../static/images/mine/icon_mine_qb@3x.png"),
            skipUrl: "/pages/user/billing",
            login: true
          },
          {
            title: "API管理",
            imgUrl: require("../static/images/mine/icon_mine_api@3x.png"),
            skipUrl: "/pages/user/apiboard",
            login: true
          },
          {
            title: "提醒额度",
            imgUrl: require("../static/images/mine/icon_mine_txed@3x.png"),
            skipUrl: "/pages/user/remind",
            login: true
          }
        ],
        user_option2: [{
            title: "我的激活码",
            imgUrl: require("../static/images/mine/icon_mine_jhm@3x.png"),
            skipUrl: "/pages/user/myJihuoma",
            login: true
          },
          {
            title: "社区管理",
            imgUrl: require("../static/images/mine/icon_mine_sq@3x.png"),
            skipUrl: "/pages/user/community",
            login: true
          },
          {
            title: "邀请分享",
            imgUrl: require("../static/images/mine/icon_mine_yq@3x.png"),
            skipUrl: "/pages/user/share",
            login: true
          },
        ],

        user_option3: [{
            title: "安全设置",
            imgUrl: require("../static/images/mine/icon_mine_sz@3x.png"),
            skipUrl: "/pages/user/setting",
          },
          {
            title: "关于我们",
            imgUrl: require("../static/images/mine/icon_mine_about@3x.png"),
            skipUrl: "/pages/user/aboutUs",
          },
          {
            title: "版本号",
            skipUrl: "/pages/user",
            imgUrl: require("../static/images/mine/icon_mine_bb@3x.png"),
            value: '',
            link: false
          },
        ],
        // userInfo: "", //用户信息
        user_code: "", //用户输入的激活码
        btnFlag: true,
        scrollTop: 0,
      };
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
        version: state => state.version,
        userUsdt: state => state.assetsInfo.usdt,
        isActive: state => state.userInfo.isActive,
        userInfo: state => state.userInfo
      }),
      payUsdt() {
        return this.$CAL.accMul(this.buyNumber, this.$store.state.sysConfig.codePrice)
      }
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onLoad() {
      if(this.isLogin) {
        this.$common.sysConfig()
      }
    },
    onShow() {
      this.isEye = uni.getStorageSync('isEye') || false
      this.user_option3[2].value = this.version
      this.$store.dispatch('setUserInfo')
      this.$store.dispatch('saveUserAsset')
    },
    methods: {
      // 关闭填写激活码弹窗
      handleCloseJh() {
        this.$refs.jihuoPoupup.close()
      },

      /**
       * 未登录跳转拦截
       * @param {String} url 要跳转的目标链接
       */
      loginJump(url) {
        if (this.isLogin) {
          uni.navigateTo({
            url: url
          })
        } else {
          uni.navigateTo({
            url: 'login/login'
          })
        }
      },

      // 粘贴激活码
      handlePaste() {
        const _this = this
        // #ifndef H5
        uni.getClipboardData({
          success: function(res) {
            _this.user_code = res.data
            console.log(res.data);
          }
        });
        // #endif
      },

      //点击购买
      clickBuy() {
        this.loginJump('user/buyActivationCode/buyActivationCode')
        // uni.navigateTo({
        //   url: 'user/buyActivationCode/buyActivationCode'
        // })
      },

      //点击确定
      clickOk() {
        let _this = this;
        if (this.pay_password == "") {
          this.$common.showToast("请输入交易密码")
        } else {
          if (this.btnFlag) {
            _this.btnFlag = false;
            _this.$refs.buyPoupup.close();
            uni.showLoading({
              title: "loading..."
            })
            _this.$api.activationCodeBuyIn({
              buyNum: _this.buyNumber,
              password: _this.pay_password,
            }, res => {
              _this.pay_password = "";
              if (res.code == 200) {
                setTimeout(() => {
                  uni.hideLoading()
                  _this.$common.showToast("购买成功", "success")
                  setTimeout(() => {
                    _this.$refs.paging.reload()
                  }, 1300)
                }, 1500)
              } else {
                uni.hideLoading()
              }
              _this.btnFlag = true;
            })
          }
        }
      },

      //点击取消
      cancelBuyPop() {
        this.$refs.buyPoupup.close();
      },

      // 是否展示我的资产
      handleEye() {
        this.isEye = !this.isEye
        this.$nextTick(function() {
          uni.setStorage({
            key: 'isEye',
            data: this.isEye
          })
        })
      },

      //点击进行激活
      goJihuo() {
        let _this = this;
        _this.$refs.jihuoPoupup.close();
        if (this.user_code == "") {
          this.$common.showToast("请输入激活码");
        } else {
          if (this.btnFlag) {
            _this.btnFlag = false;
            uni.showLoading({
              title: "loading...",
            });
            _this.$api.activationCodeActive({
                code: _this.user_code,
              },
              (res) => {
                _this.pay_password = "";
                if (res.code == 200) {
                  setTimeout(() => {
                    _this.$common.showToast("激活成功", "success")
                    _this.$store.dispatch('setUserInfo')
                  }, 1500);
                } else {
                  uni.hideLoading();
                }
                _this.btnFlag = true;
              }
            );
          }
        }
      },

      //获取用户信息
      getUserInfo() {
        // this.$api.userInfo({}, (res) => {
        //   if (res.code == 200) {
        //     this.userInfo = res.result;
        //     this.isActivate = res.result.isActive
        //     this.$store.state.userInfo = res.result;
        //   }
        // });
      },

      //点击取消
      cancelPop() {
        this.$refs.jihuoPoupup.close();
      },

      //点击显示激活弹窗
      jihuoClick() {
        if(!this.isLogin) {
          this.loginJump()
          return
        }

        this.user_code = "";
        this.$refs.jihuoPoupup.open();
      },

      //跳转
      skip(val, login) {
        if(login) {
          this.loginJump(val)
        } else {
          this.$common.skipTo(val);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../styles/mixin.scss";

  .jhpopupbox {
    width: 588rpx;
    height: 456rpx;
    background: #ffffff;
    border-radius: 30rpx;
    padding: 48rpx 76rpx 0 76rpx;
    position: relative;

    .close_icon {
      position: absolute;
      top: 54rpx;
      right: 40rpx;
      width: 40rpx;
      height: 40rpx;
      background: url(../static/images/icon_tc_qc@3x.png) no-repeat;
      background-size: contain;
    }

    &_title {
      text-align: center;
      font-size: 36upx;
      font-weight: 600;
      margin-bottom: 56rpx;
    }

    .pb-input {
      height: 112rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      margin-bottom: 65rpx;

      .Paste {
        width: 104rpx;
        height: 54rpx;
        background: #E3E7FE;
        border-radius: 8rpx;

        font-size: 28rpx;
        font-weight: 500;
        text-align: center;
        color: #4664FC;
        line-height: 54rpx;
        margin-left: 20rpx;
      }
    }

    .pb-i-l-title {
      font-size: 28upx;
      padding-right: 30upx;
    }

    .pb-b-b-ok {
      width: 100%;
      height: 76rpx;
      background: linear-gradient(135deg, #5470ff, #4160fb);
      border-radius: 8rpx;
      font-size: 26rpx;
      text-align: center;
      color: #ffffff;
      line-height: 76rpx;
    }

    .pb-btn-box {
      display: flex;
      justify-content: space-between;
    }
  }

  .jihuo-btn {
    padding: 30upx;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 1;
  }

  .jihuo-btn>view {
    width: 100%;
    height: 90upx;
    background: #0278FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 3px;
  }

  .pay-number {
    display: flex;
    align-content: center;
    justify-content: flex-end;
    padding: 0 40upx;
    font-size: 28upx;
  }

  .pay-number span {
    color: #027AFF;
    font-size: 28upx;
  }

  .container {
    width: 100%;
    height: 100%;
  }

  // 用户信息
  .user {
    width: 100%;
    height: 486rpx;
    background-color: #fff;
    padding: 30rpx 30rpx 0 30rpx;

    .info {
      display: flex;
      align-items: center;
      margin-bottom: 48rpx;

      .avatar {
        width: 108rpx;
        height: 108rpx;
        margin-right: 30rpx;
      }

      .cllumn {
        display: flex;
        flex-direction: column;
        margin-right: auto;
      }

      .name {
        font-size: 40rpx;
        font-weight: bold;
        text-align: left;
        color: #303132;
        line-height: 56rpx;
        margin-bottom: 12rpx;
      }

      .phone {
        font-size: 28rpx;
        font-family: "DIN-Medium";
        font-weight: 500;
        text-align: left;
        color: #9ea0a8;
        line-height: 34rpx;
      }

      .arror {
        width: 32rpx;
        height: 32rpx;
      }
    }

    .activation {
      width: 100%;
      height: 252rpx;
      padding: 0 40rpx 30rpx 40rpx;

      .btns {
        display: flex;
        justify-content: space-between;

        >button {
          width: 284rpx;
          height: 68rpx;
          font-size: 26rpx;
          font-weight: bold;
          text-align: center;
          padding: 0;
          margin: 0;
        }
      }
    }

    .hasActivate {
      background: url('../static/images/mine/bg_mime_jhm2@2x.png') no-repeat;
      background-size: contain;

      .top {
        display: flex;
        align-items: center;
        padding-top: 32rpx;

        >text {
          font-size: 28rpx;
          font-weight: bold;
          text-align: left;
          color: #ffffff;
          line-height: 40rpx;
        }
      }

      .icon_vip {
        width: 44rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }

      .expireDate {
        font-size: 24rpx;
        font-weight: 500;
        text-align: left;
        color: #ffda77;
        line-height: 34rpx;
        margin: 24rpx 0;
      }

      .btns>button {
        border-radius: 10rpx;
      }

      .xf {
        background: #5771ff;
        border: 2rpx solid #afbcff;
        color: #fff;
      }

      .buy {
        background: #0d2392;
        border: 2rpx solid #0d2392;
        color: #fff;
      }
    }

    .noActivate {
      background: url("../static/images/mine/bg_mime_jhm1@3x.png") no-repeat;
      background-size: contain;
      padding-top: 94rpx;

      .text {
        font-size: 24rpx;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 34rpx;
        margin-bottom: 26rpx;
      }

      .btns>button {
        border-radius: 8rpx;
      }

      .jh {
        background: #E9EAED;
        color: #37383b;
      }

      .buy {
        background: linear-gradient(135deg, #5470ff, #4160fb);
        color: #fff;
      }
    }
  }

  .my_assets {
    width: 100%;
    height: 448rpx;
    background-color: #fff;
    margin: 24rpx 0;
    padding: 40rpx;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;

      .title {
        font-size: 36rpx;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 50rpx;
        display: flex;
        align-items: center;
      }

      .coin {
        font-size: 26rpx;
        font-weight: 400;
        text-align: left;
        color: #9b9da5;
        line-height: 36rpx;
      }

      .icon {
        @include extend-click();
        width: 40rpx;
        height: 40rpx;
        cursor: pointer;

        &.open {
          background: url("../static/images/icon_open@3x.png") no-repeat;
          background-size: contain;
        }

        &.close {
          background: url("../static/images/icon_close@3x.png") no-repeat;
          background-size: contain;
        }
      }
    }

    .value {
      font-size: 56rpx;
      font-family: "DIN-Bold";
      font-weight: 700;
      text-align: left;
      color: #37383b;
      line-height: 68rpx;
    }

    .balance {
      font-size: 26rpx;
      font-weight: 400;
      text-align: left;
      color: #9b9da5;
      line-height: 36rpx;
      margin-top: 8rpx;
      margin-bottom: 48rpx;
    }

    .block {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 0 30rpx;
    }

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        width: 60rpx;
        height: 60rpx;
        margin-bottom: 20rpx;
      }

      .text {
        font-size: 28rpx;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 40rpx;
      }
    }
  }

  .at-box-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .at-box-btn>view {
    width: 23%;
    height: 70upx;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 28upx;
    background: rgba(255, 255, 255, 0.3);
  }

  .at-box-number {
    font-size: 66upx;
    color: #fff;
  }

  .at-box-title {
    font-size: 32upx;
    color: #fff;
  }

  .at-box {
    width: 100%;
    height: 254upx;
    padding: 20upx 50upx 30upx 50upx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  >>>.uni-popup {
    z-index: 2001 !important;
  }

  .pb-input {
    background: #f2f2f2;
    height: 88upx;
  }

  .pb-input>input {
    width: 100%;
    height: 100%;
    padding: 0 20upx;
  }

  .pb-place {
    font-size: 28upx;
    color: #8c8c8c;
  }

  .pb-btn-box>view {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96upx;
  }

  .popup-box {
    background: #fff;
    width: 620upx;
    border-radius: 10px;
    background: #fff;
  }

  .user-option {
    background: #fff;

    >.user-option-list {
      padding: 34rpx 40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &.active {
        &:active {
          background-color: rgba(80, 80, 80, 0.05);
        }
      }
    }

    .uol-left {
      display: flex;
      align-items: center;
    }

    .arrow {
      width: 32rpx;
      height: 32rpx;
    }

    .value {
      font-size: 32rpx;
      font-family: "DIN-Medium";
      font-weight: bold;
      text-align: right;
      color: #9ea0a8;
      line-height: 38rpx;
    }
  }

  .user-l-title {
    padding-left: 24rpx;
    font-size: 30rpx;
    font-weight: bold;
    text-align: left;
    color: #37383b;
    line-height: 42rpx;
  }

  .user-icon image {
    width: 48upx;
    height: 48upx;
  }

  .uil-box {
    padding-left: 40upx;
  }

  .uil-b-title {
    font-size: 28upx;
    color: #fff;
    padding: 2px 0;
  }

  .uil-b-userName {
    font-size: 36upx;
    color: #fff;
    font-weight: bold;
    padding-bottom: 2px;
    width: 400upx;
    display: -webkit-box;
    /** 对象作为伸缩盒子模型显示 **/
    overflow: hidden;
    word-break: break-all;
    /* break-all(允许在单词内换行。) */
    text-overflow: ellipsis;
    /* 超出部分省略号 */
    -webkit-box-orient: vertical;
    /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 1;
    /** 显示的行数 **/
  }

  .user-infos-left {
    display: flex;
    align-items: center;
  }

  .user-infos-right {
    text-align: center;
  }

  .uir-title {
    font-size: 24upx;
    color: #ffffff;
  }

  .user-infos {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0upx 40upx;
    height: 200upx;
  }

  .user-top-set {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 40upx;
    height: 88upx;
  }

  .user-top {
    width: 100%;
    height: 386upx;
    background: url(../static/image/user-bg.png) no-repeat center;
    background-size: 100% 100%;
  }
</style>
