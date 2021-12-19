<template>
	<view class="cu-card article no-card solid-bottom">
	  <view class="cu-item shadow">
	    <view class="title" @click="goPage">
	      <view class="text-cut">{{ item.articleTitle }}</view>
	    </view>
	    <view class="content" @click="goPage">
	      <image :src="item.articleContentImg[0]" :lazy-load="true" mode="aspectFill"></image>
	      <view class="desc">
	        <view class="text-content">
				<text class="text-gray">{{ item.createtime }}</text>
				<view>{{ item.articleDesc || '暂无内容' }}</view>
			</view>
	        <view v-if="source != 2" class="flex flex-align-center">
						<text class="cuIcon-attention text-gray padding-right">{{ item.articleDetail.collectionCount }}</text>
						<text class="cuIcon-message text-gray margin-left-sm">{{ item.articleDetail.commentCount }}</text>
	          <!-- <view class="cu-tag bg-red light margin-left-sm">活动</view> -->
	          <!-- <view class="cu-tag bg-green light sm round">史诗</view> -->
	        </view>
	      </view>
	    </view>
		<view v-if="status == 0" class="text-right">
			<text class="cu-tag line-red radius margin-right-sm margin-top-sm" @click="onHandleDelete">删除</text>
		</view>
		<view v-if="status == 2" class="text-right">
			<text class="cu-tag line-green radius margin-right-sm margin-top-sm text-green" @click="onHandleEdit">编辑</text>
		</view>
	  </view>
	</view>
</template>

<script>
	import { onDeleteArticle } from '@/api';
	export default {
		props: {
			item: {
				type: Object,
				default: null
			},
			source: {
				type: Number,
				default: 0 // 来源 1 - 我的-我的帖子，2 - 草稿
			},
			status: {
				type: Number,
				default: 1 // 2 - 草稿箱, 0 - 我的, 1 - 只读
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			goPage() {
				// 草稿只能编辑，不能查看
				if (this.source == 2) {
					uni.navigateTo({
						url: '/pages/sub/publish/index?draftId=' + this.item.articleCode
					})
					return false;
				}
				uni.navigateTo({
					url: '/pages/sub/article/article?id='+ this.item.articleCode
				})
			},
			// 删除
			onHandleDelete(e) {
				e.stopPropagation();
				uni.showModal({
					title: '确认删除？',
					confirmText: '确认',
					cancelText: '再想想',
					complete: (res) => {
						console.log('res', res);
						if (res.confirm) {
							this.deleteArticle();
						}
					}
				})
			},
			async deleteArticle() {
				try {
					let selType = this.source == 2 ? 1: 0;
					const res = await onDeleteArticle({
						articleCode: this.item.articleCode,
						selType
					});
					if (res.code === 200) {
						uni.showToast({
							title: '删除成功',
							icon: 'none'
						})
						setTimeout(() => {
							this.$emit('resetList');
						}, 2000)
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 草稿箱编辑
			onHandleEdit() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-card.article>.cu-item .content .desc {
		width: calc(100% - 240rpx);
	}
</style>
