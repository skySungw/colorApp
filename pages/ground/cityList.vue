<template>
	<!-- <view :style="[{'padding-top':customBar + 'px', 'height': '100vh'}, {background: '#fff'}]"> -->
	<view class="full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<view slot="serach">
				<view class="location flex" @tap="onSelectAddress">
					<image class="location__img" src="/static/index-location.png"></image>
					<view class="location__title">{{ addressData.title ? addressData.title : '定位中...' }}</view>
					<image class="location__arrow" src='/static/bottom-arrow.png'></image>
				</view>
			</view>
		</cu-custom>
		<view class="bg-gradual-green">
			<!-- 搜索条 -->
			<view class="cu-bar search">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" :placeholder="placeholder" :disabled="true" confirm-type="search" @click="goAdPage({
						link: '/pages/sub/search/search?type='+ activeIndex
					})"></input>
				</view>
			</view>
		<!-- 	<view class="titleBtn" @click="createGoodsPoster">绘制海报</view>
			<view class="canvasBox" v-if="canvasImg">
			    <view class="canvasItem">
			        <image mode="widthFix" style="width:500rpx;height:500rpx" :src="canvasImg"></image>
			    </view>
			    <view class="button" @click="onSaveImg">保存海报</view>
			</view> -->
		</view>
		<!-- 帖子列表 -->
		<block v-if="list.length > 0">
			<view class="card-list_container flex-1" v-if="activeIndex == 0">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
				@scroll="scroll">
					<view class="card-list_container__item goods-type" v-for="(item, index) in list" :key="index">
						<!-- 头像区 -->
						<view class="card-header flex" @tap="goHomePage" :data-item="item">
							<!-- 头像 -->
							<view class="flex flex-align-center">
								<view class="cu-avatar round" :style="'background-image:url(' + item.userWxHeadImg + ')'"></view>
							</view>
							<!-- 名称 -->
							<view class="padding-left-sm">
								<view>
									<text class="text-bold">{{ item.userName }}</text>
								</view>
								<view>{{ item.time }}</view>
							</view>
						</view>
						<!-- 帖子内容区 -->
						<view v-if="item.collectionType == 1" class="card-content padding-top">
							<!-- 文案区域 -->
							<view class="card-content_text text-black" @tap="goPage" :data-item="item.articleInfo">
								<!-- <view class="cu-tag bg-green light radius sm">闲置</view> -->
								{{ item.articleInfo.articleDesc }}
								<!-- <text class="text-cyan margin-left-sm">全文</text> -->
							</view>
							<!-- 图片区域 -->
							<view class="card-content_image margin-top-sm" v-if="item.articleInfo.articleContentImg.length" @tap="goPage" :data-item="item.articleInfo">
								<view class="grid col-3 grid-square flex-sub">
									<view class="bg-img" v-for="(imgItem, index) in item.articleInfo.articleContentImg" :key="index" @click.stop="onViewImage" :data-list="item.articleInfo.articleContentImg" :data-url="imgItem">
										<image :src='imgItem' mode='aspectFill'></image>
									</view>
								</view>
							</view>
						</view>
						<!-- 商品内容区 -->
						<view v-if="item.collectionType == 0" class="card-content padding-top">
							<view class="goods-container padding-sm bg-gray" @tap="onGoodsDetail" :data-item="item.goodsInfo">
								<view class="goods-container__title flex">
									<view class="flex-1 text-bold">
										{{ item.goodsInfo.goodsName }}
									</view>
									<view class="text-red text-bold">
										￥{{ item.goodsInfo.goodsPrice }}
									</view>
								</view>
								<view class="goods-container__info flex">
									<view class="cu-avatar radius xl" :style="'background-image:url(' + item.goodsInfo.goodsImgArray[0] + ');'"></view>
									<view class="flex-1 padding-left-sm">
										{{ item.goodsInfo.goodsDesc }}
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 无更多数据 -->
					<view v-if="noMoreFlag" class="text-center padding-sm padding-bottom-xl">我是有底线的~</view>
				</scroll-view>
			</view>
		</block>
		<Empty v-if="!initPage && list.length == 0" msg="暂无数据~" />
		<!-- 其它区域 -->
		<NavBar :index="1"></NavBar>
        <!-- 海报 -->
        <canvas class="f__canvas" style="width:600px;height:730px"  canvas-id="firstCanvas" id="firstCanvas"></canvas>
        <!-- 二维码 -->
        <canvas class="f__canvas" style="width:300px;height:300px;" canvas-id="qrcode" id="qrcode"></canvas>
	</view>
