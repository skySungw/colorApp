(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ground/goodsGround"],{"0f00":function(t,n,o){"use strict";var e=o("ef96"),i=o.n(e);i.a},"5d3d":function(t,n,o){"use strict";o.r(n);var e=o("8bb3"),i=o("8a59");for(var a in i)"default"!==a&&function(t){o.d(n,t,(function(){return i[t]}))}(a);o("0f00");var r,s=o("f0c5"),u=Object(s["a"])(i["default"],e["b"],e["c"],!1,null,"178350da",null,!1,e["a"],r);n["default"]=u.exports},"8a59":function(t,n,o){"use strict";o.r(n);var e=o("9af9"),i=o.n(e);for(var a in e)"default"!==a&&function(t){o.d(n,t,(function(){return e[t]}))}(a);n["default"]=i.a},"8bb3":function(t,n,o){"use strict";var e;o.d(n,"b",(function(){return i})),o.d(n,"c",(function(){return a})),o.d(n,"a",(function(){return e}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},"9af9":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=a(o("a34a")),i=o("c991");function a(t){return t&&t.__esModule?t:{default:t}}function r(t,n,o,e,i,a,r){try{var s=t[a](r),u=s.value}catch(c){return void o(c)}s.done?n(u):Promise.resolve(u).then(e,i)}function s(t){return function(){var n=this,o=arguments;return new Promise((function(e,i){var a=t.apply(n,o);function s(t){r(a,e,i,s,u,"next",t)}function u(t){r(a,e,i,s,u,"throw",t)}s(void 0)}))}}var u=function(){o.e("components/navBar").then(function(){return resolve(o("1e8d"))}.bind(null,o)).catch(o.oe)},c=function(){o.e("components/goods").then(function(){return resolve(o("04dd"))}.bind(null,o)).catch(o.oe)},l=function(){o.e("components/empty").then(function(){return resolve(o("c021"))}.bind(null,o)).catch(o.oe)},f={components:{NavBar:u,Goods:c,Empty:l},data:function(){return{scrollTop:0,old:{scrollTop:0},token:null,publishShow:!1,params:{size:10,current:1,total:0,lat:"",lng:""},list:[],noMoreFlag:!1}},onLoad:function(n){var o=this;this.getSystemLocation((function(n){o.params.lat=n.latitude,o.params.lng=n.longitude,console.log("当前位置的经度："+n.longitude),console.log("当前位置的纬度："+n.latitude),t.setStorageSync("lat",n.latitude),t.setStorageSync("lng",n.longitude),o.initParams()}),(function(){o.initParams()}))},onShow:function(){this.token=t.getStorageSync("token")},onPullDownRefresh:function(){var n=this;t.showLoading({title:"刷新中..."}),this.title=Math.random(),setTimeout((function(){t.stopPullDownRefresh(),n.initParams()}),2e3)},methods:{upper:function(t){},lower:function(t){this.hasNext()?(this.noMoreFlag=!1,this.params.current++,this.getGoodsList()):this.noMoreFlag=!0},scroll:function(t){this.old.scrollTop=t.detail.scrollTop},goTop:function(n){var o=this;this.scrollTop=this.old.scrollTop,this.$nextTick((function(){o.scrollTop=0})),t.showToast({icon:"none",title:"纵向滚动 scrollTop 值已被修改为 0"})},onPublishShow:function(){this.token?this.publishShow=!0:this.publishShow=!1},hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},initParams:function(){this.params.current=1,this.params.total=0,this.list=[],this.getGoodsList()},getGoodsList:function(){var n=this;return s(e.default.mark((function o(){var a;return e.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,(0,i.onFetchGoodsList)(n.params);case 3:a=o.sent,200===a.code&&(n.params.total=a.data.total,n.list=n.list.concat(a.data.records),console.log("this.list",n.list)),t.hideLoading(),o.next=12;break;case 8:o.prev=8,o.t0=o["catch"](0),t.hideLoading(),console.log("err",o.t0);case 12:case"end":return o.stop()}}),o,null,[[0,8]])})))()},goAdPage:function(n){console.log("item",n),t.navigateTo({url:n.link,success:function(t){},fail:function(){},complete:function(){}})},onPublish:function(){var n="/pages/sub/publish/publishGoods";t.navigateTo({url:n})}}};n.default=f}).call(this,o("543d")["default"])},bbe5:function(t,n,o){"use strict";(function(t){o("cb01");e(o("66fd"));var n=e(o("5d3d"));function e(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=o,t(n.default)}).call(this,o("543d")["createPage"])},ef96:function(t,n,o){}},[["bbe5","common/runtime","common/vendor"]]]);