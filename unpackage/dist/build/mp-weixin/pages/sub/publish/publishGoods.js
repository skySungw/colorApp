(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/publish/publishGoods"],{"07f2":function(t,e,o){"use strict";var n=o("57a3"),s=o.n(n);s.a},"3da7":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n,s=r(o("a34a")),a=o("651b"),c=r(o("9763"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function d(t,e,o,n,s,a,c){try{var r=t[a](c),i=r.value}catch(d){return void o(d)}r.done?e(i):Promise.resolve(i).then(n,s)}function l(t){return function(){var e=this,o=arguments;return new Promise((function(n,s){var a=t.apply(e,o);function c(t){d(a,n,s,c,r,"next",t)}function r(t){d(a,n,s,c,r,"throw",t)}c(void 0)}))}}var u=function(){o.e("components/bgyxedit/bgyxedit").then(function(){return resolve(o("fa2e"))}.bind(null,o)).catch(o.oe)},g=function(){o.e("components/contact").then(function(){return resolve(o("64c7"))}.bind(null,o)).catch(o.oe)},f=requirePlugin("chooseLocation"),h=(n={components:{bgyxedit:u,Contact:g},data:function(){return{initFlag:!0,goodsName:"",maxImg:8,goodsImg:[],imgList:[],goodsPrice:"",goodsStock:1,goodsLat:"",goodsLng:"",goodsContent:"",goodsDesc:"",sellerContactType:0,sellerContact:"",selectContactObj:null,concatList:["手机号","二维码","微信号"],goodsAddress:"",address:"",contact:!1,pickerList:[],contactList:[],location:"",placeholderText:"请简单介绍下您的商品",goodsCategoryIndex:0,goodsPicker:[],goodsPickerArr:[],goodsCategoryId:0,source:0,showcaseId:null}},onLoad:function(t){t.source&&(this.source=t.source,this.showcaseId=t.showcaseId),this.getContactList(),this.getCatogryList()},onUnload:function(){f.setLocation(null)},onShow:function(){this.initFlag&&this.onSelectLocation();var t=f.getLocation();t&&(console.log("location",t),this.address=t.name,this.goodsLat=t.latitude,this.goodsLng=t.longitude,this.onSaveAddress())}},i(n,"onUnload",(function(){f.setLocation(null)})),i(n,"methods",{modifyConcat:function(){var e=this,o="";1===this.selectContactObj.contactType?o="/pages/sub/my/settings/wechart?param=":2===this.selectContactObj.contactType&&(o="/pages/sub/my/settings/wxNumber?param="),o+=this.selectContactObj.contactContent,t.navigateTo({url:o,events:{getSetting:function(t){console.error("data",t.data),e.sellerContact=t.data,e.selectContactObj.ifNull=!1,e.selectContactObj.contactContent=t.data}},success:function(t){t.eventChannel.emit("setSource",{source:1})}})},onSelectLocation:function(){var t=this;return l(s.default.mark((function e(){var o,n;return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.selectUserLocation)();case 3:o=e.sent,200===o.code&&(null===o||void 0===o||null===(n=o.data)||void 0===n?void 0:n.locationAddress)&&(t.address=o.data.locationAddress,t.goodsLat=o.data.locationLat,t.goodsLng=o.data.locationLng),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},onAddContact:function(){var e=this,o="";1===this.selectContactObj.contactType?o="/pages/sub/my/settings/wechart":2===this.selectContactObj.contactType&&(o="/pages/sub/my/settings/wxNumber"),t.navigateTo({url:o,events:{getSetting:function(t){console.error("data",t.data),e.sellerContact=t.data,e.selectContactObj.ifNull=!1,e.selectContactObj.contactContent=t.data}},success:function(t){t.eventChannel.emit("setSource",{source:1})}})},getCatogryList:function(){var t=this;return l(s.default.mark((function e(){var o;return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.onFetchGoodsCategory)();case 3:o=e.sent,200===o.code&&(t.goodsPickerArr=o.data,t.goodsPickerArr.forEach((function(e){t.goodsPicker.push(e.categoryName)})),t.goodsPickerArr.length&&(t.goodsCategoryId=t.goodsPickerArr[0]["categoryId"])),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},getContactList:function(){var t=this;return l(s.default.mark((function e(){var o,n;return s.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,a.onFetchContactType)();case 3:o=e.sent,200===o.code&&o.data.length>0&&(n=o.data[0],t.sellerContactType=n.contactType,t.sellerContact=n.contactContent,t.selectContactObj=n,t.pickerList=o.data),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},publish:function(){var e=this;return l(s.default.mark((function o(){var n,c;return s.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,n={goodsName:e.goodsName,goodsImg:e.goodsImg,goodsPrice:e.goodsPrice,goodsStock:e.goodsStock,goodsContent:e.goodsContent,goodsDesc:e.goodsDesc,sellerContactType:e.sellerContactType,sellerContact:e.sellerContact,goodsAddress:e.goodsAddress,goodsCategoryId:e.goodsCategoryId},o.next=4,(0,a.onCreateGoods)(n);case 4:c=o.sent,console.log("res",c),200===c.code&&t.showToast({title:"发布成功",complete:function(){var o="/pages/sub/my/goods";1==e.source&&(o="/pages/sub/my/goods?source=".concat(e.source,"&showcaseId=").concat(e.showcaseId,"&goodsCode=").concat(c.data.goodsCode)),setTimeout((function(){t.redirectTo({url:o})}),1500)}}),o.next=12;break;case 9:o.prev=9,o.t0=o["catch"](0),console.log("err",o.t0);case 12:case"end":return o.stop()}}),o,null,[[0,9]])})))()},onCheck:function(){return this.goodsName?this.goodsPrice?this.goodsDesc?0===this.goodsImg.length?(t.showToast({title:"请上传商品图片",icon:"none"}),!1):this.sellerContact?this.address?void this.publish():(t.showToast({title:"请填写地区信息",icon:"none"}),!1):(t.showToast({title:"请填写完整的联系方式",icon:"none"}),!1):(t.showToast({title:"请填写商品描述",icon:"none"}),!1):(t.showToast({title:"请输入商品价格",icon:"none"}),!1):(t.showToast({title:"请输入商品名",icon:"none"}),!1)},onSaveAddress:function(){var e=this;return l(s.default.mark((function o(){var n,c;return s.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,(0,a.saveUserLocation)({locationLat:e.goodsLat,locationLng:e.goodsLng,locationAddress:e.address});case 3:n=o.sent,200===n.code&&(c=t.getStorageInfoSync("addressInfo")||{},Object.assign(c,{title:e.address,lat:e.goodsLat,lng:e.goodsLng}),t.setStorageSync("addressInfo",c)),o.next=10;break;case 7:o.prev=7,o.t0=o["catch"](0),console.log("err",o.t0);case 10:case"end":return o.stop()}}),o,null,[[0,7]])})))()},selectMap:function(){this.initFlag=!1;var t={key:"YCWBZ-Q2CKG-NK7Q3-IFYBG-LCHA7-TKBQ5",referer:"kuaihuo",category:"房产小区:住宅区:住宅小区"};wx.navigateTo({url:"plugin://chooseLocation/index?key="+t.key+"&referer="+t.referer+"&category="+t.category})},goPage:function(e){t.navigateTo({url:e.link})},onGoodsChange:function(t){this.goodsCategoryIndex=t.detail.value,this.goodsCategoryId=this.goodsPickerArr[this.goodsCategoryIndex]["categoryId"]},onSelectConcat:function(t){var e=this.pickerList[t.detail.value];this.sellerContactType=e.contactType,this.sellerContact=e.contactContent,this.selectContactObj=e},onChooseImage:function(){var e=this;this.initFlag=!1,t.chooseImage({count:this.maxImg,sizeType:["original","compressed"],success:function(t){var o=t.tempFilePaths;if(e.imgList.length+o.length>e.maxImg){var n=e.imgList.length+o.length-e.maxImg;o=o.splice(n)}o.forEach((function(t){(0,c.default)({filePath:t,name:"file",success:function(o){var n=JSON.parse(o.data);200===n.code&&(0!=e.imgList.length?(e.imgList=e.imgList.concat([t]),e.goodsImg=e.goodsImg.concat([n.data.fileUrl])):(e.imgList.push(t),e.goodsImg=[n.data.fileUrl]))}})}))}})},onViewImage:function(e){t.previewImage({urls:this.imgList,current:e.currentTarget.dataset.url})},onDelImg:function(e){var o=this;t.showModal({content:"确定删除？",cancelText:"再想想",confirmText:"确认",success:function(t){if(t.confirm){var n=e.currentTarget.dataset.index;o.imgList.splice(n,1),o.goodsImg.splice(n,1)}}})},getbgyxinfo:function(t){var e=this;console.log("e",t),this.goodsContent=t.html,this.goodsDesc="",t.data.forEach((function(t){e.goodsDesc+=t.value}))}}),n);e.default=h}).call(this,o("543d")["default"])},4715:function(t,e,o){"use strict";o.r(e);var n=o("3da7"),s=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},4848:function(t,e,o){"use strict";o.d(e,"b",(function(){return s})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var n={bgyxedit:function(){return o.e("components/bgyxedit/bgyxedit").then(o.bind(null,"fa2e"))}},s=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"57a3":function(t,e,o){},a8dd:function(t,e,o){"use strict";(function(t){o("e8cf");n(o("66fd"));var e=n(o("bbc5"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=o,t(e.default)}).call(this,o("543d")["createPage"])},bbc5:function(t,e,o){"use strict";o.r(e);var n=o("4848"),s=o("4715");for(var a in s)"default"!==a&&function(t){o.d(e,t,(function(){return s[t]}))}(a);o("07f2");var c,r=o("f0c5"),i=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"71728476",null,!1,n["a"],c);e["default"]=i.exports}},[["a8dd","common/runtime","common/vendor"]]]);