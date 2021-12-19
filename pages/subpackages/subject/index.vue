<template>
	<view class="box subject-box full-height flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="true" :isCustom="true">
			<view slot="content"></view>
		</cu-custom>
		<!-- 话题主体部分 -->
		<view class="subject-container flex-1 flex flex-direction">
			<!-- 话题介绍区 -->
			<view class="subject-container_header">
				<view class="subject-container_header__title"># {{ subjectName }}</view>
				<view class="subject-container_header__view flex flex-bettwen-space">
					<view>{{ subjectViewCount }} 浏览</view>
					<view class="cu-tag line-black round" @tap="onHandleCollect">
						<text :class="[{'cuIcon-favor': !collection}, {'cuIcon-favorfill': collection}, {'text-orange': collection}]"></text> {{ collectionText }}
					</view>
				</view>
				<view class="subject-container_header__introduce">
					只用十分钟,就能做出一道美味又营养的家常快手菜!告别不健康的外卖生活,就从简单易学的家常快手料理开始!
				</view>
			</view>
			<!-- 内容区 -->
			<view class="subject-container_content flex-1">
				<scroll-view class="subject-scroll">
					<view class="img_item">
						<view>第一区域瀑布流</view>
						<view>第一区域瀑布流</view><view>第一区域瀑布流</view><view>第一区域瀑布流</view>
					</view>
					<view class="img_item">
						<view>第二区域瀑布流</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subjectName: '红烧肉的做法',
				subjectViewCount: '35.9 亿',
				collection: false, // 是否收藏
				collectionText: ''
			}
		},
		onShow() {
			this.init();
		},
		methods:{
			init() {
				this.collectionText = `${this.collection ? '已' : ''}收藏`;
			},
			onHandleCollect() {
				this.collection = !this.collection;
				this.init();
			}
		}
	}
</script>

<style lang="scss">
	.box {
		&.subject-box {
			background-color: #FFFFFF;
		}
	}
	.subject-container {
		&_header {
			padding: 30upx 20upx;
			border-bottom: 1upx solid #eee;
			&__title {
				font-weight: bold;
				font-size: 36upx;
			}
			&__view {
				font-size: 24upx;
				color: #999;
				margin: 20upx 0;
			}
			&__introduce {
				font-size: 26upx;
				color: #666;
				letter-spacing: 2upx;
			}
		}
		&_content {
			overflow: hidden;
			.subject-scroll {
				.img_item {
					width: 48%;
					margin: 1%;
					display: inline-block;
					vertical-align: top;
				}
			}
		}
	}
</style>
