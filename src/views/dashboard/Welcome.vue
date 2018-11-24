<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :lg="12" :xs="24">
                <div class="welcome-header">
                    <h2 class="title">系统简介</h2>
                    <div class="content">
                        <p>* base-vueadmin-client 简介</p>
                        <p>* 基于Vue 2.x和ElementUI 2.x的后台管理系统基础脚手架</p>
                        <p>* 使用 vue-router 和 vuex</p>
                        <p>* ajax请求使用的axios</p>
                        <p>* 工程化、模块化的风格，让你的开发更轻松</p>
                        <p>* 使用 async await 从此让你告别繁琐的then回调，更简洁的风格和语法</p>
                        <p>* 集成权限系统</p>
                        <p>* 此项目提供最基础的管理后台解决方案,是一套最基础的、开箱即用的vue管理后台框架</p>
                        <p>* 可以配套使用的后台API服务 基于KOA2的restful 风格的后台API服务</p>
                    </div>
                </div>
            </el-col>
            <el-col :lg="12" :xs="24">
                <div class="welcome-header">
                    <h2 class="title">其它</h2>
                    <div class="content">
                        <p>* 项目持续更新中......</p>
                        <p>* 如果此项目对你有帮助的话,欢迎star,有问题请在github Issues 留言提问</p>
                        <p>* 您有更好的方案和方法请指教,也可以直接联系作者 <a>109643291@qq.com</a></p>
                        <p>* 欢迎加入作者所在的QQ群: <a>46153838</a></p>
                        <p>* 作者个人网站: <a href="http://www.hao2013.cn" target="_blank" rel="noopener noreferrer">http://www.hao2013.cn</a></p>
                        <p>* CSDN博客: <a href="https://blog.csdn.net/qq_33270001" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/qq_33270001</a></p>
                        <p>* github:  <a href="https://github.com/langyuxiansheng/base-vueadmin-client" target="_blank" rel="noopener noreferrer">https://github.com/langyuxiansheng/base-vueadmin-client</a></p>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: 'Welcome',
    data () {
        return {

        };
    },
    mounted() {
        //移除登录后的动画
        const loading = document.getElementsByClassName('lds-css');
        if (loading && loading.length > 0) loading[0].remove();
    },

    methods: {

    }
};
</script>
<style lang="less" scoped>
.app-container{
    background: #fff;
    padding: 10px 15px;
    .welcome-header{
        .title{
            margin-bottom: 20px;
            font-weight: bold;
        }
        .content{
            p{
                margin-bottom: 20px;
                a{
                    color: #0366d6;
                }
            }
        }

    }
}
</style>

