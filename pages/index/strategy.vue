<template>
  <view class="container">

    <nav-bar ref="navBar" :scrollTop="scrollTop" transparentFixedFontColor="#ffffff" bgColor="#ffffff"
      fontColor="#010F14" type="transparentFixed" title="交易详情">
    </nav-bar>


    <view class="bg-strategy">
      <image style="width: 100%;height: 820rpx;" src="../../static/images/trade/bg_cl_details@2x.png"></image>



      <view class="strategy-titel-panel">
        <view class="section">

        <!--  <dh-image class="icon" :src="`../../static/coins/${strategyInfo.tradingOn.split('/')[0]}.svg`"
            errorSrc="../../static/images/bi_bi_none@2x.png" mode="aspectFit"></dh-image> -->


          <image class="icon" :src="`../../static/coins/${strategyInfo.tradingOn.split('/')[0]}.svg`" mode="aspectFit" v-if="strategyInfo.tradingOn"></image>
          <view class="text1" v-if="strategyInfo.tradingOn">{{strategyInfo.tradingOn.split('/')[0]}}</view>
          <view class="text2" v-if="strategyInfo.tradingOn">/{{strategyInfo.tradingOn.split('/')[1]}}</view>
          <view class="rote" :class="strategyInfo.rose>=0?'rise':'fall'">{{strategyInfo.rose > 0 ?'+':''}}{{strategyInfo.rose | roseDo}}%</view>
          <view class="status">{{strategyInfo.enabled | strategyStatus}}</view>
        </view>

        <!-- <view class="panel-titel">
          <view class="panel-titel-text">{{strategyInfo.tradingOn}}</view>
          <view class="panel-titel-tag">{{strategyInfo.type==0?"循环策略":"单次策略"}}</view>
        </view> -->

        <view class="panel-content">

          <view class="cont-first">
            <view class="money-num">{{strategyInfo.takeAmount?strategyInfo.takeAmount:"0.00"}}</view>
            <view class="count-title">持仓金额({{strategyInfo.tradingOn | coinSplit('coin2')}})</view>
            <view class="count-num">{{strategyInfo.takeNum?strategyInfo.takeNum:"0.00"}}</view>
            <view class="count-title">持仓数量({{strategyInfo.tradingOn | coinSplit('coin1')}})</view>
            <view class="count-num">{{strategyInfo.profitCount}}</view>
            <view class="count-title">盈利次数</view>
          </view>

          <view class="cont-two">
            <view class="money-num">{{strategyInfo.takeAvgPrice?strategyInfo.takeAvgPrice:"0.00"}}</view>
            <view class="count-title">持仓均价({{strategyInfo.tradingOn | coinSplit('coin2')}})</view>
            <view class="count-num">{{strategyInfo.presentPrice?strategyInfo.presentPrice:"0.00"}}</view>
            <view class="count-title">当前价格</view>
            <view class="count-num" :class="strategyInfo.floatingLoss>=0?'rise':'fall'">{{strategyInfo.floatingLoss}}
            </view>
            <view class="count-title">浮动盈亏</view>
          </view>

          <view class="cont-three">

            <view class="money-num">{{strategyInfo.type==0?"循环策略":"单次策略"}}</view>
            <view class="count-title">策略设置</view>

            <view class="money-num">{{strategyInfo.buyInNum?strategyInfo.buyInNum:"0"}}</view>
            <view class="count-title">补仓次数</view>

            <!-- <view class="count-num">{{strategyInfo.rose?strategyInfo.rose:"0.00" | roseDo}}%</view>
            <view class="count-title">涨幅</view> -->

            <view class="count-num" :class="strategyInfo.profitTotal>=0?'rise':'fall'">{{strategyInfo.profitTotal | qff(4)}}</view>
            <view class="count-title">盈利总额(USDT)</view>

          </view>

        </view>
      </view>


    </view>


    <!-- 策略相关 -->
    <view class="correlation-pannel">

      <view class="text-title-content">
        <!-- <view class="bg"></view> -->
        <view class="text-title">策略设置</view>
      </view>


      <view class="correlation-content">
        <!-- <view class="correlation-content-left"> -->


        <view class="cl-content-list hairline--bottom">
          <view class="cl-content-title">首单金额(USDT)</view>
          <view class="cl-content-data">
            {{strategyInfo.strategyResponse?strategyInfo.strategyResponse.firstOrder:'--'}}
          </view>
        </view>

        <view class="cl-content-list hairline--bottom">
          <view class="cl-content-title">倍投上限</view>
          <view class="cl-content-data">
            {{strategyInfo.strategyResponse?strategyInfo.strategyResponse.orderQuantity:"0"}}
          </view>
        </view>

        <view class="cl-content-list hairline--bottom">
          <view class="cl-content-title">止盈比例</view>
          <view class="cl-content-data">
            {{strategyInfo.strategyResponse?strategyInfo.strategyResponse.stopProfit:"0"}}%
          </view>
        </view>

        <view class="cl-content-list hairline--bottom">
          <view class="cl-content-title">盈利回调</view>
          <view class="cl-content-data">
            {{strategyInfo.strategyResponse?strategyInfo.strategyResponse.profitCallback:"0"}}%
          </view>
        </view>

        <view class="cl-content-list hairline--bottom">
          <view class="cl-content-title">补仓跌幅</view>
          <view class="cl-content-data">
            {{strategyInfo.strategyResponse?strategyInfo.strategyResponse.buyInDecline:"0"}}%
          </view>
        </view>


        <view class="cl-content-list hairline--bottom">
          <view class="cl-content-title">补仓回调</view>
          <view class="cl-content-data">
            {{strategyInfo.strategyResponse?strategyInfo.strategyResponse.buyInCallback:"0"}}%
          </view>
        </view>


        <view class="cl-content-list hairline--bottom">
          <view class="cl-content-title">补仓价格</view>
          <view class="cl-content-data">
            {{strategyInfo.strategyResponse?strategyInfo.strategyResponse.buyInPrice:"- -" | numbersDo}}
          </view>
        </view>


        <!-- </view> -->

      </view>
    </view>



    <!-- 策略操作 -->


    <!-- <view class="operation-content">
      <view class="text-title-content">
        <view class="bg"></view>
        <view class="text-title">策略操作</view>
      </view>
      <view class="icon-list">
        <view class="icon-content" @click="changeCelue()">
          <image v-if="strategyInfo.type==1" style="width: 150upx;height: 150upx;"
            src="../../static/image/index/celue.png"></image>
          <image v-else style="width: 150upx;height: 150upx;" src="../../static/image/index/danci.png">
          </image>
          <view class="icon-text">{{strategyInfo.type==1?"循环策略":"单次策略"}}</view>
        </view>
        <view class="icon-content" @click="clearSellClick">
          <image style="width: 150upx;height: 150upx;" src="../../static/image/index/qing.png" mode="">
          </image>
          <view class="icon-text">清仓卖出</view>
        </view>
        <view class="icon-content">
          <view @click="popupInput()">
            <image style="width: 150upx;height: 150upx;" src="../../static/image/index/bu.png" mode="">
            </image>
            <view class="icon-text">一键补仓</view>
          </view>
        </view>
      </view>
    </view>

 -->

    <!-- 底部按钮 -->
    <view class="footer-btn">




      <view class="errText" v-if="usdt < minUsdt">资产额度低于{{minUsdt}} USDT，无法启动</view>

      <!-- 未启动显示 -->
     <!-- <view class="double" v-show="strategyInfo.enabled === 0">
        <button class="btn-size edit" type="primary" @tap="setting">修改策略</button>
        <button class="btn-size" :class="{disabled: usdt < minUsdt}" type="primary" @click="onOrOff">启动</button>
      </view> -->

      <!-- 已启动显示 -->
      <view class="more">
        <button class="moreBtn edit" type="default" @tap="setting">修改策略</button>
        <button class="moreBtn" :class="{disabled: usdt < minUsdt}" type="default" @click="opensdbcPopup">手动补仓</button>
        <button class="moreBtn" :class="{disabled: usdt < minUsdt || strategyInfo.enabled === 0}"  type="default" @click="showBasePopup(4)">清仓终止</button>
        <button class="moreBtn" :class="{disabled: usdt < minUsdt}" type="default" @click="showBasePopup(strategyInfo.enabled === 1?2:1)">{{strategyInfo.enabled === 1? '暂停':'启动'}}</button>
      </view>


    </view>


    <!-- 补仓弹窗 -->
    <!-- 	<uni-popup ref="inputDialog" type="center">
			<view class="dialog-input-panel">
				<view class="dialog-title">
					买入USDT
				</view>
				<input class="dialog-input" v-model="coverNumber" type="number" value="" placeholder="请输入买入数量" />
				<view class="input-text">USDT</view>
				<view class="lay">

				</view>
				<view class="dialog-footer">
					<view class="canel" @click="cancel()">取消</view>
					<view class="btn" @click="confirm()">确认</view>
				</view>
			</view>
		</uni-popup> -->

    <!-- 公共操作弹窗 1：是否启动 2：是否暂停：3：是否重新启动 4：是否清仓终止 -->
    <uni-popup ref="strategyBasePopup" type="center">
      <view class="strategyBasePopup">
        <view class="titleWrap">
          <view class="title" v-if="popupType === 1">是否启动</view>
          <view class="title" v-else-if="popupType === 2">是否暂停</view>
          <view class="title" v-else-if="popupType === 3">是否重新启动</view>
          <view class="title" v-else-if="popupType === 4">是否清仓终止</view>
        </view>
        <view class="tipsWrap">
          <view class="basePopupTips" v-if="popupType === 1">您确定开始启动策略吗？</view>
          <view class="basePopupTips" v-else-if="popupType === 2">您确定要停止策略吗？之前的持仓没有变化，也不会进行卖出操作。</view>
          <view class="basePopupTips" v-else-if="popupType === 3">您确定重新启动策略吗？</view>
          <view class="basePopupTips" v-else-if="popupType === 4">是否按照当前价格，卖出所有资产？</view>
        </view>
        <view class="basePopupBtns">
          <view class="basePopupBtns_cancel" @click="handleBaseCancel">取消</view>
          <view class="basePopupBtns_ok" @click="handleBaseOk">确认</view>
        </view>
      </view>
    </uni-popup>


    <!-- 手动补仓 -->
    <uni-popup ref="sdbcPopup" type="center">
      <view class="sdbcPopup">
        <view class="close" @click="closesdbcPopup"></view>
        <view class="sdbcPopup_title">手动补仓</view>
        <view class="sdbcPopup_inputWrap">
          <uni-easyinput class="input" v-model="coverNumber" type="number" :inputBorder="false" placeholder="请输入补仓数量" />
          <view class="coin">USDT</view>
        </view>
        <view class="balance">余额：{{usdt}} USDT</view>
        <view class="sdbcPopup_btn" @click="confirm">确认</view>
      </view>
    </uni-popup>




  </view>
