import request from './request';
// 查询宝贝列表接口
function onFetchGoodsList(data) {
	return request({
		url: 'api/goods/goods/selectGoodsPage',
		data,
		method: 'GET'
	})
}
// 发布宝贝接口
function onCreateGoods(data) {
	return request({
		url: 'api/goods/goods/createGoods',
		data,
	})
}
// 查询宝贝详情接口
function onFetchGoodsDetail(data) {
	return request({
		url: 'api/goods/goods/selectGoodsDetail',
		data,
		method: 'GET'
	})
}
// 商品收藏/取消收藏接口
function onCollectionGoods(data) {
	return request({
		url: 'api/goods/goods/likesGoods',
		data,
	})
}
// 提单页----查询收货地址列表接口
function onFetchAddressList(data) {
	return request({
		url: 'api/user/address/selAddressList',
		data,
		method: 'GET'
	})
}
// 提单页----查询单个收货地址接口
function onFetchAddressById(data) {
	return request({
		url: 'api/user/address/selReceiveAddressById',
		data,
		method: 'GET'
	})
}
// 提单页-----提单页信息查询接口
function onFetchPlaceOrderInfo(data) {
	return request({
		url: 'api/order/order/selectPreOrderInfo',
		data
	})
}
// 提单页----下单接口
function onCreateOrder(data) {
	return request({
		url: 'api/order/order/createOrder',
		data
	})
}
// 微信支付接口
function onFetchWechatPayConfig(data) {
	return request({
		url: 'api/order/pay/getPayConfigByWechat',
		data
	})
}
// 查询我买到的商品/我卖的商品接口
function onFetchOrderList(data) {
	return request({
		url: 'api/order/myOrder/selectOrderByMember',
		data,
		method: 'GET'
	})
}
// 商品状态修改-上下架、删除
function onUpdateGoodsState(data) {
	return request({
		url: 'api/goods/myGoods/updateGoodsState',
		data,
	})
}

export default {
	onFetchGoodsList,
	onCreateGoods,
	onFetchGoodsDetail,
	onCollectionGoods,
	onFetchAddressList,
	onFetchAddressById,
	onFetchPlaceOrderInfo,
	onCreateOrder,
	onFetchWechatPayConfig,
	onFetchOrderList,
	onUpdateGoodsState
}