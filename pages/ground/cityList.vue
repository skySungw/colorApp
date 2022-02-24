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
				<view class="search-form round">
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
					<view class="card-list_container__item goods-type" v-for="(item, index) in list" :key="index">
						<!-- 头像区 -->
						<view class="card-header flex">
							<!-- 头像 -->
							<view class="flex flex-align-center">
								<view class="cu-avatar round" :style="'background-image:url(' + item.userWxHeadImg + ')'"></view>
							</view>
							<!-- 名称 -->
							<view class="padding-left-sm">
								<view>
									<text class="text-bold">{{ item.userName }}</text>
								</view>
								<view>{{ item.time }}</view>
							</view>
						</view>
						<!-- 帖子内容区 -->
						<view v-if="item.collectionType == 1" class="card-content padding-top">
							<!-- 文案区域 -->
							<view class="card-content_text text-black">
								<view class="cu-tag bg-green light radius sm">闲置</view>
								{{ item.articleInfo.articleDesc }}
								<text class="text-cyan margin-left-sm">全文</text>
							</view>
							<!-- 图片区域 -->
							<view class="card-content_image margin-top-sm" v-if="item.articleInfo.articleContentImg.length">
								<view class="grid col-3 grid-square flex-sub">
									<view class="bg-img" v-for="(imgItem, index) in item.articleInfo.articleContentImg" :key="index" @click="onViewImage" :data-list="item.articleInfo.articleContentImg" :data-url="imgItem">
										<image :src='imgItem' mode='aspectFill'></image>
									</view>
								</view>
							</view>
						</view>
						<!-- 商品内容区 -->
						<view v-if="item.collectionType == 0" class="card-content padding-top">
							<view class="goods-container padding-sm bg-gray">
								<view class="goods-container__title flex">
									<view class="flex-1 text-bold">
										{{ item.goodsInfo.goodsName }}
									</view>
									<view class="text-red text-bold">
										￥{{ item.goodsInfo.goodsPrice }}
									</view>
								</view>
								<view class="goods-container__info flex">
									<view class="cu-avatar radius xl" :style="'background-image:url(' + item.goodsInfo.goodsImgArr[0] + ');'"></view>
									<view class="flex-1 padding-left-sm">
										{{ item.goodsInfo.goodsDesc || '我是商品描述，少了一些，看下长度，是否需要处理一下'}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 无更多数据 -->
					<view v-if="noMoreFlag" class="text-center padding-sm padding-bottom-xl">我是有底线的~</view>
				</scroll-view>
			</view>
		</block>
		<Empty v-if="!initPage && list.length == 0" msg="暂无数据~" />
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
	import { onFetchCollectionPage, saveUserLocation, selectAddressByLat } from '@/api';
	import { handlePublishTimeDesc } from '@/utils';

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
				imgList: [],
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
			this.init();
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
		},
		onUnload() {
			// uni.$off('operateHandle');
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: '刷新中...'
			});
			setTimeout(() => {
				uni.stopPullDownRefresh();
				this.initParams();
			}, 2000);
		},
		methods: {
			// 初始化页面经纬度等数据
			init() {
				// 获取经纬度，并初始化列表数据
				uni.showLoading();
				this.params.lat = uni.getStorageSync('lat');
				this.params.lng = uni.getStorageSync('lng');
				const addressInfo = uni.getStorageSync('addressInfo')
				if (!addressInfo?.lat) {
					this.getSystemLocation((res) => {
						this.params.lat = res.latitude;
						this.params.lng = res.longitude;
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
			goPage(e) {
				const item = e.currentTarget.dataset['item'];
				uni.navigateTo({
					url: '/pages/sub/article/article?id='+ item.articleCode
				})
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
			// 地图选位置
			onSelectAddress() {
				uni.navigateTo({
					url: '/pages/subpackages/address/selectAddress',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						onChangeAddress: ({data}) => {
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
					this.publishShow =  true;
				} else {
					if (this.userId == 0) {
						this.publishShow =  true;
					} else {
						this.publishShow = false;
					}
				}
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams() {
				this.list = [];
				this.params.current = 1;
				this.getArticleList(true);
			},
			onChangeParams(type) {
				this.initParams();
				// 判断是否展示发布按钮
				this.onPublishShow();
			},
			// 获取帖子页面
			async getArticleList(flag) {
				if (!flag) {
					uni.showLoading({
						title: '加载中...'
					});
				}
				
				try {
					let res = null;
					res = await onFetchCollectionPage(this.params);
					if (res.code === 200) {
						this.initPage = false;
						this.params.total = res.data.total;
						let list = res.data.records;
						list.forEach((v, i) => {
							list[i]['time'] = handlePublishTimeDesc(v.createTime);
							if (v['goodsInfo']) {
								list[i]['goodsInfo']['goodsImgArr'] = JSON.parse(v.goodsInfo.goodsImg)
							}
						})
						if (this.params.current === 1) {
							this.list = list;
						} else {
							this.list = this.list.concat(list);
						}
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						// console.log("this.list", this.list);
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
			onViewImage(e) {
				const dataSet = e.currentTarget.dataset;
				this.imgList = dataSet.list;
				
				uni.previewImage({
					urls: this.imgList,
					current: dataSet.url
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.search {
		height: 100upx;
	}
	.card-list_container {
		padding-bottom: 100upx;
		overflow: hidden;
		background: #f5f5f5;
		&__item {
			background-color: #FFFFFF;
			margin-top: 20upx;
			padding: 20upx;
			.card-content {
				&_text {
					display: -webkit-box;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					.cu-tag {
						vertical-align: unset;
						margin-right: 10upx;
					}
				}
				.goods-container {
					&__info {
						margin-top: 5upx;
					}
				}
			}
		}
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
