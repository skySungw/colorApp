<template>
	<view class="full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="content">{{ title }}</view>
		</cu-custom>
		<view class="flex-1 overflow-scroll-y">
			<yinsi v-if="index == 1"></yinsi>
		</view>
	</view>
</template>

<script>
	import yinsi from './components/yinsi.vue';
	export default {
		props: {
			index: {
				type: Number,
				default: 1
			}
		},
		components: {
			yinsi
		},
		data() {
			return {
				title: ''
			}
		},
		onShow() {
			this.setTitle();
		},
		methods: {
			setTitle() {
				const TITLE = {
					1: '隐私协议'
				}
				console.log('title', TITLE);
				console.log('TItile', TITLE[this.index])
				this.title = TITLE[this.index];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.overflow-scroll-y {
		overflow-y: auto;
	}
</style>
