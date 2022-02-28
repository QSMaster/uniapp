<template>
	<view class="container">
		<nav-bar :title="isBind==0?'绑定手机号/邮箱':'解绑手机号/邮箱'" bgColor="#0278FF" fontColor="#ffffff"></nav-bar>
		<view class="tb-box">

			<view class="mm-b-input">
				<view class="mm-b-i-title">手机号/邮箱</view>
				<view class="mm-b-i-input">
					<view class="mm-b-i-i-box" style="width: 100%;">
						<input v-if="isBind==0" type="text" v-model="user_phone" placeholder="请输入绑定的手机或邮箱" placeholder-class="mm-place" />
						<input v-if="isBind==1" disabled type="text" v-model="user_phone" placeholder="请输入绑定的手机或邮箱" placeholder-class="mm-place" />
					</view>
				</view>
			</view>

			<view class="mm-b-input">
				<view class="mm-b-i-title">验证码</view>
				<view class="mm-b-i-input">
					<view class="mm-b-i-i-box" style="width: 500upx;">
						<input type="text" v-model="user_code" placeholder="请输入验证码" placeholder-class="mm-place" />
					</view>
					<view>
						<view class="ril-getCode" :class="$store.state.sendCodeInfo.className" @click="getCodeClick">
							{{$store.state.sendCodeInfo.title}}</view>
					</view>
				</view>
			</view>


			<view class="tb-btn">
				<view @click="clickOk">{{isBind==0?"确认":"解除绑定"}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_phone:"", //手机号/邮箱
				user_code:"", //验证码
				isBind:0, //0 没有绑定  1绑定了
				code_type:1, // 1 解绑  2绑定
			}
		},
		onLoad() {
			if(this.$store.state.userInfo.phone=="" || !this.$store.state.userInfo.phone){
				//没有绑定
				this.code_type = 2;
				this.isBind = 0;
			}else{
				//绑定了
				this.code_type = 1;
				this.isBind = 1;
				this.user_phone = this.$store.state.userInfo.phone;
			}
		},
		methods: {
			//点击确认
			clickOk(){
				let _this=this;
				if(this.user_phone==""){
					this.$common.showToast("请输入手机号或邮箱")
				}else if(this.user_code==""){
					this.$common.showToast("请输入验证码")
				}else{
					if(this.isBind==0){
						_this.bindPhoneOrEmail()
					}else{
						_this.unbindPhoneOrEmail();
					}
				}
			},
			//解绑手机号/邮箱
			unbindPhoneOrEmail(){
				let _this = this;
				if (this.$store.state.BtnFlag) {
					this.$store.state.BtnFlag = false;
					uni.showLoading({
						title: "loading..."
					})
					this.$api.unbindPhoneOrEmail({
						phone: _this.user_phone,
						checkCode: _this.user_code,
					}, res => {
						if (res.code == 200) {
							_this.$common.getUserInfo();
							setTimeout(() => {
								_this.$common.showToast("解绑成功", "success")
								setTimeout(() => {
									uni.navigateBack(-1)
								}, 1300)
							}, 1300)
						} else {
							uni.hideLoading()
						}
						_this.$store.state.BtnFlag = true;
					})
				}
			},
			//绑定手机号/邮箱
			bindPhoneOrEmail(){
				let _this = this;
				if (this.$store.state.BtnFlag) {
					this.$store.state.BtnFlag = false;
					uni.showLoading({
						title: "loading..."
					})
					this.$api.bindUserPhone({
						phone: _this.user_phone,
						checkCode: _this.user_code,
					}, res => {
						if (res.code == 200) {
							_this.$common.getUserInfo();
							setTimeout(() => {
								_this.$common.showToast("绑定成功", "success")
								setTimeout(() => {
									uni.navigateBack(-1)
								}, 1300)
							}, 1300)
						} else {
							uni.hideLoading()
						}
						_this.$store.state.BtnFlag = true;
					})
				}
			},
			// 点击获取验证码
			getCodeClick() {
				let _this=this;
				if(this.$store.state.BtnFlag){
					this.$store.state.BtnFlag = false;
					uni.showLoading({ 
						title: "loading..."
					})
					this.$api.sendSms({
						type:_this.code_type,
						phone: _this.user_phone
					}, res => {
						if (res.code == 200) {
							setTimeout(() => {
								_this.$common.showToast("发送成功", "success")
								setTimeout(() => {
									_this.$store.commit("countDown")
								}, 1300)
							}, 1300)
						} else {
							uni.hideLoading()
						}
						_this.$store.state.BtnFlag = true;
					})
				}
			},

		}
	}
</script>

<style scoped>
	.waitecode {
		color: #949393 !important;
		font-size: 26upx;
	}

	.ril-getCode {
		color: #0278FF;
		font-size: 26upx;
	}

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
