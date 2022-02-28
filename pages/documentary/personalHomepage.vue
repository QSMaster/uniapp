<template>
	<view class="container">
		<!-- 高斯模糊背景 -->
		<view class="mohu-bg-box">
			<helang-blur blurs="xl" imgUrl="../../static/image/userActer.png"></helang-blur>
		</view>
		<view class="homePageHeader">
			<view class="hph-box">
				<view class="hph-nameImg box">
					<view class="hph-n-left">
						<view class="hph-n-name">Vladarz</view>
						<view class="hph-n-l-box">
							<view class="hph-n-l-real box">
								<view class="font12" style="color: #7c91b9;">实名认证</view>
							</view>
						</view>
					</view>
					<view class="hph-n-right imgBox">
						<image src="../../static/image/userActer.png" style="width: 130upx;height: 130upx;border-radius: 50%;"></image>
					</view>
				</view>
				<view class="hph-time box">
					<view class="hph-t-left">中国大陆</view>
					<view class="hph-t-right">2021/1/7 加入</view>
				</view>
			</view>
		</view>
		<view class="hp-personalProfile">
			<view class="hp-pp-box box">
				<view class="hp-pp-b-title">个人简介</view>
				<view class="hp-pp-b-remark" @click="openCloseRemarke">
					<textsh></textsh>
					<view class="shenSuo" v-if="!openRemarkeFlag">{{remarke}}</view>
					<view class="noshenSuo" v-if="openRemarkeFlag">{{remarke}}</view>
				</view>
			</view>
			<view class="hp-bgZ"></view>
		</view>
		<view class="hp-content">
			<view class="hp-c-header">
				<view class="hp-c-box">
					<view class="hp-c-h-list box">
						<view class="numbers" style="text-align: left;color: #1dbd78;">441.79%</view>
						<view class="numbers" style="text-align: center;">86.66%</view>
						<view class="numbers" style="text-align: right;">1.35%</view>
					</view>
					<view class="hp-c-h-list box">
						<view class="titles" style="text-align: left;">累计收益率</view>
						<view class="titles" style="text-align: center;">近3周交易胜率</view>
						<view class="titles" style="text-align: right;">近3周最大回撤</view>
					</view>
					<view class="hp-c-h-list box" style="padding-top: 30upx;">
						<view class="numbers" style="text-align: left;">401</view>
						<view class="numbers" style="text-align: center;">15</view>
						<view class="numbers" style="text-align: right;">494</view>
					</view>
					<view class="hp-c-h-list box">
						<view class="titles" style="text-align: left;">交易天数</view>
						<view class="titles" style="text-align: center;">近3周交易笔数</view>
						<view class="titles" style="text-align: right;">累计跟随人数</view>
					</view>
				</view>
				<view class="hp-c-h-title">跟单利润分成比例：8.00%</view>
			</view>
			<view style="width: 100%;height: 20upx;background: #f7f8fa;"></view>
		</view>
		<view class="hp-listbox" style="height: calc(100% - 168upx);">
			<view class="hp-l-option">
				<view class="hp-l-header box">
					<view class="hp-l-h-box box">
						<view :class="{'active':listType=='0'}" @click="listType=0">历史持仓</view>
						<view :class="{'active':listType=='1'}" @click="listType=1">跟随者</view>
					</view>
				</view>
				<view class="box" style="width: 100%;height: 80upx;align-items: center;padding: 0 30upx;">
					<view style="font-size: 24upx;color: #797e8c;" v-if="listType==1">
						近7天累计跟随人数变化：<span style="font-size: 24upx;color: #245bef;font-weight: bold;">+98 (+5.71%)</span>
					</view>
				</view>
			</view>
			<view class="hp-l-box" style="height: calc(100% - 180upx);">
				<scroll-view scroll-y style="width: 100%;height: 100%;">
					<!-- 历史持仓 -->
					<view v-if="listType==0">
						<view class="hp-l-b-list" v-for="(item,index) in 20" :key="index">
							<view class="hp-l-b-l-top box">
								<view class="hp-l-b-l-t-left">
									<view class="fontWeight" style="padding-bottom: 16upx;">{{index}}BTC/USDT 10X <span style="padding-left: 10upx;color: #00a555;">做多</span></view>
									<view class="box hp-l-b-price">
										<view>
											<view class="fontWeight" style="padding-bottom: 8upx;">16.6396</view>
											<view class="colorGray">开仓价</view>
										</view>
										<view style="padding: 0 30upx;">
											<view class="imgBox">
												<image src="../../static/image/jiantou-you.png" style="width: 50upx;height: 30upx;"></image>
											</view>
										</view>
										<view>
											<view class="fontWeight" style="padding-bottom: 8upx;">15.1751</view>
											<view class="colorGray">平仓价</view>
										</view>
									</view>
								</view>
								<view class="hp-l-b-l-t-right">
									<view class="fontWeight" style="padding-bottom: 20upx;">-100%</view>
									<view>收益率</view>
								</view>
							</view>
							<view style="width: 100%;height: 20upx;"></view>
							<view class="hp-l-b-l-bottom">
								<view class="hp-l-b-l-b-titles box">
									<view>开仓时间：01/08 10:52:44</view>
									<view>平仓时间：01/08 10:55:44</view>
								</view>
								<view class="hp-l-b-l-b-titles box">
									<view>订单号：81112609</view>
									<view>订单类型：自主下单</view>
								</view>
							</view>
						</view>
						<view style="width: 100%;height: 150upx;"></view>
					</view>
					<!-- 跟随者 -->
					<view v-if="listType==1">
						<view class="hp-l-followlist" v-for="(item,index) in 20" :key="index">
							<view class="hp-l-b-l-top box">
								<view class="hp-l-f-t-left box">
									<view class="imgBox">
										<image src="../../static/image/userActer.png" style="width: 80upx;height: 80upx;border-radius: 50%;"></image>
									</view>
									<view style="padding-left: 20upx;">
										<view style="color: #5a74a5;padding-bottom: 10upx;">{{index}}币海赚钱</view>
										<view class="colorGray" style="font-size: 24upx;">跟随总额：3903.08</view>
									</view>
								</view>
								<view class="hp-l-f-t-right">
									<view class="fontWeight" style="padding-bottom: 10upx;color: #1dbe78;">+575.29</view>
									<view class="colorGray" style="font-size: 24upx;">跟随收益(USDT)</view>
								</view>
							</view>
						</view>
						<view class="hp-l-followtitle" style="">仅展示25位跟随者数据</view>
						<view style="width: 100%;height: 150upx;"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="hp-bottom box">
			<view class="hp-b-share">推荐有奖</view>
			<view class="hp-b-follow" @click="skip('/pages/documentary/withGo')">跟单</view>
		</view>
	</view>
