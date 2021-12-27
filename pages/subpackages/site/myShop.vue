<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">我的橱窗</view>
		</cu-custom>
		<!-- 页面滚动 -->
		<scroll-view scroll-y @scrolltolower="onRefresh" style="height: 100vh">
			<view>
				<view @tap="onAdd">
					<text>添加</text>
				</view>
				<view>
					<text>搜索</text>
				</view>
			</view>
			<view class="padding-fixed">
				<Goods
					v-for="(item, index) in list"
					:key="index"
					:item="item"
					:source="3"
					:status="1"
					:showcaseId="params.showcaseId"
					@refreshList="initParams"
				></Goods>
			</view>
			<Empty v-if="list.length == 0" msg="暂无数据~" />
		</scroll-view>
		
	</view>
</template>

<script>
	import { onFetchShowcasePage } from '@/api';
	import { onFetchOwnerStateShowcase } from '@/api';
	
	import Goods from '@/components/goods';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Goods,
			Empty
		},
		data() {
			return {
				idStatus: 1, // 0 - 拥有者， 1 - 游客
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					showcaseId: '', // 商品橱窗id
					selType: '' ,// 不传递为全部 0 普通C我添加的商品 1 圈友商品 2 自营商品
					goodsName: '',
				},
				scrollLeft:0,
				list: [], // 订单列表
			}
		},
		onLoad(options) {
			let showcaseId = options.showcaseId || uni.getStorageSync('showcaseId');
			this.params.showcaseId = showcaseId;
			
			this.getVisitOwner(showcaseId);
			
			this.initParams(this.curTab);
		},
		methods: {
			// 橱窗商品列表
			onAdd() {
				uni.navigateTo({
					url: '/pages/subpackages/site/goodsList'
				})
			},
			// 获取身份标识
			async getVisitOwner(showcaseId) {
				try {
					const res = await onFetchOwnerStateShowcase({
						showcaseId
					});
					if (res.code === 200) {
					// "status": 1身份状态 0 橱窗拥有者 1 游客
						this.idStatus = res.data;
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
				this.curTab = type;
				this.params.current = 1;
				this.list = [];
				this.getShowCaseList();
			},
			// 获取商品列表
			async getShowCaseList() {
				uni.showLoading();
				try {
					const res = await onFetchShowcasePage(this.params);
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
					this.getShowCaseList();
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

