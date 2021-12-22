<template>
	<view class="box subject-box full-height flex flex-direction">
		<cu-custom bgColor="bg-gradual-green" :isBack="true" :isCustom="true">
			<view slot="content"></view>
		</cu-custom>
		<!-- 话题主体部分 -->
		<view class="subject-container flex-1 flex flex-direction overflow-hidden">
			<!-- 话题介绍区 -->
			<view class="subject-container_header">
				<view class="subject-container_header__title"># {{ subjectName }}</view>
				<view class="subject-container_header__view flex flex-bettwen-space">
					<view>{{ subjectViewCount }} 浏览</view>
				<!-- 	<view class="cu-tag line-black round" @tap="onHandleCollect">
						<text :class="[{'cuIcon-favor': !collection}, {'cuIcon-favorfill': collection}, {'text-orange': collection}]"></text> {{ collectionText }}
					</view> -->
				</view>
				<view class="subject-container_header__introduce">
					只用十分钟,就能做出一道美味又营养的家常快手菜!告别不健康的外卖生活,就从简单易学的家常快手料理开始!
				</view>
			</view>
			<!-- 内容区 -->
			<view class="subject-container_content flex-1 flex overflow-hidden">
				<view style="display:none">
				  <image v-for="(item, index) in images" :key="item.id" :id="item.id" :src="item.pic" @load="onImageLoad"></image>
				</view>
				<scroll-view scroll-y="true" @scrolltolower="lower" class="scroll-Y flex-1 subject-scroll">
					<view class="img_item">
						<view v-for="(item, index) in col1" :key="item.id">
							<image :src="item.pic" :style="[{'height':item.height + 'px'}]"></image>
						</view>
					</view>
					<view class="img_item">
						<view v-for="(item, index) in col2" :key="item.id">
							<image :src="item.pic" :style="[{'height':item.height + 'px'}]"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	let col1H = 0;
	let col2H = 0;
	export default {
		data() {
			return {
				subjectName: '红烧肉的做法',
				subjectViewCount: '35.9 亿',
				collection: false, // 是否收藏
				collectionText: '',
				imgWidth: 0, // 图片宽度
				col1: [],
				col2: [],
        loadingCount: 0,
				images: []
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let ww = res.windowWidth;
					let wh = res.windowHeight;
					let imgWidth = ww * 0.48;
					let scrollH = wh;
					// 图片宽度
					this.imgWidth = imgWidth;
					this.loadImages();
				}
			});
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
			},
			lower(e) {
				console.log('bottom');
				this.loadImages();
			},
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
				let col1 = this.col1;
				let col2 = this.col2;

				if (col1H <= col2H) {
						col1H += imgHeight;
						col1.push(imageObj);
				} else {
						col2H += imgHeight;
						col2.push(imageObj);
				}

				this.loadingCount = loadingCount;
				this.col1 = col1;
				this.col2 = col2;

				if (!loadingCount) {
						this.images = [];
				}
			},
			loadImages() {
				let images = [
					{ pic: "../../../static/test/1.jpg", height: 0 },
					{ pic: "../../../static/test/2.jpg", height: 0 },
					{ pic: "../../../static/test/3.jpg", height: 0 },
					{ pic: "../../../static/test/4.jpg", height: 0 },
					{ pic: "../../../static/test/5.jpg", height: 0 },
					{ pic: "../../../static/test/6.jpg", height: 0 },
					{ pic: "../../../static/test/7.jpg", height: 0 },
					{ pic: "../../../static/test/8.jpg", height: 0 },
					{ pic: "../../../static/test/9.jpg", height: 0 },
					{ pic: "../../../static/test/10.jpg", height: 0 },
				];
				let baseId = "img-" + (+new Date());
				for (let i = 0; i < images.length; i++) {
					images[i].id = baseId + "-" + i;
				}
				this.loadingCount = images.length;
				this.images = images;
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
				height: 100%;
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
