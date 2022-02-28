<template>
  <view class="container">
    <view class="top">
      <uni-status-bar></uni-status-bar>

      <view class="padding">
        <view class="platform">
          <view class="platform_item" :class="{active: platformId === item.id}" @click="selectPlatform(item.id)"
            v-for="item in bourseArray" :key="item.bourseName">{{item.bourseShortName}}</view>
        </view>

        <view class="searchWrap">
          <image class="icon" src="../static/images/icon_home_search@3x.png" mode="aspectFit"></image>
          <uni-easyinput class="input" v-model="inputValue" placeholder="搜索币种名称" :inputBorder="false"
            @input="seachGo" />
        </view>
      </view>
    </view>

    <view class="list" :style="{paddingBottom: hidden?'502rpx':'120rpx'}">
      <z-paging :use-page-scroll="false" :default-page-size="100" ref="paging" @query="queryList"
        :list.sync="checkboxData" :auto-clean-list-when-reload="false" show-refresher-update-time>

        <view class="" slot="top">
          <v-tabs paddingItem="0px 40rpx 0px 40rpx" v-model="brouseNavIndex" :tabs="tabs" :scroll="true"
            bgColor="#FDFDFE" color="#9EA0A8" activeColor="#37383B" height="120rpx" lineColor="#4160FB"
            lineHeight="6rpx" fontSize="32rpx" :lineScale="0.25" @change="changeTab" marginItem="0 0 0 0"></v-tabs>
        </view>

        <!-- 选择币种列表 -->
        <div v-show="brouseNavIndex=== 0">
          <view class="chooseCurrencyItem" v-for="(item,index) in checkboxData" :key="item.id + brouseNavIndex"
            @click="toStrategy(item)">
            <evan-checkbox v-model="item.check" primaryColor="#4160FB" v-show="hidden" :iconSize="18"
              style="margin-right: 30rpx;"></evan-checkbox>


            <!-- <image class="icon" :src="`../static/coins/${item.tradingOn.split('/')[0]}.svg`" mode="aspectFit"></image> -->
            <!-- <image class="icon" src="../static/images/bi_bi_none@2x.png" mode="aspectFit"></image> -->
            <dh-image class="icon" :src="`../static/coins/${item.tradingOn.split('/')[0]}.svg`"
              errorSrc="../static/images/bi_bi_none@2x.png" mode="aspectFit"></dh-image>

            <view class="pair">{{item.tradingOn.split('/')[0]}}</view>
            <view class="pairSmll">/{{item.tradingOn.split('/')[1]}}</view>
            <view class="btn" @click.stop="toStrategySet(item)">添加策略</view>
          </view>
        </div>

        <!-- 我的策略 -->
        <view v-show="brouseNavIndex=== 1">
          <view class="myStrategyItem" v-for="(item,index) in checkboxData" :key="item.id + brouseNavIndex"
            @click="toStrategy(item)">
            <view class="myStrategyItem_top">
              <evan-checkbox v-model="item.check" primaryColor="#4160FB" v-show="hidden" :iconSize="18"
                style="margin-right: 30rpx;"></evan-checkbox>

              <!-- <image class="icon" :src="`../static/coins/${item.tradingOn.split('/')[0]}.svg`" mode="aspectFit"></image> -->

              <dh-image class="icon" :src="`../static/coins/${item.tradingOn.split('/')[0]}.svg`"
                errorSrc="../static/images/bi_bi_none@2x.png" mode="aspectFit"></dh-image>

              <view class="pair">{{item.tradingOn.split('/')[0]}}</view>
              <view class="pairSmll">/{{item.tradingOn.split('/')[1]}}</view>
              <view class="increase" :class="item.rose < 0?'fall':'rise'">
                {{item.rose > 0?'+':''}}{{item.rose | qff(2)}}%
              </view>
            </view>
            <view class="myStrategyItem_status">{{item.enabled | strategyStatus}}</view>
            <view class="myStrategyItem_row">
              <view class="block">
                <view class="value">{{item.takeAmount | qff(4)}}</view>
                <view class="label">持仓金额(USDT)</view>
              </view>
              <view class="block">
                <view class="value">{{item.avgPrice | qff(4)}}</view>
                <view class="label">持仓均价(USDT)</view>
              </view>
              <view class="block">
                <view class="value bold">{{item.strategyType | typeStatus}}</view>
                <view class="label">策略设置</view>
              </view>
            </view>

            <view class="myStrategyItem_row">
              <view class="block">
                <view class="value">{{item.profitCount || '--'}}</view>
                <view class="label">盈利次数</view>
              </view>
              <view class="block">
                <view class="value" :class="item.profitTotal>=0?'blue':'red'">{{item.profitTotal | qff(4)}}</view>
                <view class="label">盈利总额(USDT)</view>
              </view>
              <view class="block">
                <view class="value blue" :class="item.floatingLoss>=0?'blue':'red'">{{item.floatingLoss | qff(4)}}
                </view>
                <view class="label">浮动盈亏</view>
              </view>
            </view>
          </view>
        </view>

        <!-- 历史策略 -->
        <view v-show="brouseNavIndex=== 2">
          <view class="historicalStrategyItem" v-for="(item,index) in checkboxData" :key="item.id + brouseNavIndex"
            @click="toStrategy(item)">
            <view class="historicalStrategyItem_top">
              <evan-checkbox v-model="item.check" primaryColor="#4160FB" v-show="hidden" :iconSize="18"
                style="margin-right: 30rpx;"></evan-checkbox>


              <!-- <image class="icon" :src="`../static/coins/${item.tradingOn.split('/')[0]}.svg`" mode="aspectFit"></image> -->

              <dh-image class="icon" :src="`../static/coins/${item.tradingOn.split('/')[0]}.svg`"
                errorSrc="../static/images/bi_bi_none@2x.png" mode="aspectFit"></dh-image>

              <view class="pair">{{item.tradingOn.split('/')[0]}}</view>
              <view class="pairSmll">/{{item.tradingOn.split('/')[1]}}</view>
              <view class="history">已终止</view>
            </view>

            <view class="historicalStrategyItem_row">
              <view class="block">
                <view class="value" :class="item.profitTotal>=0?'blue':'red'">{{item.profitTotal | qff(4)}}</view>
                <view class="label">盈利总额(USDT)</view>
              </view>
              <view class="block">
                <view class="value">{{item.profitCount || '--'}}</view>
                <view class="label">盈利次数</view>
              </view>
              <view class="block">
                <view class="value bold">{{item.strategyType | typeStatus}}</view>
                <view class="label">策略设置</view>
              </view>
            </view>
          </view>
        </view>
      </z-paging>
    </view>

    <!-- 底部浮窗 -->
    <view class="footer-pannel">
      <view class="footer-title">
        <view class="footer-title-name">
          <view class="footer-title-name_label">当前账户剩余：</view>
          <view class="footer-title-name_value">{{ HuoBiUsdtData?HuoBiUsdtData:"0.00" | numberDo(4) }} USDT</view>
          <!-- 当前账户剩余USDT：{{ HuoBiUsdtData?HuoBiUsdtData:"0.00" | numberDo(4) }} -->
        </view>
        <view class="footer-title-setting" @click="show">{{this.hidden?'收起': '批量设置'}}</view>
      </view>
      <view class="footer-content" v-if="this.hidden == true">
        <view class="checkboxWrap">
          <label>
            <evan-checkbox v-model="isSelectAll" primaryColor="#4160FB" @change="handleSelectAll"><text
                class="label">是否全选</text></evan-checkbox>
          </label>
          <view class="text">仅针对已勾选的所有币种进行批量操作</view>
        </view>

        <view class="icon-list">
          <view class="icon-content" @click="seeting">
            <image style="width: 48rpx;height: 48rpx;" src="../static/images/trade/icon_1.svg" mode="aspectFit"></image>
            <view class="icon-text">策略设置</view>
          </view>

          <view class="icon-content" @tap="repeatedly(0)">
            <image style="width: 48rpx;height: 48rpx;" src="../static/images/trade/icon_2.svg" mode="aspectFit">
            </image>
            <view class="icon-text">循环策略</view>
          </view>

          <view class="icon-content" @tap="repeatedly(1)">
            <image style="width: 48rpx;height: 48rpx;" src="../static/images/trade/icon_4.svg" mode="aspectFit">
            </image>
            <view class="icon-text">单次策略</view>
          </view>

          <view class="icon-content" @click="startStop(1)">
            <image style="width: 48rpx;height: 48rpx;" src="../static/images/trade/icon_3.svg" mode="aspectFit"></image>
            <view class="icon-text">启动策略</view>
          </view>

          <view class="icon-content" @click="startStop(0)">
            <image style="width: 48rpx;height: 48rpx;" src="../static/images/trade/icon_5.svg" mode="aspectFit"></image>
            <view class="icon-text">停止策略</view>
          </view>

          <view class="icon-content" @tap="allBuy">
            <image style="width: 48rpx;height: 48rpx;" src="../static/images/trade/icon_6.svg" mode="aspectFit">
            </image>
            <view class="icon-text">清仓卖出</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import dhImage from '@/components/dh-image/dh-image'
  import {
    mapState
  } from 'vuex';

  export default {
    components: {
      dhImage
    },
    data() {
      return {
        // islogin: false, // 是否登录
        platformId: 1, // 交易所ID
        searchVal: '', // 搜索
        isSelectAll: false, // 是否全选
        tabs: ['选择币种', '我的策略', '历史策略'], //选项卡

        brouseNavIndex: 0, //选项下标
        now_Nav_Index: 0, //下标
        hidden: false,
        inputValue: '',
        selectValue: '',
        // 选项卡
        navIndex: 1,
        // list: 10,
        // 策略
        flag: true,
        isChecked: false,
        checkboxData: [],
        checkedArr: [], //复选框选中的值
        allChecked: false, //是否全选
        selectflag: true,
        // 交易所列表
        bourseData: [],
        bourseIdData: '',
        HuoBiUsdtData: '', //火币余额
        inputData: '',
        msgType: 'success',
        sourcedata: [] // 源数据
      };
    },
    computed: {
      ...mapState({
        isLogin: state => state.isLogin,
        bourseArray: state => state.bourseArray
      })
    },
    onShow() {
      // 登录状态下获取用户交易所余额
      if (this.isLogin) {
        this.HuoBiUsdt()
      }


      // this.bourselist();
      // this.HuoBiUsdt();
      // this.$common.getUserInfo();

      // this.bourseIdData = this.$store.state.userInfo.bourseId;

      // let brouseItem = this.$store.state.bourseArray.find(item => {
      //   if (item.id == this.$store.state.userInfo.bourseId) {
      //     return item;
      //   }
      // });
      // this.selectValue = brouseItem.bourseShortName;
      // this.checkedArr = [];
      // setTimeout(() => {
      //   this.$refs.paging.reload()
      // }, 200)
    },
    onLoad() {
      if (this.brouseNavIndex == 0) {
        this.now_Nav_Index = '';
      } else {
        this.now_Nav_Index = e - 1;
      }
      // this.bourseIdData = this.$store.state.userInfo.bourseId;
    },


    methods: {
      // 获取策略列表
      queryList(pageNo, pageSize) {
        this.$api.tradingOnList({
            bourseId: this.platformId || 1,
            pageNum: pageNo,
            pageSize: pageSize,
            strategyType: this.now_Nav_Index
          },
          res => {
            let list = res.result.list
            list = list.map(item => {
              return {
                check: false,
                ...item
              }
            })
            this.$refs.paging.complete(list);
            this.sourcedata = list
          }
        );
      },

      // 获取交易所余额
      HuoBiUsdt() {
        if(this.isLogin) {
          this.$api.getHuoBiUsdt({
              currencyId: this.platformId ? this.platformId : 1 // 交易所ID
            },
            res => {
              this.HuoBiUsdtData = res.result;
            }
          );
        }


      },


      /**
       * 未登录跳转拦截
       * @param {String} url 要跳转的目标链接
       */
      loginJump(url) {
        if (this.isLogin) {
          uni.navigateTo({
            url: url
          })
        } else {
          uni.navigateTo({
            url: 'login/login'
          })
        }
      },


      // 选择交易所
      selectPlatform(id) {
        this.platformId = id
        this.$refs.paging.reload()
        this.HuoBiUsdt()
      },

      // 是否全选
      handleSelectAll(val) {
        this.checkboxData.forEach(item => {
          item.check = val
        })
      },

      //搜索
      seachGo() {
        let _this = this;
        let newDataList = [];
        if (_this.inputValue != "") {
          this.sourcedata.find(item => {
            if (_this.lowercase(item.tradingOn).indexOf(_this.lowercase(_this.inputValue)) >= 0) {
              newDataList.push(item)
            }
          });
          this.checkboxData = newDataList;
        } else {
          this.$refs.paging.reload()
        }
      },

      //转小写
      lowercase(str) {
        if (str.indexOf("/")) {
          str = str.replace("/", "")
        }
        return str.toLowerCase();
      },

      //
      getArrItems(arr, key) {
        const list = arr.filter(item => item.check)
        const keys = list.map(item => {
          return item[key]
        })
        return keys
      },



      // 清仓卖出
      async allBuy() {
        // 1. 判断有没有选择的交易对ID
        // 2. 提取已选择的交易对的交易对id
        const ids = await this.getArrItems(this.checkboxData, 'tradingOnId')
        console.log("ids ????", ids);


        // let str = [];
        // for (let i = 0; i < this.checkedArr.length; i++) {
        //   str.push(JSON.parse(this.checkedArr[i]));
        // }
        // let a = str.map(item => {
        //   return item.id;
        // });
        if (ids.length === 0) {
          this.$common.showToast('请选择');
        } else {
          uni.showModal({
            title: '温馨提示',
            content: '是否立即清仓卖出？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确认',
            success: res => {
              if (res.confirm) {
                // 用户点击确定
                this.$api.manualPlaceOrderMany({
                    bourseId: this.platformId ? this.platformId : 1,
                    tradingOnIds: ids
                  },
                  res => {
                    if (res.code == 200) {
                      this.$common.showToast('清仓卖出成功');
                    }
                    this.$refs.paging.reload();
                  }
                );
              }
            }
          });
        }
      },






      // 跳转策略详情
      toStrategy(item) {
        if (this.hidden) return

        this.loginJump('/pages/index/strategy?id=' + item.id)

        // this.$common.skipTo('/pages/index/strategy?id=' + item.id);
      },


      // 跳转策略设置
      toStrategySet(item) {
        // this.$common.skipTo('/pages/trade/tradeSettings?status=' + item.strategyId);
        const tradingOn = item.tradingOn.replace(/\//, '-')
        this.loginJump(`/pages/trade/tradeSettings?status=${item.strategyId}&bourseId=${this.platformId}&tradingOnId=${item.tradingOnId}&tradingOn=${tradingOn}`)


        // this.$common.skipTo(

        // );
      },



      // 跳转策略设置
      async seeting() {
        // if(!this.isLogin) {

        // }


        const ids = await this.getArrItems(this.checkboxData, 'id')

        if (ids.length == 0) {
          this.$common.showToast('请选择');
        } else {
          // let str = [];
          // for (let i = 0; i < this.checkedArr.length; i++) {
          //   str.push(JSON.parse(this.checkedArr[i]));
          // }
          // let a = str.map(item => {
          //   return item.id;
          // });
          // let b = str.map(item => {
          //   return item.strategyType;
          // });
          // for (var i = 0; i < b.length; i++) {
          //   if (b[0] != b[i]) {
          //     var allsame = false
          //     this.$common.showToast('请选择相同策略');
          //     break;
          //   }
          // }
          // if (allsame != false) {
          //   let data = b[0];
          //   this.$common.skipTo('/pages/trade/tradeSettings?status=' + data);
          //   this.$common.setStorage('ids', a);
          // }
          // this.$common.skipTo('/pages/trade/tradeSettings?status=' + data);
          this.$common.setStorage('ids', ids);
          // this.$common.skipTo();

          this.loginJump(`/pages/trade/tradeSettings?bourseId=${this.platformId}`)

        }
      },

      //切换事件
      changeTab(e) {
        this.brouseNavIndex = e;
        if (this.brouseNavIndex == 0) {
          this.now_Nav_Index = '';
        } else {
          this.now_Nav_Index = e - 1;
        }
        this.isSelectAll = false
        this.$refs.paging.reload();
      },


      /**
       * 批量启动停止
       * @param {Number} type 0: 停止 1：启动
       */
      async startStop(type) {

        if(!this.isLogin) {
          this.loginJump()
          return
        }

        const ids = await this.getArrItems(this.checkboxData, 'strategyId')
        console.log('ids ?????', ids);

        if (ids.length === 0) {
          this.$common.showToast('请选择');
        } else {
          this.flag = false;
          this.$api.setEnabledMany({
              enabled: type,
              ids: ids
            },
            res => {
              if (res.code == 200) {
                this.$common.showToast('修改成功');
              }
              this.$refs.paging.reload();
            }
          );
        }

        // todo 批量启动停止
      },

      /**
       * 批量切换策略
       * @param {Number} type 0: 循环 1：单次
       */
      async repeatedly(type) {

        if(!this.isLogin) {
          this.loginJump()
          return
        }


        const ids = await this.getArrItems(this.checkboxData, 'strategyId')
        if (ids.length === 0) {
          this.$common.showToast('请选择');
        } else {
          this.flag = false;
          this.$api.cutStrategy({
              strategyType: type,
              ids: ids
            },
            res => {
              if (res.code == 200) {
                this.$common.showToast('修改成功');
              }
              this.$refs.paging.reload();
            }
          );
        }
      },

      single() {
        if (this.checkedArr.length == 0) {
          this.$common.showToast('请选择');
        } else {
          let str = [];
          for (let i = 0; i < this.checkedArr.length; i++) {
            str.push(JSON.parse(this.checkedArr[i]));
          }
          let a = str.map(item => {
            return item.strategyId;
          });
          this.flag = true;
          this.$api.cutStrategy({
              strategyType: 1,
              ids: a
            },
            res => {
              if (res.code == 200) {
                this.$common.showToast('单次策略修改成功');
              }
              this.checkedArr = [];
              this.$refs.paging.reload();
            }
          );
        }
      },



      show() {
        this.hidden = !this.hidden;
      },

      // 多选复选框改变事件
      changeCheckbox(e) {
        this.checkedArr = e.detail.value;
      },

      // 全选事件
      allChoose(e) {
        this.all = !this.all;
        // 全选
        if (this.all == true) {
          this.allChecked = true;
          for (let item of this.checkboxData) {
            let itemVal = JSON.stringify(item);
            if (!this.checkedArr.includes(itemVal)) {
              this.checkedArr.push(itemVal);
            }
          }
        } else {
          // 取消全选
          this.allChecked = false;
          this.checkedArr = [];
        }
      },

      // 选项卡
      checkIndex(index) {
        this.navIndex = index;
      },

      select() {
        this.$common.skipTo('/pages/trade/switch');
      }
    },
    filters: {
      // 运行状态
      strategyStatus(val) {
        if (val == 0) {
          return '已停止';
        } else if (val == 1) {
          return '运行中';
        }
      },
      brouseName: function(val, item) {
        if (val == '火币pro') {
          return '火币';
        } else {
          return val;
        }
      },
      roseDo: function(val) {
        if (val) {
          val = parseFloat(val);
          return val.toFixed(2);
        }
      },
      numberDo: function(val, num) {
        if (val) {
          val = parseFloat(val);
          return val.toFixed(num);
        }
      },
      typeStatus: function(val) {
        if (val == 0) {
          return '循环策略';
        } else if (val == 1) {
          return '单次策略';
        } else if (val == 2) {
          return '停止策略';
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* 底部浮窗 */
  .footer-pannel {
    position: fixed;
    width: 100%;
    /* #ifdef H5 || MP */
    // bottom: 0;
    bottom: 47px;
    /* #endif */
    // bottom: 0;
    bottom: 47px;
    z-index: 99;
    border-radius: 40rpx 40rpx 0 0;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0rpx -8rpx 32rpx 0rpx #eff1f3, 0rpx -10rpx 22rpx 0rpx #eff1f3 inset;

    .footer-content {
      padding: 0 40rpx;
    }

    .checkboxWrap {
      width: 100%;
      height: 82rpx;
      background: #f4f6fb;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;

      .label {
        font-size: 28rpx;
        font-weight: bold;
        text-align: left;
        color: #4160fb;
        line-height: 40rpx;
      }

      >.text {
        font-size: 24rpx;
        text-align: left;
        color: #9ea0a8;
        line-height: 34rpx;
        margin-left: auto;
      }
    }

    .icon-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .icon-content {
      width: 196rpx;
      height: 112rpx;
      background: #ffffff;
      border: 1rpx solid #eff0ef;
      border-radius: 22rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 25rpx;

      .icon-text {
        font-size: 28rpx;
        font-weight: bold;
        color: #37383b;
        line-height: 40rpx;
        margin-top: 4rpx;
        // margin-left: 20rpx;
      }
    }


    .footer-title {
      height: 120rpx;
      // background: #f1f2f5;
      display: flex;
      padding: 0 40rpx;
      align-items: center;
      box-shadow: 0rpx -8rpx 32rpx 0rpx #eff1f3;
    }

    .footer-title-name {
      // height: 34upx;
      // font-size: 24upx;
      // font-family: PingFang SC;
      // font-weight: 400;
      // line-height: 34upx;
      // color: #0278ff;
      // margin-left: 30upx;
      // line-height: 66upx;



      display: flex;
      margin-right: auto;

      &_label {
        font-size: 28rpx;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: bold;
        text-align: left;
        color: #37383b;
        // line-height: 40rpx;
      }

      &_value {
        font-size: 28rpx;
        font-family: DIN-Bold;
        font-weight: 700;
        text-align: left;
        color: #4160fb;
        // line-height: 34rpx;
      }
    }


    .footer-title-setting {
      width: 144rpx;
      height: 64rpx;
      background: rgba(233, 148, 19, 0.15);
      border-radius: 16rpx;
      font-size: 24rpx;
      font-weight: bold;
      text-align: center;
      color: #e99413;
      line-height: 64rpx;
    }

  }




  .list {
    width: 100%;
    flex: 1;
    overflow: hidden;
    padding-bottom: 136rpx;
    // background-color: red;
  }

  // 选择币种
  .chooseCurrencyItem {
    width: 688rpx;
    height: 136rpx;
    background: #ffffff;
    border-radius: 16rpx;
    box-shadow: 0rpx 0rpx 28rpx 0rpx #eff0f3;
    display: flex;
    padding: 0 30rpx;
    align-items: center;
    margin: 30rpx 30rpx 0;

    .icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 20rpx;
    }

    .pair {
      font-size: 32rpx;
      font-family: DIN-Medium;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 38rpx;
    }

    .pairSmll {
      font-size: 28rpx;
      font-family: DIN-Regular;
      font-weight: 400;
      text-align: left;
      color: #9ea0a8;
      line-height: 34rpx;
    }

    .btn {
      width: 144rpx;
      height: 64rpx;
      background: #4160fb;
      border-radius: 16rpx;
      font-size: 24rpx;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
      line-height: 64rpx;
      margin-left: auto;
    }
  }


  // 我的策略
  .myStrategyItem {
    width: 688rpx;
    height: 412rpx;
    opacity: 1;
    background: #ffffff;
    border-radius: 16rpx;
    box-shadow: 0rpx 0rpx 28rpx 0rpx #eff0f3;
    margin: 30rpx 30rpx 0;
    padding: 36rpx 30rpx 0;

    &_top {
      width: 100%;
      display: flex;
      align-items: center;
    }

    &_status {
      font-size: 28rpx;
      font-weight: 500;
      text-align: right;
      color: #9ea0a8;
      line-height: 40rpx;
      margin-top: 16rpx;
      margin-bottom: 30rpx;
    }

    .icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 20rpx;
    }

    .pair {
      font-size: 32rpx;
      font-family: DIN-Medium;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 38rpx;
    }

    .pairSmll {
      font-size: 28rpx;
      font-family: DIN-Regular;
      font-weight: 400;
      text-align: left;
      color: #9ea0a8;
      line-height: 34rpx;
    }

    .increase {
      width: 136rpx;
      height: 56rpx;
      background: #06a37a;
      border-radius: 10rpx;

      font-size: 28rpx;
      font-family: DIN-Medium;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
      line-height: 56rpx;
      margin-left: auto;

      &.fall {
        background-color: #E5274A;
      }
    }


    &_row {
      display: flex;
      margin-bottom: 32rpx;

      .block {
        display: flex;
        flex-direction: column;

        &:first-child {
          width: 226rpx;
        }

        &:last-child {
          margin-left: auto;
          align-items: flex-end;
        }
      }

      .value {
        font-size: 32rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        line-height: 38rpx;
        &.bold {
          font-weight: bold;
        }

        &.blue {
          color: #06a37a;
        }

        &.red {
          color: #be0940;
        }
      }

      .label {
        font-size: 24rpx;
        text-align: left;
        color: #9ea0a8;
        line-height: 34rpx;
        margin-top: 8rpx;
      }
    }
  }

  // 历史策略
  .historicalStrategyItem {
    width: 688rpx;
    height: 266rpx;
    opacity: 1;
    background: #ffffff;
    border-radius: 16rpx;
    box-shadow: 0rpx 0rpx 28rpx 0rpx #eff0f3;
    padding: 40rpx 26rpx;
    margin: 30rpx;
    margin-bottom: 0;

    &_top {
      width: 100%;
      display: flex;
      align-items: center;
    }



    .icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 20rpx;
    }

    .pair {
      font-size: 32rpx;
      font-family: DIN-Medium;
      font-weight: bold;
      text-align: left;
      color: #37383b;
      line-height: 38rpx;
    }

    .pairSmll {
      font-size: 28rpx;
      font-family: DIN-Regular;
      font-weight: 400;
      text-align: left;
      color: #9ea0a8;
      line-height: 34rpx;
    }

    .history {
      font-size: 28rpx;
      font-weight: 500;
      text-align: right;
      color: #9ea0a8;
      line-height: 40rpx;
      margin-left: auto;
    }


    &_row {
      display: flex;
      // margin-bottom: 32rpx;
      margin-top: 40rpx;

      .block {
        display: flex;
        flex-direction: column;

        &:first-child {
          width: 226rpx;
          font-size: 40rpx;
          line-height: 48rpx;
        }

        &:last-child {
          margin-left: auto;
          align-items: flex-end;
        }
      }

      .value {
        font-size: 32rpx;
        font-family: DIN-Medium;
        font-weight: 500;
        line-height: 38rpx;
        &.blud {
          font-weight: bold;
        }

        &.blue {
          color: #06a37a;
        }

        &.red {
          color: #be0940;
        }
      }

      .label {
        font-size: 24rpx;
        text-align: left;
        color: #9ea0a8;
        line-height: 34rpx;
        margin-top: 8rpx;
      }
    }




  }


  .top {
    background-color: #FDFDFE;
    z-index: 100;


    .padding {
      padding: 0 40rpx;
    }

    .platform {
      height: 120rpx;
      width: 100%;
      display: flex;

      padding-top: 26rpx;

      &_item {
        font-size: 36rpx;
        font-weight: bold;
        text-align: left;
        color: #9ea0a8;
        line-height: 50rpx;
        margin-right: 60rpx;

        &.active {
          color: #37383B;
        }
      }
    }

    .searchWrap {
      width: 100%;
      height: 88rpx;
      background: #f4f6fb;
      border-radius: 24rpx;
      display: flex;
      padding: 0 20rpx 0 36rpx;
      align-items: center;

      .icon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 16rpx;
      }

      .input {}
    }

  }



  >>>.z-paging-content-fixed {
    top: 220upx;
  }

  /deep/.uni-checkbox-input {
    border-radius: 50%;
  }

  /deep/.uni-checkbox-input-checked {
    background-color: #007aff;
    border-color: none;
    color: #ffffff;
  }

  /deep/#scrollContainer {
    z-index: 99 !important;
  }

  .index-zhang {
    background: #0bab64 !important;
  }

  .color-zhang {
    color: #0bab64 !important;
  }

  uni-page-body {
    height: 100%;
    font-size: 14px;
    line-height: 1.8;
  }

  /* 弹出框 */
  .dialog-input-panel {
    width: 600upx;
    height: 360upx;
    background: #ffffff;
    opacity: 1;
    border-radius: 20upx;
    position: relative;
  }

  .dialog-title {
    /* width: 168upx; */
    height: 50upx;
    font-size: 36upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 48upx;
    color: #000000;
    text-align: center;
    box-sizing: content-box;
    position: absolute;
    top: 30upx;
    left: 216upx;
    /* padding-top: 30upx; */
    /* margin-top: 30upx ;
	margin-bottom: 50upx; */
  }

  .dialog-input {
    width: 500upx;
    height: 92upx;
    padding: 0upx 10upx;
    background: #f2f2f2;
    opacity: 1;
    border-radius: 10upx;
    position: absolute;
    left: 50upx;
    top: 130upx;
  }

  .input-text {
    font-size: 28upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 48upx;
    color: #000000;
    position: absolute;
    right: 70upx;
    top: 156upx;
  }

  .lay {
    width: 100%;
    border-bottom: 2upx solid #dadfe6;
    position: absolute;
    top: 268upx;
  }

  /* 按钮 */
  .footer-btn {
    display: flex;
    height: 200upx;
    background: #f0f0f0;
    margin-top: 60upx;
  }

  .btn-size {
    width: 328upx;
    height: 90upx;
    background: #0278ff;
    opacity: 1;
    border-radius: 6upx;
    font-size: 34upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 90upx;
    color: #ffffff;
    opacity: 1;
  }

  .dialog-footer {
    width: 100%;
    position: absolute;
    bottom: 0upx;
    display: flex;
    justify-content: space-between;
    height: 92upx;
  }

  .canel {
    border-right: 2upx solid #dadfe6;
    width: 100%;
    text-align: center;
    line-height: 92upx;
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #969696;
  }

  .btn {
    width: 100%;
    text-align: center;
    line-height: 92upx;
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #027aff;
  }

  .nav-content {
    overflow-y: scroll;
    overflow: hidden;
    height: calc(100% - 81upx- 88upx- 50upx) !important;
  }





  .footer-title-all {
    font-size: 24upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34upx;
    color: #0278ff;
    line-height: 66upx;
    margin-left: 142upx;
  }



  // .footer-content {
  //   height: 350upx;
  //   background: #ffffff;
  // }

  .text-title-content {
    padding-top: 30upx;
    display: flex;
    margin-left: 30upx;
    position: relative;
  }

  .bg {
    width: 8upx;
    height: 30upx;
    background: linear-gradient(180deg, #19b6f8 0%, #098cf4 100%);
    opacity: 1;
    position: absolute;
    top: 37upx;
  }

  .text-title {
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 44upx;
    color: #000000;
    margin-left: 20upx;
  }

  .icon-list {
    display: flex;
    justify-content: space-around;
    margin-top: 28upx;
  }

  .icon-text {
    font-size: 26upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36upx;
    color: #000000;
    opacity: 1;
    text-align: center;
  }

  /* 选项卡内容 */
  .red-text {
    color: #d14c64;
  }

  // .red {
  //   background: #d14c64;
  // }

  // .blue {
  //   background: #0278ff;
  // }

  // .gray {
  //   background: #a8acb4;
  // }

  .tab-all-list-item {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
    padding: 30upx 0;
  }

  .tab-all-list-item-left {
    padding-right: 20upx;
  }

  .tab-all-left-name {
    display: flex;
  }

  .tab-all-left-num {
    display: flex;
    padding-top: 10upx;
  }

  .tab-all-list-item-right {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tab-title-name {
    font-size: 32upx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 48upx;
    color: #000000;
  }

  .tab-tag-name {
    width: 112upx;
    height: 42upx;
    background: #e9f1ff;
    font-size: 24upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34upx;
    color: #0278ff;
    text-align: center;
    line-height: 42upx;
    margin-left: 28upx;
  }

  .tab-title-num {
    font-size: 24upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34upx;
    color: #929aa6;
  }

  .tab-tag-num {
    font-size: 24upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34upx;
    color: #929aa6;
    margin-left: 20upx;
  }

  .tab-num-color {
    color: #d14c64;
    font-size: 24upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 34upx;
    margin-left: 10upx;
  }

  .tab-panel {
    background: #d14c64;
    width: 156upx;
    height: 66upx;
    opacity: 1;
    border-radius: 6upx;
    font-size: 30upx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 42upx;
    color: #ffffff;
    text-align: center;
    line-height: 66upx;
  }



  .header {
    width: 750upx;
    height: 88upx;
    background: #0278ff;
    padding: 10upx 30upx;
    /* z-index: 9999; */
    position: relative;
  }

  .header-input {
    width: 690upx;
    height: 68upx;
    background: #ffffff;
    opacity: 1;
    border-radius: 34upx;
    padding: 0 100upx 0 150upx;
  }

  .select {
    width: 80upx;
    height: 50upx;
    display: flex;
    position: absolute;
    z-index: 999;
    top: 26upx;
    left: 60upx;
  }

  .select-title {
    font-size: 26upx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 36upx;
    color: #606266;
  }

  .select-icon {
    margin-bottom: 28upx;
    position: absolute;
    top: -10upx;
    left: 66upx;
  }

  .search {
    position: absolute;
    top: 26upx;
    right: 50upx;
  }

  .tab-title {
    height: 76upx;
  }

  .head-nav {
    display: flex;
    justify-content: space-around;
    padding: 20upx 0upx 0upx 0upx;
    height: 81upx;
    position: relative;
    top: 48upx;
    background: #fff;
  }

  .lay {
    border-bottom: 2px solid #f0f0f0;
    position: absolute;
    top: 80upx;
    width: 100%;
  }

  .head-nav-title {
    font-size: 28upx;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 40upx;
    color: #000000;
    width: 100%;
    text-align: center;
    padding-bottom: 16upx;
  }

  .activite {
    color: #0278ff;
    border-bottom: 4upx solid #0278ff;
  }
</style>
