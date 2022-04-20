import request from './request';
// 生成小程序二维码
function createWxQRCode(data) {
	return request({
		url: 'api/user/wx/createWxQRCode',
		data,
		method: 'POST'
	})
}
export default {
	createWxQRCode
}