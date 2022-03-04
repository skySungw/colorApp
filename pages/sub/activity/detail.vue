<template>
	<view class="activity-container">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">活动详情</view>
		</cu-custom>
		<view class="padding-sm" v-if="detail">
			<view class="margin-bottom-sm">
				<text class="text-bold">{{ detail.activityTitle }}</text>
			</view>
			<view class="image margin-bottom-sm" v-if="detail.activityImg">
				<image :src="detail.activityImg" mode="aspectFit" @tap="onViewImage"></image>
			</view>
			<rich-text :nodes="detail.activityContent"></rich-text>
		</view>
		<!--  activitySignUpState 0 未参加 1 已参加 -->
		<view class="fixed bottom" v-if="detail.enableSignUp && !detail.activitySignUpState">
			<button type="primary" @tap="onHandleSignUp">我要报名</button>
		</view>
	</view>
</template>

<script>
	import { onFetchActivityDetail, onSignUpActivity } from '@/api';
	export default {
		data() {
			return {
				detail: null,
			}
		},
		onLoad(options){
			if (options.activityCode) {
				this.activityCode = options.activityCode;
				this.onFetchDetail({
					activityCode: this.activityCode
				});
			}
		},
		methods: {
			async onFetchDetail(params) {
				try {
					const res = await onFetchActivityDetail(params);
					if (res.code === 200) {
						this.detail = res.data;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 报名
			async onHandleSignUp() {
				try {
					const res = await onSignUpActivity({
						activityCode: this.activityCode
					});
					if (res.code === 200) {
						uni.showToast({
							title: '报名成功'
						});
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			onViewImage(e) {
				uni.previewImage({
					urls: [this.detail.activityImg],
					current: [this.detail.activityImg]
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.activity-container {
		padding-bottom: 120upx;
	}
</style>
