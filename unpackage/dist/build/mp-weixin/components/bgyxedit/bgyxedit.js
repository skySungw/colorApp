(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/bgyxedit/bgyxedit"],{4718:function(t,e,n){"use strict";n.r(e);var a=n("6490"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},6490:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"bgyxedit",props:{placeholderText:{type:String,default:"请输入内容..."},img:{type:Boolean,default:!0},text:{type:Boolean,default:!0},content:{type:String,default:""},taskinfodtv:{type:Array,default:function(){return[{type:"text",value:"",f:!1}]}},mtype:{type:Array,default:function(){return["text","img","video"]}},uploadurl:{type:String,default:""},showdone:{type:Boolean,default:!1},filename:{type:String,default:"uploadfile"}},data:function(){return{htmlinfo:""}},methods:{returnthisinfo:function(){this.$emit("bgyxchange",this.returninfo())},returninfo:function(){var t=this,e=t.taskinfodtv,n="";for(var a in e){var i=e[a];i.value&&("text"==i.type&&(n=n+'<p style="margin:5px auto;">'+i.value+"</p>"),"img"==i.type&&(n=n+'<p style="text-align:center;margin:5px auto;"><img style="width:300px;margin:auto;" src="'+i.value+'"></p>'),"video"==i.type&&(n=n+'<p style="text-align:center;margin:5px auto;"><video controls="controls" style="width:300px;margin:auto;" src="'+i.value+'"></video></p>'))}return n?(n='<p style="text-align:center;margin:5px auto;">'+n+"</p>",{html:n,data:e}):{html:"",data:e}},addvuetype:function(e){var n=this;0==e&&this.taskinfodtv.push({type:"text",value:"",f:!0}),1==e&&t.chooseImage({count:1,success:function(e){var a=e.tempFilePaths;t.showLoading({title:"上传中..."}),t.uploadFile({url:n.uploadurl,filePath:a[0],name:"img",success:function(e){console.log("uploadFileRes",e);var a=e.data;n.taskinfodtv.push({type:"img",value:a}),n.$emit("bgyxchange",n.returninfo()),t.hideLoading()}})}}),2==e&&t.chooseVideo({count:1,success:function(e){var a=e.tempFilePath;t.showLoading({title:"上传中..."}),t.uploadFile({url:n.uploadurl,filePath:a,name:"video",success:function(e){var a=e.data;n.taskinfodtv.push({type:"video",value:a}),n.$emit("bgyxchange",n.returninfo()),t.hideLoading()}})}})},delthisel:function(e,n){if(n)return!1;var a=this,i=this.taskinfodtv,o=["↑上移↑","↓下移↓"];"text"!=n&&o.push("删除"),t.showActionSheet({itemList:o,success:function(t){var n=t.tapIndex;if(0==n&&e>0){var o=i[e];for(var u in i[e]=i[e-1],i[e-1]=o,a.taskinfodtv=[],i)a.taskinfodtv.push(i[u]);a.$emit("bgyxchange",a.returninfo())}if(1==n&&e<i.length-1){o=i[e];for(var u in i[e]=i[e+1],i[e+1]=o,a.taskinfodtv=[],i)a.taskinfodtv.push(i[u]);a.$emit("bgyxchange",a.returninfo())}2==n&&(a.taskinfodtv.splice(e,1),a.$emit("bgyxchange",a.returninfo()))},fail:function(t){console.log(t.errMsg)}})}}};e.default=n}).call(this,n("543d")["default"])},a514:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},fa2e:function(t,e,n){"use strict";n.r(e);var a=n("a514"),i=n("4718");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);var u,r=n("f0c5"),l=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=l.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/bgyxedit/bgyxedit-create-component',
    {
        'components/bgyxedit/bgyxedit-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fa2e"))
        })
    },
    [['components/bgyxedit/bgyxedit-create-component']]
]);
