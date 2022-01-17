<template>
	<view class="publish-content bg-white full-height">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">发布帖子</view>
		</cu-custom>
		
		<!-- <rich-text :nodes="strings"></rich-text> -->
		<view class="padding-lr padding">
			<view class="bg-white padding-bottom-none">
				<view class="grid col-4 grid-square flex-sub">
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
			<view class="title border-bottom">
				<input placeholder="填写标题会有更多的人关注哦~" class="publish-title" v-model="detail.articleTitle"></input>
			</view>
			<!-- <bgyxedit @bgyxchange="getbgyxinfo" :showdone="true" uploadurl="https://qsd.haoleen.com/getdata/getdata/appupimg" filename="img"></bgyxedit> -->
			<view class="padding-bottom content-border">
				<textarea :focus="focus" v-model="detail.articleContent" placeholder="添加正文"></textarea>
			</view>
			<!-- 话题 -->
			<view class="padding-top" @tap="onHandleSearchTopic">
				<view class="flex flex-bettwen-space padding-top-sm padding-bottom-sm align-center text-grey">
					<view class="felx-1 text-black text-bold">
						<view v-if="topicsList.length !== 0" class="flex align-center topic-tags">
							<view v-for="(item, index) in topicsList" :key="index" class="cu-tag line-grey round">
								# {{ item.name }}
								<text class="cuIcon-close lg text-gray margin-left-sm" @tap.stop="onDelTopic" :data-index="index"></text>
							</view>
						</view>
						<text v-else># 参与话题</text>
					</view>
					<view class="text-sm">
						<text v-if="topicsList.length === 0">合适的话题能增加曝光哦~ </text>
						<text class="cuIcon-right lg text-gray padding-left-sm"></text>
					</view>
				</view>
			</view>
			<!-- 选择地址 -->
			<view class="cu-form-group padding-left-none padding-right-none">
				<view class="title">地区信息</view>
				<input v-model="address" :disabled="true" placeholder="请填写地址"></input>
				<text class="cuIcon-location" @click="selectMap" ></text>
			</view>
		</view>
		<view class="fixed bottom text-right padding flex">
			<view class="flex flex-direction margin-right-sm text-center" @click="onSaveDraft">
				<view><text class="cuIcon-text lg text-gray"></text></view>
				<view class="text-sm text-gray">存草稿</view>
			</view>
			<button class="flex-1 padding-sm cu-btn round lg bg-gradual-green" @click="publish('save')">发布</button>
			<!-- <button class="flex-1 padding-sm cu-btn lg line-grey" @click="onSaveDraft">保存草稿</button> -->
		</view>
	</view>