</template>

<script>

   import dhImage from '@/components/dh-image/dh-image'

  export default {
    components: {
      dhImage
    },
    data() {
      return {
        minUsdt: 10, // 最低启动资产
        usdt: 0, // 用户交易所资产
        popupType: 1, // 弹窗类型： 1：是否启动 2：是否暂停：3：是否重新启动 4：是否清仓终止
        coverValue: '', // 手动补仓金额


        flag: true,
        input: '',
        strategyInfo: {}, //策略详情
        strategyId: "", //要查看详情的id
        coverNumber: "", //补仓数量
        scrollTop: 0,
      };
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onLoad(option) {
      this.strategyId = option.id;
    },
    onShow() {
      // setTimeout(()=>{
      //   this.$refs.sdbcPopup.open();
      // },100)
      this.tradingOnDetails(this.strategyId);
    },
    methods: {
      //获取交易详情
      tradingOnDetails(id) {
        this.$api.tradingOnDetails({
          id: id
        }, res => {
          this.strategyInfo = res.result
          this.getUserAsset(res.result.bourseId)
        })
      },

      // 获取交易所余额
      getUserAsset(id) {
        this.$api.getHuoBiUsdt({
            currencyId: id // 交易所ID
          },
          res => {
            this.usdt = res.result;
          }
        );
      },

      // 显示公共弹窗
      showBasePopup(type){
        this.popupType = type
        this.$refs.strategyBasePopup.open()
      },


      // 取消公共弹窗
      handleBaseCancel() {
        this.$refs.strategyBasePopup.close()
      },

      // 公共弹窗点击确认
      handleBaseOk() {
        this.handleBaseCancel()
        if(this.popupType === 4) {
          // 如果是清仓卖出
          this.clearingSelling(0)
        } else if(this.popupType === 1 || this.popupType === 2) {
          this.onOrOff()
        }
      },

      // 打开手动补仓
      opensdbcPopup() {
        this.$refs.sdbcPopup.open()
      },

      // 关闭手动补仓
      closesdbcPopup() {
        this.$refs.sdbcPopup.close()
      },

      //点击确认补仓按钮
      confirm() {
        if (this.coverNumber == "" || this.coverNumber <= 0) {
          this.$common.showToast("请输入补仓数量")
        } else {
          this.closesdbcPopup();
          this.clearingSelling(1)
        }
      },

      //点击清仓卖出
      clearSellClick() {
        let _this = this;
        uni.showModal({
          title: "温馨提示",
          content: "是否立即清仓卖出？",
          showCancel: true,
          cancelText: '取消',
          confirmText: '确认',
          success: res => {
            if (res.confirm) {
              // 用户点击确定
              _this.clearingSelling(0);
            }
          }
        })
      },

      //执行清仓卖出
      clearingSelling(types) {
        let _this = this;
        if (types == 0) {
          _this.coverNumber = "";
        }
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.manualPlaceOrder({
            bourseId: _this.strategyInfo.bourseId,
            tradingOnId: _this.strategyInfo.tradingOnId,
            type: types,
            placeNum: _this.coverNumber
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                uni.hideLoading()
                _this.$common.showToast(types == 0 ? "清仓成功" : "补仓成功",
                  "success")
                setTimeout(() => {
                  _this.$store.state.indexDataFlush = true;
                  _this.tradingOnDetails(_this.strategyId);
                }, 1300)
              }, 1500)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },

      //点击开启或停止
      onOrOff() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.setEnabled({
            id: _this.strategyInfo.id,
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                uni.hideLoading()
                _this.$common.showToast(_this.strategyInfo.enabled == 0 ? "开启成功" : "停止成功",
                  "success")
                setTimeout(() => {
                  _this.$store.state.indexDataFlush = true;
                  _this.tradingOnDetails(_this.strategyId);
                }, 1300)
              }, 1500)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },

      //点击切换策略
      changeCelue() {
        if (this.strategyInfo.type == 0) {
          //切换为单次策略
          this.cutStrategy(1)
        } else if (this.strategyInfo.type == 1) {
          //切换为循环策略
          this.cutStrategy(0)
        }
      },

      //切换策略
      cutStrategy(index) {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.cutStrategy({
            ids: _this.strategyInfo.id,
            strategyType: index,
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                uni.hideLoading()
                _this.$common.showToast("切换成功", "success")
                setTimeout(() => {
                  _this.$store.state.indexDataFlush = true;
                  _this.tradingOnDetails(_this.strategyId);
                }, 1300)
              }, 1500)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },

      // 取消操作
      cancel() {
        this.$refs.inputDialog.close();
      },

      popupInput() {
        this.coverNumber = "";
        this.$refs.inputDialog.open();
      },

      // 交易记录
      toTradingList() {
        let symbol = this.strategyInfo.tradingOn;
        symbol = symbol.replace("/", "-");
        symbol = symbol.toLowerCase();
        this.$common.skipTo('/pages/index/tradingList?symbol=' + symbol);
      },

      //跳转至交易设置
      setting() {
        const tradingOn = this.strategyInfo.tradingOn.replace(/\//, '-')
        this.$common.skipTo(
          `/pages/trade/tradeSettings?bourseId=${this.strategyInfo.bourseId}&tradingOnId=${this.strategyInfo.tradingOnId}&tradingOn=${tradingOn}`
        );
      }
    },
    filters: {
      // 运行状态
      strategyStatus(val) {
        if (val == 0) {
          return '已停止';
        } else if (val == 1) {
          return '运行中';
        }
      },
      roseDo: function(val) {
        val = parseFloat(val);
        return val.toFixed(2);
      },
      numbersDo: function(val) {
        if (val) {
          if (val != "- -") {
            val = parseFloat(val);
            return val.toFixed(4);
          } else {
            return val
          }
        } else {
          return "- -"
        }
      },
      coinSplit: function(val, type) {
        if (val) {
          let str = val.split("/");
          if (type == "coin1") {
            return str[0]
          } else {
            return str[1]
          }
        } else {
          return "****"
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  // 公共操作弹窗
  .strategyBasePopup {
    width: 588rpx;
    background: #ffffff;
    border-radius: 30rpx;
    padding: 48rpx 54rpx 52rpx;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      text-align: center;
      color: #37383b;
      line-height: 50rpx;
    }

    .tipsWrap {
      margin-top: 40rpx;
      margin-bottom: 56rpx;

      .basePopupTips {
        font-size: 28rpx;
        text-align: center;
        color: #5e6066;
        line-height: 40rpx;
      }
    }

    .basePopupBtns {
      display: flex;
      flex-direction: row;
      font-size: 26rpx;
      font-weight: bold;
      text-align: center;
      line-height: 76rpx;
      width: 100%;
      justify-content: space-between;

      &_cancel {
        width: 224rpx;
        height: 76rpx;
        background: #f4f6fb;
        border-radius: 8rpx;
        color: #5e6066;
      }

      &_ok {
        width: 224rpx;
        height: 76rpx;
        opacity: 1;
        background: linear-gradient(135deg, #5470ff, #4160fb);
        border-radius: 8rpx;
        color: #FFFFFF;
      }
    }
  }

  // 手动补仓
  .sdbcPopup {
    width: 588rpx;
    height: 528rpx;
    background: #ffffff;
    border-radius: 30rpx;
    position: relative;
    padding: 48rpx 40rpx 0;

    .close {
      position: absolute;
      top: 54rpx;
      right: 40rpx;
      width: 40rpx;
      height: 40rpx;
      background: url(../../static/images/icon_tc_qc@3x.png) no-repeat;
      background-size: contain;
    }

    &_title {
      font-size: 36rpx;
      font-weight: bold;
      text-align: center;
      color: #37383b;
      line-height: 50rpx;
      margin-bottom: 60rpx;
    }

    &_inputWrap {
      width: 100%;
      height: 108rpx;
      background: #f4f6fb;
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;

      .input {
        font-size: 28rpx;
      }

      .coin {
        font-size: 28rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: right;
        color: #5e6066;
        margin-left: 20rpx;
      }
    }

    .balance {
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #5664af;
      line-height: 40rpx;
      margin-top: 30rpx;
    }

    &_btn {
      width: 100%;
      height: 76rpx;
      background: linear-gradient(135deg, #5470ff, #4160fb);
      border-radius: 8rpx;

      font-size: 26rpx;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      line-height: 76rpx;
      margin-top: 68rpx;
    }
  }

  uni-page-body {
    height: 100%;
  }

  /* 弹出框 */
  .dialog-input-panel {
    width: 600upx;
    height: 360upx;
    background: #FFFFFF;
    opacity: 1;
    border-radius: 20upx;
    position: relative;
  }

  .dialog-title {
    height: 50upx;
    font-size: 36upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 48upx;
    color: #000000;
    text-align: center;
    box-sizing: content-box;
    position: absolute;
    top: 30upx;
    left: 216upx;
  }

  .dialog-input {
    width: 500upx;
    height: 92upx;
    padding: 0upx 150upx 0upx 30upx;
    background: #F2F2F2;
    opacity: 1;
    border-radius: 10upx;
    position: absolute;
    left: 50upx;
    top: 130upx;
  }

  .input-text {
    font-size: 28upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 48upx;
    color: #000000;
    position: absolute;
    right: 70upx;
    top: 156upx;
  }

  .lay {
    width: 100%;
    border-bottom: 2upx solid #DADFE6;
    position: absolute;
    top: 268upx;
  }

  /* 底部按钮 */
  .footer-btn {
    width: 100%;
    background: #ffffff;
    box-shadow: 0rpx -4rpx 8rpx 0rpx #f4f7fb;
    padding: 40rpx 30rpx;
    position: fixed;
    bottom: 0;
    left: 0;

    .errText {
      font-size: 24rpx;
      font-weight: bold;
      text-align: left;
      color: #e5274a;
      line-height: 34rpx;
      margin-bottom: 30rpx;
    }

    .double {
      display: flex;
      justify-content: space-between;
    }

    >.more {
      display: flex;
      justify-content: space-between;

      .moreBtn {
        width: 160rpx;
        height: 96rpx;
        background: #4160fb;
        border-radius: 12rpx;
        font-size: 28rpx;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        padding: 0;
        margin: 0;
        line-height: 96rpx;

        &.edit {
          background: #06a37a;
        }

        &.disabled {
          background: #cbcdd2;
          pointer-events: none;
        }
      }
    }

    .btn-size {
      width: 328rpx;
      height: 96rpx;
      background: #0278ff;
      border-radius: 12rpx;
      font-size: 32upx;
      line-height: 96rpx;
      color: #ffffff;
      padding: 0;
      margin: 0;

      &.edit {
        background: #06a37a;
      }

      &.disabled {
        background: #cbcdd2;
        pointer-events: none;
      }
    }
  }

  .dialog-footer {
    width: 100%;
    position: absolute;
    bottom: 0upx;
    display: flex;
    justify-content: space-between;
    height: 92upx;
  }

  .canel {
    border-right: 2upx solid #DADFE6;
    width: 100%;
    text-align: center;
    line-height: 92upx;
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #969696;
  }

  .btn {
    width: 100%;
    text-align: center;
    line-height: 92upx;
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #027AFF;
  }

  /* 策略操作 */
  .operation-content {
    width: 750upx;
    height: 360upx;
    background: #ffffff;
    opacity: 1;
    margin-top: 10upx;
  }

  .icon-list {
    display: flex;
    justify-content: space-around;
    margin-top: 40upx;
  }

  .icon-text {
    font-size: 26upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36upx;
    color: #000000;
    opacity: 1;
    text-align: center;
  }

  /* 策略设置 */
  .correlation-pannel {
    background-color: #ffffff;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    position: relative;
    margin-top: -40rpx;

    .text-title-content {
      padding-top: 40upx;
      display: flex;
      margin-left: 40upx;
      position: relative;

      .text-title {
        font-size: 40rpx;
        font-family: DIN-Medium;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 48rpx;
      }
    }

    .correlation-content {
      display: flex;
      padding: 28upx 40rpx 0upx 40rpx;
      display: flex;
      flex-direction: column;
      padding-bottom: 258rpx;
    }

    .cl-content-list {
      width: 100%;
      display: flex;
      height: 124rpx;
      align-items: center;
      justify-content: space-between;

      .cl-content-title {
        font-size: 28rpx;
        font-weight: 500;
        text-align: left;
        color: #959a9f;
      }

      .cl-content-data {
        font-size: 36rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: right;
        color: #37383b;
        line-height: 44rpx;
      }
    }
  }

  .correlation-content-right {
    position: absolute;
    left: 406upx;
  }

  .right-title {
    margin-right: 42upx;
    font-size: 30upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 42upx;
    color: #ffffff;
    opacity: 1;
  }

  .cl-content-left-list {
    display: flex;
  }

  .panel-titel {
    display: flex;
    padding: 30upx;
  }

  .panel-titel-text {
    width: 288upx;
    height: 66upx;
    font-size: 48upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 66upx;
    color: #ffffff;
    opacity: 1;
  }

  .panel-titel-tag {
    margin-left: 20upx;
    left: 300upx;
    margin-top: 12upx;
    width: 120upx;
    height: 42upx;
    background: linear-gradient(90deg, #ff8347 0%, #fe5531 100%);
    opacity: 1;
    border-radius: 20upx;
    font-size: 24upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34upx;
    color: #ffffff;
    padding: 4upx 12upx;
  }

  .panel-content {
    position: relative;
    width: 100%;
    display: flex;
    .cont-first {
      width: 272rpx;
    }

    .cont-three {
      text-align: right;
      margin-left: auto;
    }
  }

  .money-title {
    font-size: 26upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36upx;
    color: rgba(255, 255, 255, 0.7);
    opacity: 1;
  }

  .money-num {
    font-size: 32rpx;
    font-family: DIN-Medium;
    font-weight: 500;
    color: #ffffff;
    line-height: 38rpx;
    margin-top: 48rpx;
  }

  .count-title {
    font-size: 24rpx;
    color: #ffffff;
    line-height: 34rpx;
    opacity: 0.6;
    margin-top: 14rpx;
  }

  .count-num {
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 40rpx;
    margin-top: 48rpx;
    &.rise {
      color: #06a37a;
    }
    &.fall {
      color: #e5274a;
    }
  }

  .container {
    background: #f0f0f0;
    width: 100%;
    height: 100%;
  }

  .bg-strategy {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 820rpx;

    .strategy-titel-panel {
      position: absolute;
      bottom: 86rpx;
      width: 100%;
      padding: 0 30rpx;
    }


    .section {
      display: flex;
      align-items: center;
      width: 100%;
      height: 112rpx;
      padding: 0 30rpx 0 26rpx;
      background: #0b102a;
      border-radius: 30rpx;
      box-shadow: 0rpx 4rpx 16rpx 0rpx #182148;
      margin: 48rpx auto 0;
      box-sizing: border-box;

      .icon {
        width: 48rpx;
        height: 48rpx;
        margin-right: 16rpx;
      }

      .text1 {
        font-size: 36rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: left;
        color: #ffffff;
      }

      .text2 {
        font-size: 28rpx;
        font-family: DIN-Regular;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        opacity: 0.5;
      }

      .rote {
        font-size: 32rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: center;
        color: #06a37a;
        margin-left: 28rpx;
        &.rise {
          color: #06a37a;
        }
        &.fall {
          color: #e5274a;
        }
      }

      .status {
        margin-left: auto;
        font-size: 28rpx;
        font-weight: 500;
        text-align: right;
        color: #9ea0a8;
      }
    }
  }
</style>
