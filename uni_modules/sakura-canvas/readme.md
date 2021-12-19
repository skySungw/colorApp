# sakura-canvas(海报生成器)



# 用前需知: 

## 1、小程序绘制时，记得配置图片的域名为安全域名(白名单)

## 2、兼容性。目前只测试过APP(不包括NVUE页面), 微信小程序, H5, 字节跳动小程序。其他小程序未测。





# 引入

```javascript
import Draw from '@/uni_modules/sakura-canvas/js_sdk/draw'
```



# 使用教程



## 初始化

```javascript
let draw = new Draw({
    width: 375, // canvas(海报)的宽度 必填
    height: 500, // canvas(海报)的高度 必填
    canvasId: 'myCanvas', // canvasId 必填
    _this: this, // 传入this实例 必填
    background: {
        type: 'color', // 背景样式 color: 纯色 image: 图片
        color: '#fffff',
        // color: 参数详看绘制矩形的参数
        // image: 详看绘制图片时的参数
    }, // 背景 默认纯白,
    drawDelayTime: 200, // 绘制海报时的延迟时间(单位毫秒),默认200,
    delayTime: 200, // 导出图片时的延迟时间(单位毫秒),默认200,
    fileType: 'png', // 导出图片的类型, 默认png 可选jpg, png
    quality: 1, // 导出图片的质量, 默认1 值范围0~1, 大于一都为1处理
    drawTipsText: '绘制中...', // 绘制时的加载提示, 默认绘制中...
})
```



## Draw类内置方法大纲



# 非Json方式绘制

## 绘制文本-text

# !!!注意绘制文本添加使用\n实现自定义换行

```javascript
// 绘制文字
draw.drawText({
    x: 0, // x轴方向 默认 0
    y: 0, // y轴方向 默认 0
    w: 100, // 文字宽度 默认整个画布的宽度 - x轴的距离
    text: '你好\n世界', // 文字内容
    textIndent: 0, // 文字首行缩进 默认0 注意在设置了windowAlign或者textAlign的时候会失去作用
    font: {
        size: 12, // 文字大小 默认12
        family: '微软雅黑', // 文字字体 默认sans-serif
        style: 'normal', // 文字样式 默认 normal 可选: italic: 斜体 oblique: 倾斜体
        weight: 'normal' // 文字粗体 默认 normal 可传递 bold: 粗体 数字
    },
    line: {
        num: -1, // 限制文字行数，默认 -1: 不限制 限制行数，多出部分会变成...
        height: 16, // 行高默认16
        style: 'none', // 样式 默认none: 不需要 可选 underline: 下划线, lineThrough 删除线
        type: 'solid', // 线类型 当使用样式时线的类型 默认: solid 实线 可选: dashed 虚线 
        width: 1, // 线宽度 默认1
    },
    color: '#000000', // 文字颜色 默认#000000 在不考虑字节跳动小程序的前提下可简写(#000)
    alpha: 1, // 透明度 默认1 取值范围 0~1
    isFill: true, // 是否是填充字体, false: 线性字体
    windowAlign: 'none', // 文字在窗口(整个画布的宽度)对齐的方式 默认: none 可选 居中: center 右边: right
    textAlign: 'none', // 文字水平对齐的方式 默认: none 可选 居中: center 右边: right
})
```



## 绘制矩形-rect

```javascript
// 绘制矩形
draw.drawRect({
    x: 0, // x轴方向 默认 0
    y: 0, // y轴方向 默认 0
    w: 100, // 宽度 必填
    h: 100, // 高度 必填
    r: 0, // 矩形圆角大小 默认: 0
    color: '#000000', // 颜色 默认#000000 在不考虑字节跳动小程序的前提下可简写(#000)
    alpha: 1, // 透明度 默认1 取值范围 0~1
    isFill: true, // 是否是填充矩形, false: 线性矩形
    lineWidth: 1, // 当矩形为线性时，矩形的边框宽度
    windowAlign: 'none', // 矩形在窗口(整个画布的宽度)对齐的方式 默认: none 可选 居中: center 右边: right
    // 旋转
    rotate: {
        deg: 0, // 旋转角度
        type: 'middle', // 旋转的中心点 默认: middle: 矩形正中心
        // topLeft: 中心点在上左 topMiddle 中心点在上中 topRight 中心点在上右
        // middleLeft: 中心点在中左 bottomMiddle 中心点在正中间 middleRight 中心点在中右
        // bottomLeft: 中心点在下左 bottomMiddle 中心点在下中 middleRight 中心点在下右
    },
    borderWidth: 0, // 边框大小 默认0 (类型为填充矩形时生效)
    borderColor: '#ffffff', // 边框颜色 默认无颜色 (类型为填充矩形时生效)
    // 圆角的方向
    // 值类型为数组, 添加不同的圆角方向设置哪里是圆角哪里不是圆角
    // 参数可选值 tr: 上右; tl: 上左; bl:左下; br: 左右; default: 全圆角
    borderType: ['tr', 'tl'] // 默认全圆角['default']
})
```



