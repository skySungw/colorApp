<template>
	<view class="goods-container solid-bottom">
		<!-- 我的主页 -->
		<view v-if="source == 0" class="goods-item flex" @click="onGoodsDetail">
			<image class="big" :src="item.goodsImgArray[0]" :lazy-load="true"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
				<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
				<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
			</view>
		</view>
		<!-- 商品收藏 -->
		<view v-if="source == 5" class="goods-item flex" @click="onGoodsDetail">
			<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
				<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
				<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
				<view class="goods-item_price text-red text-bold">
					<text class="cu-tag radius margin-right-sm" :class="goodsState.className">{{ goodsState.label }}</text>
					<text>￥ {{ item.goodsPrice }}</text>
				</view>
			</view>
		</view>
		<!-- 产品库列表 -->
		<view v-if="source == 2" class="relative">
			<view class="products-content" @tap="onGoodsDetail">
				<image :src="item.goodsImgArray[0]" mode="aspectFill" :lazy-load="true"></image>
				<view>
					<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
				<view class="text-grey text-bold">已售 {{ item.salesCount }} 件</view>
			</view>
			<view class="delete-absolute delete">
				<text v-if="!operate" class="cuIcon-roundadd lg text-gray add-goods-icon" @tap="addGoods"></text>
				<text v-else class="cuIcon-delete lg text-gray add-goods-icon" @tap="deleteGoods(true)"></text>
			</view>
		</view>
		<!-- <view v-if="source == 2" class="goods-item flex">
			<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
				<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
				<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
			</view>
			<view class="flex align-center">
				<text v-if="!operate" class="cuIcon-roundadd lg text-gray add-goods-icon" @tap="addGoods"></text>
				<text v-else class="cuIcon-delete lg text-gray add-goods-icon" @tap="deleteGoods(true)"></text>
			</view>
		</view> -->
		<!-- 橱窗列表，圈友商品 -->
		<view v-if="source == 3 && goodsType == 1" class="relative shop-products">
			<view class="products-content" @tap="onGoodsDetail">
				<image :src="item.goodsImgArray[0]" mode="aspectFill" :lazy-load="true"></image>
				<view>
					<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
				<!-- <view class="text-grey text-bold">已售 {{ item.salesCount }} 件</view> -->
			</view>
			<view v-if="operate" class="delete-absolute delete">
				<text class="cuIcon-roundclosefill lg text-gray add-goods-icon" @tap="deleteGoods(false)"></text>
			</view>
		</view>
		<!-- 橱窗列表，京东商品 -->
		<view v-if="source == 3 && goodsType == 2" class="relative shop-products">
			<view class="products-content" @tap="onGoodsDetail">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg" mode="aspectFill" :lazy-load="true"></image>
				<view class="flex bg-yellow text-red text-sm text-center text-bold flex-align-center">
					<view class="flex-1">佣金 ￥3.99</view>
					<view>|</view>
					<view class="flex-1">佣金比例 2%</view>
				</view>
				<view>
					<text class="text-bold margin-none text-lg">名名名</text>
				</view>
				<view>
					<text class="text-xl text-red text-bold padding-right-sm">￥33</text>
					<text class="text-sm text-grey text-through">￥45</text>
				</view>
				<view class="text-grey text-bold">已售 {{ item.salesCount }} 件</view>
			</view>
			<view v-if="operate" class="delete-absolute delete">
				<text class="cuIcon-roundclosefill lg text-gray add-goods-icon" @tap="deleteGoods(false)"></text>
			</view>
		</view>
		<!-- <view v-if="source == 3" class="goods-item flex">
			<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
				<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
				<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
			</view>
			<view class="flex align-center">
				<text v-if="operate" class="cuIcon-delete lg text-gray add-goods-icon" @tap="deleteGoods(false)"></text>
			</view>
		</view> -->
		<!-- 个人发布到站长橱窗，选择商品列表 -->
		<view v-if="source == 4" class="goods-item flex" @tap="onGoodsDetail">
			<!-- <view class="flex align-center padding-right-sm" @tap="onGoodsChecked">
				<view class="icon padding-right-sm" :class="[{'cuIcon-roundcheckfill text-green': goodsChecked}, {'cuIcon-roundcheck text-gray': !goodsChecked}]"></view>
			</view> -->
			<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
				<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
				<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
			</view>
		</view>
		<!-- 我的-我的商品 -->
		<view v-if="source == 1">
			<view class="goods-item flex" @click="onGoodsDetail">
				<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
				<view class="goods-item_container flex-1 padding-left-xs">
					<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
					<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
					<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
					<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
				</view>
			</view>
			<view class="text-right">
				<!-- 暂时下架编辑功能 -->
				<text v-if="status == 0" @tap="onEdit" class="cu-tag line-green radius margin-right-sm text-green">编辑</text>
				<text v-if="status == 0" @tap="onAdd(1)" class="cu-tag line-cu-tag white radius margin-right-sm text-cu-tag white">上架</text>
				
				<text v-if="status == 1" @tap="onAdd(0)" class="cu-tag line-cu-tag white radius margin-right-sm text-cu-tag white">下架</text>
				<!-- <text @tap="onAdd(2)" class="cu-tag line-gray radius text-gray">删除</text> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	import { onUpdateGoodsState, onAddGoodsToShowCase, onRemoveGoodsToShowCase } from '@/api';
	export default {
		props: {
			index: {
				default: 0,
				type: Number // 商品索引
			},
			item: {
				default: 0,
				type: Object
			},
			source: {
				default: 0, // 来源 1 - 我的-我的商品列表， 0 - 我的-个人主页-我发布的, 2 - 产品库列表，3 - 橱窗列表, 4 - 个人发布到橱窗商品
				type: Number
			},
			status: {
				default: 0, // 状态 0 下架 1 上架 2 已售出
				type: Number 
			},
			showcaseId: {
				default: null, // 橱窗id ''
				type: Number
			},
			goodsType: {
				default: 1, // 商品类型 1 - 圈友商品，2 - 京东商品
				type: Number
			}
		},
		data() {
			return {
				operate: false ,// 操作
				goodsState: '' // 商品状态 0 - 未上架， 1 - 上架中， 2 - 已售出
			}
		},
		created() {
			switch(this.source) {
				case 2: // 产品库来源
					this.operate = this.item.isAdd;
					break;
				case 3: // 橱窗来源，判断是否是当前C的产品，如果是，可以操作删除
					this.operate = this.item.showDelete;
					console.log('this.op', this.operate);
					break;
			}
			// 收藏商品页，显示商品状态
			if (this.source === 5) {
				const config = {
					0: {
						className: 'line-gray',
						label: '未上架'
					},
					1: {
						className: 'bg-green',
						label: '出售中'
					},
					2: {
						className: 'bg-gray',
						label: '已售出'
					}
				}
				this.goodsState = config[this.item.goodsState];
			}
		},
		methods: {
			// 删除橱窗商品
			deleteGoods(flag) {
				console.log('flag', flag);
				uni.showModal({
					title: '操作',
					content: '确认删除商品',
					confirmText: '确认',
					cancelText: '取消',
					success: (res) => {
						console.log('res', res);
						if (res.confirm) {
							this.onDeleteGoodsByShop(flag);
						}
					}
				})
			},
			async onDeleteGoodsByShop(flag) {
				try {
					const res = await onRemoveGoodsToShowCase({
						goodsIds: [this.item.goodsCode],
						showcaseId: this.showcaseId
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							complete: () => {
								console.log('flag', flag)
								if (flag) {
									this.operate = false;	
								} else {
									this.$emit('refreshList');
								}
								// this.$emit('refreshList');
							}
						})
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 添加橱窗商品
			async addGoods() {
				try {
					const res = await onAddGoodsToShowCase({
						goodsIds: [this.item.goodsCode],
						showcaseId: this.showcaseId
					});
					if (res.code === 200) {
						uni.showToast({
							title: '添加成功',
							icon: 'none',
							complete: () => {
								this.operate = true;
								// setTimeout(() => {
								// 	this.$emit('refreshList');
								// }, 2000);
								// this.$emit('refreshList');
							}
						})
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 编辑商品
			onEdit() {
				uni.redirectTo({
					url: `/pages/sub/publish/publishGoods?edit=1&goodsCode=${this.item.goodsCode}`
				})
			},
			// 上下架操作
			async onAdd(type) {
				console.log('type', type);
				const TYPE_TEXT = {
					0: '确认下架',
					1: '确认上架'
				}
				uni.showModal({
					title: '操作',
					content: TYPE_TEXT[type],
					confirmText: '确认',
					cancelText: '取消',
					success: (res) => {
						console.log('res', res);
						if (res.confirm) {
							this.onOperate(type);
						}
					}
				})
			},
			async onOperate(type) {
				try {
					const res = await onUpdateGoodsState({
						goodsCode: this.item.goodsCode,
						operationType: type
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							complete: () => {
								setTimeout(() => {
									this.$emit('refreshList');
								}, 2000);
							}
						})
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			onGoodsDetail() {
				const token = uni.getStorageSync('token');
				const url = '/pages/sub/goods/detail?id=' + this.item.goodsCode;
				if (token) {
					uni.navigateTo({
						url
					})
				} else {
					uni.navigateTo({
						url: '/pages/sub/login/index',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('loginUrl', {
								loginUrl: url,
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-container {
		background: #fff;
		padding: 20upx 30upx;
		.goods-item {
			position: relative;
			image {
				width: 144upx;
				height: 144upx;
				&.big {
					width: 180upx;
					height: 180upx;
				}
			}
			&_container {
				& > view {
					margin: 10upx 0;
				}
			}
			&_title {
				font-size: 34upx;
			}
			&_info {
				color: #9D9FB8;
				font-size: 22upx;
			}
			&_address {
				font-size: 22upx;
			}
			&_price {
				font-size: 32upx;
			}
		}
		.products-content {
			image {
				border-radius: 10upx;
				box-shadow: 0 0 4upx rgba(0, 0, 0, .2);
			}
		}
	}
	.flex-1 {
		flex: 1;
	}
	.add-goods-icon {
		font-size: 40upx;
	}
	.delete-absolute {
		position: absolute;
	}
	.delete {
		right: 40upx;
		top: 40upx;
		border-radius: 50%;
	}
</style>
