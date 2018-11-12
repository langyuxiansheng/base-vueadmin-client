/**
 * 系统设置
 */
export default {

    /**
     * 获取平台管理员列表
     * @param {*} param0
     */
    getPlatformAdminList({
        page,
        limit
    }) {
        return {
            url: `/platform/getPlatformAdminList`,
            method: 'get',
            params: {
                page,
                limit
            }
        };
    },

    /**
     * 添加平台管理员
     * @param {*} data
     */
    addPlatformAdmin(data) {
        return {
            url: `/platform/addPlatformAdmin`,
            method: 'post',
            data
        };
    },

    /**
     * 注销平台管理员
     * @param {*} AdminID
     */
    delPlatformAdmin(AdminID) {
        return {
            url: `/platform/delPlatformAdmin/${AdminID}`,
            method: 'delete'
        };
    },

    /**
     * 注销平台管理员
     * @param {*} param0
     */
    updatePlatformAdmin({
        AdminID,
        Status
    }) {
        return {
            url: `/platform/updatePlatformAdmin/${AdminID}`,
            method: 'put',
            data: {
                Status
            }
        };
    },

    /**
     * 添加角色
     * @param {*} data
     */
    addPlatformRole(data) {
        return {
            url: `/platform/addPlatformRole`,
            method: 'post',
            data
        };
    },

    /**
     * 获取角色列表
     * @param {*} param0
     */
    getPlatformRoles({
        page,
        limit
    }) {
        return {
            url: `/platform/getPlatformRoles`,
            method: 'get',
            params: {
                page,
                limit
            }
        };
    },

    /**
     * 删除角色
     * @param {*} RoleID
     */
    delPlatformRole(RoleID) {
        return {
            url: `/platform/delPlatformRole/${RoleID}`,
            method: 'delete'
        };
    }

};