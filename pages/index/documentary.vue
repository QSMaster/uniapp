<template>
	<div class="community" style="height: calc(100% - 50px);">
		<!-- 头部 -->
		<nav-bar :shadow="true" title="跟单" backState="1000" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<!-- <view style="width: 100%;height: 20upx;background: #f7f8fa;"></view> -->
		<!-- 社区内容 -->
		<view style="width: 100%;height: 100%;">
			<!-- 跟单 -->
			<view class="community-documentary">
				<z-paging ref="gendanPaging" fixed @query="getGendan" :list.sync="tradersList" :auto-clean-list-when-reload="false" :auto-show-back-to-top="true">
					<view>
						<view class="cd-header">
							<view class="cd-h-searchBox" @click="skip('/pages/documentary/searchInvestor')">
								<view class="imgBox">
									<image src="../../static/image/sousuo.png" style="width: 36upx;height: 36upx;"></image>
								</view>
								<view style="font-size: 24upx;padding-left: 10upx;">搜索所有投资者</view>
							</view>
							<view class="img-box" @click="skip('/pages/documentary/screenCondition')">
								<image src="../../static/image/shaixuan.png" style="width: 40upx;height: 40upx;"></image>
							</view>
						</view>
						<view class="cd-headerTitle">
							<view class="cd-ht-left">
								<view>交易员列表</view>
								<view class="img-box" style="padding-left: 20upx;">
									<image src="../../static/image/guanyu.png" style="width: 30upx;height: 30upx;" @click="showPopup('shuomingPopup')"></image>
								</view>
							</view>
							<view class="cd-ht-right">跟单管理</view>
						</view>
						<view class="cd-ranking">
							<span class="cd-r-title">数据每小时更新一次</span>
							<view style="width: 100%;height: 30upx;"></view>
							<scroll-view scroll-x class="cd-r-box">
								<view class="cd-r-list" v-for="(item,index) in 3" :key="index" style="position: relative;" @click="toHomePage(item)">
									<!-- 高斯模糊背景 -->
									<helang-blur blurs="s" imgUrl="../../static/image/userActer.png" style="z-index: -1;"></helang-blur>
									
									<view class="cd-r-l-top" style="z-index: 1;">
										<view class="imgBox userBg">
											<image src="../../static/image/userActer.png" style="width: 96upx;height: 96upx;"></image>
										</view>
										<view class="cd-r-l-t-name">yInuO.9527</view>
									</view>
									<view class="cd-r-l-bottom" style="z-index: 1;">
										<view class="cd-r-l-titles">
											<view>收益</view>
											<view style="color: #10c976;">356.98%</view>
										</view>
										<view class="cd-r-l-titles">
											<view>跟随人数</view>
											<view>1000+</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
						<view style="width: 100%;height: 15upx;background: #f7f8fa;"></view>
						<view class="cd-listbox" v-for="(item,index) in 10" :key="index" @click="toHomePage(item)">
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
							<view style="width: 100%;height: 15upx;background: #f7f8fa;"></view>
						</view>
					</view>
				</z-paging>
			</view>
		</view>
		<!-- 交易员列表说明 -->
		<uni-popup type="center" ref="shuomingPopup" :maskClick="false">
			<view class="pb-box">
				<!-- <view class="tp-header">跟单费用</view> -->
				<view style="width: 100%;height: 50upx;"></view>
				<view class="tp-content">
					<view class="tp-c-box">
						<view style="line-height: 50upx;">
							<view>1.根据以下3个维度综合评估得到排名</view>
							<view style="text-indent : 30upx">a）跟随盈利：持续带领跟随者盈利的交易员会被优先推荐。</view>
							<view style="text-indent : 30upx">b）个人主页数据：个人主页数据优越者会被优先推荐。</view>
							<view style="text-indent : 30upx">c）地区亲密性：与跟随者同地区交易员会被优先推荐。</view>
							<view>2.根据上述排名规则，不同用户的交易员排名顺序可能不同。</view>
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 50upx;"></view>
				<view class="Iknow" @click="closeTotal('shuomingPopup')">我知道了</view>
			</view>
		</uni-popup>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				paddingStyle: {
					'padding-top': this.$store.state.statusHeight + 'px'
				},
				tradersList:[], //交易员列表
			}
		},
		onShow() {
			setTimeout(()=>{
				this.$refs.gendanPaging.reload()
			},200)
		},
		mounted() {
			// this.exchangeSquareList()
		},
		methods: {
			//获取跟单交易员列表
			getGendan(pageNo, pageSize){
				this.$api.newsList({
					pageNum: pageNo,
					pageSize: pageSize,
				}, res => {
					this.$refs.gendanPaging.complete(res.result.list);
				})
			},
			//点击展示累计跟单费用
			showPopup(val){
				this.$refs[val].open();
			},
			//点击关闭累计跟单费用
			closeTotal(val){
				this.$refs[val].close();
			},
			//跳转
			skip(val){
				uni.navigateTo({
					url:val
				})
			},
			//点击查看个人主页
			toHomePage(item){
				uni.navigateTo({
					url:"/pages/documentary/personalHomepage"
				})
			},
		}
	}
