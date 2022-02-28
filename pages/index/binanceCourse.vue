<template>
	<view class="container">
		<nav-bar title="教程" backState="1000" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="information-box">
			<view class="ib-topTitle">马特量化机器人绑定{{bourseId==1?"火币":"币安"}}流程</view>
			<view class="ib-text">
				<view v-html="bourseId==1?contentHuobi:contentBian"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bourseId: "", //交易所id 1火币  2币安 3Gx
				contentHuobi: '<p><img src=\"http://cdn.slkjtop.com/a3fa4c14-0b9c-4dee-8678-a149b04f87b1.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/a40e0b36-4e94-4b34-8e68-846f4476a264.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/dceee115-fb0b-4518-b435-196a946e6903.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/66219eeb-773a-4b5e-8445-fd12f2dc6dfc.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/d8d814cb-0dbd-4341-a5df-bbe33e24ac64.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/4455743d-fd04-4ef5-9812-35c3381a1061.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/1985db2d-3b9f-4d44-983b-109e9bc47060.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/dc2a99a3-2b97-4f9f-84bd-e3d3813e2520.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/00f2ef77-ed7b-412c-af1c-475b45cda8a9.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/f8759929-4916-49f7-943f-fe8c7213193f.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/0d680184-9be2-4356-a09f-530b9fb583f4.png\" style=\"max-width:100%;\"/></p>',
				contentBian: '<p><img src=\"http://cdn.slkjtop.com/33147790-dbf7-4676-88a8-bc74b7068d19.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/b054f5b1-e3b0-4666-9e80-d362d9aeeaa8.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/6f4dd2bf-98b6-44d6-9409-7d4888cb5c83.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/cff91a1a-e7d9-4275-8e60-86571b899925.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/80cbff61-a1c1-4140-8a1e-e599a523fbd7.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/3ef26d92-8a12-49e4-b2e4-6657c915ea11.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/1899a0db-3d96-48ee-a5c1-88ec87506fd0.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/3833fda1-06b8-4c6a-a24a-dff670b6aba6.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/03caf1b7-68e6-4855-a77a-923539eb519f.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/6d492de8-5292-4e78-bd61-72b5d88637a4.png\" style=\"max-width:100%;\"/><img src=\"http://cdn.slkjtop.com/6c537bb2-d7de-4f20-8e4b-17206b86ee00.png\" style=\"max-width:100%;\"/></p>'
			};
		},
		onLoad(option) {
			this.bourseId = option.id;
		},
		methods: {}
	};
</script>

<style lang="less" scoped>
	uni-page-body {
		height: 100%;
		font-size: 14px;
		line-height: 1.8;
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
		// background: #ffffff;
	}

	.ib-text {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 48upx;
		color: #909399;
		opacity: 1;
	}

	.container {
		width: 100%;
		height: 100%;
		background: #ffffff;
		// background: #f0f0f0;
	}
</style>
