(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/record"],{2020:function(t,e,n){"use strict";var a=n("9457"),r=n.n(a);r.a},4082:function(t,e,n){"use strict";n.r(e);var a=n("fae7"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},"8b53":function(t,e,n){"use strict";n.r(e);var a=n("a982"),r=n("4082");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("2020");var s,i=n("f0c5"),c=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=c.exports},9457:function(t,e,n){},a4c7:function(t,e,n){"use strict";(function(t){n("e8cf");a(n("66fd"));var e=a(n("8b53"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},a982:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},o=[]},fae7:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a34a")),r=n("651b");function o(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,a,r,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,r)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function i(t){s(o,a,r,i,c,"next",t)}function c(t){s(o,a,r,i,c,"throw",t)}i(void 0)}))}}var c=function(){n.e("components/goods").then(function(){return resolve(n("ee12"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/card").then(function(){return resolve(n("8551"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/empty").then(function(){return resolve(n("e743"))}.bind(null,n)).catch(n.oe)},d={components:{Goods:c,Card:u,Empty:l},data:function(){return{params:{size:10,current:1,total:0},emptyMsg:"",customBar:this.CustomBar,list:[],menu:[{label:"商品"},{label:"帖子"}],curTab:0,scrollLeft:0,noMoreFlag:!1}},onLoad:function(){this.initParams()},methods:{getData:function(){t.showLoading({title:"数据加载中...",mask:!1}),this.curTab?(this.emptyMsg="您还没有浏览商品哦~",this.getArticleList()):(this.emptyMsg="您还没有浏览帖子哦~",this.getGoodsList())},hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},initParams:function(){this.params.current=1,this.params.total=0,this.list=[],this.getData()},getGoodsList:function(){var e=this;return i(a.default.mark((function n(){var o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,r.onFetchGoodsRecords)(e.params);case 3:o=n.sent,200===o.code&&(e.params.total=o.data.total,e.list=e.list.concat(o.data.records),console.log("this.list",e.list)),t.hideLoading(),n.next=12;break;case 8:n.prev=8,n.t0=n["catch"](0),t.hideLoading(),console.log("err",n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},getArticleList:function(){var e=this;return i(a.default.mark((function n(){var o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,r.onFetchArticleRecords)(e.params);case 3:o=n.sent,200===o.code&&(e.params.total=o.data.total,e.list=e.list.concat(o.data.records)),t.hideLoading(),n.next=12;break;case 8:n.prev=8,n.t0=n["catch"](0),t.hideLoading(),console.log("err",n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},tabSelect:function(t){this.curTab=t.currentTarget.dataset.id,this.scrollLeft=60*(t.currentTarget.dataset.id-1),this.initParams()},onRefresh:function(){console.log("bottom"),this.hasNext()?(this.noMoreFlag=!1,this.params.current++,this.getData()):this.noMoreFlag=!0}}};e.default=d}).call(this,n("543d")["default"])}},[["a4c7","common/runtime","common/vendor"]]]);