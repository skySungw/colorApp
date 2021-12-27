<template>
	<view class="full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText"></view>
			<view slot="content">话题列表</view>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索你想参与的话题" confirm-type="search" :value="params.topicName" @input="onInput" @focus="onFocus"></input>
			</view>
			<view class="action">
				<text class="text-black text-sm" @click="onCancel">取消</text>
			</view>
		</view>
		<view class="result flex-1 flex overflow-hidden">
			<!-- 搜索结果 -->
			<view class="flex-1 overflow-hidden list padding-left padding-right">
				<scroll-view scroll-y class="scroll-Y" @scrolltolower="onRefresh">
					<view v-if="params.topicName">
						<view class="text-sm text-grey">话题添加</view>
						<view class="margin-top-sm margin-bottom-sm" @tap="addTopic">
							<text class="text-black"># {{ params.topicName }}</text>
						</view>
					</view>
					<view v-for="(item, index) in list" :key="index" @tap="onHandleSelectTopic" :data-item="item" class="padding-top-sm padding-bottom-sm">
						<view class="title text-bold text text-black"># {{ item.name }}</view>
						<view class="text-sm text-grey">
							<text v-if="item.articleCount > 0">{{ item.articleCount }}篇帖子</text>
							<text v-if="item.articleCount > 0 && item.articleLikeCount > 0"> | </text>
							<text v-if="item.articleLikeCount > 0">{{ item.articleLikeCount }}人在看</text></view>
					</view>
					<view v-if="noMoreFlag" class="text-center padding-sm text-grey text-sm">我是有底线的~</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import { onFetchTopic, onPublishTopic } from '@/api';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			Empty
		},
		data() {
			return {
				topicsList: [],
				params: {
					topicName: '', // 模糊匹配value
					size: 20, // 页码
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
			eventChannel.on('topicsList', (data) => {
				this.topicsList = data.topicsList;
			})
			// 获取话题列表
			this.getTopicList();
		},
		methods: {
			// 新增话题
			async addTopic() {
				if (!this.params.topicName) return false;
				console.log('params', this.params.topicName)
				try {
					const res = await onPublishTopic({
						name: this.params.topicName
					});
					if (res.code === 200) {
						this.eventChannel.emit('onSelectTopic', {
							data: res.data
						});
						this.onCancel();
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			onCancel() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 选中话题
			onHandleSelectTopic(e) {
				console.log('e', e)
				const item = e.currentTarget.dataset['item'];
				console.log('item', item);
				this.eventChannel.emit('onSelectTopic', {
					data: item
				});
				this.onCancel();
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 获取话题列表
			async getTopicList() {
				try {
					const res = await onFetchTopic(this.params);
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
			onInput(e) {
				this.params.topicName = e.detail.value;
				setTimeout(this.onHandleSearch, 500);
			},
			onFocus(e) {
				// this.flag = true;
			},
			onHandleSearch() {
				// if (!this.params.topicName) return;
				this.list = [];
				// 这里写接口,传this.params.topicName的值
				this.getTopicList();
			},
			// 触底刷新
			onRefresh() {
				console.log('bottom');
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getTopicList();
				} else {
					this.noMoreFlag = true;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
