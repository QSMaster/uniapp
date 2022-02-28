import * as common from "./common.js"
import store from "../store/store.js"

/*接口请求地址*/
// 本地
export const apiUrl = 'http://bitant.io'
// export const apiUrl = 'http://192.168.110.201:8082'

// 线上
// export const apiUrl = 'http://47.242.8.115:8080'
// export const apiUrl = 'http://api.bitant.io'



// axios 发送请求统一处理
const api = (types, method, url, data, callback) => {
  setTimeout(() => {
    // uni.hideLoading();
    store.state.BtnFlag = true;
  }, 6000)
  if (types == "none") {
    //向后台传用户token
    data.token = common.getStorage('user_token');
    uni.request({
      url: apiUrl + url, //仅为示例，并非真实接口地址。
      data,
      method: method || "POST",
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'token':common.getStorage('user_token') //自定义请求头信息
      }
    }).then(response => {
      if (response[1].data.code != 200) {
        if (response[1].data.code != 200) {
          uni.showToast({
            title: response[1].data.message,
            icon: "none",
            mask: true,
            duration: 1500
          })
          if (response[1].data.code == 600) {
            common.loginOut()
          }
        }
      }
      // console.log('请求返回体', response[1].data);
      callback(response[1].data)
    }).catch(err => {
      uni.showToast({
      	title: "抱歉,出错了哦~~",
      	icon:"none",
      	duration: 1500
      })
    })
  } else if (types == "form") {
    //向后台传用户token
    // data.token = common.getStorage('user_token');
    // let jsonData = JSON.stringify(data)
    uni.request({
      url: apiUrl + url, //仅为示例，并非真实接口地址。
      data: data,
      method: "POST",
      header: {
        'Content-Type': 'application/json',
        'token': common.getStorage('user_token') //自定义请求头信息
      }
    }).then(response => {
      if (response[1].data.code != 200) {
        if (response[1].data.code != 200) {
          uni.showToast({
            title: response[1].data.message,
            icon: "none",
            mask: true,
            duration: 1500
          })
          if (response[1].data.code == 600) {
            common.loginOut()
          }
        }
      }
      callback(response[1].data)
    }).catch(err => {
      // uni.showToast({
      // 	title: "抱歉,出错了哦~~",
      // 	icon:"none",
      // 	duration: 1500
      // })
    })
  }
}



// 撤销提币
export const backOutTibi = (data = {}, callback) => api("none", "POST", "/api/user-asset/backOut", data, callback)

// 批量交易设置
export const setUpMany = (data = {}, callback) => api("form", "POST", "/api/user-strategy/setUpMany", data, callback)

// 电子账单-个人年利率
export const yearAndWeekprofit = (data = {}, callback) => api("none", "POST",
  "/api/user-transaction-records/yearAndWeekprofit", data, callback)

// 多选手动清仓
export const manualPlaceOrderMany = (data = {}, callback) => api("none", "POST",
  "/api/user-trading-on/manualPlaceOrderMany", data, callback)

// 手动清仓/补仓
export const manualPlaceOrder = (data = {}, callback) => api("none", "POST", "/api/user-trading-on/manualPlaceOrder",
  data, callback)

// 启动/停止交易
export const setEnabled = (data = {}, callback) => api("none", "POST", "/api/user-trading-on/setEnabled", data,
  callback)

// 单个交易设置
export const strategySetup = (data = {}, callback) => api("form", "POST", "/api/user-strategy/setup", data, callback)

// 获取usdt余额
export const getHuoBiUsdt = (data = {}, callback) => api("none", "POST", "/api/user-asset/getHuoBiUsdt", data, callback)

// 交易设置查询
export const defaultSetupQuery = (data = {}, callback) => api("none", "POST", "/api/user-strategy/defaultSetupQuery",
  data, callback)

// 切换策略
export const cutStrategy = (data = {}, callback) => api("none", "POST", "/api/user-trading-on/cutStrategy", data,
  callback)

// 根据交易所获取交易列表
export const tradingOnList = (data = {}, callback) => api("none", "POST", "/api/trading-on/list", data, callback)

// 获取交易详情
export const tradingOnDetails = (data = {}, callback) => api("none", "POST", "/api/trading-on/detail", data, callback)

