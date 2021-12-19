<template>
	<view>
		<canvas
			class="my-canvas"
			canvas-id="myCanvas"
			id="myCanvas"
			:style="{'width': `${poster.width}px`, 'height': `${poster.height}px`}"/>
		<popup  
			:is-show="isShow"
			animate-type="middle">
			<view class="poster">
				<view class="poster-img">
					<image class="img" :src="posterImg" mode="widthFix" />
				</view>
				<view class="poster-btn" @tap="saveImage">保存到相册</view>
				<view class="poster-btn poster-cancel" @tap="close">取消</view>
			</view>
		</popup>
	</view>
</template>

<script>
	import { saveImageToPhotosAlbum, showToast, downloadFile } from '@/uni_modules/sakura-canvas/js_sdk/util';
	import Draw from '@/uni_modules/sakura-canvas/js_sdk/draw';
	let draw = null
	export default {
		props: {
			cancel: {
				type: Function,
				default: () => {}
			}
		},
		data() {
			return {
				isShow: false,
				poster: {},
				posterImg: '',
				canvasId: 'myCanvas',
				img: 'https://cdn2.xxkucun.com/xxkucun/xiangmu/20210628/593f6211-189b-4df4-9e9c-56ad02ff3352.jpg',
				title: '[东鑫记港式茶餐厅]南京东路|魔都新晋爆款茶餐厅来袭！99元抢门',
				price: 148,
				tips: '这是\n一款非常好用的\n绘图插件',
				head: 'https://shop.napi.cc/public/upload/2021/0630/2021063017503669.png',
				big: '',
			}
		},
		methods: {
			// 生成分享图
			async createdPoster() {
				let { canvasId, img, title, price, head, tips } = this
				draw = new Draw({
					width: 375,
					height: 590,
					canvasId,
					_this: this,
					background: {
						type: 'color',
						color: 'white',
						w: 375,
						h: 590,
					},
        });
				let res = await draw.createdSharePoster(({ bgObj }) => {
					let { width, height } = bgObj
					this.poster = bgObj
					// 绘制内容
					return [
						// 大图
						{
								type: 'image',
								x: 0,
								y: 0,
								src: img,
								w: width,
								h: width
						},
						// 标题
						{
							type: 'text',
							w: width - (20 * 2),
							text: title,
							color: '#333333',
							font: {
								size: 16
							},
							line: {
								num: 1
							},
							callBack: (before) => {
								let { sx, ex, sy, ey } = before
								return {
									x: sx + 20,
									y: ey + 20,
								}
							}
						},
						// 价格
						{
							type: 'text',
							text: `￥${price}`,
							color: '#fe4755',
							font: {
								size: 24
							},
							callBack: (before) => {
								let { sx, ex, sy, ey } = before
								return {
									x: sx,
									w: width - (sx * 2),
									y: ey + 15,
								}
							}
						},
						// 虚线
						{
							type: 'line',
							x: 0,
							w: width,
							color: '#ff875f',
							lineType: 'dashed',
							callBack: (before) => {
								let { sx, ex, sy, ey } = before
								return {
									y: ey + 10,
								}
							}
						},
						// 二维码
						{
							type: 'qrcode',
							x: 20,
							size: 100,
							text: 'https://ext.dcloud.net.cn/plugin?id=5291',
							image: {
								src: head,
								size: 30,
								r: 10,
								borderWidth: 7,
								borderColor: '#ffffff'
							},
							callBack: (before) => {
								let { sx, ex, sy, ey } = before
								return {
									y: ey + 15,
								}
							}
						},
						{
							type: 'text',
							w: 200,
							text: tips,
							color: '#333333',
							font: {
									size: 17,
							},
							line: {
									height: 22
							},
							callBack: (before, all) => {
								let { sx, ex, sy, ey, w } = before
								return {
									x: sx + w + 30,
									y: sy + 20,
								}
							}
						}
					]
				})
				if (!res.success) return
				this.posterImg = res.data
				// this.isShow = true
			},
			// 保存图片
			async saveImage() {
				let { posterImg } = this
				let res = await saveImageToPhotosAlbum(posterImg)
				if (!res.success) return
				showToast('保存成功')
				// this.isShow = false
				this.close();
			},
			close() {
				// this.isShow = false
				this.cancel();
			}
		}
	}
</script>
<style lang="scss" scoped>
    .demo{
			width: 700rpx;
			height: 400rpx;
			background-color: pink;
    }
    view, image{
       box-sizing: border-box;
    }
    .my-canvas{
			position: fixed;
			top: -99999999999rpx;
			left: -99999999999rpx;
			z-index: -99999999999;
			opacity: 0;
    }
    .poster{
			width: 100vw;
			height: 100vh;
			display: flex;
			padding-top: 30rpx;
			flex-flow: column nowrap;
			// justify-content: center;
			overflow: hidden;
			&-img{
				padding: 10rpx 10rpx 0;
				width: 580rpx;
				position: relative;
				margin: 0rpx auto 20rpx;
				background-color: #fff;
				.img{
					width: 100%;
				}
			}
			&-btn{
				width: 580rpx;
				height: 80rpx;
				border-radius: 40rpx;
				margin: 0 auto 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				background-color: #ff875f;
				&:last-child{
					margin-bottom: 0;
				}
			}
			&-cancel{
				background-color: #e4e4e4;
				color: #333;
			}
    }
</style>
