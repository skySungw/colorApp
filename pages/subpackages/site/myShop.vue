<template>
	<view class="my-shop full-height absolute flex flex-direction bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true" :isShow="isShow" :isCustom="true">
			<view slot="content">{{ title }}</view>
		</cu-custom>
		<!-- banner -->
		<view class="banner padding-sm flex" v-if="shopInfo">
			<view>
				<view class="cu-avatar radius xl" :style="'background-image:url(' + shopInfo.wxHeadImg + ');'"></view>
			</view>
			<view class="flex-1 padding-left-sm">
				<view class="text-bold margin-bottom-sm">{{ shopInfo.showcaseName }}</view>
				<view class="text-grey text-sm">{{ shopInfo.showcaseDesc }}</view>
			</view>
			<!-- 分享-->
			<view class="share flex align-center">
				<view class="cu-tag line-green share-button flex align-center" @tap="onshareModel">
					<view class="text-green">
						分享橱窗
					</view>
					<text class="cuIcon-forwardfill lg text-green text-center"></text>
					<!-- <button class="pop-box-btn" open-type="share"></button> -->
				</view>
			</view>
		</view>
		<view v-if="isSearchFocus" class="cu-bar search bg-white strick-top" :style="[{top: menuTop + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="商品名称" confirm-type="search" :value="searchValue" :focus="isSearchFocus" @input="onInput"></input>
			</view>
			<view class="action">
				<text @click="onSearchCancel">取消</text>
			</view>
		</view>
		<view v-else class="flex text-center padding-sm bg-white align-center strick-top" :style="[{top: menuTop + 'px'}]">
			<view class="flex-1" v-for="(item, index) in menu" :key="item.id" @tap="onMenuChange" :data-index="index" :data-id="item.id" :data-item="item">
				<text class="text-bold menu-text" :class="[{active: menuIndex === index}]">{{ item.name }}</text>
			</view>
			<view class="flex-1 serach flex flex-space-between align-center">
				<text class="cuIcon-search margin-right" @tap="showSearchBar"></text>
				<!-- <view>
					<text @tap="onAdd" class="cuIcon-add round text-bold text-green"></text>
				</view> -->
			</view>
		</view>
		<!-- 页面滚动 -->
		<view class="flex-1 bg-white my-shop_content">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			@scroll="scroll">
				<Goods
					class="goods-item_content"
					v-for="(item, index) in list"
					:key="index"
					:item="item"
					:source="3"
					:status="1"
					:goodsType="menuId"
					:showcaseId="params.showcaseId"
					@refreshList="onDeleteGoods"
				></Goods>
				<!-- 无更多数据 -->
				<view v-if="noMoreFlag" class="text-center padding-sm padding-bottom-xl">我是有底线的~</view>
			</scroll-view>
			<Empty v-if="list.length == 0" msg="暂无数据~" />
		</view>
		<!-- <view class="shop-footer">
			<text @tap="onAdd" class="cuIcon-add round text-bold bg-green shadow"></text>
		</view> -->
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
		<!-- 其它区域 -->
		<NavBar :index="4" :onAdd="onAdd" :showCaseId="params.showcaseId" :idStatus="idStatus"></NavBar>
		<!-- 海报 -->
		<canvas class="f__canvas" style="width:600px;height:730px"  canvas-id="goodsDetail" id="goodsDetail"></canvas>
		<!-- 二维码 -->
		<canvas class="f__canvas" style="width:300px;height:300px;" canvas-id="qrcode" id="qrcode"></canvas>
	</view>
</template>

