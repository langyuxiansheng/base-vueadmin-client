<template>
    <div>
        <ul class="menu-list" v-if="routeOptions && routeOptions.length > 0">
            <li v-for="(menu,index) in routeOptions" :key="index">
                <keep-alive>
                    <a
                        v-if="menu.meta"
                        class="menu-item"
                        :class="{active:$route.path.substring(0,menu.path.length).indexOf(menu.path) != -1}"
                        @click="goToPage(menu)">
                        <i class="iconfont" :class="menu.meta.icon"></i>
                        <p>{{menu.meta.title}}</p>
                    </a>
                </keep-alive>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
export default {
    name: 'TopMenus',
    watch: {
        $route (val) {
            this.routeOptions.forEach((item, index) => {
                if (val.matched[0].path === item.path) {
                    this.updateSideBarMenus(item);
                }
            });
        }
    },

    created () {
        this._initSideBar();
    },

    methods: {

        /**
		 * 初始化
		 * */
        _initSideBar () {
            const {routeOptions} = this;
            if (routeOptions && routeOptions.length > 0) {
                for (let menu of routeOptions) {
                    if (this.$route.path.substring(0, menu.path.length).indexOf(menu.path) != -1) {
                        //初始化菜单
                        this.updateSideBarMenus(menu);
                    }
                }
            }
        },

        /**
		 * 跳转到对应的页面
		 * */
        goToPage (route) {
            //监控台
            if (route.name === 'monitor') {
                window.open('#/monitor', '_blank');
            } else if (!route.children) {
                this.$router.replace({
                    path: '/404',
                    query: {redirect: this.$router.currentRoute.fullPath}
                });
            } else {
			    this.$router.push(`${route.path}/${route.children[0].path}/${route.children[0].children[0].path}`);
            }
            //this.updateSideBarMenus(route);
        },

        ...mapActions([
            'updateSideBarMenus'
        ])
    },
    computed: {
        ...mapGetters([
            'loginItem',
            'routeOptions'
        ]),

        //用户信息
        userInfo () {
            return typeof this.loginItem == 'string' ? JSON.parse(this.loginItem) : this.loginItem;
        }
    }
};
</script>
<style lang="less" scoped>
    .menu-list{
        display: flex;
        text-align: center;
        .menu-item{
            cursor: pointer;
            color: #fff;
            display: inline-block;
            padding: 8px 30px;
            border-radius: 34px;
            //min-width: 124px;
            i{
                font-size: 26px;
            }
            p{
                margin-top: 4px;
                white-space:nowrap;
            }
        }

        & .active{
            color: #3448a1;
            background-color: #fff;
        }
    }
</style>
