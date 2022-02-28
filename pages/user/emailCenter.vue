<template>
	<view class="container">
		<nav-bar title="邮箱中心" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="email-box">
			<view class="email-topbox">
				<view class="et-title">联系邮箱</view>
				<view class="et-email">
					<view class="et-e-left">{{aboutUsInfo.email}}</view>
					<view class="et-e-right" @click="copyClick(aboutUsInfo.email)">
						<view class="img-box">
							<image src="../../static/image/copy.png" style="width: 30upx;height: 30upx;"></image>
						</view>
						<view class="et-e-r-title">复制</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 20upx;"></view>
			<view class="email-code">
				<view class="img-box ec-img">
					<image :src="codeImg" style="width: 300upx;height: 300upx;"></image>
				</view>
				<view style="padding-top: 30upx;text-align: center;">微信客服二维码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCopy from '@/static/js/uni-copy.js';//复制
	import QR from '@/static/js/wxqrcode.js';//生成二维码
	export default {
		data() {
			return {
				codeImg:"",
				aboutUsInfo:"",
			}
		},
		onShow() {
			this.codeImg = QR.createQrCodeImg("123456")
			this.getAgreement();
		},
		methods: {
			//获取
			getAgreement(){
				this.$api.getAgreement({
					type:3
				},res=>{
					this.aboutUsInfo = res.result;
				})
			},
			//点击复制
			copyClick(val){
				uniCopy({
					content:val,
					success:res=>{
						this.$common.showToast(res)
					},
					error:res=>{
						this.$common.showToast(res)
					}
				})
			}
		}
	}
</script>

<style>
	.email-code{
		background: #fff;
		padding: 100upx 0;
	}
	.et-e-right{
		display: flex;
		align-items: center;
	}
	.et-e-left{
		color: #969696;
	}
	.et-e-r-title{
		color: #507EB4;
		padding-left: 20upx;
	}
	.et-email{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.et-title{
		padding-bottom: 20upx;
	}
	.email-topbox{
		background: #fff;
		padding: 30upx;
	}
	page{
		background: #F0F0F0;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
