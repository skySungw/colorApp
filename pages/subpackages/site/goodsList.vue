<template>
	<view class="">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">产品库</view>
		</cu-custom>
		<view>
			<Goods
				v-for="(item, index) in list"
				:key="index"
				:item="item"
				:source="2"
				:status="1"
				:showcaseId="params.showcaseId"
				@refreshList="init"
			></Goods>
		</view>
	</view>
</template>

<script>
	import { onFetchGoodsList } from '@/api';
	import Goods from '@/components/goods';
	export default {
		components: {
			Goods
		},
		data() {
			return {
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					lat: '',
					lng: '',
					goodsName: '', // 商品名，模糊搜索
					sortType: 0, // 排序规则 不传或者 0 为 距离正序 1 距离倒叙 2 价格正序 3 价格倒叙
					goodsType: '', // 0 C端商品 1 官方自营 默认C端商品
					showcaseId: '', // 商品橱窗id
				},
				list: []
			}
		},
		onLoad(options) {
			this.params.showcaseId = uni.getStorageSync('showcaseId') || '';
			
			this.init();
		},
		onShow() {
			
		},
		methods: {
			init() {
				this.params.current = 1;
				this.params.total = 0;
				this.list = [];
				this.getGoodsList();
			},
			async getGoodsList() {
				try {
					const res = await onFetchGoodsList(this.params);
					if (res.code === 200) {
						this.params.total = res.data.total;
						if (this.params.current == 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						console.log("this.list", this.list);
					}
				} catch(err) {
					console.log('err', err);
				}
			}
		}
	}
</script>

<style>
</style>
