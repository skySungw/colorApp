<template>
	<view class="full-height absolute flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">我的关注</view>
		</cu-custom>
		<view class="flex-1 flex overflow-hidden">
			<view v-if="list.length > 0" class="flex-1 overflow-hidden">
				<scroll-view scroll-y class="scroll-Y" @scrolltolower="onRefresh">
					<PersonCard :list="list" @resetList="getFans" :isFocus="isFocus"></PersonCard>
					<view v-if="noMoreFlag" class="text-center padding-sm text-grey text-sm">我是有底线的~</view>
				</scroll-view>
			</view>
			<Empty v-else msg="您的粉丝还在路上~"></Empty>
		</view>
	</view>
</template>

<script>
	import { onFetchFollowFans } from '@/api';
	import PersonCard from '@/components/personCard.vue';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			PersonCard,
			Empty
		},
		data() {
			return {
				userId: '',
				isFocus: true,
				pageParam: {
					selType: 0, // 0 - 我关注的， 1 - 关注我的
					userId: '',
					current: 1,
					size: 10,
					total: 0
				},
				list: [],
				noMoreFlag: false // 是否有更多数据
			}
		},
		onLoad(options) {
			this.userId = options.id || '';
			this.isFocus = this.userId ? false : true;
			this.pageParam.userId = options.id || '';
			this.getFans();
		},
		// onReachBottom() {
		// 	if (this.hasNext()) {
		// 		this.pageParam.current++;
		// 		this.getFans();
		// 	}
		// },
		methods: {
			// 是否有下一页
			hasNext() {
				return this.pageParam.current < Math.ceil(this.pageParam.total / this.pageParam.size);
			},
			// 获取粉丝列表
			async getFans() {
				try {
					const res = await onFetchFollowFans(this.pageParam);
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
			// 触底刷新
			onRefresh() {
				console.log('bottom');
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getFans();
				} else {
					this.noMoreFlag = true;
				}
			}
		}
	}
</script>

<style lang="scss" lang="scss">
</style>
