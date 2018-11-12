/***
 * Created by Simple on 2018/1/14 0014.
 * Http请求控制器模块
 */

import axios from 'axios';
import router from '@/router/index';
import Cookies from 'js-cookie';
import { Loading, Message } from 'element-ui';

// axios 配置
axios.defaults.timeout = 15000;
// axios.defaults.baseURL = 'http://';
// axios.defaults.headers.common['language'] = common.getCurrentLanguage();

// 配置通用请求动画
let loading = null;

axios.interceptors.request.use(config => {
    console.time('ajax请求耗时');
    config.headers.Authorization = `Bearer ${Cookies.get('adminToken')}`;
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(255, 255, 255, .6)'
    });

    return config;
}, err => {
    loading.close();
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    let data = {};
    if (response && response.data) {
        switch (Number(response.data.code)) {
        case 200:
            data = response.data;
            break;
            /* case 401: // 401 清除token信息并跳转到登录页面
                    Message.error({
                        message: '身份过期，请重新登录'
                    });
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: { redirect: router.currentRoute.fullPath }
                        });
                    }, 1200);
                    break; */
        case 403: //无权限
            router.replace({
                name: '/403',
                query: { redirect: router.currentRoute.fullPath }
            });
            break;
        default:
            Message.error({
                message: response.data.msg
            });
            break;
        }
    }
    loading.close();
    console.timeEnd('ajax请求耗时');
    return data;
}, error => {
    loading.close();
    Message.error({
        message: '哎呀~ (ಥ﹏ಥ)网络又开小差了,请稍后刷新重试!'
    });
    return Promise.reject(error.response.data);
});

export default axios;