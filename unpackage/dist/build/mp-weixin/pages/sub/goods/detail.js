(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/goods/detail"],{1845:function(e,t,o){},"305d":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(o("a34a")),a=o("651b");function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,o,n,a,r,i){try{var s=e[r](i),u=s.value}catch(c){return void o(c)}s.done?t(u):Promise.resolve(u).then(n,a)}function s(e){return function(){var t=this,o=arguments;return new Promise((function(n,a){var r=e.apply(t,o);function s(e){i(r,n,a,s,u,"next",e)}function u(e){i(r,n,a,s,u,"throw",e)}s(void 0)}))}}var u={data:function(){return{modalName:null,isContactWechat:!1,favor:0,isWechat:!1,isBack:!0,params:{lat:"",lng:"",goodsCode:""},goodsDetail:null}},onLoad:function(t){var o=this,n=e.getStorageSync("token");if(!n)return e.redirectTo({url:"/pages/sub/login/index"}),!1;this.params.goodsCode=t.id,this.isBack=1!=t.isBack,this.getSystemLocation((function(e){o.params.lat=e.latitude,o.params.lng=e.longitude,console.log("当前位置的经度："+e),console.log("当前位置的纬度："+e.latitude),o.getGoodsDetail()}),(function(){o.getGoodsDetail()}))},created:function(){this.isWechat=!0},methods:{onShareAppMessage:function(){var e=this.data.goodsDetail;return{title:"".concat(e.goodsName,"  ¥").concat(e.goodsPrice),imageUrl:e.goodsImgArray[0]}},getShareBox:function(){this.sharebox=!1},getGoodsDetail:function(){var t=this;return s(n.default.mark((function o(){var r;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return e.showLoading(),o.prev=1,o.next=4,(0,a.onFetchGoodsDetail)(t.params);case 4:r=o.sent,200===r.code&&(t.goodsDetail=r.data,t.favor=t.goodsDetail.isLikes?1:0),e.setStorageSync("goodsInfo",[{goodsCode:t.params.goodsCode,goodsCount:1}]),e.hideLoading(),o.next=14;break;case 10:o.prev=10,o.t0=o["catch"](1),e.hideLoading(),console.log("err",o.t0);case 14:case"end":return o.stop()}}),o,null,[[1,10]])})))()},goPage:function(){e.navigateTo({url:"/pages/sub/goods/placeOrder?id="+this.id})},makeCall:function(){e.makePhoneCall({phoneNumber:this.goodsDetail.sellerContact})},onHandleContract:function(){this.modalName="Image"},hideModal:function(e){this.modalName=null},onHandleFavor:function(){var t=this;return s(n.default.mark((function o(){var r,i;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return e.showLoading(),o.prev=1,r=1===t.favor?0:1,o.next=5,(0,a.onCollectionGoods)({goodsCode:t.params.goodsCode,likesType:0,likesState:r});case 5:i=o.sent,200===i.code&&(e.showToast({title:"操作成功"}),t.favor=r),e.hideLoading(),o.next=14;break;case 10:o.prev=10,o.t0=o["catch"](1),e.hideLoading(),console.log("err",o.t0);case 14:case"end":return o.stop()}}),o,null,[[1,10]])})))()},onViewImage:function(t){var o=t.currentTarget.dataset["index"];e.previewImage({urls:this.goodsDetail.goodsImgArray,current:o})},selectMapRote:function(){requirePlugin("routePlan");var t=JSON.stringify({name:this.goodsDetail.goodsAddress,latitude:this.goodsDetail.goodsLat,longitude:this.goodsDetail.goodsLng});e.navigateTo({url:"plugin://routePlan/index?key="+this.mapConfig.key+"&referer="+this.mapConfig.referer+"&endPoint="+t})}}};t.default=u}).call(this,o("543d")["default"])},"39b2":function(e,t,o){"use strict";(function(e){o("e8cf");n(o("66fd"));var t=n(o("eb1c"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(t.default)}).call(this,o("543d")["createPage"])},"6a52":function(e,t,o){"use strict";o.r(t);var n=o("305d"),a=o.n(n);for(var r in n)"default"!==r&&function(e){o.d(t,e,(function(){return n[e]}))}(r);t["default"]=a.a},b89c:function(e,t,o){"use strict";var n=o("1845"),a=o.n(n);a.a},d876:function(e,t,o){"use strict";var n;o.d(t,"b",(function(){return a})),o.d(t,"c",(function(){return r})),o.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement;e._self._c},r=[]},eb1c:function(e,t,o){"use strict";o.r(t);var n=o("d876"),a=o("6a52");for(var r in a)"default"!==r&&function(e){o.d(t,e,(function(){return a[e]}))}(r);o("b89c");var i,s=o("f0c5"),u=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"683262d0",null,!1,n["a"],i);t["default"]=u.exports}},[["39b2","common/runtime","common/vendor"]]]);