import request from './request';

// 查询商品分类接口
function onFetchGoodsCategory(data) {
	return request({
		url: 'api/goods/category/selectGoodsCategoryList',
		data,
		method: 'GET'
	})
}
// 查询商品评论接口
function onSelectGoodsComment(data) {
	return request({
		url: 'api/goods/comment/selectGoodsComment',
		data,
		method: 'GET'
	})
}
// 评论商品接口
function onCreateGoodsComment(data) {
	return request({
		url: 'api/goods/comment/createComment',
		data,
		method: 'GET'
	})
}
// 查询商品橱窗用户身份接口
function onFetchOwnerStateShowcase(data) {
	return request({
		url: 'api/goods/showcase/selectOwnerStateShowcase',
		data,
		method: 'GET'
	})
}
// 批量添加商品至橱窗的接口
function onAddGoodsToShowCase(data) {
	return request({
		url: 'api/goods/showcase/addGoodsToShowCase',
		data,
	})
}
// 删除橱窗中的商品接口
function onRemoveGoodsToShowCase(data) {
	return request({
		url: 'api/goods/showcase/removeGoodsToShowCase',
		data,
	})
}

// 查询商品橱窗接口
function onFetchShowcasePage(data) {
	return request({
		url: 'api/goods/showcase/selectShowcasePage',
		data,
		method: 'GET'
	})
}
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
// 修改宝贝接口
function onUpdateGoods(data) {
	return request({
		url: 'api/goods/goods/updateGoods',
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
// 收货地址----查询单个收货地址接口（完成）
function onUpdateAddress(data) {
	return request({
		url: 'api/user/address/updateReceiveAddress',
		data,
		method: 'POST'
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
// 查询本人名下 上架中，已下架，已售出的商品数量
function onSelectGoodsCountByMemberId(data) {
	return request({
		url: 'api/goods/myGoods/selectGoodsCountByMemberId',
		data,
		method: 'GET'
	})
}
// 查询本人名下我买到的，我卖出的订单数量
function onSelectOrderCountByMemberId(data) {
	return request({
		url: 'api/order/myOrder/selectOrderCountByMemberId',
		data,
		method: 'GET'
	})
}


export default {
	onFetchGoodsCategory,
	onCreateGoodsComment,
	onSelectGoodsComment,
	onFetchOwnerStateShowcase,
	onAddGoodsToShowCase,
	onRemoveGoodsToShowCase,
	onFetchShowcasePage,
	onFetchGoodsList,
	onCreateGoods,
	onUpdateGoods,
	onFetchGoodsDetail,
	onCollectionGoods,
	onFetchAddressList,
	onUpdateAddress,
	onFetchAddressById,
	onFetchPlaceOrderInfo,
	onCreateOrder,
	onFetchWechatPayConfig,
	onFetchOrderList,
	onUpdateGoodsState,
	onSelectGoodsCountByMemberId,
	onSelectOrderCountByMemberId
}