</template>
<script>
	import _canvas from '@/utils/canvas';// 加载万能绘制方法
	import { saveImg,qrcodeCanvas } from '@/utils/plugins/utils';// 需要保存图片和生成二维码可以引用此文件
	import TabBar from '@/components/tab';
	import NavBar from '@/components/navBar';
	import Card from '@/components/card';
	import ActiveCard from '@/components/activeCard';
	import Empty from '@/components/empty.vue';
	import { onFetchCollectionPage, saveUserLocation, selectAddressByLat } from '@/api';
	import { handlePublishTimeDesc } from '@/utils';

	export default {
		components:{
			TabBar,
			NavBar,
			Card,
			ActiveCard,
			Empty
		},
		data() {
			return {
				canvasImg: '',
				qrcodeImg:'',    //二维码本地图片
				content:'canvas万能制作方法，新手简单入手，易学，一天掌握canvas制作。绘制矩形方法、加载图片方法、绘制圆形头像方法、绘制图片cover不变形、文本自定义换行超出省略、绘制圆角按钮等方法。组合起来用，基本海报都能绘制。',   //内容
				goodsImg: 'https://mashang-quan.oss-cn-beijing.aliyuncs.com/image/97989fc9-e122-4579-9f3b-59904d428483.jpg',
				imgList: [],
				scrollTop: 0,
				old: {
						scrollTop: 0
				},
				addressData: {
					title: '定位中...',
				},
				initPage: true, // 是否获取完数据
				placeholder: '搜索文章',
				token: null, 
				publishShow: false, // 显示发布按钮
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					lat: '',
					lng: ''
				},
				customBar: this.CustomBar + this.StatusBar + 40,
				list: [], // 帖子列表
				activeIndex: 0,
				dictList: [], // 小区列表
				noMoreFlag: false, // 是否有更多数据
			}
		},
		onLoad() {
			this.init();
		},
		onReady() {
			// this.createQrcode()
		},
		onShow() {
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
		},
		onUnload() {
			// uni.$off('operateHandle');
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: '刷新中...'
			});
			setTimeout(() => {
				uni.stopPullDownRefresh();
				this.initParams();
			}, 2000);
		},
		methods: {
			async createGoodsPoster() {
			    if(this.canvasImg){
			    	return
			    }
				var that = this;
				uni.showLoading({
					title: '海报生成中'
				});
				const cvsW = 600;
				const cvsH = 730;
			    const goodsH = 400;
				const logo_w = 100;
			    const margin = 30;
				let family = " 'PingFang SC',tahoma,arial,'helvetica neue','hiragino sans gb','microsoft yahei',sans-serif";
				let ctx = uni.createCanvasContext('firstCanvas');
			    // 绘制矩形
				_canvas.fillRoundRect(ctx,0,0,cvsW,cvsH,20,"#ffffff");
			    // 同步加载图片
				var logo = await _canvas.getImageInfo(this.goodsImg);
				if(logo.path){
			        // save+clip+restore:防止图片超出边框显示--相当于overflow: hidden;
			        ctx.save();
			        ctx.clip(); //剪切--不允许超出矩形框
			        // 绘制商品图片
			        _canvas.drawImgCover(ctx, logo, 0, 0, cvsW, goodsH);
			        ctx.restore();
			        
			        // 价格符号
			        ctx.setFillStyle('#ff0036')
			        ctx.font = "24px" + family
			        ctx.fillText('￥', margin-5, 450)
			        // 价格
			        ctx.font = "40px" + family
			        ctx.fillText('39.99', 50, 450)
			        
			        // 绘制圆角按钮
			        // 参数：cxt、背景颜色、x坐标、y坐标、宽度、高度、圆角、文字、文字颜色、文字位置
			        ctx.font = '22px' + family
			        _canvas.drawButton(ctx, 'red', 165, 418, 170, 32, 16, '会员价￥29.99', '#ffffff', 'center')
			        // 简介-多行文字
					ctx.setFillStyle('#666666')
			        ctx.textAlign = 'left';
					var options = {
						font:"normal 26px"+family,     //设置字体
						ctx:ctx,
						word:that.content,      //文本
						maxWidth:540,           //最大宽度
						maxLine:2,              //最大行数--超出省略
						x:margin,               //x坐标
						y:450,                  //y坐标
						l_h:40                  //行高
					}
			        // 文本自定义换行
					_canvas.dealWords(options)
			        // 绘制圆形头像
			        _canvas.drawCircular(ctx, logo.path, margin, goodsH+margin+160, logo_w, logo_w);
			        // 名称
			        ctx.setFillStyle('#000000')
			        ctx.font = "bold 26px" + family
			        ctx.fillText('创作者：Aa.小凡', logo_w+margin+10, goodsH+margin+195)
			        // 简介
			        ctx.setFillStyle('#999999')
			        ctx.font = "normal 22px" + family
			        ctx.fillText('所有方法融合一起实战', logo_w+margin+10, goodsH+margin+235)
					console.log('that.qrcode', that.qrcodeImg)
			        // 绘制二维码
			        ctx.drawImage(that.qrcodeImg, cvsW-margin-150, goodsH+margin+80+50, 150, 150);
					
			        // 绘制图片
					ctx.draw(false, function() {
						uni.canvasToTempFilePath({
							width: cvsW,
							height: cvsH,
							canvasId: 'firstCanvas',
							success(res) {
								uni.hideLoading();
								that.canvasImg = res.tempFilePath
							}
						},that)
					}, 500)
				}else{
					uni.hideLoading();
					uni.showToast({
						title: '海报制作失败',
						icon: 'none'
					});
				}
			},
			// 保存图片
			async onSaveImg() {
				let imgUrl = "";
				if(this.canvasImg){
					imgUrl = await this.canvasImg;
			        saveImg(imgUrl)
				}
			},
			// 创建二维码
			createQrcode(){
			    var that = this
			    qrcodeCanvas('qrcode', 'https://www.baidu.com', 600, 600);
			    const ctx = uni.createCanvasContext('qrcode');
			    ctx.draw(true, function() {
			        uni.canvasToTempFilePath({
			            width: 600,
			            height: 600,
			            canvasId: 'qrcode',
			            success(res) {
			                // 二维码本地图
			                that.qrcodeImg = res.tempFilePath
			                console.log(res,'createQrcode')
			            }
			        },that)
			    })
			},
			goHomePage(e) {
				const item = e.currentTarget.dataset['item'];
				let url;
				if (item.articleInfo) {
					url = `/pages/sub/my/home?id=${item.articleInfo.userId}`;
				} else {
					if (item.goodsInfo.showcaseId) {
						url = `/pages/subpackages/site/myShop?showcaseId=${item.goodsInfo.showcaseId}&menu=1`;
					} else {
							url = `/pages/sub/my/home?id=${item.userId}`;
					}
				}
				uni.navigateTo({
					url
				})
			},
			// 初始化页面经纬度等数据
			init() {
				// 获取经纬度，并初始化列表数据
				uni.showLoading();
				this.params.lat = uni.getStorageSync('lat');
				this.params.lng = uni.getStorageSync('lng');
				const addressInfo = uni.getStorageSync('addressInfo')
				if (!addressInfo?.lat) {
					this.getSystemLocation((res) => {
						this.params.lat = res.latitude;
						this.params.lng = res.longitude;
						uni.setStorageSync('lat', res.latitude);
						uni.setStorageSync('lng', res.longitude);
						uni.hideLoading();
						// 获取小区信息
						this.getDictList();
						// 获取帖子列表
						this.initParams();
					}, () => {
						this.addressData.title = '选择小区'
						uni.hideLoading();
						this.initParams();
					});
				} else {
					this.addressData = addressInfo;
					uni.hideLoading();
					// // 获取小区信息
					// this.getDictList();
					this.initParams();
				}
			},
			// 根据经纬度获取小区信息
			async getDictList() {
				try {
					const res = await selectAddressByLat({
						lat: this.params.lat,
						lng: this.params.lng,
						size: 10,
						current: 1
					});
					if (res.code === 200) {
						this.dictList = res.data.records;
						if (this.dictList.length > 0) {
							this.addressData = this.dictList[0];
							this.addressData.title = this.dictList[0].title;
							uni.setStorageSync('addressInfo', this.addressData);
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			goPage(e) {
				const item = e.currentTarget.dataset['item'];
				uni.navigateTo({
					url: '/pages/sub/article/article?id='+ item.articleCode
				})
			},
			onGoodsDetail(e) {
				const item = e.currentTarget.dataset['item'];
				const url = `/pages/sub/goods/detail?id=${item.goodsId}`;
				if (this.token) {
					uni.navigateTo({
						url
					});
				} else {
					uni.navigateTo({
						url: '/pages/sub/login/index',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('loginUrl', {
								loginUrl: url,
							})
						}
					})
				}
			},
			// 滚动到顶部
			upper(e) {
					// console.log('upper', e)
			},
			// 滚动到底部
			lower(e) {
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getArticleList();
				} else {
					this.noMoreFlag = true;
				}
			},
			// 滚动事件
			scroll(e) {
					this.old.scrollTop = e.detail.scrollTop
			},
			// 到顶
			goTop(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
						this.scrollTop = 0
				});
				uni.showToast({
						icon:"none",
						title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// 地图选位置
			onSelectAddress() {
				uni.navigateTo({
					url: '/pages/subpackages/address/selectAddress',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						onChangeAddress: ({data}) => {
							this.addressData.title = data.title;
							this.addressData.lng = data.lng;
							this.addressData.lat = data.lat;
							uni.setStorageSync('addressInfo', this.addressData);
						}
					}
				})
			},
			onPublishShow() {
				if (!this.token) {
					this.publishShow = false;
					return false;
				}
				if (this.activeIndex == 0) {
					this.publishShow =  true;
				} else {
					if (this.userId == 0) {
						this.publishShow =  true;
					} else {
						this.publishShow = false;
					}
				}
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams() {
				this.list = [];
				this.params.current = 1;
				this.getArticleList(true);
			},
			onChangeParams(type) {
				this.initParams();
				// 判断是否展示发布按钮
				this.onPublishShow();
			},
			// 获取帖子页面
			async getArticleList(flag) {
				if (!flag) {
					uni.showLoading({
						title: '加载中...'
					});
				}
				
				try {
					let res = null;
					res = await onFetchCollectionPage(this.params);
					if (res.code === 200) {
						this.initPage = false;
						this.params.total = res.data.total;
						let list = res.data.records;
						list.forEach((v, i) => {
							list[i]['time'] = handlePublishTimeDesc(v.createTime);
							// if (v['goodsInfo']) {
							// 	list[i]['goodsInfo']['goodsImgArr'] = JSON.parse(v.goodsInfo.goodsImg)
							// }
						})
						if (this.params.current === 1) {
							this.list = list;
						} else {
							this.list = this.list.concat(list);
						}
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
						// console.log("this.list", this.list);
					}
					uni.hideLoading();
				} catch(err) {
					this.initPage = false;
					uni.hideLoading();
				}
			},
			// 跳页面
			goAdPage(item) {
				uni.navigateTo({
					url: item.link,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			onViewImage(e) {
				const dataSet = e.currentTarget.dataset;
				this.imgList = dataSet.list;
				
				uni.previewImage({
					urls: this.imgList,
					current: dataSet.url
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	
	.f__canvas {
		width: 300rpx;
		height: 300rpx;
		position: fixed;
		top: -10000rpx;
		left: 0rpx;
	}
	.search {
		height: 100upx;
	}
	.card-list_container {
		padding-bottom: 100upx;
		overflow: hidden;
		background: #f5f5f5;
		&__item {
			background-color: #FFFFFF;
			margin-top: 20upx;
			padding: 20upx;
			.card-content {
				&_text {
					display: -webkit-box;
					text-overflow: ellipsis;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					.cu-tag {
						vertical-align: unset;
						margin-right: 10upx;
					}
				}
				.goods-container {
					&__info {
						margin-top: 5upx;
					}
				}
			}
		}
	}
	.location {
		align-items: center;
		padding-left: 10upx;
	}
	.location__img {
	  width: 36upx;
	  height: 36upx;
	  padding-right: 8upx;
	  flex-shrink: 0;
	  margin-top: 2upx;
	}
	
	.location__arrow {
	  width: 14upx;
	  height: 14upx;
	  flex-shrink: 0;
	  margin-left: 10upx;
	}
</style>
