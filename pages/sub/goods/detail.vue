<template>
	<view class="goods-detail_container">
		<cu-custom bgColor="bg-gradual-green" :isBack="isBack" :isCustom="true">
			<view slot="content">商品详情</view>
		</cu-custom>
		<!-- 商品轮播图 -->
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
		  <swiper-item v-for="(item, index) in goodsDetail.goodsImgArray" :key="index" @click="onViewImage" :data-index="index">
		    <image :src="item" mode="aspectFill"></image>
		  </swiper-item>
		</swiper>
		<!-- 标题、价格、分享区 -->
		<view class="detail-content_title flex text-xl padding-lr padding-tb-sm solid-bottom">
			<!-- 标题、价格 -->
			<view class="flex-1 padding-right-sm">
				<view class="text-bold"><text v-if="goodsDetail.goodsState == 2" class="text-red">【已售出】</text>{{ goodsDetail.goodsName }}</view>
				<view class="margin-top-sm flex flex-bettwen-space">
					<view class="text-red margin-right" v-if="goodsDetail.goodsPrice">￥{{ goodsDetail.goodsPrice }}</view>
					<view class="text-sm" v-if="goodsDetail.distance">
						<text class="cuIcon-location text-gray"></text>
						<text class="text-black">距您</text><text class="text-black">{{ goodsDetail.distance }} km</text>
					</view>
				</view>
			</view>
			<!-- 分享、收藏 -->
			<view class="share flex">
				<text class="cuIcon-favorfill" :class="[{'text-orange': favor === 1}, {'text-gray': favor === 0}]" @click="onHandleFavor"></text>
				<view class="cuIcon-share text-gray margin-lr-sm">
					<button class="pop-box-btn" open-type="share"></button>
				</view>
			</view>
		</view>
		<!-- 内容介绍 -->
		<view class="padding solid-bottom">
			<view class="margin-bottom-sm">
				<text class="text-bold text-black">商品介绍</text>
			</view>
			<rich-text :nodes="goodsDetail.goodsContent"></rich-text>
		</view>
		<!-- 地址回显 -->
		<view class="padding solid-bottom" v-if="isWechat && goodsDetail.goodsAddress">
			<view class="margin-bottom-sm"><text class="text-black text-bold">商品自取位置：</text>{{ goodsDetail.goodsAddress }}</view>
			<view class="margin-bottom-sm text-center text-gray">
				<text class="text-bold" @click="selectMapRote">点击查看路线</text>
			</view>
		</view>
		<!-- 商品图 -->
		<view class="padding-top padding-bottom text-center flex flex-align-column">
			<view class="flex-1" v-for="(item, index) in goodsDetail.goodsImgArray" :key="index">
				<image class="goods-detail-image margin-bottom-sm" @click="onViewImage" :data-index="index" :src="item" mode="widthFix"></image>
			</view>
		</view>
		<!-- 联系卖家、购买 -->
		<view v-if="goodsDetail.goodsState == 1 && !goodsDetail.isOwner" class="operate fixed bottom-fixed flex text-center text-bold">
			<view class="flex-1" @tap="onHandleContract">咨询</view>
			<view class="flex-1 bg-orange" @click="goPage">购买</view>
		</view>
		<!-- 联系方式弹窗 -->
		<view class="cu-modal" :class="[{'show': modalName == 'Image'}]">
		  <view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">联系方式</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view v-if="goodsDetail.sellerContactType === 1">
					<view class="text-bold text-left padding-sm">长按识别二维码</view>
					<view class="bg-img">
					  <image :src="goodsDetail.sellerContact" mode="aspectFill"></image>
					</view>
				</view>
				<view v-else class="padding padding-big" @tap="makeCall">
					{{ goodsDetail.sellerContact }}<text @tap="makeCall" class="padding-lr text-blue">点击拨号</text>
				</view>
		    <view class="cu-bar bg-white">
		      <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
		    </view>
		  </view>
		</view>
		
	</view>
</template>

