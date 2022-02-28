<template>
  <view class="container">
    <nav-bar title="互转" bgColor="#FFFFFF" fontColor="#010F14"></nav-bar>

    <view class="tb-box">
      <view class="mm-b-coin">USDT</view>


      <view class="mm-b-input">
        <view class="mm-b-i-title">接收手机号</view>
        <view class="mm-b-i-input">
          <view class="mm-b-i-i-box">
            <uni-easyinput :inputBorder="false" class="input" type="text" v-model="inputInfo.account" placeholder="请输入接收手机号" placeholder-class="mm-place" />
          </view>
        </view>
      </view>

      <view class="mm-b-input">
        <view class="mm-b-i-title">转出数量</view>
        <view class="mm-b-i-input">
          <view class="mm-b-i-i-box">
            <uni-easyinput :inputBorder="false" type="number" @input="onInput" v-model="inputInfo.numbers"
              :placeholder="'最小提币数量'+$store.state.sysConfig.extractFloor" placeholder-class="mm-place" />
          </view>
          <view class="mm-b-i-i-title">USDT</view>
          <view class="all" @click="clickAll">全部</view>
        </view>
      </view>




      <!-- <view class="mm-b-input">
				<view class="mm-b-i-title">接收账号</view>
				<view class="mm-b-i-input">
					<view class="mm-b-i-i-box" style="width: 100%;">
						<input type="text" v-model="inputInfo.account" placeholder="请输入接收账号" placeholder-class="mm-place" />
					</view>
				</view>
			</view> -->


      <!-- 	<view class="mm-b-input">
				<view class="mm-b-i-title">转出数量</view>
				<view class="mm-b-i-input">
					<view class="mm-b-i-i-box" style="width: 100%;">
						<input type="number" @input="onInput" v-model="inputInfo.numbers" placeholder="请输入转出数量" placeholder-class="mm-place" />
					</view>
				</view>
			</view> -->


      <view class="Balance">可用余额：{{$store.state.assetsInfo.usdt | qff(4) }} USDT</view>


      <view class="mention-remark">
        最小互转数量为：{{$store.state.sysConfig.extractFloor}} USDT，为保障资金安全，当你的账户安全策略变更、密码修改，我们会对提币进行人工审核。</view>


      <!-- 	<view class="mm-b-input">
				<view class="mm-b-i-title">手续费用</view>
				<view class="mm-b-i-input">
					<view class="mm-b-i-i-box" style="width: 100%;">
						<input type="number" v-model="$store.state.sysConfig.transactionUsdt" disabled placeholder="0" placeholder-class="mm-place" />
					</view>
				</view>
			</view> -->



      <!-- <view class="mm-b-input">
				<view class="mm-b-i-title">支付密码</view>
				<view class="mm-b-i-input">
					<view class="mm-b-i-i-box" style="width: 100%;">
						<input type="password" v-model="inputInfo.password" placeholder="请输入支付密码" placeholder-class="mm-place" />
					</view>
				</view>
			</view> -->


      <!-- 	<view class="mm-b-input">
				<view class="mm-b-i-title">验证码</view>
				<view class="mm-b-i-input">
					<view class="mm-b-i-i-box" style="width: 500upx;">
						<input type="text" v-model="inputInfo.code" placeholder="请输入验证码" placeholder-class="mm-place" />
					</view>
					<view>
						<view class="ril-getCode" :class="$store.state.sendCodeInfo.className" @click="getCodeClick">
							{{$store.state.sendCodeInfo.title}}</view>
					</view>
				</view>
			</view> -->

      <!-- 	<view class="tb-btn">
				<view @click="clickIsok" v-if="isOkDoit==1">确定</view>
				<view v-if="isOkDoit==0" style="background: #ccc !important;">确定</view>
			</view> -->


    </view>


    <view class="mention-btn">
      <view class="mention-b-title">
        <view class="label">互转实际到账：</view>
        <view class="value">{{deduct}} USDT</view>
      </view>
      <view class="mb-btn">
        <view @click="handleOpenToast" v-if="isOkDoit==1">互转</view>
        <view v-if="isOkDoit==0" style="background: #ccc !important;">互转</view>
      </view>
    </view>





    <!-- 安全验证 -->
    <my-drop-down-box ref="InterchangeBox" left-text="安全验证">
      <view class="safetyVerification">

        <view class="inputWrap">
          <view class="inputLabel">支付密码：</view>
          <view class="input_blcok hairline--bottom">
            <view class="inputWrap_row">
              <input class="safetyinput" :type="isEye?'text':'password'" v-model="inputInfo.password"
                placeholder="请输入支付密码" placeholder-class="mm-place" />
              <view class="input_icon" :class="isEye?'close':'open'" @click="handleEye"></view>
            </view>
          </view>
        </view>


        <view class="inputWrap">
          <view class="inputLabel">手机验证码：</view>
          <view class="input_blcok hairline--bottom">
            <view class="mm-b-i-i-box">
              <input class="safetyinput" type="text" v-model="inputInfo.code" placeholder="请输入验证码"
                placeholder-class="mm-place" />
            </view>
            <view>
              <view class="ril-getCode" :class="$store.state.sendCodeInfo.className" @click="getCodeClick">
                {{$store.state.sendCodeInfo.title}}
              </view>
            </view>
          </view>
        </view>

        <button class="confimBtn" type="default" @click="clickIsok">确认互转</button>


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
          account: "", //接收账号
          numbers: "", //数量
          password: "", //密码
          code: "" //验证码
        },
        isOkDoit: 0, //是否能进行转账 0不能 1能
      }
    },
    computed: {
      ...mapState({
        minNeed: state => state.sysConfig.extractFloor || 10 // 最小提币数量
      }),

      // 获取实际扣除
      deduct() {
        if (this.inputInfo.numbers) {
          let numbers = this.$CAL.accSub(this.inputInfo.numbers, this.$store.state.sysConfig.transactionUsdt)
          return numbers;
        } else {
          return "0.00"
        }
      }
    },
    onLoad() {

    },
    onShow() {
      if (this.$store.state.assetsInfo.usdt < this.$store.state.sysConfig.extractUsdt) {
        this.isOkDoit = 0;
      } else {
        this.isOkDoit = 1;
      }
    },
    methods: {
      //监听输入框输入事件
      onInput() {
        // 最多能转
        let canMoer = this.$CAL.accSub(this.$store.state.assetsInfo.usdt, this.$store.state.sysConfig.extractUsdt)
        if (this.inputInfo.numbers > canMoer) {
          this.isOkDoit = 0;
        } else {
          this.isOkDoit = 1;
        }
      },


      handleOpenToast() {
        if (!this.$store.state.userInfo.phone || this.$store.state.userInfo.phone == "") {
          this.$common.showToast("请先绑定手机号/邮箱")
        } else if (this.inputInfo.account == "") {
          this.$common.showToast("请输入接收账号")
        } else if (this.inputInfo.numbers == "" || this.inputInfo.numbers <= 0) {
          this.$common.showToast("请输入转出数量")
        } else if (this.inputInfo.numbers < this.$store.state.sysConfig.extractFloor) {
          this.$common.showToast("最小互转数量 " + this.$store.state.sysConfig.extractFloor + " USDT")
        } else {
          this.$refs.InterchangeBox.open();
        }
      },



      //点击确定按钮
      clickIsok() {
        if (!this.$store.state.userInfo.phone || this.$store.state.userInfo.phone == "") {
          this.$common.showToast("请先绑定手机号/邮箱")
        } else if (this.inputInfo.account == "") {
          this.$common.showToast("请输入接收账号")
        } else if (this.inputInfo.numbers == "" || this.inputInfo.numbers <= 0) {
          this.$common.showToast("请输入转出数量")
        } else if (this.inputInfo.password == "") {
          this.$common.showToast("请输入支付密码")
        } else if (this.inputInfo.code == "") {
          this.$common.showToast("请输入验证码")
        } else {
          this.transferAccounts()
        }
      },

      //点击全部按钮
      clickAll() {
        //最少需要
        if (this.$store.state.assetsInfo.usdt < this.minNeed) {
          this.$common.showToast("余额不足")
        } else {
          // this.inputInfo.numbers = this.$CAL.accSub(this.$store.state.assetsInfo.usdt, this.$store.state.sysConfig.extractUsdt)
          this.inputInfo.numbers = this.$store.state.assetsInfo.usdt
        }
      },

      //互转
      transferAccounts() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.transferAccounts({
            receiveAccount: _this.inputInfo.account,
            checkCode: _this.inputInfo.code,
            payPassword: _this.inputInfo.password,
            transferOutQuantity: _this.deduct,
          }, res => {
            console.log(res)
            if (res.code == 200) {
              setTimeout(() => {
                _this.$common.showToast("转出成功", "success")
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

    }
  }
</script>

<style scoped lang="scss">
  .mm-b-i-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20rpx 0 30rpx;
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
      margin-left: 10rpx;
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
      }
    }
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
      background: #37383b;
      border-radius: 8rpx;
      font-size: 28rpx;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
      line-height: 64rpx;
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

  .mm-b-i-title {
    margin-top: 48rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    font-weight: bold;
    text-align: left;
    color: #37383b;
    line-height: 40rpx;

  }

  .Balance {
    font-size: 26rpx;
    text-align: left;
    color: #5664AF;
    line-height: 36rpx;
    margin-top: 20rpx;
    margin-bottom: 46rpx;
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



  .tb-btn {
    padding-top: 100upx;
  }

  .tb-btn>view {
    width: 100%;
    height: 90upx;
    background: #0278FF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    box-shadow: 1px 3px 4px #b1b1b1;
  }

  .waitecode {
    color: #949393 !important;
    font-size: 26upx;
  }

  .ril-getCode {
    color: #0278FF;
    font-size: 26upx;
  }

  .mm-place {
    font-size: 26upx;
    color: #969696;
  }

  .mm-b-i-i-box {
    width: 620upx;
  }

  .mm-b-i-i-box>input {
    height: 96upx;
  }

  .mm-b-i-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px solid #F0F0F0;
  }

  // .mm-b-i-title {
  // 	padding-top: 30upx;
  // }

  .tb-box {
    padding: 40rpx 30rpx;
  }

  .container {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
</style>
