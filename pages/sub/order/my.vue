<template>
	<view class="full-height absolute flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">我买到的</view>
		</cu-custom>
		<!-- 页面滚动 -->
		<view class="flex-1 flex flex-direction overflow-hidden">
			<view class="fixed-shadow">
				<scroll-view scroll-x class="bg-white nav text-center">
					<view :class="['cu-item', {'text-green cur': item.id == curTab}]" v-for="(item, index) in menu" :key="index" @click="tabSelect" :data-item="item" :data-index="item.index">{{ item.label }}({{ item.count }})</view>
				</scroll-view>
			</view>
			<view class="flex-1 overflow-hidden">
				<scroll-view scroll-y class="scroll-Y" @scrolltolower="onRefresh">
					<view v-if="list.length > 0">
						<Order v-for="(item, index) in list" :key="index" :item="item"></Order>
					</view>
					<Empty v-else msg="暂无搜索结果~" />
					<view v-if="noMoreFlag" class="text-center padding-sm">我是有底线的~</view>
				</scroll-view>
			</view>
		</view>
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
					selType: 0 // 0 - 买到的， 1 - 卖出的
				},
				customBar: 0,
				menu: [{
					id: -1,
					label: '全部',
					count: 0
				}, {
					id: 0,
					label: '待支付',
					count: 0
				}, {
					id: 1,
					label: '待发货',
					count: 0
				}, {
					id: 2,
					label: '待收货',
					count: 0
				}, {
					id: 9,
					label: '已完成',
					count: 0
				}, {
					id: 10,
					label: '已取消',
					count: 0
				}],
				curTab: -1, // 全部
				scrollLeft:0,
				list: [], // 订单列表
				noMoreFlag: false // 是否有更多数据
			}
		},
		onLoad(options) {
			this.customBar = this.CustomBar;
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
						selType: 0
					});
					console.log('res', res);
					if (res.code === 200) {
						// 全部
						this.menu[0]['count'] = res.data.buyCount;
						// 待支付
						this.menu[1]['count'] = res.data.orderStateCount[0];
						// 待发货
						this.menu[2]['count'] = res.data.orderStateCount[1];
						// 待收货
						this.menu[3]['count'] = res.data.orderStateCount[2];
						// 完成
						this.menu[4]['count'] = res.data.orderStateCount[9];
						// 取消
						this.menu[5]['count'] = res.data.orderStateCount[10];
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
				this.noMoreFlag = false;
				this.curTab = type;
				this.params.current = 1;
				this.params.orderState = this.curTab != -1 ? this.curTab : '';
				this.list = [];
				this.getOrderList();
			},
			// 获取订单列表
			async getOrderList() {
				try {
					const res = await onFetchOrderList(this.params);
					if (res.code === 200) {
						this.params.total = res.data.total;
						this.list = this.list.concat(res.data.records);
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						console.log("this.list", this.list);
					}
				} catch(err) {
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
					this.noMoreFlag = false;
					this.params.current++;
					this.getOrderList();
				} else {
					this.noMoreFlag = true;
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
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

