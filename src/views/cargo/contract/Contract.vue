<template>


    <div class="animated fadeIn">
        <div>
        <Row style="margin-bottom: 25px;">
        <Col span="8">合同号：
        <Input v-model="contractNo" placeholder="请输入..." style="width:200px"/>
        </Col>
        <Col span="8"><Button type="primary" shape="circle" icon="ios-search" @click="search()">搜索</Button></Col>
        </Row>
        </div>
        <div>
            <ul>
                <li>
                    <Button type="primary" icon="plus-round" @click="addContract()">新建</Button>
                    <Button type="success" icon="wrench" @click="edit()">修改</Button>
                    <Button type="error" icon="trash-a" @click="remove()">删除</Button>
                    <Button type="warning"  @click="submit()">提交</Button>
                    <Button type="info"  @click="cancel()">取消</Button>
                </li>
                <li>
                    <div style="padding: 10px 0;">
                        <Table :columns="columns1" :data="data1" @on-selection-change="s=>{change(s)}"></Table>
                        <!--<Table border :columns="columns1" :data="data1" :height="400" @on-selection-change="s=>{change(s)}" @on-row-dblclick="s=>{dblclick(s)}"></Table>-->
                    </div>
                </li>
                <li>
                    <div style="text-align: right;">
                        <Page :total="totalCount" :page-size="pageSize" :current="pageNo" @on-change="gopage"
                              align="center"></Page>
                    </div>
                </li>
            </ul>
        </div>


        <Modal
                v-model="modal1"
                title="编辑购销合同"
                width="60%">
            <Form ref="updateForm" :model="updateForm" :rules="ruleCustom" :label-width="80">
                <Row>
                    <Col span="11">
                    <FormItem label="客户名称" prop="customName">
                        <Input type="text" v-model="updateForm.customName"/>
                    </FormItem>
                    </Col>

                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="打印板式" prop="printStyle">
                        <RadioGroup v-model="updateForm.printStyle" type="button">
                            <Radio label="2">两款</Radio>
                            <Radio label="1">一款</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="合同号" prop="contractNo">
                        <Input type="text" v-model="updateForm.contractNo"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="收购方" prop="offeror">
                        <Input type="text" v-model="updateForm.offeror"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="制单人" prop="inputBy">
                        <Input type="text" v-model="updateForm.inputBy"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="审单人" prop="checkBy">
                        <Input type="text" v-model="updateForm.checkBy"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="验货员" prop="inspector">
                        <Input type="text" v-model="updateForm.inspector"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="签单日期" prop="signingDate">
                        <DatePicker type="date" v-model="updateForm.signingDate" format="yyyy-MM-dd"
                                    placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="重要程度" prop="importNum">
                        <RadioGroup v-model="updateForm.importNum" type="button">
                            <Radio label=3>★★★</Radio>
                            <Radio label=2>★★</Radio>
                            <Radio label=1>★</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="船期" prop="shipTime">
                        <DatePicker type="date" v-model="updateForm.shipTime" format="yyyy-MM-dd"
                                    placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="贸易条款" prop="tradeTerms">
                        <Input type="text" v-model="updateForm.tradeTerms"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="交货日期" prop="deliveryPeriod">
                        <DatePicker type="date" v-model="updateForm.deliveryPeriod" format="yyyy-MM-dd"
                                    placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="说明" prop="remark">
                        <Input type="textarea" v-model="updateForm.remark"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="要求" prop="crequest">
                        <Input type="textarea" v-model="updateForm.crequest"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem>
                        <Button type="primary" @click="update">保存</Button>
                        <Button type="ghost" @click="reset('updateForm')">清空</Button>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
        <Modal
                v-model="modal2"
                title="添加购销合同"
                @on-ok="add"
                @on-cancel="cancel" width="60%">
            <Form ref="addForm" :model="addForm" :rules="ruleCustom" :label-width="80">
                <Row>
                    <Col span="11">
                    <FormItem label="客户名称" prop="customName">
                        <Input type="text" v-model="addForm.customName"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="打印板式" prop="printStyle">
                        <RadioGroup v-model="addForm.printStyle" type="button">
                            <Radio label="2">两款</Radio>
                            <Radio label="1">一款</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="合同号" prop="contractNo">
                        <Input type="text" v-model="addForm.contractNo"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="收购方" prop="offeror">
                        <Input type="text" v-model="addForm.offeror"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="制单人" prop="inputBy">
                        <Input type="text" v-model="addForm.inputBy"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="审单人" prop="checkBy">
                        <Input type="text" v-model="addForm.checkBy"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="验货员" prop="inspector">
                        <Input type="text" v-model="addForm.inspector"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="签单日期" prop="signingDate">
                        <DatePicker type="date" v-model="addForm.signingDate" format="yyyy-MM-dd"
                                    placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="重要程度" prop="importNum">
                        <RadioGroup v-model="addForm.importNum" type="button">
                            <Radio label="3">★★★</Radio>
                            <Radio label="2">★★</Radio>
                            <Radio label="1">★</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="船期" prop="shipTime">
                        <DatePicker type="date" v-model="addForm.shipTime" format="yyyy-MM-dd" placeholder="Select date"
                                    style="width: 200px"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="贸易条款" prop="tradeTerms">
                        <Input type="text" v-model="addForm.tradeTerms"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="交货日期" prop="deliveryPeriod">
                        <DatePicker type="date" v-model="addForm.deliveryPeriod" format="yyyy-MM-dd"
                                    placeholder="Select date" style="width: 200px"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                    <FormItem label="说明" prop="remark">
                        <Input type="textarea" v-model="addForm.remark"/>
                    </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center"/>
                    <Col span="11">
                    <FormItem label="要求" prop="crequest">
                        <Input type="textarea" v-model="addForm.crequest"/>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                    <FormItem>
                        <Button type="primary" @click="add">保存</Button>
                        <Button type="ghost" @click="reset('addForm')">清空</Button>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import fetch from 'utils/fetch';
    import {dateFormat} from 'utils/date';

    export default {
        data() {
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入购销合同名'));
                }
            };
            const validateAddr = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入地址'));
                }
            };
            const validateid = (rule, value, callback) => {
                if (value === '') {
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
                count: 0,
                gourpId: null,
                tempIndex: 0,
                pageSize: 20,
                pageNo: 1,
                totalPage: 0,
                totalCount: 0,
                contractNo:"",
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '客户名字',
                        key: 'customName'
                    },
                    {
                        title: '合同号',
                        key: 'contractNo'
                    },
                    {
                        title: '货物数/附件数',
                        key: 'nums'
                    },
                    {
                        title: '制单人',
                        width: 90,
                        key: 'inputBy'
                    }/*,
                     {
                     title: '审单人',
                     key: 'checkBy'
                     }*/,
                    {
                        title: '验货员',
                        key: 'inspector'
                    },
                    {
                        title: '签单日期',
                        key: 'signingDate',
                        render: function (h, params) {
                            return h('div', dateFormat(this.row.signingDate))
                        }
                    },
                    {
                        title: '交货期限',
                        key: 'deliveryPeriod',
                        render: function (h, params) {
                            return h('div', dateFormat(this.row.deliveryPeriod))
                        }
                    },
                    {
                        title: '船期',
                        key: 'shipTime',
                        render: function (h, params) {
                            return h('div', dateFormat(this.row.shipTime))
                        }
                    }/*,
                     {
                     title: '贸易条款',
                     key: 'tradeTerms'
                     }*/,
                    {
                        title: '总金额',
                        width: 80,
                        key: 'totalAmount'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        width: 80,
                        render: (h, params) => {
                            const task_status = parseInt(params.row.state);
                            if (task_status === 0) {
                                return "草稿";
                            }
                            else if (task_status === 1) {
                                return "已上报待保运";
                            }
                            else if (task_status === 2) {
                                return "已保运";
                            }
                            else {
                                return "unkown"
                            }
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
                                            this.$router.push({path:'/cargo/contractProduct/'+(this.data1[params.index].id) })
                                        }
                                    }
                                }, '货物')
                            ]);
                        }
                    }
                ],
                self: this,
                data1: [],
                modal1: false,
                modal2: false,
                updateForm: {
                    id: '',
                    offeror: '',
                    contractNo: '',
                    signingDate: '',
                    inputBy: '',
                    checkBy: '',
                    inspector: '',
                    totalAmount: '',
                    crequest: '',
                    customName: '',
                    shipTime: '',
                    importNum: '',
                    deliveryPeriod: '',//交货日期
                    oldState: '',
                    outState: '',
                    tradeTerms: '',
                    printStyle: '',
                    remark: '',
                    state: ''
                },
                addForm: {
                    offeror: '1',
                    contractNo: '1',
                    signingDate: '2018-12-12',
                    inputBy: 'cgx',
                    checkBy: 'cgx',
                    inspector: 'cgx',
                    totalAmount: '0',
                    crequest: 'request',
                    customName: '客户名字',
                    shipTime: '2018-12-12',
                    importNum: '1',
                    deliveryPeriod: '2018-12-12',//交货日期
                    oldState: '',
                    outState: '',
                    tradeTerms: 'fob',
                    printStyle: '2',
                    remark: 'remark',
                    state: '0'
                },
                ruleCustom: {
                    contractName: [
                        {validator: validateUser, trigger: 'blur'}
                    ],
                    id: [
                        {validator: validateid, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            reset(form){
                this.$refs[form].resetFields();
            },
            addContract(){
                this.modal2 = true;
            },
            add(){

                const contract = this.addForm;

                fetch({
                    url: '/cargo/contract',
                    method: 'post',
                    data: contract
                }).then((result) => {
//                    this.data1.push(result.data);
                    this.gopage(this.pageNo);
                    this.$refs['addForm'].resetFields();
                    this.$Message.success('Success!');
                    this.modal2 = false;
                });
            },
            show (index) {
                this.$Modal.info({
                    title: '购销合同信息',
                    content: `姓名：${this.data1[index].contractName}`
                })
            },
            change(e){
                if (e.length == 1) {
                    this.updateForm = e[0];
                    //将importNum 转成字符串
                    this.updateForm.importNum = this.updateForm.importNum + "";
                }
                this.setGroupId(e);
            },
            setGroupId(e)
            {
                this.groupId = [];
                this.count = e.length;
                for (var i = 0; i < e.length; i++) {
                    this.groupId.push(e[i].id);
                }
            },
            edit () {
                if (this.count != 1) {
                    this.modal1 = false;
                    this.$Message.warning('请至少并只能选择一项');
                }
                else {
                    this.modal1 = true;
                }
            },
            remove () {
                if (this.groupId != null && this.groupId != "") {
                    fetch({
                        url: '/cargo/contract',
                        method: 'delete',
                        data: this.groupId
                    }).then((result) => {
                        if (result.data == '1') {
                            this.$Message.success('Success!');
                            this.gopage(this.pageNo);
                        }
                    });
                } else {
                    this.$Message.warning('请至少选择一项');
                }

            },
            update () {
                fetch({
                    url: '/cargo/contract',
                    method: 'put',
                    data: this.updateForm
                }).then((result) => {
                    this.modal1 = false,
                            this.$Message.success('Success!');
                    //刷新页面数据
                    this.gopage(this.pageNo);
                });
            },
            handleReset (form) {
                this.$refs[form].resetFields();
            },
            gopage(){
                const pageNo = this.pageNo;
                const pageSize = this.pageSize;
                const contractNo = this.contractNo;
                fetch({
                    url: '/cargo/contract/all',
                    method: 'get',
                    params: {pageNo, pageSize,contractNo}
                }).then((result) => {
                    this.data1 = result.data.list;
                    this.pageNo = pageNo;
                    this.pageSize = pageSize;
                    this.totalCount = result.data.totalCount;
                });
            },
            submit(){
                if (this.groupId != null && this.groupId != "") {
                    fetch({
                        url: '/cargo/contract/submit',
                        method: 'put',
                        data: this.groupId
                    }).then((result) => {
                        if (result.data == '1') {
                            this.$Message.success('Success!');
                            this.gopage();
                        }
                    });
                } else {
                    this.$Message.warning('请至少选择一项');
                }
            },
            cancel(){
                if (this.groupId != null && this.groupId != "") {
                    fetch({
                        url: '/cargo/contract/cancel',
                        method: 'put',
                        data: this.groupId
                    }).then((result) => {
                        if (result.data == '1') {
                            this.$Message.success('Success!');
                            this.gopage();
                        }
                    });
                } else {
                    this.$Message.warning('请至少选择一项');
                }
            },
            search(){
                this.gopage();
            }
        },
        mounted: function () {
            this.gopage()
        }
    }


</script>