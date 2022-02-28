<template>
  <view class="buyActivationCode">
    <nav-bar title="购买激活码" bgColor="#FFFFFF" fontColor="#010F14" :shadow="false"></nav-bar>


    <view class="main">


      <view class="cycle">
        <view class="price">{{sysConfig.codePrice}} USDT / {{sysConfig.codeEffectiveTime}}天</view>
      </view>

      <view class="buy_tips">温馨提示：购买激活码后复制,去粘贴激活会员,多次购买可以赠予他人。</view>


      <view class="bumberBoxWrap hairline--bottom">
        <view class="label">购买数量</view>
        <uni-number-box v-model="buyNumber" :min="1"></uni-number-box>
      </view>

      <view class="safetyVerification hairline--bottom">
        <view class="label">交易密码</view>

        <view class="inputWrap">

          <uni-easyinput class="input" v-model="transactionPwd" placeholder="请输入交易密码" :inputBorder="false"
            type="password" trim/>
          <!-- <input v-model="transactionPwd" placeholder="请输入交易密码" :type="isEye?'text':'password'" trim /> -->
          <!-- <view class="icon" :class="isEye?'open':'close'" @click="handleEye"></view> -->
        </view>
      </view>

      <view class="errText">{{errText}}</view>


      <view class="bottom">
        <view class="column">
          <view class="price">{{payUsdt}} <text>USDT</text></view>
          <view class="number">购买张数：{{buyNumber}}张</view>
        </view>
        <view class="btn" @click="clickOk">立即购买</view>
      </view>



    </view>




  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';

  export default {
    name: "buy-activation-code",
    data() {
      return {
        isEye: false,
        transactionPwd: '',
        buyNumber: 1,
        // payUsdt: 0, // 需要支付的usdt数量
        errText: '',
          btnFlag: true,


      };
    },
    computed:{
      ...mapState({
        sysConfig: state => state.sysConfig
      }),
    	payUsdt(){
    		return this.$CAL.accMul(this.buyNumber,this.$store.state.sysConfig.codePrice)
    	}
    },
    methods: {
      handleEye() {
        this.isEye = !this.isEye
      },

      // 立即购买
      clickOk() {
        let _this = this;
        if (this.transactionPwd == "") {
          // this.$common.showToast("请输入交易密码")
          _this.errText = '请输入交易密码'
        } else {
          console.log('开始请求');
          if (this.btnFlag) {
            _this.btnFlag = false;
            // _this.$refs.buyPoupup.close();
            uni.showLoading({
              title: "loading..."
            })
            _this.$api.activationCodeBuyIn({
              buyNum: _this.buyNumber,
              password: _this.transactionPwd,
            }, res => {
              _this.transactionPwd = "";
              _this.errText = "";
              if (res.code == 200) {
                uni.hideLoading()
                _this.$common.showToast("购买成功", "success")
                _this.buyNumber = 1

                // setTimeout(() => {
                //   uni.hideLoading()
                //   _this.$common.showToast("购买成功", "success")
                //   setTimeout(() => {
                //     _this.$refs.paging.reload()
                //   }, 1300)
                // }, 1500)
              } else {
                uni.hideLoading()
              }
              _this.btnFlag = true;
            })
          }
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    padding: 26rpx 30rpx 26rpx 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .column {
      display: flex;
      flex-direction: column;

      .price {
        font-size: 48rpx;
        font-family: DIN-Bold;
        font-weight: 700;
        text-align: left;
        color: #37383b;
        line-height: 58rpx;

        >text {
          font-size: 40rpx;
          margin-left: 6rpx;
        }
      }

      .number {
        font-size: 28rpx;
        text-align: left;
        color: #9ea0a8;
        line-height: 40rpx;
      }
    }

    .btn {
      width: 260rpx;
      height: 80rpx;
      opacity: 1;
      background: #4160fb;
      border-radius: 40rpx;
      font-size: 32rpx;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
      line-height: 80rpx;

      &:active {
        opacity: 0.9;
      }
    }
  }


  .safetyVerification {
    padding-top: 32rpx;

    .inputWrap {
      height: 120rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .input {
        padding: 0;
      }

      .icon {
        width: 40rpx;
        height: 40rpx;

        &.open {
          background: url(../../../static/images/icon_open@3x.png) no-repeat;
          background-size: contain;
        }

        &.close {
          background: url(../../../static/images/icon_close@3x.png) no-repeat;
          background-size: contain;
        }
      }
    }
  }




  .buyActivationCode {
    height: 100%;
    width: 100%;
    background-color: #FFFFFF;
    padding-bottom: 100rpx;

    .main {
      padding: 40rpx 30rpx;
    }


    .label {
      font-size: 32rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 44rpx;
    }

    .errText {
      font-size: 28rpx;
      text-align: left;
      color: #be0940;
      line-height: 40rpx;
      margin-top: 34rpx;
    }

    .cycle {
      width: 690rpx;
      height: 200rpx;
      background: url(/static/images/mine/bg_mime_jhm3@3x.png) no-repeat;
      background-size: contain;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      box-shadow: 0rpx 8rpx 24rpx 0rpx #c3d0ff;
      border-radius: 28rpx;


      .price {
        font-size: 32rpx;
        font-family: "DIN-Medium";
        text-align: right;
        color: #ffda77;
        line-height: 38rpx;
        margin-right: 30rpx;
      }
    }

    .buy_tips {
      width: 100%;
      height: 100rpx;
      background: rgba(233, 148, 19, 0.10);
      border-radius: 12rpx;
      padding: 16rpx 36rpx;
      margin-top: 32rpx;

      font-size: 24rpx;
      text-align: left;
      color: #e99413;
      line-height: 34rpx;
      margin-bottom: 32rpx;

    }


    .bumberBoxWrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 44rpx 0;


    }


  }
</style>
