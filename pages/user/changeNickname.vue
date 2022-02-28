<template>
	<view class="container">
		<nav-bar title="修改昵称" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="tb-box">
			<view class="mm-b-input">
				<view class="mm-b-i-title">昵称</view>
				<view class="mm-b-i-input">
					<view class="mm-b-i-i-box" style="width: 100%;">
						<input type="text" v-model="nickName" placeholder="请输入修改昵称" placeholder-class="mm-place" />
					</view>
				</view>
			</view>
			<view class="tb-btn">
				<view @click="clickSave">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName:"", //昵称
				btnFlag:true,
			}
		},
		methods: {
			//点击保存
			clickSave(){
				if(this.nickName==""){
					this.$common.showToast("请输入要修改的昵称");
				}else{
					this.changeUserNickname();
				}
			},
			//修改昵称
			changeUserNickname(){
				let _this=this;
				if(this.btnFlag){
					this.btnFlag = false;
					uni.showLoading({
						title:"loading..."
					})
					this.$api.changeUserNickname({
						nickName:_this.nickName
					},res=>{
						if(res.code==200){
							setTimeout(()=>{
								_this.$common.showToast("修改成功","success")
								setTimeout(()=>{
									uni.navigateBack(-1)
								},1300)
							},1500)
						}else{
							uni.hideLoading()
						}
						_this.btnFlag = true;
					})
				}
			}
		}
	}
</script>

<style scoped>
	.tb-btn{
		padding-top: 100upx;
	}
	.tb-btn>view{
		width: 100%;
		height: 90upx;
		background: #0278FF;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		box-shadow: 1px 3px 4px #b1b1b1;
	}
	.mm-place {
		font-size: 26upx;
		color: #969696;
	}
	.mm-b-i-i-box {
		width: 600upx;
	}

	.mm-b-i-i-box>input {
		height: 96upx;
	}

	.mm-b-i-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #F0F0F0;
	}
	.mm-b-i-title {
		padding-top: 30upx;
	}
	.tb-box {
		padding: 30upx;
	}
	.container{
		width: 100%;
		height: 100%;
	}
</style>
