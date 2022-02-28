<template>
  <view class="container">
    <!-- <nav-bar title="我的收益" fontColor="#ffffff" type="transparentFixed"></nav-bar> -->

    <nav-bar ref="navBar" :scrollTop="scrollTop" transparentFixedFontColor="#ffffff" bgColor="#ffffff"
      fontColor="#010F14" type="transparentFixed" title="我的收益" shadow>
      <!-- <view class="preview" slot="right" @click="clickShai">
				<view class="img-box" style="padding-right: 30upx;">
					<image src="../../static/image/index/shaixuan.png" style="width: 36upx;height: 36upx;"></image>
				</view>
			</view> -->
    </nav-bar>



    <!-- 统计信息 -->
    <view class="statistics">

      <view class="CumulativeProfit_label">{{headerTopTotal.total | qff(6)}}</view>
      <view class="CumulativeProfit_value">累计盈利(USDT)</view>

      <view class="row">
        <view class="block">
          <view class="value">{{headerTopTotal.today | qff(6)}}</view>
          <view class="label">今日盈利(USDT)</view>
        </view>

        <view class="block">
          <view class="value">{{headerTopTotal.weeklyInterestRate || '0.0%'}}</view>
          <view class="label">个人七日年化</view>
        </view>

        <view class="block">
          <view class="value">{{headerTopTotal.annualInterestRate || '0.0%'}}</view>
          <view class="label">个人累计年化</view>
        </view>

      </view>

    </view>


    <view class="content">
      <view class="title hairline--bottom">收益详情</view>

      <view class="listWrap">

        <z-paging ref="paging" :auto-height="false" @query="electronicBillingWeek" :list.sync="dataList" :fixed="false"
          :auto-show-back-to-top="true" :use-page-scroll="true" :refresher-enabled="false">
          <view>
            <view class="item hairline--bottom" v-for="(item,index) in dataList" :key="index">
              <image class="icon" :src="`../../static/coins/${item.symbol.split('/')[0]}.svg`" mode="aspectFit"></image>
              <view class="column">
                <view style="display: flex;align-items: center;">
                  <view class="symbol">{{item.symbol.split('/')[0]}}</view>
                  <view class="pairSmll">/{{item.symbol.split('/')[1]}}</view>
                  <view class="platform">{{item.bourseName}}</view>
                </view>
                <view class="time">{{item.createTime}}</view>
              </view>
              <view class="amount">{{item.profit | qff(2)}}
                <view class="coin">USDT</view>
              </view>
            </view>
          </view>
        </z-paging>



      </view>


    </view>

    <!--
    <view class="billing-box" style="height: calc(100% - 140upx);">
      <view style="padding: 11upx 0;">
        <view class="billing-box-top">
          <view class="billing-box-top-left" :class="{'active':types==1}" @click="changeList(1)">
            <view class="bbtl-title">今日盈利(USDT)</view>
            <view class="bbtl-number">{{headerTopTotal.today}}</view>
          </view>
          <view class="billing-box-top-right" :class="{'active':types==2}" @click="changeList(2)">
            <view class="bbtl-title">累计盈利(USDT)</view>
            <view class="bbtl-number">{{headerTopTotal.total}}</view>
          </view>
        </view>
        <view class="billing-box-top">
          <view class="billing-box-top-left">
            <view class="bbtl-title">个人累计年化率</view>
            <view class="bbtl-number">{{headerTopTotal.annualInterestRate}}</view>
          </view>
          <view class="billing-box-top-right">
            <view class="bbtl-title">个人七天年化率</view>
            <view class="bbtl-number">{{headerTopTotal.weeklyInterestRate}}</view>
          </view>
        </view>
      </view>
      <view style="width: 100%;height: 20upx;background: #F0F0F0;"></view>
      <view class="today-box" style="height: calc(100% - 434upx);">
        <z-paging ref="paging" :auto-height="true" @query="queryList" :list.sync="dataList">
          <view>
            <view class="total-list" v-for="(item,index) in dataList" :key="index">
              <view class="tl-left">
                <view class="tl-l-title">{{item.type}}</view>
                <view class="tl-l-number">{{item.profit}} USDT</view>
              </view>
              <view class="tl-time">{{item.createTime}}</view>
            </view>
            <view style="width: 100%;height: 100upx;"></view>
          </view>
        </z-paging>
      </view>
    </view>

    -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        scrollTop: 0,

        types: 1, //1 今日盈利  2累计盈利 3个人累计年化率 4个人七天年化率
        dataList: [],
        headerTopTotal: {
          today: "0.00", //今日
          total: "0.00", //累计
          annualInterestRate: "0%", //累计年利率
          weeklyInterestRate: "0%", //七天年利率
        }, //上面的累计
      }
    },
    onShow() {
      this.yearAndWeekprofit()

      // this.queryList()

      // setTimeout(() => {
      //   this.$refs.paging.reload()
      // }, 200)


    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    methods: {
      //请求数据
      queryList(pageNo, pageSize) {
        // if (this.types == 1) {
        //   this.electronicBillingToday(pageNo, pageSize);
        // } else if (this.types == 2) {
        //   this.electronicBillingTotle(pageNo, pageSize);
        //   this.incomeList(pageNo, pageSize);
        // }
        this.electronicBillingToday(pageNo, pageSize);
        this.electronicBillingWeek(pageNo, pageSize);
      },

      //年利率账单
      yearAndWeekprofit() {
        this.$api.yearAndWeekprofit({}, res => {
          console.log(res)
          this.headerTopTotal.annualInterestRate = res.result.annualInterestRate;
          this.headerTopTotal.weeklyInterestRate = res.result.weeklyInterestRate;
        })
      },



      //电子账单(今日)
      electronicBillingToday(pageNo, pageSize) {
        this.$api.electronicBillingToday({
          pageNum: pageNo,
          pageSize: pageSize,
        }, res => {
          this.headerTopTotal.today = res.result.todayProfit;
          this.headerTopTotal.total = res.result.totleProfit;
          // this.$refs.paging.complete(res.result.list);
        })
      },

      //电子账单(最近一周)
      electronicBillingWeek(pageNo, pageSize) {

        this.electronicBillingToday(pageNo, pageSize)

        this.$api.incomeList({
          pageNum: pageNo,
          pageSize: pageSize,
        }, res => {
          // this.headerTopTotal.today = res.result.todayProfit;
          // this.headerTopTotal.total = res.result.totleProfit;
          this.$refs.paging.complete(res.result.list);
        })
      },


      //电子账单(累计)
      electronicBillingTotle(pageNo, pageSize) {
        this.$api.electronicBillingTotle({
          pageNum: pageNo,
          pageSize: pageSize
        }, res => {
          this.headerTopTotal.today = res.result.todayProfit;
          this.headerTopTotal.total = res.result.totleProfit;
          this.$refs.paging.complete(res.result.list);
        })
      },
      //切换展示盈利
      changeList(index) {
        this.types = index;
        this.$refs.paging.reload();
      }
    }
  }
