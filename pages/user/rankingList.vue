<template>
  <view class="container">
    <nav-bar ref="navBar" :backState="2000" :scrollTop="scrollTop" transparentFixedFontColor="#FFFFFF" bgColor="#FFFFFF"
      fontColor="#010F14" type="transparentFixed" title="排行榜" shadow>
    </nav-bar>

    <view class="block">
      <image src="../../static/images/leaderboard/bg_phb@3x.png" mode="aspectFit"></image>
    </view>

    <!-- 排行榜 -->
    <view class="content">
      <view class="tabsWrap">
        <v-tabs paddingItem="0px 25rpx 0px 25rpx" v-model="currentIndex" :tabs="tabs" :scroll="true" bgColor="#FFFFFF"
          color="#9EA0A8" activeColor="#37383B" height="110rpx" lineColor="#4160FB" lineHeight="6rpx" fontSize="32rpx"
          :lineScale="0.25" @change="changeTab" marginItem="0 0 0 0"></v-tabs>
      </view>

      <view class="unit">单位：USDT</view>
      <view class="top3">
        
        <view class="top3_item">
          <image class="logo" src="../../static/images/leaderboard/ph_top2@3x.png" mode="aspectFit"></image>
          <image class="avatar" :src="twoUser.avatar" mode="aspectFit" v-if="twoUser.avatar"></image>
          <image class="avatar" src="../../static/images/leaderboard/icon_avatar@3x.png" mode="aspectFit" v-else>
          </image>
          <view class="phone">{{twoUser.phone || '--'}}</view>
          <view class="number">{{twoUser.todyAmount | qff(2)}}</view>
        </view>
        
        
        <view class="top3_item">
          <image class="logo" src="../../static/images/leaderboard/ph_top1@3x.png" mode="aspectFit"></image>
          <image class="avatar" v-if="oneUser.avatar" :src="oneUser.avatar" mode="aspectFit"></image>
          <image class="avatar" v-else src="../../static/images/leaderboard/icon_avatar@3x.png" mode="aspectFit">
          </image>
          <view class="phone">{{oneUser.phone || '--'}}</view>
          <view class="number">{{oneUser.todyAmount | qff(2)}}</view>
        </view>

       

        <view class="top3_item">
          <image class="logo" src="../../static/images/leaderboard/ph_top3@3x.png" mode="aspectFit"></image>
          <image class="avatar" :src="threeUser.avatar" mode="aspectFit" v-if="threeUser.avatar"></image>
          <image class="avatar" src="../../static/images/leaderboard/icon_avatar@3x.png" mode="aspectFit" v-else>
          </image>
          <view class="phone">{{threeUser.phone || '--'}}</view>
          <view class="number">{{threeUser.todyAmount | qff(2)}}</view>
        </view>
      </view>
      <view class="line"></view>
      
      <view class="market">
        <view class="head">
          <view class="item label">排名</view>
          <view class="item label">账户</view>
          <view class="item label">收益 (USDT)</view>
        </view>

        <view class="row hairline--top" v-for="(item,index) in list" :key="item.name">
          <view class="item first">
            <view class="number">{{index | number}}</view>
          </view>
          <view class="item price">
            <image class="coin" :src="item.avatar" mode="aspectFit" v-if="item.avatar"></image>
            <image class="coin" src="../../static/images/leaderboard/icon_avatar@3x.png" mode="aspectFit" v-else>
            </image>
            <view class="coinone">{{item.phone || '--'}}</view>
          </view>
          <view class="item">
            <view class="increase">{{item.todyAmount | qff(2)}}</view>
          </view>
        </view>
      </view>
      <view style="width: 100%;height: 160rpx; background-color: #fafafd;"></view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        scrollTop: 0,
        list: [],
        currentIndex: 0,
        tabs: ['昨日收益', '本月收益', '历史累计收益'], //选项卡
        oneUser: {},
        twoUser: {},
        threeUser: {}
      }
    },
    onShow() {
      this.rankingList();
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    filters: {
      number(index) {
        let no = index + 4
        if (no < 10) {
          no = '0' + no
        }
        return no
      }
    },
    methods: {
      //获取排行榜
      rankingList() {
        let type = this.currentIndex === 0 ? 'yesterday' : (this.currentIndex === 1 ? 'month' : 'total')
        this.$api.rankingsList({
          type
        }, res => {
          if (res.code === 200 && res.result.length) {
            const list = res.result || []
            this.list = list.slice(4) || []
            this.oneUser = list[0]
            this.twoUser = list[1]
            this.threeUser = list[2]
          } else {
            this.list = []
            this.oneUser = {}
            this.twoUser = {}
            this.threeUser = {}
          }
        })
      },

      changeTab(index) {
        console.log(index);
        this.currentIndex = index
        this.rankingList()
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;

    .block>image {
      width: 750rpx;
      height: 560rpx;
      background: url(../../static/images/leaderboard/bg_phb@3x.png) no-repeat;
      background-size: contain;
    }
  }

  .content {
    position: relative;
    background-color: #FFFFFF;
    margin-top: -40rpx;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    overflow: hidden;
    padding-top: 20rpx;
    .tabsWrap {
      padding-left: 18rpx;
    }

    .unit {
      font-size: 28rpx;
      font-weight: 500;
      text-align: left;
      color: #cbcdd2;
      line-height: 40rpx;
      margin-bottom: 108rpx;
      margin-top: 30rpx;
      padding-left: 40rpx;
    }

    .line {
      width: 750rpx;
      height: 24rpx;
      background: #fafafd;
    }
  }

  .top3 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 60rpx;
    padding: 0 40rpx;

    &_item {
      width: 208rpx;
      height: 276rpx;
      background: linear-gradient(180deg, rgba(65, 96, 251, 0.15), rgba(65, 96, 251, 0.00));
      border-radius: 16rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      &:first-child {
        .number {
          color: #737e8f;
        }
      }

      &:nth-child(2) {
        position: relative;
        top: -70rpx;

        .number {
          color: #e19e36;
        }
      }

      &:last-child {
        .number {
          color: #b88147;
        }
      }

      .logo {
        width: 72rpx;
        height: 56rpx;
        margin-top: -25rpx;
      }

      .avatar {
        width: 80rpx;
        height: 80rpx;
        margin-top: 16rpx;
        border: 2px solid #FFFFFF;
        border-radius: 100rpx;
      }

      .phone {
        font-size: 28rpx;
        font-family: DIN, DIN-Regular;
        font-weight: 400;
        text-align: center;
        color: #37383b;
        line-height: 34rpx;
        height: 34rpx;
        margin-top: 20rpx;
        margin-bottom: 12rpx;
      }

      .number {
        font-size: 32rpx;
        font-family: DIN, DIN-Bold;
        font-weight: 700;
        text-align: center;
        color: #b88147;
        line-height: 38rpx;
      }
    }
  }

  .market {

    .head,
    .row {
      display: flex;
      justify-content: space-between;
      padding: 0 30rpx;
      align-items: center;

      .label {
        font-size: 28rpx;
        font-weight: bold;
        color: #9ea0a8;
      }

      .item {
        &:last-child {
          text-align: right;
          display: flex;
          justify-content: flex-end;
        }

        &:nth-child(2) {
          flex: 1;
          text-align: left;
          display: flex;
        }

        &:first-child {
          width: 112rpx;
        }

        .number {
          font-size: 28rpx;
          font-family: DIN-Medium;
          font-weight: bold;
          text-align: left;
          color: #9ea0a8;
        }

        .coin {
          width: 64rpx;
          height: 64rpx;
          margin-right: 20rpx;
        }

        .coinone {
          font-size: 28rpx;
          font-family: DIN-Medium;
          font-weight: 500;
          text-align: left;
          color: #37383b;
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
          font-size: 36rpx;
          font-family: DIN-Bold;
          font-weight: bold;
          text-align: right;
          color: #4160fb;
        }
      }
    }

    .row {
      height: 120rpx;
    }

    .head {
      height: 104rpx;
    }
  }
</style>
