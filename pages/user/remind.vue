<template>
  <view class="container">
    <nav-bar title="提醒额度" bgColor="#FFFFFF" fontColor="#010F14"></nav-bar>
    <view class="remind-box">
      <view class="remind-title">提醒额度</view>
      <view class="remind-input">
        <input type="number" v-model="numbers" placeholder="请输入提醒额度" placeholder-class="remind-place" />
        <view class="coin">USDT</view>
      </view>

      <view class="tips">
        在账户剩余 {{numbers || 0}} USDT 以后，开始提醒额度不足，账户余额没有额度会影响策略的使用。
      </view>

      <view class="remind-btn">
        <view @click="clickOk">确认</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        btnFlag: true,
        numbers: 10, //提醒额度
      }
    },
    onShow() {
      if (this.$store.state.userInfo.quota) {
        this.numbers = this.$store.state.userInfo.quota
      }
    },
    methods: {
      //点击确认
      clickOk() {
        if (this.numbers == "") {
          this.$common.showToast("请输入提醒额度")
        } else if (this.numbers == this.$store.state.userInfo.quota) {
          this.$common.showToast("当前数值未变化")
        } else {
          this.updateQuota()
        }
      },
      //修改提醒额度
      updateQuota() {
        let _this = this;
        if (this.btnFlag) {
          this.btnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.updateQuota({
            quota: _this.numbers
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                uni.hideLoading()
                _this.$common.showToast("设置成功", "success")
                setTimeout(() => {
                  uni.navigateBack(-1)
                }, 1300)
              }, 1500)
            } else {
              uni.hideLoading()
            }
            _this.btnFlag = true;
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .remind-btn>view {
    height: 96upx;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4160fb;
    border-radius: 12rpx;

    font-size: 32rpx;
    font-weight: bold;

    &:active {
      opacity: 0.9;
    }
  }

  .remind-input {
    width: 100%;
    height: 108rpx;
    background: #f4f6fb;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    padding: 0 40rpx 0 30rpx;

    .coin {
      font-size: 28rpx;
      font-family: "DIN-Medium";
      font-weight: bold;
      color: #9ea0a8;
      line-height: 34rpx;
    }
  }

  .remind-input input {
    height: 108rpx;
    font-weight: 600;
    flex: 1;
    font-size: 28rpx;

  }

  .remind-place {
    font-size: 28upx;
    font-weight: 100;
  }

  .remind-title {
    font-size: 28rpx;
    font-weight: bold;
    text-align: left;
    color: #37383b;
    line-height: 40rpx;
    margin-bottom: 20rpx;
  }

  .remind-box {
    padding: 60rpx 30rpx;
  }

  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }


  .tips {
    width: 100%;
    height: 120rpx;
    padding: 32rpx 26rpx;
    background: rgba(233, 148, 19, 0.10);
    border-radius: 12rpx;

    font-size: 24rpx;
    text-align: left;
    color: #e99413;
    line-height: 34rpx;
    margin-top: 48rpx;
    margin-bottom: 72rpx;

  }
</style>
