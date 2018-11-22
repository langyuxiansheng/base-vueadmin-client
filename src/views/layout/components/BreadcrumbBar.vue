<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if='item.meta.title'>
                <span v-if="item.meta.hidden" class="no-redirect">{{item.meta.title}}</span>
                <router-link class="home-link" v-else-if="item.meta.title == '首页'" :to="item.redirect || item.path,$route.params | routeLink">{{item.meta.title}}</router-link>
                <router-link v-else :to="item.redirect || item.path,$route.params | routeLink">{{item.meta.title}}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>npm
<script>
export default {
    name: 'BreadcrumbBar',
    data () {
        return {
            levelList: null
        };
    },

    created () {
        this.getBreadcrumb();
    },

    watch: {
        $route () {
            this.getBreadcrumb();
        }
    },

    methods: {
        getBreadcrumb () {
            let matched = this.$route.matched.filter(item => item.name);
            const first = matched[0];
            if (first && first.name !== 'home') {
                matched = [{ path: '/homeMenuItem', meta: { title: '首页' } }].concat(matched);
            } else if (first && first.name == 'home') {
                matched = [{ path: '/homeMenuItem', meta: { title: '首页' } }].concat(matched);
                matched.splice(1, 1);
            }
            this.levelList = matched;
        }
    },

    filters: {
        routeLink (path, params) {
            let pathArr = [];
            if (path && params) {
                //替换掉第一层的路由参数
                for (let par in params) {
                    pathArr.push(path.replace(':' + par, params[par]));
                }

                //替换第二层变量
                for (let par in params) {
                    for (let p in pathArr) {
                        if (par && pathArr[p].indexOf(':' + par) != -1) {
                            return pathArr[p].replace(':' + par, params[par]);
                        }
                    }
                }
            }
            return path;
        }
    }
};
</script>
<style lang="less" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 16px;
  margin-left: 20px;
  align-self: center;
  .no-redirect {
    color: #3d9eff;
    cursor: text;
  }
}
.home-link {
  color: #334495;
}
</style>
