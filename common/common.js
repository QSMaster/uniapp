import _this from "../main.js"
import store from "../store/store.js"
import * as $api from './api.js'

// 设置localStorage
export function setStorage(name, content) {
	if(!name) return
	if(typeof content !== 'string') {
		content = JSON.stringify(content)
	}
	uni.setStorageSync(name,content)
}

// 获取localStorage
export function getStorage(name) {
	if(!name) return
	return uni.getStorageSync(name)
}

// 删除localStorage
export function removeStorage(name) {
	if(!name) return
	return uni.removeStorageSync(name)
}

// 消息提示
export function showToast(title,icon='none',) {
	uni.showToast({
		icon,
		title,
		duration:1300,
	})
}

// 页面跳转
export function skipTo(url) {
	uni.navigateTo({
		url:url
	})
}

// 获取用户信息
export function getUserInfo(){
	$api.userInfo({},res=>{
		if(res.code==200){
			store.state.userInfo = res.result;
		}
	})
}

//退出登录
export function loginOut(){
	removeStorage("user_token");
	uni.navigateTo({
		url:"/pages/login/login"
	})
}

//获取系统参数
export function sysConfig(){
	$api.sysConfig({},res=>{
		if(res.code==200){
			store.state.sysConfig = res.result
		}
	})
}
