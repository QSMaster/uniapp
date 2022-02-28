<template>
	<view class="container">
		<nav-bar title="详情" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="information-box">
			<view class="ib-topTitle">{{infosData.title}}</view>
			<view class="ib-time">{{infosData.createTime}}</view>

			<view class="content" v-html="infosData.content"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			infosData:"",
		};
	},
	onLoad(options) {
		this.detailt(options.id)
	},
	methods: {
		detailt(id) {
			this.$api.detailt({
				id:id
			}, res => {
				this.infosData = res.result;
			});
		}
	}
};
</script>

<style scoped>
.content {
	padding: 30upx;
}
.ib-topTitle {
	font-size: 36upx;
	font-weight: 600;
}
.ib-time {
	font-size: 28upx;
	padding: 20upx 0;
}
.information-box {
	padding: 40upx 30upx;
}
.container {
	width: 100%;
	height: 100%;
}
</style>
