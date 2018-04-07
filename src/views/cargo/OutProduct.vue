<template>


    <div class="animated fadeIn">
        <div>
        <Row style="margin-bottom: 25px;">
        <Col span="6">出货日期：
            <DatePicker type="date" v-model="inputDate" format="yyyy-MM"
                        placeholder="Select date" style="width: 100px"/>
        </Col>
        <!--<Col span="8"><a href="http://www.baidu.com" download="w3logo"> <Button type="primary" shape="circle" icon="ios-print" @click="">打印</Button></a></Col>-->
        <Col span="8"> <Button type="primary" shape="circle" icon="ios-print" @click="print()">打印</Button></Col>
        </Row>
        </div>
     </div>
</template>

<script type="text/ecmascript-6">
    import fetch from 'utils/fetch';
    import {dateFormat} from 'utils/date';
    import {parseTime} from 'utils/index';
    import store from 'store';
    export default {
        data() {
            return {
                inputDate:"2015-01"
            }
        },
        methods: {
            reset(form){
                this.$refs[form].resetFields();
            },
            print(){
//                const date = this.inputDate.formart("yyyy-MM");
                const date = dateFormat(this.inputDate).substr(0,7);
                const url = process.env.BASE_API+'/cargo/outProduct/print?inputDate='+date+"&access_token="+store.getters.token;
                window.open(url);
            }
        },
        mounted: function () {

        }
    }
</script>