<script>
	import { onFetchGoodsDetail, onCollectionGoods } from '@/api';
	export default {
		data() {
			return {
				// goodsState - 0 未上架 1 上架 2 已售出
				modalName: null,
				isContactWechat: false, // 联系方式，是否是微信二维码
				favor: 0, // 是否收藏 0 - 未收藏， 1 - 收藏
				isWechat: false, // 是否是微信
				isBack: true, // 1 - false 不可返回，只能到首页; 0 - true 可以返回
				params: {
					lat: '',
					lng: '',
					goodsCode: ''
				},
				goodsDetail: null // 商品详情
			}
		},
		onLoad(options) {
			const token = uni.getStorageSync('token')
			if (!token) {
				uni.redirectTo({
					url: '/pages/sub/login/index'
				})
				return false;
			}
			this.params.goodsCode = options.id;
			this.isBack = options.isBack == 1 ? false : true;
			this.getSystemLocation((res) => {
				this.params.lat = res.latitude;
				this.params.lng = res.longitude;
				  console.log('当前位置的经度：' + res);
				  console.log('当前位置的纬度：' + res.latitude);
				this.getGoodsDetail();
			}, () => {
				this.getGoodsDetail();
			});
		},
		created() {
			// #ifdef MP-WEIXIN
			this.isWechat = true;
			// #endif        
		},
		methods: {
			onShareAppMessage() {
				const { goodsDetail } = this.data;
				return {
					title: `${goodsDetail.goodsName}  ¥${goodsDetail.goodsPrice}`,
					imageUrl: goodsDetail.goodsImgArray[0],
				}
			},
			// 分享
			getShareBox() {
				this.sharebox = false;
			},
			async getGoodsDetail() {
				uni.showLoading();
				try {
					const res = await onFetchGoodsDetail(this.params);
					if (res.code === 200) {
						this.goodsDetail = res.data;
						this.favor = this.goodsDetail.isLikes ? 1 : 0;
					}
					// 下单页要用
					uni.setStorageSync('goodsInfo', [{
						goodsCode: this.params.goodsCode,
						goodsCount: 1
					}]);
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			// 购买
			goPage() {
				uni.navigateTo({
					url: '/pages/sub/goods/placeOrder?id=' + this.id
				})
			},
			// 打电话
			makeCall() {
				uni.makePhoneCall({
				    phoneNumber: this.goodsDetail.sellerContact
				});
			},
			// show modal
			onHandleContract() {
				this.modalName = 'Image';
			},
			// modle
			hideModal(e) {
				this.modalName = null;
			},
			// 收藏
			async onHandleFavor() {
				uni.showLoading();
				try {
					const favor = this.favor === 1 ? 0 : 1;
					const res = await onCollectionGoods({
						goodsCode: this.params.goodsCode,
						likesType: 0,
						likesState: favor
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功'
						})
						this.favor = favor;
					}
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			// 预览
			onViewImage(e) {
				const index = e.currentTarget.dataset['index'];
				uni.previewImage({
					urls: this.goodsDetail.goodsImgArray,
					current: index
				});
			},
			// 路线规划
			selectMapRote() {
				let plugin = requirePlugin('routePlan');
				let endPoint = JSON.stringify({  //终点
						'name': this.goodsDetail.goodsAddress,
						'latitude': this.goodsDetail.goodsLat,
						'longitude': this.goodsDetail.goodsLng
				});
				uni.navigateTo({
						url: 'plugin://routePlan/index?key=' + this.mapConfig.key + '&referer=' + this.mapConfig.referer + '&endPoint=' + endPoint
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.padding-big {
		padding: 60rpx 0;
	}
	.goods-detail_container {
		background: #fff;
		padding-bottom: 100upx;
		.screen-swiper {
			width: 100%;
			height: 450upx;
		}
		.detail-content_title {
			.share {
				align-items: center;
			}
		}
		.operate {
			background-color: #fff;
			box-shadow: 0 0 10upx rgba(0, 0, 0, .5);
			&>view {
				line-height: 90upx;
			}
		}
		.goods-detail-image {
			display: block;
			width: 100%;
			height: auto;
		}
	}
	.cuIcon-share {
		position: relative;
		.pop-box-btn {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			opacity: 0;
		}
	}
</style>
