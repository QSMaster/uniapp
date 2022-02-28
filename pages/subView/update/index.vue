<template>
	<view class="update">
	  <view class="update-wrap">
    <!-- <image class="logo" src="/static/images/wolin_logo.png" alt=""></image> -->
		<view v-if="!data.restart" class="close" @click="handleCloseUpdate">
		  <!-- <image class="closeImg" src="/static/images/icon_white_close@3x.png" alt=""></image> -->
		</view>
		<view class="updateContainer">
		  <text class="updateContainer--versionText">更新版本至v{{data.pkgVersion}}</text>
		  <text class="updateContainer--versionTips">{{data.releaseNote || '更新內容'}}</text>
		  <view class="updateContainer--updateText" :style="{opacity: deviceName === 'Android' && widthComputed? 1: 0}">
			<view class="updateContainer-progress" :style="{width: `${widthComputed}rpx`}"></view>
    </view>
		</view>
		<button class="updateBtn" v-if="update" @click="handleUpdate">
		  <text class="updateBtn--btnText">立即更新</text>
		</button>
		<button class="stopUpdateBtn" v-else @click="handleStop">
		  <text class="stopUpdateBtn--btnText">停止更新</text>
		</button>
	  </view>
	</view>
</template>

<script>
	export default {
    data(){
      return {
        data: {
          restart: true
        },
        update: true,
        downloadTask: null,
        progress: 0,
        deviceName: null
      }
    },
    computed: {
      widthComputed(){
        if (!this.progress) return 0;
        return 450 * (this.progress / 100);
      }
    },
    created(){
      this.deviceName = plus.os.name;
      uni.$on('update', (data)=>{
        this.data = data;
      })
      plus.key.addEventListener("backbutton", function() {});
    },
    onBackPress(){
      return true;
    },
    methods: {
      handleCloseUpdate(){
        uni.navigateBack()
      },
      handleUpdate(){
        // this.handleCloseUpdate()
        if ('Android' === this.deviceName){
          this.update = false
          this.downloadTask = uni.downloadFile({
            url: this.data.pkgUrl,
            success: ({statusCode,tempFilePath})=>{
             if (statusCode === 200) {
               /*
               下载成功后
               */
                uni.saveFile({tempFilePath})
                plus.runtime.install(tempFilePath, {
                 force: false
                },()=>{
                   plus.runtime.restart();
                   this.update = false;
                },(e)=>{
                  console.log(e,'e')
                })
              }
            }
          })
          this.downloadTask.onProgressUpdate(({progress}) => {
            this.progress = progress
          })
        }
        if ('iOS' === this.deviceName){
          this.update = true;
          plus.runtime.openURL('https://www.warrin.org/rebate/download.html?type=upload')
          return
        }

      },
      handleStop(){
        this.downloadTask.abort()
        this.update = true;
      }
    }
	}
</script>

<style lang="scss">
	page {
		background: transparent;
	}

	.update {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
	}

	.update-wrap{
	  width: 560rpx;
	  height: 600rpx;
	  opacity: 1;
	  background-color: #2a3145;
	  border-radius: 30rpx;
	  align-items: center;
	  display: flex;
	  flex-direction: column;
    overflow: hidden;
    padding: 64rpx 40rpx 42rpx;
    position: relative;
	}
	.updateContainer{
	  width:560rpx;
	  justify-content: center;
	  align-items: center;
	  position: relative;
    display: flex;
    flex-direction: column;
    &-progress{
      width:0rpx;
      background-image: linear-gradient(to right,#009aff, #D9AAF2);
      height:12rpx;
      border-radius: 12rpx;
    }
    &--updateText{
      width:450rpx;
      height:12rpx;
      opacity: 1;
      background-color: #050e17;
      border-radius: 12px;
      position: absolute;
      bottom:2rpx;
    }
    &-progress-text-box{
      /* background-color: red; */
      width:450rpx;
    }
    &-progress-text{
      font-size:22rpx;
      color:#ffffff;
      justify-content: flex-end;
      background-color: #000000;
      /* width:60rpx; */
      flex:1;
    }
    &--versionText{
      height: 44rpx;
      opacity: 1;
      font-size: 32rpx;
      font-weight: 500;
      text-align: center;
      color: #e1e6ea;
      line-height: 44rpx;
    }
    &--versionTips{
      margin-top:24rpx;
      width: 448rpx;
      height: 120rpx;
      opacity: 1;
      font-size: 28rpx;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #9da9c3;
      line-height: 40rpx;
    }
	}

	.logo{
	  width: 156rpx;
	  height: 156rpx;
	  opacity: 1;
	  margin-bottom:48rpx;
	}
	.close{
	  position: absolute;
	  top:30rpx;
	  right:30rpx;
	  color: white;
	}
	.closeImg{
	  width:36rpx;
	  height:36rpx;
	}
	.updateBtn, .stopUpdateBtn{
	  width: 480rpx;
	  height: 76rpx;
	  opacity: 1;
	  border-radius: 46rpx;
	  width: 480rpx;
	  height: 76rpx;
	  border-width: 0rpx;
	  font-size: 28rpx;
	  color: #000000;
	  line-height: 76rpx;
    margin-top:auto;
	}
	.updateBtn{
	  background-image: linear-gradient(to right,#009aff, #D9AAF2);
	}
	.stopUpdateBtn{
	  background-color: #010a15;
	  background-image: linear-gradient(to right,#010A15, #010A15);
	}
	.updateBtn--btnText, .stopUpdateBtn--btnText{
	  height: 40rpx;
	  opacity: 1;
	  font-size: 28rpx;
	  font-weight: 500;
	  text-align: center;
	  color: #000000;
	  font-weight: bold;
	  line-height: 40rpx;
	}
	.stopUpdateBtn--btnText{
	  color: #ffffff;
	}
	</style>
