<template>
    <div id="app">
        <!-- 路由匹配到的组件将渲染在这里 -->
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'app'
};
</script>

