<template>
	<view class="my-shop full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true" :isShow="isShow" :isCustom="true">
			<view slot="content">{{ title }}</view>
		</cu-custom>
		<!-- banner -->
		<view class="banner">
			<image src="@/static/test/7.jpg" mode="aspectFill"></image>
		</view>
		<view v-if="isSearchFocus" class="cu-bar search bg-white strick-top" :style="[{top: menuTop + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="商品名称" confirm-type="search" :value="searchValue" :focus="isSearchFocus" @input="onInput"></input>
			</view>
			<view class="action">
				<text @click="onSearchCancel">取消</text>
			</view>
		</view>
		<view v-else class="flex text-center padding-sm bg-white align-center strick-top" :style="[{top: menuTop + 'px'}]">
			<view class="flex-1" v-for="(item, index) in menu" :key="item.id" @tap="onMenuChange" :data-index="index" :data-id="item.id" :data-item="item">
				<text class="text-bold menu-text" :class="[{active: menuIndex === index}]">{{ item.name }}</text>
			</view>
			<view class="flex-1 serach flex flex-space-between align-center">
				<text class="cuIcon-search margin-right" @tap="showSearchBar"></text>
				<!-- <view>
					<text @tap="onAdd" class="cuIcon-add round text-bold text-green"></text>
				</view> -->
			</view>
		</view>
		<!-- 页面滚动 -->
		<view class="flex-1 bg-white my-shop_content">
			<Goods
				class="goods-item_content"
				v-for="(item, index) in list"
				:key="index"
				:item="item"
				:source="3"
				:status="1"
				:showcaseId="params.showcaseId"
				@refreshList="onDeleteGoods"
			></Goods>
			<Empty v-if="list.length == 0" msg="暂无数据~" />
		</view>
		<!-- <view class="shop-footer">
			<text @tap="onAdd" class="cuIcon-add round text-bold bg-green shadow"></text>
		</view> -->
		<!-- 其它区域 -->
		<NavBar :index="4" :onAdd="onAdd" :showCaseId="params.showcaseId" :idStatus="idStatus"></NavBar>
	</view>
</template>

