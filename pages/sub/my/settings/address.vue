<template>
	<view class="my-setting_modifyaddress">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">{{ id ? '编辑' : '新增'}}地址</view>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">联系人</view>
				<input placeholder="姓名" v-model="params.receiveContact"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="联系方式" v-model="params.receivePhone"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">地区信息</view>
				<input :disabled="true" @click="selectMap" :value="location"></input>
				<text class="cuIcon-location"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">详细地址</view>
				<input placeholder="街道门牌号信息" v-model="params.receiveDetailAddress"></input>
			</view>
			<!-- 保存 -->
			<button class="fixed bottom" type="primary" @click="onSave">保存</button>
		</form>
	</view>
</template>

<script>
	import { onCreateReceiveAddress } from '@/api';
	// #ifdef MP-WEIXIN
	const chooseLocation = requirePlugin('chooseLocation');
	// #endif     
	export default {
		data() {
			return {
				location: '请选择地址',
				id: null,
				params: {
					receiveContact: "",
					receivePhone: "",
					receiveProvinceCode: "",
					receiveProvinceName: "",
					receiveCityCode: "",
					receiveCityName: "",
					receiveAreaCode: "",
					receiveAreaName: "",
					receiveDetailAddress: "",
					receiveLng: "",
					receiveLat: ""
				}
			}
		},
		onLoad(options) {
			console.log('options', options);
			this.id = options.id;
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {
			const location = chooseLocation.getLocation();
			if (location) {
				this.location = location.province + location.city + location.district;
				this.params.receiveDetailAddress = location.address;
				this.params.receiveLng = location.longitude;
				this.params.receiveLat = location.latitude;
				this.params.receiveProvinceName = location.province;
				this.params.receiveCityName = location.city;
				this.params.receiveAreaName = location.district;
				// this.location = location.address;
				// storeLat: location.latitude,
				// storeLng: location.longitude,
				// storeDetailAddress: location.address,
				// storeProvinceName: location.province, // 所在省名称
				// storeCityName: location.city, // 所在城市名称
				// storeAreaName: location.district, // 所在区名称
			}
		},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
			chooseLocation.setLocation(null);
		},
		methods: {
			async onSave() {
				if (!this.params.receiveContact) {
					uni.showToast({
						title: '请填写联系人',
						icon: 'none'
					});
					return false;
				}
				if (!this.params.receivePhone) {
					uni.showToast({
						title: '请填写联系方式',
						icon: 'none'
					});
					return false;
				}
				if (this.params.receivePhone.trim().length !== 11) {
					uni.showToast({
						title: '请填写11位手机号码',
						icon: 'none'
					});
					return false;
				}
				if (!this.params.receiveDetailAddress) {
					uni.showToast({
						title: '请填写详细地址',
						icon: 'none'
					});
					return false;
				}
				try {
					const res = await onCreateReceiveAddress(this.params);
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功!'
						});
						setTimeout(() => {
							let pages = getCurrentPages();
							let prevPage = pages[pages.length - 2]; //上一个页面'
							console.log('prevPage', prevPage)
							prevPage.$vm.onFetchAddressInfo(res.data);
							uni.navigateBack({
								delta: 1
							})
						}, 1500);
					}
				} catch(err) {
					console.log('err', err);
				}
				
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
			}
		}
	}
</script>

<style lang="scss">
	.my-setting_modifyaddress {
		.title {
			width: 150upx;
		}
	}
</style>
