import { base64ToPathFn, downloadFile, showLoading, hideLoading, 
		countTextLength, getImageInfo, getModeImage, compressImage } from './util'

import QRCodeAlg from './qrcode'

/**
 * 绘制
 */
export default class Draw{
	constructor(params = {}) {
		let { width, canvasId, height, background, drawDelayTime, delayTime, _this, fileType, quality, isCompressImage } = params
		this.width = width
		this.height = height
		this.canvasId = canvasId || null
		this.background = background || {
			type: 'color',
			w: this.width,
			h: this.height,
			color: '#ffffff'
		}
		this.drawDelayTime = drawDelayTime || 200
		this.delayTime = delayTime || 200
		this._this = _this || null
		this.Context = uni.createCanvasContext(this.canvasId, this._this)
		// 导出图片的类型
		this.fileType = fileType || 'png'
		// 导出图片的质量
		this.quality = quality || 1
		// 是否压缩图片，填写时绘制图片会进行压缩操作。绘制图片也能填写该参数。层级大于当前
		this.isCompressImage = isCompressImage || false
		this.callBack = {
			bgObj: {
				width: this.background.w,
				height: this.background.h
			},
			ctxObj: {
				width,
				height
			}
		}
		this.drawTipsText = params.drawTipsText || '绘制中...'
		this.allCallBack = []
	}

	/**
	 * 绘制矩形
	 * @param { Object } params 绘制内容
	 */
	drawRect(params = {}) {
		let { width, Context } = this
		let { x, y, w, h, r, color, alpha, isFill, lineWidth, windowAlign, rotate, drawImage, borderColor, borderWidth, borderType } = {
			x: params.x || 0,
			y: params.y || 0,
			w: params.w || width,
			h: params.h || 0,
			r: params.r || 0,
			color: params.color || '#000000',
			borderWidth: params.borderWidth || 0,
			borderColor: params.borderColor || '#000000',
			borderType: params.borderType || 'default',
			alpha: params.alpha || 1,
			lineWidth: params.lineWidth || 1,
			isFill: params.isFill == undefined ? true : params.isFill,
			// 窗口对齐的方式 默认: none 可选 居中: center 右边: right
			windowAlign: params.windowAlign || 'none',
			// 旋转
			rotate: params.rotate || {},
			// 是否是在绘制图片,默认不是
			drawImage: params.drawImage == undefined ? false : params.drawImage,
		}
		if (r * 2 > h) {
			r = h / 2
		}
		if (!drawImage && rotate.deg) {
			Context.save()
			this.setRotate(x, y, w, h, rotate)
		}
		Context.beginPath()
		Context.setGlobalAlpha(alpha)
		if (windowAlign != 'none') {
			x = this.computedCenterX(width, w, windowAlign)
		}
		let tr = 0
		let tl = 0
		let br = 0
		let bl = 0
		if (typeof borderType == 'string') {
			switch(borderType) {
				case 'tr':
					tr = r
					break
				case 'tl':
					tl = r
					break
				case 'br':
					br = r
					break
				case 'bl':
					bl = r
					break
				default:
					tr = r
					tl = r
					br = r
					bl = r
			}
		}
		if (borderType instanceof Array) {
			if (borderType.includes('tr')) {
				tr = r
			}
			if (borderType.includes('tl')) {
				tl = r
			}
			if (borderType.includes('br')) {
				br = r
			}
			if (borderType.includes('bl')) {
				bl = r
			}
			if (borderType.includes('default')) {
				tr = r
				tl = r
				br = r
				bl = r
			}
		}
		// 上右 tr
		Context.lineTo(x + tl, y)
		Context.arc(x + w - tr, y + tr, tr, Math.PI * 1.5, 0, false)
		// 下右 br
		Context.lineTo(x + w, y + h - br)
		Context.arc(x + w - br,y + h - br, br, 0, Math.PI * .5, false)
		// 下左 bl
		Context.lineTo(x + bl, y + h)
		Context.arc(x + bl, y + h - bl, bl, Math.PI * .5, Math.PI, false)
		// 上左 tl
		Context.lineTo(x, y + tl)
		Context.arc(x + tl, y + tl, tl, Math.PI * 1, Math.PI * 1.5, false)
		Context.closePath()
		if (isFill) {
			if (borderWidth != 0) {
				Context.setLineWidth(borderWidth)
				Context.setStrokeStyle(borderColor)
				Context.stroke()
			}
			Context.setFillStyle(color)
			Context.fill()
		} else {
			Context.setLineWidth(lineWidth)
			Context.setStrokeStyle(color)
			Context.stroke()
		}
		Context.setGlobalAlpha(1)
		if (!drawImage && rotate.deg) {
			Context.restore()
		}
	}

