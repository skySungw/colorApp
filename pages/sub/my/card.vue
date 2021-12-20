<template>
	<view class="my-card_container full-height absolute flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">我的贴子</view>
		</cu-custom>
		<view class="fixed-shadow">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view :class="['cu-item', 'flex-1', {'text-green cur': index == curTab}]" v-for="(item, index) in menu" :key="index" @click="tabSelect" :data-index="index" :data-id="item.id">{{ item.label }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="flex-1 overflow-hidden flex">
			<view v-if="list.length > 0" class="flex-1 overflow-hidden">
				<scroll-view scroll-y class="scroll-Y" @scrolltolower="onRefresh">
					<Card v-for="(item, index) in list" @resetList="initParams" :key="index" :item="item" :source="1" :status="curTab"></Card>
					<view v-if="noMoreFlag" class="text-center padding-sm">我是有底线的~</view>
				</scroll-view>
			</view>
			<Empty v-if="list.length == 0" msg="暂无数据~" />
		</view>
	</view>
</template>

<script>
	import { onFetchArticleBySelf } from '@/api';
	import Card from '@/components/card.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Card,
			Empty
		},
		data() {
			return {
				customBar: this.CustomBar,
				list: [], // 帖子列表
				menu: [{
					id: 0,
					label: '我发布的'
				}, {
					id: 1,
					label: '我参与的'
				}],
				curTab: 0,
				scrollLeft:0,
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					userId: '',
					selType: 0, // 0 - 我发布的，1 - 我参与的
				},
				noMoreFlag: false // 是否有更多数据
			}
		},
		onLoad(options) {
			this.params.userId = options.userId || '';
			this.initParams();
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		// onReachBottom() {
		// 	if (this.hasNext()) {
		// 		this.params.current++;
		// 		this.getArticleList();
		// 	}
		// },
		methods: {
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams() {
				this.noMoreFlag = false;
				this.params.current = 1;
				this.getArticleList();
			},
			// 获取帖子页面
			async getArticleList() {
				uni.showLoading();
				try {
					let res = await onFetchArticleBySelf(this.params);
					if (res.code === 200) {
						this.params.total = res.data.total;
						if (this.params.current === 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
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
			tabSelect(e) {
				this.curTab = e.currentTarget.dataset.index;
				this.params.selType = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.index - 1) * 60;
				this.initParams();
			},
			// 触底刷新
			onRefresh() {
				console.log('bottom');
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getArticleList();
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
