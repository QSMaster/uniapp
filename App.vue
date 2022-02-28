<script>
  import {
    mapState
  } from 'vuex';

  export default {
    onLaunch() {
      this.$store.dispatch('getHotUpload')
      this.$store.dispatch('getExchangeList')
      this.$store.dispatch('saveUserAsset')
      this.$store.dispatch('setUserInfo')

      // 页面预加载
      uni.preloadPage({url: "/pages/user"});
      uni.preloadPage({url: "/pages/user/rankingList"});
      uni.preloadPage({url: "/pages/trade"});
      uni.preloadPage({url: "/pages/journal"});

      //判断用户使用什么手机
      if (uni.getSystemInfoSync().platform == "ios") {
        this.$store.state.platformType = 2;
      } else if (uni.getSystemInfoSync().platform == "android") {
        this.$store.state.platformType = 1;
      }
    },
    methods: {
      // 交易所列表
      bourselist() {
        this.$api.bourselist({}, res => {
          this.$store.state.bourseArray = res.result;
        });
      },
    }
  }
</script>

<style>
  @import url("./styles/index.scss");

  /*每个页面公共css */
  >>>#scrollContainer {
    z-index: 99 !important;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 30upx;
  }

  uni-page-body {
    height: 100%;
  }

  page {
    height: 100%;
  }

  >>>.zp-loading-more-text-black span {
    font-size: 24upx;
  }

  .img-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  >>>.uni-popup {
    z-index: 100 !important;
  }

  .btnStyle {
    width: 100%;
    height: 90upx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 3px;
    background: #0278FF;
  }

  /*发送验证码延时*/
  .waitecode {
    color: #ffffff;
    background: #cbcdd2;
  }

  .ril-getCode {
    color: #0278FF;
  }

  /*button样式*/
  button::after {
    border: none;
    outline: none;
  }

  /*弹性盒子*/
  .box {
    display: flex;
  }

  /*字体样式*/
  .font12 {
    font-size: 24upx !important;
  }

  .font16 {
    font-size: 32upx !important;
  }

  .fontWeight {
    font-weight: bold !important;
  }

  .colorGrey {
    color: #a1a3ab;
  }
</style>
