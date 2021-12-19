<template>
	<view class="empty-container text-center padding-bottom">
		<view>
			<image src="/static/empty-log.png" mode="aspectFit"></image>
		</view>
		<view class="text-grey text-sm">{{ msg }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			msg: {
				type: String,
				default: '暂无数据'
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>
<style scoped lang="scss">
	.empty-container {
			image {
			}
	}
</style>
