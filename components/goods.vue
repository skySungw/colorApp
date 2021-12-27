<template>
	<view class="goods-container solid-bottom">
		<!-- 我的主页 -->
		<view v-if="source == 0" class="goods-item flex" @click="onGoodsDetail">
			<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
				<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
				<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
			</view>
		</view>
		<!-- 产品库列表 -->
		<view v-if="source == 2" class="goods-item flex">
			<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
				<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
				<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
			</view>
			<view>
				<text class="cuIcon-roundadd lg text-gray" @tap="addGoods"></text>
			</view>
		</view>
		<!-- 橱窗列表 -->
		<view v-if="source == 3" class="goods-item flex">
			<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
				<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
				<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
				<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
				<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
			</view>
			<view>
				<text class="cuIcon-move lg text-gray" @tap="deleteGoods"></text>
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
				<!-- <text v-if="status == 0" class="cu-tag line-green radius margin-right-sm text-green">编辑</text> -->
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
			item: {
				default: 0,
				type: Object
			},
			source: {
				default: 0, // 来源 1 - 我的-我的商品列表， 0 - 我的-个人主页-我发布的, 2 - 产品库列表，3 - 橱窗列表
				type: Number
			},
			status: {
				default: 0, // 状态 0 下架 1 上架 2 已售出
				type: Number 
			},
			showcaseId: {
				default: '', // 橱窗id ''
				type: Number
			}
		},
		methods: {
			// 删除橱窗商品
			async deleteGoods() {
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
								setTimeout(() => {
									this.$emit('refreshList');
								}, 2000);
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
							title: '操作成功',
							icon: 'none',
							complete: () => {
								// setTimeout(() => {
								// 	this.$emit('refreshList');
								// }, 2000);
								this.$emit('refreshList');
							}
						})
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			async onAdd(type) {
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
	}
	.flex-1 {
		flex: 1;
	}
</style>
