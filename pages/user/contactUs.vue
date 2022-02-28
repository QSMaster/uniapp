<template>
	<view class="container">
		<nav-bar title="联系我们" bgColor="none" fontColor="#ffffff" type="transparentFixed" transparentFixedFontColor="#ffffff"></nav-bar>
		<view class="img-box share-bg" :style="'height:'+allheight">
			<image src="../../static/image/lxwmbg.png" style="width: 100%;" mode="widthFix"></image>
		</view>
		<view class="share-content">
			<view class="contact-box">
				<view class="share-codeImg">
					<image :src="share_img" style="width: 320upx;height: 320upx;"></image>
				</view>
				<view class="hand-box img-box">
					<image src="../../static/image/hand.png" style="width: 260upx;height: 303upx;"></image>
				</view>
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
				allheight:"",
				share_img:"", //分享二维码
				aboutUsInfo:"",
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
		onShow() {
			this.share_img = QR.createQrCodeImg("123456")
			this.getAgreement()
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
	.hand-box{
		position: absolute;
		right: -74upx;
		bottom: -132upx;
	}
	.contact-box{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.share-codeImg{
		width: 360upx;
		height: 360upx;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.share-content{
		width: 600upx;
		height: 710upx;
		position: absolute;
		z-index: 9;
		left: 50%;
		top: 180upx;
		transform: translateX(-50%);
		text-align: center;
		background: url(../../static/image/phonebg.png) no-repeat center;
		background-size: 100% 100%;
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
