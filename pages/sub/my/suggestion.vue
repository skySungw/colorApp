<template>
	<view class="my-suggestion_container">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">意见反馈</view>
		</cu-custom>
		<view class="content padding-xs">
			<view class="margin-xs padding-top-sm">
				<textarea class="padding-sm" maxlength="200" v-model="ideaContent" placeholder="请写下您要反馈的意见哦,最少10个字哦~"/>
			</view>
			<view class="margin-xs padding-top-sm">
				<view class="text-bold margin-bottom-sm">添加问题截图（选填）</view>
				<view class="padding-sm bg-white padding-top-sm padding-bottom-none">
					<view class="grid col-3 grid-square flex-sub">
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
			<view class="margin-xs padding-top-sm">
				<button type="primary" @tap="onConfirm">确认提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import ajaxUpload from '@/api/ajaxUpload';
	import { onUploadSuggest } from '@/api';
	export default {
		data() {
			return {
				ideaContent: '',
				ideaImg: '',
				imgList: [],
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
									console.log('uploadFileRes', uploadFileRes)
									let upimg = JSON.parse(uploadFileRes.data);
									if (upimg.code === 200) {
										this.ideaImg = upimg.data.fileUrl;
									}
									if (this.imgList.length != 0) {
											this.imgList = this.imgList.concat(tempFilePaths)
									} else {
										this.imgList = tempFilePaths
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
							this.imgList.splice(e.currentTarget.dataset.index, 1);
						}
					}
				})
			},
			// 提交
			async onConfirm() {
				let msg = '来都来了不说点什么吗~';
				let flag = false;
				if (!this.ideaContent) {
					flag = true;
				} else {
					if (this.ideaContent.length < 10) {
						msg = '至少要10个字哦~'
						flag = true;
					}
				}
				if (flag) {
					uni.showToast({
						title: msg,
						duration: 3000,
						icon: 'none'
					})
					return false;
				}
				try {
					const res = await onUploadSuggest({
						ideaContent: this.ideaContent,
						ideaImg: this.ideaImg
					});
					console.log('res', res);
					if (res.code === 200) {
						uni.showToast({
							title: '感谢反馈!',
							icon: 'none',
							success() {
								setTimeout(() => {
									uni.navigateBack();
								}, 1500);
							}
						})
					}
				} catch(err) {
					console.log('err', err);
				}
				console.log(this.ideaContent);
			}
		}
	}
</script>

<style lang="scss" lang="scss">
	.my-suggestion_container {
		textarea {
			display: block;
			width: 100%;
			background-color: #FFFFFF;
			border: 1px solid #DDDDDD;
			border-radius: 10upx;
		}
	}
</style>
