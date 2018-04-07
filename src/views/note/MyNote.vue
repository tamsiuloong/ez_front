<template>
    <div class="animated fadeIn">
        <div>
        <Row style="margin-bottom: 25px;">
        <Col span="8">笔记：
        <Input v-model="keyWord" placeholder="请输入..." style="width:200px"/>
        </Col>
        <Col span="8"><Button type="primary" shape="circle" icon="ios-search" @click="gopage()">搜索</Button></Col>
        </Row>
        </div>
        <div>
            <ul>
                <li>
                    <Button type="primary" icon="plus-round" @click="addNote()">新建</Button>
                    <Button type="success" icon="wrench" @click="edit()">修改</Button>
                    <Button type="error" icon="trash-a" @click="remove()">删除</Button>
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

        <Modal
                v-model="addModal"
                title="添加笔记"
                :mask-closable="false"
                :loading="loading"
                @on-ok="add"
                @on-cancel="cancel"
                width="90%">
            <Form ref="addForm" :model="addForm" :rules="ruleCustom" :label-width="90">
                <!--一次性取两个元素放在row集合中 -->
                    <Row>
                        <!-- 循环便利row中的两个元素-->

                            <Col span="24">
                            <FormItem label="标题" prop="title">
                                <Input type="text" v-model="addForm.title"/>
                            </FormItem>
                            </Col>
                    </Row>

                    <Row>

                        <Col span="24">
                            <FormItem label="学习感受" prop="feelings">
                                <RadioGroup v-model="addForm.feelings" type="button">
                                    <Radio label="1">优</Radio>
                                    <Radio label="2">良</Radio>
                                    <Radio label="3">中</Radio>
                                    <Radio label="4">差</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <!-- 循环便利row中的两个元素-->
                            <Col span="24">
                            <FormItem label="难点" prop="difficulties">
                                <mavon-editor  style="  margin-top: 50px" v-model="addForm.difficulties"/>
                            </FormItem>
                            </Col>

                    </Row>
                <Row>

                    <Col span="24">
                        <FormItem label="学习建议" prop="advice">
                            <mavon-editor  style="  margin-top: 50px" v-model="addForm.advice"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <!-- 循环便利row中的两个元素-->
                    <Col span="24">
                        <FormItem label="思维导图" prop="mind">
                            <div id="jsmind_add_container" style="width: 100%;height: 800px;"></div>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>


        <Modal
                v-model="updateModal"
                title="编辑笔记"
                :mask-closable="false"
                :loading="loading"
                @on-ok="update"
                @on-cancel="cancel"
                width="60%">
            <Form ref="updateForm" :model="updateForm" :rules="ruleCustom" :label-width="80">

                <Row>
                    <!-- 循环便利row中的两个元素-->

                    <Col span="24">
                        <FormItem label="标题" prop="title">
                            <Input type="text" v-model="updateForm.title"/>
                        </FormItem>
                    </Col>
                </Row>

                <Row>

                    <Col span="24">
                        <FormItem label="学习感受" prop="feelings">
                            <RadioGroup v-model="updateForm.feelings" type="button">
                                <Radio label="1">优</Radio>
                                <Radio label="2">良</Radio>
                                <Radio label="3">中</Radio>
                                <Radio label="4">差</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <!-- 循环便利row中的两个元素-->
                    <Col span="24">
                        <FormItem label="难点" prop="difficulties">
                            <mavon-editor  style="  margin-top: 50px" v-model="updateForm.difficulties"/>
                        </FormItem>
                    </Col>

                </Row>
                <Row>

                    <Col span="24">
                        <FormItem label="学习建议" prop="advice">
                            <mavon-editor  style="  margin-top: 50px" v-model="updateForm.advice"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <!-- 循环便利row中的两个元素-->
                    <Col span="24">
                        <FormItem label="思维导图" prop="mind">
                            <div id="jsmind_update_container" style="width:1028px;height: 800px;"></div>
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

    import  { mavonEditor } from 'mavon-editor';
    import 'mavon-editor/dist/css/index.css';


    // import "../../../static/jsmind/js/jsmind.js"
    // import "../../../static/jsmind/js/jsmind.draggable.js"
    // import "../../../static/jsmind/js/jsmind.screenshot.js"
    // import "../../../static/jsmind/style/jsmind.css";




    export default {
        components: { mavonEditor },
        data() {
            return {
                loading:true,
                count: 0,
                gourpId: null,
                pageSize: 20,
                pageNo: 1,
                totalPage: 0,
                totalCount: 0,
                keyWord:"",
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '学习感受',
                        key: 'feelings'
                    },
                    {
                        title: '难点',
                        key: 'difficulties'
                    },
                    {
                        title: '学习建议',
                        key: 'advice'
                    }
                ],
                self: this,
                data1: [],
                updateModal: false,
                addModal: false,
                updateForm: {
                        id:"",
                        title:"",
                        mind:"",
                        feelings:"",
                        difficulties:"",
                        advice:""
                },
                addForm: {
                        title:"test",
                        mind:"",
                        feelings:"1",
                        difficulties:"1",
                        advice:"1"
                },
                ruleCustom: {
                    title: [
                        {required: true, message:'标题不能为空',trigger:'blur'}
                    ]
                    ,
                    feelings: [
                        {required: true, message:'学习感受不能为空',trigger:'blur'}
                    ]
                    ,
                    difficulties: [
                        {required: true, message:'难点不能为空',trigger:'blur'}
                    ]
                    ,
                    advice: [
                        {required: true, message:'学习建议不能为空',trigger:'blur'}
                    ]
                },
                addjm:{

                },
                mind : {
                    /* 元数据，定义思维导图的名称、作者、版本等信息 */
                    "meta":{
                        "name":"主题",
                        "author":"www.coachtam.cn",
                        "version":"1"
                    },
                    /* 数据格式声明 */
                    "format":"node_tree",
                    /* 数据内容 */
                    "data":{"id":"root","topic":"jsMind","children":[
                            {"id":"easy","topic":"Easy","direction":"left","expanded":false,"children":[
                                    {"id":"easy1","topic":"Easy to show"},
                                    {"id":"easy2","topic":"Easy to edit"},
                                    {"id":"easy3","topic":"Easy to store"},
                                    {"id":"easy4","topic":"Easy to embed"}
                                ]},
                            {"id":"open","topic":"Open Source","direction":"right","expanded":true,"children":[
                                    {"id":"open1","topic":"on GitHub"},
                                    {"id":"open2","topic":"BSD License"}
                                ]},
                            {"id":"powerful","topic":"Powerful","direction":"right","children":[
                                    {"id":"powerful1","topic":"Base on Javascript"},
                                    {"id":"powerful2","topic":"Base on HTML5"},
                                    {"id":"powerful3","topic":"Depends on you"}
                                ]},
                            {"id":"other","topic":"test node","direction":"left","children":[
                                    {"id":"other1","topic":"I'm from local variable"},
                                    {"id":"other2","topic":"I can do everything"}
                                ]}
                        ]}
                },
                addjmoptions : {                   // addjmoptions 将在下一章中详细介绍
                    container:'jsmind_add_container', // [必选] 容器的ID，或者为容器的对象
                    editable:true,                // [可选] 是否启用编辑
                    theme:'orange'
                },
                updatejm:{

                },
                updatejmoptions : {                   // addjmoptions 将在下一章中详细介绍
                    container:'jsmind_update_container', // [必选] 容器的ID，或者为容器的对象
                    editable:true,                // [可选] 是否启用编辑
                    theme:'orange'
                }
                
            }
        },
        methods: {
            change(e){
                if (e.length == 1) {
                    this.updateForm = e[0];
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
            reset(form){
                this.$refs[form].resetFields();
            },
            addNote(){
                this.addModal = true;
                document.getElementById("jsmind_add_container").innerHTML="";
                this.addjm = new jsMind(this.addjmoptions);
                this.addjm.show(this.mind);
            },
            add(){
                this.$refs['addForm'].validate((valid)=>{
                    if(valid)
                    {
                        const note = this.addForm;
                        note.mind = this.addjm.get_data('node_tree');
                        fetch({
                            url: '/student/mynote',
                            method: 'post',
                            params: note
                        }).then((result) => {
                            this.gopage(this.pageNo);
                            this.$refs['addForm'].resetFields();
                            this.$Message.success('Success!');
                            this.addModal = false;
                        });
                    }
                    else
                    {
                        this.$Message.error("表单验证失败");
                        setTimeout(()=>{
                            this.loading=false;
                            this.$nextTick(()=>{
                                this.loading=true;
                            });
                        },1000);
                    }
                })
            },
            edit () {
                document.getElementById("jsmind_update_container").innerHTML="";
                this.updatejm = new jsMind(this.updatejmoptions);
                let mind = eval("("+this.updateForm.mind+")");
                this.updatejm.show(mind);

                if (this.count != 1) {
                    this.updateModal = false;
                    this.$Message.warning('请至少并只能选择一项');
                }
                else {
                    this.updateModal = true;
                }
            },
            update () {
                this.$refs['updateForm'].validate((valid)=>{
                    if(valid)
                    {
                        fetch({
                            url: '/student/mynote',
                            method: 'put',
                            data: this.updateForm
                        }).then((result) => {
                            this.updateModal = false;
                            this.$Message.success('Success!');
                            this.gopage(this.pageNo);
                        });
                    }
                    else
                    {
                        this.$Message.error("表单验证失败");
                        setTimeout(()=>{
                            this.loading=false;
                            this.$nextTick(()=>{
                                this.loading=true;
                            });
                        },1000);
                    }
                })
            },
            remove () {
                if (this.groupId != null && this.groupId != "") {
                    fetch({
                        url: '/student/mynote',
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
            gopage(){
                const pageNo = this.pageNo;
                const pageSize = this.pageSize;
                const keyWord = this.keyWord;
                fetch({
                    url: '/student/mynote',
                    method: 'get',
                    params: {pageNo, pageSize,keyWord}
                }).then((result) => {
                    this.data1 = result.data.list;
                    this.pageNo = pageNo;
                    this.pageSize = pageSize;
                    this.totalCount = result.data.totalCount;
                });
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        },
        mounted: function () {
            this.gopage();


        }
    }


</script>
<style scoped>
    @import "/static/jsmind/style/jsmind.css";
</style>