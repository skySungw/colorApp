<template>
	<view class="my-goods_container full-height absolute flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="isBack" :isCustom="true">
			<view slot="content">我的商品</view>
		</cu-custom>
		<view class="fixed-shadow">
			<scroll-view v-if="source === 0" scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view :class="['cu-item', 'flex-1', {'text-green cur': index == curTab}]" v-for="(item, index) in menu" :key="index" @click="tabSelect" :data-index="index" :data-id="item.id">{{ item.label }}</view>
				</view>
			</scroll-view>
		</view>
		<view class="flex-1 overflow-hidden flex justify-center">
			<view v-if="list.length > 0" class="flex-1 overflow-hidden">
				<scroll-view scroll-y class="scroll-Y" @scrolltolower="onRefresh">
					<view class="flex bg-white padding-left-sm" v-for="(item, index) in list" :key="index">
						<view v-if="publishSource == 4" class="flex align-center padding-right-sm" @tap="onGoodsChecked" :data-checked="item.checked" :data-index="index">
							<view class="icon" :class="[{'cuIcon-roundcheckfill text-green': item.checked}, {'cuIcon-roundcheck text-gray': !item.checked}]"></view>
						</view>
						<view class="flex-1">
							<Goods @refreshList="initParams" :item="item" :source="publishSource" :status="params.goodsState"></Goods>
						</view>
					</view>
					<view v-if="noMoreFlag" class="text-center padding-sm">我是有底线的~</view>
				</scroll-view>
			</view>
			<Empty v-else msg="暂无数据~" />
		</view>
		<view v-if="source !== 0" class="cu-bar bg-white tabbar border shop">
			<view class="selectall flex align-center padding-left" @tap="onCheckedAll">
				<view class="icon padding-right-sm" :class="[{'cuIcon-roundcheckfill text-green': allChecked}, {'cuIcon-roundcheck text-gray': !allChecked}]"></view>
				<view>全选</view>
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow-blur" @tap="onPublishToSite">发布到橱窗</button>
				<button class="cu-btn bg-red round shadow-blur" @tap="onPublish">创建商品</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { onFetchGoodsBySelf, onAddGoodsToShowCase } from '@/api';
	import Goods from '@/components/goods.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Goods,
			Empty
		},
		data() {
			return {
				publishSource: 1, // 个人商品列表 - 1， 个人发布到橱窗商品列表 - 4
				allChecked: false, // 发商品到橱窗，是否全选
				showcaseId: null, // 橱窗id
				goodsCode: null, // 创建商品后默认选中
				source: 0, // 0 - 无来源， 1 - 商品橱窗
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
			if (options.source) {
				this.source = options.source;
				this.showcaseId = options.showcaseId;
				this.publishSource = 4;
				if (options.goodsCode) {
					this.goodsCode = options.goodsCode;
				}
			}
			console.log('this.source', this.source);
			this.initParams();
		},
		methods: {
			onPublish() {
				uni.redirectTo({
					url: `/pages/sub/publish/publishGoods?source=${this.source}&showcaseId=${this.showcaseId}`
				})
			},
			// 发布商品到橱窗
			onPublishToSite() {
				const {num, result} = this.getOperateNums(true, true);
				if (!num) {
					uni.showToast({
						title: '请勾选商品',
						icon: 'none'
					});
					return false;
				}
				this.addGoods(result);
			},
			// 添加橱窗商品
			async addGoods(goodsIds) {
				try {
					const res = await onAddGoodsToShowCase({
						goodsIds, // [this.item.goodsCode],
						showcaseId: this.showcaseId
					});
					if (res.code === 200) {
						uni.showToast({
							title: '添加成功',
							icon: 'none',
							complete: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 1500)
							}
						})
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 获取选中/取消 总数量
			getOperateNums(flag, getResult) {
				let num = 0;
				let result = [];
				this.list.forEach((v, i) => {
					if (v.checked === flag) {
						num++;
						if (getResult) {
							result.push(v.goodsCode);
						}
					}
				});
				return getResult ? {
					num,
					result
				}: num;
			},
			// 选择商品
			onGoodsChecked(e) {
				const index = e.currentTarget.dataset['index'];
				const checked = e.currentTarget.dataset['checked'];
				console.log('checked', !checked, index);
				this.list[index].checked = !checked;
				console.log('this.list', this.list);
				// 判断是否是全选
				if (this.getOperateNums(true) === this.list.length) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
				this.$forceUpdate();
			},
			// 选中商品，单选
			// 是否全选
			onCheckedAll() {
				this.allChecked = !this.allChecked;
				this.list.forEach((v, i) => {
					this.list[i].checked = this.allChecked;
				})
				this.$forceUpdate();
			},
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
						this.list.forEach((v, i) => {
							if (this.goodsCode == v.goodsCode) {
								this.list[i].checked = true;
							} else {
								this.list[i].checked = false;
							}
						});
						if (this.goodsCode) {
							this.goodsCode = null;
						}
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
		.icon {
			font-size: 40upx;
		}
	}
</style>
