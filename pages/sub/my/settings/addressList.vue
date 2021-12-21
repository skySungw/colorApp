<template>
	<view class="my-setting_address">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">地址列表</view>
		</cu-custom>
		<view class="padding-lr bg-white">
			<view class="solid-bottom padding-tb flex" v-for="(item, index) in list" :key="index">
				<view class="address-left text-xl flex flex-align-center text-center">
					<text class="cuIcon-roundcheckfill text-green" v-if="item.receiveId == selectIndex"></text>
				</view>
				<view class="address-center flex-1 padding-right-sm" @click="onSelectAddress(item.receiveId)">
					<view class="username margin-bottom-xs">
						{{ item.receiveContact }}<text class="margin-left text-gray">{{ item.receivePhone }}</text>
					</view>
					<text class="text-grey text-sm">
						{{ item.receiveDetailAddress }}
					</text>
				</view>
				<view class="address-right text-xl flex flex-align-center">
					<text class="cuIcon-edit margin-right-xs" @click="onGoDetail(item)"></text>
				</view>
			</view>
		</view>
		<!-- 新增 -->
		<button class="fixed bottom" type="primary" @click="onGoDetail(null)">新增</button>
	</view>
</template>

<script>
	import { onFetchAddressList } from '@/api';
	export default {
		data() {
			return {
				selectIndex: '', // 列表中，选中的地址id
				list: [], // 地址列表
			}
		},
		onLoad(options) {
			this.selectIndex = options.id || '';
			this.getAddressList();
		},
		methods: {
			async getAddressList() {
				try {
					const res = await onFetchAddressList();
					if (res.code === 200) {
						this.list = res.data;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 点击选中
			onSelectAddress(id) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上一个页面'
				prevPage.$vm.onFetchAddressInfo(id);
				uni.navigateBack({
					delta: 1
				})
			},
			// 编辑
			onGoDetail(item) {
				console.log('item', item);
				let url = `/pages/sub/my/settings/address`;
				url += item ? '?id=' + item : '';
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-setting_address {
		padding-bottom: 100upx;
		.address-left {
			width: 50upx;
		}
	}
</style>
