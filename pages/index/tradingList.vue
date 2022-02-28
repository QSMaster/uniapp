<template>
	<view class="container">
		<nav-bar title="交易记录" bgColor="#0278FF" fontColor="#ffffff">
			<view slot="right">
				<view class="img-box" @click="screenClick">
					<image src="../../static/image/jiaoyi-shaixuan.png" style="width: 36upx;height: 36upx;margin-right: 30upx;"></image>
				</view>
			</view>
		</nav-bar>
		<view class="records-box">
			<z-paging ref="paging" fixed @query="queryList" :list.sync="dataList">
			<view>
				<view class="records-list" v-for="(item,index) in dataList" :key="index">
					<view class="rl-left">
						<view class="rl-left-img" :class="{'rl-r-t-t-sell':item.type==1}">{{item.type==0?"买":"卖"}}</view>
					</view>
					<view class="rl-right">
						<view class="rl-r-topbox">
							<view class="rl-r-top">
								<view>
									<span class="rl-r-t-type" :class="{'rl-r-t-t-sell':item.type==1}">{{item.type==0?"买入":"卖出"}}</span>
									<span class="rl-r-t-coin">{{item.symbol}}</span>
								</view>
								<view class="rl-r-t-name">{{item.bourseId | brouseName($store.state.bourseArray)}}</view>
							</view>
							<view class="rl-r-time">时间：{{item.createTime}}</view>
						</view>
						<view style="width: 100%;height: 18upx;"></view>
						<view class="rl-r-list">
							<view class="rl-r-l-title">订单编号:</view>
							<view class="rl-r-l-number">{{item.orderId}}</view>
						</view>
						<view class="rl-r-list">
							<view class="rl-r-l-title">下单数量:</view>
							<view class="rl-r-l-number">{{item.orderQuantity}}</view>
						</view>
						<view class="rl-r-list">
							<view class="rl-r-l-title">下单限价:</view>
							<view class="rl-r-l-number">{{item.orderPriceLimit}}</view>
						</view>
						<view class="rl-r-list">
							<view class="rl-r-l-title">成交数量:</view>
							<view class="rl-r-l-number">{{item.turnover}}</view>
						</view>
						<view class="rl-r-list">
							<view class="rl-r-l-title">成交均价:</view>
							<view class="rl-r-l-number">{{item.avgTransactionPrice}}</view>
						</view>
						<view class="rl-r-list">
							<view class="rl-r-l-title">手&nbsp;续&nbsp;&nbsp;费:</view>
							<view class="rl-r-l-number">{{item.brokerage}}</view>
						</view>
						<view class="rl-r-list">
							<view class="rl-r-l-title">补仓次数:</view>
							<view class="rl-r-l-number">{{item.replenishmentTimes}}</view>
						</view>
						<view class="rl-r-list">
							<view class="rl-r-l-title">盈&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;利:</view>
							<view class="rl-r-l-number">{{item.profit}}</view>
						</view>
					</view>
				</view>
			</view>
			</z-paging>
		</view>
		<!-- 筛选弹窗 -->
		<uni-popup ref="screenPoupup" type="bottom">
			<view class="screen-box">
				<view class="sreen-box-box">
					<view class="sbb-title">订单状态</view>
					<view class="sbb-type">
						<view :class="{'active':screenInfo.type===''}" @click="screenInfo.type=''">全部</view>
						<view :class="{'active':screenInfo.type===0}" @click="screenInfo.type=0">买入</view>
						<view :class="{'active':screenInfo.type===1}" @click="screenInfo.type=1">卖出</view>
					</view>
					<view class="sbb-title">交易所</view>
					<view class="sbb-input">
						<input type="text" v-model="screenInfo.exchange" />
					</view>
					<view class="sbb-title">交易币对查询</view>
					<view class="sbb-input">
						<input type="text" v-model="screenInfo.coin" />
					</view>
					<view class="sbb-remark">如：查询BTC/USDT，请填写btcusdt</view>
					<view class="sbb-title">时间</view>
					<view class="sbb-time-input">
						<view class="sbb-time-box">
							<picker mode="date" :value="screenInfo.startTime" @change="setStratTime">
								<view class="uni-input">{{screenInfo.startTime}}</view>
							</picker>
						</view>
						<view>至</view>
						<view class="sbb-time-box">
							<picker mode="date" :value="screenInfo.endTime" @change="setEndTime">
								<view class="uni-input">{{screenInfo.endTime}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 100upx;"></view>
				<view class="sbb-btn">
					<view class="sbb-btn-cancel" @click="setAgin">重置</view>
					<view class="sbb-btn-ok" @click="comfirmGo">确认</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenInfo:{
					type:"", //''全部 0买入 1卖出
					exchange:"", //交易所
					coin:"", //交易对
					startTime:"", //开始时间
					endTime:"", //结束时间
				},
				dataList:[], //数据列表
			}
		},
		onLoad(option) {
			this.screenInfo.coin = option.symbol.replace("-", "/");
		},
		onShow() {
			console.log(this.$store.state.bourseArray)
		},
		methods: {
			//获取数据列表
			queryList(pageNo, pageSize) {
				let _this=this;
				this.$api.transactionRecords({
						pageNum:pageNo,
						pageSize:pageSize,
						bourseName:_this.screenInfo.exchange,
						createTime:_this.screenInfo.startTime,
						endTime:_this.screenInfo.endTime,
						orderId:"",
						symbol:_this.screenInfo.coin,
						type:_this.screenInfo.type,
				},res=>{
					this.$refs.paging.complete(res.result.list);
				})
			},
			//设置结束时间
			setEndTime(e){
				this.screenInfo.endTime = e.target.value;
			},
			//设置开始时间
			setStratTime(e){
				this.screenInfo.startTime = e.target.value;
			},
			//点击重置
			setAgin(){
				
			},
			//点击确认进行筛选
			comfirmGo(){
				this.$refs.screenPoupup.close();
				uni.showLoading({
					title:"loading..."
				})
				setTimeout(()=>{
					this.$refs.paging.reload();
					uni.hideLoading()
				},1500)
			},
			//点击进行筛选
			screenClick(){
				this.$refs.screenPoupup.open();
			}
		},
		filters:{
			brouseName:function(val,item){
				let brouseItem = item.find(item =>{
					if(item.id==val){
						return item.bourseShortName
					}
				})
				return brouseItem.bourseShortName
			}
		}
	}
