<template>
  <view class="buyActivationCode">

    <view class="cycle">
      <view class="price">10 USDT / 30天</view>

    </view>

    <view class="buy_tips">温馨提示：购买激活码后复制,去粘贴激活会员,多次购买可以赠予他人。</view>


    <view class="bumberBoxWrap hairline--bottom">
      <view class="label">购买数量</view>
      <uni-number-box v-model="buyNumber" :min="1"></uni-number-box>
    </view>

    <view class="safetyVerification">
      <view class="label">交易密码</view>
      
      <uni-easyinput  v-model="transactionPwd" placeholder="请输入交易密码" />
    </view>



  </view>
</template>

<script>
  export default {
    name: "buy-activation-code",
    data() {
      return {
        transactionPwd: '',
        buyNumber: 1

      };
    }
  }
</script>

<style lang="scss" scoped>
  .buyActivationCode {
    background-color: #F3F3F3;
    padding-bottom: 100rpx;
    position: fixed;
    bottom: 0;
    left: 0;

    .label {
      font-size: 32rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 44rpx;
    }

    .cycle {
      width: 690rpx;
      height: 200rpx;
      background: url(../../static/images/mine/bg_mime_jhm3@3x.png) no-repeat;
      background-size: contain;
      display: flex;
      align-items: center;
      justify-content: flex-end;

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
    }


    .bumberBoxWrap {
      display: flex;
      justify-content: space-between;
      padding: 44rpx 0;


    }


  }
</style>
