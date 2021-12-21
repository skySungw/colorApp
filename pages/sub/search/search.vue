<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">搜索</view>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="请输入搜索关键字" confirm-type="search" :value="params.articleName" @input="onInput" @focus="onFocus"></input>
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
					<view>
						<scroll-view scroll-x class="nav text-center">
						  <view class="cu-item" :class="[{'text-bold cur': index == tabCur}]" v-for="(item, index) in menuList" :key="index" @click="tabSelect" :data-id="index" :data-item="item">
						    {{ item.label }}
						  </view>
						</scroll-view>
					</view>
					<view v-if="tabCur == 2">
						<ActiveCard v-for="(item, index) in list" :key="index"></ActiveCard>
					</view>
					<view v-else>
						<Card v-for="(item, index) in list" :key="index" :item="item" :source="1" :status="1"></Card>
					</view>
					<Empty v-if="list.length == 0" msg="暂无搜索结果~" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { onFetchArticle } from '@/api';
	import Card from '@/components/card';
	import ActiveCard from '@/components/activeCard';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Card,
			ActiveCard,
			Empty
		},
		data() {
			return {
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					articleType: 0, // 0 - 正常帖子，1 - 官方帖子
					articleName: '', // 模糊搜索关键字
				},
				flag: true, // 是否显示搜索历史
				historyList: [], // 历史记录
				list: [] ,// 搜索记录
				tabCur: 0,
				scrollLeft:0,
				menuList: [{
					index: 0,
					label: '广场'
				}, {
					index: 1,
					label: '官方'
				}, {
					index: 2,
					label: '活动'
				}]
			}
		},
		onLoad(options) {
			this.historyList = uni.getStorageSync('searchHistory') || [];
			this.tabCur = options.type || 0;
			console.log('type', this.tabCur);
			this.initParams(this.tabCur);
		},
		onReachBottom() {
			if (this.hasNext()) {
				this.params.current++;
				this.getArticleList();
			}
		},
		// created() {
		// 	this.historyList = uni.getStorageSync('searchHistory') || [];
		// },
		methods: {
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams(type) {
				this.tabCur = type;
				this.params.current = 1;
				this.params.articleType = this.tabCur;
				this.list = [];
			},
			// 获取帖子页面
			async getArticleList() {
				try {
					const res = await onFetchArticle(this.params);
					if (res.code === 200) {
						this.params.total = res.data.total;
						if (this.params.current === 1) {
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
			},
			selectTag(e) {
				const item = e.currentTarget.dataset.item;
				const index = e.currentTarget.dataset.index;
				this.historyList.splice(index, 1);
				this.params.articleName = item;
				this.onHandleSearch();
			},
			onInput(e) {
				this.params.articleName = e.detail.value;
			},
			onFocus(e) {
				this.flag = true;
			},
			tabSelect(e) {
				const data = e.currentTarget.dataset;
				this.tabCur = data.id;
				this.scrollLeft = (data.id-1) * 60;
				console.log('this.tabCur', this.tabCur);
				this.initParams(this.tabCur);
				this.getArticleList();
			},
			onHandleSearch() {
				if (!this.params.articleName) return;
				if (!this.historyList.includes(this.params.articleName)) {
					this.historyList.unshift(this.params.articleName);
					uni.setStorageSync('searchHistory', this.historyList)
				}
				this.getArticleList();
				// 隐藏搜索历史
				this.flag = false;
			},
			onClear() {
				this.historyList = [];
				uni.setStorageSync('searchHistory', '');
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
