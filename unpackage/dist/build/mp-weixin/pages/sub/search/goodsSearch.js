(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/search/goodsSearch"],{"14f4":function(t,e,n){"use strict";n.r(e);var o=n("6627"),s=n("1b05");for(var a in s)"default"!==a&&function(t){n.d(e,t,(function(){return s[t]}))}(a);var r,i=n("f0c5"),c=Object(i["a"])(s["default"],o["b"],o["c"],!1,null,"35d0d21e",null,!1,o["a"],r);e["default"]=c.exports},"1b05":function(t,e,n){"use strict";n.r(e);var o=n("8ec4"),s=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=s.a},"39e1":function(t,e,n){"use strict";(function(t){n("e8cf");o(n("66fd"));var e=o(n("14f4"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},6627:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var s=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"8ec4":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("a34a")),s=n("651b");function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,s,a,r){try{var i=t[a](r),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(o,s)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(o,s){var a=t.apply(e,n);function i(t){r(a,o,s,i,c,"next",t)}function c(t){r(a,o,s,i,c,"throw",t)}i(void 0)}))}}var c=function(){n.e("components/goods").then(function(){return resolve(n("ee12"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/empty").then(function(){return resolve(n("e743"))}.bind(null,n)).catch(n.oe)},l={components:{Goods:c,Empty:u},data:function(){return{flag:!0,historyList:[],params:{goodsName:"",size:10,current:1,total:0,lat:"",lng:""},list:[]}},onLoad:function(){var e=this;this.historyList=t.getStorageSync("searchGoodsHistory")||[],t.getLocation({type:"wgs84",success:function(t){e.params.lat=t.latitude,e.params.lng=t.longitude}})},onReachBottom:function(){this.hasNext()&&(this.params.current++,this.getGoodsList())},methods:{hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},getGoodsList:function(){var e=this;return i(o.default.mark((function n(){var a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,s.onFetchGoodsList)(e.params);case 3:a=n.sent,200===a.code&&(e.params.total=a.data.total,e.list=e.list.concat(a.data.records),console.log("this.list",e.list)),t.hideLoading(),n.next=12;break;case 8:n.prev=8,n.t0=n["catch"](0),t.hideLoading(),console.log("err",n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},selectTag:function(t){var e=t.currentTarget.dataset.item,n=t.currentTarget.dataset.index;this.historyList.splice(n,1),this.params.goodsName=e,this.onHandleSearch()},onInput:function(t){this.params.goodsName=t.detail.value},onFocus:function(t){this.flag=!0},onHandleSearch:function(){this.params.goodsName&&(this.historyList.includes(this.params.goodsName)||(this.historyList.unshift(this.params.goodsName),t.setStorageSync("searchGoodsHistory",this.historyList)),this.list=[],this.getGoodsList(),this.flag=!1)},onClear:function(){this.historyList=[],t.setStorageSync("searchGoodsHistory","")}}};e.default=l}).call(this,n("543d")["default"])}},[["39e1","common/runtime","common/vendor"]]]);