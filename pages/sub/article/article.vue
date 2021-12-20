<template>
	<view class="article-detail bg-white">
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
			<view slot="backText">返回</view>
			<view slot="content">详情页</view>
		</cu-custom>
		<!-- 内容区 -->
		<view class="article-detail_content padding">
			<view class="flex flex-align-center padding-sm solid-bottom">
				<view class="photo" @tap="goHomePage">
					<image class="round" :src="articleDetail.wxHeadImg" mode="aspectFill" />
				</view>
				<view class="flex-1 margin-left" @tap="goHomePage">
					<view class="text-bold text-black">{{ articleDetail.memberName }}</view>
					<view class="text-gray">{{ articleDetail.userDesc || '这家伙很懒，还没有签名' }}</view>
				</view>
				<view>
					<!-- followState 0 本人， 1 - 展示关注 ， 2 - 取消关注 -->
					<view v-if="articleDetail.followState" class="cu-tag line-green" @tap="onHandleFollow">{{ articleDetail.followState === 1 ? '+ 关注' : '取消关注'}}</view>
				</view>
			</view>
			<view class="padding-sm solid-bottom">
				<view class="text-bold text-black text-lg">{{ articleDetail.articleTitle }}</view>
				<view class="text-gray text-sm margin-bottom-sm">{{ articleDetail.createtime }}</view>
				<view v-if="imgList.length" class="padding-top-sm padding-bottom-sm">
					<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
					  <swiper-item v-for="(item, index) in imgList" :key="index" @click="onViewImage" :data-index="index">
					    <image :src="item" mode="aspectFill"></image>
					  </swiper-item>
					</swiper>
				</view>
				<rich-text :nodes="articleDetail.articleContent"></rich-text>
			</view>
			<!-- 此处是评论区 -->
			<view class="padding-sm">
				<view class="text-sm text-grey">共 {{ articleDetail.articleDetail.commentCount }} 条评论</view>
				<view class="text-black">
					说点什么吧，万一被看到呢
				</view>
				<!-- 评论人，列表 -->
				<view class="comment-content">
					<view class="flex padding-tb-sm solid-bottom" v-for="(item, index) in records" :key="index">
						<view class="comment-photo">
							<image class="round" :src="item.wxHeadImg" mode="aspectFill" />
						</view>
						<view class="flex-1 margin-left text-sm">
							<view class="text-bold text-gray flex flex-bettwen-space">
								<text>{{ item.userName }}</text>
								<view class="text-lg">
									<!-- <text class="cuIcon-like" @tap="onLike"></text> -->
								</view>
							</view>
							<view class="text-black" @tap="onHandleLeaveComment(item)">{{ item.commentContent }}<text class="margin-left-sm text-sm text-grey">{{ item.createtime }}</text></view>
							<!-- 评论的评论 -->
							<view class="flex padding-top-sm" v-for="(childItem, childIndex) in item.commentChild" :key="childIndex">
								<view class="comment-photo">
									<image class="round" :src="childItem.fromUserWxHeadImg" mode="aspectFill" />
								</view>
								<view class="flex-1 margin-left text-sm">
									<view class="text-bold text-gray flex flex-bettwen-space">
										<text>{{ childItem.fromUserName }} 回复了：{{ childItem.toUserName }}</text>
										<view class="text-lg">
											<!-- <text class="cuIcon-like" @tap="onLike"></text> -->
										</view>
									</view>
									<view class="text-black" @tap="onHandleLeaveComment(item, childItem, 2)">{{ childItem.commentContent }}<text class="margin-left-sm text-sm text-grey">{{ childItem.createtime }}</text></view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="commentParams.current != 1 && !hasNext()" class="text-center padding-sm text-grey text-sm">我已经到底了~</view>
				</view>
			</view>
		</view>
		
		<!-- 发表评论, 仅展示 -->
		<view v-if="!commitFlag" class="footer fixed bottom-fixed padding-sm bg-white solid-top flex flex-align-center">
			<view @tap="onHandleLeaveMsg" class="flex-1 padding-right bg-gray commit-input padding-sm flex flex-align-center">
				<text class="cuIcon-write margin-right-xs"></text>
				<text class="text-gray">说点什么吧...</text>
			</view>
			<view class="text-lg padding-lr">
				<text class="margin-right-sm" :class="[{'cuIcon-like': !articleDetail.articleDetail.isLikes}, {'cuIcon-likefill text-red': articleDetail.articleDetail.isLikes}]" @tap="onLike(0)"></text>{{ articleDetail.articleDetail.likesCount }}
			</view>
			<view class="text-lg padding-lr">
				<text class="margin-right-sm" :class="[{'cuIcon-favor': !articleDetail.articleDetail.isCollection}, {'cuIcon-favorfill text-red': articleDetail.articleDetail.isCollection}]" @tap="onLike(1)"></text>{{ articleDetail.articleDetail.collectionCount }}
			</view>
		</view>
		<!-- 发表评论，输入内容 -->
		<view v-else class="footer fixed bottom-fixed padding-sm bg-white solid-top flex flex-align-center">
			<view class="flex-1 padding-right bg-gray commit-input padding-sm flex flex-align-center">
				<text class="cuIcon-write margin-right-xs"></text>
				<input :focus="isFocus" placeholder="说点什么吧..." v-model="commitValue" />
			</view>
			<view class="text-lg padding-lr">
				<button type="primary" size="mini" @tap="onSendMsg">发送</button>
			</view>
		</view>
		
		<!-- 弹出评论部分 -->
		<view class="cu-modal bottom-modal" :class="[{show : modalFlag }]" @tap="modalFlag = false">
		  <view class="cu-dialog">
		    <view class="padding-xl">
		      这里是评论列表
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	import { onFetchArticleDetail, onHandleFollow, onHandleLikes, onCreateComment, onFetchArticleComment } from '@/api';
	export default {
		data() {
			return {
				imgList: [], // 文章图片列表
				articleDetail: {
					userId: '', // 用户id
					wxHeadImg: '', // 头像
					memberName: '', // 姓名
					createtime: '', // 文章创建时间
					articleTitle: '', // 文章标题
					articleContent: '', // 文章内容
					
				},
				articleCode: 0, // 文章id
				isFocus: true,
				commitFlag: false, // 是否展示评论输入框
				modalFlag: false,
				strings: '',
				commitValue: '', // 文章评论内容
				commentParams: {
					size: 10,
					current: 1,
					articleId: ''
				},
				records: [] ,// 评论列表
				commentType: 0, // 0 - 文章， 1 - 留言
				fromMemberId: '',
				commentId: ''
			}
		},
		onLoad(options) {
			const token = uni.getStorageSync('token')
			if (!token) {
				uni.redirectTo({
					url: '/pages/sub/login/index'
				})
				return false;
			}
			this.articleCode = options.id;
			this.commentParams.articleId = this.articleCode;
		},
		onShow() {
			console.log('ccc')
			this.init();
		},
		onReachBottom() {
			if (this.hasNext()) {
				this.commentParams.current++;
				this.onGetAllComments();
			}
		},
		methods: {
			init() {
				this.commentParams.current = 1;
				this.getArticleDetail({
					articleCode: this.articleCode,
					selType: 0
				})
			},
			// 预览
			onViewImage(e) {
				const index = e.currentTarget.dataset['index'];
				uni.previewImage({
					urls: this.imgList,
					current: index
				});
			},
			goHomePage() {
				console.log('this.', this.articleDetail.userId)
				uni.navigateTo({
					url: '/pages/sub/my/home?id=' + this.articleDetail.userId
				})
			},
			// 评论留言
			onHandleLeaveComment(parentItem, item, type) {
				
				this.commitFlag = true;
				this.commentType = 1;
				this.commentId = parentItem.commentId;
				console.log('type', parentItem, item, type);
				// 二级、多级回复
				if (type == 2) {
					this.fromMemberId = item.fromUserId;
				} else {
					this.fromMemberId = parentItem.userId;
				}
			},
			// 关注、取消关注
			async onHandleFollow() {
				let followState = 0; // 0 - 取关， 1 - 关注
				if (this.articleDetail.followState === 1) {
					followState = 1;
				}
				try {
					const res = await onHandleFollow({
						userId: this.articleDetail.userId || '',
						followState
					});
					if (res.code === 200) {
						uni.showToast({
							title: '操作成功',
							icon: 'none',
							duration: 2000
						})
						this.articleDetail.followState = followState === 1 ? 2 : 1;
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 文章详情
			async getArticleDetail(params) {
				try {
					const res = await onFetchArticleDetail(params);
					if (res.code === 200) {
						this.articleDetail = Object.assign({}, this.articleDetail, res.data);
						this.imgList = res.data.articleContentImg;
						this.onGetAllComments();
					}
				} catch(err) {
					console.log('getArticleDetail', err);
				}
			},
			// 获取评论
			async onGetAllComments() {
				try {
					const res = await onFetchArticleComment(this.commentParams);
					if (res.code === 200) {
						this.commentParams.total = res.data.total;
						if (this.commentParams.current == 1) {
							this.records = res.data.records;
						} else {
							this.records = this.records.concat(res.data.records);
						}
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 是否有下一页
			hasNext() {
				return this.commentParams.current < Math.ceil(this.commentParams.total / this.commentParams.size);
			},
			onHandleLeaveMsg() {
				this.commitFlag = true;
				this.commentType = 0;
				this.$nextTick(() => {
					console.log(this.$refs);
					// this.$refs.commitInput.focus();
				})
			},
			async onLike(type) {
				// type - 0 点赞，1 收藏
				try {
					let likesState;
					if (type) {
						likesState = this.articleDetail.articleDetail.isCollection = !this.articleDetail.articleDetail.isCollection;
					} else {
						likesState = this.articleDetail.articleDetail.isLikes = !this.articleDetail.articleDetail.isLikes;
					}
					const res = await onHandleLikes({
						articleCode: this.articleCode,
						likesType: type,
						likesState: likesState ? 0 : 1
					});
					if (res.code === 200) {
						this.init();
					}
				} catch(err) {
					console.log('err', err);
				}
			},
			// 发送留言
			async onSendMsg(type) {
				let params = {
					articleCode: this.articleCode,
					commentContent: this.commitValue,
					commentType: this.commentType, // 0 -文章，1 - 评论
				}
				if (this.commentType) {
					params = Object.assign({}, params, {
						fromMemberId: this.fromMemberId,
						commentId: this.commentId
					})
				}
				try {
					const res = await onCreateComment(params);
					if (res.code === 200) {
						uni.showToast({
							title: '评论成功',
							icon: 'none',
							success: () => {
								this.commitFlag = false;
								this.commitValue = '';
								this.init();
							}
						})
					}
				} catch(err) {
					console.log('err', err);
				}
				
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.article-detail {
		padding-bottom: 100upx;
		.article-detail_content {
			.photo {
				image {
					width: 100upx;
					height: 100upx;
				}
			}
		}
		.comment-content {
			image {
				width: 50upx;
				height: 50upx;
			}
		}
		.commit-input {
			border-radius: 50upx;
		}
		.footer {
			height: 100upx;
		}
	}
</style>
