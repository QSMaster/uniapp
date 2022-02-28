<template>
	<view class="container">
		<nav-bar title="编辑跟单" bgColor="#0278FF" fontColor="#ffffff">
			<view slot="right" class="cancelWith" @click="cancelWith">取消跟随</view>
		</nav-bar>
		<view class="withManage">
			<view class="wm-box">
				<view class="border-bottom">
					<view class="eidtTop box">
						<view>
							<view style="color: #989695;font-size: 24upx;padding-bottom: 10upx;">跟随</view>
							<view style="color: #5d76a6;font-size: 32upx;">业余-玩家</view>
						</view>
						<view>
							<view style="color: #989695;font-size: 24upx;padding-bottom: 10upx;">跟单币种</view>
							<view style="color: #989695;font-size: 32upx;text-align: right;">VST</view>
						</view>
					</view>
					<view style="width: 100%;height: 40upx;"></view>
				</view>
				<view class="withCoin border-bottom">
					<view class="fontSize16">跟单币种</view>
					<view @click="showCoinType">USDT <span style="color: #cecfd4;padding-left: 20upx;">▼</span></view>
				</view>
				<view class="withBetween" style="padding: 40upx 0;">
					<view class="fontSize16">跟单方式</view>
					<view class="wb-right">
						<view :class="{'active':withType==0}" @click="withType=0">按金额跟单</view>
						<view :class="{'active':withType==1}" @click="withType=1">按比例跟单</view>
					</view>
				</view>
				<view class="withBetween" style="padding: 0upx 0 30upx 0;">
					<view class="fontSize16">单笔最大本金<span style="font-size: 24upx;color: #888785;">(USDT)</span></view>
					<view class="wb-rightMoney">
						<view class="wb-jiajian">-</view>
						<view class="wb-r-input">
							<input placeholder="本金" placeholder-style="font-size:24upx;" />
						</view>
						<view class="wb-jiajian">+</view>
					</view>
				</view>
				<view class="wb-titles border-bottom">例如您设置最大跟单本金 2 USDT,交易员下单时,您最大将以 2 USDT作为本金跟随下单。实际金额视情况等而定。</view>
				<view style="width: 100%;height: 40upx;"></view>
				<view class="withBetween" style="padding: 0upx 0 30upx 0;">
					<view class="fontSize16">单日跟随本金<span style="font-size: 24upx;color: #888785;">(USDT)</span></view>
					<view class="wb-rightMoney">
						<view class="wb-jiajian">-</view>
						<view class="wb-r-input">
							<input placeholder="不限" placeholder-style="font-size:24upx;" />
						</view>
						<view class="wb-jiajian">+</view>
					</view>
				</view>
				<view class="wb-titles border-bottom">单日累计跟随本金到达此数值后,将不再跟随下单,最大为100000.00。</view>
				<view class="wb-senior">
					<view class="wb-s-header" @click="changeSenior">高级设置<span style="color: #cecfd4;padding-left: 20upx;font-size: 24upx;">▼</span></view>
					<view class="wb-s-box" v-if="seniorFlag">
						<view class="withBetween" style="padding: 0upx 0 30upx 0;">
							<view class="fontSize16">最大持仓本金<span style="font-size: 24upx;color: #888785;">(USDT)</span></view>
							<view class="wb-rightMoney">
								<view class="wb-jiajian">-</view>
								<view class="wb-r-input">
									<input placeholder="不限" placeholder-style="font-size:24upx;" />
								</view>
								<view class="wb-jiajian">+</view>
							</view>
						</view>
						<view class="wb-titles border-bottom">跟随该交易员时,最大持仓本金：不限</view>
						<view class="withBetween" style="padding: 0upx 0 30upx 0;">
							<view class="fontSize16">订单止损比例<span style="font-size: 24upx;color: #888785;">(%)</span></view>
							<view class="wb-rightMoney">
								<view class="wb-jiajian">-</view>
								<view class="wb-r-input">
									<input placeholder="不限" placeholder-style="font-size:24upx;" />
								</view>
								<view class="wb-jiajian">+</view>
							</view>
						</view>
						<view class="wb-titles">例如您设置70%,跟随订单默认设置70%的止损价</view>
					</view>
				</view>
			</view>
			<view style="width: 100%;height: 200upx;"></view>
		</view>
		<view class="withPostBtn">
			<view>立即跟随</view>
		</view>
		<!-- 切换币种 -->
		<uni-popup type="bottom" ref="coinPopup">
			<view class="pb-box">
				<view class="coin-list">
					<view class="imgBox">
						<image src="../../static/image/coin-usdt.png" style="width: 60upx;height: 60upx;"></image>
					</view>
					<view class="fontSize16" style="padding-left: 20upx;">USDT</view>
				</view>
				<view class="coin-list">
					<view class="imgBox">
						<image src="../../static/image/coin-usdt.png" style="width: 60upx;height: 60upx;"></image>
					</view>
					<view class="fontSize16" style="padding-left: 20upx;">USDT</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				withType:0, //跟单方式 0:按金额跟单 1:按比例跟单
				seniorFlag:false,
			}
		},
		onLoad() {
			
		},
		methods: {
			//点击取消跟随
			cancelWith(){
				uni.showModal({
				    title: '温馨提示',
				    content: '停止跟随后将不再跟随交易员下单，交易员将不在出现在跟随列表中，已跟随开仓的订单，将保持同步平仓。',
				    success: function (res) {
				        if (res.confirm) {
				        } else if (res.cancel) {
				        }
				    }
				});
			},
			//点击显示切换币种
			showCoinType(){
				this.$refs.coinPopup.open();
			},
			//点击显示隐藏 高级设置
			changeSenior(){
				if(this.seniorFlag){
					this.seniorFlag=false;
				}else{
					this.seniorFlag=true;
				}
			}
		}
	}
