<template>


    <div class="animated fadeIn">
        <!--<Icon type="android-add"></Icon>-->
        <div id="container">
            <Icon type="android-add-circle"></Icon>
            <i-button type="error" @click="addUser">添加模块</i-button>
        </div>
        <br>
        <Table :columns="columns1" :data="data1"></Table>
        <Page :total="totalCount" :page-size="pageSize" :current="pageNo" @on-change="gopage" align="center"></Page>
        <Modal
                v-model="modal1"
                title="编辑模块"
                @on-ok="update"
                @on-cancel="cancel" width="60%">
            <Form ref="updateForm" :model="dataForm" :rules="ruleCustom" :label-width="80">
                <Row>

                    <Col span="14">
                    <FormItem label="等级" prop="ctype"  >
                        <RadioGroup v-model="dataForm.ctype"   @on-change="changeCType" >
                            <Radio  label="0">主菜单</Radio>
                            <Radio  label="1">左侧菜单</Radio>
                            <Radio  label="2">按钮</Radio>
                            <Radio  label="3">链接</Radio>
                            <Radio  label="4">状态</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="父模块" prop="parentId"  >
                        <Select v-model="dataForm.parentId" filterable>
                            <Option v-for="item in moduleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="登录名" prop="name"  >
                        <Input type="text" v-model="dataForm.name"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="层数" prop="layerNum"  >
                        <Input type="text" v-model="dataForm.layerNum"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="权限标识" prop="cpermission"  >
                        <Input type="text" v-model="dataForm.cpermission"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="链接" prop="curl"  >
                        <Input type="text" v-model="dataForm.curl"/>
                    </FormItem>
                    </Col>
                </Row>

                <Row>


                    <Col span="11">
                    <FormItem label="状态" prop="state"  >
                        <Radio-group v-model="dataForm.state" type="button">
                            <Radio label="1" >启用</Radio>
                            <Radio label="0">停用</Radio>
                        </Radio-group>
                    </FormItem>
                    </Col>
                </Row>


                <Row>
                    <Col span="11">

                    <FormItem label="排序号" prop="orderNo"  >
                        <Input type="text" v-model="dataForm.orderNo"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="说明" prop="remark"  >
                        <Input type="textarea" v-model="dataForm.remark"/>
                    </FormItem>
                    </Col>
                </Row>

            </Form>
        </Modal>
        <Modal
                v-model="modal2"
                title="添加模块"
                @on-ok="add"
                @on-cancel="cancel" width="60%">
            <Form ref="dataForm" :model="dataForm" :rules="ruleCustom" :label-width="80">


                <Row>

                    <Col span="14">
                    <FormItem label="等级" prop="ctype"  >
                        <RadioGroup v-model="dataForm.ctype"   @on-change="changeCType" >
                            <Radio  label="0">主菜单</Radio>
                            <Radio  label="1">左侧菜单</Radio>
                            <Radio  label="2">按钮</Radio>
                            <Radio  label="3">链接</Radio>
                            <Radio  label="4">状态</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="父模块" prop="parentId"  >
                        <Select v-model="dataForm.parentId" filterable>
                            <Option v-for="item in moduleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="登录名" prop="name"  >
                        <Input type="text" v-model="dataForm.name"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="层数" prop="layerNum"  >
                        <Input type="text" readonly v-model="dataForm.layerNum"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="权限标识" prop="cpermission"  >
                        <Input type="text" v-model="dataForm.cpermission"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="链接" prop="curl"  >
                        <Input type="text" v-model="dataForm.curl"/>
                    </FormItem>
                    </Col>
                </Row>

                <Row>


                    <Col span="11">
                    <FormItem label="状态" prop="state"  >
                        <Radio-group v-model="dataForm.state" type="button">
                            <Radio label="1" >启用</Radio>
                            <Radio label="0">停用</Radio>
                        </Radio-group>
                    </FormItem>
                    </Col>
                </Row>


                <Row>
                    <Col span="11">

                    <FormItem label="排序号" prop="orderNo"  >
                        <Input type="text" v-model="dataForm.orderNo"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="说明" prop="remark"  >
                        <Input type="textarea" v-model="dataForm.remark"/>
                    </FormItem>
                    </Col>
                </Row>

            </Form>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import fetch from 'utils/fetch';

    export default {
        data() {
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入模块名'));
                }
            };
            const validateAddr = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入地址'));
                }
            };
            const validateid = (rule, value, callback) => {
                if (value==='') {
                    return callback(new Error('年龄不能为空'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入整数'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18！'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                tempIndex:0,
                pageSize:20,
                pageNo:1,
                totalPage:0,
                totalCount:0,
                columns1: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '模块名',
                        key: 'name'
                    },
                    {
                        title: '层数',
                        key: 'layerNum'
                    },
                    {
                        title: '权限标识',
                        key: 'cpermission'
                    },
                    {
                        title: '链接',
                        key: 'curl'
                    },
                    {
                        title: '类型',
                        key: 'ctype',
                        filters: [
                            {
                                label: '主菜单',
                                value: 0
                            },
                            {
                                label: '左侧菜单',
                                value: 1
                            },
                            {
                                label: '按钮',
                                value: 2
                            },
                            {
                                label: '链接',
                                value: 3
                            },
                            {
                                label: '状态',
                                value: 4
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 0) {
                                return row.ctype===0;
                            } else if (value === 1) {
                                return row.ctype===1;
                            }else if (value === 2) {
                                return row.ctype===2;
                            }else if (value === 3) {
                                return row.ctype===3;
                            }else if (value === 4) {
                                return row.ctype===4;
                            }
                        },
                        render: (h, params) => {
                            const task_status=parseInt(params.row.state);

                            if(task_status===0)
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "green"
                                        }
                                    }, "主菜单"),
                                ]);

                            else if(task_status===1)
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "green"
                                        }
                                    }, "左侧菜单"),
                                ]);
                            else if(task_status===2)
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "green"
                                        }
                                    }, "按钮"),
                                ]);
                            else if(task_status===3)
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "green"
                                        }
                                    }, "链接"),
                                ]);
                            else if(task_status===4)
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "green"
                                        }
                                    }, "状态"),
                                ]);
                        }
                    },
                    {
                        title: '状态',
                        ellipsis:'true',
                        key:'state',
                        filters: [
                            {
                                label: '启用',
                                value: 1
                            },
                            {
                                label: '禁用',
                                value: 0
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.state===1;
                            } else if (value === 0) {
                                return row.state===0;
                            }
                        },
                        render: (h, params) => {
                            const task_status=parseInt(params.row.state);

                            if(task_status===1)
                                return h('div', [
                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "green"
                                        }
                                    }, "启用"),
                                ]);

                            else if(task_status===0)
                                return h('div', [

                                    h('Tag', {
                                        props: {
                                            type: 'dot',
                                            color: "red"
                                        }
                                    }, "禁用"),
                                ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                self: this,
                data1: [

                ],
                modal1: false,
                modal2: false,
                dataForm: {
                    "name":"",
                    "moduleName": "",
                    "layerNum": "1",
                    "cpermission": "",
                    "curl": "",
                    "ctype": "0",
                    "state": "1",
                    "remark": "",
                    "orderNo": "",
                    "parentId": ""
                },
                moduleList:{},
                ruleCustom: {
//                    moduleName: [
//                        { validator: validateUser, trigger: 'blur' }
//                    ],
//                    id: [
//                        { validator: validateid, trigger: 'blur' }
//                    ]
                },
                moduleList: {},
                moduleList:{},
                degreeList:[
                    {
                        value: '0',
                        label: '超级管理员'
                    },
                    {
                        value: '1',
                        label: '跨部门跨人员'
                    },
                    {
                        value: '2',
                        label: '管理所有下属部门和人员'
                    },
                    {
                        value: '3',
                        label: '管理本部门'
                    },
                    {
                        value: '4',
                        label: '普通员工'
                    }
                ],
                model11: '',
                model12: []
            }
        },
        methods: {
            addUser(){
                this.modal2=true;

                //初始化父模块列表
                this.moduleList = {};

            },
            add(){
                const dataForm = this.dataForm;

                fetch({
                    url: '/system/module',
                    method: 'post',
                    data:dataForm
                }).then((result) => {
                    this.data1.unshift(result.data);
                    this.$Message.success('Success!');
                });
            },
            changeCType(type){
                    this.dataForm.layerNum = parseInt(type)+1;

                    fetch({
                        url: '/system/module/getParent/'+type,
                        method: 'get'
                    }).then((result) => {
                        this.moduleList=result.data;
                    });
            },
            edit (index) {
                this.modal1=true;
                this.tempIndex=index;
                var editUser =this.data1[index];

                this.dataForm = editUser;
                //radio组件lavle接受字符串，因此自己转换一下 int -> string
                this.dataForm.ctype=editUser.ctype+"";
                this.dataForm.state=editUser.state+"";

                //初始化父菜单列表
                this.changeCType(editUser.ctype);
            },
            remove (index) {
                const id = this.data1[index].id;
                fetch({
                    url: '/system/module',
                    method: 'delete',
                    params:{ids:id}
                }).then((result) => {
                    if(result.data=='1')
                    {
                        this.$Message.success('Success!');
                        this.data1.splice(index, 1);
                    }
                });
            },
            ok () {
                this.modal1 = false,
                        this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
            update () {
                const dataForm = this.dataForm;
                fetch({
                    url: '/system/module',
                    method: 'put',
                    data:dataForm
                }).then((result) => {
                    this.data1.unshift(result.data);
                    this.$Message.success('Success!');
                });

            },
            handleReset (moduleName) {
                this.$refs[moduleName].resetFields();
            },
            gopage(pageNo){
                const pageSize = this.pageSize;
                fetch({
                    url: '/system/module',
                    method: 'get',
                    params:{pageNo,pageSize}
                }).then((result) => {
                    this.data1=result.data.list;
                    this.pageNo=pageNo;
                    this.pageSize=pageSize;
                    this.totalCount=result.data.totalCount;
                });
            }
        },
        created:function(){
            this.gopage(this.pageNo);


        }
    }
</script>