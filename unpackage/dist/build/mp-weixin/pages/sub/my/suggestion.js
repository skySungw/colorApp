(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/suggestion"],{"5a6a":function(e,t,n){},"704f":function(e,t,n){"use strict";(function(e){n("e8cf");o(n("66fd"));var t=o(n("dfd2"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},7893:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=c(n("a34a")),a=c(n("9763")),i=n("651b");function c(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n,o,a,i,c){try{var r=e[i](c),u=r.value}catch(s){return void n(s)}r.done?t(u):Promise.resolve(u).then(o,a)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(o,a){var i=e.apply(t,n);function c(e){r(i,o,a,c,u,"next",e)}function u(e){r(i,o,a,c,u,"throw",e)}c(void 0)}))}}var s={data:function(){return{ideaContent:"",ideaImg:"",imgList:[]}},methods:{onChooseImage:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],success:function(e){var n=e.tempFilePaths;console.log("tempFilePaths[0]",n),(0,a.default)({filePath:n[0],name:"file",success:function(e){console.log("uploadFileRes",e);var o=JSON.parse(e.data);200===o.code&&(t.ideaImg=o.data.fileUrl),0!=t.imgList.length?t.imgList=t.imgList.concat(n):t.imgList=n}})}})},onViewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},onDelImg:function(t){var n=this;e.showModal({content:"确定删除？",cancelText:"再想想",confirmText:"确认",success:function(e){e.confirm&&n.imgList.splice(t.currentTarget.dataset.index,1)}})},onConfirm:function(){var t=this;return u(o.default.mark((function n(){var a,c,r;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a="来都来了不说点什么吗~",c=!1,t.ideaContent?t.ideaContent.length<10&&(a="至少要10个字哦~",c=!0):c=!0,!c){n.next=6;break}return e.showToast({title:a,duration:3e3,icon:"none"}),n.abrupt("return",!1);case 6:return n.prev=6,n.next=9,(0,i.onUploadSuggest)({ideaContent:t.ideaContent,ideaImg:t.ideaImg});case 9:r=n.sent,console.log("res",r),200===r.code&&e.showToast({title:"感谢反馈!",icon:"none",success:function(){setTimeout((function(){e.navigateBack()}),1500)}}),n.next=17;break;case 14:n.prev=14,n.t0=n["catch"](6),console.log("err",n.t0);case 17:console.log(t.ideaContent);case 18:case"end":return n.stop()}}),n,null,[[6,14]])})))()}}};t.default=s}).call(this,n("543d")["default"])},9639:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=[]},c8d2:function(e,t,n){"use strict";var o=n("5a6a"),a=n.n(o);a.a},cd8c:function(e,t,n){"use strict";n.r(t);var o=n("7893"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},dfd2:function(e,t,n){"use strict";n.r(t);var o=n("9639"),a=n("cd8c");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("c8d2");var c,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=u.exports}},[["704f","common/runtime","common/vendor"]]]);