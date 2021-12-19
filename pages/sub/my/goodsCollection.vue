<template>
	<view class="my-goods_container">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">商品收藏</view>
		</cu-custom>
		<view>
			<Goods v-for="(item, index) in list" :key="index" :item="item" :source="0"></Goods>
		</view>
		<Empty v-if="list.length == 0" msg="暂无数据~" />
	</view>
</template>

<script>
	import { onFetchGoodsCollection } from '@/api';
	import Goods from '@/components/goods.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Goods,
			Empty
		},
		data() {
			return {
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
				},
				list: [], // 宝贝列表
			}
		},
		onLoad() {
			this.getGoodsList();
		},
		onPullDownRefresh() {
			this.title = Math.random();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		onReachBottom() {
			if (this.hasNext()) {
				this.params.current++;
				this.getGoodsList();
			}
		},
		methods: {
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 获取商品列表
			async getGoodsList() {
				try {
					const res = await onFetchGoodsCollection(this.params);
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
		}
	}
</script>

<style lang="scss" lang="scss">
	.my-goods_container {
		
	}
</style>
