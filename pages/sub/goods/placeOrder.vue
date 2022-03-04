<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">去下单</view>
		</cu-custom>
		<!-- 页面部分 -->
		<view class="padding-sm">
			<!-- 地址部分 -->
			<view class="cu-list menu sm-border">
				<view v-if="addressInfo" class="cu-item border-radius arrow" @tap="onEditAddress">
					<view class="content padding-tb-sm">
						<view class="text-bold text-black">
							<text>{{ addressInfo.receiveContact }}</text>
							<text class="margin-left">{{ addressInfo.receivePhone }}</text>
						</view>
						<view class="text-gray text-lg">
							<text class="cuIcon-locationfill margin-right-xs"></text>
							{{ addressInfo.receiveDetailAddress }}
						</view>
					</view>
				</view>
				<view v-else class="cu-item border-radius text-center flex">
					<view class="empty flex-1 text-bold" @tap="onAddAddress">
						<text>+</text>请添加您的地址信息
					</view>
				</view>
			</view>
			<!-- 商品信息部分 -->
			<view class="goods-list margin-top border-radius bg-white">
				<view class="padding flex" v-for="(item, index) in orderInfo.orderDetail">
					<view class="goods-photo padding-right-sm">
						<image :src="item.goodsImgArr[0]" mode="aspectFill"/>
					</view>
					<view class="goods-right flex-1">
						<view class="flex flex-bettwen-space">
							<view class="text-bold text-black padding-right-sm">{{ item.goodsName }}</view>
							<view>￥{{ item.goodsPrice }}</view>
						</view>
						<view class="margin-top-sm flex flex-bettwen-space">
							<view class="flex-1 padding-right-sm" v-if="item.goodsAddress">地址：{{ item.goodsAddress }}</view>
							<view>x {{ item.goodsCount }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 订单备注 -->
			<view class="flex text-bold text-black bg-white border-radius margin-top padding text-right">
				<view>备注</view>
				<view class="flex-1"><input placeholder="可以给商家留言哦~" v-model="orderRemark"></input></view>
			</view>
			<!-- 运费金额 -->
			<view v-if="orderInfo.freightPrice > 0" class="flex flex-bettwen-space text-bold text-black bg-white border-radius margin-top padding">
				<view>运费</view>
				<view>￥ {{ orderInfo.freightPrice }}</view>
			</view>
			<!-- 订单金额 -->
			<view class="flex flex-bettwen-space text-bold text-black bg-white border-radius margin-top padding">
				<view>商品总价</view>
				<view>￥ {{ orderInfo.goodsTotalPrice }}</view>
			</view>
			<!-- 支付栏 -->
			<view class="fixed bottom-fixed flex solid-top bg-white">
				<view class="flex-1 flex flex-align-center padding-left text-bold text-black">
					订单金额：￥<text class="text-red text-xl">{{ orderInfo.orderPrice }}</text>
				</view>
				<view class="padding bg-green" @tap="onPay">
					去支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { onFetchAddressList, onFetchAddressById, onFetchPlaceOrderInfo, onCreateOrder, onFetchWechatPayConfig } from '@/api';
	export default {
		data() {
			return {
				orderInfo: null, // 订单商品数据
				goodsInfo: [], // 查询条件
				orderRemark: '', // 订单备注
				addressInfo: null, // 地址信息
				// addressInfo: {
				// 	user: '张三',
				// 	tel: '15325122311',
				// 	address: '望京soho T3'
				// }
			}
		},
		onLoad(options) {
			this.goodsInfo = uni.getStorageSync('goodsInfo');
			if (this.goodsInfo?.length) {
				this.init();
				this.getAddressList();
			} else {
				uni.showToast({
					title: '参数有误，请重新下单',
					icon: 'error'
				});
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/ground/ground'
					})
				}, 2000);
			}
		},
		methods: {
			async getAddressList() {
				try {
					const res = await onFetchAddressList();
					if (res.code === 200) {
						if (res.data.length) {
							this.addressInfo = res.data[0];
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			async init() {
				try {
					const res = await onFetchPlaceOrderInfo({
						goodsInfo: this.goodsInfo
					});
					if (res.code === 200) {
						this.orderInfo = res.data;
					}
				} catch(err) {
					console.log("err", err);
				}
			},
			async onFetchAddressInfo(receiveId) {
				try {
					const res = await onFetchAddressById({
						receiveId
					});
					if (res.code === 200) {
						this.addressInfo = res.data;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 添加
			onAddAddress() {
				let source = 1;
				uni.navigateTo({
					url: `/pages/sub/my/settings/address?source=${source}`
				})
			},
			// 编辑
			onEditAddress() {
				let source = 1;
				uni.navigateTo({
					url: `/pages/sub/my/settings/addressList?source=${source}&id=${this.addressInfo.receiveId}`
				})
			},
			// 去支付
			async onPay() {
				if (!this.addressInfo) {
					uni.showToast({
						title: '请填写收货地址',
						icon: 'none'
					});
					setTimeout(() => {
						this.onAddAddress();
					}, 2000);
					return false;
				}
				uni.showLoading({
					title: '支付中...',
					mask: true
				});
				try {
					const res = await onCreateOrder({
						goodsInfo: this.goodsInfo,
						receiveId: this.addressInfo.receiveId,
						orderRemark: this.orderRemark
					});
					if (res.code === 200) {
						this.getPayConfig(res.data?.orderCode);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000,
							complete() {
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/ground/goodsGround'
									})
								}, 2000)
							}
						});
					}
				} catch(err) {
					console.log('err', err);
					uni.hideLoading();
				}
			},
			async getPayConfig(orderCode) {
				try {
					const res = await onFetchWechatPayConfig({
						orderCode
					});
					if (res.code === 200) {
						const data = res.data;
						const param = {
							timeStamp: data.timeStamp,
							nonceStr: data.nonceStr,
							package: data.packages,
							signType: data.signType,
							paySign: data.paySign,
						}
						// 支付
						uni.requestPayment({
							provider: 'wxpay',
							...param,
							success: function (res) {
								uni.redirectTo({
									url: '/pages/sub/order/my'
								})
							},
							fail: function (err) {
								console.log('err', err);
								console.log('fail:' + JSON.stringify(err));
								uni.redirectTo({
									url: '/pages/sub/order/my'
								})
							}
						});
					}
				} catch(err) {
					console.log('err', err);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list {
		.goods-photo {
			image {
				width: 144upx;
				height: 144upx;
			}
		}
	}
</style>
