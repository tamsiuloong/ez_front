webpackJsonp([43],{554:function(t,e,n){var i=n(20)(n(656),n(751),null,null,null);t.exports=i.exports},588:function(t,e,n){"use strict";function i(t){var e="",n=new Date;return n.setTime(t),e+=n.getFullYear(),e+="-"+a(n),e+="-"+o(n)}function a(t){var e="";return e=t.getMonth()+1,e<10&&(e="0"+e),e}function o(t){var e="";return e=t.getDate(),e<10&&(e="0"+e),e}e.a=i},656:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(208),a=n(588);e.default={data:function(){return{count:0,gourpId:null,pageSize:20,pageNo:1,totalPage:0,totalCount:0,columns1:[{type:"selection",width:60,align:"center"},{title:"货物数/附件数",key:"nums"},{title:"信用证号",key:"lcno"},{title:"装运港",width:90,key:"shipmentPort"},{title:"目的港",key:"destinationPort"},{title:"运输方式",key:"transportMode"},{title:"价格条件",key:"priceCondition"},{title:"制单日期",key:"inputDate",render:function(t,e){return t("div",n.i(a.a)(this.row.inputDate))}},{title:"状态",key:"state",width:80,render:function(t,e){var n=parseInt(e.row.state);return 0===n?"草稿":1===n?"已上报":2===n?"装箱":3===n?"委托":4===n?"发票":5===n?"财务":"unkown"}}],self:this,data1:[],modal1:!1,modal2:!1}},methods:{reset:function(t){this.$refs[t].resetFields()},change:function(t){1==t.length&&(this.updateForm=t[0],this.updateForm.importNum=this.updateForm.importNum+""),this.setGroupId(t)},setGroupId:function(t){this.groupId=[],this.count=t.length;for(var e=0;e<t.length;e++)this.groupId.push(t[e].id)},edit:function(){1!=this.count?(this.modal1=!1,this.$Message.warning("请至少并只能选择一项")):this.$router.push({path:"/cargo/exportEdit/"+this.groupId[0]})},remove:function(){var t=this;null!=this.groupId&&""!=this.groupId?n.i(i.a)({url:"/cargo/export",method:"delete",data:this.groupId}).then(function(e){"1"==e.data&&(t.$Message.success("Success!"),t.gopage(t.pageNo))}):this.$Message.warning("请至少选择一项")},handleReset:function(t){this.$refs[t].resetFields()},gopage:function(t){var e=this,a=this.pageSize;n.i(i.a)({url:"/cargo/export",method:"get",params:{pageNo:t,pageSize:a}}).then(function(n){e.data1=n.data.list,e.pageNo=t,e.pageSize=a,e.totalCount=n.data.totalCount})},submit:function(){var t=this;null!=this.groupId&&""!=this.groupId?n.i(i.a)({url:"/cargo/export/submit",method:"put",data:this.groupId}).then(function(e){"1"==e.data&&(t.$Message.success("Success!"),t.gopage(t.pageNo))}):this.$Message.warning("请至少选择一项")},cancel:function(){var t=this;null!=this.groupId&&""!=this.groupId?n.i(i.a)({url:"/cargo/export/cancel",method:"put",data:this.groupId}).then(function(e){"1"==e.data&&(t.$Message.success("Success!"),t.gopage(t.pageNo))}):this.$Message.warning("请至少选择一项")}},mounted:function(){this.gopage(this.pageNo)}}},751:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"animated fadeIn"},[n("div",[n("ul",[n("li",[n("Button",{attrs:{type:"success",icon:"wrench"},on:{click:function(e){t.edit()}}},[t._v("修改")]),t._v(" "),n("Button",{attrs:{type:"error",icon:"trash-a"},on:{click:function(e){t.remove()}}},[t._v("删除")]),t._v(" "),n("Button",{attrs:{type:"warning"},on:{click:function(e){t.submit()}}},[t._v("提交")]),t._v(" "),n("Button",{attrs:{type:"info"},on:{click:function(e){t.cancel()}}},[t._v("取消")])],1),t._v(" "),n("li",[n("div",{staticStyle:{padding:"10px 0"}},[n("Table",{attrs:{border:"",columns:t.columns1,data:t.data1},on:{"on-selection-change":function(e){t.change(e)}}})],1)]),t._v(" "),n("li",[n("div",{staticStyle:{"text-align":"right"}},[n("Page",{attrs:{total:t.totalCount,"page-size":t.pageSize,current:t.pageNo,align:"center"},on:{"on-change":t.gopage}})],1)])])])])},staticRenderFns:[]}}});
//# sourceMappingURL=43.3b8f0deb28934ef3f7f9.js.map