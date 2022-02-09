(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"18ab":function(t,a,n){"use strict";var u;n.d(a,"b",(function(){return e})),n.d(a,"c",(function(){return o})),n.d(a,"a",(function(){return u}));var e=function(){var t=this,a=t.$createElement;t._self._c},o=[]},"7dc1":function(t,a,n){"use strict";n.r(a);var u=n("18ab"),e=n("c76b");for(var o in e)"default"!==o&&function(t){n.d(a,t,(function(){return e[t]}))}(o);var r,c=n("f0c5"),i=Object(c["a"])(e["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);a["default"]=i.exports},bffa:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,Custom:this.Custom}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,n=this.bgImage,u="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(n,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},isCustom:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})},toHome:function(){t.reLaunch({url:"/pages/ground/goodsGround"})}}};a.default=n}).call(this,n("543d")["default"])},c76b:function(t,a,n){"use strict";n.r(a);var u=n("bffa"),e=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(a,t,(function(){return u[t]}))}(o);a["default"]=e.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7dc1"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
