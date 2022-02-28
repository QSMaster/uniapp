<template>
  <view class="container">
		
    <nav-bar title="策略设置" bgColor="#FFFFFF" fontColor="#010F14"></nav-bar>


    <view class="setting-content">
      <view class="contnet-top">


        <view class="contnet-top-list">
          <view class="top-list-left">
           <!-- <view class="img-box">
              <image style="width: 70upx;height: 70upx;" src="../../static/image/index/icon01.png" mode=""></image>
            </view> -->
            <view class="top-list-left-title">交易对</view>
          </view>
          <view class="top-list-left-right">
            <view class="top-list-right-num">
              <input v-if="tradSetting" v-model="tradSetting.firstOrder" type="number" />
            </view>
            <view class="top-list-right-title">BTC/USDT</view>
          </view>
        </view>



        <view class="contnet-top-list">
          <view class="top-list-left">
           <!-- <view class="img-box">
              <image style="width: 70upx;height: 70upx;" src="../../static/image/index/icon01.png" mode=""></image>
            </view> -->
            <view class="top-list-left-title">首单金额(USDT)</view>
          </view>
          <view class="top-list-left-right">
            <view class="top-list-right-num">
              <input v-if="tradSetting" v-model="tradSetting.firstOrder" type="number" />
            </view>
            <view class="top-list-right-title">USDT</view>
          </view>
        </view>

        <view class="contnet-top-list">
          <view class="top-list-left">
          <!--  <view class="img-box">
              <image style="width: 70upx;height: 70upx;" src="../../static/image/index/jiabei.png" mode=""></image>
            </view> -->
            <view class="top-list-left-title">首单加倍(USDT)</view>
          </view>
          <view class="top-list-left-right switch">
            <switch :checked="tradSetting.isDouble==1" style="transform: scale(0.8,0.7)" @change="switch2Change" />
          </view>
        </view>

      </view>
      <!-- 提示文字 -->
      <!-- <view class="ad-text">
        <view class="ad-text-content">按照单位、本金、交易货币计算得出首单买入金额</view>
      </view> -->


      <view class="contnet-bottom">
        <view class="contnet-top">

          <view class="contnet-top-list hairline--bottom">
            <view class="top-list-left">
             <!-- <view class="img-box">
                <image style="width: 70upx;height: 70upx;" src="../../static/image/index/icon02.png" mode=""></image>
              </view> -->
              <view class="top-list-left-title">倍投上限</view>
            </view>
            <view class="top-list-left-right">
              <view class="top-list-right-num">
                <input v-model="tradSetting.orderQuantity" type="number" />
              </view>
            </view>
          </view>

          <view class="contnet-top-list hairline--bottom">
            <view class="top-list-left">
              <!-- <view class="img-box">
                <image style="width: 70upx;height: 70upx;" src="../../static/image/index/icon03.png" mode=""></image>
              </view> -->
              <view class="top-list-left-title">止盈比例</view>
            </view>
            <view class="top-list-left-right">
              <view class="top-list-right-num">
                <input v-model="tradSetting.stopProfit" type="number" />
              </view>
              <view class="top-list-right-title">%</view>
            </view>
          </view>

          <view class="contnet-top-list hairline--bottom">
            <view class="top-list-left">
              <!-- <view class="img-box">
                <image style="width: 70upx;height: 70upx;" src="../../static/image/index/icon03.png" mode=""></image>
              </view> -->
              <view class="top-list-left-title">盈利回调</view>
            </view>
            <view class="top-list-left-right">
              <view class="top-list-right-num">
                <input v-model="tradSetting.profitCallback" type="number" />
              </view>
              <view class="top-list-right-title">%</view>
            </view>
          </view>

          <view class="contnet-top-list hairline--bottom" @tap="screenClick()">
            <view class="top-list-left">
              <!-- <view class="img-box">
                <image style="width: 70upx;height: 70upx;" src="../../static/image/index/icon03.png" mode=""></image>
              </view> -->
              <view class="top-list-left-title">补仓跌幅</view>
            </view>
            <view class="top-list-left-right">
              <view class="top-list-right-num">已设置</view>
              <view class="top-list-right-title">
                <image style="width: 30upx;height: 20upx;" src="../../static/image/index/select.png" mode=""></image>
              </view>
            </view>
          </view>

          <view class="contnet-top-list hairline--bottom">
            <view class="top-list-left">
              <!-- <view class="img-box">
                <image style="width: 70upx;height: 70upx;" src="../../static/image/index/icon03.png" mode=""></image>
              </view> -->
              <view class="top-list-left-title">补仓回调</view>
            </view>
            <view class="top-list-left-right">
              <view class="top-list-right-num">
                <input v-model="tradSetting.buyInCallback" type="number" />
              </view>
              <view class="top-list-right-title">%</view>
            </view>
          </view>


          <view class="contnet-top-list hairline--bottom">
            <view class="top-list-left">
              <!-- <view class="img-box">
                <image style="width: 70upx;height: 70upx;" src="../../static/image/index/icon03.png" mode=""></image>
              </view> -->
              <view class="top-list-left-title">策略类型</view>
            </view>
            <view class="top-list-left-right">

             <view class="strategy_item" :class="{active: strategyIndex === 1}" @click="switchStrategy(1)">循环策略</view>
             <view class="strategy_item" :class="{active: strategyIndex === 2}" @click="switchStrategy(2)">单次策略</view>


            </view>
          </view>




        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="bottomWrap">
      <view class="btn_save">保存</view>
      <view class="btn_start">保存并启动</view>

    </view>


    <!-- 筛选弹窗 -->
    <uni-popup ref="screenPoupup" type="bottom">
      <view class="screen-box">
        <view class="box-title">
          <view class="box-title-left">补仓跌幅</view>
          <view class="box-title-right" @click="cancel">取消</view>
        </view>
        <view class="box-list" v-for="(item,index) in tradSetting.buyInDecline" :key='index'>
          <view class="box-list-left">{{item.title}}</view>
          <view class="box-list-right">
            <view>
              <input v-model="item.decline" type="text" />
            </view>
            <view class="percent">%</view>
          </view>
        </view>
        <view class="btn-box-ok">
          <button class="box-botton" @click="clickOk()">确定</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        strategyIndex: 1, // 1: 循环策略 2: 单次策略


        bourseId: "", //交易所id
        tradingOnId: "", //交易对id
        selectTitle: '已设置',
        numberList: 7,
        tradSetting: "", //查询出来的设置
      };
    },
    onLoad(option) {
      this.bourseId = option.bourseId;
      this.tradingOnId = option.tradingOnId;
      this.defaultSetupQuery(option.bourseId, option.tradingOnId)
    },
    methods: {

      switchStrategy(index) {
        this.strategyIndex = index
      },

      //点击确认进行设置
      comfirmSet() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          _this.$api.strategySetup({
            bourseId: _this.bourseId,
            tradingOnId: _this.tradingOnId,
            buyInCallback: _this.tradSetting.buyInCallback,
            firstOrder: _this.tradSetting.firstOrder,
            isDouble: _this.tradSetting.isDouble,
            orderQuantity: _this.tradSetting.orderQuantity,
            profitCallback: _this.tradSetting.profitCallback,
            stopProfit: _this.tradSetting.stopProfit,
            strategyId: _this.tradSetting.strategyId,
            buyInDecline: _this.tradSetting.buyInDecline
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                uni.hideLoading()
                _this.$common.showToast("设置成功", "success");
                setTimeout(() => {
                  uni.navigateBack(-1);
                }, 1300)
              }, 1500)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },
      // 点击确定设置补仓跌幅
      clickOk() {
        let marginLoss = this.tradSetting.buyInDecline;
        let is_ok = true;
        //验证是否是某个数据没有填写
        for (let i = 0; i < marginLoss.length; i++) {
          if (marginLoss[i].decline <= 0) {
            is_ok = false;
            break;
          }
        }
        if (!is_ok) {
          this.$common.showToast("请设置完整补仓跌幅")
        } else {
          this.$refs.screenPoupup.close()
        }
      },
      //获取交易设置查询
      defaultSetupQuery(bourseId, tradingOnId) {
        this.$api.defaultSetupQuery({
          bourseId: bourseId,
          tradingOnId: tradingOnId
        }, res => {
          let a = JSON.stringify(res.result.buyInDecline)
          this.tradSetting = res.result;
        })
      },
      //点击是否开启开仓加倍
      switch2Change: function(e) {
        if (e.target.value) {
          this.tradSetting.isDouble = 1;
        } else {
          this.tradSetting.isDouble = 0;
        }
      },
      //点击开启弹窗
      screenClick() {
        this.$refs.screenPoupup.open();
      },
      // 取消
      cancel() {
        // this.defaultSetupQuery(this.bourseId,this.tradingOnId)
        this.$refs.screenPoupup.close();
      },
    }
  };
