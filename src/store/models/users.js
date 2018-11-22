/**
 * Created by Simple on 2018/1/12 0012.
 * 用户模块
 */
import Cookies from 'js-cookie';
import types from '../types.js';

const state = {
    token: Cookies.get('adminToken'), // 用户token
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

};

const mutations = {

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