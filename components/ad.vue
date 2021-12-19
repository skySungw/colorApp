<template>
	<view class="bg-white">
		<view class="flex text-center" v-for="(item, index) in [1, 2]" :key="index">
			<view class="flex-sub bg-blue margin-xs padding-xs" v-for="(ad, adIndex) in ads.slice(index * step, (index + 1) * step)" :key="adIndex" @click="goPage(ad)">
				<image :src="ad.image" class="ad-icon"></image>
				<view>{{ad.label}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				step: 4,
				ads: [{
					label: '版块1',
					image: require('../static/logo.png'),
					link: 'link'
				}, {
					label: '版块2',
					image:  require('../static/logo.png'),
					link: 'link'
				}, {
					label: '版块3',
					image:  require('../static/logo.png'),
					link: 'link'
				}, {
					label: '版块4',
					image:  require('../static/logo.png'),
					link: 'link'
				}, {
					label: '版块5',
					image:  require('../static/logo.png'),
					link: 'link'
				}, {
					label: '版块6',
					image:  require('../static/logo.png'),
					link: 'link'
				}, {
					label: '版块7',
					image:  require('../static/logo.png'),
					link: 'link'
				}, {
					label: '版块8',
					image:  require('../static/logo.png'),
					link: 'link'
				}]
			}
		},
		methods: {
			goPage(item) {
				uni.showToast({
					title: item.label,
					icon: 'none'
				})
			}
		}
	}
</script>
<style>
	.ad-icon {
		width: 72upx;
		height: 72upx;
	}
</style>
