<template>
  <view class="container">
    <nav-bar title="文章" backState="1000" bgColor="#FFFFFF" fontColor="#010F14"></nav-bar>

    <view class="information-box">
      <view class="ib-topTitle">{{noticeInfo.title}}</view>
      <view class="ib-time">{{noticeInfo.createTime}}</view>
      <view>
        <view class="img-box">
          <image :src="noticeInfo.image" style="width: 100%;" mode="widthFix"></image>
        </view>
      </view>
      <view style="width: 100%;height: 50upx;"></view>
      <view>
        <view v-html="noticeInfo.content"></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        noticeInfo: "",
      };
    },
    onLoad(option) {
      this.$api.noticeDetail({
        id: option.id
      }, res => {
        this.noticeInfo = res.result;
      })
    },
    methods: {}
  };
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    word-wrap: break-word;
    background: #FFFFFF;

    .information-box {
      padding: 40rpx;
      background: #ffffff;

      .ib-topTitle {
        font-size: 40rpx;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 64rpx;
      }

      .ib-time {
        font-size: 28rpx;
        font-family: DIN-Regular;
        text-align: left;
        color: #9ea0a8;
        line-height: 34rpx;
        margin-top: 28rpx;
        margin-bottom: 56rpx;
      }
    }
  }
</style>
