
import { baseUrl } from '@/api/config';
async function request ({
	url,
	data = {},
	header = {},
	method = 'POST',
	dataType
}) {
	let newUrl = url;
	// let newUrl = url.replace('api/', '');
	let token = uni.getStorageSync('token');
	if (token) {
		header['Authorization'] = 'Bearer ' + token;
	}
	header['Content-Type'] = 'application/json; charset=utf-8'; //自定义请求头信息
	const res = await uni.request({
			url: baseUrl + newUrl,
			data,
			header,
			method,
			dataType
	});
	return res[1].data;
}
export default request;