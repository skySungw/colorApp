(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/settings/nickname"],{1702:function(e,t,n){"use strict";n.r(t);var r=n("6007"),u=n("708d");for(var a in u)"default"!==a&&function(e){n.d(t,e,(function(){return u[e]}))}(a);var o,c=n("f0c5"),i=Object(c["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);t["default"]=i.exports},"3e99":function(e,t,n){"use strict";(function(e){n("e8cf");r(n("66fd"));var t=r(n("1702"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},6007:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var u=function(){var e=this,t=e.$createElement;e._self._c},a=[]},"708d":function(e,t,n){"use strict";n.r(t);var r=n("b86d"),u=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=u.a},b86d:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("a34a")),u=n("651b");function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,r,u,a,o){try{var c=e[a](o),i=c.value}catch(s){return void n(s)}c.done?t(i):Promise.resolve(i).then(r,u)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(r,u){var a=e.apply(t,n);function c(e){o(a,r,u,c,i,"next",e)}function i(e){o(a,r,u,c,i,"throw",e)}c(void 0)}))}}var i={data:function(){return{userName:""}},onLoad:function(e){this.userName=e.param},methods:{onSave:function(){var t=this;return c(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.userName){n.next=3;break}return e.showToast({title:"名字不能为空哦~",icon:"none"}),n.abrupt("return",!1);case 3:return n.prev=3,n.next=6,(0,u.updateUserInfo)({userName:t.userName});case 6:a=n.sent,200===a.code&&e.showToast({title:"操作成功",duration:2e3,complete:function(){setTimeout((function(){e.navigateBack()}),2e3)}}),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](3),console.log("err",n.t0);case 13:case"end":return n.stop()}}),n,null,[[3,10]])})))()},onInput:function(e){console.log("e",e.target.value),this.userName=e.target.value}}};t.default=i}).call(this,n("543d")["default"])}},[["3e99","common/runtime","common/vendor"]]]);