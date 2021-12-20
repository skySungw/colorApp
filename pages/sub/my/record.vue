<template>
	<view class="my-record_container full-height absolute flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">浏览纪录</view>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view :class="['cu-item', 'flex-1', {'text-green cur': index == curTab}]" v-for="(item, index) in menu" :key="index" @click="tabSelect" :data-id="index">{{ item.label }}</view>
			</view>
		</scroll-view>
		<view class="flex-1 overflow-hidden" v-if="list.length > 0">
			<scroll-view scroll-y class="scroll-Y" @scrolltolower="onRefresh">
				<view v-if="curTab == 0">
					<Goods v-for="(item, index) in list" :key="index" :item="item" :source="0" :status="curTab"></Goods>
				</view>
				<view v-if="curTab == 1">
					<Card v-for="(item, index) in list" :key="index" :item="item" :source="1" :status="curTab"></Card>
				</view>
				<view v-if="noMoreFlag" class="text-center padding-sm">我是有底线的~</view>
			</scroll-view>
		</view>
		<Empty v-else :msg="emptyMsg" />
		<!-- <view v-if="params.current != 1 && !hasNext()" class="text-center padding-top-sm text-grey text-sm">我已经到底了~</view> -->
	</view>
</template>

<script>
	import { onFetchGoodsRecords, onFetchArticleRecords } from '@/api';
	import Goods from '@/components/goods.vue';
	import Card from '@/components/card.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Goods,
			Card,
			Empty
		},
		data() {
			return {
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
				},
				emptyMsg: '',
				customBar: this.CustomBar,
				list: [], // 商品列表
				menu: [{
					label: '商品'
				}, {
					label: '帖子'
				}],
				curTab: 0,
				scrollLeft:0,
				noMoreFlag: false // 是否有更多数据
			}
		},
		onLoad() {
			this.initParams();
		},
		// onReachBottom() {
		// 	if (this.hasNext()) {
		// 		this.params.current++;
		// 		this.getData();
		// 	}
		// },
		methods: {
			// 获取当前分类下数据
			getData() {
				uni.showLoading({
					title: '数据加载中...',
					mask: false
				});
				if (this.curTab) {
					this.emptyMsg = '您还没有浏览商品哦~';
					this.getArticleList();
				} else {
					this.emptyMsg = '您还没有浏览帖子哦~';
					this.getGoodsList();
				}
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams() {
				this.params.current = 1;
				this.params.total = 0;
				this.list = [];
				this.getData();
			},
			// 获取商品列表
			async getGoodsList() {
				try {
					const res = await onFetchGoodsRecords(this.params);
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
			// 获取帖子列表
			async getArticleList() {
				try {
					const res = await onFetchArticleRecords(this.params);
					if (res.code === 200) {
						this.params.total = res.data.total;
						this.list = this.list.concat(res.data.records);
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						// console.log("this.list", this.list);
					}
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			tabSelect(e) {
				this.curTab = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.initParams();
			},
			// 触底刷新
			onRefresh() {
				console.log('bottom');
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getData();
				} else {
					this.noMoreFlag = true;
				}
			}
		}
	}
</script>

<style lang="scss" lang="scss">
	.my-record_container {
	}
</style>