</script>

<style scoped lang="scss">
  .statistics {
    width: 100%;
    height: 600rpx;
    background: url(../../static/images/mine/bg_mine_income@2x.png) no-repeat;
    background-size: contain;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 40rpx 116rpx;

    .CumulativeProfit_label {
      font-size: 48rpx;
      font-family: DIN-Medium;
      font-weight: 500;
      color: #ffffff;
      line-height: 58rpx;
    }

    .CumulativeProfit_value {
      opacity: 0.6;
      font-size: 24rpx;
      color: #ffffff;
      line-height: 34rpx;
      margin-top: 16rpx;
      margin-bottom: 48rpx;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }

    .block {
      display: flex;
      flex-direction: column;

      &:nth-child(2) {
        text-align: center;
      }

      &:last-child {
        align-items: flex-end;
      }
    }

    .value {
      font-size: 32rpx;
      font-family: DIN-Medium;
      font-weight: 500;
      text-align: left;
      color: #ffffff;
      line-height: 38rpx;
      height: 38rpx;
    }

    .label {
      font-size: 24rpx;
      text-align: right;
      color: #ffffff;
      line-height: 34rpx;
      margin-top: 16rpx;
      opacity: 0.6;
    }
  }


  .content {
    position: relative;
    margin-top: -40rpx;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    background-color: #FFFFFF;

    .title {
      height: 126rpx;
      font-size: 32rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 44rpx;
      padding-top: 40rpx;
      padding-left: 40rpx;
    }
  }

  .listWrap {
    padding: 0 40rpx;

    .item {
      display: flex;
      padding: 28rpx 0;
      align-items: center;

      .icon {
        width: 48rpx;
        height: 48rpx;
        margin-right: 20rpx;
      }

      .symbol {
        font-size: 36rpx;
        font-family: DIN-Medium;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 44rpx;
        // margin-bottom: 14rpx;
      }

      .pairSmll {
        font-size: 28rpx;
        font-family: DIN-Regular;
        font-weight: 400;
        text-align: left;
        color: #9ea0a8;
        line-height: 34rpx;
      }

      .platform {
        // width: 72rpx;
        height: 36rpx;
        background: rgba(65, 96, 251, 0.10);
        border-radius: 4rpx;
        padding: 0 12rpx;

        font-size: 24rpx;
        font-weight: 500;
        text-align: center;
        color: #4160fb;
        line-height: 36rpx;
        margin-left: 16rpx;
      }

      .column {
        margin-right: auto;
      }

      .time {
        font-size: 24rpx;
        font-family: DIN-Regular;
        font-weight: 400;
        text-align: left;
        color: #9ea0a8;
        line-height: 30rpx;
        margin-top: 14rpx;
      }

      .amount {
        height: 44rpx;
        font-size: 36rpx;
        font-family: DIN-Bold;
        font-weight: bold;
        text-align: right;
        color: #06a37a;
        line-height: 44rpx;
        display: flex;
        // align-items: center;
        // align-items: flex-end;
        // vertical-align: bottom;

        >.coin {
          font-size: 26rpx;
          font-weight: inherit;
          // color: red;
          align-self: flex-end;
          line-height: 38rpx;
          margin-left: 8rpx;
        }
      }
    }
  }


  .billing-box-top .active {
    border-color: #dd6212;
  }

  .billing-box-top>view {
    border: 1px solid transparent;
    border-radius: 6px;
  }

  .tl-l-number {
    font-size: 28upx;
    color: #07CBAF;
  }

  .tl-l-title {
    font-size: 28upx;
    color: #999999;
    padding-right: 100upx;
  }

  .tl-left {
    display: flex;
    align-items: center;
  }

  .tl-time {
    font-size: 24upx;
    color: #D2D2D2;
  }

  .total-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #F0F0F0;
    padding: 30upx;
  }

  .tody-list-box-line:last-of-type {
    height: 0;
  }

  .tody-list-box-line {
    width: 100%;
    height: 20upx;
    background: #F0F0F0;
  }

  .today-box span {
    font-size: 28upx;
    color: #07CBAF;
  }

  .tody-list>view {
    color: #989898;
    font-size: 28upx;
    display: flex;
    align-items: center;
    padding: 10upx 0;
  }

  .tody-list {
    padding: 30upx 30upx;
  }

  .bbtl-title {
    font-size: 24upx;
    color: #fff;
  }

  .bbtl-number {
    font-size: 44upx;
    color: #fff;
  }

  .billing-box-top-left {
    background: url(../../static/image/billing-bg1.png) no-repeat center;
    background-size: 100% 100%;
  }

  .billing-box-top-right {
    background: url(../../static/image/billing-bg2.png) no-repeat center;
    background-size: 100% 100%;
  }

  .billing-box-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11upx 30upx;
  }

  .billing-box-top>view {
    width: 334upx;
    height: 176upx;
    padding: 32upx 20upx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .billing-box {
    height: 100%;
  }

  .container {
    width: 100%;
    height: 100%;
  }
</style>
