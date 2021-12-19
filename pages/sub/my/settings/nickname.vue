<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">更改昵称</view>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<input placeholder="好名字可以让别人更容易记住你哦~" :value="userName" @input="onInput"></input>
			<button type="primary" size="mini" @click="onSave">保存</button>
		</view>
		<view class="text-grey padding-sm">好名字可以让别人更容易记住你哦~</view>
	</view>
</template>

<script>
	import { updateUserInfo } from '@/api/index';
	export default {
		data() {
			return {
				userName: ''
			}
		},
		onLoad(options) {
			this.userName = options.param;
		},
		methods: {
			async onSave() {
				if (!this.userName) {
					uni.showToast({
						title: '名字不能为空哦~',
						icon: 'none'
					});
					return false;
				}
				try {
					const res = await updateUserInfo({
						userName: this.userName
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
				this.userName = e.target.value;
			}
		}
	}
</script>

<style>
</style>
