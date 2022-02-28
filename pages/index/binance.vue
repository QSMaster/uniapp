<template>
  <view class="container">
    <nav-bar :title="title" backState="3000" bgColor="#FFFFFF" fontColor="#010F14" @backClick="handleBackClick" :shadow="false">
      <!-- <view slot="right" class="right-title" v-if="isBind==0" @tap="toCourse">教程</view> -->
    </nav-bar>

    <view class="binance-content">
      <!-- notice -->
      <view class="binance-content-notice" v-if="isBind==0">
        <view class="binance-notice-text">
          <view class="bigText">开启机器人需要API权限</view>
          <view class="text">1.获取到{{headerTitle}}的API Key，用户同步持仓和交易数据。</view>
          <view class="text">2.输入或者粘贴你的API Key。</view>
          
          <view class="binance-notice-btn" @click="toCourse">操作教程</view>
        </view>
      </view>
      <!-- api-key -->
      <view class="binance-apikey">
        <view class="binance-apikey-title">API Key</view>
        <view class="input-apikey">
          <input type="text" :disabled="isBind==1" :class="{'blue':isBind==1}" v-model="apikey" class="uni-input"
            placeholder="请输入API Key" />
        </view>
      </view>

      <view class="binance-apikey">
        <view class="binance-apikey-title">Secret Key</view>
        <view class="input-apikey">
          <input type="text" :disabled="isBind==1" :class="{'blue':isBind==1}" v-model="Secretkey" class="uni-input"
            placeholder="请输入Secret Key" />
        </view>
      </view>
      <view class="btn-box">
        <button class="btn" :class="{'jiebang-class':isBind==1}" @click="clickGo">{{isBind==0?"导入":"解绑"}}</button>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: "",

        apikey: '',
        Secretkey: '',
        bourseId: '', //交易所id
        isBind: 0, // 是否绑定 0未绑定  1绑定了
        headerTitle: "", //头部标题
      };
    },
    onLoad(option) {
      this.bourseId = option.id;
      this.title = `导入${option.name}API`
      let brouseItem = this.$store.state.bourseArray.find(item => {
        if (item.id == option.id) {
          return item
        }
      })
      this.headerTitle = brouseItem.bourseShortName
    },
    onShow() {
      this.isAuthorization()
      const bandKey = uni.getStorageSync('bandKey')

      if (bandKey.apikey) {
        this.apikey = bandKey.apikey
      }

      if (bandKey.Secretkey) {
        this.Secretkey = bandKey.Secretkey
      }
    },
    onHide() {
      uni.setStorage({
        key: 'bandKey',
        data: {
          apikey: this.apikey,
          Secretkey: this.Secretkey
        },
        success() {
          console.log('设置成功');
        }
      })
    },
    methods: {
      // 重新定义页面返回事件
      handleBackClick() {
        uni.navigateBack()
        uni.setStorage({
          key: 'bandKey',
          data: {}
        })
      },

      //点击按钮
      clickGo() {
        let _this = this;
        if (this.isBind == 0) {
          this.toLead();
        } else {
          uni.showModal({
            title: "温馨提示",
            content: "是否立即解除绑定？",
            showCancel: true,
            cancelText: '取消',
            confirmText: '确认',
            success: res => {
              if (res.confirm) {
                _this.unbind();
              }
            }
          })
        }
      },
      // 获取授权详情
      isAuthorization() {
        this.$api.AuthorizationDetail({
            bourseId: this.bourseId
          },
          res => {

            console.log('isAuthorization 777777777777', JSON.stringify(res));


            if (res.code == 200) {

              this.apikey = res.result.apikey;
              this.Secretkey = res.result.secretkey;
              this.isBind = 1;
            } else {
              // this.apikey = "";
              // this.Secretkey = "";
              this.isBind = 0;
            }
          }
        );
      },
      // 解绑
      unbind() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.removeAuthorization({
              currencyId: this.bourseId
            },
            res => {
              if (res.code == 200) {
                setTimeout(() => {
                  _this.$common.showToast("解绑成功", "success")
                  setTimeout(() => {
                    _this.isAuthorization();
                  }, 1300)
                }, 1500)
              } else {
                uni.hideLoading()
              }
              _this.$store.state.BtnFlag = true;
            }
          );
        }
      },
      // 教程
      toCourse() {
        this.$common.skipTo('/pages/index/binanceCourse?id=' + this.bourseId);
      },
      // 导入
      toLead() {
        if (this.apikey == '') {
          this.$common.showToast('请输入API Key');
        } else if (this.Secretkey == '') {
          this.$common.showToast('请输入Secret Key');
        } else {
          this.apiAuthorization()
        }
      },
      //执行导入
      apiAuthorization() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.apiAuthorization({
              apiKey: this.apikey,
              currencyId: this.bourseId,
              secretkey: this.Secretkey
            },
            res => {
              if (res.code == 200) {
                setTimeout(() => {
                  _this.$common.showToast("绑定成功", "success")
                  setTimeout(() => {
                    _this.isAuthorization();
                  }, 1300)
                }, 1500)
              } else {
                uni.hideLoading()
              }
              _this.$store.state.BtnFlag = true;
            }
          );
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .jiebang-class {
    background: #d14c64 !important;
  }
  
  
  

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 72rpx;

    // padding: 80upx 40upx 80upx 40upx;
    >.btn {
      width: 100%;

      height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;

      font-size: 32rpx;
      font-weight: bold;
      color: #ffffff;
      line-height: 96rpx;
      &:active {
        opacity: 0.9;
      }
    }
  }




  uni-page-body {
    height: 100%;
    font-size: 14px;
    line-height: 1.8;
  }

  .container {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;

    .right-title {
      font-size: 30upx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 42upx;
      color: #ffffff;
      opacity: 1;
      margin-right: 50upx;
    }

    .binance-content {
      padding: 30rpx;

      // .btn {
      //   width: 100%;
      //   height: 90upx;
      //   background: #0278ff;
      //   opacity: 1;
      //   border-radius: 6upx;
      //   font-size: 34upx;
      //   font-family: PingFang SC;
      //   font-weight: 400;
      //   color: #ffffff;
      //   padding: 22upx;
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      // }

      .binance-content-notice {
        width: 100%;
        height: 180rpx;
        opacity: 1;
        background: rgba(233, 148, 19, 0.10);
        border-radius: 12rpx;
        padding: 28rpx 30rpx;

        .binance-notice-text {
          width: 690upx;
          opacity: 1;

          .bigText {
            font-size: 28rpx;
            font-weight: bold;
            text-align: left;
            color: #e99413;
            line-height: 40rpx;
            margin-bottom: 16rpx;
          }

          .text {
            font-size: 24rpx;
            text-align: left;
            color: #e99413;
            line-height: 34rpx;
          }
        }
      }

      .binance-apikey {
        box-sizing: content-box;
        // padding: 30upx 30upx 0upx 30upx;

        .blue {
          color: #0278ff;
        }



        .binance-apikey-title {
          font-size: 28rpx;
          font-family: "DIN-Medium";
          font-weight: bold;
          text-align: left;
          color: #37383b;
          line-height: 34rpx;
          margin-top: 48rpx;
          margin-bottom: 24rpx;
        }

        .input-apikey {
          height: 108rpx;
          background: #f4f6fb;
          border-radius: 12rpx;
          padding: 0 30rpx;
          display: flex;
          align-items: center;

          .uni-input {
            font-size: 28rpx;
          }
        }
      }
    }
  }
</style>
