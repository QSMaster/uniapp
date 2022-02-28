<template>
	<view class="font-shrink-box" >
		<view class="content-borderbox" :style="openStauts?'height:auto;':'max-height:'+(line*(size+16))+'rpx;overflow: hidden;'" >
			<view class="content-text" :style="'line-height:'+(size+16)+'rpx;font-size:'+size+'rpx'">
				{{text}}
			</view>
			<view v-if="isShowBtn&&!openStauts&&!hideEllips" class="ellipsis" :style="'line-height:'+(size+16)+'rpx;font-size:'+size+'rpx;height:'+(size+16)+'rpx;background-color:'+ellipsisBack">
				.....
			</view>
		</view>
		<view v-if="isShowBtn" class="open-close-btn" :style="'font-size:'+btnSize+'rpx'" @click="showAll">
			{{openStauts?'收起':'展开'}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			line:{ //行数
				type:Number,
				default:2
			},
			text:{ // 文字
				type:String,
				default:''
			},
			size:{ //字体大小，单位rpx
				type:Number,
				default:28
			},
			btnSize:{
				type:Number,
				default:28
			},
			ellipsisBack:{ //省略号背景色
				type:String,
				default:'#fff'
			},
			hideEllips:{ //是否隐藏省略号
				type:Boolean,
				default:false
			}
			
		},
		data() {
			return {
				oldText:this.text,//旧的text
				borderHeight:0, //外层盒子的高度
				contentHeight:0, //放文字的盒子高度
				isShowBtn:false,//是否显示 展开/收起按钮
				openStauts:false,//展开状态,false-展开,true-收起
			};
		},
		updated() {
			// 使用oldText存放上一次的值，根据判断来减少一次方法调用
			if(this.oldText != this.text){
				this.oldText = this.text;
				this.initBtnShowStauts();
			}
		},
		mounted(){
			this.oldText = this.text;
			this.initBtnShowStauts();
		},
		methods:{
			initBtnShowStauts(){
				const query = uni.createSelectorQuery().in(this);
				let p1 = new Promise((resolve)=>{
					this.$nextTick(()=>{ 
						query.select('.content-borderbox').fields({ size: true, scrollOffset: true },
						data => { resolve(data.height) }).exec(); 
					}) 
				})
				let p2 = new Promise((resolve)=>{ 
					this.$nextTick(()=>{ 
						query.select('.content-text').fields({ size: true, scrollOffset: true }, 
						data => { resolve(data.height) }).exec(); 
					}) 
				}) 
				Promise.all([p1,p2]).then((res)=>{ 
					this.borderHeight = res[0]; 
					this.contentHeight = res[1]; 
					this.isShowBtn = this.borderHeight<this.contentHeight;
				});
			},
			showAll(){
				this.openStauts = !this.openStauts;
			}
		}
	}
</script>

<style lang="scss">
	.font-shrink-box{
		width: 100%;
		.content-borderbox{
			position: relative;
			.ellipsis{
				position: absolute;
				right: 0;
				bottom:0;
			}
		}
		
		.open-close-btn{
			width: 100%;
			color:#2250FF;
			text-align: center;
			padding:10rpx 0;
		}
	}
</style>
