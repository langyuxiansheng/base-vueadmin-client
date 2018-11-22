/**
 * Created by Simple on 2018年11月6日14:55:01
 * 路由控制器
 */
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import permissions from '@/router/permission';

//登录页面
const Login = () =>
    import ('@/views/users/Login.vue');
//403
const noAuth = () =>
    import ('@/views/layout/components/403.vue');
//404
const noPage = () =>
    import ('@/views/layout/components/404.vue');

Vue.use(Router);

const routes = [{
        meta: {
            title: '登录'
        },
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        meta: {
            title: '403'
        },
        path: '/403',
        name: 'noAuth',
        component: noAuth
    },
    {
        meta: {
            title: '404'
        },
        path: '/404',
        name: 'noPage',
        component: noPage
    },
    {
        path: '*',
        redirect: '/login'
    }
];

//初始化路由器
const router = new Router({ routes });

//添加动态路由
router.addRoutes(permissions.getRoutes());

//判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    const { name, title } = to.meta;
    document.title = `管理平台-${name || title}`;
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (store.getters.token) { // 判断是否登录
            next();
        } else { // 没登录则跳转到登录界面
            window.localStorage.removeItem('AdminSessionData');
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });
        }
    } else {
        next();
    }
});

//映射路由表到vuex
store.dispatch('getRoutes', permissions.getRoutes());

export default router;