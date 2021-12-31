// 我的页面
const myPageMenu = [{
	icon: 'cuIcon-cart',
	label: '我买到的',
	link: '/pages/sub/order/my'
}, {
	icon: 'cuIcon-form',
	label: '我卖出的',
	link: '/pages/sub/order/sel'
}, {
	icon: 'cuIcon-goods',
	label: '商品收藏',
	link: '/pages/sub/my/goodsCollection'
}, {
	icon: 'cuIcon-favor',
	label: '帖子收藏',
	link: '/pages/sub/my/cardCollection'
}, {
	icon: 'cuIcon-file',
	label: '草稿箱',
	link: '/pages/sub/my/draft'
}, {
	icon: 'cuIcon-calendar',
	label: '活动报名',
	link: '/pages/sub/my/signUp'
}, 
// {
// 	icon: 'cuIcon-people',
// 	label: '个人主页',
// 	link: '/pages/sub/my/home'
// }, 
{
	icon: 'cuIcon-service',
	label: '意见反馈',
	link: '/pages/sub/my/suggestion'
}, {
	icon: 'cuIcon-newshot',
	label: '浏览记录',
	link: '/pages/sub/my/record'
}, {
	icon: 'cuIcon-settings',
	label: '设置',
	link: '/pages/sub/my/settings'
}];
// 我的页面-工具
const myTools = [
// {
// 	icon: 'cuIcon-group',
// 	label: '成为站长',
// 	link: '/pages/subpackages/site/apply'
// }, 
{
	icon: 'cuIcon-shop',
	label: '我的橱窗',
	link: '/pages/subpackages/site/myShop'
}
// , {
// 	icon: 'cuIcon-recharge',
// 	label: '我的收益',
// 	link: '/pages/sub/my/goodsCollection'
// },
];
module.exports = {
	myPageMenu,
	myTools
}