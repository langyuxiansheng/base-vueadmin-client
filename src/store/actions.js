/**
 * Created by Administrator on 2018/1/12 0012.
 * store 公共方法类
 */
import types from './types.js';

import {

// guideList
} from '@/http';

const actions = {

    /**
     * 更新侧边栏菜单
     */
    updateSideBarMenus({ commit, state }, route) {
        commit(types.SIDE_BAR_MENUS, route);
    },

    /**
     * 路由表
     * @param {*} param0
     * @param {*} data
     */
    getRoutes({ commit, state }, data) {
        commit(types.GET_ROUTE_OPTIONS, data);
    },

    /**
     * 获取诱导牌列表
     *
     * @param {*} { commit }
     * @param {*} payload
     */
    async getGuideList({ commit }) {
        // const { data } = await guideList();
        // commit('GET_GUIDE_LIST', data);
    }

};

export default actions;