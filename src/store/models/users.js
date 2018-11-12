/**
 * Created by Simple on 2018/1/12 0012.
 * 用户模块
 */

import types from '../types.js';
import util from '../../common/method/util';
import permissions from '@/router/permission';

import {
    userLogin,
    userLogout
} from '@/http';

const state = {
    token: util.getCookie('tokenCommonServer'), // 用户token
    menuItem: window.localStorage.getItem('menuItemCommonServer'), // 菜单
    ownerItem: {}, // 业主个人信息详情
    loginItem: window.localStorage.getItem('loginItemCommonServer'), // 业主账号信息
    vehicleInfo: [], // 车辆信息
    userInfo: [] //用户信息
};

const getters = {

    /**
     * 用户token
     * @param state
     * @return {*}
     */
    token(state) {
        return state.token;
    },

    /**
     * 菜单
     * @param state
     * @return {*}
     */
    menuItem(state) {
        return state.menuItem;
    },

    /**
     * 业主个人信息详情
     * @param state
     * @return {state.ownerItem|{}|*}
     */
    ownerItem(state) {
        return state.ownerItem;
    },

    /**
     * 业主账号信息
     * @param state
     * @return {*}
     */
    loginItem(state) {
        return state.loginItem;
    },

    /**
     * 车辆信息
     * @param {*} state
     */
    vehicleInfo(state) {
        return state.vehicleInfo;
    },

    /**
     * 用户信息
     * @param {*} state
     */
    userInfo(state) {
        return state.userInfo;
    }

};

const actions = {

    /**
     * 用户登录
     * @param commit
     * @param state
     * @param self
     */
    async userLogin({ commit, state }, self) {
        const { data: { code, data, msg } } = await userLogin(self.ruleForm);
        const { jwt, loginItem = {}, menu = {} } = data;

        if (code !== '200') self.$message.error(msg);

        util.setCookie('tokenCommonServer', jwt);

        loginItem && window.localStorage.setItem('menuItemCommonServer', JSON.stringify(loginItem));

        // 存入菜单信息
        if (menu.length > 0) {
            window.localStorage.setItem('menuItemCommonServer', JSON.stringify(menu));
        } else if (loginItem.isAdmin === 0) {
            self.$message.warning('暂无权限,请联系管理员!');
        }

        commit(types.SET_USER_TOKEN, data);

        let permission = permissions.getRouters();

        //映射路由表到vuex
        commit(types.GET_ROUTE_OPTIONS, permission);

        let redirect = self.$route.query.redirect;
        self.$router.push({ path: redirect || '/visualization/share/sharedParkings' });

        // 默认进入页面
        /*  if (permission && permission.length > 0) {
                for (let x in permission) {
                    if (permission[x] && permission[x].children && permission[x].children.length > 0) {
                        for (let y in permission[x].children) {
                            self.$router.push(`${permission[x].path}/${permission[x].children[y].path}/${permission[x].children[y].children[0].path}`);
                            break;
                        }
                    }
                }
            } */
    },

    /**
     * 用户退出登录
     * @param commit
     * @param state
     * @param self
     */
    async userLogout({ commit, state }, self) {
        const { data: { code, msg } } = await userLogout();
        if (code !== '200') self.$message.error(msg);
        self.$router.push({ path: '/login' });
        let token = util.clearCookie('tokenCommonServer');
        window.localStorage.removeItem('menuItemCommonServer');
        window.localStorage.removeItem('loginItemCommonServer');
        commit(types.CLEAR_USER_TOKEN, token);
        commit(types.GET_ROUTE_OPTIONS, token);
    }

};

const mutations = {

    /**
     * 登录系统逻辑
     */
    [types.SET_USER_TOKEN](state, data) {
        state.token = data.jwt;
        state.menuItem = data.menu;
        state.loginItem = data.loginItem;
    },

    /**
     * 退出登录逻辑
     */
    [types.CLEAR_USER_TOKEN](state, data) {
        state.token = data;
        state.menuItem = data;
        state.loginItem = data;
    },

    /**
     * 业主信息
     */
    [types.GET_OWNER_ITEM](state, data) {
        state.ownerItem = data;
    },

    /**
     * 车辆信息
     */
    [types.GET_VEHICLE_INFO](state, data) {
        state.vehicleInfo = data;
    },

    /**
     * 获取用户信息
     */
    [types.GET_USER_INFO](state, data) {
        state.userInfo = data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};