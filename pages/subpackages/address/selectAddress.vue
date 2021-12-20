<template>
	<view class="page-box absolute flex flex-direction" :style="[{height: '100vh'}]">
		<cu-custom bgColor="bg-gradual-green" :isBack="isBack" :isCustom="true">
			<view slot="content">{{ title }}</view>
		</cu-custom>
		<view class="flex-1 flex flex-direction overflow-hidden">
			<view class="la-header">
				<view class="la-header-left" @tap="selectCity">
					<image class="la-header-dwimg" src="@/static/index-dw.png" mode="widthFix"></image>
					<view class="la-header-dw">{{ address_data.city ? address_data.city : '选择城市' }}</view>
					<image class="la-header-jtimg" src="@/static/icon-arrow.png" mode="widthFix"></image>
				</view>
				<view class="la-header-right">
					<image class="la-header-right-img" v-if="input_val" @tap="search_clear" src="@/static/search_clear.png" mode="widthFix"></image>
					<image class="la-header-right-ss" src="@/static/search-icon-black.png" mode="widthFix"></image>
					<input confirm-type="search" :value="input_val" placeholder="请输入您需要搜索的小区名" @input="address_input"></input>
				</view>
			</view>
			<view class="address-box">
				<view class="address-box__title">
					<image src="@/static/address-icon1.png"></image>
					<text>当前地址</text>
				</view>
				<view class="address-box__current">
					<view class="address-box__name" v-if='dw_type'>定位中...</view>
					<view class="address-box__name" v-else @tap="selectCurrentAddress">{{ address_data.title ? address_data.title : '没能获取到您的定位' }}</view>
					<view class="address-box__re-location theme-text" @tap="reLocation">
						<image src="@/static/djk_biao.png"></image>
						<view>重新定位</view>
					</view>
				</view>
			</view>
			<view class="address-box flex-1 flex flex-direction overflow-hidden" v-if="list.length > 0">
				<view class="address-box__title">
					<image src="@/static/address-icon2.png"></image>
					<text>附近的地址</text>
				</view>
				<view class="address-box__nearby-list flex-1 overflow-hidden">
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
						@scroll="scroll">
							<view class="address-box__name" @tap="addressBtn(item)" v-for="(item, index) in list" :key="index">
								<view>{{ item.title }}</view>
								<view class="address-box__name___address">{{ item.address }}</view>
							</view>
						</scroll-view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import { selectAddressByLat, selectAddressExploreByCityAndArea, saveUserLocation, selectHotCity } from '@/api';
	const citySelector = requirePlugin('citySelector');
	export default {
		data() {
			return {
				serachType: false, // 是否是搜索，用来判断下拉接口
				scrollTop: 0,
				old: {
						scrollTop: 0
				},
				title: '地址选择',
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					lat: '',
					lng: ''
				},
				isBack: true,
				dw_type:false,
				count: null,
				pageNum: 1,
				address_data: {},
				location_data:{},
				list: [],
				searchList: [],
				input_val: '',
				interType: false,
				search_qs_type: false,
				isType:false,
				backType: 0,
				addressList: [],
				moreAddress: false,
				addressBoxHeight: 0,
				time: 1000,
				hotCitys: [] // 热门城市
			}
		},
		onLoad(options) {
			this.address_data = uni.getStorageSync('addressInfo');
			console.log("this.address_data", this.address_data);
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			this.eventChannel = eventChannel;
			// 获取热门城市
			this.onFetchHotCity();
		},
		onShow() {
			const selectedCity = citySelector.getCity(); // 选择城市后返回城市信息对象，若未选择返回null
			console.log("selectedCity", selectedCity);
			if (selectedCity) {
				Object.assign(this.address_data, {
					city: selectedCity.name,
					lat: selectedCity.location.latitude,
					lng: selectedCity.location.longitude
				})
				uni.setStorageSync('addressInfo', this.address_data);
				this.params.current = 1;
				this.getDictList(selectedCity.location);
			}
		},
		onUnload () {
			// 页面卸载时清空插件数据，防止再次进入页面，getCity返回的是上次的结果
			citySelector.clearCity();
		},
		methods: {
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 滚动到顶部
			upper(e) {
					console.log('upper', e)
			},
			// 滚动到底部
			lower(e) {
				if (this.hasNext()) {
					this.params.current++;
					// 搜索来源
					if (this.serachType) {
						this.getArea(this.input_val);
					} else {
						// 重新定位
						this.getDictList({
							latitude: this.params.lat,
							longitude: this.params.lng
						});
					}
				}
			},
			// 滚动事件
			scroll(e) {
					this.old.scrollTop = e.detail.scrollTop
			},
			// 到顶
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
						this.scrollTop = 0
				});
				// uni.showToast({
				// 		icon:"none",
				// 		title:"纵向滚动 scrollTop 值已被修改为 0"
				// })
			},
			// 热门城市
			async onFetchHotCity() {
				try {
					const res = await selectHotCity();
					if (res.code === 200) {
						res.data.forEach(v => {
							this.hotCitys.push(v.cityName.replace(/市/, ''));
						})
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 切换小区
			addressBtn(item) {
				console.log('item', item);
				const token = uni.getStorageSync('token');
				console.log('token', token);
				if (token) {
					this.onSaveLocation(item);
				} else {
					this.goBackPage(item);
				}
			},
			goBackPage(item) {
				this.eventChannel.emit('onChangeAddress', {
					data: item
				});
				uni.navigateBack({
					delta: 1
				})
			},
			async onSaveLocation(item) {
				try {
					const res = await saveUserLocation({
						"locationLat": item.lat,
						"locationLng": item.lng,
						"locationAddress": item.title
					})
					if (res.code === 200) {
						this.goBackPage(item);
					}
				} catch(err) {
					console.log('err', err);
					this.goBackPage(item);
				}
			},
			// 切换城市
			selectCity() {
				const key = this.mapConfig.key; // 使用在腾讯位置服务申请的key
				const referer = this.mapConfig.key; // 调用插件的app的名称
				console.log("this.hotCitys.join(',')", this.hotCitys.join(','))
				const hotCitys = this.hotCitys.join(','); // 用户自定义的的热门城市,用户自定义的热门城市，城市名称之间用英文逗号分隔，名称需要与列表中的城市名称匹配, 最多12个
				// 参考 https://lbs.qq.com/miniProgram/plugin/pluginGuide/citySelector
				wx.navigateTo({
				  url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
				})
			},
			// 重新获取定位
			reLocation() {
				this.serachType = false;
				this.input_val = '';
				this.params.current = 1;
				this.goTop();
				uni.showLoading();
				this.getSystemLocation((res) => {
					uni.setStorageSync('lat', res.latitude);
					uni.setStorageSync('lng', res.longitude);
					uni.hideLoading();
					// 获取小区信息
					this.getDictList(res);
				}, () => {
					uni.hideLoading();
				});
			},
			// 根据经纬度获取小区信息
			async getDictList(info) {
				this.params.lat = info.latitude;
				this.params.lng = info.longitude;
				
				try {
					const res = await selectAddressByLat(this.params);
					if (res.code === 200) {
						this.params.total = res.data.total;
						if (this.params.current === 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 搜索小区列表
			address_input(e) {
				clearTimeout(this.timer);
				this.input_val = e.detail.value;
				this.serachType = true;
				this.params.current = 1;
				this.timer = setTimeout(() => {
					this.list = [];
					if (!this.input_val) {
						this.list = [];
					} else {
						this.getArea(this.input_val);
					}
				}, this.time);	
			},
			// 获取小区列表
			async getArea(areaName) {
				try {
					const res = await selectAddressExploreByCityAndArea({
						size: this.params.size,
						current: this.params.current,
						cityName: this.address_data.city,
						areaName: areaName
					});
					if (res.code === 200) {
						this.params.total = res.data.total;
						if (this.params.current === 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 清除选择
			search_clear() {
				this.input_val = '';
				this.list = [];
			}
		}
	}
</script>

<style lang="scss">

.page-box {
	// height: 100vh;
	background-color: #F5F5F5;
}
.la-header {
	display: flex;
	height: 77upx;
	background-color: #fff;
	padding: 0 20upx 0 20upx;
	position: relative;
}

.la-header-left {
	width: 208upx;
	font-size: 28upx;
	color: #333;
	display: flex;
	align-items: center;
}

.la-header-dw {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin: 0 6upx;
}
.la-header-jtimg {
	width: 28upx;
	height: 28upx;
	flex-shrink: 0;
}

.la-header-left .la-header-dwimg {
	width: 38upx;
	height: 38upx;
}

.la-header-right {
	width: calc(100% - 200upx);
	position: relative;
}

.la-header-right input {
	height: 60upx;
	border-radius: 90upx;
	background-color: #f5f5f5;
	text-align: left;
	margin-top: 10upx;
	padding-left: 60upx;
	font-size: 25upx;
	color: #000;
	line-height: 60upx;
	position: relative;
	padding-right: 90upx;
}

.la-header-right .la-header-right-ss {
	width: 28upx;
	height: 28upx;
	position: absolute;
	left: 22upx;
	top: 26upx;
	z-index: 1;
}

.la-nv-dq {
	height: 58upx;
	padding: 0 24upx 0 24upx;
	background-color: #f5f5f5;
	line-height: 58upx;
	text-align: left;
	font-size: 24upx;
	color: #8a8080;
}

/* 重新定位 */

.curAddress_title {
	height: 58upx;
	line-height: 58upx;
	font-size: 24upx;
	color: #666;
	padding: 0 23upx;
}

.curAddress_name_view {
	position: relative;
	height: 90upx;
	display: flex;
	padding: 0 23upx;
	flex-direction: row;
	background-color: #fff;
}

.curAddress_name {
	flex: 1;
	height: 90upx;
	line-height: 90upx;
	font-size: 30upx;
	color: #333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.curAddress_change {
	width: 170upx;
	height: 90upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-left: 25upx;
}

.curAddress_change image {
	width: 45upx;
	height: 45upx;
	margin-right: 5upx;
}

.la-nv-list .curAddress_name_view {
	border-bottom: 1px solid rgba(245, 247, 248, 1);
}

/* 搜索弹出 */

.la-search-list {
	width: 100%;
	border-top: 1px solid rgba(245, 247, 248, 1);
}

.curAddress_juli {
	font-size: 26upx;
	color: #999;
}

.la-search-list .curAddress_name_view {
	height: auto;
	display: block;
	padding-bottom: 20upx;
	border-bottom: 1px solid rgba(245, 247, 248, 1);
}

.la-header-right .la-header-right-img {
	width: 36upx;
	position: absolute;
	right: 4upx;
	top: 3upx;
	z-index: 9999;
	display: block;
	padding: 20upx;
}

.back-color {
	background-color: #fff;
}

.address-box {
	/* border-bottom: 20upx solid #f5f5f5; */
	margin-bottom: 20upx;
	background: #ffffff;
	padding: 10upx 24upx 0;
	position: relative;
	overflow: hidden;
}

.address-box:last-child {
	border: 0;
}

.address-box__title {
	font-size: 24upx;
	color: #999999;
	display: flex;
	align-items: center;
	padding: 10upx 0;
}
.address-box__title image {
	width: 30upx;
	height: 30upx;
	margin-right: 8upx;
}

.address-box__current {
	display: flex;
	align-items: center;
	justify-content: space-between;
	
}

.address-box__name {
	font-size: 30upx;
	color: #333333;
	font-weight: bold;
	padding: 22upx 0;
	// display: -webkit-box;
	// -webkit-box-orient: vertical;
	// -webkit-line-clamp: 1;
	// overflow: hidden;
	// word-break: break-all;
}
.address-box__name___address {
	color: #999;
	font-size: 28upx;
}
.address-box__list {
	padding-bottom: 20upx;
	margin-left: 40upx;
	border-bottom: 1upx solid #F5F5F5;
}

.address-box__detail {
	font-size: 24upx;
	color: #666666;
	margin-top: 14upx;
}

.address-box__btns {
	position: absolute;
	bottom: 0;
	left: 60upx;
	height: 80upx;
	line-height: 80upx;
	width: 100%;
	color: #666666;
	font-size: 28upx;
	border-top: 1upx solid #F5F5F5;
	display: flex;
	align-items: center;
}
.address-box__btns image {
	width: 14upx;
	height: 22upx;
	transform: rotate(90deg);
	margin-left: 10upx;
	opacity: 0.8;
}
.address-box__btns .up {
	transform: rotate(-90deg);
}

.address-box__re-location {
	display: flex;
	align-items: center;
	font-size: 28upx;
	flex-shrink: 0;
}

.address-box__re-location image {
	width: 36upx;
	height: 36upx;
	margin-right: 10upx;
}

.address-box__nearby-list .address-box__name {
	margin-left: 40upx;
	border-bottom: 1upx solid #F5F5F5;
}
.overflow-hidden {
	overflow: hidden;
}
.scroll-Y {
	height: 100%;
}
.absolute {
	position: absolute;
	width: 100%;
	left: 0;
	top: 0;
}
</style>