<script>
	import _canvas from '@/utils/canvas';// 加载万能绘制方法
	import { saveImg,qrcodeCanvas } from '@/utils/plugins/utils';// 需要保存图片和生成二维码可以引用此文件
	
	import { onFetchShowcasePage, onFetchShowcaseInfo, onFetchOwnerStateShowcase, createWxQRCode } from '@/api';
	
	import NavBar from '@/components/navBar';
	import Goods from '@/components/goods';
	import Empty from '@/components/empty.vue';
	export default {
		components: {
			NavBar,
			Goods,
			Empty
		},
		data() {
			return {
				canvasImg: '',
				qrcodeImg:'',    //二维码本地图片
				content:'canvas万能制作方法，新手简单入手，易学，一天掌握canvas制作。绘制矩形方法、加载图片方法、绘制圆形头像方法、绘制图片cover不变形、文本自定义换行超出省略、绘制圆角按钮等方法。组合起来用，基本海报都能绘制。',   //内容
				goodsImg: 'https://mashang-quan.oss-cn-beijing.aliyuncs.com/image/97989fc9-e122-4579-9f3b-59904d428483.jpg',
				modalName: null,
				shopInfo: null, // 橱窗详情
				isShow: true, // 是否显示菜单， false - 不显示， true - 显示
				title: '',
				menuIndex: 0,
				menuId: 1,
				menuTop: this.CustomBar,
				menu: [
				// 	{
				// 	id: 9,
				// 	name: '全部'
				// }, 
				{
					id: 1,
					name: '圈友商品'
				}, {
					id: 2,
					name: '特惠商城'
				}],
				idStatus: 1, // 0 - 拥有者， 1 - 游客
				siteName: '', // 站长名
				params: {
					size: 10, // 页码
					current: 1, // 当前页
					total: 0, // 总数量
					showcaseId: '', // 商品橱窗id
					selType: '' ,// 不传递为全部, 0 普通C, 1 圈友商品, 2 自营商品
					goodsName: '',
				},
				scrollLeft:0,
				list: [], // 订单列表
				isSearchFocus: false, // 是否显示搜索框 并 自动聚焦
				searchValue: '', // 搜索条件
				timer: null,
				time: 1000,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				noMoreFlag: false, // 是否有更多数据
			}
		},
		onLoad(options) {
			this.isShow = options.menu == 1 ? true : false;
			let showcaseId = options.showcaseId || uni.getStorageSync('showcaseId');
			console.log('options.showcaseId', options.showcaseId)
			this.params.showcaseId = showcaseId;
			this.onGetShowCaseInfo(this.params.showcaseId);
		},
		onShow() {
			const token = uni.getStorageSync('token');
			if (!token) {
				uni.navigateTo({
					url: '/pages/sub/login/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('loginUrl', {
							loginUrl: `/pages/subpackages/site/myShop?showcaseId=${this.params.showcaseId}`,
						})
					}
				})
				return false;
			}
			this.getVisitOwner(this.params.showcaseId);
		},
		onShareAppMessage() {
			const promise = new Promise(resolve => {
				setTimeout(() => {
					resolve({
						// title: `${this.siteName} 的商品橱窗`,
						title: `${this.shopInfo.showcaseName} 的商品橱窗`,
						path: `/pages/subpackages/site/myShop?showcaseId=${this.params.showcaseId}`,
					})
				}, 2000)
			})
			return {
				title: '商品橱窗',
				path: `/pages/subpackages/site/myShop?showcaseId=${this.params.showcaseId}`,
				promise 
			}
		},
		// onReachBottom() {
		// 	console.log('bottom');
		// 	if (this.hasNext()) {
		// 		this.params.current++;
		// 		this.getShowCaseList();
		// 	}
		// },
		methods: {
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
					const scene = decodeURIComponent(`showcaseId=${this.params.showcaseId}`);
					const res = await createWxQRCode({
						scene,
						page: 'pages/subpackages/site/myShop'
					});
					if (res.code === 200) {
						this.qrcodeImg = res.data;
						this.createGoodsPoster();
					}
				} catch(err) {
					console.log('err', err);
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
				const cvsH = 500;
				const logo_w = 100;
			    const margin = 30;
				let height = 20;
				let family = " 'PingFang SC',tahoma,arial,'helvetica neue','hiragino sans gb','microsoft yahei',sans-serif";
				let ctx = uni.createCanvasContext('goodsDetail');
			    // 绘制矩形
				_canvas.fillRoundRect(ctx,0,0,cvsW,cvsH,20,"#ffffff");
			    // 同步加载图片
				let headerLogo = await _canvas.getImageInfo(this.shopInfo.wxHeadImg);
				let qrcode = await _canvas.getImageInfo(this.qrcodeImg);
				if(qrcode.path && headerLogo.path){
					height += 40;
					ctx.setFillStyle('#000000')
					ctx.font = "bold 40px" + family
					ctx.fillText('商品橱窗分享', 180, height)
					height += 60;
			        // // 橱窗名
			        // ctx.setFillStyle('#000000')
			        // ctx.font = "bold 26px" + family
			        // ctx.fillText(this.shopInfo.showcaseName, margin-5, height)
			        // height += 20;
			        // 橱窗介绍-多行文字
					ctx.setFillStyle('#666666')
			        ctx.textAlign = 'left';
					var options = {
						font:"normal 26px"+family,     //设置字体
						ctx:ctx,
						word: `${that.shopInfo.showcaseName}`,      //文本
						maxWidth:540,           //最大宽度
						maxLine:2,              //最大行数--超出省略
						x:margin,               //x坐标
						y:height,                  //y坐标
						l_h:40                  //行高
					}
			        // 文本自定义换行
					_canvas.dealWords(options)
			        // 绘制圆形头像
			        _canvas.drawCircular(ctx, headerLogo.path, margin, height+margin+160, logo_w, logo_w);
			        // 名称
			        ctx.setFillStyle('#000000')
			        ctx.font = "26px" + family
			        ctx.fillText(this.siteName, logo_w+margin+10, height+margin+195)
			        // 简介
			        ctx.setFillStyle('#999999')
			        ctx.font = "normal 22px" + family
			        ctx.fillText('长按进入橱窗', logo_w+margin+10, height+margin+235)
					console.log('that.qrcode', that.qrcodeImg)
			        // 绘制二维码
			        // ctx.drawImage(that.qrcodeImg, cvsW-margin-150, height+margin+80+50, 150, 150);
			        _canvas.drawImgCover(ctx, qrcode, cvsW-margin-150, height+margin+80+50, 150, 150);
					
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
			// 获取橱窗信息
			async onGetShowCaseInfo(showcaseId) {
				try {
					const res = await onFetchShowcaseInfo({
						showcaseId
					});
					if (res.code === 200) {
						console.log('res', res);
						this.shopInfo = res.data;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 删除商品
			onDeleteGoods(item) {
				this.initParams();
				// this.list.forEach((v, i) => {
				// 	if (v.goodsCode === item.goodsCode) {
				// 		console.log('i', i);
				// 		this.list.splice(i, 1);
				// 	}
				// })
			},
			onSearchCancel() {
				this.isSearchFocus = false;
				this.searchValue = '';
				this.list = [];
				this.getShowCaseList();
			},
			onInput(e) {
				this.searchValue = e.detail.value;
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.list = [];
					clearTimeout(this.timer);
					this.getShowCaseList();
				}, this.time)
			},
			// 显示搜索栏
			showSearchBar() {
				this.isSearchFocus = true;
			},
			// 切换菜单
			onMenuChange(e) {
				this.list = [];
				this.menuIndex = e.currentTarget.dataset['index'];
				this.menuId = e.currentTarget.dataset['id'];
				this.initParams();
			},
			// 橱窗商品列表
			onAdd(showcaseId, idStatus) {
				let url = '';
				showcaseId ?? this.params.showcaseId;
				idStatus = idStatus ?? this.idStatus;
				// 站长本人
				if (idStatus === 0) {
					url = '/pages/subpackages/site/goodsList';
				} else {
					// url = `/pages/sub/my/goods?source=1&showcaseId=${showcaseId}`;
					url = `/pages/sub/publish/publishGoods?source=1&showcaseId=${showcaseId}`;
				}
				console.log('url', url);
				uni.navigateTo({
					url
				})
			},
			// 获取身份标识
			async getVisitOwner(showcaseId) {
				try {
					const res = await onFetchOwnerStateShowcase({
						showcaseId
					});
					if (res.code === 200) {
					// "status": 1身份状态 0 橱窗拥有者 1 游客
						this.idStatus = res.data.status;
						this.siteName = res.data.ownerUserName;
						if (this.idStatus == 1) {
							this.title = `${this.siteName}的橱窗`;
							// this.menu = [{
							// 	id: 9,
							// 	name: '全部'
							// }, {
							// 	id: 0,
							// 	name: '我添加的'
							// }];
						} else {
							this.title = '我的橱窗'
						}
					}
				} catch(err) {
					console.log('err', err);
				}
				this.initParams();
			},
			// 是否有下一页
			hasNext() {
				return this.params.current < Math.ceil(this.params.total / this.params.size);
			},
			// 初始化列表页面参数
			initParams() {
				this.params.selType = this.menuId;
				if (this.params.selType == 9) {
					delete this.params.selType;
				}
				this.params.current = 1;
				this.list = [];
				this.getShowCaseList();
			},
			// 获取商品列表
			async getShowCaseList() {
				uni.showLoading();
				try {
					Object.assign(this.params, {
						goodsName: this.searchValue
					})
					const res = await onFetchShowcasePage(this.params);
					if (res.code === 200) {
						
						this.params.total = res.data.total;
						const list = res.data.records;
						list.forEach((v, i) => {
							let flag = false;
							if (this.idStatus == 1) {
								if (v.isDelete) {
									flag = true;
								}
							} else {
								flag = true;
							}
							list[i]['showDelete'] = flag;
						});
						if (this.params.current === 1) {
							this.list = list;
						} else {
							this.list = this.list.concat(list);
						}
						// 是否有下一页数据
						// this.hasNext = res.hasNext;
					}
					uni.hideLoading();
				} catch(err) {
					uni.hideLoading();
					console.log('err', err);
				}
			},
			onGoPage(item) {
				if (item['link']) {
					uni.navigateTo({
						url: item.link
					})
				}
			},// 滚动到顶部
			upper(e) {
					// console.log('upper', e)
			},
			// 滚动到底部
			lower(e) {
				console.log('bottom');
				if (this.hasNext()) {
					this.noMoreFlag = false;
					this.params.current++;
					this.getShowCaseList();
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
		}
	}
</script>
<style lang="scss" scoped>
	.strick-top {
		position: sticky;
	}
	.padding-fixed {
		padding-top: 100upx;
	}
	.fixed-shadow {
		box-shadow: 0 0 10upx rgba(0, 0, 0, .5);
	}
	.flex-align-center {
		align-items: center;
	}
	.flex-space-between {
		justify-content: space-between;
	}
	.fixed {
		position: fixed;
		width: 100%;
		z-index: 99;
		&.margin-top-sm {
			margin-top: 0;
			z-index: 999;
			box-shadow: 0 0 20upx rgba(0, 0, 0, .5);
		}
	}
	.my-shop {
		.banner {
			image {
				width: 100%;
				height: 200upx;
			}
		}
		.menu-text {
			position: relative;
			font-size: 28upx;
			&.active {
				color: #000;
				font-size: 30upx;
				&::after {
					content: '';
					position: absolute;
					left: -10upx;
					right: -10upx;
					height: 10upx;
					bottom: -14upx;
					border-radius: 10upx;
					background-color: rgba(255, 196, 91, .8);
					z-index: 0;
				}
			}
		}
		.serach {
			text {
				background-color: #F5F5F5;
				padding: 10upx;
			}
			.cuIcon-search {
				padding: 10upx 20upx;
				background-color: #F5F5F5;
				border-radius: 50upx;
			}
		}
		.goods-item_content {
			display: inline-block;
			width: 50%;
		}
		&_content {
			overflow: hidden;
			padding-bottom: 100upx;
		}
		.shop-footer {
			position: fixed;
			bottom: 240upx;
			width: 100%;
			left: 0;
			display: flex;
			justify-content: center;
			text {
				padding: 20upx;
				border-radius: 50%;
				box-shadow: 0 -3rpx 8upx rgba(0, 0, 0, 0.3);
				font-size: 50upx;
			}
		}
	}
	.share-button {
		position: relative;
		// border: 1upx solid green;
		// border-radius: 10upx;
		// padding: 5upx 10upx;
		.cuIcon-forwardfill {
			margin-left: 5upx;
		}
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
	.f__canvas {
		width: 300rpx;
		height: 300rpx;
		position: fixed;
		top: -10000rpx;
		left: 0rpx;
	}
</style>

