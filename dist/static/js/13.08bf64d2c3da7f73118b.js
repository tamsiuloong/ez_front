webpackJsonp([13],{552:function(t,e,a){var o=a(20)(a(654),a(777),null,null,null);t.exports=o.exports},584:function(t,e,a){t.exports={default:a(585),__esModule:!0}},585:function(t,e,a){a(587),t.exports=a(17).Number.isInteger},586:function(t,e,a){var o=a(30),r=Math.floor;t.exports=function(t){return!o(t)&&isFinite(t)&&r(t)===t}},587:function(t,e,a){var o=a(24);o(o.S,"Number",{isInteger:a(586)})},588:function(t,e,a){"use strict";function o(t){var e="",a=new Date;return a.setTime(t),e+=a.getFullYear(),e+="-"+r(a),e+="-"+n(a)}function r(t){var e="";return e=t.getMonth()+1,e<10&&(e="0"+e),e}function n(t){var e="";return e=t.getDate(),e<10&&(e="0"+e),e}e.a=o},654:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(584),r=a.n(o),n=a(208);a(588);e.default={data:function(){var t=this,e=function(t,e,a){""===e&&a(new Error("请输入购销合同货物名"))},a=function(t,e,a){if(""===e)return a(new Error("年龄不能为空"));setTimeout(function(){r()(e)?e<18?a(new Error("必须年满18！")):a():a(new Error("请输入整数"))},1e3)};return{contractId:null,count:0,gourpId:null,tempIndex:0,pageSize:20,pageNo:1,totalPage:0,totalCount:0,columns1:[{type:"selection",width:60,align:"center"},{title:"厂家",key:"factoryName"},{title:"货号",key:"productNo"},{title:"装率",key:"loadingRate"},{title:"箱数",width:90,key:"boxNum"},{title:"包装单位",key:"packingUnit"},{title:"数量",key:"cnumber"},{title:"单价",key:"price"},{title:"总金额",key:"amount"},{title:"操作",key:"action",align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.$router.push({path:"/cargo/extCproduct/"+t.data1[a.index].id})}}},"附件")])}}],self:this,data1:[],modal1:!1,modal2:!1,updateForm:{factory:{id:""},contract:{id:""},factoryName:"",productNo:"",productImage:"",productDesc:"",loadingRate:"",boxNum:"",packingUnit:"",cnumber:"",outNumber:"",finished:"",productRequest:"",price:"",amount:"",orderNo:""},addForm:{factory:{id:""},contract:{id:""},factoryName:"",productNo:"",productImage:"",productDesc:"",loadingRate:"",boxNum:"",packingUnit:"",cnumber:"",outNumber:"",finished:"",productRequest:"",price:"",amount:"",orderNo:""},ruleCustom:{contractProductName:[{validator:e,trigger:"blur"}],id:[{validator:a,trigger:"blur"}]}}},methods:{changeFactory:function(t,e){t.factoryName=e.label},reset:function(t){this.$refs[t].resetFields()},addContractProduct:function(){this.modal2=!0},add:function(){var t=this;this.addForm.contract.id=this.contractId;var e=this.addForm;a.i(n.a)({url:"/cargo/contractProduct",method:"post",data:e}).then(function(e){t.gopage(t.pageNo),t.$refs.addForm.resetFields(),t.$Message.success("Success!"),t.modal2=!1})},show:function(t){this.$Modal.info({title:"购销合同货物信息",content:"姓名："+this.data1[t].contractProductName})},change:function(t){1==t.length&&(this.updateForm=t[0],null==this.updateForm.factory&&(this.updateForm.factory={id:null})),this.setGroupId(t)},setGroupId:function(t){this.groupId=[],this.count=t.length;for(var e=0;e<t.length;e++)this.groupId.push(t[e].id)},edit:function(){1!=this.count?(this.modal1=!1,this.$Message.warning("请至少并只能选择一项")):this.modal1=!0},remove:function(){var t=this;null!=this.groupId&&""!=this.groupId?a.i(n.a)({url:"/cargo/contractProduct",method:"delete",data:this.groupId}).then(function(e){"1"==e.data&&(t.$Message.success("Success!"),t.gopage(t.pageNo))}):this.$Message.warning("请至少选择一项")},update:function(){var t=this;a.i(n.a)({url:"/cargo/contractProduct",method:"put",data:this.updateForm}).then(function(e){t.modal1=!1,t.$Message.success("Success!"),t.gopage(t.pageNo)})},handleReset:function(t){this.$refs[t].resetFields()},gopage:function(t){var e=this,o=this.pageSize,r=this.contractId;a.i(n.a)({url:"/cargo/contractProduct",method:"get",params:{pageNo:t,pageSize:o,contractId:r}}).then(function(a){e.data1=a.data.list,e.pageNo=t,e.pageSize=o,e.totalCount=a.data.totalCount})}},mounted:function(){var t=this;this.contractId=this.$route.params.id,this.gopage(this.pageNo),a.i(n.a)({url:"/cargo/factory/getAll",method:"get",params:{cType:"货物"}}).then(function(e){t.factoryList=e.data})}}},777:function(t,e){t.exports={render:function(){var t=this,e=this,a=e.$createElement,o=e._self._c||a;return o("div",{staticClass:"animated fadeIn"},[o("div",[o("ul",[o("li",[o("Button",{attrs:{type:"primary",icon:"plus-round"},on:{click:function(t){e.addContractProduct()}}},[e._v("新建")]),e._v(" "),o("Button",{attrs:{type:"success",icon:"wrench"},on:{click:function(t){e.edit()}}},[e._v("修改")]),e._v(" "),o("Button",{attrs:{type:"error",icon:"trash-a"},on:{click:function(t){e.remove()}}},[e._v("删除")]),e._v(" "),o("Button",{attrs:{type:"info",icon:"arrow-left-c"},on:{click:function(e){t.$router.go(-1)}}},[e._v("返回")])],1),e._v(" "),o("li",[o("div",{staticStyle:{padding:"10px 0"}},[o("Table",{attrs:{columns:e.columns1,data:e.data1},on:{"on-selection-change":function(t){e.change(t)}}})],1)]),e._v(" "),o("li",[o("div",{staticStyle:{"text-align":"right"}},[o("Page",{attrs:{total:e.totalCount,"page-size":e.pageSize,current:e.pageNo,align:"center"},on:{"on-change":e.gopage}})],1)])])]),e._v(" "),o("Modal",{attrs:{title:"编辑购销合同货物",width:"60%"},model:{value:e.modal1,callback:function(t){e.modal1=t},expression:"modal1"}},[o("Form",{ref:"updateForm",attrs:{model:e.updateForm,rules:e.ruleCustom,"label-width":80}},[o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"生产厂家",prop:"factory.id"}},[o("Select",{attrs:{filterable:"","label-in-value":"true"},on:{"on-change":function(a){return e.changeFactory(t.updateFrom,a)}},model:{value:e.updateForm.factory.id,callback:function(t){e.updateForm.factory.id=t},expression:"updateForm.factory.id"}},e._l(e.factoryList,function(t){return o("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.factoryName))])}))],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"货号",prop:"productNo"}},[o("Input",{attrs:{type:"text"},model:{value:e.updateForm.productNo,callback:function(t){e.updateForm.productNo=t},expression:"updateForm.productNo"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"数量",prop:"cnumber"}},[o("Input",{attrs:{type:"text"},model:{value:e.updateForm.cnumber,callback:function(t){e.updateForm.cnumber=t},expression:"updateForm.cnumber"}})],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"包装单位",prop:"packingUnit"}},[o("Radio-group",{attrs:{type:"button"},model:{value:e.updateForm.packingUnit,callback:function(t){e.updateForm.packingUnit=t},expression:"updateForm.packingUnit"}},[o("Radio",{attrs:{label:"PCS"}},[e._v("只")]),e._v(" "),o("Radio",{attrs:{label:"SETS"}},[e._v("套")])],1)],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"装率",prop:"loadingRate"}},[o("Input",{attrs:{type:"text"},model:{value:e.updateForm.loadingRate,callback:function(t){e.updateForm.loadingRate=t},expression:"updateForm.loadingRate"}})],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"箱数",prop:"boxNum"}},[o("Input",{attrs:{type:"text"},model:{value:e.updateForm.boxNum,callback:function(t){e.updateForm.boxNum=t},expression:"updateForm.boxNum"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"单价",prop:"price"}},[o("Input",{attrs:{type:"text"},model:{value:e.updateForm.price,callback:function(t){e.updateForm.price=t},expression:"updateForm.price"}})],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"排序号",prop:"orderNo"}},[o("Input",{attrs:{type:"text"},model:{value:e.updateForm.orderNo,callback:function(t){e.updateForm.orderNo=t},expression:"updateForm.orderNo"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"货物描述",prop:"productDesc"}},[o("Input",{attrs:{type:"textarea"},model:{value:e.updateForm.productDesc,callback:function(t){e.updateForm.productDesc=t},expression:"updateForm.productDesc"}})],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"要求",prop:"productRequest"}},[o("Input",{attrs:{type:"textarea"},model:{value:e.updateForm.productRequest,callback:function(t){e.updateForm.productRequest=t},expression:"updateForm.productRequest"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"24"}},[o("FormItem",[o("Button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("保存")]),e._v(" "),o("Button",{attrs:{type:"ghost"},on:{click:function(t){e.reset("updateForm")}}},[e._v("清空")])],1)],1)],1)],1)],1),e._v(" "),o("Modal",{attrs:{title:"添加购销合同货物",width:"60%"},model:{value:e.modal2,callback:function(t){e.modal2=t},expression:"modal2"}},[o("Form",{ref:"addForm",attrs:{model:e.addForm,rules:e.ruleCustom,"label-width":80}},[o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"生产厂家",prop:"factory.id"}},[o("Select",{attrs:{filterable:"","label-in-value":"true"},on:{"on-change":function(a){return e.changeFactory(t.addForm,a)}},model:{value:e.addForm.factory.id,callback:function(t){e.addForm.factory.id=t},expression:"addForm.factory.id"}},e._l(e.factoryList,function(t){return o("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.factoryName))])}))],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"货号",prop:"productNo"}},[o("Input",{attrs:{type:"text"},model:{value:e.addForm.productNo,callback:function(t){e.addForm.productNo=t},expression:"addForm.productNo"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"数量",prop:"cnumber"}},[o("Input",{attrs:{type:"text"},model:{value:e.addForm.cnumber,callback:function(t){e.addForm.cnumber=t},expression:"addForm.cnumber"}})],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"包装单位",prop:"packingUnit"}},[o("Radio-group",{attrs:{type:"button"},model:{value:e.addForm.packingUnit,callback:function(t){e.addForm.packingUnit=t},expression:"addForm.packingUnit"}},[o("Radio",{attrs:{label:"PCS"}},[e._v("只")]),e._v(" "),o("Radio",{attrs:{label:"SETS"}},[e._v("套")])],1)],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"装率",prop:"loadingRate"}},[o("Input",{attrs:{type:"text"},model:{value:e.addForm.loadingRate,callback:function(t){e.addForm.loadingRate=t},expression:"addForm.loadingRate"}})],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"箱数",prop:"boxNum"}},[o("Input",{attrs:{type:"text"},model:{value:e.addForm.boxNum,callback:function(t){e.addForm.boxNum=t},expression:"addForm.boxNum"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"单价",prop:"price"}},[o("Input",{attrs:{type:"text"},model:{value:e.addForm.price,callback:function(t){e.addForm.price=t},expression:"addForm.price"}})],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"排序号",prop:"orderNo"}},[o("Input",{attrs:{type:"text"},model:{value:e.addForm.orderNo,callback:function(t){e.addForm.orderNo=t},expression:"addForm.orderNo"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"货物描述",prop:"productDesc"}},[o("Input",{attrs:{type:"textarea"},model:{value:e.addForm.productDesc,callback:function(t){e.addForm.productDesc=t},expression:"addForm.productDesc"}})],1)],1),e._v(" "),o("Col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}}),e._v(" "),o("Col",{attrs:{span:"11"}},[o("FormItem",{attrs:{label:"要求",prop:"productRequest"}},[o("Input",{attrs:{type:"textarea"},model:{value:e.addForm.productRequest,callback:function(t){e.addForm.productRequest=t},expression:"addForm.productRequest"}})],1)],1)],1),e._v(" "),o("Row",[o("Col",{attrs:{span:"24"}},[o("FormItem",[o("Button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("保存")]),e._v(" "),o("Button",{attrs:{type:"ghost"},on:{click:function(t){e.reset("addForm")}}},[e._v("清空")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=13.08bf64d2c3da7f73118b.js.map