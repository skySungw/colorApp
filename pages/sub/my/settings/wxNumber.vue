<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">更改微信号</view>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<input placeholder="添加一个微信号,别人才会联系您哦~" :value="userName" @input="onInput"></input>
			<button type="primary" size="mini" @click="onSave">保存</button>
		</view>
		<view class="text-grey padding-sm">添加一个微信号,别人才会联系您哦~</view>
	</view>
</template>

<script>
	import { updateUserInfo } from '@/api/index';
	export default {
		data() {
			return {
				wxNumber: ''
			}
		},
		onLoad(options) {
			this.wxNumber = options.param;
		},
		methods: {
			async onSave() {
				if (!this.wxNumber) {
					uni.showToast({
						title: '微信号不能为空哦~',
						icon: 'none'
					});
					return false;
				}
				try {
					const res = await updateUserInfo({
						wxNumber: this.wxNumber
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							duration: 2000,
							complete() {
								setTimeout(() => {
									uni.navigateBack();
								}, 2000);
							}
						});
						
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			onInput(e) {
				console.log('e', e.target.value);
				this.wxNumber = e.target.value;
			}
		}
	}
</script>

<style>
</style>
