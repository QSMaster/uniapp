<template>
  <view class="container">
    
    <nav-bar ref="navBar" :backState="1000" :scrollTop="scrollTop" transparentFixedFontColor="#FFFFFF" bgColor="#FFFFFF"
      fontColor="#010F14" type="transparentFixed" title="邀请分享" shadow>
    </nav-bar>
    
    <view class="community-box">
      <!-- 直推人数 -->
      <view class="community-list-box">
        <view class="clb-topTitle">直推人数</view>
        <view class="clb-box">
          <view class="clb-b-box">
            <view class="clb-b-number">{{ zhituiInfos?zhituiInfos.active:"0" }}</view>
            <view class="clb-b-iconbox">
              <view class="clb-b-iconbox-title">已激活</view>
            </view>
          </view>
          <view class="clb-b-line"></view>
          <view class="clb-b-box">
            <view class="clb-b-number">{{ zhituiInfos?zhituiInfos.notActive:"0" }}</view>
            <view class="clb-b-iconbox">
              <view class="clb-b-iconbox-title">未激活</view>
            </view>
          </view>
        </view>
        <view class="clb-box">
          <view class="clb-b-box">
            <view class="clb-b-number">{{ zhituiInfos?zhituiInfos.sumProfit:"0.00" }}</view>
            <view class="clb-b-iconbox">
              <view class="clb-b-iconbox-title">直推总盈利(USDT)</view>
            </view>
          </view>
          <view class="clb-b-line"></view>
          <view class="clb-b-box">
            <view class="clb-b-number blue">{{ zhituiInfos?zhituiInfos.dayProfit:"0.00" }}</view>
            <view class="clb-b-iconbox">
              <view class="clb-b-iconbox-title">直推今日盈利(USDT)</view>
            </view>
          </view>
        </view>
      </view>
      <view style="width: 100%;height: 68upx;"></view>

      <!-- 社区人数 -->
      <view class="community-list-box">
        <view class="clb-topTitle">社区人数</view>
        <view class="clb-box">
          <view class="clb-b-box">
            <view class="clb-b-number">{{ shequInfos?shequInfos.active:"0" }}</view>
            <view class="clb-b-iconbox">
              <view class="clb-b-iconbox-title">已激活</view>
            </view>
          </view>
          <view class="clb-b-line"></view>
          <view class="clb-b-box">
            <view class="clb-b-number">{{ shequInfos?shequInfos.notActive:"0" }}</view>
            <view class="clb-b-iconbox">
              <view class="clb-b-iconbox-title">未激活</view>
            </view>
          </view>
        </view>
        <view style="width: 100%;height: 30upx;"></view>
        <view class="clb-box">
          <view class="clb-b-box">
            <view class="clb-b-number">{{ shequInfos?shequInfos.sumProfit:"0" }}</view>
            <view class="clb-b-iconbox">
              <view class="clb-b-iconbox-title">社区总盈利</view>
            </view>
          </view>
          <view class="clb-b-line"></view>
          <view class="clb-b-box">
            <view class="clb-b-number blue">{{ shequInfos?shequInfos.dayProfit:"0" }}</view>
            <view class="clb-b-iconbox">
              <view class="clb-b-iconbox-title">社区今日盈利</view>
            </view>
          </view>
        </view>
      </view>
      <view style="width: 100%;height: 70upx;"></view>

      <view class="community-list-box autoHeight">
        <view class="clb-topTitle">社区人数</view>
        <view class="market">
          <view class="head">
            <view class="item label">手机号/注册时间</view>
            <view class="item label">日盈利(USDT)/推荐人数</view>
            <view class="item label">状态</view>
          </view>
          <view class="rowWrap">
            <z-paging ref="paging" :auto-height="true" @query="queryList" :list.sync="dataList">
              <view class="row hairline--top" v-for="(item,index) in dataList" :key="item.name">
                <view class="item first">
                  <view class="number">{{item.username}}</view>
                  <view class="time">{{item.createTime}}</view>
                </view>
                <view class="item">
                  <view class="number">{{item.profit | qff(2)}}</view>
                  <view class="time">{{item.referrerNum}} people</view>
                </view>
                <view class="item">
                  <view class="increase">{{item.isActive===1?'已激活':'未激活'}}</view>
                </view>
              </view>
            </z-paging>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom">
      <view class="btn" @click="goShare">邀请好友</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        scrollTop: 0,
        dataList: [],
        zhituiInfos: {}, //直推人数
        shequInfos: {}, //社区人数
      };
    },
    onLoad() {
      this.getGroupList();
      this.getReferrerList();
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onPullDownRefresh() {
      setTimeout(() => {
        this.getGroupList()
        this.getReferrerList()
        this.$refs.paging.reload();
        uni.stopPullDownRefresh();
      }, 1000);
    },
    methods: {
      //获取直推用户
      queryList(pageNo, pageSize) {
        this.$api.getUserList({
            pageNum: pageNo,
            pageSize: pageSize
          },
          res => {
            this.$refs.paging.complete(res.result.list);
          }
        );
      },

      goShare() {
        uni.navigateTo({
          url: "./share"
        })
      },

      //获取社区人数
      getGroupList() {
        this.$api.getGroup({}, res => {
          this.shequInfos = res.result;
        });
      },
      //获取直推人数
      getReferrerList() {
        this.$api.getReferrer({}, res => {
          this.zhituiInfos = res.result;
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background: url(../../static/images/mine/bg_sq@3x.png) no-repeat;
    background-size: contain;
    padding-top: 620rpx;
    background-color: #FAFAFD;
  }


  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #FFFFFF;
    padding: 40rpx 30rpx;

    .btn {
      width: 100%;
      height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;
      font-size: 32rpx;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      line-height: 96rpx;
    }
  }

  .community-box {
    padding: 0 30upx 0upx 30upx;
  }

  .market {

    .head,
    .row {
      display: flex;
      justify-content: space-between;
      padding: 0 30rpx;
      align-items: center;

      .label {
        font-size: 24rpx;
        color: #9EA0A8;
      }

      .item {
        display: flex;
        flex-direction: column;

        &:last-child {
          text-align: right;
          display: flex;
          justify-content: flex-end;
        }

        &:nth-child(2) {
          flex: 1;
          text-align: left;
          display: flex;
          align-items: flex-start;
        }

        &:first-child {
          width: 280rpx;
        }

        .number {
          font-size: 28rpx;
          font-family: DIN-Medium;
          font-weight: bold;
          text-align: left;
          color: #37383b;
          line-height: 34rpx;
        }

        .time {
          font-size: 24rpx;
          font-family: DIN-Regular;
          text-align: left;
          color: #9ea0a8;
          line-height: 30rpx;
          margin-top: 12rpx;
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

        .increase {
          font-size: 28rpx;
          text-align: right;
          color: #9ea0a8;
        }
      }
    }

    .rowWrap {
      max-height: 972rpx;
      overflow: auto;
    }

    .row {

      height: 160rpx;
    }

    .head {
      height: 72rpx;
      background-color: #F7F8FE;
    }
  }


  .community-list-box {
    width: 690rpx;
    height: 364rpx;
    background: #ffffff;
    border-radius: 30rpx;
    box-shadow: 0rpx 4rpx 8rpx 0rpx #eff1fe;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.autoHeight {
      height: auto;
      max-height: 1118rpx;
      padding: 74rpx 0 0 0;
      margin-bottom: 322rpx;
    }

    .clb-topTitle {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      top: -32upx;
      width: 176rpx;
      height: 64rpx;
      background: url(../../static/images/mine/icon_sq1@2x.png) no-repeat;
      background-size: contain;
      font-size: 28rpx;
      font-weight: bold;
      color: #ffffff;
      line-height: 64rpx;
    }

    .clb-box {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 29rpx 0;
      border-radius: 5px;

      >.clb-b-box {
        width: 49.9%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .clb-b-line {
        width: 2rpx;
        height: 94rpx;
        border: 2rpx solid #f3f3f3;
      }
    }

    .clb-b-number {
      font-size: 40rpx;
      font-family: DIN-Bold;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 48rpx;

      &.blue {
        color: #06a37a;
      }
    }

    .clb-b-iconbox {
      display: flex;
      align-items: center;

      &-title {
        font-size: 28rpx;
        text-align: center;
        color: #9ea0a8;
        line-height: 40rpx;
        margin-top: 12rpx;
      }
    }
  }
</style>
