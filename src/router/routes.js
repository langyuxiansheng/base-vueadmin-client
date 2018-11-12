/**
 *  路由菜单文件
 */

//主页容器
const Layout = () =>
    import ('@/views/layout/Layout');

const Dashboard = () =>
    import ('@/views/dashboard');
//运营管理
const GameManage = () =>
    import ('@/views/operations/GameManage');

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
            path: 'index',
            meta: {
                title: '数据总览',
                requireAuth: false
            },
            component: Dashboard
        }]
    },
    {
        path: '/operations',
        name: 'operations',
        meta: {
            requireAuth: false, //菜单权限
            title: '运营管理', //菜单名
            icon: 'fa fa-diamond', //菜单图标
        },
        component: Layout,
        children: [{
            path: 'gameManage',
            meta: {
                title: '游戏管理',
                requireAuth: false
            },
            component: GameManage
        }]
    },
    {
        path: '/member',
        name: 'member',
        meta: {
            requireAuth: false, //菜单权限
            title: '会员管理', //菜单名
            icon: 'fa fa-users', //菜单图标
        },
        component: Layout,
        children: [{
            path: 'index',
            meta: {
                title: 'VIP会员',
                requireAuth: false
            },
            component: Dashboard,
            /*  children: [{
                 meta: {
                     title: '收入分析',
                     requireAuth: false
                 },
                 path: 'incomeRecord',
                 component: IncomeRecord
             }] */
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