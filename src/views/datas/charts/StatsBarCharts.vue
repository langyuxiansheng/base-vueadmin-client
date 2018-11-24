<template>
    <div class="app-stats-container">
        <h2 class="stats-header">
            <i :class="options.config.icon"></i>
            {{options.config.title}}
        </h2>
        <div id="bar-charts"></div>
    </div>
</template>
<script type="text/ecmascript-6">
// 引入基本模板
import echarts from 'echarts/lib/echarts';
//引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

export default {
    props: {
        options: {
            required: true,
            type: Object,
            default: {
                config: {
                    title: '关键数指标',
                    icon: 'fa fa-line-chart fa-lg'
                },
                data: [
                    {
                        label: '测试数据',
                        value: 4135,
                        icon: 'fa fa-users fa-3x',
                        background: '#fc8675'
                    }
                ]
            }
        }
    },
    methods: {

        /**
         * 初始化柱状图
         */
        initBarChart () {
            const { title, data } = this.options.charts;
            //月份
            const xAxisData = this.$store.state.config.monthDays();

            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('bar-charts'));

            // 绘制图表
            myChart.setOption({
                title: {
                    left: 50,
                    text: title,
                    color: '#151515'

                },
                color: [ '#F4907C', '#86A6F2' ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    icon: 'circle',
                    data: ['线上收费金额', '欠费金额'],
                    right: 50
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                barWidth: 11,
                xAxis: [
                    {
                        type: 'category',
                        data: xAxisData
                    }
                ],
                yAxis: [
                    {
                        name: '元',
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '线上收费金额',
                        type: 'bar',
                        stack: '欠费金额',
                        data: data,
                        label: {
                            show: false,
                            position: 'top',
                            formatter: [
                                '{b|{c}}'
                            ].join('\n')
                        }
                    }
                ]
            });
            window.addEventListener('resize', function () {
                myChart.resize();
            });
        }
    }
};
</script>
<style lang="less" scoped>
.app-stats-container{
    background-color: #fff;
    padding: 10px;
    .stats-header{
        color: #777;
        border-color: #e6e6e6;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    #bar-charts{
        height: 476px;
    }
}
</style>