</script>

<style>
	.rl-r-t-t-sell{
		color: #D14C64 !important;
	}
	>>>.z-paging-content-fixed{
		top: 138upx;
	}
	.sbb-btn-ok{
		background: #0278fe;
		color: #fff;
	}
	.sbb-btn-cancel{
		background: #f7f6fb;
	}
	.sbb-btn{
		width: 100%;
		height: 90upx;
		display: flex;
	}
	.sbb-btn>view{
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	>>>.sbb-time-box uni-picker{
		width: 100%;
		height: 100%;
	}
	>>>.sbb-time-box uni-picker div{
		width: 100%;
		height: 100%;
	}
	>>>.sbb-time-box .uni-input{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.sbb-time-box{
		width: 280upx;
		height: 70upx;
		background: #f7f6fb;
		border-radius: 3;
	}
	.sbb-time-input{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.sbb-remark{
		color: #999999;
		font-size: 28upx;
		padding-top: 30upx;
	}
	>>>.sbb-input .uni-input-input{
		font-size: 28upx;
	}
	.sbb-input{
		width: 350upx;
		height: 70upx;
		border-radius: 3px;
		background: #f7f6fb;
	}
	.sbb-input>input{
		width: 100%;
		height: 100%;
		padding: 0 20upx;
	}
	.sbb-type .active{
		background: #0278fe;
		color: #fff;
	}
	.sbb-type>view{
		width: 30%;
		height: 70upx;
		background: #f7f6fb;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		font-size: 28upx;
	}
	.sbb-type{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.sbb-title{
		font-size: 32upx;
		padding: 40upx 0 20upx 0;
	}
	.sreen-box-box{
		padding: 0upx 30upx 30upx 30upx;
	}
	.screen-box{
		width: 100%;
		background: #fff;
	}
	.rl-r-l-number{
		color: #2F3133;
		padding-left: 20upx;
	}
	.rl-r-l-title{
		width: 130upx;
		color: #8D9299;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.rl-r-list{
		display: flex;
		align-items: center;
		padding-top: 16upx;
	}
	.rl-r-topbox{
		border-bottom: 1px solid #F0F0F0;
		padding: 12upx 0;
	}
	.rl-r-time{
		color: #5E6266;
		padding: 14upx 0;
	}
	.rl-r-t-type{
		color: #06AD90;
		font-size: 32upx;
		font-weight: 600;
	}
	.rl-r-t-coin{
		font-size: 32upx;
		font-weight: 600;
		padding-left: 20upx;
	}
	.rl-r-top{
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.rl-right *{
		font-size: 26upx;
	}
	.rl-right{
		padding-left: 20upx;
		width: 578upx;
	}
	.rl-r-t-name{
		color: #0278FF;
	}
	page{
		background: #F0F0F0;
	}
	.rl-left-img{
		width: 112upx;
		height: 112upx;
		border-radius: 50%;
		background: #EEEEEE;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40upx;
		color: #06AD90;
		font-weight: bold;
	}
	.records-list{
		background: #fff;
		border-radius: 5px;
		padding: 20upx 20upx 40upx 20upx;
		display: flex;
		margin-bottom: 20upx;
	}
	.records-box{
		padding: 20upx;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
