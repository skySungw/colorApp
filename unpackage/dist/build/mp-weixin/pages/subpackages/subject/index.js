(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/subpackages/subject/index"],{"01a4":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a")),i=n("c991");function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,a,i,r,o){try{var c=t[r](o),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(a,i)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var r=t.apply(e,n);function c(t){o(r,a,i,c,s,"next",t)}function s(t){o(r,a,i,c,s,"throw",t)}c(void 0)}))}}var s=0,u=0,l={data:function(){return{initPage:!0,imgWidth:0,cols:[[],[]],loadingCount:0,images:[],params:{size:10,current:1,total:0,articleType:0,articleTopic:0,lat:"",lng:""},topicDetail:{name:""}}},onLoad:function(e){var n=this;this.params.articleTopic=e.id,this.getTopicById(e.id),t.getSystemInfo({success:function(t){var e=t.windowWidth,a=(t.windowHeight,.48*e);n.imgWidth=a,n.getArticleList()}})},onShow:function(){},methods:{getTopicById:function(t){var e=this;return c(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,i.onFetchTopicById)({topicId:t});case 3:r=n.sent,200===r.code&&(e.topicDetail=r.data),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),console.log("err",n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},getArticleList:function(){var t=this;return c(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,i.onFetchArticle)(t.params);case 3:n=e.sent,console.log("res",n),200===n.code&&(t.initPage=!1,t.params.total=n.data.total,t.loadImages(n.data.records),1===t.params.current?t.list=n.data.records:t.list=t.list.concat(n.data.records)),e.next=12;break;case 8:e.prev=8,e.t0=e["catch"](0),t.initPage=!1,console.log("err",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()},lower:function(t){console.log("bottom"),this.hasNext()?(this.noMoreFlag=!1,this.params.current++,this.getArticleList()):this.noMoreFlag=!0},onImageLoad:function(t){for(var e=t.currentTarget.id,n=t.detail.width,a=t.detail.height,i=this.imgWidth,r=i/n,o=a*r,c=this.images,l=null,d=0;d<c.length;d++){var f=c[d];if(f.id===e){l=f;break}}l.height=o;var h=this.loadingCount-1,g=this.cols[0],p=this.cols[1];s<=u?(s+=o,g.push(l)):(u+=o,p.push(l)),this.loadingCount=h,this.cols[0]=g,this.cols[1]=p,h||(this.images=[])},loadImages:function(t){t.forEach((function(e,n){t[n].pic=e.articleContentImg[0],t[n].height=0}));for(var e=t,n="img-"+ +new Date,a=0;a<e.length;a++)e[a].id=n+"-"+a;this.loadingCount=e.length,this.images=e,console.log("this.images",this.images)},goPage:function(e){var n=e.currentTarget.dataset["item"];t.navigateTo({url:"/pages/sub/article/article?id="+n.articleCode})}}};e.default=l}).call(this,n("543d")["default"])},"2b4a":function(t,e,n){"use strict";n.r(e);var a=n("5a65"),i=n("7abb");for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("fae2");var o,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=s.exports},"5a65":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},r=[]},"6d9b":function(t,e,n){},"7abb":function(t,e,n){"use strict";n.r(e);var a=n("01a4"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},f191:function(t,e,n){"use strict";(function(t){n("cb01");a(n("66fd"));var e=a(n("2b4a"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},fae2:function(t,e,n){"use strict";var a=n("6d9b"),i=n.n(a);i.a}},[["f191","common/runtime","common/vendor"]]]);