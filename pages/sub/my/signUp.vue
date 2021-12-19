<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">活动报名</view>
		</cu-custom>
			<ActiveCard v-for="(item, index) in list" :key="index" :item="item"></ActiveCard>
		<view v-if="pageParam.current != 1 && !hasNext()" class="text-center padding-top-sm text-grey text-sm">我已经到底了~</view>
		<Empty v-if="list.length == 0" msg="您还没有报名活动哦~"></Empty>
	</view>
</template>

<script>
	import { onFetchActivity } from '@/api';
	import ActiveCard from '@/components/activeCard';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			ActiveCard,
			Empty
		},
		data() {
			return {
				userId: '',
				pageParam: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					isSignUp: 1, // 查询自己已报名的活动
				},
				list: []
			}
		},
		onLoad(options) {
			this.userId = options.id;
			this.getArticleList();
		},
		onReachBottom() {
			if (this.hasNext()) {
				this.pageParam.current++;
				this.getArticleList();
			}
		},
		methods: {
			// 是否有下一页
			hasNext() {
				return this.pageParam.current < Math.ceil(this.pageParam.total / this.pageParam.size);
			},
			// 获取帖子页面
			async getArticleList() {
				uni.showLoading();
				try {
					let res = null;
					res = await onFetchActivity(this.pageParam);
					console.log('res', res)
					if (res.code === 200) {
						this.pageParam.total = res.data.total;
						if (this.pageParam.current === 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						console.log("this.list", this.list);
					}
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('errs', err);
				}
			},
		}
	}
</script>

<style lang="scss" lang="scss">
	
</style>
