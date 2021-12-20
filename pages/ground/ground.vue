<template>
	<!-- <view :style="[{'padding-top':customBar + 'px', 'height': '100vh'}, {background: '#fff'}]"> -->
	<view class="full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<view slot="serach">
				<view class="location flex" @tap="onSelectAddress">
					<image class="location__img" src="/static/index-location.png"></image>
					<view class="location__title">{{ addressData.title ? addressData.title : '定位中...' }}</view>
					<image class="location__arrow" src='/static/bottom-arrow.png'></image>
				</view>
			</view>
		</cu-custom>
		<view class="bg-gradual-green">
			<!-- 搜索条 -->
			<view class="cu-bar search">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input type="text" :placeholder="placeholder" :disabled="true" confirm-type="search" @click="goAdPage({
						link: '/pages/sub/search/search?type='+ activeIndex
					})"></input>
				</view>
			</view>
		</view>
		<!-- 帖子列表 -->
		<block v-if="list.length > 0">
			<view class="card-list_container flex-1" v-if="activeIndex == 0">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<Card v-for="(item, index) in list" :key="index" :item="item" :source="1"></Card>
					<view v-if="noMoreFlag" class="text-center padding-sm">我是有底线的~</view>
				</scroll-view>
				<!-- <Card v-for="(item, index) in list" :key="index" :item="item" :source="1"></Card> -->
			</view>
		</block>
		<Empty v-if="!initPage && list.length == 0" msg="暂无数据~" />
		<!-- <view class="card-list_container flex-1" v-if="activeIndex == 1">
			<Card v-for="(item, index) in list" :key="index" :item="item" :source="1"></Card>
		</view>
		<view class="card-list_container flex-1" v-if="activeIndex == 2">
			<ActiveCard v-for="(item, index) in list" :key="index" :item="item"></ActiveCard>
		</view> -->
		<!-- 发布按钮 -->
		<!-- <view class="publish bg-gradual-green" v-if="publishShow"  @click="onPublish">发布</view> -->
		<!-- <view class="publish" @click="onPublish">发布</view> -->
		<!-- 其它区域 -->
		<NavBar :index="1"></NavBar>
	</view>
</template>

