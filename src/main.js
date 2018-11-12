// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 导入store
import store from './store/index';
//引入elementui
import Element from 'element-ui';
// 导入语言国际化插件
import VueI18n from 'vue-i18n';
// 图片放大
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer';
// 导入语言包
import LangZhCH from '@/assets/js/i18n/zh-cn';
import LangEn from '@/assets/js/i18n/en-us';
//自定义全局组件
import components from './components';
// 全局过滤器
import '@/filters/filters';
//字体图标
import '@/assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
//css
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-directive-image-previewer/dist/assets/style.css';
import '@/assets/styles/reset.css';
import '@/assets/styles/common.less';
import '@/assets/styles/theme.default.less';

Vue.use(Element, { size: 'mini', zIndex: 3000 });
Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
});

Vue.use(VueDirectiveImagePreviewer, {
    background: 'rgba(0,0,0,.5)'
});

Vue.use(VueI18n);

/**
 * 配置语言国际化和自定义语言包
 */
const i18n = new VueI18n({
    locale: 'zhCNS',
    messages: {
        'enUS': LangEn,
        'zhCNS': LangZhCH
    }
});

// this.$i18n.locale='zhCNS' 动态切换语言

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>'
});