## 绘制圆-arc

```javascript
// 绘制圆
draw.drawArc({
    x: 0, // x轴方向 默认 0
    y: 0, // y轴方向 默认 0
    r: 100, // 圆半径 必填
    s: 0, // 画圆的起始角度
    e: Math.PI * 2, // 画圆的终止角度
    d: false, // 指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
    color: '#000000', // 颜色 默认#000000 在不考虑字节跳动小程序的前提下可简写(#000)
    alpha: 1, // 透明度 默认1 取值范围 0~1
    isFill: true, // 是否是填充圆, false: 线性圆
    lineWidth: 1, // 当圆为线性时，圆的边框宽度
    windowAlign: 'none', // 圆在窗口(整个画布的宽度)对齐的方式 默认: none 可选 居中: center 右边: right
    borderWidth: 0, // 边框大小 默认0 (类型为填充圆时生效)
    borderColor: '#ffffff' // 边框颜色 默认无颜色 (类型为填充圆时生效)
})
```



## 绘制三角形-triangle

```javascript
// 绘制三角形
draw.drawTriangle({
    x: 0, // x轴方向 默认 0
    y: 0, // y轴方向 默认 0
    w: 100, // 宽度 必填
    h: 100, // 高度 必填
    r: 0, // 矩形圆角大小 默认: 0
    color: '#000000', // 颜色 默认#000000 在不考虑字节跳动小程序的前提下可简写(#000)
    alpha: 1, // 透明度 默认1 取值范围 0~1
    isFill: true, // 是否是填充三角形, false: 线性三角形
    lineWidth: 1, // 当三角形为线性时，三角形的边框宽度
    drawType: 'isosceles', // 绘制的三角形类型 默认 isosceles: 等腰三角形 right: 直角三角形 custom: 自定义自定义时，x, y, 宽, 高都不需要传递。需要传递绘制点的坐标类型是数组(coordinate)
    // 三角形定点朝向 top, left, right, bottom (只在等腰三角形和直角三角形里生效，自定义绘制不生效)
    direction: params.direction || 'top',
    coordinate: [], // 当绘制类别是自定义的时候需要传递的参数[[x1, y1], [x2, y2], [x3, y3]]
    windowAlign: 'none', // 三角形在窗口(整个画布的宽度)对齐的方式 默认: none 可选 居中: center 右边: right (并且三角形类型不能为自定义)
    // 旋转
    rotate: {
        deg: 0, // 旋转角度
        type: 'middle', // 旋转的中心点 默认: middle: 三角形正中心
        // top: 上 left: 左 right: 右 middle: 中心
    },
    borderWidth: 0, // 边框大小 默认0 (类型为填充三角形时生效)
    borderColor: '#ffffff' // 边框颜色 默认无颜色 (类型为填充三角形时生效)
})
```



## 绘制线条-line

```javascript
// 绘制线条
draw.drawLine({
    x: 0, // x轴方向 默认 0
    y: 0, // y轴方向 默认 0
    w: 100, // 宽度 默认整个画布的宽度 - x轴的距离
    color: '#000000', // 颜色 默认#000000 在不考虑字节跳动小程序的前提下可简写(#000)
    alpha: 1, // 透明度 默认1 取值范围 0~1
    lineType: 'solid', // 线条类型 默认 solid: 实线 可选 dashed: 虚线 
    pattern: [5, 5], // 当线条类型为虚线是生效，具体详看CanvasContext.setLineDash文档
    offset: 5, // 虚线偏移量 默认: 5
    lineWidth: 1, // 线条高度
    lineCap: 'butt', // 线条端点样式 默认 butt 可选 round, square
    windowAlign: 'none', // 线条在窗口(整个画布的宽度)对齐的方式 默认: none 可选 居中: center 右边: right
})
```



