<template>
  <!-- 上拉弹窗外壳 -->
  <uni-popup ref="downboxpopup" type="bottom" @change="handleDropDownEvent">
    <view class="dropDown" :style="wrapStyle">

      <view class="dropDown_row">
        <view class="left">

          <view class="dropDown_back" @click="close" v-if="leftIcon=='back' && !$props.left"></view>
          <view class="text" v-else-if="!!leftText && !$props.left">{{ leftText }}</view>
          <slot name="left"></slot>
        </view>
        <view class="dropDown_title">
          <text>{{title}}</text>
        </view>
        <view class="right">
          <view class="dropDown_close" @click="close" v-if="!rightText && !$props.right"></view>
          <view class="text" v-if="!!rightText && !$props.right"><text>{{ rightText }}}</text></view>
          <slot name="right"></slot>
        </view>
      </view>

      <scroll-view class="dropDown_content" scroll-y>
        <slot></slot>
      </scroll-view>
    </view>
  </uni-popup>
</template>

<script>
  export default {
    name: "DropDownBox",
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      leftIcon: {
        type: String,
        validator: function(value) {
          return value === 'back' || value === 'close'
        }
      },
      // 标题栏左侧文案
      leftText: {
        type: String,
        default: ''
      },
      // 标题栏右侧文案
      rightText: {
        type: String,
        default: ''
      },
      height: {
        type: String,
      },
      theme: {
        type: String,
        default: 'noBuySell'
      }
    },
    computed: {
      wrapStyle() {
        return {
          height: this.height
        }
      }
    },
    methods: {
      open() {
        this.$refs.downboxpopup.open()
      },
      close() {
        this.$refs.downboxpopup.close()
      },
      handleDropDownEvent({show, type}){
        if (show){
          uni.hideTabBar()
        } else {
          uni.showTabBar()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/mixin";

  .dropDown {
    width: 750rpx;
    background: #ffffff;
    border-radius: 40rpx 40rpx 0px 0px;
    // padding: 40rpx 30rpx 0 30rpx;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .dropDown_close,
    .dropDown_back {
      @include extend-click(10px);
      width: 40rpx;
      height: 40rpx;
    }

    .dropDown_close {
      background-image: url(../../static/images/icon_tc_qc@3x.png);
      background-size: contain;
    }

    .dropDown_back {
      // background-image: url("/static/images/icon_white_back@3x.png");
      background-size: contain;
    }
    &_row {
      height: 128rpx;
      line-height: 50rpx;
      // margin-bottom: 40rpx;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 30rpx 0 30rpx;
      box-sizing: border-box;
      z-index: 1;

      .text {
        font-size: 40rpx;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 56rpx;
      }
    }

    &_title {
      width: 100%;
      font-size: 36rpx;
      font-weight: 500;
      text-align: center;
      color: #e1e6ea;
      line-height: 50rpx;
      height: 50rpx;

      position: absolute;
      left: 0;
      top: 0;
      text-align: center;
      z-index: -1;
    }

    .buySellTitle {}

    &_close {
      @include extend-click(8px);
      width: 32rpx;
      height: 32rpx;
      background-image: url("../../static/images/icon_close.png");
      background-repeat: no-repeat;
      background-size: contain;
    }

    &_content {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding-top: 1px;
    }
  }
</style>
