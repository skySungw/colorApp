<template>
	<view class="my-card_container full-height absolute flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">贴子收藏</view>
		</cu-custom>
		<view v-if="list.length > 0" class="flex-1 overflow-hidden">
			<scroll-view scroll-y class="scroll-Y" @scrolltolower="onRefresh">
				<Card v-for="(item, index) in list" :key="index" :item="item" :source="0"></Card>
				<view v-if="noMoreFlag" class="text-center padding-sm">我是有底线的~</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { onFetchArticleCollection } from '@/api';
	import Card from '@/components/card.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Card
		},
		data() {
			return {
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
				},
				list: [], // 帖子列表
				noMoreFlag: false // 是否有更多数据
			}
		},
		
		onLoad() {
			this.getList();
		},
		onPullDownRefresh() {
			this.title = Math.random();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		// onReachBottom() {
		// 	if (this.hasNext()) {
		// 		this.params.current++;
		// 		this.getList();
		// 	}
		// },
		methods: {
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 获取帖子列表
			async getList() {
				try {
					const res = await onFetchArticleCollection(this.params);
					if (res.code === 200) {
						this.params.total = res.data.total;
						this.list = this.list.concat(res.data.records);
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						console.log("this.list", this.list);
					}
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			// 触底刷新
			onRefresh() {
				console.log('bottom');
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getList();
				} else {
					this.noMoreFlag = true;
				}
			}
		}
	}
</script>

<style lang="scss" lang="scss">
	.my-card_container {
	}
</style>
