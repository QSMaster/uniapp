<template>
	<view class="container">
		<nav-bar title="公告" backState="1000" bgColor="#FFFFFF" fontColor="#010F14" shadow></nav-bar>

    <view class="main">
      <z-paging ref="paging" @query="queryList" :list.sync="noticeData">
      	<view class="im-box">
      		<view class="im-list" :class="{'hairline--top': index !== 0}" v-for="(item, index) in noticeData" :key="index" @click="noticeDetails(item)">
      			<view class="im-list-left">
      				<view class="im-l-l-title">{{item.title}}</view>
      				<view class="im-l-l-time">{{item.createTime}}</view>
      			</view>
      		</view>
      	</view>
      </z-paging>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeData: []
			};
		},
		onLoad() {
		},
		methods: {
			queryList(pageNo, pageSize) {
				this.$api.noticeList({
					pageNum: pageNo,
					pageSize: pageSize,
				}, res => {
					this.$refs.paging.complete(res.result.list);
				})
			},
			//查看公告详情
			noticeDetails(val) {
				this.$common.skipTo('/pages/index/noticeDetails?id='+val.id);
			}
		}
	};
</script>

<style lang="less" scoped>

	.container {
		width: 100%;
		height: 100%;
    display: flex;
    flex-direction: column;
    .main {
      flex: 1;
      overflow: hidden;
      margin-top: 24rpx;
    }

		.im-list-left {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-right: 30upx;
		}

		.im-l-l-title {
			font-size: 32rpx;
			font-weight: bold;
			text-align: left;
			color: #37383b;
			line-height: 48rpx;
		}

		.im-l-l-time {
			font-size: 28rpx;
			font-family: DIN-Regular;
			font-weight: 400;
			text-align: left;
			color: #9ea0a8;
			line-height: 34rpx;
      margin-top: 20rpx;
		}

		.im-list {
			display: flex;
			justify-content: space-between;
			padding: 50upx 0;
      // background-color: #FFFFFF;
			// border-bottom: 1px solid #f0f0f0;
		}

		.im-box {
			padding:0 40rpx;
      background-color: #FFFFFF;
		}
	}
</style>