</template>
<script>
	import { onPublish, onFetchArticleDetail, selectUserLocation, saveUserLocation  } from '@/api';
	import ajaxUpload from '@/api/ajaxUpload';
	// #ifdef MP-WEIXIN
	const chooseLocation = requirePlugin('chooseLocation');
	// #endif     
	export default {
		data() {
		 return {
			maxImg: 9,
			initFlag: true, // 
			focus: false, // 是否聚焦
			imgList: [],
			img: [], // 二维码
			detail: {
				articleTitle: '',
				articleContent: '',
				articleContentImg: [],
				articleDesc: '',
				saveType: 0, // 0 - 发布， 1 - 草稿
				articleTopic: [], // 话题
			},
			draftId: '',
			articleCode: '',
			topicsList: [], // 话题列表
			address: '',
			goodsLat: '',
			goodsLng: '',
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
		onShow() {
			if (this.initFlag) {
				this.onSelectLocation();
			}
			const location = chooseLocation.getLocation();
			if (location) {
				console.log('location', location)
				this.address = location.name;
				this.goodsLat = location.latitude;
				this.goodsLng = location.longitude;
				
				this.onSaveAddress();
			}
		},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
			chooseLocation.setLocation(null);
		},
		methods: {
			// 获取用户地址
			async onSelectLocation() {
				try {
					const res = await selectUserLocation();
					if (res.code === 200) {
						if (res?.data?.locationAddress) {
							this.address = res.data.locationAddress;
							this.goodsLat = res.data.locationLat;
							this.goodsLng = res.data.locationLng;
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 保存地址
			async onSaveAddress() {
				try {
					const res = await saveUserLocation({
						"locationLat": this.goodsLat,
						"locationLng": this.goodsLng,
						"locationAddress": this.address
					})
					if (res.code === 200) {
						const addressInfo = uni.getStorageInfoSync('addressInfo') || {};
						Object.assign(addressInfo, {
							title: this.address,
							lat: this.goodsLat,
							lng: this.goodsLng,
						})
						uni.setStorageSync('addressInfo', addressInfo);
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 地图选点
			selectMap() {
				// 重新触发onshow
				this.initFlag = false;
				
				const mapConfig = {
				  key: "YCWBZ-Q2CKG-NK7Q3-IFYBG-LCHA7-TKBQ5", //使用在腾讯位置服务申请的key
				  referer: "kuaihuo",//调用插件的app的名称
					category: '房产小区:住宅区:住宅小区'
				}
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: 'plugin://chooseLocation/index?key=' + mapConfig.key + '&referer=' + mapConfig.referer + '&category=' + mapConfig.category
				});
				// #endif        
			},
			// 删除话题
			onDelTopic(e) {
				const index = e.currentTarget.dataset['index'];
				console.log('index', index);
				this.topicsList.splice(index, 1);
			},
			// 添加话题
			onHandleSearchTopic() {
				uni.navigateTo({
					url: '/pages/sub/search/topicSearch',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						onSelectTopic: ({data}) => {
							console.log('data', data);
							const topicDetail = data;
							let flag = false; 
							this.topicsList.forEach((v, i) => {
								if (v.id === topicDetail.id) {
									flag = true;
								}
							});
							if (!flag) {
								this.topicsList.push(data);
							}
						}
					},
					success: (res) => {
						res.eventChannel.emit('topicsList', {
							topicsList: this.topicsList,
						})
					}
				})
			},
			
			// 上传图片
			onChooseImage() {
				uni.chooseImage({
					count: this.maxImg, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						let tempFilePaths = res.tempFilePaths;
						if (this.imgList.length + tempFilePaths.length > this.maxImg) {
							const len = this.imgList.length + tempFilePaths.length - this.maxImg;
							tempFilePaths = tempFilePaths.splice(len);
						}
						tempFilePaths.forEach(v => {
							ajaxUpload({
							    filePath: v,
							    name: 'file',
							    success: (uploadFileRes) => {
										let upimg = JSON.parse(uploadFileRes.data);
										if (upimg.code === 200) {
											if (this.imgList.length != 0) {
													this.imgList = this.imgList.concat([v]);
													this.detail.articleContentImg = this.detail.articleContentImg.concat([upimg.data.fileUrl])
											} else {
												this.imgList.push(v);
												this.detail.articleContentImg = [upimg.data.fileUrl];
											}
										}
							    }
							});
						})
					}
				});
				// uni.chooseImage({
				// 	count: 9, //默认9
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	success: (res) => {
				// 		const tempFilePaths = res.tempFilePaths;
				// 		console.log('tempFilePaths[0]', tempFilePaths)
				// 		ajaxUpload({
				// 		    filePath: tempFilePaths[0],
				// 		    name: 'file',
				// 		    success: (uploadFileRes) => {
				// 					let upimg = JSON.parse(uploadFileRes.data);
				// 					if (upimg.code === 200) {
				// 						if (this.imgList.length != 0) {
				// 								this.imgList = this.imgList.concat(tempFilePaths);
				// 								this.detail.articleContentImg = this.detail.articleContentImg.concat([upimg.data.fileUrl])
				// 						} else {
				// 							this.imgList = tempFilePaths
				// 							this.detail.articleContentImg = [upimg.data.fileUrl];
				// 						}
				// 					}
				// 		    }
				// 		});
				// 	}
				// });
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
					// 添加话题
					if (this.topicsList.length > 0) {
						this.topicsList.forEach(v => {
							this.detail.articleTopic.push(v.id);
						});
					}
					
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
			},
		}
	}
</script>

<style scoped lang="scss">
	.publish-content {
		overflow-y: auto;
		padding-bottom: 100upx;
		.publish-title {
			font-size: 32upx;
			margin: 10upx 0;
		}
		.content-border {
			textarea {
				width: 100%;
				margin: 16upx 0;
				font-size: 24upx;
			}
		}
	}
	.border-bottom {
		border-bottom: 1upx solid #eee;
	}
	.topic-tags {
		flex-wrap: wrap;
		.cu-tag {
			margin: 10upx 5upx 10upx 0;
		}
	}
</style>
