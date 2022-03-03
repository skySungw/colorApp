<template>
	<view class="full-height absolute flex flex-direction bg-white">
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			this.url = uni.getStorageSync('url') || '';
			console.log('this.url', this.url);
		}
	}
</script>

<style>
</style>
