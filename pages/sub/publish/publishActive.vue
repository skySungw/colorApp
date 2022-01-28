<template>
	<view class="publish-content bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">发布活动</view>
		</cu-custom>
		<!-- <rich-text :nodes="strings"></rich-text> -->
		<view class="padding padding-bottom-none">
			<view class="cu-form-group padding-lr-none">
				<input placeholder="请输入活动标题" v-model="activityTitle"></input>
			</view>
			<!-- <bgyxedit @bgyxchange="getbgyxinfo" :showdone="true" uploadurl="https://qsd.haoleen.com/getdata/getdata/appupimg" filename="img"></bgyxedit> -->
			<view class="padding-bottom content-border">
				<textarea v-model="activityContent" placeholder="请输入活动内容"></textarea>
			</view>
		</view>
		<view class="padding padding-bottom-none">
			<view class="cu-form-group padding-lr-none">
				<view class="title">开始时间</view>
				<picker mode="date" :value="activityStartTime" start="2020-01-01" end="2099-01-01" data-type="start" @change="onDateChange">
					<view class="picker">
						{{activityStartTime}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group padding-lr-none">
				<view class="title">结束时间</view>
				<picker mode="date" :value="activityEndTime" start="2020-01-01" end="2099-01-01" data-type="end" @change="onDateChange">
					<view class="picker">
						{{activityEndTime}}
					</view>
				</picker>
			</view>
		</view>
		<view class="padding padding-bottom-none">
			<checkbox-group @change="checkboxChange">
				<checkbox class="round margin-right-sm" :value="item.value" :checked="item.checked"></checkbox><text>{{item.name}}</text>
			</checkbox-group>
		</view>
		<view class="padding padding-bottom-none">
			<view>
				<text>请上传活动图片</text>
			</view>
			<view class="bg-white padding-top-sm padding-bottom-none">
				<view class="grid col-3 grid-square flex-sub">
					<view class="bg-img" v-for="(item, index) in imgList" :key="index" :data-url="imgList[index]">
						<image :src='imgList[index]' mode='aspectFill' @click="onViewImage"></image>
						<view class="cu-tag bg-red" @click="onDelImg" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @click="onChooseImage" v-if="imgList.length < 1">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed bottom text-right padding">
			<button type="primary" size="mini" class="padding-sm" @click="publish">发布</button>
		</view>
	</view>
</template>

<script>
	import { onCreateActivity } from '@/api';
	import ajaxUpload from '@/api/ajaxUpload';
	export default {
		data() {
		 return {
			activityTitle: '', // 活动标题
			activityContent: '', // 活动内容
			activityImg: [], // 活动图片
			enableSignUp: false, // 否开启报名 false 不开启, true 开启
			activityStartTime: null, // 活动开始时间 yyyy-MM-dd HH:mm:ss
			activityEndTime: null, // 活动结束时间
			imgList: [],
			item: {
				value: 1,
				name: '开启报名'
			},
		 }
		},
		created() {
			this.initDate();
		},
		methods: {
			onChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
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
												this.activityImg = this.activityImg.concat([upimg.data.fileUrl])
										} else {
											this.imgList = tempFilePaths
											this.activityImg = [upimg.data.fileUrl];
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
							this.activityImg.splice(index, 1);
						}
					}
				})
			},
			// 日期
			initDate() {
				const date = new Date();
				let month = date.getMonth() + 1;
				month = month > 9 ? month : '0' + month;
				this.activityStartTime = this.activityEndTime = date.getFullYear() + '-' + month + '-' + date.getDate();
			},
			// 选择日期
			onDateChange(e) {
				const value = e.detail.value;
				const type = e.currentTarget.dataset['type'];
				console.log('type', type, value)
				if (type == 'start') {
					this.activityStartTime = value
				} else {
					this.activityEndTime = value
				}
			},
			// checkbox
			checkboxChange: function (e) {
				const values = e.detail.value;
				if(values[0] == this.item.value) {
					this.item.checked = true;
				}else{
					this.item.checked = false;
				}
				this.enableSignUp = this.item.checked;
			},
			// 发布
			async publish() {
				try {
					const params = {
						activityTitle: this.activityTitle,
						activityContent: this.activityContent,
						activityImg: this.activityImg.toString(),
						enableSignUp: this.enableSignUp,
						activityStartTime: this.activityStartTime + ' 00: 00: 00',
						activityEndTime: this.activityEndTime + ' 00: 00: 00'
					};
					const res = await onCreateActivity(params);
					if (res.code === 200) {
						uni.showToast({
							title: '发布成功'
						});
						setTimeout(() => {
							let pages = getCurrentPages();//当前页
							let beforePage = pages[pages.length - 2];//上个页面
							beforePage.$vm.getArticleList()
							uni.navigateBack({
								delta: 1
							})
						}, 2000);
					}
				} catch(err) {
					console.log("err", err);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.publish-content {
		padding-bottom: 60upx;
		.publish-title {
			font-size: 40upx;
		}
	}
</style>
