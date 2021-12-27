<template>
	<view class="my-settings_container">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">设置</view>
		</cu-custom>
		<view class="cu-list menu">
			<view class="cu-item arrow" @click="goPage('/pages/sub/my/settings/photo', info.wxHeadImg)">
				<view class="content">
					<text class="text-grey">头像</text>
				</view>
				<view class="action">
					<view class="cu-avatar-group">
						<image v-if="info.wxHeadImg" class="cu-avatar_self" :src="info.wxHeadImg" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="cu-item arrow" @click="goPage('/pages/sub/my/settings/nickname', info.userName)">
				<view class="content">
					<text class="text-grey">昵称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{ info.userName }}</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="goPage('/pages/sub/my/settings/wxNumber', info.wxNumber)">
				<view class="content">
					<text class="text-grey">微信号</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{ info.wxNumber }}</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="text-grey">性别{{info.userSex}}</text>
				</view>
				<picker @change="onPickerChange" :value="info.userSex" :range="picker">
					<view class="picker">
						{{ picker[info.userSex] }}
					</view>
				</picker>
			</view>
			<view class="cu-item arrow" @click="goPage('/pages/sub/my/settings/sign', info.userDesc || '')">
				<view class="content">
					<text class="text-grey">个性签名</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{ info.userDesc || '' }}</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @click="goPage('/pages/sub/my/settings/addressList')">
				<view class="content">
					<text class="text-grey">我的地址</text>
				</view>
			</view> -->
			<!-- <view class="cu-item arrow" @click="goPage('/pages/sub/my/settings/phone')"> -->
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">手机号码</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{info.userPhone}}</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="goPage('/pages/sub/my/settings/wechart', info.wxQrCode)">
				<view class="content">
					<text class="text-grey">微信二维码</text>
				</view>
				<view class="action">
					<text class="cuIcon-qr_code lg text-gray"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { selectMemberInfoByToken, updateUserInfo } from '@/api/index';
	export default {
		data() {
			return {
				info: null,
				picker: ['男', '女'],
			}
		},
		onShow() {
			this.getInfos();
		},
		methods: {
			onPickerChange(e) {
				this.info.userSex = e.detail.value
				this.onHandleUpdate();
			},
			async onHandleUpdate() {
				try {
					const res = await updateUserInfo({
						userSex: this.info.userSex
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							duration: 2000
						});
						
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			goPage(url, param) {
				let nextUrl = url;
				if (param) {
					nextUrl = `${url}?param=${param}`;
				}
				uni.navigateTo({
					url: nextUrl
				})
			},
			// 获取信息
			async getInfos() {
				try {
					const res = await selectMemberInfoByToken();
					if (res.code === 200) {
						this.info = res.data;
						if (!this.info.userSex) {
							this.info.userSex = 0;
						}
					}
				} catch (err) {
					console.log('err', err);
				}
			},
		}
	}
</script>

<style lang="scss" lang="scss">
	.cu-avatar_self {
		width: 80upx;
		height: 80upx;
		border-radius: 10upx;
	}
</style>
