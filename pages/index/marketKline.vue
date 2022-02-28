<template>
	<view class="container">
		<view style="position: relative;height: 100%;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				symbol:"btcusdt",
			}
		},
		onLoad(option) {
			console.log(option.symbol)
			this.symbol = option.symbol;
			var height = 0;
			var statusHeight = plus.navigator.getStatusbarHeight();
			uni.getSystemInfo({
				//成功获取的回调函数，返回值为系统信息
				success: (sysinfo) => {
					height = sysinfo.windowHeight - statusHeight; //自行修改，自己需要的高度
				},
			})
			/*设置web-view 高度*/
			var currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
			setTimeout(function() {
				var wv = currentWebview.children()[0];
				wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
					top: statusHeight,
					height: height
				})
			}, 500)
		},
		onShow() {
		},
		methods: {
		}
	}
</script>

<style>
	page {
		background: #1e1e26;
	}

	.container {
		width: 100%;
		height: 100%;
		color: #fff;
	}
</style>
