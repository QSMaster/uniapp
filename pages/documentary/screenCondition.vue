<template>
	<view class="container">
		<nav-bar title="筛选条件" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="condition-box">
			<view class="condition-title">风格</view>
			<view class="condition-list">
				<view v-for="(item,index) in styleArray" :key="index">
					<view class="cl-list" :class="{'active':styleType==item}" @click="styleType=item">{{item}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 100upx;"></view>
		<view class="condition-box" style="padding-top: 50upx;">
			<view class="condition-title">累计收益率</view>
			<view class="condition-list">
				<view v-for="(item,index) in rateArray" :key="index">
					<view class="cl-list" :class="{'active':rateType==item}" @click="rateType=item">{{item}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 100upx;"></view>
		<view class="condition-box">
			<view class="condition-title">近3周最大回撤</view>
			<view class="condition-list">
				<view v-for="(item,index) in retreatArray" :key="index">
					<view class="cl-list" :class="{'active':retreatType==item}" @click="retreatType=item">{{item}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 100upx;"></view>
		<view class="condition-box">
			<view class="condition-title">交易天数</view>
			<view class="condition-list">
				<view v-for="(item,index) in daysArray" :key="index">
					<view class="cl-list" :class="{'active':daysType==item}" @click="daysType=item">{{item}}</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 200upx;"></view>
		<view class="screenBtn">
			<view>确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				styleArray:["不限","短线","重仓","长线","稳健","高风险","轻仓","中线","激进","主流","高频","低频"],
				styleType:"不限", //当前风格
				rateArray:["不限","≤20%","20% - 60%","≥60%"],
				rateType:"不限", //累计收益率
				retreatArray:["不限","≤3%","3% - 10%","≥10%"],
				retreatType:"不限", //近3周最大回撤
				daysArray:["不限","≤30","30 - 60","60 - 180"],
				daysType:"不限", //交易天数
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style scoped>
	*{
		font-size: 28upx;
	}
	.screenBtn{
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
	.screenBtn>view{
		width: 100%;
		height: 90upx;
		background: #3d6ff2;
		color: #fff;
		text-align: center;
		line-height: 90upx;
		border-radius: 4px;
	}
	.condition-list{
		clear: both;
	}
	.condition-list .active{
		background: #f3f6ff;
		color: #3563da;
	}
	.condition-list>view{
		width: 25%;
		float: left;
		padding: 10upx 0;
	}
	.cl-list{
		width: 90%;
		height: 66upx;
		line-height: 66upx;
		text-align: center;
		font-size: 24upx;
		background: #f8f8f8;
		border-radius: 2px;
		color: #838794;
		float: left;
	}
	.condition-title{
		font-size: 32upx;
		padding-bottom: 20upx;
	}
	.condition-box{
		padding: 30upx;
		clear: both;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
