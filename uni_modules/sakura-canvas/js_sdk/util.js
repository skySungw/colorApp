// 路径转base64
import { base64ToPath } from './image-tools'
/**
 * base64转本地路径
 * @param { String } path 路径
 * @returns 
 */
 export function base64ToPathFn(path) {
	let reg =
		/^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i
	if (!reg.test(path)) {
		return Promise.resolve(path)
	}
	return base64ToPath(path)
}

/**
 * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
 * @param { String } url 资源路径
 * @param { Object } options 回调 
 * @returns 
 */
export function downloadFile(url, options = {
	onProgressUpdate: () => {}
}) {
	return new Promise(resolve => {
		try {
			let download = uni.downloadFile({
				url,
				header: options.header || {},
				success(res) {
					return resolve({
						success: true,
						data: res
					})
				},
				fail() {
					return resolve({
						success: false,
						message: `下载资源${url}失败`
					})
				}
			})
			// 下载进度回调
			download.onProgressUpdate(data => {
				options.onProgressUpdate(data)
			})
		} catch(e) {
			return resolve({
				success: false,
				msg: `下载资源${url}失败`
			})
		}
	})
}

/**
 * 加载提示框
 * @param { String } title 提示内容
 * @param { Boolean } mask 是否显示透明蒙层
 */
export function showLoading(title, mask = true) {
	uni.showLoading({
		title,
		mask
	})
}

/**
 * 关闭加载提示框
 */
export function hideLoading() {
	uni.hideLoading()
}

/**
 * 不需要确认提示框
 * @param { String } title 提示内容
 * @param { Object } options 参数
 * @param { Stirng } options.icon 提示图片
 * @param { String || Number } options.duration 时效
 */
export function showToast(title, options = {}) {
	uni.showToast({
		title,
		icon: options.icon || "none",
		duration: options.duration || 1500,
		mask: options.mask || false
	})
}

/**
 * 保存图片到系统相册。
 * @param { String } filePath 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
 * @returns 
 */
export function saveImageToPhotosAlbum(filePath) {
	return new Promise(resolve => {
		showLoading('保存中...')
		uni.saveImageToPhotosAlbum({
			filePath,
			success(res) {
				hideLoading()
				resolve({
					success: true,
					data: res.file
				})
			},
			fail(err) {
				hideLoading()
				resolve({
					success: false,
					message: err
				})
			}
		})
	})
}

/**
 * 计算文字长度
 * @param { CanvasText } Context canvas对象
 * @param { String } text 文本
 * @param { String } size 长度
 * @returns 
 */
export function countTextLength(Context, text, size) {
    let textLength = 0
    Context.setFontSize(size)
    try {
        textLength = Context.measureText(text)
    } catch(e) {
        textLength = {}
    }
    textLength = textLength && textLength.width ? textLength.width : 0
    if (textLength == 0) {
        for (let i of text) {
            textLength += Context.measureText(text)
        }
        textLength * size
    }
    return textLength
}


/**
 * 压缩图片 H5不支持
 * @param { Object } params 
 * @param { String } params.src 图片路径，图片的路径，可以是相对路径、临时文件路径、存储文件路径
 * @param { String } params.quality 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）
 * @param { String } params.width 缩放图片的宽度，支持像素值（如"100px"）、百分比（如"50%"）、自动计算（如"auto"，即根据height与源图高的缩放比例计算，若未设置height则使用源图高度）
 * @param { String } params.height 缩放图片的高度，支持像素值（如"100px"）、百分比（如"50%"）、自动计算（如"auto"，即根据height与源图高的缩放比例计算，若未设置height则使用源图高度）
 * @returns 
 */
export function compressImage(params = {}) {
	return new Promise(resolve => {
		uni.compressImage({
			src: params.src || '',
			quality: params.quality || 80,
			width: params.width || 'auto',
			height: params.height || 'auto',
			success: res => {
				resolve({
					success: true,
					src: res.tempFilePath
				})
			},
			fail: res => {
				resolve({
					success: false,
					message: '压缩图片失败'
				})
			}
		})
	})
}


