<template>
	<view class="container">
		<nav-bar title="切换平台" backState="1000" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="top-panel">
			<view class="text-title-content">
				<view class="bg"></view>
				<view class="text-title">当前执行平台</view>
			</view>
			<view class="top-panel-content">
				<view class="top-panel-content-left">
					<view>
						<image style="width: 80upx;height: 80upx;margin-top: 0upx;margin-left: 48upx;" :src="imgUrl">
						</image>
					</view>
					<view class="top-panel-content-left-text">
						<view class="left-text-title">{{ chooseFlag.bourseShortName | exchangeDo }}</view>
						<view class="left-text-content">执行策略币种：USDT</view>
					</view>
				</view>
				<view class="top-panel-content-right" @click="stop()">关闭机器人</view>
			</view>
		</view>
		<view class="ad-text">注：请先关闭机器人，再切换平台</view>

		<view class="bottom-panel">
			<view class="text-title-content">
				<view class="bg"></view>
				<view class="text-title">切换平台</view>
			</view>
			<view class="bottom-icon-list">
				<view style="display: flex;justify-content: space-around;">
					<view v-for="(item, index) in bourseData" :key="index" @tap="choose(item)">
						<view class="bottom-icon" style="text-align: center;">
							<image style="width: 80upx;height: 80upx;" :src="item.logoPath" mode=""></image>
						</view>
						<view class="bottom-text">{{ item.bourseShortName }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bourseData: [],// 交易所列表
				chooseFlag: {},
				imgUrl: '',
				id: '',// 交易所id
			};
		},
		onShow() {
		},
		onLoad() {
			this.bourselist();
			this.id = this.$store.state.userInfo.bourseId
		},
		filters: {
			exchangeDo: function(val) {
				if (val == '火币pro') {
					return '火币';
				} else if (val == '币安') {
					return '币安';
				}
			}
		},
		methods: {
			//选中平台
			choose(item) {
				let that = this;
				let a = item;
				uni.showModal({
					title: '提示',
					content: '是否切换为该平台?',
					success: function(res) {
						if (res.confirm) {
							that.chooseFlag = a;
							that.imgUrl = a.logoPath;
							that.$api.changePlatform({
									bourseId: a.id
								},
								res => {
									if (res.code == 200) {
										that.$store.commit('bourseId', a.id);
										that.$store.state.userInfo.bourseId = a.id
										that.$common.showToast('切换成功');
									}
								}
							);
						}
					}
				});
			},
			// 获取交易所列表
			bourselist() {
				let that = this;
				that.$api.bourselist({}, res => {
					that.bourseData = res.result;
					const test = res.result.filter(item => item.id == this.id);
					that.imgUrl = test[0].logoPath
					that.chooseFlag = test[0]
				});
			},
			// 关闭机器人
			stop() {
				let _this=this;
				uni.showModal({
					title: '提示',
					content: '是否立即关闭机器人?',
					success: function(res) {
						if (res.confirm) {
							_this.closeRobot();
						}
					}
				});
			},
			//执行关闭机器人
			closeRobot(){
				let _this=this;
				if(this.$store.state.BtnFlag){
					this.$store.state.BtnFlag = false;
					uni.showLoading({
						title:"loading..."
					})
					this.$api.close({
						id: _this.chooseFlag.id
					}, res => {
						if(res.code==200){
							setTimeout(()=>{
								_this.$common.showToast("关闭成功","success");
								setTimeout(()=>{
									uni.navigateBack(-1);
								},1300)
							},1300)
						}else{
							uni.hideLoading()
						}
						this.$store.state.BtnFlag = true;
					});
				}
			}
		}
	};
</script>

<style scoped>
	uni-page-body {
		height: 100%;
		font-size: 14px;
		line-height: 1.8;
	}

	.container {
		width: 100%;
		height: 100%;
		background: #f0f0f0;
	}

	.top-panel {
		width: 690upx;
		height: 224upx;
		background: #ffffff;
		opacity: 1;
		border-radius: 10upx;
		margin-top: 30upx;
		margin-left: 30upx;
	}

	.footer-content {
		height: 350upx;
		background: #ffffff;
	}

	.text-title-content {
		padding-top: 30upx;
		display: flex;
		margin-left: 30upx;
		position: relative;
	}

	.bg {
		width: 8upx;
		height: 30upx;
		background: linear-gradient(180deg, #19b6f8 0%, #098cf4 100%);
		opacity: 1;
		position: absolute;
		top: 37upx;
	}

	.text-title {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 44upx;
		color: #000000;
		margin-left: 20upx;
	}

	.top-panel-content {
		display: flex;
		justify-content: space-between;
	}

	.top-panel-content-left-text {
		margin-left: 20upx;
	}

	.top-panel-content-left {
		display: flex;
	}

	.top-panel-content {
		margin-top: 28upx;
	}

	.left-text-title {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 44upx;
		color: #000000;
	}

	.left-text-content {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 34upx;
		color: #969696;
	}

	.top-panel-content-right {
		margin-right: 40upx;
		width: 156upx;
		height: 66upx;
		background: #0278ff;
		opacity: 1;
		border-radius: 6upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 34upx;
		color: #ffffff;
		text-align: center;
		line-height: 66upx;
	}

	.ad-text {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40upx;
		color: #969696;
		padding: 30upx;
	}

	.bottom-icon-list {
		margin: 30upx 40upx;
	}

	.bottom-panel {
		width: 690upx;
		height: 288upx;
		background: #ffffff;
		opacity: 1;
		border-radius: 10upx;
		margin-left: 30upx;
	}

	.bottom-text {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 44upx;
		color: #000000;
		text-align: center;
	}
</style>
