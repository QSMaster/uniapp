<template>
  <view class="container">
    <nav-bar title="我的激活码" bgColor="#ffffff" fontColor="#010F14"></nav-bar>

    <view style="width: 100%;height: calc(100% - 88rpx);">
      <z-paging ref="paging" @query="queryList" :list.sync="dataList">
        <view class="jihuoma-box">

          <view class="jihuoma-list" v-for="(item,index) in dataList" :key="item.id" :class="classs[item.status]">
            <!-- <view class="jl-title2">{{item.code}}</view> -->


            <view class="left">
              <view class="jl-title1">激活码</view>
              <view class="code">{{item.code}} <view class="copy" v-if="item.status===0" @click="copyClick(item.code)"></view></view>
              <view class="time" v-show="item.state">到期时间：{{item.expiredTime}}</view>
            </view>

            <view class="right">
              <view class="status">{{item.status | status}}</view>
              <view class="day" v-if="item.status === 0">使用时长：{{item.codeEffectiveTime}}天</view>

            </view>


            <!-- <view class="jl-other">
                 <view class="jl-o-time">{{item.createTime}}</view>
                 <view class="jl-o-copy" @click="copyClick(item.code)">
                   <view class="img-box">
                     <image src="../../static/image/jihuo-copy.png" style="width: 32upx;height: 32upx;"></image>
                   </view>
                   <view class="jl-title1" style="padding-left: 10upx;">复制</view>
                 </view>
               </view>
      -->

          </view>

          <!-- <view style="width: 100%;height: 200upx;"></view> -->
        </view>
      </z-paging>

    </view>


    <!-- <view class="jihuo-btn">
      <view @click="clickBuy">购买</view>
    </view>
    -->

    <!-- 购买激活码弹窗 -->
    <!--  <uni-popup ref="buyPoupup" type="center">
      <view class="popupbox">
        <view class="pb-title">购买激活码</view>
        <view style="padding: 40upx;">
          <view class="pb-input-list">
            <view class="pb-i-l-title">购买数量</view>
            <view>
              <uni-number-box v-model="buyNumber" :min="1"></uni-number-box>
            </view>
          </view>
          <view class="pb-input-list">
            <view class="pb-i-l-title">交易密码</view>
            <view>
              <input type="password" v-model="pay_password" placeholder="请输入交易密码" />
            </view>
          </view>
        </view>
        <view class="pay-number">
          <view>支付：<span>{{payUsdt}} USDT</span></view>
        </view>
        <view style="width: 100%;height: 60upx;"></view>
        <view class="pb-btn-box">
          <view class="pb-b-b-cancel" @click="cancelPop">取消</view>
          <view class="pb-b-b-ok" @click="clickOk">确认</view>
        </view>
      </view>
    </uni-popup> -->


  </view>
</template>

<script>
  import uniCopy from '@/static/js/uni-copy.js'; // 复制

  export default {
    data() {
      return {
        classs: {
          0: 'toBeActivated',
          1: 'activated',
          2: 'expired'
        },

        buyNumber: "1", //购买数量
        dataList: [],
        tabIndex: 0,
        btnFlag: true,
        pay_password: "", //交易密码
      }
    },
    computed: {
      payUsdt: function() {
        return this.$CAL.accMul(this.buyNumber, this.$store.state.sysConfig.codePrice)
      }
    },
    onLoad() {
      this.$common.sysConfig()
    },
    filters: {
      status(val) {
        let str = ''
        if (val === 0) {
          str = '待激活'
        } else if (val === 1) {
          str = '已激活'
        } else if (val === 2) {
          str = '已过期'
        }
        return str
      }
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
      },

      //点击确定
      clickOk() {
        let _this = this;
        if (this.pay_password == "") {
          this.$common.showToast("请输入交易密码")
        } else {
          if (this.btnFlag) {
            _this.btnFlag = false;
            _this.$refs.buyPoupup.close();
            uni.showLoading({
              title: "loading..."
            })
            _this.$api.activationCodeBuyIn({
              buyNum: _this.buyNumber,
              password: _this.pay_password,
            }, res => {
              _this.pay_password = "";
              if (res.code == 200) {
                setTimeout(() => {
                  uni.hideLoading()
                  _this.$common.showToast("购买成功", "success")
                  setTimeout(() => {
                    _this.$refs.paging.reload()
                  }, 1300)
                }, 1500)
              } else {
                uni.hideLoading()
              }
              _this.btnFlag = true;
            })
          }
        }
      },

      queryList(pageNo, pageSize) {
        this.$api.activationCodeList({
          pageNum: pageNo,
          pageSize: pageSize,
        }, res => {
          const list = res.result.list

          const now = new Date().getTime()

          list.forEach(item => {
            // 判断激活码状态，未激活，已激活，已失效
            // 如果

            if (!item.state) {
              item.status = 0
            } else {
              const expiredTime = new Date(item.expiredTime).getTime()

              if (item.state && now < expiredTime) {
                item.status = 1
              } else {
                item.status = 2
              }

            }


          })

          console.log(list);
          this.$refs.paging.complete(list);
        })
      },

      //点击取消
      cancelPop() {
        this.$refs.buyPoupup.close();
      },

      //点击购买
      clickBuy() {
        this.buyNumber = 1;
        this.$refs.buyPoupup.open();
      }
    }
  }
