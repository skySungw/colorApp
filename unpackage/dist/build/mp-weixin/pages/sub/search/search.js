(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/search/search"],{"090b":function(t,e,a){"use strict";a.r(e);var n=a("5aa5"),r=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},"4a20":function(t,e,a){"use strict";a.r(e);var n=a("9d83"),r=a("090b");for(var i in r)"default"!==i&&function(t){a.d(e,t,(function(){return r[t]}))}(i);var s,c=a("f0c5"),o=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,"4a4eb67e",null,!1,n["a"],s);e["default"]=o.exports},"5aa5":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("a34a")),r=a("c991");function i(t){return t&&t.__esModule?t:{default:t}}function s(t,e,a,n,r,i,s){try{var c=t[i](s),o=c.value}catch(u){return void a(u)}c.done?e(o):Promise.resolve(o).then(n,r)}function c(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var i=t.apply(e,a);function c(t){s(i,n,r,c,o,"next",t)}function o(t){s(i,n,r,c,o,"throw",t)}c(void 0)}))}}var o=function(){a.e("components/card").then(function(){return resolve(a("6f25"))}.bind(null,a)).catch(a.oe)},u=function(){a.e("components/activeCard").then(function(){return resolve(a("75e6"))}.bind(null,a)).catch(a.oe)},l=function(){a.e("components/empty").then(function(){return resolve(a("c021"))}.bind(null,a)).catch(a.oe)},h={components:{Card:o,ActiveCard:u,Empty:l},data:function(){return{params:{size:10,current:1,total:0,articleType:0,articleName:""},flag:!0,historyList:[],list:[],tabCur:0,scrollLeft:0,menuList:[{index:0,label:"广场"},{index:1,label:"官方"},{index:2,label:"活动"}]}},onLoad:function(e){this.historyList=t.getStorageSync("searchHistory")||[],this.tabCur=e.type||0,console.log("type",this.tabCur),this.initParams(this.tabCur)},onReachBottom:function(){this.hasNext()&&(this.params.current++,this.getArticleList())},methods:{hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},initParams:function(t){this.tabCur=t,this.params.current=1,this.params.articleType=this.tabCur,this.list=[]},getArticleList:function(){var t=this;return c(n.default.mark((function e(){var a;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,r.onFetchArticle)(t.params);case 3:a=e.sent,200===a.code&&(t.params.total=a.data.total,1===t.params.current?t.list=a.data.records:t.list=t.list.concat(a.data.records),console.log("this.list",t.list)),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},selectTag:function(t){var e=t.currentTarget.dataset.item,a=t.currentTarget.dataset.index;this.historyList.splice(a,1),this.params.articleName=e,this.onHandleSearch()},onInput:function(t){this.params.articleName=t.detail.value},onFocus:function(t){this.flag=!0},tabSelect:function(t){var e=t.currentTarget.dataset;this.tabCur=e.id,this.scrollLeft=60*(e.id-1),console.log("this.tabCur",this.tabCur),this.initParams(this.tabCur),this.getArticleList()},onHandleSearch:function(){this.params.articleName&&(this.historyList.includes(this.params.articleName)||(this.historyList.unshift(this.params.articleName),t.setStorageSync("searchHistory",this.historyList)),this.getArticleList(),this.flag=!1)},onClear:function(){this.historyList=[],t.setStorageSync("searchHistory","")}}};e.default=h}).call(this,a("543d")["default"])},"81aa":function(t,e,a){"use strict";(function(t){a("cb01");n(a("66fd"));var e=n(a("4a20"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=a,t(e.default)}).call(this,a("543d")["createPage"])},"9d83":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement;t._self._c},i=[]}},[["81aa","common/runtime","common/vendor"]]]);