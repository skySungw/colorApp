<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		@scroll="scroll">
		<view class="goods-container solid-bottom">
			<view v-for="(item, index) in list" :key="index" :item="item" class="goods-item flex" @click="onGoodsDetail(item)">
				<image :src="item.goodsImgArray[0]" :lazy-load="true"></image>
				<view class="goods-item_container flex-1 padding-left-xs">
					<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
					<view class="text-bold goods-item_info">{{ item.goodsDesc }}</view>
					<view class="goods-item_address" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
					<view class="goods-item_address" v-if="item.distance">距您 <text class="text-red padding-lr-sm">{{item.distance}}</text> km</view>
					<view class="goods-item_price text-red text-bold">￥ {{ item.goodsPrice }}</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import Goods from './goods.vue';
	export default {
		components:{
			Goods
		},
		props: {
			list: {
				type: Array,
				default: []
			},
			scroll: {
				type: Function,
				default: () => {}
			},
			lower: {
				type: Function,
				default: () => {}
			},
			scrollTop: {
				type: Function,
				default: () => {}
			},
			upper: {
				type: Function,
				default: () => {}
			}
		},
		data() {
			return {
				scrollTop: 0,
				old: {
						scrollTop: 0
				},
			}
		},
		methods: {
			onGoodsDetail(item) {
				uni.navigateTo({
					url: '/pages/sub/goods/detail?id=' + item.goodsCode
				})
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
