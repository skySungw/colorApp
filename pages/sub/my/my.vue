<template>
	<view class="my-container">
		<cu-custom bgColor="bg-white" :isBack="false">
		</cu-custom>
		<!-- 头部 -->
		<view class="my-header">
			<view class="my-header_container flex" v-if="!info" @tap="onGoPage({
				link: '/pages/sub/login/index'
			})">
				<image src="/static/logo.png" class="user-photo" mode="aspectFit"></image>
				<view class="flex flex-align-center margin-left-sm text-bold text-xl">点击登录</view>
			</view>
			<view class="my-header_container flex flex-bettwen-space" v-else>
				<view class="flex">
					<image :src="info.wxHeadImg" class="user-photo" mode="aspectFit" @tap="onGoPage({
						link: '/pages/sub/my/home'
					})"></image>
					<view class="my-header-right padding-lr" @tap="onGoPage({
						link: '/pages/sub/my/home'
					})">
						<view class="nickname text-black text-bold">{{info.userName}}</view>
						<view>ID：{{ info.userId }}<text v-if="false" class="margin-left-sm text-sm text-grey">点击复制</text></view>
						<view>{{ info.userDesc || '' }}</view>
					</view>
				</view>
				<!-- 分享-->
				<view class="share flex align-center">
					<view class="cu-tag line-green share-button flex align-center">
						<view class="text-green">
							分享主页
						</view>
						<view class="cuIcon-forwardfill lg text-green text-center">
						</view>
						<button class="pop-box-btn" open-type="share"></button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list grid col-4 no-border">
			<view class="cu-item" @click="onGoPage({
				link: '/pages/sub/my/goods'
			})">
				<view>商品</view>
				<text>{{ memberWorks.goodsCount }}</text>
			</view>
			<view class="cu-item" @click="onGoPage({
				link: '/pages/sub/my/card'
			})">
				<view>帖子</view>
				<text>{{ memberWorks.articleCount }}</text>
			</view>
			<view class="cu-item" @click="onGoPage({
				link: '/pages/sub/my/focus'
			})">
				<view>关注</view>
				<text>{{ memberDetail.followCount }}</text>
			</view>
			<view class="cu-item" @click="onGoPage({
				link: '/pages/sub/my/follow'
			})">
				<view>粉丝</view>
				<text>{{ memberDetail.fansCount }}</text>
			</view>
			<!-- <view class="cu-item" @click="onGoPage({
				link: '/pages/sub/my/integral'
			})">
				<view>积分</view>
				<text>{{ memberDetail.integralCount }}</text>
			</view> -->
		</view>
		<!-- 菜单 -->
		<view class="cu-list grid col-5 margin-top-sm no-border" v-if="info">
			<view class="cu-item" v-for="(item, index) in myPageMenu" :key="index" @click="onGoPage(item)">
				<view :class="item.icon"></view>
				<text>{{ item.label }}</text>
			</view>
		</view>
		<!-- 工具 -->
		<view v-if="info && userType == 2" class="margin-top-sm padding-sm bg-white">
			<view class="text-bold text-sm padding-left-sm">我的工具</view>
			<view class="cu-list grid col-5 no-border">
				<view class="cu-item" v-for="(item, index) in myTools" :key="index" @click="onGoPage(item)">
					<view :class="item.icon"></view>
					<text>{{ item.label }}</text>
				</view>
			</view>
		</view>
		
		<!-- 退出登录 -->
		<view v-if="info" class="margin-top-sm padding-sm bg-white flex">
			<view class="flex-1 text-center text-bold" @tap="onLogout">退出登录</view>
		</view>
		<!-- 其它区域 -->
		<NavBar :index="5"></NavBar>
	</view>
</template>

<script>
	import NavBar from '@/components/navBar';
	import { myPageMenu, myTools } from '@/config/config.js';
	import { selectMemberInfoByToken } from '@/api/index';
	
	export default {
		components:{
			NavBar
		},
		data() {
			return {
				info: null, // 个人信息
				myPageMenu,
				myTools,
				memberDetail: { // 粉丝数量
					fansCount: 0,
					followCount: 0,
					integralCount: 0
				},
				memberWorks: { // 发布数量
					goodsCount: 0,
					articleCount: 0
				},
				userType: null
			}
		},
		onShow() {
			const token = uni.getStorageSync('token');
			this.userType = uni.getStorageSync('userType')
			console.log('token', token)
			if (!token) {
				return false;
			}
			this.getInfos();
		},
		methods: {
			// 分享朋友圈
			onShareAppMessage() {
				const { info } = this;
				console.log('info', info)
				return {
					title: `${ info.userName }  的个人主页`,
					path: `/pages/sub/my/home?id=${ info.userId }&isBack=1`,
					imageUrl: info.wxHeadImg,
				}
			},
			init() {
				this.info = null;
				this.memberDetail = { // 粉丝数量
					fansCount: 0,
					followCount: 0,
					integralCount: 0
				},
				this.memberWorks = { // 发布数量
					goodsCount: 0,
					articleCount: 0
				}
			},
			onLogout() {
				// 退出登陆
				this.init();
				uni.setStorageSync('token', null);
				uni.setStorageSync('userId', null);
			},
			// 获取信息
			async getInfos() {
				try {
					const res = await selectMemberInfoByToken();
					if (res.code === 200) {
						this.info = res.data;
						this.memberDetail = res.data.memberDetail;
						this.memberWorks = res.data.memberWorks;
					}
				} catch (err) {
					console.log('err', err);
				}
			},
			onGoPage(item) {
				if (item['link']) {
					uni.navigateTo({
						url: item.link
					})
				}
			}
		}
	}
</script>

<style lang="scss" lang="scss">
	.my-header {
		.my-header_container {
			padding: 20upx 24upx 0;
			background-color: #fff;
			.user-photo {
				width: 130upx;
				height: 130upx;
				border-radius: 50%;
			}
			.my-header-right {
				// width: 500upx;
				view {
					margin: 10upx 0;
					color: #666883;
					font-size: 30upx;
				}
				.nickname {
					font-size: 42upx;
				}
			}
		}
	}
	.my-container {
		.cu-list.grid.no-border>.cu-item {
				padding: 0;
		}
	}
	.share-button {
		position: relative;
		// border: 1upx solid green;
		// border-radius: 10upx;
		// padding: 5upx 10upx;
		.cuIcon-forwardfill {
			margin-left: 5upx;
		}
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
