<template>
	<view>
		<view class="bg-gradual-green">
			<!-- 头部导航 -->
			<TabBar :operateHandle="onChangeTab"></TabBar>
			<!-- 搜索条 -->
			<view class="cu-bar search">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
				</view>
				<view class="action">
					<text>搜索</text>
				</view>
			</view>
		</view>
		
		<!-- 活动轮播 -->
		<!-- 轮播组件 -->
		<Swiper :operateHandle="goAdPage"></Swiper>
		<!-- 金刚位 -->
		<Ad></Ad>
		<!-- 其它区域 -->
		<NavBar :index="2"></NavBar>
	</view>
</template>

<script>
	import TabBar from '@/components/tab';
	import NavBar from '@/components/navBar';
	import Ad from '@/components/ad';
	import Swiper from '@/components/swiper';
	
	export default {
		components:{
			TabBar,
			NavBar,
			Ad,
			Swiper
		},
		data() {
			return {
			}
		},
		onLoad() {

		},
		onPullDownRefresh() {
			this.title = Math.random();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		methods: {
			// // 轮播图
			// cardSwiper(e) {
			// 	this.cardCur = e.detail.current
			// },
			// 点广告图，跳页面
			goAdPage(item) {
				uni.navigateTo({
					url: item.adUrl,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 切换头部导航回调
			onChangeTab(item) {
				uni.showToast({
					title: item.label,
					icon: 'none'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
