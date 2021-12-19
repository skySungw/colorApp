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
		    <view class="grid col-2 padding-sm">
					<view class="padding-sm" v-for="(item, index) in publishArr" :index="index">
						<button class="cu-btn orange lg block line-olive" @tap="onPublish(item)"> {{ item.label }}</button>
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
					label: '广场',
					icon: 'cuIcon-homefill',
					url: '/pages/ground/ground'
				}, {
					index: 2,
					label: '宝贝',
					icon: 'cuIcon-baby',
					url: '/pages/ground/goodsGround'
				}, {
					index: 3,
					label: '发布',
					icon: 'add-action',
					className: 'add-action',
					buttonClass: 'cu-btn cuIcon-add bg-green shadow',
				},{
					index: 4,
					label: '话题',
					icon: 'cuIcon-baby',
					url: '/pages/subpackages/subject/index'
				},
				{
					index: 5,
					label: '我的',
					icon: 'cuIcon-my',
					url: '/pages/sub/my/my'
				}],
				publishArr: [{
					id: 1,
					label: '发布帖子',
					url: '/pages/sub/publish/index'
				}, {
					id: 2,
					label: '发布商品',
					url: '/pages/sub/publish/publishGoods'
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
</style>
