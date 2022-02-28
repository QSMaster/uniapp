<template>
	<view class="container">
		<nav-bar title="修改支付密码" bgColor="#ffffff" fontColor="#010F14"></nav-bar>

		<view class="tb-box">
			<view class="mm-b-input">
				<view class="mm-b-i-title">手机验证码：</view>
				<view class="mm-b-i-input hairline--bottom">
					<view class="mm-b-i-i-box" style="width: 500upx;">
						<uni-easyinput type="text" :inputBorder="false" v-model="pay_code" placeholder="请输入手机验证码" placeholder-class="mm-place" maxlength="6"/>
					</view>
					<view>
						<view class="ril-getCode" :class="$store.state.sendCodeInfo.className" @click="getCodeClick">
							{{$store.state.sendCodeInfo.title}}</view>
					</view>
				</view>
			</view>
			<view class="mm-b-input">
				<view class="mm-b-i-title">支付密码：</view>
				<view class="mm-b-i-input hairline--bottom">
					<view class="mm-b-i-i-box" style="width: 100%;">
						<uni-easyinput type="password" :inputBorder="false" v-model="pay_password" placeholder="请输入支付密码" placeholder-class="mm-place" maxlength="12"/>
					</view>
				</view>
			</view>
			<view class="mm-b-input">
				<view class="mm-b-i-title">确认支付密码：</view>
				<view class="mm-b-i-input hairline--bottom">
					<view class="mm-b-i-i-box" style="width: 100%;">
						<uni-easyinput type="password" :inputBorder="false" v-model="pay_passwordAg" placeholder="请再次输入支付密码" placeholder-class="mm-place" maxlength="12"/>
					</view>
				</view>
			</view>

			<view class="tb-btn">
				<view @click="clickOk">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
  import {
    mapState
  } from 'vuex';

	export default {
		data() {
			return {
				pay_code:"", //验证码
				pay_password:"", //登录密码
				pay_passwordAg:"", //确认密码
				btnFlag:true,
			}
		},
    computed:{
      ...mapState(['userInfo'])
    },
		onLoad() {

		},
		methods: {
			//点击确认
			clickOk(){
				//验证密码正则
				let password_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
				if(this.$store.state.userInfo.phone=="" || !this.$store.state.userInfo.phone){
					this.$common.showToast("请先绑定手机号")
				}else if(this.pay_code==""){
					this.$common.showToast("请输入验证码")
				}else if(this.pay_password==""){
					this.$common.showToast("请输入密码")
				}else if (!password_reg.test(this.pay_password)) {
					this.$common.showToast("支付密码由6-12位字母+数字组成")
				} else if(this.pay_password!=this.pay_passwordAg){
					this.$common.showToast("请确认密码")
				}else{
					this.changePayPassword();
				}
			},
			//修改登录密码
			changePayPassword(){
				let _this = this;
        console.log(' _this.pay_code',  _this.pay_code);
        console.log(' _this.pay_password',  _this.pay_password);

        // return false

				if (this.btnFlag) {
					this.btnFlag = false;
					uni.showLoading({
						title: "loading..."
					})



					this.$api.changePayPassword({
						checkCode: _this.pay_code,
						payPassword: _this.pay_password,
					}, res => {
						if (res.code == 200) {
							setTimeout(() => {
								_this.$common.showToast("修改成功", "success")
								setTimeout(() => {
									uni.navigateBack(-1)
								}, 1300)
							}, 1300)
						} else {
							uni.hideLoading()
						}
						_this.btnFlag = true;
					})
				}
			},
			// 点击获取验证码
			getCodeClick() {
				let _this=this;
				if(this.btnFlag){
					this.btnFlag = false;
					uni.showLoading({
						title: "loading..."
					})
					this.$api.sendSms({
						type:1,
						phone: _this.$store.state.phone
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
						_this.btnFlag = true;
					})
				}
			},

		}
	}
</script>


<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .waitecode {
    color: #949393 !important;
    font-size: 26upx;
  }

  .ril-getCode {
    width: 172rpx;
    height: 64rpx;
    opacity: 1;
    background: rgba(65, 96, 251, 0.15);
    border-radius: 8rpx;
    font-size: 28rpx;
    font-weight: bold;
    text-align: center;
    color: #4160fb;
    line-height: 64rpx;
    margin-left: 20rpx;
    &.waitecode {
      background: #cbcdd2;
      color: #ffffff;
    }
  }

  .tb-btn {
    padding-top: 72rpx;

    >view {
      height: 96rpx;
      background: #4160fb;
      border-radius: 12rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #ffffff;
      line-height: 96rpx;
      text-align: center;
    }
  }

  .mm-place {
    font-size: 26upx;
    color: #969696;
  }

  .mm-b-i-i-box {
    height: 112rpx;
    display: flex;
    align-items: center;
    flex: 1;
  }



  .mm-b-i-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px solid #F0F0F0;
  }

  .mm-b-i-title {
    font-size: 28rpx;
    font-weight: bold;
    text-align: left;
    color: #37383b;
    line-height: 40rpx;
    margin-top: 24rpx;
    margin-bottom: 4rpx;

  }

  .tb-box {
    padding: 0 30rpx;

    .input {
      font-size: 28rpx;
    }
  }
</style>
