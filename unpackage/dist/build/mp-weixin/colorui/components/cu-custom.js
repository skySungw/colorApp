(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"8e0a":function(t,n,a){"use strict";a.r(n);var u=a("b391"),e=a.n(u);for(var o in u)"default"!==o&&function(t){a.d(n,t,(function(){return u[t]}))}(o);n["default"]=e.a},b391:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,Custom:this.Custom}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,n=this.CustomBar,a=this.bgImage,u="height:".concat(n,"px;padding-top:").concat(t,"px;");return this.bgImage&&(u="".concat(u,"background-image:url(").concat(a,");")),u}},props:{bgColor:{type:String,default:""},isBack:{type:[Boolean,String],default:!1},isCustom:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})},toHome:function(){t.reLaunch({url:"/pages/ground/ground"})}}};n.default=a}).call(this,a("543d")["default"])},b65c:function(t,n,a){"use strict";var u;a.d(n,"b",(function(){return e})),a.d(n,"c",(function(){return o})),a.d(n,"a",(function(){return u}));var e=function(){var t=this,n=t.$createElement;t._self._c},o=[]},fc85:function(t,n,a){"use strict";a.r(n);var u=a("b65c"),e=a("8e0a");for(var o in e)"default"!==o&&function(t){a.d(n,t,(function(){return e[t]}))}(o);var r,c=a("f0c5"),i=Object(c["a"])(e["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);n["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fc85"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
