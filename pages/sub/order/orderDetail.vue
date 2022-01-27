<template>
	<view class="order-detail">
		<cu-custom bgColor="bg-gradual-green" :isBack="isBack" :isCustom="true">
			<view slot="content">订单详情</view>
		</cu-custom>
		<view class="padding bg-white" v-if="orderDetail">
			<!-- 进度条 -->
			<view>
			  <view v-if="status === 10" class="text-center text-bold text-red text-cancel">
				  已取消
			  </view>
			  <view v-else class="cu-steps">
			    <view :class="['cu-item', {'text-green': index <= status}]" v-for="(item, index) in numList" :key="index">
			      <text class="num" :data-index="index + 1"></text> {{ item.name }}
			    </view>
			  </view>
			</view>
			<!-- 付款状态 -->
			<view v-if="status == 0" class="padding-tb solid-bottom">
				<view class="text-bold text-lg margin-tb-sm">订单待支付</view>
				<view>
					请在10分钟内支付此订单，否则会自动取消订单，
					还请注意支付时间！
				</view>
			</view>
			<!-- 商品详情 -->
			<view class="padding-tb-sm solid-bottom">
				<view class="goods-item flex" v-for="(item, index) in orderDetail.orderDetail" :key="index">
					<image :src="item.goodsImgArr[0]"></image>
					<view class="goods-item_container flex-1 padding-left-xs">
						<text class="text-bold goods-item_title margin-none">{{ item.goodsName }}</text>
						<view class="flex flex-bettwen-space align-center">
							<view class="text-bold goods-item_info">{{ item.info }}</view>
							<view class="">￥ {{ item.goodsPrice }}</view>
						</view>
						<view class="flex flex-bettwen-space align-center">
							<view></view>
							<view>x {{ item.goodsCount }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 付款金额信息 -->
			<view class="padding-tb-sm solid-bottom">
				<view class="flex flex-bettwen-space align-center">
					<view>商品总价</view>
					<view>￥ {{ orderDetail.goodsTotalPrice }}</view>
				</view>
				<view v-if="orderDetail.freightPrice > 0" class="flex flex-bettwen-space align-center">
					<view>运费</view>
					<view>￥ {{ orderDetail.freightPrice }}</view>
				</view>
				<view class="flex flex-bettwen-space align-center">
					<view>订单支付总金额</view>
					<view>￥ {{ orderDetail.orderPrice }}</view>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="padding-tb-sm solid-bottom">
				<view class="flex flex-bettwen-space align-center">
					<view>订单信息</view>
					<view>
						<button type="default" class="line-green" size="mini" @tap="onContact">{{ source == 1 ? '联系买家' : '联系卖家' }}</button>
						<!-- <button v-if="orderDetail.sellerInfo.sellerContactType === 2" type="default" class="line-green" size="mini" @tap="getWechat">{{ source == 1 ? '联系买家' : '联系卖家' }}</button>
						<button v-else type="default" class="line-green" size="mini" @tap="makeCall">{{ source == 1 ? '联系买家' : '联系卖家' }}</button> -->
					</view>
				</view>
				<view>
					卖家昵称：{{ orderDetail.sellerInfo.sellerUserName }}
				</view>
				<view>
					订单编号：{{ orderDetail.orderCode }}
				</view>
				<view>
					交易时间：{{ orderDetail.createtime | getDateTime }}
				</view>
			</view>
			<!-- 买家信息 -->
			<view class="padding-tb-sm solid-bottom">
				<view>
					收 货 人：{{ orderDetail.orderAddress.receiveContact }} {{ orderDetail.orderAddress.receivePhone }}
				</view>
				<view>
					收货地址：{{ orderDetail.orderAddress.receiveDetailAddress }}
				</view>
			</view>
		</view>
		<view class="bottom fixed flex flex-direction" v-if="status == 0 && source == 0">
			<button type="primary" class="cu-btn bg-green lg" @tap="onPay">去支付</button>
		</view>
		<view class="bottom fixed flex flex-direction" v-if="status == 1 && source == 1">
			<button type="primary" class="cu-btn bg-green lg" @tap="onHandleUpdateOrderState(2)">确认发货</button>
		</view>
		<view class="bottom fixed flex flex-direction" v-if="status == 2 && source == 0">
			<button type="primary" class="cu-btn bg-green lg" @tap="onHandleUpdateOrderState(9)">确认收货</button>
		</view>
		<!-- 展示二维码 -->
		<view :class="['cu-modal', {'show': showModal}]">
		  <view class="cu-dialog">
		   <!-- <view class="bg-img" :style="{'background-image': 'url(' + orderDetail.sellerInfo.sellerWxQrCode +')', height:'200px'}">
		      <view class="cu-bar justify-end text-white">
		        <view class="action" @tap="hideModal">
		          <text class="cuIcon-close "></text>
		        </view>
		      </view>
		    </view> -->
				<view class="cu-bar bg-white justify-end">
					<view class="content">联系方式</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view v-if="orderDetail.sellerInfo.sellerContactType === 2" class="padding padding-big" @tap="onCopy" :data-text="orderDetail.sellerInfo.wxNumber">
					微信号：{{ orderDetail.sellerInfo.wxNumber }}<text @tap="onCopy" :data-text="orderDetail.sellerInfo.wxNumber" class="padding-lr text-blue">点击复制</text>
				</view>
				<view v-if="orderDetail.sellerInfo.sellerContactType === 1">
					<view class="padding-sm"><text class="text-bold text-sm">长按识别二维码</text></view>
					<image :show-menu-by-longpress="true" mode="aspectFit" :src="orderDetail.sellerInfo.sellerWxQrCode"></image>
				</view>
		    <view class="cu-bar bg-white">
		      <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
		    </view>
		  </view>
		</view>

	</view>
</template>

<script>
	import { onPadNum } from '@/utils';
	import { onFetchOrderDetail, onUpdateOrderState, onFetchWechatPayConfig } from '@/api';
	export default {
		data() {
			return {
				showModal: false, // 是否展示二维码
				status: 0, // 订单状态
				isBack: true,
				numList: [{
					name: '已拍下'
				}, {
					name: '已付款'
				}, {
					name: '已发货'
				}, {
					name: '已完成'
				}],
				orderDetail: null,
				source: 0 // 0 - 我买的， 1 - 我卖的
			}
		},
		onLoad(options) {
			this.isBack = options.isBack == 1 ? false : true;
			this.options = options;
			console.log('this.options', this.options);
			this.orderCode = options.orderCode;
			this.source = options.source || 0; // 
			this.getDetail();
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
			// 确认发货/收货
			async onHandleUpdateOrderState(orderState) {
				try {
					const res = await onUpdateOrderState({
						orderState,
						orderCode: this.orderCode
					});
					console.log('res', res);
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						});
						setTimeout(this.getDetail, 2000)
					}
				} catch(err) {
					console.log('err', err)
				}
			},
			// 获取详情
			async getDetail() {
				uni.showLoading();
				try {
					const res = await onFetchOrderDetail({
						orderCode: this.orderCode
					});
					console.log('res', res);
					if(res.code === 200) {
						this.orderDetail = res.data;
						this.status = this.orderDetail.orderState;
					}
					console.log("orderDetail", this.orderDetail)
					uni.hideLoading();
				} catch(err) {
					console.log('err', err);
					uni.hideLoading();
				}
			},
			// 联系买/卖家
			onContact() {
				console.log('this.source', this.source)
				if (this.source == 0) {
					if (this.orderDetail.sellerInfo.sellerContactType == 2 || this.orderDetail.sellerInfo.sellerContactType == 1) {
						this.getWechat();
						return false;
					}
				}
				this.makeCall();
			},
			// 点击复制
			onCopy(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.text,
					success: function (res) {
						uni.getClipboardData({
							success: function (res) {
								uni.showToast({
									title: '复制成功'
								})
							}
						})
					}
				})
			},
			// 打电话
			makeCall() {
				const phoneNumber = this.source == 1 ? this.orderDetail.orderAddress.receivePhone : this.orderDetail.sellerInfo.sellerPhone
				uni.makePhoneCall({
				    phoneNumber
				});
			},
			// 获取微信二维码
			getWechat() {
				this.showModal = true;
			},
			hideModal(e) {
				this.showModal = false;
			},
			// 去支付
			async onPay() {
				console.log("this.orderDetail", this.orderDetail);
				const that = this;
				try {
					const res = await onFetchWechatPayConfig({
						orderCode: this.orderDetail.orderCode
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
						console.log('param', param)
						// 支付
						uni.requestPayment({
							provider: 'wxpay',
							...param,
							success: function (res) {
								console.log('res', res);
								console.log('success:' + JSON.stringify(res));
								that.getDetail();
							},
							fail: function (err) {
								console.log('err', err);
								console.log('fail:' + JSON.stringify(err));
								that.getDetail();
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
	.order-detail {
		padding-bottom: 40upx;
		.text-cancel {
			font-size: 40upx;
		}
	}
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
</style>
