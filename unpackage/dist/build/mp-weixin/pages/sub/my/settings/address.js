(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/settings/address"],{"1a15":function(e,t,r){"use strict";r.r(t);var n=r("3c0c"),a=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},2588:function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"3a2f":function(e,t,r){"use strict";r.r(t);var n=r("2588"),a=r("1a15");for(var i in a)"default"!==i&&function(e){r.d(t,e,(function(){return a[e]}))}(i);r("beb4");var c,o=r("f0c5"),s=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);t["default"]=s.exports},"3c0c":function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(r("a34a")),a=r("c991");function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t,r,n,a,i,c){try{var o=e[i](c),s=o.value}catch(u){return void r(u)}o.done?t(s):Promise.resolve(s).then(n,a)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var i=e.apply(t,r);function o(e){c(i,n,a,o,s,"next",e)}function s(e){c(i,n,a,o,s,"throw",e)}o(void 0)}))}}var s=requirePlugin("chooseLocation"),u={data:function(){return{location:"请选择地址",id:null,params:{receiveContact:"",receivePhone:"",receiveProvinceCode:"",receiveProvinceName:"",receiveCityCode:"",receiveCityName:"",receiveAreaCode:"",receiveAreaName:"",receiveDetailAddress:"",receiveLng:"",receiveLat:""}}},onLoad:function(e){console.log("options",e),this.id=e.id,this.id&&this.onFetchAddressInfo(this.id)},onShow:function(){var e=s.getLocation();e&&(this.location=e.province+e.city+e.district,this.params.receiveDetailAddress=e.address,this.params.receiveLng=e.longitude,this.params.receiveLat=e.latitude,this.params.receiveProvinceName=e.province,this.params.receiveCityName=e.city,this.params.receiveAreaName=e.district)},onUnload:function(){s.setLocation(null)},methods:{onFetchAddressInfo:function(e){var t=this;return o(n.default.mark((function r(){var i;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,(0,a.onFetchAddressById)({receiveId:e});case 3:i=r.sent,200===i.code&&(Object.assign(t.params,i.data),t.location=i.data.receiveProvinceName+i.data.receiveCityName+i.data.receiveAreaName),r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](0),console.log("err",r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()},onSave:function(){var t=this;return o(n.default.mark((function r(){var i;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t.params.receiveContact){r.next=3;break}return e.showToast({title:"请填写联系人",icon:"none"}),r.abrupt("return",!1);case 3:if(t.params.receivePhone){r.next=6;break}return e.showToast({title:"请填写联系方式",icon:"none"}),r.abrupt("return",!1);case 6:if(11===t.params.receivePhone.trim().length){r.next=9;break}return e.showToast({title:"请填写11位手机号码",icon:"none"}),r.abrupt("return",!1);case 9:if(t.params.receiveDetailAddress){r.next=12;break}return e.showToast({title:"请填写详细地址",icon:"none"}),r.abrupt("return",!1);case 12:if(r.prev=12,!t.id){r.next=20;break}return Object.assign(t.params,{id:t.id}),r.next=17,(0,a.onUpdateAddress)(t.params);case 17:i=r.sent,r.next=23;break;case 20:return r.next=22,(0,a.onCreateReceiveAddress)(t.params);case 22:i=r.sent;case 23:200===i.code&&(e.showToast({title:"操作成功!"}),setTimeout((function(){e.navigateBack({delta:1})}),1500)),r.next=29;break;case 26:r.prev=26,r.t0=r["catch"](12),console.log("err",r.t0);case 29:case"end":return r.stop()}}),r,null,[[12,26]])})))()},selectMap:function(){var e={key:"YCWBZ-Q2CKG-NK7Q3-IFYBG-LCHA7-TKBQ5",referer:"kuaihuo",category:"房产小区"};wx.navigateTo({url:"plugin://chooseLocation/index?key="+e.key+"&referer="+e.referer+"&category="+e.category})}}};t.default=u}).call(this,r("543d")["default"])},6908:function(e,t,r){"use strict";(function(e){r("cb01");n(r("66fd"));var t=n(r("3a2f"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=r,e(t.default)}).call(this,r("543d")["createPage"])},8956:function(e,t,r){},beb4:function(e,t,r){"use strict";var n=r("8956"),a=r.n(n);a.a}},[["6908","common/runtime","common/vendor"]]]);