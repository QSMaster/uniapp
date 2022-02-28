<template>
  <view class="container">
    <nav-bar title="日志" backState="2000" bgColor="#ffffff" fontColor="#010F14" shadow></nav-bar>

   <view class="main">
     <z-paging ref="paging" @query="queryList" :list.sync="dataList" :auto-clean-list-when-reload="false"
       :auto-show-back-to-top="true">
       <view class="logList">
         <view class="logItem" v-for="item in dataList" :key="item.createTime + 'wrap'">
           <view class="logItem_title hairline--bottom">{{item.createTime}}</view>

           <view class="logSubList">
             <view class="logSubItem" :class="{'hairline--top': index !== 0}" v-for="(subItem, index) in item.subList" :key="item.id">
               <view class="timeWrap">
                 <view class="logSubItem_time">{{subItem.createTime.slice(10)}}</view>
                 <view class="logSubItem_platform">{{subItem.bourseName}}</view>
               </view>
               <view class="presentationWrap">
                 <image class="presentation_icon" v-if="subItem.type==1" src="../static/images/icon_book_buy@3x.png">
                 </image>
                 <image class="presentation_icon" v-else-if="subItem.type==2"
                   src="../static/images/icon_book_sell@3x.png"></image>
                 <image class="presentation_icon" v-else-if="subItem.type==3"
                   src="../static/images/icon_book_failure@3x.png"></image>
                 <image class="presentation_icon" v-else-if="subItem.type==4"
                   src="../static/images/icon_book_failure@3x.png"></image>
                 <view class="presentation">{{subItem.symbol}} &nbsp;{{subItem.title}}</view>
               </view>
               <view class="row" v-show="true">
                 <view class="block">
                   <view class="value">{{subItem.price | qff(5)}}</view>
                   <view class="label">成交价格</view>
                 </view>
                 <view class="block">
                   <view class="value">{{subItem.quantity | qff(2)}}</view>
                   <view class="label">成交数量</view>
                 </view>
                 <view class="block">
                   <view class="value">{{subItem.amount  | qff(2)}}</view>
                   <view class="label">成交额</view>
                 </view>
               </view>
             </view>
           </view>
         </view>
       </view>
     </z-paging>

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
        dataList: []
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin
      })
    },
    onShow() {
      setTimeout(() => {
        this.$refs.paging.reload()
      }, 200)
    },
    methods: {
      // 获取日志
      queryList(pageNo, pageSize) {

        if(this.isLogin) {
          this.$api.loginList({
            pageNum: pageNo,
            pageSize: pageSize,
          }, res => {
            this.$refs.paging.complete(this.dataResort(res.result.list));
          })
        } else {
          this.$refs.paging.complete([]);
        }


      },

      // 数据根据日期归类
      dataResort(arr) {
        let newArr = [];
        arr.forEach((item, i) => {
          let index = -1;
          let isExists = newArr.some((newItem, j) => {
            if (item.createTime.slice(0, 10) == newItem.createTime.slice(0, 10)) {
              index = j;
              return true;
            }
          })
          if (!isExists) {
            newArr.push({
              createTime: item.createTime.slice(0, 10),
              subList: [item]
            })
          } else {
            newArr[index].subList.push(item);
          }
        })
        return newArr;
      }

    }
  };
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .main {
      flex: 1;
      overflow: hidden;
    }
  }

  // 日志列表
  .logList {
    .logItem {
      background-color: #FFFFFF;
      margin-top: 26rpx;

      &_title {
        display: flex;
        align-items: center;

        height: 110rpx;
        font-size: 32rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: left;
        color: #37383b;
        padding-left: 40rpx;
      }
    }

    .logSubList {
      padding: 0 40rpx;
    }

    .logSubItem {
      padding: 40rpx 0;

      .timeWrap {
        font-size: 28rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        text-align: left;
        color: #9ea0a8;
        line-height: 34rpx;
        display: flex;
        flex-direction: row;

        .logSubItem_time {
          margin-right: 20rpx;
        }
      }

      .presentationWrap {
        display: flex;
        align-items: center;
        margin-top: 28rpx;
        margin-bottom: 32rpx;

        .presentation_icon {
          width: 60rpx;
          height: 56rpx;
          margin-right: 22rpx;
          flex-shrink: 0;
        }

        .presentation {
          font-size: 32rpx;
          font-family: DIN-Medium;
          font-weight: bold;
          text-align: left;
          color: #37383b;
        }
      }

      .row {
        display: flex;

        .block {
          display: flex;
          flex-direction: column;
          &:first-child {
            width: 270rpx;
          }

          &:last-child {
            align-items: flex-end;
            margin-left: auto;
          }
        }

        .value {
          font-size: 32rpx;
          font-family: DIN-Medium;
          font-weight: 500;
          color: #37383b;
          line-height: 38rpx;
        }

        .label {
          font-size: 28rpx;
          color: #5e6066;
          line-height: 40rpx;
          margin-top: 12rpx;
        }
      }
    }
  }



  .jl-l-l-img {
    position: absolute;
    left: -16upx;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .jl-l-l-title {
    font-size: 28upx;
  }

  .jl-l-l-time {
    font-size: 24upx;
    color: #929aa6;
    padding-top: 10upx;
  }

  .jl-l-list {
    /* border-left: 1px solid #e3e8ee; */
    padding: 20upx 0upx 20upx 64upx;
    position: relative;
  }

  .jl-list {
    background: #fff;
    padding: 34upx;
  }

  .jl-time {
    padding: 20upx 0;
  }

  .journal-box {
    padding: 0 30upx;
  }




</style>
