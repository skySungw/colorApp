<template>
	<view class="card-list-container">
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">圈子</block>
		</cu-custom>
		<!-- 内容区域 -->
		<view>
			<CardList></CardList>
		</view>
		
		
		<!-- 其它区域 -->
		<NavBar :index="2"></NavBar>
	</view>
</template>

<script>
	import NavBar from '@/components/navBar';
	import CardList from '@/components/cardList';
	export default {
		components:{
			NavBar,
			CardList
		},
		data() {
			return {
				
			}
		},
		onPullDownRefresh() {
			uni.showToast({
				title: '加载中...',
				icon: 'loading'
			});
			setTimeout(() => {
				uni.stopPullDownRefresh();
				uni.hideLoading();
			}, 2000);
		},
		onReachBottom() {
			uni.showToast({
				title: '我是有底线的',
				icon: 'none'
			});
		}
	}
</script>

<style scoped>
	.card-list-container {
		padding-bottom: 100upx;
	}
</style>
