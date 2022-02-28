<template>
  <view class="content">
    <nav-bar title="首页" bgColor="#FFFFFF" fontColor="#010F14" :shadow="false" backState="2000"></nav-bar>

    <view class="functionality">
      <view class="banner-content">
        <swiper @change="change" circular class="swiper" :autoplay="true" :interval="4000" :duration="500"
          indicator-dots indicator-color="rgba(255,255,255,0.3)" indicator-active-color="#ffffff">
          <swiper-item class="swiper-item" v-for="(item, index) in slides" :key="index">
            <image class="img" :src="item.image" mode="aspectFill"></image>
          </swiper-item>
        </swiper>
      </view>
      <!-- 公告  -->
      <lwNotice :showScale="false" @itemClick="toNotice" :list="bulletins" :height="72" backgroundColor="#f5f6f8"
        color="#898a91" ref="lwNotice"></lwNotice>
      <view class="navigate">
        <navigator class="navigate_item" url="/pages/index/noviceTutorial" hover-class="none">
          <image class="navigate_icon" src="../static/images/index/icon_tiles_tutorials@3x.png" mode="aspectFit">
          </image>
          <view class="navigate_text">新手教程</view>
        </navigator>
        <view class="navigate_item" @click="loginJump('/pages/user/recharge')">
          <image class="navigate_icon" src="../static/images/index/icon_tiles_recharge@3x.png" mode="aspectFit"></image>
          <view class="navigate_text">充币</view>
        </view>
        <view class="navigate_item" @click="loginJump('/pages/user/apiboard?open=true')">
          <image class="navigate_icon" src="../static/images/index/icon_tiles_api@3x.png" mode="aspectFit"></image>
          <view class="navigate_text">API绑定</view>
        </view>
        <view class="navigate_item" @click="loginJump('/pages/user/share')">
          <image class="navigate_icon" src="../static/images/index/icon_tiles_invite@3x.png" mode="aspectFit"></image>
          <view class="navigate_text">邀请好友</view>
        </view>
      </view>
    </view>

    <!-- 我的收益 -->
    <view class="my_earnings">
      <view class="top">
        <view class="title">我的收益 <text class="coin">(USDT)</text></view>
        <view class="icon" :class="isEye?'close':'open'" @click="handleEye"></view>
      </view>
      <view class="value">{{todayIncome | eye(isEye)}}</view>
      <view class="today_earnings">今日收益</view>
      <view class="bottom">
        <view class="item">
          <view class="value">{{monthIncome | eye(isEye)}}</view>
          <view class="label">本月累计收益</view>
        </view>
        <view class="item">
          <view class="value">{{totalIncome | eye(isEye)}}</view>
          <view class="label">历史累计收益</view>
        </view>
      </view>
    </view>

    <!-- 市场行情 -->
    <view class="market">
      <view class="title">市场行情</view>
      <view class="head">
        <view class="item label">交易对</view>
        <view class="item label">最新价</view>
        <view class="item label">24H涨幅</view>
      </view>

      <view class="row hairline--top" v-for="(item,index) in quotation" :key="item.name">
        <view class="item first">
          <image class="coin" :src="`../static/coins/${item.name.split('/')[0]}.svg`" mode="aspectFit"></image>
          <view class="coinone">{{item.name.split('/')[0]}}</view>
          <view class="cointwo">/{{item.name.split('/')[1]}}</view>
        </view>
        <view class="item price">${{item.price}}</view>
        <view class="item">
          <view class="increase" :class="{fall: item.proportion.indexOf('-') !== -1}">{{item.proportion}}</view>
        </view>
      </view>
    </view>
    <view style="width: 100%;height: 260rpx; background-color: #fafafd;"></view>
  </view>
</template>

