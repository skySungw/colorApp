<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">更改二维码</view>
		</cu-custom>
		<view class="margin-xs padding-top-sm">
			<view class="text-bold margin-bottom-sm">请上传您的微信二维码，仅在发布商品后选择使用</view>
			<view class="padding-sm bg-white padding-top-sm padding-bottom-none">
				<view class="grid col-1 grid-square flex-sub">
					<view class="bg-img" v-for="(item, index) in imgList" :key="index" :data-url="imgList[index]">
						<image :src='imgList[index]' mode='aspectFill' @click="onViewImage"></image>
						<view class="cu-tag bg-red" @click="onDelImg" :data-index="index">
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
</template>

<script>
	import { updateUserInfo } from '@/api';
	import ajaxUpload from '@/api/ajaxUpload';
	export default {
		data() {
			return {
				imgList: [],
				img: [], // 二维码
			}
		},
		onLoad(options) {
			if (options.param) {
				this.imgList = [options.param];
				this.img = [options.param];
			}
		},
		methods: {
			onChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						console.log('tempFilePaths[0]', tempFilePaths)
						ajaxUpload({
						    filePath: tempFilePaths[0],
						    name: 'file',
						    success: (uploadFileRes) => {
								let upimg = JSON.parse(uploadFileRes.data);
								if (upimg.code === 200) {
									if (this.imgList.length != 0) {
											this.imgList = this.imgList.concat(tempFilePaths);
											this.img = this.img.concat([upimg.data.fileUrl])
									} else {
										this.imgList = tempFilePaths
										this.img = [upimg.data.fileUrl];
										this.onHandleUpdate();
									}
								}
						    }
						});
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
							const index = e.currentTarget.dataset.index;
							this.imgList.splice(index, 1);
							this.img.splice(index, 1);
						}
					}
				})
			},
			async onHandleUpdate() {
				try {
					const res = await updateUserInfo({
						wxQrcode: this.img[0]
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							duration: 2000,
							complete() {
								setTimeout(() => {
									uni.navigateBack();
								}, 2000);
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

<style>
</style>
