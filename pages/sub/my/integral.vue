<template>
	<view class="my-integral_container">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">我的积分</view>
		</cu-custom>
		<view class="content padding-xs">
			<view class="text-bold text-center">当前积分：<text class="text-red">{{ score }}</text></view>
			<view class="margin-xs padding-top-sm">
				<view class="text-bold">获取方式</view>
				<view>一、每日签到</view>
				<view>二、每日发帖</view>
				<view>三、购物</view>
				<view>四、发布商品</view>
			</view>
			<view class="margin-xs padding-top-sm">
				<view class="text-bold">兑换规则</view>
				<view>一、每日签到</view>
				<view>二、每日发帖</view>
				<view>三、购物</view>
				<view>四、发布商品</view>
			</view>
			<view class="margin-xs padding-top-sm">
				<view class="text-bold">兑换方式</view>
				<view>一、联系客服</view>
				<view class="text-center">
					<image src="@/static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				score: 3000
			}
		}
	}
</script>

<style lang="scss">
	.my-integral_container {
		image {
			width: 200upx;
			height: 200upx;
		}
	}
</style>
