<template>
	<view class="container">
		<!-- 头部 -->
		<nav-bar :shadow="true" title="合约" backState="1000" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="all-bpx" style="width: 100%;height: 100%;">
			<!-- 专业合约 -->
			<view class="majorContract" style="height: 100%;">
				<view class="mc-header">
					<view class="mc-h-coin">
						<view class="mc-h-c-left" @click="showChangeCoin('coinDrawer')">
							<view class="imgBox">
								<image src="../../static/image/coin-fenlei.png" style="width: 40upx;height: 40upx;"></image>
							</view>
							<view class="mc-h-c-l-coin">{{nowCoin}}</view>
						</view>
						<view class="mc-h-c-right">
							<view class="imgBox" @click="skipToKline('/pages/index/marketKline')">
								<image src="../../static/image/kxian.png" style="width: 30upx;height: 30upx;"></image>
							</view>
						</view>
					</view>
					<view class="mc-h-titles">
						<view>
							<span class="underline">资金费率</span>
							<span style="padding-left: 30upx;">0.0099%</span>
						</view>
						<view style="border-left: 1px solid #e1e5e8;padding-left: 30upx;">
							<span>结算时间</span>
							<span style="padding-left: 30upx;">2小时内</span>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 16upx;background: #f5f6fa;"></view>
				<view class="mc-content">
					<view class="mc-c-nav">
						<view :class="{'active':ocIndex==0}" @click="ocIndex=0">开仓</view>
						<view :class="{'active':ocIndex==1}" @click="ocIndex=1">平仓</view>
					</view>
					<view class="mc-c-center">
						<view class="mc-c-c-left">
							<view class="mc-l-top">
								<view class="font12">USDT账户</view>
								<view class="mc-l-right font12">
									全仓模式
									<view class="imgBox" style="margin-left: 10upx;">
										<image src="../../static/image/xiangxiajiao.png" style="width: 30upx;height: 30upx;"></image>
									</view>
								</view>
							</view>
							<view style="width: 100%;height: 20upx;"></view>
							<view class="mc-l-type">
								<view @click="contractOrder.typeIndex=0">
									<view class="mc-l-t-left" :class="{'bgGreen':contractOrder.typeIndex==0}"></view>
									<view class="mc-l-t-title">开多</view>
								</view>
								<view @click="contractOrder.typeIndex=1">
									<view class="mc-l-t-right" :class="{'bgRed':contractOrder.typeIndex==1}"></view>
									<view class="mc-l-t-title">开空</view>
								</view>
							</view>
							<view style="width: 100%;height: 30upx;"></view>
							<view class="mc-l-list">
								<view class="width61 mc-tradType borderGray" @click="openPopup('tradePopup')">
									<view class="font12 fontWeight" v-if="contractOrder.tradeIndex==0">限价委托</view>
									<view class="font12 fontWeight" v-if="contractOrder.tradeIndex==1">市价委托</view>
									<view class="font12 fontWeight" v-if="contractOrder.tradeIndex==2">计划委托</view>
									<view class="imgBox">
										<image src="../../static/image/xiangxiajiao.png" style="width: 24upx;height: 24upx;"></image>
									</view>
								</view>
								<view class="width36 mc-tradType borderGray" @click="openPopup('multiplePopup')">
									<view class="font12 fontWeight">{{contractOrder.multiple}}X</view>
									<view class="imgBox">
										<image src="../../static/image/xiangxiajiao.png" style="width: 24upx;height: 24upx;"></image>
									</view>
								</view>
							</view>
							<!-- 限价委托和市价委托 -->
							<view v-if="contractOrder.tradeIndex!=2">
								<view style="width: 100%;height: 30upx;"></view>
								<view class="mc-l-list" v-if="contractOrder.tradeIndex==0">
									<view class="width61 mc-input borderGray">
										<input type="number" placeholder="委托价格" placeholder-style="color:#9fa2aa;" />
									</view>
									<view class="width36 mc-input borderGray">
										<view class="duishoujia fontWeight">对手价</view>
									</view>
								</view>
								<view class="mc-l-list borderGray" v-else-if="contractOrder.tradeIndex==1">
									<view class="mc-l-inputNumber mc-noInput">以最优市场价下单</view>
								</view>
							</view>
							<!-- 计划委托 -->
							<view v-if="contractOrder.tradeIndex==2">
								<view style="width: 100%;height: 30upx;"></view>
								<view class="mc-l-list">
									<view class="width61 mc-input borderGray">
										<input type="number" placeholder="触发价格" placeholder-style="color:#9fa2aa;" />
									</view>
									<view class="width36 mc-input borderGray">
										<view class="duishoujia font12" style="color: #a4a7b1;">标记</view>
									</view>
								</view>
								<view style="width: 100%;height: 30upx;"></view>
								<view class="mc-l-list">
									<view class="width61 mc-input borderGray" v-if="contractOrder.planType==0">
										<input type="number" placeholder="委托价格" placeholder-style="color:#9fa2aa;" />
									</view>
									<view class="width61 mc-input borderGray mc-noInput"
										v-if="contractOrder.planType==1">
										最优市场价
									</view>
									<view class="width61 mc-input borderGray mc-noInput"
										v-if="contractOrder.planType==2">
										最优对手价
									</view>
									<view class="width36 mc-input borderGray" style="padding: 0;"
										@click="openPopup('palnPopup')">
										<view class="duishoujia">
											<view v-if="contractOrder.planType==0">限价</view>
											<view v-if="contractOrder.planType==1">市价</view>
											<view v-if="contractOrder.planType==2" class="font12">对手价</view>
											<view class="imgBox" style="margin-left: 10upx;">
												<image src="../../static/image/xiangxiajiao.png" style="width: 24upx;height: 24upx;"></image>
											</view>
										</view>
									</view>
								</view>
							</view>

							<view style="width: 100%;height: 30upx;"></view>
							<view class="mc-l-list mc-l-inputNumber borderGray">
								<view>
									<input type="number" placeholder="数量" placeholder-style="color:#9fa2aa;" />
								</view>
								<view class="fontWeight colorGrey">BTC</view>
							</view>
							<view style="width: 100%;height: 30upx;"></view>
							<view class="mc-l-percent" v-if="contractOrder.typeIndex==0">
								<view v-for="(item,index) in percentArray" :key="index"
									:class="{'percentGreen':clickPercent==item.title}" @click="setPercent(item)">
									{{item.title}}</view>
							</view>
							<view class="mc-l-percent mc-noInput" v-if="contractOrder.typeIndex==1">
								<view v-for="(item,index) in percentArray" :key="index"
									:class="{'percentRed':clickPercent==item.title}" @click="setPercent(item)">
									{{item.title}}</view>
							</view>
							<!-- 止盈止损 -->
							<view class="mc-stop" v-if="contractOrder.tradeIndex!=2">
								<view style="width: 100%;height: 30upx;"></view>
								<view class="mc-s-header" @click="changStopFlag">
									<view class="fontWeight">止盈止损</view>
									<view class="imgBox">
										<image src="../../static/image/xiangxiajiao.png" style="width: 30upx;height: 30upx;"></image>
									</view>
								</view>
								<view v-if="stopFlag">
									<view style="width: 100%;height: 30upx;"></view>
									<view class="stop-box-list">
										<view class="sbl-box">
											<view class="sbl-b-title" style="background: #e8f7f4;color: #23a085;">止盈
											</view>
											<view class="sbl-inptbox">
												<view class="jiadian">-</view>
												<view class="sbl-input">
													<input type="number" v-model="contractOrder.profitPrice"
														placeholder="止盈价格" />
												</view>
												<view class="jiadian">+</view>
											</view>
										</view>
									</view>
									<view style="width: 100%;height: 30upx;"></view>
									<view class="stop-box-list">
										<view class="sbl-box">
											<view class="sbl-b-title" style="background: #f9edef;color: #c9445d;">止损
											</view>
											<view class="sbl-inptbox">
												<view class="jiadian">-</view>
												<view class="sbl-input">
													<input type="number" v-model="contractOrder.stopPrice"
														placeholder="止损价格" />
												</view>
												<view class="jiadian">+</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view style="width: 100%;height: 30upx;"></view>
							<view class="mc-l-titles">
								<view class="font12">
									可开多
									<span>0.0000 BTC</span>
								</view>
								<view class="font12">
									可用
									<span style="color: #000;">0.0000 USDT</span>
								</view>
								<view class="font12 box">
									<view class="font12 underline">保证金</view>
									<span style="color: #000;">0.0000 USDT</span>
								</view>
							</view>
							<view style="width: 100%;height: 10upx;"></view>
							<view class="mc-l-btn">
								<view :class="contractOrder.typeIndex==0?'bgGreen':'bgRed'">
									{{contractOrder.typeIndex==0?"买入开多":"卖出开空"}}
									<view class="mc-l-b-look">{{contractOrder.typeIndex==0?"看涨":"看跌"}}</view>
								</view>
							</view>
						</view>
						<view class="mc-c-c-right">
							<view class="mc-r-top">
								<view class="colorGrey">价格(USDT)</view>
								<view class="colorGrey">数量(BTC)</view>
							</view>
							<view style="width: 100%;height: 20upx;"></view>
							<view class="mc-r-sell">
								<view class="mc-r-listbox" v-for="(iten,index) in 5" :key="index">
									<view class="mc-r-list">
										<view style="color: #be2b46;">31604.68</view>
										<view style="color: #7d818a;">0.3471</view>
									</view>
									<view class="mc-r-bg" :style="'width:'+randWidth()+'%;'"></view>
								</view>
							</view>
							<view class="mc-r-nowPrice">
								<view>
									<view class="fontWeight" style="font-size: 36upx;color: #19b293;">31585.01</view>
								</view>
							</view>
							<view class="mc-r-buy">
								<view class="mc-r-listbox" v-for="(iten,index) in 5" :key="index">
									<view class="mc-r-list">
										<view style="color: #19b293;">31604.68</view>
										<view style="color: #7d818a;">0.3471</view>
									</view>
									<view class="mc-r-bg" :style="'width:'+randWidth()+'%;'"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="mc-order" style="height: calc(100% - 138upx);">
					<view style="width: 100%;height: 16upx;background: #f5f6fa;"></view>
					<view class="mc-o-header">
						<view class="mc-o-h-left">
							<v-tabs v-model="tabIndex" :tabs="tabArray" @change="changeTab" height="88upx"
								lineHeight="4upx" :lineScale="0.8" color="#898785" activeColor="#000"></v-tabs>
						</view>
						<view class="mc-o-h-right">
							<view class="imgBox" @click="skip('/pages/index/contractOrder')">
								<image src="../../static/image/heyue-dingdan.png" style="width: 40upx;height: 40upx;"></image>
							</view>
						</view>
					</view>
					<view class="mc-o-orderbox" style="height: calc(100% - 106upx);">
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
		</view>

		<!-- 切换 限价委托、市价委托、计划委托 -->
		<uni-popup ref="tradePopup" type="bottom">
			<view class="popup-box">
				<view class="pb-b-header box">
					<view></view>
				</view>
				<view class="pb-b-listBox">
					<view class="pb-b-list" v-for="(item,index) in tradeArray" :key="index"
						:class="{'active':contractOrder.tradeIndex == item.sign}" @click="setTradeIndex(item)">
						{{item.title}}
					</view>
				</view>
				<view style="width: 100%;height: 20upx;background: #f4f4f4;"></view>
				<view class="cancelBox" @click="closePopup('tradePopup')">取消</view>
			</view>
		</uni-popup>
		<!-- 切换 倍数 -->
		<uni-popup ref="multiplePopup" type="bottom">
			<view class="popup-box">
				<view class="pb-b-header box">
					<view></view>
				</view>
				<view class="pb-b-listBox">
					<view class="pb-b-list" v-for="(item,index) in multipleArray" :key="index"
						:class="{'active':contractOrder.multiple == item}" @click="setMultiple(item)">
						{{item}}
					</view>
				</view>
				<view style="width: 100%;height: 20upx;background: #f4f4f4;"></view>
				<view class="cancelBox" @click="closePopup('multiplePopup')">取消</view>
			</view>
		</uni-popup>
		<!-- 切换 计划委托中的限价、市价、对手价 -->
		<uni-popup ref="palnPopup" type="bottom">
			<view class="popup-box">
				<view class="pb-b-header box">
					<view></view>
				</view>
				<view class="pb-b-listBox">
					<view class="pb-b-list" v-for="(item,index) in planTypeArray" :key="index"
						:class="{'active':contractOrder.planType == item.sign}" @click="setPlanType(item)">
						{{item.title}}
					</view>
				</view>
				<view style="width: 100%;height: 20upx;background: #f4f4f4;"></view>
				<view class="cancelBox" @click="closePopup('palnPopup')">取消</view>
			</view>
		</uni-popup>
		<!-- 切换币种 -->
		<uni-drawer ref="coinDrawer" mode="left" width="80%">
			<view class="drawer-box">
				<view class="db-header">专业合约</view>
				<view style="height: calc(100% - 180upx);">
					<scroll-view scroll-y="true">
						<view class="db-coin-box">
							<view class="db-coinlist" v-for="(item,index) in symbolArr" :key="index"
								:class="{'active':index==0}" @click="setTradeCoin(item)">
								<view class="db-c-left">
									<view class="imgBox">
										<image src="../../static/image/coin-usdt.png" style="width: 50upx;height: 50upx;border-radius: 50%;"></image>
									</view>
									<view class="db-c-coinName">{{item | getSymbol(1)}} <span>/{{item | getSymbol(2)}}</span></view>
								</view>
								<view class="db-c-right colorGreen">32388.61</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</uni-drawer>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				symbolArr:["BTC/USDT","ETH/USDT","LINK/USDT","XRP/USDT","ADA/USDT"],
				ocIndex: 0, //0：开仓  1：平仓
				tradeArray: [{
					title: "限价委托",
					sign: 0
				}, {
					title: "市价委托",
					sign: 1
				}, {
					title: "计划委托",
					sign: 2
				}],
				multipleArray: ["10", "20", "50", "100"],
				planTypeArray: [{
					title: "限价",
					sign: 0
				}, {
					title: "市价",
					sign: 1
				}, {
					title: "对手价",
					sign: 2
				}], //为计划委托时的限价、市价、对手价
				clickPercent: "", //用户点击的百分数
				percentArray: [{
					title: "10%",
					multiplier: 0.1
				}, {
					title: "20%",
					multiplier: 0.2
				}, {
					title: "50%",
					multiplier: 0.5
				}, {
					title: "100%",
					multiplier: 1
				}],
				stopFlag: false, // 止盈止损输入 打开、关闭
				tabArray: ["持仓", "限价委托(0)", "计划委托(0)", "止盈止损(0)"], //我的订单类别
				tabIndex: 0, //当前选中的是哪个订单类别
				contractOrder: { //订单的所有信息
					typeIndex: 0, //0：开多 1：开空
					tradeIndex: 0, //0：限价委托 1：市价委托 2：计划委托
					multiple: "10", //倍数
					planType: 0, //为计划委托时 限价、市价、对手价
					profitPrice: "", //止盈价格
					stopPrice: "", //止损价格
				},
				nowCoin:"BTC/USDT",
			}
		},
		onShow() {
		},
		methods: {
			//选择币种
			setTradeCoin(item) {
				this.nowCoin = item;
				this.$refs.coinDrawer.close()
			},
			//点击显示币种切换
			showChangeCoin(e) {
				this.$refs[e].open()
			},
			//用户选中计划委托中的 限价、市价、对手价
			setPlanType(item) {
				this.contractOrder.planType = item.sign;
				this.$refs.palnPopup.close();
				// setTimeout(() => {
				// 	uni.showTabBar();
				// }, 300)
			},
			//用户选中倍数
			setMultiple(item) {
				this.contractOrder.multiple = item;
				this.$refs.multiplePopup.close();
				// setTimeout(() => {
				// 	uni.showTabBar();
				// }, 300)
			},
			//展示弹窗
			openPopup(val) {
				// uni.hideTabBar();
				this.$refs[val].open()
			},
			//关闭弹窗
			closePopup(val) {
				// if(val=='trade'){ //关闭 限价委托、市价委托、计划委托弹窗
				// 	this.$refs.tradePopup.close();
				// }else if(val=='multiple'){ //关闭 倍数弹窗
				// 	this.$refs.multiplePopup.close();
				// }else if(val=='planType'){ //关闭 计划委托中的限价、市价、对手价 弹窗
				// 	this.$refs.palnPopup.close();
				// }
				this.$refs[val].close();
				// setTimeout(() => {
				// 	uni.showTabBar();
				// }, 300)
			},
			//选中 限价委托、市价委托、计划委托
			setTradeIndex(item) {
				this.contractOrder.tradeIndex = item.sign;
				this.$refs.tradePopup.close();
				// setTimeout(() => {
				// 	uni.showTabBar();
				// }, 300)
			},
			//跳转
			skip(val) {
				this.$common.skipTo(val);
			},
			//点击查看K线图
			skipToKline(val){
				let symbol = this.nowCoin.replace("/","");
				symbol = symbol.toLowerCase();
				this.$common.skipTo(val+"?symbol="+symbol);
			},
			//切换订单类别
			changeTab(e) {
				// console.log(e)
			},
			//产生随机宽度
			randWidth() {
				let randnums = Math.random() * 70;
				randnums = Math.round(randnums);
				randnums = randnums + 10;
				return randnums;
			},
			//打开、关闭止盈止损
			changStopFlag() {
				if (this.stopFlag) {
					this.stopFlag = false;
				} else {
					this.stopFlag = true;
				}
			},
			//用户点击百分之
			setPercent(item) {
				this.clickPercent = item.title
			},
		},
		filters:{
			getSymbol:function(val,num){
				val = String(val);
				let arr = [];
				arr = val.split("/");
				if(num==1){
					return arr[0];
				}else if(num==2){
					return arr[1];
				}
			},
		}
	}
