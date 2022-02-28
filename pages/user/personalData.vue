<template>
  <view class="container">
    <nav-bar title="个人资料" bgColor="#ffffff" fontColor="#010F14"></nav-bar>

    <view class="setting-box">

      <view class="setting-list hairline--bottom" @click="getAvatar">
        <view class="label">头像</view>
        <view class="sl-right">
          <view class="img-box setting-user-Avatar">
            <image v-if="$store.state.userInfo.avatar" :src="$store.state.userInfo.avatar"></image>
            <image v-else src="../../static/image/logo1.png"></image>
            <image class="link" src="../../static/images/icon_mine_more_1@3x.png"></image>
          </view>
        </view>
      </view>

      <view class="setting-list hairline--bottom" @click="showNamePopup">
        <view class="label">昵称</view>
        <view class="img-box">
          <text class="value">点击设置昵称</text>
          <image class="link" src="../../static/images/icon_mine_more_1@3x.png"></image>
        </view>
      </view>

    </view>

    <uni-popup ref="setNamePopup" type="center">
      <view class="namePopup">
        <view class="close" @click="closeNamePopup"></view>
        <view class="title">设置昵称</view>

        <view class="inputWrap hairline--bottom">
          <uni-easyinput class="input" v-model="nickName" placeholder="请输入您的昵称且字符不超过7位" :inputBorder="false" maxlength="7" :focus="true"/>
        </view>

        <view class="confirm" @click="clickSave">确定</view>

      </view>

    </uni-popup>

  </view>
</template>

<script>
  // import {map} from 'vuex'

  export default {
    data() {
      return {
        nickName:"", //昵称
        btnFlag:true,

        url: "../../static/image/logo1.png",
        qiniuyun_token: "", //七牛云信息
      }
    },
    onShow() {
      this.getQiniuToken();
    },
    onLoad() {
      console.log(6666, JSON.stringify(this.$store.state));
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
      },




      closeNamePopup() {
        this.$refs.setNamePopup.close()
      },

      //获取七牛云token
      getQiniuToken() {
        this.$api.getQiniuToken({}, res => {
          if (res.code == 200) {
            this.qiniuyun_token = res.result;
          }
        })
      },

      showNamePopup() {
        this.$refs.setNamePopup.open()
      },

      //点击更换头像
      getAvatar() {
        let _this = this;
        uni.chooseImage({
          count: 1, //默认9
          sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], //从相册选择，和摄像头功能，默认二者都有
          success: res => {
            uni.showLoading({
              title: '上传中...'
            });
            let imgurl = res.tempFilePaths[0];

            console.log(55555555555555, res);


            uni.uploadFile({
              fileType: "image",
              url: _this.$api.apiUrl + "/api/upload/avatarApp", //华东地区用这个
              filePath: imgurl,
              name: 'image',
              formData: {
                'token': _this.$common.getStorage("user_token")
              },
              success: (result) => {
                let responseR = JSON.parse(result.data);
                console.log(responseR)
                _this.$api.uploadAvatar({
                  imageUrl: responseR.result.url
                }, res => {
                  if (res.code == 200) {
                    setTimeout(() => {
                      _this.$common.showToast("修改头像成功", "success");
                      _this.$common.getUserInfo();
                      setTimeout(() => {
                        uni.navigateBack(-1)
                      }, 1300)
                    }, 1300)
                  } else {
                    uni.hideLoading()
                  }
                })
                // callback(qiniuUrl+JSON.parse(uploadFileRes.data).key);
              },
              fail: (error) => {
                if (error && error.response) {
                  showError(error.response);
                }
              },
              complete: () => {
                setTimeout(function() {
                  uni.hideLoading();
                }, 250);
              },
            });
          }
        });
      },
      // 设置成用户头像
      setUserAvatar() {
        let _this = this;
        uni.showLoading({
          title: "loading..."
        })
        _this.$api.uploadAvatar({
          imageUrl: imgurl
        }, res => {
          if (res.code == 200) {
            setTimeout(() => {
              _this.$common.showToast("修改头像成功", "success")
              _this.$common.getUserInfo();
            }, 1500)
          } else {
            uni.hideLoading()
          }
        })
      },
      //跳转
      skip(val) {
        this.$common.skipTo(val)
      }
    }
  }
</script>

<style scoped lang="scss">
  .namePopup {
    width: 588rpx;
    height: 416rpx;
    background: #ffffff;
    border-radius: 30rpx;

    padding: 48rpx 68rpx 0 68rpx;
    position: relative;

    .close {
      width: 40rpx;
      height: 40rpx;
      position: absolute;
      right: 40rpx;
      top: 55rpx;
      background: url(../../static/images/icon_tc_qc@3x.png) no-repeat;
      background-size: contain;
    }

    .title {
      font-size: 36rpx;
      font-weight: bold;
      text-align: center;
      color: #37383b;
      line-height: 50rpx;
      margin-bottom: 32rpx;
    }

    .inputWrap {
      height: 112rpx;
      padding-left: 8rpx;
      .uni-input-input {
        font-size: 28rpx !important;
      }
      .input {
        font-size: 28rpx;
      }
    }

    .confirm {
      width: 100%;
      height: 76rpx;
      background: linear-gradient(135deg, #5470ff, #4160fb);
      border-radius: 8rpx;

      font-size: 26rpx;
      font-weight: bold;
      text-align: center;
      color: #ffffff;
      line-height: 76rpx;
      margin-top: 49rpx;
      &:active {
        opacity: 0.9;
      }
    }
  }



  .setting-user-Avatar image {
    width: 80upx;
    height: 80upx;
    border-radius: 50%;
  }

  .sl-right {
    display: flex;
    align-items: center;
  }



  .setting-list {
    height: 128rpx;
    // padding: 36upx 0;
    // border-bottom: 1px solid #F0F0F0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label {
      font-size: 30rpx;
      font-weight: bold;
      text-align: left;
      color: #37383b;
    }

    .value {
      font-size: 30rpx;
      text-align: right;
      color: #9ea0a8;
      line-height: 42rpx;
    }

    .link {
      width: 32rpx;
      height: 32rpx;
      margin-left: 16rpx;
    }
  }

  .setting-box {
    background: #fff;
    padding: 0 30upx;
  }

  page {
    background: #FFFFFF;
  }

  .container {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
</style>
