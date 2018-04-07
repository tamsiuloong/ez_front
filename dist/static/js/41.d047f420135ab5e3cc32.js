webpackJsonp([41],{580:function(t,e,a){var o=a(20)(a(682),a(792),null,null,null);t.exports=o.exports},588:function(t,e,a){"use strict";function o(t){var e="",a=new Date;return a.setTime(t),e+=a.getFullYear(),e+="-"+n(a),e+="-"+s(a)}function n(t){var e="";return e=t.getMonth()+1,e<10&&(e="0"+e),e}function s(t){var e="";return e=t.getDate(),e<10&&(e="0"+e),e}e.a=o},682:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(208);a(588);e.default={data:function(){return{loading:!0,count:0,gourpId:null,pageSize:20,pageNo:1,totalPage:0,totalCount:0,deptNo:"",columns1:[{type:"selection",width:60,align:"center"},{title:"部门名字",key:"deptName"},{title:"状态",key:"state",render:function(t,e){var a=parseInt(e.row.state);return 0===a?"不可用":1===a?"可用":"unkown"}}],self:this,data1:[],modal1:!1,modal2:!1,updateForm:{id:"",deptName:"",parentId:"",state:""},addForm:{deptName:"",parentId:"",state:"1"},ruleCustom:{deptName:[{required:!0,message:"不能为空",trigger:"blur"}],state:[{required:!0,message:"状态不能为空",trigger:"blur"}]}}},methods:{reset:function(t){this.$refs[t].resetFields()},addDept:function(){this.modal2=!0},add:function(){var t=this;this.$refs.addForm.validate(function(e){if(e){var n=t.addForm;a.i(o.a)({url:"/system/dept",method:"post",data:n}).then(function(e){t.gopage(t.pageNo),t.$refs.addForm.resetFields(),t.$Message.success("Success!"),t.modal2=!1})}else t.$Message.error("表单验证失败"),setTimeout(function(){t.loading=!1,t.$nextTick(function(){t.loading=!0})},1e3)})},change:function(t){1==t.length&&(this.updateForm=t[0]),this.setGroupId(t)},setGroupId:function(t){this.groupId=[],this.count=t.length;for(var e=0;e<t.length;e++)this.groupId.push(t[e].id)},edit:function(){1!=this.count?(this.modal1=!1,this.$Message.warning("请至少并只能选择一项")):(this.modal1=!0,this.updateForm.state=this.updateForm.state+"")},remove:function(){var t=this;null!=this.groupId&&""!=this.groupId?a.i(o.a)({url:"/system/dept",method:"delete",data:this.groupId}).then(function(e){"1"==e.data&&(t.$Message.success("Success!"),t.gopage(t.pageNo))}):this.$Message.warning("请至少选择一项")},update:function(){var t=this;this.$refs.updateForm.validate(function(e){e?a.i(o.a)({url:"/system/dept",method:"put",data:t.updateForm}).then(function(e){t.modal1=!1,t.$Message.success("Success!"),t.gopage(t.pageNo)}):(t.$Message.error("表单验证失败"),setTimeout(function(){t.loading=!1,t.$nextTick(function(){t.loading=!0})},1e3))})},handleReset:function(t){this.$refs[t].resetFields()},gopage:function(){var t=this,e=this.pageNo,n=this.pageSize,s=this.deptNo;a.i(o.a)({url:"/system/dept",method:"get",params:{pageNo:e,pageSize:n,deptNo:s}}).then(function(a){t.data1=a.data.list,t.pageNo=e,t.pageSize=n,t.totalCount=a.data.totalCount})},submit:function(){var t=this;null!=this.groupId&&""!=this.groupId?a.i(o.a)({url:"/system/dept/submit",method:"put",data:this.groupId}).then(function(e){"1"==e.data&&(t.$Message.success("Success!"),t.gopage())}):this.$Message.warning("请至少选择一项")},cancel:function(){this.$Message.info("点击了取消")}},mounted:function(){this.gopage()}}},792:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"animated fadeIn"},[a("div",[a("Row",{staticStyle:{"margin-bottom":"25px"}},[a("Col",{attrs:{span:"8"}},[t._v("部门名字：\n            "),a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入..."},model:{value:t.deptNo,callback:function(e){t.deptNo=e},expression:"deptNo"}})],1),t._v(" "),a("Col",{attrs:{span:"8"}},[a("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:function(e){t.search()}}},[t._v("搜索")])],1)],1)],1),t._v(" "),a("div",[a("ul",[a("li",[a("Button",{attrs:{type:"primary",icon:"plus-round"},on:{click:function(e){t.addDept()}}},[t._v("新建")]),t._v(" "),a("Button",{attrs:{type:"success",icon:"wrench"},on:{click:function(e){t.edit()}}},[t._v("修改")]),t._v(" "),a("Button",{attrs:{type:"error",icon:"trash-a"},on:{click:function(e){t.remove()}}},[t._v("删除")])],1),t._v(" "),a("li",[a("div",{staticStyle:{padding:"10px 0"}},[a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1},on:{"on-selection-change":function(e){t.change(e)}}})],1)]),t._v(" "),a("li",[a("div",{staticStyle:{"text-align":"right"}},[a("Page",{attrs:{total:t.totalCount,"page-size":t.pageSize,current:t.pageNo,align:"center"},on:{"on-change":t.gopage}})],1)])])]),t._v(" "),a("Modal",{attrs:{title:"编辑部门",width:"60%","mask-closable":!1,loading:t.loading},on:{"on-ok":t.update,"on-cancel":t.cancel},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[a("Form",{ref:"updateForm",attrs:{model:t.updateForm,rules:t.ruleCustom,"label-width":80}},[a("Row",[a("Col",{attrs:{span:"11"}},[a("FormItem",{attrs:{label:"部门名字",prop:"deptName"}},[a("Input",{attrs:{type:"text"},model:{value:t.updateForm.deptName,callback:function(e){t.updateForm.deptName=e},expression:"updateForm.deptName"}})],1)],1),t._v(" "),a("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),t._v(" "),a("Col",{attrs:{span:"11"}},[a("FormItem",{attrs:{label:"状态",prop:"state"}},[a("RadioGroup",{attrs:{type:"button"},model:{value:t.updateForm.state,callback:function(e){t.updateForm.state=e},expression:"updateForm.state"}},[a("Radio",{attrs:{label:"0"}},[t._v("不可用")]),t._v(" "),a("Radio",{attrs:{label:"1"}},[t._v("可用")])],1)],1)],1)],1)],1)],1),t._v(" "),a("Modal",{attrs:{title:"添加部门","mask-closable":!1,loading:t.loading,width:"60%"},on:{"on-ok":t.add,"on-cancel":t.cancel},model:{value:t.modal2,callback:function(e){t.modal2=e},expression:"modal2"}},[a("Form",{ref:"addForm",attrs:{model:t.addForm,rules:t.ruleCustom,"label-width":80}},[a("Row",[a("Col",{attrs:{span:"11"}},[a("FormItem",{attrs:{label:"部门名字",prop:"deptName"}},[a("Input",{attrs:{type:"text"},model:{value:t.addForm.deptName,callback:function(e){t.addForm.deptName=e},expression:"addForm.deptName"}})],1)],1),t._v(" "),a("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),t._v(" "),a("Col",{attrs:{span:"11"}})],1)],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=41.d047f420135ab5e3cc32.js.map