<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">我卖出的</view>
		</cu-custom>
		<!-- 页面滚动 -->
		<scroll-view scroll-y @scrolltolower="onRefresh" style="height: 100vh">
			<view class="fixed fixed-shadow" :style="{top: customBar + 'px'}">
				<scroll-view scroll-x class="bg-white nav text-center">
					<view :class="['cu-item', {'text-green cur': item.id == curTab}]" v-for="(item, index) in menu" :key="index" @click="tabSelect" :data-item="item" :data-index="item.index">{{ item.label }}({{ item.count }})</view>
				</scroll-view>
			</view>
			<view class="padding-fixed">
				<Order v-for="(item, index) in list" :key="index" :item="item" :source="1"></Order>
			</view>
			<Empty v-if="list.length == 0" msg="暂无数据~" />
		</scroll-view>
		
	</view>
</template>

<script>
	import { onFetchOrderList, onSelectOrderCountByMemberId } from '@/api';
	import Order from '@/components/order.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Order,
			Empty
		},
		data() {
			return {
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					orderState: '', // 订单状态 0 待支付 1 待发货 2 待收货 9 已完成 10 已取消
					selType: 1 // 0 - 买到的， 1 - 卖出的
				},
				customBar: 0,
				menu: [{
					id: -1,
					label: '全部',
					count: 0
				}, {
					id: 1,
					label: '待发货',
					count: 0
				},  {
					id: 2,
					label: '待收货',
					count: 0
				}, {
					id: 9,
					label: '已完成',
					count: 0
				}],
				// menu: [{
				// 	id: 0,
				// 	label: '全部'
				// }, {
				// 	id: 1,
				// 	label: '待支付'
				// }, {
				// 	id: 2,
				// 	label: '待发货'
				// }, {
				// 	id: 3,
				// 	label: '待收货'
				// }, {
				// 	id: 4,
				// 	label: '已完成'
				// }],
				curTab: -1,
				scrollLeft:0,
				list: [], // 订单列表
			}
		},
		onLoad(options) {
			this.customBar = this.CustomBar;
		},
		onShow() {
			this.initParams(this.curTab);
		},
		// onReachBottom() {
		// 	if (this.hasNext()) {
		// 		this.params.current++;
		// 		this.getOrderList();
		// 	}
		// },
		methods: {
			async onSelectOrderTotal() {
				try {
					const res = await onSelectOrderCountByMemberId({
						selType: 1
					});
					console.log('res', res);
					if (res.code === 200) {
						// 全部
						this.menu[0]['count'] = res.data.sellOutCount;
						// 待发货
						this.menu[1]['count'] = res.data.orderStateCount[1];
						// 待收货
						this.menu[2]['count'] = res.data.orderStateCount[2];
						// 完成
						this.menu[3]['count'] = res.data.orderStateCount[9];
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams(type) {
				this.onSelectOrderTotal();
				
				this.curTab = type;
				this.params.current = 1;
				this.params.orderState = this.curTab != -1 ? this.curTab : '';
				this.list = [];
				this.getOrderList();
			},
			// 获取订单列表
			async getOrderList() {
				uni.showLoading();
				try {
					const res = await onFetchOrderList(this.params);
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
			onGoPage(item) {
				if (item['link']) {
					uni.navigateTo({
						url: item.link
					})
				}
			},
			tabSelect(e) {
				const item = e.currentTarget.dataset.item;
				const index = e.currentTarget.dataset.index;
				this.scrollLeft = (e.currentTarget.dataset.index - 1) * 60;
				this.initParams(item.id)
			},
			// 触底刷新
			onRefresh() {
				console.log('bottom');
				if (this.hasNext()) {
					this.params.current++;
					this.getOrderList();
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.padding-fixed {
		padding-top: 100upx;
	}
	.fixed-shadow {
		box-shadow: 0 0 10upx rgba(0, 0, 0, 0.5);
	}
	.flex-1 {
		flex: 1;
	}
	.flex-align-center {
		align-items: center;
	}
	.flex-space-between {
		justify-content: space-between;
	}
	.my-header {
		.my-header_container {
			padding: 20upx 24upx 0;
			background-color: #fff;
			.user-photo {
				width: 130upx;
				height: 130upx;
				border-radius: 50%;
			}
			.my-header-right {
				view {
					margin: 10upx 0;
					color: #666883;
					font-size: 30upx;
				}
				.nickname {
					font-size: 42upx;
				}
			}
		}
	}
	.fixed {
		position: fixed;
		width: 100%;
		z-index: 99;
		&.margin-top-sm {
			margin-top: 0;
			z-index: 999;
			box-shadow: 0 0 20upx rgba(0, 0, 0, .5);
		}
	}
</style>

