(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/signUp"],{"3bb7":function(t,e,n){"use strict";(function(t){n("e8cf");a(n("66fd"));var e=a(n("b208"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"73ae":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,n=(t._self._c,1!=t.pageParam.current&&!t.hasNext());t.$mp.data=Object.assign({},{$root:{m0:n}})},o=[]},"9dba":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a34a")),r=n("651b");function o(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,a,r,o,i){try{var c=t[o](i),u=c.value}catch(s){return void n(s)}c.done?e(u):Promise.resolve(u).then(a,r)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function c(t){i(o,a,r,c,u,"next",t)}function u(t){i(o,a,r,c,u,"throw",t)}c(void 0)}))}}var u=function(){n.e("components/activeCard").then(function(){return resolve(n("761a"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/empty").then(function(){return resolve(n("e743"))}.bind(null,n)).catch(n.oe)},l={components:{ActiveCard:u,Empty:s},data:function(){return{userId:"",pageParam:{size:10,current:1,total:0,isSignUp:1},list:[]}},onLoad:function(t){this.userId=t.id,this.getArticleList()},onReachBottom:function(){this.hasNext()&&(this.pageParam.current++,this.getArticleList())},methods:{hasNext:function(){return this.pageParam.current<Math.ceil(this.pageParam.total/this.pageParam.size)},getArticleList:function(){var e=this;return c(a.default.mark((function n(){var o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.showLoading(),n.prev=1,o=null,n.next=5,(0,r.onFetchActivity)(e.pageParam);case 5:o=n.sent,console.log("res",o),200===o.code&&(e.pageParam.total=o.data.total,1===e.pageParam.current?e.list=o.data.records:e.list=e.list.concat(o.data.records),console.log("this.list",e.list)),t.hideLoading(),n.next=15;break;case 11:n.prev=11,n.t0=n["catch"](1),t.hideLoading(),console.log("errs",n.t0);case 15:case"end":return n.stop()}}),n,null,[[1,11]])})))()}}};e.default=l}).call(this,n("543d")["default"])},a2d9:function(t,e,n){"use strict";n.r(e);var a=n("9dba"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},b208:function(t,e,n){"use strict";n.r(e);var a=n("73ae"),r=n("a2d9");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);var i,c=n("f0c5"),u=Object(c["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);e["default"]=u.exports}},[["3bb7","common/runtime","common/vendor"]]]);