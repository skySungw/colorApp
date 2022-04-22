<template>
	<view class="page_goods_detail">
		<cu-custom bgColor="bg-gradual-green" :isBack="!m" :isCustom="true">
			<view slot="content">商品详情</view>
		</cu-custom>
		<view class="page_goods_content">
			<!-- 轮播图 -->
			<swiper autoplay circular indicator-dots>
				<swiper-item v-for="(item, index) in goodsInfo.goodsImgArray" :key="img_id" @tap="onTapSwiperItem" :data-url="item">
					<image mode="aspectFill" :src="item"></image>
				</swiper-item>
			</swiper>
			<!-- 价格 -->
			<view class="goods_price">￥{{goodsInfo.goodsPrice}}</view>
			<!-- 商品名 -->
			<view class="goods_title_row">
				<view class="goods_title">{{goodsInfo.goodsName}}</view>
			</view>
			<!-- 详情 -->
			<view class="goods_introduce">
				<view class="introduce_title">图文详情</view>
				<view class="introduce_content">
					<image mode="aspectFit" v-for="(item, index) in goodsInfo.goodsImgArray" :key="index" :src="item"></image>
				</view>
			</view>
			<!-- 底部栏 -->
			<view class="bottom_bar">
			<!-- 	<view class="bar_item" @tap="goJD">
					<view class="icon cuIcon-service"></view>
					<view>客服</view>
				</view> -->
				<view class="bar_item" @tap="onshareModel">
					<view class="icon cuIcon-share"></view>
					<view>分享</view>
				</view>
				<!-- <view class="bar_item" @tap="goJD">
					<view class="icon cuIcon-cart lg text-gray"></view>
					<view>购物车</view>
				</view> -->
				<view class="bar_item btn_cart" @tap="goJD">加入购物车</view>
				<view class="bar_item btn_buy" @tap="goJD">立即购买</view>
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
	import { onSelectGoodsJDDetail, createWxQRCode } from '@/api';
	export default {
		data() {
			return {
				canvasImg: '',
				qrcodeImg:'',    //二维码本地图片
				content:'canvas万能制作方法，新手简单入手，易学，一天掌握canvas制作。绘制矩形方法、加载图片方法、绘制圆形头像方法、绘制图片cover不变形、文本自定义换行超出省略、绘制圆角按钮等方法。组合起来用，基本海报都能绘制。',   //内容
				goodsImg: 'https://mashang-quan.oss-cn-beijing.aliyuncs.com/image/97989fc9-e122-4579-9f3b-59904d428483.jpg',
				modalName: null,
				goodsId: '', // 京东商品id
				showcaseId: '' ,// 橱窗id
				goodsInfo: null,
				m: null // 是否显示返回菜单
			}
		},
		onLoad(options) {
			this.goodsId = options.goodsId;
			this.showcaseId = options.showcaseId;
			this.m = options.m;
			this.onFetchGoodsDetail();
		},
		onShareAppMessage() {
			const promise = new Promise(resolve => {
				setTimeout(() => {
					resolve({
						title: `${this.goodsInfo.goodsName} ￥${this.goodsInfo.goodsPrice}`,
						path: `/pages/subpackages/jd/detail?cid=${this.showcaseId}&gid=${this.goodsId}&m=1`,
					})
				}, 2000)
			})
			return {
				title: '商品详情',
				path: `/pages/subpackages/jd/detail?cid=${this.showcaseId}&gid=${this.goodsId}&m=1`,
				promise 
			}
		},
		methods:{
			// 商品详情
			async onFetchGoodsDetail() {
				try {
					const res = await onSelectGoodsJDDetail({
						goodsCode: this.goodsId,
						showcaseId: this.showcaseId
					});
					if (res.code === 200) {
						this.goodsInfo = res.data;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 
			onTapSwiperItem() {
				
			},
			goJD() {
				// url = `/pages/subpackages/webview/webview`;
				uni.setStorageSync('url', this.goodsInfo.urlGoods);
				uni.navigateToMiniProgram({
				  appId: 'wx91d27dbf599dff74',
				  path: `pages/union/proxy/proxy?spreadUrl=${encodeURI(this.goodsInfo.urlGoods)}`,
				  extraData: {},
				  success(res) {
				    // 打开成功
				  }
				})
			},
			// 显示分享
			onshareModel() {
				this.modalName = 'ChooseModal';
			},
			// 隐藏弹窗
			hideModal(e) {
				this.modalName = null;
				setTimeout(() => {
					this.canvasImg = '';
				}, 500)
			},
			// 保存图片
			async onSaveImg() {
				let imgUrl = "";
				if(this.canvasImg){
					imgUrl = await this.canvasImg;
			        saveImg(imgUrl)
				}
			},
			// 生成分享图片
			async onHandleShare() {
				try {
					const scene = decodeURIComponent(`cid=${this.showcaseId}&gid=${this.goodsId}&m=1`);
					// const scene = decodeURIComponent(`showcaseId=${this.showcaseId}`);
					console.log('this.showcaseId', this.showcaseId)
					const res = await createWxQRCode({
						scene,
						page: 'pages/subpackages/jd/detail'
						// page: 'pages/subpackages/site/myShop'
					});
					if (res.code === 200) {
						this.qrcodeImg = res.data;
						console.log('this.qrcode', this.qrcodeImg)
						this.createGoodsPoster();
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 生成海报图
			async createGoodsPoster() {
				console.log('goodsInfo', this.goodsInfo.goodsImgArray[0])
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
				console.log('this.goodsInfo.goodsImgArray[0]', this.goodsInfo.goodsImgArray[0])
				let headerLogo = await _canvas.getImageInfo(this.goodsInfo.goodsImgArray[0]);
				console.log('headerLogo', headerLogo)
			    // 同步加载图片
				var logo = await _canvas.getImageInfo(this.goodsInfo.goodsImgArray[0]);
				console.log('logo', logo)
				let qrcode = await _canvas.getImageInfo(this.qrcodeImg);
				console.log('qrcode', qrcode)
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
			        ctx.fillText(this.goodsInfo.goodsPrice, 50, 450)
			        
			        // 绘制圆角按钮
			        // 参数：cxt、背景颜色、x坐标、y坐标、宽度、高度、圆角、文字、文字颜色、文字位置
			  //       ctx.font = '22px' + family
					// ctx.fillText(this.goodsInfo.goodsName, 165, 450)
			        // _canvas.drawButton(ctx, 'red', 165, 418, 170, 32, 16, this.goodsInfo.goodsName, '#ffffff', 'center')
			        // 简介-多行文字
					ctx.setFillStyle('#666666')
			        ctx.textAlign = 'left';
					var options = {
						font:"normal 26px"+family,     //设置字体
						ctx:ctx,
						word: `${that.goodsInfo.goodsName}`,      //文本
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
			        ctx.fillText(this.goodsInfo.goodsName, logo_w+margin+10, goodsH+margin+195)
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
		}
	}
</script>

<style lang="scss">
	.page_goods_detail {
		swiper {
			height:70vw;
			text-align:center;
			image {
				width:60%;
			}
		}
		.goods_price {
			padding:30upx;
			font-size:36upx;
			font-weight:bold;
			color: #EB4450;
		}
		.goods_title_row {
			display:flex;
			.goods_title {
				flex:1;
				display:flex;
				flex-direction:column;
				justify-content:center;
				padding: 0 40upx;
				font-size: 32upx;
				font-weight: bold;;
				.icon {
					// background-color:var(--themeColor);
				}
			}
		}
		.goods_introduce {
			padding-bottom: 80upx;
			.introduce_title {
				font-size:32upx;
				color: #EB4450;
				font-weight:bold;
				padding:40upx;
			}
			.introduce_content {
				image {
					width: 100%;
				}
			}
		}
		.bottom_bar {
			position:fixed;
			left:0;
			bottom:0;
			width:100%;
			height: 80upx;
			background-color:#FFF;
			border-top:solid 2upx #CCC;
			display:flex;
			.bar_item {
				flex:1;
				display:flex;
				flex-direction:column;
				justify-content:center;
				align-items:center;
				font-size:24upx;
			}
			.btn_cart,
			.btn_buy {
				flex:2;
				color:#FFF;
				font-size:28upx;
				font-weight:bold;
			}
			.btn_cart {
				background-color:#FFA500;
			}
			.btn_buy {
				background-color:#EB4450;
			}
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
	.f__canvas {
		width: 300rpx;
		height: 300rpx;
		position: fixed;
		top: -10000rpx;
		left: 0rpx;
	}
</style>
