import request from './request';
// 查询站长列表接口
function onFetchGroupHeadList(data) {
	return request({
		url: 'api/user/grouphead/selectGroupHeadList',
		data,
		method: 'GET'
	})
}

// 查询站长橱窗信息详情接口
function onFetchShowcaseInfo(data) {
	return request({
		url: 'api/goods/showcase/selectShowcaseInfo',
		data,
		method: 'GET'
	})
}

export default {
	onFetchGroupHeadList,
	onFetchShowcaseInfo
}