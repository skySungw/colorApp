<template>
	<view class="box bottom-fixed">
		<view class="cu-bar tabbar bg-white">
			<!-- 遍历菜单 -->
			<view v-for="(item, index) in menu" :key="index" :class="['action', item.className, {'text-green': item.active}, {'text-gray': !item.active}]" @click="changeMenu(item)">
				<button v-if="item.buttonClass" :class="item.buttonClass"></button>
				<view v-else :class="item.icon"></view> {{item.label}}
			</view>
		</view>
		<!-- Modal 发布蒙层 -->
		<view class="cu-modal bottom-modal" :class="[{'show': showModal}]" @tap="onHideModal">
		  <view class="cu-dialog padding" catchtap>
				<view class="padding">
					<view v-for="(item, itemIndex) in publishArr" :key="itemIndex">
						<!-- <button class="cu-btn orange lg block line-olive" @tap="onPublish(item)"> {{ item.label }}</button> -->
						<view class="flex align-center justify-center padding" v-if="item.show" @tap="onPublish(item)">
							<view :class="item.bgColor">
								<text :class="item.icon"></text>
							</view>
							<view class="flex flex-direction text-left">
								<view class="flex-1 text-black text-bold">{{ item.title }}</view>
								<view class="flex-1 text-sm text-grey">{{ item.label }}</view>
							</view>
						</view>
					</view>
					<view class="close-button">
						<text class="bg-grey img-tag padding-sm cuIcon-close lg" @tap="onHideModal"></text>
					</view>
				</view>
		  </view>
		</view>
	</view>
</template>