## 绘制图片-image

```javascript
// 绘制图片
await draw.drawImage({
    x: 0, // x轴方向 默认 0
    y: 0, // y轴方向 默认 0
    w: 100, // 图片宽度 必填
    h: 100, // 图片高度 必填
    r: 0, // 当图片样式为矩形时, 圆角的大小
    alpha: 1, // 透明度 默认1 取值范围 0~1
    src: '/static/logo.png', // 图片资源路径 必填 网络路径(小程序中需要配置白名单)，本地路径, base64(使用base64格式绘制速度会稍微慢点，在IOS端显著。)
    mode: 'aspectFill', // 图片模式 默认 aspectFill 可选 aspectFit, widthFix, heightFix
    drawType: 'default', // 图片样式 default: 默认 rect: 矩形, arc: 圆形 triangle: 三角形
    triangle: {
        type: 'isosceles', // 三角形的类型 right: 直角三角形 isosceles: 等腰三角形 custom: 自定义三角形(不支持旋转)
        coordinate: [], // 自定义时传递, [[x1, y1], [x2, y2], [x3, y3]],
        triangle: 'top', // 三角形顶点朝向
    }, // 绘制三角形时传递
    borderWidth: 0, // 图片边框大小
    borderColor: '#ffffff', // 图片边框颜色
    // 图片圆角的方向
    // 值类型为数组, 添加不同的圆角方向设置哪里是圆角哪里不是圆角
    // 参数可选值 tr: 上右; tl: 上左; bl:左下; br: 左右; default: 全圆角
    borderType: ['tr', 'tl'], // 默认全圆角['default']
    windowAlign: 'none', // 图片在窗口(整个画布的宽度)对齐的方式 默认: none 可选 居中: center 右边: right
    quality: 80, // 压缩图片的质量 默认 80 值范围0~100
    rotate: {}, // 旋转 具体可看绘制矩形和绘制三角形中的属性值
})
```





## 绘制二维码

```javascript
// 绘制二维码
draw.drawQrCode({
   	x: 0, // x轴方向 默认 0
    y: 0, // y轴方向 默认 0
    size: 100, // 二维码的大小 默认100
    text: '', // 二维码内容 默认''
    background: '#000000', // 二维码背景色 默认#00000
    foreground: '#ffffff', // 二维码前景色 默认#fffff
    pdground: '#ffffff', // 二维码角标色 默认 #fffff
    lv: 3, // 容错级别(一般不需要调它) 默认值是3
    windowAlign: 'none', // 二维码在窗口(整个画布的宽度)对齐的方式 默认: none 可选 居中: center 右边: right
    // 二维码中间的图片 可选
    image: {
        src: '/static/logo.png', //网络路径(小程序中需要配置白名单)，本地路径, base64(使用base64格式绘制速度会稍微慢点，在IOS端显著。)
        size: 30,  // 图片大小 默认 30
        r: 0,  // 图片圆角 默认 0
        borderWidth: 0, // 图片边框大小 默认0
        borderColor: '#ffffff' // 图片边框颜色 默认无颜色
    }
})
```



## 自定义绘制-custom

### 具体详看Context文档  [点我跳转](https://uniapp.dcloud.io/api/canvas/CanvasContext)

```javascript
// 自定义绘制
draw.Context.fillText('你好', 0, 200)
```



## 将通过以上方法绘制的内容绘制到画板上

```javascript
// complete 是否导出图片，默认 true会绘制图片并返回图片路径 false时需要自行调用uni.canvasToTempFilePath()方法导出图片
await draw.canvasDraw(complete)
```





# Json方式绘制内容(推荐使用Json方式绘制)