	/**
	 * 绘制圆
	 * @param { Object } params 绘制内容
	 */
	drawArc(params = {}) {
		let { width, Context } = this
		let { x, y, r, s, e, d, alpha, isFill, lineWidth, color, windowAlign, borderColor, borderWidth } = {
			x: params.x || 0,
			y: params.y || 0,
			r: params.r || 0,
			s: params.s || 0,
			e: params.e || Math.PI * 2,
			// 可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
			d: params.d == undefined ? false : params.d,
			alpha: params.alpha || 1,
			isFill: params.isFill == undefined ? true : params.isFill,
			lineWidth: params.lineWidth || 1,
			borderWidth: params.borderWidth || 0,
			borderColor: params.borderColor || '#000000',
			color: params.color || '#000000',
			// 窗口对齐的方式 默认: none 可选 居中: center 右边: right
			windowAlign: params.windowAlign || 'none'
		}
		Context.beginPath()
		Context.setGlobalAlpha(alpha)
		x = x + r
		y = y + r
		if (windowAlign != 'none') {
			x = this.computedCenterX(width, r * 2, windowAlign)
			x += r
		}
		Context.arc(x, y, r, s, e, d)
		if (isFill) {
			if (borderWidth != 0) {
				Context.setLineWidth(borderWidth)
				Context.setStrokeStyle(borderColor)
				Context.stroke()
			}
			Context.setFillStyle(color)
			Context.fill()
		} else {
			Context.setLineWidth(lineWidth)
			Context.setStrokeStyle(color)
			Context.stroke()
		}
		Context.setGlobalAlpha(1)
	}


