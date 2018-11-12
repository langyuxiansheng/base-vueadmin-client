<template>
    <div>
        <TableUtilContainer
        :utils="{
            left:[{label:'',slot:''}],
            right:[{label:'',slot:'search'}],
        }">
            <el-button slot="add" type="primary" icon="el-icon-plus" plain @click="addRoleInput">添加角色</el-button>
        </TableUtilContainer>
        <el-table
            :data="tableData"
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
                :width="col.width"
                :label="col.label">
                <template slot-scope="scope">
                    <span v-if="col.key === 'operation'">
                        <el-button type="primary" @click="linkTo({type:'wallet',userId:15313})">用户钱包</el-button>
                        <el-button type="warning">编辑</el-button>
                        <el-button type="danger">注销</el-button>
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
import {
    getGameList
} from '@/http';
export default {
    name: 'GameManage',
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
                    label: '操作',
                    width: '240px'
                }
            ]
        };
    },
    created() {
        this.init();
    },
    methods: {

        async init() {
            const { data } = await getGameList();
            console.log(data);
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

        },

        /**
	     * 添加角色
	     */
        addRoleInput () {
            this.$prompt('请输入角色名称', '添加角色', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[^\s]+$/,
                inputErrorMessage: '角色名称不能为空'
            }).then(({ value }) => {
                this.tableDataShow = true;
                this.addRoleData = {
                    name: value
                };
                this.addRole(this);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
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
