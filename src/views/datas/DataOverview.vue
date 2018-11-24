<template>
    <div>
        <DashboardStats :options="options"  ref="DashboardStats"/>
        <StatsBarCharts :options="StatsBarChartsOptions"  ref="StatsBarCharts"/>
    </div>
</template>

<script>
import util from '@/common/method/util';
import { getIpList } from '@/http';
import DashboardStats from './charts/DashboardStats.vue';
import StatsBarCharts from './charts/StatsBarCharts.vue';
export default {
    name: 'DataOverview',
    components: {
        DashboardStats,
        StatsBarCharts
    },
    data () {
        return {
            table: {
                queryData: {
                    keyWord: null, //搜索关键字
                    page: 1,
                    limit: 10
                },
                data: [],
                total: 0
            },
            options: {
                config: {
                    title: '关键数指标',
                    icon: 'fa fa-line-chart fa-lg'
                },
                data: [{
                    label: '会员总数',
                    value: 22,
                    icon: 'fa fa-users fa-3x',
                    background: '#fc8675'
                },
                {
                    label: '代理商数',
                    value: 5,
                    icon: 'fa fa-address-card-o fa-3x',
                    background: '#6bafbd'
                },
                {
                    label: '分级代理数',
                    value: 4135,
                    icon: 'fa fa-address-book-o fa-3x',
                    background: '#f3ce85'
                },
                {
                    label: '代理总分数',
                    value: 4135,
                    icon: 'fa fa-star fa-3x',
                    background: '#949FB1'
                },
                {
                    label: '今日充值分数',
                    value: 4135,
                    icon: 'fa fa-star-o fa-3x',
                    background: '#65cea7'
                },
                {
                    label: '今日转入金额',
                    value: 4135,
                    icon: 'fa fa-jpy fa-3x',
                    background: '#6bafbd'
                },
                {
                    label: '今日转出金额',
                    value: 4135,
                    icon: 'fa fa-jpy fa-3x',
                    background: '#fc8675'
                },
                {
                    label: '今日注册会员',
                    value: 4135,
                    icon: 'fa fa-user-circle fa-3x',
                    background: '#f3ce85'
                },
                {
                    label: '今日总输赢',
                    value: 4135,
                    icon: 'fa fa-balance-scale fa-3x',
                    background: '#949FB1'
                },
                {
                    label: '今日抽水总额',
                    value: 4135,
                    icon: 'fa fa-jpy fa-3x',
                    background: '#65cea7'
                },
                {
                    label: '今日机器人输赢',
                    value: 4135,
                    icon: 'fa fa-android fa-3x',
                    background: '#fc8675'
                },
                {
                    label: '当前在线人数',
                    value: 4135,
                    icon: 'fa fa-cloud-upload fa-3x',
                    background: '#6bafbd'
                }]
            },
            StatsBarChartsOptions: {
                config: {
                    title: '最近30天不重复登录数据分析 | 总登录人数: 0 | 平均: 0',
                    icon: 'fa fa-area-chart fa-lg'
                },
                charts: {
                    //title: '最近30天不重复登录数据分析',
                    data: `7629 3019 6369 3376 2172 2816 6501 1364 1043 5251`.split(' ')
                }
            }
        };
    },
    created() {
        //this.init();
    },

    mounted() {
        this.$refs.StatsBarCharts.initBarChart();
    },
    methods: {

        async init() {
            const { data, total } = await getIpList(this.table.queryData);
            this.table.data = data;
            this.table.total = total;
        },

        /**
         * 表格搜索
         */
        tableSearch (keyWord) {

        },

        /**
        * 翻页
        */
        handleCurrentChange (val) {
            this.table.queryData.page = val;
            this.init();
        },

        /**
	     * 弹出层操作
	     */
        showDialog ({ type, data }) {
            const cloneData = util.deepCloneObject(data);
            if (type === 'add') {
                this.$refs.WhiteIPFormDialog.init({ type, title: '添加IP' });
            } else if (type === 'update') {
                this.$refs.WhiteIPFormDialog.init({ type, title: '编辑IP', data: cloneData });
            } else if (type === 'detail') {
                this.$refs.WhiteIPDialog.init({ type, title: 'IP详情', data: cloneData });
            }
        },

        /**
         * 修改游戏状态
         */
        deleteIP ({AgentNumber}) {
            this.$confirm(`此操作将删除该IP地址, 是否继续?`, '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                this.$message.success(`点击了确认删除`);
                /*  const { code } = await upGameStatus({ AgentNumber });
                if (code === 200) {
                    this.$message.success(this.$t('msg.update_success'));
                    this.init();
                } */
            });
        }
    }
};
</script>
