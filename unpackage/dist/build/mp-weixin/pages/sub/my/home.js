(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/sub/my/home"],{"1d5b":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a34a")),r=n("651b");function o(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,a,r,o,c){try{var u=t[o](c),s=u.value}catch(i){return void n(i)}u.done?e(s):Promise.resolve(s).then(a,r)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function u(t){c(o,a,r,u,s,"next",t)}function s(t){c(o,a,r,u,s,"throw",t)}u(void 0)}))}}var s=function(){n.e("components/goods").then(function(){return resolve(n("ee12"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/card").then(function(){return resolve(n("8551"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/empty").then(function(){return resolve(n("e743"))}.bind(null,n)).catch(n.oe)},d={components:{Goods:s,Card:i,Empty:l},data:function(){return{followState:1,userId:"",customBar:0,info:null,memberDetail:{fansCount:0,followCount:0,integralCount:0},memberWorks:{goodsCount:0,articleCount:0},menu:[{num:0,label:"商品"},{num:0,label:"帖子"}],curTab:0,scrollLeft:0,fixed:!1,list:[],pageParam:{size:10,total:0,current:1,userId:"",goodsState:1,selType:0}}},onLoad:function(t){this.userId=t.id||"",this.pageParam.userId=t.id||"",this.getInfos(),this.init()},onReachBottom:function(){this.hasNext()&&(this.pageParam.current++,this.init("next"))},methods:{onHandleFollow:function(){var e=this;return u(a.default.mark((function n(){var o,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=0,1===e.followState&&(o=1),n.prev=2,n.next=5,(0,r.onHandleFollow)({userId:e.pageParam.userId||"",followState:o});case 5:c=n.sent,200===c.code&&(t.showToast({title:"操作成功",icon:"none",duration:2e3}),e.followState=1==e.followState?2:1),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](2),console.log("err",n.t0);case 12:case"end":return n.stop()}}),n,null,[[2,9]])})))()},hasNext:function(){return this.pageParam.current<Math.ceil(this.pageParam.total/this.pageParam.size)},getInfos:function(){var t=this;return u(a.default.mark((function e(){var n,o;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,n=t.userId?{userId:t.userId}:{},e.next=4,(0,r.selectMemberInfoByToken)(n);case 4:o=e.sent,200===o.code&&(t.info=o.data,t.memberDetail=o.data.memberDetail,t.menu[0].num=o.data.memberWorks.goodsCount,t.menu[1].num=o.data.memberWorks.articleCount,t.followState=o.data.followState),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log("err",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},init:function(t){t||(this.pageParam.current=1,this.list=[]),0==this.curTab?this.getGoodsList():this.getArticleList()},getGoodsList:function(){var t=this;return u(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,r.onFetchGoodsByCreator)(t.pageParam);case 3:n=e.sent,200===n.code&&(t.pageParam.total=n.data.total,1==t.pageParam.current?t.list=n.data.records:t.list=t.list.concat(n.data.records)),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},getArticleList:function(){var t=this;return u(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,r.onFetchArticleByCreator)(t.pageParam);case 3:n=e.sent,200===n.code&&(t.pageParam.total=n.data.total,1==t.pageParam.current?t.list=n.data.records:t.list=t.list.concat(n.data.records)),e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),console.log("err",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},onGoPage:function(e){e["link"]&&t.navigateTo({url:e.link})},tabSelect:function(t){this.curTab=t.currentTarget.dataset.id,this.scrollLeft=60*(t.currentTarget.dataset.id-1),this.init()},scroll:function(t){t.detail.scrollTop>170?(this.fixed=!0,this.customBar=this.CustomBar):(this.fixed=!1,this.customBar=0)},onRefresh:function(){console.log("bottom")}}};e.default=d}).call(this,n("543d")["default"])},"28fc":function(t,e,n){"use strict";(function(t){n("e8cf");a(n("66fd"));var e=a(n("3e6d"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"3e6d":function(t,e,n){"use strict";n.r(e);var a=n("fdf6"),r=n("ab42");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("b8dc");var c,u=n("f0c5"),s=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,"4556a990",null,!1,a["a"],c);e["default"]=s.exports},"5afa":function(t,e,n){},ab42:function(t,e,n){"use strict";n.r(e);var a=n("1d5b"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},b8dc:function(t,e,n){"use strict";var a=n("5afa"),r=n.n(a);r.a},fdf6:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,n=(t._self._c,1!=t.pageParam.current&&!t.hasNext());t.$mp.data=Object.assign({},{$root:{m0:n}})},o=[]}},[["28fc","common/runtime","common/vendor"]]]);