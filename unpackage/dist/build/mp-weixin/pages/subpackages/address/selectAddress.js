(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/subpackages/address/selectAddress"],{"02ff":function(t,e,a){"use strict";var n=a("b958"),r=a.n(n);r.a},"1bcb":function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement;t._self._c},s=[]},"39b0":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(a("a34a")),r=a("c991");function s(t){return t&&t.__esModule?t:{default:t}}function i(t,e,a,n,r,s,i){try{var o=t[s](i),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}function o(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var s=t.apply(e,a);function o(t){i(s,n,r,o,c,"next",t)}function c(t){i(s,n,r,o,c,"throw",t)}o(void 0)}))}}var c=requirePlugin("citySelector"),l={data:function(){return{serachType:!1,scrollTop:0,old:{scrollTop:0},title:"地址选择",params:{size:10,current:1,total:0,lat:"",lng:""},isBack:!0,dw_type:!1,count:null,pageNum:1,address_data:{},location_data:{},list:[],searchList:[],input_val:"",interType:!1,search_qs_type:!1,isType:!1,backType:0,addressList:[],moreAddress:!1,addressBoxHeight:0,time:1e3,hotCitys:[]}},onLoad:function(e){this.address_data=t.getStorageSync("addressInfo"),console.log("this.address_data",this.address_data);var a=this.getOpenerEventChannel();this.eventChannel=a,this.onFetchHotCity()},onShow:function(){var e=c.getCity();console.log("selectedCity",e),e&&(Object.assign(this.address_data,{city:e.name,lat:e.location.latitude,lng:e.location.longitude}),t.setStorageSync("addressInfo",this.address_data),this.params.current=1,this.getDictList(e.location))},onUnload:function(){c.clearCity()},methods:{hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},upper:function(t){console.log("upper",t)},lower:function(t){this.hasNext()&&(this.params.current++,this.serachType?this.getArea(this.input_val):this.getDictList({latitude:this.params.lat,longitude:this.params.lng}))},scroll:function(t){this.old.scrollTop=t.detail.scrollTop},goTop:function(t){var e=this;this.scrollTop=this.old.scrollTop,this.$nextTick((function(){e.scrollTop=0}))},onFetchHotCity:function(){var t=this;return o(n.default.mark((function e(){var a;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,r.selectHotCity)();case 3:a=e.sent,200===a.code&&a.data.forEach((function(e){t.hotCitys.push(e.cityName.replace(/市/,""))})),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},addressBtn:function(e){console.log("item",e);var a=t.getStorageSync("token");console.log("token",a),a?this.onSaveLocation(e):this.goBackPage(e)},goBackPage:function(e){this.eventChannel.emit("onChangeAddress",{data:e}),t.navigateBack({delta:1})},onSaveLocation:function(t){var e=this;return o(n.default.mark((function a(){var s;return n.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,(0,r.saveUserLocation)({locationLat:t.lat,locationLng:t.lng,locationAddress:t.title});case 3:s=a.sent,200===s.code&&e.goBackPage(t),a.next=11;break;case 7:a.prev=7,a.t0=a["catch"](0),console.log("err",a.t0),e.goBackPage(t);case 11:case"end":return a.stop()}}),a,null,[[0,7]])})))()},selectCity:function(){var t=this.mapConfig.key,e=this.mapConfig.key;console.log("this.hotCitys.join(',')",this.hotCitys.join(","));var a=this.hotCitys.join(",");wx.navigateTo({url:"plugin://citySelector/index?key=".concat(t,"&referer=").concat(e,"&hotCitys=").concat(a)})},reLocation:function(){var e=this;this.serachType=!1,this.input_val="",this.params.current=1,this.goTop(),t.showLoading(),this.getSystemLocation((function(a){t.setStorageSync("lat",a.latitude),t.setStorageSync("lng",a.longitude),t.hideLoading(),e.getDictList(a)}),(function(){t.hideLoading()}))},getDictList:function(t){var e=this;return o(n.default.mark((function a(){var s;return n.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.params.lat=t.latitude,e.params.lng=t.longitude,a.prev=2,a.next=5,(0,r.selectAddressByLat)(e.params);case 5:s=a.sent,200===s.code&&(e.params.total=s.data.total,1===e.params.current?e.list=s.data.records:e.list=e.list.concat(s.data.records)),a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](2),console.log("err",a.t0);case 12:case"end":return a.stop()}}),a,null,[[2,9]])})))()},address_input:function(t){var e=this;clearTimeout(this.timer),this.input_val=t.detail.value,this.serachType=!0,this.params.current=1,this.timer=setTimeout((function(){e.list=[],e.input_val?e.getArea(e.input_val):e.list=[]}),this.time)},getArea:function(t){var e=this;return o(n.default.mark((function a(){var s;return n.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,(0,r.selectAddressExploreByCityAndArea)({size:e.params.size,current:e.params.current,cityName:e.address_data.city,areaName:t});case 3:s=a.sent,200===s.code&&(e.params.total=s.data.total,1===e.params.current?e.list=s.data.records:e.list=e.list.concat(s.data.records)),a.next=10;break;case 7:a.prev=7,a.t0=a["catch"](0),console.log("err",a.t0);case 10:case"end":return a.stop()}}),a,null,[[0,7]])})))()},search_clear:function(){this.input_val="",this.list=[]}}};e.default=l}).call(this,a("543d")["default"])},"42dd":function(t,e,a){"use strict";a.r(e);var n=a("39b0"),r=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=r.a},"4d7f":function(t,e,a){"use strict";(function(t){a("cb01");n(a("66fd"));var e=n(a("e41e"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=a,t(e.default)}).call(this,a("543d")["createPage"])},b958:function(t,e,a){},e41e:function(t,e,a){"use strict";a.r(e);var n=a("1bcb"),r=a("42dd");for(var s in r)"default"!==s&&function(t){a.d(e,t,(function(){return r[t]}))}(s);a("02ff");var i,o=a("f0c5"),c=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=c.exports}},[["4d7f","common/runtime","common/vendor"]]]);