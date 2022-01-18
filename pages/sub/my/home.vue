<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">个人主页</view>
		</cu-custom>
		<!-- 页面滚动 -->
		<scroll-view scroll-y @scrolltolower="onRefresh" @scroll="scroll" style="height: 100vh">
			<!-- 头部 -->
			<view class="my-header">
				<view class="my-header_container flex flex-space-between">
					<image :src="info.wxHeadImg" class="user-photo" mode="aspectFit"></image>
					<view class="my-header-right padding-lr flex-1">
						<view class="nickname text-black text-bold">{{info.userName}}</view>
						<view>{{info.userDesc || ''}}</view>
					</view>
					<view v-if="userId" class="flex flex-align-center">
						<view class="cu-tag line-green" @tap="onHandleFollow">{{ followState == 1 ? '+ 关注' : '取消关注'}}</view>
					</view>
				</view>
				<view class="cu-list grid col-2 no-border">
					<view class="cu-item" @click="onGoPage({
						link: '/pages/sub/my/focus?id=' + userId
					})">
						<text>关注</text>
						<text>{{ memberDetail.followCount }}</text>
					</view>
					<view class="cu-item"  @click="onGoPage({
						link: '/pages/sub/my/follow?id=' + userId
					})">
						<text>粉丝</text>
						<text>{{ memberDetail.fansCount }}</text>
					</view>
				</view>
			</view>
			<!-- 我的发布 -->
			<view :class="['margin-top-sm', {'fixed': fixed}]" :style="{top: customBar + 'px'}">
				<view class="cu-bar bg-white" v-if="info.followState == 0">
					<view class="action text-black text-bold">
						我的发布
					</view>
				</view>
				<scroll-view scroll-x class="bg-white nav text-center">
					<view :class="['cu-item', {'text-green cur': index == curTab}]" v-for="(item, index) in menu" :key="index" @click="tabSelect" :data-id="index">{{ item.label }}({{ item.num }})</view>
				</scroll-view>
			</view>
			<view :class="[{'padding-fixed': fixed}]">
				<view class="margin-top-xs" v-if="curTab == 0">
					<Goods v-for="(item, index) in list" :key="index" :item="item"></Goods>
				</view>
				<view class="margin-top-xs" v-else>
					<Card v-for="(item, index) in list" :key="index" :item="item"></Card>
				</view>
				<Empty v-if="pageParam.total == 0" msg="暂无更多商品~" />
				<view v-if="pageParam.current != 1 && !hasNext()" class="text-center padding-top-sm text-grey text-sm">我已经到底了~</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import { selectMemberInfoByToken, onFetchGoodsByCreator, onFetchArticleByCreator, onHandleFollow } from '@/api/index';
	import Goods from '@/components/goods.vue';
	import Card from '@/components/card.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Goods,
			Card,
			Empty
		},
		data() {
			return {
				followState: 1,
				userId: '',
				customBar: 0,
				info: null, // 个人信息
				memberDetail: { // 粉丝数量
					fansCount: 0,
					followCount: 0,
					integralCount: 0
				},
				memberWorks: { // 发布数量
					ownerGoodsCount: 0,
					articleCount: 0
				},
				menu: [{
					num: 0,
					label: '商品'
				}, {
					num: 0,
					label: '帖子'
				}],
				curTab: 0,
				scrollLeft:0,
				fixed: false, // 是否吸顶
				list: [], // 商品列表
				pageParam: {
					size: 10,
					total: 0,
					current: 1,
					userId: '',
					goodsState: 1,// 0 - 下架， 1 - 上架， 2 - 已售出
					selType: 0 // 0 - 我发布的， 1 - 我参与过的
				}
			}
		},
		onLoad(options) {
			this.userId = options.id || '';
			this.pageParam.userId = options.id || '';
			this.getInfos();
			this.init();
		},
		onReachBottom() {
			if (this.hasNext()) {
				this.pageParam.current++;
				this.init('next');
			}
		},
		methods: {
			// 关注、取消关注
			async onHandleFollow() {
				let followState = 0; // 0 - 取关， 1 - 关注
				if (this.followState === 1) {
					followState = 1;
				}
				try {
					const res = await onHandleFollow({
						userId: this.pageParam.userId || '',
						followState: followState
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							duration: 2000
						})
						this.followState = this.followState == 1 ? 2 : 1;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 是否有下一页
			hasNext() {
				return this.pageParam.current < Math.ceil(this.pageParam.total / this.pageParam.size);
			},
			// 获取信息
			async getInfos() {
				try {
					const params = this.userId ? {
						userId: this.userId
					} : {}
					const res = await selectMemberInfoByToken(params);
					if (res.code === 200) {
						this.info = res.data;
						this.memberDetail = res.data.memberDetail;
						// this.memberWorks = res.data.memberWorks;
						this.menu[0].num = res.data.memberWorks.ownerGoodsCount;
						this.menu[1].num = res.data.memberWorks.articleCount;
						// 是否展示取消关注
						this.followState = res.data.followState;
					}
				} catch (err) {
					console.log('err', err);
				}
			},
			init(type) {
				// 下一页
				if (!type) {
					this.pageParam.current = 1;
					this.list = [];
				}
				if (this.curTab == 0) {
					this.getGoodsList();
				} else {
					this.getArticleList();
				}
			},
			// 获取商品列表
			async getGoodsList() {
				try {
					const res = await onFetchGoodsByCreator(this.pageParam);
					if (res.code === 200) {
						this.pageParam.total = res.data.total;
						if (this.pageParam.current == 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 获取商品列表
			async getArticleList() {
				try {
					const res = await onFetchArticleByCreator(this.pageParam);
					if (res.code === 200) {
						this.pageParam.total = res.data.total;
						if (this.pageParam.current == 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
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
				this.curTab = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.init();
			},
			// 滚动监听
			scroll(e) {
				if (e.detail.scrollTop > 170) {
					this.fixed = true;
					this.customBar = this.CustomBar;
				} else {
					this.fixed = false;
					this.customBar = 0;
				}
			},
			// 触底刷新
			onRefresh() {
				console.log('bottom');
			}
		}
	}
</script>
<style lang="scss" scoped>
	.padding-fixed {
		padding-top: 210upx;
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
		&.margin-top-sm {
			margin-top: 0;
			z-index: 999;
			box-shadow: 0 0 20upx rgba(0, 0, 0, .5);
		}
	}
</style>

