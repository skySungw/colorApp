(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/order/orderDetail"],{"20f3":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return n}));var o=function(){var e=this,t=e.$createElement,r=(e._self._c,e.orderDetail?e._f("getDateTime")(e.orderDetail.createtime):null);e.$mp.data=Object.assign({},{$root:{f0:r}})},a=[]},"27f7":function(e,t,r){"use strict";r.r(t);var n=r("42fc"),o=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},"2ea7":function(e,t,r){"use strict";var n=r("5b29"),o=r.n(n);o.a},"42fc":function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=c(r("a34a")),o=r("853f"),a=r("651b");function c(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t,r,n,o,a,c){try{var i=e[a](c),s=i.value}catch(u){return void r(u)}i.done?t(s):Promise.resolve(s).then(n,o)}function d(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function c(e){l(a,n,o,c,i,"next",e)}function i(e){l(a,n,o,c,i,"throw",e)}c(void 0)}))}}var f={data:function(){return{showModal:!1,status:0,isBack:!0,numList:[{name:"已拍下"},{name:"已付款"},{name:"已发货"},{name:"已完成"}],orderDetail:null,source:0}},onLoad:function(e){this.isBack=1!=e.isBack,this.options=e,console.log("this.options",this.options),this.orderCode=e.orderCode,this.source=e.source||0,this.getDetail()},filters:{getDateTime:function(e){var t=new Date(e);console.log(t);var r=t.getFullYear(),n=t.getMonth()+1,a=t.getDate(),c=t.getHours(),i=t.getMinutes(),s=t.getSeconds();return r+"-"+(0,o.onPadNum)(n)+"-"+(0,o.onPadNum)(a)+" "+(0,o.onPadNum)(c)+":"+(0,o.onPadNum)(i)+":"+(0,o.onPadNum)(s)}},methods:{onHandleUpdateOrderState:function(t){var r=this;return d(n.default.mark((function o(){var c;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,a.onUpdateOrderState)({orderState:t,orderCode:r.orderCode});case 3:c=n.sent,console.log("res",c),200===c.code&&(e.showToast({title:"操作成功",icon:"none"}),setTimeout(r.getDetail,2e3)),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](0),console.log("err",n.t0);case 11:case"end":return n.stop()}}),o,null,[[0,8]])})))()},getDetail:function(){var t=this;return d(n.default.mark((function r(){var o;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.showLoading(),r.prev=1,r.next=4,(0,a.onFetchOrderDetail)({orderCode:t.orderCode});case 4:o=r.sent,console.log("res",o),200===o.code&&(t.orderDetail=o.data,t.status=t.orderDetail.orderState),console.log("orderDetail",t.orderDetail),e.hideLoading(),r.next=15;break;case 11:r.prev=11,r.t0=r["catch"](1),console.log("err",r.t0),e.hideLoading();case 15:case"end":return r.stop()}}),r,null,[[1,11]])})))()},onContact:function(){if(console.log("this.source",this.source),0==this.source&&2==this.orderDetail.sellerInfo.sellerContactType)return this.getWechat(),!1;this.makeCall()},makeCall:function(){var t=1==this.source?this.orderDetail.orderAddress.receivePhone:this.orderDetail.sellerInfo.sellerPhone;e.makePhoneCall({phoneNumber:t})},getWechat:function(){this.showModal=!0},hideModal:function(e){this.showModal=!1},onPay:function(){var t=this;return d(n.default.mark((function r(){var o,c,i,u;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return console.log("this.orderDetail",t.orderDetail),o=t,r.prev=2,r.next=5,(0,a.onFetchWechatPayConfig)({orderCode:t.orderDetail.orderCode});case 5:c=r.sent,200===c.code&&(i=c.data,u={timeStamp:i.timeStamp,nonceStr:i.nonceStr,package:i.packages,signType:i.signType,paySign:i.paySign},console.log("param",u),e.requestPayment(s(s({provider:"wxpay"},u),{},{success:function(e){console.log("res",e),console.log("success:"+JSON.stringify(e)),o.getDetail()},fail:function(e){console.log("err",e),console.log("fail:"+JSON.stringify(e)),o.getDetail()}}))),r.next=12;break;case 9:r.prev=9,r.t0=r["catch"](2),console.log("err",r.t0);case 12:case"end":return r.stop()}}),r,null,[[2,9]])})))()}}};t.default=f}).call(this,r("543d")["default"])},"5b29":function(e,t,r){},"86fd":function(e,t,r){"use strict";(function(e){r("e8cf");n(r("66fd"));var t=n(r("fbce"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=r,e(t.default)}).call(this,r("543d")["createPage"])},fbce:function(e,t,r){"use strict";r.r(t);var n=r("20f3"),o=r("27f7");for(var a in o)"default"!==a&&function(e){r.d(t,e,(function(){return o[e]}))}(a);r("2ea7");var c,i=r("f0c5"),s=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,"5415ddf0",null,!1,n["a"],c);t["default"]=s.exports}},[["86fd","common/runtime","common/vendor"]]]);