</script>

<style scoped lang="scss">
  >>>.z-paging-content-fixed {
    top: 138upx;
  }

  .jl-title1 span {
    font-size: 28upx;
    padding-left: 20upx;
  }

  .jihuo-isdo {
    background: #D5D7DB !important;
  }

  .jl-o-copy {
    display: flex;
    align-items: center;
  }

  .jl-o-time {
    color: #fff;
    font-size: 28upx;
  }

  .jl-other {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .jl-title2 {
    color: #fff;
    font-size: 64upx;
  }

  .jl-title1 {
    font-size: 28upx;
    color: #fff;
  }

  .jihuoma-box {
    padding: 0upx 30upx;
  }

  .jihuoma-list {
    width: 100%;
    height: 248rpx;
    border-radius: 5px;
    padding: 40rpx;
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    margin-top: 40rpx;

    &.toBeActivated {
      background: url(../../static/images/mine/bg_mime_jhm2@2x.png) no-repeat;
      background-size: cover;

      .left .code {
        opacity: 1;
      }

      .status {
        background-color: #1A2978;
      }
    }

    &.activated {
      background: url(../../static/images/mine/bg_wdjhm_2@3x.png) no-repeat;
      background-size: contain;

      .status {
        background-color: #41465C;
      }
    }

    &.expired {
      background: url(../../static/images/mine/bg_wdjhm_3@3x.png) no-repeat;
      background-size: contain;

      .status {
        background-color: #9EA3B6;
      }
    }

    .left {
      .jl-title1 {
        font-size: 24rpx;
        text-align: left;
        color: #ffffff;
        line-height: 34rpx;
        margin-bottom: 8rpx;
      }

      .code {
        opacity: 0.7;
        font-size: 48rpx;
        font-family: DIN-Bold;
        font-weight: bold;
        text-align: left;
        color: #ffffff;
        line-height: 58rpx;
        display: flex;
        align-items: center;
        .copy {
          width: 40rpx;
          height: 40rpx;
          background: url(../../static/images/mine/icon_jhm_copy@3x.png) no-repeat;
          background-size: contain;
          margin-left: 16rpx;
        }
      }

      .time {
        font-size: 24rpx;
        text-align: left;
        color: #ffffff;
        line-height: 34rpx;
        margin-top: 38rpx;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      .status {
        width: 118rpx;
        height: 48rpx;
        opacity: 1;
        border-radius: 12rpx;

        font-size: 26rpx;
        text-align: center;
        color: #ffffff;
        line-height: 48rpx;
      }

      .day {
        font-size: 28rpx;
        font-weight: 500;
        text-align: right;
        color: #ffffff;
        line-height: 40rpx;
      }
    }


  }

  .pb-b-b-ok {
    border-left: 1px solid #DADFE6;
    color: #027AFF;
    font-size: 32upx;
  }

  .pb-b-b-cancel {
    color: #969696;
    font-size: 32upx;
  }

  .pb-btn-box {
    display: flex;
    align-items: center;
    border-top: 1px solid #DADFE6;
  }

  .pb-btn-box>view {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96upx;
  }

  .pay-number {
    display: flex;
    align-content: center;
    justify-content: flex-end;
    padding: 0 40upx;
    font-size: 28upx;
  }

  .pay-number span {
    color: #027AFF;
    font-size: 28upx;
  }

  .pb-i-l-title {
    font-size: 28upx;
    padding-right: 30upx;
  }

  .pb-input-list {
    display: flex;
    border-bottom: 1px solid #DADFE6;
    padding: 30upx 0;
    align-items: center;
  }

  .pb-title {
    padding: 30upx;
    text-align: center;
    font-size: 36upx;
    font-weight: 600;
  }

  .popupbox {
    width: 620upx;
    border-radius: 10px;
    background: #fff;
  }

  .jihuo-btn {
    padding: 30upx;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #fff;
    z-index: 1;
  }

  .jihuo-btn>view {
    width: 100%;
    height: 90upx;
    background: #0278FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 3px;
  }

  .container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #FFFFFF;
  }
</style>
