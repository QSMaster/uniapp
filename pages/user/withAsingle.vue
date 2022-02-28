<template>
	<view class="container">
		<nav-bar title="带单管理" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="with-box">
			<view class="with-top">
				<view class="with-t-title">分享交易活动</view>
				<view>
					<switch :checked="shareFlag" @change="changeFlag" style="transform:scale(0.7)" />
				</view>
			</view>
			<view class="with-titles">开启后，您将可能出现在交易社区并拥有个人主页，同时可被用户跟单，零成本获得额外带单收益，双重盈利。</view>
			<view class="with-titles2">实盘跟单 1 人，跟随持仓 0 笔</view>
			<view class="with-number-box">
				<view class="wnb-box fontWeight">
					<view class="font16" style="color: #0abb6e;">0.00</view>
					<view class="font16">0.00</view>
					<view class="font16">0.00</view>
				</view>
				<view class="wnb-box" style="padding-top:20upx;color: #8a8a88;">
					<view>今日收益(USDT)</view>
					<view>昨日收益(USDT)</view>
					<view>累计收益(USDT)</view>
				</view>
			</view>
			<view class="with-fencheng">
				<view>跟单利润分成比例：8.00%</view>
				<view class="img-box" style="padding-left: 20upx;">
					<image src="../../static/image/guanyu-remark.png" style="width: 40upx;height: 40upx;" @click="showPopup"></image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 20upx;background: #f7f8fa;"></view>
		<view class="returns-box">
			<view class="returns-box-top font16">收益明细</view>
		</view>
		<!-- 分成比例弹窗 -->
		<uni-popup type="center" ref="biliPopup" :maskClick="false">
			<view class="pb-box">
				<!-- <view class="tp-header">跟单费用</view> -->
				<view style="width: 100%;height: 50upx;"></view>
				<view class="tp-content">
					<view class="tp-c-box">
						<view style="line-height: 50upx;">
							<view>跟随者每天跟单总利润的8.00%将作为您的带单奖励，奖励将在次日凌晨结算至您的账户中。特别的，跟随者主动平仓产生的收益也将计入跟单利润中，一同参与结算。</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 50upx;"></view>
				<view class="Iknow" @click="closeTotal">我知道了</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shareFlag:false
			}
		},
		onLoad() {
			
		},
		methods: {
			//关闭弹窗
			closeTotal(){
				this.$refs.biliPopup.close();
			},
			//点击显示分成比例弹窗
			showPopup(){
				this.$refs.biliPopup.open();
			},
			//切换开关
			changeFlag(){}
		}
	}
</script>

<style scoped>
	/*弹窗样式*/
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
	.returns-box-top{
		width: 100%;
		height: 160upx;
		display: flex;
		align-items: center;
		padding: 0 30upx;
	}
	.returns-box{
		width: 100%;
		height: calc(100% - 138upx);
	}
	.with-fencheng{
		display: flex;
		align-items: center;
		color: #888b97;
		padding: 30upx 0;
	}
	.wnb-box{
		display: flex;
		align-items: flex-start;
	}
	.wnb-box>view{
		width: 33.333333%;
		text-align: center;
	}
	.with-number-box{
		padding: 50upx 0;
		border-bottom: 1px solid #f4f4f4;
	}
	.with-titles2{
		font-size: 30upx;
		padding-top: 70upx;
		padding-bottom: 30upx;
		border-bottom: 1px solid #f4f4f4;
	}
	.with-titles{
		color: #989795;
	}
	.with-t-title{
		font-size: 32upx;
	}
	.with-top{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 50upx 0 40upx 0;
	}
	.with-box{
		padding: 0 30upx;
	}
	*{
		font-size: 28upx;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
