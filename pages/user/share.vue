<template>
  <view class="warp">
    <!-- <nav-bar title="推广分享" bgColor="#0278FF" fontColor="#ffffff"></nav-bar> -->

    <nav-bar ref="navBar" :backState="1000" :scrollTop="scrollTop" transparentFixedFontColor="#FFFFFF" bgColor="#FFFFFF"
      fontColor="#010F14" type="transparentFixed" title="邀请分享" shadow>
    </nav-bar>


    <!-- 分享信息 -->
    <view class="shareBlock">
      <view class="left">
        <view class="label">邀请码：</view>
        <view class="value">{{invitationCode}}</view>
      </view>
      <view class="right">
        <view class="qrcode">
          <canvas canvas-id="qrcode" style="width: 85px;height: 85px;" />
        </view>
        <view class="tips">(下载蚂蚁量化APP)</view>
      </view>
    </view>



    <!--  <view class="shareTop">
      <view class="st-left">
        <view class="imgBox" style="border-radius: 50%;overflow: hidden;">
          <image v-if="userInfo.avatar" :src="userInfo.avatar" style="width: 110upx;height: 110upx;"></image>
          <image v-else src="../../static/image/logo1.png" style="width: 110upx;height: 110upx;"></image>
        </view>
      </view>
      <view class="st-right">
        <view style="padding-bottom: 10upx;font-size: 32upx;">{{userInfo.nickname}}</view>
        <view style="color: #8c8c8c;font-size: 28upx;" @click="copy(userInfo.invitationCode)">
          我的推荐码：{{invitationCode}}</view>
      </view>
    </view> -->

    <!--  <view class="share-img">
      <view class="share-imgbox">
        <image :src="codeImg" style="width: 460upx;height: 460upx;"></image>

        <canvas canvas-id="qrcode" style="width: 200px;height: 200px;" />

      </view>
    </view> -->


    <view class="share-btn-box">
      <view class="share-btn copy" @click="copy(shareUrl)">复制链接</view>
      <view class="share-btn save" @click="saveShareImg">保存二维码</view>
    </view>


    <!-- 用户可选择 -->
    <uni-popup ref="posterPoupup" type="bottom">
      <view class="pb-box">
        <view class="pb-title">选择海报</view>
        <scroll-view class="posterScroll" scroll-x>
          <view class="posterBox">
            <view v-for="(item,index) in extensionList" :key="index" class="posterList" @click="choosePosterGo(item)">
              <view style="position: relative;">
                <image :src="item.image" style="width: 350upx;height: 560upx;border-radius: 20upx;"></image>
                <image v-if="choosePoster.id==item.id" class="share-ok" src="../../static/image/share-xuanzhong.png"
                  style="width: 52upx;height: 52upx;"></image>
              </view>
            </view>
          </view>
        </scroll-view>
        <view style="width: 100%;height: 20upx;background: #f7f6fb;"></view>
        <view class="shareGo" @click="saveShareImg">保存邀请海报</view>
        <view style="width: 100%;height: 20upx;background: #f7f6fb;"></view>
      </view>
    </uni-popup>

    <view style="width: 100%;height: 0; position: relative;overflow: hidden;">
      <canvas canvas-id="myCanvas" id='sss'></canvas>
    </view>

    <!-- <tki-qrcode val="val"></tki-qrcode> -->



    <!-- <canvas canvas-id="qrcode" style="width: 230px;height: 230px;" /> -->


    <!-- < ></view> -->

    <image class="sheraBanner" :src="sheraBanner" mode="aspectFit"></image>



  </view>
</template>

