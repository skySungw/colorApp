<template>
	<view class="apply-container full-height flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">{{ title }}</view>
		</cu-custom>
		<view v-if="status === 1" class="flex-1 before-appy">开始申请</view>
		<view v-if="status === 2" class="flex-1 apply-ing">申请中</view>
		<view v-if="status === 3" class="flex-1 apply-success">审核成功</view>
		<view v-if="status === 4" class="flex-1 apply-fail">审核失败</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				status: 0, // 0 - loading, 1 - 未申请 ， 2 - 申请中， 3 - 审核成功， 4 - 审核失败
				title: '申请成为站长'
			}
		},
		onLoad(options) {
			this.init();
		},
		methods: {
			init() {
				setTimeout(() => {
					this.status = 3;
					this.setTitle(this.status);
				}, 2000);
			},
			// 根据申请状态，改变title文案
			setTitle(status) {
				const confg = {
					0: '申请成为站长',
					1: '申请成为站长',
					2: '审核通过',
					3: '审核驳回'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.apply-container {
		
	}
</style>
