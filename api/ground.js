import request from './request';
// 查询同城列表接口
function onFetchCollectionPage(data) {
	return request({
		url: 'api/content/collection/selectCollectionPage',
		data,
		method: 'GET'
	})
}

// 查询话题列表
function onFetchTopic(data) {
	return request({
		url: 'api/content/topic/selectTopicTop',
		data,
		method: 'GET'
	})
}

// 根据id查询话题
function onFetchTopicById(data) {
	return request({
		url: 'api/content/topic/selectTopic',
		data,
		method: 'GET'
	})
}

// 话题发布接口
function onPublishTopic(data) {
	return request({
		url: 'api/content/topic/createTopic',
		data
	})
}
// 贴子发布接口
function onPublish(data) {
	return request({
		url: 'api/content/article/createArticle',
		data
	})
}
// 查询广场/官方的贴子接口
function onFetchArticle(data) {
	return request({
		url: 'api/content/article/selectArticlePage',
		data,
		method: 'GET'
	})
}
// 查询活动接口
function onFetchActivity(data) {
	return request({
		url: 'api/content/activity/selectActivityPage',
		data,
		method: 'GET'
	})
}
// 帖子详情
function onFetchArticleDetail(data) {
	return request({
		url: 'api/content/article/selectArticleDetail',
		data,
		method: 'GET'
	})
}
// 贴子点赞、收藏/取消点赞、取消收藏接口
function onHandleLikes(data) {
	return request({
		url: 'api/content/article/likesArticle',
		data,
	})
}
// 评论贴子,留言
function onCreateComment(data) {
	return request({
		url: 'api/content/comment/createComment',
		data,
	})
}
// 查询贴子评论接口
function onFetchArticleComment(data) {
	return request({
		url: 'api/content/comment/selectArticleComment',
		data,
		method: 'GET'
	})
}
// 活动发布接口
function onCreateActivity(data) {
	return request({
		url: 'api/content/activity/createActivity',
		data,
	})
}
// 查询我发布的贴子接口
function onFetchArticleBySelf(data) {
	return request({
		url: 'api/content/myContent/selectArticleByCreator',
		data,
		method: 'GET'
	})
}
// 查询活动详情接口
function onFetchActivityDetail(data) {
	return request({
		url: 'api/content/activity/selectActivityDetail',
		data,
		method: 'GET'
	})
}
// 草稿箱-----查询草稿箱中的贴子接口
function onFetchArticleDraft(data) {
	return request({
		url: 'api/content/myContent/selectArticleByDraft',
		data,
		method: 'GET'
	})
}
// 删除贴子接口
function onDeleteArticle(data) {
	return request({
		url: 'api/content/article/deleteArticle',
		data,
	})
}
// 活动报名接口
function onSignUpActivity(data) {
	return request({
		url: 'api/content/activity/signUpActivity',
		data,
	})
}
export default {
	onFetchCollectionPage,
	onFetchTopicById,
	onFetchTopic,
	onPublishTopic,
	onPublish,
	onFetchArticle,
	onFetchArticleDetail,
	onHandleLikes,
	onCreateComment,
	onFetchArticleComment,
	onCreateActivity,
	onFetchActivity,
	onFetchArticleBySelf,
	onDeleteArticle,
	onFetchArticleDraft,
	onFetchActivityDetail,
	onSignUpActivity
}