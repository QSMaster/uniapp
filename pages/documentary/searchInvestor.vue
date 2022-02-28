<template>
	<view class="container">
		<nav-bar :shadow="false" backState="2000">
			<view class="search-box">
				<view class="cd-header">
					<view class="cd-h-searchBox">
						<view class="imgBox">
							<image src="../../static/image/sousuo.png" style="width: 30upx;height: 30upx;"></image>
						</view>
						<view style="font-size: 24upx;padding-left: 10upx;width: 100%;padding-right: 60upx;">
							<input type="text" placeholder="搜索所有投资者" placeholder-style="font-weight: 100;font-size: 24upx;"  />
						</view>
					</view>
				</view>
				<view @click="cancelSearch">取消</view>
			</view>
		</nav-bar>
		<view class="search-content">
			<view class="cd-listbox" v-for="(item,index) in 10" :key="index" @click="toHomePage(item)">
				<view style="width: 100%;height: 15upx;background: #f7f8fa;"></view>
				<view class="cd-list">
					<view class="cd-l-top">
						<view class="cd-l-t-left">
							<view class="imgBox listUserImg">
								<image src="../../static/image/userActer.png" style="width: 74upx;height: 74upx;"></image>
							</view>
							<view class="cd-l-t-name">yInuO.9527</view>
						</view>
						<view class="cd-l-t-right">跟单</view>
					</view>
					<view class="cd-l-bottom">
						<view class="cd-l-b-list" style="text-align: left;">
							<view style="font-size: 32upx;font-weight: bold;color: #10b76e;">455.72%</view>
							<view style="font-size: 24upx;color: #989795;padding-top: 10upx;">累计收益率</view>
						</view>
						<view class="cd-l-b-list" style="text-align: center;">
							<view style="font-size: 32upx;font-weight: bold;">100.00%</view>
							<view style="font-size: 24upx;color: #989795;padding-top: 10upx;">近3周交易胜率</view>
						</view>
						<view class="cd-l-b-list" style="text-align: right;">
							<view style="font-size: 32upx;font-weight: bold;">1000+</view>
							<view style="font-size: 24upx;color: #989795;padding-top: 10upx;">累计跟随人数</view>
						</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 100upx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			
		},
		methods: {
			//点击取消搜索
			cancelSearch(){
				uni.navigateBack()
			},
			//点击查看个人主页
			toHomePage(item){
				uni.navigateTo({
					url:"/pages/community/personalHomepage"
				})
			},
		}
	}
</script>

<style scoped>
	*{
		font-size: 28upx;
	}
	.listUserImg {
		width: 74upx;
		height: 74upx;
		border-radius: 50%;
		background: #fff;
		overflow: hidden;
	}
	.cd-l-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 40upx;
	}
	
	.cd-l-t-right {
		background: #3d6ff2;
		color: #fff;
		border-radius: 4px;
		overflow: hidden;
		padding: 10upx 24upx;
		box-shadow: 0px 2px 2px #cbcfd8;
	}
	
	.cd-l-t-name {
		padding-left: 24upx;
		font-weight: bold;
	}
	
	.cd-l-t-left {
		display: flex;
		align-items: center;
	}
	
	.cd-list {
		padding: 30upx;
	}
	.cd-l-bottom {
		display: flex;
	}
	
	.cd-l-bottom>view {
		width: 33.333%;
	}
	>>>.header_title{
		width: 100%;
		padding: 0;
	}
	>>>.uni-input-input{
		font-weight: 100;
		font-size: 24upx;
	}
	.cd-h-searchBox {
		width: 600upx;
		height: 60upx;
		background: #f7f8fa;
		border-radius: 20px;
		display: flex;
		align-items: center;
		padding: 0 20upx;
		color: #abacb0;
	}
	.cd-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.search-box{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
