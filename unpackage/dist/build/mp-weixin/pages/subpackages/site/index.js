(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/subpackages/site/index"],{"0445":function(t,e,n){},"163b":function(t,e,n){"use strict";var a=n("0445"),i=n.n(a);i.a},"1db6":function(t,e,n){"use strict";n.r(e);var a=n("d3ec"),i=n("5a9f");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("163b");var r,o=n("f0c5"),c=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"665d0efc",null,!1,a["a"],r);e["default"]=c.exports},4557:function(t,e,n){"use strict";(function(t){n("cb01");a(n("66fd"));var e=a(n("1db6"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"5a9f":function(t,e,n){"use strict";n.r(e);var a=n("a350"),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);e["default"]=i.a},a350:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=s(n("a34a")),i=n("c991");function s(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,a,i,s,r){try{var o=t[s](r),c=o.value}catch(l){return void n(l)}o.done?e(c):Promise.resolve(c).then(a,i)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var s=t.apply(e,n);function o(t){r(s,a,i,o,c,"next",t)}function c(t){r(s,a,i,o,c,"throw",t)}o(void 0)}))}}var c=function(){n.e("components/tab").then(function(){return resolve(n("1431"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/navBar").then(function(){return resolve(n("1e8d"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/card").then(function(){return resolve(n("6f25"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/activeCard").then(function(){return resolve(n("75e6"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/empty").then(function(){return resolve(n("c021"))}.bind(null,n)).catch(n.oe)},f=0,g=0,p={components:{TabBar:c,NavBar:l,Card:u,ActiveCard:d,Empty:h},data:function(){return{imgWidth:0,cols:[[],[]],loadingCount:0,images:[],scrollTop:0,old:{scrollTop:0},addressData:{title:"定位中..."},initPage:!0,placeholder:"看看周边的站长",token:null,publishShow:!1,params:{size:10,current:1,total:0,articleType:0,lat:"",lng:""},customBar:this.CustomBar+this.StatusBar+40,list:[],activeIndex:0,dictList:[],noMoreFlag:!1}},onLoad:function(){var e=this;t.getSystemInfo({success:function(t){var n=t.windowWidth,a=(t.windowHeight,.48*n);e.imgWidth=a,e.init()}})},onShow:function(){this.userId=t.getStorageSync("userId"),this.token=t.getStorageSync("token")},onUnload:function(){},onPullDownRefresh:function(){var e=this;setTimeout((function(){t.stopPullDownRefresh(),e.initParams()}),2e3)},methods:{init:function(){var e=this;t.showLoading(),this.params.lat=t.getStorageSync("lat"),this.params.lng=t.getStorageSync("lng");var n=t.getStorageSync("addressInfo");(null===n||void 0===n?void 0:n.lat)?(this.addressData=n,t.hideLoading(),this.initParams()):this.getSystemLocation((function(n){e.params.lat=n.latitude,e.params.lng=n.longitude,t.setStorageSync("lat",n.latitude),t.setStorageSync("lng",n.longitude),t.hideLoading(),e.getDictList(),e.initParams()}),(function(){e.addressData.title="选择小区",t.hideLoading(),e.initParams()}))},getDictList:function(){var e=this;return o(a.default.mark((function n(){var s;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,i.selectAddressByLat)({lat:e.params.lat,lng:e.params.lng,size:10,current:1});case 3:s=n.sent,200===s.code&&(e.dictList=s.data.records,e.dictList.length>0&&(e.addressData=e.dictList[0],e.addressData.title=e.dictList[0].title,t.setStorageSync("addressInfo",e.addressData))),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),console.log("err",n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},goPage:function(e){var n=e.currentTarget.dataset["item"];t.navigateTo({url:"/pages/sub/article/article?id="+n.articleCode})},onZan:function(t){var e=t.currentTarget.dataset,n=e.item,a=e.colindex,i=e.index;this.cols[a][i].articleDetail.isLikes=!n.articleDetail.isLikes},upper:function(t){},lower:function(t){this.hasNext()?(this.noMoreFlag=!1,this.params.current++,this.getArticleList()):this.noMoreFlag=!0},scroll:function(t){this.old.scrollTop=t.detail.scrollTop},goTop:function(e){var n=this;this.scrollTop=this.old.scrollTop,this.$nextTick((function(){n.scrollTop=0})),t.showToast({icon:"none",title:"纵向滚动 scrollTop 值已被修改为 0"})},loadImages:function(t){t.forEach((function(e,n){t[n].pic=e.articleContentImg[0],t[n].height=0}));for(var e=t,n="img-"+ +new Date,a=0;a<e.length;a++)e[a].id=n+"-"+a;this.loadingCount=e.length,this.images=e},onImageLoad:function(t){for(var e=t.currentTarget.id,n=t.detail.width,a=t.detail.height,i=this.imgWidth,s=i/n,r=a*s,o=this.images,c=null,l=0;l<o.length;l++){var u=o[l];if(u.id===e){c=u;break}}c.height=r;var d=this.loadingCount-1,h=this.cols[0],p=this.cols[1];f<=g?(f+=r,h.push(c)):(g+=r,p.push(c)),this.loadingCount=d,this.cols[0]=h,this.cols[1]=p,d||(this.images=[])},onSelectAddress:function(){var e=this;t.navigateTo({url:"/pages/subpackages/address/selectAddress",events:{onChangeAddress:function(n){var a=n.data;e.addressData.title=a.title,e.addressData.lng=a.lng,e.addressData.lat=a.lat,t.setStorageSync("addressInfo",e.addressData)}}})},onPublishShow:function(){if(!this.token)return this.publishShow=!1,!1;0==this.activeIndex||0==this.userId?this.publishShow=!0:this.publishShow=!1},hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},initParams:function(){this.params.current=1,this.params.articleType=this.params.articleType||0,this.getArticleList()},onChangeParams:function(t){this.params.articleType=t,this.initParams(),this.onPublishShow()},getArticleList:function(){var e=this;return o(a.default.mark((function n(){var s;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.showLoading(),n.prev=1,s=null,2!==e.params.articleType){n.next=9;break}return n.next=6,(0,i.onFetchActivity)(e.params);case 6:s=n.sent,n.next=12;break;case 9:return n.next=11,(0,i.onFetchArticle)(e.params);case 11:s=n.sent;case 12:200===s.code&&(e.initPage=!1,e.params.total=s.data.total,e.loadImages(s.data.records),1===e.params.current?e.list=s.data.records:e.list=e.list.concat(s.data.records)),t.hideLoading(),n.next=21;break;case 16:n.prev=16,n.t0=n["catch"](1),e.initPage=!1,t.hideLoading(),console.log("errs",n.t0);case 21:case"end":return n.stop()}}),n,null,[[1,16]])})))()},goAdPage:function(e){console.log("item",e),t.navigateTo({url:e.link,success:function(t){},fail:function(){},complete:function(){}})},onPublish:function(){var e="/pages/sub/publish/";2==this.activeIndex?e+="publishActive":e+="index",t.navigateTo({url:e})}}};e.default=p}).call(this,n("543d")["default"])},d3ec:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},s=[]}},[["4557","common/runtime","common/vendor"]]]);