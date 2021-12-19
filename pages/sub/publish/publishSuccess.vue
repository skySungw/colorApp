<template>
	<view class="publish-success">
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<view slot="content"></view>
		</cu-custom>
		<!-- 发布成功 -->
	<!-- 	<view class="publish-success_title padding-top text-center">
			<view class="text-black text-bold text-xl">发布成功</view>
			<view class="text-xsl padding">
				<text class=" cuIcon-roundcheckfill text-green"></text>
			</view>
		</view> -->
		<!-- 商品图 -->
		<!-- <view class="cu-card case">
		  <view class="cu-item shadow">
		    <view class="image">
		      <image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix"></image>
		      <view class="cu-bar bg-shadeBottom">
		        <text class="text-cut">我可能就是商品的名称</text>
		      </view>
		    </view>
		    <view class="cu-list menu-avatar">
		      <view class="cu-item">
		        <view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
		        <view class="content flex-sub">
		          <view class="text-grey">张三</view>
		          <view class="text-gray text-sm flex justify-between">
		            我可能就是商品的名称
		          </view>
		        </view>
		      </view>
		    </view>
		  </view>
		</view> -->
		<poster ref="poster" :cancel="onCancel"/>
		<!-- 分享 -->
	<!-- 	<view>
			我是分享
		</view> -->
	</view>
</template>

<script>
	import poster from '@/components/poster';
	export default {
		components: {
			poster
		},
		data() {
			return {
				params: null
			}
		},
		onLoad(options) {
			if (options.params) {
				this.params = options.params;
			}
			console.log('this.prams', this.params);
		},
		mounted() {
			this.createdPoster();
		},
		methods: {
			createdPoster() {
				this.$refs.poster.createdPoster()
			},
			// 保存、取消后回调
			onCancel() {
				uni.redirectTo({
					url: '/pages/sub/my/goods?isBack=1'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish-success {
		.publish-success_title {
		}
	}
</style>
