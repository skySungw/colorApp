<template>
	<view class="publish-content bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">发布帖子</view>
		</cu-custom>
		
		<!-- <rich-text :nodes="strings"></rich-text> -->
		<view class="padding-lr padding">
			<view class="padding-bottom title">
				<input placeholder="请输入标题" class="publish-title" v-model="detail.articleTitle"></input>
			</view>
			<!-- <bgyxedit @bgyxchange="getbgyxinfo" :showdone="true" uploadurl="https://qsd.haoleen.com/getdata/getdata/appupimg" filename="img"></bgyxedit> -->
			<view class="padding-bottom content-border">
				<textarea v-model="detail.articleContent" placeholder="请输入内容"></textarea>
			</view>
			<view class="padding-bottom-sm">文章图片</view>
			<view class="bg-white padding-bottom-none">
				<view class="grid col-3 grid-square flex-sub">
					<view class="bg-img" v-for="(item, index) in imgList" :key="index" :data-url="imgList[index]">
						<image :src='imgList[index]' mode='aspectFill' @click="onViewImage"></image>
						<view class="cu-tag bg-red" @click="onDelImg" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @click="onChooseImage" v-if="imgList.length < 8">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed bottom text-right padding flex">
			<button class="flex-1 padding-sm cu-btn lg bg-gradual-green margin-right-sm" @click="publish('save')">发布</button>
			<button class="flex-1 padding-sm cu-btn lg line-grey" @click="onSaveDraft">保存草稿</button>
		</view>
	</view>
</template>
<script>
	import { onPublish, onFetchArticleDetail } from '@/api';
	import ajaxUpload from '@/api/ajaxUpload';
	export default {
		data() {
		 return {
			imgList: [],
			img: [], // 二维码
			detail: {
				articleTitle: '',
				articleContent: '',
				articleContentImg: [],
				articleDesc: '',
				saveType: 0, // 0 - 发布， 1 - 草稿
			},
			draftId: '',
			articleCode: '',
			
		 }
		},
		onLoad(options) {
			if (options.draftId) {
				this.draftId = options.draftId;
			}
			if (options.articleCode) {
				this.articleCode = options.articleCode;
			}
			if (options.draftId || options.articleCode) {
				this.getArticleInfo(options.draftId || options.articleCode);
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
												this.detail.articleContentImg = this.detail.articleContentImg.concat([upimg.data.fileUrl])
										} else {
											this.imgList = tempFilePaths
											this.detail.articleContentImg = [upimg.data.fileUrl];
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
							this.detail.articleContentImg.splice(index, 1);
						}
					}
				})
			},
			async getArticleInfo(articleCode) {
				try {
					let param = {
						articleCode,
						selType: 0
					}
					if (this.draftId) {
						param = Object.assign({}, param, {
							selType: 1
						})
					}
					const res = await onFetchArticleDetail(param);
					console.log('res', res);
					if (res.code === 200) {
						this.detail = res.data;
						this.imgList = this.detail.articleContentImg;
						this.img = this.detail.articleContentImg;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// getbgyxinfo:function(e){
			// 	//获取富文本内容，默认模式拼接的html
			// 	// console.log(e.html)
			// 	//获取原始数据,可自行循环拼接html数据
			// 	console.log('e', e)
			// 	let articleDesc = '';
			// 	let articleContentImg = [];
			// 	e.data.forEach(v => {
			// 		if (v.type == 'img') {
			// 			articleContentImg.push(v.value);
			// 		} else {
			// 			articleDesc += v.value;
			// 		}
			// 	})
			// 	this.detail.articleContent = e.html;
			// 	this.detail.articleDesc = articleDesc;
			// 	this.detail.articleContentImg = articleContentImg;
			// },
			onSaveDraft() {
				this.detail.saveType = 1;
				this.publish();
			},
			// 发布功能
			publish(type) {
				if (type) {
					this.detail.saveType = 0;
				}
				if (!this.detail.articleTitle) {
					uni.showToast({
						title: '请输入标题',
						icon: 'none'
					});
					return false;
				}
				if (!this.detail.articleContent.length) {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					});
					return false;
				}
				this.onFinalPublish();
			},
			async onFinalPublish() {
				try {
					this.detail.articleDesc = this.detail.articleContent;
					let params = this.detail;
					console.log("this.draftId", this.draftId)
					if (this.draftId) {
						params = Object.assign({}, params, {
							draftId: this.draftId
						})
					}
					console.log("params", params);
					const res = await onPublish(params);
					if (res.code === 200) {
						let msg = '发布成功'
						if (this.detail.saveType == 1) {
							msg = '保存成功'
						}
						uni.showToast({
							title: msg,
							icon: 'none'
						});
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/ground/ground'
							})
						}, 2000);
					}
				} catch (err) {
					console.log('err', err);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.publish-content {
		padding-bottom: 100upx;
		.publish-title {
			font-size: 40upx;
		}
		.content-border {
			textarea {
				font-size: 40upx;
			}
		}
	}
</style>
