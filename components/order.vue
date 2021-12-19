<template>
	<view class="goods-container solid-bottom">
		<!-- 我的主页 -->
		<view class="goods-item flex">
			<image :src="item.orderDetail[0].goodsImgArr[0]" @tap="onOrderDetail"></image>
			<view class="goods-item_container flex-1 padding-left-xs">
				<view @tap="onOrderDetail">
					<text class="text-bold goods-item_title margin-none">{{ item.orderDetail[0].goodsName }}</text>
					<view class="text-bold goods-item_info">订单号：{{ item.orderCode }}</view>
					<view class="goods-item_address">创建时间：{{ item.createtime | getDateTime }}</view><strong></strong>
				</view>
				<view class="flex flex-bettwen-space align-center">
					<view class="goods-item_price text-red text-bold">￥ {{ item.orderPrice }}</view>
					<view v-if="item.status == 0">
						<button class="cu-btn round sm bg-gradual-green">去支付</button>
					</view>
					<!-- <view v-if="item.status == 1">
						<button type="primary" size="mini">发货</button>
					</view> -->
					<view v-if="item.status == 2 && source == 0">
						<button class="cu-btn round sm">收货</button>
					</view>
					<view v-if="item.status == 4" class="cu-tag radius bg-olive light">
						已完成
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import { onPadNum } from '@/utils';
	export default {
		props: {
			item: {
				default: 0,
				type: Object
			},
			status: {
				// 订单状态 0 待支付 1 待发货 2 待收货 9 已完成 10 已取消
				default: 0,
				type: Number 
			},
			source: {
				default: 0, // 0 - 我买的， 1 - 我卖的
				type: Number
			}
		},
		data() {
			return {
				
			}
		},
		filters: {
			getDateTime(time) {
				const dateTime = new Date(time);
				console.log(dateTime);
				const year = dateTime.getFullYear();
				const month = dateTime.getMonth() + 1;
				const day = dateTime.getDate();
				const hour = dateTime.getHours();
				const minutes = dateTime.getMinutes();
				const seconds = dateTime.getSeconds();
				return year + '-' + onPadNum(month) + '-' + onPadNum(day) + ' ' + onPadNum(hour) + ':' + onPadNum(minutes) + ':' + onPadNum(seconds);
			}
		},
		methods: {
			onPay() {
				console.log('kkk')
			},
			onOrderDetail() {
				uni.navigateTo({
					url: '/pages/sub/order/orderDetail?orderCode=' + this.item.orderCode + '&source=' + this.source
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
