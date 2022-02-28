<template>
	<view class="container">
		<nav-bar title="跟单管理" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="withManage" style="height: calc(100% - 138upx);">
			<view class="with-header">
				<view class="awh-headers">
					<view></view>
					<view class="awh-h-right box" @click="showTotal('totalPopup')">
						<view class="font12Gray" style="padding-right: 20upx;">累计费用</view>
						<view class="imgBox">
							<image src="../../static/image/xiangyou-big.png" style="width: 28upx;height: 28upx;"></image>
						</view>
					</view>
				</view>
				<view class="awh-center box">
					<view class="awh-c-list">
						<view class="awh-c-l-number">231100.00</view>
						<view class="font12Gray">累计本金(VST)</view>
					</view>
					<view class="awh-c-list">
						<view class="awh-c-l-number" style="color: #12be73;">231100.00</view>
						<view class="font12Gray" style="text-decoration:underline;" @click="showTotal('shouyiPopup')">累计收益(VST)</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 20upx;background: #f7f8fa;"></view>
			<view class="wc-header">正在跟随</view>
			<view class="wc-listbox" style="height: calc(100% - 360upx);">
				<scroll-view scroll-y style="width: 100%;height: 100%;">
					<view class="wc-list" v-for="(item,index) in 10" :key="index">
						<view style="width: 100%;height: 50upx;"></view>
						<view class="wc-l-header box">
							<view class="wc-l-h-left box">
								<view class="imgBox">
									<image src="../../static/image/userActer.png" style="width: 90upx;height: 90upx;border-radius: 50%;"></image>
								</view>
								<view style="padding-left: 30upx;">
									<view class="wc-l-h-l-name">业余---玩家</view>
									<view class="hph-n-l-box">
										<view class="hph-n-l-real box">
											<view class="font12" style="color: #5e76a4;">实名认证</view>
										</view>
									</view>
								</view>
							</view>
							<view class="wc-l-h-right" @click="editWith(item)">编辑</view>
						</view>
						<view style="width: 100%;height: 40upx;"></view>
						<view class="wc-l-content">
							<view class="awh-headers">
								<view></view>
								<view class="awh-h-right box">
									<view class="font12Gray" style="padding-right: 20upx;">跟单费用</view>
									<view class="imgBox">
										<image src="../../static/image/xiangyou-big.png" style="width: 28upx;height: 28upx;"></image>
									</view>
								</view>
							</view>
							<view class="awh-center box">
								<view class="awh-c-list" style="text-align: left;">
									<view class="awh-c-l-number">231100.00</view>
									<view class="font12Gray">累计本金(VST)</view>
								</view>
								<view class="awh-c-list" style="text-align: left;">
									<view class="awh-c-l-number" style="color: #12be73;">231100.00</view>
									<view class="font12Gray">累计收益(VST)</view>
								</view>
							</view>
							<view style="width: 100%;height: 30upx;border-bottom: 1px solid #f2f2f2;"></view>
							<view class="awh-l-c-title">
								<view>单笔最大本金：100.00 VST</view>
								<view class="font12">当日跟随本金：100000.00；最大持仓本金：不限；订单止损比例：不设置</view>
							</view>
						</view>
					</view>
					<view style="width: 100%;height: 100upx;"></view>
				</scroll-view>
			</view>
		</view>
		<!-- 跟单费用弹窗 -->
		<uni-popup type="center" ref="totalPopup" :maskClick="false">
			<view class="pb-box">
				<view class="tp-header">跟单费用</view>
				<view class="tp-content">
					<view class="tp-c-box">
						<view class="tp-c-b-number box">
							<view>交易费用</view>
							<view style="color: #000;">861.92 VST</view>
						</view>
						<view class="tp-c-b-number box">
							<view>跟单佣金分成</view>
							<view style="color: #000;">861.92 VST</view>
						</view>
						<view style="line-height: 50upx;">
							<view>1.费用统计自2020年6月12日功能发布后起开始生效，在此之前跟单订单费用未统计在内。</view>
							<view>2.交易费用为合约交易的正常费用，无论跟单或自主下单均存在，包括手续费、资金费用。</view>
							<view>3.跟单佣金是给予交易员的佣金奖励，非平台收取，收取规则可参考对应交易员的个人主页。</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 50upx;"></view>
				<view class="Iknow" @click="closeTotal('totalPopup')">我知道了</view>
			</view>
		</uni-popup>
		<!-- 收益说明弹窗 -->
		<uni-popup type="center" ref="shouyiPopup" :maskClick="false">
			<view class="pb-box">
				<!-- <view class="tp-header">跟单费用</view> -->
				<view style="width: 100%;height: 50upx;"></view>
				<view class="tp-content">
					<view class="tp-c-box">
						<view style="line-height: 50upx;">
							<view>当你干涉交易员的交易订单时，如手动平仓、主动止盈止损等，对应订单收益并不计入此收益。此收益未统计手续费等费用。</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 50upx;"></view>
				<view class="Iknow" @click="closeTotal('shouyiPopup')">我知道了</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navIndex:0, //0:USDT   1:VST
			}
		},
		onLoad() {
			
		},
		methods: {
			//点击编辑跟随
			editWith(item){
				uni.navigateTo({
					url:"/pages/user/editWith"
				})
			},
			//点击展示累计跟单费用
			showTotal(val){
				this.$refs[val].open();
			},
			//点击关闭累计跟单费用
			closeTotal(val){
				this.$refs[val].close();
			}
		}
	}
