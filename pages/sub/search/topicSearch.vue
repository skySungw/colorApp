<template>
	<view class="full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">话题列表</view>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索你想参与的话题" confirm-type="search" :value="params.goodsName" @input="onInput" @focus="onFocus"></input>
			</view>
			<view class="action">
				<text class="text-black text-sm" @click="onCancel">取消</text>
			</view>
		</view>
		<view class="result flex-1 flex overflow-hidden">
			<!-- 搜索结果 -->
			<view v-if="list.length > 0" class="flex-1 overflow-hidden list padding-left padding-right">
				<scroll-view scroll-y class="scroll-Y" @scrolltolower="onRefresh">
					<view v-for="(item, index) in list" :key="index" @tap="onHandleSelectTopic(item)">
						<view class="title text-bold text text-black padding-top-sm">#第{{ index }}条话题名</view>
						<view class="text-sm text-grey">590篇帖子 | 3人在看</view>
					</view>
					<view v-if="noMoreFlag" class="text-center padding-sm text-grey text-sm">我是有底线的~</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import { onFetchGoodsList } from '@/api';
	import Goods from '@/components/goods';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Goods,
			Empty
		},
		data() {
			return {
				flag: true, // 是否显示搜索历史
				historyList: [], // 历史记录
				params: {
					goodsName: '', // 模糊匹配value
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					lat: '',
					lng: ''
				},
				list: [], // 宝贝列表
				noMoreFlag: false
			}
		},
		onLoad() {
			uni.getLocation({
			    type: 'wgs84',
			    success: (res) =>{
						this.params.lat = res.latitude;
						this.params.lng = res.longitude
			    }
			});
			// #ifdef APP-NVUE
			const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			const eventChannel = this.getOpenerEventChannel();
			// #endif
			this.eventChannel = eventChannel;
		},
		// onReachBottom() {
		// 	if (this.hasNext()) {
		// 		this.params.current++;
		// 		this.getGoodsList();
		// 	}
		// },
		methods: {
			onCancel() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 选中话题
			onHandleSelectTopic(item) {
				this.eventChannel.emit('onSelectTopic', {
					data: {
						title: '话题名',
						id: 333
					}
				});
				this.onCancel();
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 获取商品列表
			async getGoodsList() {
				try {
					const res = await onFetchGoodsList(this.params);
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
			selectTag(e) {
				const item = e.currentTarget.dataset.item;
				const index = e.currentTarget.dataset.index;
				this.historyList.splice(index, 1);
				this.params.goodsName = item;
				this.onHandleSearch();
			},
			onInput(e) {
				this.params.goodsName = e.detail.value;
				setTimeout(this.onHandleSearch, 500);
			},
			onFocus(e) {
				this.flag = true;
			},
			onHandleSearch() {
				if (!this.params.goodsName) return;
				if (!this.historyList.includes(this.params.goodsName)) {
					this.historyList.unshift(this.params.goodsName);
					uni.setStorageSync('searchGoodsHistory', this.historyList)
				}
				this.list = [];
				// 这里写接口,传this.params.goodsName的值
				this.getGoodsList();
				// 隐藏搜索历史
				this.flag = false;
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

<style lang="scss" scoped>
</style>
