<template>
  <view class="container">

    <nav-bar title="交易记录" bgColor="#ffffff" fontColor="#010F14">
    <!--  <view slot="right">
        <view class="img-box" @click="screenClick">
          <image src="../../static/image/jiaoyi-shaixuan.png" style="width: 36upx;height: 36upx;margin-right: 30upx;">
          </image>
        </view>
      </view> -->
    </nav-bar>


    <view class="main">

      <view class="tab">
        <view class="tab_item" :class="{active: tabIndex == index}" v-for="(item, index) in tabs"
          @click="checkTab(item,index)">{{item.val}}</view>
      </view>
      <view class="devier"></view>


      <view class="records-box">
        <z-paging ref="paging" @query="queryList" :list.sync="dataList">
          <view style="background-color: #fff; padding: 0 30rpx;">
            <view class="records-list hairline--bottom" v-for="(item,index) in dataList" :key="index">



              <view class="top">
                <view class="direction" :class="item.type==0?'buy':'sell'">{{item.type==0?"买入":"卖出"}}</view>
                <view class="tradingPair">{{item.symbol}}</view>

                <view class="brouse">{{item.bourseId == 1? '火币pro': '币安'}}</view>
                <!-- <view class="brouse">{{item.bourseId | brouseName(bourselist)}}</view> -->

                <view>

                  <view class="profit" v-if="item.type == 0">补仓次数：{{item.replenishmentTimes}}次</view>

                  <view class="profit" v-else-if="item.type == 1">盈利：{{item.profit | qff(6)}}</view>

                </view>


              </view>




              <view class="row">
                <view class="block">
                  <view class="label">时间</view>
                  <view class="value">{{item.time}}</view>
                </view>

                <view class="block">
                  <view class="label">委托价(USDT)</view>
                  <view class="value">{{item.orderPriceLimit}}</view>
                </view>

                <view class="block">
                  <view class="label">交易量({{item.symbol.split('/')[0]}})</view>
                  <view class="value">{{item.turnover}}</view>
                </view>



              </view>




              <view class="row">
                <view class="block">
                  <view class="label">成交总额(USDT)</view>
                  <view class="value">{{item.turnover | qff(4)}}</view>
                </view>

                <view class="block">
                  <view class="label">成交均价(USDT)</view>
                  <view class="value">{{item.avgTransactionPrice | qff(6)}}</view>
                </view>

                <view class="block">
                  <view class="label">手续费({{item.symbol.split('/')[0]}})</view>
                  <view class="value">{{item.brokerage | qff(4)}}</view>
                </view>



              </view>





              <!--   <view class="rl-left">
                <view class="rl-left-img" :class="{'rl-r-t-t-sell':item.type==1}">{{item.type==0?"买":"卖"}}</view>
              </view> -->

              <!-- <view class="rl-right">
                <view class="rl-r-topbox">
                  <view class="rl-r-top">
                    <view>
                      <span class="rl-r-t-type"
                        :class="{'rl-r-t-t-sell':item.type==1}">{{item.type==0?"买入":"卖出"}}</span>
                      <span class="rl-r-t-coin">{{item.symbol}}</span>
                    </view>
                    <view class="rl-r-t-name">{{item.bourseId}}</view>
                  </view>
                  <view class="rl-r-time">时间：{{item.createTime}}</view>
                </view>
                <view style="width: 100%;height: 18upx;"></view>
                <view class="rl-r-list">
                  <view class="rl-r-l-title">订单编号:</view>
                  <view class="rl-r-l-number">{{item.orderId}}</view>
                </view>
                <view class="rl-r-list">
                  <view class="rl-r-l-title">下单数量:</view>
                  <view class="rl-r-l-number">{{item.orderQuantity}}</view>
                </view>
                <view class="rl-r-list">
                  <view class="rl-r-l-title">下单限价:</view>
                  <view class="rl-r-l-number">{{item.orderPriceLimit}}</view>
                </view>
                <view class="rl-r-list">
                  <view class="rl-r-l-title">成交数量:</view>
                  <view class="rl-r-l-number">{{item.turnover}}</view>
                </view>
                <view class="rl-r-list">
                  <view class="rl-r-l-title">成交均价:</view>
                  <view class="rl-r-l-number">{{item.avgTransactionPrice}}</view>
                </view>
                <view class="rl-r-list">
                  <view class="rl-r-l-title">手&nbsp;续&nbsp;&nbsp;费:</view>
                  <view class="rl-r-l-number">{{item.brokerage}}</view>
                </view>
                <view class="rl-r-list">
                  <view class="rl-r-l-title">补仓次数:</view>
                  <view class="rl-r-l-number">{{item.replenishmentTimes}}</view>
                </view>
                <view class="rl-r-list">
                  <view class="rl-r-l-title">盈&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;利:</view>
                  <view class="rl-r-l-number">{{item.profit}}</view>
                </view>
              </view> -->
            </view>
          </view>
        </z-paging>
      </view>



    </view>





    <!-- 筛选弹窗 -->
    <uni-popup ref="screenPoupup" type="bottom">
      <view class="screen-box">
        <view class="sreen-box-box">
          <view class="sbb-title">订单状态</view>
          <view class="sbb-type">
            <view :class="{'active':screenInfo.type===''}" @click="screenInfo.type=''">全部</view>
            <view :class="{'active':screenInfo.type===0}" @click="screenInfo.type=0">买入</view>
            <view :class="{'active':screenInfo.type===1}" @click="screenInfo.type=1">卖出</view>
          </view>
          <view class="sbb-title">交易所</view>
          <view class="sbb-input">
            <input type="text" v-model="screenInfo.exchange" />
          </view>
          <view class="sbb-title">交易币对查询</view>
          <view class="sbb-input">
            <input type="text" v-model="screenInfo.coin" />
          </view>
          <view class="sbb-remark">如：查询BTC/USDT，请填写btcusdt</view>
          <view class="sbb-title">时间</view>
          <view class="sbb-time-input">
            <view class="sbb-time-box">
              <picker mode="date" :value="screenInfo.startTime" @change="setStratTime">
                <view class="uni-input">{{screenInfo.startTime}}</view>
              </picker>
            </view>
            <view>至</view>
            <view class="sbb-time-box">
              <picker mode="date" :value="screenInfo.endTime" @change="setEndTime">
                <view class="uni-input">{{screenInfo.endTime}}</view>
              </picker>
            </view>
          </view>
        </view>
        <view style="width: 100%;height: 100upx;"></view>
        <view class="sbb-btn">
          <view class="sbb-btn-cancel" @click="setAgin">重置</view>
          <view class="sbb-btn-ok" @click="comfirmGo">确认</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        bourselist: [],

        tabIndex: '',

        tabs: [{
            id: '',
            val: '全部'
          },
          {
            id: 0,
            val: '买入'
          },
          {
            id: 1,
            val: '卖出'
          },
        ],

        screenInfo: {
          type: "", //''全部 0买入 1卖出
          exchange: "", //交易所
          coin: "", //交易对
          startTime: "", //开始时间
          endTime: "", //结束时间
        },
        dataList: [], //数据列表
      }
    },
    onShow() {
      console.log(this.$store.state.bourseArray)
      this.getbourselist()
    },
    methods: {
      //获取数据列表
      queryList(pageNo, pageSize) {
        let _this = this;
        this.$api.transactionRecords({
          pageNum: pageNo,
          pageSize: pageSize,
          bourseName: _this.screenInfo.exchange,
          createTime: _this.screenInfo.startTime,
          endTime: _this.screenInfo.endTime,
          orderId: "",
          symbol: _this.screenInfo.coin,
          type: _this.screenInfo.type,
        }, res => {
          // console.log("交易记录", JSON.stringify(res));
          const list = res.result.list
          list.forEach(item => {
            let time = item.createTime
            if(time) {
              console.log(time);
              time = time.replace(/-/g,'/').slice(5,-3)
            }
            item.time = time
          })


          this.$refs.paging.complete(res.result.list);
        })
      },


      getbourselist() {
        this.$api.bourselist({}, res => {

          this.bourselist = res.result

        })
      },



      checkTab(item, index) {
        this.tabIndex = index
        this.screenInfo.type = item.id
        this.$refs.paging.reload();
      },


      //设置结束时间
      setEndTime(e) {
        this.screenInfo.endTime = e.target.value;
      },
      //设置开始时间
      setStratTime(e) {
        this.screenInfo.startTime = e.target.value;
      },
      //点击重置
      setAgin() {

      },
      //点击确认进行筛选
      comfirmGo() {
        this.$refs.screenPoupup.close();
        uni.showLoading({
          title: "loading..."
        })
        setTimeout(() => {
          this.$refs.paging.reload();
          uni.hideLoading()
        }, 1500)
      },
      //点击进行筛选
      screenClick() {
        this.$refs.screenPoupup.open();
      }
    },
    filters: {
      brouseName(val, list) {
       console.log(77777777777, JSON.stringify(list));

        let brouseItem = list.find(item => {
          if (item.id == val) {
            return item.bourseShortName || ''
          }
        })
        return brouseItem.bourseShortName
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .main {
      width: 100%;
      flex: 1;
      overflow: hidden;
    }
  }



  .records-list {
    padding-top: 42rpx;
    padding-bottom: 10rpx;
    .top {
      display: flex;
      margin-bottom: 42rpx;
      align-items: center;

      .direction {
        font-size: 32rpx;
        font-weight: bold;
        text-align: left;
        color: #06a37a;
        line-height: 44rpx;
        margin-right: 8rpx;

        &.buy {
          color: #06A37A;
        }
        &.sell {
          color: #be0940;
        }
      }

      .tradingPair {
        font-size: 32rpx;
        font-family: DIN-Medium;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 38rpx;
      }

      .brouse {
        margin-left: 20rpx;
        margin-right: auto;

        // width: 80rpx;
        height: 40rpx;
        padding: 0 16rpx;
        background: rgba(65,96,251,0.10);
        border-radius: 4rpx;

        font-size: 24rpx;
        font-weight: bold;
        color: #4160fb;
        text-align: center;
        line-height: 40rpx;
      }

      .profit {
        font-size: 28rpx;
        font-weight: bold;
        text-align: right;
        color: #4160fb;
        line-height: 40rpx;
      }

    }

    .row {
      display: flex;
      // justify-content: space-between;
      margin-bottom: 30rpx;

      .block {
        display: flex;
        flex-direction: column;
        &:first-child {
          width: 244rpx;
        }
        &:nth-child(2) {
          align-self: flex-start;
          text-align: left;
          margin-right: auto;
        }
        &:last-child {
          text-align: right;
          align-items: flex-end;
          // justify-self: flex-end;
        }
      }

      .label {
        font-size: 24rpx;
        text-align: left;
        color: #9ea0a8;
        line-height: 34rpx;
        margin-bottom: 12rpx;
      }

      .value {
        font-size: 28rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: left;
        color: #37383b;
        line-height: 34rpx;

      }
    }

    // background: #fff;
    // border-radius: 5px;
    // padding: 20upx 20upx 40upx 20upx;
    // display: flex;
    // margin-bottom: 20upx;




  }


  .devier {
    width: 100%;
    height: 24rpx;
    background-color: #FAFAFD;
  }
  .tab {
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 0 162rpx;
    // border-bottom: 24rpx solid #FAFAFD;

    &_item {
      width: 72rpx;
      height: 100rpx;
      font-size: 30rpx;
      font-weight: bold;
      text-align: left;
      color: #9ea0a8;
      line-height: 100rpx;
      text-align: center;
      position: relative;

      &.active {
        color: #4160FB;

        &::after {
          position: absolute;
          bottom: 0rpx;
          left: 0;
          width: 72rpx;
          height: 4rpx;
          background: #4160fb;
          content: "";
        }
      }
    }
  }



  .rl-r-t-t-sell {
    color: #D14C64 !important;
  }

  >>>.z-paging-content-fixed {
    /* top: 138upx; */
  }

  .sbb-btn-ok {
    background: #0278fe;
    color: #fff;
  }

  .sbb-btn-cancel {
    background: #f7f6fb;
  }

  .sbb-btn {
    width: 100%;
    height: 90upx;
    display: flex;
  }

  .sbb-btn>view {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  >>>.sbb-time-box uni-picker {
    width: 100%;
    height: 100%;
  }

  >>>.sbb-time-box uni-picker div {
    width: 100%;
    height: 100%;
  }

  >>>.sbb-time-box .uni-input {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sbb-time-box {
    width: 280upx;
    height: 70upx;
    background: #f7f6fb;
    border-radius: 3;
  }

  .sbb-time-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sbb-remark {
    color: #999999;
    font-size: 28upx;
    padding-top: 30upx;
  }

  >>>.sbb-input .uni-input-input {
    font-size: 28upx;
  }

  .sbb-input {
    width: 350upx;
    height: 70upx;
    border-radius: 3px;
    background: #f7f6fb;
  }

  .sbb-input>input {
    width: 100%;
    height: 100%;
    padding: 0 20upx;
  }

  .sbb-type .active {
    background: #0278fe;
    color: #fff;
  }

  .sbb-type>view {
    width: 30%;
    height: 70upx;
    background: #f7f6fb;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    font-size: 28upx;
  }

  .sbb-type {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sbb-title {
    font-size: 32upx;
    padding: 40upx 0 20upx 0;
  }

  .sreen-box-box {
    padding: 0upx 30upx 30upx 30upx;
  }

  .screen-box {
    width: 100%;
    background: #fff;
  }

  .rl-r-l-number {
    color: #2F3133;
    padding-left: 20upx;
  }

  .rl-r-l-title {
    width: 130upx;
    color: #8D9299;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rl-r-list {
    display: flex;
    align-items: center;
    padding-top: 16upx;
  }

  .rl-r-topbox {
    border-bottom: 1px solid #F0F0F0;
    padding: 12upx 0;
  }

  .rl-r-time {
    color: #5E6266;
    padding: 14upx 0;
  }

  .rl-r-t-type {
    color: #06AD90;
    font-size: 32upx;
    font-weight: 600;
  }

  .rl-r-t-coin {
    font-size: 32upx;
    font-weight: 600;
    padding-left: 20upx;
  }

  .rl-r-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .rl-right * {
    font-size: 26upx;
  }

  .rl-right {
    padding-left: 20upx;
    width: 578upx;
  }

  .rl-r-t-name {
    color: #0278FF;
  }

  page {
    background: #ffffff;
  }

  .rl-left-img {
    width: 112upx;
    height: 112upx;
    border-radius: 50%;
    background: #EEEEEE;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40upx;
    color: #06AD90;
    font-weight: bold;
  }



  .records-box {
    // padding: 20upx;
    width: 100%;
    height: calc(100% - 125rpx);
    overflow-y: hidden;
  }
</style>
