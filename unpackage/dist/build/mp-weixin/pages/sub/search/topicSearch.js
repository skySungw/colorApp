(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/search/topicSearch"],{2371:function(t,e,n){"use strict";(function(t){n("e8cf");a(n("66fd"));var e=a(n("dc3d"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},"958b":function(t,e,n){"use strict";n.r(e);var a=n("a1e0"),o=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=o.a},"9ee1":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},r=[]},a1e0:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("a34a")),o=n("651b");function r(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,a,o,r,c){try{var i=t[r](c),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(a,o)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var r=t.apply(e,n);function i(t){c(r,a,o,i,s,"next",t)}function s(t){c(r,a,o,i,s,"throw",t)}i(void 0)}))}}var s=function(){n.e("components/empty").then(function(){return resolve(n("e743"))}.bind(null,n)).catch(n.oe)},u={components:{Empty:s},data:function(){return{topicsList:[],params:{topicName:"",size:20,current:1,total:0,lat:"",lng:""},list:[],noMoreFlag:!1}},onLoad:function(){var e=this;t.getLocation({type:"wgs84",success:function(t){e.params.lat=t.latitude,e.params.lng=t.longitude}});var n=this.getOpenerEventChannel();this.eventChannel=n,n.on("topicsList",(function(t){e.topicsList=t.topicsList})),this.getTopicList()},methods:{addTopic:function(){var t=this;return i(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.params.topicName){e.next=2;break}return e.abrupt("return",!1);case 2:return console.log("params",t.params.topicName),e.prev=3,e.next=6,(0,o.onPublishTopic)({name:t.params.topicName});case 6:n=e.sent,200===n.code&&(t.eventChannel.emit("onSelectTopic",{data:n.data}),t.onCancel()),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](3),console.log("err",e.t0);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})))()},onCancel:function(){t.navigateBack({delta:1})},onHandleSelectTopic:function(t){console.log("e",t);var e=t.currentTarget.dataset["item"];console.log("item",e),this.eventChannel.emit("onSelectTopic",{data:e}),this.onCancel()},hasNext:function(){return this.params.current<Math.ceil(this.params.total/this.params.size)},getTopicList:function(){var e=this;return i(a.default.mark((function n(){var r;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,o.onFetchTopic)(e.params);case 3:r=n.sent,200===r.code&&(e.params.total=r.data.total,e.list=e.list.concat(r.data.records),console.log("this.list",e.list)),t.hideLoading(),n.next=12;break;case 8:n.prev=8,n.t0=n["catch"](0),t.hideLoading(),console.log("err",n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},onInput:function(t){this.params.topicName=t.detail.value,setTimeout(this.onHandleSearch,500)},onFocus:function(t){},onHandleSearch:function(){this.list=[],this.getTopicList()},onRefresh:function(){console.log("bottom"),this.hasNext()?(this.noMoreFlag=!1,this.params.current++,this.getTopicList()):this.noMoreFlag=!0}}};e.default=u}).call(this,n("543d")["default"])},dc3d:function(t,e,n){"use strict";n.r(e);var a=n("9ee1"),o=n("958b");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);var c,i=n("f0c5"),s=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"2d1c0bb7",null,!1,a["a"],c);e["default"]=s.exports}},[["2371","common/runtime","common/vendor"]]]);