</template>

<script>
	import textsh from "../../components/textShrink/textShrink.vue"
	export default {
		data() {
			return {
				listType: 1, // 0：历史持仓  1：跟随者
				openRemarkeFlag:false, // 判断是否展开个人简介
				remarke:"黎梓呈熙黎梓呈熙黎梓呈熙熙攘攘攘黎梓呈熙黎梓呈熙攘攘攘黎梓呈熙黎梓呈熙攘攘攘黎梓呈熙黎梓呈熙", //个人简介
			}
		},
		components: {
			textsh
		},
		onLoad() {

		},
		methods: {
			//跳转
			skip(val){
				uni.navigateTo({
					url:val
				})
			},
			//点击个人简介展开
			openCloseRemarke(){
				if(this.remarke.length>40){
					if(this.openRemarkeFlag){
						this.openRemarkeFlag = false;
					}else{
						this.openRemarkeFlag = true;
					}
				}
			},
		}
	}
</script>

<style scoped>
	*{
		font-size: 28upx;
	}
	.noshenSuo{
		font-size: 24upx;
		/* animation: changeHeight 2s ease 0.5s forwards; */
	}
	.shenSuo{
		font-size: 24upx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	@keyframes changeHeight
	{
		0% {
			height: 60upx;
		}
		100% {
			height: auto;
		}
	}
	
	
	.hp-l-option{
		width: 100%;
		height: 180upx;
	}
	.hp-l-followtitle{
		width: 100%;height: 110upx;text-align: center;line-height: 110upx;
		font-size: 24upx;
		color: #918e90;
	}
	.hp-l-f-t-right{
		text-align: right;
	}
	.hp-l-f-t-left{
		width: 440upx;
		border-right: 2px solid #f4f4f4;
		align-items: center;
	}
	.hp-l-followlist{
		padding: 40upx 0;
		border-bottom: 1px solid #f3f3f3;
	}
	.hp-b-follow{
		width: 400upx;
		height: 90upx;
		text-align: center;
		line-height: 90upx;
		background: #3d6ff2;
		color: #fff;
		border-radius: 4px;
	}
	.hp-b-share{
		width: 260upx;
		height: 90upx;
		text-align: center;
		line-height: 90upx;
		background: #f3f6ff;
		color: #2455d3;
		border-radius: 4px;
	}
	.hp-bottom{
		width: 100%;
		position: fixed;
		background: #fff;
		left: 0;
		bottom: 0;
		height: 150upx;
		border-top: 1px solid #f6f6f6;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
	}
	.hp-l-b-l-b-titles {
		padding-top: 10upx;
	}

	.hp-l-b-l-b-titles>view {
		width: 50%;
		color: #928d8b;
		font-size: 24upx;
	}

	.colorGray {
		color: #8f8e8c;
	}

	.hp-l-b-price {
		align-items: center;
	}

	.hp-l-b-l-t-left {
		width: 500upx;
		border-right: 2px solid #f4f4f4;
	}

	.hp-l-b-l-t-right {}

	.hp-l-b-l-top {
		align-items: center;
		justify-content: space-between;
	}

	.hp-l-b-list {
		padding: 40upx 0;
		border-bottom: 1px solid #f3f3f3;
	}

	.hp-l-box {
		padding: 0upx 30upx 0upx 30upx;
	}

	.hp-l-header {
		width: 100%;
		height: 100upx;
		align-items: flex-end;
		justify-content: center;
	}

	.hp-l-h-box {
		width: 560upx;
		height: 60upx;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		overflow: hidden;
	}

	.hp-l-h-box>.active {
		background: #3d6ff2;
		color: #fff;
	}

	.hp-l-h-box>view {
		height: 100%;
		width: 50%;
		background: #f7f8fa;
		color: #9b9a98;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hp-c-header {
		padding: 60upx 30upx 30upx 30upx;
	}

	.hp-c-h-title {
		color: #808693;
		font-size: 12px;
		padding-top: 30upx;
	}

	.hp-c-box {
		border-bottom: 1px solid #f3f3f3;
		padding-bottom: 30upx;
	}

	.hp-c-h-list .numbers {
		font-weight: bold;
		font-size: 32upx;
	}

	.hp-c-h-list .titles {
		font-size: 12px;
		color: #8c8b89;
		padding-top: 10upx;
	}

	.hp-c-h-list {
		align-items: center;
		justify-content: space-between;
	}

	.hp-c-h-list>view {
		width: 33.33333%;
	}

	.hp-bgZ {
		position: absolute;
		width: 100%;
		height: 500upx;
		top: 100upx;
		background: #fff;
		left: 0;
		z-index: -1;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.hp-pp-b-remark {
		width: 500upx;
		color: #828692;
		font-size: 24upx;
	}

	.hp-pp-b-title {
		width: 130upx;
		font-size: 24upx;
	}

	.hp-pp-box {
		justify-content: space-between;
		align-items: flex-start;
	}

	.hp-content {
		background: #fff;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.mohu-bg-box {
		position: absolute;
		width: 100%;
		height: 40%;
		top: 0;
		left: 0;
		z-index: -2;
	}

	.hp-pp-box {
		width: 100%;
		background: #e2e6f1;
		padding: 25upx 30upx;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	.hp-personalProfile {
		width: 100%;
		padding: 0 30upx;
		position: relative;
	}

	.hph-time {
		align-items: center;
		justify-content: space-between;
	}

	.hph-time>view {
		color: #a0a1aa;
		font-size: 12px;
		padding: 30upx 0;
	}

	.hph-n-name {
		color: #fff;
		font-weight: bold;
		padding-bottom: 10upx;
	}

	.hph-box {
		padding: 30upx;
	}

	.hph-n-l-box {
		background: #fff;
		border-radius: 10px;
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

	.hph-nameImg {
		align-items: flex-end;
		justify-content: space-between;
	}

	.homePageHeader {
		padding-top: 130upx;
	}

	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