</script>

<style scoped="scoped">
	>>>.z-paging-content-fixed {
		top: 138upx;
	}
	.im-l-l-title {
		font-size: 30upx;
	}
	
	.im-l-l-time {
		font-size: 24upx;
		color: #929aa6;
	}
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
	/*跟单*/
	.cd-l-bottom {
		display: flex;
	}

	.cd-l-bottom>view {
		width: 33.333%;
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

	.cd-l-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 40upx;
	}

	.listUserImg {
		width: 74upx;
		height: 74upx;
		border-radius: 50%;
		background: #fff;
		overflow: hidden;
	}
	.listUserImg image{
		border-radius: 50%;
	}
	.cd-r-l-t-name {
		color: #fff;
		padding-top: 20upx;
	}

	.cd-r-l-top {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.userBg {
		width: 96upx;
		height: 96upx;
		border-radius: 50%;
		background: #fff;
		overflow: hidden;
	}
	.userBg image{
		border-radius: 50%;
	}
	.cd-r-l-titles {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cd-r-l-titles view {
		font-size: 24upx;
		color: #fff;
	}

	.cd-r-l-bottom {
		width: 100%;
		height: 130upx;
		background: rgba(0, 0, 0, 0.3);
		padding: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.cd-r-l-top {
		width: 100%;
		height: 210upx;
	}

	.cd-r-box {
		overflow-x: hidden;
		width: 100%;
		white-space: nowrap;
	}

	.cd-r-list {
		height: 340upx;
		width: 300upx;
		/* background: #666666; */
		border-radius: 6px;
		overflow: hidden;
		margin-right: 20upx;
		display: inline-block;
	}

	.cd-r-title {
		width: auto;
		font-size: 24upx;
		color: #a6a9b0;
		background: #ecf2fe;
		padding: 8upx 10upx;
	}

	.cd-ranking {
		padding: 0upx 0upx 30upx 30upx;
	}

	.cd-ht-left {
		display: flex;
		align-items: center;
	}

	.cd-ht-left>.imgBox {
		padding-left: 10upx;
	}

	.cd-ht-left view {
		font-size: 32upx;
		font-weight: bold;
	}

	.cd-ht-right {
		color: #3660d1;
	}

	.cd-headerTitle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #f5f6f8;
		padding: 30upx;
	}

	.cd-h-searchBox {
		width: 600upx;
		height: 70upx;
		background: #f7f8fa;
		border-radius: 20px;
		display: flex;
		align-items: center;
		padding: 0 20upx;
		color: #abacb0;
	}

	.cd-header {
		padding: 30upx;
		border-bottom: 1px solid #e4e7ee;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/*资讯*/
	.community-information {
		width: 100%;
		height: 100%;
	}

	.ci-l-left {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding-right: 10upx;
	}

	.ci-l-l-time {
		font-size: 24upx;
		color: #8e8d8b;
	}

	.ci-l-l-msg {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		font-size: 24upx;
		color: #666;
	}

	.ci-l-l-title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-weight: bold;
		padding-bottom: 10upx;
	}

	.ci-listbox {
		padding: 0 30upx;
	}

	.ci-list {
		height: 220upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #f5f5f5;
		padding: 30upx 0;
	}

	.ci-l-right>.imgBox {
		border-radius: 4px;
		overflow: hidden;
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

	.community {
		width: 100%;
	}
</style>