<script>
	import { onFetchGroupHeadList, onFetchTopic } from '@/api';
	export default {
		props: {
			index: Number,
			showCaseId: {
				type: Number,
				default: 1
			},
			idStatus: {
				type: Number,
				default: 1, // idStatus 0 - 拥有者， 1 - 游客
			},
			onAdd: Function
		},
		data() {
			return {
				topicList: [], // 话题列表
				siteList: [], // 站长列表
				showModal: false,
				menu: [{
					index: 1,
					label: '同城',
					icon: 'cuIcon-homefill',
					// url: '/pages/ground/goodsGround'
					url: '/pages/ground/cityList'
				}, {
					index: 2,
					label: '邻友圈',
					icon: 'cuIcon-baby',
					url: '/pages/ground/ground'
				},
				{
					index: 3,
					label: '发布',
					icon: 'add-action',
					className: 'add-action',
					buttonClass: 'cu-btn cuIcon-add bg-green shadow',
				},
				// {
				// 	index: 3,
				// 	label: '发布',
				// 	icon: 'cuIcon-roundadd',
				// },
				{
					index: 4,
					label: '逛逛',
					icon: 'cuIcon-shop',
					action: true,
					preUrl: `/pages/subpackages/site/myShop`
				},
				{
					index: 5,
					label: '我的',
					icon: 'cuIcon-my',
					url: '/pages/sub/my/my'
				}],
				publishArr: [{
					id: 100000,
					show: true,
					title: '发个闲置品',
					label: '给附近的人看',
					url: '/pages/sub/publish/publishGoods',
					icon: 'cuIcon-camera lg',
					bgColor: 'padding img-tag margin-right-sm bg-gradual-pink'
				}, {
					id: 100001,
					show: true,
					title: '邻里晒一晒',
					label: '分享我的日常',
					url: '/pages/sub/publish/index',
					icon: 'cuIcon-edit lg',
					bgColor: 'padding img-tag margin-right-sm bg-cyan',
				},
				// {
				// 	id: 1,
				// 	show: true,
				// 	title: '邻里晒一晒',
				// 	label: '晒出有趣的事',
				// 	url: '/pages/sub/publish/index',
				// 	icon: 'cuIcon-evaluate lg',
				// 	bgColor: 'padding img-tag margin-right-sm bg-gradual-orange',
				// }, {
				// 	id: 1,
				// 	show: true,
				// 	title: '我要求购',
				// 	label: '大家帮忙解决',
				// 	url: '/pages/sub/publish/index',
				// 	icon: 'cuIcon-magic lg',
				// 	bgColor: 'padding img-tag margin-right-sm bg-gradual-blue',
				// }, {
				// 	id: 1,
				// 	show: true,
				// 	title: '我要找房',
				// 	label: '租房没有烦恼',
				// 	url: '/pages/sub/publish/index',
				// 	icon: 'cuIcon-home lg',
				// 	bgColor: 'padding img-tag margin-right-sm bg-gradual-green',
				// }, {
				// 	id: 0,
				// 	show: false,
				// 	title: '橱窗商品',
				// 	label: '快速发布商品',
				// 	icon: 'cuIcon-add lg',
				// 	bgColor: 'padding img-tag margin-right-sm bg-gradual-red',
				// },
				]
			}
		},
		created() {
			this.topicList = uni.getStorageSync('topicList');
			if (!this.topicList) {
				this.onGetTopic();	
			}
			this.topicList.forEach((v, i) => {
				let obj;
				if (v.id == 1) {
					obj = {
						topic: true,
						show: true,
						title: '我要求购',
						label: '大家帮忙解决',
						url: '/pages/sub/publish/index',
						icon: 'cuIcon-magic lg',
						bgColor: 'padding img-tag margin-right-sm bg-gradual-blue',
					}
				} else {
					obj = {
						topic: true,
						show: true,
						title: '我要找房',
						label: '租房没有烦恼',
						url: '/pages/sub/publish/index',
						icon: 'cuIcon-home lg',
						bgColor: 'padding img-tag margin-right-sm bg-gradual-green',
					}
				}
				Object.assign(this.topicList[i], obj)
			});
			this.publishArr = this.publishArr.concat(this.topicList);
			console.log('this.menu', this.publishArr, this.topicList);
			this.menu.forEach(v => v.index == this.index ? v.active = true : '');
			// if (this.index == 4) {
			// 	this.publishArr[0]['show'] = true;
			// }
		},
		methods: {
			// 获取话题菜单
			async onGetTopic() {
				try {
					const res = await onFetchTopic({
						size: 10,
						current: 1,
						isDefault: 1
					});
					if (res.code === 200) {
						uni.setStorageSync('topicList', res.data.records);
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 菜单切换
			changeMenu(item) {
				if (item.index != this.index) {
					console.log('item', item)
					if (item.url) {
						uni.redirectTo({
							url: item.url,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					} else if(item.action) {
						const token = uni.getStorageSync('token');
						if (token) {
							this.getSiteList(item);
						} else {
							uni.navigateTo({
								url: '/pages/sub/login/index',
								success: res => {
									this.getSiteList(item);
								}
							})
						}
					} else {
						console.log('showcaseId', this.index);
						this.onShowModal();
					}
				}
			},
			// 获取站长列表
			async getSiteList(item) {
				try {
					const res = await onFetchGroupHeadList({
						size: 10,
						current: 1
					});
					if (res.code === 200) {
						this.siteList = res.data.records;
						if (this.siteList.length) {
							uni.redirectTo({
								url: `${item.preUrl}?showcaseId=${this.siteList[0].goodsShowcaseId}&menu=0`,
								success: res => {},
								fail: () => {},
								complete: () => {}
							});
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			onHideModal() {
				this.showModal = false;
			},
			onShowModal() {
				this.showModal = true;
			},
			onPublish(item) {
				const token = uni.getStorageSync('token');
				const url = item.url;
				this.onHideModal();
				if (token) {
					// if (this.index == 4) {
					// 	this.onAdd && this.onAdd(this.showCaseId);
					// } else {
					// 	this.onShowModal();
					// }
					
					if (this.index == 4) {
						this.onAdd && this.onAdd(this.showCaseId, this.idStatus);
						return false;
					}
					// 发帖子，带话题
					if (item.topic) {
						uni.setStorageSync('publishTopic', [item]);
					}
					uni.navigateTo({
						url: item.url
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

<style scoped>
	.box {
		box-shadow: 0 0 10upx rgba(0, 0, 0, .5);
	}
	.img-tag {
		border-radius: 50%;
	}
	.close-button {
		margin: 90upx 0 30upx;
	}
</style>