// 获取系统版本
export const sysVersion = (data = {}, callback) => api("none", "POST", "/api/common/sysVersion", data, callback)

// 首页-获取已启动交易
export const getEnabled = (data = {}, callback) => api("none", "POST", "/api/currency/getEnabled", data, callback)

// 切换平台
export const changePlatform = (data = {}, callback) => api("none", "POST", "/api/common/changePlatform", data, callback)

// 关闭机器人
export const close = (data = {}, callback) => api("none", "POST", "/api/user-trading-on/close", data, callback)

// 交易记录
export const transactionRecords = (data = {}, callback) => api("form", "POST", "/api/user-transaction-records/list",
  data, callback)

// 解绑手机号/邮箱
export const unbindPhoneOrEmail = (data = {}, callback) => api("none", "POST", "/api/user/unbindPhoneOrEmail", data,
  callback)

// 首页行情
export const getIndexQuotation = (data = {}, callback) => api("none", "POST", "/api/currency/getIndexQuotation", data,
  callback)

//互转
export const transferAccounts = (data = {}, callback) => api("form", "POST", "/api/user-asset/transferAccounts", data,
  callback)

//提币
export const extractCoin = (data = {}, callback) => api("none", "POST", "/api/user-asset/extractCoin", data, callback)

//获取用户资产流水列表
export const flowAssetsList = (data = {}, callback) => api("none", "POST", "/api/user-asset-flow/list", data, callback)

//获取用户资产流水类型列表
export const flowTypeList = (data = {}, callback) => api("none", "POST", "/api/flow-type/list", data, callback)

//用户资产
export const userAssetInfo = (data = {}, callback) => api("none", "POST", "/api/user-asset/info", data, callback)

// 获取交易所列表
export const bourselist = (data = {}, callback) => api("none", "POST", "/api/bourse/list", data, callback)

// 获取交易所列表
export const userBourselist = (data = {}, callback) => api("none", "GET", "/api/bourse/list", data, callback)

//删除授权
export const removeAuthorization = (data = {}, callback) => api("none", "POST", "/api/currency-mandate/remove", data,
  callback)

//获取授权详情
export const AuthorizationDetail = (data = {}, callback) => api("none", "POST", "/api/currency-mandate/detail", data,
  callback)

// 验证是否授权
export const isAuthorization = (data = {}, callback) => api("none", "POST", "/api/currency-mandate/isAuthorization",
  data, callback)

// API授权
export const apiAuthorization = (data = {}, callback) => api("none", "POST", "/api/currency-mandate/apiAuthorization",
  data, callback)

// 获取导航栏列表
export const navigateList = (data = {}, callback) => api("none", "POST", "/api/navigate/getList", data, callback)

// 获取轮播图列表
export const bannerList = (data = {}, callback) => api("none", "POST", "/api/banner/list", data, callback)
//日志列表
export const loginList = (data = {}, callback) => api("none", "POST", "/api/logs/list", data, callback)

// 获取资讯详情
export const detailt = (data = {}, callback) => api("none", "POST", "/api/news/detail", data, callback)

// 获取公告列表
export const noticeList = (data = {}, callback) => api("none", "POST", "/api/notice/list", data, callback)

// 获取公告详情
export const noticeDetail = (data = {}, callback) => api("none", "POST", "/api/notice/detail", data, callback)

// 获取直推用户
export const getUserList = (data = {}, callback) => api("none", "POST", "/api/community/getUserList", data, callback)

// 获取社区人数
export const getGroup = (data = {}, callback) => api("none", "POST", "/api/community/getGroup", data, callback)

//获取直推人数
export const getReferrer = (data = {}, callback) => api("none", "POST", "/api/community/getReferrer", data, callback)

// 电子账单(累计)
export const electronicBillingTotle = (data = {}, callback) => api("none", "POST",
  "/api/user-transaction-records/electronicBillingTotle", data, callback)

// 电子账单(今日)
export const electronicBillingToday = (data = {}, callback) => api("none", "POST",
  "/api/user-transaction-records/electronicBillingToday", data, callback)

