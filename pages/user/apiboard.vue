<template>
  <view class="container" @click="closeToast">
    <nav-bar title="API管理" bgColor="#ffffff" fontColor="#010F14" shadow></nav-bar>

    <view class="main">
      <view class="apiList">
        <view class="apiItem" :class="{'hairline--bottom': index !== list.length - 1}" v-for="(item,index) in list"
          :key="item.bourseName + index">
          <image class="coin" :src="item.logoPath" mode="aspectFit"></image>
          <view class="column">
            <view class="name">{{item.bourseShortName}}</view>
            <view class="description" v-if="item.active">
              交易所可用：
              <view class="value">{{item.usdt | qff(2)}} USDT</view>
            </view>
            <view class="description" v-else>支持交易和资产读取</view>

          </view>
          <image class="more" src="../../static/images/icon_more@2x.png" mode="aspectFit"
            @click.stop="handleMore(index)" v-show="item.active=== 1"></image>

          <view class="toast" v-show="toastIndex === index ">
            <view class="toast_item hairline--bottom" @click.stop="handleReplace(item)">换绑</view>
            <view class="toast_item" @click.stop="handleUntie(item)">解绑</view>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom">
      <view class="btn" @click="handleAddAccount">导入API</view>
    </view>

    <!-- 解绑弹窗 -->
    <uni-popup ref="untiePoupup" type="center">
      <view class="untiePoupup">
        <view class="title">确认解绑{{selectItem.bourseShortName}}账户吗?</view>
        <view class="untieTips">请您确认您已经对账户进行了清仓终止，若解绑账户,策略将停止运行,目前已有持仓将不再帮您清仓！</view>
        <view class="row">
          <view class="btn cancle" @click="untieClose">取消</view>
          <view class="btn confim" @click="untieConfim">确认</view>
        </view>
      </view>
    </uni-popup>


    <!-- 选择交易所 -->
    <my-drop-down-box ref="chooseExchange" left-text="选择交易所">
      <view class="chooseExchangeBox">
        <view class="exchange_ist">
          <view class="exchange_item" :class="{'active': chooseExchangeIndex === index}"
            v-for="(item,index) in unboundList" :key="item.id" @click="handleexchangeClick(index)">
            <image class="coin" :src="item.logoPath" mode="aspectFit"></image>
            <view class="column">
              <view class="name">{{item.bourseShortName}}</view>
              <view class="description" v-if="item.active">{{item.usdt}}</view>
              <view class="description" v-else>支持交易和资产读取</view>
            </view>
          </view>
        </view>
        <button class="btn chooseBtn" type="default" @click="handleChooseExchange">确认</button>
      </view>
    </my-drop-down-box>


    <!-- 换绑API key -->
    <my-drop-down-box ref="replaceBox" left-text="换绑API key">
      <view class="replaceBox">
        <view class="tips">
          请务必填写同一账户的API key! 换绑时会暂停所有该API的运行策略，换绑完成后请前往重新启动策略。
        </view>


        <view class="replaceLabel">API Key</view>

        <view class="inputWrap">
          <uni-easyinput class="replaceInput" type="text" :inputBorder="false" v-model="APIKey" placeholder="请输入或粘贴你的API Key" />
        </view>


        <view class="replaceLabel">Secret Key</view>
        <view class="inputWrap">
          <uni-easyinput class="replaceInput" type="text" :inputBorder="false"  v-model="SecretKey" placeholder="请输入或粘贴你的Secret Key" />
        </view>




        <view class="replaceBox_btnWrap">
          <button class="btn" type="default" @click="replaceConfim">确认换绑</button>
        </view>



      </view>
    </my-drop-down-box>


  </view>
</template>

