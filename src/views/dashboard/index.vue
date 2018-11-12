<template>
    <div>
        <el-table
            :data="tableData"
            :size="$store.state.config.tableSize"
            stripe>
            <el-table-column
                align="center"
                type="index"
                :label="$t('label.index_num')">
            </el-table-column>
            <el-table-column
                v-for="(col,k) in tableCols"
                :key="k"
                :show-overflow-tooltip="col.key !== 'operation'"
                :align="col.align || 'center'"
                :label="col.label">
                <template slot-scope="scope">
                    <span v-if="col.key === 'operation'">
                        <el-button type="text" @click="linkTo({type:'wallet',userId:15313})">用户钱包</el-button>
                        <el-button type="text">注销</el-button>
                    </span>
                    <span v-else>{{scope.row[col.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="table-pagination"
            @current-change="handleCurrentChange"
            :page-size="$store.state.config.pagination.size"
            :page-sizes="$store.state.config.pagination.pageSizes"
            :layout="$store.state.config.pagination.layout"
            :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>

export default {
    name: 'dashboard',
    data () {
        return {
            tableSearchKeyWord: '', //搜索关键字
            checkedAll: false,
            tableData: [],
            tableCols: [
                {
                    key: 'username',
                    label: '姓名&昵称'
                },
                {
                    key: 'phone',
                    label: '账号'
                },
                {
                    key: 'wechat',
                    label: '绑定微信'
                },
                {
                    key: 'amount',
                    label: '余额'
                },
                {
                    key: 'arr',
                    label: '欠费'
                },
                {
                    key: 'operation',
                    label: '操作'
                }
            ]
        };
    },
    created() {
        this.tableData = [
            {
                username: '皮皮虾',
                phone: '18011212789',
                wechat: 'VBScript',
                amount: 180.00,
                arr: 0.00
            },
            {
                username: '内涵TV',
                phone: '18023245589',
                wechat: 'C31221',
                amount: 1120.00,
                arr: 0.00
            },
            {
                username: '天狼星',
                phone: '18425212789',
                wechat: 'ts',
                amount: 0.00,
                arr: 40.00
            }
        ];
    },
    methods: {

        /**
         * 表格搜索
         */
        tableSearch (keyWord) {

        },

        /**
        * 翻页
        */
        handleCurrentChange (val) {

        },

        /**
         * 跳转
         */
        linkTo({type, userId}) {
            switch (type) {
            case 'wallet':
                this.$router.push(`/public/info/userWallet/${userId}`); break;
            }
        }
    }
};
</script>
