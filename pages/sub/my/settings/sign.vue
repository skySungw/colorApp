<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">更改签名</view>
		</cu-custom>
		<view class="cu-form-group margin-sm">
			<textarea :maxlength="max" placeholder="留下点什么吧~" :value="userDesc" @input="onInput"></textarea>
		</view>
		<view class="text-right">
			<button class="margin-lr-sm" type="primary" size="mini" @click="onSave">保存</button>
		</view>
	</view>
</template>

<script>
	import { updateUserInfo } from '@/api';
	export default {
		data() {
			return {
				userDesc: '',
				max: 100
			}
		},
		onLoad(options) {
			this.userDesc = options.param || '';
		},
		methods: {
			onInput(e) {
				this.userDesc = e.target.value;
			},
			async onSave() {
				if (!this.userDesc) {
					uni.showToast({
						title: '签名不能为空哦~',
						icon: 'none'
					});
					return false;
				} else {
					if (this.userDesc.length > this.max) {
						uni.showToast({
							title: '签名长度不能超过' + this.max + '个',
							icon: 'none'
						});
						return false;
					}
				}
				try {
					const res = await updateUserInfo({
						userDesc: this.userDesc
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
			}
		}
	}
</script>

<style>
</style>