</script>

<style scoped>
	>>>#scrollContainer {
		z-index: 0 !important;
	}

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

	/**************************币种切换抽屉样式********************/
	.db-coin-box .active {
		background: #f5f6fa;
	}

	.db-c-right {
		font-weight: bold;
		font-size: 32upx;
	}

	.db-c-left {
		display: flex;
		align-items: center;
	}

	.db-c-coinName {
		font-size: 32upx;
		padding-left: 30upx;
		display: flex;
		align-items: flex-end;
	}

	.db-c-coinName span {
		color: #717485;
		font-size: 24upx;
	}

	.db-coinlist {
		padding: 0 30upx;
		width: 100%;
		height: 100upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.db-header {
		width: 100%;
		height: 180upx;
		display: flex;
		align-items: center;
		padding: 0 30upx;
		font-size: 40upx;
		font-weight: bold;
		padding-top: 20upx;
	}

	.drawer-box {
		width: 100%;
		height: 100%;
		background: #fff;
	}

	/***********************委托订单样式*****************/
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

	/**********************弹窗样式************************/
	>>>.uni-tabbar-bottom {
		display: none;
	}

	.pb-b-listBox {
		padding: 20upx 0;
	}

	.pb-b-listBox>.active {
		color: #245df2;
	}

	.pb-b-list {
		width: 100%;
		padding: 25upx 0;
		text-align: center;
	}

	.cancelBox {
		width: 100%;
		height: 88upx;
		text-align: center;
		line-height: 88upx;
		color: #76798a;
	}

	.pb-b-header {
		padding: 40upx;
		justify-content: center;
	}

	.pb-b-header>view {
		width: 160upx;
		height: 12upx;
		background: #ececec;
		border-radius: 10px;
	}

	.popup-box {
		background: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	/******************标准合约样式**********************/
	.sc-c-title {
		width: 100%;
		height: 260upx;
		background: #f7f8fa;
		color: #777a8b;
		display: flex;
		justify-content: center;
	}

	.diezhangfu {
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		color: #fff;
		border-radius: 3px;
		font-size: 28upx;
	}

	.sc-coin {
		font-size: 24upx;
		color: #9c9d97;
	}

	.sc-coin span {
		color: #000;
		font-weight: 700;
	}

	.sc-list {
		width: 100%;
		padding: 30upx 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #f2f2f2;
	}

	.width40 {
		width: 40%;
	}

	.width20 {
		width: 20%;
	}

	.sc-header {
		width: 100%;
		height: 70upx;
		padding: 0 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.sc-header>view {
		font-size: 24upx;
		color: #8d8c8b;
	}

	/**************专业合约样式*******************/
	.mc-noInput {
		display: flex;
		width: 100%;
		background: #f4f7ff;
		color: #a5a8b1;
		font-size: 24upx;
		align-items: center;
		font-weight: bold;
	}

	.mc-o-h-left {
		width: 88%;
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

	.mc-r-sell .mc-r-bg {
		position: absolute;
		height: 100%;
		top: 0;
		background: #fff5f6;
		z-index: -1;
		right: 0;
	}

	.mc-r-buy .mc-r-bg {
		position: absolute;
		height: 100%;
		top: 0;
		background: #effaf6;
		z-index: -1;
		right: 0;
	}

	.mc-r-nowPrice {
		display: flex;
		align-items: center;
		padding: 20upx 0;
	}

	.mc-r-listbox {
		padding-right: 20upx;
		position: relative;
	}

	.mc-r-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15upx 0;
	}

	.mc-r-list view {
		font-size: 24upx;
	}

	.mc-r-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 20upx;
	}

	.mc-r-top>view {
		font-size: 8px;
	}

	.mc-l-b-look {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 60upx;
		font-size: 24upx;
		color: rgba(255, 255, 255, 0.6);
	}

	.mc-l-btn>view {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		color: #fff;
		text-align: center;
		border-radius: 3px;
		position: relative;
	}

	.mc-l-titles>view {
		color: #a4a7af;
		padding-bottom: 16upx;
	}

	.mc-l-titles span {
		font-size: 24upx;
		padding-left: 20upx;
	}

	.sbl-input>input {
		width: 100%;
		height: 100%;
		border-left: 1px solid #e6e6e6;
		border-right: 1px solid #e6e6e6;
		padding: 0 20upx;
		font-size: 28upx;

	}

	.sbl-input>input::-webkit-input-placeholder {
		color: #a3a6b1;
		font-size: 24upx;
	}

	.sbl-input {
		width: 64%;
		height: 100%;
	}

	.jiadian {
		width: 18%;
		height: 100%;
		font-weight: bold;
		color: #d1d1db;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
	}

	.sbl-b-title {
		width: 12%;
		height: 100%;
		font-size: 24upx;
		text-align: center;
		writing-mode: tb;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 2px;
	}

	.sbl-inptbox {
		width: 86%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid #e6e6e6;
		border-radius: 4px;
	}

	.sbl-box {
		height: 70upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mc-s-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.percentGreen {
		background: #e8f7f4;
		border-color: #35ae96 !important;
		color: #000 !important;
	}

	.percentRed {
		background: #f9edef;
		border-color: #d14b64 !important;
		color: #000 !important;
	}

	.mc-l-percent {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mc-l-percent>view {
		width: 22%;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		border: 1px solid #e8e8e8;
		border-radius: 3px;
		color: #9fa3ad;
		font-size: 24upx;
	}

	.mc-l-inputNumber {
		height: 70upx;
		padding: 0 20upx;
	}

	.duishoujia {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	>>>.sbl-input .uni-input-input {
		font-size: 28upx;
	}

	>>>.mc-l-inputNumber .uni-input-input {
		font-weight: bold;
		font-size: 28upx;
	}

	>>>.mc-input .uni-input-input {
		font-weight: bold;
		font-size: 28upx;
	}

	.mc-input>input {
		width: 100%;
		height: 100%;
	}

	.mc-input {
		display: flex;
		height: 70upx;
		justify-content: space-between;
		align-items: center;
		padding-left: 20upx;
		padding-right: 20upx;
	}

	.borderGray {
		border: 1px solid #e3e3e3;
		border-radius: 3px;
	}

	.mc-tradType {
		display: flex;
		height: 50upx;
		justify-content: space-between;
		align-items: center;
		padding-left: 20upx;
		padding-right: 6upx;
	}

	.width61 {
		width: 61%;
	}

	.width36 {
		width: 36%;
	}

	.mc-l-list {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.bgGreen {
		background: #19b293 !important;
	}

	.bgRed {
		background: #d14b64 !important;
	}

	.mc-l-t-title {
		color: #fff;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -55%);
		font-size: 32upx;
	}

	.mc-l-type {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mc-l-type>view {
		width: 49%;
		position: relative;
	}

	.mc-l-t-left {
		width: 100%;
		height: 70upx;
		text-align: center;
		background-color: #d5d8df;
		border-radius: 4px;
		transform: perspective(10px) scale(1.1, 1.3) rotateX(-5deg);
		transform-origin: top left;
	}

	.mc-l-t-right {
		width: 100%;
		height: 70upx;
		background-color: #d5d8df;
		border-radius: 4px;
		transform: perspective(10px) scale(1.1, 1.3) rotateX(5deg);
		transform-origin: bottom right;
	}

	.mc-l-right {
		display: flex;
		align-items: center;
	}

	.mc-l-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #a3a6b0;
	}

	.mc-c-c-left {
		width: 59%;
	}

	.mc-c-c-right {
		width: 37%;
	}

	.mc-c-center {
		padding: 30upx 0upx 30upx 30upx;
		display: flex;
		justify-content: space-between;
	}

	.mc-c-nav>view {
		width: 50%;
		text-align: center;
		line-height: 80upx;
		height: 100%;
		border-bottom: 1px solid transparent;
		color: #a4a7b1;
	}

	.mc-c-nav {
		width: 100%;
		height: 80upx;
		display: flex;
		border-bottom: 1px solid #e5e8f0;
	}

	.mc-c-nav .active {
		color: #2f5bce;
		border-color: #2f5bce;
	}

	.mc-h-titles {
		display: flex;
		align-items: center;
		padding-top: 20upx;
	}

	.mc-h-titles>view {
		width: 50%;
	}

	.mc-h-titles>view span {
		font-size: 24upx;
		color: #a7a9b2;
	}

	.mc-h-coin {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.mc-h-c-l-coin {
		padding-left: 16upx;
		font-weight: bold;
	}

	.mc-h-c-left {
		display: flex;
		/* align-items: flex-end; */
		align-items: center;
	}

	.mc-header {
		padding: 10upx 30upx;
	}

	/*头部样式*/
	.community-header {
		display: flex;
		align-items: center;
		border-radius: 2px;
		overflow: hidden;
		border: 1px solid rgba(61, 111, 242, 0.1);
		padding: 1px;
	}

	.community-header>.active {
		background: #3d6ff2;
		color: #fff;
		border-color: #3d6ff2;
	}

	.community-header>view {
		width: 200upx;
		height: 64upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid transparent;
	}

	.container {
		width: 100%;
		height: 100%;
	}
</style>
