<template>
	<view class="container">
		<!-- 头部 -->
		<nav-bar bgColor="#0278FF" fontColor="#ffffff">
			<view>BTC/USDT</view>
			<view slot="right">
				<view class="imgBox" style="margin-right: 30upx;" @click="showChangeCoin">
					<image src="../../static/image/fenlei-bai.png" style="width: 40upx;height: 40upx;"></image>
				</view>
			</view>
		</nav-bar>
		<view style="width: 100%;height: calc(100% - 138upx);">
			<view class="mc-order" style="height: 100%;">
				<view class="mc-o-header">
					<view class="mc-o-h-left">
						<v-tabs v-model="tabIndex" :tabs="tabArray" @change="changeTab" height="88upx" lineHeight="4upx" :lineScale="0.8"
						 color="#898785" activeColor="#000"></v-tabs>
					</view>
				</view>
				<view class="mc-o-orderbox" style="height: calc(100% - 88upx);">
					<scroll-view scroll-y style="width: 100%;height: 100%;">
						<view class="mc-o-ob-list" v-for="(item,index) in 10" :key="index">
							<view class="mc-obl-header">
								<view class="mv-obl-h-left fontWeight">01/29 14:52</view>
								<view class="mv-obl-h-right">872619314237156288</view>
							</view>
							<view class="mc-obl-content">
								<view class="mc-obl-c-top">
									<view class="mc-obl-c-t-coin">
										<view class="mc-obl-c-t-c-left">
											<view class="font16 colorRed">做空</view>
											<view>•BTC</view>
											<view class="fontWeight" style="padding-left: 10upx;">5X</view>
											<view class="placeType">市价下单</view>
										</view>
										<view></view>
									</view>
									<view class="profitAndLoss">
										<view class="font12">未实现盈亏(USDT)：</view>
										<view class="fontWeight colorGreen">-18.95(-0.16%)</view>
									</view>
								</view>
								<view>
									<view class="mc-obl-c-box paddingTB15">
										<view class="coloOrderGrey">开仓价格</view>
										<view class="coloOrderGrey">当前价格</view>
									</view>
									<view class="mc-obl-c-box paddingTB15">
										<view class="font16 fontWeight">32545.75</view>
										<view class="font16 fontWeight">32575.55</view>
									</view>
									<view class="mc-obl-c-box paddingTB15">
										<view class="coloOrderGrey">交易总额</view>
										<view class="coloOrderGrey">预估强平价</view>
									</view>
									<view class="mc-obl-c-box paddingTB15">
										<view class="font16 fontWeight">32545.75</view>
										<view class="font16 fontWeight">32575.55</view>
									</view>
									<view style="width: 100%;height: 10upx;"></view>
									<view class="mc-obl-c-box paddingTB10">
										<view class="mc-obl-c-b-title">
											<view class="font12 coloOrderGrey">保证金</view>
											<view class="font12 coloOrderGrey">10169.05</view>
										</view>
										<view class="mc-obl-c-b-title">
											<view class="font12 coloOrderGrey">止盈触发价</view>
											<view class="font12 coloOrderGrey">--</view>
										</view>
									</view>
									<view class="mc-obl-c-box paddingTB10">
										<view class="mc-obl-c-b-title">
											<view class="font12 coloOrderGrey underline">资金费用</view>
											<view class="font12 coloOrderGrey">0.00</view>
										</view>
										<view class="mc-obl-c-b-title">
											<view class="font12 coloOrderGrey">止损触发价</view>
											<view class="font12 coloOrderGrey">--</view>
										</view>
									</view>
								</view>
								<view class="mc-obl-btnbox">
									<view class="mc-obl-btn">平仓</view>
									<view class="mc-obl-btn">止盈止损</view>
								</view>
							</view>
						</view>
						<view style="width: 100%;height: 200upx;"></view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 切换币种 -->
		<uni-drawer ref="coinDrawer" mode="left" width="80%">
		    <view class="drawer-box">
				<view class="db-header">专业合约</view>
				<view style="height: calc(100% - 180upx);">
					<scroll-view scroll-y="true">
						<view class="db-coin-box">
							<view class="db-coinlist" v-for="(item,index) in 6" :key="index" :class="{'active':index==0}" @click="setTradeCoin(item)">
								<view class="db-c-left">
									<view class="imgBox">
										<image src="../../static/image/coin-usdt.png" style="width: 50upx;height: 50upx;border-radius: 50%;"></image>
									</view>
									<view class="db-c-coinName">BTC <span>/USDT</span></view>
								</view>
								<view class="db-c-right colorGreen">32388.61</view>
							</view>
						</view>
					</scroll-view>
				</view>
		    </view>
		</uni-drawer>
		<!-- 止盈止损 -->
		<uni-popup type="center" ref="stopPopup" :maskClick="false">
			<view class="popup-box">
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabArray: ["持仓", "限价委托(0)", "计划委托(0)", "止盈止损(0)"], //我的订单类别
				tabIndex: 0,
			}
		},
		onLoad() {

		},
		methods: {
			//选择币种
			setTradeCoin(item){
				this.$refs.coinDrawer.close()
			},
			//点击显示币种切换
			showChangeCoin(e){
				this.$refs.coinDrawer.open()
			},
			//切换类别
			changeTab(e) {}
		}
	}
