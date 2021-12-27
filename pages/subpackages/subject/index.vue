<template>
	<view class="box subject-box full-height flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="true" :isCustom="true">
			<view slot="content"></view>
		</cu-custom>
		<!-- 话题主体部分 -->
		<view class="subject-container flex-1 flex flex-direction overflow-hidden">
			<!-- 话题介绍区 -->
			<view class="subject-container_header">
				<view class="subject-container_header__title"># {{ topicDetail.name }}</view>
				<!-- <view class="subject-container_header__view flex flex-bettwen-space">
					<view>{{ subjectViewCount }} 浏览</view>
					<view class="cu-tag line-black round" @tap="onHandleCollect">
						<text :class="[{'cuIcon-favor': !collection}, {'cuIcon-favorfill': collection}, {'text-orange': collection}]"></text> {{ collectionText }}
					</view>
				</view>
				<view class="subject-container_header__introduce">
					只用十分钟,就能做出一道美味又营养的家常快手菜!告别不健康的外卖生活,就从简单易学的家常快手料理开始!
				</view> -->
			</view>
			<!-- 内容区 -->
			<view class="subject-container_content flex-1 flex overflow-hidden">
				<view style="display:none">
				  <image v-for="(item, index) in images" :key="item.id" :id="item.id" :src="item.pic" @load="onImageLoad"></image>
				</view>
				<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll-Y flex-1 subject-scroll">
					<view class="img_item" v-for="(colItem, colIndex) in cols" :key="colIndex">
						<view v-for="(item, index) in colItem" :key="item.id" @tap="goPage" :data-item="item">
							<image class="img-face" :src="item.pic" :style="[{'height':item.height + 'px'}]"></image>
							<view class="img-topic flex">
								<view class="img-topic_tag flex align-center" v-for="(topicItem, topicIndex) in item.articleTopic" :key="topicIndex">
									<text>#</text> {{ topicItem.name }}
								</view>
							</view>
							<view class="card-title">{{ item.articleTitle }}</view>
							<view class="card-info flex flex-bettwen-space margin-bottom-sm">
								<view class="card-header text-sm text-gray flex align-center">
									<image :src="item.wxHeadImg"></image>
									<text>{{ item.memberName }}</text>
								</view>
								<view>
									<view class="cu-tag line-grey sm round" @tap.stop="onZan" :data-item="item" :data-colindex="colIndex" :data-index="index">
										<text
											class="margin-right-sm"
											:class="[{'cuIcon-appreciatefill text-red': item.articleDetail.isLikes}, {'cuIcon-appreciate text-gray': !item.articleDetail.isLikes}]"
										></text>
										{{ item.articleDetail.likesCount }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<Empty v-if="!initPage && list.length == 0" msg="暂无数据~" />
		</view>
	</view>
</template>

<script>
	import { onFetchTopicById, onFetchArticle } from '@/api';
	
	let col1H = 0;
	let col2H = 0;
	export default {
		data() {
			return {
				initPage: true, // 是否获取完数据
				// subjectViewCount: '35.9 亿',
				// collection: false, // 是否收藏
				// collectionText: '',
				imgWidth: 0, // 图片宽度
				cols: [[], []],
        loadingCount: 0,
				images: [],
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					articleType: 0, // 0 - 正常帖子，1 - 官方帖子
					articleTopic: 0, // 话题 id
					lat: '',
					lng: ''
				},
				topicDetail: {
					name: '',
				}
			}
		},
		onLoad(options) {
			this.params.articleTopic = options.id;
			// 设置话题
			this.getTopicById(options.id);
			// 获取页面高度
			uni.getSystemInfo({
				success: (res) => {
					let ww = res.windowWidth;
					let wh = res.windowHeight;
					let imgWidth = ww * 0.48;
					let scrollH = wh;
					// 图片宽度
					this.imgWidth = imgWidth;
					this.getArticleList();
				}
			});
		},
		onShow() {
			// this.init();
		},
		methods:{
			async getTopicById(topicId) {
				try {
					const res = await onFetchTopicById({
						topicId
					});
					if (res.code === 200) {
						this.topicDetail = res.data;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// init() {
			// 	this.collectionText = `${this.collection ? '已' : ''}收藏`;
			// },
			// 获取话题下文章列表
			async getArticleList() {
				try {
					const res = await onFetchArticle(this.params);
					console.log('res', res)
					if (res.code === 200) {
						this.initPage = false;
						this.params.total = res.data.total;
						// 整合图片
						this.loadImages(res.data.records);
						
						if (this.params.current === 1) {
							this.list = res.data.records;
						} else {
							this.list = this.list.concat(res.data.records);
						}
					}
				} catch(err) {
					this.initPage = false;
					console.log('err', err);
				}
			},
			// onHandleCollect() {
			// 	this.collection = !this.collection;
			// 	this.init();
			// },
			// 滚动到底部
			lower(e) {
				console.log('bottom');
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getArticleList();
				} else {
					this.noMoreFlag = true;
				}
				// this.loadImages();
			},
			// 页面图片，分组
			onImageLoad(e) {
				let imageId = e.currentTarget.id;
				let oImgW = e.detail.width;         //图片原始宽度
				let oImgH = e.detail.height;        //图片原始高度
				let imgWidth = this.imgWidth;  //图片设置的宽度
				let scale = imgWidth / oImgW;        //比例计算
				let imgHeight = oImgH * scale;      //自适应高度
			
				let images = this.images;
				let imageObj = null;
			
				for (let i = 0; i < images.length; i++) {
						let img = images[i];
						if (img.id === imageId) {
								imageObj = img;
								break;
						}
				}
			
				imageObj.height = imgHeight;
			
				let loadingCount = this.loadingCount - 1;
				let col1 = this.cols[0];
				let col2 = this.cols[1];
			
				if (col1H <= col2H) {
						col1H += imgHeight;
						col1.push(imageObj);
				} else {
						col2H += imgHeight;
						col2.push(imageObj);
				}
			
				this.loadingCount = loadingCount;
				this.cols[0] = col1;
				this.cols[1] = col2;
			
				if (!loadingCount) {
						this.images = [];
				}
			},
			// 整合图片
			loadImages(list) {
				list.forEach((v, i) => {
					list[i].pic = v.articleContentImg[0];
					list[i].height = 0;
				});
				let images = list;
				let baseId = "img-" + (+new Date());
				for (let i = 0; i < images.length; i++) {
					images[i].id = baseId + "-" + i;
				}
				this.loadingCount = images.length;
				this.images = images;
				console.log('this.images', this.images)
			},
			goPage(e) {
				const item = e.currentTarget.dataset['item'];
				uni.navigateTo({
					url: '/pages/sub/article/article?id='+ item.articleCode
				})
			},
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
				height: 100%;
				.img_item {
					width: 48%;
					margin: 1%;
					display: inline-block;
					vertical-align: top;
					.img-topic {
						flex-wrap: wrap;
						&_tag {
							margin-right: 5upx;
							padding: 5upx 0;
							font-size: 18upx;
							color: #999;
							font-weight: 200;
							text {
								display: inline-block;
								font-weight: bold;
								font-size: 16upx;
								width: 26upx;
								height: 26upx;
								text-align: center;
								line-height: 26upx;
								background-color: #000;
								color: #fff;
								border-radius: 50%;
								margin-right: 5upx;
							}
						}
					}
					.img-face {
						border-radius: 10upx;
					}
					.card-title {
						font-weight: bold;
						color: #333;
						font-size: 24upx;
						margin: 10upx 0;
					}
					.card-info {
						.card-header {
							font-size: 20upx;
							color: #666;
							image {
								border-radius: 50%;
								width: 30upx;
								height: 30upx;
								margin-right: 10upx;
							}
						}
					}
				}
			}
		}
	}
</style>
