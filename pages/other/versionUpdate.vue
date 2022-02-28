<template>
	<view class="container">
		<view class="img-box share-bg" :style="'height:'+allheight">
			<image src="../../static/image/version-bg.png" style="width: 100%;" mode="widthFix"></image>
		</view>
		<view class="share-content">
			<view class="share-content-title">版 本 更 新</view>
			<view style="width: 100%;height: 150upx;"></view>
			<view class="version-box">
				<view class="version-box-top">
					<view class="img-box">
						<image src="../../static/image/logo1.png" style="width: 100upx;height: 100upx;"></image>
					</view>
					<view style="padding-left: 30upx;font-weight: bold;font-size: 32upx;">{{$store.state.sysName}}</view>
				</view>
				<view class="version-line">
					<view class="version-line-go" :style="'background:#01C699;height:100%;width:'+progressBar+'%;'"></view>
				</view>
				<view class="version-go-title">{{progressTitle}}</view>
				<view class="version-box-content">
					<view class="version-box-content-banben">更新版本: <span style="padding-left: 20upx;">{{versionInfo.version}}</span></view>
					<view v-html="versionInfo.describe"></view>
				</view>
				<view style="width: 100%;height: 50upx;"></view>
				<view class="btn-box">
					<view></view>
					<view class="btn-box-btn" @click="gotoDoload">更新</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allheight:"",
				versionInfo:"", //版本信息
				progressBar: 0, //进度条
				progressTitle: "", //提示语
				btnFlags:true
			}
		},
		onLoad() {
			let _this=this;
			uni.getSystemInfo({
			    success: function (res) {
					_this.allheight = res.screenHeight+"px";
			    }
			});
		},
		onBackPress(){ return true},
		onShow() {
			this.sysVersion();
		},
		methods: {
			//获取系统版本
			sysVersion() {
				this.$api.sysVersion({
					deviceType: this.$store.state.platformType
				}, res => {
					this.versionInfo = res.result;
				})
			},
			//用户点击下载
			gotoDoload() {
				if (this.$store.state.platformType == 2) {
					window.location.href = this.versionInfo.downUrl
				} else if (this.$store.state.platformType == 1) {
					this.download()
				}
			},
			//创建下载
			download() {
				let _this=this;
				if(this.btnFlags){
					this.btnFlags = false;
					this.progressTitle = "正在下载,请稍等...."
					const downloadTask = uni.downloadFile({
						url: _this.versionInfo.installUrl,  
						success: (downloadResult) => { 
							if (downloadResult.statusCode === 200) {
								if(_this.progressBar==100){
									_this.progressTitle="正在启动安装..."
									plus.runtime.openFile( downloadResult.tempFilePath);
								}
							}  
						}
					});
					downloadTask.onProgressUpdate((res) => {
						_this.progressBar = res.progress
					});
				}
			},
		}
	}
</script>

<style>
	.version-go-title{
		text-align: right;
		padding: 0 30upx;
		color: #666;
		font-size: 28upx;
		padding-top: 20upx;
	}
	.version-line-go{
		height: 100%;
		background: #0278FF;
	}
	.version-line{
		width: 100%;
		height: 2px;
		background: #e7e6e6;
	}
	.version-box-content-banben{
		padding-bottom: 30upx;
	}
	.version-box-content{
		padding: 30upx 30upx;
		text-align: left;
	}
	.btn-box-btn{
		width: 40%;
		height: 70upx;
		background: #0278FF;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
	}
	.btn-box{
		padding: 20upx 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.version-box-top{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
	}
	.version-box{
		background: rgba(255,255,255,1);
		border-radius: 4px;
		overflow: hidden;
	}
	.share-content-title{
		color: #fff;
		font-size: 80upx;
		font-family: "微软雅黑";
		font-weight: bold;
		letter-spacing: 0;
		text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135
	}
	.share-content{
		position: absolute;
		z-index: 9;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		top: 150upx;
		width: 80%;
	}
	.share-bg{
		overflow: hidden;
	}
	page{
		background: #001043;
	}
	.container{
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
