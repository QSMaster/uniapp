<template>
  <view class="container">
    <nav-bar title="提现" bgColor="#FFFFFF" fontColor="#010F14"></nav-bar>

    <view class="mentionMoney-box">
      <view class="mm-b-coin">USDT</view>

      <view class="chainName">
        <view class="name">链名称</view>
        <view class="item">TRC20</view>
      </view>


      <view class="mm-b-input-box">

        <view class="mm-b-input">
          <view class="mm-b-i-title">提现地址</view>
          <view class="mm-b-i-input">
            <view class="mm-b-i-i-box">
              <input type="text" v-model="inputInfo.addrs" placeholder="请输入提现地址" placeholder-class="mm-place" />
            </view>
            <view class="img-box" @click="handleScanCode">
              <image class="shaoma" src="../../static/images/icon_withdraw_shao@2x.png"
                style="width: 40upx;height: 40upx;"></image>
            </view>
          </view>
        </view>

        <view class="mm-b-input">
          <view class="mm-b-i-title">数量</view>
          <view class="mm-b-i-input">
            <view class="mm-b-i-i-box">
              <input type="number" @input="onInput" v-model="inputInfo.numbers"
                :placeholder="'最小提币数量'+ minNeed" placeholder-class="mm-place" />
            </view>
            <view class="mm-b-i-i-title">USDT</view>
            <view class="all" @click="clickAll">全部</view>
          </view>
        </view>

        <view class="balance">可用余额：{{$store.state.assetsInfo.usdt  | qff(4)}} USDT</view>

        <view class="mm-b-input">
          <view class="mm-b-i-title">手续费</view>
          <view class="mm-b-i-input">
            <view class="mm-b-i-i-box">
              <input type="text" v-model="$store.state.sysConfig.extractUsdt" disabled placeholder=""
                placeholder-class="mm-place" />
            </view>
            <view class="mm-b-i-i-title">USDT</view>
          </view>
        </view>

      </view>
      <view style="width: 100%;height: 48rpx;"></view>
      <view class="mention-remark">
        最小提币数量为：{{minNeed}} USDT，为保障资金安全，当你的账户安全策略变更、密码修改，我们会对提币进行人工审核。</view>
      <view style="width: 100%;height: 268rpx;"></view>
    </view>


    <view class="mention-btn">
      <view class="mention-b-title">
        <view class="label">实际到账：</view>
        <view class="value">{{deduct}} USDT</view>
      </view>
      <view class="mb-btn">
        <view @click="handleOpenToast" v-if="isOkDoit==1">提币</view>
        <view v-if="isOkDoit==0" style="background: #ccc !important;">提币</view>
      </view>
    </view>

    <!-- 安全验证 -->
    <my-drop-down-box ref="safetyBox" left-text="安全验证">
      <view class="safetyVerification">

        <view class="inputWrap">
          <view class="inputLabel">交易密码：</view>
          <view class="input_blcok hairline--bottom">
            <view class="inputWrap_row">
              <input class="safetyinput" :type="isEye?'text':'password'" v-model="inputInfo.password"
                placeholder="请输入交易密码" placeholder-class="mm-place" />
              <view class="input_icon" :class="isEye?'close':'open'" @click="handleEye"></view>
            </view>
          </view>
        </view>

        <view class="inputWrap">
          <view class="inputLabel">手机验证码：</view>
          <view class="input_blcok hairline--bottom">
            <view class="mm-b-i-i-box">
              <input class="safetyinput" type="text" v-model="inputInfo.code" placeholder="请输入手机验证码"
                placeholder-class="mm-place" />
            </view>
            <view>
              <view class="ril-getCode" :class="$store.state.sendCodeInfo.className" @click="getCodeClick">
                {{$store.state.sendCodeInfo.title}}
              </view>
            </view>
          </view>
        </view>

        <button class="confimBtn" type="default" @click="clickIsok">确认提币</button>
      </view>
    </my-drop-down-box>


  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';

  export default {
    data() {
      return {
        isEye: false, // 密码是否可见
        inputInfo: {
          numbers: "", //数量
          addrs: "", //提币地址
          password: "", //密码
          code: "", //验证码
        },
        isOkDoit: 0, //是否能进行提币 0不能 1能
      }
    },
    computed: {
      ...mapState({
        minNeed: state => state.sysConfig.extractFloor || 10 // 最小提币数量
      }),
      // 获取实际扣除
      deduct() {
        if (this.inputInfo.numbers) {
          let numbers = this.$CAL.accSub(this.inputInfo.numbers, this.$store.state.sysConfig.extractUsdt)
          return numbers;
        } else {
          return "0.00"
        }
      }
    },
    onShow() {
      //最少需要
      // let min_need = this.$CAL.accAdd(this.$store.state.sysConfig.extractFloor, this.$store.state.sysConfig.extractUsdt)
      // console.log("min_need", min_need);
      if (this.$store.state.assetsInfo.usdt < this.minNeed) {
        this.isOkDoit = 0;
      } else {
        this.isOkDoit = 1;
      }
    },
    onLoad() {
      this.$common.sysConfig()
    },
    methods: {

      handleEye() {
        this.isEye = !this.isEye
      },

      handleOpenToast() {
        if (!this.$store.state.userInfo.phone || this.$store.state.userInfo.phone == "") {
          this.$common.showToast("请先绑定手机号/邮箱")
        } else if (this.inputInfo.addrs == "") {
          this.$common.showToast("请输入提现地址")
        } else if (this.inputInfo.numbers == "" || this.inputInfo.numbers <= 0) {
          this.$common.showToast("请输入提币数量")
        } else if (this.inputInfo.numbers < this.$store.state.sysConfig.extractFloor) {
          this.$common.showToast("最小提币数量 " + this.$store.state.sysConfig.extractFloor + " USDT")
        } else {
          this.$refs.safetyBox.open();
        }
      },


      //监听输入框输入事件
      onInput() {
        // 最多能提
        let canMeor = this.$CAL.accSub(this.$store.state.assetsInfo.usdt, this.$store.state.sysConfig.extractUsdt)
        if (this.inputInfo.numbers > canMeor || this.inputInfo.numbers < this.minNeed) {
          this.isOkDoit = 0;
        } else {
          this.isOkDoit = 1;
        }
      },
      //点击提币按钮
      clickIsok() {
        if (!this.$store.state.userInfo.phone || this.$store.state.userInfo.phone == "") {
          this.$common.showToast("请先绑定手机号/邮箱")
        } else if (this.inputInfo.password == "") {
          this.$common.showToast("请输入支付密码")
        } else if (this.inputInfo.code == "") {
          this.$common.showToast("请输入验证码")
        } else {
          this.extractCoin()
        }
      },

      //点击全部按钮
      clickAll() {
        //最少需要
        let min_need = this.$CAL.accAdd(this.$store.state.sysConfig.extractFloor, this.$store.state.sysConfig.extractUsdt)
        // let min_need = this.$store.state.sysConfig.extractUsdt
        if (this.$store.state.assetsInfo.usdt < this.minNeed) {
          this.$common.showToast("余额不足")
        } else {
          // this.inputInfo.numbers = this.$CAL.accSub(this.$store.state.assetsInfo.usdt, this.$store.state.sysConfig.extractUsdt)
          this.inputInfo.numbers = this.$store.state.assetsInfo.usdt
        }
      },

      //提币
      extractCoin() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.extractCoin({
            amount: _this.deduct,
            code: _this.inputInfo.code,
            password: _this.inputInfo.password,
            usdtAddr: _this.inputInfo.addrs,
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                _this.$common.showToast("提币申请成功", "success")
                setTimeout(() => {
                  uni.navigateBack(-1)
                }, 1300)
              }, 1300)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },

      // 点击获取验证码
      getCodeClick() {
        if (!this.$store.state.sendCodeInfo.isClick) {
          return
        }
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.sendSms({
            type: 1,
            phone: _this.$store.state.userInfo.phone
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                _this.$common.showToast("发送成功", "success")
                setTimeout(() => {
                  _this.$store.commit("countDown")
                }, 1300)
              }, 1300)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },

      // 扫码
      handleScanCode() {
        const _this = this
        uni.scanCode({
          success: function(res) {
            if (res.result) {
              _this.inputInfo.addrs = res.result
            }
          },
          complete(res) {
            console.log('complete', JSON.stringify(res))
            if (res.result && _this.inputInfo.addrs.length === 0) {
              _this.inputInfo.addrs = res.result
            }
          },
          fail(res) {
            console.log('fail', res, JSON.stringify(res))
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    .balance {
      font-size: 26rpx;
      text-align: left;
      color: #5664af;
      line-height: 36rpx;
      margin-top: 20rpx;
    }
  }

  .mentionMoney-box {
    padding: 40rpx 30rpx;
  }

  .safetyVerification {
    padding: 1px 30rpx;


    .inputWrap {
      &_row {
        width: 100%;
        display: flex;
        align-items: center;

        .safetyinput {
          flex: 1;
          margin-right: 30rpx;
          border: none;
          background-color: #ffffff;

          &:active,
          &:focus-visible,
          &:hover {
            border: none;
            outline: 0;
            outline-width: 0;
          }
        }
      }
    }

    .inputLabel {
      font-size: 28rpx;
      font-weight: 400;
      text-align: left;
      color: #37383b;
      line-height: 40rpx;
      margin-bottom: 4rpx;
      margin-top: 24rpx;
    }

    .input_blcok {
      width: 100%;
      height: 112rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .input_icon {
      width: 40rpx;
      height: 40rpx;

      &.open {
        background: url(../../static/images/icon_open@3x.png) no-repeat;
        background-size: contain;
      }

      &.close {
        background: url(../../static/images/icon_close@3x.png) no-repeat;
        background-size: contain;
      }
    }

    .ril-getCode {
      width: 172rpx;
      height: 64rpx;
      background: rgba(65,96,251,0.15);
      border-radius: 8rpx;
      font-size: 28rpx;
      font-weight: bold;
      text-align: center;
      color: #4160FB;
      line-height: 64rpx;
      &.waitecode {
        background: #cbcdd2;
        color: #ffffff;
      }
    }

    .confimBtn {
      width: 100%;
      height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;
      padding: 0;
      margin: 0;
      font-size: 32rpx;
      font-weight: bold;
      color: #ffffff;
      line-height: 96rpx;
      margin-top: 108rpx;
      margin-bottom: 38rpx;

    }

  }



  .chainName {
    margin-top: 40rpx;
    margin-bottom: 60rpx;

    .name {
      font-size: 28rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 40rpx;
      margin-bottom: 20rpx;
    }

    .item {
      width: 156rpx;
      height: 64rpx;
      opacity: 1;
      background: #ffffff;
      border: 2rpx solid #4160fb;
      border-radius: 10rpx;
      font-size: 28rpx;
      font-family: "DIN-Medium";
      font-weight: bold;
      text-align: center;
      color: #4160fb;
      line-height: 64rpx;
    }
  }

  .mention-btn {
    position: fixed;
    width: 100%;
    background: #fff;
    left: 0;
    bottom: 0;
    padding: 38rpx 30upx 38rpx 30upx;
    box-shadow: 0rpx -4rpx 8rpx 0rpx #f4f7fb;

    .mention-b-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 38rpx;

      .label {
        font-size: 28rpx;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 40rpx;
      }

      .value {
        font-size: 40rpx;
        font-family: "DIN-Medium";
        font-weight: bold;
        text-align: right;
        color: #37383b;
        line-height: 48rpx;
      }
    }

    .mb-btn {
      height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 32rpx;
      font-weight: bold;

      &:active {
        opacity: 0.9;
      }

      >view {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
  }


  .mention-remark {
    width: 100%;
    height: 120rpx;
    background: rgba(233, 148, 19, 0.10);
    border-radius: 12rpx;
    padding: 26rpx 28rpx;
    font-size: 24rpx;
    font-weight: 400;
    text-align: left;
    color: #e99413;
    line-height: 34rpx;
  }

  .mm-b-i-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40rpx 0 30rpx;
    height: 108rpx;
    background: #f4f6fb;
    border-radius: 12rpx;

    .mm-b-i-i-box {
      flex: 1;

      >input {
        flex: 1;
        font-size: 36rpx;
        font-family: "DIN-Medium";
        text-align: left;
        color: #37383b;
      }
    }

    .mm-b-i-i-title {
      font-size: 28rpx;
      font-family: "DIN-Medium";
      color: #9ea0a8;
    }

    .all {
      font-size: 28rpx;
      text-align: left;
      color: #4160fb;
      font-weight: bold;
      line-height: 40rpx;
      margin-left: 40rpx;
    }
  }


  .mm-b-i-title {
    margin-top: 48rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    font-weight: bold;
    text-align: left;
    color: #37383b;
    line-height: 40rpx;

  }

  .mm-b-coin {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    height: 108rpx;
    background: #f4f6fb;
    border-radius: 12rpx;
    font-weight: bold;
    font-size: 36rpx;
    font-family: "DIN-Medium";
    text-align: left;
    color: #37383b;
  }
</style>
