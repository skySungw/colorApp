(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/settings/addressList"],{"38da":function(t,e,n){"use strict";(function(t){n("cb01");r(n("66fd"));var e=r(n("a901"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},5668:function(t,e,n){"use strict";var r=n("b258"),a=n.n(r);a.a},"8fbf":function(t,e,n){"use strict";n.r(e);var r=n("e74a"),a=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=a.a},a901:function(t,e,n){"use strict";n.r(e);var r=n("c347"),a=n("8fbf");for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("5668");var c,o=n("f0c5"),i=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,"7502b212",null,!1,r["a"],c);e["default"]=i.exports},b258:function(t,e,n){},c347:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},u=[]},e74a:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(n("a34a")),a=n("c991");function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,r,a,u,c){try{var o=t[u](c),i=o.value}catch(s){return void n(s)}o.done?e(i):Promise.resolve(i).then(r,a)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var u=t.apply(e,n);function o(t){c(u,r,a,o,i,"next",t)}function i(t){c(u,r,a,o,i,"throw",t)}o(void 0)}))}}var i={data:function(){return{selectIndex:"",list:[]}},onLoad:function(t){this.selectIndex=t.id||""},onShow:function(){this.getAddressList()},methods:{getAddressList:function(){var t=this;return o(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.onFetchAddressList)();case 3:n=e.sent,200===n.code&&(t.list=n.data),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},onSelectAddress:function(e){t.navigateBack({delta:1})},onGoDetail:function(e){console.log("item",e);var n="/pages/sub/my/settings/address";n+=e?"?id="+e.receiveId:"",t.navigateTo({url:n})}}};e.default=i}).call(this,n("543d")["default"])}},[["38da","common/runtime","common/vendor"]]]);