(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/focus"],{"5e43":function(t,e,n){"use strict";n.r(e);var r=n("c23f"),a=n("a819");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);var u,c=n("f0c5"),s=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],u);e["default"]=s.exports},"61ff":function(t,e,n){"use strict";(function(t){n("cb01");r(n("66fd"));var e=r(n("5e43"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},a819:function(t,e,n){"use strict";n.r(e);var r=n("bd27"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},bd27:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n("a34a")),a=n("c991");function o(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,r,a,o,u){try{var c=t[o](u),s=c.value}catch(i){return void n(i)}c.done?e(s):Promise.resolve(s).then(r,a)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function c(t){u(o,r,a,c,s,"next",t)}function s(t){u(o,r,a,c,s,"throw",t)}c(void 0)}))}}var s=function(){n.e("components/personCard").then(function(){return resolve(n("a7dc"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/empty").then(function(){return resolve(n("c021"))}.bind(null,n)).catch(n.oe)},l={components:{PersonCard:s,Empty:i},data:function(){return{userId:"",isFocus:!0,pageParam:{selType:0,userId:"",current:1,size:10,total:0},list:[],noMoreFlag:!1}},onLoad:function(t){this.userId=t.id||"",this.isFocus=!this.userId,this.pageParam.userId=t.id||"",this.getFans()},methods:{hasNext:function(){return this.pageParam.current<Math.ceil(this.pageParam.total/this.pageParam.size)},getFans:function(){var t=this;return c(r.default.mark((function e(){var n;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.onFetchFollowFans)(t.pageParam);case 3:n=e.sent,200===n.code&&(t.pageParam.total=n.data.total,1==t.pageParam.current?t.list=n.data.records:t.list=t.list.concat(n.data.records)),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},onRefresh:function(){console.log("bottom"),this.hasNext()?(this.noMoreFlag=!1,this.params.current++,this.getFans()):this.noMoreFlag=!0}}};e.default=l},c23f:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]}},[["61ff","common/runtime","common/vendor"]]]);