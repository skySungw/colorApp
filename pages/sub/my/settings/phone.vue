<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">更改手机号</view>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<input placeholder="请输入手机号码" :value="value" @input="onInput"></input>
			<button type="primary" size="mini" @click="onSave">保存</button>
		</view>
		<view class="text-grey padding-sm">请输入您常用的手机号码,仅用在发布商品时选择展示</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '15325214125'
			}
		},
		methods: {
			onSave() {
				console.log('this.value', this.value)
			},
			onInput(e) {
				this.value = e.target.value;
			}
		}
	}
</script>

<style>
</style>
