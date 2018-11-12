<template>
    <div class="login-bg" :style="{backgroundImage:`url(../../../static/imgs/login-bg-${bgUrlIndex}.jpg)`}">
        <LoginForm/>
        <p class="copyright">四川省某某信息技术有限公司</p>
    </div>
</template>
<script type="text/ecmascript-6">
import LoginForm from './form/LoginForm.vue';
export default {
    name: 'Login',
    data() {
        return {
            bgUrlIndex: 0
        };
    },
    created() {
        this.bgToggle();
    },
    methods: {
        bgToggle() {
            setInterval(() => {
                if (this.bgUrlIndex > 5) this.bgUrlIndex = 0;
                this.bgUrlIndex++;
            }, 1000 * 5);
        }
    },
    components: {
        LoginForm
    }
};
</script>

<style lang="less">
    .login-bg{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height:100%;
        background-repeat: no-repeat;
        background-position: 0 0;
        transition: background 2s ease-in-out;
        background-size: 100% 100%;
        .copyright{
            width: 100%;
            text-align: center;
            position: fixed;
            bottom: 42px;
            left: 0;
            color: #fff;
        }
    }
</style>