	/**
	 * 绘制三角形
	 * @param @param { Object } params 绘制内容
	 */
	drawTriangle(params = {}) {
		let { Context, width } = this
		let { x, y, w, h, color, alpha, isFill, lineWidth, drawType, coordinate, rotate, windowAlign, direction, borderWidth, borderColor } = {
			x: params.x || 0,
			y: params.y || 0,
			w: params.w || 0,
			h: params.h || 0,
			color: params.color || '#000000',
			borderWidth: params.borderWidth || 0,
			borderColor: params.borderColor || '#000000',
			alpha: params.alpha || 1,
			isFill: params.isFill == undefined ? true : params.isFill,
			lineWidth: params.lineWidth || 1,
			// 当绘制类别是自定义的时候需要传递的参数
			coordinate: params.coordinate || [],
			// 绘制三角形的类型
			// right: 直角三角形
			// isosceles: 等腰三角形
			// custom: 自定义时，x, y, 宽, 高都不需要传递。需要传递绘制点的坐标类型是数组(coordinate)
			// [[1, 3], [2, 3], [4, 5]]
			drawType: params.drawType || 'isosceles',
			// 三角形顶点朝向 top, left, right, bottom
			direction: params.direction || 'top',
			// 旋转
			rotate: params.rotate || {},
			// 窗口对齐的方式 默认: none 可选 居中: center 右边: right
			windowAlign: params.windowAlign || 'none'
		}
		if (windowAlign != 'none' && drawType != 'custom') {
			x = this.computedCenterX(width, w, windowAlign)
		}
		if (rotate.deg && drawType != 'custom') {
			Context.save()
			this.setTriangleRotate(x, y, w, h, rotate, drawType)
		}
		Context.beginPath()
		Context.setGlobalAlpha(alpha)
		if (drawType == 'isosceles') {
			switch (direction) {
				case 'top':
					Context.lineTo(x + w / 2, y)
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y + h)
					break
				case 'bottom':
					Context.lineTo(x, y)
					Context.lineTo(x + w, y)
					Context.lineTo(x + w / 2, y + h)
					break
				case 'right':
					Context.lineTo(x, y)
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y + h / 2)
					break
				case 'left':
					Context.lineTo(x + w, y)
					Context.lineTo(x + w, y + h)
					Context.lineTo(x, y + h / 2)
					break
			}
		} else if (drawType == 'right') {
			switch (direction) {
				case 'top':
					Context.lineTo(x, y)
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y + h)
					break
				case 'bottom':
					Context.lineTo(x, y)
					Context.lineTo(x + w, y)
					Context.lineTo(x, y + h)
					break
				case 'left':
					Context.lineTo(x, y)
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y)
					break
				case 'right':
					Context.lineTo(x, y + h)
					Context.lineTo(x + w, y + h)
					Context.lineTo(x + w, y)
					break
			}
			
		} else if (drawType == 'custom') {
			for (let i of coordinate) {
				Context.lineTo(i[0], i[1])
			}
		}
		Context.closePath()
		if (isFill) {
			if (borderWidth != 0) {
				Context.setLineWidth(borderWidth)
				Context.setStrokeStyle(borderColor)
				Context.stroke()
			}
			Context.setFillStyle(color)
			Context.fill()
		} else {
			Context.setLineWidth(lineWidth)
			Context.setStrokeStyle(color)
			Context.stroke()
		}
		Context.setGlobalAlpha(1)
		if (rotate.deg && drawType != 'custom') {
			Context.restore()
		}
	}


	/**
	 * 绘制图片
	 * @param { Object } params 绘制内容
	 */
	drawImage(params = {}) {
		let { width, Context } = this
		return new Promise(async resolve => {
			try {
				let { x, y, w, h, r, src, alpha, drawType, borderWidth, windowAlign, color, mode, rotate, triangle, isCompressImage, quality, borderColor, borderType } = {
					x: params.x || 0,
					y: params.y || 0,
					w: params.w || width,
					h: params.h || 0,
					r: params.r || 0,
					src: params.src || '',
					alpha: params.alpha || 1,
					mode: params.mode || 'aspectFill',
					// default: 默认，rect: 圆角矩形, arc: 圆形 triangle: 三角形
					drawType: params.drawType || 'default',
					borderWidth: params.borderWidth || 0,
					borderColor: params.borderColor || '#000000',
					borderType: params.borderType || 'default',
					color: params.color || '#ffffff',
					// 窗口对齐的方式 默认: none 可选 居中: center 右边: right
					windowAlign: params.windowAlign || 'none',
					// 旋转
					rotate: params.rotate || {},
					// 绘制三角形图片时三角形的内容
					// triangle.type 三角形的类型 right: 直角三角形 isosceles: 等腰三角形 custom: 自定义三角形(不支持旋转)
					// triangle.coordinate 自定义三角形时传递的坐标
					// triangle.direction 三角形顶点朝向
					triangle: params.triangle || {},
					// 是否压缩图片
					isCompressImage: params.isCompressImage != undefined ? params.isCompressImage : this.isCompressImage,
					// 压缩图片时图片的质量只对jpg类型的图片生效
					quality: params.quality || 80
				}
				if (!/\S/.test(src)) {
					return resolve({
						success: false,
						message: '图片路径为空'
					})
				}
				src = await base64ToPathFn(src)
				// #ifndef MP-TOUTIAO
				if (src.includes('http')) {
					let downlaod = await downloadFile(src)
					if (downlaod.data.statusCode != 200) {
						hideLoading()
						return resolve({
							success: false,
							msg: `图片路径为:${src}的文件下载失败`
						})
					}
					if (!downlaod.success) {
						hideLoading()
						return resolve({
							success: false,
							msg: '下载图片失败'
						})
					}
					src = downlaod.data.tempFilePath
				}
				// #endif
				if (windowAlign != 'none') {
					x = this.computedCenterX(width, w, windowAlign)
				}
				// #ifndef H5
				// 压缩图片(不支持H5)
				// if (isCompressImage) {
				// 	let compressRes = await compressImage({
				// 		src,
				// 		quality
				// 	})
				// 	if (!compressRes.success) {
				// 		return resolve(compressRes)
				// 	}
				// 	src = compressRes.src
				// }
				// #endif
				// showLoading('获取图片信息中....')
				// console.log('src', src)
				let imageInfo = await getImageInfo(src)
				if (!imageInfo.success) {
					hideLoading()
					return resolve(imageInfo)
				}
				// hideLoading()
				let modeImage = getModeImage(Number(imageInfo.width), Number(imageInfo.height), x, y, w, h, mode)
				let { dx, dy, dw, dh, sw, sh, sx, sy } = modeImage
				Context.beginPath()
				if (drawType == 'default') {
					Context.save()
					this.setRotate(x, y, w, h, rotate)
					// this.drawRect({
					// 	x,
					// 	y,
					// 	w,
					// 	h,
					// 	alpha,
					// 	color,
					// 	drawImage: true
					// })
					Context.setGlobalAlpha(alpha)
					if (mode != 'default') {
						await Context.drawImage(src, dx, dy, dw, dh, sx, sy, sw, sh)
					} else {
						await Context.drawImage(src, dx, dy, dw, dh)
					}
					Context.clip()
					Context.restore()
				} else if (drawType == 'arc') {
					// 绘制圆形图片
					Context.save()
					this.setRotate(x, y, w, h, rotate)
					this.drawArc({
						x,
						y,
						r: w / 2,
						borderWidth,
						borderColor,
						color,
					}, true)
					Context.clip()
					Context.setGlobalAlpha(alpha)
					if (mode != 'default') {
						await Context.drawImage(src, dx, dy, dw, dh, sx, sy, sw, sh)
					} else {
						await Context.drawImage(src, dx, dy, dw, dh)
					}
					Context.restore()
				} else if (drawType == 'rect') {
					// 绘制矩形图片
					Context.save()
					this.setRotate(x, y, w, h, rotate)
					this.drawRect({
						x,
						y,
						w,
						h,
						alpha,
						borderWidth,
						borderColor,
						borderType,
						r,
						color,
						drawImage: true
					}, true)
					Context.clip()
					Context.setGlobalAlpha(alpha)
					if (mode != 'default') {
						await Context.drawImage(src, dx, dy, dw, dh, sx, sy, sw, sh)
					} else {
						await Context.drawImage(src, dx, dy, dw, dh)
					}
					Context.restore()
				} else if (drawType == 'triangle') {
					// 绘制三角形图片
					Context.save()
					let type = triangle.type || 'isosceles'
					let coordinate = triangle.coordinate || []
					let direction = triangle.direction || 'top'
					if (type != 'custom') {
						this.setTriangleRotate(x, y, w, h, rotate, type)
					}
					this.drawTriangle({
						x,
						y,
						w,
						h,
						alpha,
						borderWidth,
						borderColor,
						color,
						coordinate,
						direction,
						drawType: type
					}, true)
					Context.clip()
					Context.setGlobalAlpha(alpha)
					if (mode != 'default') {
						await Context.drawImage(src, dx, dy, dw, dh, sx, sy, sw, sh)
					} else {
						await Context.drawImage(src, dx, dy, dw, dh)
					}
					Context.restore()
				}
				Context.setGlobalAlpha(1)
				return resolve({
					success: true,
					data: src
				})
			} catch(e) {
				return resolve({
					success: false,
					msg: '绘制图片出错'
				})
			}

		})
	}

	/**
	 * 绘制文字
	 * @param { Object } params 绘制内容 
	 */
	drawText(params = {}) {
		let { width, Context } = this
		let { x, y, w, text, textIndent, lastWidth, font, color, alpha, isFill, line, windowAlign, textAlign, baseline } = {
			x: params.x || 0,
			y: params.y || 0,
			w: params.w || width - params.x,
			text: String(params.text) || '',
			textIndent: params.textIndent || 0,
			lastWidth: params.lastWidth || 0,
			font: this.getFont(params.font),
			color: params.color || '#000000',
			alpha: params.alpha || 1,
			isFill: params.isFill == undefined ? true : params.isFill,
			// 文字在窗口对齐的方式 默认: none 可选 居中: center 右边: right
			windowAlign: params.windowAlign || 'none',
			// 文字的对齐方式(在容器里面) none 默认 center: 居中 right: 右边
			textAlign: params.textAlign || 'none',
			// 水平对齐方式
			baseline: params.baseline || 'top',
			line: this.getTextLine(params.line)
		}
		Context.save()
		Context.beginPath()
		Context.setGlobalAlpha(alpha)
		Context.font = font.style
		Context.setTextBaseline(baseline)
		if (typeof text != 'string') {
			text += ''
		}
		let textArr = params.textArr
		if (!textArr) {
			textArr = this.computedFontTextLineHeight(x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign)
		}
		if (isFill) {
			Context.setFillStyle(color)
			for (let i of textArr) {
				let { text, x, y, tx, ty, tw } = i
				Context.fillText(text, x, y)
				if (line.lineStyle != 'none') {
					this.drawLine({
						x: tx,
						y: ty,
						w: tw,
						color,
						lineType: line.lineType,
						lineWidth: line.lineWidth
					}, true)
				}
			}
		} else {
			Context.setStrokeStyle(color)
			for (let i of textArr) {
				let { text, x, y, tx, ty, tw } = i
				Context.strokeText(text, x, y)
				if (line.lineStyle != 'none') {
					this.drawLine({
						x: tx,
						y: ty,
						w: tw,
						color,
						lineType: line.lineType,
						lineWidth: line.lineWidth
					}, true)
				}
			}
		}
		Context.restore()
		Context.setGlobalAlpha(1)
	}


	/**
	 * 获取字体样式
	 * @param { Object } font 字体
	 */
	getFont(font = {}) {
		let { fontSize, fontFamily, fontStyle, fontVariant, fontWeight } = {
			fontSize: font.size || 12,
			fontFamily: font.family || 'sans-serif',
			// 斜体: italic, 倾斜体:oblique
			fontStyle: font.style || 'normal',
			fontVariant: font.variant || 'normal',
			// 粗体
			fontWeight: font.weight || 'normal'
		}
		return {
			fontSize, fontFamily, fontStyle, fontVariant, fontWeight,
			style: `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`
		}
	}

	/**
	 * 获取文字line样式
	 * @param { Object } line 行高
	 */
	getTextLine(line = {}) {
		return {
			// 显示的行数 -1 不限制
			lineNum: line.num || -1,
			// 行高
			lineHeight: line.height || 16,
			// none: 不需要 underline: 下划线, lineThrough 删除线
			lineStyle: line.style || 'none',
			// 线的类型 dashed 虚线 solid 实线
			lineType: line.type || 'solid',
			// 线宽度
			lineWidth: line.width || 1
		}
	}

	/**
	 * 画线
	 * @param { Object } params 绘制内容 
	 */
	drawLine(params = {}) {
		let { width, Context } = this
		let { x, y, color, w, algin, alpha, lineType, pattern, offset, lineCap, lineWidth, windowAlign } = {
			x: params.x || 0,
			y: params.y || 0,
			w: params.w || width - params.x,
			color: params.color || '#000000',
			algin: params.algin || 'right',
			alpha: params.alpha || 1,
			// dashed 虚线 solid 实线
			lineType: params.lineType || 'solid',
			// 详看CanvasContext.setLineDash文档
			// 一组描述交替绘制线段和间距（坐标空间单位）长度的数字
			pattern: params.pattern || [5, 5],
			// 虚线偏移量
			offset: params.offset || 5,
			lineWidth: params.lineWidth || 1,
			lineCap: params.lineCap || 'butt',
			// 窗口对齐的方式 默认: none 可选 居中: center 右边: right
			windowAlign: params.windowAlign || 'none'
		}
		Context.beginPath()
		Context.setGlobalAlpha(alpha)
		if (lineType == 'dashed') {
			Context.setLineDash(pattern, offset)
		}
		Context.setLineCap(lineCap)
		Context.setLineWidth(lineWidth)
		Context.setStrokeStyle(color)
		switch (algin) {
			case 'right':
				if (windowAlign != 'none') {
					x = this.computedCenterX(width, w, windowAlign)
				}
				Context.moveTo(x, y)
				Context.lineTo(w + x, y)
				break
			case 'left':
				if (windowAlign != 'none') {
					x = this.computedCenterX(width, w, windowAlign)
				}
				Context.moveTo(x, y)
				Context.lineTo(windowAlign == 'none' ? x - w : x + w, y)
				break
			case 'top':
				Context.moveTo(x, y)
				Context.lineTo(x, -(y + w))
				break
			case 'bottom':
				Context.moveTo(x, y)
				Context.lineTo(x, y + w)
				break
		}
		Context.stroke()
		Context.closePath()
		Context.setLineDash()
		Context.setGlobalAlpha(1)
	}


	/**
	 * 绘制二维码
	 * @param { Object } params 二维码参数
	 */
	drawQrCode(params = {}) {
		let { Context, width } = this
		return new Promise(async resolve => {
			let { x, y, image, windowAlign, ...options } = {
				x: params.x || 0,
				y: params.y || 0,
				text: String(params.text) || '',
				size: params.size || 100,
				// 容错级别 默认3
				correctLevel: params.lv || 3,
				// 二维码背景色
				background: params.background || '#000000',
				// 二维码前景色
				foreground: params.foreground || '#ffffff',
				// 二维码角标色
				pdground: params.pdground || '#ffffff',
				image: params.image || {},
				// 窗口对齐的方式 默认: none 可选 居中: center 右边: right
				windowAlign: params.windowAlign || 'none'
			}
			if (windowAlign != 'none') {
				x = this.computedCenterX(width, options.size, windowAlign)
			}
			//使用QRCodeAlg创建二维码结构
			let qrcodeAlgObjCache = []
			let qrCodeAlg = null
			let l = qrcodeAlgObjCache.length
			let d = 0
			for (let i = 0;i < l; i++) {
				d = i
				if (qrcodeAlgObjCache[i].text == options.text && qrcodeAlgObjCache[i].text.correctLevel == options.correctLevel) {
					qrCodeAlg = qrcodeAlgObjCache[i].obj
					break
				}
			}
			if (d == l) {
				qrCodeAlg = new QRCodeAlg(options.text, options.correctLevel)
				qrcodeAlgObjCache.push({
					text: options.text,
					correctLevel: options.correctLevel,
					obj: qrCodeAlg
				})
			}
			/**
			 * 计算矩阵点的前景色
			 * @param {Obj} config
			 * @param {Number} config.row 点x坐标
			 * @param {Number} config.col 点y坐标
			 * @param {Number} config.count 矩阵大小
			 * @param {Number} config.options 组件的options
			 * @return {String}
			 */
			let getForeGround = function (config) {
				let options = config.options
				if (options.pdground && (
					(config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5) ||
					(config.row > (config.count - 6) && config.row < (config.count - 2) && config.col > 1 && config.col < 5) ||
					(config.row > 1 && config.row < 5 && config.col > (config.count - 6) && config.col < (config.count - 2))
				)) {
					return options.pdground
				}
				return options.foreground
			}
			let count = qrCodeAlg.getModuleCount()
			let ratioSize = options.size
			let ratioImgSize = image.size || 30
			//计算每个点的长宽
			let tileW = (ratioSize / count).toPrecision(4)
			let tileH = (ratioSize / count).toPrecision(4)
			//绘制
			for (let row = 0; row < count; row++) {
				for (let col = 0; col < count; col++) {
					let w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW))
					let h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW))
					let foreground = getForeGround({
						row: row,
						col: col,
						count: count,
						options: options
					})
					Context.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background)
					Context.fillRect(x + Math.round(col * tileW), y + Math.round(row * tileH), w, h)
				}
			}
			if (image.src) {
				let { src, r, color, borderWidth, borderColor } = image
				let dx = x + Number(((ratioSize - ratioImgSize) / 2).toFixed(2))
                let dy = y + Number(((ratioSize - ratioImgSize) / 2).toFixed(2))
				let drawImage = await this.drawImage({
					x: dx,
					y: dy,
					w: ratioImgSize,
					h: ratioImgSize,
					src,
					r,
					color,
					borderWidth,
					borderColor,
					drawType: 'rect',
					isCompressImage: false,
				}, true)
				if (!drawImage.success) {
					return resolve(drawImage)
				}
			}
			return resolve({
				success: true
			})
		})
	}


	/**
	 * 计算出文字一共有多少列,渲染位置之类
	 * @param { Number } x x轴
	 * @param { Number } y y轴
	 * @param { Number } w 文字宽度
	 * @param { String } text 文字内容
	 * @param { Number } textIndent 首行缩进
	 * @param { Number } lastWidth 最后一行的宽度 
	 * @param { Object } font 字体
	 * @param { Object } line 行高
	 * @param { String } textAlign 文字对齐方式
	 * @param { String } windowAlign 窗口对齐方式
	 * @returns 
	 */
	computedFontTextLineHeight(x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign) {
		let { Context, width } = this
		let { fontSize } = font
		let { lineNum, lineHeight, lineStyle } = line
		// 文字的总长度
		let textLength = countTextLength(Context, text, fontSize)
		let temp = ''
		let row = []
		if (text.includes('\n')) {
			let texts = text.split('\n')
			for (let text of texts) {
				computedTextLength(text)
			}
		} else {
			computedTextLength(text)
		}
		function computedTextLength(text) {
			for (let i in text) {
				let tempLength = countTextLength(Context, temp, fontSize)
				if (row.length == 0 && textIndent != 0 && textAlign == 'none' && windowAlign == 'none') {
					tempLength += textIndent * fontSize
				}
				if (tempLength <= w && countTextLength(Context, (temp + text[i]), fontSize) <= w) {
					temp += text[i]
				} else {
					row.push(temp)
					temp = text[i]
				}
				if (i == text.length - 1) {
					row.push(temp)
					temp = ''
				}
			}
		}
		if (lineNum != -1 && lastWidth != 0 && row.length != 0 && row.length > lineNum) {
			let lastText = row[lineNum - 1]
			let temp = ''
			for (let i in lastText) {
				let tempLength = countTextLength(Context, temp, fontSize)
				if (tempLength <= lastWidth && countTextLength(Context, (temp + lastText[i]), fontSize) <= lastWidth) {
					temp += lastText[i]
					continue
				}
				break
			}
			row[lineNum - 1] = temp
		}
		lineHeight = lineHeight == 1 ? fontSize + 2 : lineHeight
		// 获取一共有多少列
		let lineSize = Math.ceil(textLength / w)
		if (text.includes('\n') && lineNum == -1) {
			lineNum = row.length
		} else if (text.includes('\n') && lineNum != -1) {
			lineSize = row.length
			lineNum = lineNum > lineSize ? lineSize : lineNum
		} else if (lineNum != -1) {
			lineNum = lineNum > lineSize ? lineSize : lineNum
		}
		let size = lineNum != -1 ? lineNum : lineSize
		let textArr = []
		for (let i = 0; i < size; i++) {
			let obj = {}
			let text = row[i]
			let textLength = countTextLength(Context, text, fontSize)
			let wx = x
			let tx = x
			if (i == 0 && textIndent != 0 && textAlign == 'none' && windowAlign == 'none') {
				textLength += textIndent * fontSize
				wx += textIndent * fontSize
				tx = wx
			}
			if (textAlign != 'none' && textLength < w) { 	
				tx = this.computedCenterX(w, textLength, textAlign)
				wx = tx
			}
			if (windowAlign != 'none' && textAlign != 'none') {
				wx = this.computedCenterX(width, w, windowAlign)
				wx += tx
				tx = wx
			} else if (windowAlign != 'none') {
				wx = this.computedCenterX(width, w, windowAlign)
				tx = wx
			}
			if (text && lineNum != -1 && i == lineNum - 1) {
				if ((textLength + fontSize) >= w) {
					text = text.substring(0, text.length - 1) + '...'
				} else if (lastWidth != 0 && (textLength + fontSize) >= lastWidth) {
					text = text.substring(0, text.length - 1) + '...'
				}
			}
			if (lineStyle != 'none') {
				obj.tx = tx
				obj.tw = textLength
				if (lineStyle == 'underline') {
					obj.ty =  y + (i * lineHeight) + fontSize
				}
				if (lineStyle == 'lineThrough') {
					obj.ty = y + (i * lineHeight) + fontSize / 2
				}
			}
			obj.text = text
			obj.x = wx
			obj.y = y + (i * lineHeight)
			text && textArr.push(obj)
		}
		return textArr
	}
	
	/**
	 * 计算内容需要显示在画布中间的x轴的位置
	 * @param { Number | String } boxWidth 容器的宽度
	 * @param { Number | String } contentWidth 内容宽度
	 * @param { String } type 类型 center: 水平 right: 右边
	 * @returns 
	 */
	computedCenterX(boxWidth, contentWidth, type = 'center') {
		if (type == 'center') {
			return (boxWidth - contentWidth) / 2
		}
		if (type == 'right') {
			return boxWidth - contentWidth
		}
	}

	/**
	 * 设置旋转角度
	 * @param { String } x x轴
	 * @param { String } y y轴
	 * @param { String } w 宽度
	 * @param { String } h 高度
	 * @param { Object } rotate 旋转内容
	 * @param { String } rotate.deg 旋转角度
	 * @param { String } rotate.type 类型 topLeft: 中心点在上左 topMiddle 中心点在上中 topRight 中心点在上右
	 *                             middleLeft: 中心点在中左 bottomMiddle 中心点在正中间 middleRight 中心点在中右
	 * 							   bottomLeft: 中心点在下左 bottomMiddle 中心点在下中 middleRight 中心点在下右
	 */
	setRotate(x, y, w, h, rotate) {
		let { Context } = this
		let deg = rotate.deg || 0
		let type = rotate.type || 'middle'
		let rx = x
		let ry = y
		switch (type) {
			case 'topLeft':
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'topMiddle':
				rx = x + (w / 2)
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'topRight':
				rx = x + w
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'bottomLeft':
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'bottomMiddle':
				rx = x + (w / 2)
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'bottomRight':
				rx = x + w
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'middleLeft':
				ry = y + (h / 2)
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'middleRight':
				rx = x + w
				ry = y + (h / 2)
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'middle':
				rx = x + (w / 2)
				ry = y + (h / 2)
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
		}
	}

	/**
	 * 设置三角形旋转角度
	 * @param { String } x x轴
	 * @param { String } y y轴
	 * @param { String } w 宽度
	 * @param { String } h 高度
	 * @param { Object } rotate 旋转内容
	 * @param { String } rotate.deg 旋转角度
	 * @param { String } rotate.type 类型 top: 上 left: 左 right: 右 middle: 中心
	 * @param { String } triangType 三角形类型(不支持自定义的三角形 ) right: 直角三角形 isosceles: 等腰三角形
	 */
	setTriangleRotate(x, y, w, h, rotate, triangType) {
		let { Context } = this
		let deg = rotate.deg || 0
		let type = rotate.type || 'top'
		let rx = x
		let ry = y
		switch (type) {
			case 'top':
				if (triangType == 'right') {
					rx = x
					ry = y
				} else {
					rx = x + w / 2
					ry = y
				}
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'left':
				rx = x
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'right':
				rx = x + w
				ry = y + h
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
			case 'middle':
				rx = x + w / 2
				ry = y + h / 2
				Context.translate(rx, ry)
				Context.rotate(deg * Math.PI / 180)
				Context.translate(-rx, -ry)
				break
		}
	}

	/**
	 * 排序drawArray 根据数据的zIndex进行排序，修改渲染顺序
	 * @param { Array } drawArray 绘制内容
	 */
	sortDrawArray(drawArray) {
		function compare() {
			return function(after, current) {
				let aZIndex = after.zIndex || 0
				let cZIndex = current.zIndex || 0
				return aZIndex - cZIndex
			}
		}
		drawArray.sort(compare())
		return drawArray
	}

	/**
	 * 往所有的回调信息里面添加内容
	 * @param { Object } params 内容
	 */
	setAllCallBack(params) {
		let { width } = this
		let { type, x, y, r, w, h, lineWidth, size, name } = params
		w = w || width
		h = h || 0
		x = x || 0
		y = y || 0
		r = r || 0
		lineWidth = lineWidth || 1
		size = size || 0
		name = name || ''
		let sx = x
		let sy = y
		let ex = x + w
		let ey = y + h
		// 圆形
		if (type == 'arc') {
			ex = x + r * 2
			ey = y + r * 2
			w = r * 2
			h = r * 2
		}
		// 文字
		if (type == 'text') {
			let { text, textIndent, lastWidth, font, line, textAlign, windowAlign } = {
				text: String(params.text) || '',
				textIndent: params.textIndent || 0,
				lastWidth: params.lastWidth || 0,
				font: this.getFont(params.font),
				line: this.getTextLine(params.line),
				textAlign: params.textAlign || 'none',
				windowAlign: params.windowAlign || 'none',
			}
			if (w == width) {
				w -= x
			}
			let textArr = this.computedFontTextLineHeight(x, y, w, text, textIndent, lastWidth, font, line, textAlign, windowAlign)
			let lastText = textArr[textArr.length - 1]	
			ex = lastText.x + (font.fontSize * lastText.text.length)
			ey = lastText.y + font.fontSize
			params.textArr = textArr
			h = ey - sy
		}
		// 线
		if (type == 'line') {
			ey = y + lineWidth
			h = lineWidth
		}
		// 二维码
		if (type == 'qrcode') {
			ex = x + size
			ey = y + size
			w = size
			h = size
		}
		this.allCallBack.push({
			sx,
			sy,
			ex,
			ey,
			w,
			h,
			name
		})
	}

	/**
	 * 绘制内容
	 * @returns 
	 */
	drawCanvas(drawArray) {
		let { Context } = this
		return new Promise(async resolve => {
			try {
				for (let i of drawArray) {
					if (i.callBack && typeof i.callBack == 'function' && i.type != 'custom') {
						let beforeInfo = this.allCallBack.length == 0 ? {} : this.allCallBack[this.allCallBack.length - 1]
						let callBackInfo = i.callBack(beforeInfo, this.allCallBack) || {}
						let { callBack, ...data } = i
						i = { ...data, ...callBackInfo }
					}
					if (i.type != 'custom' && i.drawType != 'custom') {
						this.setAllCallBack(i)
					}
					switch (i.type) {
						// 文字
						case 'text': 
							this.drawText(i)
							break
						// 矩形
						case 'rect':
							this.drawRect(i)
							break
						// 图片
						case 'image': 
							let image = await this.drawImage(i)
							if (!image.success) {
								return resolve(image)
							}
							break
						// 圆形
						case 'arc':
							this.drawArc(i)
							break
						// 三角形
						case 'triangle':
							this.drawTriangle(i)
							break
						// 线条
						case 'line':
							this.drawLine(i)
							break
						// 二维码
						case 'qrcode':
							await this.drawQrCode(i)
							break
						// 自定义
						case 'custom':
							i.setDarw(Context, this)
							break
					}
				}
				resolve({
					success: true
				})
			} catch(e) {
				hideLoading()
				return resolve({
					success: false,
					msg: '绘制内容失败:' + e
				})
			}
	
		})
	}

	/**
	 * 绘制背景
	 * @returns 
	 */
	drawBackground() {
		let { background, width, height, Context } = this
		return new Promise(async resolve => {
			let { type, ...params } = background
			Context.beginPath()
			Context.save()
			// 绘制背景色
			if (type == 'color') {
				this.drawRect({
					...params,
					w: params.w || width,
					h: params.h || height,
					color: params.color || '#ffffff'
				}, true)
			}
			// 绘制背景图
			if (type == 'image') {
				await this.drawImage({
					...params,
					w: params.w || width,
					h: params.h || height,
				}, true)
			}
			Context.clip()
			Context.restore()
			resolve({
				success: true
			})
		})
	}

	/**
	 * 创建canvas导出文件
	 * @returns 
	 */
	createdCanvasFilePath() {
		let { canvasId, width, height, _this, fileType, quality } = this
		return new Promise(resolve => {
			try {
				uni.canvasToTempFilePath({
					canvasId,
					x: 0,
					y: 0,
					width,
					height,
					quality,
					fileType,
					success: res => {
						resolve({
							success: true,
							data: res.tempFilePath,
							msg: '绘画成功'
						})
					},
					fail: err => {
						resolve({
							success: false,
							msg: `导出图片失败: ${JSON.stringify(err)}`
						})
						hideLoading()
					}
				}, _this || null)
			} catch (e) {
				hideLoading()
				resolve({
					success: false,
					msg: '导出图片失败: 绘画错误'
				})
			}
		})
	}

	/**
	 * 预绘制背景
	 * @returns 
	 */
	preDrawBackground() {
		return new Promise(async resolve => {
			try {
				showLoading('初始化中...')
				// 绘制背景
				const drawBackground = await this.drawBackground()
				if (!drawBackground.success) {
					hideLoading()
					return resolve({
						success: false,
						msg: '初始化失败，绘制背景图失败'
					})
				}
				hideLoading()
				return resolve({
					success: true,
					msg: '初始化成功'
				})
			} catch(e) {
				hideLoading()
				resolve({
					success: false,
					msg: e
				})
			}
		})
	}

	/**
	 * 将绘制的内容绘制到画布上
	 * @param { Boolean } complete 是否完成，如果为true会绘制图片并返回图片路径
	 * @returns 
	 */
	canvasDraw(complete = true) {
		let { Context, drawDelayTime } = this
		return new Promise(async resolve => {
			setTimeout(async () => {
				hideLoading()
				await Context.draw(true, async () => {
					if (complete) {
						return resolve(await this.exportImage())
					}
					return resolve({
						success: true,
						msg: '成功'
					})
				})
			}, drawDelayTime || 200)
		})
	}

	/**
	 * 预绘画
	 * @param { Function } drawArray 绘制内容 返回一个数组
	 * @param { Boolean } complete 是否完成，如果为true会绘制图片
	 * @returns 
	 */
	preDraw(drawArray, complete = false) {
		return new Promise(async resolve => {
			try {
				let { callBack, drawTipsText } = this
				showLoading(drawTipsText)
				let drawCanvas = await this.drawCanvas(this.sortDrawArray(drawArray(callBack)))
				// 绘制内容
				if (!drawCanvas.success) {
					hideLoading()
					return resolve(drawCanvas)
				}
				return resolve(await this.canvasDraw(complete))
			} catch(e) {
				hideLoading()
				resolve({
					success: false,
					msg: e
				})
			}

		})
	}


	/**
	 * 导出图片
	 * @returns 
	 */
	exportImage() {
		let { canvasId, width, height, _this, delayTime } = this
		return new Promise(resolve => {
			showLoading('导出图片中...')
			// 绘制图片
			setTimeout(async () => {
				resolve(await this.createdCanvasFilePath(canvasId, width, height, _this))
				hideLoading()
			}, delayTime || 200)
		})
	}

	
	/**
	 * 创建绘制海报
	 * @param { Function } drawArray 绘制内容 返回一个数组
	 * @returns 
	 */
	createdSharePoster(drawArray) {
		let { callBack } = this
		return new Promise(async resolve => {
			if (drawArray == null || drawArray == undefined) {
				return resolve({
					success: false,
					msg: '请传递绘制内容'
				})
			}
			let backgroundRes = await this.preDrawBackground()
			if (!backgroundRes.success) {
				return resolve(backgroundRes)
			}
			showLoading('绘制中...')
			let drawRes = await this.drawCanvas(this.sortDrawArray(await drawArray(callBack)))
			// 绘制内容
			if (!drawRes.success) {
				hideLoading()
				return resolve(drawRes)
			}
			return resolve(await this.canvasDraw())
		})
	}
}