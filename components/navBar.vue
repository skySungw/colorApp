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
					<view v-for="(item, index) in publishArr" :key="index">
						<!-- <button class="cu-btn orange lg block line-olive" @tap="onPublish(item)"> {{ item.label }}</button> -->
						<view class="flex align-center justify-center padding" @tap="onPublish(item)">
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
	export default {
		props: {
			index: Number
		},
		data() {
			return {
				showModal: false,
				menu: [{
					index: 1,
					label: '逛逛',
					icon: 'cuIcon-homefill',
					url: '/pages/ground/goodsGround'
				}, {
					index: 2,
					label: '帖子',
					icon: 'cuIcon-baby',
					url: '/pages/ground/ground'
				},
				// {
				// 	index: 3,
				// 	label: '发布',
				// 	icon: 'add-action',
				// 	className: 'add-action',
				// 	buttonClass: 'cu-btn cuIcon-add bg-green shadow',
				// },
				{
					index: 3,
					label: '发布',
					icon: 'cuIcon-roundadd',
				},
				// {
				// 	index: 4,
				// 	label: '站长',
				// 	icon: 'cuIcon-shop',
				// 	url: '/pages/subpackages/site/index'
				// },
				{
					index: 5,
					label: '我的',
					icon: 'cuIcon-my',
					url: '/pages/sub/my/my'
				}],
				publishArr: [{
					id: 2,
					title: '发个闲置品',
					label: '给附近的人看',
					url: '/pages/sub/publish/publishGoods',
					icon: 'cuIcon-camera lg',
					bgColor: 'padding img-tag margin-right-sm bg-cyan'
				}, {
					id: 1,
					title: '发生活帖子',
					label: '分享我的日常',
					url: '/pages/sub/publish/index',
					icon: 'cuIcon-edit lg',
					bgColor: 'padding img-tag margin-right-sm bg-gradual-green',
				}]
			}
		},
		created() {
			this.menu.forEach(v => v.index == this.index ? v.active = true : '')
		},
		methods: {
			changeMenu(item) {
				if (item.index != this.index) {
					if (item.url) {
						uni.redirectTo({
							url: item.url,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					} else {
						this.onShowModal();
					}
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
				console.log('token', token)
				if (token) {
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
