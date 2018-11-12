/**
 * Vue 全局过滤器
 */

import Vue from 'vue';
import filters from './filters.fun';

for (let k in filters) {
    Vue.filter(k, filters[k]);
}