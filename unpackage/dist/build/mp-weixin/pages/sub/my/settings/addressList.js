(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/settings/addressList"],{"07d0":function(e,t,n){"use strict";n.r(t);var r=n("d7a2"),a=n("84de");for(var u in a)"default"!==u&&function(e){n.d(t,e,(function(){return a[e]}))}(u);n("6922");var c,o=n("f0c5"),s=Object(o["a"])(a["default"],r["b"],r["c"],!1,null,"26d25e11",null,!1,r["a"],c);t["default"]=s.exports},6922:function(e,t,n){"use strict";var r=n("9778"),a=n.n(r);a.a},"84de":function(e,t,n){"use strict";n.r(t);var r=n("ca48"),a=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=a.a},9778:function(e,t,n){},ca48:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("a34a")),a=n("651b");function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,r,a,u,c){try{var o=e[u](c),s=o.value}catch(i){return void n(i)}o.done?t(s):Promise.resolve(s).then(r,a)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var u=e.apply(t,n);function o(e){c(u,r,a,o,s,"next",e)}function s(e){c(u,r,a,o,s,"throw",e)}o(void 0)}))}}var s={data:function(){return{selectIndex:"",list:[]}},onLoad:function(e){this.selectIndex=e.id||"",this.getAddressList()},methods:{getAddressList:function(){var e=this;return o(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,a.onFetchAddressList)();case 3:n=t.sent,200===n.code&&(e.list=n.data),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log("err",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},onSelectAddress:function(t){var n=getCurrentPages(),r=n[n.length-2];r.$vm.onFetchAddressInfo(t),e.navigateBack({delta:1})},onGoDetail:function(t){console.log("item",t);var n="/pages/sub/my/settings/address";n+=t?"?id="+t:"",e.navigateTo({url:n})}}};t.default=s}).call(this,n("543d")["default"])},d7a2:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},u=[]},e2b3a:function(e,t,n){"use strict";(function(e){n("e8cf");r(n("66fd"));var t=r(n("07d0"));function r(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])}},[["e2b3a","common/runtime","common/vendor"]]]);