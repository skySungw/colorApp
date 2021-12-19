<template>
	<view class="cu-card case no-card solid-bottom padding-bottom-sm">
	  <view class="cu-item shadow" @click="goDetail">
	    <view class="image">
	      <image :src="item.activityImg" mode="aspectFit"></image>
	      <view :class="['cu-tag', {'bg-green': item.activityState == 0}, {'bg-blue': item.activityState == 1}, {'bg-red': item.activityState == 2}]"> {{ item.activityState | onGetActivity }}</view>
	      <view class="cu-bar bg-shadeBottom">
	        <text class="text-cut">{{ item.activityTitle }}</text>
	      </view>
	    </view>
	    <view class="cu-list menu-avatar">
	      截止时间：{{ item.activityEndTime }}
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {
					id: 3
				}
			}
		},
		data() {
			return {
				
			}
		},
		filters: {
			onGetActivity(statusType) {
				const STATUS = {
					'0': '未开始',
					'1': '进行中',
					'2': '已结束'
				}
				return STATUS[statusType];
			}
		},
		methods: {
			goDetail() {
				console.log('activityState', this.item);
				uni.navigateTo({
					url: `/pages/sub/activity/detail?activityCode=${this.item.activityCode}`,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-avatar {
		margin: 30upx 30upx 0;
	}
</style>
