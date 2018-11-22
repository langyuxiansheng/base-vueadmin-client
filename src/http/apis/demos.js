/**
 * 代理管理
 */
export default {

    /**
     * 获取列表demo
     * @param {*} param0
     */
    getListDemo({ page, limit }) {
        return {
            url: `/demos/getListDemo`,
            method: 'get',
            params: { page, limit }
        };
    },

    /**
     * 添加
     * @param {*} data
     */
    addDemo(data) {
        return {
            url: `/demos/addDemo`,
            method: 'post',
            data
        };
    },

    /**
     * 编辑
     * @param {*} data
     */
    updateDemo({ demoId, data }) {
        return {
            url: `/demos/updateDemo/${demoId}`,
            method: 'put',
            data
        };
    },

    /**
     * 删除
     * @param {*} data
     */
    deleteDemo(demoId) {
        return {
            url: `/demos/deleteDemo/${demoId}`,
            method: 'delete'
        };
    }

};