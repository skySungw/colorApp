<template>
	<view class="full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<view slot="serach">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" placeholder="搜索宝贝" :disabled="true" confirm-type="search" @click="goAdPage({
						link: '/pages/sub/search/goodsSearch'
					})"></input>
				</view>
			</view>
		</cu-custom>
		
		<!-- 宝贝列表 -->
		<view class="card-list_container flex-1" v-if="list.length > 0">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
				<Goods v-for="(item, index) in list" :key="index" :item="item" :source="0" :status="0"></Goods>
				<view v-if="noMoreFlag" class="text-center padding-sm">我是有底线的~</view>
			</scroll-view>
			<!-- <GoodsList :list="list" :lower="lower" :scroll="scroll" :upper="upper" :scrollTop="scrollTop"></GoodsList> -->
		</view>
		
		<Empty v-if="list.length == 0" msg="暂无数据~" />
		<!-- 发布按钮 -->
		<!-- <view class="publish bg-gradual-green" v-if="publishShow" @click="onPublish">发布</view> -->
		<!-- 其它区域 -->
		<NavBar :index="2"></NavBar>
	</view>
</template>

<script>
	import { onFetchGoodsList } from '@/api';
	import NavBar from '@/components/navBar';
	import Goods from '@/components/goods';
	import Empty from '@/components/empty.vue';
	
	export default {
		components:{
			NavBar,
			Goods,
			Empty
		},
		data() {
			return {
				scrollTop: 0,
				old: {
						scrollTop: 0
				},
				token: null,
				publishShow: false, 
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					lat: '',
					lng: ''
				},
				list: [], // 宝贝列表
				noMoreFlag: false, // 是否有更多数据
			}
		},
		onLoad(options) {
			this.getSystemLocation((res) => {
				this.params.lat = res.latitude;
				this.params.lng = res.longitude
				  console.log('当前位置的经度：' + res.longitude);
				  console.log('当前位置的纬度：' + res.latitude);
					uni.setStorageSync('lat', res.latitude);
					uni.setStorageSync('lng', res.longitude);
				this.initParams();
			}, () => {
				this.initParams();
			});
		},
		onShow() {
			this.token = uni.getStorageSync('token');
			// this.onPublishShow();
			// uni.getLocation({
			//     type: 'wgs84',
			//     success: (res) =>{
			// 			this.params.lat = res.latitude;
			// 			this.params.lng = res.longitude
			//         console.log('当前位置的经度：' + res.longitude);
			//         console.log('当前位置的纬度：' + res.latitude);
			// 			this.initParams();
			//     },
			// 		fail: () => {
			// 			this.initParams();
			// 		}
			// });
		},
		onPullDownRefresh() {
			this.title = Math.random();
			setTimeout(() => {
				uni.stopPullDownRefresh();
				this.initParams();
			}, 2000);
		},
		methods: {
			// 滚动到顶部
			upper(e) {
					// console.log('upper', e)
			},
			// 滚动到底部
			lower(e) {
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getGoodsList();
				} else {
					this.noMoreFlag = true;
				}
			},
			// 滚动事件
			scroll(e) {
					this.old.scrollTop = e.detail.scrollTop
			},
			// 到顶
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
						this.scrollTop = 0
				});
				uni.showToast({
						icon:"none",
						title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			onPublishShow() {
				if (!this.token) {
					this.publishShow = false;
				} else {
					this.publishShow = true;
				}
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams() {
				this.params.current = 1;
				this.params.total = 0;
				this.list = [];
				this.getGoodsList();
			},
			// 获取商品列表
			async getGoodsList() {
				try {
					const res = await onFetchGoodsList(this.params);
					if (res.code === 200) {
						this.params.total = res.data.total;
						this.list = this.list.concat(res.data.records);
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						console.log("this.list", this.list);
					}
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			// 跳页面
			goAdPage(item) {
				console.log('item', item);
				uni.navigateTo({
					url: item.link,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 发布
			onPublish() {
				let url = '/pages/sub/publish/publishGoods';
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.search {
		height: 100rpx;
	}
	.card-list_container {
		padding-bottom: 150upx;
		overflow: hidden;
	}
</style>
