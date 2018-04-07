import Vue from 'vue';
import Router from 'vue-router';
import Full from '@/containers/Full';
import Full2 from '@/containers/Full2';
// Views - Pages
const _import = require('./_import_' + process.env.NODE_ENV);


/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
    {path: '/login', component: Login, hidden: true},
    {
        path: '/pages', redirect: '/pages/p404', name: 'Pages',
        component: {
            render(c) {
                return c('router-view')
            }
            // Full,
        },
        children: [{path: '404', name: 'Page404', component: _import('errorPages/Page404')},
            {path: '500', name: 'Page500', component: _import('errorPages/Page404')}
        ]
    }


]

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});

export const asyncRouterMap = [

    {
        path: '/',
        redirect: '/welcome',
        name: '首页',
        component: Full,
        hidden: false,
        children: [
            {path: '/welcome', name: '欢迎', icon: 'speedometer', component: _import('Welcome')},
            {path: '/system', name: '系统管理', icon: 'person-stalker',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {path: 'dept', name: '部门管理', icon: 'person-stalker', component: _import('system/Dept')},
                    {path: 'user', name: '用户管理', icon: 'person', component: _import('system/User')},
                    {path: 'role', name: '角色管理', icon: 'android-hand', component: _import('system/Role')},
                    {path: 'module', name: '模块管理', icon: 'eye', component: _import('system/Module')}
                ]
            },
            {path: '/cargo', name: '货运管理',  icon: 'navigate',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'contract', name: '购销合同',  component: _import('cargo/contract/Contract')
                    },
                    {path: 'contractProduct/:id', name: '购销合同货物', hidden: true, component: _import('cargo/contract/ContractProduct')},
                    {path: 'extCproduct/:id', name: '购销合同货物附件', hidden: true, component: _import('cargo/contract/ExtCproduct')},
                    {path: 'outProduct', name: '出货表',  component: _import('cargo/OutProduct')},
                    {path: 'export_contract', name: '合同管理',  component: _import('cargo/export/ExportContract')},
                    {path: 'export', name: '出口报运',  component: _import('cargo/export/Export')},
                    {path: 'exportEdit/:id', name: '修改出口报运',hidden: true,  component: _import('cargo/export/ExportEdit')},
                    {path: 'packingList', name: '装箱管理',  component: _import('cargo/PackingList')},
                    {path: 'shippingOrder', name: '委托管理',  component: _import('cargo/ShippingOrder')},
                    {path: 'invoice', name: '发票管理',  component: _import('cargo/Invoice')},
                    {path: 'finance', name: '财务管理',  component: _import('cargo/Finance')}
                ]
            },
            {path: '/stat', name: '统计分析', redirect: '/stat/factorysale', icon: 'speedometer',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {path: 'factorysale', name: '厂家销售情况',  component: _import('charts/SaleChart')},
                    {path: 'productsale', name: '产品销售排行',  component: _import('charts/ShopChart')},
                    {path: 'onlineinfo', name: '系统访问压力',  component: _import('charts/CakeChart')}
                ]
            }

        ]
    },
    // {
    //     path: '/system',
    //     redirect: '/system/dept',
    //     name: '系统管理',
    //     component: Full2,
    //     hidden: false,
    //     children: [
    //         {path: '/system/dept', name: '部门管理', icon: 'person-stalker', component: _import('system/Dept')},
    //         {path: '/system/user', name: '用户管理', icon: 'person', component: _import('system/User')},
    //         {path: '/system/role', name: '角色管理', icon: 'android-hand', component: _import('system/Role')},
    //         {path: '/system/module', name: '模块管理', icon: 'eye', component: _import('system/Module')}
    //
    //     ]
    // },
    // {
    //     path: '/cargo',
    //     redirect: '/cargo/contract',
    //     name: '货运管理',
    //     component: Full2,
    //     hidden: false,
    //     children: [
    //         {path: '/cargo/contract', name: '购销合同', icon: 'speedometer', component: _import('cargo/contract/Contract')},
    //         {path: '/cargo/contractProduct/:id', name: '购销合同货物', hidden: true, component: _import('cargo/contract/ContractProduct')},
    //         {path: '/cargo/extCproduct/:id', name: '购销合同货物附件', hidden: true, component: _import('cargo/contract/ExtCproduct')},
    //         {path: '/cargo/outProduct', name: '出货表', icon: 'speedometer', component: _import('cargo/OutProduct')},
    //         {path: '/cargo/export_contract', name: '合同管理', icon: 'speedometer', component: _import('cargo/export/ExportContract')},
    //         {path: '/cargo/export', name: '出口报运', icon: 'speedometer', component: _import('cargo/export/Export')},
    //         {path: '/cargo/exportEdit/:id', name: '修改出口报运',hidden: true, icon: 'speedometer', component: _import('cargo/export/ExportEdit')},
    //         {path: '/cargo/packingList', name: '装箱管理', icon: 'speedometer', component: _import('cargo/PackingList')},
    //         {path: '/cargo/shippingOrder', name: '委托管理', icon: 'speedometer', component: _import('cargo/ShippingOrder')},
    //         {path: '/cargo/invoice', name: '发票管理', icon: 'speedometer', component: _import('cargo/Invoice')},
    //         {path: '/cargo/finance', name: '财务管理', icon: 'speedometer', component: _import('cargo/Finance')}
    //     ]
    // },
    // {
    //     path: '/stat',
    //     redirect: '/stat/factorysale',
    //     name: '统计分析',
    //     component: Full2,
    //     hidden: false,
    //     children: [
    //         {path: '/stat/factorysale', name: '生产厂家销售情况', icon: 'speedometer', component: _import('charts/SaleChart')},
    //         {path: '/stat/productsale', name: '产品销售排行', icon: 'speedometer', component: _import('charts/ShopChart')},
    //         {path: '/stat/onlineinfo', name: '系统访问压力图', icon: 'speedometer', component: _import('charts/CakeChart')}
    //     ]
    // },

    {path: '*', redirect: '/pages/404', hidden: true}

];