<script>
  import lwNotice from '../components/lw-notice/lw-notice.vue'
  import {
    mapState
  } from 'vuex';

  export default {
    components: {
      lwNotice
    },
    data() {
      return {
        bulletins: [], // 公告
        todayIncome: 0, // 今日收益
        monthIncome: 0, // 本月收益
        totalIncome: 0, // 历史累计收益
        isEye: false, // 是否显示我的收益
        slides: [], // 轮播数据
        quotation: [], // 实时数据
        curActive: 0,
        timer: null, //定时器
      };
    },
    computed: {
      ...mapState({
        isLoginStatus: state => state.isLogin
      })
    },
    onShow() {
      this.isEye = uni.getStorageSync('isEye') || false
      this.sysVersion()
      this.noticeList();
      this.bannerList();
      this.getIndexQuotation();
      if(this.isLoginStatus) {
        this.getUserIncome()
      }
    },
    onHide() {
      this.$refs.lwNotice.resetPage()
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    methods: {
      // 轮播图列表
      bannerList() {
        this.$api.bannerList({}, res => {
          this.slides = res.result;
        });
      },

      // 我的收益
      getUserIncome() {
        this.$api.getUserIncome({}, res => {
          const data = res.result
          this.todayIncome = data.dayProfit
          this.monthIncome = data.monthProfit
          this.totalIncome = data.totalProfit
        });
      },

      //获取公告
      noticeList() {
        this.$api.noticeList({
          pageNum: 1,
          pageSize: 10,
        }, res => {
          if (res.result.list.length && res.result.list.length > 0) {
            this.bulletins = res.result.list.map(item => item.title)
          }
        })
      },



      /**
       * 未登录跳转拦截
       * @param {String} url 要跳转的目标链接
       */
      loginJump(url) {
        if (this.isLoginStatus) {
          uni.navigateTo({
            url: url
          })
        } else {
          uni.navigateTo({
            url: 'login/login'
          })
        }
      },




      //获取系统版本
      sysVersion() {
        this.$api.sysVersion({
          deviceType: this.$store.state.platformType
        }, res => {
          if (res.result.version != this.$store.state.version) {
            if (this.timer) {
              clearInterval(this.timer);
              this.timer = null;
            }
            // this.$common.skipTo("/pages/other/versionUpdate")
          } else {
            //验证登录是否失效
            this.isLogin()
            if (this.$refs.paging) {
              setTimeout(() => {
                this.$refs.paging.reload()
              }, 200)
            }
          }
        })
      },

      // 是否展示我的收益
      handleEye() {
        this.isEye = !this.isEye
        this.$nextTick(function() {
          uni.setStorage({
            key: 'isEye',
            data: this.isEye
          })
        })
      },

      itemClick() {
        this.$common.skipTo('/pages/index/notice');
      },

      //验证登录是否失效
      isLogin() {
        let _this = this;
        this.$api.userInfo({}, res => {
          if (res.code === 200) {
            this.$store.state.userInfo = res.result;
            // _this.noticeList();
            // _this.bannerList();
            if (_this.$store.state.indexQuotation) {
              _this.quotation = _this.$store.state.indexQuotation;
            }
            _this.getIndexQuotation();
            if (!_this.timer) {
              _this.timer = setInterval(() => {
                _this.getIndexQuotation();
              }, 3000)
            }
          }
        })
      },

      // 首页行情
      getIndexQuotation() {
        this.$api.getIndexQuotation({}, res => {
          this.quotation = res.result;
          this.$store.state.indexQuotation = res.result;
        });
      },

      change(data) {
        this.curActive = data.detail.current;
      },

      // 公告
      toNotice() {
        this.$common.skipTo('/pages/index/notice');
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../styles/mixin.scss";
  @import "../styles/variable.scss";

  .content {
    position: relative;
    height: 100%;
  }

  .navigate {
    display: flex;
    justify-content: space-around;
    margin-top: 32rpx;

    &_icon {
      width: 96rpx;
      height: 96rpx;
      margin-bottom: 8rpx;
    }

    &_text {
      font-size: 26rpx;
      font-weight: 500;
      text-align: center;
      color: #37383b;
      line-height: 36rpx;
    }
  }

  // 我的收益
  .my_earnings {
    width: 100%;
    height: 406rpx;
    background-color: #fff;
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
      color: #06a37a;
      line-height: 68rpx;
    }

    .today_earnings {
      font-size: 26rpx;
      font-weight: 400;
      text-align: left;
      color: #9b9da5;
      line-height: 36rpx;
      margin-top: 8rpx;
      margin-bottom: 32rpx;
    }

    .bottom {
      display: flex;

      .item {
        display: flex;
        flex-direction: column;

        &:first-child {
          margin-right: 128rpx;
        }

      }

      .value {
        font-size: 40rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: left;
        color: #37383b;
        line-height: 48rpx;
      }

      .label {
        font-size: 26rpx;
        font-weight: 400;
        text-align: left;
        color: #9b9da5;
        line-height: 36rpx;
        margin-top: 8rpx;
      }
    }
  }

  // 市场行情
  .market {
    width: 100%;
    background-color: #fff;
    padding: 40rpx 40rpx 0;
    margin-top: 24rpx;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 50rpx;
    }

    .head,
    .row {
      display: flex;
      justify-content: space-between;

      .label {
        font-size: 26rpx;
        font-weight: 400;

        color: #9b9da5;
        line-height: 36rpx;
      }

      .item {
        &:last-child {
          width: 30%;
          text-align: right;
          display: flex;
          justify-content: flex-end;
        }

        &:nth-child(2) {
          flex: 1;
          text-align: right;
        }

        &.first {
          display: flex;
          align-items: center;
        }

        .coin {
          width: 48rpx;
          height: 48rpx;
          margin-right: 12rpx;
        }

        .coinone {
          font-size: 32rpx;
          font-family: "DIN-Medium";
          font-weight: 500;
          text-align: left;
          color: #37383b;
          line-height: 38rpx;
          margin-right: 4rpx;
        }

        .cointwo {
          font-size: 24rpx;
          font-family: "DIN-Regular";
          font-weight: 400;
          text-align: left;
          color: #9ea0a8;
          line-height: 30rpx;
        }

        &.price {
          font-size: 32rpx;
          font-family: "DIN-Medium";
          font-weight: 500;
          text-align: right;
          color: #37383b;
          line-height: 60rpx;
        }

        .increase {
          width: 144rpx;
          height: 60rpx;
          background: $color-increase-plus;
          border-radius: 6rpx;

          font-size: 28rpx;
          font-family: "DIN-Medium";
          font-weight: 500;
          text-align: center;
          color: #ffffff;
          line-height: 60rpx;

          &.fall {
            background-color: $color-increase-lose;
          }
        }
      }
    }

    .row {
      padding: 32rpx 0;
    }

    .head {
      margin-top: 24rpx;
      padding-bottom: 20rpx;
    }
  }

  .functionality {
    padding: 20rpx 30rpx 40rpx;
    background-color: #fff;
    margin-bottom: 24rpx;
  }

  .swiper {
    width: 690rpx;
    height: 220rpx;
    border-radius: 16rpx;
    overflow: hidden;
    margin-bottom: 24rpx;

    .img {
      width: 100%;
      height: 100%;
    }

    .swiper-item {
      image {
        height: 100%;
      }
    }
  }
</style>
