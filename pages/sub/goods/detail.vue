<template>
	<view class="goods-detail_container">
		<cu-custom bgColor="bg-gradual-green" :isBack="isBack" :isCustom="true">
			<view slot="content">商品详情</view>
		</cu-custom>
		<!-- 商品轮播图 -->
		<!-- <swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
		  <swiper-item v-for="(item, index) in goodsDetail.goodsImgArray" :key="index" @click="onViewImage" :data-index="index">
		    <image :src="item" mode="aspectFill"></image>
		  </swiper-item>
		</swiper> -->
		<!-- 标题、价格、分享区 -->
		<view class="detail-content_title flex text-xl padding-lr padding-tb-sm solid-bottom">
			<!-- 头像 -->
			<view class="padding-right-sm">
				<view @tap="goHomePage" class="cu-avatar round" :style="'background-image:url(' + goodsDetail.sellerUserHeadImg + ');'"></view>
			</view>
			<!-- 标题、价格 -->
			<view class="flex-1 padding-right-sm">
				<view class="text-bold"><text v-if="goodsDetail.goodsState == 2" class="text-red">【已售出】</text>{{ goodsDetail.goodsName }}</view>
				<view class="margin-top-sm flex">
					<view class="text-red margin-right" v-if="goodsDetail.goodsPrice">￥{{ goodsDetail.goodsPrice }}</view>
					<view class="text-sm flex align-center" v-if="goodsDetail.distance">
						<text class="cuIcon-location text-gray"></text>
						<text class="text-black">距您</text><text class="text-black">{{ goodsDetail.distance }} km</text>
					</view>
				</view>
			</view>
			<view>
				<!-- followState 0 本人， 1 - 展示关注 ， 2 - 取消关注 -->
				<!-- <view v-if="articleDetail.followState" class="cu-tag" :class="[{'line-green': articleDetail.followState == 1}, {'line-gray': articleDetail.followState != 1}]" @tap="onHandleFollow">{{ articleDetail.followState === 1 ? '+ 关注' : '取消关注'}}</view> -->
			</view>
			<!-- 分享、收藏 -->
			<!-- <view class="share flex">
				<text class="cuIcon-favorfill" :class="[{'text-orange': favor === 1}, {'text-gray': favor === 0}]" @click="onHandleFavor"></text>
				<view class="cuIcon-share text-gray margin-lr-sm" @tap="onshareModel">
				</view>
			</view> -->
		</view>
		<!-- 内容介绍 -->
		<view class="padding solid-bottom">
			<view class="margin-bottom-sm">
				<text class="text-bold text-black">商品介绍</text>
				<text class="text-gray padding-left-sm">{{ goodsDetail.createtime }}</text>
			</view>
			<rich-text :nodes="goodsDetail.goodsContent"></rich-text>
		</view>
		<!-- 地址回显 -->
		<view class="padding solid-bottom" v-if="isWechat && goodsDetail.goodsAddress">
			<view class="margin-bottom-sm"><text class="text-black text-bold">商品自取位置：</text>{{ goodsDetail.goodsAddress }}</view>
			<view class="margin-bottom-sm text-center text-gray">
				<text class="text-bold" @click="selectMapRote">点击查看路线</text>
			</view>
		</view>
		<!-- 商品图 -->
		<view class="padding-top text-center flex flex-align-column">
			<view class="flex-1" v-for="(item, index) in goodsDetail.goodsImgArray" :key="index">
				<image class="goods-detail-image margin-bottom-sm" @click="onViewImage" :data-index="index" :src="item" mode="widthFix"></image>
			</view>
		</view>
		<!-- 此处是评论区 -->
		<view class="padding-sm comment-container">
			<view class="text-sm text-bold comment-title">留言 <text class="padding-left-sm">30</text></view>
			<!-- 评论人，列表 -->
			<view class="comment-content">
				<view class="flex padding-tb-sm solid-bottom">
					<view class="comment-photo">
						<image class="round" :src="goodsImg" mode="aspectFill" @tap="goHomePageById()"/>
					</view>
					<view class="flex-1 margin-left text-sm">
						<view class="text-bold text-gray flex flex-bettwen-space">
							<text>张三</text>
							<view class="text-lg">
								<!-- <text class="cuIcon-like" @tap="onLike"></text> -->
							</view>
						</view>
						<view class="text-black" @tap="onHandleLeaveComment()">说的内容<text class="margin-left-sm text-sm text-grey">留言时间</text></view>
						<!-- 评论的评论 -->
						<view class="flex padding-top-sm">
							<view class="comment-photo">
								<image class="round" :src="goodsImg" mode="aspectFill" @tap="goHomePageById()"/>
							</view>
							<view class="flex-1 margin-left text-sm">
								<view class="text-bold text-gray flex flex-bettwen-space">
									<text>张三 回复了：李四</text>
									<view class="text-lg">
										<!-- <text class="cuIcon-like" @tap="onLike"></text> -->
									</view>
								</view>
								<view class="text-black" @tap="onHandleLeaveComment()">说的内容<text class="margin-left-sm text-sm text-grey">{{ childItem.createtime }}</text></view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="commentParams.current != 1 && !hasNext()" class="text-center padding-sm text-grey text-sm">我已经到底了~</view>
			</view>
		</view>
		<!-- 联系卖家、购买 -->
		<view v-if="goodsDetail.goodsState == 1 && !goodsDetail.isOwner" class="operate fixed bottom-fixed flex text-center text-bold">
			<view class="flex big-icon">
				<text class="cuIcon-favorfill" :class="[{'text-orange': favor === 1}, {'text-gray': favor === 0}]" @click="onHandleFavor"></text>
			</view>
			<view class="flex big-icon">
				<text class="cuIcon-share lg text-gray" @tap="onshareModel"></text>
			</view>
			<view class="flex big-icon">
				<text class="cuIcon-comment lg text-gray"></text>
			</view>
			<view class="flex-1">
				<button class="cu-btn round" @tap="onHandleContract">咨询</button>
				<button class="cu-btn round margin-left bg-yellow" @click="goPage">购买</button>
			</view>
		</view>
		<!-- 联系方式弹窗 -->
		<view class="cu-modal" :class="[{'show': modalName == 'Image'}]">
		  <view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">联系方式</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view v-if="goodsDetail.sellerContactType === 0" class="padding padding-big" @tap="makeCall">
					{{ goodsDetail.sellerContact }}<text @tap="makeCall" class="padding-lr text-blue">点击拨号</text>
				</view>
				<view v-if="goodsDetail.sellerContactType === 1">
					<view class="text-bold text-left padding-sm">长按识别二维码</view>
					<view class="bg-img">
					  <image :src="goodsDetail.sellerContact" mode="aspectFit" :show-menu-by-longpress="true"></image>
					</view>
				</view>
				<view v-if="goodsDetail.sellerContactType === 2" class="padding padding-big" @tap="onCopy" :data-text="goodsDetail.sellerContact">
					微信号：{{ goodsDetail.sellerContact }}<text @tap="onCopy" :data-text="goodsDetail.sellerContact" class="padding-lr text-blue">点击复制</text>
				</view>
		    <view class="cu-bar bg-white">
		      <view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
		    </view>
		  </view>
		</view>
		<!-- 分享弹窗 -->
		<view class="cu-modal" :class="[{'show': modalName=='ChooseModal'}]" @tap="hideModal">
		  <view class="cu-dialog" catchtap>
			<view class="canvasBox padding" v-if="canvasImg">
			  <view class="canvasItem">
				  <image mode="widthFix" :src="canvasImg"></image>
			  </view>
			  <view class="button padding-top-sm" @click="onSaveImg">
				  <button class="cu-btn block line-orange lg">
				    <text class="cuIcon-down"></text> 保存海报
				  </button>
			  </view>
			</view>
		    <view v-else class="padding flex share_icon">
				<view class="flex-1" @tap="onHandleShare">
					<view>
						<image src="@/static/share/icon_pengyouquan.png"></image>
					</view>
					<view>朋友圈</view>
				</view>
				<view class="flex-1">
					<view>
						<image src="@/static/share/icon_weixin.png"></image>
					</view>
					<view>微信</view>
					<button class="pop-box-btn" open-type="share"></button>
				</view>
			</view>
		  </view>
		</view>
		<!-- 海报 -->
		<canvas class="f__canvas" style="width:600px;height:730px"  canvas-id="goodsDetail" id="goodsDetail"></canvas>
		<!-- 二维码 -->
		<canvas class="f__canvas" style="width:300px;height:300px;" canvas-id="qrcode" id="qrcode"></canvas>
	</view>
