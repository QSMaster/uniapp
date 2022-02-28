<template>
	<view class="container">
		<nav-bar title="关于我们" bgColor="#ffffff" fontColor="#010F14"></nav-bar>
		<view class="about-box">
			<view class="about-top">{{aboutUsInfo.title}}</view>
			<view class="about-time">{{aboutUsInfo.createTime}}</view>
			<view class="about-content">
				<view v-html="aboutUsInfo.content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aboutUsInfo:"", 
			}
		},
		onShow() {
			this.getAgreement()
		},
		methods: {
			//获取
			getAgreement(){
				this.$api.getAgreement({
					type:2
				},res=>{
					this.aboutUsInfo = res.result;
				})
			}
		}
	}
</script>

<style scoped>
	.about-content *{
		color: #909399;
		font-size: 28upx;
	}
	.about-time{
		font-size: 28upx;
		padding: 20upx 0 30upx 0;
	}
	.about-box{
		padding: 40upx 30upx;
	}
	.about-top{
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #000000;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
