<template>
  <view class="switches">
    <view
      class="switch-item"
      v-for="(item, index) in items"
      :key="item"
      :class="{'active':modelValue === index}"
      @click="switchItem(index)"
    >
      <view>{{item}}</view>
    </view>
    <view class="active-bar" :style="activeStyle"></view>
  </view>
</template>

<script>
  export default {
    name: 'switches',
    props: {
      items: {
        type: Array,
        default() {
          return []
        }
      },
      modelValue: {
        type: Number,
        default: 0
      }
    },
    model: {
        prop: 'modelValue',
        event: 'update'
    },
    computed: {
      activeStyle() {
        const x = 240 * this.modelValue
        return {
          transform: `translate3d(${x}rpx, 0, 0)`
        }
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('update', index)
      }
    }
  }
</script>

<style scoped lang="scss">
  .switches {
    display: flex;
    position: relative;
    align-items: center;
    width: 720rpx;
    margin: 0 auto;
    border: 1px solid #333;
    border-radius: 10rpx;
    background-color: transparent;
    .switch-item {
      position: relative;
      z-index: 10;
      flex: 1;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.3);
      &.active {
        color: #fff;
      }
    }
    .active-bar {
      position: absolute;
      left: 0;
      top: 0;
      width: 240rpx;
      height: 60rpx;
      transition: transform 0.3s;
      border-radius: 10rpx;
      background: #333;
    }
  }
</style>
