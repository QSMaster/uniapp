import Vue from 'vue'
import Vuex from 'vuex'
import * as $api from "../common/api.js"
import * as $common from "../common/common.js"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: uni.getStorageSync('isLogin') || false, // 记录用户登录状态
    version: "1.0.0", //当前系统版本
    sysName: "蚂蚁量化", //app的名字
    platformType: 1, //1:安卓 2：IOS
    BtnFlag: true, //限制不能连点
    sendCodeInfo: { //发送验证码
      times: 60,
      title: "获取验证码",
      className: "getcode",
      isClick: true
    },
    userInfo: {}, //用户信息
    sysConfig: "", //系统参数
    assetsInfo: {}, //用户资产信息
    indexQuotation: "", //首页三个行情
    bourseArray: [], //交易所列表
    indexDataFlush: false, // 首页策略数据要不要刷新
  },
  mutations: {
    // 保存用户信息
    SET_USER_INFO(state, data) {
      state.userInfo = data
    },

    // 保存用户资产信息
    SAVE_USER_ASSET(state, data) {
      state.assetsInfo = data
    },
    // 设置登录状态
    SET_LOGIN_STATUS(state, flag) {
      state.isLogin = JSON.parse(flag)
    },
    GET_EXCHANGE_LIST(state, array) {
      state.bourseArray = array
    },

    SET_VERSION(state, data) {
      console.log('同步保存版本号',data);
      state.version = data
    },
    //初始化发送验证码
    clearSendCode(state) {
      state.sendCodeInfo.times = 60;
      state.sendCodeInfo.title = "获取验证码";
      state.sendCodeInfo.className = "getcode";
      state.sendCodeInfo.isClick = true;
    },
    //发送验证码倒计时
    countDown(state) {
      if (state.sendCodeInfo.title == "获取验证码") {
        state.sendCodeInfo.title = state.sendCodeInfo.times + "s后重发";
        state.sendCodeInfo.className = "waitecode";
        state.sendCodeInfo.isClick = false;
        let timer = setInterval(() => {
          state.sendCodeInfo.times--;
          state.sendCodeInfo.title = state.sendCodeInfo.times + "s后重发";
          state.sendCodeInfo.isClick = false;
          if (state.sendCodeInfo.times == -1) {
            state.sendCodeInfo.className = "getcode";
            state.sendCodeInfo.times = 60;
            state.sendCodeInfo.title = "获取验证码";
            state.sendCodeInfo.isClick = true;
            clearInterval(timer);
          }
        }, 1000)
      } else {
        uni.showToast({
          title: '请稍后再试',
          icon: "none"
        })
      }
    }
  },
  actions: {
    // 保存用户信息
    setUserInfo({commit,state}) {
      if (state.isLogin) {
        console.log('用户登录了，可以请求用户信息');
        $api.userInfo({}, (res) => {
          if (res.code == 200) {
            commit('SET_USER_INFO', res.result || {})
          }
        });
      } else {
        console.log('用户未登录，不可以用户信息')
        commit('SET_USER_INFO', {})
      }
    },

    // 保存用户资产数据
    saveUserAsset({
      commit,
      state
    }) {
      if (state.isLogin) {
        console.log('用户登录了，可以请求资产');
        $api.userAssetInfo({}, res => {
          commit('SAVE_USER_ASSET', res.result || {})
        })
      } else {
        console.log('用户未登录，不可以请求资产');
        commit('SAVE_USER_ASSET', {})
      }
    },

    // 设置登录状态
    setLoginStatus({
      commit
    }, flag) {
      uni.setStorageSync('isLogin', flag)
      commit('SET_LOGIN_STATUS', flag || false)
    },

    // 获取交易所列表
    getExchangeList({
      commit,
      state
    }) {
      $api.bourselist({}, res => {
        commit('GET_EXCHANGE_LIST', res.result || [])
      });
    },

    // App热更新
    getHotUpload({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        console.log('App热更新检查');
        // #ifdef APP-PLUS
        plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
          console.log('开始请求接口');
          $api.updateVersion({}, res => {
            const result = res.result

            console.log('返回更新数据', JSON.stringify(result));
            // uni.showToast({
            //   title: result.data.wgtVersion
            // })
            /*
             * 如果是wgt更新，默认不提醒强制更新
             * 如果是app更新，需要根据接口的字段来判断是否强制更新。
             * */
            var data = result
            data.wgtVersion = data.wgtVersion || '1.0.0' // 设定初始化版本， 防止出错
            data.pkgVersion = data.pkgVersion || '1.0.0' // 设定初始化版本， 防止出错
            data.wgtUpdate = false;
            data.pkgUpdate = false;
            let version = Number(widgetInfo.version.split('.').join(''));

            console.log('version ?????', widgetInfo.version);
            commit('SET_VERSION', widgetInfo.version)
            // state.version = widgetInfo.version

            let serverWgtVersioNumber = Number(data.wgtVersion.split('.').join(''));
            let serverPkgVersionNumber = Number(data.pkgVersion.split('.').join(''));
            if (version < serverWgtVersioNumber) {
              data.wgtUpdate = true;
            }
            if (version < serverPkgVersionNumber) {
              data.pkgUpdate = true;
            }
            /*
             * 如果存在pkg更新时，需要弹窗提示 是否更新，
             * 如果是可选更新时： 如果用户更新，则不进入wgt更新， 如果用户不选择更新，则进入后台更新wgt
             * 如果是强制更新时：弹出提示用户更新，不进入wgt更新。
             * 如果不存在pkg更新时，默认进入后台更新wgt功能。
             * */
            console.log('=======getHotUpload=======', JSON.stringify(data))


            if (data.pkgUpdate || data.wgtUpdate) {
              if (data.pkgUpdate) {
                console.log('需要进行更新操作,跳转更新窗口');
                uni.navigateTo({
                  url: '/pages/subView/update/index',
                  success: () => {
                    uni.$emit('update', data)
                  }
                })
                return Promise.resolve()
              }
              uni.downloadFile({
                url: data.wgtUrl,
                success: ({
                  statusCode,
                  tempFilePath
                }) => {
                  console.log('执行热更新操作 》》》', statusCode, );
                  if (statusCode === 200) {
                    plus.runtime.install(tempFilePath, {
                      force: false
                    }, function() {
                      console.log('install success...');
                      if (data.restart || plus.os.name === 'iOS') {
                        /*
                         * 如果需要强制重启的话。 只存在与热更新时需要重启。 安装app的话会退出后台 因此不需要重启
                         * */
                        plus.runtime.restart();
                      }
                    }, function(e) {
                      console.error(e, 'install fail...');
                    });
                  }
                },
                fail: (error) => {
                  console.log(error, 'error fail')
                }
              });
              return Promise.resolve()
            }
            uni.hideLoading()
            resolve(result)


          })
        });
        // #endif
        reject();
      })
    },
  }
})

export default store