/**
* 获取图片信息
* @param { String } src 图片地址
*/
export function getImageInfo(src){
   	return new Promise(resolve =>{
		uni.getImageInfo({
			src,
			success: res => {
				let { path } = res
				// #ifdef H5
				let index = path.lastIndexOf('.', path.length)
				let type = ''
				if (index != -1) {
					type = path.substring(index + 1, path.length)
				} else {
					type = 'png'
				}
				res.type = type
				// #endif
				resolve({
					success: true,
					...res
				})
			},
			fail: e => {
				resolve({
					success: false,
					msg: e
				})
			}
		})
	})
}


/**
 * 获取使用模式的图片信息
 * @param { String | Number } oWidth 原图宽度
 * @param { String | Number } oHeight 原图高度
 * @param { String | Number } x x轴位置
 * @param { String | Number } y y轴位置
 * @param { String | Number } width 宽度
 * @param { String | Number } height 高度
 * @param { String } mode 模式 
 * 			 		 aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
 * 					 aspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
 * 					 widthFix  宽度不变，高度自动变化，保持原图宽高比不变
 * 					 heightFix 高度不变，宽度自动变化，保持原图宽高比不变
 */
export function getModeImage(oWidth, oHeight, x, y, width, height, mode) {
	if (mode == 'aspectFit') {
		return getAspectFitModelInfo(oWidth, oHeight, x, y, width, height)
	}

	if (mode == 'aspectFill') {
		return getAspectFillModelInfo(oWidth, oHeight, x, y, width, height)
	}

	if (mode == 'widthFix') {
		return getWidthFixModelInfo(oWidth, oHeight, x, y, width, height)
	}

	if (mode == 'heightFix') {
		return getHeightFixModelInfo(oWidth, oHeight, x, y, width, height)
	}
	
	if (mode == 'default') {
		return {
			dw: width,
			dh: height,
			dx: x,
			dy: y
		}
	}
	return getAspectFillModelInfo(oWidth, oHeight, x, y, width, height)
}


// aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
function getAspectFitModelInfo(oWidth, oHeight, x, y, width, height) {
	let aspect = oHeight / oWidth
	let sw = width
	let sh = aspect * sw
	if (aspect > 1) {
		aspect = oWidth / oHeight
		sh = height
		sw = aspect * sh
	}
	return {
		sw,
		sh,
		sx: x,
		sy: y,
		dw: oWidth,
		dh: oHeight,
		dx: 0,
		dy: 0
	}
}

// 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
function getAspectFillModelInfo(oWidth, oHeight, x, y, width, height) {
	// 高比宽大 宽是短边
	let aspect = oHeight / oWidth
	let sw = width
	let sh = aspect * sw
	let dx = 0
	let dy = (sh - height) / 2
	if (aspect < 1) {
		// 高比宽小 高是短边
		aspect = oWidth / oHeight
		sh = height
		sw = aspect * sh
		dy = 0
		dx = (sw - width) / 2
	}
	return {
		sw,
		sh,
		sx: x,
		sy: y,
		dw: oWidth,
		dh: oHeight,
		dx,
		dy
	}
}


// 宽度不变，高度自动变化，保持原图宽高比不变
function getWidthFixModelInfo(oWidth, oHeight, x, y, width, height) {
	let aspect = oHeight / oWidth
	let sw = width
	let sh = sw * aspect
	let dx = 0
	let dy = 0
	return {
		sw,
		sh,
		sx: x,
		sy: y,
		dw: oWidth,
		dh: oHeight,
		dx,
		dy
	}
}


// 高度不变，宽度自动变化，保持原图宽高比不变
function getHeightFixModelInfo(oWidth, oHeight, x, y, width, height) {
	let aspect = oWidth / oHeight
	let sh = height
	let sw = sh * aspect
	let dx = 0
	let dy = 0
	return {
		sw,
		sh,
		sx: x,
		sy: y,
		dw: oWidth,
		dh: oHeight,
		dx,
		dy
	}
}