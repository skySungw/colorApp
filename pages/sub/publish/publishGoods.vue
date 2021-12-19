<template>
	<view class="publish-content bg-white" :style="[{'padding-bottom': '50px', 'height': '100vh'}, {background: '#fff'}]">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">发布商品</view>
		</cu-custom>
		<!-- <rich-text :nodes="strings"></rich-text> -->
		<view class="padding-lr padding">
			<view class="cu-form-group padding-lr-none">
				<view class="title">商品名称</view>
				<input placeholder="请输入商品名" v-model="goodsName"></input>
			</view>
			<view class="cu-form-group padding-lr-none">
				<view class="title">商品价格</view>
				<input placeholder="请输入价格" v-model="goodsPrice"></input>
			</view>
			<!-- <view class="padding-bottom title">
				<input placeholder="请输入商品名" v-model="goodsName" class="publish-title"></input>
			</view>
			<view class="padding-bottom title">
				<input placeholder="请输入价格" v-model="goodsPrice" class="publish-title"></input>
			</view> -->
			<bgyxedit @bgyxchange="getbgyxinfo" :img="false" :text="false" :placeholderText="placeholderText" :showdone="true" uploadurl="https://qsd.haoleen.com/getdata/getdata/appupimg" filename="img"></bgyxedit>
		</view>
		<!-- 商品封面图 -->
		<view class="padding-lr">
			<view>
				<text>请上传商品图（{{ imgList.length }} / {{ maxImg }}）</text>
			</view>
			<view class="bg-white padding-top-sm padding-bottom-none">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item, index) in imgList" :key="index" :data-url="imgList[index]">
						<image :src='imgList[index]' mode='aspectFill' @click="onViewImage"></image>
						<view class="cu-tag bg-red" @click="onDelImg" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @click="onChooseImage" v-if="imgList.length < maxImg">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 联系方式 -->
		<!-- 选择联系方式 -->
		<view>
			<view v-if="picker.length" class="cu-form-group margin-top">
				<view class="title">联系方式</view>
				<picker @change="onPickerChange" :value="sellerContactType" :range="picker">
					<view class="picker">
						{{picker[sellerContactType]}}
					</view>
				</picker>
			</view>
			<view v-else class="cu-list menu card-menu margin-top">
				<view class="cu-item arrow padding-left-none">
					<view class="content">
						<text class="text-grey">联系方式</text>
					</view>
					<view class="action" @click="goPage({
						link: '/pages/sub/setting/contact'
					})">
						<text class="text-grey text-sm">添加联系方式</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择地址 -->
		<view>
			<view class="cu-form-group">
				<view class="title">发布地址</view>
				<input :disabled="true" @click="selectMap" :value="address"></input>
				<text class="cuIcon-location" @click="selectMap"></text>
			</view>
		<!-- 	<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="请输入详细地址" v-model="goodsAddress"></input>
			</view> -->
		</view>
		<!-- <Contact></Contact> -->
		<!-- 发布按钮 -->
		<view class="fixed bottom text-right padding z999">
			<button type="primary" size="mini" class="padding-sm" @click="onCheck">发布</button>
		</view>
	</view>
</template>