<script>
	import { onFetchShowcasePage } from '@/api';
	import { onFetchOwnerStateShowcase } from '@/api';
	
	import NavBar from '@/components/navBar';
	import Goods from '@/components/goods';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			NavBar,
			Goods,
			Empty
		},
		data() {
			return {
				isShow: true, // 是否显示菜单， false - 不显示， true - 显示
				title: '',
				menuIndex: 0,
				menuId: 9,
				menuTop: this.CustomBar,
				menu: [{
					id: 9,
					name: '全部'
				}, {
					id: 1,
					name: '圈友商品'
				}, {
					id: 2,
					name: '自营商品'
				}],
				idStatus: 1, // 0 - 拥有者， 1 - 游客
				siteName: '', // 站长名
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					showcaseId: '', // 商品橱窗id
					selType: '' ,// 不传递为全部, 0 普通C, 1 圈友商品, 2 自营商品
					goodsName: '',
				},
				scrollLeft:0,
				list: [], // 订单列表
				isSearchFocus: false, // 是否显示搜索框 并 自动聚焦
				searchValue: '', // 搜索条件
				timer: null,
				time: 1000
			}
		},
		onLoad(options) {
			this.isShow = options.isShow == 1 ? true : false;
			let showcaseId = options.showcaseId || uni.getStorageSync('showcaseId');
			console.log('options.showcaseId', options.showcaseId)
			this.params.showcaseId = showcaseId;
		},
		onShow() {
			const token = uni.getStorageSync('token');
			if (!token) {
				uni.navigateTo({
					url: '/pages/sub/login/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('loginUrl', {
							loginUrl: `/pages/subpackages/site/myShop?showcaseId=${this.params.showcaseId}`,
						})
					}
				})
				return false;
			}
			this.getVisitOwner(this.params.showcaseId);
		},
		onShareAppMessage() {
			const promise = new Promise(resolve => {
				setTimeout(() => {
					resolve({
						title: `${this.siteName} 的商品橱窗`,
						path: `/pages/subpackages/site/myShop?showcaseId=${this.params.showcaseId}`,
					})
				}, 2000)
			})
			return {
				title: '商品橱窗',
				path: `/pages/subpackages/site/myShop?showcaseId=${this.params.showcaseId}`,
				promise 
			}
		},
		onReachBottom() {
			console.log('bottom');
			if (this.hasNext()) {
				this.params.current++;
				this.getShowCaseList();
			}
		},
		methods: {
			// 删除商品
			onDeleteGoods(item) {
				this.initParams();
				// this.list.forEach((v, i) => {
				// 	if (v.goodsCode === item.goodsCode) {
				// 		console.log('i', i);
				// 		this.list.splice(i, 1);
				// 	}
				// })
			},
			onSearchCancel() {
				this.isSearchFocus = false;
				this.searchValue = '';
				this.list = [];
				this.getShowCaseList();
			},
			onInput(e) {
				this.searchValue = e.detail.value;
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.list = [];
					clearTimeout(this.timer);
					this.getShowCaseList();
				}, this.time)
			},
			// 显示搜索栏
			showSearchBar() {
				this.isSearchFocus = true;
			},
			// 切换菜单
			onMenuChange(e) {
				this.list = [];
				this.menuIndex = e.currentTarget.dataset['index'];
				this.menuId = e.currentTarget.dataset['id'];
				this.initParams();
			},
			// 橱窗商品列表
			onAdd(showcaseId, idStatus) {
				let url = '';
				showcaseId ?? this.params.showcaseId;
				idStatus = idStatus ?? this.idStatus;
				// 站长本人
				if (idStatus === 0) {
					url = '/pages/subpackages/site/goodsList';
				} else {
					// url = `/pages/sub/my/goods?source=1&showcaseId=${showcaseId}`;
					url = `/pages/sub/publish/publishGoods?source=1&showcaseId=${showcaseId}`;
				}
				console.log('url', url);
				uni.navigateTo({
					url
				})
			},
			// 获取身份标识
			async getVisitOwner(showcaseId) {
				try {
					const res = await onFetchOwnerStateShowcase({
						showcaseId
					});
					if (res.code === 200) {
					// "status": 1身份状态 0 橱窗拥有者 1 游客
						this.idStatus = res.data.status;
						this.siteName = res.data.ownerUserName;
						if (this.idStatus == 1) {
							this.title = `${this.siteName}的橱窗`;
							this.menu = [{
								id: 9,
								name: '全部'
							}, {
								id: 0,
								name: '我添加的'
							}];
						} else {
							this.title = '我的橱窗'
						}
					}
				} catch(err) {
					console.log('err', err);
				}
				this.initParams();
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams() {
				this.params.selType = this.menuId;
				if (this.params.selType == 9) {
					delete this.params.selType;
				}
				this.params.current = 1;
				this.list = [];
				this.getShowCaseList();
			},
			// 获取商品列表
			async getShowCaseList() {
				uni.showLoading();
				try {
					Object.assign(this.params, {
						goodsName: this.searchValue
					})
					const res = await onFetchShowcasePage(this.params);
					if (res.code === 200) {
						
						this.params.total = res.data.total;
						const list = res.data.records;
						list.forEach((v, i) => {
							let flag = false;
							if (this.idStatus == 1) {
								if (v.isDelete) {
									flag = true;
								}
							} else {
								flag = true;
							}
							list[i]['showDelete'] = flag;
						});
						if (this.params.current === 1) {
							this.list = list;
						} else {
							this.list = this.list.concat(list);
						}
						console.error('this.list', this.list);
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
					}
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			onGoPage(item) {
				if (item['link']) {
					uni.navigateTo({
						url: item.link
					})
				}
			},
			// 触底刷新
			// onRefresh() {
			// 	console.log('bottom');
			// 	if (this.hasNext()) {
			// 		this.params.current++;
			// 		this.getShowCaseList();
			// 	}
			// },
		}
	}
</script>
<style lang="scss" scoped>
	.strick-top {
		position: sticky;
		// z-index: 9;
	}
	.padding-fixed {
		padding-top: 100upx;
	}
	.fixed-shadow {
		box-shadow: 0 0 10upx rgba(0, 0, 0, .5);
	}
	.flex-align-center {
		align-items: center;
	}
	.flex-space-between {
		justify-content: space-between;
	}
	.fixed {
		position: fixed;
		width: 100%;
		z-index: 99;
		&.margin-top-sm {
			margin-top: 0;
			z-index: 999;
			box-shadow: 0 0 20upx rgba(0, 0, 0, .5);
		}
	}
	.my-shop {
		.banner {
			image {
				width: 100%;
				height: 200upx;
			}
		}
		.menu-text {
			position: relative;
			font-size: 28upx;
			&.active {
				color: #000;
				font-size: 30upx;
				&::after {
					content: '';
					position: absolute;
					left: -10upx;
					right: -10upx;
					height: 10upx;
					bottom: -14upx;
					border-radius: 10upx;
					background-color: rgba(255, 196, 91, .8);
					z-index: 0;
				}
			}
		}
		.serach {
			text {
				background-color: #F5F5F5;
				padding: 10upx;
			}
			.cuIcon-search {
				padding: 10upx 20upx;
				background-color: #F5F5F5;
				border-radius: 50upx;
			}
		}
		.goods-item_content {
			display: inline-block;
			width: 50%;
		}
		&_content {
			padding-bottom: 150upx;
		}
		.shop-footer {
			position: fixed;
			bottom: 240upx;
			width: 100%;
			left: 0;
			display: flex;
			justify-content: center;
			text {
				padding: 20upx;
				border-radius: 50%;
				box-shadow: 0 -3rpx 8upx rgba(0, 0, 0, 0.3);
				font-size: 50upx;
			}
		}
	}
</style>

