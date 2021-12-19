<template>
	<view>
		<scroll-view scroll-x class="nav text-center padding-top-xl">
		  <view class="cu-item" :class="[{'text-bold cur': index == tabCur}]" v-for="(item, index) in list" :key="index" @click="tabSelect" :data-id="index" :data-item="item">
		    {{ item.label }}
		  </view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabCur: 0,
				scrollLeft:0,
				list: [{
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
		methods: {
			 tabSelect(e) {
				 const data = e.currentTarget.dataset;
			    this.tabCur = data.id;
			    this.scrollLeft = (data.id-1) * 60;
					// 执行回调
					uni.$emit('operateHandle', data.item);
			  }
		}
	}
</script>

<style>

</style>
