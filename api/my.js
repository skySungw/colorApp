import request from './request';
function login(data) {
	return request({
		url: 'api/user/login/loginOrRegister',
		data
	})
}
function getPhoneNumber(data) {
	return request({
		url: 'api/user/login/loginOrRegisterByWechat',
		data
	})
}
// code 授权
function checkAuth(data) {
	return request({
		url: 'api/user/login/checkAuth',
		data
	})
}
// 查询我的个人中心信息接口
function selectMemberInfoByToken(data) {
	return request({
		url: 'api/user/myUser/selectMemberInfoByToken',
		method: 'GET',
		data
	})
}
// 关注/取消关注
function onHandleFollow(data) {
	return request({
		url: 'api/user/myUser/followMember',
		data
	})
}
// 查询我发布的商品接口
function onFetchGoodsByCreator(data) {
	return request({
		url: 'api/goods/myGoods/selectGoodsByCreator',
		data,
		method: 'GET'
	})
}
// 查询我发布的贴子接口
function onFetchArticleByCreator(data) {
	return request({
		url: 'api/content/myContent/selectArticleByCreator',
		data,
		method: 'GET'
	})
}
// 我的关注列表/我的粉丝列表----查询我的关注列表/我的粉丝列表接口
function onFetchFollowFans(data) {
	return request({
		url: 'api/user/myUser/selectFollowOrFansByToken',
		data,
		method: 'GET'
	})
}
// 意见反馈接口
function onUploadSuggest(data) {
	return request({
		url: 'api/user/idea/createIdea',
		data,
	})
}
// 浏览记录-----查询商品浏览记录接口
function onFetchGoodsRecords(data) {
	return request({
		url: 'api/goods/myGoods/selectGoodsByBrowseRecord',
		data,
		method: 'GET'
	})
}

// 浏览记录-----查询贴子浏览记录接口
function onFetchArticleRecords(data) {
	return request({
		url: 'api/content/myContent/selectArticleByBrowseRecord',
		data,
		method: 'GET'
	})
}
// 查询用户的联系方式类型接口
function onFetchContactType(data) {
	return request({
		url: 'api/user/myUser/selectMemberSellerContactType',
		data,
		method: 'GET'
	})
}
// 收藏的贴子
function onFetchArticleCollection(data) {
	return request({
		url: 'api/content/myContent/selectArticleByLikes',
		data,
		method: 'GET'
	})
}
// 收藏的商品
function onFetchGoodsCollection(data) {
	return request({
		url: 'api/goods/myGoods/selectGoodsByLikes',
		data,
		method: 'GET'
	})
}
// 收货地址----新增收货地址接口
function onCreateReceiveAddress(data) {
	return request({
		url: 'api/user/address/createReceiveAddress',
		data
	})
}
// 查询订单详情接口(完成)
function onFetchOrderDetail(data) {
	return request({
		url: 'api/order/myOrder/selectOrderDetailByOrderCode',
		data,
		method: 'GET'
	})
}
// 确认发货/确认收货----修改订单状态接口（完成）
function onUpdateOrderState(data) {
	return request({
		url: 'api/order/order/updateOrderState',
		data
	})
}
// 个人信息修改接口
function updateUserInfo(data) {
	return request({
		url: 'api/user/myUser/updateUserInfo',
		data
	})
}
// 查询我发布的商品接口
function onFetchGoodsBySelf(data) {
	return request({
		url: 'api/goods/myGoods/selectGoodsByCreator',
		data,
		method: 'GET'
	})
}
export default {
	login,
	getPhoneNumber,
	checkAuth,
	selectMemberInfoByToken,
	onHandleFollow,
	onFetchGoodsByCreator,
	onFetchArticleByCreator,
	onFetchFollowFans,
	onUploadSuggest,
	onFetchGoodsRecords,
	onFetchArticleRecords,
	onFetchContactType,
	onFetchArticleCollection,
	onFetchGoodsCollection,
	onCreateReceiveAddress,
	onFetchOrderDetail,
	onUpdateOrderState,
	updateUserInfo,
	onFetchGoodsBySelf
}