<template>
	<view class="contact-setting">
		<!-- 设置手机号 -->
		<view>
			<view class="cu-form-group">
				<view class="title">手机号绑定</view>
				<input placeholder="输入绑定手机号"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入框带个按钮"></input>
				<button class="cu-btn bg-green shadow">验证码</button>
			</view>
			<view class="padding-sm">
				<button type="primary">确认绑定</button>
			</view>
		</view>
		
		<!-- 设置二维码 -->
		<view>
			<view class="margin-xs padding-top-sm">
				<view class="text-bold margin-bottom-sm padding-lr">请上传您的微信二维码，仅在发布商品后选择使用</view>
				<view class="padding-sm bg-white padding-top-sm padding-bottom-none">
					<view class="grid col-1 grid-square flex-sub">
						<view class="bg-img" v-for="(item, index) in imgList" :key="index" :data-url="imgList[index]">
							<image :src='imgList[index]' mode='aspectFill' @click="onViewImage"></image>
							<view class="cu-tag bg-red" @tap.stop="onDelImg" :data-index="index">
								<text class="cuIcon-close"></text>
							</view>
						</view>
						<view class="solids" @click="onChooseImage" v-if="imgList.length < 1">
							<text class="cuIcon-cameraadd"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
			}
		},
		methods: {
			onChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						if (this.imgList.length != 0) {
								this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			onViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			onDelImg(e) {
				uni.showModal({
					content: '确定删除？',
					cancelText: '再想想',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1);
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.contact-setting {
		
	}
</style>
