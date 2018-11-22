/**
 * 系统设置
 */
export default {

    /**
     * 获取平台管理员列表
     * @param {*} param0
     */
    getPlatformAdminList({ page, limit }) {
        return {
            url: `/platform/getPlatformAdminList`,
            method: 'get',
            params: { page, limit }
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
     * @param {*} adminId
     */
    delPlatformAdmin(adminId) {
        return {
            url: `/platform/delPlatformAdmin/${adminId}`,
            method: 'delete'
        };
    },

    /**
     * 注销平台管理员
     * @param {*} param0
     */
    updatePlatformAdmin({ adminId, status }) {
        return {
            url: `/platform/updatePlatformAdmin/${adminId}`,
            method: 'put',
            data: { status }
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
    getPlatformRoles({ page, limit }) {
        return {
            url: `/platform/getPlatformRoles`,
            method: 'get',
            params: { page, limit }
        };
    },

    /**
     * 删除角色
     * @param {*} roleId
     */
    delPlatformRole(roleId) {
        return {
            url: `/platform/delPlatformRole/${roleId}`,
            method: 'delete'
        };
    },

    /**
     * 获取权限列表
     * @param {*} param0
     */
    getPermissions({ page, limit, roleId }) {
        return {
            url: `/permission/getPermissions`,
            method: 'get',
            params: { page, limit, roleId }
        };
    },

    /**
     * 添加权限
     * @param {*} data
     */
    addPermission(data) {
        return {
            url: `/permission/addPermission`,
            method: 'post',
            data
        };
    },

    /**
     * 删除权限
     * @param {*} permissionId
     */
    delPermission(permissionId) {
        return {
            url: `/permission/delPermission/${permissionId}`,
            method: 'delete'
        };
    },

    /**
     * 修改权限
     * @param {*} param0
     */
    updatePermission({ permissionId, data }) {
        return {
            url: `/permission/updatePermission/${permissionId}`,
            method: 'put',
            data
        };
    },

    /**
     * 设置角色权限
     * @param {*} data
     */
    setPlatformRolePermission(data) {
        return {
            url: `/platform/setPlatformRolePermission`,
            method: 'put',
            data
        };
    },

    /**
     * 根据角色id获取权限
     * @param {*} roleId
     */
    getPermissionByroleId({ roleId }) {
        return {
            url: `/permission/getPermissionByroleId`,
            method: 'get',
            params: { roleId }
        };
    },

    /**
     * 设置平台管理员角色
     * @param {*} data
     */
    setPlatformAdminRole(data) {
        return {
            url: `/platform/setPlatformAdminRole`,
            method: 'put',
            data
        };
    }

};