<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">更改微信号</view>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<input placeholder="添加一个微信号,别人才会联系您哦~" :value="wxNumber" @input="onInput"></input>
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
				wxNumber: '',
				source: '', // source - 1 发布商品页
			}
		},
		onLoad(options) {
			this.wxNumber = options.param;
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			this.eventChannel = eventChannel;
			eventChannel.on('setSource', data => {
				this.sourc = data;
			})
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
							complete: () => {
								setTimeout(() => {
									if (this.eventChannel) {
										this.eventChannel.emit('getSetting', {
											data: this.wxNumber
										});
									}
									uni.navigateBack({
										delta: 1
									})
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