// 交易额
export const turnoverSysMap = (data = {}, callback) => api("none", "POST", "/api/user-asset-flow/turnoverSysMap", data,
  callback)

// 排行榜
export const rankingList = (data = {}, callback) => api("none", "POST", "/api/user-asset-flow/rankingList", data,
  callback)

// 新版排行榜
export const rankingsList = (data = {}, callback) => api("none", "POST", "/api/user-asset-flow/rankings", data, callback)

// 系统参数
export const sysConfig = (data = {}, callback) => api("none", "POST", "/api/public/sysConfig", data, callback)

// 日志
export const logsList = (data = {}, callback) => api("none", "POST", "/api/logs/list", data, callback)

// 激活激活码
export const activationCodeActive = (data = {}, callback) => api("none", "POST", "/api/activation-code/active", data,
  callback)

// 购买激活码
export const activationCodeBuy = (data = {}, callback) => api("none", "POST", "/api/activation-code/buyCode", data,
  callback)

// 购买激活码
export const activationCodeBuyIn = (data = {}, callback) => api("form", "POST", "/api/activation-code/buy", data,
  callback)

// 获取激活码列表
export const activationCodeList = (data = {}, callback) => api("none", "POST", "/api/activation-code/list", data,
  callback)

// 修改提醒额度
export const updateQuota = (data = {}, callback) => api("none", "POST", "/api/user/updateQuota", data, callback)

// 修改支付密码
export const changePayPassword = (data = {}, callback) => api("none", "POST", "/api/user/changePayPassword", data,
  callback)

// 修改密码
export const changePassword = (data = {}, callback) => api("none", "POST", "/api/user/changePassword", data, callback)

// 绑定手机号/邮箱
export const bindUserPhone = (data = {}, callback) => api("none", "POST", "/api/user/bindUserPhone", data, callback)

// 发送验证码
export const sendSms = (data = {}, callback) => api("none", "POST", "/api/common/sendSms", data, callback)

// 获取七牛云token
export const getQiniuToken = (data = {}, callback) => api("none", "POST", "/api/upload/getQiniuToken", data, callback)

// 上传头像
export const uploadAvatar = (data = {}, callback) => api("none", "POST", "/api/upload/avatar", data, callback)

// 修改昵称
export const changeUserNickname = (data = {}, callback) => api("none", "POST", "/api/user/changeUserNickname", data,
  callback)

// 分享地址
export const getShareUrl = (data = {}, callback) => api("none", "POST", "/api/user/getShareUrl", data, callback)

// 获取用户信息
export const userInfo = (data = {}, callback) => api("none", "POST", "/api/user/info", data, callback)

// 找回密码获取验证码
export const forgetSendBack = (data = {}, callback) => api("none", "POST", "/api/common/sendBack", data, callback)

// 忘记密码
export const forgetPassword = (data = {}, callback) => api("form", "POST", "/api/user/forgetPassword", data, callback)

// 平台协议
export const getAgreement = (data = {}, callback) => api("none", "POST", "/api/common/getAgreement", data, callback)

// 注册
export const register = (data = {}, callback) => api("none", "POST", "/userRegister/register", data, callback)

// 登录
export const login = (data = {}, callback) => api("none", "POST", "/user/login", data, callback)

// 退出登录
export const logingOut = (data = {}, callback) => api("none", "POST", "/user/logingOut", data, callback)

// 资讯
export const newsList = (data = {}, callback) => api("none", "POST", "/api/news/list", data, callback)

// 我的收益
export const getUserIncome = (data = {}, callback) => api("none", "POST", "/api/user-transaction-records/profit", data,
  callback)

// 注册获取验证码
export const sendSmsRegister = (data = {}, callback) => api("none", "POST", "/api/common/sendSmsRegister", data,
  callback)

// 获取最新版本
export const updateVersion = (data = {}, callback) => api("none", "GET", "/api/public/update", data, callback)

// 我的收益列表
export const incomeList = (data = {}, callback) => api("none", "POST", "/api/user-transaction-records/profitRecord", data, callback)

// 批量启动/停止交易
export const setEnabledMany = (data = {}, callback) => api("none", "POST", "/api/user-trading-on/setEnabledMany", data, callback)