<script>
	import { onCreateGoods, onFetchContactType } from '@/api';
	import bgyxedit from '@/components/bgyxedit/bgyxedit';
	import Contact from '@/components/contact';
	import ajaxUpload from '@/api/ajaxUpload';
	
	// #ifdef MP-WEIXIN
	const chooseLocation = requirePlugin('chooseLocation');
	// #endif     
	export default {
		components: {
			bgyxedit,
			Contact
		},
		data() {
			return {
				goodsName: '', // 商品名称
				maxImg: 8,
				goodsImg: [], // 商品图片
				imgList: [], // 页面临时图片
				goodsPrice: '', // 商品价格
				goodsLat: '', // 纬度
				goodsLng: '', // 经度
				goodsContent: '', // 商品介绍，带格式
				goodsDesc: '', // 商品介绍，纯文本
				sellerContactType: 0, // 联系方式： 0 无 1 手机号 2 微信二维码
				goodsAddress: '',  // 商品地址
				address: '请选择地址',
				contact: false, // 没有填写联系方式
				picker: [],
				contactList: [], // 联系方式列表
				location: '',
				placeholderText: '请简单介绍下您的商品',
				// picker: [],
				// strings: '<div>Hello World!</div><div style="text-align:center;"><img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png"/></div>'
			}
		},
		onLoad() {
			this.getContactList();
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {
			const location = chooseLocation.getLocation();
			console.log("location", location)
			if (location) {
				this.address = location.province + location.city + location.district;
				const type = Object.prototype.toString.call(location.address);
				if (type == '[object Array]') {
					this.goodsAddress = location.address[0];
				} else if (type == '[object String]') {
					this.goodsAddress = location.address;
				}
				
				this.goodsLat = location.latitude;
				this.goodsLng = location.longitude;
			}
		},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
			chooseLocation.setLocation(null);
		},
		methods: {
			async getContactList() {
				try {
					const res = await onFetchContactType();
					console.log('res', res);
					if (res.code === 200) {
						if (res.data.length > 0) {
							console.log('res.data', res.data)
							// 默认选择第一个联系方式
							this.sellerContactType = res.data[0];
							res.data.forEach(v => {
								if (v === 0) {
									this.picker.push('手机号');
								} else if (v === 1) {
									this.picker.push('微信二维码');
								}
							})
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 发布商品
			async publish() {
				try {
					const lat = uni.getStorageSync('lat');
					const lng = uni.getStorageSync('lng');
					const params = {
						goodsName: this.goodsName,
						goodsImg: this.goodsImg,
						goodsPrice: this.goodsPrice,
						goodsLat: this.goodsLat || lat,
						goodsLng: this.goodsLng || lng,
						goodsContent: this.goodsContent,
						goodsDesc: this.goodsDesc,
						sellerContactType: this.sellerContactType,
						goodsAddress: this.goodsAddress,
					};
					const res = await onCreateGoods(params);
					console.log('res', res);
					if (res.code === 200) {
						uni.showToast({
							title: '发布成功',
						})
						// uni.navigateTo({
						// 	url: `/pages/sub/publish/publishSuccess?params=${JSON.stringify(params)}`
						// })
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/sub/my/goods'
							})
						}, 2000);
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 校验字段
			onCheck() {
				if (!this.goodsName) {
					uni.showToast({
						title: '请输入商品名',
						icon: 'none'
					});
					return false;
				}
				if (!this.goodsPrice) {
					uni.showToast({
						title: '请输入商品价格',
						icon: 'none'
					});
					return false;
				}
				if (!this.goodsDesc) {
					uni.showToast({
						title: '请填写商品描述',
						icon: 'none'
					});
					return false;
				}
				if (this.goodsImg.length === 0) {
					uni.showToast({
						title: '请上传商品图片',
						icon: 'none'
					});
					return false;
				}
				if (this.sellerContactType != 0 && this.sellerContactType != 1) {
					uni.showToast({
						title: '请留下联系方式',
						icon: 'none'
					});
					return false;
				}
				this.publish();
			},
			// 地图选点
			selectMap() {
				const mapConfig = {
				  key: "YCWBZ-Q2CKG-NK7Q3-IFYBG-LCHA7-TKBQ5", //使用在腾讯位置服务申请的key
				  referer: "kuaihuo" //调用插件的app的名称
				}
				// #ifdef MP-WEIXIN
				wx.navigateTo({
					url: 'plugin://chooseLocation/index?key=' + mapConfig.key + '&referer=' + mapConfig.referer
				});
				// #endif        
			},
			goPage(item) {
				uni.navigateTo({
					url: item.link
				})
			},
			// 选择联系方式
			onPickerChange(e) {
				this.sellerContactType = e.detail.value
			},
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
													this.goodsImg = this.goodsImg.concat([upimg.data.fileUrl])
											} else {
												this.imgList.push(v);
												this.goodsImg = [upimg.data.fileUrl];
											}
										}
							    }
							});
						})
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
							this.goodsImg.splice(index, 1);
						}
					}
				})
			},
			getbgyxinfo:function(e){
				console.log('e', e)
				//获取富文本内容，默认模式拼接的html
				this.goodsContent = e.html;
				//获取原始数据,可自行循环拼接html数据
				this.goodsDesc = '';
				e.data.forEach(v => {
					this.goodsDesc += v.value;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.publish-content {
		.publish-title {
			font-size: 40upx;
		}
	}
</style>
