<template>
	<view class="container">
		<nav-bar title="注册协议" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="ua-box">
			<view class="us-title">{{userAgreement.title}}</view>
			<view class="us-time">{{userAgreement.createTime}}</view>
			<view class="us-info-box">
				<view v-html="userAgreement.content"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userAgreement:"", //注册协议
			}
		},
		onLoad() {
			this.getAgreement()
		},
		methods: {
			getAgreement(){
				this.$api.getAgreement({
					type:1
				},res=>{
          console.log('用户协议', JSON.stringify(res.result.content));
					this.userAgreement = res.result
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.us-info-box *{
		font-size: 28upx;
	}
	.us-time{
		padding: 30upx 0;
	}
	.us-title{
		font-weight: bold;
		font-size: 40upx;
	}
	.ua-box{
		padding: 30upx;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