</template>

<script>
	import _canvas from '@/utils/canvas';// 加载万能绘制方法
	import { saveImg,qrcodeCanvas } from '@/utils/plugins/utils';// 需要保存图片和生成二维码可以引用此文件
	import { onFetchGoodsDetail, onCollectionGoods, createWxQRCode, onSelectGoodsComment, onCreateGoodsComment, onHandleFollow } from '@/api';
	export default {
		data() {
			return {
				canvasImg: '',
				qrcodeImg:'',    //二维码本地图片
				content:'canvas万能制作方法，新手简单入手，易学，一天掌握canvas制作。绘制矩形方法、加载图片方法、绘制圆形头像方法、绘制图片cover不变形、文本自定义换行超出省略、绘制圆角按钮等方法。组合起来用，基本海报都能绘制。',   //内容
				goodsImg: 'https://mashang-quan.oss-cn-beijing.aliyuncs.com/image/97989fc9-e122-4579-9f3b-59904d428483.jpg',
				// goodsState - 0 未上架 1 上架 2 已售出
				modalName: null,
				isContactWechat: false, // 联系方式，是否是微信二维码
				favor: 0, // 是否收藏 0 - 未收藏， 1 - 收藏
				isWechat: false, // 是否是微信
				isBack: true, // 1 - false 不可返回，只能到首页; 0 - true 可以返回
				params: {
					lat: '',
					lng: '',
					goodsCode: ''
				},
				goodsDetail: null ,// 商品详情
				commentParams: { // 评论列表请求参数
					goodsCode: '',
					current: 1,
					size: 10
				}
			}
		},
		onLoad(options) {
			const token = uni.getStorageSync('token')
			if (!token) {
				uni.redirectTo({
					url: '/pages/sub/login/index'
				})
				return false;
			}
			this.params.goodsCode = options.id;
			this.isBack = options.isBack == 1 ? false : true;
			this.getSystemLocation((res) => {
				this.params.lat = res.latitude;
				this.params.lng = res.longitude;
				  console.log('当前位置的经度：' + res);
				  console.log('当前位置的纬度：' + res.latitude);
				this.getGoodsDetail();
			}, () => {
				this.getGoodsDetail();
			});
		},
		created() {
			// #ifdef MP-WEIXIN
			this.isWechat = true;
			// #endif        
		},
		methods: {
			
			async onConfirmOperate(followState) {
				try {
					const res = await onHandleFollow({
						userId: this.articleDetail.userId || '',
						followState
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							duration: 2000
						})
						this.articleDetail.followState = followState === 1 ? 2 : 1;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 关注、取消关注
			async onHandleFollow() {
				let followState = 0; // 0 - 取关， 1 - 关注
				if (this.articleDetail.followState === 1) {
					followState = 1;
				}
				if (followState) {
					this.onConfirmOperate(followState);
				} else {
					uni.showModal({
						title: '取消关注',
						confirmText: '确认取消',
						cancelText: '取消',
						success: res => {
							if (res.confirm) {
								this.onConfirmOperate(followState);
							}
						}
					})
				}
			},
			// 评论列表
			async onSelectComment() {
				try {
					const res = await onSelectGoodsComment(this.commentParams);
				} catch(err) {
					console.log('err', err);
				}
			},
			onshareModel() {
				this.modalName = 'ChooseModal';
			},
			// 保存图片
			async onSaveImg() {
				let imgUrl = "";
				if(this.canvasImg){
					imgUrl = await this.canvasImg;
			        saveImg(imgUrl)
				}
			},
			// 生成海报图
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
				let ctx = uni.createCanvasContext('goodsDetail');
			    // 绘制矩形
				_canvas.fillRoundRect(ctx,0,0,cvsW,cvsH,20,"#ffffff");
				let headerLogo = await _canvas.getImageInfo(this.goodsDetail.sellerUserHeadImg);
			    // 同步加载图片
				var logo = await _canvas.getImageInfo(this.goodsDetail.goodsImgArray[0]);
				let qrcode = await _canvas.getImageInfo(this.qrcodeImg);
				if(logo.path && headerLogo.path){
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
			        ctx.fillText(this.goodsDetail.goodsPrice, 50, 450)
			        
			        // 绘制圆角按钮
			        // 参数：cxt、背景颜色、x坐标、y坐标、宽度、高度、圆角、文字、文字颜色、文字位置
			  //       ctx.font = '22px' + family
					// ctx.fillText(this.goodsDetail.goodsName, 165, 450)
			        // _canvas.drawButton(ctx, 'red', 165, 418, 170, 32, 16, this.goodsDetail.goodsName, '#ffffff', 'center')
			        // 简介-多行文字
					ctx.setFillStyle('#666666')
			        ctx.textAlign = 'left';
					var options = {
						font:"normal 26px"+family,     //设置字体
						ctx:ctx,
						word: `${that.goodsDetail.goodsName}, ${that.goodsDetail.goodsContent}`,      //文本
						maxWidth:540,           //最大宽度
						maxLine:2,              //最大行数--超出省略
						x:margin,               //x坐标
						y:450,                  //y坐标
						l_h:40                  //行高
					}
			        // 文本自定义换行
					_canvas.dealWords(options)
			        // 绘制圆形头像
			        _canvas.drawCircular(ctx, headerLogo.path, margin, goodsH+margin+160, logo_w, logo_w);
			        // 名称
			        ctx.setFillStyle('#000000')
			        ctx.font = "bold 26px" + family
			        ctx.fillText(this.goodsDetail.sellerUserName, logo_w+margin+10, goodsH+margin+195)
			        // 简介
			        ctx.setFillStyle('#999999')
			        ctx.font = "normal 22px" + family
			        ctx.fillText('长按查看商品详情', logo_w+margin+10, goodsH+margin+235)
					console.log('that.qrcode', that.qrcodeImg)
			        // 绘制二维码
			        // ctx.drawImage(that.qrcodeImg, cvsW-margin-150, goodsH+margin+80+50, 150, 150);
			        _canvas.drawImgCover(ctx, qrcode, cvsW-margin-150, goodsH+margin+80+50, 150, 150);
					
			        // 绘制图片
					ctx.draw(false, function() {
						uni.canvasToTempFilePath({
							width: cvsW,
							height: cvsH,
							canvasId: 'goodsDetail',
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
			// 点击复制
			onCopy(e) {
				uni.setClipboardData({
					data: e.currentTarget.dataset.text,
					success: function (res) {
						uni.getClipboardData({
							success: function (res) {
								uni.showToast({
									title: '复制成功'
								})
							}
						})
					}
				})
			},
			// 进入个人主页
			goHomePage() {
				uni.navigateTo({
					url: '/pages/sub/my/home?id=' + this.goodsDetail.sellerMemberId
				})
			},
			// 生成分享图片
			async onHandleShare() {
				try {
					const scene = decodeURIComponent(`id=${this.params.goodsCode}`);
					const res = await createWxQRCode({
						scene,
						page: 'pages/sub/goods/detail'
					});
					if (res.code === 200) {
						// this.createQrcode(res.data);
						this.qrcodeImg = res.data;
						this.createGoodsPoster();
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 创建二维码
			createQrcode(url){
			    var that = this
			    qrcodeCanvas('qrcode', url, 600, 600);
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
							that.createGoodsPoster();
			            }
			        },that)
			    })
			},
			// 分享朋友圈
			onShareAppMessage() {
				const { goodsDetail } = this;
				return {
					title: `${goodsDetail.goodsName}  ¥${goodsDetail.goodsPrice}`,
					imageUrl: goodsDetail.goodsImgArray[0],
				}
			},
			// 分享
			getShareBox() {
				this.sharebox = false;
			},
			// 商品详情
			async getGoodsDetail() {
				uni.showLoading();
				try {
					const res = await onFetchGoodsDetail(this.params);
					if (res.code === 200) {
						this.goodsDetail = res.data;
						console.log('goodsDetail', this.goodsDetail)
						this.favor = this.goodsDetail.isLikes ? 1 : 0;
					}
					// 下单页要用
					uni.setStorageSync('goodsInfo', [{
						goodsCode: this.params.goodsCode,
						goodsCount: 1
					}]);
					// 查看评论列表
					// this.onSelectComment();
					
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			// 购买
			goPage() {
				uni.navigateTo({
					url: '/pages/sub/goods/placeOrder?id=' + this.id
				})
			},
			// 打电话
			makeCall() {
				uni.makePhoneCall({
				    phoneNumber: this.goodsDetail.sellerContact
				});
			},
			// show modal
			onHandleContract() {
				this.modalName = 'Image';
			},
			// modle
			hideModal(e) {
				this.modalName = null;
				setTimeout(() => {
					this.canvasImg = '';	
				}, 500)
			},
			// 收藏
			async onHandleFavor() {
				uni.showLoading();
				try {
					const favor = this.favor === 1 ? 0 : 1;
					const res = await onCollectionGoods({
						goodsCode: this.params.goodsCode,
						likesType: 0,
						likesState: favor
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功'
						})
						this.favor = favor;
					}
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			// 预览
			onViewImage(e) {
				const index = e.currentTarget.dataset['index'];
				uni.previewImage({
					urls: this.goodsDetail.goodsImgArray,
					current: index
				});
			},
			// 路线规划
			selectMapRote() {
				let plugin = requirePlugin('routePlan');
				let endPoint = JSON.stringify({  //终点
						'name': this.goodsDetail.goodsAddress,
						'latitude': this.goodsDetail.goodsLat,
						'longitude': this.goodsDetail.goodsLng
				});
				uni.navigateTo({
						url: 'plugin://routePlan/index?key=' + this.mapConfig.key + '&referer=' + this.mapConfig.referer + '&endPoint=' + endPoint
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.f__canvas {
		width: 300rpx;
		height: 300rpx;
		position: fixed;
		top: -10000rpx;
		left: 0rpx;
	}
	.padding-big {
		padding: 60rpx 0;
	}
	.goods-detail_container {
		background: #fff;
		padding-bottom: 100upx;
		.comment-container {
			.comment-title {
				font-size: 30upx;
			}
			.comment-content {
				image {
					width: 50upx;
					height: 50upx;
				}
			}
			
		}
		.screen-swiper {
			width: 100%;
			height: 450upx;
		}
		.detail-content_title {
			.share {
				align-items: center;
			}
		}
		.operate {
			background-color: #fff;
			box-shadow: 0 0 10upx rgba(0, 0, 0, .5);
			&>view {
				line-height: 90upx;
			}
			.big-icon {
				font-size: 40upx;
				margin: 0 40upx;
			}
			.cu-btn {
				padding-left: 50upx;
				padding-right: 50upx;
			}
		}
		.goods-detail-image {
			display: block;
			width: 100%;
			height: auto;
		}
	}
	.cuIcon-share {
		position: relative;
		.pop-box-btn {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			opacity: 0;
		}
	}
	.canvasBox {
		image {
			width: 100%;
		}
	}
	.share_icon {
		padding-top: 120upx;
		padding-bottom: 120upx;
		image {
			width: 60upx;
			height: 60upx;
		}
		.flex-1 {
			position: relative;
			.pop-box-btn {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				opacity: 0;
			}
		}
	}
</style>