<script>
  // import QR from "../../static/js/wxqrcode.js" //生成二维码
  import uniCopy from '../../static/js/uni-copy.js'; //复制

  import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'

  // import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"

  import {
    mapState
  } from 'vuex';



  export default {
    // components: {
    //   tkiQrcode
    // },
    data() {
      return {

        sheraBanner: '',

        banner: require("../../static/images/mine/bg_hb@3x.png"),
        scrollTop: 0,

        codeImg: "", //二维码图片
        userInfo: "", //用户信息
        choosePoster: {
          id: 1,
          image: require("../../static/image/share-bg.jpg")
        }, //选中的海报
        extensionList: [{
          id: 1,
          image: require("../../static/image/share-bg.jpg")
        }], //分享海报
      }
    },
    computed: {
      ...mapState({
        invitationCode: state => state.userInfo.invitationCode,
        shareUrl: state => state.userInfo.shareUrl
      })
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onLoad() {
      // this.codeImg = QR.createQrCodeImg(this.$store.state.userInfo.shareUrl)

      // console.log('--------------------', this.codeImg);
      // this.userInfo = this.$store.state.userInfo

      this.make()

      // setTimeout(()=>{
      //   this.saveShareImg()
      // }, 500)

    },
    onShow() {},

    methods: {

      async make() {
        const _this = this
        // 回调方式
        uQRCode.make({
          canvasId: 'qrcode',
          componentInstance: this,
          text: _this.shareUrl,
          size: 85,
          margin: 0,
          backgroundColor: '#ffffff',
          foregroundColor: '#000000',
          fileType: 'jpg',
          correctLevel: uQRCode.errorCorrectLevel.H,
          success: res => {
            // console.log(res)
            _this.codeImg = res
          }
        })
      },

      //点击打开弹窗
      openSave() {
        this.$nextTick(() => {
          this.$refs['posterPoupup'].open();
        });
      },
      //用户点击选择海报
      choosePosterGo(item) {
        this.choosePoster = item;
      },

      //点击保存邀请海报
      saveShareImg() {
        let _this = this;
        let ww, hh;
        const query = uni.createSelectorQuery().in(this);
        query.select('#sss').boundingClientRect(data => { //获取canvas-dom
          ww = data.width; //准确的宽高
          hh = data.height;

          console.log('ww', ww);
          console.log('hh', hh);

          var ctx = uni.createCanvasContext('myCanvas') //绑定画布
          //设置画布背景
          ctx.setFillStyle("#ffffff");
          ctx.fillRect(0, 0, 375, 812);
          //填充进图片
          ctx.drawImage(_this.banner, 0, 0, 375, 812);


          // ctx.rect(24, 584, 327, 138)
          // ctx.setFillStyle('#FFFFFF')
          // ctx.fill()

          const grd = ctx.createLinearGradient(0, 0, 327, 0)
          grd.addColorStop(0, '#CED8FF')
          grd.addColorStop(1, '#FFFFFF')

          ctx.setFillStyle(grd)
          ctx.fillRect(24, 584, 327, 138)
          // ctx.draw()

          ctx.drawImage(_this.codeImg, ww - 135, 600, 85, 85); //填充进图片


          //填充文字 邀请码：
          ctx.setFillStyle('#191919') //设置内容2的文字样式
          ctx.setFontSize(14);
          ctx.setTextAlign('left') //同上
          ctx.font = 'normal bold 14px Helvetica';
          ctx.fillText('邀请码：', 48, 633)

          //填充文字 邀请码
          ctx.setFillStyle('#191919')
          ctx.setFontSize(28);
          ctx.setTextAlign('left') //同上
          ctx.font = 'normal bold 28px DIN-Bold';
          ctx.fillText(_this.invitationCode, 48, 674)

          ctx.setFillStyle('#7B8191')
          ctx.setFontSize(10);
          ctx.setTextAlign('left') //同上
          ctx.font = 'normal 400 10px Helvetica';
          ctx.fillText('(下载蚂蚁量化APP)', ww - 136, 705)


          ctx.draw(); //输出到画布中
          uni.showLoading({ //增加loading等待效果
            mask: true,
            title: "正在生成海报"
          })
          // _this.$nextTick(() => {
          //   _this.$refs['posterPoupup'].close();
          // });
          setTimeout(() => { //不加延迟的话，base64有时候会赋予undefined
            uni.canvasToTempFilePath({
              canvasId: 'myCanvas',
              success: (res) => {
                uni.hideLoading();
                // console.log('图片信心1',res.tempFilePath);
                // _this.sheraBanner = res.tempFilePath

                // #ifdef APP-PLUS
                uni.saveImageToPhotosAlbum({ //保存图片
                  filePath: res.tempFilePath,
                  success: (res) => {
                    // console.log('图片信心2',res);


                    uni.showToast({
                      title: '保存成功~',
                      icon: 'success',
                      mask: true,
                      duration: 1500
                    });
                  },
                  fail: (errs) => {
                    uni.hideLoading();
                    console.log("保存图片报错")
                  }
                })

                // #endif


              },
              fail: (errs) => {
                uni.hideLoading();
                console.log("生成图片报错")
              }
            })
          }, 1200)
        }).exec();
      },
      //点击复制
      copy(val) {
        uniCopy({
          content: val,
          success: res => {
            this.$common.showToast(res)
          },
          error: res => {
            this.$common.showToast(res, 'none')
          }
        })
      }
    },
  }
</script>

<style scoped lang="scss">


  #sss {
    position: absolute;
    width: 375px;
    height: 812px;
    top: 0;
    left: 0;
    /* z-index: 9999; */
  }



  .warp {
    background-size: 100% 100%;
    width: 100%;
    height: 1624rpx;
    background: url(../../static/images/mine/bg_hb@3x.png) no-repeat;
    background-size: cover;
    padding-top: 1168rpx;
    // padding-top: 468rpx;
  }

  .sheraBanner {
    position: fixed;
    width: 600rpx;
    height: 1300rpx;
    top: 0;
    left: 0;
  }


  .shareBlock {
    width: 654rpx;
    height: 276rpx;
    background: linear-gradient(135deg, #ced8ff 1%, #ffffff 98%);
    border-radius: 32rpx;
    margin: 0 auto;
    padding: 0 48rpx;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      .label {
        font-size: 28rpx;
        text-align: center;
        color: #191919;
        line-height: 40rpx;
        margin-bottom: 12rpx;
      }

      .value {
        font-size: 56rpx;
        font-family: DIN-Bold;
        font-weight: bold;
        text-align: left;
        color: #191919;
        line-height: 68rpx;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .tips {
        font-size: 20rpx;
        color: #7b8191;
        line-height: 28rpx;
        margin-top: 18rpx;
      }
    }

  }

  // 底部按钮
  .share-btn-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 50upx 80upx;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    padding: 40rpx 30rpx;

    .share-btn {
      width: 328rpx;
      height: 96rpx;
      border-radius: 12rpx;
      font-size: 32rpx;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      line-height: 96rpx;

      &:active {
        opacity: 0.9;
      }

      &.copy {
        background: #191919;
      }

      &.save {
        background: #4160fb;
      }
    }


  }





  .share-ok {
    position: absolute;
    right: 20upx;
    top: 20upx;
  }

  .shareGo {
    padding: 30upx 0;
    text-align: center;
    font-size: 32upx;
    color: #8096a5;
  }

  .posterList {
    width: 350upx;
    height: 560upx;
    margin: 0 20upx;
  }

  .posterList>view {
    width: 350upx;
    height: 560upx;
    border-radius: 20upx;
    overflow: hidden;
  }

  .posterScroll {
    white-space: nowrap;
    background: #fff;
    position: relative;
    z-index: 1;
    padding: 20upx 15upx;
  }

  .posterBox {
    display: flex;
    align-items: flex-start;
  }

  .pb-title {
    padding: 30upx 0;
    text-align: center;
    font-weight: bold;
  }

  .pb-box {
    width: 100%;
    background: #fff;
    border-top-left-radius: 20upx;
    border-top-right-radius: 20upx;
  }



  .share-img {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .share-imgbox {
    width: 588upx;
    height: 625upx;
    background: url(../../static/image/shareCodeBg.png) no-repeat center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .st-right {
    padding-left: 20upx;
  }

  .shareTop {
    display: flex;
    align-items: center;
    padding: 70upx 100upx 50upx 100upx;
  }

  .imgBox {
    display: flex;
    align-items: center;
    justify-content: center;
  }



  .codeBox {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .url {
    border: 1px solid #d3d3d3;
    background-color: #f0f0f0;
    padding: 5upx 10upx;
    border-radius: 5upx;
    margin: 50upx 0;
    color: #000000;
  }
</style>
