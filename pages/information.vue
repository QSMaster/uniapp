<template>
	<view class="container">
		<nav-bar title="资讯" backState="2000" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view style="width: 100%;height: calc(100% - 138upx);">
			<z-paging ref="paging" @query="queryList" :list.sync="dataList" :auto-clean-list-when-reload="false" :auto-show-back-to-top="true">
				<view class="ci-listbox">
					<view class="ci-list" v-for="(item,index) in dataList" :key="index" @click="showDetails(item.id)">
						<view class="ci-l-left">
							<view class="im-l-l-title">{{ item.title }}</view>
							<view class="im-l-l-time">{{ item.updateTime }}</view>
						</view>
						<view class="ci-l-right">
							<view class="imgBox">
								<image :src="item.image" style="width: 224upx;height: 160upx;border-radius: 4px;"></image>
							</view>
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
				dataList:[]	
			}
		},
		onShow() {
			setTimeout(()=>{
				this.$refs.paging.reload()
			},200)
		},
		methods: {
			//点击查看详情
			showDetails(val){
				this.$common.skipTo('/pages/information/informationDetails?id=' + val);
			},
			//获取日志
			queryList(pageNo,pageSize) {
				this.$api.newsList({
					pageNum: pageNo,
					pageSize: pageSize,
				}, res => {
					this.$refs.paging.complete(res.result.list);
				})
			}
		}
	};
</script>

<style>
	.ci-l-right>.imgBox {
		border-radius: 4px;
		overflow: hidden;
	}
	.im-l-l-time {
		font-size: 24upx;
		color: #929aa6;
	}
	.im-l-l-title {
		font-size: 30upx;
	}
	/* >>>.z-paging-content-fixed {
		top: 138upx;
	} */
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

	.container {
		width: 100%;
		height: 100%;
	}
</style>
