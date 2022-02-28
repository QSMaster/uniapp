import Vue from 'vue'
import App from './App'
import store from "./store/store.js"
import * as $api from 'common/api.js'
import * as common from "common/common.js"
/*计算方法*/
import cal from "common/calculation.js"
// import "./styles/index.scss"
//抽屉

import * as filters from './filters'

import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
Vue.component('uniDrawer', uniDrawer)
//高斯模糊
import helangBlur from "@/components/helang-blur/helang-blur.vue"
Vue.component('helangBlur', helangBlur)

Vue.prototype.$api=$api
Vue.prototype.$common=common
Vue.prototype.$CAL=cal

Vue.config.productionTip = false

/*引入上拉加载、下拉刷新*/
import zConfig from '@/uni_modules/z-paging/components/z-paging/js/z-paging-config'
zConfig.setConfig({
	//配置分页默认pageSize为15
	'default-page-size': '20',
	//配置空数据图默认描述文字为：空空如也~~
	'empty-view-text': '空空如也~~',
	//...
})

// 注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


/*头部导航*/
import navBar from "@/components/navBar";
Vue.component("nav-bar", navBar);

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
