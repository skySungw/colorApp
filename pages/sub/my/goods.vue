<template>
	<view class="my-goods_container full-height absolute flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="isBack" :isCustom="true">
			<view slot="content">我的商品</view>
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
					<Goods v-for="(item, index) in list" @refreshList="initParams" :key="index" :item="item" :source="1" :status="params.goodsState"></Goods>
					<view v-if="noMoreFlag" class="text-center padding-sm">我是有底线的~</view>
				</scroll-view>
			</view>
			<Empty v-else msg="暂无数据~" />
		</view>
	</view>
</template>

<script>
	import { onFetchGoodsBySelf } from '@/api';
	import Goods from '@/components/goods.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Goods,
			Empty
		},
		data() {
			return {
				customBar: this.CustomBar,
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					userId: '', // 可不传
					goodsState: 1, // 0 下架 1 上架 2 已售出
				},
				list: [], // 商品列表
				menu: [{
					id: 1,
					label: '上架中'
				},{
					id: 0,
					label: '已下架'
				}, {
					id: 2,
					label: '已售出'
				}],
				curTab: 0,
				scrollLeft:0,
				isBack: true,
				noMoreFlag: false // 是否有更多数据
			}
		},
		onLoad(options) {
			this.params.userId = options.id || '';
			this.isBack = options.isBack == 1 ? false : true;
			this.initParams();
		},
		// onReachBottom() {
		// 	if (this.hasNext()) {
		// 		this.params.current++;
		// 		this.getGoodsList();
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
				this.params.total = 0;
				this.list = [];
				this.getGoodsList();
			},
			// 获取商品列表
			async getGoodsList() {
				try {
					const res = await onFetchGoodsBySelf(this.params);
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
			tabSelect(e) {
				this.curTab = e.currentTarget.dataset.index;
				this.params.goodsState = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.index - 1) * 60;
				this.initParams();
			},
			// 触底刷新
			onRefresh() {
				console.log('bottom');
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getGoodsList();
				} else {
					this.noMoreFlag = true;
				}
			}
		}
	}
</script>

<style lang="scss" lang="scss">
	.my-goods_container {
	}
</style>
