(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/search/search"],{"14d0":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("a34a")),r=n("651b");function i(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,a,r,i,s){try{var c=t[i](s),o=c.value}catch(u){return void n(u)}c.done?e(o):Promise.resolve(o).then(a,r)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var i=t.apply(e,n);function c(t){s(i,a,r,c,o,"next",t)}function o(t){s(i,a,r,c,o,"throw",t)}c(void 0)}))}}var o=function(){n.e("components/card").then(function(){return resolve(n("8551"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/activeCard").then(function(){return resolve(n("761a"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/empty").then(function(){return resolve(n("e743"))}.bind(null,n)).catch(n.oe)},h={components:{Card:o,ActiveCard:u,Empty:l},data:function(){return{params:{size:10,current:1,total:0,articleType:0,articleName:""},flag:!0,historyList:[],list:[],tabCur:0,scrollLeft:0,menuList:[{index:0,label:"广场"},{index:1,label:"官方"},{index:2,label:"活动"}]}},onLoad:function(e){this.historyList=t.getStorageSync("searchHistory")||[],this.tabCur=e.type||0,console.log("type",this.tabCur),this.initParams(this.tabCur)},onReachBottom:function(){this.hasNext()&&(this.params.current++,this.getArticleList())},methods:{hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},initParams:function(t){this.tabCur=t,this.params.current=1,this.params.articleType=this.tabCur,this.list=[]},getArticleList:function(){var t=this;return c(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,r.onFetchArticle)(t.params);case 3:n=e.sent,200===n.code&&(t.params.total=n.data.total,1===t.params.current?t.list=n.data.records:t.list=t.list.concat(n.data.records),console.log("this.list",t.list)),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},selectTag:function(t){var e=t.currentTarget.dataset.item,n=t.currentTarget.dataset.index;this.historyList.splice(n,1),this.params.articleName=e,this.onHandleSearch()},onInput:function(t){this.params.articleName=t.detail.value},onFocus:function(t){this.flag=!0},tabSelect:function(t){var e=t.currentTarget.dataset;this.tabCur=e.id,this.scrollLeft=60*(e.id-1),console.log("this.tabCur",this.tabCur),this.initParams(this.tabCur),this.getArticleList()},onHandleSearch:function(){this.params.articleName&&(this.historyList.includes(this.params.articleName)||(this.historyList.unshift(this.params.articleName),t.setStorageSync("searchHistory",this.historyList)),this.getArticleList(),this.flag=!1)},onClear:function(){this.historyList=[],t.setStorageSync("searchHistory","")}}};e.default=h}).call(this,n("543d")["default"])},"2a91":function(t,e,n){"use strict";(function(t){n("e8cf");a(n("66fd"));var e=a(n("485c"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"2d8f":function(t,e,n){"use strict";n.r(e);var a=n("14d0"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},"485c":function(t,e,n){"use strict";n.r(e);var a=n("df30"),r=n("2d8f");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);var s,c=n("f0c5"),o=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,"73d7e358",null,!1,a["a"],s);e["default"]=o.exports},df30:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},i=[]}},[["2a91","common/runtime","common/vendor"]]]);