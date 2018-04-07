<template>


    <div class="animated fadeIn">
        <!--<div>-->
        <!--<Row style="margin-bottom: 25px;">-->
        <!--<Col span="8">登录名：-->
        <!--<Input v-model="loginName" placeholder="请输入..." style="width:200px"></Input>-->
        <!--</Col>-->
        <!--<Col span="8"><Button type="primary" shape="circle" icon="ios-search" @click="search()">搜索</Button></Col>-->
        <!--</Row>-->
        <!--</div>-->
        <div>
            <ul>
                <li>
                    <Button type="success" icon="wrench" @click="edit()">修改</Button>
                    <Button type="error" icon="trash-a" @click="remove()">删除</Button>
                    <Button type="warning"  @click="submit()">提交</Button>
                    <Button type="info"  @click="cancel()">取消</Button>
                </li>
                <li>
                    <div style="padding: 10px 0;">
                        <Table border :columns="columns1" :data="data1" @on-selection-change="s=>{change(s)}"></Table>
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

    </div>
</template>

<script type="text/ecmascript-6">
    import fetch from 'utils/fetch';
    import {dateFormat} from 'utils/date';

    export default {
        data() {

            return {
                count: 0,
                gourpId: null,
                pageSize: 20,
                pageNo: 1,
                totalPage: 0,
                totalCount: 0,
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }/*,
                    {
                        title: '保运号',
                        key: 'id'
                    }*/,
                    {
                        title: '货物数/附件数',
                        key: 'nums'
                    },
                    {
                        title: '信用证号',
                        key: 'lcno'
                    },
                    {
                        title: '装运港',
                        width: 90,
                        key: 'shipmentPort'
                    },
                    {
                        title: '目的港',
                        key: 'destinationPort'
                    },
                    {
                        title: '运输方式',
                        key: 'transportMode'
                    },
                    {
                        title: '价格条件',
                        key: 'priceCondition'
                    },
                    {
                        title: '制单日期',
                        key: 'inputDate',
                        render: function (h, params) {
                            return h('div', dateFormat(this.row.inputDate))
                        }
                    },
                    {
                        title: '状态',
                        key: 'state',
                        width: 80,
                        render: (h, params) => {
//                            0-草稿 1-已上报 2-装箱 3-委托 4-发票 5-财务
                            const task_status = parseInt(params.row.state);
                            if (task_status === 0) {
                                return "草稿";
                            }
                            else if (task_status === 1) {
                                return "已上报";
                            }
                            else if (task_status === 2) {
                                return "装箱";
                            }
                            else if (task_status === 3) {
                                return "委托";
                            }
                            else if (task_status === 4) {
                                return "发票";
                            }
                            else if (task_status === 5) {
                                return "财务";
                            }
                            else {
                                return "unkown"
                            }
                        }
                    }
                ],
                self: this,
                data1: [],
                modal1: false,
                modal2: false
            }
        },
        methods: {
            reset(form){
                this.$refs[form].resetFields();
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
                    //跳转到编辑页面
                    this.$router.push({path:'/cargo/exportEdit/'+(this.groupId[0])});
                }
            },
            remove () {
                if (this.groupId != null && this.groupId != "") {
                    fetch({
                        url: '/cargo/export',
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
            handleReset (form) {
                this.$refs[form].resetFields();
            },
            gopage(pageNo){
                const pageSize = this.pageSize;
                fetch({
                    url: '/cargo/export',
                    method: 'get',
                    params: {pageNo, pageSize}
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
                        url: '/cargo/export/submit',
                        method: 'put',
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
            cancel(){
                if (this.groupId != null && this.groupId != "") {
                    fetch({
                        url: '/cargo/export/cancel',
                        method: 'put',
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
            }
        },
        mounted: function () {
            this.gopage(this.pageNo)
        }
    }


</script>