/**
 * Created by Simple on 2018/1/12 0012.
 * 用户模块
 */
import Cookies from 'js-cookie';
// import types from '../types.js';
//读取本地的信息挂载到vuex
const adminSessionData = window.localStorage.getItem(`adminSessionData`);
let info = null;
if (adminSessionData) {
    const { userInfo } = typeof adminSessionData === 'string' ? JSON.parse(adminSessionData) : adminSessionData;
    info = userInfo;
}

const state = {
    token: Cookies.get('adminToken'), // 用户token
    userInfo: info //用户信息
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

    /*   [types.GET_OWNER_ITEM](state, data) {
          state.ownerItem = data;
      }, */
};

export default {
    state,
    getters,
    actions,
    mutations
};