</script>

<style scoped>
	*{
		font-size: 28upx;
	}
	.Iknow{
		width: 100%;
		height: 88upx;
		background: #3d6ff2;
		color: #fff;
		text-align: center;
		line-height: 88upx;
	}
	.tp-c-b-number{
		align-items: center;
		padding-bottom: 20upx;
	}
	.tp-c-b-number>view{
		width: 50%;
	}
	.tp-c-box{
		background: #f4f9ff;
		padding: 30upx;
		color: #6b6e7e;
	}
	.tp-content{
		padding: 0 30upx;
	}
	.tp-header{
		width: 100%;
		padding: 70upx 0 44upx 0;
		font-size: 32upx;
		text-align: center;
	}
	.pb-box{
		width: 620upx;
		background: #fff;
		border-radius: 8px;
		overflow: hidden;
	}
	.withManage{
		width: 100%;
		height: 100%;
	}
	.awh-l-c-title{
		padding: 30upx 0;
		color: #7f8490;
		line-height: 40upx;
	}
	.wc-l-content{
		background: #fff;
		border-radius: 10px;
		box-shadow:0px 0px 10px #e4e5e8;
		padding: 0 30upx;
	}
	.wc-listbox{
		padding: 0 30upx;
	}
	page{
		background: #fbfcfe;
	}
	.wc-l-header{
		align-items: center;
		justify-content: space-between;
	}
	.wc-l-h-l-name{
		color: #5b709c;
		padding-bottom: 10upx;
	}
	.wc-l-h-left{
		align-items: center;
	}
	.font12{
		font-size: 24upx !important;
	}
	.hph-n-l-real {
		background: url(../../static/image/shiming.png) no-repeat left;
		background-size: 30upx 30upx;
		height: 30upx;
		justify-content: space-between;
		padding-left: 40upx;
		padding-right: 20upx;
		align-items: center;
	}
	.hph-n-l-box {
		background: #e9edf8;
		border-radius: 10px;
	}
	.wc-l-h-right{
		background: #3d6ff2;
		color: #fff;
		padding: 10upx 20upx;
		border-radius: 20px;
	}
	.wc-header{
		font-size: 32upx;
		height: 140upx;
		line-height: 140upx;
		background: #fff;
		padding: 0 30upx;
	}
	.awh-c-list{
		width: 50%;
		text-align: center;
	}
	.awh-c-l-number{
		padding-bottom: 20upx;
		font-size: 32upx;
		font-weight: 700;
	}
	.font12Gray{
		font-size: 24upx;
		color: #8c8b8b;
	}
	.awh-headers{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0;
	}
	.with-header{
		width: 100%;
		height: 200upx;
		padding: 0 30upx;
		background: #fff;
	}
	.community-header {
		display: flex;
		align-items: center;
		border-radius: 4px;
		overflow: hidden;
	}
	
	.community-header>.active {
		background: #3d6ff2;
		color: #fff;
		border-color: #3d6ff2;
	}
	
	.community-header>view {
		width: 200upx;
		height: 54upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(61, 111, 242, 0.1);
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
