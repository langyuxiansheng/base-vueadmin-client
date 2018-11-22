<template>
    <el-container class="layout-container">
        <el-container>
            <el-aside width="auto" class="rh-bg-white">
                <Sidebar />
            </el-aside>
            <el-main>
                <el-header height="auto">
                    <header-top></header-top>
                </el-header>
                <tags-view></tags-view>
                <div class="layout-view">
                    <transition name="fade" mode="out-in">
                        <keep-alive :include="cachedViews">
                            <router-view :key="key"></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script type="text/ecmascript-6">
import HeaderTop from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import TagsView from './components/TagsView.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Main',
    computed: {
        key () {
            if (this.$route.name == undefined && this.$route.path == '/homeMenuItem') {
                //页面第一次加载时 清空 tab 标签页上的所有标签 回到首页
                this.delAllViews();
            }
            return this.$route.path + Date.parse(new Date());
        },
        ...mapGetters([
            'cachedViews'
        ])
    },

    methods: {
        ...mapActions([
            'delAllViews'
        ])
    },

    components: {
        HeaderTop,
        Sidebar,
        TagsView
    }
};
</script>
