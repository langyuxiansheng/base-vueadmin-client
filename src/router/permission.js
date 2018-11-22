/**
 * 路由权限控制器
 */
import routes from './routes';
const adminSessionData = window.localStorage.getItem(`adminSessionData`);

/**
 * 递归查询路由权限
 * @param {*} list
 * @param {*} menu
 */
function iterator(list, menu, isAdmin) {
    for (let item in list) {
        if (isAdmin) { //超级管理员
            list[item].meta.requireAuth = true;
        } else if ((list[item].meta.title === menu.meta.title) && (list[item].path === menu.path)) {
            list[item].meta.requireAuth = true;
        }
        if (list[item].children && list[item].children.length > 0) iterator(list[item].children, menu, isAdmin);
    }
}

/**
 * 导出有权限的路由
 */
export default {
    getRoutes() {
        if (!adminSessionData) return [];
        const { userInfo, menus } = typeof adminSessionData === 'string' ? JSON.parse(adminSessionData) : adminSessionData;
        const { isAdmin } = userInfo;
        if (isAdmin) { //超级管理员直接返回所有的菜单
            iterator(routes, null, isAdmin);
        } else {
            menus.forEach((menu) => {
                iterator(routes, menu);
            });
        }
        return routes;
    }
};