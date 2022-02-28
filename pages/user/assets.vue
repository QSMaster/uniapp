<template>
  <view class="container">
    <!--  <nav-bar ref="navBar" :scrollTop="scrollTop" transparentFixedFontColor="#ffffff" bgColor="#0278FF" fontColor="#fff"
      type="transparentFixed" title="明细">
      <view class="preview" slot="right" @click="clickShai">
				<view class="img-box" style="padding-right: 30upx;">
					<image src="../../static/image/index/shaixuan.png" style="width: 36upx;height: 36upx;"></image>
				</view>
			</view>
    </nav-bar>
    -->

    <nav-bar title="明细" bgColor="#FFFFFF" fontColor="#010F14" :shadow="false"></nav-bar>




    <!-- 赛选 -->
    <view class="filter">
      <view class="filter_item" :class="{active: activeIndex=== item.id}" v-for="item in tabs" :key="item.key"
        @click="handleFilter(item)">
        {{item.text}}
      </view>
    </view>


    <view class="all-box">
      <z-paging ref="paging" :auto-height="true" @query="queryList" :list.sync="dataList"
        :auto-clean-list-when-reload="false">

        <view>
          <view class="assets-record-box">
            <view class="arb-list hairline--bottom" v-for="(item,index) in dataList" :key="index">

              <view class="top">
                <view class="description">{{item.flowTypeId | flowType}}</view>
                <view class="status">{{item.flowTypeId | status}}</view>
              </view>


              <view class="bottom">
                <view class="block">
                  <view class="label">数量</view>
                  <view class="value" v-if="item.flowTypeId === 4">{{item.amount/codePrice}}张</view>
                  <view class="value" v-else>{{(item.stat === false && item.amount != 0)?"-":""}}{{item.amount}}</view>
                </view>

                <view class="block" v-show="item.flowTypeId !== 4">
                  <view class="label">币种</view>
                  <view class="value">USDT</view>
                </view>

                <view class="block">
                  <view class="label">时间</view>
                  <view class="value">{{item.createTime}}</view>
                </view>

              </view>


              <!-- <view class="arb-list-title">
                <view>数量</view>
                <view>类型</view>
                <view>时间</view>
              </view>
              <view class="arb-list-number">
                <view style="font-size: 24upx;">{{item.stat==0?"-":""}}{{item.amount}}</view>
                <view style="font-size: 24upx;">{{item.flowType}}</view>
                <view style="font-size: 24upx;">{{item.createTime}}</view>
              </view> -->

            </view>
          </view>
        </view>
      </z-paging>
    </view>
    <!-- 筛选弹窗 -->
    <uni-popup ref="typePoupup" type="bottom">
      <view class="popupbox">
        <view class="as-pb-top">
          <view class="as-p-t-cancel" @click="popCancel">取消</view>
          <view class="as-p-t-ok" @click="clickOk">确定</view>
        </view>
        <view style="width: 100%;height: 720upx;">
          <scroll-view scroll-y style="width: 100%;height: 100%;">
            <view class="types-list" v-for="(item,index) in typeArray" :key="index"
              :class="{'typeActive':chooseType==item.id}" @click="chooseType=item.id">{{item.name}}</view>
          </scroll-view>
        </view>
      </view>
    </uni-popup>

    <!-- 详情弹窗 -->
    <uni-popup ref="detailPoupup" type="center">
      <view class="dp-box">
        <view class="dp-b-top">明细详情</view>
        <view class="dp-b-center">
          <view class="dp-b-c-list">
            <view class="dp-b-c-l-title">时间：</view>
            <view class="dp-b-c-l-title2">{{showInfos.createTime}}</view>
          </view>
          <view class="dp-b-c-list">
            <view class="dp-b-c-l-title">数量：</view>
            <view class="dp-b-c-l-title2">{{showInfos.stat==0?"-":""}}{{showInfos.amount}}</view>
          </view>
          <view class="dp-b-c-list">
            <view class="dp-b-c-l-title">类型：</view>
            <view class="dp-b-c-l-title2">{{showInfos.flowType}}</view>
          </view>
          <view class="dp-b-c-list">
            <view class="dp-b-c-l-title">描述：</view>
            <view class="dp-b-c-l-title2">{{showInfos.describe}}</view>
          </view>
        </view>
        <view class="dp-close-do-btn" v-if="showInfos.flowTypeId==2 && !showInfos.isAccount">
          <view style="color: #666;border-right: 1px solid #f0f0f0;" @click="cancelTibi">撤销</view>
          <view @click="closeDetails">我知道了</view>
        </view>
        <view class="dp-close-btn" v-else @click="closeDetails">我知道了</view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';

  export default {
    data() {
      return {
        activeIndex: null,

        tabs: [{
            key: 1,
            id: null,
            text: '全部'
          },
          {
            key: 2,
            id: 1,
            text: '充值'
          },
          {
            key: 3,
            id: 2,
            text: '提现'
          },
          {
            key: 4,
            id: 3,
            text: '互转'
          },
          {
            key: 5,
            id: 4,
            text: '购买激活码'
          },
          {
            key: 6,
            id: 5,
            text: '推荐奖'
          },
          {
            key: 7,
            id: 7,
            text: '团队奖'
          },
          {
            key: 8,
            id: 8,
            text: '保证金扣除'
          }
        ],

        scrollTop: 0,
        typeArray: "", //类型
        chooseType: "", //选中的
        assetsInfo: "", //用户资产信息
        dataList: [], //资产流水
        nowType: "", //当前类型
        showInfos: "", //要查看的信息
      }
    },
    computed: {
      ...mapState({
        codePrice: state => state.sysConfig.codePrice
      })
    },
    onLoad() {
      this.$common.sysConfig();
      this.flowTypeList();
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onShow() {
      if (this.$store.state.assetsInfo) {
        this.assetsInfo = this.$store.state.assetsInfo;
      }
      this.userAssetInfo();
      setTimeout(() => {
        this.$refs.paging.reload()
      }, 200)
    },
    filters: {
      flowType(type) {
        let str = ''
        switch (Number(type)) {
          case 1:
            str = '充值'
            break;
          case 2:
            str = '提现'
            break;
          case 3:
            str = '互转'
            break;
          case 4:
            str = '购买激活码'
            break;
          case 5:
            str = '推荐奖'
            break;
          case 6:
            str = '推荐奖'
            break;
          case 7:
            str = '团队奖'
            break;
          case 8:
            str = '保证金扣除'
            break;
          default:
            break;
        }
        return str
      },
      status(status) {
        let str = ''
        switch (Number(status)) {
          case 1:
            str = '充值成功'
            break;
          case 2:
            str = '提现成功'
            break;
          case 3:
            str = '互转成功'
            break;
          case 4:
            str = '已发放'
            break;
          case 5:
            str = '已发放'
            break;
          case 6:
            str = '已发放'
            break;
          case 7:
            str = '已发放'
            break;
          case 8:
            str = '已扣除'
            break;
          default:
            break;
        }
        return str
      }
    },
    methods: {
      // 赛选
      handleFilter(item) {
        this.activeIndex = item.id

        this.nowType = item.id || "";
        this.$refs.paging.reload();
      },

      //点击撤销提币
      cancelTibi() {
        this.$refs.detailPoupup.close();
        let _this = this;
        uni.showModal({
          title: "温馨提示",
          content: "是否撤销该笔提币？",
          showCancel: true,
          cancelText: '取消',
          confirmText: '确认',
          success: res => {
            if (res.confirm) {
              _this.backOutTibi();
            }
          }
        })
      },
      //撤销提币
      backOutTibi() {
        let _this = this;
        if (this.$store.state.BtnFlag) {
          this.$store.state.BtnFlag = false;
          uni.showLoading({
            title: "loading..."
          })
          this.$api.backOutTibi({
            id: _this.showInfos.id,
          }, res => {
            if (res.code == 200) {
              setTimeout(() => {
                _this.$common.showToast("撤销成功", "success")
                setTimeout(() => {
                  _this.$refs.paging.reload();
                  _this.userAssetInfo();
                }, 1300)
              }, 1300)
            } else {
              uni.hideLoading()
            }
            _this.$store.state.BtnFlag = true;
          })
        }
      },
      //点击关闭详情
      closeDetails() {
        this.$refs.detailPoupup.close();
      },
      //点击查看详情
      showDetails(item) {
        this.showInfos = item;
        this.$refs.detailPoupup.open();
      },
      //点击确定按钮进行筛选
      clickOk() {
        this.nowType = this.chooseType;
        this.$refs.typePoupup.close();
        this.$refs.paging.reload();
      },
      //加载更多
      queryList(pageNo, pageSize) {
        this.$api.flowAssetsList({
          flowTypeId: this.nowType,
          pageNum: pageNo,
          pageSize: pageSize,
        }, res => {
          this.$refs.paging.complete(res.result.list);
        })
      },
      //流水类型
      flowTypeList() {
        this.$api.flowTypeList({}, res => {
          this.typeArray = res.result;
        })
      },
      //用户资产
      userAssetInfo() {
        this.$api.userAssetInfo({}, res => {
          this.assetsInfo = res.result;
          this.$store.state.assetsInfo = res.result;
        })
      },
      //跳转
      skip(val) {
        this.$common.skipTo(val)
      },
      //点击取消
      popCancel() {
        this.$refs.typePoupup.close();
      },
      //点击筛选按钮
      clickShai() {
        this.$refs.typePoupup.open();
        this.chooseType = this.nowType;
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fafafd;
    .all-box {
      flex: 1;
      overflow: hidden;
      background-color: #FFFFFF;
      margin-top: 24rpx;
    }
  }


  .filter {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 32rpx 30rpx;
    background-color: #FFFFFF;

    &_item {
      min-width: 148rpx;
      height: 64rpx;
      background: #ffffff;
      border: 2rpx solid #f3f3f3;
      border-radius: 14rpx;
      font-size: 28rpx;
      font-weight: bold;
      color: #5e6066;
      line-height: 64rpx;
      padding: 0 12rpx;
      text-align: center;
      margin-top: 20rpx;
      margin-right: 20rpx;

      &.active {
        background-color: #4160FB;
        color: #fff;
      }
    }
  }



  .dp-close-do-btn {
    width: 100%;
    height: 90upx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #f0f0f0;
    color: #007AFF;
    display: flex;
  }

  .dp-close-do-btn>view {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dp-close-btn {
    width: 100%;
    height: 90upx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #f0f0f0;
    color: #007AFF;
  }

  .dp-b-c-l-title2 {
    font-size: 28upx;
    padding-bottom: 20upx;
    padding-left: 20upx;
    color: #666;
  }

  .dp-b-c-l-title {
    font-size: 28upx;
    padding-bottom: 20upx;
  }

  .dp-b-c-list {}

  .dp-b-center {
    padding: 30upx;
  }

  .dp-box {
    background: #fff;
    width: 600upx;
    border-radius: 3px;
    overflow: hidden;
  }

  .dp-b-top {
    text-align: center;
    padding: 30upx 0;
    font-weight: bold;
    font-size: 32upx;
    border-bottom: 1px solid #f0f0f0;
  }

  .popupbox .typeActive {
    color: #0066fc;
  }

  .types-list {
    height: 90upx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #efefef;
  }

  .as-p-t-cancel {
    color: #939393;
  }

  .as-p-t-ok {
    color: #005cf6;
  }

  .as-pb-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90upx;
    padding: 0 30upx;
  }

  .popupbox {
    width: 100%;
    background: #fff;
  }

  .assets-record-box {
    padding: 0 30rpx;
  }


  .arb-list {
    width: 100%;
    height: 228rpx;
    padding: 36rpx 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top {
      display: flex;
      justify-content: space-between;

      .description {
        font-size: 32rpx;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        line-height: 44rpx;
      }

      .status {
        font-size: 28rpx;
        font-weight: 500;
        text-align: right;
        color: #06a37a;
        line-height: 40rpx;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
    }

    .block {
      display: flex;
      flex-direction: column;

      &:first-child {
        min-width: 222rpx;
      }

      &:nth-child(2) {
        margin-right: auto;
      }

      &:last-child {
        align-items: flex-end;
      }
    }

    .label {
      font-size: 24rpx;
      font-weight: 400;
      text-align: left;
      color: #9ea0a8;
      line-height: 34rpx;
      margin-bottom: 10rpx;
    }

    .value {
      font-size: 28rpx;
      font-family: "DIN-Medium";
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 34rpx;
    }

  }

  .arb-list-number {
    display: flex;
    align-items: center;
    // padding-top: 16upx;
  }

  .arb-list-number>view {
    width: 33.3333%;
    font-size: 28upx;
  }

  .arb-list-title {
    display: flex;
    align-items: center;
  }

  .arb-list-title>view {
    width: 33.3333%;
    color: #BDBDBD;
    font-size: 24upx;
  }

  // .arb-list {
  // 	background: #fff;
  // 	padding: 30upx;
  // 	margin-bottom: 10upx;
  // }

  .arb-h-title {
    border-left: 3px solid #018AFD;
    padding-left: 20upx;
  }

  .arb-header {
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    // padding: 20upx 30upx;
    width: 100%;
    height: 24rpx;
    background-color: #FAFAFD;
  }

  .at-box-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .at-box-btn>view {
    width: 30%;
    height: 70upx;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 28upx;
    background: rgba(255, 255, 255, 0.3);
  }

  .at-box-number {
    font-size: 66upx;
    color: #fff;
  }

  page {
    background: #ffffff;
  }

  .at-box-title {
    font-size: 32upx;
    color: #fff;
  }

  .at-box {
    width: 100%;
    height: 294upx;
    padding: 20upx 50upx 30upx 50upx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .assets-top {
    width: 100%;
    height: 470upx;
    background: url(../../static/image/assets-bg.png) no-repeat center;
    background-size: 100% 100%;
  }


</style>