</script>

<style scoped lang="scss">
  .setting-content {
    padding-bottom: 300rpx;
  }

  .contnet-top {
    padding: 0 40rpx;
    background-color: #ffffff;
    &-list {
      display: flex;
      justify-content: space-between;
      height: 120rpx;
      background: #ffffff;

      .top-list-left {
        display: flex;
        align-items: center;
        &-title {
          font-size: 28rpx;
          font-weight: 500;
          text-align: left;
          color: #959a9f;
        }

        &-right {
          display: flex;
          align-items: center;
        }
      }
    }

    .top-list-right-num {
      font-size: 36rpx;
      font-family: DIN-Medium;
      font-weight: 500;
      text-align: right;
      color: #5664af;
    }

    .switch {
      position: relative;
      right: -20rpx;
    }

    .top-list-right-title {
        font-size: 28rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: right;
        color: #5664af;
        margin-left: 8rpx;
    }
  }

  // 策略类型
  .strategy_item {
    width: 168rpx;
    height: 76rpx;
    background: #ffffff;
    border: 2rpx solid #babdca;
    border-radius: 18rpx;
    font-size: 28rpx;
    font-weight: bold;
    text-align: center;
    color: #84889a;
    line-height: 76rpx;
    margin-left: 30rpx;

    &.active {
      color: #4160fb;
      background: rgba(65,96,251,0.15);
      border: 2rpx solid #4160fb;
    }
  }

  // 底部按钮
  .bottomWrap {
    width: 100%;
    height: 204rpx;
    background: #ffffff;
    box-shadow: 0rpx -4rpx 8rpx 0rpx #f4f7fb;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    font-size: 32rpx;
    font-weight: bold;
    color: #ffffff;
    line-height: 96rpx;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;

    .btn_save {
      width: 276rpx;
      height: 96rpx;
      background: #464c6b;
      border-radius: 12rpx;
      text-align: center;
    }

    .btn_start {
      width: 384rpx;
      height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;
      text-align: center;
    }
  }


  .isOkDoit {
    padding-right: 30upx;
    font-size: 28upx;
  }

  .box-list-right input {
    width: 240upx;
    text-align: right;
    height: 100%;
    padding-right: 40upx;
  }

  uni-page-body {
    height: 100%;
    font-size: 14px;
    line-height: 1.8;
  }

  /* 弹窗设置 */
  .box-title-left {
    width: 128upx;
    height: 44upx;
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: 600;
    line-height: 44upx;
    color: #000000;
    margin: 34upx 30upx;
  }

  .box-title-right {
    width: 64upx;
    height: 44upx;
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 44upx;
    color: #969696;
    margin: 34upx 30upx;
  }

  .box-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 30upx;
    height: 90upx;
    width: 100%;
  }

  .box-list-left {
    font-size: 28upx;
    font-family: PingFang SC;
    color: #000000;
  }

  .box-list-right {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .box-list-right>view {
    height: 100%;
  }

  .num {
    width: 16upx;
    height: 40upx;
    font-size: 28upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 40upx;
    color: #000000;
  }

  .percent {
    font-size: 28upx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    display: flex;
    align-items: center;
  }

  .btn-box-ok {
    width: 100%;
    padding: 70upx 30upx;
  }

  .box-botton {
    width: 100%;
    height: 90upx;
    background: #0278FF;
    opacity: 1;
    font-size: 34upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 90upx;
    color: #FFFFFF;
  }

  .container {
    width: 100%;
    height: 100%;
    background: #ffffff;
  }













  .top-list-right-num input {
    width: 200upx;
    font-size: 36upx !important;
    text-align: right;
  }

  // .top-list-right-title {
  //   font-family: PingFang SC;
  //   font-weight: 400;
  //   color: #000000;
  //   opacity: 1;
  //   padding-left: 40upx;
  // }

  .ad-text {
    background: #f0f0f0;
    opacity: 1;
    padding: 30upx;
  }

  .ad-text-content {
    font-size: 28upx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #969696;
  }

  .screen-box {
    width: 750upx;
    height: 960upx;
    background: #ffffff;
    opacity: 1;
    border-radius: 20upx 20upx 0upx 0upx;
    overflow: hidden;
  }

  .box-title {
    height: 112upx;
    display: flex;
    justify-content: space-between;
    border: 2upx solid #f0f0f0;
  }
</style>