</script>

<style scoped>
	*{
		font-size: 28upx;
	}
	.eidtTop{
		align-items: center;
		justify-content: space-between;
	}
	.cancelWith{
		color: #fff;
		font-size: 24upx;
		margin-right: 30upx;
	}
	.coin-list{
		display: flex;
		align-items: center;
		padding: 30upx 0;
		border-bottom: 1px solid #f2f2f2;
	}
	.imgBox{
		border-radius: 50%;
	}
	.pb-box{
		background: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 30upx;
	}
	.withPostBtn{
		position: fixed;
		width: 100%;
		height: 150upx;
		left: 0;
		bottom: 0;
		border-top: 1px solid #f6f6f6;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 30upx;
		background: #fff;
	}
	.withPostBtn>view{
		width: 100%;
		height: 90upx;
		background: #3d6ff2;
		color: #fff;
		text-align: center;
		line-height: 90upx;
		border-radius: 4px;
	}
	.wb-s-header{
		font-size: 32upx;
		padding: 40upx 0;
	}
	.wb-titles{
		font-size: 24upx;color: #8e8c8d;line-height: 40upx;
		padding-bottom: 40upx;
	}
	.fontSize16{
		font-size: 32upx;
	}
	>>>.uni-input-input{
		font-size: 24upx;
	}
	.wb-jiajian{
		font-size: 50upx;
		color: #396ffc;
	}
	.wb-r-input{
		width: 150upx;
		height: 60upx;
		border: 1px solid #f2f2f2;
		border-radius: 3px;
		margin: 0 20upx;
	}
	.wb-r-input>input{
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.wb-rightMoney{
		display: flex;
		align-items: center;
	}
	.wb-right>view{
		background: #f7f8fa;
		color: #888785;
		padding: 10upx 20upx;
		margin-right: 20upx;
		border-radius: 4px;
		border: 1px solid #f7f8fa;
	}
	.wb-right>.active{
		border-color: #134be6;
		color: #134be6;
		background: none;
	}
	.wb-right{
		display: flex;
		align-items: center;
	}
	.withBetween{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.withCoin{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40upx 0;
		font-size: 32upx;
	}
	.border-bottom{
		border-bottom: 1px solid #f2f2f2;
	}
	.wm-b-title{
		font-size: 40upx;
		padding: 20upx 0;
	}
	.wm-box{
		width: 100%;
		padding: 30upx;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