</script>

<style scoped>
	.fontWeight {
		font-weight: bold;
	}
	
	.font16 {
		font-size: 32upx;
	}
	
	.font12 {
		font-size: 24upx;
	}
	
	* {
		font-size: 28upx;
	}
	>>>#scrollContainer {
		z-index: 0 !important;
	}
	/***********************中间弹窗样式**********************/
	.popup-box{
		background: #fff;
		border-radius: 4px;
	}
	/**************************币种切换抽屉样式********************/
	.db-coin-box .active{
		background: #f5f6fa;
	}
	.db-c-right{
		font-weight: bold;
		font-size: 32upx;
	}
	.db-c-left{
		display: flex;
		align-items: center;
	}
	.db-c-coinName{
		font-size: 32upx;
		padding-left: 30upx;
		display: flex;
		align-items: flex-end;
	}
	.db-c-coinName span{
		color: #717485;
		font-size: 24upx;
	}
	.db-coinlist{
		padding: 0 30upx;
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.db-header{
		width: 100%;
		height: 180upx;
		display: flex;
		align-items: center;
		padding: 0 30upx;
		font-size: 40upx;
		font-weight: bold;
		padding-top: 20upx;
	}
	.drawer-box{
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.mc-o-ob-list {
		border-bottom: 1px solid #f6f6f8;
	}

	.mc-o-ob-list:last-of-type {
		border-bottom: none;
	}

	.mc-obl-btnbox {
		display: flex;
		justify-content: space-between;
		padding-top: 30upx;
	}

	.mc-obl-btn {
		width: 48%;
		height: 60upx;
		background: #f4f7fe;
		border-radius: 2px;
		color: #2a5bd8;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.underline {
		text-decoration: underline
	}

	.colorGreen {
		color: #19b293;
	}

	.colorRed {
		color: #d14b64;
	}

	.profitAndLoss {
		display: flex;
		align-items: center;
		padding: 30upx 0upx 20upx 0upx;
	}

	.placeType {
		font-size: 24upx;
		color: #9b9da6;
		border: 1px solid #ccccd0;
		border-radius: 2px;
		padding: 2px 10upx;
		margin-left: 20upx;
	}

	.mc-obl-c-t-c-left {
		display: flex;
		align-items: flex-end;
	}

	.mc-obl-c-t-coin {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.paddingTB10 {
		padding: 10upx 0;
	}

	.mc-obl-c-b-title {
		display: flex;
		align-items: center;
	}

	.mc-obl-c-b-title>view {
		width: 50%;
	}

	.paddingTB15 {
		padding: 15upx 0;
	}

	.font16 {
		font-size: 32upx;
	}

	.coloOrderGrey {
		color: #7c808b;
	}

	.mc-obl-c-box {
		display: flex;
		align-items: flex-start;
	}

	.mc-obl-c-box>view {
		width: 50%;
	}

	.mc-obl-content {
		width: 100%;
		padding: 20upx 30upx 40upx 30upx;
	}

	.mc-obl-header {
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		border-bottom: 1px solid #f6f6f8;
		font-size: 24upx;
		color: #a2a5af;
	}

	.mc-obl-header>view {
		font-size: 24upx;
	}

	.mc-o-h-left {
		width: 100%;
	}

	.mc-o-header {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		border-bottom: 1px solid #e3e7ef;
	}

	.container {
		width: 100%;
		height: 100%;
	}
</style>
