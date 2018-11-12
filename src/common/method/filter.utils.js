/**
 * 数据导出过滤器
 */
import filters from '@/filters/filters.fun';

export default function install(Vue, options) {
    Vue.prototype.$rhFilters = filters;
}