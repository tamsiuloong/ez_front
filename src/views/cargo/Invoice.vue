<template>


    <div class="animated fadeIn">
        <!--<Icon type="android-add"></Icon>-->
        <div id="container">
            <Icon type="android-add-circle"></Icon>
            <i-button type="error" @click="addDept">添加部门</i-button>
        </div>
        <br>
        <Table :columns="columns1" :data="data1"></Table>
        <Page :total="totalCount" :page-size="pageSize" :current="pageNo" @on-change="gopage" align="center"></Page>
        <Modal
                v-model="modal1"
                title="编辑用户"
                @on-ok="update"
                @on-cancel="cancel" width="60%">
            <Form ref="updateForm" :model="updateForm" :rules="ruleCustom" :label-width="80">
                <FormItem label="部门名字" prop="deptName">
                    <Input type="text" v-model="updateForm.deptName"></Input>
                </FormItem>
                <!--<FormItem>-->
                    <!--<Button type="primary" @click="update('updateForm')">保存</Button>-->
                    <!--<Button type="ghost" @click="handleReset('updateForm')" style="margin-left: 8px">Reset</Button>-->
                <!--</FormItem>-->
            </Form>
        </Modal>
        <Modal
                v-model="modal2"
                title="添加用户"
                @on-ok="add"
                @on-cancel="cancel" width="60%">
            <Form ref="addForm" :model="addForm" :rules="ruleCustom" :label-width="80">
                <FormItem label="部门名字" prop="deptName">
                    <Input type="text" v-model="addForm.deptName"></Input>
                </FormItem>

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
                    callback(new Error('请输入用户名'));
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
                pageSize:2,
                pageNo:1,
                totalPage:0,
                totalCount:0,
                columns1: [
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '部门名字',
                        key: 'deptName'
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
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
                    {
                        deptName: '王小明',
                        id: 18
                    }
                ],
                modal1: false,
                modal2: false,
                updateForm: {
                    deptName: '',
                    id: ''
                },
                addForm: {
                    deptName: ''
                },
                ruleCustom: {
                    deptName: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    id: [
                        { validator: validateid, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            addDept(){
              this.modal2=true;
            },
            add(){

                const dept = this.addForm;

                fetch({
                    url: '/system/dept',
                    method: 'post',
                    data:dept
                }).then((result) => {
                    this.data1.unshift(result.data);
                    this.$Message.success('Success!');
                });
            },
            show (index) {
                this.$Modal.info({
                    title: '部门信息',
                    content: `姓名：${this.data1[index].deptName}`
                })
            },
            edit (index) {
                this.modal1=true;
                this.tempIndex=index;
                this.updateForm.deptName=this.data1[index].deptName;
            },
            remove (index) {
                const id = this.data1[index].id;
                fetch({
                    url: '/system/dept',
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
            update (deptName) {
                this.data1[this.tempIndex].deptName=this.updateForm.deptName;
                const dept = this.data1[this.tempIndex];

                fetch({
                    url: '/system/dept',
                    method: 'put',
                    data:dept
                }).then((result) => {
                    this.$Message.success('Success!');
                });
            },
            handleReset (deptName) {
                this.$refs[deptName].resetFields();
            },
            gopage(pageNo){
                const pageSize = this.pageSize;
                fetch({
                    url: '/system/dept',
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
            this.gopage(this.pageNo)
        }
    }
</script>