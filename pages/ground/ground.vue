<template>
	<!-- <view :style="[{'padding-top':customBar + 'px', 'height': '100vh'}, {background: '#fff'}]"> -->
	<view class="full-height absolute flex flex-direction bg-white">
		<view class="bg-gradual-green">
			<cu-custom :isBack="false">
				<view slot="serach">
					<view class="location flex" @tap="onSelectAddress">
						<image class="location__img" src="/static/index-location.png"></image>
						<view class="location__title">{{ addressData.title ? addressData.title : '定位中...' }}</view>
						<image class="location__arrow" src='/static/bottom-arrow.png'></image>
					</view>
				</view>
			</cu-custom>
			<view>
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
			<view class="topic-list flex" v-if="menuList.length > 0">
				<view class="cu-tag line-grey round text-white" v-for="(item, index) in menuList" :key="index" :data-item="item" @tap="tabSelect"># {{ item.name }}</view>
			</view>
		</view>
		
		<!-- 帖子列表 -->
		<block v-if="list.length > 0">
			<view class="card-list_container flex-1" v-if="activeIndex == 0">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view style="display:none">
						<image v-for="(item, index) in images" :key="item.id" :id="item.id" :src="item.pic" @load="onImageLoad"></image>
					</view>
					<!-- 瀑布渲染 -->
					<view class="img_item" v-for="(colItem, colIndex) in cols" :key="colIndex">
						<view v-for="(item, index) in colItem" :key="item.id" @tap="goPage" :data-item="item">
							<image class="img-face" :src="item.pic" :style="[{'height':item.height + 'px'}]"></image>
							<view class="img-topic flex">
								<view class="img-topic_tag flex align-center" v-for="(topicItem, topicIndex) in item.articleTopic" :key="topicIndex">
									<text>#</text> {{ topicItem.name }}
								</view>
							</view>
							<view class="card-title">{{ item.articleTitle }}</view>
							<view class="card-info flex flex-bettwen-space margin-bottom-sm">
								<view class="card-header text-sm text-gray flex align-center">
									<image :src="item.wxHeadImg"></image>
									<text>{{ item.memberName }}</text>
								</view>
								<view>
									<!-- <view class="cu-tag line-grey sm round" @tap.stop="onZan" :data-item="item" :data-colindex="colIndex" :data-index="index">
										<text
											class="margin-right-sm"
											:class="[{'cuIcon-appreciatefill text-red': item.articleDetail.isLikes}, {'cuIcon-appreciate text-gray': !item.articleDetail.isLikes}]"
										></text>
										{{ item.articleDetail.likesCount }}
									</view> -->
								</view>
							</view>
						</view>
					</view>
					<!-- <Card v-for="(item, index) in list" :key="index" :item="item" :source="1"></Card> -->
					<view v-if="noMoreFlag" class="text-center padding-sm padding-bottom-xl">我是有底线的~</view>
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
		<NavBar :index="2"></NavBar>
	</view>
</template>

