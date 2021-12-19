import request from './request';

// 根据经纬度查询对应周边3公里的写字楼或者小区接口
function selectAddressByLat(data) {
	return request({
		url: 'api/user/address/selectAddressExplore',
		data,
		method: 'GET'
	})
}
// 根据城市名称以及小区名称查询周边3公里的写字楼或者小区接口（新开发接口）
function selectAddressExploreByCityAndArea(data) {
	return request({
		url: 'api/user/address/selectAddressExploreByCityAndArea',
		data,
		method: 'GET'
	})
}
// 用户经纬度、小区名称 保存接口
function saveUserLocation(data) {
	return request({
		url: 'api/user/address/saveUserLocation',
		data,
		method: 'POST'
	})
}
// 查询经纬度、小区名称 保存接口
function selectUserLocation(data) {
	return request({
		url: 'api/user/address/selectUserLocation',
		data,
		method: 'GET'
	})
}
// 查询热门城市接口
function selectHotCity(data) {
	return request({
		url: 'api/user/address/selectHotCity',
		data,
		method: 'GET'
	})
}
export default {
	selectAddressByLat,
	selectAddressExploreByCityAndArea,
	saveUserLocation,
	selectUserLocation,
	selectHotCity
}