/**
 *  路由菜单文件
 */

//主页容器
const Layout = () =>
    import ('@/views/layout/Layout');

const Welcome = () =>
    import ('@/views/dashboard/Welcome');
//示例功能
const ListDemo = () =>
    import ('@/views/demos/ListDemo');
//系统设置
const Permission = () =>
    import ('@/views/system/Permission');
const RoleManage = () =>
    import ('@/views/system/RoleManage');
const AdminManage = () =>
    import ('@/views/system/AdminManage');

export default [{
        path: '/dashboard',
        name: 'dashboard',
        meta: {
            requireAuth: false, //菜单权限
            title: '系统首页', //菜单名
            icon: 'fa fa-bar-chart', //菜单图标
        },
        component: Layout,
        children: [{
            path: 'welcome',
            meta: {
                title: '欢迎页',
                requireAuth: false
            },
            component: Welcome
        }]
    },

    {
        path: '/demos',
        name: 'demos',
        meta: {
            requireAuth: false, //菜单权限
            title: '示例功能', //菜单名
            icon: 'fa fa-sitemap', //菜单图标
        },
        component: Layout,
        children: [{
            path: 'listDemo',
            meta: {
                title: '列表Demo',
                requireAuth: false
            },
            component: ListDemo,
        }]
    },
    {
        path: '/system',
        name: 'system',
        meta: {
            requireAuth: false, //菜单权限
            title: '系统设置', //菜单名
            icon: 'fa fa-cog', //菜单图标
        },
        component: Layout,
        children: [{
                path: 'permission',
                meta: {
                    title: '权限管理',
                    requireAuth: false
                },
                component: Permission,
            },
            {
                path: 'roleManage',
                meta: {
                    title: '角色管理',
                    requireAuth: false
                },
                component: RoleManage,
            },
            {
                path: 'adminManage',
                meta: {
                    title: '管理员管理',
                    requireAuth: false
                },
                component: AdminManage,
            }
        ]
    }
];