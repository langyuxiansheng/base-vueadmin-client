<template>
    <div class="sidebar-menu">
        <h3 class="title">管理平台</h3>
        <el-menu background-color="#000c17" text-color="#fff" active-text-color="#1890ff" :default-active="$route.path" unique-opened router>
            <el-submenu v-for="(menu,k) in routeOptions" :key="k" :index="menu.meta.title" popper-class="sidebar-submenu">
                <template slot="title">
                    <i :class="menu.meta.icon"></i>
                    <span>{{menu.meta.title}}</span>
                </template>
                <el-menu-item v-if="menu.children" v-for="item in menu.children" :key="item.name" :index="`${menu.path}/${item.path}`">
                    <span class="sidebar-menu-item">{{item.meta.title}}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
export default {
    name: 'Sidebar',
    computed: {
        ...mapGetters([
            'routeOptions'
        ]),
        //菜单
        sideMenus () {
            const { sideBarMenus } = this;
            return sideBarMenus.children;
        }
    }
};
</script>
<style lang="less" scoped>
.sidebar-menu {
  width: 250px;
  background: #001529;
  height: 100%;
  .title {
    padding: 18px 0 18px 50px;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  }

  & /deep/ .el-menu {
    border-right: 0;
    .sidebar-menu-item {
      padding-left: 20px;
    }
  }
  .sidebar-submenu {
    background: #ccc;
  }
}
</style>
