<template>
  <view class="container">
    <nav-bar title="充币" bgColor="#ffffff" fontColor="#010F14"></nav-bar>
    <view class="recharge-box">
      <view class="recharge-coin">USDT</view>
      <view class="recharge-title">链名称</view>
      <view class="recharge-type">
        <view v-for="(item,index) in coinTypeArray" :key="index" :class="{'active':coinType==item}"
          @click="coinType=item">{{item}}</view>
      </view>
      <view class="recharge-code-box">
        <view style="width: 100%;height: 80rpx;"></view>
        <view class="rcb-img img-box">
          <view class="img-box">
            <image :src="codeImg" style="width: 300rpx;height: 300rpx;"></image>
          </view>
        </view>
        <view class="rcb-title">充币地址</view>
        <view class="rcb-address">{{usdtAddrs}}</view>
        <view class="rcb-copy" @click="copyClick(usdtAddrs)">复制</view>
        <view style="width: 100%;height: 60upx;"></view>
      </view>
      <view class="recharge-remark">请勿向上述地址充值任何非USDT-TRC20资产，否则资产将不可退回</view>
    </view>
  </view>
</template>

<script>
  import uniCopy from '@/static/js/uni-copy.js'; //复制
  import QR from '@/static/js/wxqrcode.js'; //生成二维码
  export default {
    data() {
      return {
        coinTypeArray: ["TRC20"],
        coinType: "TRC20",
        codeImg: "",
        usdtAddrs: "", //USDT充币地址
      }
    },
    onLoad() {
      this.usdtAddrs = this.$store.state.assetsInfo.usdtAddr;
      this.codeImg = QR.createQrCodeImg(this.$store.state.assetsInfo.usdtAddr)
    },
    methods: {
      //点击复制
      copyClick(val) {
        uniCopy({
          content: val,
          success: res => {
            this.$common.showToast(res)
          },
          error: res => {
            this.$common.showToast(res)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .recharge-remark {
    width: 660rpx;
    height: 120rpx;
    background: rgba(233, 148, 19, 0.10);
    border-radius: 12rpx;
    font-size: 24rpx;
    font-weight: 400;
    text-align: left;
    color: #e99413;
    line-height: 34rpx;
    padding: 26rpx 36rpx;
    margin: 60rpx auto 0;
  }

  .rcb-copy {
    width: 228rpx;
    height: 72rpx;
    opacity: 1;
    background: #4160fb;
    border-radius: 8rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #ffffff;
    line-height: 72rpx;
    text-align: center;
    margin-top: 40rpx;

    &:active {
      opacity: 0.8;
    }
  }

  .rcb-address {
    text-align: center;
    word-wrap: break-word;
    word-break: normal;
    font-size: 32rpx;
    font-family: "DIN-Medium";
    font-weight: 500;
    text-align: center;
    color: #37383b;
    line-height: 38rpx;
  }

  .rcb-title {
    font-size: 28rpx;
    color: #37383b;
    line-height: 40rpx;
    margin-top: 40rpx;
    margin-bottom: 28rpx;
    font-weight: 400;
  }

  .rcb-img {
    background: #fff;
    width: 308rpx;
    height: 308rpx;
  }

  .recharge-code-box {
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .recharge-type .active {
    color: #4160fb;
    border-color: #4160FB;
  }

  .recharge-type {
    display: flex;
    align-items: center;
  }

  .recharge-type>view {
    width: 156rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 2rpx solid #4160fb;
    border-radius: 10rpx;
    font-size: 28rpx;
    font-family: 'DIN-Medium';
    font-weight: bold;
    text-align: left;
    color: #4160fb;
  }

  .recharge-title {
    color: #0278FF;
    padding: 40rpx 0 20rpx 0;
    font-size: 28rpx;
    font-weight: 400;
    text-align: left;
    color: #37383b;
    line-height: 40rpx;
  }

  .recharge-coin {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    height: 108rpx;
    background: #f4f6fb;
    border-radius: 12rpx;
    font-size: 36rpx;
    font-family: "DIN-Medium";
    font-weight: bold;
    text-align: left;
    color: #37383b;
  }

  .recharge-box {
    padding: 40rpx 30rpx;
  }

  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
