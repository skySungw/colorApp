<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">我的粉丝</view>
		</cu-custom>
		<PersonCard :list="list" :source="1" :isFocus="isFocus"></PersonCard>
		<view v-if="pageParam.current != 1 && !hasNext()" class="text-center padding-top-sm text-grey text-sm">我已经到底了~</view>
		<Empty v-if="list.length == 0" msg="您还没有关注别人哦~"></Empty>
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
					selType: 1, // 0 - 我关注的， 1 - 关注我的
					userId: '',
					current: 1,
					size: 10,
					total: 0
				},
				list: []
			}
		},
		onLoad(options) {
			this.userId = options.id || '';
			this.isFocus = this.userId ? false : true;
			this.pageParam.userId = options.id || '';
			this.getFans();
		},
		onReachBottom() {
			if (this.hasNext()) {
				this.pageParam.current++;
				this.getFans();
			}
		},
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
			}
		}
	}
</script>

<style lang="scss" lang="scss">
	
</style>
