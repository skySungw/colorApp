<template>
	<view class="publish-content bg-white" :style="[{'padding-bottom': '50px', 'height': '100vh'}, {background: '#fff'}]">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">发布商品</view>
		</cu-custom>
		<!-- <rich-text :nodes="strings"></rich-text> -->
		<view class="padding-lr padding-left padding-right padding-top">
			<view class="cu-form-group padding-lr-none">
				<view class="title">商品名称</view>
				<input placeholder="请输入商品名" v-model="goodsName"></input>
			</view>
			<view class="cu-form-group padding-lr-none">
				<view class="title">商品种类</view>
				<picker @change="onGoodsChange" :value="goodsCategoryIndex" :range="goodsPicker">
					<view class="picker">
						{{goodsPicker[goodsCategoryIndex]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group padding-lr-none">
				<view class="title">商品价格</view>
				<input placeholder="请输入价格" v-model="goodsPrice"></input>
			</view>
			<view class="cu-form-group padding-lr-none">
				<view class="title">商品数量</view>
				<input placeholder="请输入数量" v-model="goodsStock"></input>
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
			<view class="bg-white padding-bottom-none">
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
		<!-- <view>
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
		</view> -->
		<!-- 联系方式 -->
		<view class="padding-lr">
			<view class="cu-form-group padding-lr-none">
				<radio-group class="block" @change="onSelectConcat">
					<label v-for="(item, index) in pickerList" :key="index" >
						<radio class="text-gradual-green radio margin-sm" :value="item.contactType" :checked="item.contactType === selectContactObj.contactType"></radio> {{ concatList[index] }}
					</label>
				</radio-group>
			</view>
		</view>
		<!-- 联系方式 -->
		<view v-for="(item, index) in pickerList" :key="index">
			<view class="cu-form-group" v-if="item.contactType === selectContactObj.contactType">
				<view class="title">{{ concatList[index] }}</view>
				<input :disabled="true" :value="selectContactObj.contactContent"></input>
			</view>
		</view>
		<!-- <Contact></Contact> -->
		<!-- 发布按钮 -->
		<view class="fixed bottom text-right padding z999 flex flex-direction">
			<button class="cu-btn lg bg-gradual-green" @click="onCheck">发布</button>
		</view>
	</view>
</template>

<script>
	import { onFetchGoodsCategory, onCreateGoods, onFetchContactType } from '@/api';
	import bgyxedit from '@/components/bgyxedit/bgyxedit';
	import Contact from '@/components/contact';
	import ajaxUpload from '@/api/ajaxUpload';
	
	// // #ifdef MP-WEIXIN
	// const chooseLocation = requirePlugin('chooseLocation');
	// // #endif     
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
				goodsStock: 1, // 商品数量
				// goodsLat: '', // 纬度
				// goodsLng: '', // 经度
				goodsContent: '', // 商品介绍，带格式
				goodsDesc: '', // 商品介绍，纯文本
				sellerContactType: 0, // 联系方式： 0 手机号1 微信二维码 2 微信号
				sellerContact: '', // 联系方式
				selectContactObj: null,
				concatList: ['手机号', '二维码', '微信号'], // 联系方式列表
				goodsAddress: '',  // 商品地址
				address: '请选择地址',
				contact: false, // 没有填写联系方式
				pickerList: [],
				contactList: [], // 联系方式列表
				location: '',
				placeholderText: '请简单介绍下您的商品',
				goodsCategoryIndex: 0,
				goodsPicker: [],
				goodsPickerArr: [],
				goodsCategoryId: 0,
				// picker: [],
				// strings: '<div>Hello World!</div><div style="text-align:center;"><img src="https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png"/></div>'
			}
		},
		onLoad() {
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {
			this.getContactList();
			this.getCatogryList();
			
			// const location = chooseLocation.getLocation();
			// if (location) {
			// 	this.address = location.province + location.city + location.district;
			// 	const type = Object.prototype.toString.call(location.address);
			// 	if (type == '[object Array]') {
			// 		this.goodsAddress = location.address[0];
			// 	} else if (type == '[object String]') {
			// 		this.goodsAddress = location.address;
			// 	}
				
			// 	this.goodsLat = location.latitude;
			// 	this.goodsLng = location.longitude;
			// }
		},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
			chooseLocation.setLocation(null);
		},
		methods: {
			// 获取分类列表
			async getCatogryList() {
				try {
					const res = await onFetchGoodsCategory();
					console.log('res', res);
					if (res.code === 200) {
						this.goodsPickerArr = res.data;
						this.goodsPickerArr.forEach(v => {
							this.goodsPicker.push(v.categoryName);
						});
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 获取联系方式列表
			async getContactList() {
				try {
					const res = await onFetchContactType();
					if (res.code === 200) {
						if (res.data.length > 0) {
							// 默认选择第一个联系方式
							const selectContactObj = res.data[0];
							this.sellerContactType = selectContactObj.contactType;
							this.sellerContact = selectContactObj.contactContent;
							this.selectContactObj = selectContactObj;
							// 联系人列表
							this.pickerList = res.data;
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 发布商品
			async publish() {
				try {
					// const lat = uni.getStorageSync('lat');
					// const lng = uni.getStorageSync('lng');
					const params = {
						goodsName: this.goodsName,
						goodsImg: this.goodsImg,
						goodsPrice: this.goodsPrice,
						goodsStock: this.goodsStock,
						// goodsLat: this.goodsLat || lat,
						// goodsLng: this.goodsLng || lng,
						goodsContent: this.goodsContent,
						goodsDesc: this.goodsDesc,
						sellerContactType: this.sellerContactType,
						sellerContact: this.sellerContact,
						goodsAddress: this.goodsAddress,
						goodsCategoryId: this.goodsCategoryId
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
				// if (this.sellerContactType != 0 && this.sellerContactType != 1) {
				// 	uni.showToast({
				// 		title: '请留下联系方式',
				// 		icon: 'none'
				// 	});
				// 	return false;
				// }
				this.publish();
			},
			// 地图选点
			// selectMap() {
			// 	const mapConfig = {
			// 	  key: "YCWBZ-Q2CKG-NK7Q3-IFYBG-LCHA7-TKBQ5", //使用在腾讯位置服务申请的key
			// 	  referer: "kuaihuo",//调用插件的app的名称
			// 		category: '房产小区:住宅区:住宅小区'
			// 	}
			// 	// #ifdef MP-WEIXIN
			// 	wx.navigateTo({
			// 		url: 'plugin://chooseLocation/index?key=' + mapConfig.key + '&referer=' + mapConfig.referer + '&category=' + mapConfig.category
			// 	});
			// 	// #endif        
			// },
			goPage(item) {
				uni.navigateTo({
					url: item.link
				})
			},
			onGoodsChange(e) {
				this.goodsCategoryIndex = e.detail.value;
				this.goodsCategoryId = this.goodsPickerArr[this.goodsCategoryIndex]['categoryId'];
			},
			// 选择联系方式
			onSelectConcat(e) {
				// this.sellerContactType = e.detail.value
				console.log('e', e);
				const selectContactObj = this.pickerList[e.detail.value];
				this.sellerContactType = selectContactObj.sellerContactType;
				this.sellerContact = selectContactObj.contactContent;
				this.selectContactObj = selectContactObj;
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
