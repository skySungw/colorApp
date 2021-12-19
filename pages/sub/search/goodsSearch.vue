<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">商品搜索</view>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入商品名" confirm-type="search" :value="params.goodsName" @input="onInput" @focus="onFocus"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @click="onHandleSearch">搜索</button>
			</view>
		</view>
		<view class="result">
			<view class="bg-white padding-lr">
				<!-- 搜索条件 -->
				<view v-if="flag">
					<view v-if="historyList.length" class="flex flex-bettwen-space flex-align-center padding-tb-sm">
						<text>历史搜索</text>
						<text class="cuIcon-delete lg text-gray" @click="onClear"></text>
					</view>
					<view class="padding-tb-sm" v-if="historyList.length">
						<text
							class="cu-tag radius padding-sm margin-bottom-sm"
							v-for="(item, index) in historyList"
							:key="index"
							:data-item="item"
							:data-index="index"
							@click="selectTag"
						>{{ item }}</text>
					</view>
				</view>
				<!-- 搜索结果 -->
				<view class="list" v-else>
					<Goods v-for="(item, index) in list" :key="index" :item="item" :source="0" :status="0"></Goods>
				</view>
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
			}
		},
		onLoad() {
			this.historyList = uni.getStorageSync('searchGoodsHistory') || [];
			uni.getLocation({
			    type: 'wgs84',
			    success: (res) =>{
						this.params.lat = res.latitude;
						this.params.lng = res.longitude
			    }
			});
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
			onClear() {
				this.historyList = [];
				uni.setStorageSync('searchGoodsHistory', '');
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
