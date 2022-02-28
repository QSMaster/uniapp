<template>
	<view class="container">
		<image :src="css.img" :class="css.blur" mode="aspectFill" v-if="css.img"></image>
		<view :class="css.blur" v-else></view>
	</view>
</template>

<script>
	export default {
		props: {
			blurs: {
				type: String,
				default () {
					return ""
				}
			},
			imgUrl: {
				type: String,
				default () {
					return ""
				}
			}
		},
		computed: {
			css() {
				let blur = this.blurs || 'm'
				let img = this.imgUrl || ''
				return {
					blur,
					img
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;

		> view {
			background-color: rgba(255, 255, 255, 0.6);
		}

		>image,
		>view {
			position: absolute;
			z-index: 1;
			box-sizing: content-box;
			width: 120%;
			height: 120%;

			&.xs {
				padding: 10px;
				left: -20px;
				top: -20px;
				filter: blur(5px);
			}

			&.s {
				padding: 15px;
				left: -30px;
				top: -30px;
				filter: blur(10px);
			}

			&.m {
				padding: 20px;
				left: -20px;
				top: -20px;
				filter: blur(15px);
			}

			&.l {
				padding: 30px;
				left: -30px;
				top: -30px;
				filter: blur(25px);
			}

			&.xl {
				padding: 40px;
				left: -80px;
				top: -80px;
				filter: blur(35px);
			}
		}
	}
</style>