<script>
	import TabBar from '@/components/tab';
	import NavBar from '@/components/navBar';
	import Card from '@/components/card';
	import ActiveCard from '@/components/activeCard';
	import Empty from '@/components/empty.vue';
	import { onFetchArticle, onFetchActivity, saveUserLocation, selectAddressByLat } from '@/api';
	
	export default {
		components:{
			TabBar,
			NavBar,
			Card,
			ActiveCard,
			Empty
		},
		data() {
			return {
				scrollTop: 0,
				old: {
						scrollTop: 0
				},
				addressData: {
					title: '定位中...',
				},
				initPage: true, // 是否获取完数据
				placeholder: '搜索文章',
				token: null, 
				publishShow: false, // 显示发布按钮
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					articleType: 0, // 0 - 正常帖子，1 - 官方帖子
					lat: '',
					lng: ''
				},
				customBar: this.CustomBar + this.StatusBar + 40,
				list: [], // 帖子列表
				activeIndex: 0,
				dictList: [], // 小区列表
				noMoreFlag: false, // 是否有更多数据
			}
		},
		onLoad() {
			// 注册事件
			uni.$on('operateHandle', (item) => {
				this.activeIndex = item.index;
				this.onChangeParams(this.activeIndex);
				if (this.activeIndex == 2) {
					this.placeholder = '搜索活动';
				} else {
					this.placeholder = '搜索文章';
				}
			});
			this.init();
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
		},
		onUnload() {
			uni.$off('operateHandle');
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
				this.initParams();
			}, 2000);
		},
		// onReachBottom() {
		// 	if (this.hasNext()) {
		// 		this.params.current++;
		// 		this.getArticleList();
		// 	}
		// },
		methods: {
			// 初始化页面经纬度等数据
			init() {
				// 获取经纬度，并初始化列表数据
				uni.showLoading();
				this.params.lat = uni.getStorageSync('lat');
				this.params.lng = uni.getStorageSync('lng');
				const addressInfo = uni.getStorageSync('addressInfo')
				console.log('addressInfo', addressInfo)
				if (!addressInfo?.lat) {
					console.log('kkkk', addressInfo)
					this.getSystemLocation((res) => {
						this.params.lat = res.latitude;
						this.params.lng = res.longitude;
						console.log('lat', res)
						uni.setStorageSync('lat', res.latitude);
						uni.setStorageSync('lng', res.longitude);
						uni.hideLoading();
						// 获取小区信息
						this.getDictList();
						// 获取帖子列表
						this.initParams();
					}, () => {
						this.addressData.title = '选择小区'
						uni.hideLoading();
						this.initParams();
					});
				} else {
					this.addressData = addressInfo;
					uni.hideLoading();
					// // 获取小区信息
					// this.getDictList();
					this.initParams();
				}
			},
			// 根据经纬度获取小区信息
			async getDictList() {
				try {
					const res = await selectAddressByLat({
						lat: this.params.lat,
						lng: this.params.lng,
						size: 10,
						current: 1
					});
					if (res.code === 200) {
						this.dictList = res.data.records;
						if (this.dictList.length > 0) {
							this.addressData = this.dictList[0];
							this.addressData.title = this.dictList[0].title;
							uni.setStorageSync('addressInfo', this.addressData);
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 滚动到顶部
			upper(e) {
					// console.log('upper', e)
			},
			// 滚动到底部
			lower(e) {
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getArticleList();
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
			onSelectAddress() {
				uni.navigateTo({
					url: '/pages/subpackages/address/selectAddress',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						onChangeAddress: ({data}) => {
							console.log('onChangeAddress', data)
							console.log('this.addressData', this.addressData);
							this.addressData.title = data.title;
							this.addressData.lng = data.lng;
							this.addressData.lat = data.lat;
							uni.setStorageSync('addressInfo', this.addressData);
						}
					}
				})
			},
			onPublishShow() {
				if (!this.token) {
					this.publishShow = false;
					return false;
				}
				if (this.activeIndex == 0) {
					console.log('1')
					this.publishShow =  true;
				} else {
					console.log('2')
					if (this.userId == 0) {
						console.log('3')
						this.publishShow =  true;
					} else {
						console.log('4')
						this.publishShow = false;
					}
				}
				console.log("this.publishShow", this.publishShow)
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams() {
				this.params.current = 1;
				this.params.articleType = this.params.articleType || 0;
				this.getArticleList();
			},
			onChangeParams(type) {
				// type 0 - 普通帖子, 1 - 官方帖子
				this.params.articleType = type;
				console.log('type', type);
				this.initParams();
				// 判断是否展示发布按钮
				this.onPublishShow();
			},
			// 获取帖子页面
			async getArticleList() {
				uni.showLoading();
				try {
					let res = null;
					if (this.params.articleType === 2) {
						res = await onFetchActivity(this.params);
					} else {
						res = await onFetchArticle(this.params);
					}
					console.log('res', res)
					if (res.code === 200) {
						this.initPage = false;
						this.params.total = res.data.total;
						if (this.params.current === 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						console.log("this.list", this.list);
					}
					uni.hideLoading();
				} catch(err) {
					this.initPage = false;
					uni.hideLoading();
					console.log('errs', err);
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
				let url = '/pages/sub/publish/';
				// 活动
				if (this.activeIndex == 2) {
					url += 'publishActive';
				} else {
					// 非活动
					url += 'index';
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.search {
		height: 100upx;
	}
	.card-list_container {
		padding-bottom: 150upx;
		overflow: hidden;
	}
	.location {
		align-items: center;
		padding-left: 10upx;
	}
	.location__img {
	  width: 36upx;
	  height: 36upx;
	  padding-right: 8upx;
	  flex-shrink: 0;
	  margin-top: 2upx;
	}
	
	.location__arrow {
	  width: 14upx;
	  height: 14upx;
	  flex-shrink: 0;
	  margin-left: 10upx;
	}
</style>