<script>
  export default {
    data() {
      return {
        isOpenPopup: false,

        APIKey: "",
        SecretKey: "",

        selectItem: {},
        chooseExchangeIndex: 0,
        toastIndex: null,
        list: {}
      };
    },
    onLoad(options) {
      if (options.open) {
        this.isOpenPopup = options.open
        // this.$refs.chooseExchange.open()
      }
      this.getList()
    },
    computed: {
      unboundList() {
        if (this.list.length) {
          return this.list.filter(item => item.active === 0)
        } else {
          return []
        }
      },
    },
    methods: {
      getList() {
        const _this = this
        this.$api.userBourselist({}, res => {
          this.list = res.result

          // 从首页进入并且存在未绑定的交易所api, 则打开弹窗
          let open = (res.result.filter(item => item.active === 0)).length > 0


          if (_this.isOpenPopup && open) {
            _this.$refs.chooseExchange.open()
          }
        })
      },

      // 关闭解绑弹窗
      untieClose() {
        this.selectItem = {}
        this.$refs.untiePoupup.close()
      },

      // 确认解绑
      untieConfim() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.removeAuthorization({
              currencyId: this.selectItem.id
            },
            res => {
              if (res.code == 200) {
                _this.$common.showToast("解绑成功", "success")
                _this.getList();
                _this.untieClose()
              } else {
                uni.hideLoading()
              }
              _this.$store.state.BtnFlag = true;
            }
          );
        }
      },

      // 导入api时点击选择交易所
      handleexchangeClick(index) {
        this.chooseExchangeIndex = index
      },

      // 确认换绑
      replaceConfim() {
        if (this.APIKey === "") {
          this.$common.showToast("请输入APIKey");
          return;
        }
        if (this.SecretKey === "") {
          this.$common.showToast("请输入SecretKey", "error");
          return;
        }
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          });
          let param = {
            apiKey: this.APIKey,
            currencyId: this.selectItem.id,
            secretkey: this.SecretKey
          };
          this.$api.apiAuthorization(param, res => {
            console.log(res);
            if (res.code == 200) {
              _this.$common.showToast("换绑成功", "success")
              _this.getList();
              this.$refs.replaceBox.open()
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          });
        }
      },

      // 确认选择交易所
      handleChooseExchange() {
        const seletItem = this.unboundList[this.chooseExchangeIndex]
        this.$common.skipTo(`/pages/index/binance?id=${seletItem.id}&name=${seletItem.bourseShortName}`);
      },

      closeToast() {
        this.toastIndex = null
      },

      handleMore(index) {
        this.toastIndex = index
      },

      // 解绑
      handleUntie(item) {
        this.toastIndex = null
        this.selectItem = item
        this.$refs.untiePoupup.open()
      },

      // 换绑
      handleReplace(item) {
        this.toastIndex = null
        this.selectItem = item
        this.$refs.replaceBox.open()
      },

      // 添加账户
      handleAddAccount() {
        this.$refs.chooseExchange.open()
      },

      handleClickItem(item) {
        this.$common.skipTo('/pages/index/binance?id=' + item.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #fafafd;
    padding-bottom: 176rpx;

    .main {
      padding-top: 24rpx;
    }


    .btn {
      width: 100%;
      height: 96rpx;
      line-height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;
      font-size: 32rpx;
      font-weight: bold;
      text-align: center;
      color: #ffffff;

      &:active {
        opacity: 0.9;
      }
    }
  }

  // 解绑弹窗
  .untiePoupup {
    padding: 48rpx 54rpx 0;
    background-color: #fff;
    width: 588rpx;
    height: 438rpx;
    border-radius: 30rpx;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      text-align: center;
      color: #37383b;
      line-height: 50rpx;
      margin-bottom: 40rpx;

    }

    .untieTips {
      font-size: 28rpx;
      text-align: left;
      color: #5e6066;
      line-height: 40rpx;
    }

    .row {
      margin-top: 56rpx;
      display: flex;
      justify-content: space-between;

      .btn {
        width: 224rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 8rpx;
        font-size: 26rpx;
        font-weight: bold;
        text-align: center;
        color: #ffffff;

        &:active {
          opacity: 0.9;
        }

        &.cancle {
          background: #f4f6fb;
          color: #5e6066;
        }

        &.confim {
          background: linear-gradient(135deg, #5470ff, #4160fb);
          color: #ffffff;
        }
      }
    }
  }

  // 选择交易所弹窗
  .chooseExchangeBox {
    padding: 20rpx 30rpx 40rpx;

    .exchange_item {
      height: 144rpx;
      background: #f4f6fb;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      padding: 0 40rpx;
      margin-bottom: 36rpx;
      border: 2rpx solid #f4f6fb;

      &.active {
        background-color: #fff;
        border: 2rpx solid #4160fb;
      }
    }

    .column {
      display: flex;
      flex-direction: column;
    }

    .coin {
      width: 60rpx;
      height: 60rpx;
      margin-right: 28rpx;
    }

    .name {
      font-size: 28rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 40rpx;
    }

    .description {
      font-size: 28rpx;
      text-align: left;
      color: #9ea0a8;
      line-height: 40rpx;
      margin-top: 4rpx;
      display: flex;
      .value {
        color: #06a37a;
        font-family: DIN-Medium;
      }
    }

    .chooseBtn {
      margin-top: 116rpx;
    }

  }


  .replaceBox {
    padding: 0 30rpx;

    .replaceBox_btnWrap {
     padding: 76rpx 0 38rpx 0;
    }

    .tips {
      height: 144rpx;
      background: rgba(233, 148, 19, 0.10);
      border-radius: 12rpx;
      padding: 20rpx 30rpx;

      font-size: 24rpx;
      text-align: left;
      color: #e99413;
      line-height: 34rpx;
    }

    .replaceLabel {
      font-size: 28rpx;
      font-family: DIN-Medium;
      font-weight: 500;
      text-align: left;
      color: #37383b;
      line-height: 34rpx;
      margin-top: 40rpx;
      margin-bottom: 24rpx;
    }

    .inputWrap {
      width: 100%;
      height: 108rpx;
      opacity: 1;
      background: #f4f6fb;
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      padding: 0 20rpx 0 30rpx;
    }


    .replaceInput {}



  }

  .tips {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 40rpx;
    margin-bottom: 20rpx;

    .icon {
      width: 100rpx;
      height: 100rpx;
      margin-right: 10rpx;
    }
  }

  .apiList {
    background-color: #fff;
    padding: 0 40rpx;

    .apiItem {
      height: 188rpx;
      background-color: #fff;
      margin-bottom: 24rpx;
      display: flex;
      align-items: center;
      padding: 40rpx 0;
      position: relative;

      .toast {
        position: absolute;
        top: 124rpx;
        right: -16rpx;
        width: 200rpx;
        height: 206rpx;
        background: #ffffff;
        border-radius: 18rpx;
        box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(211, 216, 223, 0.50);
        padding: 0 21rpx;
        z-index: 1;
        transition: all 0.3s;

        &_item {
          height: 50%;
          font-size: 28rpx;
          font-weight: bold;
          color: #37383b;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .coin {
        width: 60rpx;
        height: 60rpx;
        margin-right: 20rpx;
        align-self: flex-start;
      }

      .column {
        align-self: flex-start;
        flex: 1;
        padding-top: 10rpx;

        .name {
          font-size: 32rpx;
          font-weight: bold;
          text-align: left;
          color: #37383b;
          line-height: 44rpx;
          margin-bottom: 16rpx;
        }

        .description {
          font-size: 28rpx;
          font-weight: 400;
          text-align: left;
          color: #9ea0a8;
          line-height: 40rpx;
          display: flex;
          .value {
            color: #06a37a;
            font-family: DIN-Medium;
          }
        }
      }

      .more {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }


  .bottom {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 40rpx 30rpx;
    box-shadow: 0rpx -4rpx 8rpx 0rpx #f4f7fb;
    background-color: #fff;

    .btn {
      width: 100%;
      height: 96rpx;
      // line-height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;
      font-size: 32rpx;
      font-weight: bold;
      text-align: center;
      color: #ffffff;

      &:active {
        opacity: 0.9;
      }
    }
  }
</style>
