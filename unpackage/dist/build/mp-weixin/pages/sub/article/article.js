(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/article/article"],{1933:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=c(n("a34a")),r=n("c991");function c(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,a,r,c,o){try{var i=e[c](o),s=i.value}catch(l){return void n(l)}i.done?t(s):Promise.resolve(s).then(a,r)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var c=e.apply(t,n);function i(e){o(c,a,r,i,s,"next",e)}function s(e){o(c,a,r,i,s,"throw",e)}i(void 0)}))}}var s={data:function(){return{imgList:[],articleDetail:{userId:"",wxHeadImg:"",memberName:"",createtime:"",articleTitle:"",articleContent:"",articleTopic:[]},articleCode:0,isFocus:!0,commitFlag:!1,modalFlag:!1,strings:"",commitValue:"",commentParams:{size:10,current:1,articleId:""},records:[],commentType:0,fromMemberId:"",commentId:""}},onLoad:function(t){var n=e.getStorageSync("token");if(!n)return e.redirectTo({url:"/pages/sub/login/index"}),!1;this.articleCode=t.id,this.commentParams.articleId=this.articleCode},onShow:function(){console.log("ccc"),this.init()},onReachBottom:function(){this.hasNext()&&(this.commentParams.current++,this.onGetAllComments())},methods:{init:function(){this.commentParams.current=1,this.getArticleDetail({articleCode:this.articleCode,selType:0})},onViewImage:function(t){var n=t.currentTarget.dataset["index"];e.previewImage({urls:this.imgList,current:n})},goTopic:function(t){var n=t.currentTarget.dataset["item"].id;e.navigateTo({url:"/pages/subpackages/subject/index?id=".concat(n)})},goHomePage:function(){e.navigateTo({url:"/pages/sub/my/home?id="+this.articleDetail.userId})},goHomePageById:function(t){e.navigateTo({url:"/pages/sub/my/home?id="+t})},onHandleLeaveComment:function(e,t,n){this.commitFlag=!0,this.commentType=1,this.commentId=e.commentId,console.log("type",e,t,n),this.fromMemberId=2==n?t.fromUserId:e.userId},onConfirmOperate:function(t){var n=this;return i(a.default.mark((function c(){var o;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,(0,r.onHandleFollow)({userId:n.articleDetail.userId||"",followState:t});case 3:o=a.sent,200===o.code&&(e.showToast({title:"操作成功",icon:"none",duration:2e3}),n.articleDetail.followState=1===t?2:1),a.next=10;break;case 7:a.prev=7,a.t0=a["catch"](0),console.log("err",a.t0);case 10:case"end":return a.stop()}}),c,null,[[0,7]])})))()},onHandleFollow:function(){var t=this;return i(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=0,1===t.articleDetail.followState&&(r=1),r?t.onConfirmOperate(r):e.showModal({title:"取消关注",confirmText:"确认取消",cancelText:"取消",success:function(e){console.log("res",e),e.confirm&&t.onConfirmOperate(r)}});case 3:case"end":return n.stop()}}),n)})))()},getArticleDetail:function(e){var t=this;return i(a.default.mark((function n(){var c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,r.onFetchArticleDetail)(e);case 3:c=n.sent,200===c.code&&(t.articleDetail=Object.assign({},t.articleDetail,c.data),t.imgList=c.data.articleContentImg,t.onGetAllComments()),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),console.log("getArticleDetail",n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},onGetAllComments:function(){var e=this;return i(a.default.mark((function t(){var n;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,r.onFetchArticleComment)(e.commentParams);case 3:n=t.sent,200===n.code&&(e.commentParams.total=n.data.total,1==e.commentParams.current?e.records=n.data.records:e.records=e.records.concat(n.data.records)),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log("err",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},hasNext:function(){return this.commentParams.current<Math.ceil(this.commentParams.total/this.commentParams.size)},onHandleLeaveMsg:function(){var e=this;this.commitFlag=!0,this.commentType=0,this.$nextTick((function(){console.log(e.$refs)}))},onLike:function(e){var t=this;return i(a.default.mark((function n(){var c,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,c=e?t.articleDetail.articleDetail.isCollection=!t.articleDetail.articleDetail.isCollection:t.articleDetail.articleDetail.isLikes=!t.articleDetail.articleDetail.isLikes,n.next=4,(0,r.onHandleLikes)({articleCode:t.articleCode,likesType:e,likesState:c?0:1});case 4:o=n.sent,200===o.code&&t.init(),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),console.log("err",n.t0);case 11:case"end":return n.stop()}}),n,null,[[0,8]])})))()},onSendMsg:function(t){var n=this;return i(a.default.mark((function t(){var c,o;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return c={articleCode:n.articleCode,commentContent:n.commitValue,commentType:n.commentType},n.commentType&&(c=Object.assign({},c,{fromMemberId:n.fromMemberId,commentId:n.commentId})),t.prev=2,t.next=5,(0,r.onCreateComment)(c);case 5:o=t.sent,200===o.code&&e.showToast({title:"评论成功",icon:"none",success:function(){n.commitFlag=!1,n.commitValue="",n.init()}}),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](2),console.log("err",t.t0);case 12:case"end":return t.stop()}}),t,null,[[2,9]])})))()}}};t.default=s}).call(this,n("543d")["default"])},"3da3":function(e,t,n){"use strict";var a=n("cf66"),r=n.n(a);r.a},"419c":function(e,t,n){"use strict";n.r(t);var a=n("1933"),r=n.n(a);for(var c in a)"default"!==c&&function(e){n.d(t,e,(function(){return a[e]}))}(c);t["default"]=r.a},"59f6":function(e,t,n){"use strict";n.r(t);var a=n("9ea4"),r=n("419c");for(var c in r)"default"!==c&&function(e){n.d(t,e,(function(){return r[e]}))}(c);n("3da3");var o,i=n("f0c5"),s=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"5dc540b2",null,!1,a["a"],o);t["default"]=s.exports},"723e":function(e,t,n){"use strict";(function(e){n("cb01");a(n("66fd"));var t=a(n("59f6"));function a(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"9ea4":function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return a}));var r=function(){var e=this,t=e.$createElement,n=(e._self._c,1!=e.commentParams.current&&!e.hasNext());e._isMounted||(e.e0=function(t){e.modalFlag=!1}),e.$mp.data=Object.assign({},{$root:{m0:n}})},c=[]},cf66:function(e,t,n){}},[["723e","common/runtime","common/vendor"]]]);