```javascript
// bgObj: 背景大小含有背景宽高
// ctxObj: 画布大小含有画布宽高
// res接收参数格式
// res.success: 是否成功 true: 成功 false: 失败
// res.message: 成功或者失败时的信息
// res.data: 成功时绘制的图片路径
let res = await draw.createdSharePoster(({ bgObj, ctxObj }) => {
    let data = [
        // 绘制文字
        {
            name: '', // 用于在callBack中寻找
            type: 'text',
            // callBack: 用于知道上一次绘制的内容具体的数据
            // before: 上一次绘制的内容的数据，当你绘制的内容处于第一个则是一个空对象
            // all: 所有绘制内容的数据
            callBack: (before, all) => {
                let { sx, sy, ex, ey, w, h } = before
                // sx: 上一次绘制内容开始的x轴位置
                // sy: 上一次绘制内容开始的y轴位置
                // ex: 上一次绘制内容结束的x轴位置
                // ey: 上一次绘制内容结束的y轴位置
                // w: 上一次绘制内容的宽度
                // h: 上一次绘制内容的高度
                // callBack 返回的对象会覆盖原属性
                return {
                    x: sx,
                    y: sy
                }
            }
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawText 方法的参数
        },
        // 绘制矩形
        {
            type: 'rect',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawRect 方法的参数
        },
        // 绘制圆
        {
            type: 'arc',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawArc 方法的参数
        },
        // 绘制三角形
        {
            type: 'triangle',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawTriangle 方法的参数
        },
        // 绘制线条
        {
            type: 'line',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawLine 方法的参数
        },
        // 绘制图片
        {
            type: 'image',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawImage 方法的参数
        },
        // 绘制二维码
        {
            type: 'qrcode',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawQrCode 方法的参数
        },
        // 自定义绘制
        {
            type: 'custom',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // Context: 调用原生方法绘制
            // _this: 调用draw类的内置方法绘制
            setDarw(Context, _this) {
                // 原生方法绘制
                Context.fillText('你好', 0, 200)
                // 使用draw类内置方法绘制
                _this.drawText({
                    x: 0,
                    y: 0,
                    text: '你好, 世界'
                })
            }
        }
    ]
    return data
})
```





# 绘制时，需要提前绘制一部分内容，然后后面等数据有了在绘制一部分内容的需求



```javascript
// 初始化
let draw = new Draw({
    width: 375, // canvas(海报)的宽度,
    height: 500, // canvas(海报)的高度,
    canvasId: 'myCanvas', // canvasId 必填
    _this: this, // 传入this实例 必填
    drawDelayTime: 200, // 绘制海报时的延迟时间(单位毫秒),默认200,
    delayTime: 200, // 导出图片时的延迟时间(单位毫秒),默认200,
    fileType: 'png', // 导出图片的类型, 默认png 可选jpg, png
    quality: 1, // 导出图片的质量, 默认1 值范围0~1, 大于一都为1处理
    drawTipsText: '绘制中...', // 绘制时的加载提示, 默认绘制中...
})
// 预绘制需要自行调用绘制背景
await draw.preDrawBackground()
// draw.preDraw(drawArray), complete)
// 参数
// drawArray: 参数如下
// complete: 是否绘制完成，绘制完成会自行导出图片 默认false
// 返回值
// res接收参数格式
// res.success: 是否成功 true: 成功 false: 失败
// res.message: 成功或者失败时的信息
// res.data: 成功时绘制的图片路径
let res = await draw.preDraw(({ bgObj, ctxObj }) => {
    let data = [
        // 绘制文字
        {
            type: 'text',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawText 方法的参数
        },
        // 绘制矩形
        {
            type: 'rect',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawRect 方法的参数
        },
        // 绘制圆
        {
            type: 'arc',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawArc 方法的参数
        },
        // 绘制三角形
        {
            type: 'triangle',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawTriangle 方法的参数
        },
        // 绘制线条
        {
            type: 'line',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawLine 方法的参数
        },
        // 绘制图片
        {
            type: 'image',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawImage 方法的参数
        },
		// 绘制二维码
        {
            type: 'qrcode',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // 参数详看draw.drawQrCode 方法的参数
        },
        // 自定义绘制
        {
            type: 'custom',
            zIndex: 0, // 绘制顺序 越小越先绘制
            // Context: 调用原生方法绘制
            // _this: 调用draw类的内置方法绘制
            setDarw(Context, _this) {
                // 原生方法绘制
                Context.fillText('你好', 0, 200)
                // 使用draw类内置方法绘制
                _this.drawText({
                    x: 0,
                    y: 0,
                    text: '你好, 世界'
                })
            }
        }
    ]
    return data
})
```

