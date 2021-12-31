<template>
	<view class="my-goods_list full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">产品库</view>
		</cu-custom>
		<!-- banner -->
		<view class="banner">
			<image src="@/static/test/7.jpg" mode="aspectFill"></image>
		</view>
		<!-- 搜索框 -->
		<view v-if="isSearchFocus" class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="商品名称" confirm-type="search" :value="searchValue" :focus="isSearchFocus" @input="onInput"></input>
			</view>
			<view class="action">
				<text @click="onSearchCancel">取消</text>
			</view>
		</view>
		<view v-else class="flex text-center padding-sm bg-white align-center">
			<view class="flex-1" v-for="(item, index) in menu" :key="item.id" @tap="onMenuChange" :data-index="index" :data-item="item">
				<text class="text-bold menu-text" :class="[{active: menuIndex === index}]">{{ item.name }}</text>
			</view>
			<view class="flex-1 serach text-right">
				<text class="cuIcon-search" @tap="showSearchBar"></text>
			</view>
		</view>
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
				menuIndex: 0,
				menu: [{
					id: 1,
					name: '圈友商品'
				}, {
					id: 2,
					name: '自营商品'
				}],
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
				list: [],
				isSearchFocus: false, // 是否显示搜索框 并 自动聚焦
				searchValue: '', // 搜索条件
				timer: null,
				time: 1000
			}
		},
		onLoad(options) {
			this.params.showcaseId = uni.getStorageSync('showcaseId') || '';
			
			this.init();
		},
		onShow() {
			
		},
		methods: {
			onSearchCancel() {
				this.isSearchFocus = false;
				this.searchValue = '';
			},
			onInput(e) {
				this.searchValue = e.detail.value;
				clearTimeout(this.timer);
				console.log('this.searchValue', this.searchValue)
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					this.getShowCaseList();
				}, this.time)
			},
			// 显示搜索栏
			showSearchBar() {
				this.isSearchFocus = true;
			},
			// 切换菜单
			onMenuChange(e) {
				this.menuIndex = e.currentTarget.dataset['index'];
				this.init();
			},
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

<style lang="scss" scoped>
	.my-goods_list {
		.banner {
			image {
				width: 100%;
				height: 200upx;
			}
		}
		.menu-text {
			position: relative;
			font-size: 28upx;
			&.active {
				color: #000;
				font-size: 30upx;
				&::after {
					content: '';
					position: absolute;
					left: -10upx;
					right: -10upx;
					height: 10upx;
					bottom: -14upx;
					border-radius: 10upx;
					background-color: rgba(255, 196, 91, .8);
					z-index: 0;
				}
			}
		}
		.serach {
			text {
				background-color: #F5F5F5;
				padding: 10upx;
			}
			.cuIcon-search {
				padding: 10upx 20upx;
				background-color: #F5F5F5;
				border-radius: 50upx;
			}
		}
	}
</style>
