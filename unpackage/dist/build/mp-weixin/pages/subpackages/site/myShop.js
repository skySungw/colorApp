(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/subpackages/site/myShop"],{2565:function(e,t,a){"use strict";a.r(t);var n=a("6a02"),s=a("9d1e");for(var o in s)"default"!==o&&function(e){a.d(t,e,(function(){return s[e]}))}(o);a("56f1");var i,r=a("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"0f8d4158",null,!1,n["a"],i);t["default"]=c.exports},5453:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a("a34a")),s=a("651b");function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t,a,n,s,o,i){try{var r=e[o](i),c=r.value}catch(u){return void a(u)}r.done?t(c):Promise.resolve(c).then(n,s)}function r(e){return function(){var t=this,a=arguments;return new Promise((function(n,s){var o=e.apply(t,a);function r(e){i(o,n,s,r,c,"next",e)}function c(e){i(o,n,s,r,c,"throw",e)}r(void 0)}))}}var c=function(){a.e("components/goods").then(function(){return resolve(a("ee12"))}.bind(null,a)).catch(a.oe)},u=function(){a.e("components/empty").then(function(){return resolve(a("e743"))}.bind(null,a)).catch(a.oe)},h={components:{Goods:c,Empty:u},data:function(){return{menuIndex:0,menuTop:this.CustomBar,menu:[{id:0,name:"全部"},{id:1,name:"圈友商品"},{id:2,name:"自营商品"}],idStatus:1,siteName:"",params:{size:10,current:1,total:0,showcaseId:"",selType:"",goodsName:""},scrollLeft:0,list:[],isSearchFocus:!1,searchValue:"",timer:null,time:1e3}},onLoad:function(t){var a=this,n=t.showcaseId||e.getStorageSync("showcaseId");this.params.showcaseId=n;var s=e.getStorageSync("token");if(!s)return e.navigateTo({url:"/pages/sub/login/index",success:function(e){e.eventChannel.emit("loginUrl",{loginUrl:"/pages/subpackages/site/myShop?showcaseId=".concat(a.params.showcaseId)})}}),!1;this.getVisitOwner(n),this.initParams()},onShow:function(){},onShareAppMessage:function(){var e=this,t=new Promise((function(t){setTimeout((function(){t({title:"".concat(e.siteName," 的商品橱窗"),path:"/pages/subpackages/site/myShop?showcaseId=".concat(e.params.showcaseId)})}),2e3)}));return{title:"商品橱窗",path:"/pages/subpackages/site/myShop?showcaseId=".concat(this.params.showcaseId),promise:t}},onReachBottom:function(){console.log("bottom"),this.hasNext()&&(this.params.current++,this.getShowCaseList())},methods:{onSearchCancel:function(){this.isSearchFocus=!1,this.searchValue="",this.list=[],this.getShowCaseList()},onInput:function(e){var t=this;this.searchValue=e.detail.value,clearTimeout(this.timer),this.timer=setTimeout((function(){t.list=[],clearTimeout(t.timer),t.getShowCaseList()}),this.time)},showSearchBar:function(){this.isSearchFocus=!0},onMenuChange:function(e){this.list=[],this.menuIndex=e.currentTarget.dataset["index"],this.initParams()},onAdd:function(){var t="";t=0===this.idStatus?"/pages/subpackages/site/goodsList":"/pages/sub/my/goods?source=1&showcaseId=".concat(this.params.showcaseId),e.navigateTo({url:t})},getVisitOwner:function(e){var t=this;return r(n.default.mark((function a(){var o;return n.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,(0,s.onFetchOwnerStateShowcase)({showcaseId:e});case 3:o=a.sent,200===o.code&&(t.idStatus=o.data.status,t.siteName=o.data.ownerUserName),a.next=10;break;case 7:a.prev=7,a.t0=a["catch"](0),console.log("err",a.t0);case 10:case"end":return a.stop()}}),a,null,[[0,7]])})))()},hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},initParams:function(){this.params.selType=this.menuIndex,0==this.params.selType&&delete this.params.selType,this.params.current=1,this.list=[],this.getShowCaseList()},getShowCaseList:function(){var t=this;return r(n.default.mark((function a(){var o;return n.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.showLoading(),a.prev=1,Object.assign(t.params,{goodsName:t.searchValue}),a.next=5,(0,s.onFetchShowcasePage)(t.params);case 5:o=a.sent,200===o.code&&(t.params.total=o.data.total,1===t.params.current?t.list=o.data.records:t.list=t.list.concat(o.data.records)),e.hideLoading(),a.next=14;break;case 10:a.prev=10,a.t0=a["catch"](1),e.hideLoading(),console.log("err",a.t0);case 14:case"end":return a.stop()}}),a,null,[[1,10]])})))()},onGoPage:function(t){t["link"]&&e.navigateTo({url:t.link})}}};t.default=h}).call(this,a("543d")["default"])},"56f1":function(e,t,a){"use strict";var n=a("e106"),s=a.n(n);s.a},"6a02":function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var s=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"6a75":function(e,t,a){"use strict";(function(e){a("e8cf");n(a("66fd"));var t=n(a("2565"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=a,e(t.default)}).call(this,a("543d")["createPage"])},"9d1e":function(e,t,a){"use strict";a.r(t);var n=a("5453"),s=a.n(n);for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=s.a},e106:function(e,t,a){}},[["6a75","common/runtime","common/vendor"]]]);