<script>
	import TabBar from '@/components/tab';
	import NavBar from '@/components/navBar';
	import Card from '@/components/card';
	import ActiveCard from '@/components/activeCard';
	import Empty from '@/components/empty.vue';
	import { onFetchArticle, onFetchActivity, saveUserLocation, selectAddressByLat, onFetchTopic } from '@/api';
	
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
				col1H: 0,
				col2H: 0,
				menuList: [], // 菜单
				imgWidth: 0, // 图片宽度
				cols: [[], []],
				loadingCount: 0,
				images: [],
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
			uni.getSystemInfo({
				success: (res) => {
					let ww = res.windowWidth;
					let wh = res.windowHeight;
					let imgWidth = ww * 0.48;
					let scrollH = wh;
					// 图片宽度
					this.imgWidth = imgWidth;
					let topicList = uni.getStorageSync('topicList');
					// 查询话题
					this.menuList = topicList;
					// this.onGetTopic();
					// this.loadImages();
					this.init();
				}
			});
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
			tabSelect(e) {
				const id = e.currentTarget.dataset['item'].id;
				console.log('id', id);
				uni.navigateTo({
					url: `/pages/subpackages/subject/index?id=${id}`
				})
			},
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
			onZan(e) {
				const data = e.currentTarget.dataset
				const { item, colindex, index } = data;
				this.cols[colindex][index].articleDetail.isLikes = !item.articleDetail.isLikes;
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
			// 整合图片
			loadImages(list) {
				list.forEach((v, i) => {
					list[i].pic = v.articleContentImg[0];
					list[i].height = 0;
				});
				let images = list;
				let baseId = "img-" + (+new Date());
				for (let i = 0; i < images.length; i++) {
					images[i].id = baseId + "-" + i;
				}
				this.loadingCount = images.length;
				this.images = images;
			},
			// 页面图片，分组
			onImageLoad(e) {
				let imageId = e.currentTarget.id;
				let oImgW = e.detail.width;         //图片原始宽度
				let oImgH = e.detail.height;        //图片原始高度
				let imgWidth = this.imgWidth;  //图片设置的宽度
				let scale = imgWidth / oImgW;        //比例计算
				let imgHeight = oImgH * scale;      //自适应高度
			
				let images = this.images;
				let imageObj = null;
			
				for (let i = 0; i < images.length; i++) {
						let img = images[i];
						if (img.id === imageId) {
								imageObj = img;
								break;
						}
				}
			
				imageObj.height = imgHeight;
			
				let loadingCount = this.loadingCount - 1;
				let col1 = this.cols[0];
				let col2 = this.cols[1];
			
				if (this.col1H <= this.col2H) {
						this.col1H += imgHeight;
						col1.push(imageObj);
				} else {
						this.col2H += imgHeight;
						col2.push(imageObj);
				}
			
				this.loadingCount = loadingCount;
				this.cols[0] = col1;
				this.cols[1] = col2;
			
				if (!loadingCount) {
						this.images = [];
				}
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
				this.images = [];
				this.col1H = 0;
				this.col2H = 0;
				this.cols = [[], []];
				this.loadingCount = 0;
				this.params.current = 1;
				this.params.articleType = this.params.articleType || 0;
				this.getArticleList(true);
			},
			onChangeParams(type) {
				// type 0 - 普通帖子, 1 - 官方帖子
				this.params.articleType = type;
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
					if (this.params.articleType === 2) {
						res = await onFetchActivity(this.params);
					} else {
						res = await onFetchArticle(this.params);
					}
					if (res.code === 200) {
						this.initPage = false;
						this.params.total = res.data.total;
						
						// 整合图片
						this.loadImages(res.data.records);
						if (this.params.current === 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
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
	.topic-list {
		overflow-x: auto;
		padding: 0 20upx 10upx;
		// .cu-tag {
		// 	margin-right: 20upx;
		// 	margin-left: 0;
		// }
	}
	.card-list_container {
		padding-bottom: 100upx;
		overflow: hidden;
		.img_item {
			width: 48%;
			margin: 1%;
			display: inline-block;
			vertical-align: top;
			.img-topic {
				flex-wrap: wrap;
				&_tag {
					margin-right: 5upx;
					padding: 5upx 0;
					font-size: 22upx;
					color: #9D9FB8;
					font-weight: bold;
					text {
						display: inline-block;
						font-weight: bold;
						font-size: 16upx;
						width: 26upx;
						height: 26upx;
						text-align: center;
						line-height: 26upx;
						background-color: #000;
						color: #fff;
						border-radius: 50%;
						margin-right: 5upx;
					}
				}
			}
			.img-face {
				border-radius: 10upx;
			}
			.card-title {
				font-weight: bold;
				color: #333;
				font-size: 24upx;
				margin: 10upx 0;
			}
			.card-info {
				.card-header {
					font-size: 20upx;
					color: #666;
					image {
						border-radius: 50%;
						width: 30upx;
						height: 30upx;
						margin-right: 10upx;
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
