(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/subpackages/subject/index"],{"01a4":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=0,n=0,c={data:function(){return{subjectName:"红烧肉的做法",subjectViewCount:"35.9 亿",collection:!1,collectionText:"",imgWidth:0,col1:[],col2:[],loadingCount:0,images:[]}},onLoad:function(){var i=this;t.getSystemInfo({success:function(t){var e=t.windowWidth,n=(t.windowHeight,.48*e);i.imgWidth=n,i.loadImages()}})},onShow:function(){this.init()},methods:{init:function(){this.collectionText="".concat(this.collection?"已":"","收藏")},onHandleCollect:function(){this.collection=!this.collection,this.init()},lower:function(t){console.log("bottom"),this.loadImages()},onImageLoad:function(t){for(var i=t.currentTarget.id,c=t.detail.width,o=t.detail.height,a=this.imgWidth,s=a/c,u=o*s,l=this.images,h=null,r=0;r<l.length;r++){var f=l[r];if(f.id===i){h=f;break}}h.height=u;var g=this.loadingCount-1,d=this.col1,p=this.col2;e<=n?(e+=u,d.push(h)):(n+=u,p.push(h)),this.loadingCount=g,this.col1=d,this.col2=p,g||(this.images=[])},loadImages:function(){for(var t=[{pic:"../../../static/test/1.jpg",height:0},{pic:"../../../static/test/2.jpg",height:0},{pic:"../../../static/test/3.jpg",height:0},{pic:"../../../static/test/4.jpg",height:0},{pic:"../../../static/test/5.jpg",height:0},{pic:"../../../static/test/6.jpg",height:0},{pic:"../../../static/test/7.jpg",height:0},{pic:"../../../static/test/8.jpg",height:0},{pic:"../../../static/test/9.jpg",height:0},{pic:"../../../static/test/10.jpg",height:0}],i="img-"+ +new Date,e=0;e<t.length;e++)t[e].id=i+"-"+e;this.loadingCount=t.length,this.images=t}}};i.default=c}).call(this,e("543d")["default"])},"2b4a":function(t,i,e){"use strict";e.r(i);var n=e("bfb4"),c=e("7abb");for(var o in c)"default"!==o&&function(t){e.d(i,t,(function(){return c[t]}))}(o);e("fae2");var a,s=e("f0c5"),u=Object(s["a"])(c["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);i["default"]=u.exports},"7abb":function(t,i,e){"use strict";e.r(i);var n=e("01a4"),c=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);i["default"]=c.a},bfb4:function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return c})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return n}));var c=function(){var t=this,i=t.$createElement;t._self._c},o=[]},c05c:function(t,i,e){},f191:function(t,i,e){"use strict";(function(t){e("cb01");n(e("66fd"));var i=n(e("2b4a"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(i.default)}).call(this,e("543d")["createPage"])},fae2:function(t,i,e){"use strict";var n=e("c05c"),c=e.n(n);c.a}},[["f191","common/runtime","common/vendor"]]]);