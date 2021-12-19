<template>
	<view class="cu-list menu-avatar">
	    <view class="cu-item" v-for="(item, index) in list" :key="index">
	      <view class="cu-avatar round lg" :style="{'background-image': 'url(' +item.wxHeadImg + ');'}" @click="goPage(item)"></view>
	      <view class="content" @click="goPage(item)">
	        <view class="text-grey">{{ item.userName }}</view>
	        <view class="text-gray text-sm flex">
	          <text class="text-cut">
								{{ item.userDesc || '' }}
	          </text>
	        </view>
	      </view>
	      <view v-if="source == 1 && isFocus" class="action">
	        <view class="text-green text-xs">
						<view class="cu-tag line-green" @tap="onHandleFollow(item, true)">+ 关注</view>
						<!-- <view class="cu-tag" v-else>互相关注</view> -->
					</view>
	      </view>
				<view v-if="source == 0 && isFocus" class="action">
				  <view class="text-grey text-xs">
						<view class="cu-tag line-grey" @tap="onHandleFollow(item, false)">取消关注</view>
					</view>
				</view>
	    </view>
	</view>
</template>

<script>
	import { onHandleFollow } from '@/api';
	export default {
		props: {
			isFocus: { // 是否展示  关注功能
				type: Boolean,
				default: true
			},
			list: {
				type: Array,
				default: []
			},
			source: {
				type: Number,
				default: 0 // 来源： 0 - 我关注的， 1 - 我的粉丝
			}
		},
		data() {
			return {
				
			}
		},
		created() {
			console.log('isFocus', this.isFocus)
		},
		methods: {
			// 关注/取消关注
			async onHandleFollow(item, type) {
				let followState = 0;
				let msg = '已取消';
				if (type) {
					followState = 1;
					msg = '已关注';
				}
				try {
					const res = await onHandleFollow({
						userId: item.userId,
						followState
					});
					if (res.code === 200) {
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 2000
						})
						this.$emit('resetList');
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			goPage(item) {
				uni.navigateTo({
					url: `/pages/sub/my/home?id=${item.userId}`
				})
			}
		}
	}
</script>

<style>
</style>
